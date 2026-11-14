# Hardware, visibility and mission-tool review

## Findings and decisions

| Area | What the existing application actually did | Result of this revision |
| --- | --- | --- |
| Mission Museum + Inside the Machine | Two separate routes repeated the same mission/system material. One loaded a NASA model; the other presented engineering descriptions. | A single **Hardware & systems** page combines the official model, engineering selector, system explanation, source-group highlighting and related activity. |
| Mission Map | A read-only latitude–longitude atlas of six historical landing sites with NASA-linked sources. It was not a live spacecraft map, route planner or scored activity. | **Science Lab → Mission atlas**, clearly identified as a reference tool. It retains coordinates, reference systems, source precision and final-hardware descriptions, adds a direct mission-selection list, and separates it from the rover's synthetic driving map. |
| Mission Control | A local educational dashboard with power sliders, simulated/stored telemetry and mission history. Its drive allocation affected some tactical traverses; the flagship expedition had separate energy rules. Other allocations mostly expressed a plan rather than driving a full mission model. It was not connected to NASA operations. | Combined with the overlapping Power Management game as **Science Lab → Power & Operations**. It now has actual mission-specific planning decisions, predicted outcomes, three sequential shifts, reserve changes, revision costs, a scored report and replay. |

The atlas is therefore a **reference**, not a game to be relabelled as live tracking. Operations planning is an **activity**, so it belongs with the other Science Lab activities. Neither needs its own top-level navigation entry. The main navigation is now Explore missions, Hardware & systems, Rover expedition, Science Lab and Your field journal.

## The text-visibility defect

The screenshot showed the Viking evidence panel. Legacy `.sand .mission-special` CSS retained a dark olive background, while a later generic theme assigned dark-green text intended for a light surface. The heading and station titles consequently had almost no visual separation from the panel.

`hardware-science.css` supplies explicit foreground/background pairs with enough specificity to override those legacy mission accents. Mission callouts use a solid dark surface with light headings and body text. Paper reading panels use a solid light surface with dark text. The fix covers all six mission callouts, dossier summaries, scientific notes, timelines, the new hardware guide and lab-tool surfaces. Small science-row numerals were also darkened after the contrast check found them below the target.

Browser-computed contrast checks of the selected reading surfaces at 1440, 390 and 320px found a minimum **5.78:1**. These are targeted text checks, not a claim of exhaustive WCAG certification; images, every overlay and every assistive-technology workflow were not certified.

## Unified hardware page

The canonical route remains `#museum/<mission>`. It contains one model viewer and one **Inside the machine** guide, not two navigation destinations. Selecting a system updates its engineering explanation and highlights a separately identified source group when available. The guide remains readable before model loading and when WebGL fails. Model downloads are still lazy.

All previously supplied official NASA GLBs remain unchanged, with source geometry, proportions, textures and materials retained. No mechanical animations, invented internals or substitute spacecraft were added. Apollo 17 LRV and Surveyor 3 still show an explicit official-model gap and historical imagery. Source mesh labels are not asserted to identify every physical component.

## Power & Operations behavior

The selected mission determines the power model:

- **Apollo 17:** a finite training battery reserve; expenditure reduces the reserve across shifts, and a protected remainder is required. No solar recharge is added.
- **Viking 1:** constant RTG generation in the training windows, independent of sunlight. Instrument/radio workloads change. The stationary lander has no mobility allocation.
- **Surveyor 3, Spirit, Opportunity and InSight:** declining synthetic solar availability. Only the two rovers have a mobility allocation; stationary landers keep it at zero.

Every shift declares required thermal, communications, science and mobility loads. The live forecast shows allocated energy, margin, reserve after execution and whether each objective is funded. Over-budget or underfunded plans are rejected without consuming energy or advancing. Revision choices reduce shift credit. A valid decision updates reserve, records an operations-log entry and unlocks the next shift. Three accepted decisions produce the report and a `power` activity score in the existing journal; replay begins a new plan.

Explorer, Researcher and Specialist change available solar margin and protected battery reserve. Pure rule tests establish that all **18 mission/difficulty combinations** can complete and earn full credit. All units, durations, generation levels and scoring rules are synthetic teaching parameters, not NASA engineering specifications or telemetry.

Latest accepted allocations are retained as mission-specific study notes in the field journal and JSON export. They do not unexpectedly stop or reconfigure a separate rover session. Each rover activity manages its own energy and movement budget. The earlier global drive-slider coupling is retired with the old dashboard. Existing saved progress remains compatible; no journal reset or storage-version migration is required. Completed traverse history remains accessible in the field journal as well.

## Atlas behavior

The atlas opens on the active mission and supports Moon/Mars switching, keyboard-accessible mission buttons and per-site NASA-linked precision notes. It identifies **landing locations**, and describes rover final resting locations separately. The coordinate grid is not a terrain basemap or a reconstruction of traverse routes.

An additional positioning defect was corrected: old CSS translated the entire marker button to accommodate its label, shifting the dot off the plotted coordinate. Each dot is now anchored at its latitude/longitude percentage; only the selected label is offset. A separate mission list keeps selection easy on phones without moving the coordinate anchors.

## Compatible routes and workflow

| Previous link | Canonical destination |
| --- | --- |
| `#machine/<mission>` | `#museum/<mission>` — combined hardware page |
| `#control/<mission>` | `#lab/power` — selected mission retained |
| `#map/<mission>` | `#lab/atlas` — selected mission retained |

The aliases use history replacement inside the existing app, preserving the chosen mission without creating a duplicate page. Dossier links now open the combined hardware page once. The evidence-room debrief returns to Science Lab. The persistent Rover expedition shortcut and the original opening/story animation bridge remain in place. Skip-to-main now focuses the reading area rather than accidentally navigating the hash router to an unknown page.

## Files and validation

- `hardware.js`: combined viewer and system guide, model controls, source caveats and cleanup.
- `routes.js`: canonical/legacy-route resolution.
- `power-rules.js` / `power-operations.js`: pure planning state/scoring and the interactive activity/report.
- `hardware-science.css`: explicit contrast pairs and responsive hardware, atlas and planning layouts.
- `main.js`, `content.js`, `games.js`, `fieldbook.js`, `interactions.js`, `laboratory.js`, `state.js`: shared navigation, mission context, tutorials, journal and return links.
- `tests/power-operations.test.js`, updated navigation/activity tests and `scripts/hardware-browser-qa.cjs`: planning, aliases, integration, rendering, contrast and report checks.

81 automated checks pass. Production build, original/model/photo/font integrity and all 143 InSight Draco primitive decodes pass. Chromium/software-WebGL tests load all three official assets in the combined guide, operate zoom/system selection, verify legacy links and atlas anchors, complete RTG/battery/solar planning sessions, replay them and check shared journal credit. Checked desktop/phone layouts have no horizontal overflow, page errors or missing local assets.

Run `npm ci`, `npm test`, `npm run build`, `npm run verify`, then serve `dist/` from the origin root. The focused browser suite accepts `QA_BASE_URL`, `PLAYWRIGHT_MODULE_PATH` and `QA_OUTPUT_DIR`. Physical-device performance, exhaustive accessibility and every original animation frame remain outside these checks. Hosting deployment is not part of this revision.
