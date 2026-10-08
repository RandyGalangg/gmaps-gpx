# Google Maps to GPX

Client-side React + Vite + TypeScript app that turns a Google Maps directions link into a GPX 1.1 file. No backend.

## Features
Parses `google.com/maps/dir/...` links (coordinates, place names, waypoints, travel mode), rebuilds real road geometry through a routing provider, previews it on a Leaflet/OpenStreetMap map, validates the GPX, and downloads it. It never draws a straight line between stops.

## Tech stack
React 19, TypeScript, Vite, Tailwind CSS 4, Leaflet + React Leaflet, Lucide, pnpm.

## Develop
```
pnpm install
pnpm dev
pnpm build
pnpm preview
```
Commit `pnpm-lock.yaml` (the GitHub workflow uses `--frozen-lockfile`).

## Environment variables
| Variable | Purpose |
| --- | --- |
| `VITE_BASE_PATH` | `/` (Vercel, `<user>.github.io` repos) or `/repo-name/` (GitHub Pages project sites) |
| `VITE_GITHUB_URL` | Repo link shown in header/footer |
| `VITE_ROUTE_API_KEY` | Reserved for a keyed provider. Unused by the default provider. Any `VITE_*` value ships in public JS, so use only restricted, rotatable keys. |

## Deploy
**Vercel:** import the repo; build `pnpm build`, output `dist`; leave `VITE_BASE_PATH` unset.
**GitHub Pages:** Settings > Pages > Source: GitHub Actions. Push to `main`; `.github/workflows/deploy.yml` sets `VITE_BASE_PATH` to `/<repo-name>/` automatically (edit it to `/` for a `<user>.github.io` repo). There is no client router, so no 404 fallback is needed.

## How it works
1. `googleMapsParser` reads stops and travel mode from the URL. Data-parameter coordinates are only used when they map 1:1 to the stops.
2. `routeService` geocodes place names (Nominatim) and requests geometry via the `RouteProvider` interface (default: public OSRM instances at routing.openstreetmap.de for car/bike/foot).
3. `gpxGenerator` escapes all text, builds GPX 1.1, and `validateGpx` re-parses it before download is enabled.

To change provider, implement `RouteProvider` and change one export in `routeService.ts`.

## Known limitations
- Google links usually contain stops, not the path. The route is recomputed on OpenStreetMap data, so it may differ from Google's route, especially with custom route drags.
- Shortened links (`maps.app.goo.gl`) cannot be expanded from a browser (CORS). Transit mode is unsupported.
- Public OSRM and Nominatim are best-effort services with usage policies and rate limits; heavy use needs your own instance or a backend proxy.
- Place-name links depend on geocoding and may resolve to the wrong place; coordinates links are exact.
