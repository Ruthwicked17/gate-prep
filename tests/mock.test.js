import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { composeMock, scoreMock, paletteStatus, foldMocks, mockTime, timeLeftMs, fmtClock, rng, isAnswered, questionPapers } from '../src/mock.js';

const syl = JSON.parse(readFileSync(new URL('../public/content/syllabus.json', import.meta.url)));
const bundled = JSON.parse(readFileSync(new URL('../public/content/questions.json', import.meta.url))).questions;
const concepts = syl.concepts;

// synthetic extra questions across topics so sampling has something to choose from
const extra = [];
const some = concepts.slice(0, 20);
some.forEach((c, i) => extra.push({ id: 'x' + i, concept: c.id, type: 'NAT', marks: i % 2 ? 2 : 1, source: i % 3 ? 'pyq' : 'generated', paper: i % 3 ? (c.ee > 0 ? 'EE' : 'RA') : undefined, text: 't' + i, answer: i, tol: 0 }));
const all = [...bundled, ...extra];

describe('composeMock', () => {
  it('is deterministic for a seed and differs across seeds', () => {
    const a = composeMock({ questions: all, concepts, count: 10, seed: 1 });
    const b = composeMock({ questions: all, concepts, count: 10, seed: 1 });
    const c = composeMock({ questions: all, concepts, count: 10, seed: 2 });
    expect(a.qids).toEqual(b.qids);
    expect(a.qids).not.toEqual(c.qids);
  });
  it('returns at most the available pool and reports it', () => {
    const r = composeMock({ questions: bundled, concepts, count: 65, seed: 3 });
    expect(r.qids.length).toBe(bundled.length);
    expect(r.available).toBe(bundled.length);
  });
  it('filters by paper, source and orders 1-mark before 2-mark', () => {
    const ra = composeMock({ questions: all, concepts, paper: 'RA', count: 30, seed: 4 });
    const byId = new Map(concepts.map(c => [c.id, c]));
    const qById = new Map(all.map(q => [q.id, q]));
    for (const id of ra.qids) expect(questionPapers(qById.get(id), byId)).toContain('RA');
    const pyq = composeMock({ questions: all, concepts, source: 'pyq', count: 30, seed: 4 });
    for (const id of pyq.qids) expect(qById.get(id).source).toBe('pyq');
    const marks = composeMock({ questions: all, concepts, count: 20, seed: 5 }).qids.map(id => qById.get(id).marks);
    expect(marks).toEqual([...marks].sort((a, b) => a - b));
  });
  it('prefers questions not used in earlier mocks', () => {
    const first = composeMock({ questions: all, concepts, count: 8, seed: 6 });
    const counts = new Map();
    for (let seed = 10; seed < 40; seed++) {
      const r = composeMock({ questions: all, concepts, count: 8, seed, usedIds: new Set(first.qids) });
      for (const id of r.qids) counts.set(id, (counts.get(id) || 0) + 1);
    }
    const usedHits = first.qids.reduce((s, id) => s + (counts.get(id) || 0), 0) / first.qids.length;
    const others = [...counts].filter(([id]) => !first.qids.includes(id));
    const otherHits = others.reduce((s, [, n]) => s + n, 0) / others.length;
    expect(usedHits).toBeLessThan(otherHits);
  });
  it('computes marks and duration at 1.8 min per mark', () => {
    const r = composeMock({ questions: all, concepts, count: 10, seed: 7 });
    expect(r.durationMin).toBe(mockTime(r.marks));
    expect(mockTime(100)).toBe(180);
    expect(mockTime(1)).toBe(5);
  });
  it('rng is reproducible', () => { expect(rng(9)()).toBe(rng(9)()); });
});

describe('figure-dependent questions', () => {
  it('are left out of mocks but counted', () => {
    const qs = [
      { id: 'f1', concept: 'm-la', type: 'NAT', marks: 1, text: 'a', answer: 1, figurePage: 3 },
      { id: 'f2', concept: 'm-la', type: 'NAT', marks: 1, text: 'b', answer: 1 },
    ];
    const r = composeMock({ questions: qs, concepts, count: 10, seed: 1 });
    expect(r.qids).toEqual(['f2']);
    expect(r.withFigure).toBe(1);
  });
  it('are included once the page picture is attached', () => {
    const qs = [{ id: 'f1', concept: 'm-la', type: 'NAT', marks: 1, text: 'a', answer: 1, figurePage: 3, figure: 'data:image/jpeg;base64,AA' }];
    expect(composeMock({ questions: qs, concepts, count: 5, seed: 1 }).qids).toEqual(['f1']);
  });
});

