function resolveRoute(hash) {
  const [raw, arg] = String(hash || "").replace(/^#/, "").split("/");
  const section = raw || "opening";
  if (section === "machine") return { section: "museum", arg, mission: arg, hash: "#museum" + (arg ? "/" + arg : "") };
  if (section === "control") return { section: "lab", arg: "power", mission: arg, hash: "#lab/power" };
  if (section === "map") return { section: "lab", arg: "atlas", mission: arg, hash: "#lab/atlas" };
  return { section, arg, mission: null, hash: hash || "" };
}
export {
  resolveRoute
};
