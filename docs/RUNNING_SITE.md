# Open Silent Explorers in regular Chrome

From the repository root, serve the complete committed `dist` directory:

```sh
python -m http.server 8000 --directory dist
```

Open **http://localhost:8000** in a regular Chrome tab. Keep the terminal running. The app does not require the integrated GPT window. Serving over HTTP lets Chrome load ES modules, NASA models and photo metadata correctly.

Useful destinations:

- Opening story: `http://localhost:8000/#opening`
- Readable mission catalogue: `http://localhost:8000/#missions`
- NASA photographic orbits: `http://localhost:8000/#archive`
- Hardware and component inspection: `http://localhost:8000/#museum/opportunity`
- Rover Expedition: `http://localhost:8000/#simulator/opportunity`
- Seven Science Lab activities and historical mission atlas: `http://localhost:8000/#lab`

The committed `dist/` is ready to serve. To rebuild source changes, run from the repository root:

```sh
npm ci
npm test
npm run build
npm run verify
```

Use a Chrome browser with WebGL enabled for the 3D scenes. NASA models and full photographs need a connection when they are not already cached by the browser. The archive also provides an accessible photograph browser when WebGL is unavailable. The expedition offers a clearly labelled tactical mode after graphics loading fails.

See [the update report](ARCHIVE_AND_EXPEDITION_UPDATE.md), [test results](FIELDBOOK_QA.md), and [NASA model credits](../NASA_3D_ASSET_CREDITS.md). Publishing the repository does not by itself establish a new hosting deployment; a static host should serve the complete `dist/` contents from its site root.
