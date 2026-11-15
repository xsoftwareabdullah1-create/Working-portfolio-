import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const read = (file) => readFileSync(resolve(root, file), 'utf8');
const html = read('index.html');
const css = read('style.css');
const js = read('script.js');
const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

const ids = [...html.matchAll(/\\bid=["']([^"']+)["']/g)].map((m) => m[1]);
const idSet = new Set(ids);
assert(ids.length === idSet.size, 'HTML contains duplicate id attributes.');
for (const id of ['home','liveLab','build','journey','projects','ai','contact','heartCanvas','generatedStage','buildReplay','agentAuto','agentSpeed','navLinks','menuBtn']) {
  assert(idSet.has(id), `Missing required element id: ${id}`);
}
for (const heading of ['WHAT I BUILD WITH','HOW I GOT','LIVE UI LAB','ABDULLAH']) {
  assert(html.toUpperCase().includes(heading), `Missing required portfolio content: ${heading}`);
}
assert(/VISUAL BUILD SEQUENCE/.test(html), 'Cursor choreography must be described as a visual sequence.');
assert(/const count=18/.test(js), 'Expected 18 animated cursors.');
assert(/generateFreshUI/.test(js) && /generateUI/.test(html), 'Live UI concept generator is not wired.');
assert(/@media\\s*\\(max-width:\\s*620px\\)/.test(css), 'Mobile layout breakpoint is missing.');
assert(/prefers-reduced-motion/.test(css) && /reduceMotion/.test(js), 'Reduced-motion support is missing.');
assert(/aria-expanded/.test(html) && /aria-expanded/.test(js), 'Mobile navigation state must be announced accessibly.');

for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
  const value = match[1];
  if (!value || value.startsWith('#') || /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(value)) continue;
  const localPath = value.split(/[?#]/, 1)[0];
  if (localPath && !existsSync(resolve(root, localPath))) errors.push(`Missing local asset: ${value}`);
}
for (const match of html.matchAll(/href=["']#([^"']+)["']/g)) {
  assert(idSet.has(match[1]), `Anchor points to missing id: #${match[1]}`);
}

if (errors.length) {
  console.error('Portfolio validation failed:');
  for (const error of errors) console.error(` - ${error}`);
  process.exit(1);
}
console.log(`Portfolio validation passed: ${ids.length} unique IDs, local assets, anchors, key sections, cursor controls, mobile and reduced-motion support.`);
