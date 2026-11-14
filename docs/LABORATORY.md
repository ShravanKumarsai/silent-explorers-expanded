# Evidence room — Sample Analysis replacement

This revision updates draft PR #1 on `draft/expedition-colour-interactions`. It replaces the three instant-result Sample Analysis cards at `/#lab/analysis`. It does not create another app, replace the rover expedition, merge the PR or deploy the site.

## Audit and decision

Audited the PR head `4dcb35a98a8cddd22ebc1fc35d74ddb1d95a7e45`: vanilla ES modules, Vite, Three.js, local journal, eight mounted activities, the Opportunity expedition, fieldbook tutorials/sources, separate original-story iframe, NASA model/photo manifests, tests, cache/unification/preview scripts and prior QA notes. The previous Sample Analysis allocated three portions with instant preset text and awarded 100 for completing all cards and selecting uncertainty. Its original DOM test encoded that behavior. Source assets, original animation scripts, archived snapshots and official model binaries are preservation inputs, not code to redesign.

The root shell switches the opening frame and catalogue mutually exclusively. Hash routes, active mission, tutorials, journal scoring and cleanup are owned by `main.js`. The new lab returns its own cleanup through the existing `mountGame` contract. No original animation code is edited. `npm run verify` checks the preserved original files and model hashes; there is no promise that every historical animation sequence was visually re-tested.

Engine comparison, based on official documentation checked for this revision:

| Option | Fit, browser/mobile and loading considerations | Decision |
| --- | --- | --- |
| Three.js | Already pinned and used by museum/rover. Native ES modules, GLTF ecosystem, explicit resource disposal and responsive renderer sizing. WebGL2 on this pinned version; cap pixel density and avoid large textures/shadows for mobile. | Selected. Vite shares one lazy renderer chunk with existing 3D. |
| React Three Fiber | React renderer for Three.js, same underlying assets/browser constraints. Valuable declarative components in a React app, but requires React and compatible Fiber versions here. | Adds a second UI architecture without a required capability. No performance claim against Fiber. |
| Babylon.js | Integrated game-oriented engine with camera/collision/optimization tools and glTF support. WebGL/WebGPU options. Could implement this room, but would add a second renderer/runtime and separate asset lifecycle. | Suitable greenfield alternative; migration cost exceeds this room's needs. |
| PlayCanvas | Open engine with WebGL2 browser requirements, asset/entity tooling and mobile draw-call guidance. Standalone use is possible; editor workflow optional. | Viable, but creates another engine/toolchain to maintain. |
| Unity Web | Rich editor/physics/asset ecosystem. Current browser support depends on documented version/platform requirements; requires Unity project/export and Web build runtime. No assumption that all current Unity versions lack mobile support. | Export/runtime and bridge maintenance unnecessary for a small room inside this ES-module site. |
| DOM/SVG only | Light, accessible, excellent for readable measurements, but cannot satisfy first-person spatial exploration alone. | Used for contextual instrument displays and fallback, alongside the actual 3D room. |

