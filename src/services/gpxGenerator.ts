import type { RouteData, RoutePoint } from '../types/route';
import type { GpxSettings } from '../types/gpx';

const NS = 'http://www.topografix.com/GPX/1/1';

export function escapeXml(s: string): string {
  return s
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const attr = (p: RoutePoint) => `lat="${p.lat.toFixed(6)}" lon="${p.lng.toFixed(6)}"`;

export function generateGpx(route: RouteData, s: GpxSettings): string {
  const name = escapeXml(s.name.trim() || 'Google Maps Route');
  const parts: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<gpx version="1.1" creator="Google Maps to GPX" xmlns="${NS}" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="${NS} http://www.topografix.com/GPX/1/1/gpx.xsd">`,
    `  <metadata><name>${name}</name></metadata>`,
  ];
  if (s.includeWaypoints) {
    const stops = [
      { ...route.origin, name: route.origin.name || 'Start' },
      ...route.waypoints.map((w, i) => ({ ...w, name: w.name || `Waypoint ${i + 1}` })),
      { ...route.destination, name: route.destination.name || 'End' },
    ];
    for (const p of stops) parts.push(`  <wpt ${attr(p)}><name>${escapeXml(p.name)}</name></wpt>`);
  }
  if (s.includeTrack) {
    parts.push(`  <trk>`, `    <name>${name}</name>`, `    <trkseg>`);
    for (const p of route.geometry) parts.push(`      <trkpt ${attr(p)}></trkpt>`);
    parts.push(`    </trkseg>`, `  </trk>`);
  }
  parts.push('</gpx>');
  return parts.join('\n');
}

const okCoord = (el: Element): boolean => {
  const lat = Number(el.getAttribute('lat'));
  const lon = Number(el.getAttribute('lon'));
  return Number.isFinite(lat) && Number.isFinite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180;
};

export function validateGpx(xml: string, s: GpxSettings): boolean {
  if (!s.includeTrack && !s.includeWaypoints) return false;
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  if (doc.getElementsByTagName('parsererror').length) return false;
  const root = doc.documentElement;
  if (root.localName !== 'gpx' || root.namespaceURI !== NS || root.getAttribute('version') !== '1.1') return false;
  const wpts = [...doc.getElementsByTagNameNS(NS, 'wpt')];
  const pts = [...doc.getElementsByTagNameNS(NS, 'trkpt')];
  if (s.includeTrack) {
    if (!doc.getElementsByTagNameNS(NS, 'trk').length || !doc.getElementsByTagNameNS(NS, 'trkseg').length || !pts.length) return false;
  }
  if (s.includeWaypoints && !wpts.length) return false;
  return [...wpts, ...pts].every(okCoord);
}
