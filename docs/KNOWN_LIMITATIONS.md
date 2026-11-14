# Known limitations

- Official downloadable Apollo 17 LRV and Surveyor lander models were not located in the checked archives. No replacement spacecraft is generated or substituted.
- NASA shared MER model is not an epoch-specific reconstruction of damage or dust. Its wheels/arm lack independently jointed nodes. Viking source clips are unverified and disabled. InSight is the official landed pre-instrument-deployment configuration: named SEIS/HP3/WTS components are present on the lander, but a complete ground-deployed instrument configuration is not claimed.
- Component controls highlight available source mesh/material groups; several meshes encompass multiple hardware components. Descriptions are component-specific, but exact per-component picking is not claimed where the source does not support it. No fabricated internal views or exploded assemblies.
- Headless Chromium, software WebGL and mobile touch emulation have been exercised; see `FIELDBOOK_QA.md`, `UNIFIED_EXPEDITION.md` and `LABORATORY.md` for the scope. Physical-device performance, exhaustive accessibility and every original animation sequence remain unverified.
- Rover terrain, motion, energy and landing rules are simplified educational systems, not mission reconstruction, validated engineering simulation or telemetry. Optional MER 3D view translates the whole static model without invented mechanical articulation. Schematic obstacles are generated application terrain, not spacecraft geometry.
- The atlas uses a coordinate grid, not a georeferenced terrain basemap. Historical coordinate systems vary. Exact final rover resting coordinates/routes were not verified, so they are not drawn.
- Local progress is browser/device-specific. Export is supported; cross-device synchronization and import are not implemented. Audio feedback uses browser synthesis only after user opt-in; narration and environmental audio are not included.
- Essential content can work offline after first online service-worker installation, subject to browser storage. Large 3D models are not precached. Private hosting sign-in may still require connectivity.
- Original upstream README and all source files are kept unchanged. New development instructions live in `EXPANDED_README.md`.

- The Sample Analysis room is a generic fictional analogue lab. Its spectra, microscopy and gas readings are synthetic teaching data, not measurements from NASA. Resource budgets and confidence targets are educational rules. Room/instrument geometry is compact procedural artwork, not engineering CAD or a photorealistic scan. See `LABORATORY.md`.
