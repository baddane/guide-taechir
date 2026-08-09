/**
 * POST /api/brevo/inbound?token=<secret>
 *
 * Webhook « Inbound Parsing » de Brevo : reçoit les réponses envoyées par les
 * contacts, les rattache au bon fil et les enregistre dans Supabase.
 *
 * Rattachement, par ordre de fiabilité :
 *  1. jeton d'adresse — les réponses partent avec un Reply-To
 *     `reply+<uuid>@<BREVO_INBOUND_DOMAIN>` ; l'uuid identifie le message ou le
 *     lead d'origine, même si le contact répond depuis une autre adresse ;
 *  2. adresse de l'expéditeur — dernier message ou lead portant cet e-mail ;
 *  3. inconnu — le mail devient un nouveau message de contact (rien n'est perdu).
 *
 * Sécurité : le secret `?token=` est vérifié en base (`inbound_verify`, haché
 * comme le mot de passe admin). Sans lui, aucune écriture.
 *
 * Variables d'environnement :
 *  - BREVO_INBOUND_SECRET (requis) — même valeur que dans l'URL du webhook
 *  - BREVO_INBOUND_DOMAIN (recommandé) — ex. `inbound.guide-taechir.org`
 */

interface ApiRequest {
  method?: string;
  url?: string;
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

const MAX_BODY_CHARS = 20000;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/* ── Lecture défensive du payload Brevo ───────────────────────────────────── */
type Json = Record<string, any>;

/** Brevo poste `{ items: [ … ] }` ; on accepte aussi un objet seul ou un tableau. */
export function extractItems(payload: unknown): Json[] {
  if (!payload || typeof payload !== 'object') return [];
  const p = payload as Json;
  if (Array.isArray(p)) return p as Json[];
  if (Array.isArray(p.items)) return p.items as Json[];
  return [p];
}

/** Les adresses arrivent en `{Address, Name}`, en tableau, ou en simple chaîne. */
export function addressOf(value: unknown): { email: string; name: string } {
  if (!value) return { email: '', name: '' };
  if (Array.isArray(value)) return addressOf(value[0]);
  if (typeof value === 'string') {
    const m = value.match(/<([^>]+)>/);
    return { email: (m ? m[1] : value).trim(), name: m ? value.split('<')[0].trim() : '' };
  }
  const v = value as Json;
  return {
    email: String(v.Address ?? v.address ?? v.Email ?? v.email ?? '').trim(),
    name: String(v.Name ?? v.name ?? '').trim(),
  };
}

/** Toutes les adresses destinataires (To + Cc), pour y chercher le jeton. */
export function allRecipients(item: Json): string[] {
  const out: string[] = [];
  for (const field of [item.To, item.to, item.Cc, item.cc]) {
    if (!field) continue;
    for (const entry of Array.isArray(field) ? field : [field]) {
      const { email } = addressOf(entry);
      if (email) out.push(email);
    }
  }
  return out;
}

/** `reply+<uuid>@domaine` → l'uuid du message ou du lead d'origine. */
export function tokenFromRecipients(recipients: string[]): string | null {
  for (const address of recipients) {
    const local = address.split('@')[0] ?? '';
    const plus = local.split('+')[1];
    if (plus && UUID_RE.test(plus)) return plus.toLowerCase();
  }
  return null;
}

/** Corps du message : on préfère la version sans historique cité. */
export function bodyOf(item: Json): string {
  const candidates = [
    item.ExtractedMarkdownMessage,
    item.extractedMarkdownMessage,
    item.RawTextBody,
    item.rawTextBody,
    item.Text,
    item.text,
  ];
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim()) return c.trim().slice(0, MAX_BODY_CHARS);
  }
  const html = item.RawHtmlBody ?? item.rawHtmlBody;
  if (typeof html === 'string' && html.trim()) {
    return html
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
      .slice(0, MAX_BODY_CHARS);
  }
  return '';
}

export function secretFromRequest(req: ApiRequest): string {
  const header = req.headers['x-webhook-token'];
  const fromHeader = Array.isArray(header) ? header[0] : header;
  if (fromHeader) return fromHeader.trim();
  const url = req.url ?? '';
  const q = url.indexOf('?');
  if (q === -1) return '';
  return new URLSearchParams(url.slice(q + 1)).get('token')?.trim() ?? '';
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
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  const secret = secretFromRequest(req);
  if (!secret) {
    res.status(401).json({ ok: false, error: 'missing_token' });
    return;
  }

  // Pré-contrôle local quand la variable est définie : évite d'interroger la
  // base pour chaque requête parasite arrivant sur l'URL du webhook.
  const expected = process.env.BREVO_INBOUND_SECRET;
  if (expected && secret !== expected) {
    res.status(401).json({ ok: false, error: 'invalid_token' });
    return;
  }

  const raw = typeof req.body === 'string' ? safeParse(req.body) : req.body;
  const items = extractItems(raw);
  if (items.length === 0) {
    res.status(400).json({ ok: false, error: 'empty_payload' });
    return;
  }

  const results: unknown[] = [];
  for (const item of items) {
    const from = addressOf(item.From ?? item.from ?? item.Sender ?? item.sender);
    const recipients = allRecipients(item);
    const body = bodyOf(item);
    const subject = String(item.Subject ?? item.subject ?? '').slice(0, 300);
    const externalId = String(item.MessageId ?? item.messageId ?? item.Uuid ?? '') || null;

    if (!from.email || !body) {
      results.push({ status: 'skipped', reason: 'missing_sender_or_body' });
      continue;
    }

    const out = await rpc('inbound_add_reply', {
      p_secret: secret,
      p_from: from.email,
      p_to: recipients[0] ?? '',
      p_subject: subject,
      p_body: body,
      p_from_name: from.name || null,
      p_token: tokenFromRecipients(recipients),
      p_external_id: externalId,
    });

    if (!out.ok) {
      const detail = typeof out.data === 'object' && out.data
        ? (out.data as Json).message ?? ''
        : String(out.data ?? '');
      if (String(detail).includes('unauthorized')) {
        res.status(401).json({ ok: false, error: 'unauthorized' });
        return;
      }
      results.push({ status: 'error', detail: String(detail).slice(0, 200) });
      continue;
    }
    results.push(out.data);
  }

  // Toujours 200 quand le secret est bon : un 4xx/5xx ferait retenter Brevo
  // indéfiniment sur un mail qu'on ne saura de toute façon pas traiter.
  res.status(200).json({ ok: true, processed: results.length, results });
}

function safeParse(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
