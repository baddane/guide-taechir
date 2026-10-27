import { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, Clock, CreditCard, MapPin, AlertCircle, Briefcase, Globe, Shield, ChevronDown, ChevronUp, Calculator, Wand2, Menu, X, BookOpen, ArrowRight, Phone, Bell, UserPlus } from 'lucide-react';
import { Wizard } from './Wizard';
import { Chatbot } from './Chatbot';
import { Footer } from './components/Footer';
import { LeadCapture } from './components/LeadCapture';
import { articles } from './blog/articles';
import {
  CATEGORIES_DISPENSEES, CATEGORIE_NORMALE, ETAPES_SAISIE, FONCTIONNALITES, CHAMPS_INSCRIPTION,
  GUICHETS, HORAIRES, ASSISTANCE, TAECHIR_URL, telHref,
} from './data/taechir';

function AccordionItem({ title, children, defaultOpen = true }: { title: string, children: ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-200 rounded-xl mb-4 overflow-hidden bg-white shadow-sm">
      <button
        className="w-full flex justify-between items-center p-5 text-left font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg">{title}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
      </button>
      {isOpen && (
        <div className="p-5 pt-0 text-slate-600 border-t border-slate-100">
          {children}
        </div>
      )}
    </div>
  );
}

export default function App() {
  // Wizard State
  const [showWizard, setShowWizard] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calculator State
  const [calcCount, setCalcCount] = useState(1);
  const [calcProfile, setCalcProfile] = useState('standard');
  const [calcRenewal, setCalcRenewal] = useState(false);

  // Calculator Logic
  let estimatedCost = 0;
  let estimatedTimeAnapec = 0;
  const timeVisa = 10; // Délai maximum de délivrance des visas (10 jours)

  if (calcProfile === 'exempt') {
    estimatedCost = 0;
    estimatedTimeAnapec = 0;
  } else if (calcRenewal) {
    estimatedCost = 1500 * calcCount;
    estimatedTimeAnapec = 2; // 48 heures
  } else if (calcProfile === 'rare') {
    estimatedCost = 1500 * calcCount;
    estimatedTimeAnapec = 2; // 48 heures
  } else {
    // Standard
    estimatedCost = 5000 + (calcCount > 1 ? (calcCount - 1) * 1500 : 0);
    estimatedTimeAnapec = 20; // 20 jours ouvrables
  }

  const totalTime = estimatedTimeAnapec + timeVisa;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {showWizard && <Wizard onClose={() => setShowWizard(false)} />}
      <Chatbot />
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-xl tracking-tight text-slate-900">Guide-<span className="text-indigo-600">Taechir.org</span></span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <button onClick={() => setShowWizard(true)} className="flex items-center gap-1.5 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
              <Wand2 className="w-4 h-4" /> Assistant
            </button>
            <a href="#procedure" className="hover:text-indigo-600 transition-colors">La Procédure</a>
            <a href="#calculateur" className="hover:text-indigo-600 transition-colors">Calculateur</a>
            <a href="#anapec" className="hover:text-indigo-600 transition-colors">Attestation ANAPEC</a>
            <a href="#documents" className="hover:text-indigo-600 transition-colors">Documents Requis</a>
            <a href="#guichets" className="hover:text-indigo-600 transition-colors">Guichets</a>
            <a href="#faq" className="hover:text-indigo-600 transition-colors">FAQ</a>
            <Link to="/blog" className="hover:text-indigo-600 transition-colors font-semibold">Blog</Link>
            <Link to="/contact" className="hover:text-indigo-600 transition-colors font-semibold">Contact</Link>
          </div>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Menu de navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 pb-4 space-y-1">
            <button
              onClick={() => { setShowWizard(true); setMobileMenuOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors text-sm"
            >
              <Wand2 className="w-4 h-4" /> Assistant guidé
            </button>
            <a href="#procedure" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors text-sm">La Procédure</a>
            <a href="#calculateur" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors text-sm">Calculateur</a>
            <a href="#anapec" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors text-sm">Attestation ANAPEC</a>
            <a href="#documents" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors text-sm">Documents Requis</a>
            <a href="#guichets" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors text-sm">Guichets & assistance</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors text-sm">FAQ</a>
            <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-slate-700 font-semibold hover:bg-slate-50 transition-colors text-sm">Blog</Link>
            <div className="border-t border-slate-100 mt-2 pt-2">
              <Link to="/a-propos" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors text-sm">À propos</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors text-sm">Contact</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section (SEO Optimized) */}
      <header className="bg-white border-b border-slate-200 pt-20 pb-24 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-6 border border-indigo-100">
            <Shield className="w-4 h-4" />
            Mise à jour selon les directives du Ministère du Travail
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Comment <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">embaucher un étranger au Maroc</span> ?
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Le guide complet pour le <strong>recrutement de travailleurs étrangers au Maroc</strong>. Découvrez les démarches pour obtenir le <strong>visa emploi Maroc entreprise</strong> et profitez de la <strong>facilitation du recrutement international au Maroc</strong> via le programme TAECHIR.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowWizard(true)}
              className="px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <Wand2 className="w-5 h-5" />
              Démarrer l'assistant guidé
            </button>
            <a href="#calculateur" className="px-8 py-3.5 rounded-xl bg-white text-slate-700 font-semibold border border-slate-200 shadow-sm hover:bg-slate-50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
              <Calculator className="w-5 h-5" />
              Estimer les coûts
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Process Overview */}
        <section id="procedure" className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Programme Taechir : Conditions et Étapes</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">La procédure d'octroi du visa de contrat de travail d'étranger répond au besoin de protéger la main-d'œuvre nationale tout en attirant les compétences nécessaires au développement économique.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 text-xl font-bold">1</div>
              <h3 className="text-xl font-bold mb-3">L'Attestation ANAPEC</h3>
              <p className="text-slate-600 mb-4">Prouver qu'aucun profil national équivalent n'est disponible sur le marché du travail marocain.</p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400"/> Délai : 48h à 20 jours</li>
                <li className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-slate-400"/> Frais : 1500 à 5000 DHs</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 text-xl font-bold">2</div>
              <h3 className="text-xl font-bold mb-3">Plateforme TAECHIR</h3>
              <p className="text-slate-600 mb-4">Création du compte employeur, choix de la catégorie, saisie de la demande en 6 étapes et impression des contrats à signer.</p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2"><Globe className="w-4 h-4 text-slate-400"/> 100% en ligne</li>
                <li className="flex items-center gap-2"><Bell className="w-4 h-4 text-slate-400"/> Notifications par e-mail en temps réel</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6 text-xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-3">Dépôt & Visa</h3>
              <p className="text-slate-600 mb-4">Dépôt du dossier complet par le mandataire désigné au guichet d'accueil, puis retrait des contrats visés.</p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400"/> Rabat, Casablanca, Marrakech, Tanger, Agadir</li>
                <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400"/> Réponse en 10 jours maximum</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Comprendre le programme TAECHIR */}
        <section id="comprendre" className="scroll-mt-24">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10 lg:p-14">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Comprendre le programme TAECHIR et le cadre juridique du recrutement international au Maroc</h2>

              <div className="prose prose-slate max-w-none space-y-5 text-slate-700 leading-relaxed">
                <p>
                  <strong>TAECHIR</strong> (تأشير, « visa » en arabe) est le service en ligne dédié aux contrats de travail des étrangers (CTE), accessible sur <a href={TAECHIR_URL} target="_blank" rel="noreferrer" className="text-indigo-600 underline">taechir.travail.gov.ma</a>. Développé par la Direction de l'Emploi du Ministère chargé du Travail (aujourd'hui le <strong>Ministère de l'Inclusion Économique, de la Petite Entreprise, de l'Emploi et des Compétences</strong>) pour les employeurs faisant appel à des compétences étrangères, il sert à gérer l'ensemble du processus de visa de contrat de travail des salariés étrangers au Maroc. Ce système a été conçu pour dématérialiser et accélérer une procédure historiquement lente et opaque, tout en maintenant les contrôles nécessaires à la protection du marché de l'emploi national.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 pt-2">Fondement juridique : l'article 516 du Code du Travail</h3>
                <p>
                  Le recrutement de travailleurs étrangers au Maroc est régi principalement par les <strong>articles 516 à 521 du Code du Travail marocain</strong> (loi n° 65-99). L'article 516 pose le principe fondamental : tout employeur souhaitant recruter un salarié de nationalité étrangère doit obtenir une autorisation préalable sous forme de visa apposé sur le contrat de travail, délivrée par l'autorité gouvernementale chargée du travail. Ce visa constitue la condition sine qua non pour que le salarié étranger puisse exercer légalement une activité salariée sur le territoire marocain. L'article 521 prévoit des sanctions pénales en cas de non-respect de cette obligation, pouvant aller jusqu'à une amende de 2000 à 5000 dirhams par salarié employé irrégulièrement.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 pt-2">Le rôle de l'ANAPEC dans la protection de l'emploi national</h3>
                <p>
                  L'<strong>Agence Nationale de Promotion de l'Emploi et des Compétences (ANAPEC)</strong> joue un rôle central dans la procédure en vérifiant qu'aucun profil marocain correspondant au poste proposé n'est disponible sur le marché du travail. Cette vérification se matérialise par la publication d'une offre d'emploi sur la plateforme de l'ANAPEC pendant une durée de 10 jours ouvrables pour les profils standards. Si aucune candidature nationale adéquate n'est identifiée, l'ANAPEC délivre une <strong>attestation d'activité</strong> qui autorise l'employeur à poursuivre la procédure de recrutement international. Ce mécanisme de protection, dit de «&nbsp;préférence nationale&nbsp;», est conforme aux recommandations de l'Organisation Internationale du Travail (OIT) et se retrouve dans la législation de nombreux pays.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 pt-2">Modernisation et évolution de la plateforme</h3>
                <p>
                  Depuis son lancement, la plateforme TAECHIR a connu plusieurs évolutions majeures. La digitalisation a permis de réduire considérablement les délais de traitement : l'Administration répond désormais aux demandes de visa dans un <strong>délai maximum de dix (10) jours</strong>. La plateforme a intégré un système de génération automatique du contrat de travail type, conforme aux exigences réglementaires, et permet un suivi en temps réel de l'état d'avancement de chaque dossier. Le Maroc a enregistré une augmentation significative des demandes de visa de travail ces dernières années, notamment dans les secteurs de la technologie, de l'industrie automobile, de l'offshoring et du BTP, reflétant le dynamisme économique du pays et son attractivité croissante pour les talents internationaux.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 pt-2">Chiffres clés et contexte économique</h3>
                <p>
                  Le Maroc accueille des travailleurs étrangers originaires de plus de <strong>100 nationalités différentes</strong>, avec une prédominance des ressortissants français, sénégalais, tunisiens, ivoiriens et camerounais. Les secteurs les plus demandeurs incluent les services aux entreprises, l'industrie, l'enseignement et le BTP. La procédure standard (ANAPEC + visa Ministère) représente un investissement de <strong>5000 à 6500 Dhs HT</strong> et un délai de <strong>30 jours ouvrables</strong> en moyenne, un coût raisonnable au regard des qualifications recherchées et de la sécurité juridique apportée par le visa officiel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* La plateforme pas à pas */}
        <section id="plateforme" className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">La plateforme TAECHIR pas à pas</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">De la création du compte employeur à l'impression des contrats à signer, voici comment se déroule une demande de visa de contrat de travail d'étranger (CTE) en ligne.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <UserPlus className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Créer le compte employeur</h3>
              <p className="text-slate-600 text-sm mb-4">Cliquez sur le lien <strong>Inscription</strong> de l'écran de connexion, puis remplissez le formulaire :</p>
              <ul className="space-y-1.5 text-sm text-slate-600 list-disc pl-5 marker:text-indigo-400 mb-4">
                {CHAMPS_INSCRIPTION.map(c => <li key={c}>{c}</li>)}
              </ul>
              <p className="text-slate-600 text-sm">Un e-mail vous est adressé instantanément avec votre <strong>login</strong> et un <strong>lien d'activation</strong>. Connectez-vous ensuite avec ce login et le mot de passe choisi à l'inscription.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
              <h3 className="text-xl font-bold mb-2">Introduire une demande en 6 étapes</h3>
              <p className="text-slate-600 text-sm mb-5">La demande commence par le choix d'une <strong>catégorie</strong> (voir plus bas) : les données à saisir et les pièces demandées en dépendent.</p>
              <ol className="grid sm:grid-cols-2 gap-3">
                {ETAPES_SAISIE.map((etape, i) => (
                  <li key={etape.titre} className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{etape.titre}</p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{etape.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold mb-5">Les fonctionnalités de TAECHIR</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {FONCTIONNALITES.map(f => (
                <div key={f.menu}>
                  <p className="font-semibold text-indigo-700 text-sm mb-2">{f.menu}</p>
                  <ul className="space-y-1.5 text-sm text-slate-600">
                    {f.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-600 bg-indigo-50 border border-indigo-100 rounded-xl p-4">
              <Bell className="w-4 h-4 inline mr-1.5 text-indigo-500" />
              L'adresse e-mail saisie à l'étape 3 (plusieurs adresses possibles, séparées par « ; ») reçoit en temps réel les notifications liées au traitement : contrat visé, complément de dossier à fournir, contrat prêt au guichet, etc.
            </p>
          </div>
        </section>

        {/* Interactive Calculator */}
        <section id="calculateur" className="scroll-mt-24">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 lg:p-12 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Calculateur d'Estimations</h2>
                </div>
                <p className="text-slate-600 mb-8">Estimez les coûts administratifs et les délais pour le recrutement de vos travailleurs étrangers au Maroc.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Type de demande</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setCalcRenewal(false)}
                        className={`py-2 px-4 rounded-lg border text-sm font-medium transition-colors ${!calcRenewal ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                      >
                        Nouveau contrat
                      </button>
                      <button 
                        onClick={() => setCalcRenewal(true)}
                        className={`py-2 px-4 rounded-lg border text-sm font-medium transition-colors ${calcRenewal ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                      >
                        Renouvellement
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Profil du candidat</label>
                    <select 
                      value={calcProfile} 
                      onChange={(e) => setCalcProfile(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    >
                      <option value="standard">Profil Standard (nécessite une annonce ANAPEC)</option>
                      <option value="rare">Profil Rare / Haut Niveau (Listes A1/A2)</option>
                      <option value="exempt">Catégorie dispensée (conjoint de marocain, CFC, détachement, convention…)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nombre de salariés (même poste)</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" 
                        min="1" 
                        max="5" 
                        value={calcCount} 
                        onChange={(e) => setCalcCount(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                      <span className="font-bold text-xl text-indigo-600 w-8 text-center">{calcCount}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Maximum 5 par emploi-métiers par an.</p>
                  </div>
                </div>
              </div>

              <div className="p-10 lg:p-12 bg-white flex flex-col justify-center">
                <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Résultats de l'estimation</h3>
                
                <div className="space-y-8">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Frais administratifs estimés (ANAPEC)</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-slate-900">{estimatedCost}</span>
                      <span className="text-lg font-bold text-slate-500">Dhs HT</span>
                    </div>
                    {estimatedCost > 0 && (
                      <p className="text-xs text-slate-500 mt-2">
                        {calcCount === 1 ? 'Pour 1 dossier.' : `Inclut 5000 Dhs pour le 1er dossier et 1500 Dhs pour les suivants.`}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Délai global estimé (ANAPEC + Visa)</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-indigo-600">{totalTime}</span>
                      <span className="text-lg font-bold text-indigo-400">Jours max</span>
                    </div>
                    <ul className="text-sm text-slate-600 mt-3 space-y-1">
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500"/> Traitement ANAPEC : {estimatedTimeAnapec} jours</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500"/> Visa Ministère : {timeVisa} jours max</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <strong>Avertissement :</strong> Ce calculateur fournit une estimation basée sur la procédure standard. Les délais sont donnés à titre indicatif (jours ouvrables) et peuvent varier selon la complétude du dossier. L'Administration se réserve le droit de demander des pièces supplémentaires.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ANAPEC Section */}
        <section id="anapec" className="scroll-mt-24">
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 lg:p-16 text-white">
                <h2 className="text-3xl font-bold mb-6">L'Attestation d'Activité ANAPEC</h2>
                <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                  Avant de formuler une demande sur Taechir, l'employeur doit généralement obtenir une attestation de l'ANAPEC certifiant l'absence de candidats nationaux pour le poste.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <h4 className="font-semibold text-indigo-300 mb-2 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" /> Frais de traitement (HT)
                    </h4>
                    <ul className="space-y-3 text-sm text-slate-300">
                      <li className="flex justify-between border-b border-slate-700 pb-2">
                        <span>Dossier avec obligation d'annonce</span>
                        <span className="font-bold text-white">5000 Dhs</span>
                      </li>
                      <li className="flex justify-between border-b border-slate-700 pb-2">
                        <span>Dossier supplémentaire (même métier/an)</span>
                        <span className="font-bold text-white">1500 Dhs</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Dossier sans obligation d'annonce (Profils rares)</span>
                        <span className="font-bold text-white">1500 Dhs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800 p-10 lg:p-16 border-l border-slate-700">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                  Catégories de demande sur TAECHIR
                </h3>
                <p className="text-slate-400 text-sm mb-6">
                  Chaque demande commence par le choix d'une catégorie. Seule la catégorie <strong className="text-slate-200">{CATEGORIE_NORMALE}</strong> exige l'attestation ANAPEC.
                  Pour les catégories ci-dessous, des pièces justificatives propres à la catégorie sont demandées à la place :
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-slate-300 text-sm">
                  {CATEGORIES_DISPENSEES.map(c => (
                    <li key={c.id} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                      <span>{c.hint ? <><strong>{c.label}</strong> ({c.hint})</> : c.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Documents Section */}
        <section id="documents" className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Dossier de Demande (Visa Taechir)</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Préparez soigneusement votre dossier avant de vous rendre aux guichets du Ministère pour finaliser votre <strong>visa emploi Maroc entreprise</strong>.</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <AccordionItem title="Premier Établissement (Nouveau Recrutement)" defaultOpen={true}>
              <ul className="space-y-3 list-disc pl-5 marker:text-indigo-400">
                <li><strong>3 exemplaires originaux</strong> du contrat de travail généré via TAECHIR, signés, cachetés et légalisés.</li>
                <li>Copie certifiée conforme des <strong>diplômes et/ou certificats de travail</strong> avec traduction si nécessaire.</li>
                <li>Copie des premières pages du <strong>passeport</strong> (en cours de validité) + page avec date d'entrée au Maroc.</li>
                <li><strong>Attestation d'activité ANAPEC</strong> (sauf si catégorie dispensée).</li>
                <li><strong>Documents de l'employeur :</strong>
                  <ul className="list-circle pl-5 mt-2 space-y-1 text-sm text-slate-500">
                    <li>Personne morale : Statuts, Registre de Commerce (modèle 7), PV de création/nomination.</li>
                    <li>Personne physique : Registre de Commerce ou Taxe Professionnelle.</li>
                  </ul>
                </li>
              </ul>
            </AccordionItem>

            <AccordionItem title="Renouvellement chez le même employeur">
              <ul className="space-y-3 list-disc pl-5 marker:text-indigo-400">
                <li><strong>3 exemplaires originaux</strong> du contrat de travail généré via TAECHIR, légalisés.</li>
                <li><strong>Attestation d'activité ANAPEC</strong> (si applicable).</li>
                <li>Attestation récente de <strong>déclarations de salaires (CNSS)</strong> justifiant les 3 derniers mois.</li>
                <li>Copie du <strong>titre de séjour</strong> (Carte d'immatriculation) délivré par la DGSN.</li>
                <li>Registre de commerce récent (en cas de modification).</li>
              </ul>
            </AccordionItem>

            <AccordionItem title="Changement d'employeur">
              <ul className="space-y-3 list-disc pl-5 marker:text-indigo-400">
                <li><strong>3 exemplaires originaux</strong> du contrat de travail généré via TAECHIR, légalisés.</li>
                <li><strong>Attestation d'activité ANAPEC</strong>.</li>
                <li>Copie conforme des <strong>documents relatifs à la forme juridique</strong> du nouvel employeur.</li>
                <li>Copie du <strong>titre de séjour</strong> délivré par la DGSN.</li>
                <li><strong>Lettre de résiliation</strong> délivrée par l'ex-employeur, ou lettre de démission légalisée, ou décision judiciaire.</li>
              </ul>
            </AccordionItem>
          </div>
        </section>

        {/* Guichets d'accueil */}
        <section id="guichets" className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Guichets d'accueil et assistance</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Le dossier est déposé, et les contrats visés retirés, au service central de Rabat ou dans l'un des guichets régionaux.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-left">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Guichet</th>
                    <th className="px-5 py-3 font-semibold">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {GUICHETS.map(g => (
                    <tr key={g.id}>
                      <td className="px-5 py-3">
                        <p className="font-semibold text-slate-800">{g.ville} — {g.nom}</p>
                        {g.note && <p className="text-xs text-slate-500">{g.note}</p>}
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap text-slate-700">
                        {g.telephone
                          ? g.fax
                            ? <>Fax : {g.telephone}</>
                            : <a href={telHref(g.telephone)} className="text-indigo-600 hover:underline">{g.telephone}</a>
                          : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><Clock className="w-5 h-5 text-indigo-500" /> Horaires d'ouverture</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  {HORAIRES.map(h => (
                    <li key={h.jours} className="flex justify-between"><span>{h.jours}</span><strong>{h.heures}</strong></li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><Phone className="w-5 h-5 text-indigo-500" /> Assistance aux usagers</h3>
                <ul className="text-sm space-y-1">
                  {ASSISTANCE.map(num => (
                    <li key={num}><a href={telHref(num)} className="font-semibold text-indigo-600 hover:underline">{num}</a></li>
                  ))}
                </ul>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  Seul le <strong>mandataire désigné par l'employeur</strong> (étape 5 de la demande en ligne), muni d'une pièce d'identité valide, est reçu au guichet pour le dépôt des dossiers ou le retrait des contrats visés.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Foire Aux Questions (FAQ)</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Tout ce que vous devez savoir sur le recrutement d'étrangers au Maroc via le programme Taechir.</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <AccordionItem title="Qu'est-ce que la plateforme TAECHIR ?">
              <p>TAECHIR est le service en ligne officiel du Ministère chargé du Travail dédié aux contrats de travail des étrangers (CTE). Il permet aux employeurs de s'informer sur les procédures, de créer et modifier les projets de contrats, d'imprimer les contrats à signer et la liste des pièces du dossier, de suivre le traitement des demandes déposées et de recevoir en temps réel les notifications (visa prêt, demande à compléter…). L'Administration répond aux demandes dans un délai maximum de dix (10) jours.</p>
            </AccordionItem>
            <AccordionItem title="Quelles sont les nationalités dispensées de l'attestation ANAPEC ?">
              <p>Les ressortissants des pays ayant conclu une convention d'établissement avec le Maroc, à savoir <strong>l'Algérie, la Tunisie et le Sénégal</strong>, relèvent de la catégorie « Convention d'établissement » et sont dispensés de l'attestation d'activité ANAPEC. D'autres catégories sont également dispensées (conjoint de marocain, descendant de mère marocaine, associé, gérant, détachement, Casa Finance City…) : des pièces justificatives propres à la catégorie sont alors demandées.</p>
            </AccordionItem>
            <AccordionItem title="Combien de temps prend la procédure globale ?">
              <p>Le délai dépend de votre situation :</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Avec attestation ANAPEC (profil standard) :</strong> Jusqu'à 20 jours ouvrables pour l'ANAPEC + 10 jours maximum pour le visa du Ministère (soit environ 1 mois à 1 mois et demi).</li>
                <li><strong>Avec dispense ou procédure simplifiée :</strong> 48 heures pour l'ANAPEC (si applicable) + 10 jours pour le visa du Ministère.</li>
              </ul>
            </AccordionItem>
            <AccordionItem title="Quel est le coût exact de la procédure ?">
              <p>L'utilisation de la plateforme TAECHIR et l'apposition du visa par le Ministère sont gratuites. Cependant, les frais de l'ANAPEC (si vous n'êtes pas dispensé) s'élèvent à :</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>5000 Dhs HT</strong> pour le premier dossier (avec obligation de diffusion d'annonce).</li>
                <li><strong>1500 Dhs HT</strong> pour chaque dossier supplémentaire (même emploi-métier, plafonné à 5 par an).</li>
                <li><strong>1500 Dhs HT</strong> pour les profils rares ou renouvellements (sans obligation d'annonce).</li>
              </ul>
            </AccordionItem>
            <AccordionItem title="Le salarié étranger peut-il commencer à travailler avant d'obtenir le visa ?">
              <p><strong>Non.</strong> Conformément à l'article 516 du Code du Travail marocain, tout employeur désireux de recruter un salarié étranger doit obtenir l'autorisation (visa) <em>avant</em> que celui-ci ne commence à travailler. La date du visa est la date à laquelle le contrat prend effet.</p>
            </AccordionItem>
            <AccordionItem title="Que se passe-t-il en cas de refus du visa de travail ?">
              <p>En cas de refus du visa du contrat de travail, l'employeur s'engage (selon l'Article 5 du contrat type) à prendre en charge les frais de rapatriement du salarié étranger vers son pays d'origine ou son pays de résidence.</p>
            </AccordionItem>
            <AccordionItem title="Comment se passe le renouvellement du contrat ?">
              <p>La demande de renouvellement doit être introduite sur TAECHIR. Si le salarié reste chez le même employeur et au même poste, la procédure est simplifiée (délai ANAPEC réduit à 48h, frais de 1500 Dhs HT). Le dossier physique nécessitera notamment les 3 derniers mois de déclarations CNSS et la copie de la carte de séjour.</p>
            </AccordionItem>
            <AccordionItem title="Un salarié étranger peut-il changer d'employeur au Maroc ?">
              <p>Oui, mais il s'agit d'une nouvelle procédure de demande de visa ("Changement d'employeur"). Le nouvel employeur devra fournir une lettre de résiliation de l'ex-employeur, une lettre de démission légalisée, ou une décision judiciaire en cas de litige, en plus des documents habituels.</p>
            </AccordionItem>
            <AccordionItem title="Qui peut déposer le dossier au guichet ?">
              <p>Seul le <strong>mandataire désigné par l'employeur</strong> à l'étape 5 de la demande en ligne, muni d'une pièce d'identité valide, est reçu au guichet d'accueil pour le dépôt des dossiers ou le retrait des contrats visés. Les guichets (Rabat, Casablanca, Casablanca CFCA pour les sociétés CFC, Marrakech, Tanger, Agadir) sont ouverts du lundi au jeudi de 9 h à 13 h et le vendredi de 9 h à 12 h.</p>
            </AccordionItem>
            <AccordionItem title="Comment suis-je informé de l'avancement de ma demande ?">
              <p>Par e-mail : l'adresse saisie à l'étape 3 (vous pouvez en indiquer plusieurs, séparées par « ; ») reçoit en temps réel les notifications liées au traitement : contrat visé, complément de dossier à fournir, contrat prêt au guichet, etc. Vous pouvez aussi suivre vos demandes et consulter la liste des contrats visés depuis le menu « Suivre sa demande en ligne ». En cas de difficulté, l'assistance aux usagers répond au <strong>+212 5 30 10 07 05</strong> et au <strong>+212 6 74 48 03 68</strong>.</p>
            </AccordionItem>
            <AccordionItem title="Les listes A1 (Haut niveau) et A2 (Profils pointus rares) sont-elles fixes ?">
              <p>Non, ces listes sont mises à jour régulièrement par l'ANAPEC en concertation avec le Ministère chargé du Travail, en fonction de l'évolution et des besoins réels du marché de l'emploi au Maroc.</p>
            </AccordionItem>
          </div>
        </section>

      </main>

      {/* Derniers articles du blog */}
      <section className="bg-white border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Nos derniers articles</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Analyses approfondies, décryptages juridiques et conseils pratiques pour réussir vos démarches de recrutement international au Maroc.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {articles.slice(0, 3).map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {article.readTime} min
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 group-hover:gap-2.5 transition-all">
                    Lire l'article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
            >
              <BookOpen className="w-5 h-5" />
              Voir tous les articles
            </Link>
          </div>
        </div>
      </section>

      {/* Capture — la checklist n'était atteignable que par le pied de page. */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
              Ressource gratuite
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-3 mb-4">
              Le dossier TAECHIR, étape par étape
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              La vérification préalable, l'étape ANAPEC, la légalisation du contrat, le dépôt au
              Ministère, l'après-visa et un budget indicatif 2026 — en un PDF imprimable que vous
              pouvez suivre ligne à ligne.
            </p>
          </div>
          <LeadCapture source="checklist" page="accueil" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
