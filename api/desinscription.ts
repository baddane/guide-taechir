/**
 * GET|POST /api/desinscription?e=…&t=… — désinscription en un clic (lien en
 * pied de la séquence guide, et en-tête List-Unsubscribe pour Gmail/Outlook).
 * Lien signé (lib/desinscription) : une adresse tierce ne peut pas être
 * désinscrite par un inconnu.
 *
 * Effet chez Brevo : le contact quitte la liste du site et la séquence est
 * close (SEQ_GUIDE = 99). Pas de blocage global : le compte Brevo sert aussi
 * leconseillerfiscal.com.
 */

import { type ApiRequest, type ApiResponse, withGuard } from '../lib/adminApi.js';
import { brandedShell, escapeHtml } from '../lib/email.js';
import { majContact } from '../lib/brevoContacts.js';
import { jetonValide } from '../lib/desinscription.js';
import { ATTR_SEQ_GUIDE, SEQ_SORTIE, SITE } from '../lib/sequence.js';

function page(res: ApiResponse, status: number, titre: string, texte: string) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Robots-Tag', 'noindex');
  res.status(status).send(
    brandedShell(
      `<h1 style="font-size:22px;margin:0 0 14px;color:#0f172a;">${escapeHtml(titre)}</h1><p style="margin:0 0 16px;">${escapeHtml(texte)}</p><p><a href="${SITE}" style="color:#4f46e5;">guide-taechir.org</a></p>`,
      'Désinscription',
    ),
  );
}

async function handler(req: ApiRequest, res: ApiResponse) {
  const url = new URL(req.url ?? '/', SITE);
  const email = (url.searchParams.get('e') ?? '').trim().toLowerCase();
  const t = url.searchParams.get('t') ?? '';
  if (!jetonValide(email, t)) {
    page(res, 400, 'Lien invalide', "Ce lien de désinscription n'est pas valide. Répondez à l'un de nos e-mails avec le mot « Désinscription » : nous vous retirons à la main.");
    return;
  }
  const key = process.env.BREVO_API_KEY!;
  const listId = Number(process.env.BREVO_NEWSLETTER_LIST_ID) || 14;
  const r = await majContact(key, email, { unlinkListIds: [listId], attributes: { [ATTR_SEQ_GUIDE]: SEQ_SORTIE } });
  if (!r.ok && r.status !== 404) {
    console.error('[desinscription] Brevo :', r.status, JSON.stringify(r.data).slice(0, 200));
    page(res, 502, 'Un incident est survenu', "Votre demande n'a pas pu être enregistrée. Répondez à l'un de nos e-mails avec le mot « Désinscription » : nous vous retirons à la main.");
    return;
  }
  page(res, 200, 'Vous êtes désinscrit', 'Vous ne recevrez plus nos e-mails. Vous pourrez vous réinscrire à tout moment depuis le site.');
}

export default withGuard('desinscription', handler);
