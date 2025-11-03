let cachedBasename: string | null = null;

type BaseAwareWindow = Window & {
  __APP_BASE_PATH__?: string;
};

export const getRouterBasename = (): string => {
  if (cachedBasename !== null) {
    return cachedBasename;
  }

  if (typeof window === "undefined") {
    cachedBasename = "/";
    return cachedBasename;
  }

  const globalBase = (window as BaseAwareWindow).__APP_BASE_PATH__;
  const declaredBase =
    globalBase ?? import.meta.env.VITE_BASE_PATH ?? import.meta.env.BASE_URL ?? "/";

  const normalized = new URL(declaredBase, window.location.origin).pathname.replace(
    /\/$/,
    "",
  );
  const sanitized = normalized === "/" ? "" : normalized;

  if (sanitized || !window.location.hostname.endsWith("github.io")) {
    cachedBasename = sanitized;

  if (normalized || !window.location.hostname.endsWith("github.io")) {
    cachedBasename = normalized;
    return cachedBasename;
  }

  const segments = window.location.pathname.split("/").filter(Boolean);
  cachedBasename = segments.length ? `/${segments[0]}` : "";

  return cachedBasename;
};
