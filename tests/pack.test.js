import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { checkAnswer } from '../src/scoring.js';
import { parseKeysMeta, buildPack, parseKeysCsv, parseKeyAnswer, mergeQuestions, checkPackShape, hashQuestion, validateQuestion, PACK_APP } from '../src/pack.js';

const fx = f => readFileSync(new URL('./fixtures/' + f, import.meta.url), 'utf8');
const syl = JSON.parse(readFileSync(new URL('../public/content/syllabus.json', import.meta.url)));
const conceptIds = syl.concepts.map(c => c.id);
const raw = JSON.parse(fx('raw.json'));
const keys = parseKeysCsv(fx('keys.csv'));

describe('official key parsing', () => {
  it('parses MCQ, MSQ, NAT value and NAT range', () => {
    expect(parseKeyAnswer('MCQ', ' b ')).toEqual({ answer: 'B' });
    expect(parseKeyAnswer('MSQ', 'D;A')).toEqual({ answer: ['A', 'D'] });
    expect(parseKeyAnswer('NAT', '20')).toEqual({ answer: 20, tol: 0.01 });
    const r = parseKeyAnswer('NAT', '3.0:3.2');
    expect(r.answer).toBeCloseTo(3.1); expect(r.tol).toBeCloseTo(0.1);
    const n = parseKeyAnswer('NAT', '-4.6:-4.4');
    expect(n.answer).toBeCloseTo(-4.5);
    expect(parseKeyAnswer('NAT', 'abc')).toBeNull();
    expect(parseKeyAnswer('MCQ', '')).toBeNull();
  });
  it('reads the keys csv', () => {
    expect(keys.get('EE-2099-3')).toBe('A;D');
    expect(keys.size).toBe(7);
  });
});

describe('buildPack', () => {
  const { pack, review } = buildPack(raw, keys, conceptIds);
  const byId = Object.fromEntries(pack.questions.map(q => [q.id, q]));
  it('includes clean, keyed, confidently tagged questions as verified', () => {
    expect(Object.keys(byId).sort()).toEqual(['EE-2099-1', 'EE-2099-2', 'EE-2099-3', 'EE-2099-6']);
    expect(byId['EE-2099-1']).toMatchObject({ answer: 'A', verified: true, source: 'pyq', concept: 'm-la' });
    expect(byId['EE-2099-2']).toMatchObject({ answer: 20, tol: 0.01 });
    expect(byId['EE-2099-3'].answer).toEqual(['A', 'D']);
  });
  it('routes doubtful items to the review queue and excludes them', () => {
    const r = Object.fromEntries(review.map(x => [x.id, x]));
    expect(byId['EE-2099-4']).toBeUndefined();
    expect(r['EE-2099-4'].reasons.join()).toMatch(/low tagging confidence/);
    expect(byId['EE-2099-5']).toBeUndefined();
    expect(r['EE-2099-5'].reasons.join()).toMatch(/no official answer key/);
    expect(byId['RA-2099-7']).toBeUndefined();
    expect(r['RA-2099-7'].reasons.join()).toMatch(/unknown concept/);
  });
  it('dedupes the same question across sets', () => {
    expect(byId['EE-2098-9']).toBeUndefined();
    expect(review.find(x => x.id === 'EE-2098-9').reasons[0]).toMatch(/duplicate of EE-2099-1/);
  });
  it('keeps figure questions but flags them', () => {
    expect(byId['EE-2099-6'].figurePage).toBe(4);
    expect(review.find(x => x.id === 'EE-2099-6')).toMatchObject({ included: true });
  });
  it('never trusts a model-extracted answer as verified', () => {
    const withModelAnswer = raw.map(q => ({ ...q, answer: 'B' }));
    const out = buildPack(withModelAnswer, new Map(), conceptIds);
    expect(out.pack.questions.length).toBe(0);
  });
  it('produces a pack the app accepts', () => {
    expect(pack.app).toBe(PACK_APP);
    const { valid, bad } = checkPackShape(pack);
    expect(bad).toEqual([]); expect(valid.length).toBe(4);
  });
});

