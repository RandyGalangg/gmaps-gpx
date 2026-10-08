import type { RoutePoint } from '../types/route';

export function formatDistance(m: number): string {
  return m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`;
}
export function formatDuration(s: number): string {
  const mins = Math.round(s / 60);
  if (mins < 60) return `${Math.max(mins, 1)} min`;
  return `${Math.floor(mins / 60)} h ${mins % 60} min`;
}
export function pointLabel(p: RoutePoint): string {
  return p.name || `${p.lat.toFixed(5)}, ${p.lng.toFixed(5)}`;
}
