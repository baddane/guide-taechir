import { Link } from 'react-router-dom';
import { Globe, ArrowLeft, Mail, MessageSquare, Clock, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import { Footer } from '../components/Footer';

export function Contact() {
  useEffect(() => {
    document.title = 'Contact \u2014 Guide-Taechir.org';
    window.scrollTo(0, 0);
  }, []);

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
            <Mail className="w-4 h-4" />
            Nous contacter
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Une question sur le contenu du site, une suggestion d'am\u00e9lioration ou une demande particuli\u00e8re ? N'h\u00e9sitez pas \u00e0 nous \u00e9crire.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid md:grid-cols-2 gap-8 mb-14">

          {/* Email contact */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-5">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Par e-mail</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Pour toute question g\u00e9n\u00e9rale, suggestion de contenu, signalement d'erreur ou demande de partenariat :
            </p>
            <a
              href="mailto:contact@guide-taechir.org"
              className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
            >
              contact@guide-taechir.org
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Chatbot */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-5">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Assistant en ligne</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Pour une r\u00e9ponse imm\u00e9diate \u00e0 vos questions sur la proc\u00e9dure TAECHIR, utilisez notre assistant en ligne disponible sur la page d'accueil.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
            >
              Acc\u00e9der \u00e0 l'assistant
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Response time */}
        <div className="bg-slate-100 rounded-2xl p-8 mb-14">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white text-slate-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">D\u00e9lai de r\u00e9ponse</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nous nous effor\u00e7ons de r\u00e9pondre \u00e0 toutes les demandes dans un d\u00e9lai de <strong>48 heures ouvr\u00e9es</strong>. Les demandes relatives \u00e0 la protection des donn\u00e9es personnelles sont trait\u00e9es en priorit\u00e9.
              </p>
            </div>
          </div>
        </div>

        {/* Important notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-amber-900 mb-3">Remarque importante</h3>
          <p className="text-amber-800 leading-relaxed text-sm mb-3">
            <strong>Guide-Taechir.org</strong> est un site informatif ind\u00e9pendant. Nous ne sommes pas un organisme gouvernemental et ne pouvons pas traiter directement vos dossiers TAECHIR, ANAPEC ou Minist\u00e8re du Travail.
          </p>
          <p className="text-amber-800 leading-relaxed text-sm">
            Pour vos d\u00e9marches officielles, veuillez vous adresser directement aux guichets comp\u00e9tents ou \u00e0 la plateforme officielle <a href="https://taechir.travail.gov.ma" className="text-amber-700 underline font-medium">taechir.travail.gov.ma</a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
