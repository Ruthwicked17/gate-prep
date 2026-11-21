import { useState, useEffect, useMemo, useCallback, useRef } from 'preact/hooks';
import katex from 'katex';
import { addEvent, allEvents, fold, exportJson, importJson, requestPersist, importPack, listPacks, removePack } from './store.js';
import { mergeQuestions } from './pack.js';
import { buildCards, dueCards, previews, noteSection, revisionSummary } from './revision.js';
import { composeMock, scoreMock, paletteStatus, timeLeftMs, fmtClock, isAnswered } from './mock.js';
import { orderConcepts, buildPlan, fmt } from './planner.js';
import { checkAnswer } from './scoring.js';

const BASE = import.meta.env.BASE_URL;

// ---- math text: renders $...$ with KaTeX, escapes everything else
function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function Tex({ text }) {
  const html = useMemo(() => String(text).split(/(\$[^$]+\$)/g).map(part => {
    if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
      try { return katex.renderToString(part.slice(1, -1), { throwOnError: false }); } catch { return esc(part); }
    }
    return esc(part);
  }).join(''), [text]);
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function useRoute() {
  const get = () => location.hash.slice(1) || '/';
  const [r, setR] = useState(get());
  useEffect(() => { const h = () => setR(get()); addEventListener('hashchange', h); return () => removeEventListener('hashchange', h); }, []);
  return r;
}

export function App() {
  const route = useRoute();
  const [content, setContent] = useState(null);
  const [state, setState] = useState(null);
  const [error, setError] = useState('');
  const [packs, setPacks] = useState([]);

  const reload = useCallback(async () => setState(fold(await allEvents())), []);
  const reloadPacks = useCallback(async () => setPacks(await listPacks()), []);
  useEffect(() => {
    (async () => {
      try {
        const [syl, qs] = await Promise.all([
          fetch(BASE + 'content/syllabus.json').then(r => r.json()),
          fetch(BASE + 'content/questions.json').then(r => r.json()),
        ]);
        setContent({ syl, questions: qs.questions });
        await reload();
        await reloadPacks();
        requestPersist();
      } catch (e) { setError('Could not load content: ' + e.message); }
    })();
  }, [reload, reloadPacks]);

  // Bundled starter questions + private PYQ packs (pack wins on duplicates).
  const merged = useMemo(() => content && ({ ...content, questions: mergeQuestions(content.questions, packs.flatMap(p => p.questions)) }), [content, packs]);

  const order = useMemo(() => content && state ? orderConcepts(content.syl.concepts, state.settings.papers) : [], [content, state && state.settings.papers.join()]);
  const plan = useMemo(() => {
    if (!state || !order.length) return null;
    return buildPlan({ order, done: state.done, hoursPerDay: Number(state.settings.hoursPerDay) || 4, today: new Date(), examDate: new Date(state.settings.examDate + 'T00:00:00') });
  }, [order, state]);

  // Revision deck: derived by replaying the event log through FSRS (deterministic, merges across devices).
  const cards = useMemo(() => state ? buildCards(state.events, { now: new Date(), examDate: new Date(state.settings.examDate + 'T00:00:00') }) : new Map(), [state]);
  const rev = useMemo(() => revisionSummary(cards), [cards]);

  if (error) return <main><p class="bad">{error}</p></main>;
  if (!content || !state) return <main><p>Loading…</p></main>;

  const ctx = { content: merged, state, order, plan, reload, packs, reloadPacks, cards, rev };
  const [, page, arg, arg2] = route.split('/');
  let view;
  if (page === 'plan') view = <Plan {...ctx} />;
  else if (page === 'topic') view = <Topic {...ctx} id={arg} />;
  else if (page === 'practice') view = <Practice {...ctx} concept={arg} />;
  else if (page === 'review') view = <Review {...ctx} />;
  else if (page === 'mock') view = arg === 'run' ? <MockRun {...ctx} /> : arg === 'result' ? <MockResult {...ctx} id={arg2} /> : <MockHome {...ctx} />;
  else if (page === 'more') view = <More />;
  else if (page === 'mistakes') view = <Mistakes {...ctx} />;
  else if (page === 'settings') view = <Settings {...ctx} />;
  else view = <Today {...ctx} />;

  const tab = (p, label) => <a href={'#/' + p} class={(page || '') === p ? 'on' : ''}>{label}</a>;
  return (<>
    <main>{view}</main>
    {!(page === 'mock' && arg === 'run') && (
      <nav aria-label="Main">{tab('', 'Today')}{tab('plan', 'Plan')}{tab('practice', 'Practice')}{tab('review', rev.due ? `Review (${rev.due})` : 'Review')}{tab('mock', 'Mock')}<a href="#/more" class={['more', 'mistakes', 'settings'].includes(page) ? 'on' : ''}>More</a></nav>)}
  </>);
}

const secName = (ctx, c) => ctx.content.syl.sections[c.sec];
const papersTag = c => <>{c.ee > 0 && <span class="tag">EE {c.ee}</span>}{c.ra > 0 && <span class="tag">RA {c.ra}</span>}{c.ee > 0 && c.ra > 0 && <span class="tag">shared</span>}</>;