describe('merge and validation', () => {
  it('dedupes by id and by content hash, pack wins', () => {
    const dupOfPack = { id: 'x1', type: 'NAT', marks: 1, text: 'same text', answer: 1, source: 'generated' };
    const packDup = { id: 'x2', type: 'NAT', marks: 1, text: 'Same   text', answer: 1, source: 'pyq' };
    const bundledIdClash = { id: 'x4', type: 'NAT', marks: 1, text: 'bundled four', answer: 4 };
    const packIdClash = { id: 'x4', type: 'NAT', marks: 1, text: 'pack four', answer: 4, source: 'pyq' };
    const out = mergeQuestions([dupOfPack, bundledIdClash], [packDup, packIdClash]);
    // same content as a pack question: bundled copy dropped; same id as a pack question: bundled copy dropped
    expect(out.map(q => q.id)).toEqual(['x2', 'x4']);
    expect(out.find(q => q.id === 'x4').text).toBe('pack four');
  });
  it('hash ignores case and whitespace', () => {
    expect(hashQuestion({ text: 'A  B' })).toBe(hashQuestion({ text: 'a b' }));
  });
  it('rejects malformed questions', () => {
    expect(validateQuestion({ id: 'q', text: 't', type: 'MCQ', marks: 1, options: { A: 'x', B: 'y' }, answer: 'C' })).toContain('MCQ answer must be one of the option keys');
    expect(validateQuestion({ id: 'q', text: 't', type: 'XYZ', marks: 3 }).length).toBeGreaterThan(1);
    expect(() => checkPackShape({ app: 'other' })).toThrow();
  });
});

describe('official key edge cases', () => {
  const ids = ['m-la'];
  const base = o => ({ paper: 'EE', year: 2099, qno: '1', type: 'MCQ', marks: 1, text: 't', options: { A: 'a', B: 'b', C: 'c', D: 'd' }, concept: { id: 'm-la', confidence: 0.9 }, ...o });
  const build = (raw, keysObj, meta) => buildPack(raw, new Map(Object.entries(keysObj)), ids, { meta });
  it('accepts either of two correct MCQ options', () => {
    const q = build([base()], { 'EE-2099-1': 'B|D' }).pack.questions[0];
    expect(q).toMatchObject({ answer: 'B', alts: ['D'], verified: true });
    expect(checkAnswer(q, 'B').correct).toBe(true);
    expect(checkAnswer(q, 'D').correct).toBe(true);
    expect(checkAnswer(q, 'A').correct).toBe(false);
  });
  it('accepts several NAT ranges (e.g. a sign ambiguity)', () => {
    const q = build([base({ type: 'NAT', options: undefined })], { 'EE-2099-1': '-2.00:-1.94|1.94:2.00' }).pack.questions[0];
    expect(q.alts.length).toBe(1);
    for (const v of ['-1.97', '1.95', '2.00']) expect(checkAnswer(q, v).correct, v).toBe(true);
    for (const v of ['0', '1.9', '-2.1']) expect(checkAnswer(q, v).correct, v).toBe(false);
  });
  it('excludes questions the official key withdrew (marks to all)', () => {
    const { pack, review } = build([base()], { 'EE-2099-1': 'MTA' });
    expect(pack.questions.length).toBe(0);
    expect(review[0].reasons.join()).toMatch(/marks awarded to all/);
  });
  it('flags extraction that disagrees with the key on type or marks', () => {
    const meta = new Map([['EE-2099-1', { type: 'NAT', marks: 2, section: 'EE' }]]);
    const { pack, review } = build([base()], { 'EE-2099-1': 'A' }, meta);
    expect(pack.questions.length).toBe(0);
    expect(review[0].reasons.join()).toMatch(/type\/marks mismatch/);
  });
  it('keeps questions flagged as uncertain and points to the source page', () => {
    const { pack, review } = build([base({ uncertain: 'formula garbled', page: 7 })], { 'EE-2099-1': 'A' });
    expect(pack.questions[0]).toMatchObject({ figurePage: 7, page: 7 });
    expect(review[0]).toMatchObject({ included: true });
    expect(review[0].reasons.join()).toMatch(/needs check: formula garbled/);
  });
  it('reads 7-column key rows without breaking the answer, and exposes the metadata', () => {
    const csv = ['paper,year,qno,answer,type,marks,section', 'EE,2025,59,-2.00:-1.94|1.94:2.00,NAT,2,EE', 'EE,2025,28,A;C,MSQ,1,EE', ''].join('\n');
    const keys = parseKeysCsv(csv);
    expect(keys.get('EE-2025-59')).toBe('-2.00:-1.94|1.94:2.00');
    expect(keys.get('EE-2025-28')).toBe('A;C');
    expect(parseKeysMeta(csv).get('EE-2025-59')).toEqual({ type: 'NAT', marks: 2, section: 'EE' });
  });
  it('validates alternative answers', () => {
    expect(validateQuestion({ id: 'q', text: 't', type: 'MCQ', marks: 1, options: { A: '', B: '' }, answer: 'A', alts: ['Z'] })).toContain('MCQ alternative answers must be option keys');
  });
});
