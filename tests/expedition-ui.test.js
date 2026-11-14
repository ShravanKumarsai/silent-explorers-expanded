import test from "node:test";
import assert from "node:assert/strict";
import { Window } from "happy-dom";
import { expeditionShell, mountFlightTabs } from "../explore-src/expedition-layout.js";
import { mountExpedition } from "../explore-src/expedition.js";
import { newExpedition } from "../explore-src/expedition-rules.js";
const w = new Window({ url: "https://example.test/" });
Object.assign(globalThis, { window: w, document: w.document, localStorage: w.localStorage, requestAnimationFrame: () => 1, cancelAnimationFrame: () => {
}, matchMedia: () => ({ matches: true }) });
w.HTMLCanvasElement.prototype.getContext = () => new Proxy({}, { get: () => () => {
}, set: () => true });
test("control and instrument tabs reveal one panel per group and support keyboard navigation", () => {
  const host = document.createElement("main");
  host.innerHTML = expeditionShell;
  document.body.append(host);
  const tabs = mountFlightTabs(host);
  assert.ok(!host.querySelector("#flight-drive").hidden);
  host.querySelector("[data-flight-tab=camera]").click();
  assert.ok(host.querySelector("#flight-drive").hidden);
  assert.ok(!host.querySelector("#flight-camera-panel").hidden);
  host.querySelector("[data-flight-tab=camera]").dispatchEvent(new w.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
  assert.equal(host.querySelector("[data-flight-tab=science]").getAttribute("aria-selected"), "true");
  assert.ok(!host.querySelector("#flight-science").hidden);
  host.querySelector("[data-flight-tab=status]").click();
  assert.ok(host.querySelector("#flight-map").hidden);
  assert.ok(!host.querySelector("#flight-status").hidden);
  assert.ok(!host.querySelector("#flight-science").hidden);
  tabs.dispose();
  host.remove();
});
test("briefing starts collapsed and the primary launch action precedes the camera", () => {
  localStorage.clear();
  const host = document.createElement("main");
  document.body.append(host);
  const stop = mountExpedition(host);
  assert.equal(host.querySelector(".flight-journal").open, false);
  assert.match(host.querySelector(".flight-next-title").textContent, /Prepare/);
  const launch = host.querySelector("[data-command=launch]");
  assert.ok(host.querySelector(".flight-actionbar").contains(launch));
  assert.ok(launch.compareDocumentPosition(host.querySelector(".flight-viewport")) & w.Node.DOCUMENT_POSITION_FOLLOWING);
  stop();
  host.remove();
});
test("dust decisions and final reports automatically open the mission notes", () => {
  for (const phase of ["survey", "report"]) {
    const s = { ...newExpedition(), phase, ...phase === "survey" ? { dust: "incoming" } : { samples: ["outcrop", "soil", "ridge"] } };
    localStorage.setItem("silent-explorers-expedition-v1", JSON.stringify(s));
    const host = document.createElement("main");
    document.body.append(host);
    const stop = mountExpedition(host);
    assert.ok(host.querySelector(".flight-journal").open);
    assert.ok(host.querySelector("[data-command=launch]").disabled);
    if (phase === "survey") assert.match(host.querySelector("[data-command=briefing]").textContent, /power plan/);
    else {
      assert.match(host.querySelector("[data-command=briefing]").textContent, /science report/);
      host.querySelector("input[value=water]").checked = true;
      host.querySelector("[data-command=transmit]").click();
      assert.match(host.querySelector(".flight-next-title").textContent, /complete/);
      assert.ok(host.querySelector(".expedition-score"));
    }
    stop();
    host.remove();
  }
  localStorage.clear();
});