// ---- Today: one answer to "what now?"
function Today({ content, state, order, plan, rev }) {
  const next = plan.next;
  const activeMock = activeMockOf(state);
  const doneCount = order.filter(c => state.done.has(c.id)).length;
  const pct = order.length ? Math.round(100 * doneCount / order.length) : 0;
  const days = plan.daysToExam;
  const dueQs = content.questions.filter(q => state.done.has(q.concept) && !state.attempts.some(a => a.qid === q.id)).length;
  const backupAge = state.lastBackup ? Math.floor((Date.now() - state.lastBackup) / 86400000) : null;
  return (<>
    <h1>Today</h1>
    <p class="muted">{days} days to GATE (EE planned {state.settings.examDate}). {plan.status}</p>
    {activeMock && (
      <div class="card">
        <b>{timeLeftMs(activeMock) <= 0 ? 'Time is up on your mock test' : 'Mock test in progress'}</b>
        <div class="muted">{timeLeftMs(activeMock) <= 0 ? 'Open it to submit and see your result.' : fmtClock(timeLeftMs(activeMock)) + ' left. Your answers are saved.'}</div>
        <a href="#/mock/run"><button class="primary" style="margin-top:8px">{timeLeftMs(activeMock) <= 0 ? 'Submit now' : 'Resume mock'}</button></a>
      </div>)}
    {rev.due > 0 && (
      <div class="card">
        <b>Revision due: {rev.due} card{rev.due > 1 ? 's' : ''}</b>
        <div class="muted">{rev.dueTopics} topic recall, {rev.dueQuestions} question{rev.dueQuestions === 1 ? '' : 's'} · about {Math.max(2, Math.round(rev.due * 0.75))} min. Do this first.</div>
        <a href="#/review"><button class="primary" style="margin-top:8px">Review {rev.due} card{rev.due > 1 ? 's' : ''}</button></a>
      </div>)}
    {rev.due === 0 && rev.total > 0 && <p class="muted">Revision: nothing due. {rev.dueTomorrow} card{rev.dueTomorrow === 1 ? '' : 's'} due in the next 24 hours.</p>}
    {next ? (
      <div class="card">
        <div class="muted">Next up · {secName({ content }, next)}</div>
        <h2 style="margin-top:4px">{next.title}</h2>
        <div>{papersTag(next)}<span class="tag">~{next.hours} h</span></div>
        <p class="muted">Study block: 50 min. Read the subtopics, work the practice, tick it off.</p>
        <a href={'#/topic/' + next.id}><button class={rev.due > 0 ? '' : 'primary'} style={rev.due > 0 ? 'width:100%' : ''}>Start: {next.title}, 50 min</button></a>
      </div>
    ) : <div class="card">All topics covered once. Spend today on mocks and revision.</div>}
    <div class="card row"><div><b>Daily GA slot</b><div class="muted">General Aptitude is 15 marks in both papers: 20 min of verbal or numerical practice.</div></div></div>
    <div class="card">
      <div class="row"><b>Syllabus covered</b><span>{pct}%</span></div>
      <div class="bar" role="progressbar" aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100"><i style={`width:${pct}%`} /></div>
      <p class="muted">{doneCount} of {order.length} topics · {dueQs} practice questions waiting from topics you finished.</p>
    </div>
    {(backupAge === null || backupAge >= 1) && <div class="card muted">{backupAge === null ? 'No backup yet.' : `Last backup ${backupAge} day(s) ago.`} <a href="#/settings">Back up now</a></div>}
  </>);
}

// ---- Plan: ordered roadmap
function Plan({ content, state, order, plan }) {
  const dates = new Map(plan.schedule.map(s => [s.concept.id, s.date]));
  return (<>
    <h1>Plan</h1>
    <p class="muted">Order: EE topics by past-year marks per study hour, then RA-only topics. Shared topics are studied once. Weights are {content.syl.meta.eeSource === 'avg' ? 'EE 3-year averages' : ''}; RA weights are a proxy until the official split is published.</p>
    <p>{plan.status}</p>
    <ul class="plain card">
      {order.map(c => (
        <li key={c.id}>
          <a href={'#/topic/' + c.id}><div class="row top">
            <div><span class={state.done.has(c.id) ? 'ok' : ''}>{state.done.has(c.id) ? '✓ ' : ''}{c.title}</span>
              <div class="muted">{secName({ content }, c)} · {c.hours} h</div><div>{papersTag(c)}</div></div>
            <span class="muted">{state.done.has(c.id) ? 'done' : fmt(dates.get(c.id))}</span>
          </div></a>
        </li>))}
    </ul>
  </>);
}

// ---- Topic page + tutor prompt builder
function tutorPrompt(c, mistakes, q) {
  const m = mistakes.filter(x => x.concept === c.id).slice(-5).map(x => '- ' + (x.note || 'wrong answer on question ' + x.qid)).join('\n') || '- (none logged)';
  return `You are a Socratic GATE tutor for the topic "${c.title}" (paper tag: ${[c.ee > 0 && 'EE', c.ra > 0 && 'RA'].filter(Boolean).join('+')}).
Syllabus scope: ${c.sub.join('; ')}.
Rules: ground every claim in the attached textbook PDF and cite it as [book p.N]; if it is not in the source, say "not in source". Show steps. Never state a final numerical value without writing the expression so I can verify it. Ask me one guiding question before giving the full solution.
My recent mistakes on this topic:
${m}
My question: ${q || '(type here)'}`;
}

