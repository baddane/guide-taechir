// Gestion du consentement cookies + Google Consent Mode v2
// Conforme RGPD, ePrivacy et loi marocaine 09-08.

export type ConsentChoice = {
  ads: boolean;         // ad_storage, ad_user_data, ad_personalization
  analytics: boolean;   // analytics_storage
  timestamp: number;    // date du choix (ms epoch)
  version: number;      // version du formulaire
};

const STORAGE_KEY = 'gt_consent_v1';
const CURRENT_VERSION = 1;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function getStoredConsent(): ConsentChoice | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentChoice;
    if (parsed.version !== CURRENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(ads: boolean, analytics: boolean): ConsentChoice {
  const choice: ConsentChoice = {
    ads,
    analytics,
    timestamp: Date.now(),
    version: CURRENT_VERSION,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
  } catch {
    // localStorage indisponible (mode privé strict) : on continue quand même
  }
  applyConsent(choice);
  // Notifie l'UI (footer, bannière...) qu'une mise à jour a eu lieu
  window.dispatchEvent(new CustomEvent('consent-updated', { detail: choice }));
  return choice;
}

export function applyConsent(choice: ConsentChoice): void {
  if (typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', {
    ad_storage:         choice.ads ? 'granted' : 'denied',
    ad_user_data:       choice.ads ? 'granted' : 'denied',
    ad_personalization: choice.ads ? 'granted' : 'denied',
    analytics_storage:  choice.analytics ? 'granted' : 'denied',
  });
}

export function clearConsent(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent('consent-updated', { detail: null }));
}

// Événement global pour rouvrir la bannière depuis le footer
export const OPEN_PREFERENCES_EVENT = 'open-cookie-preferences';

export function openCookiePreferences(): void {
  window.dispatchEvent(new CustomEvent(OPEN_PREFERENCES_EVENT));
}
