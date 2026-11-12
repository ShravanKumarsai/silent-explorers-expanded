# Silent Explorers — Field Institute

The complete original Silent Explorers experience remains at `/`. The independent expanded application is at `/explore/`.

## Install, build and run

Use Node.js 22+ and npm. Run `npm ci`, `npm test`, `npm run build` and `npm run verify`. Then serve `dist/` with a static HTTP server, for example `python -m http.server 8000 --directory dist`. Open `http://localhost:8000/` for the original and `http://localhost:8000/explore/` for the expansion. On restricted machines pass a writable cache location to npm, e.g. `npm ci --cache /tmp/silent-explorers-npm`.

The build clears only `dist/explore/`, never the original site. Source is in `explore-src/`, new public assets in `explore-public/`. The original project does not need npm to run.

## Explore

- Six mission dossiers with distinct narratives, timelines, activities, hardware systems and source caveats.
- Official-model museum with rotation, zoom, pan, keyboard controls, source-mesh selection, external highlight boxes and full-screen mode where supported.
- Component field guides for all missions. Apollo LRV and Surveyor model gaps are explicit.
- Playable rover tactical view with optional lazy NASA MER 3D surface view; keyboard and pointer/touch controls, obstacles, energy, observations and saved traverses.
- Eight lab activities with controls, rules, feedback, scoring and replay.
- Mission Control allocation affects drive speed. Solar/RTG/battery distinctions are preserved.
- Latitude–longitude atlas distinguishes landing sites, approximate historical coordinates and final resting-location descriptions. It is not a terrain map or historical traverse reconstruction.
- Local journal, badges, best scores, traverse save/resume, JSON export and explicit progress reset. No account/backend needed.
- Opt-in short audio feedback, reduced motion and an offline cache for essential content after first online installation. Large models remain online-only unless already available through browser HTTP cache.

## Controls

Simulator: focus the terrain; W/S or ↑/↓ drive, A/D or ←/→ steer, Shift changes speed, E records an observation when stopped near a target. Touch buttons provide equivalent movement controls. The active drive allocation in Mission Control changes simulated movement speed. MER recordings represent in-situ observations, not sample-return caching. Apollo terrain and drive physics remain educational approximations, not a validated rover dynamics model.

Museum: drag to rotate, wheel to zoom, right drag to pan; two-finger gestures for zoom/pan. Focus the canvas for arrow/+/- keyboard controls, or use toolbar buttons. Full screen depends on browser support. NASA files are not rigged or modified to invent component motion; unsupported components have descriptions rather than fabricated internals.

## Deployment

Deploy the `dist/` directory at the origin root. `/explore/` must retain its trailing-slash entry path and hash navigation. A subpath such as GitHub Pages `/repository-name/` requires configuring Vite `base` and original root links for that hosting layout; it is not the default preservation deployment.

The new root `.openai/hosting.json` belongs only to this independent Site. The unchanged `dist/.openai/hosting.json` and copies inside backups are historical baseline files; never use their project ID for new deployment. Do not put credentials in any manifest or commit.

## Evidence and acceptance status

See `PROJECT_STATUS.md`, `docs/TESTING_REPORT.md`, `docs/ORIGINAL_FILE_MANIFEST.txt`, `docs/VISUAL_REGRESSION_CHECKLIST.md`, `NASA_3D_ASSET_CREDITS.md` and `THIRD_PARTY_ASSETS.md`. Unit and emulated-DOM tests do not prove browser rendering, touch-device behavior or visual equivalence. Those checks are explicitly outstanding.
