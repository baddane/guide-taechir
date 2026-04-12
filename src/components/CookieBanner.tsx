import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Settings, X } from 'lucide-react';
import {
  getStoredConsent,
  saveConsent,
  OPEN_PREFERENCES_EVENT,
} from '../lib/consent';

type View = 'hidden' | 'banner' | 'preferences';

export function CookieBanner() {
  const [view, setView] = useState<View>('hidden');
  const [adsChecked, setAdsChecked] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);

  // Affichage initial : si pas de choix mémorisé, on montre la bannière
  useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) {
      // Léger délai pour laisser la page peindre avant l'animation
      const t = setTimeout(() => setView('banner'), 400);
      return () => clearTimeout(t);
    }
    setAdsChecked(existing.ads);
    setAnalyticsChecked(existing.analytics);
  }, []);

  // Ré-ouverture depuis le footer
  useEffect(() => {
    const handler = () => {
      const existing = getStoredConsent();
      setAdsChecked(existing?.ads ?? false);
      setAnalyticsChecked(existing?.analytics ?? false);
      setView('preferences');
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, handler);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, handler);
  }, []);

  const handleAcceptAll = () => {
    saveConsent(true, true);
    setView('hidden');
  };

  const handleRefuseAll = () => {
    saveConsent(false, false);
    setView('hidden');
  };

  const handleSavePreferences = () => {
    saveConsent(adsChecked, analyticsChecked);
    setView('hidden');
  };

  if (view === 'hidden') return null;

  // ═══ Vue préférences détaillées ═══
  if (view === 'preferences') {
    return (
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 sm:p-4">
        <div className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-200 sticky top-0 bg-white">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900">Préférences cookies</h2>
            </div>
            <button
              onClick={() => setView('hidden')}
              className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-5">
            <p className="text-sm text-slate-600 leading-relaxed">
              Choisissez les catégories de cookies que vous autorisez. Vous pouvez modifier ce choix à tout moment depuis le lien « Gérer mes cookies » en bas de page.
            </p>

            {/* Essentiels */}
            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Cookies strictement nécessaires</h3>
                  <p className="text-xs text-slate-500 mt-1">Indispensables au fonctionnement du site (navigation, sécurité). Toujours actifs.</p>
                </div>
                <span className="text-xs font-semibold bg-slate-100 text-slate-500 px-2 py-1 rounded whitespace-nowrap">Toujours actif</span>
              </div>
            </div>

            {/* Publicité */}
            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 text-sm">Cookies publicitaires</h3>
                  <p className="text-xs text-slate-500 mt-1">Utilisés par Google AdSense pour vous proposer des annonces pertinentes et mesurer leur performance.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={adsChecked}
                    onChange={(e) => setAdsChecked(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
                </label>
              </div>
            </div>

            {/* Analytics */}
            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 text-sm">Cookies de mesure d'audience</h3>
                  <p className="text-xs text-slate-500 mt-1">Nous permettent de comprendre comment les visiteurs utilisent le site afin de l'améliorer (données anonymisées).</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={analyticsChecked}
                    onChange={(e) => setAnalyticsChecked(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
                </label>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              En savoir plus : <Link to="/politique-de-confidentialite" className="text-indigo-600 hover:underline">Politique de confidentialité</Link>
            </p>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-slate-200 flex flex-col sm:flex-row gap-2 sticky bottom-0 bg-white">
            <button
              onClick={handleRefuseAll}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Tout refuser
            </button>
            <button
              onClick={handleSavePreferences}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Enregistrer mes choix
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              Tout accepter
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ═══ Vue bannière initiale ═══
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-0 sm:p-4 sm:left-auto sm:right-4 sm:bottom-4 sm:max-w-md">
      <div
        role="dialog"
        aria-live="polite"
        aria-label="Bannière de consentement aux cookies"
        className="bg-white border-t sm:border border-slate-200 sm:rounded-2xl shadow-2xl p-5 sm:p-6"
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-base mb-1">Nous respectons votre vie privée</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Nous utilisons des cookies pour améliorer votre expérience et afficher des publicités pertinentes via Google AdSense. Vous pouvez accepter, refuser ou personnaliser vos choix.{' '}
              <Link to="/politique-de-confidentialite" className="text-indigo-600 hover:underline font-medium">En savoir plus</Link>.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleRefuseAll}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Tout refuser
          </button>
          <button
            onClick={() => setView('preferences')}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Personnaliser
          </button>
          <button
            onClick={handleAcceptAll}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}
