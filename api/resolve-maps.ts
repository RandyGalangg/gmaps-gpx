const SHORT_HOSTS = new Set(['maps.app.goo.gl']);
const GOOGLE_HOST = /^(www\.|maps\.)?google\.[a-z]{2,3}(\.[a-z]{2})?$/i;

type RequestLike = {
  method?: string;
  body?: unknown;
};

type ResponseLike = {
  status(code: number): ResponseLike;
  json(body: unknown): void;
};

function send(res: ResponseLike, body: unknown, status = 200) {
  res.status(status).json(body);
}

function isAllowedShortUrl(value: string) {
  try {
    const url = new URL(value);
    return (url.protocol === 'https:' || url.protocol === 'http:') && SHORT_HOSTS.has(url.hostname.toLowerCase());
  } catch {
    return false;
  }
}

function isGoogleMapsUrl(value: string) {
  try {
    const url = new URL(value);
    return (url.protocol === 'https:' || url.protocol === 'http:') && GOOGLE_HOST.test(url.hostname) && url.pathname.startsWith('/maps/');
  } catch {
    return false;
  }
}

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== 'POST') {
    return send(res, { error: 'METHOD_NOT_ALLOWED' }, 405);
  }

  const body = (req.body ?? {}) as { url?: unknown };
  const input = typeof body.url === 'string' ? body.url.trim() : '';

  if (!isAllowedShortUrl(input)) {
    return send(res, { error: 'INVALID_SHORT_URL' }, 400);
  }

  try {
    const response = await fetch(input, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; GoogleMapsToGPX/1.0)',
        accept: 'text/html,application/xhtml+xml',
      },
    });

    const resolvedUrl = response.url;
    if (!isGoogleMapsUrl(resolvedUrl)) {
      return send(res, { error: 'INVALID_REDIRECT' }, 422);
    }

    return send(res, { url: resolvedUrl });
  } catch {
    return send(res, { error: 'RESOLVE_FAILED' }, 502);
  }
}
