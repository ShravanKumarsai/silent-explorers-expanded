import { missionNames, assetURL, esc, exposureLabel } from "./archive-rules.js";
import "./archive.css";
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("reduce-motion");
function mountPhotoArchive(host, { mission = null } = {}) {
  let scene = null, disposed = false, photos = [], world = null, filter = "", selected = null, paused = reduced(), token = 0, returnFocus = null, closeTimer = 0;
  const controller = new AbortController(), q = (s) => host.querySelector(s);
  host.innerHTML = `<article class="photo-archive"><div class="page-heading"><span class="eyebrow">02 / THE PHOTOGRAPHIC RECORD</span><h1>Worlds, remembered.</h1><p>Turn a world of photographs. Open an image. Read what NASA actually recorded.</p></div><div class="archive-worlds" aria-label="Choose a photo collection"><button data-archive-world="Moon"><span class="world-symbol">☾</span><span><small>01 / LUNAR RECORD</small><strong>Moon Missions</strong><em>Apollo 17 · Surveyor 3</em></span><b aria-hidden="true">›</b></button><button data-archive-world="Mars"><span class="world-symbol">◌</span><span><small>02 / MARTIAN RECORD</small><strong>Mars Missions</strong><em>Spirit · Opportunity · Viking 1 · InSight</em></span><b aria-hidden="true">›</b></button></div><p class="archive-status" role="status">Choose a world to enter its archive.</p><section class="archive-exhibit" hidden><div class="archive-toolbar"><label>Mission <select id="archive-mission"></select></label><div role="group" aria-label="Photo orbit controls"><button data-orbit="pause" aria-pressed="${paused}">${paused ? "Resume" : "Pause"} orbit</button><button data-orbit="in" aria-label="Zoom in">+</button><button data-orbit="out" aria-label="Zoom out">−</button><button data-orbit="reset">Reset view</button><a href="#archive-list" id="browse-archive">Browse photographs ↓</a></div></div><p class="archive-mission-note"></p><div class="archive-stage"><div class="archive-stage-caption"><span class="eyebrow">NASA / THE VISUAL RECORD</span><strong class="archive-world-label"></strong><p>Drag to turn · pinch or scroll to zoom<br>Hover to lift a photograph · select to read it</p></div><aside class="archive-peek" aria-live="polite" hidden></aside></div><details class="archive-source-note"><summary>About this exhibit & its sources</summary><p>The Moon uses NASA/Goddard LRO-based colour and elevation maps with illustrative lighting. Mars displays the official NASA Mars globe from the linked Solar System Exploration viewer. The small HETE satellite and all photo orbits are exhibit devices, not historical flight paths.</p><p>All tiles are NASA photographs or photographic mosaics; some depict Earth testing and training. Read each caption for context. Cataloguing dates are kept separate from exposure dates. NASA images remain linked to their original records.</p><a href="#credits">Credits, processing & usage conditions ›</a></details><details class="archive-browse" id="archive-list"><summary>Browse photographs · keyboard & touch</summary><div class="archive-photo-grid"></div></details></section><dialog class="archive-dialog" aria-labelledby="archive-photo-title"><div class="archive-dialog-inner"><button class="archive-close" aria-label="Return photograph to orbit">Close ×</button><figure><img class="archive-full-image" alt=""><figcaption class="archive-image-status" role="status"></figcaption></figure><div class="archive-photo-copy"></div></div></dialog></article>`;
  q("#browse-archive").onclick=e=>{e.preventDefault();q("#archive-list").open=true;q("#archive-list").scrollIntoView({behavior:reduced()?"instant":"smooth",block:"start"});};
  function status(text) {
    if (!disposed) q(".archive-status").textContent = text;
  }
  function peek(photo) {
    if (disposed) return;
    const el = q(".archive-peek");
    el.hidden = !photo;
    if (photo) el.innerHTML = `<span class="eyebrow">${esc(missionNames[photo.mission])} / ${esc(photo.id)}</span><h2>${esc(photo.title)}</h2><p>${esc(photo.description)}</p><small>Exposure: ${esc(exposureLabel(photo))}</small><br><a href="${esc(photo.source)}" target="_blank" rel="noopener noreferrer">NASA record ›</a>`;
  }
  function show(photo) {
    if (selected || disposed) return;
    selected = photo;
    returnFocus = document.activeElement;
    scene?.select(photo);
    const d = q("dialog"), image = q(".archive-full-image");
    q(".archive-image-status").textContent = "Loading NASA photograph…";
    image.onload = () => {
      if (!disposed) q(".archive-image-status").textContent = photo.credit;
    };
    image.onerror = () => {
      if (!disposed) q(".archive-image-status").textContent = "Local photograph unavailable. Open the NASA source below.";
    };
    image.src = assetURL(photo.path);
    image.alt = photo.title;
    q(".archive-photo-copy").innerHTML = `<span class="eyebrow">${esc(missionNames[photo.mission])} / ${esc(photo.world)}</span><h2 id="archive-photo-title">${esc(photo.title)}</h2><dl><div><dt>Exposure date</dt><dd>${esc(exposureLabel(photo))}</dd></div><div><dt>NASA ID</dt><dd>${esc(photo.id)}</dd></div><div><dt>Catalogue date</dt><dd>${esc(photo.catalogDate.slice(0, 10))}</dd></div><div><dt>Credit</dt><dd>${esc(photo.credit)}</dd></div></dl><p>${esc(photo.description)}</p><a class="button" href="${esc(photo.source)}" target="_blank" rel="noopener noreferrer">Open original NASA record ›</a><p class="small">NASA caption retained. Display image resized and encoded WebP. ${photo.captureDateText ? "Exposure date transcribed from the NASA caption." : "The catalogue timestamp is not assumed to be the exposure date."}</p>`;
    d.showModal();
    d.classList.remove("returning");
  }
  function close() {
    if (!selected) return;
    scene?.close();
    selected = null;
    const d = q("dialog");
    d.classList.add("returning");
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      if (disposed) return;
      d.close();
      returnFocus?.isConnected && returnFocus.focus({ preventScroll: true });
    }, reduced() ? 0 : 280);
  }
  q("dialog").addEventListener("cancel", (e) => {
    e.preventDefault();
    close();
  });
  q("dialog").onclick = (e) => {
    if (e.target === q("dialog")) {
      const r = q(".archive-dialog-inner").getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close();
    }
  };
  q(".archive-close").onclick = close;
  q(".archive-peek").onmouseleave = () => scene?.clearHover();
  function drawList() {
    const shown = photos.filter((x) => x.world === world && (!filter || x.mission === filter));
    q(".archive-photo-grid").innerHTML = shown.map((p) => `<button class="archive-photo-card" data-photo="${esc(p.id)}"><img loading="lazy" src="${assetURL(p.thumbnailPath)}" alt="${esc(p.title)}"><span><small>${esc(missionNames[p.mission])} / ${esc(p.id)}</small><strong>${esc(p.title)}</strong></span></button>`).join("");
    q(".archive-photo-grid").querySelectorAll("[data-photo]").forEach((b) => b.onclick = () => show(photos.find((p) => p.id === b.dataset.photo)));
    q(".archive-mission-note").textContent = filter ? missionNames[filter] + " · " + shown.length + " photographs highlighted. Select a tile to read its original NASA caption." : world + " collection · " + shown.length + " photographs. Mission filters highlight their source images.";
    scene?.setFilter(filter);
  }
  async function choose(next, initialFilter = "") {
    if (disposed || !photos.length) return;
    if (selected) {
      scene?.close(true);
      selected = null;
      q("dialog").close();
    }
    const turn = ++token;
    world = next;
    filter = initialFilter;
    host.dataset.archiveWorld = world;
    q(".archive-exhibit").hidden = false;
    q(".archive-world-label").textContent = world === "Moon" ? "The Moon, in fragments." : "Mars, through their eyes.";
    host.querySelectorAll("[data-archive-world]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.archiveWorld === world)));
    q("#archive-mission").innerHTML = '<option value="">All ' + world + " missions</option>" + Object.entries(missionNames).filter(([id]) => photos.some((p) => p.mission === id && p.world === world)).map(([id, name]) => `<option value="${id}">${name}</option>`).join("");
    q("#archive-mission").value = filter;
    drawList();
    status("Preparing the photographic record…");
    try {
      if (!scene) {
        const { mountArchiveScene } = await import("./archive-scene.js");
        if (disposed || turn !== token) return;
        scene = mountArchiveScene(q(".archive-stage"), { onHover: peek, onSelect: show, onStatus: status, reduced });
        scene.pause(paused);
      }
      if (disposed || turn !== token) return;
      await scene.setWorld(world, photos.filter((p) => p.world === world));
      if (disposed || turn !== token) return;
      scene.setFilter(filter);
    } catch (e) {
      if (disposed) return;
      status("The 3D exhibit is unavailable. Browse the complete NASA photo collection below.");
      q(".archive-stage").classList.add("archive-fallback");
      host.querySelectorAll("[data-orbit]").forEach((b) => b.disabled = true);
    }
  }
  host.querySelectorAll("[data-archive-world]").forEach((b) => b.onclick = () => choose(b.dataset.archiveWorld));
  q("#archive-mission").onchange = (e) => {
    filter = e.target.value;
    drawList();
  };
  host.querySelectorAll("[data-orbit]").forEach((b) => b.onclick = () => {
    if (!scene) return;
    const a = b.dataset.orbit;
    if (a === "pause") {
      paused = !paused;
      scene.pause(paused);
      b.textContent = (paused ? "Resume" : "Pause") + " orbit";
      b.setAttribute("aria-pressed", String(paused));
    }
    if (a === "in") scene.zoom(0.85);
    if (a === "out") scene.zoom(1.18);
    if (a === "reset") scene.reset();
  });
  fetch("/explore/assets/archive/photos.json", { signal: controller.signal }).then((r) => {
    if (!r.ok) throw Error("Photo catalogue unavailable");
    return r.json();
  }).then((data) => {
    if (disposed) return;
    photos = data.images;
    status("56 NASA photographs. Choose a world to enter its archive.");
    if (mission && photos.some((p) => p.mission === mission)) {
      choose(photos.find((p) => p.mission === mission).world, mission);
    }
  }).catch((e) => {
    if (!disposed && e.name !== "AbortError") status("The photo catalogue could not load. Reload the page to retry, or visit images.nasa.gov.");
  });
  return () => {
    disposed = true;
    token++;
    clearTimeout(closeTimer);
    controller.abort();
    scene?.dispose();
    q("dialog").close();
  };
}
export {
  mountPhotoArchive
};
