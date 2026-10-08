import { AppError } from "../types/route";
import type {
  ParsedRoute,
  RouteData,
  RoutePoint,
  TravelMode,
} from "../types/route";

export interface RouteProvider {
  getRoute(
    origin: RoutePoint,
    destination: RoutePoint,
    waypoints?: RoutePoint[],
    mode?: TravelMode,
  ): Promise<RouteData>;
}

interface OsrmResponse {
  code: string;
  routes?: {
    distance: number;
    duration: number;
    geometry: { coordinates: [number, number][] };
  }[];
}

const OSRM_BASE: Record<TravelMode, string> = {
  driving: "https://routing.openstreetmap.de/routed-car",
  bicycling: "https://routing.openstreetmap.de/routed-bike",
  walking: "https://routing.openstreetmap.de/routed-foot",
};

/** OSM-based routing via public OSRM instances: no key, CORS-enabled, best-effort availability. */
export const osrmProvider: RouteProvider = {
  async getRoute(origin, destination, waypoints = [], mode = "driving") {
    const coords = [origin, ...waypoints, destination]
      .map((p) => `${p.lng},${p.lat}`)
      .join(";");
    let res: Response;
    try {
      res = await fetch(
        `${OSRM_BASE[mode]}/route/v1/${mode === "bicycling" ? "cycling" : mode === "walking" ? "foot" : "driving"}/${coords}?overview=full&geometries=geojson`,
      );
    } catch {
      throw new AppError("NETWORK");
    }
    if (res.status === 400) throw new AppError("ROUTE_UNAVAILABLE");
    if (!res.ok) {
      const errorText = await res.text();

      console.error("[OSRM ERROR]", {
        status: res.status,
        statusText: res.statusText,
        body: errorText,
      });

      throw new AppError("API");
    }
    const json = (await res.json()) as OsrmResponse;
    const r = json.routes?.[0];
    if (json.code !== "Ok" || !r || r.geometry.coordinates.length < 2) {
      console.error("[OSRM INVALID RESPONSE]", json);

      throw new AppError("ROUTE_UNAVAILABLE");
    }
    return {
      origin,
      destination,
      waypoints,
      geometry: r.geometry.coordinates.map(([lng, lat]) => ({ lat, lng })),
      distance: r.distance,
      duration: r.duration,
    };
  },
};

// Swap this export to change provider (e.g. a keyed or backend-proxied one) without touching the UI.
export const routeProvider: RouteProvider = osrmProvider;

interface NominatimHit {
  lat: string;
  lon: string;
}

async function geocode(query: string): Promise<RoutePoint> {
  let res: Response;
  try {
    res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(query)}`,
    );
  } catch {
    throw new AppError("NETWORK");
  }
  if (!res.ok) throw new AppError("API");
  const hit = ((await res.json()) as NominatimHit[])[0];
  if (!hit) throw new AppError("GEOCODE_FAILED");
  return { lat: Number(hit.lat), lng: Number(hit.lon), name: query };
}

export async function resolveRoute(parsed: ParsedRoute): Promise<RouteData> {
  const pts: RoutePoint[] = [];
  for (const s of parsed.stops)
    pts.push(s.kind === "coord" ? s.point : await geocode(s.query));
  return routeProvider.getRoute(
    pts[0],
    pts[pts.length - 1],
    pts.slice(1, -1),
    parsed.mode,
  );
}
