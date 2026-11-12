# Interactive fieldbook revision — 12 November 2026

## Changes

The expanded experience is now a colorful reading catalogue with a chapter contents page, paper reading panels, saved chapter completion and previous/activity/next chapter navigation. All eight activities have a goal, three-step tutorial and NASA reference desk. Historical facts and original NASA archive links remain distinct from simulated activity data. These are not live NASA telemetry or validated engineering simulators.

Original-to-expanded integration is additive: `dist/index.html` gains one deferred `fieldbook-link.js` tag. The separate script adds a quiet contextual fieldbook link and menu entry. All original animation scripts, stylesheets, timing values, mission records and illustrations are unchanged. The original repository is never modified.

Gameplay improvements: acceleration/coasting/braking, reduced reverse speed, zero-allocation mobility lock, mission-appropriate instrument selection, two-second stationary measurement integration, adjustable landing throttle with proportional fuel use, stricter experiment completion, varied component-answer order, duplicate-submit protection and clean restart behavior. Optional three-track ambient synthesis has volume and pause controls, continues across chapters and suspends in a hidden tab. It never starts before user activation.

## Verification

- Production build, 47 rule/emulated-DOM checks and model/hash/decoder checks pass.
- Actual headless Chromium 156 tested six readable chapters, chapter completion controls, all eight tutorial/source panels, sample-analysis completion/replay, keyboard rover movement and saved reload, soundtrack play/pause, original-to-expanded navigation and mobile route layouts.
- All three official NASA models loaded and rendered in WebGL with software rendering; zoom controls exercised and screenshots inspected. This is rendering evidence, not real-device performance certification.
- Desktop viewport: 1440 × 1000. Mobile layout: 390 × 844. No tested horizontal overflow or JavaScript page errors.
- Touch-enabled mobile Chromium emulation: held touch controls drive the rover and operate lander thrust, with changing telemetry/fuel and no page errors.
- Compared the original baseline and integrated root at desktop/mobile sizes under reduced motion. Stylesheet/script inventory (excluding the new bridge) and archive filtering counts match: 6 total, 2 Moon, 4 Mars. Representative home screenshots, with the added bridge hidden for comparison, differ by **zero pixels** at both viewports. This does not certify every original animation sequence or every scroll position.
- All 82 other original file hashes match. Removing only the new script tag from the entry HTML reproduces its original byte hash. Official NASA GLB bytes and materials remain unchanged.

`scripts/browser-qa.cjs` is the repeatable browser smoke suite. Serve `dist/` on localhost:8000 and run it with Playwright available (`PLAYWRIGHT_MODULE_PATH` can select an existing installation); it uses `/usr/bin/chromium`. Screenshots default to `/tmp/silent-explorers-qa` or `QA_OUTPUT_DIR`. Browser dependencies are test-only, not production requirements.

## Remaining limits

Real physical-device performance, exhaustive accessibility testing, every possible browser and every historical animation sequence remain unverified. Official Apollo LRV and Surveyor 3 models are still unavailable in the sources checked, and no substitute spacecraft was invented. NASA source links require connectivity; the playable data remains explicitly synthetic. No claim is made that every possible bug has been eliminated.

Final mission-context regression: the rock activity now selects a rover when the active catalogue mission is a stationary lander. A dedicated regression test passes.
