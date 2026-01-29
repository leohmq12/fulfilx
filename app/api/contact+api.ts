const WEBSITE_WEBHOOK_URL =
  process.env.REPLIT_WEBSITE_URL ?? 'https://fulfil-crm--nazstudios.replit.app/api/webhooks/website';
const WEBSITE_API_KEY =
  process.env.REPLIT_WEBSITE_API_KEY ?? 'web_b4281fc9a2de0d11c024bdd243ccc8af845ba5477cc136ce';

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

type ContactPayload = {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
  position?: string;
  comments?: string;
  message?: string;
  source?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as ContactPayload | null;
    const email = body?.email?.trim();
    if (!email) {
      return Response.json({ ok: false, error: 'email is required' }, { status: 400 });
    }

    const res = await fetch(WEBSITE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': WEBSITE_API_KEY,
      },
      body: JSON.stringify({
        email,
        firstName: body?.firstName?.trim() ?? '',
        lastName: body?.lastName?.trim() ?? '',
        phone: body?.phone?.trim() ?? '',
        company: body?.company?.trim() ?? '',
        position: body?.position?.trim() ?? '',
        comments: body?.comments?.trim() ?? '',
        message: body?.message?.trim() ?? '',
        source: body?.source ?? 'contact-page',
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
