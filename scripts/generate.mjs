// Generates PHP DTOs (php/src) and TypeScript types (ts/) from event schemas and OpenAPI specs.
// Output is committed so consumers can install the package straight from git.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { compile } from 'json-schema-to-typescript';
import openapiTS, { astToString } from 'openapi-typescript';

const root = join(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')), '..');
const schemasDir = join(root, 'schemas');

const studly = (s) => s.replace(/(^|[-_.])(\w)/g, (_, __, c) => c.toUpperCase());

// Events and commands (ADR-0004) share the envelope and the rules; only the folder and the namespace differ.
// A command's context is its receiver, which owns the topic.
export function eventSchemas() {
  return ['events', 'commands'].flatMap((kind) =>
    readdirSync(join(schemasDir, kind)).flatMap((context) =>
      readdirSync(join(schemasDir, kind, context))
        .filter((f) => f.endsWith('.json'))
        .map((file) => {
          const [, name, version] = file.match(/^(.+)\.v(\d+)\.json$/);
          return {
            kind,
            context,
            name,
            version: Number(version),
            type: `${context}.${name}`,
            path: join(schemasDir, kind, context, file),
            rel: `schemas/${kind}/${context}/${file}`,
            schema: JSON.parse(readFileSync(join(schemasDir, kind, context, file), 'utf8')),
          };
        }),
    ),
  );
}

// A property is nullable when null is one of its types (`type: [x, null]`) or a oneOf/anyOf branch.
const branches = (prop) => prop.oneOf ?? prop.anyOf ?? [prop];
const types = (prop) => branches(prop).flatMap((b) => (Array.isArray(b.type) ? b.type : b.type ? [b.type] : []));
export const nullable = (prop) => types(prop).includes('null') || branches(prop).some((b) => b.const === null);

const phpType = (prop) => {
  const t = [...new Set(types(prop).filter((x) => x !== 'null'))];
  if (t.length !== 1) return 'mixed';
  return { string: 'string', integer: 'int', number: 'float', boolean: 'bool', array: 'array', object: 'array' }[t[0]] ?? 'mixed';
};

function phpClass(ev) {
  const ns = `Shopwise\\Contracts\\${studly(ev.kind)}\\${studly(ev.context)}`;
  const cls = `${studly(ev.name)}V${ev.version}`;
  const required = new Set(ev.schema.required ?? []);
  const props = Object.entries(ev.schema.properties ?? {});
  const ordered = [...props.filter(([k]) => required.has(k)), ...props.filter(([k]) => !required.has(k))];
  const ctor = ordered
    .map(([k, p]) => {
      const opt = !required.has(k);
      const type = phpType(p);
      const q = type !== 'mixed' && (opt || nullable(p)) ? '?' : '';
      return `        public ${q}${type} $${k}${opt ? ' = null' : ''},`;
    })
    .join('\n');
  const from = ordered.map(([k]) => `            ${k}: $data['${k}']${required.has(k) ? '' : ' ?? null'},`).join('\n');
  // An optional property that cannot be null is left out when unset, so the array still matches the schema.
  const omit = (k, p) => !required.has(k) && !nullable(p);
  const to = props
    .filter(([k, p]) => !omit(k, p))
    .map(([k]) => `            '${k}' => $this->${k},`)
    .join('\n');
  const toOptional = props
    .filter(([k, p]) => omit(k, p))
    .map(([k]) => `        if ($this->${k} !== null) {\n            $data['${k}'] = $this->${k};\n        }\n`)
    .join('');
  const toBody = toOptional
    ? `        $data = [\n${to}\n        ];\n${toOptional}\n        return $data;`
    : `        return [\n${to}\n        ];`;
  return `<?php

declare(strict_types=1);

// Generated from ${ev.rel} by scripts/generate.mjs. Do not edit.

namespace ${ns};

/** ${(ev.schema.description ?? ev.schema.title ?? '').replace(/\*\//g, '')} */
final readonly class ${cls}
{
    public const string TYPE = '${ev.type}';

    public const int VERSION = ${ev.version};

    public const string SCHEMA = '${ev.context}/${ev.name}.v${ev.version}';

    public function __construct(
${ctor}
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
${from}
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
${toBody}
    }
}
`;
}

async function main() {
  for (const kind of ['Events', 'Commands']) rmSync(join(root, 'php/src', kind), { recursive: true, force: true });
  for (const kind of ['events', 'commands']) rmSync(join(root, 'ts', kind), { recursive: true, force: true });
  rmSync(join(root, 'ts/openapi'), { recursive: true, force: true });

  const events = eventSchemas();
  const tsIndex = [];
  for (const ev of events) {
    const phpPath = join(root, 'php/src', studly(ev.kind), studly(ev.context), `${studly(ev.name)}V${ev.version}.php`);
    mkdirSync(dirname(phpPath), { recursive: true });
    writeFileSync(phpPath, phpClass(ev));

    const tsName = `${studly(ev.name)}V${ev.version}`;
    const ts = await compile({ ...ev.schema, title: tsName }, tsName, { bannerComment: `// Generated from ${ev.rel}. Do not edit.` });
    const tsPath = join(root, 'ts', ev.kind, ev.context, `${ev.name}.v${ev.version}.ts`);
    mkdirSync(dirname(tsPath), { recursive: true });
    writeFileSync(tsPath, ts);
    tsIndex.push(`export type { ${tsName} as ${studly(ev.context)}${tsName} } from './${ev.kind}/${ev.context}/${ev.name}.v${ev.version}';`);
  }

  for (const file of readdirSync(join(root, 'openapi')).filter((f) => f.endsWith('.yaml'))) {
    const service = basename(file, '.yaml');
    const ast = await openapiTS(new URL(`file:///${join(root, 'openapi', file).replace(/\\/g, '/')}`));
    mkdirSync(join(root, 'ts/openapi'), { recursive: true });
    writeFileSync(join(root, 'ts/openapi', `${service}.ts`), `// Generated from openapi/${file}. Do not edit.\n${astToString(ast)}`);
    tsIndex.push(`export type * as ${studly(service)}Api from './openapi/${service}';`);
  }

  writeFileSync(join(root, 'ts/index.ts'), `// Generated by scripts/generate.mjs. Do not edit.\n${tsIndex.join('\n')}\n`);
  console.log(`generated ${events.length} message schema(s)`);
}

if (process.argv[1] && import.meta.url.endsWith(basename(process.argv[1]))) {
  await main();
}