References: [Three.js responsive rendering](https://threejs.org/manual/pages/responsive.html), [resource cleanup](https://threejs.org/manual/pages/cleanup.html), [React Three Fiber introduction](https://r3f.docs.pmnd.rs/getting-started/introduction), [Babylon scene optimization](https://doc.babylonjs.com/features/featuresDeepDive/scene/optimize_your_scene/), [PlayCanvas supported browsers](https://developer.playcanvas.com/user-manual/engine/supported-browsers/), [Unity Web compatibility](https://docs.unity.com/en-us/engine/6000.5/manual/platform-specific/webgl/intro/browsercompatibility).

No timing or bundle-size benchmark of unimplemented alternatives is claimed. The choice follows existing integration cost and required capabilities. New room/player chunk is approximately 10 KB minified, in addition to the already-used shared Three.js runtime; exact build sizes are in Vite output.

## Modules and assets

- `lab-data.js`: three fictional cases, difficulty settings, synthetic curves/counts/spectra, evidence and explanation keys. Repeat drift is deterministic and preserves case consistency.
- `lab-rules.js`: sample allocation, gated experiment transitions, integration time, record/compare rules, saved-state validation and report rubric. Pure functions are tested without WebGL.
- `lab-player.js`: keyboard movement, damped start/stop, look, pointer capture, touch-stick input and axis-separated room/counter collision.
- `lab-scene.js`: purpose-built room and visually distinct instruments, separately animated lids/tray/vials, live status screens, camera, responsive rendering and disposal. No historical hardware is invented or substituted.
- `laboratory.js` / `laboratory.css`: arrival dialogue, station interaction, accessible charts/readouts, microscope magnification, chemistry modes, evidence terminal, report, replay, export, opt-in synthesized sound and responsive controls.
- `games.js`, `fieldbook.js`, `content.js`, `main.js`: replacement mount, updated tutorial/description and stylesheet in existing workflow. Existing score callback records the best analysis score in the common journal.

A fresh browser opens a random case; the arrival selector allows deliberate choice. Seated station access is available at all difficulties and in the explicitly labelled no-WebGL fallback. It moves to the physical workstation in 3D; it does not bypass instrument sequencing or reveal results. Keyboard/pointer/touch interactions use the same experiment state.

## Scientific and gameplay boundaries

The lab is an analogue research exercise, not a Viking instrument reconstruction. The three generic trainers are gas analysis (heated aliquot control), microscopy/marker counting (procedural blank) and chemical spectrum analysis (procedural blank). NASA Viking and PDS sources are linked in the same activity. No NASA telemetry, scientific API or real microscopic images are fabricated.

Receive soil, load sample and control separately, close, activate, wait, inspect readings, review comparison and record. All three findings are required for the report. Multiple tests can integrate concurrently; a pause or hidden tab stops training-time integration. Interrupted integrations return sealed on reload, without revealing results early. Recorded measurements and completed report survive reload. A new case uses a new allocation budget; the best shared journal score remains.

Explorer has detailed guidance, 6 portions, 6-second integrations and low perturbation. Researcher has fewer hints, 5 portions and 8-second integrations. Specialist has 4 portions, 10-second integrations, noisier readouts, a signal/control and detection-threshold cross-check and a repeat requirement for full execution credit. Every primary test consumes one portion; control vessels do not spend soil. A repeat requires fresh loading and another portion. This finite budget permits all required tests plus at least one repeat at every level.

Three cases favor different interpretations: chemical gas response, handling contamination, or unresolved signals. They never establish life. Confidence targets are pedagogical rubric settings, not calculated biological probabilities. Synthetic mass peaks are teaching proxies, not actual compound identification. Text notes are preserved and exported but not automatically scored.

Rubric: execution 20, control review 15, supporting evidence 20, conflicting evidence 10, interpretation/mechanism 20, limitations 5, next investigation 5, confidence 5. Irrelevant evidence loses credit, the same item cannot be both support and conflict, and unsupported life claims cap the total at 45. Specialist without a repeat loses 6 execution points. Completion plus an uncertain answer cannot earn full marks. Debrief supplies the case explanation, score breakdown, revision feedback, achievements and the player's complete report. JSON export includes the case, readouts, decisions and rubric.

## Run and verification

Use Node 22+:

```sh
npm ci --cache /tmp/silent-explorers-npm
npm test
npm run build
npm run verify
python3 -m http.server 8030 --directory dist
```

Open `http://localhost:8030/` in regular Chrome for the original opening, or `http://localhost:8030/#lab/analysis` for this activity. Use WASD, drag to look, E interact, Escape pause; double click captures the mouse where permitted. On mobile use the left joystick and drag the room to look. Station access supplies a keyboard/seated alternative. Allow lab sound separately if desired. Changes are in the draft PR; these run instructions do not publish anything.

Repeatable browser suite, with a test-only Playwright installation:

```sh
QA_BASE_URL=http://127.0.0.1:8030 PLAYWRIGHT_MODULE_PATH=/path/to/playwright node scripts/laboratory-browser-qa.cjs
```

The ordinary production build now replaces the earlier ad hoc runtime preview files. `scripts/preview-local.mjs` delegates to that same build, avoiding stale precompiled module assumptions. This intentionally regenerates `dist/explore/` and `dist/index.html`; `dist/heritage/` retains the original presentation.

## Remaining limits

Generic instruments use compact procedural geometry and educational animations; this is not a photogrammetric room, engineering-grade instrument simulator or research tool. No physical laboratory hardware or actual rover can be controlled. Mouse capture varies by browser/embedding; drag-look always remains available. Touch emulation and software WebGL do not certify low-end physical Android frame rates, Safari behavior or exhaustive accessibility. An accessible fallback preserves the experiment flow when WebGL cannot start. No new external asset license or paid API is required.

Sample allocation reserves one portion for each as-yet-unloaded primary test. Early repeat choices cannot strand a case without enough soil to complete its required experiments. This is checked independently in the rules suite.

## Verification results for this PR revision

- `npm test`: **69 passing checks**. Lab coverage includes gated vessel/instrument actions, all 9 case/difficulty combinations, three distinct reasoning outcomes, penalties for irrelevant evidence/unsupported life claims, confidence calibration, finite repeat allocation, early-repeat reserves, player collision/touch bounds, cleanup, malformed-save recovery and replay from a paused debrief. Existing navigation, activity and expedition checks remain passing.
- `npm run build`: production Vite build passes. No package or lockfile changes and no new runtime dependency. `npm run verify`: all 82 preserved original non-entry files, 3 official NASA GLBs and 6 photos match; all 143 compressed InSight primitives decode without geometry edits; built asset paths pass.
- `scripts/laboratory-browser-qa.cjs`: actual Chromium/software-WebGL journey from the original opening through catalogue/Viking to the lab, then all 3 live timed experiments, graph/field/peak selection, 400× view, chemistry ratio mode, sample/control review, 100-point evidence report, saved-debrief reload, Mission Control return and shared journal entry. A second live Specialist case completes all 3 experiments, a repeat and a low-score revision ending, then next-case replay and difficulty cleanup. No page errors or broken local assets in this suite.
- Mobile follow-up (`QA_ONLY=touch`): 390 × 844 touch emulation, screenshot-confirmed joystick movement and touch-look perspective change, sample/control loading and no horizontal overflow. Explicit WebGL startup failure retains accessible instruments. A saved-case fixture verifies that replay from a paused debrief restores both movement and rendering. This fixture is narrower than a third complete browser playthrough.
- Existing rover browser regression: unified original-to-expedition transition, driving, 3 distinct camera feeds, frame capture, report behavior and mobile layout pass without page errors. Its report test uses the existing saved-state fixture; no claim that the browser drove the entire terrain route.
- `git -c core.whitespace=cr-at-eol diff --check` passes; modified legacy CRLF files retain their established line endings. Screenshots are generated by the browser harness into `QA_OUTPUT_DIR` (default `/tmp/silent-explorers-lab-qa`).

These checks do not prove photorealism, every browser/device, every original animation frame, every possible bug or physical Android performance. This remains a draft PR with no merge or deployment.
