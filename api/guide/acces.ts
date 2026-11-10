/**
 * GET /api/guide/acces?session_id=cs_…
 *
 * Appelée par la page /guide-complet/merci. Relit la session auprès de Stripe
 * et, au premier passage seulement :
 *   1. enregistre la vente dans `leads` (source « guide-paiement », visible
 *      dans l'onglet Leads de /admin) ;
 *   2. envoie à l'acheteur son lien de téléchargement (Brevo, gabarit du site) ;
 *   3. alerte contact@guide-taechir.org.
 * Le « premier passage » est marqué dans les métadonnées du PaymentIntent
 * Stripe (`livre_le`) : pas de webhook à déclarer, pas de table à créer.
 */

import { type ApiRequest, type ApiResponse, SUPABASE_KEY, SUPABASE_URL, withGuard } from '../../lib/adminApi.js';
import { brandedShell, markdownToHtml, markdownToText, sendTransactional } from '../../lib/email.js';
import { guidePaye, stripe } from '../../lib/stripe.js';
import { GUIDE } from '../../src/data/guidePayant.js';

const SITE_URL = process.env.SITE_URL || 'https://www.guide-taechir.org';
const SENDER = { email: process.env.BREVO_SENDER || 'contact@guide-taechir.org', name: process.env.BREVO_SENDER_NAME || 'Guide-Taechir.org' };
const ADMIN_EMAIL = process.env.BREVO_REPLY_TO || 'contact@guide-taechir.org';

function sessionDe(req: ApiRequest): string {
  const url = new URL(req.url ?? '/', 'http://x');
  return url.searchParams.get('session_id') ?? '';
}

async function livrer(email: string, sessionId: string, montant: string, livemode: boolean) {
  const lien = `${SITE_URL}/api/guide/telecharger?session_id=${sessionId}`;

  // 1. Trace en base (best effort : la vente est déjà chez Stripe).
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({
        email,
        source: 'guide-paiement',
        page: GUIDE.path,
        details: { produit: GUIDE.id, montant, stripe_session: sessionId, livemode },
      }),
    });
    if (!r.ok) console.error('[guide/acces] insertion lead :', r.status, await r.text());
  } catch (e) {
    console.error('[guide/acces] insertion lead :', e);
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return console.error('[guide/acces] BREVO_API_KEY absente : e-mail de livraison non envoyé');

  const corps = [
    'Bonjour,',
    '',
    `Merci pour votre achat. Votre **${GUIDE.nom}** (édition ${GUIDE.edition}) est prêt :`,
    '',
    `[Télécharger le guide (PDF)](${lien})`,
    '',
    'Ce lien reste valable : il vous donnera toujours **la dernière édition** du guide. Conservez cet e-mail.',
    '',
    'Votre dossier sort de l\'ordinaire ? Répondez à cet e-mail avec la mention « mise en relation » et votre ville : avec votre accord, nous vous mettons en relation avec un cabinet partenaire qui monte ces dossiers.',
    '',
    `Pour rappel, vous avez demandé l'accès immédiat à ce contenu numérique et renoncé à votre droit de rétractation. Conditions de vente : ${SITE_URL}/conditions-de-vente`,
    '',
    '**L\'équipe Guide-Taechir.org**',
    'contact@guide-taechir.org',
  ].join('\n');

  const envoi = await sendTransactional({
    apiKey,
    sender: SENDER,
    replyTo: { email: ADMIN_EMAIL, name: SENDER.name },
    to: [{ email }],
    subject: `Votre ${GUIDE.nom} — lien de téléchargement`,
    htmlContent: brandedShell(markdownToHtml(corps), 'Votre guide est prêt'),
    textContent: markdownToText(corps),
    tags: ['guide-livraison'],
  });
  if (!envoi.ok) console.error('[guide/acces] livraison Brevo :', envoi.status, envoi.detail);

  const alerte = await sendTransactional({
    apiKey,
    sender: SENDER,
    replyTo: { email },
    to: [{ email: ADMIN_EMAIL }],
    subject: `[Vente] ${GUIDE.nom} — ${montant} · ${email}`,
    htmlContent: brandedShell(markdownToHtml(`Vente du guide : **${montant}**\n\nClient : ${email}\n\nStripe : ${sessionId} (${livemode ? 'LIVE' : 'TEST'})`), 'Nouvelle vente'),
    tags: ['guide-vente-alerte'],
  });
  if (!alerte.ok) console.error('[guide/acces] alerte Brevo :', alerte.status, alerte.detail);
}

async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Cache-Control', 'private, no-store');
  const sessionId = sessionDe(req);
  const vente = await guidePaye(sessionId);
  if (!vente) {
    res.status(403).json({ ok: false, error: 'paiement_introuvable' });
    return;
  }
  if (!vente.dejaLivre && vente.paymentIntentId) {
    // Marquer d'abord : un rechargement de la page pendant l'envoi ne doit
    // pas produire un second e-mail.
    try {
      await stripe('POST', `/payment_intents/${vente.paymentIntentId}`, { metadata: { livre_le: new Date().toISOString() } });
      if (vente.email) await livrer(vente.email, vente.id, vente.montant, vente.livemode);
    } catch (e) {
      console.error('[guide/acces] marquage / livraison :', e instanceof Error ? e.message : e);
    }
  }
  res.status(200).json({
    ok: true,
    email: vente.email,
    telechargement: `/api/guide/telecharger?session_id=${vente.id}`,
  });
}

export default withGuard('guide/acces', handler);
