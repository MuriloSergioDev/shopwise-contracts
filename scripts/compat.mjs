// BACKWARD-compatibility check against Apicurio Registry 3.
// For each event schema: register the base-branch version (if any) under a throwaway group,
// then add the working-tree version as a new version. Apicurio rejects it if incompatible.
//
//   REGISTRY_URL (default http://localhost:8081/apis/registry/v3)
//   BASE_REF     (default origin/main)
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { eventSchemas } from './generate.mjs';

const registry = process.env.REGISTRY_URL ?? 'http://localhost:8081/apis/registry/v3';
const baseRef = process.env.BASE_REF ?? 'origin/main';
const group = `compat-${Date.now()}`;

async function api(method, path, body) {
  const res = await fetch(`${registry}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body && JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${await res.text()}`);
  return res.status === 204 ? null : res.json();
}

const content = (schema) => ({ content: JSON.stringify(schema), contentType: 'application/json' });

function baseVersion(rel) {
  try {
    return execSync(`git show ${baseRef}:${rel}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch {
    return null;
  }
}

try {
  await fetch(`${registry}/system/info`);
} catch {
  console.error(`Registry not reachable at ${registry}. Start Tilt (port-forward 8081) or set REGISTRY_URL.`);
  process.exit(1);
}

const failures = [];
for (const ev of eventSchemas()) {
  const base = baseVersion(ev.rel);
  if (!base) continue;
  const artifactId = `${ev.type}.v${ev.version}`;
  try {
    await api('POST', `/groups/${group}/artifacts`, {
      artifactId,
      artifactType: 'JSON',
      firstVersion: { content: content(JSON.parse(base)) },
    });
    await api('POST', `/groups/${group}/artifacts/${artifactId}/rules`, { ruleType: 'COMPATIBILITY', config: 'BACKWARD' });
    await api('POST', `/groups/${group}/artifacts/${artifactId}/versions?dryRun=true`, {
      content: content(JSON.parse(readFileSync(ev.path, 'utf8'))),
    });
    console.log(`ok   ${artifactId}`);
  } catch (e) {
    failures.push(`${artifactId}: ${e.message}`);
  }
}
await api('DELETE', `/groups/${group}`).catch(() => {});

if (failures.length) {
  console.error(`Incompatible schema changes (publish a new .vN+1 file instead):\n${failures.join('\n')}`);
  process.exit(1);
}
