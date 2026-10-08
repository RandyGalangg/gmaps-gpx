import { useCallback, useMemo, useRef, useState } from 'react';
import { parseGoogleMapsUrl } from '../services/googleMapsParser';
import { resolveRoute } from '../services/routeService';
import { generateGpx, validateGpx } from '../services/gpxGenerator';
import { AppError } from '../types/route';
import { API_BASE_URL } from '../config';
import { isGoogleMapsShortLink } from '../utils/validation';
import type { AppErrorCode, RouteData } from '../types/route';
import { DEFAULT_GPX_SETTINGS } from '../types/gpx';
import type { GpxSettings } from '../types/gpx';

export type Status = 'idle' | 'loading' | 'success' | 'error';
export type Stage = 'analyzing' | 'resolving' | 'generating';

export function useRouteConverter() {
  const [status, setStatus] = useState<Status>('idle');
  const [stage, setStage] = useState<Stage>('analyzing');
  const [route, setRoute] = useState<RouteData | null>(null);
  const [error, setError] = useState<AppErrorCode | null>(null);
  const [settings, setSettings] = useState<GpxSettings>(DEFAULT_GPX_SETTINGS);
  const busy = useRef(false);

  const resolveShortLink = useCallback(async (input: string): Promise<string> => {
    if (!isGoogleMapsShortLink(input)) return input;

    const endpoint = `${API_BASE_URL}/api/resolve-maps`;
    let response: Response;
    try {
      response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: input.trim() }),
      });
    } catch {
      throw new AppError('NETWORK');
    }

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      if (payload?.error === 'INVALID_REDIRECT' || payload?.error === 'INVALID_SHORT_URL') {
        throw new AppError('UNSUPPORTED_URL');
      }
      throw new AppError('API');
    }

    const payload = (await response.json()) as { url?: string };
    if (!payload.url) throw new AppError('UNSUPPORTED_URL');
    return payload.url;
  }, []);

  const convert = useCallback(async (url: string) => {
    if (busy.current) return;
    busy.current = true;
    setStatus('loading');
    setStage('analyzing');
    setError(null);
    setRoute(null);
    try {
      const resolvedInput = await resolveShortLink(url);
      const parsed = parseGoogleMapsUrl(resolvedInput);
      if (!parsed.success) throw new AppError(parsed.error);
      setStage('resolving');
      const resolved = await resolveRoute(parsed.data);
      setStage('generating');
      setRoute(resolved);
      setStatus('success');
    } catch (e) {
      setError(e instanceof AppError ? e.code : 'API');
      setStatus('error');
    } finally {
      busy.current = false;
    }
  }, [resolveShortLink]);

  const reset = useCallback(() => {
    setStatus('idle');
    setRoute(null);
    setError(null);
  }, []);

  const gpx = useMemo(() => {
    if (!route) return null;
    const xml = generateGpx(route, settings);
    return { xml, valid: validateGpx(xml, settings) };
  }, [route, settings]);

  return { status, stage, route, error, settings, setSettings, gpx, convert, reset };
}
