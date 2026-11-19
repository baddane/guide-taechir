import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AlertTriangle, ChevronDown, ChevronUp, Mail } from 'lucide-react';
import {
  PANNE_TAECHIR_ACTIVE, PANNE_TAECHIR_DEPUIS, MINISTERE_NOM, SALLE_ADRESSE,
  RDV_EMAIL, RDV_TELEPHONE, RDV_CONTACT, RDV_DUREE_MAX_MIN, GUICHETS_DEPOT,
} from '../data/panneTaechir';

/* Bandeau d'alerte affiché sur tout le site (hors /admin) tant que la
   plateforme officielle TAECHIR est en maintenance. */
export function PanneTaechirBanner() {
  const { pathname } = useLocation();
  const [ouvert, setOuvert] = useState(true);
  if (!PANNE_TAECHIR_ACTIVE || pathname.startsWith('/admin')) return null;

  return (
    <div role="alert" className="bg-amber-50 border-b-2 border-amber-400 text-amber-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <button
          type="button"
          onClick={() => setOuvert(!ouvert)}
          className="w-full flex items-start gap-3 text-left"
          aria-expanded={ouvert}
        >
          <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-amber-600" />
          <span className="flex-1 text-sm sm:text-base">
            <strong>La plateforme officielle TAECHIR (taechir.travail.gov.ma) est en maintenance et inaccessible en ligne</strong>
            <span className="text-amber-800"> (depuis le {PANNE_TAECHIR_DEPUIS}).</span>
          </span>
          {ouvert ? <ChevronUp className="w-5 h-5 shrink-0 text-amber-700" /> : <ChevronDown className="w-5 h-5 shrink-0 text-amber-700" />}
        </button>

        {ouvert && (
          <div className="mt-3 ms-8 grid gap-3 md:grid-cols-2 text-sm">
            <div>
              <p className="font-semibold mb-1">Nouvelles demandes : la solution annoncée par le ministère</p>
              <ol className="list-decimal ms-5 space-y-1">
                <li>
                  Demandez un <strong>rendez-vous par e-mail</strong> au {RDV_CONTACT} :{' '}
                  <a href={`mailto:${RDV_EMAIL}`} className="font-semibold underline break-all">{RDV_EMAIL}</a>
                  {' '}(téléphone du ministère :{' '}
                  <a href={`tel:+212${RDV_TELEPHONE.replace(/\s/g, '').slice(1)}`} className="font-semibold underline whitespace-nowrap">{RDV_TELEPHONE}</a>)
                </li>
                <li>
                  Au rendez-vous, saisissez vos contrats sur un ordinateur de la salle ouverte au{' '}
                  <strong>{SALLE_ADRESSE}</strong>, via le serveur interne de TAECHIR ({RDV_DUREE_MAX_MIN} minutes maximum).
                </li>
                <li>Déposez ensuite le dossier {GUICHETS_DEPOT.join(', ou ')}.</li>
              </ol>
              <p className="mt-2 flex gap-2 text-amber-900">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
                <span>Source : communiqué du {MINISTERE_NOM}, 19 novembre 2026.</span>
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Demandes déposées avant la panne :</span> elles ne sont pas
                concernées et restent en cours de traitement. Inutile de les renvoyer.
              </p>
              <p className="text-amber-900">
                <span className="font-semibold">Guide-Taechir.org est un guide indépendant</span>, sans lien avec
                l'administration : ce n'est pas la plateforme officielle, et nous ne pouvons ni prendre de rendez-vous,
                ni déposer, ni suivre votre dossier. Ce message disparaîtra dès que la plateforme fonctionnera de nouveau.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
