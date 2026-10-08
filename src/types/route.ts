export interface RoutePoint {
  lat: number;
  lng: number;
  name?: string;
}

export interface RouteData {
  origin: RoutePoint;
  destination: RoutePoint;
  waypoints: RoutePoint[];
  geometry: RoutePoint[];
  distance?: number; // metres
  duration?: number; // seconds
}

export type TravelMode = 'driving' | 'bicycling' | 'walking';
export type ParsedStop =
  | { kind: 'coord'; point: RoutePoint }
  | { kind: 'name'; query: string };
export interface ParsedRoute {
  stops: ParsedStop[];
  mode: TravelMode;
}

export type ParseErrorCode = 'INVALID_URL' | 'UNSUPPORTED_URL' | 'NO_ROUTE';
export type AppErrorCode =
  | ParseErrorCode
  | 'ROUTE_UNAVAILABLE'
  | 'GEOCODE_FAILED'
  | 'NETWORK'
  | 'API';
export type ParseResult =
  | { success: true; data: ParsedRoute }
  | { success: false; error: ParseErrorCode };

export class AppError extends Error {
  readonly code: AppErrorCode;
  constructor(code: AppErrorCode) {
    super(code);
    this.code = code;
  }
}
