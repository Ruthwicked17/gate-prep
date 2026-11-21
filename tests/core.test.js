import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { orderConcepts, buildPlan } from '../src/planner.js';
import { checkAnswer } from '../src/scoring.js';

const syl = JSON.parse(readFileSync(new URL('../public/content/syllabus.json', import.meta.url)));
const qs = JSON.parse(readFileSync(new URL('../public/content/questions.json', import.meta.url))).questions;

describe('syllabus seed', () => {
  it('EE planning weights sum to ~85 (100 minus 15 GA)', () => {
    const ee = syl.concepts.reduce((s, c) => s + c.ee, 0);
    expect(ee).toBeGreaterThan(84.5); expect(ee).toBeLessThan(85.5);
  });
  it('all prerequisites exist', () => {
    const ids = new Set(syl.concepts.map(c => c.id));
    for (const c of syl.concepts) for (const p of c.pre) expect(ids.has(p)).toBe(true);
  });
  it('every question references a concept', () => {
    const ids = new Set(syl.concepts.map(c => c.id));
    for (const q of qs) expect(ids.has(q.concept)).toBe(true);
  });
});

describe('planner', () => {
  const order = orderConcepts(syl.concepts, ['EE', 'RA']);
  it('puts all EE topics before RA-only topics', () => {
    const firstRaOnly = order.findIndex(c => c.ee === 0);
    expect(order.slice(firstRaOnly).every(c => c.ee === 0)).toBe(true);
    expect(order.slice(0, firstRaOnly).every(c => c.ee > 0)).toBe(true);
  });
  it('respects prerequisites', () => {
    const pos = new Map(order.map((c, i) => [c.id, i]));
    for (const c of order) for (const p of c.pre) expect(pos.get(p)).toBeLessThan(pos.get(c.id));
  });
  it('EE-only selection excludes RA-only topics', () => {
    expect(orderConcepts(syl.concepts, ['EE']).some(c => c.ee === 0)).toBe(false);
  });
  it('reports pace and skips completed topics', () => {
    const today = new Date(2026, 10, 21), exam = new Date(2027, 1, 6);
    const p = buildPlan({ order, hoursPerDay: 4, today, examDate: exam });
    expect(p.next.id).toBe(order[0].id);
    const p2 = buildPlan({ order, done: new Set([order[0].id]), hoursPerDay: 4, today, examDate: exam });
    expect(p2.next.id).toBe(order[1].id);
    expect(typeof p.status).toBe('string');
  });
});

describe('scoring', () => {
  it('MCQ negative marking', () => {
    const q = { type: 'MCQ', marks: 2, answer: 'A' };
    expect(checkAnswer(q, 'A').marks).toBe(2);
    expect(checkAnswer(q, 'B').marks).toBeCloseTo(-2 / 3);
    expect(checkAnswer(q, undefined).marks).toBe(0);
  });
  it('MSQ is all-or-nothing', () => {
    const q = { type: 'MSQ', marks: 2, answer: ['A', 'C'] };
    expect(checkAnswer(q, ['C', 'A']).correct).toBe(true);
    expect(checkAnswer(q, ['A']).marks).toBe(0);
  });
  it('NAT tolerance', () => {
    const q = { type: 'NAT', marks: 1, answer: 4.55, tol: 0.01 };
    expect(checkAnswer(q, '4.545').correct).toBe(true);
    expect(checkAnswer(q, '4.6').marks).toBe(0);
  });
});