function Topic({ content, state, reload, id }) {
  const c = content.syl.concepts.find(x => x.id === id);
  const [notes, setNotes] = useState(null);
  const [q, setQ] = useState('');
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    setNotes(null);
    fetch(BASE + `content/notes/${id}.md`).then(r => r.ok ? r.text() : null).then(t => setNotes(t && !t.trim().startsWith('<') ? t : '')).catch(() => setNotes(''));
  }, [id]);
  if (!c) return <p>Unknown topic. <a href="#/plan">Back to plan</a></p>;
  const isDone = state.done.has(id);
  const conf = state.confidence[id];
  const prompt = tutorPrompt(c, state.mistakes, q);
  const hasQs = content.questions.some(x => x.concept === id);
  const set = async (type, payload) => { await addEvent(type, payload); await reload(); };
  return (<>
    <a href="#/plan">← Plan</a>
    <h1>{c.title}</h1>
    <div>{papersTag(c)}<span class="tag">~{c.hours} h</span><span class="tag">{secName({ content }, c)}</span></div>
    <div class="card"><b>Syllabus scope</b><ul>{c.sub.map(s => <li key={s}>{s}</li>)}</ul>
      <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent('NPTEL ' + c.title)}`} target="_blank" rel="noreferrer">Find NPTEL lectures ↗</a></div>
    {notes && <div class="card"><b>Notes</b><div class="notes"><Tex text={notes} /></div></div>}
    {notes === '' && <p class="muted">Generated notes for this topic are not added yet (they are produced offline in Claude Code and dropped into <code>public/content/notes/{id}.md</code>).</p>}
    <div class="card">
      <b>Mark progress</b>
      <div class="chips" style="margin-top:8px">
        <button class={isDone ? 'primary' : ''} style={isDone ? 'width:auto;font-size:1rem' : ''} onClick={() => set('done', { concept: id, value: !isDone })}>{isDone ? '✓ Done (tap to undo)' : 'Mark first pass done'}</button>
        {[1, 2, 3].map(n => <button key={n} aria-pressed={conf === n} class={conf === n ? 'primary' : ''} style={conf === n ? 'width:auto;font-size:1rem' : ''} onClick={() => set('confidence', { concept: id, value: n })}>Confidence {n}</button>)}
      </div>
      {hasQs ? <p><a href={'#/practice/' + id}>Practice this topic →</a></p> : <p class="muted">No practice questions for this topic yet.</p>}
    </div>
    <div class="card">
      <b>Ask tutor</b>
      <p class="muted">Builds a citation-required prompt with your mistake history. Paste it into your chat assistant with the textbook PDF attached. No API key needed.</p>
      <textarea rows="2" placeholder="Your question…" value={q} onInput={e => setQ(e.currentTarget.value)} />
      <pre class="prompt">{prompt}</pre>
      <button onClick={async () => { try { await navigator.clipboard.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} }}>{copied ? 'Copied ✓' : 'Copy prompt'}</button>
    </div>
  </>);
}

// ---- Shared answer inputs (Practice and Review): MCQ radio, MSQ checkbox, NAT numeric
function AnswerInputs({ q, ans, setAns, disabled }) {
  return (<>
    {q.type === 'MCQ' && Object.entries(q.options).map(([k, v]) => (
      <label class="opt" key={k}><input type="radio" name="o" disabled={disabled} checked={ans === k} onChange={() => setAns(k)} /><span><b>{k}.</b> <Tex text={v} /></span></label>))}
    {q.type === 'MSQ' && Object.entries(q.options).map(([k, v]) => (
      <label class="opt" key={k}><input type="checkbox" disabled={disabled} checked={(ans || []).includes(k)} onChange={e => setAns(e.currentTarget.checked ? [...(ans || []), k] : (ans || []).filter(x => x !== k))} /><span><b>{k}.</b> <Tex text={v} /></span></label>))}
    {q.type === 'NAT' && <input type="number" step="any" inputmode="decimal" aria-label="Numerical answer" disabled={disabled} value={ans ?? ''} onInput={e => setAns(e.currentTarget.value)} />}
  </>);
}

// ---- Review: spaced revision queue (topic formula cards + questions you got wrong or answered)
function Review({ content, state, cards, reload }) {
  const [now] = useState(() => new Date());
  const [queue] = useState(() => dueCards(cards, now).filter(e => e.kind === 'topic'
    ? content.syl.concepts.some(c => c.id === e.id)
    : content.questions.some(q => q.id === e.id)).slice(0, 20));
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(false);
  const [ans, setAns] = useState(null);
  const [res, setRes] = useState(null);
  const [note, setNote] = useState(null);
  const entry = queue[i];
  const exam = new Date(state.settings.examDate + 'T00:00:00');
  useEffect(() => {
    setNote(null);
    if (entry && entry.kind === 'topic') {
      fetch(BASE + `content/notes/${entry.id}.md`).then(r => r.ok ? r.text() : '').then(t => setNote(noteSection(t) || '')).catch(() => setNote(''));
    }
  }, [i]);

  if (!entry) {
    const s = revisionSummary(cards);
    return (<>
      <h1>Review</h1>
      <div class="card">{queue.length ? <b>Session complete: {queue.length} card{queue.length > 1 ? 's' : ''} reviewed.</b> : <b>Nothing due right now.</b>}
        <p class="muted">{s.dueTomorrow} card{s.dueTomorrow === 1 ? '' : 's'} due in the next 24 hours. {s.total} in your revision deck.</p>
        <p class="muted">Cards appear here when you mark a topic done (formula card, due the next day) or answer a practice question (it comes back sooner if you got it wrong).</p>
        <a href="#/"><button class="primary">Back to Today</button></a></div>
    </>);
  }

  const advance = () => { setI(i + 1); setShown(false); setAns(null); setRes(null); };
  const rate = async rating => {
    if (entry.kind === 'topic') await addEvent('review', { card: entry.key, rating });
    else {
      const q = content.questions.find(x => x.id === entry.id);
      await addEvent('attempt', { qid: q.id, concept: q.concept, attempted: true, correct: res.correct, marks: res.marks, answer: ans, rating, context: 'review' });
    }
    await reload();
    advance();
  };
  const p = previews(entry, now, exam);
  const RateButtons = ({ ratings }) => (
    <div class="rate" style={`grid-template-columns:repeat(${ratings.length},1fr)`}>
      {ratings.map(([r, label]) => <button key={r} onClick={() => rate(r)}>{label}<br /><span class="muted">{p[r]}</span></button>)}
    </div>);
  const pct = Math.round(100 * i / queue.length);
  const header = (<>
    <h1>Review</h1>
    <p class="muted">Card {i + 1} of {queue.length}</p>
    <div class="bar" role="progressbar" aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100"><i style={`width:${pct}%`} /></div>
  </>);

  if (entry.kind === 'topic') {
    const c = content.syl.concepts.find(x => x.id === entry.id);
    return (<>{header}
      <div class="card">
        <div class="muted">Topic recall · {content.syl.sections[c.sec]}</div>
        <h2 style="margin-top:4px">{c.title}</h2>
        <p>Recall the key formulas and results before you look:</p>
        <ul>{c.sub.map(s => <li key={s}>{s}</li>)}</ul>
        {!shown ? <button class="primary" onClick={() => setShown(true)}>Show answer</button> : (<>
          <div class="notes">{note === null ? 'Loading…' : note ? <Tex text={note} /> : 'No formula section found for this topic.'}</div>
          <p class="muted" style="margin-top:12px">How well did you recall it?</p>
          <RateButtons ratings={[[1, 'Again'], [2, 'Hard'], [3, 'Good'], [4, 'Easy']]} />
        </>)}
      </div>
    </>);
  }

  const q = content.questions.find(x => x.id === entry.id);
  const c = content.syl.concepts.find(x => x.id === q.concept);
  const reveal = () => { const r = checkAnswer(q, ans); setRes(r.attempted ? r : { attempted: true, correct: false, marks: 0 }); };
  return (<>{header}
    <div class="card">
      <div class="muted">{q.source === 'pyq' ? `${q.paper} ${q.year} · ` : ''}{q.type} · {q.marks} mark{q.marks > 1 ? 's' : ''} · {c ? c.title : ''}</div>
      <Figure q={q} />
      <p><Tex text={q.text} /></p>
      <AnswerInputs q={q} ans={ans} setAns={setAns} disabled={!!res} />
      {!res ? (<div class="rate" style="grid-template-columns:2fr 1fr;margin-top:12px"><button class="primary" onClick={reveal}>Check answer</button><button onClick={reveal}>Don't know</button></div>) : (<>
        <p class={res.correct ? 'ok' : 'bad'}><b>{res.correct ? 'Correct' : 'Not correct'}</b></p>
        <p class="muted"><b>Answer:</b> {answerText(q)}</p>
        {q.solution && <p><Tex text={q.solution} /></p>}
        <p class="muted">{res.correct ? 'How hard was it?' : 'This goes back into your revision queue and your mistake log.'}</p>
        <RateButtons ratings={res.correct ? [[2, 'Hard'], [3, 'Good'], [4, 'Easy']] : [[1, 'Again']]} />
      </>)}
    </div>
  </>);
}

// ---- Practice: MCQ / MSQ / NAT
function Practice({ content, state, reload, concept }) {
  const [src, setSrc] = useState('all');
  const hasPyq = content.questions.some(q => q.source === 'pyq');
  const pool = useMemo(() => {
    const base = content.questions.filter(q => (!concept || q.concept === concept) && (src === 'all' || (src === 'pyq') === (q.source === 'pyq')));
    const seen = new Set(state.attempts.map(a => a.qid));
    return [...base.filter(q => !seen.has(q.id)), ...base.filter(q => seen.has(q.id))];
  }, [concept, content, src]);
  const [i, setI] = useState(0);
  const [ans, setAns] = useState(null);
  const [res, setRes] = useState(null);
  const q = pool[i];
  const pickSrc = s => { setSrc(s); setI(0); setAns(null); setRes(null); };
  const filter = hasPyq ? (
    <div class="chips" role="group" aria-label="Question source" style="margin:8px 0">
      {[['all', 'All'], ['pyq', 'Previous-year'], ['practice', 'Practice']].map(([k, l]) => <button key={k} aria-pressed={src === k} class={src === k ? 'primary' : ''} style={src === k ? 'width:auto;font-size:1rem' : ''} onClick={() => pickSrc(k)}>{l}</button>)}
    </div>) : null;
  if (!pool.length) return <><h1>Practice</h1>{filter}<p class="muted">No questions {src === 'pyq' ? 'from previous-year papers ' : ''}yet{concept ? ' for this topic' : ''}. Import your PYQ pack under Backup &gt; Question packs (see tools/pyq/README.md).</p></>;
  if (!q) return <><h1>Practice</h1>{filter}<p>Set finished.</p><button onClick={() => { setI(0); setAns(null); setRes(null); }}>Restart</button></>;
  const submit = async () => {
    const r = checkAnswer(q, ans);
    setRes(r);
    await addEvent('attempt', { qid: q.id, concept: q.concept, attempted: r.attempted, correct: r.correct, marks: r.marks, answer: ans });
    await reload();
  };
  const next = () => { setI(i + 1); setAns(null); setRes(null); };
  const c = content.syl.concepts.find(x => x.id === q.concept);
  return (<>
    <h1>Practice</h1>
    {filter}
    <p class="muted">Question {i + 1} of {pool.length} · {q.source === 'pyq' ? `${q.paper} ${q.year} · ` : ''}{q.type} · {q.marks} mark{q.marks > 1 ? 's' : ''} · {c ? c.title : ''}{q.verified ? '' : ' · unverified'}</p>
    <div class="card">
      <Figure q={q} />
      <p><Tex text={q.text} /></p>
      <AnswerInputs q={q} ans={ans} setAns={setAns} disabled={!!res} />
      {!res ? <button class="primary" style="margin-top:12px" onClick={submit}>Submit</button> : (<>
        <p class={res.correct ? 'ok' : 'bad'}><b>{!res.attempted ? 'Not attempted' : res.correct ? 'Correct' : 'Wrong'}</b> · {res.marks > 0 ? '+' : ''}{res.marks.toFixed(2)} marks{!res.correct && res.attempted ? ' · added to your mistake log' : ''}</p>
        <p class="muted"><b>Answer:</b> {answerText(q)}</p>
        {q.solution && <p><Tex text={q.solution} /></p>}
        <button class="primary" onClick={next}>Next</button></>)}
    </div>
  </>);
}

// ---- More: secondary pages
function More() {
  return (<>
    <h1>More</h1>
    <ul class="plain card">
      <li><a href="#/mistakes">Mistake log</a><div class="muted">Wrong answers from practice, review and mocks.</div></li>
      <li><a href="#/settings">Backup, question packs and settings</a><div class="muted">Download a backup, import PYQ packs, set exam date and hours.</div></li>
    </ul>
  </>);
}

// Original paper page for questions whose figure or formula did not copy over (pictures live in the private pack).
function Figure({ q }) {
  if (!q.figurePage) return null;
  if (q.figure) return <details class="fig" open><summary>Original paper, page {q.figurePage}</summary><img src={q.figure} alt={`Page ${q.figurePage} of the original ${q.year} paper, showing the figure for this question`} /><p class="muted">The page may also show neighbouring questions.</p></details>;
  return <p class="warn">This question may include a figure or formula that did not copy over. Check page {q.figurePage} of the original paper.</p>;
}

// ---- Mock tests: timed, GATE-style marking, results feed the mistake log and revision queue
const sectionOfFn = content => q => { const c = content.syl.concepts.find(x => x.id === q.concept); return c ? content.syl.sections[c.sec] : 'Other'; };
const activeMockOf = state => [...state.mocks.values()].filter(m => !m.submittedAt).sort((a, b) => b.startedAt - a.startedAt)[0];
const fmtAns = a => (Array.isArray(a) ? a.join(', ') : String(a));
// What the official key accepts: MCQ may allow a second option, NAT is a range (or several ranges).
const num = v => String(Math.round(v * 1e6) / 1e6);
const natRange = (a, tol) => (tol > 0 ? `${num(a - tol)} to ${num(a + tol)}` : num(a));
function answerText(q) {
  if (q.type === 'NAT') return [natRange(q.answer, q.tol ?? 0), ...(q.alts || []).map(r => natRange(r.answer, r.tol ?? 0))].join(' or ');
  if (q.type === 'MCQ' && q.alts && q.alts.length) return [q.answer, ...q.alts].join(' or ');
  return fmtAns(q.answer);
}

function Spark({ values }) {
  const W = 300, H = 90, pad = 8;
  const pts = values.map((v, i) => [pad + (values.length === 1 ? (W - 2 * pad) / 2 : (i * (W - 2 * pad)) / (values.length - 1)), H - pad - (Math.max(0, Math.min(100, v)) / 100) * (H - 2 * pad)]);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Mock score trend: ${values.map(v => Math.round(v) + ' percent').join(', ')}`} style="width:100%;max-width:360px;height:auto">
      <line x1={pad} x2={W - pad} y1={H - pad} y2={H - pad} stroke="var(--line)" />
      <polyline fill="none" stroke="var(--accent)" stroke-width="2" points={pts.map(p => p.join(',')).join(' ')} />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill="var(--accent)" />)}
    </svg>);
}

