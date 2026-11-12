import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Globe, ArrowLeft, BookOpen, CheckCircle2, Download, FileText, Lock, RefreshCw, ShieldCheck, AlertTriangle, Users, Receipt,
} from 'lucide-react';
import { Footer } from '../components/Footer';
import { useSeo } from '../seo/useSeo';
import { staticPage, FAQ_GUIDE } from '../seo/meta';
import { GUIDE, GUIDE_CONTENU } from '../data/guidePayant';
import { CHAMPS_ORIGINE, origine, trackEvent, type Origine } from '../lib/track';

const MESSAGES: Record<string, { ton: 'warn' | 'info'; texte: string }> = {
  consentement: { ton: 'warn', texte: 'Cochez la case de demande d\'accès immédiat pour poursuivre vers le paiement.' },
  annule: { ton: 'info', texte: 'Paiement annulé : rien n\'a été débité. Vous pouvez reprendre quand vous voulez.' },
  indisponible: { ton: 'warn', texte: 'Le paiement en ligne est momentanément indisponible. Écrivez-nous à contact@guide-taechir.org : nous vous envoyons un lien de paiement.' },
  erreur: { ton: 'warn', texte: 'Le paiement n\'a pas pu démarrer. Réessayez dans un instant, ou écrivez-nous à contact@guide-taechir.org.' },
};

const APERCUS = [
  { src: '/guide/apercu-3.webp', alt: 'Chapitre 1 : les trois autorisations et les articles 516 à 521 du Code du travail' },
  { src: '/guide/apercu-4.webp', alt: 'Chapitre 2 : arbre de décision pour choisir la catégorie TAECHIR' },
  { src: '/guide/apercu-12.webp', alt: 'Chapitre 8 : cas pratique du technicien étranger en mission de 2 à 3 mois' },
  { src: '/guide/apercu-17.webp', alt: 'Annexe B : modèles de lettres à compléter' },
];

