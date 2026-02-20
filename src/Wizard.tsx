import { useState } from 'react';
import {
  X, ChevronRight, ChevronLeft, CheckCircle, FileText, MapPin,
  CreditCard, Clock, ExternalLink, AlertCircle, Building2, User,
  Globe, Briefcase, RefreshCw, ArrowLeftRight, Star
} from 'lucide-react';

type Demarche = 'nouveau' | 'renouvellement' | 'changement';
type Profil = 'standard' | 'rare' | 'exempt';
type Nationalite = 'convention' | 'autre';
type Employeur = 'morale' | 'physique' | 'cfc';

interface WizardData {
  demarche: Demarche | null;
  profil: Profil | null;
  nationalite: Nationalite | null;
  employeur: Employeur | null;
  nombreSalaries: number;
}

const TOTAL_STEPS = 5;

/* ─── Option Card ─── */
function OptionCard({
  value, label, desc, icon, selected, onSelect
}: {
  value: string; label: string; desc: string; icon: React.ReactNode;
  selected: boolean; onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all
        ${selected
          ? 'border-indigo-500 bg-indigo-50 shadow-sm'
          : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'}`}
    >
      <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${selected ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-semibold ${selected ? 'text-indigo-700' : 'text-slate-800'}`}>{label}</p>
        <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{desc}</p>
      </div>
      {selected && <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-1" />}
    </button>
  );
}

/* ─── Step Wrapper ─── */
function StepContainer({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-slate-500 text-sm mb-6 leading-relaxed">{subtitle}</p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

/* ─── Results Screen ─── */
function WizardResults({
  data, onClose, onBack
}: {
  data: WizardData; onClose: () => void; onBack: () => void;
}) {
  const n = data.nombreSalaries;
  const isNew = data.demarche === 'nouveau';
  const isRenewal = data.demarche === 'renouvellement';
  const isChange = data.demarche === 'changement';
  const isExempt = data.profil === 'exempt' || data.nationalite === 'convention' || data.employeur === 'cfc';
  const isRare = data.profil === 'rare';

  // Cost & timeline
  let anapecCost = 0;
  let anapecDays = 0;
  if (!isExempt) {
    if (isRenewal || isRare) {
      anapecCost = 1500 * n;
      anapecDays = 2;
    } else {
      anapecCost = 5000 + (n > 1 ? (n - 1) * 1500 : 0);
      anapecDays = 20;
    }
  }
  const visaDays = 10;
  const totalDays = anapecDays + visaDays;

  const demarcheLabel: Record<Demarche, string> = {
    nouveau: 'Nouveau recrutement',
    renouvellement: 'Renouvellement',
    changement: "Changement d'employeur",
  };
  const profilLabel: Record<Profil, string> = {
    standard: 'Profil standard',
    rare: 'Profil rare / haut niveau',
    exempt: 'Catégorie dispensée',
  };

  // --- Build document list ---
  type Doc = { text: string; badge?: string };
  const docs: Doc[] = [];

  docs.push({ text: '3 exemplaires originaux du contrat de travail généré via TAECHIR, signés, cachetés et légalisés', badge: 'Obligatoire' });
  docs.push({ text: 'Copie des premières pages du passeport (en cours de validité) + page avec date d\'entrée au Maroc', badge: 'Obligatoire' });

  if (isNew) {
    docs.push({ text: 'Copie certifiée conforme des diplômes et/ou certificats de travail (avec traduction officielle si rédigés en langue étrangère)', badge: 'Obligatoire' });
  }

  if (!isExempt) {
    docs.push({ text: 'Attestation d\'activité ANAPEC prouvant l\'absence de candidats nationaux pour le poste', badge: 'ANAPEC' });
  } else {
    if (data.employeur === 'cfc') {
      docs.push({ text: 'Certificat de statut Casablanca Finance City (CFC) en cours de validité', badge: 'CFC' });
    }
    if (data.nationalite === 'convention') {
      docs.push({ text: 'Preuve de nationalité (convention d\'établissement Maroc–Algérie / Tunisie / Sénégal)', badge: 'Convention' });
    }
    if (data.profil === 'exempt') {
      docs.push({ text: 'Justificatif de la catégorie dispensée (lien matrimonial avec ressortissant marocain, statut de détaché, ou qualité de propriétaire/gérant/actionnaire)', badge: 'Dispense' });
    }
  }

  if (isRenewal || isChange) {
    docs.push({ text: 'Copie du titre de séjour (Carte d\'immatriculation) délivré par la DGSN', badge: 'Obligatoire' });
    docs.push({ text: 'Attestation récente de déclarations de salaires CNSS justifiant les 3 derniers mois d\'activité', badge: 'CNSS' });
  }

  if (isChange) {
    docs.push({ text: 'Lettre de résiliation de l\'ex-employeur OU lettre de démission légalisée OU décision judiciaire définitive', badge: 'Changement' });
  }

  if (data.employeur === 'morale' || data.employeur === 'cfc') {
    docs.push({ text: 'Statuts de la société', badge: 'Employeur' });
    docs.push({ text: 'Registre de Commerce (modèle 7) récent', badge: 'Employeur' });
    docs.push({ text: 'PV de création ou de nomination des dirigeants', badge: 'Employeur' });
  } else if (data.employeur === 'physique') {
    docs.push({ text: 'Registre de Commerce ou Taxe Professionnelle en cours de validité', badge: 'Employeur' });
  }

  // --- Build admin list ---
  type Admin = { name: string; role: string; url: string; color: string };
  const admins: Admin[] = [];

  if (!isExempt) {
    admins.push({
      name: 'ANAPEC',
      role: 'Obtenir l\'attestation d\'activité (preuve d\'absence de candidats nationaux)',
      url: 'https://www.anapec.org',
      color: 'bg-orange-100 text-orange-700',
    });
  }
  admins.push({
    name: 'Plateforme TAECHIR',
    role: 'Créer votre compte employeur et générer le contrat de travail type en ligne',
    url: 'https://taechir.travail.gov.ma',
    color: 'bg-indigo-100 text-indigo-700',
  });
  admins.push({
    name: 'Ministère de l\'Emploi',
    role: 'Dépôt physique du dossier complet au guichet régional pour apposition du visa',
    url: 'https://www.travail.gov.ma',
    color: 'bg-blue-100 text-blue-700',
  });
  if (isRenewal || isChange) {
    admins.push({
      name: 'DGSN (Direction de la Sûreté)',
      role: 'Renouvellement de la carte d\'immatriculation / titre de séjour',
      url: 'https://www.dgsn.ma',
      color: 'bg-slate-100 text-slate-700',
    });
  }
  if (isRenewal) {
    admins.push({
      name: 'CNSS',
      role: 'Obtenir l\'attestation de déclarations de salaires des 3 derniers mois',
      url: 'https://www.cnss.ma',
      color: 'bg-emerald-100 text-emerald-700',
    });
  }

  const badgeColor: Record<string, string> = {
    Obligatoire: 'bg-red-50 text-red-600 border-red-100',
    ANAPEC: 'bg-orange-50 text-orange-600 border-orange-100',
    CFC: 'bg-purple-50 text-purple-600 border-purple-100',
    Convention: 'bg-teal-50 text-teal-600 border-teal-100',
    Dispense: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    CNSS: 'bg-blue-50 text-blue-600 border-blue-100',
    Changement: 'bg-amber-50 text-amber-600 border-amber-100',
    Employeur: 'bg-slate-50 text-slate-600 border-slate-200',
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* Sticky Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-6 h-6" />
                <h2 className="text-xl font-bold">Votre récapitulatif personnalisé</h2>
              </div>
              <p className="text-white/70 text-sm">
                {data.demarche && demarcheLabel[data.demarche]} ·{' '}
                {data.profil && profilLabel[data.profil]} ·{' '}
                {n} salarié{n > 1 ? 's' : ''}
              </p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/20 transition-colors shrink-0">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-8">

          {/* KPI Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-center">
              <CreditCard className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
              <p className="text-xs text-slate-500 mb-1">Frais ANAPEC</p>
              <p className="text-2xl font-extrabold text-slate-900">{anapecCost.toLocaleString('fr-MA')}</p>
              <p className="text-xs font-medium text-slate-400">Dhs HT</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-center">
              <Clock className="w-5 h-5 text-blue-400 mx-auto mb-2" />
              <p className="text-xs text-slate-500 mb-1">ANAPEC</p>
              <p className="text-2xl font-extrabold text-slate-900">{anapecDays === 0 ? '—' : anapecDays}</p>
              <p className="text-xs font-medium text-slate-400">{anapecDays === 0 ? 'Dispensé' : 'Jours max'}</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center">
              <Clock className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
              <p className="text-xs text-slate-500 mb-1">Délai total</p>
              <p className="text-2xl font-extrabold text-emerald-700">{totalDays}</p>
              <p className="text-xs font-medium text-slate-400">Jours max</p>
            </div>
          </div>

          {/* Exemption banner */}
          {isExempt && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm text-emerald-800 leading-relaxed">
                <strong>Bonne nouvelle !</strong> Votre situation vous dispense de l'attestation ANAPEC.
                La procédure est simplifiée : <strong>0 Dhs de frais ANAPEC</strong> et traitement plus rapide.
              </p>
            </div>
          )}

          {/* Documents */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" />
              Documents à préparer
              <span className="ml-1 text-xs font-normal bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">{docs.length} pièces</span>
            </h3>
            <div className="space-y-2">
              {docs.map((doc, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 leading-relaxed">{doc.text}</p>
                  </div>
                  {doc.badge && (
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border shrink-0 ${badgeColor[doc.badge] ?? 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                      {doc.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Admins */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-500" />
              Administrations à contacter
              <span className="ml-1 text-xs font-normal bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">{admins.length} organismes</span>
            </h3>
            <div className="space-y-2">
              {admins.map((admin, i) => (
                <div key={i} className="flex items-start justify-between gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg shrink-0 ${admin.color}`}>
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 text-sm">{admin.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{admin.role}</p>
                    </div>
                  </div>
                  <a
                    href={admin.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium whitespace-nowrap shrink-0"
                  >
                    Visiter <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Steps summary */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" />
              Chronologie de votre démarche
            </h3>
            <div className="relative pl-6 space-y-4">
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-200 rounded-full"></div>
              {[
                !isExempt && {
                  step: '1', title: 'Déposer la demande ANAPEC',
                  detail: `Soumettez votre dossier à l'ANAPEC. Délai : ${anapecDays === 2 ? '48 heures' : `${anapecDays} jours ouvrables`}. Frais : ${anapecCost.toLocaleString('fr-MA')} Dhs HT.`,
                  color: 'bg-orange-500',
                },
                {
                  step: !isExempt ? '2' : '1', title: 'Créer le contrat sur TAECHIR',
                  detail: 'Connectez-vous sur taechir.travail.gov.ma, saisissez les données du salarié et imprimez 3 exemplaires du contrat.',
                  color: 'bg-indigo-500',
                },
                {
                  step: !isExempt ? '3' : '2', title: 'Déposer le dossier au guichet Ministère',
                  detail: 'Rendez-vous au guichet régional avec le dossier physique complet. Délai de traitement : max 10 jours.',
                  color: 'bg-blue-500',
                },
                {
                  step: !isExempt ? '4' : '3', title: 'Obtenir le visa et débuter le contrat',
                  detail: 'Après apposition du visa, le salarié peut légalement commencer à travailler. La date du visa est la date d\'effet du contrat.',
                  color: 'bg-emerald-500',
                },
              ].filter(Boolean).map((item: any, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-4 h-4 rounded-full ${item.color} shrink-0 mt-0.5 z-10 ring-2 ring-white`}></div>
                  <div>
                    <p className="font-semibold text-sm text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-800 leading-relaxed space-y-1">
              <p><strong>Important :</strong> Le salarié ne peut commencer à travailler qu'après l'apposition du visa (Art. 516 du Code du Travail marocain).</p>
              <p>L'Administration peut demander des documents supplémentaires. En cas de refus du visa, l'employeur prend en charge les frais de rapatriement (Art. 5 du contrat type).</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pb-2">
            <button
              onClick={onBack}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium transition-colors text-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Modifier mes réponses
            </button>
            <a
              href="https://taechir.travail.gov.ma"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 text-sm flex-1"
            >
              Démarrer sur TAECHIR <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Wizard ─── */
export function Wizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [data, setData] = useState<WizardData>({
    demarche: null,
    profil: null,
    nationalite: null,
    employeur: null,
    nombreSalaries: 1,
  });

  const canProceed = () => {
    if (step === 1) return data.demarche !== null;
    if (step === 2) return data.profil !== null;
    if (step === 3) return data.nationalite !== null;
    if (step === 4) return data.employeur !== null;
    if (step === 5) return true;
    return false;
  };

  const next = () => {
    if (step === TOTAL_STEPS) { setShowResults(true); return; }
    setStep(s => s + 1);
  };
  const back = () => {
    if (step === 1) { onClose(); return; }
    setStep(s => s - 1);
  };

  if (showResults) {
    return (
      <WizardResults
        data={data}
        onClose={onClose}
        onBack={() => { setShowResults(false); setStep(TOTAL_STEPS); }}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white shrink-0">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold">Assistant Taechir</h2>
              <p className="text-white/60 text-xs mt-0.5">Obtenez votre récapitulatif personnalisé</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/20 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${i < step ? 'bg-white' : 'bg-white/25'}`}
              />
            ))}
          </div>
          <p className="text-white/60 text-xs mt-2">Étape {step} sur {TOTAL_STEPS}</p>
        </div>

        {/* Step content */}
        <div className="p-8 overflow-y-auto flex-1">
          {step === 1 && (
            <StepContainer
              title="Quelle est votre démarche ?"
              subtitle="Sélectionnez le type de demande que vous souhaitez effectuer pour votre salarié étranger."
            >
              <OptionCard value="nouveau" label="Nouveau recrutement" desc="Premier contrat de travail pour ce salarié étranger dans votre entreprise." icon={<Briefcase className="w-5 h-5" />} selected={data.demarche === 'nouveau'} onSelect={() => setData({ ...data, demarche: 'nouveau' })} />
              <OptionCard value="renouvellement" label="Renouvellement" desc="Reconduction du contrat de travail avec le même employeur et au même poste." icon={<RefreshCw className="w-5 h-5" />} selected={data.demarche === 'renouvellement'} onSelect={() => setData({ ...data, demarche: 'renouvellement' })} />
              <OptionCard value="changement" label="Changement d'employeur" desc="Le salarié étranger déjà en poste au Maroc rejoint une nouvelle entreprise." icon={<ArrowLeftRight className="w-5 h-5" />} selected={data.demarche === 'changement'} onSelect={() => setData({ ...data, demarche: 'changement' })} />
            </StepContainer>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Quelle situation décrit le mieux ce recrutement ?</h3>
              <p className="text-slate-500 text-sm mb-5 leading-relaxed">
                Pas besoin de connaître les catégories administratives — choisissez simplement ce qui correspond à votre cas.
              </p>
              <div className="space-y-3">
                <OptionCard
                  value="standard"
                  label="Le poste est un métier courant"
                  desc="Ex : développeur, comptable, ingénieur, commercial, RH, chef de projet… Ce type de profil pourrait potentiellement se trouver sur le marché marocain."
                  icon={<User className="w-5 h-5" />}
                  selected={data.profil === 'standard'}
                  onSelect={() => setData({ ...data, profil: 'standard' })}
                />
                <OptionCard
                  value="rare"
                  label="C'est une compétence très rare ou un expert pointu"
                  desc="Ex : spécialiste technique introuvable localement, expert international, haut dirigeant (DG, DSI, CTO)… Ce profil est difficile à trouver au Maroc."
                  icon={<Star className="w-5 h-5" />}
                  selected={data.profil === 'rare'}
                  onSelect={() => setData({ ...data, profil: 'rare' })}
                />
                <OptionCard
                  value="exempt"
                  label="Le salarié a un lien particulier avec l'entreprise ou le Maroc"
                  desc="Ex : conjoint(e) d'un(e) ressortissant(e) marocain(e), associé(e) ou actionnaire de l'entreprise, gérant(e) ou mandataire social, salarié détaché par une filiale étrangère, cadre en offshoring."
                  icon={<CheckCircle className="w-5 h-5" />}
                  selected={data.profil === 'exempt'}
                  onSelect={() => setData({ ...data, profil: 'exempt' })}
                />
              </div>
              <p className="mt-4 text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
                💡 En cas de doute entre la 1ère et la 2ème option, choisissez la 1ère — l'ANAPEC évaluera la rareté du profil lors du traitement.
              </p>
            </div>
          )}

          {step === 3 && (
            <StepContainer
              title="Quelle est la nationalité du salarié ?"
              subtitle="Certaines conventions bilatérales accordent une dispense d'attestation ANAPEC."
            >
              <OptionCard value="convention" label="Algérie, Tunisie ou Sénégal" desc="Convention d'établissement avec le Maroc → dispense totale de l'attestation ANAPEC." icon={<CheckCircle className="w-5 h-5" />} selected={data.nationalite === 'convention'} onSelect={() => setData({ ...data, nationalite: 'convention' })} />
              <OptionCard value="autre" label="Autre nationalité" desc="Ressortissant d'un autre pays (France, Espagne, Inde, USA, etc.) — procédure normale." icon={<Globe className="w-5 h-5" />} selected={data.nationalite === 'autre'} onSelect={() => setData({ ...data, nationalite: 'autre' })} />
            </StepContainer>
          )}

          {step === 4 && (
            <StepContainer
              title="Forme juridique de votre entreprise ?"
              subtitle="Cela détermine les documents de l'employeur à fournir dans le dossier."
            >
              <OptionCard value="morale" label="Personne morale (Société)" desc="SARL, SA, SAS... — Statuts, RC modèle 7 et PV de nomination requis." icon={<Building2 className="w-5 h-5" />} selected={data.employeur === 'morale'} onSelect={() => setData({ ...data, employeur: 'morale' })} />
              <OptionCard value="physique" label="Personne physique" desc="Auto-entrepreneur ou entrepreneur individuel — RC ou Taxe Professionnelle suffisent." icon={<User className="w-5 h-5" />} selected={data.employeur === 'physique'} onSelect={() => setData({ ...data, employeur: 'physique' })} />
              <OptionCard value="cfc" label="Société CFC" desc="Statut Casablanca Finance City — dispense d'attestation ANAPEC, certificat CFC requis." icon={<Globe className="w-5 h-5" />} selected={data.employeur === 'cfc'} onSelect={() => setData({ ...data, employeur: 'cfc' })} />
            </StepContainer>
          )}

          {step === 5 && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Combien de salariés recrutez-vous ?</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Maximum 5 par emploi-métier par an. À partir du 2ème dossier, les frais ANAPEC passent à 1 500 Dhs HT au lieu de 5 000 Dhs.
              </p>
              <div className="flex justify-center gap-3 mb-8">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    onClick={() => setData({ ...data, nombreSalaries: num })}
                    className={`w-14 h-14 rounded-xl text-xl font-bold border-2 transition-all
                      ${data.nombreSalaries === num
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md shadow-indigo-100'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-slate-50'}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              {data.nombreSalaries > 1 && !( data.profil === 'exempt' || data.nationalite === 'convention' || data.employeur === 'cfc') && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-sm text-indigo-700">
                  💡 Pour {data.nombreSalaries} salariés :{' '}
                  <strong>
                    {data.profil === 'rare' || data.demarche === 'renouvellement'
                      ? `${(1500 * data.nombreSalaries).toLocaleString('fr-MA')} Dhs HT`
                      : `${(5000 + (data.nombreSalaries - 1) * 1500).toLocaleString('fr-MA')} Dhs HT`
                    }
                  </strong> de frais ANAPEC estimés.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div className="px-8 pb-8 flex justify-between shrink-0 border-t border-slate-100 pt-5">
          <button
            onClick={back}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" /> {step === 1 ? 'Annuler' : 'Retour'}
          </button>
          <button
            onClick={next}
            disabled={!canProceed()}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all text-sm
              ${canProceed()
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
          >
            {step === TOTAL_STEPS ? 'Voir mon récapitulatif' : 'Suivant'} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
