import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { buildCards, dueCards, previews, noteSection, revisionSummary, Rating } from '../src/revision.js';

const T0 = new Date('2026-11-21T10:00:00Z').getTime();
const DAY = 86400000;
const ev = (type, payload, ts, id) => ({ id: id || type + ts, ts, type, payload });
const attempt = (qid, correct, ts, extra = {}) => ev('attempt', { qid, attempted: true, correct, ...extra }, ts);

describe('card creation from events', () => {
  it('a wrong answer creates a question card due in 1 day; a right answer schedules later', () => {
    const cards = buildCards([attempt('a', false, T0), attempt('b', true, T0)], { now: new Date(T0) });
    const a = cards.get('q:a').card, b = cards.get('q:b').card;
    expect(a.due.getTime() - T0).toBe(1 * DAY);
    expect(b.due.getTime() - T0).toBeGreaterThan(a.due.getTime() - T0);
    expect(cards.get('q:a')).toMatchObject({ kind: 'question', id: 'a' });
  });
  it('unattempted questions do not create cards', () => {
    const cards = buildCards([ev('attempt', { qid: 'z', attempted: false, correct: false }, T0)], { now: new Date(T0) });
    expect(cards.size).toBe(0);
  });
  it('marking a topic done creates a topic card due after 1 day; undoing removes it', () => {
    let cards = buildCards([ev('done', { concept: 'c-thm', value: true }, T0)], { now: new Date(T0) });
    expect(cards.get('t:c-thm').card.due.getTime()).toBe(T0 + DAY);
    cards = buildCards([ev('done', { concept: 'c-thm', value: true }, T0), ev('done', { concept: 'c-thm', value: false }, T0 + 1000)], { now: new Date(T0) });
    expect(cards.has('t:c-thm')).toBe(false);
  });
  it('re-marking done does not reset an existing topic card', () => {
    const events = [ev('done', { concept: 'x', value: true }, T0), ev('review', { card: 't:x', rating: Rating.Good }, T0 + DAY), ev('done', { concept: 'x', value: true }, T0 + 2 * DAY)];
    const cards = buildCards(events, { now: new Date(T0 + 3 * DAY) });
    expect(cards.get('t:x').card.reps).toBe(1);
  });
});

describe('reviews and intervals', () => {
  it('successful reviews grow the interval; a lapse shrinks it', () => {
    const e1 = [attempt('a', true, T0)];
    const c1 = buildCards(e1, { now: new Date(T0) }).get('q:a').card;
    const e2 = [...e1, ev('review', { card: 'q:a', rating: Rating.Good }, c1.due.getTime())];
    const c2 = buildCards(e2, { now: new Date(T0) }).get('q:a').card;
    expect(c2.scheduled_days).toBeGreaterThan(c1.scheduled_days);
    const e3 = [...e2, ev('review', { card: 'q:a', rating: Rating.Again }, c2.due.getTime())];
    const c3 = buildCards(e3, { now: new Date(T0) }).get('q:a').card;
    expect(c3.scheduled_days).toBeLessThan(c2.scheduled_days);
    expect(c3.lapses).toBe(1);
  });
  it('an attempt carrying a chosen rating overrides the correct/wrong default', () => {
    const easy = buildCards([attempt('a', true, T0, { rating: Rating.Easy })], { now: new Date(T0) }).get('q:a').card;
    const good = buildCards([attempt('a', true, T0)], { now: new Date(T0) }).get('q:a').card;
    expect(easy.scheduled_days).toBeGreaterThan(good.scheduled_days);
  });
  it('is deterministic and independent of the viewing time', () => {
    const events = [attempt('a', false, T0), attempt('a', true, T0 + DAY)];
    const x = buildCards(events, { now: new Date(T0 + 5 * DAY) }).get('q:a').card;
    const y = buildCards(events, { now: new Date(T0 + 5 * DAY) }).get('q:a').card;
    expect(x.due.getTime()).toBe(y.due.getTime());
  });
  it('never schedules past the exam', () => {
    const exam = new Date(T0 + 30 * DAY);
    let events = [attempt('a', true, T0)];
    let t = T0;
    for (let i = 0; i < 8; i++) {
      const c = buildCards(events, { now: new Date(T0), examDate: exam }).get('q:a').card;
      t = c.due.getTime();
      events = [...events, ev('review', { card: 'q:a', rating: Rating.Easy }, t)];
    }
    const final = buildCards(events, { now: new Date(T0), examDate: exam }).get('q:a').card;
    expect(final.scheduled_days).toBeLessThanOrEqual(27);
  });
  it('ignores malformed review events', () => {
    const cards = buildCards([ev('review', { card: 't:none', rating: 3 }, T0), ev('review', { card: 'q:a', rating: 9 }, T0)], { now: new Date(T0) });
    expect(cards.size).toBe(0);
  });
});

describe('due list and previews', () => {
  it('lists only due cards, oldest first, and summarises them', () => {
    const events = [attempt('a', false, T0), attempt('b', true, T0), ev('done', { concept: 'c', value: true }, T0)];
    const cards = buildCards(events, { now: new Date(T0) });
    expect(dueCards(cards, new Date(T0)).length).toBe(0);
    const later = new Date(T0 + 2 * DAY);
    const due = dueCards(cards, later);
    expect(due[0].key).toBe('q:a');
    expect(due.every(d => d.card.due <= later)).toBe(true);
    const s = revisionSummary(cards, later);
    expect(s.total).toBe(3); expect(s.due).toBe(due.length);
    expect(s.dueQuestions + s.dueTopics).toBe(s.due);
  });
  it('button previews are ordered Again <= Hard <= Good <= Easy', () => {
    const cards = buildCards([attempt('a', true, T0)], { now: new Date(T0) });
    const entry = cards.get('q:a');
    const p = previews(entry, entry.card.due);
    const n = k => parseInt(p[k]) * (p[k].endsWith('w') ? 7 : 1);
    expect(n(1)).toBeLessThanOrEqual(n(2)); expect(n(2)).toBeLessThanOrEqual(n(3)); expect(n(3)).toBeLessThanOrEqual(n(4));
  });
});

describe('noteSection', () => {
  it('extracts the formulas block between its header and the next header', () => {
    const t = 'Title\n\nKEY IDEAS\n- idea\n\nFORMULAS\n- $a = b$\n- $c = d$\n\nWORKED EXAMPLE\nstuff';
    expect(noteSection(t)).toBe('- $a = b$\n- $c = d$');
    expect(noteSection('no header here')).toBeNull();
  });
  it('finds a non-empty formulas block in every real note', () => {
    const dir = new URL('../public/content/notes/', import.meta.url);
    const files = readdirSync(dir);
    expect(files.length).toBe(49);
    for (const f of files) {
      const s = noteSection(readFileSync(new URL(f, dir), 'utf8'));
      expect(s && s.length > 20, f).toBe(true);
    }
  });
});
