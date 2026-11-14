import test from "node:test";
import assert from "node:assert/strict";
import { newLab, labAction, advanceLab, evaluateReport, restoreLab } from "../explore-src/lab-rules.js";
import { SCENARIOS, DIFFICULTIES, readings } from "../explore-src/lab-data.js";
const act = (s, id, a) => labAction(s, id, a).state;
function run(s, id) {
  for (const a of ["sample", "control", "close", "run"]) s = act(s, id, a);
  for (let i = 0; i < 50; i++) s = advanceLab(s, 0.25);
  assert.equal(s.stations[id].stage, "ready");
  for (const a of ["inspect", "compare", "record"]) s = act(s, id, a);
  return s;
}
function completed(d, id) {
  let s = act(newLab(d, id), null, "arrive");
  s = act(s, null, "collect");
  for (const id2 of ["gas", "scope", "chem"]) s = run(s, id2);
  return s;
}
const correct = (c) => ({ answer: c.answer, support: c.support, conflict: c.conflict, mechanism: c.mechanism, limitation: "specificity", next: c.answer === "abiotic" ? "mineral" : c.answer === "contamination" ? "blank" : "independent", confidence: c.confidence });
test("instruments enforce sample reception, separate controls, sealing, processing and inspection", () => {
  let s = newLab(1, "glass");
  assert.equal(act(s, "gas", "run"), s);
  s = act(s, null, "arrive");
  assert.equal(act(s, "gas", "sample"), s);
  s = act(s, null, "collect");
  s = act(s, "gas", "sample");
  assert.equal(s.portions, 5);
  assert.equal(act(s, "gas", "sample").portions, 5);
  assert.equal(act(s, "gas", "close"), s);
  s = act(s, "gas", "control");
  s = act(s, "gas", "close");
  s = act(s, "gas", "run");
  assert.equal(s.stations.gas.data, null);
  assert.equal(act(s, "gas", "record"), s);
  for (let i = 0; i < 25; i++) s = advanceLab(s, 0.25);
  assert.equal(s.stations.gas.stage, "ready");
  assert.equal(act(s, "gas", "compare"), s);
  s = act(s, "gas", "inspect");
  s = act(s, "gas", "compare");
  s = act(s, "gas", "record");
  assert.equal(s.stations.gas.recorded, true);
});
test("all nine case/difficulty combinations have consistent readings and attainable, evidence-based endings", () => {
  for (const d of [1, 2, 3]) for (const c of SCENARIOS) {
    let s = completed(d, c.id);
    if (d === 3) {
      s = act(s, "gas", "repeat");
      s = run(s, "gas");
    }
    const r = evaluateReport(s, correct(c));
    assert.equal(r.score, 100, `${c.id}/${d}`);
    assert.ok(r.explanation);
    assert.equal(s.portions, DIFFICULTIES[d].portions - (d === 3 ? 4 : 3));
    assert.equal(readings(c.id, d, "chem").sample.length, 4);
  }
});
test("uncertain completion alone and unsupported life claims cannot receive perfect scores", () => {
  const s = completed(1, "glass");
  assert.ok(evaluateReport(s, { answer: "inconclusive" }).error);
  const r = evaluateReport(s, { ...correct(SCENARIOS[0]), answer: "inconclusive", support: ["limits"], conflict: ["gas"], mechanism: "mixed", confidence: 100 });
  assert.ok(r.score < 60);
  assert.ok(evaluateReport(s, { ...correct(SCENARIOS[0]), answer: "life" }).score <= 45);
});
test("irrelevant evidence, conflicting selections and overconfidence lose credit", () => {
  const s = completed(2, "seal"), r = correct(SCENARIOS[1]);
  assert.ok(evaluateReport(s, { ...r, support: ["gas"] }).score < evaluateReport(s, r).score);
  assert.ok(evaluateReport(s, { ...r, conflict: ["blank"] }).error);
  assert.ok(evaluateReport(s, { ...r, confidence: 0 }).score < 100);
});
test("Specialist requires a repeat for full execution credit and enforces finite portions", () => {
  let s = completed(3, "delta");
  assert.equal(evaluateReport(s, correct(SCENARIOS[2])).score, 94);
  s = act(s, "chem", "repeat");
  s = run(s, "chem");
  assert.equal(s.portions, 0);
  assert.equal(act(s, "gas", "repeat"), s);
  assert.equal(evaluateReport(s, correct(SCENARIOS[2])).score, 100);
});
test("incomplete evidence cannot submit and processing cannot skip time via an enormous delta", () => {
  let s = act(newLab(3, "glass"), null, "arrive");
  s = act(s, null, "collect");
  for (const a of ["sample", "control", "close", "run"]) s = act(s, "gas", a);
  assert.equal(advanceLab(s, 999).stations.gas.remaining, 9.75);
  assert.ok(evaluateReport(s, correct(SCENARIOS[0])).error);
});
test("saved cases resume safely, interrupted runs restart sealed and corrupt input resets", () => {
  let s = completed(2, "glass");
  const r = restoreLab(JSON.stringify(s), 2);
  assert.equal(r.stations.chem.recorded, true);
  s = act(s, "gas", "repeat");
  for (const a of ["sample", "control", "close", "run"]) s = act(s, "gas", a);
  assert.equal(restoreLab(JSON.stringify(s), 2).stations.gas.stage, "closed");
  assert.equal(restoreLab(JSON.stringify(s), 3).phase, "arrival");
  assert.equal(restoreLab("{broken", 1).phase, "arrival");
  assert.equal(restoreLab(JSON.stringify({ ...s, stations: {} }), 2).phase, "arrival");
});
test("early repeat decisions protect enough soil for every unfinished primary experiment", () => {
  let s = act(newLab(3, "glass"), null, "arrive");
  s = act(s, null, "collect");
  s = run(s, "gas");
  s = act(s, "gas", "repeat");
  s = run(s, "gas");
  assert.equal(s.portions, 2);
  assert.equal(act(s, "gas", "repeat"), s);
  s = run(s, "scope");
  s = run(s, "chem");
  assert.ok(!evaluateReport(s, correct(SCENARIOS[0])).error);
});
test("saved final report scores are recomputed and malformed embedded report input is rejected", () => {
  let s = completed(1, "glass");
  s = { ...s, phase: "complete", report: evaluateReport(s, correct(SCENARIOS[0])) };
  s.report.score = 999;
  assert.equal(restoreLab(JSON.stringify(s), 1).report.score, 100);
  s.report.report.support = { bad: true };
  assert.equal(restoreLab(JSON.stringify(s), 1).phase, "arrival");
});
