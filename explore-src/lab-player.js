function createPlayer(canvas, camera, colliders, onInteract, onPause) {
  const keys = /* @__PURE__ */ new Set(), listeners = [];
  let yaw = 0, pitch = 0, enabled = true, drag = null, stick = { x: 0, y: 0 }, velocity = { x: 0, z: 0 };
  const on = (el, type, fn, opts) => {
    el.addEventListener(type, fn, opts);
    listeners.push(() => el.removeEventListener(type, fn, opts));
  };
  const look = (x, y) => {
    yaw -= x * 3e-3;
    pitch = Math.max(-1.15, Math.min(1.15, pitch - y * 3e-3));
  };
  const clear = () => {
    keys.clear();
    stick = { x: 0, y: 0 };
    velocity = { x: 0, z: 0 };
    drag = null;
  };
  on(canvas, "pointerdown", (e) => {
    if (!enabled) return;
    canvas.focus({ preventScroll: true });
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY };
    canvas.setPointerCapture?.(e.pointerId);
  });
  on(canvas, "pointermove", (e) => {
    if (!enabled) return;
    if (document.pointerLockElement === canvas) look(e.movementX, e.movementY);
    else if (drag?.id === e.pointerId) {
      look(e.clientX - drag.x, e.clientY - drag.y);
      drag.x = e.clientX;
      drag.y = e.clientY;
    }
  });
  on(canvas, "pointerup", () => drag = null);
  on(canvas, "pointercancel", () => drag = null);
  on(canvas, "dblclick", () => {
    if (enabled && canvas.requestPointerLock) {
      try {
        const p = canvas.requestPointerLock();
        p?.catch(() => {
        });
      } catch {
      }
    }
  });
  on(window, "keydown", (e) => {
    if (!enabled || e.target.closest?.("input,select,textarea,button") || document.activeElement !== canvas && document.pointerLockElement !== canvas) return;
    const k = e.key.toLowerCase();
    if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright", "e"].includes(k)) {
      e.preventDefault();
      if (k === "e" && !e.repeat) onInteract();
      else keys.add(k);
    }
  });
  on(window, "keyup", (e) => keys.delete(e.key.toLowerCase()));
  on(window, "blur", () => {
    clear();
    onPause();
  });
  on(document, "visibilitychange", () => {
    if (document.hidden) {
      clear();
      onPause();
    }
  });
  const blocked = (x, z) => Math.abs(x) > 5.55 || Math.abs(z) > 5.55 || colliders.some((b) => x > b.x - b.w / 2 - 0.25 && x < b.x + b.w / 2 + 0.25 && z > b.z - b.d / 2 - 0.25 && z < b.z + b.d / 2 + 0.25);
  return { update(dt) {
    if (enabled) {
      const forward = Number(keys.has("w") || keys.has("arrowup")) - Number(keys.has("s") || keys.has("arrowdown")) - stick.y, side = Number(keys.has("d") || keys.has("arrowright")) - Number(keys.has("a") || keys.has("arrowleft")) + stick.x, n = Math.max(1, Math.hypot(forward, side)), speed = 2.1 * dt / n, dx = (-Math.sin(yaw) * forward + Math.cos(yaw) * side) * speed, dz = (-Math.cos(yaw) * forward - Math.sin(yaw) * side) * speed;
      const smooth = 1 - Math.exp(-12 * dt);
      velocity.x += (dx - velocity.x) * smooth;
      velocity.z += (dz - velocity.z) * smooth;
      if (!blocked(camera.position.x + velocity.x, camera.position.z)) camera.position.x += velocity.x;
      if (!blocked(camera.position.x, camera.position.z + velocity.z)) camera.position.z += velocity.z;
    }
    camera.rotation.set(pitch, yaw, 0, "YXZ");
  }, setEnabled(v) {
    enabled = v;
    clear();
    if (!v && document.pointerLockElement === canvas) document.exitPointerLock?.();
  }, moveTo(target) {
    camera.position.set(target.x, 1.65, target.z + 2.35);
    yaw = 0;
    pitch = -0.12;
    clear();
  }, setStick(x, y) {
    stick = { x, y };
  }, dispose() {
    clear();
    if (document.pointerLockElement === canvas) document.exitPointerLock?.();
    listeners.forEach((f) => f());
  } };
}
export {
  createPlayer
};
