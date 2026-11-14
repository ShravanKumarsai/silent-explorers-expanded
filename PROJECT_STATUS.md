# Silent Explorers project status

## Authorization and identity

The user confirmed ownership of the original code/artwork and authorized copying, modification and republication in this conversation. Destination owner is verified as `ShravanKumarsai` through the connected GitHub account. Terminal `gh` is authenticated to a different account and is not used for GitHub writes.

## Preservation milestone

- Complete original import: commit `6fb692b87402f199261098f6362eeb9e0ec2ee79`.
- Source: `jadonjoel/NASA-hackathon` at `d68d70aa53e160d47fe3eacaceb0d39a5b61c232`.
- All 83 original paths, blob hashes and file modes verified equal in destination.
- Original repository untouched; no write remote to it exists locally.
- Original static experience retained at `/`; new experience lives at `/explore/`.
- GitHub connector import preserves complete file content and source provenance. Original single-commit SHA is recorded; destination history begins with an authorization record and import commit rather than claiming the original commit identity.
- Original archived hosting configuration is retained only as baseline data. A new root hosting manifest identifies the independent Site.

## Expanded implementation

Implemented source modules: six sourced mission dossiers and distinct mission activities, component guides, official-model museum, tactical rover simulation with optional official MER 3D surface view, eight lab activities, operations budgeting, coordinate atlas, local progress/badges, journal export, opt-in audio feedback and reduced-motion controls.

Models: unmodified NASA shared MER, Viking 1 and InSight assets. Apollo 17 LRV and Surveyor downloadable models not located; no replacements supplied. Component mechanisms remain static. InSight uses NASA’s approximately 4 MB landed pre-instrument-deployment model with named instrument nodes and locally bundled Draco decoding; ground-deployed instrument completeness is not claimed.

## Validation status

- Original source integrity: passed (83 files).
- Attachment/archive syntax and image integrity: passed, see testing report.
- Expanded validation: 42 passing tests (24 rules, 11 activity DOM, 7 navigation/integration DOM).
- Production build and final integrity/path checks: passed.
- Browser rendering, touch/device behavior, visual regression, accessibility audit and lower-powered-device frame rates: unverified. No `cua_repl.js` browser tool is available in this environment; no substitute browser-control route is used.
- Expanded implementation committed as `987a02f39cf0402858ea481b101c05ee654b4b28`; first private deployment succeeded. Persistence regression correction published successfully from `b15bbcdfb1950ff331b292251010bafa577e247b`.

## Hosting and remaining acceptance gaps

- Independent private Site: https://silent-explorers-expanded.easybuckle.chatgpt.site
- Original experience: `/`; expansion: `/explore/`.
- Source and asset import are complete. All 42 automated checks, production build, original/model integrity checks and 143-primitive Draco decode validation pass. The correction restores in-progress traverses after browser-storage reload and rejects malformed saved data.
- Final private publication succeeded on 2026-11-12. Deployment: `appgdep_6af5fc8c6a108191a6bd85fe036d037b`. Published source: `b15bbcdfb1950ff331b292251010bafa577e247b`. Native hosting success verifies deployment, not browser rendering.
- Packaging excludes only the original inert `dist/.openai/` metadata; all original repository files remain unchanged.
- Supported Sites helper scripts were not installed in this environment. Publication used the Site-scoped credential via hidden stdin for a standard authenticated Git push, then a static artifact archive and native private publication. No credential was written to files or source.

Outstanding: browser/mobile/visual/accessibility/performance QA, suitable official Apollo LRV and Surveyor models, and visual verification of component selection and model framing. These are acceptance gaps, not completed checks. The atlas remains a coordinate grid rather than an exact terrain/route reconstruction.

Do not describe the full original acceptance criteria as satisfied until these gaps are resolved.

## Interactive fieldbook revision

Implemented connected original/expanded navigation, colorful reading catalogue, chapter completion, tutorials and NASA reference desks, improved driving/measurement/landing mechanics, stricter scoring and opt-in ambient music. 47 automated checks pass. Actual Chromium browser, WebGL and mobile/touch emulation checks now pass; see `docs/FIELDBOOK_QA.md`, which supersedes earlier browser-tool limitations. Representative original home screenshots match baseline at desktop/mobile sizes with the additive bridge hidden. All original animation code and timing remain unchanged. Fieldbook publication succeeded from `493c01f9d989d24b5d612e7a6a7c0a8bce1e2a94`. A final stationary-lander/rover activity guard is included in the subsequent correction.

Final fieldbook correction deployed successfully from `0e5cfe1f61f55ddf549fdd7a6ae9d9c48592459f`. Native deployment `appgdep_6af6078534b08191808a036512dc4b0c` succeeded. The 47-check build and original-animation preservation evidence are documented in `docs/FIELDBOOK_QA.md`.

## Unified story expedition revision

The root is now one continuous reading flow, retaining the original presentation as the opening chapter and replacing floating cross-site links with contextual chapter navigation. The flagship Opportunity game has three rendered camera modes, a live navigation inset, frame capture, instrument integrations, collision/energy consequences, a dust decision, return leg and an evidence-based end-game report. 57 checks pass; Chromium camera/report/unified navigation checks pass. See docs/UNIFIED_EXPEDITION.md for exact evidence and simulation limits. Publication pending.

Unified root and story expedition publication succeeded from `a57f8d6fad62cc1fb4e3092283e252685405c875`. Deployment `appgdep_6af69876351c8191a6f1dc4d5f6eb70c` succeeded on 13 November 2026. Root URL: https://silent-explorers-expanded.easybuckle.chatgpt.site/ . Original opening, catalogue and expedition now share one outer navigation workflow. Camera feeds are live simulation renders, not Mars downlinks.

## Draft PR #1 — evidence-room laboratory revision

Replaces Sample Analysis in the existing unified route with a first-person generic analogue lab: sample intake, 3 physical instruments, timed sample/control workflows, interactive graphs/spectra/microscopy, central evidence report, 3 fictional cases, 3 gameplay difficulties, finite repeat allocation, scored endings, replay and report export. Uses the existing Three.js dependency and shared journal callback. No official NASA model or original animation source is changed. Lab geometry and readings are expressly fictional training content.

69 automated checks, production build and original/model/photo/Draco verification pass. Actual Chromium/software-WebGL browser tests pass two live case workflows, return/journal integration, Specialist repeats, replay, mobile controls and fallback; the existing rover-camera regression passes. See `docs/LABORATORY.md` for exact evidence, engine comparison, changed modules, controls and limitations. These updates belong to the draft PR branch only; no merge or deployment was performed for this revision.

## Story Orbit UI revision

Unifies the catalogue/expedition palette with the original Story Orbit, self-hosts the body/technical fonts, improves original reading typography, adds persistent expedition shortcuts and a mobile opening-story return, and organizes rover controls into focused tabs and expandable notes. The camera grid-stretch issue is corrected and Launch is above the fold. See `docs/STORY_ORBIT_UI.md` for changed modules, exact checks and limits. Original animation source and NASA models are preserved. This revision does not deploy hosting.