function MockHome({ content, state, reload }) {
  const active = activeMockOf(state);
  const [paper, setPaper] = useState(state.settings.papers[0] || 'EE');
  const [source, setSource] = useState('all');
  const [count, setCount] = useState(65);
  const [seed] = useState(() => Date.now() % 100000);
  const used = useMemo(() => new Set([...state.mocks.values()].flatMap(m => m.qids)), [state.mocks]);
  const plan = useMemo(() => composeMock({ questions: content.questions, concepts: content.syl.concepts, paper, count: Math.max(1, Number(count) || 1), source, usedIds: used, seed }), [content, paper, source, count, used, seed]);
  const done = useMemo(() => [...state.mocks.values()].filter(m => m.submittedAt).sort((a, b) => a.submittedAt - b.submittedAt), [state.mocks]);
  const scored = useMemo(() => done.map(m => ({ m, r: scoreMock(content.questions, m.qids, m.answers, sectionOfFn(content)) })), [done, content]);
  const pcts = scored.map(({ r }) => (r.max ? (100 * r.score) / r.max : 0));
  const start = async () => {
    if (!plan.qids.length) return;
    const id = 'mock-' + Date.now().toString(36);
    await addEvent('mock-start', { id, qids: plan.qids, durationMin: plan.durationMin, paper, maxMarks: plan.marks });
    await reload();
    location.hash = '#/mock/run';
  };
  const expired = active && timeLeftMs(active) <= 0;
  return (<>
    <h1>Mock tests</h1>
    {active ? (
      <div class="card">
        <b>{expired ? 'Time is up on your mock' : 'Mock test in progress'}</b>
        <div class="muted">{active.qids.length} questions · {expired ? 'open it to submit' : fmtClock(timeLeftMs(active)) + ' left'}</div>
        <a href="#/mock/run"><button class="primary" style="margin-top:8px">{expired ? 'Submit now' : 'Resume mock'}</button></a>
      </div>
    ) : (
      <div class="card">
        <b>Start a mock</b>
        <label for="mpaper" style="display:block;margin-top:8px">Paper</label>
        <select id="mpaper" value={paper} onChange={e => setPaper(e.currentTarget.value)}><option value="EE">EE</option><option value="RA">RA</option><option value="any">Both papers (any topic)</option></select>
        <label for="msrc" style="display:block;margin-top:8px">Questions from</label>
        <select id="msrc" value={source} onChange={e => setSource(e.currentTarget.value)}><option value="all">All questions</option><option value="pyq">Previous-year papers only</option><option value="practice">Practice questions only</option></select>
        <label for="mcount" style="display:block;margin-top:8px">Number of questions</label>
        <div class="row"><input id="mcount" type="number" min="1" max="65" value={count} onInput={e => setCount(e.currentTarget.value)} /><button style="white-space:nowrap" onClick={() => setCount(65)}>Full paper (65)</button></div>
        <p>{plan.qids.length} questions · {plan.marks} marks · <b>{plan.durationMin} min</b></p>
        <p class="muted">{plan.available} question{plan.available === 1 ? '' : 's'} in your bank match{plan.withFigure ? ` (${plan.withFigure} that depend on a figure are left out of mocks; you can still practise them)` : ''}. Time is 1.8 min per mark, as in GATE (180 min for 100 marks). Topics are sampled by their mark weight, and questions from earlier mocks are avoided where possible.</p>
        {plan.available < 65 && <p class="warn">Your bank has only {plan.available} matching questions, so this is a short mock. Import previous-year packs under More &gt; Backup &gt; Question packs for a full 65-question paper.</p>}
        <p class="muted">Marking: MCQ loses 1/3 (1-mark) or 2/3 (2-mark) for a wrong answer; MSQ needs every correct option and has no negative marking; NAT has none.</p>
        <button class="primary" disabled={!plan.qids.length} onClick={start}>Start mock ({plan.durationMin} min)</button>
      </div>
    )}
    {scored.length > 0 && <div class="card">
      <b style="display:block;margin-bottom:4px">Score trend</b>
      {pcts.length > 1 && <Spark values={pcts} />}
      {pcts.length > 1 && <p class="muted">Latest {Math.round(pcts[pcts.length - 1])}% vs previous {Math.round(pcts[pcts.length - 2])}% ({pcts[pcts.length - 1] - pcts[pcts.length - 2] >= 0 ? '+' : ''}{Math.round(pcts[pcts.length - 1] - pcts[pcts.length - 2])} points).</p>}
      <table class="t"><thead><tr><th>Date</th><th>Paper</th><th class="n">Score</th><th class="n">%</th><th></th></tr></thead>
        <tbody>{[...scored].reverse().map(({ m, r }) => (
          <tr key={m.id}><td>{new Date(m.submittedAt).toLocaleDateString()}</td><td>{m.paper === 'any' ? 'Both' : m.paper}</td><td class="n">{r.score.toFixed(2)} / {r.max}</td><td class="n">{r.max ? Math.round((100 * r.score) / r.max) : 0}</td><td class="n"><a href={'#/mock/result/' + m.id}>Details</a></td></tr>))}</tbody></table>
    </div>}
  </>);
}

