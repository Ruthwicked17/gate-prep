// Spaced revision on top of ts-fsrs (FSRS scheduler).
// Cards are derived by replaying the append-only event log, so they are deterministic and merge across devices.
//   question card  q:<qid>      created by the first practice attempt; wrong = Again, right = Good (or the rating you chose in Review)
//   topic card     t:<conceptId> created when a topic is marked done; first review is due 1 day later
import { fsrs, generatorParameters, createEmptyCard, Rating } from 'ts-fsrs';

const DAY = 86400000;
export { Rating };

// Short-term (minute) learning steps are disabled: this is a daily study app, intervals are whole days.
// Intervals are capped so nothing is scheduled past the exam.
export function makeScheduler(maxInterval = 60) {
  return fsrs(generatorParameters({ enable_fuzz: false, enable_short_term: false, maximum_interval: maxInterval, request_retention: 0.9 }));
}

function maxIntervalFor(now, examDate) {
  if (!examDate) return 60;
  return Math.max(7, Math.floor((examDate.getTime() - now.getTime()) / DAY) - 3);
}

export function buildCards(events, { now = new Date(), examDate } = {}) {
  const f = makeScheduler(maxIntervalFor(now, examDate));
  const cards = new Map();
  const review = (key, kind, id, rating, when) => {
    const existing = cards.get(key);
    const base = existing ? existing.card : createEmptyCard(new Date(when));
    cards.set(key, { key, kind, id, card: f.next(base, new Date(when), rating).card });
  };
  for (const e of events) {
    const p = e.payload || {};
    if (e.type === 'done') {
      const key = 't:' + p.concept;
      if (p.value) {
        if (!cards.has(key)) cards.set(key, { key, kind: 'topic', id: p.concept, card: createEmptyCard(new Date(e.ts + DAY)) });
      } else cards.delete(key);
    } else if (e.type === 'review' && typeof p.card === 'string' && p.rating >= 1 && p.rating <= 4) {
      const [k, ...rest] = p.card.split(':');
      const id = rest.join(':');
      if (k === 't' && cards.has(p.card)) review(p.card, 'topic', id, p.rating, e.ts);
      else if (k === 'q') review(p.card, 'question', id, p.rating, e.ts);
    } else if (e.type === 'attempt' && p.attempted && p.qid) {
      const rating = p.rating >= 1 && p.rating <= 4 ? p.rating : (p.correct ? Rating.Good : Rating.Again);
      review('q:' + p.qid, 'question', p.qid, rating, e.ts);
    }
  }
  return cards;
}

export function dueCards(cards, now = new Date()) {
  return [...cards.values()].filter(c => c.card.due.getTime() <= now.getTime()).sort((a, b) => a.card.due - b.card.due || a.key.localeCompare(b.key));
}

// "1d", "3d", "2w": what each button will do, shown on the rating buttons.
export function previews(entry, now = new Date(), examDate) {
  const f = makeScheduler(maxIntervalFor(now, examDate));
  const rec = f.repeat(entry.card, now);
  const label = d => { const n = Math.max(1, Math.round((d - now) / DAY)); return n >= 14 ? Math.round(n / 7) + 'w' : n + 'd'; };
  return { 1: label(rec[1].card.due), 2: label(rec[2].card.due), 3: label(rec[3].card.due), 4: label(rec[4].card.due) };
}

// The formulas/ideas block of a note, used as the back of a topic flashcard.
export function noteSection(text) {
  if (!text) return null;
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex(l => /^FORMULAS\b/.test(l.trim()));
  if (start < 0) return null;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^(KEY IDEAS|WORKED EXAMPLE|COMMON TRAPS|GATE PATTERN)\b/.test(lines[i].trim())) { end = i; break; }
  }
  const body = lines.slice(start + 1, end).join('\n').trim();
  return body || null;
}

// Mastery-style summary for the Today card.
export function revisionSummary(cards, now = new Date()) {
  const all = [...cards.values()];
  const due = dueCards(cards, now);
  const tomorrow = new Date(now.getTime() + DAY);
  return {
    total: all.length,
    due: due.length,
    dueQuestions: due.filter(c => c.kind === 'question').length,
    dueTopics: due.filter(c => c.kind === 'topic').length,
    dueTomorrow: all.filter(c => c.card.due > now && c.card.due <= tomorrow).length,
  };
}
