# NASA photographic archive, source-part explorer and expedition reliability

Implemented on 14 November 2026. This update follows the additional pasted requirements and preserves the original opening animation sources.

## What changed

- Removed Rock Collector from Science Lab. Seven laboratory activities remain, plus the historical mission atlas reference. Existing `#lab/collector` bookmarks lead to Rover Expedition. Previous expedition records remain readable; the Scientist badge now depends on the seven lab activities.
- Added Photo archive to the shared navigation and connected the original story’s Archive links to it. Original reading/animation code stays intact; the persistent opening iframe retains its place. The archive has two initial entry points, **Moon Missions** and **Mars Missions**, in one implementation.
- Added a NASA-textured Moon, authentic NASA MER rover, 24 lunar/32 Martian photographic tiles, and small official HETE satellite models. Lunar tiles cover three complete spherical bands; Martian tiles occupy four differently inclined orbital paths. Thumbnails almost touch, begin translucent, and rise along their own orbital normals on hover. Hover affects one tile only, with smooth opacity/scale/lift and a fine edge highlight.
- Selecting a photo detaches its display mesh, brings it forward, and opens a detailed image viewer. Outside click, Close and Escape return it to its source orbit. The camera is preserved; user pause preferences survive selection. Internal viewer clicks remain internal. Drag, touch, pinch, zoom, rotation pause/resume and reset work in the same scene. World changes fade the previous installation and introduce the next.
- Added NASA caption/ID/source/credit/date metadata, mission filters, a compact hover record and full photograph viewer. 43 records have caption-verified exposure dates, ranges, approximate periods or mission sols; 13 retain an explicit unverified-date label. These are distinguished from cataloguing dates. All images are NASA photographs or photographic mosaics, including clearly captioned Earth testing/training/context images. There is no generated mission photography.
- Added an accessible image browser for keyboard/touch use and WebGL failures. Each world lazily decodes its 384-pixel orbital previews with concurrency limited to four; full images (up to 1600 pixels) load on selection. The renderer caps device pixel ratio, stops drawing offscreen/in hidden tabs, limits satellite counts on narrow screens, and respects reduced motion.
- Added the source-part explorer to Hardware & Systems. Spirit and Opportunity share an official NASA Blender source with **40 named hardware objects**, including six wheel objects, body/chassis, suspension, mast, antenna and arm parts. InSight exposes **100 supplied mesh groups**; Viking exposes only **two coarse source meshes**. A slider separates independent display instances, a selector locates parts, isolation shows one source part, and Reassemble restores the original display. This is an inspection illustration, not a mechanical disassembly animation or an invented interior.
- Added four NASA photo previews each to the hardware pages, including Apollo 17 and Surveyor 3, with links to their complete archive collections and original NASA records.
- Added a small rendered view of NASA’s HETE satellite orbiting the **Abandoned, Not Forgotten** wording in the fieldbook and original footer. CSS changes its stacking order so it passes behind the text. It is decorative, secondary, and pauses for reduced motion/global pause.

## Expedition fixes

The previous render setup could allocate a WebGL scene before its asynchronous model load completed. Leaving/restarting during loading could therefore leave a stale scene or attach the result to an abandoned page. The shared loader now fetches/validates the complete GLB before allocating a renderer, supports abort/deadline/progress, caches only completed valid downloads, and disposes late decoded results. A per-session token prevents stale completions from attaching.

Load errors offer a real retry, reload and a clearly labelled tactical-map mode. Camera selection/frame capture are disabled when graphics are unavailable. Tactical mode can drive and integrate explicitly synthetic observations without pretending to supply imagery. WebGL context loss pauses and saves the mission, disables capture and offers recovery. Restart cancels loading and resets the session; the saved endgame can load its 3D view without restarting the mission.

Keyboard release is tracked at the window, focus changes clear held keys, opposite directions combine correctly, and simultaneous touch steering/driving uses independent pointer IDs. Camera capture reports errors and keeps at most four frames. Overlay buttons retain their DOM identity during telemetry updates so a render between pointer-down and click cannot discard the action. The optional score sound also starts its oscillator correctly.

## Technical approach and files

The repository already uses Three.js and ES modules. Reusing them avoids a second graphics stack and preserves the existing vanilla/Vite application. `archive-scene.js` owns one renderer and shared world/selection lifecycle; `photo-archive.js` owns the accessible controls, metadata and modal; `archive-rules.js` contains the mission names, orbit layout and date rules. `archive.css` follows the existing Story Orbit palette: `#0b161a`, `#142327`, `#edf0e4`, `#a8bdb3`, `#d9e6b6`, and matching muted borders. DM Sans/IBM Plex Mono and existing editorial serif headings remain consistent.

