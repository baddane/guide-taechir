import { Link } from 'react-router-dom';
import { Globe, ArrowLeft, Download, CheckCircle2, AlertTriangle, AtSign, User, FileText, ListChecks } from 'lucide-react';
import { useEffect, useState, FormEvent } from 'react';
import { Footer } from '../components/Footer';
import { supabase } from '../lib/supabase';

const PDF_URL = '/checklist-taechir-2026.pdf';

const included = [
  'La vérification préalable de votre entreprise (CNSS, modèle 7)',
  'L\'étape ANAPEC : cas standard, profil rare et dispense',
  'Le contrat TAECHIR et sa légalisation, pas à pas',
  'Le dépôt au Ministère et la liste exacte des pièces',
  'L\'après-visa : déclaration CNSS et carte de séjour',
  'Un budget indicatif 2026 pour anticiper les coûts',
];

export function Checklist() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });

  useEffect(() => {
    document.title = 'Checklist gratuite du dossier TAECHIR (PDF) — Guide-Taechir.org';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Téléchargez gratuitement la checklist complète du dossier TAECHIR 2026 : toutes les étapes et pièces pour recruter un salarié étranger au Maroc, en PDF imprimable.');
    }
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    // 1) Stockage du lead dans Supabase (consultable depuis /admin)
    const { error: dbError } = await supabase.from('leads').insert({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      source: 'checklist',
      page: 'checklist',
    });

    // 2) Notification e-mail (best-effort)
    let mailOk = false;
    try {
      const response = await fetch('https://formsubmit.co/ajax/r.baddane@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          _subject: '[Guide-Taechir] Nouveau lead — Checklist TAECHIR téléchargée',
          _template: 'table',
        }),
      });
      mailOk = response.ok;
    } catch {
      mailOk = false;
    }

    // On délivre la checklist dès que l'enregistrement OU l'e-mail a réussi
    if (!dbError || mailOk) {
      setFormState('success');
    } else {
      setFormState('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Guide-<span className="text-indigo-600">Taechir.org</span>
            </span>
          </Link>
          <Link to="/" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au guide
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 pt-16 pb-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-5 border border-indigo-100">
            <ListChecks className="w-4 h-4" />
            Ressource gratuite
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            La checklist complète du dossier TAECHIR
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Toutes les étapes et toutes les pièces pour recruter un salarié étranger au Maroc,
            réunies dans un PDF imprimable de 2 pages. Indiquez votre e-mail et téléchargez-la
            immédiatement.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* What's inside */}
          <div className="lg:col-span-2">
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 leading-tight">Checklist TAECHIR 2026</p>
                  <p className="text-xs text-slate-500">PDF · 2 pages · imprimable</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-700 mb-3">Ce que vous y trouverez :</p>
              <ul className="space-y-2.5">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form / download */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              {formState === 'success' ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3">Votre checklist est prête !</h2>
                  <p className="text-slate-600 mb-6 max-w-sm mx-auto">
                    Merci. Cliquez ci-dessous pour télécharger le PDF. Vous pouvez aussi l'imprimer
                    pour cocher chaque étape au fur et à mesure.
                  </p>
                  <a
                    href={PDF_URL}
                    download
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow"
                  >
                    <Download className="w-5 h-5" />
                    Télécharger la checklist (PDF)
                  </a>
                  <p className="text-xs text-slate-400 mt-5">
                    Le téléchargement ne démarre pas ?{' '}
                    <a href={PDF_URL} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
                      Ouvrir dans un nouvel onglet
                    </a>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <Download className="w-5 h-5 text-indigo-600" />
                    Recevoir la checklist
                  </h2>
                  <p className="text-sm text-slate-500 mb-2">
                    Gratuit, sans engagement. Téléchargement immédiat après validation.
                  </p>

                  {formState === 'error' && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
                      <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-800 font-medium text-sm">Une erreur est survenue</p>
                        <p className="text-red-700 text-sm mt-1">
                          Réessayez, ou écrivez-nous à{' '}
                          <a href="mailto:r.baddane@gmail.com" className="underline font-medium">r.baddane@gmail.com</a>.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                      <span className="flex items-center gap-1.5">
                        <User className="w-4 h-4 text-slate-400" />
                        Prénom <span className="text-slate-400 font-normal">(facultatif)</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Votre prénom"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                      <span className="flex items-center gap-1.5">
                        <AtSign className="w-4 h-4 text-slate-400" />
                        Adresse e-mail <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre@email.com"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  {/* Company (optional, B2B qualifier) */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-2">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-slate-400" />
                        Entreprise <span className="text-slate-400 font-normal">(facultatif)</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Nom de votre société"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === 'sending'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formState === 'sending' ? (
                      <>
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Préparation du téléchargement...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Télécharger gratuitement
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    En téléchargeant, vous acceptez notre{' '}
                    <Link to="/politique-de-confidentialite" className="text-indigo-600 underline">politique de confidentialité</Link>.
                    Pas de spam, désinscription possible à tout moment.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
