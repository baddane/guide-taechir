/**
 * GET|POST /api/admin/diagnostics?token=<BREVO_INBOUND_SECRET>
 *
 * Répond à la seule question qui bloque quand un envoi échoue : « qu'est-ce qui
 * est réellement configuré sur le serveur ? »
 *
 * Ne renvoie que des booléens et des codes HTTP — **jamais** la valeur d'une
 * variable d'environnement, ni un fragment de clé. Protégé par le même secret
 * que le webhook entrant (vérifié en base, haché).
 *
 * Teste aussi la clé Brevo en direct, ce qui distingue trois cas que l'on
 * confond sinon : clé absente, clé invalide, et clé valide mais bloquée par
 * l'option « Authorised IPs ».
 */

import { type ApiRequest, type ApiResponse, rpc, withGuard } from '../../lib/adminApi.js';

function tokenFrom(req: ApiRequest): string {
  const header = req.headers['x-webhook-token'];
  const fromHeader = Array.isArray(header) ? header[0] : header;
  if (fromHeader) return fromHeader.trim();
  const url = req.url ?? '';
  const q = url.indexOf('?');
  if (q === -1) return '';
  return new URLSearchParams(url.slice(q + 1)).get('token')?.trim() ?? '';
}

async function diagnostics(req: ApiRequest, res: ApiResponse) {
  const token = tokenFrom(req);
  if (!token) {
    res.status(401).json({ ok: false, error: 'missing_token' });
    return;
  }

  const expected = process.env.BREVO_INBOUND_SECRET;
  if (expected && token !== expected) {
    res.status(401).json({ ok: false, error: 'invalid_token' });
    return;
  }
  const verified = await rpc('inbound_verify', { p_secret: token }, { retry: true });
  if (verified.status === 0) {
    // Supabase injoignable : ce n'est pas un refus du jeton, et c'est en soi le
    // diagnostic le plus utile — toutes les routes admin en dépendent.
    res.status(503).json({ ok: false, error: 'supabase_unreachable', detail: verified.detail });
    return;
  }
  if (!verified.ok || verified.data !== true) {
    res.status(401).json({ ok: false, error: 'unauthorized' });
    return;
  }

  const apiKey = process.env.BREVO_API_KEY;

  // Présence uniquement — aucune valeur n'est exposée.
  const env = {
    BREVO_API_KEY: Boolean(apiKey),
    BREVO_NEWSLETTER_LIST_ID: Boolean(process.env.BREVO_NEWSLETTER_LIST_ID),
    BREVO_SENDER: Boolean(process.env.BREVO_SENDER),
    BREVO_SENDER_NAME: Boolean(process.env.BREVO_SENDER_NAME),
    BREVO_REPLY_TO: Boolean(process.env.BREVO_REPLY_TO),
    BREVO_INBOUND_DOMAIN: Boolean(process.env.BREVO_INBOUND_DOMAIN),
    BREVO_INBOUND_SECRET: Boolean(expected),
    SUPABASE_URL: Boolean(process.env.SUPABASE_URL),
  };

  // Test réel de la clé, sans jamais la divulguer.
  let brevo: Record<string, unknown> = { tested: false, reason: 'clé absente' };
  if (apiKey) {
    try {
      const ping = await fetch('https://api.brevo.com/v3/account', {
        headers: { accept: 'application/json', 'api-key': apiKey },
      });
      const detail = ping.ok ? '' : (await ping.text().catch(() => '')).slice(0, 200);
      brevo = {
        tested: true,
        ok: ping.ok,
        status: ping.status,
        hint: ping.ok
          ? null
          : ping.status === 401
            ? 'clé refusée : soit elle est fausse, soit « Authorised IPs » est activé dans Brevo'
            : 'Brevo a répondu une erreur',
        detail,
      };
    } catch {
      brevo = { tested: true, ok: false, status: 0, hint: 'API Brevo injoignable depuis Vercel' };
    }
  }

  // Diagnostic synthétique : ce qui empêche concrètement d'envoyer.
  const blockers: string[] = [];
  if (!env.BREVO_API_KEY) blockers.push('BREVO_API_KEY absente → toute réponse échoue en « brevo_not_configured »');
  else if (brevo.ok === false) blockers.push('BREVO_API_KEY présente mais refusée par Brevo');
  if (!env.BREVO_NEWSLETTER_LIST_ID) blockers.push('BREVO_NEWSLETTER_LIST_ID absente → onglet Newsletter inutilisable');
  if (!env.BREVO_INBOUND_DOMAIN) blockers.push('BREVO_INBOUND_DOMAIN absente → les réponses des contacts ne reviendront pas dans le fil');

  res.status(200).json({
    ok: true,
    reponse_possible: env.BREVO_API_KEY && brevo.ok !== false,
    env,
    brevo,
    blockers,
  });
}

export default withGuard('admin/diagnostics', diagnostics);
