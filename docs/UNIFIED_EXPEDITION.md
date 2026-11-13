# Unified story and rover expedition

## One reading journey

The root URL is now the single entrance. The original experience is the opening chapter; its own animation scripts, CSS, artwork, timing and interactions are retained in an isolated document at `/heritage/`. The main application is hidden and inert to the user while the opening is visible. Continuing from the opening changes a chapter hash in the same outer document. The original document is retained so returning can restore the reading position. There is no floating fieldbook button, duplicated header or second set of game controls over it.

The old `/explore/` entry remains compatible and canonicalizes its URL to the root without a document reload. Original-to-catalogue and original-to-expedition buttons are part of the opening's final chapter, with a catalogue link in its menu. The technical document boundary protects the original global scripts/styles; it does not present a second site or a second navigation workflow.

## Flagship mission: The water question

1. Read a flight director briefing and launch the official NASA Opportunity model.
2. Drive with acceleration, braking and collision hazards. Follow three synthetic science stations on the tactical map.
3. Choose close imaging, APXS or a mast panorama according to the station. Remain stationary for a timed integration. Moving interrupts the observation.
4. Respond to a dust advisory. A decision is required before continuing; conservation lowers speed, while continuing increases energy demand.
5. Return to the communications beacon after all observations. The mission does not end at the last collectible.
6. Review evidence, reject an unsupported life claim and transmit a qualified ancient-water conclusion.
7. Receive a scored mission report and journal credit. Energy depletion or excessive collision damage produces a failure review and retry path.

The mission saves separately from short lab activities. Restart clears transient camera captures and resets camera controls. Successfully completed observations, a traverse and the collector score enter the existing field journal.

## Working cameras

The exterior view shows the actual unmodified NASA/JPL-Caltech model moving as a whole. Mast and front-navigation modes render from educational rover-relative viewpoints, with mast pan/tilt controls. A second navigation-camera inset renders the same changing scene concurrently. Camera-frame capture records up to four images for the current session.

These are **real-time rendered camera images from the simulation**. They are not a live Mars downlink, a physical-rover remote-control system, calibrated camera poses or real NASA telemetry. Opportunity is no longer operational. Training terrain, station positions, instrument outputs, energy/damage budgets, event timing and driving speed are synthetic. Model geometry, textures and materials are retained; wheel/arm joints are not animated without a documented rig.

NASA source links are present in the mission reference desk: the official MER model, Opportunity mission record, and the PDS MER observational archive. Procedural terrain and cameras are application elements, not NASA cartographic reconstructions.

## Checks and limits

57 automated checks pass, including the complete mission state progression, instrument/camera gating, interruption, return requirement, false-conclusion rejection, success/failure, dust decisions and saved-state sanitization. The production build, original-source hashes and NASA model hashes/Draco checks pass.

Headless Chromium exercised the original opening-to-expedition transition without an outer-document navigation, keyboard driving, three distinct camera renderings, camera-frame capture, incorrect/correct report submission, journal navigation and mobile layout without horizontal overflow or page errors. The report screen uses a saved-state fixture; this is not a claim that an automated test drove the entire terrain route. Core state tests exercise all three integrations and the return/report rules. Browser tests use software WebGL; real-device performance and exhaustive accessibility checks remain outstanding.

The game is a more complete educational mission, not a high-fidelity NASA operations simulator. Official Apollo LRV and Surveyor 3 model gaps remain explicitly documented.
