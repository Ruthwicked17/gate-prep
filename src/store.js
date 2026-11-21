// Append-only event log in IndexedDB. State is derived by folding events.
// Merging devices = union by event id, so restores/imports never lose attempts.
import Dexie from 'dexie';
import { checkPackShape } from './pack.js';
import { foldMocks } from './mock.js';

export const db = new Dexie('gate-prep');
db.version(1).stores({ events: 'id, ts, type' });
// v2: private question packs (imported from a local file, never part of the deployed bundle)
db.version(2).stores({ events: 'id, ts, type', packs: 'id' });

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

export async function addEvent(type, payload = {}) {
  const ev = { id: uid(), ts: Date.now(), type, payload };
  await db.events.put(ev);
  return ev;
}
export const allEvents = () => db.events.orderBy('ts').toArray();

export function fold(events) {
  const s = {
    settings: { papers: ['EE', 'RA'], examDate: '2027-02-06', hoursPerDay: 4 },
    done: new Set(), confidence: {}, attempts: [], mistakes: [], lastBackup: null,
    events, // kept so revision cards can be derived by replaying the log
    mocks: foldMocks(events),
  };
  for (const e of events) {
    const p = e.payload;
    if (e.type === 'settings') s.settings = { ...s.settings, ...p };
    else if (e.type === 'done') { p.value ? s.done.add(p.concept) : s.done.delete(p.concept); }
    else if (e.type === 'confidence') s.confidence[p.concept] = p.value;
    else if (e.type === 'attempt') {
      s.attempts.push({ ...p, ts: e.ts, id: e.id });
      if (p.attempted && !p.correct) s.mistakes.push({ id: e.id, ts: e.ts, concept: p.concept, qid: p.qid, note: p.note || '', auto: true });
    } else if (e.type === 'mistake') s.mistakes.push({ id: e.id, ts: e.ts, concept: p.concept, qid: null, note: p.note, auto: false });
    else if (e.type === 'backup') s.lastBackup = e.ts;
  }
  return s;
}

export async function exportJson() {
  const events = await allEvents();
  await addEvent('backup', {});
  return JSON.stringify({ app: 'gate-prep', version: 1, exportedAt: new Date().toISOString(), events }, null, 1);
}

export async function importJson(text) {
  const data = JSON.parse(text);
  if (data.app !== 'gate-prep' || !Array.isArray(data.events)) throw new Error('Not a GATE Prep backup file');
  const before = await db.events.count();
  await db.events.bulkPut(data.events);
  return (await db.events.count()) - before;
}

// ---- Private question packs (PYQs). Stored only in this browser; not included in backups by design.
export async function importPack(text, name, conceptIds) {
  const data = JSON.parse(text);
  const { valid, bad } = checkPackShape(data);
  const known = new Set(conceptIds);
  const ok = valid.filter(q => known.has(q.concept));
  const unknown = valid.length - ok.length;
  if (!ok.length) throw new Error('No usable questions in this pack' + (bad.length ? ` (${bad.length} invalid)` : ''));
  const id = 'pack-' + (data.built || Date.now());
  // A rebuilt pack replaces any older pack it fully covers, so improved copies (e.g. with figures) are not shadowed.
  const ids = new Set(ok.map(q => q.id));
  for (const old of await db.packs.toArray()) if (old.id !== id && old.questions.every(q => ids.has(q.id))) await db.packs.delete(old.id);
  await db.packs.put({ id, name: name || 'question pack', importedAt: Date.now(), questions: ok });
  return { added: ok.length, invalid: bad.length, unknownConcept: unknown };
}
export const listPacks = () => db.packs.toArray();
export const removePack = id => db.packs.delete(id);

export async function requestPersist() {
  try { return await navigator.storage?.persist?.(); } catch { return false; }
}
