# Mars archive and expedition navigation revision

Rover Expedition now exposes only the guided Opportunity expedition; its mission switcher is removed. Old Spirit and Apollo driving links redirect there. Other sections retain their mission selector.

The archive uses the exact Mars GLB downloaded from https://solarsystem.nasa.gov/gltf_embed/2372/. Source bytes, textures and geometry remain intact. Whole-model placement and uniform scale fit it into the shared archive. Thirty-two Mars photographs now follow four complete spherical bands instead of intersecting rover rings.

The archive has compact world selectors, a prominent planetary stage, grouped controls, clearer selected states and a collapsible photo browser. Browse photographs opens that browser explicitly. Phone layouts retain both world choices side by side.

Validation: 88 tests pass, production build and asset verification pass. Chromium checks cover the old Spirit link, removed expedition switcher, successful NASA Mars download/render, photo browser/viewer and Escape closing, and 390px overflow. Physical Android testing was not performed.
