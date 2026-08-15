/**
 * POST /api/subscribe
 *
 * Inscription publique à la newsletter, appelée par le formulaire du site.
 *
 * Deux enregistrements, volontairement indépendants :
 *  1. Brevo — la liste `BREVO_NEWSLETTER_LIST_ID`, celle qu'utilise l'onglet
 *     Newsletter de /admin pour envoyer les campagnes ;
 *  2. Supabase — la table `newsletter_subscribers`, qui conserve la date du
 *     consentement. Si Brevo est indisponible, l'inscription n'est pas perdue.
 *
 * Route publique : pas de mot de passe, donc limitation de débit par IP, et
 * aucune réponse ne révèle si une adresse était déjà inscrite.
 */

import {
  type ApiRequest,
  type ApiResponse,
  readBody,
  rpc,
  str,
  withGuard,
} from '../lib/adminApi.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── Limitation de débit (mémoire de l'instance, au mieux) ────────────────── */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

/** Ajoute le contact à la liste Brevo. Ne lance jamais. */
async function addToBrevo(email: string, listId: number, apiKey: string): Promise<boolean> {
  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
      }),
    });
    if (res.ok) return true;
    // 400 « Contact already exist » n'est pas une erreur pour nous : la mise à
    // jour avec updateEnabled le rattache déjà à la liste.
    const detail = await res.text().catch(() => '');
    if (res.status === 400 && detail.includes('already exist')) return true;
    console.error(`[subscribe] Brevo a refusé l'inscription (${res.status}) — ${detail.slice(0, 200)}`);
    return false;
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error(`[subscribe] API Brevo injoignable — ${detail}`);
    return false;
  }
}

async function subscribe(req: ApiRequest, res: ApiResponse) {
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

  const payload = readBody(req.body);
  const email = str(payload.email).toLowerCase();
  const source = str(payload.source) || 'site';
  const page = str(payload.page) || null;

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    res.status(400).json({ ok: false, error: 'invalid_email' });
    return;
  }

  // Brevo d'abord : on veut savoir si l'inscription y a réellement abouti,
  // pour le consigner dans Supabase.
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_NEWSLETTER_LIST_ID);
  let brevoOk = false;
  if (apiKey && listId && !Number.isNaN(listId)) {
    brevoOk = await addToBrevo(email, listId, apiKey);
  }

  const stored = await rpc('newsletter_subscribe', {
    p_email: email,
    p_source: source.slice(0, 60),
    p_page: page ? page.slice(0, 200) : null,
    p_brevo_ok: brevoOk,
  });

  // Échec des deux côtés : là seulement l'inscription est réellement perdue.
  if (!stored.ok && !brevoOk) {
    console.error(`[subscribe] échec complet pour ${email} — supabase ${stored.status}`);
    res.status(503).json({ ok: false, error: 'subscribe_failed' });
    return;
  }

  res.status(200).json({ ok: true, brevo: brevoOk, archived: stored.ok });
}

export default withGuard('subscribe', subscribe);
