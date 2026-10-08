import type { ParsedStop, ParseErrorCode, ParseResult, TravelMode } from '../types/route';
import { isGoogleMapsHost, isHttpUrl, isShortLink } from '../utils/validation';

const fail = (error: ParseErrorCode): ParseResult => ({ success: false, error });
const COORD = /^(-?\d{1,2}(?:\.\d+)?),\s*(-?\d{1,3}(?:\.\d+)?)$/;
// `!1d<lng>!2d<lat>` pairs; the lookahead rejects viewport tuples (`!1d<dist>!2d<lng>!3d<lat>`).
const DATA_PAIR = /!1d(-?\d+(?:\.\d+)?)!2d(-?\d+(?:\.\d+)?)(?=$|!(?!3d))/g;

const inRange = (lat: number, lng: number) => Math.abs(lat) <= 90 && Math.abs(lng) <= 180;

export function parseGoogleMapsUrl(raw: string): ParseResult {
  const url = isHttpUrl(raw);
  if (!url) return fail('INVALID_URL');
  if (isShortLink(url)) return fail('UNSUPPORTED_URL'); // shortlinks must be resolved by the serverless endpoint first
  if (!isGoogleMapsHost(url)) return fail('INVALID_URL');

  const m = url.pathname.match(/\/maps\/dir\/(.*)$/);
  if (!m) return fail('UNSUPPORTED_URL');

  const routePath = m[1];
  const routeSegments = routePath.split('/');
  const segments: string[] = [];
  for (const seg of routeSegments) {
    if (!seg || seg.startsWith('@') || seg.startsWith('data=')) break;
    try {
      segments.push(decodeURIComponent(seg.replace(/\+/g, ' ')).trim());
    } catch {
      return fail('UNSUPPORTED_URL');
    }
  }
  if (segments.length < 2) return fail('NO_ROUTE');

  // Google Maps commonly places route-stop coordinates inside the /data=... portion,
  // after the viewport segment. Keep the whole pathname available instead of stopping at '@'.
  const dataMatch = url.pathname.match(/\/data=([^/?]*)/);
  const rawData = dataMatch?.[1] ?? '';
  let decodedData = rawData;
  try {
    decodedData = decodeURIComponent(rawData);
  } catch {
    /* keep raw */
  }

  const pairs = [...decodedData.matchAll(DATA_PAIR)]
    .map((p) => ({ lng: Number(p[1]), lat: Number(p[2]) }))
    .filter((p) => inRange(p.lat, p.lng));

  const stops: ParsedStop[] = segments.map((seg) => {
    const c = seg.match(COORD);
    if (c && inRange(Number(c[1]), Number(c[2]))) {
      return { kind: 'coord', point: { lat: Number(c[1]), lng: Number(c[2]) } };
    }
    return { kind: 'name', query: seg };
  });

  // If Google Maps supplied exactly one coordinate pair for every named stop,
  // associate those pairs with the names. This handles URLs where the origin is
  // already explicit in /dir/ while destination coordinates live in /data=.
  const namedIndexes = stops
    .map((stop, index) => (stop.kind === 'name' ? index : -1))
    .filter((index) => index >= 0);

  if (pairs.length === namedIndexes.length) {
    for (let i = 0; i < namedIndexes.length; i += 1) {
      const index = namedIndexes[i];
      const pair = pairs[i];
      const current = stops[index];
      if (current.kind === 'name') {
        stops[index] = { kind: 'coord', point: { ...pair, name: current.query } };
      }
    }
  }

  const mode = detectMode(decodedData, url);
  if (!mode) return fail('UNSUPPORTED_URL'); // e.g. transit
  return { success: true, data: { stops, mode } };
}

function detectMode(data: string, url: URL): TravelMode | null {
  const code = data.match(/!3e(\d)/)?.[1];
  const q = url.searchParams.get('travelmode');
  if (code === '0' || q === 'driving' || (!code && !q)) return 'driving';
  if (code === '1' || q === 'bicycling') return 'bicycling';
  if (code === '2' || q === 'walking') return 'walking';
  return null;
}
