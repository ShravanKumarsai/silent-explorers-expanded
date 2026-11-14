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

## 2026-11-14 — NASA archive, source parts and expedition recovery

See [the full implementation/source/limitations report](ARCHIVE_AND_EXPEDITION_UPDATE.md) and [regular Chrome/local serving instructions](RUNNING_SITE.md).

- Current Science Lab has seven activities plus the mission atlas. Retired collector bookmarks enter the expedition. Historical eight-activity results above describe earlier versions.
- `npm test`: 88 passing tests. New coverage checks orbit distribution, exposure-date semantics (43 caption-derived date/period labels, without treating publication timestamps as exposures), all 56 photograph/thumbnail hashes, source geometry transform preservation during exploded inspection, invalid download retry/cache behavior, cancellation/deadline, and exact preservation of official MER materials and embedded texture bytes.
- `npm run build` and `npm run verify`: pass. All 82 original-file preservation checks pass, the three original official model files remain byte-identical, and all 143 compressed InSight primitives decode. Five new exhibit visual assets, 56 full photographs, 56 thumbnails and the 40-object MER derivative verify against manifests.
- `scripts/archive-browser-qa.cjs`: real headless Chromium WebGL passes Moon/Mars entry, 24/32 orbit collections, raycast hover/click, image metadata, internal viewer clicks, outside/Escape closing, mission filters, zoom/pause/reset, and exact rendered orbital return with camera/orbit paused. Source-part selection, separation, isolation, location and reassembly pass for Spirit/Opportunity (40 objects each), Viking (2) and InSight (100). Apollo/Surveyor each show four NASA photo previews. WebGL-disabled fallback and its image viewer pass. Touch emulation at 390px exercises pinch and photo open/close without overflow. No uncaught page errors.
- `scripts/expedition-recovery-qa.cjs`: invalid/truncated model retry, restart during loading, leaving/re-entering during loading, single-renderer attachment, actual WebGL context loss/restoration, tactical driving, and disabled unavailable camera/capture controls pass. No uncaught page errors.
- `scripts/browser-qa.cjs`: actual driving, three distinct camera views, frame capture, unified original-to-expedition transition, saved report interpretation and final journal entry pass; no page errors.
- `scripts/hardware-browser-qa.cjs`: all six mission contrast/readability surfaces at 1440/390/320px, hardware loading/controls, legacy routes, atlas source-coordinate checks, three operations reports/replay/journal and no overflow pass; no missing local assets or page errors.
- `scripts/ui-browser-qa.cjs`: original header and expedition at 1440/1024/850/390/320px, original animation navigation/reading, retained original return, first-view launch, tabs and self-hosted fonts pass; no local 404s, external font calls or page errors.

These are Chromium software-rendering/touch-emulation checks, not certification on physical Android hardware. NASA models are visualization meshes, not complete engineering CAD; the missing Apollo/Surveyor model gaps, coarse Viking grouping, synthetic camera/data semantics and asset usage conditions are documented explicitly. No hosting deployment was performed by these checks.

## Photo-browser hover and catalogue alignment

Photo browser cards lift with a subtle shadow and image zoom on pointer hover; keyboard focus receives the same lift. System and application reduced-motion settings disable transforms/transitions. Catalogue hero, collection headings, mission-card copy and photo-browser captions are centered. Production build and asset verification pass. Chromium checks confirm centered card text, hover transform, reduced-motion suppression, working photo selection/Escape, and no horizontal overflow in the catalogue/archive at 390px.
