import test from "node:test";
import assert from "node:assert/strict";
import { POWER_MISSIONS, newPowerPlan, powerShift, assessPowerPlan, advancePowerPlan, powerPlanScore } from "../explore-src/power-rules.js";
import { resolveRoute } from "../explore-src/routes.js";
import { readProgress, freshProgress } from "../explore-src/state.js";
test("all 18 mission/difficulty combinations have a feasible three-shift plan and full report", () => {
  for (const mission of Object.keys(POWER_MISSIONS)) for (const difficulty of [1, 2, 3]) {
    let s = newPowerPlan(mission, difficulty);
    for (let i = 0; i < 3; i++) {
      const shift = powerShift(s), result = assessPowerPlan(s, shift.minimum);
      assert.deepEqual(result.errors, [], mission + "/" + difficulty + "/" + i);
      assert.equal(result.state.phase, "review");
      s = advancePowerPlan(result.state);
    }
    assert.equal(s.phase, "complete");
    assert.equal(s.history.length, 3);
    assert.equal(powerPlanScore(s), 100);
  }
});
test("stationary landers cannot receive drive allocations and RTGs are not dust dependent", () => {
  const s = newPowerPlan("viking", 3), shift = powerShift(s);
  assert.equal(shift.available, 75);
  assert.equal(shift.minimum.drive, 0);
  assert.match(assessPowerPlan(s, { ...shift.minimum, drive: 5 }).errors.join(" "), /stationary lander/);
  const r = advancePowerPlan(assessPowerPlan(s, shift.minimum).state);
  assert.equal(powerShift(r).available, 75);
  assert.ok(powerShift(r).minimum.science > shift.minimum.science);
});
test("battery expenditure reduces future reserves while solar surplus can replenish training reserves", () => {
  let b = newPowerPlan("apollo");
  b = assessPowerPlan(b, powerShift(b).minimum).state;
  assert.equal(b.reserve, 145);
  let solar = newPowerPlan("opportunity");
  solar = assessPowerPlan(solar, powerShift(solar).minimum).state;
  assert.equal(solar.reserve, 65);
});
test("unsafe plans do not consume reserve or progress; revisions reduce an accepted score", () => {
  const s = newPowerPlan("opportunity"), bad = assessPowerPlan(s, { thermal: 50, communications: 50, science: 50, drive: 50 });
  assert.equal(bad.state.reserve, s.reserve);
  assert.equal(bad.state.round, 0);
  assert.equal(bad.state.phase, "planning");
  assert.equal(bad.state.revisions, 1);
  const accepted = assessPowerPlan(bad.state, powerShift(s).minimum);
  assert.equal(accepted.record.score, 95);
  assert.equal(assessPowerPlan(accepted.state, powerShift(s).minimum).state.history.length, 1);
});
test("finite battery return reserve is protected independently of the shift maximum", () => {
  const s = { ...newPowerPlan("apollo", 3), round: 2, reserve: 70 };
  const r = assessPowerPlan(s, { thermal: 20, communications: 15, science: 25, drive: 0 });
  assert.match(r.errors.join(" "), /Keep 20 units/);
  assert.equal(r.state.reserve, 70);
});
test("saved plans stay mission specific and malformed allocations are ignored", () => {
  const p = freshProgress();
  p.powerPlans = { spirit: { thermal: 15, communications: 15, science: 25, drive: 10 }, viking: { thermal: 15, communications: 15, science: 25, drive: 0 }, apollo: { thermal: -3 }, unknown: { thermal: 15 } };
  const r = readProgress({ getItem: () => JSON.stringify(p) });
  assert.equal(r.powerPlans.spirit.drive, 10);
  assert.equal(r.powerPlans.viking.drive, 0);
  assert.equal(r.powerPlans.apollo, void 0);
  assert.equal(r.powerPlans.unknown, void 0);
  assert.equal(r.power.drive, 35);
});
test("legacy links preserve mission context and canonicalize without creating duplicate pages", () => {
  assert.deepEqual(resolveRoute("#machine/viking"), { section: "museum", arg: "viking", mission: "viking", hash: "#museum/viking" });
  assert.equal(resolveRoute("#control/apollo").hash, "#lab/power");
  assert.equal(resolveRoute("#map/insight").mission, "insight");
  assert.equal(resolveRoute("#lab/analysis").hash, "#lab/analysis");
});
