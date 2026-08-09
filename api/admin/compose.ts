/**
 * POST /api/admin/compose
 *
 * Onglet « Composer » du dashboard : envoi d'un e-mail libre rédigé en
 * Markdown, avec pièces jointes facultatives, depuis contact@guide-taechir.org.
 *
 * Envoi transactionnel (destinataires choisis à la main) — pour un envoi de
 * masse, c'est l'onglet Newsletter qui passe par une campagne Brevo, avec
 * désinscription.
 */

import {
  type ApiRequest,
  type ApiResponse,
  readBody,
  rpc,
  str,
  verifyAdminPassword,
} from '../../lib/adminApi';
import {
  type BrevoAttachment,
  emailShell,
  markdownToHtml,
  markdownToText,
  sendTransactional,
} from '../../lib/email';

const SENDER_EMAIL = process.env.BREVO_SENDER || 'contact@guide-taechir.org';
const SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Guide-Taechir.org';
const REPLY_TO = process.env.BREVO_REPLY_TO || SENDER_EMAIL;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_RECIPIENTS = 50;
/** Limite Brevo pour l'ensemble des pièces jointes, avec une marge. */
const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024;

export function parseRecipients(raw: string): { valid: string[]; invalid: string[] } {
  const valid: string[] = [];
  const invalid: string[] = [];
  const seen = new Set<string>();
  for (const part of raw.split(/[,;\s]+/)) {
    const email = part.trim().toLowerCase();
    if (!email) continue;
    if (seen.has(email)) continue;
    seen.add(email);
    (EMAIL_RE.test(email) ? valid : invalid).push(email);
  }
  return { valid, invalid };
}

export function parseAttachments(raw: unknown): {
  attachments: BrevoAttachment[];
  bytes: number;
} {
  const attachments: BrevoAttachment[] = [];
  let bytes = 0;
  if (!Array.isArray(raw)) return { attachments, bytes };
  for (const entry of raw) {
    const name = str((entry as Record<string, unknown>)?.name);
    const content = str((entry as Record<string, unknown>)?.content);
    if (!name || !content) continue;
    // Le contenu arrive en base64 : ~3 octets pour 4 caractères.
    bytes += Math.floor((content.length * 3) / 4);
    attachments.push({ name: name.slice(0, 200), content });
  }
  return { attachments, bytes };
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  const payload = readBody(req.body);
  const password = str(payload.password);
  const subject = str(payload.subject);
  const markdown = str(payload.body);
  const archive = payload.archive === true;

  if (!password) {
    res.status(401).json({ ok: false, error: 'missing_password' });
    return;
  }

  const { valid, invalid } = parseRecipients(str(payload.to));
  if (valid.length === 0) {
    res.status(400).json({ ok: false, error: 'no_valid_recipient', invalid });
    return;
  }
  if (invalid.length > 0) {
    res.status(400).json({ ok: false, error: 'invalid_recipient', invalid });
    return;
  }
  if (valid.length > MAX_RECIPIENTS) {
    res.status(400).json({ ok: false, error: 'too_many_recipients', max: MAX_RECIPIENTS });
    return;
  }
  if (!subject || !markdown) {
    res.status(400).json({ ok: false, error: 'missing_content' });
    return;
  }
  if (markdown.length > 50000 || subject.length > 300) {
    res.status(400).json({ ok: false, error: 'content_too_long' });
    return;
  }

  const { attachments, bytes } = parseAttachments(payload.attachments);
  if (bytes > MAX_ATTACHMENT_BYTES) {
    res.status(413).json({ ok: false, error: 'attachments_too_large', bytes });
    return;
  }

  if (!(await verifyAdminPassword(password))) {
    res.status(401).json({ ok: false, error: 'unauthorized' });
    return;
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    res.status(500).json({ ok: false, error: 'brevo_not_configured' });
    return;
  }

  const sent = await sendTransactional({
    apiKey,
    sender: { email: SENDER_EMAIL, name: SENDER_NAME },
    replyTo: { email: REPLY_TO, name: SENDER_NAME },
    to: valid.map((email) => ({ email })),
    subject,
    htmlContent: emailShell(markdownToHtml(markdown)),
    textContent: markdownToText(markdown),
    attachment: attachments.length > 0 ? attachments : undefined,
    tags: ['admin-compose'],
  });

  if (!sent.ok) {
    res.status(502).json({
      ok: false,
      error: sent.status === 0 ? 'brevo_unreachable' : 'brevo_error',
      status: sent.status,
      detail: sent.detail,
    });
    return;
  }

  // Archivage facultatif : un envoi libre n'appartient à aucun fil, on ne
  // l'enregistre que si l'admin le demande explicitement.
  let archived = false;
  if (archive) {
    const out = await rpc('admin_add_reply', {
      p_password: password,
      p_message_id: null,
      p_to: valid.join(', '),
      p_subject: subject,
      p_body: markdown,
      p_lead_id: null,
    });
    archived = out.ok;
  }

  res.status(200).json({
    ok: true,
    messageId: sent.messageId,
    recipients: valid.length,
    attachments: attachments.length,
    archived,
  });
}
