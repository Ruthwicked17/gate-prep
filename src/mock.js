// Mock tests: composition, GATE-style scoring, palette status and event folding (pure, unit-tested).
import { checkAnswer } from './scoring.js';

export const MIN_PER_MARK = 1.8; // GATE: 180 min for 100 marks
export const mockTime = marks => Math.max(5, Math.round(marks * MIN_PER_MARK));

// Seeded RNG (mulberry32) so a composed mock is reproducible.
export function rng(seed) {
  let a = (seed >>> 0) || 1;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function questionPapers(q, conceptById) {
  if (q.paper) return [q.paper];
  const c = conceptById.get(q.concept);
  if (!c) return [];
  return [c.ee > 0 && 'EE', c.ra > 0 && 'RA'].filter(Boolean);
}

// Weighted sampling without replacement (Efraimidis-Spirakis): topics that carry more marks appear more often,
// questions already used in earlier mocks are strongly de-prioritised. 1-mark questions come first, like the real paper.
export function composeMock({ questions, concepts, paper = 'any', count, source = 'all', usedIds = new Set(), seed }) {
  const byId = new Map(concepts.map(c => [c.id, c]));
  // Questions that depend on a figure that did not copy over cannot be fairly timed, so mocks skip them (Practice keeps them).
  const withFigure = questions.filter(q => q.figurePage && !q.figure).length;
  const pool = questions.filter(q =>
    (!q.figurePage || q.figure) &&
    byId.has(q.concept) &&
    (source === 'all' || (source === 'pyq') === (q.source === 'pyq')) &&
    (paper === 'any' || questionPapers(q, byId).includes(paper)));
  const rand = rng(seed);
  const scored = pool.map(q => {
    const c = byId.get(q.concept);
    const w0 = c.sec === 'ga' ? 2 : paper === 'RA' ? c.ra : paper === 'EE' ? c.ee : Math.max(c.ee, c.ra);
    const w = Math.max(0.5, w0) * (usedIds.has(q.id) ? 0.2 : 1);
    return { q, key: Math.pow(rand(), 1 / w) };
  }).sort((a, b) => b.key - a.key || a.q.id.localeCompare(b.q.id));
  const chosen = scored.slice(0, Math.min(count, scored.length)).map(s => s.q);
  chosen.sort((a, b) => a.marks - b.marks); // stable: keeps sampled order within each mark group
  const marks = chosen.reduce((s, q) => s + q.marks, 0);
  return { qids: chosen.map(q => q.id), available: pool.length, withFigure, marks, durationMin: mockTime(marks) };
}

export const isAnswered = v => !(v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length));

export function paletteStatus(qid, { answers = {}, marked = {}, visited = {} }) {
  const a = isAnswered(answers[qid]);
  if (marked[qid]) return a ? 'answered-marked' : 'marked';
  if (a) return 'answered';
  return visited[qid] ? 'not-answered' : 'not-visited';
}

export function scoreMock(questions, qids, answers, sectionOf = () => 'All') {
  const byId = new Map(questions.map(q => [q.id, q]));
  const out = { score: 0, max: 0, attempted: 0, correct: 0, wrong: 0, unattempted: 0, negative: 0, items: [], bySection: {} };
  for (const id of qids) {
    const q = byId.get(id);
    if (!q) continue;
    const r = checkAnswer(q, answers[id]);
    const sec = sectionOf(q);
    const s = out.bySection[sec] || (out.bySection[sec] = { score: 0, max: 0, attempted: 0, correct: 0, total: 0 });
    s.max += q.marks; s.total += 1; out.max += q.marks;
    if (!r.attempted) out.unattempted += 1;
    else {
      out.attempted += 1; s.attempted += 1;
      if (r.correct) { out.correct += 1; s.correct += 1; } else out.wrong += 1;
      if (r.marks < 0) out.negative += -r.marks;
    }
    out.score += r.marks; s.score += r.marks;
    out.items.push({ qid: id, q, r, answer: answers[id] });
  }
  return out;
}

// Replays mock events: mock-start, mock-save (latest wins), mock-submit.
export function foldMocks(events) {
  const mocks = new Map();
  for (const e of events) {
    const p = e.payload || {};
    if (e.type === 'mock-start' && p.id) {
      mocks.set(p.id, { id: p.id, qids: p.qids || [], durationMin: p.durationMin, paper: p.paper || 'any', maxMarks: p.maxMarks, startedAt: e.ts, answers: {}, marked: {}, visited: {}, cur: 0, submittedAt: null, timeUsedSec: null, auto: false });
    } else if (e.type === 'mock-save' && mocks.has(p.id)) {
      const m = mocks.get(p.id);
      if (!m.submittedAt) Object.assign(m, { answers: p.answers || {}, marked: p.marked || {}, visited: p.visited || {}, cur: p.cur || 0 });
    } else if (e.type === 'mock-submit' && mocks.has(p.id)) {
      const m = mocks.get(p.id);
      if (!m.submittedAt) Object.assign(m, { answers: p.answers || m.answers, marked: p.marked || m.marked, submittedAt: e.ts, timeUsedSec: p.timeUsedSec ?? null, auto: !!p.auto });
    }
  }
  return mocks;
}

export const deadline = m => m.startedAt + m.durationMin * 60000;
export const timeLeftMs = (m, now = Date.now()) => deadline(m) - now;
export function fmtClock(ms) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(s / 3600), mm = Math.floor((s % 3600) / 60), ss = s % 60;
  return (h ? h + ':' : '') + String(mm).padStart(h ? 2 : 1, '0') + ':' + String(ss).padStart(2, '0');
}