function MockRun({ content, state, reload }) {
  const active = activeMockOf(state);
  const [answers, setAnswers] = useState(() => (active ? { ...active.answers } : {}));
  const [marked, setMarked] = useState(() => (active ? { ...active.marked } : {}));
  const [visited, setVisited] = useState(() => (active ? { ...active.visited } : {}));
  const [cur, setCur] = useState(() => (active ? active.cur || 0 : 0));
  const [now, setNow] = useState(Date.now());
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const submitting = useRef(false);
  const byId = useMemo(() => new Map(content.questions.map(q => [q.id, q])), [content]);
  const qs = active ? active.qids.map(id => byId.get(id)).filter(Boolean) : [];
  const q = qs[Math.min(cur, qs.length - 1)];

  const submit = async auto => {
    if (submitting.current || !active) return;
    submitting.current = true; setBusy(true);
    const res = scoreMock(content.questions, active.qids, answers, sectionOfFn(content));
    // Results feed the mistake log and the revision queue like any other attempt.
    for (const it of res.items) {
      if (it.r.attempted) await addEvent('attempt', { qid: it.qid, concept: it.q.concept, attempted: true, correct: it.r.correct, marks: it.r.marks, answer: it.answer, context: 'mock', mock: active.id });
    }
    const usedSec = Math.min(Math.round((Date.now() - active.startedAt) / 1000), active.durationMin * 60);
    await addEvent('mock-submit', { id: active.id, answers, marked, timeUsedSec: usedSec, auto: !!auto });
    await reload();
    location.hash = '#/mock/result/' + active.id;
  };

  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  useEffect(() => { if (active && timeLeftMs(active, now) <= 0) submit(true); }, [now]);
  useEffect(() => { if (q) setVisited(v => (v[q.id] ? v : { ...v, [q.id]: true })); }, []);
  // Progress is saved shortly after each change so a reload or crash resumes where you were.
  useEffect(() => {
    if (!active || submitting.current) return;
    const t = setTimeout(() => addEvent('mock-save', { id: active.id, answers, marked, visited, cur }), 1500);
    return () => clearTimeout(t);
  }, [answers, marked, visited, cur]);

  if (!active) return <><h1>Mock test</h1><p>No mock is running. <a href="#/mock">Start one</a></p></>;
  if (!q) return <><h1>Mock test</h1><p class="warn">The questions for this mock are no longer available (a question pack was removed). <a href="#/mock">Back</a></p></>;

  const left = timeLeftMs(active, now);
  const go = i => { const n = Math.max(0, Math.min(qs.length - 1, i)); setVisited(v => ({ ...v, [qs[n].id]: true })); setCur(n); setConfirm(false); };
  const setAns = v => setAnswers(a => ({ ...a, [q.id]: v }));
  const clear = () => setAnswers(a => { const n = { ...a }; delete n[q.id]; return n; });
  const saveNext = () => { setMarked(m => ({ ...m, [q.id]: false })); go(cur + 1); };
  const markNext = () => { setMarked(m => ({ ...m, [q.id]: true })); go(cur + 1); };
  const answeredN = qs.filter(x => isAnswered(answers[x.id])).length;
  const markedN = qs.filter(x => marked[x.id]).length;
  const label = { 'answered': 'answered', 'answered-marked': 'answered and marked for review', 'marked': 'marked for review', 'not-answered': 'not answered', 'not-visited': 'not visited' };
  const st = { answers, marked, visited };
  return (<>
    <div class="mockbar">
      <b>Question {cur + 1} of {qs.length}</b>
      <span class={'timer' + (left < 600000 ? ' low' : '')} role="timer" aria-label="Time left">{fmtClock(left)}</span>
      <button onClick={() => setConfirm(true)} disabled={busy}>Submit</button>
    </div>
    {confirm && (
      <div class="card" role="alertdialog" aria-label="Confirm submit">
        <b>Submit the test?</b>
        <p>{answeredN} answered · {qs.length - answeredN} not answered · {markedN} marked for review.</p>
        <p class="muted">You cannot change answers after submitting.</p>
        <div class="rate" style="grid-template-columns:1fr 1fr"><button class="primary" disabled={busy} onClick={() => submit(false)}>Yes, submit</button><button onClick={() => setConfirm(false)}>Keep working</button></div>
      </div>)}
    <div class="muted" style="margin-top:8px">{q.marks} mark{q.marks > 1 ? 's' : ''} · {q.type}{q.type === 'MCQ' ? (q.marks === 1 ? ' · −1/3 if wrong' : ' · −2/3 if wrong') : q.type === 'MSQ' ? ' · select all correct options, no negative marking' : ' · numerical answer, no negative marking'}</div>
    <div class="card">
      <Figure q={q} />
      <p><Tex text={q.text} /></p>
      <AnswerInputs q={q} ans={answers[q.id]} setAns={setAns} disabled={busy} />
    </div>
    <div class="rate" style="grid-template-columns:1fr 1fr">
      <button class="primary" onClick={saveNext}>Save &amp; Next</button>
      <button onClick={markNext}>Mark for review &amp; Next</button>
      <button onClick={clear}>Clear response</button>
      <button onClick={() => go(cur - 1)} disabled={cur === 0}>Previous</button>
    </div>
    <div class="card">
      <b>Question palette</b>
      <div class="pal" role="group" aria-label="Question palette">
        {qs.map((x, i) => { const s = paletteStatus(x.id, st); return <button key={x.id} class={s + (i === cur ? ' cur' : '')} aria-label={`Question ${i + 1}: ${label[s]}`} aria-current={i === cur ? 'true' : undefined} onClick={() => go(i)}>{i + 1}</button>; })}
      </div>
      <div class="legend"><span><i style="background:var(--ok)" />Answered</span><span><i style="background:var(--bad)" />Not answered</span><span><i style="background:var(--mark)" />Marked</span><span><i style="border:2px solid var(--mark);background:var(--ok)" />Answered and marked</span><span><i style="border:1px solid var(--line)" />Not visited</span></div>
    </div>
  </>);
}

