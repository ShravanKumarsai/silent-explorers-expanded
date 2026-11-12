# Testing report — 2026-11-12

## Passed

`npm test`: 40 tests pass (22 deterministic-rule tests, 11 emulated-DOM activity tests, 7 emulated-DOM navigation/integration tests).

- Persistence: corrupt/versioned storage recovery, save/reload, quota failure, best-score retention and achievement rules.
- Power: over-allocation and missing reserves reject; dust changes solar generation and does not affect RTG supply; drive allocation changes movement speed.
- Traverse: forward movement, energy use, collision, world bounds, Spirit mobility constraint, stationary/proximity observation requirements, duplicate prevention, completion and depletion.
- Landing: safe/unsafe touchdown rules and fuel exhaustion.
- Routes: segment collision, distance and a feasible safe route within the hardest budget.
- Science: scanned evidence scoring and deployment-site suitability.
- UI controls in an emulated DOM: analysis allocation/report/replay, water scans, three power rounds and failure feedback, accessible deployment controls, safe/incomplete route outcomes, five component questions, landing/collector controls, traverse save/restore.
- Navigation in an emulated DOM: all primary destinations, all six distinct dossiers, all eight activities, mission changes inside lab, Moon/Mars marker switching, coordinate notes, power-plan application, explicit missing-model states, stationary-lander routing and unknown-route recovery.

`npm run build`: Vite production build passes. The main bundle is approximately 89 kB (32 kB gzip), the lazy Three.js/museum chunk approximately 601 kB (154 kB gzip), CSS approximately 36 kB (8 kB gzip). Models and photos are loaded separately; no model is downloaded on the mission-selection page.

`npm run verify`: all 83 original file blob hashes remain identical; all three official GLB source SHA-256 hashes and built copies match; six photo hashes match; built HTML asset paths and original static HTML paths resolve; service-worker scope is limited to `/explore/` and models are excluded from precaching.

Attachment audit: all 32 uploaded project files matched source; three ZIP CRC checks passed. JavaScript syntax checks passed for 39 current/archive copies, SVG parsing for 38 archive files, WebP image checks for 60 archive files, and syntax parsing for the Python tool. SVG archive differences from repository were line endings only.

NASA asset audit: GLB2 headers/chunks/lengths, buffer-view bounds and all 34 embedded texture decodes passed. The six downloaded photographs decoded successfully. Source model animations remain disabled; no geometry edits or independently generated substitute spacecraft.

## Failures found and corrected

- Initial route scoring allowed unsafe/incomplete paths to pass. Completion now requires all stations, obstacle clearance and budget compliance.
- Initial deployment scoring could pass unsafe placement with a correct waveform answer. Both placement and classification now must succeed.
- Mission Control drive allocation was initially disconnected from simulator speed. It is now supplied to the traverse rules and tested.
- Mission-selector state required explicit DOM synchronization after rendering. Navigation regression test now passes.
- Traverse animation scheduling now stops while paused/hidden and wakes on resume; route/deployment canvases redraw on resize. Listener/observer disposal is explicit.

## Not verified

No supported `cua_repl.js` browser tool is available. No preview browser, alternate browser-control path, screenshot comparison, real WebGL render test, real touch-device test, accessibility audit or lower-powered-device frame-rate test was performed. Happy DOM canvas calls are stubbed and do not validate pixels, GPU rendering or responsive layout.

Original runtime animation timings/appearance are preserved by unchanged source but have not been visually exercised. Museum camera framing, model orientation, hotspot/source-group usefulness, fullscreen behavior, actual mobile gestures, service-worker offline installation, audio support and device performance remain browser-QA items.

Deployment success, if recorded separately in PROJECT_STATUS, verifies hosting only; it does not close these runtime acceptance gaps.

## Official InSight decoder validation

The primary InSight model is the unmodified NASA/Brian E. Kumanchik arm-deployed, landed, pre-instrument-deployment asset (3,949,036 bytes). All 143 compressed primitives decode successfully with the bundled JavaScript Draco decoder; decoded vertex counts match declared glTF accessors and required attributes exist. This validates decode data, not WebGL rendering or precise visual component placement. Local WASM decoder/wrapper and Apache license are included.
