// Validates every event schema, checks each has an example envelope that passes envelope + payload schema,
// and that every event is declared in asyncapi.yaml.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { parse } from 'yaml';
import { eventSchemas } from './generate.mjs';

const ajv = new Ajv2020({ strict: true, allErrors: true });
addFormats(ajv);
const envelope = ajv.compile(JSON.parse(readFileSync('schemas/envelope.json', 'utf8')));
const asyncapi = parse(readFileSync('asyncapi.yaml', 'utf8'));

const errors = [];
for (const ev of eventSchemas()) {
  let validate;
  try {
    validate = ajv.compile(ev.schema);
  } catch (e) {
    errors.push(`${ev.rel}: invalid schema: ${e.message}`);
    continue;
  }
  if (ev.schema.additionalProperties !== false) errors.push(`${ev.rel}: must set additionalProperties: false`);

  const example = join('examples', `${ev.type}.v${ev.version}.json`);
  if (!existsSync(example)) {
    errors.push(`${ev.rel}: missing example ${example}`);
  } else {
    const msg = JSON.parse(readFileSync(example, 'utf8'));
    if (!envelope(msg)) errors.push(`${example}: envelope ${ajv.errorsText(envelope.errors)}`);
    if (msg.type !== ev.type) errors.push(`${example}: type must be ${ev.type}`);
    if (!validate(msg.data)) errors.push(`${example}: data ${ajv.errorsText(validate.errors)}`);
  }

  if (!asyncapi.channels?.[ev.type]) errors.push(`${ev.rel}: no channel '${ev.type}' in asyncapi.yaml`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('contracts valid');
