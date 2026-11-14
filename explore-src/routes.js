function resolveRoute(hash) {
  const [raw, arg] = String(hash || "").replace(/^#/, "").split("/");
  const section = raw || "opening";
  if (section === "simulator" && (!arg || arg === "spirit" || arg === "apollo")) return {section:"simulator",arg:"opportunity",mission:"opportunity",hash:"#simulator/opportunity"};
  if (section === "lab" && arg === "collector") return {section:"simulator",arg:"opportunity",mission:"opportunity",hash:"#simulator/opportunity"};
  if (section === "machine") return { section: "museum", arg, mission: arg, hash: "#museum" + (arg ? "/" + arg : "") };
  if (section === "control") return { section: "lab", arg: "power", mission: arg, hash: "#lab/power" };
  if (section === "map") return { section: "lab", arg: "atlas", mission: arg, hash: "#lab/atlas" };
  return { section, arg, mission: null, hash: hash || "" };
}
export {
  resolveRoute
};
