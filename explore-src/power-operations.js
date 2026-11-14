import { POWER_MISSIONS, newPowerPlan, powerShift, assessPowerPlan, advancePowerPlan, powerPlanScore } from "./power-rules.js";
function mountPowerOperations(host, { mission = "opportunity", difficulty = 1, onScore = () => {
}, onPlan = () => {
} } = {}) {
  let state = newPowerPlan(mission, difficulty), values = { thermal: 15, communications: 10, science: 20, drive: POWER_MISSIONS[state.mission].mobile ? 10 : 0 }, disposed = false;
  const m = POWER_MISSIONS[state.mission], q = (s) => host.querySelector(s);
  function show() {
    const shift = powerShift(state);
    host.innerHTML = `<article class="power-operations"><div class="power-intro"><span class="eyebrow">${m.name.toUpperCase()} / ${m.source.toUpperCase()} POWER</span><h3>Plan the work. Keep a margin.</h3><p>${m.source === "battery" ? "Apollo\u2019s rover used finite, non-rechargeable batteries. No solar generation is added." : m.source === "rtg" ? "Viking\u2019s RTGs provide power independently of sunlight. This scenario changes the workload, not the Sun." : "Sunlight powers this mission. These three training shifts reduce the available generation."} All values are synthetic energy units.</p></div><ol class="power-shifts" aria-label="Operations shifts">${[0, 1, 2].map((i) => `<li ${i === state.round ? 'aria-current="step"' : ""}>${i < state.history.length ? "\u2713" : "0" + (i + 1)} ${["Plan", "Relay", "Reserve"][i]}</li>`).join("")}</ol><section class="power-brief"><span class="eyebrow">SHIFT ${state.round + 1} / 3</span><h4>${shift.title}</h4><p>${shift.event}</p><dl class="power-minimums">${Object.entries(shift.minimum).map(([k, v]) => `<div><dt>${k === "drive" ? "Mobility" : k}</dt><dd>${!m.mobile && k === "drive" ? "Stationary" : v + " minimum"}</dd></div>`).join("")}</dl>${shift.protectedReserve ? `<p>Protected battery reserve after this shift: <b>${shift.protectedReserve}</b> units.</p>` : ""}</section><div class="power-planning"><section class="power-allocation"><h4>Allocate this shift</h4>${Object.entries(values).map(([k, v]) => `<label class="range-label">${k === "drive" ? "Mobility" : k}<output>${v}</output><input type="range" min="0" max="70" step="1" value="${v}" data-power="${k}" ${!m.mobile && k === "drive" ? "disabled" : ""}></label>`).join("")}</section><section class="power-forecast"><span class="eyebrow">PREDICTED OUTCOME</span><div class="power-metrics"><div><span>Available this shift</span><strong>${shift.available}</strong></div><div><span>Current reserve</span><strong>${state.reserve}</strong></div></div><div class="budget-track"><i></i></div><p class="budget-live" role="status"></p><dl class="power-impact"></dl><p class="activity-feedback" role="status">Meet the shift objectives while protecting a margin. Review each outcome before advancing.</p><button class="button" data-action="execute">Execute operations plan</button><p class="small">${difficulty === 1 ? "The live forecast explains every allocation." : "Each rejected plan costs up to 15 points of revision credit in that shift."} Plans are saved as study notes in your journal. Each rover activity manages its own energy.</p></section></div><details class="power-history"><summary>Operations log</summary><div class="power-log">${state.history.length ? state.history.map((r) => `<p>Shift ${r.round + 1}: ${r.used}/${r.available} allocated \xB7 reserve ${r.reserveBefore} \u2192 ${r.reserveAfter} \xB7 ${r.score}/100.</p>`).join("") : "<p>No executed shifts yet.</p>"}</div></details></article>`;
    function forecast() {
      values = Object.fromEntries([...host.querySelectorAll("[data-power]")].map((i) => [i.dataset.power, +i.value]));
      host.querySelectorAll("[data-power]").forEach((i) => i.previousElementSibling.textContent = i.value);
      const total = Object.values(values).reduce((n, v) => n + v, 0), left = shift.available - total, reserve = m.source === "battery" ? state.reserve - total : Math.min(100, state.reserve + left);
      q(".budget-live").textContent = `${total} allocated / ${shift.available} available \xB7 ${left < 0 ? -left + " over budget" : left + " margin"}`;
      q(".budget-track i").style.width = Math.min(100, total / shift.available * 100) + "%";
      q(".budget-track i").classList.toggle("over-budget", left < 0);
      q(".power-impact").innerHTML = `<div><dt>Reserve after shift</dt><dd>${reserve} units</dd></div><div><dt>Science objective</dt><dd>${values.science >= shift.minimum.science ? "Funded" : "Underfunded"}</dd></div><div><dt>Radio relay</dt><dd>${values.communications >= shift.minimum.communications ? "Funded" : "Underfunded"}</dd></div><div><dt>Thermal protection</dt><dd>${values.thermal >= shift.minimum.thermal ? "Protected" : "At risk"}</dd></div>`;
    }
    host.querySelectorAll("[data-power]").forEach((i) => i.oninput = forecast);
    forecast();
    q("[data-action=execute]").onclick = () => {
      if (state.phase !== "planning") return;
      forecast();
      const result = assessPowerPlan(state, values);
      state = result.state;
      if (result.errors.length) {
        q(".activity-feedback").textContent = "Plan rejected: " + result.errors.join(" ");
        return;
      }
      onPlan({ ...values }, state.mission);
      host.querySelectorAll("[data-power]").forEach((i) => i.disabled = true);
      q(".activity-feedback").textContent = `Plan executed. Reserve ${result.record.reserveBefore} \u2192 ${result.record.reserveAfter}. Shift score ${result.record.score}/100. Science, radio and thermal objectives are funded.`;
      q(".power-log").innerHTML = state.history.map((r) => `<p>Shift ${r.round + 1}: ${r.used}/${r.available} allocated \xB7 reserve ${r.reserveBefore} \u2192 ${r.reserveAfter} \xB7 ${r.score}/100.</p>`).join("");
      const b = q("[data-action=execute]");
      b.textContent = state.round === 2 ? "Finish operations report" : "Review next shift";
      b.onclick = () => {
        state = advancePowerPlan(state);
        if (state.phase === "complete") finish();
        else show();
      };
    };
  }
  function finish() {
    const score = powerPlanScore(state);
    onScore("power", score);
    host.innerHTML = `<section class="power-debrief"><span class="eyebrow">OPERATIONS REPORT / ${m.name.toUpperCase()}</span><h3>Three shifts. A protected reserve.</h3><strong class="power-final-score">${score} / 100</strong><p>You funded the required observations, communications and thermal protection through three changing workloads. Final reserve: ${state.reserve} training units.</p><table><caption>Executed decisions</caption><thead><tr><th>Shift</th><th>Used / available</th><th>Reserve after</th><th>Score</th></tr></thead><tbody>${state.history.map((r) => `<tr><th>${r.round + 1}</th><td>${r.used} / ${r.available}</td><td>${r.reserveAfter}</td><td>${r.score}</td></tr>`).join("")}</tbody></table><p>${m.source === "battery" ? "Finite energy makes the later shifts depend on earlier decisions." : m.source === "rtg" ? "An RTG does not make an unlimited budget. Workload and reserve still matter." : "Reduced sunlight limits the workload. A useful science plan preserves essential systems."} These are teaching constraints, not mission specifications or telemetry.</p><button class="button" data-action="replay">Replay operations activity</button><a class="button secondary" href="#lab">Return to Science Lab</a></section>`;
    q("[data-action=replay]").onclick = () => {
      if (disposed) return;
      state = newPowerPlan(mission, difficulty);
      values = { thermal: 15, communications: 10, science: 20, drive: m.mobile ? 10 : 0 };
      show();
    };
  }
  show();
  return () => {
    disposed = true;
    host.querySelectorAll("input,button").forEach((e) => {
      e.oninput = null;
      e.onclick = null;
    });
  };
}
export {
  mountPowerOperations
};
