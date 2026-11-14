import { STATIONS, SCENARIOS, DIFFICULTIES, EVIDENCE, CONCLUSIONS, MECHANISMS } from "./lab-data.js";
import { LAB_KEY, newLab, restoreLab, labAction, advanceLab, evaluateReport } from "./lab-rules.js";
const escape = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const btn = (name, action, disabled = false) => `<button class="button secondary" data-lab="${action}" ${disabled ? "disabled" : ""}>${name}</button>`;
function mountLaboratory(host, { difficulty = 1, onScore = () => {
}, storage = globalThis.localStorage } = {}) {
  let s;
  try {
    s = restoreLab(storage.getItem(LAB_KEY), difficulty);
  } catch {
    s = newLab(difficulty);
  }
  let view = null, disposed = false, paused = false, active = null, target = null, raf = 0, last = 0, uiTime = 0, sceneLoading = false, audio = null, hum = null, sound = false, inspectIndex = 0, magnification = 100, mode = "full";
  const q = (sel) => host.querySelector(sel), all = (sel) => [...host.querySelectorAll(sel)], config = DIFFICULTIES[difficulty];
  host.classList.add("laboratory-host");
  host.innerHTML = `<article class="laboratory"><div class="lab-masthead"><div><span class="eyebrow">THE EVIDENCE ROOM / FIRST-PERSON INVESTIGATION</span><h2>Every signal needs a second question.</h2></div><span class="lab-case"></span></div><p class="lab-disclaimer">Fictional analogue laboratory \xB7 simulated measurements \xB7 not Viking hardware, NASA findings or live data.</p><div class="lab-layout"><section><div class="lab-world"><div class="lab-scene"></div><div class="lab-reticle" aria-hidden="true">+</div><div class="lab-caption">ANALOGUE BASE / SCIENCE OPERATIONS</div><button class="lab-interact" data-lab="interact" hidden></button><div class="lab-curtain"></div><div class="lab-joystick" aria-label="Virtual movement joystick"><span></span></div><span class="lab-touch-hint">Left thumb: walk \xB7 drag room: look</span></div><div class="lab-room-controls">${btn("Pause \xB7 Esc", "pause")}${btn("Resume room", "room")}${btn("Lab sound: off", "sound")}<span>WASD walk \xB7 drag to look \xB7 E interact \xB7 double-click to capture mouse</span></div><details class="lab-access"><summary>Station access / keyboard & seated mode</summary><p>Move directly to a workstation, then interact with it. Available in every difficulty.</p><div>${Object.entries({ intake: "Sample intake", ...Object.fromEntries(Object.entries(STATIONS).map(([id, v]) => [id, v.name])), board: "Evidence terminal" }).map(([id, name]) => `<button class="button ghost" data-move="${id}">Move to ${name}</button>`).join("")}</div></details><div class="lab-objectives"></div></section><aside class="lab-console" aria-label="Instrument workspace"><div class="lab-instrument"></div></aside></div><p class="lab-dialogue" role="status" aria-live="polite"></p><details class="lab-reference"><summary>Science reference desk & model notes</summary><p>This generic analogue lab teaches controls, repeatability and confidence. Its gas chamber, microscope and mass-spectrum trainer are application-built teaching instruments. They do not reproduce spacecraft hardware. All numbers, peak assignments and images are synthetic.</p><a href="https://science.nasa.gov/mission/viking/" target="_blank" rel="noopener">NASA Viking mission record \u203A</a><a href="https://nssdc.gsfc.nasa.gov/planetary/viking.html" target="_blank" rel="noopener">NASA Viking experiments archive \u203A</a><a href="https://pds.nasa.gov/" target="_blank" rel="noopener">NASA Planetary Data System \u203A</a></details></article>`;
  function save() {
    try {
      storage.setItem(LAB_KEY, JSON.stringify(s));
    } catch {
      message("Storage unavailable. This case will remain available until you leave this activity.");
    }
  }
  function message(text) {
    q(".lab-dialogue").textContent = text;
  }
  function tone(f = 440) {
    if (!sound) return;
    try {
      audio ??= new (window.AudioContext || window.webkitAudioContext)();
      audio.resume()?.catch(() => {
      });
      const osc = audio.createOscillator(), g = audio.createGain(), now = audio.currentTime;
      osc.frequency.setValueAtTime(f, now);
      g.gain.setValueAtTime(0.025, now);
      g.gain.exponentialRampToValueAtTime(1e-4, now + 0.3);
      osc.connect(g);
      g.connect(audio.destination);
      osc.start();
      osc.stop(now + 0.31);
      osc.onended = () => {
        osc.disconnect();
        g.disconnect();
      };
    } catch {
      sound = false;
    }
  }
  function status() {
    host.dataset.labPhase = s.phase;
    q(".lab-case").textContent = SCENARIOS.find((c) => c.id === s.caseId).name + " / " + config.name;
    q(".lab-objectives").innerHTML = `<h3>Investigation log</h3><p>${s.collected ? "\u2713 Sample received" : "\u25CB Receive sealed sample"} \xB7 ${s.portions} soil portions remain${config.repeat ? " \xB7 Repeat one test for full execution credit" : ""}</p><ol>${Object.entries(STATIONS).map(([id, v]) => `<li style="--station:${v.color}">${s.stations[id].recorded ? "\u2713" : "\u25CB"} ${v.name}<small>${s.stations[id].stage.toUpperCase()}${s.stations[id].runs ? ` \xB7 ${s.stations[id].runs} run(s)` : ""}</small></li>`).join("")}</ol>`;
    view?.update(s);
  }
  function setPaused(value) {
    paused = value;
    view?.pause(value);
    if (sound && audio) {
      if (value) audio.suspend();
      else audio.resume()?.catch(() => {
      });
    }
    view?.enable(!paused && !active && s.phase === "investigate");
    if (paused) {
      q(".lab-curtain").hidden = false;
      q(".lab-curtain").innerHTML = `<span class="eyebrow">CASE PAUSED</span><h3>Take your time.</h3><p>Movement and instrument processing are paused. Your case is saved on this device.</p>${btn("Resume investigation", "resume")}`;
    } else q(".lab-curtain").hidden = s.phase !== "arrival";
    save();
  }
  function curtain() {
    const c = SCENARIOS.find((c2) => c2.id === s.caseId);
    if (s.phase !== "arrival") {
      q(".lab-curtain").hidden = true;
      return;
    }
    q(".lab-curtain").hidden = false;
    q(".lab-curtain").innerHTML = `<span class="eyebrow">ARRIVAL / DR. RAO, SCIENCE LEAD</span><h3>The evidence room.</h3><p>${c.dispatch}</p><p>Receive the sealed soil. At each instrument, load sample and control, seal the enclosure, run the analysis, inspect and compare the readings, then record your finding. Defend your interpretation at the evidence terminal.</p><p>${config.hints ? "Your guide will explain each step and the role of the controls." : config.repeat ? "Assistance is limited. Four portions: three primary experiments and one repeat. Choose your repeat carefully." : "Five portions allow two repeat decisions. Identify competing mechanisms independently."}</p><label>Training case<select class="lab-case-select">${SCENARIOS.map((x) => `<option value="${x.id}" ${x.id === s.caseId ? "selected" : ""}>${x.name}</option>`).join("")}</select></label>${btn("Receive mission briefing & enter lab", "begin")}`;
  }
  async function startScene() {
    if (view || sceneLoading || disposed) return;
    sceneLoading = true;
    q(".lab-scene").innerHTML = '<p class="lab-loading">Preparing laboratory geometry and instrument displays\u2026</p>';
    message("Preparing the laboratory\u2026");
    try {
      const { mountLabScene } = await import("./lab-scene.js");
      if (disposed) return;
      view = mountLabScene(q(".lab-scene"), { onInteract: open, onPause: () => {
        if (s.phase === "investigate") setPaused(true);
      }, onTarget: (id) => {
        target = id;
        const b = q(".lab-interact");
        b.hidden = !id || !!active || paused;
        b.textContent = id ? `E / Inspect ${id === "intake" ? "sample intake" : id === "board" ? "evidence terminal" : STATIONS[id].name}` : "";
      } });
      q(".lab-loading")?.remove();
      view.enable(!paused && !active && s.phase === "investigate");
      view.pause(paused);
      view.update(s);
      message("Dr. Rao: Follow the floor markings. Start at the sample intake to your left.");
    } catch (e) {
      q(".lab-scene").innerHTML = '<div class="lab-fallback"><h3>3D unavailable on this browser.</h3><p>The accessible instrument mode preserves every experiment and report. Use Station access below to choose a workstation.</p></div>';
      message("Could not start the 3D room. Accessible instrument mode is available.");
    }
    sceneLoading = false;
  }
  function open(id) {
    if (paused || s.phase === "arrival") return;
    active = id;
    inspectIndex = 0;
    view?.enable(false);
    q(".lab-interact").hidden = true;
    panel();
    q(".lab-console").scrollIntoView({ behavior: "instant", block: "nearest" });
  }
  function room() {
    active = null;
    q(".lab-instrument").innerHTML = '<span class="eyebrow">LABORATORY / FREE EXPLORATION</span><h3>Follow the evidence.</h3><p>Walk to an instrument and press E to use it. Start at sample intake. The evidence terminal holds your recorded findings.</p><p>Controls and data appear here while you operate a station.</p>';
    const prompt = q(".lab-interact");
    prompt.hidden = !target || paused || s.phase !== "investigate";
    prompt.textContent = target ? "E / Inspect " + (target === "intake" ? "sample intake" : target === "board" ? "evidence terminal" : STATIONS[target].name) : "";
    if (!paused) view?.enable(s.phase === "investigate");
    view?.focus();
  }
  function action(id, command) {
    const r = labAction(s, id, command);
    s = r.state;
    message("Dr. Rao: " + r.message);
    tone(command === "record" ? 660 : 330);
    save();
    status();
    panel();
  }
  function plot(id, t) {
    const d = t.data, max = Math.max(...d.sample, ...d.control, 1) * 1.18;
    const points = (a) => a.map((v, i) => `${44 + i * 270 / (a.length - 1)},${160 - v / max * 130}`).join(" ");
    return `<svg class="lab-plot" viewBox="0 0 350 210" role="img" aria-label="Simulated sample and control graph"><path d="M44 20V160H325" fill="none" stroke="#708fa1"/><polyline points="${points(d.sample)}" fill="none" stroke="#64e3de" stroke-width="3"/><polyline points="${points(d.control)}" fill="none" stroke="#ffc076" stroke-width="3" stroke-dasharray="6 4"/>${d.sample.map((v, i) => `<text x="${44 + i * 270 / (d.sample.length - 1)}" y="181" text-anchor="middle" fill="#c7d9e2" font-size="11">${d.x[i]}</text>`).join("")}<text x="8" y="25" fill="#c7d9e2" font-size="11">${max.toFixed(1)}</text><text x="18" y="163" fill="#c7d9e2" font-size="11">0</text><text x="175" y="203" text-anchor="middle" fill="#c7d9e2" font-size="10">${id === "gas" ? "Time (training min)" : id === "scope" ? "Image field" : "m/z \xB7 synthetic peak assignments"}</text></svg><div class="lab-legend"><span>\u2501 Sample</span><span>\u2504 Control</span></div><label>Inspect ${id === "chem" ? "peak" : id === "scope" ? "image field" : "time point"}<select data-reading>${d.labels.map((v, i) => `<option value="${i}" ${inspectIndex === i ? "selected" : ""}>${v}</option>`).join("")}</select></label><div class="lab-numbers"><span>Sample<strong>${d.sample[inspectIndex].toFixed(2)}</strong></span><span>Control<strong>${d.control[inspectIndex].toFixed(2)}</strong></span><span>Difference<strong>${(d.sample[inspectIndex] - d.control[inspectIndex]).toFixed(2)}</strong></span></div><p class="small">${STATIONS[id].unit} \xB7 training uncertainty \xB1${(DIFFICULTIES[difficulty].noise + 0.1).toFixed(2)} \xB7 illustration, not a calibrated instrument</p>`;
  }
  function observation(id, t) {
    let extra = difficulty === 3 ? `<div class="lab-advanced-note"><h4>Specialist cross-check</h4><p>Signal / control at the selected point: ${(t.data.sample[inspectIndex] / Math.max(0.1, t.data.control[inspectIndex])).toFixed(2)}. Detection threshold: ${(DIFFICULTIES[difficulty].noise * 3).toFixed(2)} training units. Differences within that threshold require replication. Repeat drift is correlated across vessels; repeats test consistency, not instrument specificity.</p></div>` : "";
    if (id === "scope") {
      const count = Math.round(t.data.sample[inspectIndex]), zoom = magnification / 100;
      extra += `<label>Magnification<select data-magnification><option ${magnification === 100 ? "selected" : ""} value="100">100\xD7 overview</option><option ${magnification === 400 ? "selected" : ""} value="400">400\xD7 detail</option></select></label><svg class="lab-micrograph" viewBox="0 0 240 120" role="img" aria-label="Illustrated candidate objects. Shapes are not proof of cells."><rect width="240" height="120" fill="#132735"/>${Array.from({ length: count }, (_, i) => `<ellipse cx="${18 + i * 67 % 204}" cy="${18 + i * 31 % 85}" rx="${Math.min(10, 2.5 * zoom)}" ry="${Math.min(5, 1.3 * zoom)}" fill="none" stroke="#a9bea9" transform="rotate(${i * 31} ${18 + i * 67 % 204} ${18 + i * 31 % 85})"/>`).join("")}</svg><p class="small">Synthetic field ${inspectIndex + 1}, ${magnification}\xD7. Candidate objects remain nonspecific at both magnifications.</p>`;
    }
    if (id === "chem") {
      extra += `<label>Analysis mode<select data-mode><option value="full" ${mode === "full" ? "selected" : ""}>Full spectrum</option><option value="markers" ${mode === "markers" ? "selected" : ""}>Target marker ratios</option></select></label>${mode === "markers" ? `<p>Fragment A / seal proxy: sample ${(t.data.sample[0] / Math.max(0.1, t.data.sample[3])).toFixed(2)} \xB7 blank ${(t.data.control[0] / Math.max(0.1, t.data.control[3])).toFixed(2)}. Similar ratios suggest a common source; they do not identify a molecule.</p>` : ""}`;
    }
    return extra + plot(id, t) + `<p>${escape(t.data.note)}</p>${btn(t.inspected ? "Reading inspected \u2713" : "Inspect selected reading", "inspect")}${btn(t.compared ? "Control comparison reviewed \u2713" : "Review sample/control comparison", "compare", !t.inspected)}${t.compared ? '<p class="lab-control-note">Record both the difference and the control\u2019s limitation. The evidence terminal will ask you to select supporting and conflicting observations.</p>' : ""}${btn("Record finding at evidence terminal", "record", !t.compared)}`;
  }
  function panel() {
    const out = q(".lab-instrument");
    if (!active) {
      room();
      return;
    }
    if (active === "intake") {
      out.innerHTML = `<span class="eyebrow">SAMPLE RECEPTION / CHAIN OF CUSTODY</span><h3>Separate the question from the handling.</h3><p>${SCENARIOS.find((c) => c.id === s.caseId).dispatch}</p><p>Sealed soil aliquots are kept separate from procedural blanks. The gas control is a heat-treated soil aliquot. Microscopy and chemistry blanks undergo the same handling without soil.</p>${btn(s.collected ? "Sample received \u2713" : "Log seal & receive sample", "collect", s.collected)}<p>${s.portions} soil portions available. Controls do not consume the soil budget. A reserve protects one portion for each unfinished primary experiment.</p>`;
      return;
    }
    if (active === "board") {
      board();
      return;
    }
    const t = s.stations[active], st = STATIONS[active];
    out.innerHTML = `<span class="eyebrow" style="color:${st.color}">INSTRUMENT / ${active.toUpperCase()}</span><h3>${st.name}</h3><p class="small">SIMULATED DATA \xB7 ${st.mode}</p>${!s.collected ? "<p>Receive the sample at the intake bench first.</p>" : t.stage === "empty" ? `<p>${config.hints ? "Load the soil into the sample position. Load the control into its own position, then seal both." : "Verify vessel identity and seal before integration."}</p><div class="lab-vessels"><span class="${t.sample ? "loaded" : ""}">SAMPLE ${t.sample ? "\u2713" : "\u25CB"}</span><span class="${t.control ? "loaded" : ""}">CONTROL ${t.control ? "\u2713" : "\u25CB"}</span></div>${btn("Load soil aliquot", "sample", t.sample || s.portions === 0)}${btn("Load separate control", "control", t.control)}${btn("Close & seal enclosure", "close", !t.sample || !t.control)}` : t.stage === "closed" ? `<p>Sample and control are sealed in separate positions. Processing takes ${config.duration} training seconds.</p>${btn("Activate instrument", "run")}` : t.stage === "running" ? `<div class="lab-processing"><span></span><h4>Processing sample & control</h4><progress max="${config.duration}" value="${config.duration - t.remaining}"></progress><p class="lab-countdown">${Math.ceil(t.remaining)} training seconds remaining</p><p>Instrument integration is accelerated for teaching. Pausing the case pauses processing.</p></div>` : t.stage === "ready" ? observation(active, t) : `<p>\u2713 Finding recorded. ${t.runs} run(s).</p>${plot(active, t)}<p>${escape(t.data.note)}</p>${btn("Allocate fresh vessels & repeat", "repeat", s.portions <= Object.entries(s.stations).filter(([other, v]) => other !== active && !v.sample).length)}<p class="small">Repeating consumes one additional soil portion when you load it. Unloaded primary tests retain a protected reserve. ${s.portions} remain.</p>`}`;
  }
  function choices(map, name, type = "radio") {
    return Object.entries(map).map(([value, text]) => `<label><input type="${type}" name="${name}" value="${value}"> ${text}</label>`).join("");
  }
  function board() {
    const out = q(".lab-instrument");
    if (s.phase === "complete") {
      const r = s.report;
      out.innerHTML = `<span class="eyebrow">DEBRIEF / CASE CLOSED</span><h3>${r.ending}</h3><strong class="lab-final-score">${r.score} / 100</strong><p>${r.explanation}</p><dl class="lab-breakdown">${Object.entries(r.breakdown).map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl><p class="lab-review-feedback">${r.breakdown.support < 20 ? "Review: some supporting observations were missed or did not support this case. " : ""}${r.breakdown.conflict < 10 ? "Review: your report did not identify the strongest conflicting observation. " : ""}${r.breakdown.interpretation < 20 ? "Review: the selected mechanism or conclusion does not best explain this dataset. " : ""}${r.breakdown.confidence < 5 ? "Review: confidence exceeds or understates the strength of these synthetic observations. " : ""}${r.breakdown.followup < 5 ? "Review: choose a follow-up that discriminates the leading competing explanations. " : ""}</p><p><b>Your conclusion:</b> ${CONCLUSIONS[r.report.answer]} \xB7 ${r.report.confidence}% confidence.</p><p><b>Supporting evidence:</b> ${r.report.support.map((x) => EVIDENCE[x]).join(" ")}</p><p><b>Conflicting evidence:</b> ${r.report.conflict.map((x) => EVIDENCE[x]).join(" ")}</p><p><b>Your research note:</b> ${escape(r.report.note || "No additional note supplied.")}</p><p>${r.score >= 85 ? "Achievement: Careful investigator." : r.score >= 60 ? "Achievement: Evidence apprentice." : "Revision task: compare your claims with the control readings."} ${config.repeat && !r.repeats ? "Specialist execution credit reduced: no repeat was completed." : ""}</p>${btn("Export complete report", "export")}${btn("Investigate next fictional case", "replay")}<a class="button" href="#lab">Return to Science Lab \u203A</a><a class="text-link" href="#progress">Review field journal \u203A</a>`;
      return;
    }
    const ready = Object.values(s.stations).every((t) => t.recorded);
    out.innerHTML = `<span class="eyebrow">CENTRAL TERMINAL / EVIDENCE REVIEW</span><h3>Defend a claim.</h3>${Object.entries(STATIONS).map(([id, st]) => {
      const t = s.stations[id];
      return `<details ${t.recorded ? "" : "open"}><summary>${t.recorded ? "\u2713" : "\u25CB"} ${st.name}</summary>${t.recorded ? `<p>Sample / control: ${t.data.sample.map((v, i) => `${v.toFixed(1)}/${t.data.control[i].toFixed(1)}`).join(" \xB7 ")}. ${t.runs} run(s).</p><p>${escape(t.data.note)}</p>` : "<p>Record this experiment before submitting.</p>"}</details>`;
    }).join("")}${!ready ? "<p>Complete and record each instrument. Then the report form unlocks.</p>" : `<form class="lab-report"><fieldset><legend>Interpretation of this fictional case</legend>${choices(CONCLUSIONS, "answer")}</fieldset><fieldset><legend>Supporting observations (choose only those that support your claim)</legend>${choices(EVIDENCE, "support", "checkbox")}</fieldset><fieldset><legend>Conflicting observations or limits (different from your supporting choices)</legend>${choices(EVIDENCE, "conflict", "checkbox")}</fieldset><fieldset><legend>Best explanatory mechanism</legend>${choices(MECHANISMS, "mechanism")}</fieldset><label>Critical limitation<select name="limitation"><option value="">Choose\u2026</option><option value="specificity">Signals are nonspecific; controls can change sample chemistry</option><option value="certainty">Three tests eliminate all uncertainty</option></select></label><label>Next investigation<select name="next"><option value="">Choose\u2026</option><option value="blank">Repeat chain-of-custody with fresh procedural blanks</option><option value="mineral">Identify reactive minerals with independent chemical methods</option><option value="independent">Replicate with independent molecular methods and blanks</option></select></label><label>Confidence in your selected explanation <output>50%</output><input name="confidence" type="range" min="0" max="100" step="5" value="50"></label><label>Research note (optional)<textarea name="note" maxlength="1200" placeholder="What would change your mind?"></textarea></label><p class="small">Execution 20 \xB7 controls 15 \xB7 supporting evidence 20 \xB7 conflicting evidence 10 \xB7 interpretation 20 \xB7 limitations 5 \xB7 next test 5 \xB7 confidence 5. Written notes are retained; they are not automatically graded.</p><button class="button" type="submit">Submit scientific report</button><p class="lab-report-error" role="status"></p></form>`}`;
    const form = q(".lab-report");
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const f = new FormData(form), report = { answer: f.get("answer"), support: f.getAll("support"), conflict: f.getAll("conflict"), mechanism: f.get("mechanism"), limitation: f.get("limitation"), next: f.get("next"), confidence: +f.get("confidence"), note: f.get("note") };
        const result = evaluateReport(s, report);
        if (result.error) {
          q(".lab-report-error").textContent = result.error;
          return;
        }
        s = { ...s, phase: "complete", report: result };
        onScore("analysis", result.score);
        save();
        status();
        tone(660);
        board();
      };
      form.querySelector("[name=confidence]").oninput = (e) => e.target.previousElementSibling.textContent = e.target.value + "%";
    }
  }
  const click = (e) => {
    const move = e.target.closest("[data-move]")?.dataset.move;
    if (move) {
      if (s.phase === "arrival" || paused) {
        message("Enter the lab or resume the investigation first.");
        return;
      }
      view?.moveTo(move);
      target = move;
      open(move);
      return;
    }
    const a = e.target.closest("[data-lab]")?.dataset.lab;
    if (!a) return;
    if (a === "begin") {
      const caseId = q(".lab-case-select")?.value;
      s = newLab(difficulty, caseId);
      s = labAction(s, null, "arrive").state;
      curtain();
      status();
      save();
      startScene();
      room();
      return;
    }
    if (a === "pause") {
      if (s.phase !== "arrival") setPaused(!paused);
      return;
    }
    if (a === "resume") {
      setPaused(false);
      return;
    }
    if (a === "room") {
      if (s.phase === "arrival") return;
      if (paused) setPaused(false);
      room();
      return;
    }
    if (a === "sound") {
      sound = !sound;
      e.target.textContent = "Lab sound: " + (sound ? "on" : "off");
      e.target.setAttribute("aria-pressed", sound);
      if (sound) {
        tone(220);
        if (audio && !hum) {
          hum = audio.createOscillator();
          const gain = audio.createGain();
          hum.type = "sine";
          hum.frequency.value = 82;
          gain.gain.value = 6e-3;
          hum.connect(gain);
          gain.connect(audio.destination);
          hum.start();
        }
      } else audio?.suspend();
      return;
    }
    if (a === "interact") {
      if (target) open(target);
      return;
    }
    if (a === "replay") {
      const next = SCENARIOS[(SCENARIOS.findIndex((c) => c.id === s.caseId) + 1) % SCENARIOS.length].id;
      s = newLab(difficulty, next);
      active = null;
      paused = false;
      view?.pause(false);
      curtain();
      status();
      save();
      view?.enable(false);
      q(".lab-instrument").innerHTML = "<h3>A new question awaits.</h3><p>Read the next arrival briefing.</p>";
      return;
    }
    if (a === "export") {
      const url = URL.createObjectURL(new Blob([JSON.stringify({ trainingData: true, ...s }, null, 2)], { type: "application/json" })), link = document.createElement("a");
      link.href = url;
      link.download = "silent-explorers-lab-report.json";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1e3);
      return;
    }
    if (paused) return;
    action(active, a);
  };
  host.addEventListener("click", click);
  const change = (e) => {
    if (e.target.matches("[data-reading]")) {
      inspectIndex = +e.target.value;
      panel();
    }
    if (e.target.matches("[data-magnification]")) {
      magnification = +e.target.value;
      panel();
    }
    if (e.target.matches("[data-mode]")) {
      mode = e.target.value;
      panel();
    }
  };
  host.addEventListener("change", change);
  const key = (e) => {
    if (e.key === "Escape" && s.phase === "investigate" && host.contains(document.activeElement)) {
      e.preventDefault();
      setPaused(!paused);
    }
  };
  host.addEventListener("keydown", key);
  const joystick = q(".lab-joystick");
  let joyPointer = null, origin = null;
  function resetJoy() {
    joyPointer = null;
    view?.stick(0, 0);
    joystick.querySelector("span").style.transform = "translate(0,0)";
  }
  joystick.onpointerdown = (e) => {
    if (paused || active) return;
    e.preventDefault();
    joyPointer = e.pointerId;
    origin = { x: e.clientX, y: e.clientY };
    joystick.setPointerCapture(e.pointerId);
  };
  joystick.onpointermove = (e) => {
    if (e.pointerId !== joyPointer) return;
    const dx = e.clientX - origin.x, dy = e.clientY - origin.y, n = Math.max(34, Math.hypot(dx, dy));
    view?.stick(dx / n, dy / n);
    joystick.querySelector("span").style.transform = `translate(${dx / n * 28}px,${dy / n * 28}px)`;
  };
  joystick.onpointerup = joystick.onpointercancel = joystick.onlostpointercapture = resetJoy;
  function frame(now) {
    if (disposed) return;
    const dt = last ? Math.min(0.25, (now - last) / 1e3) : 0;
    last = now;
    if (!paused && !document.hidden) {
      const prev = s;
      s = advanceLab(s, dt);
      if (s !== prev) {
        uiTime += dt;
        const done = Object.keys(STATIONS).some((id) => s.stations[id].stage !== prev.stations[id].stage);
        if (done) {
          save();
          status();
          panel();
          tone(520);
          message("Instrument integration complete. Inspect the readings and compare the control.");
        } else if (uiTime > 0.2) {
          uiTime = 0;
          const t = s.stations[active];
          if (t?.stage === "running") {
            const p = q(".lab-processing progress");
            if (p) p.value = config.duration - t.remaining;
            const c = q(".lab-countdown");
            if (c) c.textContent = Math.ceil(t.remaining) + " training seconds remaining";
          }
        }
      }
    }
    raf = requestAnimationFrame(frame);
  }
  status();
  curtain();
  room();
  if (s.phase !== "arrival") {
    startScene();
    if (s.phase === "complete") {
      active = "board";
      board();
    }
  }
  raf = requestAnimationFrame(frame);
  return () => {
    disposed = true;
    save();
    cancelAnimationFrame(raf);
    view?.dispose();
    hum?.stop();
    audio?.close()?.catch(() => {
    });
    host.removeEventListener("click", click);
    host.removeEventListener("change", change);
    host.removeEventListener("keydown", key);
    host.classList.remove("laboratory-host");
  };
}
export {
  mountLaboratory
};
