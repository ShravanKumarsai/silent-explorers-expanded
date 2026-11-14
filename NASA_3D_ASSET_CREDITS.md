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

The original static MER display source is a single mesh with nine material primitives. The optional NASA Blender derivative below supplies a separate, named-object hierarchy. Its material groups are not a complete mechanical hierarchy; highlighting is an educational UI overlay, not proof of individual component geometry. The selected InSight asset includes named SEIS and HP3 nodes on the lander in a pre-instrument-deployment configuration. A complete ground-deployed instrument scene and separately downloadable component-level instrument models are not claimed. Viking source clips remain disabled because their mechanical meaning has not been verified. Do not invent internal views, split the hardware into fictional mechanisms, remove components or play unsupported motions.

Viewer camera changes, uniform whole-model placement/scaling and application hotspots may be used without editing the source GLB. Any educational motion diagram must be separate and explicitly labelled as an educational demonstration.

## Supporting mission photographs

See [photograph credits](dist/explore/assets/photos/CREDITS.md) and machine-readable `dist/explore/assets/photos/credits.json`. They are historical photographs or camera mosaics, not replacements for missing hardware meshes.

## Analogue evidence-room laboratory (PR #1 revision)

The new Sample Analysis room is a fictional, generic training laboratory, not an additional NASA hardware model. Its room, gas chambers, teaching microscope and spectrum trainer are original application geometry in `explore-src/lab-scene.js`; they do not represent Viking instruments or spacecraft interiors. No third-party mesh or substitute spacecraft is added. The NASA 3D catalogue and Viking mission/archive pages were reviewed for historical context. All three previously downloaded official GLBs retain their source bytes and configurations. Lab enclosure and tray motions are explicitly educational demonstrations of generic teaching equipment, not historical spacecraft mechanisms. Data plots, candidate-object illustrations and peak labels are synthetic, not NASA assets.

## Photographic orbit and NASA-source component explorer — 2026-11-14

All six repository missions were audited: Apollo 17, Surveyor 3, Spirit, Opportunity, Viking 1 and InSight. Only three are rovers. The four Mars machines include two landers; no fourth fictional rover is introduced. The official NASA 3D catalog, relevant mission pages and full NASA repository tree at the commit above were rechecked. The exact Apollo LRV and Surveyor-family download gaps remain. Existing MER, Viking and InSight GLBs remain byte-identical.

### NASA MER Blender source — component display

