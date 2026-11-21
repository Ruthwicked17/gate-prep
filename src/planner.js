// Planner: stable, progress-independent ordering. EE-first by marks per study hour,
// prerequisites respected, RA-only topics after EE content (user priority: EE, then RA).

export function includeConcept(c, papers) {
  return papers.some(p => (c[p.toLowerCase()] || 0) > 0);
}

export function orderConcepts(concepts, papers = ['EE', 'RA']) {
  const list = concepts.filter(c => includeConcept(c, papers));
  const primary = papers[0].toLowerCase();
  const secondary = papers[1] ? papers[1].toLowerCase() : null;
  const ids = new Set(list.map(c => c.id));
  // Foundation bonus: topics that unlock many later topics come earlier (matters for a fresh learner).
  const children = new Map(list.map(c => [c.id, []]));
  for (const c of list) for (const p of c.pre) if (children.has(p)) children.get(p).push(c.id);
  const descCache = new Map();
  const desc = id => {
    if (descCache.has(id)) return descCache.get(id);
    const seen = new Set();
    const walk = x => { for (const k of children.get(x) || []) if (!seen.has(k)) { seen.add(k); walk(k); } };
    walk(id);
    descCache.set(id, seen.size);
    return seen.size;
  };
  const score = c => {
    const tier = c[primary] > 0 ? 1000 : 0;
    const w = c[primary] + (secondary ? 0.1 * c[secondary] : 0);
    return tier + w / c.hours + 0.03 * desc(c.id);
  };
  const placed = new Set();
  const out = [];
  const pool = [...list];
  while (pool.length) {
    let avail = pool.filter(c => c.pre.filter(p => ids.has(p)).every(p => placed.has(p)));
    if (!avail.length) avail = pool; // defensive: break cycles
    avail.sort((a, b) => score(b) - score(a) || a.id.localeCompare(b.id));
    const next = avail[0];
    out.push(next);
    placed.add(next.id);
    pool.splice(pool.indexOf(next), 1);
  }
  return out;
}

const DAY = 86400000;
export function daysBetween(from, to) {
  const a = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const b = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((b - a) / DAY);
}

export function buildPlan({ order, done = new Set(), hoursPerDay, today, examDate, buffer = 14 }) {
  const remaining = order.filter(c => !done.has(c.id));
  const remainingHours = remaining.reduce((s, c) => s + c.hours, 0);
  const daysToExam = Math.max(0, daysBetween(today, examDate));
  const daysAvail = Math.max(0, daysToExam - buffer);
  const daysNeeded = Math.ceil(remainingHours / Math.max(0.5, hoursPerDay));
  let cum = 0;
  const schedule = remaining.map(c => {
    cum += c.hours;
    const dayIdx = Math.max(0, Math.ceil(cum / hoursPerDay) - 1);
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayIdx);
    return { concept: c, date };
  });
  let status;
  if (!remaining.length) status = 'First pass complete. Time for revision and mocks.';
  else if (daysNeeded <= daysAvail) {
    const finish = schedule[schedule.length - 1].date;
    status = `On pace: first pass done by ${fmt(finish)}, ${daysAvail - daysNeeded} spare days before revision.`;
  } else {
    const need = daysAvail > 0 ? Math.ceil((remainingHours / daysAvail) * 10) / 10 : null;
    status = need
      ? `Plan adjusted: the full first pass needs ${need} h/day to finish ${buffer} days before the exam.`
      : 'Exam is very close: focus on highest-weight remaining topics.';
  }
  return { schedule, remainingHours, daysToExam, daysAvail, daysNeeded, status, next: remaining[0] || null };
}

export function fmt(d) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
