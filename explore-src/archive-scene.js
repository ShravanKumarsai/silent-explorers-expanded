import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import * as T from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { loadNASAModel, disposeObject } from "./nasa-loader.js";
import { photoSlots, assetURL } from "./archive-rules.js";
function mountArchiveScene(container, { onHover = () => {
}, onSelect = () => {
}, onStatus = () => {
}, reduced = () => false } = {}) {
  const renderer = new T.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  container.prepend(renderer.domElement);
  const dom = renderer.domElement;
  dom.tabIndex = 0;
  dom.setAttribute("aria-label", "NASA photo orbits. Drag to turn, pinch or scroll to zoom. Use Browse photographs for keyboard access.");
  dom.style.touchAction = "none";
  const scene = new T.Scene();
  const pmrem = new T.PMREMGenerator(renderer), room = new RoomEnvironment(), environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  scene.background = new T.Color("#0b161a");
  scene.add(new T.HemisphereLight(15331041, 2241595, 2));
  const light = new T.DirectionalLight(16774364, 3);
  light.position.set(5, 4, 5);
  scene.add(light);
  const camera = new T.PerspectiveCamera(43, 1, 0.05, 100);
  camera.position.set(0, 1.5, 9.2);
  const controls = new OrbitControls(camera, dom);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 6;
  controls.maxDistance = 19;
  const stars = new T.BufferGeometry(), points = [];
  for (let i = 0; i < 320; i++) {
    const a = i * 2.39996, z = i / 319 * 2 - 1, r = Math.sqrt(1 - z * z);
    points.push(Math.cos(a) * r * 35, z * 35, Math.sin(a) * r * 35);
  }
  stars.setAttribute("position", new T.Float32BufferAttribute(points, 3));
  scene.add(new T.Points(stars, new T.PointsMaterial({ color: 12241082, size: 0.035, transparent: true, opacity: 0.35 })));
  let disposed = false, paused = false, visible = true, lost = false, worldGroup = null, photoGroup = null, tiles = [], hover = null, selection = null, tween = null, generation = 0, worldAbort = null, filter = "", raf = 0, last = 0;
  const retiring = [];
  const ray = new T.Raycaster(), mouse = new T.Vector2(), texLoader = new T.TextureLoader(), satellites = [];
  const resize = () => {
    const r = container.getBoundingClientRect();
    renderer.setSize(Math.max(1, r.width), Math.max(1, r.height), false);
    camera.aspect = r.width / Math.max(1, r.height);
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();
  const io = new IntersectionObserver((entries) => visible = entries[0].isIntersecting);
  io.observe(container);
  const lostEvent = (e) => {
    e.preventDefault();
    lost = true;
    onStatus("Graphics paused. Browse photographs below, or reload the archive.");
  };
  const restored = () => {
    lost = false;
    onStatus("Graphics recovered.");
  };
  dom.addEventListener("webglcontextlost", lostEvent);
  dom.addEventListener("webglcontextrestored", restored);
  function styleTiles() {
    for (const tile of tiles) {
      const active = tile === hover;
      tile.userData.opacity = active ? 1 : filter && tile.userData.photo.mission !== filter ? 0.12 : 0.27;
      tile.userData.lift = active ? 0.22 : 0;
      tile.userData.scale = active ? 1.08 : 1;
    }
  }
  function hit(e) {
    const b = dom.getBoundingClientRect();
    mouse.set((e.clientX - b.left) / b.width * 2 - 1, -(e.clientY - b.top) / b.height * 2 + 1);
    ray.setFromCamera(mouse, camera);
    return ray.intersectObjects(tiles, false).find((h) => h.object.visible && h.object !== selection)?.object || null;
  }
  function pointerMove(e) {
    if (selection) return;
    const next = hit(e);
    if (next !== hover) {
      hover = next;
      styleTiles();
      dom.style.cursor = hover ? "pointer" : "grab";
      onHover(hover?.userData.photo || null);
    }
  }
  let down = null;
  const pointerDown = (e) => {
    down = { x: e.clientX, y: e.clientY, id: e.pointerId };
  };
  const pointerUp = (e) => {
    if (!selection && down?.id === e.pointerId && Math.hypot(e.clientX - down.x, e.clientY - down.y) < 6) {
      const tile = hit(e);
      if (tile) onSelect(tile.userData.photo);
    }
    down = null;
  };
  const leave = (e) => {
    if (e?.relatedTarget?.closest?.(".archive-peek")) return;
    hover = null;
    styleTiles();
    onHover(null);
  };
  dom.addEventListener("pointerdown", pointerDown);
  dom.addEventListener("pointermove", pointerMove);
  dom.addEventListener("pointerup", pointerUp);
  dom.addEventListener("pointerleave", leave);
  async function setWorld(world, photos) {
    const token = ++generation;
    worldAbort?.abort();
    worldAbort = new AbortController();
    if (selection) close(true);
    hover = null;
    tiles = [];
    for (const sat of satellites.splice(0)) sat.removeFromParent();
    if (worldGroup) {
      const old = worldGroup;
      retiring.push({ group: old, at: performance.now() });
    }
    worldGroup = new T.Group();
    worldGroup.scale.setScalar(reduced() ? 1 : 0.85);
    scene.add(worldGroup);
    photoGroup = new T.Group();
    worldGroup.add(photoGroup);
    const group = worldGroup;
    group.userData.appeared = performance.now();
    onStatus("Loading NASA " + world.toLowerCase() + " collection…");
    if (world === "Moon") {
      const moon = new T.Mesh(new T.SphereGeometry(1.75, 64, 40), new T.MeshStandardMaterial({ roughness: 1, bumpScale: 0.025, envMapIntensity: 0.15, color: 11184810 }));
      group.add(moon);
      for (const [key, path] of [["map", "moon-color.jpg"], ["bumpMap", "moon-height.jpg"]]) texLoader.load("/explore/assets/archive/" + path, (texture) => {
        if (disposed || token !== generation) {
          texture.dispose();
          return;
        }
        if (key === "map") texture.colorSpace = T.SRGBColorSpace;
        moon.material[key] = texture;
        moon.material.needsUpdate = true;
      }, void 0, () => onStatus("Moon texture unavailable; NASA photographs remain accessible below."));
    } else loadNASAModel("mer", { signal: worldAbort.signal }).then((gltf) => {
      if (disposed || token !== generation) {
        disposeObject(gltf.scene);
        return;
      }
      const box = new T.Box3().setFromObject(gltf.scene), size = box.getSize(new T.Vector3()), center = box.getCenter(new T.Vector3()), pivot = new T.Group(), scale = 3.1 / Math.max(size.x, size.y, size.z);
      gltf.scene.scale.setScalar(scale);
      gltf.scene.position.copy(center.multiplyScalar(-scale));
      pivot.add(gltf.scene);
      group.add(pivot);
    }).catch((e) => {
      if (e.name !== "AbortError" && !disposed && token === generation) onStatus("Rover model unavailable. NASA photographs remain accessible below.");
    });
    const slots = photoSlots(world, photos.length);
    for (let i = 0; i < photos.length; i++) {
      const s = slots[i];
      let geometry, home, normal;
      if (world === "Moon") {
        geometry = new T.SphereGeometry(s.radius, 12, 8, s.angle - Math.PI / 8, Math.PI / 4 * 0.97, s.band * Math.PI / 3 + 0.015, Math.PI / 3 - 0.03);
        home = new T.Vector3().setFromSphericalCoords(s.radius, s.polar, -s.angle - Math.PI / 2);
        home.set(-s.radius * Math.cos(s.angle) * Math.sin(s.polar), s.radius * Math.cos(s.polar), s.radius * Math.sin(s.angle) * Math.sin(s.polar));
        geometry.translate(-home.x, -home.y, -home.z);
        normal = home.clone().normalize();
      } else {
        geometry = new T.CylinderGeometry(s.radius, s.radius, 1.02, 12, 1, true, s.angle - Math.PI / 8, Math.PI / 4 * 0.97);
        const rot = new T.Matrix4().makeRotationX(s.inclination);
        geometry.applyMatrix4(rot);
        home = new T.Vector3(Math.sin(s.angle) * s.radius, 0, Math.cos(s.angle) * s.radius).applyMatrix4(rot);
        geometry.translate(-home.x, -home.y, -home.z);
        normal = home.clone().normalize();
      }
      const material = new T.MeshBasicMaterial({ transparent: true, opacity: 0.32, side: T.DoubleSide, depthWrite: false, color: 16777215 });
      const tile = new T.Mesh(geometry, material);
      tile.position.copy(home);
      tile.visible = false;
      tile.userData = { photo: photos[i], home, normal, opacity: 0.27, lift: 0, scale: 1, aspect: world === "Moon" ? Math.sin(s.polar) * 0.75 : s.radius * Math.PI / 4 / 1.02 };
      const edge = new T.LineSegments(new T.EdgesGeometry(geometry, 12), new T.LineBasicMaterial({ color: 14280374, transparent: true, opacity: 0, depthWrite: false }));
      tile.add(edge);
      tile.userData.edge = edge;
      photoGroup.add(tile);
      tiles.push(tile);
    }
    let at = 0, failed = 0;
    const activeTiles = tiles.slice();
    await Promise.all(Array.from({ length: 4 }, async () => {
      while (at < activeTiles.length) {
        const tile = activeTiles[at++];
        try {
          const texture = await texLoader.loadAsync(assetURL(tile.userData.photo.thumbnailPath));
          if (disposed || token !== generation) {
            texture.dispose();
            return;
          }
          texture.colorSpace = T.SRGBColorSpace;
          const aspect = texture.image.width / texture.image.height, target = tile.userData.aspect;
          if (aspect > target) {
            texture.repeat.x = target / aspect;
            texture.offset.x = (1 - texture.repeat.x) / 2;
          } else {
            texture.repeat.y = aspect / target;
            texture.offset.y = (1 - texture.repeat.y) / 2;
          }
          tile.material.map = texture;
          tile.material.needsUpdate = true;
          tile.visible = true;
        } catch {
          failed++;
        }
        if (disposed || token !== generation) return;
      }
    }));
    if (disposed || token !== generation) return;
    styleTiles();
    onStatus(`${photos.length - failed} NASA photographs in orbit.${failed ? " Some previews failed; use their NASA source links below." : ""}`);
    loadNASAModel("hete", { signal: worldAbort.signal }).then((gltf) => {
      if (disposed || token !== generation) {
        disposeObject(gltf.scene);
        return;
      }
      const box = new T.Box3().setFromObject(gltf.scene), size = box.getSize(new T.Vector3()), center = box.getCenter(new T.Vector3()), scale = 0.3 / Math.max(size.x, size.y, size.z);
      gltf.scene.scale.setScalar(scale);
      gltf.scene.position.copy(center.multiplyScalar(-scale));
      const orbit = new T.Group(), pivot = new T.Group();
      pivot.add(gltf.scene);
      pivot.position.set(4, 0, 0);
      orbit.rotation.z = 0.4;
      orbit.add(pivot);
      const linePoints = [];
      for (let i = 0; i <= 100; i++) linePoints.push(new T.Vector3(Math.cos(i / 100 * Math.PI * 2) * 4, 0, Math.sin(i / 100 * Math.PI * 2) * 4));
      const path = new T.Line(new T.BufferGeometry().setFromPoints(linePoints), new T.LineBasicMaterial({ color: 7772326, transparent: true, opacity: 0.12 }));
      orbit.add(path);
      const marker = new T.Points(new T.BufferGeometry().setFromPoints([new T.Vector3(4, 0.16, 0)]), new T.PointsMaterial({ color: 14280374, size: 0.035 }));
      orbit.add(marker);
      group.add(orbit);
      satellites.push(orbit);
      if (innerWidth > 700) {
        const clone = orbit.clone();
        clone.rotation.z = -0.7;
        clone.rotation.y = 2;
        group.add(clone);
        satellites.push(clone);
      }
    }).catch(() => {
    });
  }
  function select(photo) {
    if (!photoGroup || selection) return;
    const tile = tiles.find((t) => t.userData.photo.id === photo.id);
    if (!tile?.visible) return;
    hover = null;
    styleTiles();
    selection = tile;
    controls.enabled = false;
    photoGroup.updateMatrixWorld(true);
    scene.attach(tile);
    tile.material.opacity = 1;
    const start = { position: tile.position.clone(), quaternion: tile.quaternion.clone(), scale: tile.scale.clone() }, end = { position: camera.position.clone().add(camera.getWorldDirection(new T.Vector3()).multiplyScalar(4.8)), quaternion: camera.quaternion.clone(), scale: new T.Vector3(0.7, 0.7, 0.7) };
    tile.userData.returnTransform = start;
    tween = { tile, start, end, startTime: performance.now(), duration: reduced() ? 0 : 500, closing: false };
  }
  function close(immediate = false) {
    if (!selection) return;
    const tile = selection;
    const finish = () => {
      photoGroup.attach(tile);
      tile.position.copy(tile.userData.home);
      tile.scale.setScalar(1);
      tile.quaternion.identity();
      selection = null;
      tween = null;
      controls.enabled = true;
      styleTiles();
    };
    if (immediate) {
      finish();
      return;
    }
    tween = { tile, start: { position: tile.position.clone(), quaternion: tile.quaternion.clone(), scale: tile.scale.clone() }, end: tile.userData.returnTransform, startTime: performance.now(), duration: reduced() ? 0 : 450, closing: true, finish };
  }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1e3) || 0;
    last = now;
    if (disposed || document.hidden || !visible || lost) return;
    controls.update();
    for (let i = retiring.length - 1; i >= 0; i--) {
      const row = retiring[i], progress = reduced() ? 1 : Math.min(1, (now - row.at) / 450);
      row.group.scale.setScalar(1 - progress * 0.2);
      row.group.traverse((o) => {
        for (const m of Array.isArray(o.material) ? o.material : o.material ? [o.material] : []) {
          if (m.userData.fadeHome === void 0) m.userData.fadeHome = m.opacity;
          m.transparent = true;
          m.opacity = m.userData.fadeHome * (1 - progress);
        }
      });
      if (progress === 1) {
        row.group.removeFromParent();
        disposeObject(row.group);
        retiring.splice(i, 1);
      }
    }
    for (const tile of tiles) {
      if (tile === selection) continue;
      const ease = reduced() ? 1 : 1 - Math.exp(-dt * 13);
      tile.material.opacity = T.MathUtils.lerp(tile.material.opacity, tile.userData.opacity, ease);
      tile.position.lerp(tile.userData.home.clone().addScaledVector(tile.userData.normal, tile.userData.lift), ease);
      tile.scale.lerp(new T.Vector3().setScalar(tile.userData.scale), ease);
      tile.userData.edge.material.opacity = T.MathUtils.lerp(tile.userData.edge.material.opacity, tile === hover ? 0.75 : 0, ease);
    }
    if (worldGroup) {
      const target = 1;
      worldGroup.scale.lerp(new T.Vector3(target, target, target), reduced() ? 1 : 0.08);
      if (!paused && !reduced() && !selection) photoGroup.rotation.y += dt * 0.045;
      if (!paused && !reduced()) for (const sat of satellites) sat.rotation.y += dt * 0.12;
    }
    if (tween) {
      const p = tween.duration ? Math.min(1, (now - tween.startTime) / tween.duration) : 1, e = p * p * (3 - 2 * p);
      tween.tile.position.lerpVectors(tween.start.position, tween.end.position, e);
      tween.tile.quaternion.slerpQuaternions(tween.start.quaternion, tween.end.quaternion, e);
      tween.tile.scale.lerpVectors(tween.start.scale, tween.end.scale, e);
      if (p === 1) {
        if (tween.closing) tween.finish();
        else tween = null;
      }
    }
    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(frame);
  return { setWorld, select, close, clearHover: leave, setFilter(id) {
    filter = id;
    styleTiles();
  }, pause(value) {
    paused = value;
  }, zoom(factor) {
    camera.position.sub(controls.target).multiplyScalar(factor).clampLength(6, 19).add(controls.target);
    controls.update();
  }, reset() {
    if (selection) return;
    camera.position.set(0, 1.5, 9.2);
    controls.target.set(0, 0, 0);
    controls.update();
  }, dispose() {
    disposed = true;
    generation++;
    worldAbort?.abort();
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    controls.dispose();
    dom.removeEventListener("pointerdown", pointerDown);
    dom.removeEventListener("pointermove", pointerMove);
    dom.removeEventListener("pointerup", pointerUp);
    dom.removeEventListener("pointerleave", leave);
    dom.removeEventListener("webglcontextlost", lostEvent);
    dom.removeEventListener("webglcontextrestored", restored);
    if (selection) close(true);
    disposeObject(scene);
    environment.dispose();
    renderer.dispose();
    dom.remove();
  } };
}
export {
  mountArchiveScene
};
