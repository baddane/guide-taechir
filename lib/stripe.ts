/**
 * Accès minimal à l'API Stripe, sans SDK (un seul `fetch`), pour la vente du
 * guide payant. Côté serveur uniquement (`api/**`).
 *
 * Variables Vercel :
 *   STRIPE_SECRET_KEY   sk_live_… (la même clé que leconseillerfiscal.com
 *                       convient : c'est le même compte Stripe de la LLC)
 *   GUIDE_PRIX_CENTIMES facultatif, prix en centimes de dirham (défaut : 15000 = 150 DH)
 *
 * Pas de webhook : le paiement est relu auprès de Stripe à chaque accès
 * (page de remerciement, téléchargement). L'identifiant de session `cs_…`
 * sert de jeton : seul l'acheteur le connaît (URL de retour, e-mail).
 */

const API = 'https://api.stripe.com/v1';

export function stripeKey(): string | null {
  return process.env.STRIPE_SECRET_KEY || null;
}

/** Encode un objet imbriqué au format attendu par Stripe (a[b][0][c]=…). */
function encode(data: Record<string, unknown>, prefix = '', out: string[] = []): string[] {
  for (const [k, v] of Object.entries(data)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (typeof v === 'object') encode(v as Record<string, unknown>, key, out);
    else out.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
  }
  return out;
}

export async function stripe<T = Record<string, unknown>>(
  method: 'GET' | 'POST',
  path: string,
  data?: Record<string, unknown>,
): Promise<T> {
  const key = stripeKey();
  if (!key) throw new Error('stripe_not_configured');
  const body = data ? encode(data).join('&') : undefined;
  const url = method === 'GET' && body ? `${API}${path}?${body}` : `${API}${path}`;
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: method === 'POST' ? body : undefined,
  });
  const json = (await res.json().catch(() => ({}))) as T & { error?: { message?: string } };
  if (!res.ok) throw new Error(`stripe_${res.status}: ${json.error?.message ?? 'erreur'}`);
  return json;
}

export interface SessionPayee {
  id: string;
  email: string;
  livemode: boolean;
  montant: string;
  paymentIntentId: string | null;
  dejaLivre: boolean;
  /** Métadonnées de la session (origine de la visite : utm_*, landing_page). */
  metadata: Record<string, string>;
}

export const SESSION_RE = /^cs_(test|live)_[A-Za-z0-9]{10,250}$/;

/** Relit une session Checkout : renvoie null si elle n'est pas un guide payé. */
export async function guidePaye(sessionId: unknown): Promise<SessionPayee | null> {
  if (typeof sessionId !== 'string' || !SESSION_RE.test(sessionId)) return null;
  type Session = {
    id: string;
    livemode: boolean;
    payment_status: string;
    amount_total: number | null;
    currency: string | null;
    customer_details?: { email?: string | null } | null;
    customer_email?: string | null;
    metadata?: Record<string, string>;
    payment_intent?: { id: string; metadata?: Record<string, string> } | string | null;
  };
  let s: Session;
  try {
    s = await stripe<Session>('GET', `/checkout/sessions/${sessionId}`, { expand: { 0: 'payment_intent' } });
  } catch (e) {
    console.error('[stripe] session illisible :', e instanceof Error ? e.message : e);
    return null;
  }
  if (s.payment_status !== 'paid' || s.metadata?.produit !== 'guide-taechir') return null;
  const pi = typeof s.payment_intent === 'object' && s.payment_intent ? s.payment_intent : null;
  const montant =
    s.amount_total != null
      ? `${(s.amount_total / 100).toLocaleString('fr-FR')} ${(s.currency ?? 'mad') === 'mad' ? 'DH' : (s.currency ?? '').toUpperCase()}`
      : '';
  return {
    id: s.id,
    email: s.customer_details?.email ?? s.customer_email ?? '',
    livemode: s.livemode,
    montant,
    paymentIntentId: pi?.id ?? (typeof s.payment_intent === 'string' ? s.payment_intent : null),
    dejaLivre: Boolean(pi?.metadata?.livre_le),
    metadata: s.metadata ?? {},
  };
}
