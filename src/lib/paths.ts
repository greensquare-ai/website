const base = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL.replace(/\/$/, "");

export function withBase(path: string) {
  if (!path.startsWith("/")) return path;
  return `${base}${path}`;
}
