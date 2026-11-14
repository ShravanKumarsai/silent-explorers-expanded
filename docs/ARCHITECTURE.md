# Architecture

The 82 original non-entry files remain byte-for-byte intact. The retained opening HTML loads its original scripts and styles inside `/heritage/`; the root entry is the unified shell. New source is isolated in `explore-src/`; Vite builds only `dist/explore/`, using new public assets in `explore-public/`. No shared runtime or global stylesheet crosses the document boundary.

`content.js` enriches primary-source mission facts in `research.json`. `state.js` owns versioned local progress. `simulation.js` implements deterministic traverse and landing rules; `games.js` mounts interactive activities and cleans up listeners/canvas observers. `main.js` owns hash navigation, UI state and route cleanup. `museum.js` is a lazy chunk using Three.js GLTFLoader and OrbitControls.

Official GLBs are immutable assets. Museum camera controls change only the view; bounding boxes highlight source groups without editing NASA materials/geometry. In simulator mode a parent wrapper translates/rotates/scales the whole rover uniformly to the educational terrain; no internal component transforms change. No clips or mechanical animations are enabled. Coordinates, synthetic telemetry, simulated terrain and historical facts are visibly distinguished.

The service worker is scoped only to `/explore/`. It caches essential educational content, application bundles and historical photographs after first online installation. Large models are excluded. It never intercepts or changes the original experience. Cache version derives from built content.

No backend, API keys, paid API, user account, external telemetry or AI service is required. Self-hosted DM Sans and IBM Plex Mono fonts are shared by the isolated documents; system fallbacks remain available. Storage failure is reported in the footer. Journal export produces a local JSON download.

Current architecture update: `docs/UNIFIED_EXPEDITION.md` supersedes the earlier two-entry presentation. The same outer document switches between a retained original-story frame and catalogue/game chapters, with mutually exclusive controls. The canonical app entry is now `/`.

The Sample Analysis mount now delegates to `laboratory.js`. Its pure state/data/rubric modules, lazy Three.js room/player, contextual instrument UI and cleanup reuse the existing hash route and journal callback. See `docs/LABORATORY.md` for the engine decision, fictional asset boundaries and verification.

The Story Orbit presentation revision adds `orbit-theme.css` as the final catalogue theme, `expedition-layout.js` for the rover shell/tabs, and an injected `heritage-src/presentation.css` layer for static typography/header additions. Both isolated documents load the same self-hosted font assets; CSS application remains inside each document. See `STORY_ORBIT_UI.md`.

Hardware viewing and engineering descriptions now mount together through `hardware.js`; `routes.js` preserves legacy machine/control/map links. `power-rules.js` and `power-operations.js` replace the duplicated operations dashboard/power game with one lab activity. Mission-specific study allocations and completed traverse history remain in the shared journal. The atlas is a Science Lab reference, not live telemetry. See `MISSION_TOOLS_REPORT.md`.