function MockResult({ content, state, id }) {
  const m = state.mocks.get(id);
  const res = useMemo(() => (m && m.submittedAt ? scoreMock(content.questions, m.qids, m.answers, sectionOfFn(content)) : null), [m, content]);
  if (!m || !res) return <><h1>Result</h1><p>No finished mock found. <a href="#/mock">Back to mocks</a></p></>;
  const pct = res.max ? (100 * res.score) / res.max : 0;
  const secs = Object.entries(res.bySection).map(([name, s]) => ({ name, ...s, pct: s.max ? (100 * s.score) / s.max : 0 })).sort((a, b) => a.pct - b.pct);
  // Weakest = lowest-scoring section among those you actually attempted (skipped sections are a different problem).
  const weakest = secs.find(s => s.attempted > 0 && s.pct < 100);
  const used = m.timeUsedSec != null ? (m.timeUsedSec < 60 ? 'under 1' : String(Math.round(m.timeUsedSec / 60))) : null;
  const cname = cid => (content.syl.concepts.find(c => c.id === cid) || {}).title || cid;
  return (<>
    <a href="#/mock">← Mock tests</a>
    <h1>Result</h1>
    <div class="card">
      <div style="font-size:1.8rem;font-weight:700">{res.score.toFixed(2)} <span class="muted" style="font-size:1rem">/ {res.max} marks ({Math.round(pct)}%)</span></div>
      <p>{res.correct} correct · {res.wrong} wrong · {res.unattempted} not attempted{used != null ? ` · ${used} of ${m.durationMin} min used` : ''}{m.auto ? ' (auto-submitted when time ended)' : ''}</p>
      {res.attempted > 0 && <p class="muted">Accuracy on attempted questions: {Math.round((100 * res.correct) / res.attempted)}%.{res.negative > 0 ? ` Negative marking cost you ${res.negative.toFixed(2)} marks.` : ''}</p>}
      {res.wrong > 0 && <p class="muted">Your {res.wrong} wrong answer{res.wrong > 1 ? 's' : ''} {res.wrong > 1 ? 'are' : 'is'} in the mistake log and will come back in Review tomorrow.</p>}
      {weakest && secs.length > 1 && <p>Lowest-scoring section you attempted: <b>{weakest.name}</b> ({Math.round(weakest.pct)}%). Revisit it in the <a href="#/plan">plan</a>.</p>}
      {res.unattempted > res.attempted && <p class="muted">You left {res.unattempted} of {res.attempted + res.unattempted} questions unattempted. Open the list below to see how each one is solved.</p>}
    </div>
    <div class="card">
      <b>By section</b>
      <table class="t"><thead><tr><th>Section</th><th class="n">Score</th><th class="n">Correct</th><th class="n">Attempted</th></tr></thead>
        <tbody>{secs.map(s => <tr key={s.name}><td>{s.name}</td><td class="n">{s.score.toFixed(2)} / {s.max}</td><td class="n">{s.correct}/{s.total}</td><td class="n">{s.attempted}/{s.total}</td></tr>)}</tbody></table>
    </div>
    <div class="card">
      <b>Questions</b>
      {res.items.map((it, i) => (
        <details class="q" key={it.qid}>
          <summary><b>Q{i + 1}</b> · {!it.r.attempted ? 'Skipped' : it.r.correct ? 'Correct' : 'Wrong'} · {cname(it.q.concept)} · {it.r.marks > 0 ? '+' : ''}{it.r.marks.toFixed(2)} / {it.q.marks}</summary>
          <p><Tex text={it.q.text} /></p>
          <p class="muted">Your answer: {it.r.attempted ? fmtAns(it.answer) : 'none'} · Correct: {answerText(it.q)}</p>
          {it.q.solution && <p><Tex text={it.q.solution} /></p>}
        </details>))}
    </div>
  </>);
}

