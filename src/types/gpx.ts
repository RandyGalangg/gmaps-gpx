export interface GpxSettings {
  name: string;
  filename: string;
  includeTrack: boolean;
  includeWaypoints: boolean;
}
export const DEFAULT_GPX_SETTINGS: GpxSettings = {
  name: 'Google Maps Route',
  filename: 'google-maps-route.gpx',
  includeTrack: true,
  includeWaypoints: true,
};
