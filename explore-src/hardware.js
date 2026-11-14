const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
function mountHardware(host, { mission: m, manifest, onInspect = () => {
}, references = "" }) {
  let view = null, disposed = false, current = 0;
  const asset = manifest?.models.find((x) => x.id === m.model), q = (s) => host.querySelector(s);
  host.innerHTML = `<article class="hardware-page"><a class="back-link" href="#mission/${m.id}">\u2190 ${m.short} mission story</a><div class="page-heading"><span class="eyebrow">02 / HARDWARE & SYSTEMS</span><h1>${m.short}, inside and out.</h1><p>Explore the hardware and the engineering decisions behind it, together.</p></div><div class="hardware-layout"><section class="hardware-viewer"><div class="museum-stage"><div class="model-container" id="model-container"></div><div class="model-placeholder"><span class="eyebrow">${m.model ? "OFFICIAL NASA 3D ASSET" : "OFFICIAL MODEL NOT LOCATED"}</span><h2>${m.model ? "Meet the real hardware." : "Read the hardware record."}</h2><p>${m.model ? "Load the NASA model, then choose a system in the guide. Rotate, pan and zoom at your own pace." : "A suitable official downloadable model was not located in the sources checked. Explore the mission photograph and the engineering guide."}</p>${m.model ? '<button class="button" id="load-model">Load official 3D model</button>' : `<img class="missing-model-photo" src="/explore/assets/photos/${m.id}.jpg" alt="${m.short} historical mission photograph">`}</div><div class="model-toolbar" hidden><button data-model="reset">Reset view</button><button data-model="in" aria-label="Zoom in">+</button><button data-model="out" aria-label="Zoom out">\u2212</button><button data-model="left">Pan left</button><button data-model="right">Pan right</button><button data-model="full">Full screen</button></div></div><p class="model-status" role="status">${m.model ? "The engineering guide works before the model loads." : "No substitute spacecraft is displayed."}</p><div class="hardware-caption"><span>${m.model ? esc(asset?.creator || "NASA \xB7 see source credits") : m.short + " historical image"}</span><span>Drag to orbit \xB7 scroll to zoom</span></div><details class="hardware-view-help"><summary>Model controls & source limitations</summary><p>Drag to orbit, scroll to zoom, right-drag to pan. When the canvas is focused, use arrows and +/\u2212, or use the toolbar. Touch supports orbit and two-finger zoom/pan. No mechanical animations or exploded interiors are enabled.</p><p>${esc(asset?.limitations || "Source geometry for this mission was not located. The system descriptions remain available.")}</p>${asset ? `<a href="${esc(asset.source)}" target="_blank" rel="noopener noreferrer">NASA model catalogue \u203A</a>` : ""}<a href="#credits">All sources & usage conditions \u203A</a></details></section><aside class="hardware-guide" aria-label="Inside the machine"><span class="eyebrow">INSIDE THE MACHINE</span><h2>What makes it work?</h2><label for="hardware-system">Choose a spacecraft system</label><select id="hardware-system">${m.components.map(([name], i) => `<option value="${i}">${String(i + 1).padStart(2, "0")} \xB7 ${esc(name)}</option>`).join("")}</select><section class="component-detail" id="component-detail" aria-live="polite"></section><p class="hardware-highlight" role="status"></p><div class="source-selection" role="status"></div><a class="button secondary" href="#lab/${m.activity}">Try this mission\u2019s science activity \u203A</a></aside></div>${references}</article>`;
  function choose(i) {
    current = i;
    const [name, description, term] = m.components[i];
    q("#hardware-system").value = String(i);
    q("#component-detail").innerHTML = `<span class="eyebrow">SYSTEM ${String(i + 1).padStart(2, "0")} / ${m.components.length}</span><h3>${esc(name)}</h3><p>${esc(description)}</p>`;
    q(".hardware-highlight").textContent = view ? view.highlight(term) ? "Source model group highlighted. Group names do not certify every component boundary." : "This system is not separately identified in the source mesh. Its description remains available." : "Load the official model to highlight separately identified source groups, where available.";
    if (!m.model) q(".hardware-highlight").textContent = "Engineering descriptions come from the mission record. No replacement model is generated.";
    onInspect(m.id + ":" + i);
  }
  q("#hardware-system").onchange = (e) => choose(+e.target.value);
  choose(0);
  const load = q("#load-model");
  if (load) load.onclick = async () => {
    load.disabled = true;
    load.textContent = "Loading NASA asset\u2026";
    try {
      const { mountMuseum } = await import("./museum.js");
      if (disposed) return;
      view = await mountMuseum(q("#model-container"), { id: m.model, onProgress: (p) => {
        if (!disposed) q(".model-status").textContent = p === null ? "Downloading NASA model\u2026" : `Loading ${p}%`;
      }, onPick: ({ node, material }) => {
        if (!disposed) q(".source-selection").textContent = `Source mesh: ${node}. Material: ${material}. These labels do not automatically identify a spacecraft system.`;
      } });
      if (disposed) {
        view.dispose();
        return;
      }
      q(".model-placeholder").hidden = true;
      q(".model-toolbar").hidden = false;
      q(".model-status").textContent = "Official NASA model loaded. Source geometry, proportions, materials and textures are unchanged.";
      choose(current);
      host.querySelectorAll("[data-model]").forEach((b) => b.onclick = () => {
        const a = b.dataset.model;
        if (a === "reset") view.reset();
        if (a === "in") view.zoom(0.85);
        if (a === "out") view.zoom(1.18);
        if (a === "left") view.pan(-0.12);
        if (a === "right") view.pan(0.12);
        if (a === "full") {
          if (document.fullscreenElement) document.exitFullscreen?.();
          else q(".museum-stage").requestFullscreen?.().catch(() => q(".model-status").textContent = "Full screen is unavailable in this browser.");
        }
      });
    } catch (e) {
      if (disposed) return;
      load.disabled = false;
      load.textContent = "Retry 3D model";
      q(".model-status").textContent = "The 3D model could not start. Check WebGL/network support and retry. The engineering guide remains available. " + e.message;
    }
  };
  return () => {
    disposed = true;
    view?.dispose();
  };
}
export {
  mountHardware
};