// ---- Mistake log
function Mistakes({ content, state, reload }) {
  const [concept, setConcept] = useState('');
  const [note, setNote] = useState('');
  const name = id => (content.syl.concepts.find(c => c.id === id) || {}).title || id;
  const list = [...state.mistakes].reverse();
  const add = async () => { if (!concept || !note.trim()) return; await addEvent('mistake', { concept, note: note.trim() }); setNote(''); await reload(); };
  return (<>
    <h1>Mistake log</h1>
    <p class="muted">Wrong answers in practice land here automatically. Add your own from mocks or books.</p>
    <div class="card">
      <select aria-label="Topic" value={concept} onChange={e => setConcept(e.currentTarget.value)}><option value="">Choose topic…</option>{content.syl.concepts.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}</select>
      <textarea rows="2" style="margin-top:8px" placeholder="What went wrong? (concept gap, formula, silly slip…)" value={note} onInput={e => setNote(e.currentTarget.value)} />
      <button style="margin-top:8px" onClick={add}>Add entry</button>
    </div>
    <ul class="plain card">{list.length ? list.map(m => (
      <li key={m.id}><b>{name(m.concept)}</b> <span class="tag">{m.auto ? 'auto' : 'manual'}</span><div class="muted">{new Date(m.ts).toLocaleDateString()} · {m.note || `question ${m.qid}`}</div></li>)) : <li class="muted">Nothing logged yet.</li>}</ul>
  </>);
}

