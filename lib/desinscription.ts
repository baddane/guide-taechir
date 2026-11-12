import { createHmac, timingSafeEqual } from 'node:crypto';

// Lien de désinscription signé (HMAC) : sans signature, n'importe qui pourrait
// désinscrire une adresse tierce. Clé : BREVO_API_KEY, déjà présente.

const cle = () => process.env.DESINSCRIPTION_SECRET || process.env.BREVO_API_KEY || '';

export function jeton(email: string): string {
  return createHmac('sha256', cle()).update(email.trim().toLowerCase()).digest('hex').slice(0, 32);
}

export function jetonValide(email: string, t: string): boolean {
  if (!cle() || !email || !t) return false;
  const a = Buffer.from(jeton(email));
  const b = Buffer.from(t);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function lienDesinscription(site: string, email: string): string {
  return `${site}/api/desinscription?e=${encodeURIComponent(email.trim().toLowerCase())}&t=${jeton(email)}`;
}
