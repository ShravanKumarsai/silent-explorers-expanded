# Third-party assets and dependencies

Original project: jadonjoel/NASA-hackathon, imported with the user's explicit ownership/permission confirmation. No general upstream software license was present. This permission does not invent an open-source license or authorize unrelated third-party reuse.

Original planetary maps: Solar System Scope / INOVE, CC BY 4.0; see unchanged `dist/assets/solar/ASSET_CREDITS.md`. Original adaptation details and all original credits retained.

Official NASA 3D assets: see `NASA_3D_ASSET_CREDITS.md` and `explore-public/assets/models/manifest.json`. Original files unchanged. NASA educational/informational media conditions apply; NASA/JPL and named creators acknowledged. No endorsement implied. No blanket assumption that every NASA-hosted third-party asset is public domain.

Historical photographs: see `explore-public/assets/photos/CREDITS.md` and `credits.json` for source pages, creator organizations, download URLs and original checksums. Photographs retain source bytes; application CSS crops display areas without altering files.

Application libraries: Three.js (MIT), Vite (MIT), Happy DOM (MIT, development tests only). Versions are pinned by `package-lock.json`; dependency notices remain in npm packages and distributed library bundles as emitted by Vite.

Typography: DM Sans and IBM Plex Mono via Google Fonts (SIL Open Font License); optional network requests, system fallbacks available offline. Source: https://fonts.google.com/specimen/DM+Sans and https://fonts.google.com/specimen/IBM+Plex+Mono .

New icons, coordinate-grid atlas, educational terrain and synthetic waveform diagrams are application graphics. They are not official NASA engineering models, cartographic terrain products or real instrument data. The descent exercise displays a schematic marker, not a historical lander reconstruction.

Draco decoder assets: Google Draco via the pinned Three.js package, Apache License 2.0. Bundled locally without modification in `explore-public/assets/draco/`; license included as `LICENSE.txt`. The official InSight source requires KHR_draco_mesh_compression. No project-side mesh recompression or geometry modification is performed.