// ---- Settings + backup
function Settings({ state, reload, content, packs, reloadPacks }) {
  const s = state.settings;
  const [msg, setMsg] = useState('');
  const [packMsg, setPackMsg] = useState('');
  const doPack = async e => {
    const f = e.currentTarget.files[0]; if (!f) return;
    try {
      const r = await importPack(await f.text(), f.name, content.syl.concepts.map(c => c.id));
      setPackMsg(`Imported ${r.added} questions.${r.invalid ? ` ${r.invalid} invalid skipped.` : ''}${r.unknownConcept ? ` ${r.unknownConcept} with unknown topics skipped.` : ''}`);
      await reloadPacks();
    } catch (err) { setPackMsg('Import failed: ' + err.message); }
    e.currentTarget.value = '';
  };
  const dropPack = async id => { await removePack(id); await reloadPacks(); setPackMsg('Pack removed.'); };
  const upd = async patch => { await addEvent('settings', patch); await reload(); };
  const togglePaper = p => { const has = s.papers.includes(p); const papers = has ? s.papers.filter(x => x !== p) : [...s.papers, p].sort((a, b) => (a === 'EE' ? -1 : 1)); if (papers.length) upd({ papers }); };
  const doExport = async () => {
    const text = await exportJson();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
    a.download = `gate-prep-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click(); setMsg('Backup downloaded. Keep it in a synced folder (OneDrive/Drive).'); await reload();
  };
  const doImport = async e => {
    const f = e.currentTarget.files[0]; if (!f) return;
    try { const n = await importJson(await f.text()); setMsg(`Imported. ${n} new events merged.`); await reload(); } catch (err) { setMsg('Import failed: ' + err.message); }
  };
  return (<>
    <h1>Backup and settings</h1>
    <div class="card">
      <b>Backup</b>
      <p class="muted">{state.lastBackup ? 'Last backup: ' + new Date(state.lastBackup).toLocaleString() : 'No backup yet.'} Your progress lives only in this browser, so download a backup regularly. Importing merges safely and never overwrites.</p>
      <button onClick={doExport}>Download backup</button>
      <div style="margin-top:12px"><label>Restore / merge from file <input type="file" accept="application/json" onChange={doImport} /></label></div>
      {msg && <p role="status">{msg}</p>}
    </div>
    <div class="card">
      <b>Question packs (previous-year papers)</b>
      <p class="muted">Built on your computer with tools/pyq. Packs stay in this browser only and are not in backups or the deployed site, so keep your pack file safe and re-import it if browser data is cleared. Your attempts are in backups either way.</p>
      <ul class="plain">{packs.length ? packs.map(p => <li key={p.id} class="row"><span>{p.name} · {p.questions.length} questions</span><button onClick={() => dropPack(p.id)}>Remove</button></li>) : <li class="muted">No packs imported.</li>}</ul>
      <label>Import pack file <input type="file" accept="application/json" onChange={doPack} /></label>
      {packMsg && <p role="status">{packMsg}</p>}
    </div>
    <div class="card">
      <b>Study settings</b>
      <label>Papers</label>
      <div class="chips">{['EE', 'RA'].map(p => <button key={p} aria-pressed={s.papers.includes(p)} class={s.papers.includes(p) ? 'primary' : ''} style={s.papers.includes(p) ? 'width:auto;font-size:1rem' : ''} onClick={() => togglePaper(p)}>{p === 'RA' ? 'RA (Part B1)' : p}</button>)}</div>
      <p class="muted">First selected paper is the priority. EE is always ordered first.</p>
      <label for="exam">Exam date (verify when IIT Madras publishes the paper-wise schedule)</label>
      <input id="exam" type="date" value={s.examDate} onChange={e => upd({ examDate: e.currentTarget.value })} />
      <label for="hpd" style="display:block;margin-top:8px">Study hours per day</label>
      <input id="hpd" type="number" min="1" max="12" step="0.5" value={s.hoursPerDay} onChange={e => upd({ hoursPerDay: Number(e.currentTarget.value) })} />
    </div>
  </>);
}
