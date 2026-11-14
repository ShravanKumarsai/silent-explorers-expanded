import * as T from "three";
function createExplodedDisplay(scene, model) {
  model.updateMatrixWorld(true);
  const originalBounds = new T.Box3().setFromObject(model), center = originalBounds.getCenter(new T.Vector3()), radius = originalBounds.getSize(new T.Vector3()).length() * 0.5, display = new T.Group();
  display.name = "Educational source-mesh separation";
  display.visible = false;
  scene.add(display);
  const parts = [], groups = /* @__PURE__ */ new Map();
  model.traverse((source) => {
    if (!source.isMesh) return;
    const name = source.userData.sourceNodeName || source.name || "Unnamed source mesh";
    let part = groups.get(name);
    if (!part) {
      const mesh = new T.Group();
      mesh.name = name;
      display.add(mesh);
      part = { name, mesh, home: new T.Vector3(), offset: new T.Vector3() };
      groups.set(name, part);
      parts.push(part);
    }
    const instance = new T.Mesh(source.geometry, source.material);
    instance.name = name;
    source.matrixWorld.decompose(instance.position, instance.quaternion, instance.scale);
    instance.userData.sourcePart = parts.indexOf(part);
    part.mesh.add(instance);
  });
  display.updateMatrixWorld(true);
  for (const p of parts) {
    p.offset.copy(new T.Box3().setFromObject(p.mesh).getCenter(new T.Vector3())).sub(center);
    if (p.offset.length() < radius * 0.02) p.offset.set(0, 1, 0);
    p.offset.normalize().multiplyScalar(radius * 0.7);
  }
  let amount = 0, isolated = null;
  function update() {
    model.visible = amount === 0 && isolated === null;
    display.visible = !model.visible;
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      p.mesh.position.copy(p.home).addScaledVector(p.offset, amount);
      p.mesh.visible = isolated === null || isolated === i;
    }
    display.updateMatrixWorld(true);
  }
  return { parts: parts.map((p, i) => ({ index: i, name: p.name })), group: display, setAmount(value) {
    amount = Math.max(0, Math.min(1, +value || 0));
    update();
  }, isolate(index) {
    isolated = index === null ? null : Math.max(0, Math.min(parts.length - 1, +index));
    update();
  }, bounds(index) {
    return index === null ? new T.Box3().setFromObject(display.visible ? display : model) : new T.Box3().setFromObject(parts[index].mesh);
  }, dispose() {
    display.removeFromParent();
  } };
}
export {
  createExplodedDisplay
};