New source files: `explore-src/archive-scene.js`, `photo-archive.js`, `archive-rules.js`, `archive.css`, `nasa-loader.js`, `exploded-view.js`; `explore-public/motto.css`; NASA photo/model/map manifests and assets in `explore-public/assets/archive/`; conversion scripts in `scripts/nasa-assets/`; `tests/archive.test.js`; archive and recovery browser QA scripts.

Integration changes: `main.js`, `content.js`, `routes.js`, `state.js`, `hardware.js`, `museum.js`, `expedition.js`, `hardware-science.css`, app `index.html`, original `heritage-src/bridge.js`, build/cache/verification scripts, navigation tests, attribution documents and generated `dist/` output.

## NASA sources and provenance

- [NASA 3D Resources](https://science.nasa.gov/3d-resources/) and [official NASA repository](https://github.com/nasa/NASA-3D-Resources), checked at commit `11ebb4ee043715aefbba6aeec8a61746fad67fa7`.
- [Spirit and Opportunity source](https://science.nasa.gov/3d-resources/mars-exploration-rover-spirit-and-opportunity/): NASA/JPL-Caltech. The alternative Blender source is converted at its saved frame 1243, with geometry/pose retained and NASA static-display materials/textures restored by matching source material names. Non-hardware control boxes remain transform-only nodes. No source animation clips are exported. Conversion and material-repacking scripts are supplied.
- [HETE](https://science.nasa.gov/3d-resources/high-energy-transient-explorer/): NASA/Christopher R. Meaney. Downloaded GLB unchanged; miniature PNG rendered from it.
- [NASA CGI Moon Kit](https://svs.gsfc.nasa.gov/4720/): NASA/Goddard/Ernie Wright, based on LRO LROC/LOLA. Source maps unchanged; application lighting/bump intensity are illustrative.
- [NASA Image and Video Library](https://images.nasa.gov/) and [API](https://images-api.nasa.gov/). `photos.json` records all 56 IDs, NASA captions, credits, original/download links, dates, image processing and full/thumbnail checksums.
- `NASA_3D_ASSET_CREDITS.md` and `assets/archive/assets.json` document each visual asset, creator, format, modifications, usage conditions and checksum. Existing three NASA display GLBs retain their exact source bytes.

## Verification

- `npm test`: **88/88 pass**. `npm run build` and `npm run verify`: pass.
- Preservation: 82 original-file checks, three original official NASA GLBs unchanged, all 143 compressed InSight primitives decoded. Five exhibit assets, 56 photographs, 56 thumbnails and 40 MER objects verify against their manifests.
- Actual Chromium WebGL: both archive worlds, raycast hover/select, full image metadata, internal/outside/Escape behavior, filters, orbit/zoom/pause, and **identical rendered orbit before/after photo return with rotation paused** pass. Source-part controls pass for both MER missions, Viking and InSight; Apollo/Surveyor photo fallbacks pass. WebGL-disabled archive fallback works.
- Chrome touch emulation at 390px: pinch, image open/close and no horizontal overflow pass. Existing original/expedition UI checks also pass at 1440/1024/850/390/320px; mission contrast checks pass at 1440/390/320px.
- Expedition: actual movement, three distinct simulated camera views, frame capture and endgame report/journal pass. Invalid download retry, cancellation on restart/route exit, one renderer on re-entry, actual WebGL context loss/restoration, tactical driving and unavailable-camera control states pass.
- Original Story Orbit navigation/reading and fonts remain functional. Browser suites report no uncaught page errors or missing local assets in normal flows.

Reproduction commands and detailed outcomes: [FIELDBOOK_QA.md](FIELDBOOK_QA.md). Run locally in a regular Chrome tab using [RUNNING_SITE.md](RUNNING_SITE.md).

## Limits

The repository contains three rovers (Apollo LRV, Spirit, Opportunity) and three landers (Surveyor 3, Viking 1, InSight). The four Mars missions are not four rovers. No suitable official Apollo LRV or Surveyor-family downloadable model was located after repeating the NASA catalogue, mission-page and official repository searches. NASA photographs are the explicit fallback; another mission is never relabelled.

NASA visual models are not complete engineering CAD. The smallest fasteners, hidden interiors and exact disassembly sequences are unavailable, and Viking has only two coarse groups. Source-part separation does not claim otherwise. The MER Blender derivative retains source viewport-visible parts and source saved pose; its audit records source render-hidden flags. No motion is claimed to reproduce historical mechanical operation.

The 56-image collection is curated, not every NASA image ever published for these missions. It is bundled with verified metadata rather than depending on a fragile runtime NASA search endpoint. It is not live telemetry, live photography from Mars, a real rover command interface or science-grade cartography. Camera feeds are local simulated views; the underlying mission machines are inactive. Mobile checks use Chromium touch emulation; physical Android hardware performance is not certified. Large models/full photographs require a connection when not already cached by the browser. Hosting deployment is separate from updating GitHub main.
