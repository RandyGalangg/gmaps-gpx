const GOOGLE_HOST = /^(www\.|maps\.)?google\.[a-z]{2,3}(\.[a-z]{2})?$/i;
const SHORT_HOSTS = ['maps.app.goo.gl', 'goo.gl'];

export function isHttpUrl(raw: string): URL | null {
  try {
    const u = new URL(raw.trim());
    return u.protocol === 'http:' || u.protocol === 'https:' ? u : null;
  } catch {
    return null;
  }
}

export function isGoogleMapsHost(u: URL): boolean {
  return GOOGLE_HOST.test(u.hostname);
}
export function isShortLink(u: URL): boolean {
  return SHORT_HOSTS.includes(u.hostname.toLowerCase());
}

export function isGoogleMapsShortLink(raw: string): boolean {
  const u = isHttpUrl(raw);
  return Boolean(u && isShortLink(u));
}

export type InputValidity = 'empty' | 'valid' | 'invalid';
export function validateInput(value: string): InputValidity {
  if (!value.trim()) return 'empty';
  const u = isHttpUrl(value);
  if (!u) return 'invalid';
  return isGoogleMapsHost(u) || isShortLink(u) ? 'valid' : 'invalid';
}
