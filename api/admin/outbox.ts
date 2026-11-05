/**
 * POST /api/admin/outbox
 *
 * Envoi (ou abandon) d'un message de la file « Messages préparés » de /admin
 * (table `outbox`). Règle de l'exploitant du 05/11/2026 : tout e-mail part
 * depuis /admin, au gabarit du site et depuis contact@guide-taechir.org.
 * Les messages rédigés hors de l'interface sont déposés dans `outbox` ;
 * l'admin les relit et clique « Envoyer ».
 *
 * Le destinataire n'est JAMAIS lu dans la requête : il vient de la ligne en
 * base. La route ne peut pas servir à écrire à une adresse arbitraire — c'est
 * le rôle de l'onglet Composer.
 */

import {
  type ApiRequest,
  type ApiResponse,
  denyUnlessAdmin,
  readBody,
  rpc,
  str,
  withGuard,
} from '../../lib/adminApi.js';
import { brandedShell, markdownToHtml, markdownToText, sendTransactional } from '../../lib/email.js';

const SENDER_EMAIL = process.env.BREVO_SENDER || 'contact@guide-taechir.org';
const SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Guide-Taechir.org';
const REPLY_TO = process.env.BREVO_REPLY_TO || SENDER_EMAIL;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface OutboxRow {
  id: string | null;
  to_email: string;
  subject: string;
  body: string;
}

async function outbox(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }
  const payload = readBody(req.body);
  const password = str(payload.password);
  const action = str(payload.action);
  const id = str(payload.id);
  const subject = str(payload.subject);
  const body = typeof payload.body === 'string' ? payload.body : '';

  if (!password) {
    res.status(401).json({ ok: false, error: 'unauthorized' });
    return;
  }
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    res.status(400).json({ ok: false, error: 'invalid_id' });
    return;
  }
  if (subject.length > 300 || body.length > 20000) {
    res.status(400).json({ ok: false, error: 'content_too_long' });
    return;
  }
  if (await denyUnlessAdmin(password, res)) return;

  if (action === 'abandon') {
    const out = await rpc('admin_outbox_set', { p_password: password, p_id: id, p_statut: 'abandonne' });
    res.status(out.ok ? 200 : 503).json(out.ok ? { ok: true } : { ok: false, error: 'supabase_error' });
    return;
  }
  if (action !== 'send') {
    res.status(400).json({ ok: false, error: 'invalid_action' });
    return;
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    res.status(500).json({ ok: false, error: 'brevo_not_configured' });
    return;
  }

  // Réservation : la ligne passe à « envoye » avec le texte relu. La fonction
  // n'agit que sur une ligne encore à envoyer — un second clic ne trouve rien.
  const reserved = await rpc('admin_outbox_set', {
    p_password: password,
    p_id: id,
    p_statut: 'envoye',
    p_subject: subject || null,
    p_body: body.trim() || null,
  });
  const row = reserved.data as OutboxRow | null;
  if (!reserved.ok) {
    res.status(503).json({ ok: false, error: 'supabase_error' });
    return;
  }
  if (!row || !row.id) {
    res.status(409).json({ ok: false, error: 'already_handled' });
    return;
  }
  const revert = () => rpc('admin_outbox_revert', { p_password: password, p_id: id });
  if (!EMAIL_RE.test(row.to_email)) {
    await revert();
    res.status(400).json({ ok: false, error: 'invalid_recipient' });
    return;
  }

  const sent = await sendTransactional({
    apiKey,
    sender: { email: SENDER_EMAIL, name: SENDER_NAME },
    replyTo: { email: REPLY_TO, name: SENDER_NAME },
    to: [{ email: row.to_email }],
    subject: row.subject,
    htmlContent: brandedShell(markdownToHtml(row.body)),
    textContent: `${markdownToText(row.body)}\n\n--\nGuide-Taechir.org — https://www.guide-taechir.org`,
    tags: ['admin-outbox'],
  });
  if (!sent.ok) {
    console.error(`[admin/outbox] envoi Brevo refusé (${sent.status}) — ${sent.detail}`);
    await revert();
    res.status(503).json({
      ok: false,
      error: sent.status === 0 ? 'brevo_unreachable' : 'brevo_error',
      detail: sent.detail,
    });
    return;
  }
  res.status(200).json({ ok: true, to: row.to_email, messageId: sent.messageId });
}

export default withGuard('admin/outbox', outbox);