describe('scoreMock', () => {
  const qs = [
    { id: 'a', concept: 'm-la', type: 'MCQ', marks: 1, options: { A: '', B: '' }, answer: 'A' },
    { id: 'b', concept: 'm-la', type: 'MCQ', marks: 2, options: { A: '', B: '' }, answer: 'A' },
    { id: 'c', concept: 'c-thm', type: 'NAT', marks: 2, answer: 5, tol: 0.01 },
    { id: 'd', concept: 'c-thm', type: 'MSQ', marks: 2, options: { A: '', B: '', C: '' }, answer: ['A', 'C'] },
    { id: 'e', concept: 'c-thm', type: 'NAT', marks: 1, answer: 1, tol: 0 },
  ];
  const sec = q => (q.concept === 'm-la' ? 'Maths' : 'Circuits');
  it('applies GATE marking: negative only on MCQ, MSQ all-or-nothing, NAT tolerance', () => {
    const r = scoreMock(qs, qs.map(q => q.id), { a: 'B', b: 'A', c: '5.005', d: ['A'], e: undefined }, sec);
    expect(r.score).toBeCloseTo(-1 / 3 + 2 + 2 + 0 + 0);
    expect(r.max).toBe(8);
    expect(r).toMatchObject({ attempted: 4, correct: 2, wrong: 2, unattempted: 1 });
    expect(r.negative).toBeCloseTo(1 / 3);
    expect(r.bySection.Maths).toMatchObject({ max: 3, attempted: 2, correct: 1 });
    expect(r.bySection.Circuits.max).toBe(5);
  });
  it('a blank paper scores zero and ignores unknown ids', () => {
    const r = scoreMock(qs, [...qs.map(q => q.id), 'nope'], {}, sec);
    expect(r.score).toBe(0); expect(r.unattempted).toBe(5);
  });
});

describe('palette and clock', () => {
  it('maps question state to GATE palette colours', () => {
    const st = { answers: { a: 'A', b: [] }, marked: { a: true, c: true }, visited: { b: true } };
    expect(paletteStatus('a', st)).toBe('answered-marked');
    expect(paletteStatus('c', st)).toBe('marked');
    expect(paletteStatus('b', st)).toBe('not-answered');
    expect(paletteStatus('z', st)).toBe('not-visited');
    expect(paletteStatus('a', { answers: { a: 'A' } })).toBe('answered');
    expect(isAnswered([])).toBe(false); expect(isAnswered('0')).toBe(true);
  });
  it('formats the countdown', () => {
    expect(fmtClock(65000)).toBe('1:05');
    expect(fmtClock(3725000)).toBe('1:02:05');
    expect(fmtClock(-5)).toBe('0:00');
  });
});

describe('foldMocks', () => {
  const ev = (type, payload, ts) => ({ type, payload, ts });
  it('replays start, save and submit; the last save wins and saves after submit are ignored', () => {
    const m = foldMocks([
      ev('mock-start', { id: 'm1', qids: ['a', 'b'], durationMin: 10, paper: 'EE', maxMarks: 3 }, 1000),
      ev('mock-save', { id: 'm1', answers: { a: 'A' }, marked: {}, visited: { a: true }, cur: 1 }, 2000),
      ev('mock-save', { id: 'm1', answers: { a: 'B' }, marked: { b: true }, visited: { a: true, b: true }, cur: 1 }, 3000),
      ev('mock-submit', { id: 'm1', answers: { a: 'B', b: 'A' }, timeUsedSec: 120 }, 4000),
      ev('mock-save', { id: 'm1', answers: { a: 'Z' } }, 5000),
    ]).get('m1');
    expect(m.answers).toEqual({ a: 'B', b: 'A' });
    expect(m.submittedAt).toBe(4000); expect(m.timeUsedSec).toBe(120);
  });
  it('tracks the deadline', () => {
    const m = foldMocks([ev('mock-start', { id: 'm2', qids: [], durationMin: 5 }, 0)]).get('m2');
    expect(timeLeftMs(m, 60000)).toBe(240000);
    expect(timeLeftMs(m, 400000)).toBeLessThan(0);
  });
  it('ignores saves and submits for unknown mocks', () => {
    expect(foldMocks([ev('mock-save', { id: 'q' }, 1), ev('mock-submit', { id: 'q' }, 2)]).size).toBe(0);
  });
});

describe('General Aptitude', () => {
  it('exists as a concept that the planner ignores but mocks and practice can use', () => {
    const ga = concepts.find(c => c.id === 'ga');
    expect(ga).toMatchObject({ ee: 0, ra: 0 });
    const qs = [{ id: 'g1', concept: 'ga', type: 'MCQ', marks: 1, options: { A: '', B: '' }, answer: 'A', paper: 'EE' }];
    expect(composeMock({ questions: qs, concepts, paper: 'EE', count: 5, seed: 1 }).qids).toEqual(['g1']);
  });
});
