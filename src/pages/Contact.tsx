import { Link } from 'react-router-dom';
import { Globe, ArrowLeft, Mail, MessageSquare, Clock, ExternalLink, Send, CheckCircle2, AlertTriangle, User, AtSign, FileText } from 'lucide-react';
import { useEffect, useState, FormEvent } from 'react';
import { Footer } from '../components/Footer';

export function Contact() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    document.title = 'Contact — Guide-Taechir.org';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Contactez l\'équipe Guide-Taechir.org pour toute question sur la procédure TAECHIR, suggestion ou demande.');
    }
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    try {
      const response = await fetch('https://formsubmit.co/ajax/r.baddane@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `[Guide-Taechir] ${formData.subject}`,
          _template: 'table',
        }),
      });

      if (response.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormState('error');
      }
    } catch {
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
            <Mail className="w-4 h-4" />
            Nous contacter
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Une question sur le contenu du site, une suggestion d'amélioration ou une demande particulière ? Remplissez le formulaire ci-dessous et nous vous répondrons dans les meilleurs délais.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-5 gap-10">

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Send className="w-5 h-5 text-indigo-600" />
                Envoyez-nous un message
              </h2>

              {formState === 'success' ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Message envoyé avec succès !</h3>
                  <p className="text-slate-600 mb-6">
                    Merci pour votre message. Nous vous répondrons dans un délai de 48 heures ouvrées.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {formState === 'error' && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
                      <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-800 font-medium text-sm">Erreur lors de l'envoi</p>
                        <p className="text-red-700 text-sm mt-1">
                          Une erreur est survenue. Veuillez réessayer ou nous contacter directement par e-mail à{' '}
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
                        Nom complet <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Votre nom et prénom"
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

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-slate-400" />
                        Sujet <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <select
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="Question sur la procédure TAECHIR">Question sur la procédure TAECHIR</option>
                      <option value="Question sur l'attestation ANAPEC">Question sur l'attestation ANAPEC</option>
                      <option value="Question sur les documents requis">Question sur les documents requis</option>
                      <option value="Signalement d'erreur sur le site">Signalement d'erreur sur le site</option>
                      <option value="Suggestion d'amélioration">Suggestion d'amélioration</option>
                      <option value="Demande de partenariat">Demande de partenariat</option>
                      <option value="Autre demande">Autre demande</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                      <span className="flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-slate-400" />
                        Message <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Décrivez votre demande en détail..."
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-y"
                    />
                  </div>

                  {/* Submit */}
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
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Envoyer le message
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    En soumettant ce formulaire, vous acceptez notre{' '}
                    <Link to="/politique-de-confidentialite" className="text-indigo-600 underline">politique de confidentialité</Link>.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">

            {/* Direct email */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Par e-mail</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                Vous pouvez également nous écrire directement :
              </p>
              <a
                href="mailto:contact@guide-taechir.org"
                className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors text-sm"
              >
                contact@guide-taechir.org
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Chatbot */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Réponse immédiate</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                Pour une réponse instantanée, utilisez notre assistant en ligne sur la page d'accueil.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors text-sm"
              >
                Accéder à l'assistant
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Response time */}
            <div className="bg-slate-100 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white text-slate-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1.5 text-sm">Délai de réponse</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Nous répondons à toutes les demandes sous <strong>48 heures ouvrées</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Important notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h3 className="text-sm font-bold text-amber-900 mb-2">Remarque importante</h3>
              <p className="text-amber-800 leading-relaxed text-xs mb-2">
                <strong>Guide-Taechir.org</strong> est un site informatif indépendant. Nous ne pouvons pas traiter directement vos dossiers.
              </p>
              <p className="text-amber-800 leading-relaxed text-xs">
                Pour vos démarches officielles : <a href="https://taechir.travail.gov.ma" className="text-amber-700 underline font-medium">taechir.travail.gov.ma</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
