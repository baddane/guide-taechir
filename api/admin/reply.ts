/**
 * POST /api/admin/reply
 *
 * Envoie une réponse à un message de contact ou à un lead depuis le dashboard
 * /admin, via l'API transactionnelle Brevo, puis archive la réponse dans
 * Supabase (table `message_replies`) via la RPC `admin_add_reply`.
 *
 * Sécurité :
 *  - le mot de passe admin est vérifié côté serveur (RPC `admin_verify`) AVANT
 *    tout envoi, pour que cette route ne soit pas un relais d'e-mails ouvert ;
 *  - la clé Brevo ne quitte jamais le serveur (variable d'environnement) ;
 *  - limitation de débit basique par IP.
 *
 * Variables d'environnement (Vercel) :
 *  - BREVO_API_KEY          (requis)
 *  - BREVO_SENDER           (par défaut contact@guide-taechir.org)
 *  - BREVO_SENDER_NAME      (par défaut « Guide-Taechir.org »)
 *  - BREVO_REPLY_TO         (par défaut la valeur de BREVO_SENDER)
 *  - SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY (facultatifs, valeurs publiques par défaut)
 *
 * ⚠️ Dans Brevo, l'option « Authorised IPs » doit rester DÉSACTIVÉE : les IP de
 * Vercel sont dynamiques, sinon l'API renvoie 401.
 */

interface ApiRequest {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
}

interface ApiResponse {
  status(code: number): ApiResponse;
  json(payload: unknown): void;
  setHeader(name: string, value: string): void;
  end(): void;
}

const SUPABASE_URL =
  process.env.SUPABASE_URL || 'https://yjxuutdnhsvrbbgcqltw.supabase.co';
const SUPABASE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_x4ehI4AgVADT4U190djnGg_eXRCPd9c';

const SENDER_EMAIL = process.env.BREVO_SENDER || 'contact@guide-taechir.org';
const SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Guide-Taechir.org';
const REPLY_TO = process.env.BREVO_REPLY_TO || SENDER_EMAIL;

/**
 * Adresse de retour du fil. Quand `BREVO_INBOUND_DOMAIN` est configuré, on
 * répond depuis `reply+<id>@<domaine>` : le webhook entrant retrouve ainsi le
 * message d'origine même si le contact répond depuis une autre adresse.
 * Sinon on retombe sur `BREVO_REPLY_TO`.
 */
export function replyToFor(id: string): string {
  const domain = process.env.BREVO_INBOUND_DOMAIN;
  return domain ? `reply+${id}@${domain}` : REPLY_TO;
}

/* ── Limitation de débit (best-effort, mémoire de l'instance) ─────────────── */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 20;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

/* ── Utilitaires ──────────────────────────────────────────────────────────── */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toParagraphs(text: string): string {
  return text
    .split(/\n{2,}/)
    .map(
      (block) =>
        `<p style="margin:0 0 16px;">${escapeHtml(block).replace(/\n/g, '<br />')}</p>`,
    )
    .join('');
}

function buildHtml(body: string, quote: string | null): string {
  const quoteBlock = quote
    ? `<div style="margin-top:28px;padding-top:20px;border-top:1px solid #e2e8f0;">
         <p style="margin:0 0 8px;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;">Votre message initial</p>
         <blockquote style="margin:0;padding:12px 16px;border-left:3px solid #c7d2fe;background:#f8fafc;color:#475569;font-size:14px;white-space:pre-wrap;">${escapeHtml(quote)}</blockquote>
       </div>`
    : '';

  return `<!doctype html>
<html lang="fr"><body style="margin:0;padding:24px;background:#f8fafc;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.65;color:#0f172a;">
    ${toParagraphs(body)}
    ${quoteBlock}
    <div style="margin-top:28px;padding-top:20px;border-top:1px solid #e2e8f0;font-size:13px;color:#64748b;">
      <p style="margin:0 0 4px;"><strong style="color:#0f172a;">Guide-Taechir.org</strong></p>
      <p style="margin:0;">Guide indépendant sur la procédure TAECHIR — <a href="https://www.guide-taechir.org" style="color:#4f46e5;text-decoration:none;">guide-taechir.org</a></p>
    </div>
  </div>
</body></html>`;
}

async function rpc(fn: string, args: Record<string, unknown>) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
    body: JSON.stringify(args),
  });
  const text = await res.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  return { ok: res.ok, status: res.status, data };
}

/* ── Handler ──────────────────────────────────────────────────────────────── */
export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(204).end();
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  const forwarded = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded || 'unknown')
    .split(',')[0]
    .trim();
  if (rateLimited(ip)) {
    res.status(429).json({ ok: false, error: 'rate_limited' });
    return;
  }

  const raw = typeof req.body === 'string' ? safeParse(req.body) : req.body;
  const payload = (raw ?? {}) as Record<string, unknown>;

  const password = str(payload.password);
  const kind = str(payload.kind);
  const id = str(payload.id);
  const to = str(payload.to);
  const toName = str(payload.toName);
  const subject = str(payload.subject);
  const body = str(payload.body);
  const quote = str(payload.quote);

  if (!password) {
    res.status(401).json({ ok: false, error: 'missing_password' });
    return;
  }
  if (kind !== 'contact' && kind !== 'lead') {
    res.status(400).json({ ok: false, error: 'invalid_kind' });
    return;
  }
  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) {
    res.status(400).json({ ok: false, error: 'invalid_id' });
    return;
  }
  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    res.status(400).json({ ok: false, error: 'invalid_recipient' });
    return;
  }
  if (!subject || !body) {
    res.status(400).json({ ok: false, error: 'missing_content' });
    return;
  }
  if (body.length > 20000 || subject.length > 300) {
    res.status(400).json({ ok: false, error: 'content_too_long' });
    return;
  }

  // 1) Vérification du mot de passe admin (avant tout envoi)
  const verify = await rpc('admin_verify', { p_password: password });
  if (!verify.ok || verify.data !== true) {
    res.status(401).json({ ok: false, error: 'unauthorized' });
    return;
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    res.status(500).json({ ok: false, error: 'brevo_not_configured' });
    return;
  }

  // 2) Envoi de l'e-mail via Brevo
  let brevoRes: Response;
  try {
    brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { email: SENDER_EMAIL, name: SENDER_NAME },
        replyTo: { email: replyToFor(id), name: SENDER_NAME },
        to: [toName ? { email: to, name: toName } : { email: to }],
        subject,
        htmlContent: buildHtml(body, quote || null),
        textContent: quote ? `${body}\n\n---\n${quote}` : body,
        tags: ['admin-reply', kind],
      }),
    });
  } catch {
    res.status(502).json({ ok: false, error: 'brevo_unreachable' });
    return;
  }

  if (!brevoRes.ok) {
    const detail = await brevoRes.text().catch(() => '');
    res.status(502).json({
      ok: false,
      error: 'brevo_error',
      status: brevoRes.status,
      detail: detail.slice(0, 500),
    });
    return;
  }

  const sent = (await brevoRes.json().catch(() => ({}))) as {
    messageId?: string;
  };

  // 3) Archivage du fil dans Supabase (l'e-mail est parti : on n'échoue pas ici)
  const archive = await rpc('admin_add_reply', {
    p_password: password,
    p_message_id: kind === 'contact' ? id : null,
    p_to: to,
    p_subject: subject,
    p_body: body,
    p_lead_id: kind === 'lead' ? id : null,
  });

  res.status(200).json({
    ok: true,
    messageId: sent.messageId ?? null,
    archived: archive.ok,
    replyId: archive.ok ? archive.data : null,
  });
}

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function safeParse(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
