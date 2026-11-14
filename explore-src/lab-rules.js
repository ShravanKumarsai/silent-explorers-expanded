import { SCENARIOS, STATIONS, DIFFICULTIES, readings } from "./lab-data.js";
const LAB_KEY = "silent-explorers-laboratory-v1";
function newLab(difficulty = 1, caseId = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)].id) {
  difficulty = DIFFICULTIES[difficulty] ? difficulty : 1;
  return { version: 1, difficulty, caseId: SCENARIOS.some((c) => c.id === caseId) ? caseId : SCENARIOS[0].id, phase: "arrival", portions: DIFFICULTIES[difficulty].portions, collected: false, stations: Object.fromEntries(Object.keys(STATIONS).map((id) => [id, { stage: "empty", sample: false, control: false, remaining: 0, runs: 0, inspected: false, compared: false, recorded: false, data: null }])), report: null };
}
function restoreLab(raw, difficulty) {
  try {
    const x = JSON.parse(raw);
    if (x?.version !== 1 || typeof x.collected !== "boolean" || x.difficulty !== difficulty || !SCENARIOS.some((c) => c.id === x.caseId) || !["arrival", "investigate", "complete"].includes(x.phase) || !Number.isInteger(x.portions) || x.portions < 0 || x.portions > DIFFICULTIES[difficulty].portions) return newLab(difficulty);
    for (const id of Object.keys(STATIONS)) {
      const s = x.stations?.[id];
      if (!s || !["inspected", "compared", "recorded"].every((k) => typeof s[k] === "boolean") || !["empty", "closed", "running", "ready", "recorded"].includes(s.stage) || !Number.isInteger(s.runs) || s.runs < 0 || s.runs > 4 || typeof s.sample !== "boolean" || typeof s.control !== "boolean" || s.stage !== "empty" && (!s.sample || !s.control)) return newLab(difficulty);
      if (!Number.isFinite(s.remaining) || s.remaining < 0 || s.remaining > DIFFICULTIES[difficulty].duration || ["ready", "recorded"].includes(s.stage) && s.runs === 0 || s.recorded !== (s.stage === "recorded") || s.recorded && (!s.compared || !s.inspected)) return newLab(difficulty);
      if (s.runs > 0) s.data = readings(x.caseId, difficulty, id, s.runs - 1);
      if (s.stage === "running") {
        s.stage = "closed";
        s.remaining = 0;
      }
    }
    if (x.phase === "complete") {
      if (!x.report?.report) return newLab(difficulty);
      const checked = evaluateReport(x, x.report.report);
      if (checked.error) return newLab(difficulty);
      x.report = checked;
    }
    return x;
  } catch {
    return newLab(difficulty);
  }
}
function labAction(state, id, action) {
  const s = structuredClone(state), t = s.stations[id];
  if (s.phase === "complete") return { state, message: "This case is complete. Start a new case to continue." };
  if (action === "arrive") {
    s.phase = "investigate";
    return { state: s, message: "Dr. Rao: Receive the sealed sample at the intake bench. Keep every control separate." };
  }
  if (s.phase !== "investigate") return { state, message: "Read the arrival briefing first." };
  if (action === "collect") {
    s.collected = true;
    return { state: s, message: "Chain of custody recorded. Soil aliquots and separate control vessels are ready." };
  }
  if (!t) return { state, message: "Choose an instrument." };
  if (!s.collected) return { state, message: "Receive the sealed sample at intake before loading instruments." };
  if (action === "sample" && t.stage === "empty" && !t.sample) {
    if (s.portions <= 0) return { state, message: "No soil portions remain. Review your recorded evidence." };
    s.portions--;
    t.sample = true;
  } else if (action === "control" && t.stage === "empty" && !t.control) t.control = true;
  else if (action === "close" && t.stage === "empty" && t.sample && t.control) t.stage = "closed";
  else if (action === "run" && t.stage === "closed") {
    t.stage = "running";
    t.remaining = DIFFICULTIES[s.difficulty].duration;
  } else if (action === "inspect" && t.stage === "ready") t.inspected = true;
  else if (action === "compare" && t.stage === "ready" && t.inspected) t.compared = true;
  else if (action === "record" && t.stage === "ready" && t.compared) {
    t.recorded = true;
    t.stage = "recorded";
  } else if (action === "repeat" && t.stage === "recorded" && s.portions > Object.entries(s.stations).filter(([other, v]) => other !== id && !v.sample).length) {
    t.stage = "empty";
    t.sample = false;
    t.control = false;
    t.inspected = false;
    t.compared = false;
    t.recorded = false;
  } else return { state, message: action === "record" ? "Inspect the sample/control comparison before recording." : "Complete the preceding instrument steps first." };
  return { state: s, message: { sample: "Soil aliquot transferred. Load the separate control next.", control: "Control vessel loaded. Verify both labels, then close the instrument.", close: "Enclosure sealed. Activate the instrument when ready.", run: "Integration started. Watch the instrument; readings unlock after processing.", inspect: "Reading inspected. Compare it with the control before recording.", compare: "Comparison inspected. Record the limits as well as the signal.", record: "Finding recorded at the central evidence terminal.", repeat: "Fresh vessels prepared. A repeat consumes another soil portion when loaded." }[action] };
}
function advanceLab(state, dt) {
  if (state.phase !== "investigate" || !Number.isFinite(dt) || dt <= 0) return state;
  let s = state;
  for (const [id, t] of Object.entries(state.stations)) {
    if (t.stage !== "running") continue;
    if (s === state) s = structuredClone(state);
    const n = s.stations[id];
    n.remaining = Math.max(0, t.remaining - Math.min(dt, 0.25));
    if (n.remaining === 0) {
      n.stage = "ready";
      n.runs++;
      n.data = readings(s.caseId, s.difficulty, id, n.runs - 1);
    }
  }
  return s;
}
function evaluateReport(s, report) {
  if (Object.values(s.stations).some((t) => !t.recorded)) return { error: "Record all three experiments before submitting the final report." };
  const c = SCENARIOS.find((c2) => c2.id === s.caseId), d = DIFFICULTIES[s.difficulty];
  if (!report || !Array.isArray(report.support) || !Array.isArray(report.conflict) || !report.support.every((x) => typeof x === "string") || !report.conflict.every((x) => typeof x === "string")) return { error: "Select supporting and conflicting evidence." };
  const support = [...new Set(report.support)], conflict = [...new Set(report.conflict)];
  if (!report.answer || !report.mechanism || !Number.isFinite(report.confidence) || report.confidence < 0 || report.confidence > 100 || !report.limitation || !report.next || !support.length || !conflict.length || support.some((x) => conflict.includes(x))) return { error: "Choose a conclusion, mechanism, distinct supporting and conflicting evidence, a limitation and a next test." };
  const evidence = (chosen, right, max) => Math.max(0, Math.round(max * (chosen.filter((x) => right.includes(x)).length - chosen.filter((x) => !right.includes(x)).length) / right.length));
  const repeats = Object.values(s.stations).reduce((n, t) => n + Math.max(0, t.runs - 1), 0);
  const breakdown = { execution: d.repeat && repeats === 0 ? 14 : 20, controls: Object.values(s.stations).filter((t) => t.compared).length * 5, support: evidence(support, c.support, 20), conflict: evidence(conflict, c.conflict, 10), interpretation: (report.answer === c.answer ? 12 : 0) + (report.mechanism === c.mechanism ? 8 : 0), limits: report.limitation === "specificity" ? 5 : 0, followup: report.next === (c.answer === "contamination" ? "blank" : c.answer === "abiotic" ? "mineral" : "independent") ? 5 : 0, confidence: Math.max(0, 5 - Math.floor(Math.abs(report.confidence - c.confidence) / (s.difficulty === 3 ? 8 : 12))) };
  let score = Object.values(breakdown).reduce((a, b) => a + b, 0);
  if (report.answer === "life") score = Math.min(score, 45);
  const ending = score >= 85 ? "A defensible discovery plan" : score >= 60 ? "A useful report, with revisions" : "The review board requests a revision";
  return { score, breakdown, ending, explanation: c.explain, report: structuredClone(report), repeats, caseId: c.id, difficulty: s.difficulty };
}
export {
  LAB_KEY,
  advanceLab,
  evaluateReport,
  labAction,
  newLab,
  restoreLab
};
