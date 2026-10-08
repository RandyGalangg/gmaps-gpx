import { useEffect, useMemo } from 'react';
import { MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { RouteData, RoutePoint } from '../types/route';

const dot = (color: string, size: number) =>
  L.divIcon({
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `<div style="width:${size}px;height:${size}px;border-radius:9999px;background:${color};border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)"></div>`,
  });
const ICONS = { start: dot('#16A34A', 20), end: dot('#DC2626', 20), via: dot('#2563EB', 14) };

function Fit({ points }: { points: L.LatLngTuple[] }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(L.latLngBounds(points), { padding: [24, 24] });
  }, [map, points]);
  return null;
}

const ll = (p: RoutePoint): L.LatLngTuple => [p.lat, p.lng];

export default function RouteMap({ route }: { route: RouteData }) {
  const line = useMemo(() => route.geometry.map(ll), [route]);
  const markers = [
    { p: route.origin, icon: ICONS.start, label: route.origin.name || 'Start' },
    ...route.waypoints.map((p, i) => ({ p, icon: ICONS.via, label: p.name || `Waypoint ${i + 1}` })),
    { p: route.destination, icon: ICONS.end, label: route.destination.name || 'End' },
  ];
  return (
    <div role="region" aria-label="Route map" className="h-[300px] overflow-hidden rounded-2xl border border-line md:h-[440px]">
      <MapContainer center={ll(route.origin)} zoom={12} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline positions={line} pathOptions={{ color: '#2563EB', weight: 5 }} />
        {markers.map((m, i) => (
          <Marker key={i} position={ll(m.p)} icon={m.icon} keyboard={false}>
            <Tooltip>{m.label}</Tooltip>
          </Marker>
        ))}
        <Fit points={line} />
      </MapContainer>
    </div>
  );
}
