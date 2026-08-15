/**
 * Inscription à la newsletter.
 *
 * Le site disposait de la liste Brevo et de l'outil de campagne dans /admin,
 * mais d'aucun moyen de s'y inscrire : ce formulaire ferme la boucle.
 *
 * L'adresse part vers `/api/subscribe`, qui l'inscrit dans Brevo et l'archive
 * dans Supabase. Le consentement est explicite (case à cocher), et sa date est
 * enregistrée — c'est ce qui rend l'envoi de campagnes défendable.
 */

import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, Loader2, Mail } from 'lucide-react';

export interface NewsletterFormProps {
  source?: string;
  page?: string;
  /** `dark` pour le pied de page, `light` pour le corps des pages. */
  tone?: 'light' | 'dark';
  title?: string;
  description?: string;
}

type State = 'idle' | 'sending' | 'success' | 'error';

export function NewsletterForm({
  source = 'site',
  page,
  tone = 'light',
  title = 'Les mises à jour de la procédure, par e-mail',
  description = 'Changements réglementaires, nouveaux articles et rappels pratiques. Un envoi occasionnel, jamais de spam.',
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');

  const dark = tone === 'dark';

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setState('error');
      setError('Merci de cocher la case de consentement.');
      return;
    }
    setState('sending');
    setError('');

    let res: Response;
    try {
      res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, page: page ?? null }),
      });
    } catch {
      setState('error');
      setError('Impossible de joindre le serveur. Réessayez dans un instant.');
      return;
    }

    const raw = await res.text().catch(() => '');
    let data: { ok?: boolean; error?: string } | null = null;
    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      data = null;
    }

    if (!res.ok || !data?.ok) {
      setState('error');
      setError(label(data?.error, res.status));
      return;
    }
    setState('success');
  };

  if (state === 'success') {
    return (
      <div
        className={`rounded-2xl p-5 flex items-start gap-3 ${
          dark ? 'bg-slate-800 border border-slate-700' : 'bg-emerald-50 border border-emerald-200'
        }`}
      >
        <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${dark ? 'text-emerald-400' : 'text-emerald-600'}`} />
        <p className={`text-sm leading-relaxed ${dark ? 'text-slate-300' : 'text-emerald-800'}`}>
          <strong className={dark ? 'text-white' : 'text-emerald-900'}>Inscription enregistrée.</strong>{' '}
          Vous recevrez les prochaines mises à jour. Chaque envoi contient un lien de désinscription.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl p-6 ${
        dark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-indigo-100 shadow-sm'
      }`}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Mail className={`w-5 h-5 ${dark ? 'text-indigo-400' : 'text-indigo-600'}`} />
        <h3 className={`font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
      </div>
      <p className={`text-sm mb-4 leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
        {description}
      </p>

      {state === 'error' && (
        <div
          className={`flex items-start gap-2.5 rounded-lg p-3 mb-3 ${
            dark ? 'bg-red-950 border border-red-900' : 'bg-red-50 border border-red-200'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className={`text-sm ${dark ? 'text-red-300' : 'text-red-700'}`}>{error}</p>
        </div>
      )}

      <form onSubmit={submit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className={`flex-1 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              dark
                ? 'bg-slate-900 border border-slate-700 text-white placeholder-slate-500'
                : 'bg-white border border-slate-200'
            }`}
          />
          <button
            type="submit"
            disabled={state === 'sending'}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            {state === 'sending' ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            S'inscrire
          </button>
        </div>

        <label
          className={`flex items-start gap-2.5 text-xs leading-relaxed cursor-pointer ${
            dark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 shrink-0"
          />
          <span>
            J'accepte de recevoir les mises à jour de Guide-Taechir.org et j'ai pris connaissance de
            la{' '}
            <Link
              to="/politique-de-confidentialite"
              className={`underline ${dark ? 'hover:text-slate-200' : 'hover:text-slate-700'}`}
            >
              politique de confidentialité
            </Link>
            . Désinscription possible à tout moment.
          </span>
        </label>
      </form>
    </div>
  );
}

function label(code: string | undefined, status: number): string {
  switch (code) {
    case 'invalid_email':
      return 'Cette adresse e-mail ne semble pas valide.';
    case 'rate_limited':
      return 'Trop de tentatives. Patientez quelques minutes.';
    case 'newsletter_not_configured':
      return "L'inscription n'est pas encore active sur le serveur. Réessayez plus tard.";
    default:
      return `L'inscription a échoué (erreur ${status}). Réessayez dans un instant.`;
  }
}
