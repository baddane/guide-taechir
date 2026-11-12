/**
 * Mesure d'audience et de conversion (12/11/2026).
 *
 * Vercel Web Analytics : sans cookie, donc sans consentement. Les événements
 * personnalisés ne sont enregistrés que sur les offres Vercel qui les
 * incluent ; ailleurs l'appel est sans effet. GA4 (gtag) reçoit les mêmes
 * événements, et n'enregistre que si le visiteur a consenti (index.html).
 *
 * La source de vérité des ventes reste la base : leads « guide-paiement »,
 * avec l'origine de la visite (utm_*) dans `details`.
 */

import { inject, track as vercelTrack } from '@vercel/analytics';

type Valeur = string | number | boolean;

export function demarrerMesure(): void {
  try {
    inject();
  } catch {
    /* noop */
  }
  capturerOrigine();
}

export function trackEvent(nom: string, params: Record<string, Valeur> = {}): void {
  try {
    vercelTrack(nom, params);
  } catch {
    /* noop */
  }
  try {
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.('event', nom, params);
  } catch {
    /* noop */
  }
}

/* ── Origine de la visite (first-touch, par session) ────────────────────── */

const CLE = 'gt_origine';
export const CHAMPS_ORIGINE = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'landing_page'] as const;
export type Origine = Partial<Record<(typeof CHAMPS_ORIGINE)[number], string>>;

function capturerOrigine(): void {
  try {
    if (sessionStorage.getItem(CLE)) return;
    const p = new URLSearchParams(window.location.search);
    const o: Origine = {};
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const) {
      const v = p.get(k);
      if (v) o[k] = v.slice(0, 200);
    }
    o.landing_page = (window.location.pathname + window.location.search).slice(0, 300);
    sessionStorage.setItem(CLE, JSON.stringify(o));
  } catch {
    /* noop */
  }
}

export function origine(): Origine {
  try {
    const raw = sessionStorage.getItem(CLE);
    return raw ? (JSON.parse(raw) as Origine) : {};
  } catch {
    return {};
  }
}