export function GuideComplet() {
  useSeo(staticPage(GUIDE.path));
  const [params] = useSearchParams();
  const [accord, setAccord] = useState(false);
  const [provenance, setProvenance] = useState<Origine>({});
  useEffect(() => setProvenance(origine()), []);
  const message = MESSAGES[params.get('paiement') ?? ''];

  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Guide-<span className="text-indigo-600">Taechir.org</span>
            </span>
          </Link>
          <a href="#acheter" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">
            Obtenir le guide · {GUIDE.prixAffiche}
          </a>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-gradient-to-br from-indigo-900 via-indigo-700 to-sky-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20 grid md:grid-cols-[1.25fr_1fr] gap-10 items-center">
          <div>
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-indigo-200 hover:text-white mb-6">
              <ArrowLeft className="w-4 h-4" /> Retour au guide gratuit
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-sm font-medium mb-5">
              <BookOpen className="w-4 h-4" /> PDF de {GUIDE.pages} pages · édition {GUIDE.edition}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Le guide pratique TAECHIR <span className="text-amber-300">complet</span>
            </h1>
            <p className="mt-5 text-lg text-indigo-100 max-w-xl">
              Toute la procédure pour recruter ou faire intervenir un salarié étranger au Maroc : la bonne catégorie,
              l'ANAPEC, la plateforme écran par écran, les pièces, l'apostille, les visas, des cas pratiques et des modèles de lettres.
            </p>
            <ul className="mt-6 space-y-2 text-indigo-50">
              {['Chaque règle sourcée : Code du travail, guide du Ministère, loi 02-03', 'Checklists à imprimer et 5 modèles de lettres', 'Mises à jour incluses : votre lien donne toujours la dernière édition'].map((t) => (
                <li key={t} className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />{t}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#acheter" className="px-6 py-3 rounded-xl bg-amber-400 text-indigo-950 font-bold hover:bg-amber-300 transition-colors">
                Acheter le guide · {GUIDE.prixAffiche}
              </a>
              <a href={GUIDE.extrait} target="_blank" rel="noopener" className="px-6 py-3 rounded-xl bg-white/10 border border-white/30 font-semibold hover:bg-white/20 transition-colors inline-flex items-center gap-2">
                <Download className="w-4 h-4" /> Lire l'extrait gratuit
              </a>
            </div>
          </div>
          <img
            src="/guide/apercu-1.webp"
            alt="Couverture du guide pratique TAECHIR 2026"
            width={496}
            height={702}
            className="w-full max-w-sm mx-auto rounded-xl shadow-2xl shadow-indigo-950/50 rotate-2"
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-14 space-y-16">
        {/* Pourquoi */}
        <section className="grid md:grid-cols-3 gap-5">
          {[
            { icon: AlertTriangle, titre: 'Une erreur coûte des semaines', texte: 'Mauvaise catégorie, apostille lancée trop tard, signatures non légalisées : le dossier revient, et le salarié ne peut pas travailler avant le visa.' },
            { icon: FileText, titre: 'Les textes sont éparpillés', texte: 'Code du travail, arrêté de 2019, décision Taechir, brochures ANAPEC, loi sur le séjour : le guide les rassemble dans l\'ordre où vous en avez besoin.' },
            { icon: Users, titre: 'Pour l\'employeur, pas pour le juriste', texte: 'Des schémas, des tableaux, des listes à cocher et des cas réels, avec ce qu\'il faut faire confirmer au guichet quand les textes se taisent.' },
          ].map(({ icon: Icon, titre, texte }) => (
            <div key={titre} className="bg-white rounded-2xl border border-slate-200 p-6">
              <Icon className="w-7 h-7 text-indigo-600 mb-3" />
              <h2 className="font-bold text-lg mb-2">{titre}</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{texte}</p>
            </div>
          ))}
        </section>

        {/* Contenu */}
        <section>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Ce que contient le guide</h2>
          <ol className="grid md:grid-cols-2 gap-4">
            {GUIDE_CONTENU.map((c, i) => (
              <li key={c.titre} className="flex gap-4 bg-white rounded-xl border border-slate-200 p-4">
                <span className="w-9 h-9 shrink-0 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center">{i + 1}</span>
                <div>
                  <h3 className="font-semibold">{c.titre}</h3>
                  <p className="text-sm text-slate-600 mt-1">{c.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Aperçus */}
        <section>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">Un aperçu des pages</h2>
          <p className="text-slate-600 mb-6">Couverture, sommaire et chapitre 1 sont lisibles en entier dans <a href={GUIDE.extrait} target="_blank" rel="noopener" className="text-indigo-600 font-semibold hover:underline">l'extrait gratuit</a>.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {APERCUS.map((a) => (
              <figure key={a.src} className="bg-white rounded-xl border border-slate-200 p-2 shadow-sm">
                <img src={a.src} alt={a.alt} loading="lazy" width={496} height={702} className="w-full rounded-lg" />
                <figcaption className="text-xs text-slate-500 mt-2 px-1">{a.alt}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Achat */}
        <section id="acheter" className="scroll-mt-24">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border-2 border-indigo-600 shadow-xl shadow-indigo-100 p-6 md:p-10">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <h2 className="text-2xl font-extrabold">{GUIDE.nom}</h2>
              <div className="text-4xl font-extrabold text-indigo-700">{GUIDE.prixAffiche}</div>
            </div>
            <p className="text-slate-600 mt-2">PDF de {GUIDE.pages} pages, téléchargement immédiat. Paiement unique, mises à jour incluses.</p>

            {message && (
              <div className={`mt-5 rounded-xl px-4 py-3 text-sm ${message.ton === 'warn' ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-sky-50 text-sky-900 border border-sky-200'}`}>
                {message.texte}
              </div>
            )}

            <form
              method="POST"
              action="/api/guide/checkout"
              className="mt-6 space-y-5"
              onSubmit={() => trackEvent('guide_checkout', { produit: GUIDE.id })}
            >
              {/* Origine de la visite : transmise à Stripe pour savoir quel e-mail ou quelle page a vendu. */}
              {CHAMPS_ORIGINE.map((f) => (provenance[f] ? <input key={f} type="hidden" name={f} value={provenance[f]} /> : null))}
              <label className="flex gap-3 items-start text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="acces_immediat"
                  value="oui"
                  required
                  checked={accord}
                  onChange={(e) => setAccord(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-indigo-600"
                />
                <span>
                  Je demande l'accès immédiat au guide après paiement et je reconnais perdre mon droit de rétractation
                  pour ce contenu numérique. J'accepte les <Link to="/conditions-de-vente" className="text-indigo-600 underline">conditions de vente</Link>.
                </span>
              </label>
              <button
                type="submit"
                disabled={!accord}
                className="w-full py-4 rounded-xl bg-indigo-600 text-white text-lg font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" /> Payer {GUIDE.prixAffiche} et télécharger
              </button>
            </form>

            <ul className="mt-6 grid sm:grid-cols-3 gap-3 text-xs text-slate-600">
              <li className="flex gap-2"><ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />Paiement par carte marocaine ou étrangère, sécurisé par Stripe</li>
              <li className="flex gap-2"><Receipt className="w-4 h-4 text-emerald-600 shrink-0" />Facture au nom de votre entreprise</li>
              <li className="flex gap-2"><RefreshCw className="w-4 h-4 text-emerald-600 shrink-0" />Lien valable pour les éditions suivantes</li>
            </ul>
          </div>
        </section>

        {/* Accompagnement */}
        <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-emerald-950">Vous préférez confier le dossier ?</h2>
          <p className="text-emerald-900 mt-2">
            Écrivez-nous à <a href="mailto:contact@guide-taechir.org?subject=Mise%20en%20relation" className="font-semibold underline">contact@guide-taechir.org</a> avec
            votre ville et votre situation, et la mention « mise en relation ». Avec votre accord explicite, nous transmettons votre demande à <strong>un seul</strong> cabinet
            partenaire qui monte ces dossiers, et il vous écrit directement. La mise en relation est gratuite et sans engagement pour vous.
          </p>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Questions fréquentes</h2>
          <div className="space-y-3">
            {FAQ_GUIDE.map(([q, a]) => (
              <details key={q} className="bg-white rounded-xl border border-slate-200 p-5 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between gap-4">
                  {q}<span className="text-indigo-600 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-slate-600 mt-3 text-sm leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
