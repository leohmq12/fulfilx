const NEWSLETTER_WEBHOOK_URL =
  process.env.REPLIT_NEWSLETTER_URL ??
  'https://fulfil-crm--nazstudios.replit.app/api/webhooks/newsletter';
const NEWSLETTER_API_KEY =
  process.env.REPLIT_NEWSLETTER_API_KEY ??
  'nws_656be6e3243a33ab05ad56f186fef924858d8798af72b8dc';

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as
      | { email?: string; name?: string; source?: string }
      | null;

    const email = body?.email?.trim();
    if (!email) {
      return Response.json({ ok: false, error: 'email is required' }, { status: 400 });
    }

    const res = await fetch(NEWSLETTER_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': NEWSLETTER_API_KEY,
      },
      body: JSON.stringify({
        email,
        name: body?.name ?? '',
        source: body?.source ?? 'footer',
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return Response.json(
        { ok: false, error: text || `Upstream error (${res.status})` },
        { status: 502 }
      );
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json({ ok: false, error: 'Internal error' }, { status: 500 });
  }
}
