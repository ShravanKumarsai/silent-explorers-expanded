import test from "node:test";
import assert from "node:assert/strict";
import { Window } from "happy-dom";
import { createPlayer } from "../explore-src/lab-player.js";
const w = new Window();
globalThis.window = w;
globalThis.document = w.document;
test("player stops at counter bounds, resumes after input release and cleans up listeners", () => {
  const canvas = document.createElement("canvas");
  canvas.tabIndex = 0;
  document.body.append(canvas);
  const camera = { position: { x: 0, y: 1.65, z: 2, set(x, y, z) {
    Object.assign(this, { x, y, z });
  } }, rotation: { set() {
  } } };
  let interactions = 0;
  const p = createPlayer(canvas, camera, [{ x: 0, z: 0, w: 2, d: 1 }], () => interactions++, () => {
  });
  canvas.focus();
  window.dispatchEvent(new w.KeyboardEvent("keydown", { key: "w" }));
  for (let i = 0; i < 180; i++) p.update(0.05);
  assert.ok(camera.position.z >= 0.75);
  assert.ok(camera.position.z < 1);
  window.dispatchEvent(new w.KeyboardEvent("keydown", { key: "e" }));
  assert.equal(interactions, 1);
  window.dispatchEvent(new w.KeyboardEvent("keyup", { key: "w" }));
  for (let i = 0; i < 20; i++) p.update(0.05);
  const stopped = camera.position.z;
  p.setEnabled(false);
  window.dispatchEvent(new w.KeyboardEvent("keydown", { key: "s" }));
  for (let i = 0; i < 20; i++) p.update(0.05);
  assert.equal(camera.position.z, stopped);
  p.dispose();
  window.dispatchEvent(new w.KeyboardEvent("keydown", { key: "e" }));
  assert.equal(interactions, 1);
  canvas.remove();
});
test("touch stick moves within room bounds and direct access remains clear of the workstation", () => {
  const canvas = document.createElement("canvas");
  document.body.append(canvas);
  const camera = { position: { x: 0, y: 1.65, z: 0, set(x, y, z) {
    Object.assign(this, { x, y, z });
  } }, rotation: { set() {
  } } };
  const p = createPlayer(canvas, camera, [], () => {
  }, () => {
  });
  p.setStick(1, 0);
  for (let i = 0; i < 300; i++) p.update(0.05);
  assert.ok(camera.position.x <= 5.55);
  assert.ok(camera.position.x > 5);
  p.moveTo({ x: 4, z: 2.5 });
  assert.equal(camera.position.z, 4.85);
  p.dispose();
  canvas.remove();
});
