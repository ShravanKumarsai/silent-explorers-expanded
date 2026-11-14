const missionNames = { apollo: "Apollo 17", surveyor: "Surveyor 3", opportunity: "Opportunity", spirit: "Spirit", viking: "Viking 1", insight: "InSight" };
function photoSlots(world, count) {
  return Array.from({ length: count }, (_, i) => {
    const band = Math.floor(i / 8), angle = (i % 8 + 0.5) * Math.PI / 4;
    if (world === "Moon") return { band, angle, polar: (band + 0.5) * Math.PI / 3, radius: 2.65 };
    return { band, angle, inclination: [0, Math.PI / 3, Math.PI / 2, -Math.PI / 3][band % 4], radius: 2.9 + band * 0.12 };
  });
}
function exposureLabel(photo) {
  return photo.captureDateText || "No separately verified exposure date; see NASA caption";
}
const assetURL = (path) => "/explore/" + path;
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
export {
  assetURL,
  esc,
  exposureLabel,
  missionNames,
  photoSlots
};
