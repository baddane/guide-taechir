/**
 * POST /api/guide/checkout
 *
 * Formulaire HTML classique posté depuis /guide-complet (fonctionne sans
 * JavaScript) → session Stripe Checkout → redirection 303 vers Stripe.
 * L'acheteur doit avoir coché la demande d'accès immédiat (renonciation au
 * droit de rétractation pour un contenu numérique) : revérifié ici.
 */

import { type ApiRequest, type ApiResponse, readBody, str, withGuard } from '../../lib/adminApi.js';
import { stripe, stripeKey } from '../../lib/stripe.js';
import { GUIDE } from '../../src/data/guidePayant.js';

const SITE_URL = process.env.SITE_URL || 'https://www.guide-taechir.org';

const WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 20;
}

function redirect(res: ApiResponse, url: string) {
  res.setHeader('Location', url);
  res.status(303).end();
}

async function handler(req: ApiRequest, res: ApiResponse) {
  const retour = `${SITE_URL}${GUIDE.path}`;
  if (req.method !== 'POST') return redirect(res, retour);

  const form = readBody(req.body);
  if (str(form.acces_immediat) !== 'oui') return redirect(res, `${retour}?paiement=consentement#acheter`);
  // Sans la clé de déchiffrement, on ne vend pas : l'acheteur ne pourrait
  // pas télécharger.
  if (!stripeKey() || !process.env.GUIDE_PDF_KEY) return redirect(res, `${retour}?paiement=indisponible#acheter`);

  const fwd = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(fwd) ? fwd[0] : fwd ?? '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) return redirect(res, `${retour}?paiement=indisponible#acheter`);

  const prix = Number(process.env.GUIDE_PRIX_CENTIMES) || GUIDE.prixCentimes;
  try {
    const session = await stripe<{ url?: string; id: string }>('POST', '/checkout/sessions', {
      mode: 'payment',
      locale: 'fr',
      line_items: {
        0: {
          quantity: 1,
          price_data: {
            currency: GUIDE.devise,
            unit_amount: prix,
            product_data: {
              name: GUIDE.nom,
              description: `PDF de ${GUIDE.pages} pages · édition ${GUIDE.edition} · mises à jour incluses`,
            },
          },
        },
      },
      // Facture au nom de l'entreprise : la plupart des acheteurs sont des
      // employeurs qui passent l'achat en charge.
      invoice_creation: { enabled: 'true' },
      billing_address_collection: 'required',
      custom_fields: {
        0: { key: 'raison_sociale', type: 'text', optional: 'true', label: { type: 'custom', custom: 'Raison sociale (facultatif)' } },
      },
      success_url: `${SITE_URL}${GUIDE.path}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${retour}?paiement=annule#acheter`,
      custom_text: {
        submit: {
          message: 'Téléchargement immédiat après paiement. Vous avez demandé l\'accès immédiat au PDF et renoncé à votre droit de rétractation.',
        },
      },
      metadata: { produit: GUIDE.id, acces_immediat: new Date().toISOString() },
      payment_intent_data: { metadata: { produit: GUIDE.id } },
    });
    if (!session.url) throw new Error(`session sans URL ${session.id}`);
    return redirect(res, session.url);
  } catch (e) {
    console.error('[guide/checkout]', e instanceof Error ? e.message : e);
    return redirect(res, `${retour}?paiement=erreur#acheter`);
  }
}

export default withGuard('guide/checkout', handler);
