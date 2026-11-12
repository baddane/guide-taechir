/**
 * GET /api/cron/sequence-guide — Vercel Cron, chaque jour (vercel.json).
 *
 * Séquence de quatre e-mails sur dix jours vers le guide payant (lib/sequence.ts).
 *
 * L'état vit chez Brevo, sans table ni migration : la liste du site
 * (BREVO_NEWSLETTER_LIST_ID) donne les contacts et leur date de création ;
 * l'attribut numérique SEQ_GUIDE retient la dernière étape envoyée
 * (99 = sortie : achat ou désinscription). Il est créé au premier passage.
 *
 * Garde-fous :
 *  1. Seuls les contacts créés depuis SEQUENCE_GUIDE_START (défaut 12/11/2026).
 *  2. L'étape est réservée (attribut posé) AVANT l'envoi, rendue si l'envoi échoue.
 *  3. Une étape par contact et par jour, dans l'ordre.
 *  4. Exclus : contacts bloqués chez Brevo, acheteurs, désinscrits.
 *  5. Guide pas encore en vente (STRIPE_SECRET_KEY / GUIDE_PDF_KEY) : rien ne part.
 *  6. SEQUENCE_GUIDE_OFF = 'true' coupe tout ; `?dry=1` donne le plan sans envoyer.
 *  7. Si CRON_SECRET existe, seul Vercel Cron peut appeler. Sans lui, un appel
 *     extérieur ne peut que déclencher un envoi déjà dû.
 * Les adresses sont masquées dans la réponse.
 */

import { type ApiRequest, type ApiResponse, withGuard } from '../../lib/adminApi.js';
import { brandedShell, markdownToHtml, markdownToText, sendTransactional } from '../../lib/email.js';
import { brevo, majContact } from '../../lib/brevoContacts.js';
import { ATTR_SEQ_GUIDE, ETAPES_GUIDE, SEQ_SORTIE, SITE, etapeGuideDue } from '../../lib/sequence.js';
import { lienDesinscription } from '../../lib/desinscription.js';
import { stripeKey } from '../../lib/stripe.js';

const DEBUT_DEFAUT = '2026-11-12T00:00:00Z';
const FENETRE_JOURS = 25;
const MAX_PAR_PASSAGE = 80;

interface Contact {
  email: string;
  emailBlacklisted?: boolean;
  createdAt: string;
  attributes?: Record<string, unknown>;
}

const masquer = (e: string) => {
  const [u, d] = e.split('@');
  return `${u.slice(0, 2)}***@${d ?? ''}`;
};

async function assurerAttribut(key: string) {
  const r = await brevo('/contacts/attributes', key);
  const attrs = (r.data as { attributes?: { name: string }[] } | null)?.attributes ?? [];
  if (attrs.some((a) => a.name === ATTR_SEQ_GUIDE)) return;
  const c = await brevo(`/contacts/attributes/normal/${ATTR_SEQ_GUIDE}`, key, {
    method: 'POST',
    body: JSON.stringify({ type: 'float' }),
  });
  if (!c.ok) console.error('[sequence-guide] création attribut :', c.status, JSON.stringify(c.data).slice(0, 200));
}

async function handler(req: ApiRequest, res: ApiResponse) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.authorization;
  if (secret && auth !== `Bearer ${secret}`) {
    res.status(401).json({ ok: false, error: 'unauthorized' });
    return;
  }
  if (process.env.SEQUENCE_GUIDE_OFF === 'true') {
    res.status(200).json({ ok: true, coupe: true });
    return;
  }
  const key = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_NEWSLETTER_LIST_ID) || 14;
  if (!key) {
    res.status(500).json({ ok: false, error: 'BREVO_API_KEY absente' });
    return;
  }

  // Tant que le guide n'est pas en vente (clé Stripe ou clé du PDF absente),
  // la série attend : elle renverrait vers un paiement indisponible. Les
  // contacts ne sont pas perdus, ils la reçoivent dès l'ouverture de la vente
  // (une étape par jour, dans la fenêtre de 25 jours).
  const enVente = Boolean(stripeKey() && process.env.GUIDE_PDF_KEY);
  const dry = new URL(req.url ?? '/', SITE).searchParams.get('dry') === '1' || !enVente;
  const debut = new Date(process.env.SEQUENCE_GUIDE_START || DEBUT_DEFAUT);
  const sender = {
    email: process.env.BREVO_SENDER || 'contact@guide-taechir.org',
    name: process.env.BREVO_SENDER_NAME || 'Guide-Taechir.org',
  };

  if (!dry) await assurerAttribut(key);

  const contacts: Contact[] = [];
  for (let offset = 0; offset < 5000; offset += 500) {
    const r = await brevo(`/contacts/lists/${listId}/contacts?limit=500&offset=${offset}&sort=desc`, key);
    if (!r.ok) {
      res.status(502).json({ ok: false, error: `Brevo liste ${listId} : ${r.status}` });
      return;
    }
    const page = (r.data as { contacts?: Contact[] } | null)?.contacts ?? [];
    contacts.push(...page);
    if (page.length < 500 || page.some((c) => new Date(c.createdAt) < debut)) break;
  }

  const plan: { email: string; etape: number }[] = [];
  const erreurs: { email: string; etape: number; erreur: string }[] = [];
  let envoyes = 0;
  const maintenant = Date.now();

  for (const c of contacts) {
    if (plan.length >= MAX_PAR_PASSAGE) break;
    const cree = new Date(c.createdAt);
    if (cree < debut || c.emailBlacklisted) continue;
    const ageJours = (maintenant - cree.getTime()) / 86_400_000;
    if (ageJours > FENETRE_JOURS) continue;
    const derniere = Number(c.attributes?.[ATTR_SEQ_GUIDE] ?? 0) || 0;
    if (derniere >= SEQ_SORTIE) continue;
    const etape = etapeGuideDue(ageJours, derniere);
    if (!etape) continue;

    plan.push({ email: masquer(c.email), etape: etape.etape });
    if (dry) continue;

    const reserve = await majContact(key, c.email, { attributes: { [ATTR_SEQ_GUIDE]: etape.etape } });
    if (!reserve.ok) {
      erreurs.push({ email: masquer(c.email), etape: etape.etape, erreur: `réservation ${reserve.status}` });
      continue;
    }

    const desinscription = lienDesinscription(SITE, c.email);
    const corps = `${etape.corps}

---

Vous recevez cette courte série (${ETAPES_GUIDE.length} e-mails) car vous vous êtes inscrit sur Guide-Taechir.org. [Ne plus recevoir nos e-mails](${desinscription})`;

    const r = await sendTransactional({
      apiKey: key,
      sender,
      replyTo: sender,
      to: [{ email: c.email }],
      subject: etape.objet,
      htmlContent: brandedShell(markdownToHtml(corps)),
      textContent: markdownToText(corps),
      headers: { 'List-Unsubscribe': `<${desinscription}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' },
      tags: ['sequence-guide', `sequence-guide-e${etape.etape}`],
    });
    if (!r.ok) {
      await majContact(key, c.email, { attributes: { [ATTR_SEQ_GUIDE]: derniere } });
      erreurs.push({ email: masquer(c.email), etape: etape.etape, erreur: `Brevo ${r.status}` });
      console.error('[sequence-guide] envoi :', r.status, r.detail.slice(0, 200));
      continue;
    }
    envoyes++;
  }

  res.status(200).json({ ok: true, dry, enVente, examines: contacts.length, planifies: plan.length, envoyes, plan, erreurs });
}

export default withGuard('cron/sequence-guide', handler);