- Mission/use: Spirit and Opportunity.
- Creator: NASA/JPL-Caltech.
- Original source: https://science.nasa.gov/3d-resources/mars-exploration-rover-spirit-and-opportunity/
- Download source: https://raw.githubusercontent.com/nasa/NASA-3D-Resources/11ebb4ee043715aefbba6aeec8a61746fad67fa7/3D%20Models/Mars%20Exploration%20Rover%20-%20Spirit%20and%20Opportunity/Mars%20Exploration%20Rover%20-%20Spirit%20and%20Opportunity.blend
- File: `assets/archive/mer-components.glb`; GLB / glTF 2.0, converted from Blender; 11,693,660 bytes.
- Usage: NASA educational and informational media conditions; retain creator/source credits, third-party notices and no NASA endorsement. [NASA media guidance](https://www.nasa.gov/nasa-brand-center/images-and-media/).
- Modifications: Converted from NASA Blender source at saved frame 1243 with current-frame export, without animation, cameras, lights or geometry modifiers. 21 helper controls remain transform-only nodes; 40 hardware objects remain. NASA source viewport visibility retained (two arm objects have source hide_render true but are viewport-visible). Original official MER static materials and embedded textures copied by identical material names. Proportions, mesh vertices, normals, UVs, hierarchy and source pose retained. Exploded display instances add radial offsets only in the application; these are not a documented disassembly sequence.
- SHA-256: `06af7058d69ada646d9b84ee0364c361350db116d9066fe313e05fa237b30f08`.

### High Energy Transient Explorer

- Mission/use: Archive exhibit decoration.
- Creator: NASA/Christopher R. Meaney.
- Original source: https://science.nasa.gov/3d-resources/high-energy-transient-explorer/
- Download source: https://raw.githubusercontent.com/nasa/NASA-3D-Resources/11ebb4ee043715aefbba6aeec8a61746fad67fa7/3D%20Models/High%20Energy%20Transient%20Explorer/High%20Energy%20Transient%20Explorer.glb
- File: `assets/archive/hete.glb`; GLB / glTF 2.0; 61,836 bytes.
- Usage: NASA educational and informational media conditions; retain creator/source credits, third-party notices and no NASA endorsement. [NASA media guidance](https://www.nasa.gov/nasa-brand-center/images-and-media/).
- Modifications: Downloaded bytes unchanged. Whole-model uniform placement/scaling only. Exhibit orbits and adjacent light markers are separate application elements, not historic trajectories or hardware changes.
- SHA-256: `f514f7cff65c0d4d565408b3f6ba113c4a3b97321a3fe770c89f67820e83922c`.

### CGI Moon Kit — LROC colour map

- Mission/use: Moon archive.
- Creator: NASA/Goddard Space Flight Center / Ernie Wright; LRO LROC.
- Original source: https://svs.gsfc.nasa.gov/4720/
- Download source: https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/lroc_color_2k.jpg
- File: `assets/archive/moon-color.jpg`; JPEG, 2048×1024; 457,942 bytes.
- Usage: NASA educational and informational media conditions; retain creator/source credits, third-party notices and no NASA endorsement. [NASA media guidance](https://www.nasa.gov/nasa-brand-center/images-and-media/).
- Modifications: Downloaded bytes unchanged. Applied to an application sphere with illustrative lighting. A NASA visualization texture, not a cartographic measurement product.
- SHA-256: `f7130a1822681fa7512d7dcfd40db8c10b9ba4f06777910348698260ed7a2170`.

### CGI Moon Kit — LOLA displacement map

- Mission/use: Moon archive.
- Creator: NASA/Goddard Space Flight Center / Ernie Wright; LRO LOLA.
- Original source: https://svs.gsfc.nasa.gov/4720/
- Download source: https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/ldem_3_8bit.jpg
- File: `assets/archive/moon-height.jpg`; JPEG, 1024×512; 111,552 bytes.
- Usage: NASA educational and informational media conditions; retain creator/source credits, third-party notices and no NASA endorsement. [NASA media guidance](https://www.nasa.gov/nasa-brand-center/images-and-media/).
- Modifications: Downloaded bytes unchanged. Used as a subtle bump map for visual relief, not science-grade topography.
- SHA-256: `6d93f887e7d8bedfe35ab89ba785e5e3ca12381bd092a5e6abe2c707dda8bb98`.

### Rendered NASA HETE miniature

- Mission/use: Opening story and fieldbook motto.
- Creator: NASA/Christopher R. Meaney; application rendering.
- Original source: https://science.nasa.gov/3d-resources/high-energy-transient-explorer/
- Download source: https://raw.githubusercontent.com/nasa/NASA-3D-Resources/11ebb4ee043715aefbba6aeec8a61746fad67fa7/3D%20Models/High%20Energy%20Transient%20Explorer/High%20Energy%20Transient%20Explorer.glb
- File: `assets/archive/hete-motto.png`; PNG, 256×256 with transparency; 8,821 bytes.
- Usage: NASA educational and informational media conditions; retain creator/source credits, third-party notices and no NASA endorsement. [NASA media guidance](https://www.nasa.gov/nasa-brand-center/images-and-media/).
- Modifications: Rendered from the bundled official HETE model, with transparent background and application lighting/camera. CSS moves this image around the motto, passing behind the words. It is not an independently designed spacecraft.
- SHA-256: `8fabf519e62a9bd02ec6832bfef99f55ba8a31c2cd4b0e799d5a00d37b03321e`.

The MER part selector uses the 40 NASA-named hardware nodes, grouping their material primitives together. InSight exposes its supplied named meshes. Viking exposes only its two coarse source meshes. These displays cannot reveal absent internal parts, bolts or engineering tolerances. Source movement clips remain disabled. Reassemble returns the unchanged source display. Reproduction scripts are in `scripts/nasa-assets/`; the Blender export audit and asset checksums are in `explore-public/assets/archive/`.

### NASA photographic records

56 NASA photographs/photographic mosaics are bundled: Apollo 17 (16), Surveyor 3 (8, including context/training), Opportunity (8), Spirit (8), Viking 1 (8), InSight (8, including Earth tests). Individual title, full NASA caption, credit, NASA ID, official source page, download/original URL, catalogue date, explicit caption exposure date where available, processing and checksums are retained in `explore-public/assets/archive/photos.json`. No capture dates are inferred from catalogue timestamps. Display images are resized to at most 1600 pixels and encoded WebP; orbital thumbnails use 384 pixels. No generative edits. Images and captions are cached from NASA, not a live telemetry feed.
