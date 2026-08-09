/**
 * POST /api/admin/newsletter
 *
 * Onglet « Newsletter » du dashboard. Trois actions :
 *  - `status` : état de la liste Brevo (configurée ? combien de contacts ?)
 *  - `sync`   : pousse les leads et contacts Supabase dans la liste Brevo
 *  - `send`   : crée puis envoie une campagne à partir des articles choisis
 *
 * On passe par une **campagne** Brevo et non par l'API transactionnelle : la
 * désinscription et la gestion des plaintes y sont prises en charge, ce qui est
 * indispensable pour un envoi de masse.
 *
 * Variables d'environnement : BREVO_API_KEY, BREVO_NEWSLETTER_LIST_ID,
 * BREVO_SENDER, BREVO_SENDER_NAME.
 */

import {
  type ApiRequest,
  type ApiResponse,
  readBody,
  rpc,
  str,
  verifyAdminPassword,
} from '../../lib/adminApi';
import { emailShell, escapeHtml, markdownToHtml } from '../../lib/email';

const SENDER_EMAIL = process.env.BREVO_SENDER || 'contact@guide-taechir.org';
const SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Guide-Taechir.org';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.guide-taechir.org';

export interface NewsletterArticle {
  slug: string;
  title: string;
  excerpt?: string;
  date?: string;
  category?: string;
}

/** Les articles sont rendus du plus récent au plus ancien, comme le blueprint. */
export function buildCampaignHtml(intro: string, articles: NewsletterArticle[]): string {
  const cards = articles
    .map((a) => {
      const url = `${SITE_URL}/blog/${a.slug}`;
      const meta = [a.category, a.date].filter(Boolean).join(' · ');
      return `<div style="margin:0 0 20px;padding:18px;border:1px solid #e2e8f0;border-radius:12px;">
  ${meta ? `<p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:#6366f1;">${escapeHtml(meta)}</p>` : ''}
  <h3 style="margin:0 0 8px;font-size:17px;line-height:1.35;color:#0f172a;">
    <a href="${url}" style="color:#0f172a;text-decoration:none;">${escapeHtml(a.title)}</a>
  </h3>
  ${a.excerpt ? `<p style="margin:0 0 12px;color:#475569;font-size:14px;">${escapeHtml(a.excerpt)}</p>` : ''}
  <a href="${url}" style="display:inline-block;padding:9px 16px;background:#4f46e5;color:#ffffff;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;">Lire l'article</a>
</div>`;
    })
    .join('\n');

  return emailShell(`${intro ? markdownToHtml(intro) : ''}${cards}`, { unsubscribe: true });
}

async function brevo(path: string, init: RequestInit & { apiKey: string }) {
  const { apiKey, ...rest } = init;
  const res = await fetch(`https://api.brevo.com/v3${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      'api-key': apiKey,
      ...(rest.headers as Record<string, string> | undefined),
    },
  });
  const text = await res.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  return { ok: res.ok, status: res.status, data, detail: text.slice(0, 400) };
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  const payload = readBody(req.body);
  const password = str(payload.password);
  const action = str(payload.action) || 'status';

  if (!password) {
    res.status(401).json({ ok: false, error: 'missing_password' });
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
  const listId = Number(process.env.BREVO_NEWSLETTER_LIST_ID);
  if (!listId || Number.isNaN(listId)) {
    res.status(500).json({ ok: false, error: 'newsletter_list_not_configured' });
    return;
  }

  /* ── État de la liste ──────────────────────────────────────────────────── */
  if (action === 'status') {
    const out = await brevo(`/contacts/lists/${listId}`, { method: 'GET', apiKey });
    if (!out.ok) {
      res.status(502).json({ ok: false, error: 'brevo_error', detail: out.detail });
      return;
    }
    const list = out.data as { name?: string; totalSubscribers?: number };
    res.status(200).json({
      ok: true,
      listId,
      listName: list.name ?? null,
      subscribers: list.totalSubscribers ?? 0,
    });
    return;
  }

  /* ── Synchronisation Supabase → liste Brevo ────────────────────────────── */
  if (action === 'sync') {
    const data = await rpc('admin_list', { p_password: password });
    if (!data.ok) {
      res.status(502).json({ ok: false, error: 'supabase_error' });
      return;
    }
    const { contacts = [], leads = [] } = (data.data ?? {}) as {
      contacts?: { email: string; name: string | null }[];
      leads?: { email: string; name: string | null }[];
    };

    const seen = new Set<string>();
    const rows: { email: string; attributes: Record<string, string> }[] = [];
    for (const person of [...leads, ...contacts]) {
      const email = str(person?.email).toLowerCase();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || seen.has(email)) continue;
      seen.add(email);
      rows.push({ email, attributes: { PRENOM: str(person?.name) } });
    }

    if (rows.length === 0) {
      res.status(200).json({ ok: true, imported: 0, note: 'aucun contact à synchroniser' });
      return;
    }

    const out = await brevo('/contacts/import', {
      method: 'POST',
      apiKey,
      body: JSON.stringify({
        listIds: [listId],
        updateExistingContacts: true,
        emptyContactsAttributes: false,
        jsonBody: rows,
      }),
    });
    if (!out.ok) {
      res.status(502).json({ ok: false, error: 'brevo_error', detail: out.detail });
      return;
    }
    res.status(200).json({ ok: true, imported: rows.length });
    return;
  }

  /* ── Création + envoi de la campagne ───────────────────────────────────── */
  if (action === 'send') {
    const subject = str(payload.subject);
    const intro = str(payload.intro);
    const articles = Array.isArray(payload.articles)
      ? (payload.articles as NewsletterArticle[]).filter((a) => a && str(a.slug) && str(a.title))
      : [];

    if (!subject) {
      res.status(400).json({ ok: false, error: 'missing_subject' });
      return;
    }
    if (articles.length === 0 && !intro) {
      res.status(400).json({ ok: false, error: 'empty_campaign' });
      return;
    }

    const created = await brevo('/emailCampaigns', {
      method: 'POST',
      apiKey,
      body: JSON.stringify({
        name: `${subject} — ${new Date().toISOString().slice(0, 10)}`,
        subject,
        sender: { email: SENDER_EMAIL, name: SENDER_NAME },
        htmlContent: buildCampaignHtml(intro, articles),
        recipients: { listIds: [listId] },
        inlineImageActivation: false,
      }),
    });
    if (!created.ok) {
      res.status(502).json({ ok: false, error: 'brevo_error', detail: created.detail });
      return;
    }
    const campaignId = (created.data as { id?: number }).id;
    if (!campaignId) {
      res.status(502).json({ ok: false, error: 'campaign_id_missing' });
      return;
    }

    const sent = await brevo(`/emailCampaigns/${campaignId}/sendNow`, { method: 'POST', apiKey });
    if (!sent.ok) {
      res.status(502).json({
        ok: false,
        error: 'brevo_send_error',
        campaignId,
        detail: sent.detail,
      });
      return;
    }

    res.status(200).json({ ok: true, campaignId, articles: articles.length });
    return;
  }

  res.status(400).json({ ok: false, error: 'invalid_action' });
}
