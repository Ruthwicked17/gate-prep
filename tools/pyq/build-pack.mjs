// Step 3: validate segmented questions, merge official answer keys, write the private pack.
// Usage: node tools/pyq/build-pack.mjs [raw.json] [keys.csv] [outDir] [--min-confidence 0.8]
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { buildPack, parseKeysCsv, parseKeysMeta } from '../../src/pack.js';

const args = process.argv.slice(2);
const mc = args.indexOf('--min-confidence');
const minConfidence = mc >= 0 ? parseFloat(args.splice(mc, 2)[1]) : 0.8;
const [rawPath = 'private/pyq/raw-questions.json', keysPath = 'private/pyq/keys.csv', outDir = 'private/pyq'] = args;

for (const p of [rawPath, keysPath]) {
  if (!existsSync(p)) { console.error('Missing file: ' + p); process.exit(1); }
}
const syl = JSON.parse(readFileSync('public/content/syllabus.json', 'utf8'));
const raw = JSON.parse(readFileSync(rawPath, 'utf8'));
const keysText = readFileSync(keysPath, 'utf8');
const keys = parseKeysCsv(keysText);
const meta = parseKeysMeta(keysText);
const { pack, review } = buildPack(raw, keys, syl.concepts.map(c => c.id), { minConfidence, meta });
// Questions the official key lists but segmentation never produced.
const have = new Set(raw.map(r => `${String(r.paper).toUpperCase()}-${r.year}-${r.qno}`));
const years = new Set(raw.map(r => `${String(r.paper).toUpperCase()}-${r.year}`));
const missing = [...meta].filter(([id, m]) => years.has(id.slice(0, id.lastIndexOf('-'))) && !have.has(id)).map(([id]) => id);

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/pack.json`, JSON.stringify(pack, null, 1));
writeFileSync(`${outDir}/review.json`, JSON.stringify(review, null, 1));
const excluded = review.filter(r => !r.included);
console.log(`Read ${raw.length} questions, ${keys.size} answer keys.`);
console.log(`pack.json:   ${pack.questions.length} questions (${pack.questions.filter(q => q.verified).length} verified against an official key)`);
console.log(`review.json: ${review.length} entries (${excluded.length} excluded, ${review.length - excluded.length} included but flagged)`);
const tally = {};
for (const r of excluded) for (const x of r.reasons) { const k = x.replace(/[:\d.]+.*$/, '').trim(); tally[k] = (tally[k] || 0) + 1; }
for (const [k, n] of Object.entries(tally)) console.log(`  ${n} x ${k}`);
if (missing.length) { console.log(`  ${missing.length} questions in the official key were not extracted: ${missing.join(', ')}`); writeFileSync(`${outDir}/missing.json`, JSON.stringify(missing, null, 1)); }
console.log(`Import ${outDir}/pack.json in the app (Backup > Question packs).`);
