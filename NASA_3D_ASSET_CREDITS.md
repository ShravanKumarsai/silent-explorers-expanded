# NASA 3D Asset Credits

Checked 12 November 2026. The downloaded GLBs are official NASA assets. Historical configuration fidelity is limited to each published visualization model; none is represented as engineering CAD or a complete interior reconstruction. No independent replacement hardware models were generated.

## Usage and attribution

NASA makes its 3D resources available for educational/informational use under the [NASA Images and Media Usage Guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/). Credit the stated creator and source in the viewer and documentation; do not imply NASA endorsement. Third-party notices must be checked independently. This project claims no copyright in NASA hardware models.

## Spirit and Opportunity Rover, 3D Model

- Mission(s): opportunity, spirit
- Local file: `dist/explore/assets/models/mer.glb`
- Original source: https://science.nasa.gov/resource/spirit-and-opportunity-rover-3d-model/
- Download source: https://assets.science.nasa.gov/content/dam/science/psd/mars/resources/gltf_files/24883_MER_static.glb
- Creator/credited organization: NASA/JPL-Caltech
- File format: GLB / glTF 2.0
- License/usage conditions: NASA educational/informational media usage guidelines; credit creator/source, preserve any third-party notices, do not imply NASA endorsement.
- Attribution requirements: display `NASA/JPL-Caltech` and link the original source.
- Modifications: None. Downloaded bytes, geometry, transforms, proportions, materials and embedded textures retained.
- Verification status: Downloaded from official NASA asset URL. GLB header/length/chunks, all bufferView bounds and all embedded texture image decodes pass. Browser visual/hotspot verification is not yet completed.
- Hardware/configuration limits: Official shared twin-rover model; not an epoch-specific damage/dust reconstruction. One source mesh with nine material primitives. Wheels, joints and instruments are not separately named nodes; no component motion is enabled.
- Size: 11910084 bytes.
- SHA-256: `efad9c6275d832d86e7232d63520e48628797d9a7f7c7ff870b28d175ac8b250`

## Viking Lander

- Mission(s): viking
- Local file: `dist/explore/assets/models/viking.glb`
- Original source: https://science.nasa.gov/3d-resources/viking-lander/
- Download source: https://assets.science.nasa.gov/content/dam/science/cds/3d/resources/model/viking-lander/Viking%20Lander.glb
- Creator/credited organization: NASA/Michael D. Carbajal
- File format: GLB / glTF 2.0
- License/usage conditions: NASA educational/informational media usage guidelines; credit creator/source, preserve any third-party notices, do not imply NASA endorsement.
- Attribution requirements: display `NASA/Michael D. Carbajal` and link the original source.
- Modifications: None. Downloaded bytes, geometry, transforms, proportions, materials and embedded textures retained.
- Verification status: Downloaded from official NASA asset URL. GLB header/length/chunks, all bufferView bounds and all embedded texture image decodes pass. Browser visual/hotspot verification is not yet completed.
- Hardware/configuration limits: NASA catalog explicitly lists mission Viking 1. Two generic meshes and nine materials; individual biology chambers, camera internals and sampling mechanisms are not separately named. Two source animation clips exist but their physical purpose has not been verified; do not play them.
- Size: 1849384 bytes.
- SHA-256: `1233dc2c96a1c0b08ca9a20f7ed9c09e0223f06f14f6ae6371349504c1929149`

## InSight lander — arm and panels deployed, before instrument deployment

