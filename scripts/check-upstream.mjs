import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const origin = 'https://dsaltaren.com';
const registry = await fetch(`${origin}/design-system/registry.json`).then(response => {
  assert.equal(response.status, 200, 'Registry unavailable');
  return response.json();
});
const components = registry.components.filter(component => component.status === 'shared');
const files = new Map();
// The portable repository deliberately uses fictional examples and no personal media.
function portable(content) {
  return content.replace('<Avatar name="Danny Saltaren" src="/media/danny-clean.png" /><span>Danny Saltaren</span>', '<Avatar name="Alex Morgan" /><span>Alex Morgan</span>');
}
for (let offset = 0; offset < components.length; offset += 5) {
  const bundles = await Promise.all(components.slice(offset, offset + 5).map(async component => {
    const response = await fetch(`${origin}${component.install}`);
    assert.equal(response.status, 200, `Installation unavailable: ${component.id}`);
    return response.json();
  }));
  for (const bundle of bundles) {
    for (const file of bundle.files) {
      assert.match(file.path, /^[a-zA-Z0-9_-]+\.(tsx?|css|txt)$/);
      const content = portable(file.content);
      if (files.has(file.path)) assert.equal(files.get(file.path), content, `Conflicting source: ${file.path}`);
      files.set(file.path, content);
    }
  }
}
const differences = [];
for (const [path, expected] of files) {
  const actual = await readFile(new URL(`../src/${path}`, import.meta.url), 'utf8').catch(() => null);
  if (actual !== expected) differences.push(path);
}
if (differences.length) {
  console.error('Review upstream differences before publishing:', differences.join(', '));
  process.exitCode = 1;
} else {
  console.log(`${components.length} portable components, ${files.size} source files match the public registry.`);
  if (process.argv.includes('--record')) {
    const hashes = Object.fromEntries([...files].sort(([a], [b]) => a.localeCompare(b)).map(([path, content]) => [path, createHash('sha256').update(content).digest('hex')]));
    await writeFile(new URL('../upstream.json', import.meta.url), JSON.stringify({ source: `${origin}/design-system/registry.json`, checkedAt: new Date().toISOString(), components: components.map(c => c.id), files: hashes, adaptations: ['Fictional avatar fixture replaces the portfolio owner and personal portrait.'] }, null, 2) + '\n');
  }
}
