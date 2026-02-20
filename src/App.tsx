import { useState, ReactNode } from 'react';
import { FileText, CheckCircle, Clock, CreditCard, MapPin, AlertCircle, Briefcase, Globe, Shield, ChevronDown, ChevronUp, Calculator, Info } from 'lucide-react';

function AccordionItem({ title, children, defaultOpen = false }: { title: string, children: ReactNode, defaultOpen?: boolean }) {
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
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-xl tracking-tight text-slate-900">Taechir<span className="text-indigo-600">Guide</span></span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#procedure" className="hover:text-indigo-600 transition-colors">La Procédure</a>
            <a href="#calculateur" className="hover:text-indigo-600 transition-colors">Calculateur</a>
            <a href="#anapec" className="hover:text-indigo-600 transition-colors">Attestation ANAPEC</a>
            <a href="#documents" className="hover:text-indigo-600 transition-colors">Documents Requis</a>
            <a href="#faq" className="hover:text-indigo-600 transition-colors">FAQ</a>
          </div>
        </div>
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
            <a href="#calculateur" className="px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
              <Calculator className="w-5 h-5" />
              Estimer les coûts et délais
            </a>
            <a href="https://taechir.travail.gov.ma" target="_blank" rel="noreferrer" className="px-8 py-3.5 rounded-xl bg-white text-slate-700 font-semibold border border-slate-200 shadow-sm hover:bg-slate-50 transition-all">
              Accéder à Taechir.gov.ma
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
              <p className="text-slate-600 mb-4">Création du compte employeur, saisie des données du salarié et génération du contrat de travail type.</p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2"><Globe className="w-4 h-4 text-slate-400"/> 100% en ligne</li>
                <li className="flex items-center gap-2"><FileText className="w-4 h-4 text-slate-400"/> Impression en 3 exemplaires</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6 text-xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-3">Dépôt & Visa</h3>
              <p className="text-slate-600 mb-4">Dépôt physique du dossier complet au guichet du Ministère pour vérification et apposition du visa.</p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400"/> Guichets régionaux</li>
                <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400"/> Délai max : 10 jours</li>
              </ul>
            </div>
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
                      <option value="exempt">Dispensé (CFC, Époux de marocain, Détachement...)</option>
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
                  Cas de Dispense (Exemptions)
                </h3>
                <p className="text-slate-400 text-sm mb-6">Certaines catégories sont dispensées de l'attestation ANAPEC :</p>
                <ul className="space-y-4 text-slate-300 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                    <span>Époux(ses) de nationaux marocains.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                    <span>Détachés pour une période limitée (marchés publics ou filiales).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                    <span>Salariés des sociétés ayant le statut <strong>Casablanca Finance City (CFC)</strong>.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                    <span>Propriétaires, fondés de pouvoirs, gérants, associés et actionnaires.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                    <span>Profils de haut niveau (Liste A1) et profils pointus rares (Liste A2).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                    <span>Personnel d'encadrement dans l'offshoring.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                    <span><strong>Ressortissants d'Algérie, de Tunisie et du Sénégal</strong> (convention d'établissement).</span>
                  </li>
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

        {/* FAQ Section */}
        <section id="faq" className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Foire Aux Questions (FAQ)</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Tout ce que vous devez savoir sur le recrutement d'étrangers au Maroc via le programme Taechir.</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <AccordionItem title="Qu'est-ce que la plateforme TAECHIR ?">
              <p>TAECHIR est le système informatique officiel du Ministère de l'Inclusion Économique, de la Petite Entreprise, de l'Emploi et des Compétences. Il permet aux employeurs de formuler et suivre leurs demandes de visa de contrat de travail pour les salariés étrangers de manière dématérialisée.</p>
            </AccordionItem>
            <AccordionItem title="Quelles sont les nationalités dispensées de l'attestation ANAPEC ?">
              <p>Les ressortissants des pays ayant conclu une convention d'établissement avec le Maroc sont dispensés de l'attestation d'activité ANAPEC. Actuellement, cela concerne explicitement les ressortissants de <strong>l'Algérie, de la Tunisie et du Sénégal</strong>. D'autres catégories (CFC, époux de marocains, profils rares) sont également dispensées.</p>
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
            <AccordionItem title="Les listes A1 (Haut niveau) et A2 (Profils pointus rares) sont-elles fixes ?">
              <p>Non, ces listes sont mises à jour régulièrement par l'ANAPEC en concertation avec le Ministère chargé du Travail, en fonction de l'évolution et des besoins réels du marché de l'emploi au Maroc.</p>
            </AccordionItem>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <Globe className="w-8 h-8 text-slate-600 mx-auto mb-4" />
          <p className="mb-2">Ce site est un guide informatif basé sur la procédure officielle du Ministère de l'Inclusion Économique, de la Petite Entreprise, de l'Emploi et des Compétences du Maroc.</p>
          <p>Pour les démarches officielles, veuillez visiter <a href="https://taechir.travail.gov.ma" className="text-indigo-400 hover:underline">taechir.travail.gov.ma</a></p>
        </div>
      </footer>
    </div>
  );
}
