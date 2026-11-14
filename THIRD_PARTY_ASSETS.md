# Third-party assets and dependencies

Original project: jadonjoel/NASA-hackathon, imported with the user's explicit ownership/permission confirmation. No general upstream software license was present. This permission does not invent an open-source license or authorize unrelated third-party reuse.

Original planetary maps: Solar System Scope / INOVE, CC BY 4.0; see unchanged `dist/assets/solar/ASSET_CREDITS.md`. Original adaptation details and all original credits retained.

Official NASA 3D assets: see `NASA_3D_ASSET_CREDITS.md` and `explore-public/assets/models/manifest.json`. Original files unchanged. NASA educational/informational media conditions apply; NASA/JPL and named creators acknowledged. No endorsement implied. No blanket assumption that every NASA-hosted third-party asset is public domain.

Historical photographs: see `explore-public/assets/photos/CREDITS.md` and `credits.json` for source pages, creator organizations, download URLs and original checksums. Photographs retain source bytes; application CSS crops display areas without altering files.

Application libraries: Three.js (MIT), Vite (MIT), Happy DOM (MIT, development tests only). Versions are pinned by `package-lock.json`; dependency notices remain in npm packages and distributed library bundles as emitted by Vite.

Typography: self-hosted DM Sans and IBM Plex Mono (SIL Open Font License); bundled license notices and system fallbacks available offline. Source: https://fonts.google.com/specimen/DM+Sans and https://fonts.google.com/specimen/IBM+Plex+Mono .

New icons, coordinate-grid atlas, educational terrain and synthetic waveform diagrams are application graphics. They are not official NASA engineering models, cartographic terrain products or real instrument data. The descent exercise displays a schematic marker, not a historical lander reconstruction.

Draco decoder assets: Google Draco via the pinned Three.js package, Apache License 2.0. Bundled locally without modification in `explore-public/assets/draco/`; license included as `LICENSE.txt`. The official InSight source requires KHR_draco_mesh_compression. No project-side mesh recompression or geometry modification is performed.

Fieldbook music: original Web Audio sine-wave composition/sequencing in `explore-src/music.js`, three user-selectable harmonic atmospheres. No third-party recordings and no NASA audio attribution implied.

Evidence-room laboratory: original application-built generic training instruments and room, generated in memory with Three.js. No downloaded external meshes, textures or recordings. Screen labels, microscopy illustrations, graphs and fictional scientific cases are application content, not NASA findings or official instrument reconstructions. Optional low-volume laboratory hum and operation cues are Web Audio synthesis, started only with the local sound toggle. NASA links provide historical references; no NASA data API is used to generate training measurements.

Story Orbit UI revision: DM Sans Latin variable WOFF2 and IBM Plex Mono Latin regular WOFF2 are self-hosted in `explore-public/assets/fonts/` and copied unchanged into the built site. Their SIL Open Font License notices are included alongside the fonts (`DM-Sans-OFL.txt`, `IBM-Plex-Mono-OFL.txt`). Sources: https://fonts.google.com/specimen/DM+Sans and https://fonts.google.com/specimen/IBM+Plex+Mono ; served subsets downloaded from `fonts.gstatic.com/s/dmsans/v17/rP2Yp2ywxg089UriI5-g4vlH9VoD8Cmcqbu0-K4.woff2` and `fonts.gstatic.com/s/ibmplexmono/v23/-F63fjptAgt5VM-kVkqdyU8n1i8q1w.woff2`. License text sources: `google/fonts` repository, `ofl/dmsans/OFL.txt` and `ofl/ibmplexmono/OFL.txt`. No Google Fonts network request is needed at runtime. Georgia is a system serif font, with Times New Roman and generic serif fallbacks; it is not redistributed.
