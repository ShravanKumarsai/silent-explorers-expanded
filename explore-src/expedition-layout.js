const expeditionShell = `<article class="expedition">
 <a href="#mission/opportunity" class="back-link">\u2190 The Opportunity story</a>
 <header class="expedition-title"><div><span class="eyebrow">FIELD MISSION 01 / MERIDIANI PLANUM</span><h1>The water question.</h1><p>Three sites. One rover. Follow the clues to an ancient Mars.</p></div><span class="expedition-seal">OPPORTUNITY<br><small>EDUCATIONAL EXPEDITION</small></span></header>
 <ol class="mission-steps" aria-label="Mission progress"><li>Briefing</li><li>Investigate</li><li>Return</li><li>Report</li></ol>
 <section class="flight-actionbar" aria-label="Current mission objective"><div><span class="eyebrow">YOUR NEXT STEP</span><h2 class="flight-next-title">Prepare for the surface.</h2><p class="flight-next-detail">Visit three stations, record their evidence and return to the beacon.</p></div><div class="flight-primary-actions"><button class="button" data-command="launch">Launch expedition <span aria-hidden="true">\u2197</span></button><button class="text-link" data-command="briefing">Read the briefing</button></div></section>
 <div class="flight-layout"><div class="flight-main">
  <section class="flight-viewport" aria-label="Rover camera"><div class="flight-scene" tabindex="0" aria-label="Rover expedition viewport. W and S drive; A and D steer. E integrates an instrument measurement."></div><div class="flight-loading" role="status"><span class="eyebrow">NASA / JPL-CALTECH \xB7 OFFICIAL HARDWARE</span><strong>Your expedition starts here.</strong><p>Launch when you\u2019re ready to explore.</p></div><div class="flight-feed-label">EXTERIOR CAMERA / SIMULATED VIEW</div><div class="inset-label" hidden>NAVCAM / SIMULATED</div></section>
  <section class="flight-console" aria-label="Mission controls"><div class="flight-tabs" role="tablist" aria-label="Rover controls"><button id="flight-tab-drive" role="tab" aria-selected="true" aria-controls="flight-drive" data-flight-tab="drive" data-tab-group="controls">Drive</button><button id="flight-tab-camera" role="tab" aria-selected="false" aria-controls="flight-camera-panel" data-flight-tab="camera" data-tab-group="controls" tabindex="-1">Cameras</button><button id="flight-tab-science" role="tab" aria-selected="false" aria-controls="flight-science" data-flight-tab="science" data-tab-group="controls" tabindex="-1">Science</button></div>
   <div id="flight-drive" class="flight-control-panel" role="tabpanel" aria-labelledby="flight-tab-drive"><div class="drive-console"><div class="drive-buttons" aria-label="Touch driving controls"><button data-drive="left" aria-label="Steer left">\u2190</button><button data-drive="forward" aria-label="Drive forward">\u2191</button><button data-drive="reverse" aria-label="Drive backwards">\u2193</button><button data-drive="right" aria-label="Steer right">\u2192</button></div><p><strong>Take it slowly.</strong> W/S drive \xB7 A/D steer.<br>Release to brake. Stop inside a station circle, then press E to measure.</p></div></div>
   <div id="flight-camera-panel" class="flight-control-panel" role="tabpanel" aria-labelledby="flight-tab-camera" hidden><div class="camera-controls"><label>Camera view<select id="flight-camera"><option value="follow">Exterior follow</option><option value="mast">Mast camera</option><option value="nav">Front navigation camera</option></select></label><label>Mast pan<input id="camera-yaw" type="range" min="-100" max="100" value="0"></label><label>Mast tilt<input id="camera-pitch" type="range" min="-25" max="25" value="0"></label></div><button class="button ghost" data-command="snapshot">Save camera frame</button></div>
   <div id="flight-science" class="flight-control-panel" role="tabpanel" aria-labelledby="flight-tab-science" hidden><div class="instrument-controls"><label>Observation tool<select id="flight-tool"><option value="imager">Close imaging \xB7 layered outcrop</option><option value="apxs">APXS \xB7 soil station</option><option value="panorama">Panorama \xB7 ridge station</option></select></label><button class="button secondary" data-command="measure">Record observation \xB7 E</button></div><p class="control-hint">Match the instrument to the site. Use the mast camera for the ridge panorama.</p></div>
  </section>
  <p class="flight-feedback" role="status"></p>
 </div><aside class="flight-aside" aria-label="Navigation and rover status"><div class="flight-tabs" role="tablist" aria-label="Mission instruments"><button id="flight-tab-map" role="tab" aria-selected="true" aria-controls="flight-map" data-flight-tab="map" data-tab-group="instruments">Map & sites</button><button id="flight-tab-status" role="tab" aria-selected="false" aria-controls="flight-status" data-flight-tab="status" data-tab-group="instruments" tabindex="-1">Rover status</button></div><div id="flight-map" role="tabpanel" aria-labelledby="flight-tab-map"><canvas class="mission-map" width="400" height="400" aria-label="Tactical mission map"></canvas></div><div id="flight-status" role="tabpanel" aria-labelledby="flight-tab-status" hidden><div class="mission-telemetry" aria-live="off"></div><div class="mission-stations"></div></div><p class="flight-side-note">A live simulation, grounded in NASA\u2019s mission record. Not a feed from Mars.</p></aside></div>
 <details class="flight-journal"><summary><span>YOUR FIELD NOTES</span><strong>Briefing & mission log</strong><span aria-hidden="true">+</span></summary><section class="flight-story"></section></details>
 <section class="photo-log" hidden><h2>Your camera log</h2><div></div></section>
 <details class="nasa-notes"><summary>NASA sources & simulation notes</summary><p>The rover is the unmodified official NASA/JPL-Caltech Spirit and Opportunity asset. Surface, sites, measurements, energy, damage, timing and speed are synthetic training values. Camera positions are educational approximations; frames are rendered here, not received from Mars.</p><a href="https://science.nasa.gov/resource/spirit-and-opportunity-rover-3d-model/" target="_blank" rel="noopener">Official NASA model & attribution \u203A</a><a href="https://science.nasa.gov/mission/mer-opportunity/" target="_blank" rel="noopener">Opportunity mission record \u203A</a><a href="https://pds-geosciences.wustl.edu/missions/mer/" target="_blank" rel="noopener">NASA PDS observations archive \u203A</a></details>
 <div class="flight-session-actions"><span>Progress saves automatically on this device.</span><button class="button ghost" data-command="restart">Restart mission</button></div>
</article>`;
function mountFlightTabs(host) {
  const all = (s) => [...host.querySelectorAll(s)];
  function select(button, focus = false) {
    const group = button.dataset.tabGroup;
    for (const tab of all(`[data-tab-group="${group}"]`)) {
      const chosen = tab === button;
      tab.setAttribute("aria-selected", String(chosen));
      tab.tabIndex = chosen ? 0 : -1;
      host.querySelector("#" + tab.getAttribute("aria-controls")).hidden = !chosen;
    }
    if (focus) button.focus();
  }
  function click(e) {
    const tab = e.target.closest("[data-flight-tab]");
    if (tab) select(tab);
  }
  function key(e) {
    const tab = e.target.closest("[data-flight-tab]");
    if (!tab || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const tabs = all(`[data-tab-group="${tab.dataset.tabGroup}"]`), i = tabs.indexOf(tab), next = e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    select(tabs[next], true);
  }
  host.addEventListener("click", click);
  host.addEventListener("keydown", key);
  return { select(name) {
    const b = host.querySelector(`[data-flight-tab="${name}"]`);
    if (b) select(b);
  }, dispose() {
    host.removeEventListener("click", click);
    host.removeEventListener("keydown", key);
  } };
}
export {
  expeditionShell,
  mountFlightTabs
};
