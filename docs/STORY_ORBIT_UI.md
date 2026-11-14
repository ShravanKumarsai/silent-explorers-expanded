# Story Orbit UI and expedition organization

The catalogue and expedition now follow the static Story Orbit palette: `#0b161a` deep green-black, `#edf0e4` warm paper, `#d9e6b6` muted lime, and restrained sage secondary text. Shared navigation, panels, buttons, help, activity cards and the lab chrome use the same visual family. Instrument-specific colors remain useful identifiers.

DM Sans is now loaded locally in both documents rather than being declared but absent from the original page. IBM Plex Mono is used for small technical labels, and Georgia keeps the editorial Story Orbit heading treatment. Reading-slide line heights, fact baselines, headline spacing and control sizes are aligned consistently. Font files and OFL notices are bundled; no runtime Google Fonts requests are needed. The original animation scripts, transforms and timing values are unchanged.

## Navigation and layout

- A persistent Rover expedition shortcut appears in the static header and its menu. It remains usable after scrolling into the original archive. It uses the existing validated parent-message bridge to reach the same unified `#simulator/opportunity` route.
- The catalogue header also has a direct Rover expedition link. Mobile retains an Opening story return link beside the brand so the original story remains reachable.
- The expedition leads with one current objective and a Launch/Resume/Pause action. It fits above the fold at the tested desktop and phone sizes.
- The camera has its own responsive height. Previously its grid cell stretched to match the entire map/telemetry column, creating a very tall empty area and burying controls below it.
- Drive, Cameras and Science are separate tab panels. Map & sites and Rover status are separate side panels. Arrow keys, Home and End navigate the tab groups; selection and panel relationships use ARIA attributes.
- The briefing, historical references and technical notes are expandable. Power decisions, final reports and debriefs open the mission log automatically; the current-objective link labels the required action. They remain part of the complete mission workflow.
- The detailed mission history, official model, camera modes, controls, scientific report rules, journal and original story animations remain available.

`expedition-layout.js` owns the shell and tab behavior; `expedition.js` retains mission progression and state. `orbit-theme.css` is the final presentation layer for the catalogue. `heritage-src/presentation.css` is injected by the build only into the retained static document. Original static styles/scripts and source HTML remain unchanged against their preservation manifest. The bridge adds navigation elements rather than introducing a second page or overlay dashboard.

## Validation

- 72 automated checks pass, including new tab/keyboard, top-action placement and automatic power/report-panel tests.
- Production build and integrity checks pass. All 82 original non-entry files, 3 NASA GLBs and 6 photographs retain their bytes; all 143 InSight Draco primitives decode. Both bundled font files match their source copies, and new static presentation links resolve.
- Actual Chromium checks at 1440, 1024, 850, 390 and 320px: no horizontal overflow or header-control overlap; header shortcut works from the original archive; Launch is visible without scrolling; camera height stays at 300–446px; tab controls and briefing links work. The mobile round trip to the original opening and back also passes.
- Original Story Orbit still opens and advances to the generated reading slides with Georgia headings and DM Sans body copy. Original scripts and motion controls remain present.
- Rover regression exercises the official model, keyboard movement, three distinct camera renders, frame capture, evidence report behavior and mobile layout. Report coverage includes the existing saved-state fixture; this is not a browser-driven traverse of the entire terrain route.
- Tested flows have no page errors, missing local assets or external font requests. Screenshots are written to `/tmp/silent-explorers-ui` by `scripts/ui-browser-qa.cjs` (or `QA_OUTPUT_DIR`).

Run `npm ci`, `npm test`, `npm run build`, `npm run verify`, then serve `dist/` at the origin root. Browser suites accept `QA_BASE_URL` and `PLAYWRIGHT_MODULE_PATH`. These are local Chromium/software-WebGL and viewport checks, not certification of every physical phone, Safari, every animation frame or an exhaustive accessibility audit. No hosting deployment is part of this revision.