- Mission: InSight.
- Source file: `explore-public/assets/models/insight.glb`; build output: `dist/explore/assets/models/insight.glb`.
- Catalog model name: InSight Cruise Lander (arm deployed). Despite the catalog title, NASA explicitly describes this asset as the landed configuration with solar panels and arm deployed, before deployment of the seismometer and heat probe. It is not the cruise stage.
- Original source: https://science.nasa.gov/3d-resources/insight-cruise-lander/
- Download source: https://assets.science.nasa.gov/content/dam/science/cds/3d/resources/model/insight-cruise-lander/InSight%20Cruise%20Lander%20(arm%20deployed).glb
- Exact inspected mirror: https://raw.githubusercontent.com/nasa/NASA-3D-Resources/11ebb4ee043715aefbba6aeec8a61746fad67fa7/3D%20Models/InSight%20Cruise%20Lander/InSight%20Cruise%20Lander%20%28arm%20deployed%29.glb
- Creator/credited organization: NASA/Brian E. Kumanchik.
- File format: GLB / glTF 2.0, with required `KHR_draco_mesh_compression`.
- Decoder requirement: Three.js `DRACOLoader` with compatible Draco decoder JavaScript/WASM files. Decode at runtime without changing source geometry. Bundle decoder files for dependable/offline operation; the GLB is self-contained for material textures but needs the decoder.
- License/usage conditions: NASA educational/informational media usage guidelines; credit creator and source, preserve third-party notices and do not imply endorsement.
- Attribution requirements: display `NASA/Brian E. Kumanchik` and link the original NASA catalog source.
- Modifications: None. The official model's downloaded bytes, geometry, transforms, proportions, materials, textures and hardware configuration are unchanged. Selecting this separate official asset is not a generated replacement or an optimization of the larger model.
- Verification status: NASA catalog configuration confirmed; official preview PNG visually inspected; GLB header, file length, chunks, all bufferView bounds and all 22 embedded texture image decodes pass. Draco geometry decoding, browser rendering and hotspot verification require separate application tests.
- Hardware coverage: 100 meshes, 143 primitives, 11 materials and 22 embedded textures. Named nodes include `SEIS`, `HP3_v3d_baked`, `WTS`, `RISE_antennas`, `TWINS`, `IDC`, `ICC`, `pressure_inlet`, `UHF_antenna`, arm joints, grapple and solar-panel roots.
- Configuration limits: Pre-instrument-deployment lander. This is not a complete scene of SEIS and HP3 deployed on the ground, nor proof of complete internal instrument geometry. No source animation clips; no unsupported component motion enabled.
- Size: 3,949,036 bytes.
- SHA-256: `298434c885069f49b9e4f1d178e019c7ec2771fe1a9ce21278c70521eb9caac5`.
- Earlier research candidate: NASA/JPL-Caltech `24880_InSight_deployed.glb`, 22,357,936 bytes, SHA-256 `1e944bedb23af07962ba9f2b88d195b561665f255573b29ba7d028293a179387`, was evaluated but is not bundled in source. It is retained outside the project as a research download. The selected smaller official asset also provides separately named scientific hardware.

## Missing exact models and search record

### Apollo 17 Lunar Roving Vehicle

No suitable NASA downloadable GLB, glTF, OBJ, FBX, STL, Blender or other reusable hardware mesh was located in the following sources checked. This is a report of search results, not a claim that no such model can exist. No Apollo lunar module, Artemis rover or other vehicle is substituted for the LRV.

- [NASA 3D Resources](https://science.nasa.gov/3d-resources/) and the full recursive tree of [NASA-3D-Resources](https://github.com/nasa/NASA-3D-Resources), master commit `11ebb4ee043715aefbba6aeec8a61746fad67fa7`.
- [Apollo 17 mission archive](https://www.nasa.gov/mission/apollo-17/) and NASA Apollo 50th multimedia/model resources. Landing-site terrain and lunar module models are different assets and cannot stand in for the rover.
- [Virtual Lunar Roving Vehicle](https://history.nasa.gov/wp-content/uploads/static/history/alsj/VirtualLRV.html) provides images and video animations, including an Apollo 17 configuration. It credits Don McMillan copyright 2005 and says NASA used these with permission; no cleared downloadable mesh is supplied. These files were not copied.
- NASA-hosted Astromaterials 3D Apollo 17 samples are sample models, not rover hardware.
- Targeted NASA-domain searches for Lunar Roving Vehicle/Apollo 17 plus 3D model, GLB, glTF, OBJ, FBX, STL and download.

### Surveyor 3

No suitable NASA downloadable exact Surveyor 3 or Surveyor-family lander mesh was located in the sources checked. No Mars Global Surveyor or NEO Surveyor asset is substituted: they are unrelated spacecraft.

- NASA 3D Resources and full recursive official NASA-3D-Resources repository tree above.
- [NASA Surveyor 3 mission archive](https://science.nasa.gov/mission/surveyor-3/) and [JPL Surveyor 3 mission page](https://www.jpl.nasa.gov/missions/surveyor-3/).
- [Lunar Ranger and Surveyor program archive](https://science.nasa.gov/mission/lunar-rangers-and-surveyors/), official photographic records and NASA technical reports search results.
- Targeted NASA/JPL/GitHub NASA searches for Surveyor 3/Surveyor lander plus 3D model, GLB, glTF, OBJ, FBX, STL and download.

## Component coverage and animation policy

The MER source is a single mesh with nine material primitives. Its material groups are not a complete mechanical hierarchy; highlighting is an educational UI overlay, not proof of individual component geometry. The selected InSight asset includes named SEIS and HP3 nodes on the lander in a pre-instrument-deployment configuration. A complete ground-deployed instrument scene and separately downloadable component-level instrument models are not claimed. Viking source clips remain disabled because their mechanical meaning has not been verified. Do not invent internal views, split the hardware into fictional mechanisms, remove components or play unsupported motions.

Viewer camera changes, uniform whole-model placement/scaling and application hotspots may be used without editing the source GLB. Any educational motion diagram must be separate and explicitly labelled as an educational demonstration.

## Supporting mission photographs

See [photograph credits](dist/explore/assets/photos/CREDITS.md) and machine-readable `dist/explore/assets/photos/credits.json`. They are historical photographs or camera mosaics, not replacements for missing hardware meshes.
