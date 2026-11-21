// Step 2b: official answer-key text (from extract.py) -> keys.csv, with strict integrity checks.
// Usage: node tools/pyq/convert-keys.mjs [keyTextDir] [out.csv] [--paper EE]
// Handles both layouts seen on the official site: one record per line (2022-2024) and one cell per line (2025).
// Output columns: paper,year,qno,answer,type,marks,section
// Answer syntax: MCQ "B" or "B|D" (either accepted), MSQ "A;D", NAT "a:b" or "a:b|c:d", or "MTA" (marks to all: withdrawn).
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';

const args = process.argv.slice(2);
const pi = args.indexOf('--paper');
const paper = pi >= 0 ? args.splice(pi, 2)[1] : 'EE';
const [dir = 'private/pyq/key-text', out = 'private/pyq/keys.csv'] = args;
if (!existsSync(dir)) { console.error('Missing folder: ' + dir); process.exit(1); }

const LINE = /^(\d+)\s+(\d+)\s+(MCQ|MSQ|NAT)\s+(\S+)\s+(.+?)\s+(\d)$/;

function parseLines(lines) {
  const recs = [];
  for (const l of lines) {
    const m = l.match(LINE);
    if (m) recs.push({ q: Number(m[1]), session: m[2], type: m[3], section: m[4], key: m[5].trim(), marks: Number(m[6]) });
  }
  return recs;
}
function parseVertical(lines) {
  const hi = lines.findIndex(l => /^Marks$/i.test(l));
  if (hi < 0) return [];
  const cells = lines.slice(hi + 1).filter(l => !/^(Electrical Engineering|Final Answer Key|Answer Key)/i.test(l));
  const recs = [];
  for (let i = 0; i + 5 < cells.length; i += 6) {
    const [q, session, type, section, key, marks] = cells.slice(i, i + 6);
    recs.push({ q: Number(q), session, type, section, key: key.trim(), marks: Number(marks) });
  }
  return recs;
}

// Normalise the official key text into the CSV answer syntax; returns [answer, problem].
function normaliseKey(type, key) {
  const k = key.replace(/\s+/g, ' ').trim();
  if (/^MTA$/i.test(k)) return ['MTA', null];
  if (type === 'MCQ') {
    const parts = k.split(/\s+OR\s+/i).map(x => x.trim());
    return parts.every(x => /^[A-D]$/.test(x)) ? [parts.join('|'), null] : [k, `MCQ key "${k}"`];
  }
  if (type === 'MSQ') {
    const parts = k.split(/\s*[;,]\s*|\s+/).filter(Boolean);
    return parts.length && parts.every(x => /^[A-D]$/.test(x)) ? [[...new Set(parts)].sort().join(';'), null] : [k, `MSQ key "${k}"`];
  }
  const ranges = k.split(/\s+OR\s+/i).map(x => x.trim());
  const ok = ranges.every(x => /^-?[\d.]+ to -?[\d.]+$/.test(x));
  return ok ? [ranges.map(x => x.replace(/ to /, ':')).join('|'), null] : [k, `NAT key "${k}"`];
}

const rows = ['paper,year,qno,answer,type,marks,section'];
let failed = false;
for (const file of readdirSync(dir).filter(f => f.endsWith('.txt')).sort()) {
  const year = (file.match(/(20\d\d)/) || [])[1];
  const lines = readFileSync(`${dir}/${file}`, 'utf8').split(/\r?\n/).map(l => l.trim())
    .filter(l => l && !/^=== page/.test(l) && !/^Page \d+ of \d+$/.test(l));
  let recs = parseLines(lines);
  if (recs.length < 65) recs = parseVertical(lines);
  const problems = [];
  recs.forEach((r, i) => {
    if (r.q !== i + 1) problems.push(`row ${i + 1}: question number ${r.q} out of sequence`);
    if (![1, 2].includes(r.marks)) problems.push(`Q${r.q}: marks ${r.marks}`);
    const [ans, p] = normaliseKey(r.type, r.key);
    r.answer = ans; if (p) problems.push(`Q${r.q}: ${p}`);
  });
  const total = recs.reduce((s, r) => s + (r.marks || 0), 0);
  if (recs.length !== 65) problems.push(`expected 65 questions, found ${recs.length}`);
  if (total !== 100) problems.push(`marks add up to ${total}, expected 100`);
  const count = t => recs.filter(r => r.type === t).length;
  const flags = [`${recs.filter(r => r.answer === 'MTA').length} MTA`, `${recs.filter(r => r.answer.includes('|')).length} multi-answer`].join(', ');
  console.log(`${file}: ${recs.length} q, ${total} marks, session ${[...new Set(recs.map(r => r.session))].join('/')}, ${count('MCQ')} MCQ / ${count('MSQ')} MSQ / ${count('NAT')} NAT, ${flags}` +
    (problems.length ? `  PROBLEMS: ${problems.join('; ')}` : '  OK'));
  if (problems.length) { failed = true; continue; }
  for (const r of recs) rows.push([paper, year, r.q, r.answer, r.type, r.marks, r.section].join(','));
}
if (failed) { console.error('Not writing ' + out + ': fix the problems above (nothing was written).'); process.exit(1); }
writeFileSync(out, rows.join('\n') + '\n');
console.log(`Wrote ${rows.length - 1} keys to ${out}`);
