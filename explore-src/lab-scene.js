import * as T from "three";
import { createPlayer } from "./lab-player.js";
const LOCATIONS = { intake: { x: -4, z: 3, name: "Sample intake" }, gas: { x: -4, z: -3.8, name: "01 / GAS EXCHANGE" }, scope: { x: 0, z: -3.8, name: "02 / MICROSCOPY" }, chem: { x: 4, z: -3.8, name: "03 / CHEMISTRY" }, board: { x: 4, z: 2.5, name: "EVIDENCE / REPORT" } };
function mountLabScene(host, { onInteract, onPause, onTarget }) {
  const scene = new T.Scene();
  scene.background = new T.Color("#172936");
  scene.fog = new T.Fog("#172936", 13, 25);
  const renderer = new T.WebGLRenderer({ antialias: !matchMedia("(pointer:coarse)").matches, alpha: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, matchMedia("(pointer:coarse)").matches ? 1.25 : 1.7));
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  host.prepend(renderer.domElement);
  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute("aria-label", "First-person laboratory. WASD walk, drag to look, E interact, Escape pause. Double click for mouse capture.");
  const camera = new T.PerspectiveCamera(65, 1, 0.05, 40);
  camera.position.set(0, 1.65, 4.8);
  scene.add(new T.HemisphereLight("#e3f7ff", "#273d44", 2));
  const light = new T.DirectionalLight("#fff4d8", 2.2);
  light.position.set(-3, 6, 3);
  scene.add(light);
  const materials = {}, colliders = [], instruments = {};
  let target = null, disposed = false, raf = 0, last = 0, slow = 0, adapted = false, state = null, frozen = false;
  const mat = (color, metalness = 0) => materials[color] || (materials[color] = new T.MeshStandardMaterial({ color, roughness: metalness ? 0.35 : 0.75, metalness }));
  function box(x, y, z, w, h, d, color, metal = 0, parent = scene) {
    const m = new T.Mesh(new T.BoxGeometry(w, h, d), mat(color, metal));
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  }
  function cylinder(x, y, z, r, h, color, parent = scene) {
    const m = new T.Mesh(new T.CylinderGeometry(r, r, h, 20), mat(color, 0.4));
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  }
  function label(text, x, y, z, color = "#a9edf0", size = 1.8) {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 128;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#102530";
    ctx.fillRect(0, 0, 512, 128);
    ctx.fillStyle = color;
    ctx.font = "bold 28px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(text, 256, 74);
    const tex = new T.CanvasTexture(c);
    tex.colorSpace = T.SRGBColorSpace;
    const mesh = new T.Mesh(new T.PlaneGeometry(size, size / 4), new T.MeshBasicMaterial({ map: tex }));
    mesh.position.set(x, y, z);
    scene.add(mesh);
    mesh.userData.context = ctx;
    return mesh;
  }
  box(0, -0.15, 0, 12, 0.3, 12, "#60747b");
  box(0, 3.5, -6, 12, 7, 0.2, "#d5dfe0");
  box(-6, 3.5, 0, 0.2, 7, 12, "#aebfc7");
  box(6, 3.5, 0, 0.2, 7, 12, "#aebfc7");
  box(0, 3.5, 6, 12, 7, 0.2, "#859ba8");
  box(0, 4.2, 0, 12, 0.15, 12, "#c7d6da");
  for (let i = -5; i <= 5; i++) {
    box(i, 6e-3, 0, 0.015, 8e-3, 12, "#84969c");
    box(0, 7e-3, i, 12, 8e-3, 0.015, "#84969c");
  }
  for (const x of [-4, 0, 4]) {
    box(x, 4.08, 0, 1.2, 0.08, 5, "#efffff");
    box(x, 0.015, -0.6, 0.09, 0.02, 3, "#58bac1");
  }
  box(-5.87, 2.35, 0, 0.08, 1.7, 3.4, "#273c4e");
  for (let i = 0; i < 5; i++) {
    const hill = box(-5.81, 1.8 + i * 0.06, -1.4 + i * 0.6, 0.02, 0.5 + i * 0.08, 0.8, i % 2 ? "#c18c67" : "#946957");
    hill.rotation.x = 0.2;
  }
  label("ANALOGUE BASE / FICTIONAL TRAINING", 0, 3.25, -5.85, "#d8ecf0", 3.5);
  for (const [id, p] of Object.entries(LOCATIONS)) {
    const color = { gas: "#54d9df", scope: "#bfafff", chem: "#ffc076", intake: "#91d7ad", board: "#91baff" }[id];
    box(p.x, 0.62, p.z, 2.5, 1.24, 1.2, "#c8d4d6");
    box(p.x, 1.26, p.z, 2.65, 0.12, 1.35, "#223741", 0.5);
    colliders.push({ x: p.x, z: p.z, w: 2.65, d: 1.35 });
    for (const offset of [-0.65, 0.65]) {
      box(p.x + offset, 0.66, p.z + 0.608, 1.16, 1.02, 0.025, "#acbec6");
      box(p.x + offset, 0.99, p.z + 0.65, 0.4, 0.04, 0.045, "#354f5d", 0.6);
      box(p.x + offset, 0.07, p.z, 0.09, 0.14, 0.9, "#1d333b");
    }
    box(p.x, 0.065, p.z, 2.7, 0.025, 1.45, "#3e555e");
    box(p.x, 0.08, p.z + 0.9, 2.6, 0.04, 0.08, color);
    let title = label(p.name, p.x, 2.45, p.z + 0.08, color, 2.4);
    instruments[id] = { title };
    if (["gas", "scope", "chem"].includes(id)) {
      instruments[id].display = label("IDLE / LOAD BOTH VESSELS", p.x, 1.49, p.z + 0.71, color, 1.3);
      instruments[id].vials = [cylinder(p.x - 0.25, 1.65, p.z + 0.35, 0.055, 0.22, "#a2cab5"), cylinder(p.x + 0.25, 1.65, p.z + 0.35, 0.055, 0.22, "#9dc2dd")];
      instruments[id].screenState = "";
    }
    if (id === "gas") {
      for (const [i, tag] of ["SAMPLE", "HEATED CONTROL"].entries()) {
        const x = p.x - 0.52 + i * 1.04;
        cylinder(x, 1.64, p.z, 0.34, 0.65, "#768d98");
        cylinder(x, 1.66, p.z + 0.01, 0.25, 0.56, i ? "#6f9fcb" : "#54bbc0");
        const lid = cylinder(x, 2.02, p.z, 0.38, 0.12, "#c3d3d6");
        (instruments[id].lids ??= []).push(lid);
        label(tag, x, 1.39, p.z + 0.67, "#c4f5f5", 1.02);
        box(x, 1.65, p.z - 0.38, 0.07, 0.1, 0.6, "#788d96", 0.8);
      }
      box(p.x, 1.42, p.z + 0.52, 0.4, 0.16, 0.1, "#142a35");
    }
    if (id === "scope") {
      box(p.x, 1.38, p.z, 0.7, 0.12, 0.65, "#d2d9d6");
      const arm = box(p.x + 0.22, 1.78, p.z - 0.13, 0.18, 0.8, 0.2, "#e0e8df");
      arm.rotation.z = -0.2;
      const tube = cylinder(p.x, 2.03, p.z, 0.12, 0.48, "#233a46");
      tube.rotation.z = 0.35;
      box(p.x, 1.63, p.z + 0.12, 0.6, 0.07, 0.4, "#24343d");
      box(p.x, 1.69, p.z + 0.1, 0.36, 0.025, 0.14, "#8ad1ce");
      cylinder(p.x + 0.4, 1.65, p.z + 0.12, 0.13, 0.12, "#76878c");
      instruments[id].optic = tube;
    }
    if (id === "chem") {
      box(p.x, 1.66, p.z, 1.8, 0.7, 0.8, "#d7dddf");
      box(p.x - 0.4, 1.7, p.z + 0.415, 0.65, 0.36, 0.025, "#102f42");
      for (let i = 0; i < 6; i++) box(p.x + 0.4 + i * 0.06, 1.69, p.z + 0.42, 0.02, 0.32, 0.02, "#405766");
      instruments[id].tray = box(p.x, 1.32, p.z + 0.5, 1.1, 0.09, 0.48, "#7b929a", 0.5);
      cylinder(p.x + 0.55, 2.08, p.z, 0.18, 0.18, "#f0bc72");
    }
    if (id === "intake") {
      for (let i = 0; i < 6; i++) {
        const vial = cylinder(p.x - 0.8 + i * 0.32, 1.51, p.z, 0.09, 0.38, i < 3 ? "#9fd1b6" : "#a9bfda");
        cylinder(vial.position.x, 1.73, p.z, 0.1, 0.07, i < 3 ? "#4b9a73" : "#5576a6");
      }
      label("SEALED SOIL / SEPARATE BLANKS", p.x, 1.95, p.z + 0.05, "#bce8c9", 2.1);
    }
    if (id === "board") {
      box(p.x, 1.95, p.z - 0.15, 1.9, 1.12, 0.14, "#223946");
      box(p.x, 1.97, p.z - 0.06, 1.72, 0.93, 0.025, "#336479");
      for (let i = 0; i < 3; i++) box(p.x - 0.5 + i * 0.5, 1.98, p.z - 0.035, 0.38, 0.55, 0.02, ["#54d9df", "#bfafff", "#ffc076"][i]);
      box(p.x, 1.36, p.z + 0.3, 0.85, 0.04, 0.3, "#465e6e");
    }
    instruments[id].lamp = box(p.x + 1.1, 1.45, p.z + 0.62, 0.08, 0.08, 0.05, "#72f2b2");
  }
  box(-4, 2.9, -5.4, 2.7, 0.14, 0.5, "#899da7");
  for (let i = 0; i < 7; i++) cylinder(-5 + i * 0.34, 3.1, -5.4, 0.09, 0.3, "#e4e5dc");
  box(0, 1, -5.3, 1.6, 2, 0.5, "#95abb2");
  label("PPE / CLEAN VESSELS", 0, 2.25, -5.02, "#d9eeee", 1.5);
  box(-4, 1, 5.2, 2, 1, 0.9, "#c6d3d6");
  box(-4, 1.55, 5.15, 0.9, 0.1, 0.6, "#7e969f");
  cylinder(-4.55, 1.8, 5.15, 0.05, 0.4, "#a9c3cf");
  const player = createPlayer(canvas, camera, colliders, () => target && onInteract(target), onPause);
  const ro = new ResizeObserver(() => {
    const r = host.getBoundingClientRect();
    renderer.setSize(Math.max(1, r.width), Math.max(1, r.height), false);
    camera.aspect = Math.max(1, r.width) / Math.max(1, r.height);
    camera.updateProjectionMatrix();
  });
  ro.observe(host);
  function frame(now) {
    if (disposed) return;
    const elapsed = last ? (now - last) / 1e3 : 0;
    last = now;
    const dt = Math.min(0.05, elapsed);
    if (elapsed > 0.05) slow++;
    if (slow > 90 && !adapted) {
      adapted = true;
      renderer.setPixelRatio(1);
    }
    if (!document.hidden && !frozen) {
      player.update(dt);
      let nearest = null, best = 2.65;
      for (const [id, p] of Object.entries(LOCATIONS)) {
        const distance = Math.hypot(camera.position.x - p.x, camera.position.z - p.z);
        if (distance < best) {
          best = distance;
          nearest = id;
        }
      }
      if (target !== nearest) {
        target = nearest;
        onTarget(target);
      }
      for (const [id, inst] of Object.entries(instruments)) {
        const s = state?.stations[id];
        const loading = s?.stage === "empty";
        for (const lid of inst.lids || []) lid.position.y = T.MathUtils.lerp(lid.position.y, loading ? 2.32 : 2.02, 0.1);
        if (s && inst.display) {
          const screenState = s.stage + ":" + s.sample + ":" + s.control;
          if (screenState !== inst.screenState) {
            inst.screenState = screenState;
            const ctx = inst.display.userData.context;
            ctx.fillStyle = "#0c202b";
            ctx.fillRect(0, 0, 512, 128);
            ctx.fillStyle = "#aff3dc";
            ctx.font = "bold 25px monospace";
            ctx.textAlign = "center";
            ctx.fillText(s.stage === "running" ? "INTEGRATING\u2026" : s.stage === "ready" || s.stage === "recorded" ? "DATA READY / REVIEW" : s.stage === "closed" ? "SEALED / READY" : (s.sample ? "SAMPLE \u2713" : "SAMPLE \u25CB") + "  " + (s.control ? "CONTROL \u2713" : "CONTROL \u25CB"), 256, 74);
            inst.display.material.map.needsUpdate = true;
          }
          inst.vials.forEach((v, i) => {
            const loaded = i ? s.control : s.sample;
            v.visible = loaded;
            v.position.y = T.MathUtils.lerp(v.position.y, s.stage === "empty" ? 1.7 : 1.5, 0.07);
          });
        }
        if (inst.tray) inst.tray.position.z = T.MathUtils.lerp(inst.tray.position.z, s?.stage === "empty" ? -3 : -3.3, 0.1);
        if (inst.optic && s?.stage === "running") inst.optic.rotation.z = 0.35 + Math.sin(now * 6e-3) * 0.025;
        inst.lamp.visible = s?.stage === "running" ? Math.sin(now * 8e-3) > 0 : true;
      }
      renderer.render(scene, camera);
    }
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);
  return { moveTo(id) {
    player.moveTo(LOCATIONS[id]);
  }, enable: (v) => player.setEnabled(v), pause: (v) => frozen = v, stick: (x, y) => player.setStick(x, y), update: (s) => state = s, focus: () => canvas.focus({ preventScroll: true }), dispose() {
    disposed = true;
    cancelAnimationFrame(raf);
    ro.disconnect();
    player.dispose();
    scene.traverse((o) => {
      o.geometry?.dispose();
      if (o.material) {
        for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
          m.map?.dispose();
          m.dispose();
        }
      }
    });
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
  } };
}
export {
  LOCATIONS,
  mountLabScene
};
