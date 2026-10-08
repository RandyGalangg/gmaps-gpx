const FALLBACK = 'google-maps-route';

/** Returns a safe filename that always ends in exactly one ".gpx". */
export function sanitizeFilename(input: string): string {
  let base = input.trim();
  while (/\.gpx$/i.test(base)) base = base.replace(/\.gpx$/i, '');
  base = base
    .replace(/[\\/:*?"<>|\u0000-\u001f]/g, '-')
    .replace(/\s+/g, ' ')
    .replace(/^[.\s-]+|[.\s]+$/g, '')
    .slice(0, 100);
  if (!base || /^(con|prn|aux|nul|com\d|lpt\d)$/i.test(base)) base = FALLBACK;
  return `${base}.gpx`;
}
