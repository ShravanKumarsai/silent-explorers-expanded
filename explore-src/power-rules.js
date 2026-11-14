const POWER_MISSIONS = { apollo: { name: "Apollo 17", source: "battery", mobile: true }, surveyor: { name: "Surveyor 3", source: "solar", mobile: false }, opportunity: { name: "Opportunity", source: "solar", mobile: true }, spirit: { name: "Spirit", source: "solar", mobile: true }, viking: { name: "Viking 1", source: "rtg", mobile: false }, insight: { name: "InSight", source: "solar", mobile: false } };
function newPowerPlan(mission = "opportunity", difficulty = 1) {
  return { mission: POWER_MISSIONS[mission] ? mission : "opportunity", difficulty: [1, 2, 3].includes(difficulty) ? difficulty : 1, round: 0, phase: "planning", reserve: mission === "apollo" ? 200 : 35, history: [], revisions: 0, lastPlan: null };
}
function powerShift(s) {
  const m = POWER_MISSIONS[s.mission], r = s.round, thermal = 15, communications = [10, 15, 15][r], science = m.source === "rtg" ? [20, 30, 25][r] : [20, 25, 25][r], drive = m.mobile ? [10, 10, 0][r] : 0, protectedReserve = m.source === "battery" ? [105, 45, 10 + (s.difficulty - 1) * 5][r] : 0;
  const available = m.source === "battery" ? Math.min(70, s.reserve) : m.source === "rtg" ? 75 : [85, 75, 65][r] - (s.difficulty - 1) * 2 * r;
  return { available, protectedReserve, minimum: { thermal, communications, science, drive }, title: ["Establish the science window", "Relay the observations", "Protect the final reserve"][r], event: m.source === "battery" ? ["Battery-only fieldwork. Keep enough for two later shifts.", "There is no recharge. Fund the observation and its radio relay.", "Complete the final science window and preserve a return margin."][r] : m.source === "rtg" ? ["RTG generation is independent of sunlight.", "Generation stays constant; an instrument integration needs more energy.", "Prioritize the final science result and communications."][r] : ["Good illumination makes a wider science window possible.", "Reduced sunlight coincides with a radio relay.", "Lower generation makes discretionary loads expensive."][r] };
}
function assessPowerPlan(state, allocation) {
  if (state.phase !== "planning") return { state, errors: ["Advance to the next shift before executing again."] };
  const m = POWER_MISSIONS[state.mission], shift = powerShift(state), keys = ["thermal", "communications", "science", "drive"];
  if (!allocation || !keys.every((k) => Number.isFinite(allocation[k]) && allocation[k] >= 0 && allocation[k] <= 70)) return { state, errors: ["Use an allocation between 0 and 70 for each system."] };
  const total = keys.reduce((n, k) => n + allocation[k], 0), errors = [];
  if (!m.mobile && allocation.drive !== 0) errors.push("This is a stationary lander: mobility must remain zero.");
  if (total > shift.available) errors.push(`Over budget by ${total - shift.available} units. Reduce discretionary loads.`);
  for (const k of keys) if (allocation[k] < shift.minimum[k]) errors.push(`${k}: allocate at least ${shift.minimum[k]} units for this shift.`);
  const remaining = m.source === "battery" ? state.reserve - total : Math.min(100, state.reserve + shift.available - total);
  if (remaining < shift.protectedReserve) errors.push(`Keep ${shift.protectedReserve} units in the battery for later work and return.`);
  if (errors.length) return { state: { ...state, revisions: state.revisions + 1 }, errors };
  const margin = shift.available - total, score = Math.max(60, Math.round(80 + Math.min(20, margin * 10) - Math.min(15, state.revisions * 5))), record = { round: state.round, allocation: { ...allocation }, available: shift.available, used: total, reserveBefore: state.reserve, reserveAfter: remaining, score, revisions: state.revisions };
  return { state: { ...state, phase: "review", reserve: remaining, lastPlan: { ...allocation }, history: [...state.history, record] }, errors: [], record };
}
function advancePowerPlan(s) {
  if (s.phase !== "review") return s;
  return { ...s, round: s.round + 1, phase: s.round === 2 ? "complete" : "planning", revisions: 0 };
}
function powerPlanScore(s) {
  return s.history.length === 3 ? Math.round(s.history.reduce((n, r) => n + r.score, 0) / 3) : 0;
}
export {
  POWER_MISSIONS,
  advancePowerPlan,
  assessPowerPlan,
  newPowerPlan,
  powerPlanScore,
  powerShift
};
