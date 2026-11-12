/**
 * Bloc de capture de lead, réutilisé partout où l'on propose la checklist.
 *
 * Un seul composant pour tous les emplacements (accueil, liste du blog, bas
 * d'article, fin du simulateur) : le jour où le formulaire change — un champ,
 * une mention légale, un texte — il change au même endroit pour tout le site.
 *
 * Chaque emplacement transmet son `source` et sa `page`, ce qui permet de lire
 * dans /admin quel canal et quelle page ont réellement produit le lead.
 */

import { FormEvent, useState } from 'react';
import { trackEvent } from '../lib/track';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, Download, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const PDF_URL = '/checklist-taechir-2026.pdf';
const NOTIFY_URL = 'https://formsubmit.co/ajax/r.baddane@gmail.com';

export interface LeadCaptureProps {
  /** Canal de capture, tel qu'il apparaîtra dans l'onglet Leads. */
  source: string;
  /** Origine exacte : `accueil`, `blog`, `blog/<slug>`… */
  page: string;
  title?: string;
  description?: string;
  /** Demander le nom de l'entreprise (utile hors article, lourd en cours de lecture). */
  askCompany?: boolean;
  /** Données de qualification à joindre au lead (réponses du simulateur). */
  details?: Record<string, unknown>;
  ctaLabel?: string;
  /** `card` : encart autonome. `inline` : intégré dans un bloc déjà cadré. */
  variant?: 'card' | 'inline';
}

type State = 'idle' | 'sending' | 'success' | 'error';

export function LeadCapture({
  source,
  page,
  title = 'Recevez la checklist TAECHIR 2026',
  description = 'Toutes les étapes et pièces du dossier, en PDF imprimable. Gratuit.',
  askCompany = true,
  details,
  ctaLabel = 'Recevoir la checklist',
  variant = 'card',
}: LeadCaptureProps) {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '' });
  // Consentement explicite à la mise en relation avec un cabinet partenaire.
  // Jamais pré-coché : c'est la seule base qui autorise à transmettre le
  // contact à un tiers (loi 09-08, politique de confidentialité § 5). Un lead
  // sans cette case ne quitte jamais le site.
  // Question obligatoire Oui / Non, sans réponse par défaut : le visiteur
  // choisit lui-même, ce qui vaut consentement exprès quand il répond « Oui ».
  const [relationChoice, setRelationChoice] = useState<'oui' | 'non' | null>(null);
  const relation = relationChoice === 'oui';
  const [state, setState] = useState<State>('idle');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setState('sending');

    // 1) Enregistrement du lead (consultable depuis /admin)
    const { error } = await supabase.from('leads').insert({
      name: form.name || null,
      email: form.email,
      company: form.company || null,
      source,
      page,
      details: {
        ...(details ?? {}),
        ...(relation
          ? {
              mise_en_relation: true,
              mise_en_relation_le: new Date().toISOString(),
              telephone: form.phone || null,
            }
          : { mise_en_relation: false }),
      },
    });

    // 1 bis) Ajout à la liste Brevo de la newsletter. Le formulaire annonce que
    // l'adresse sert aussi à « nos mises à jour » : sans cet appel, le lead
    // restait dans Supabase et ne recevait jamais la lettre. Au mieux, jamais
    // bloquant pour la remise de la checklist.
    if (!error) {
      trackEvent('lead', { source: String(source) });
      fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, source, page, kind: 'lead' }),
      }).catch(() => undefined);
    }

    // 2) Notification e-mail, au mieux : son échec ne bloque pas la remise
    let notified = false;
    try {
      const res = await fetch(NOTIFY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          origine: `${source} — ${page}`,
          mise_en_relation: relation ? `OUI — tél. ${form.phone || 'non fourni'}` : 'non',
          _subject: `[Guide-Taechir] Nouveau lead — ${source}`,
          _template: 'table',
        }),
      });
      notified = res.ok;
    } catch {
      notified = false;
    }

    setState(!error || notified ? 'success' : 'error');
  };

  if (state === 'success') {
    return (
      <Frame variant={variant}>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-900 mb-1">C'est prêt.</p>
            <p className="text-sm text-slate-600 mb-4">
              Votre checklist est disponible ci-dessous. Une question sur votre dossier ?{' '}
              <Link to="/contact" className="text-indigo-600 font-semibold hover:underline">
                Écrivez-nous
              </Link>
              .
            </p>
            <a
              href={PDF_URL}
              download
              className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
            >
              <Download className="w-4 h-4" /> Télécharger le PDF
            </a>
          </div>
        </div>
      </Frame>
    );
  }

  return (
    <Frame variant={variant}>
      <h3 className="text-lg font-bold text-slate-900 mb-1.5">{title}</h3>
      <p className="text-sm text-slate-600 mb-5">{description}</p>

      {state === 'error' && (
        <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">
            L'enregistrement a échoué. Réessayez, ou{' '}
            <Link to="/contact" className="font-semibold underline">
              contactez-nous
            </Link>
            .
          </p>
        </div>
      )}

      <form onSubmit={submit} className="space-y-3">
        <div className={askCompany ? 'grid sm:grid-cols-2 gap-3' : ''}>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Votre nom"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          {askCompany && (
            <input
              type="text"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Votre entreprise (facultatif)"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          )}
        </div>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Votre e-mail professionnel"
          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <fieldset className="text-left">
          <legend className="text-sm font-semibold text-slate-800 mb-2">
            Souhaitez-vous qu'un cabinet partenaire monte le dossier pour vous ?
          </legend>
          <div className="space-y-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="radio"
                name={`relation-${source}-${page}`}
                required
                checked={relationChoice === 'oui'}
                onChange={() => setRelationChoice('oui')}
                className="mt-0.5 h-4 w-4 shrink-0 border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-700">
                Oui : j'accepte que mes coordonnées et mes réponses soient transmises à un seul
                cabinet partenaire, qui me contactera par e-mail. Gratuit et sans engagement.
              </span>
            </label>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="radio"
                name={`relation-${source}-${page}`}
                required
                checked={relationChoice === 'non'}
                onChange={() => setRelationChoice('non')}
                className="mt-0.5 h-4 w-4 shrink-0 border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-700">Non, je m'en occupe moi-même.</span>
            </label>
          </div>
        </fieldset>
        {relation && (
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Téléphone (facultatif, pour être rappelé par le cabinet)"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        )}
        <button
          type="submit"
          disabled={state === 'sending'}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {state === 'sending' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Envoi…
            </>
          ) : (
            <>
              <Download className="w-4 h-4" /> {ctaLabel}
            </>
          )}
        </button>
        <p className="text-xs text-slate-400 text-center">
          Votre adresse sert à vous envoyer la checklist et nos mises à jour. Pas de spam,
          désinscription à tout moment —{' '}
          <Link to="/politique-de-confidentialite" className="underline hover:text-slate-600">
            politique de confidentialité
          </Link>
          .
        </p>
      </form>
    </Frame>
  );
}

function Frame({ variant, children }: { variant: 'card' | 'inline'; children: React.ReactNode }) {
  if (variant === 'inline') return <div>{children}</div>;
  return (
    <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 sm:p-7 shadow-sm">
      {children}
    </div>
  );
}
