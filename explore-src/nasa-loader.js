import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
const buffers = /* @__PURE__ */ new Map();
const NASA_MODEL_PATHS = { mer: "/explore/assets/models/mer.glb", viking: "/explore/assets/models/viking.glb", insight: "/explore/assets/models/insight.glb", "mer-components": "/explore/assets/archive/mer-components.glb", hete: "/explore/assets/archive/hete.glb" };
function disposeObject(root) {
  const geometries = /* @__PURE__ */ new Set(), materials = /* @__PURE__ */ new Set(), textures = /* @__PURE__ */ new Set();
  root?.traverse((o) => {
    if (o.geometry) geometries.add(o.geometry);
    for (const m of Array.isArray(o.material) ? o.material : o.material ? [o.material] : []) {
      materials.add(m);
      for (const v of Object.values(m)) if (v?.isTexture) textures.add(v);
    }
  });
  geometries.forEach((x) => x.dispose());
  materials.forEach((x) => x.dispose());
  textures.forEach((x) => x.dispose());
}
async function fetchNASAAsset(path, { signal, onProgress = () => {
}, timeout = 45e3, cache = true } = {}) {
  if (signal?.aborted) throw new DOMException("Loading cancelled", "AbortError");
  if (cache && buffers.has(path)) {
    onProgress(100);
    return buffers.get(path).slice(0);
  }
  const controller = new AbortController();
  let timedOut = false;
  const abort = () => controller.abort();
  signal?.addEventListener("abort", abort, { once: true });
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeout);
  try {
    const response = await fetch(path, { signal: controller.signal });
    if (!response.ok) throw Error(`Asset request failed (${response.status})`);
    const total = +response.headers.get("content-length");
    let data;
    if (response.body?.getReader) {
      const reader = response.body.getReader(), chunks = [];
      let size = 0;
      for (; ; ) {
        const { value, done } = await reader.read();
        if (done) break;
        chunks.push(value);
        size += value.byteLength;
        onProgress(total ? Math.min(99, Math.round(size / total * 100)) : null);
      }
      const bytes = new Uint8Array(size);
      let at = 0;
      for (const chunk of chunks) {
        bytes.set(chunk, at);
        at += chunk.byteLength;
      }
      data = bytes.buffer;
    } else data = await response.arrayBuffer();
    if (controller.signal.aborted) throw new DOMException("Loading cancelled", "AbortError");
    const header = new DataView(data);
    if (data.byteLength < 20 || header.getUint32(0, true) !== 1179937895 || header.getUint32(4, true) !== 2 || header.getUint32(8, true) !== data.byteLength) throw Error("The NASA model download was incomplete or invalid. Retry the asset.");
    if (cache) buffers.set(path, data);
    onProgress(100);
    return data.slice(0);
  } catch (e) {
    if (timedOut) throw Error("The download timed out. Retry when the connection is available.");
    throw e;
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", abort);
  }
}
async function loadNASAModel(id, { signal, onProgress } = {}) {
  const path = NASA_MODEL_PATHS[id];
  if (!path) throw Error("Unknown NASA asset");
  const buffer = await fetchNASAAsset(path, { signal, onProgress });
  if (signal?.aborted) throw new DOMException("Loading cancelled", "AbortError");
  const draco = new DRACOLoader().setDecoderPath("/explore/assets/draco/").setWorkerLimit(1), loader = new GLTFLoader().setDRACOLoader(draco);
  try {
    const model = await loader.parseAsync(buffer, "/explore/assets/");
    if (signal?.aborted) {
      disposeObject(model.scene);
      throw new DOMException("Loading cancelled", "AbortError");
    }
    return model;
  } finally {
    draco.dispose();
  }
}
export {
  NASA_MODEL_PATHS,
  disposeObject,
  fetchNASAAsset,
  loadNASAModel
};
