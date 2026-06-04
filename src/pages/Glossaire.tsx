import { Link } from 'react-router-dom';
import { Globe, ArrowLeft, BookOpenText } from 'lucide-react';
import { useEffect } from 'react';
import { Footer } from '../components/Footer';

const glossaryTerms = [
  {
    term: 'ANAPEC',
    definition:
      "L'Agence Nationale de Promotion de l'Emploi et des Compétences est l'organisme public marocain chargé de l'intermédiation sur le marché du travail. Dans le cadre du recrutement de salariés étrangers, l'ANAPEC intervient en amont pour vérifier qu'aucun profil marocain ne correspond au poste proposé. L'employeur doit déposer une offre d'emploi auprès de l'ANAPEC et obtenir une attestation confirmant l'absence de candidats nationaux qualifiés avant de pouvoir poursuivre la procédure TAECHIR.",
  },
  {
    term: 'Article 516',
    definition:
      "L'article 516 du Code du Travail marocain constitue le fondement juridique de l'obligation d'obtenir une autorisation préalable pour employer un salarié étranger au Maroc. Il dispose que tout employeur souhaitant recruter un travailleur de nationalité étrangère doit obtenir un visa du contrat de travail délivré par l'autorité gouvernementale chargée de l'emploi. Le non-respect de cette obligation expose l'employeur à des sanctions pénales et administratives.",
  },
  {
    term: "Attestation d'activité",
    definition:
      "L'attestation d'activité est un document délivré par l'administration fiscale ou la Caisse Nationale de Sécurité Sociale (CNSS) qui certifie que l'entreprise employeuse est effectivement en activité. Ce document fait partie des pièces justificatives exigées lors du dépôt d'une demande de visa de contrat de travail étranger. Il permet de vérifier que l'employeur est une entité légale et opérationnelle, apte à embaucher du personnel.",
  },
  {
    term: "Carte d'immatriculation",
    definition:
      "La carte d'immatriculation, aussi appelée carte de séjour, est le titre de séjour délivré au travailleur étranger par la Direction Générale de la Sûreté Nationale (DGSN) une fois le visa du contrat de travail obtenu. Elle constitue la preuve légale du droit de résidence et de travail de l'étranger sur le territoire marocain. Sa durée de validité est généralement alignée sur celle du contrat de travail visé, et son renouvellement est conditionné au renouvellement du visa du contrat.",
  },
  {
    term: 'Casablanca Finance City (CFC)',
    definition:
      "Casablanca Finance City est un statut économique accordé aux entreprises financières et de services professionnels installées à Casablanca. Les entreprises bénéficiant du statut CFC jouissent d'avantages fiscaux et de facilitations administratives, notamment en matière de recrutement de salariés étrangers. Ces entreprises peuvent bénéficier de procédures simplifiées et de délais réduits pour l'obtention des autorisations de travail, dans le cadre de la politique d'attractivité du hub financier.",
  },
  {
    term: 'CNSS',
    definition:
      "La Caisse Nationale de Sécurité Sociale est l'organisme public marocain chargé de la gestion du régime de sécurité sociale obligatoire. Tout salarié étranger titulaire d'un contrat de travail visé doit être déclaré et affilié à la CNSS par son employeur. Les cotisations sociales (maladie, retraite, allocations familiales, perte d'emploi) sont dues dans les mêmes conditions que pour les salariés marocains, sauf dispositions contraires prévues par une convention bilatérale de sécurité sociale.",
  },
  {
    term: 'Code du Travail',
    definition:
      "Le Code du Travail marocain (loi n° 65-99) est le texte législatif fondamental régissant les relations de travail au Maroc. Le Livre V, Titre IV du Code traite spécifiquement de l'emploi des salariés étrangers, en définissant les conditions d'obtention du visa du contrat de travail, les cas de dispense, et les sanctions en cas d'infraction. C'est le cadre juridique principal dans lequel s'inscrit la procédure TAECHIR.",
  },
  {
    term: 'Convention bilatérale',
    definition:
      "Une convention bilatérale est un accord conclu entre le Maroc et un autre État souverain, qui régit les conditions d'établissement et de travail des ressortissants de chaque pays sur le territoire de l'autre. Certaines conventions bilatérales prévoient des facilitations ou des dispenses partielles pour les ressortissants des pays signataires en matière de recrutement. Le Maroc a conclu de telles conventions avec plusieurs pays, notamment la France, la Tunisie, le Sénégal et l'Algérie.",
  },
  {
    term: "Convention d'établissement",
    definition:
      "La convention d'établissement est un type spécifique d'accord bilatéral qui accorde aux ressortissants d'un pays partenaire un traitement privilégié en matière de résidence et d'exercice d'activité professionnelle au Maroc. Les ressortissants des pays ayant signé une telle convention avec le Maroc peuvent bénéficier d'une procédure simplifiée ou d'une dispense de certaines formalités lors de la demande de visa de contrat de travail. La convention d'établissement maroco-française de 1981 en est un exemple notable.",
  },
  {
    term: 'Détachement',
    definition:
      "Le détachement désigne la situation dans laquelle un salarié étranger, employé par une entreprise étrangère, est envoyé temporairement au Maroc pour exécuter une mission au sein d'une entreprise marocaine ou d'une filiale. Le salarié détaché reste lié à son employeur d'origine et conserve son régime de sécurité sociale du pays d'envoi, sous réserve de l'existence d'une convention bilatérale de sécurité sociale. Le détachement nécessite néanmoins l'obtention d'un visa de contrat de travail auprès du Ministère de l'Emploi.",
  },
  {
    term: 'DGSN',
    definition:
      "La Direction Générale de la Sûreté Nationale est l'autorité marocaine responsable de la délivrance des titres de séjour aux ressortissants étrangers. Après l'obtention du visa du contrat de travail par le Ministère de l'Emploi, le salarié étranger doit se présenter à la DGSN pour demander sa carte d'immatriculation (carte de séjour). La DGSN vérifie la conformité des documents et procède aux contrôles de sécurité nécessaires avant la délivrance du titre.",
  },
  {
    term: 'Dispense',
    definition:
      "La dispense est une dérogation légale qui exempte certaines catégories de travailleurs étrangers de l'obligation d'obtenir un visa de contrat de travail. Les cas de dispense sont limitativement énumérés par la loi et concernent notamment les conjoints de ressortissants marocains, les ressortissants de certains pays liés par une convention d'établissement, les détenteurs du statut de réfugié, et certains cadres dirigeants. La demande de dispense doit néanmoins être formalisée auprès du Ministère de l'Emploi avec les justificatifs appropriés.",
  },
  {
    term: 'Emploi-métier',
    definition:
      "L'emploi-métier est la classification officielle du poste à pourvoir selon la nomenclature des professions utilisée par l'ANAPEC et le Ministère de l'Emploi. Lors du dépôt de la demande de visa de contrat de travail, l'employeur doit indiquer le code emploi-métier correspondant au poste proposé au salarié étranger. Ce code permet de vérifier que le poste correspond bien à un besoin réel non satisfait par le marché local de l'emploi et qu'il figure dans les listes autorisées.",
  },
  {
    term: 'Frais de dossier ANAPEC',
    definition:
      "Les frais de dossier ANAPEC correspondent aux droits perçus par l'Agence Nationale de Promotion de l'Emploi et des Compétences pour le traitement de la demande d'attestation de non-disponibilité de profils locaux. Ces frais sont à la charge de l'employeur et doivent être acquittés lors du dépôt du dossier. Le montant est fixé réglementairement et peut varier selon le type de demande (première demande ou renouvellement). Le paiement se fait généralement par virement bancaire ou chèque certifié.",
  },
  {
    term: 'ICE',
    definition:
      "L'Identifiant Commun de l'Entreprise est un numéro unique attribué à chaque entreprise enregistrée au Maroc. L'ICE est obligatoire dans toutes les démarches administratives, fiscales et commerciales. Lors du dépôt d'une demande de visa de contrat de travail étranger, l'employeur doit fournir son ICE comme preuve de son existence juridique et de son enregistrement auprès des autorités compétentes. Ce numéro figure sur le certificat d'inscription au Registre de Commerce.",
  },
  {
    term: 'Légalisation',
    definition:
      "La légalisation est la procédure d'authentification officielle d'un document ou d'une signature par une autorité compétente. Au Maroc, la légalisation des signatures est effectuée par les autorités locales (caïds, pachas) ou par voie notariale. Pour les documents étrangers destinés à être utilisés dans la procédure TAECHIR, la légalisation peut impliquer une apostille (pour les pays signataires de la Convention de La Haye) ou une légalisation consulaire. Les diplômes et certificats du salarié étranger doivent généralement être légalisés avant soumission.",
  },
  {
    term: 'Liste A1',
    definition:
      "La Liste A1 est une liste officielle établie par le Ministère de l'Emploi qui répertorie les métiers et professions pour lesquels le recrutement de salariés étrangers est soumis à la procédure standard complète, incluant la vérification de la priorité nationale à l'emploi. Les métiers figurant sur cette liste sont considérés comme pouvant être pourvus par des candidats marocains, et l'employeur doit donc démontrer l'absence de profils locaux qualifiés via l'ANAPEC avant d'obtenir l'autorisation de recruter un étranger.",
  },
  {
    term: 'Liste A2',
    definition:
      "La Liste A2 est une liste officielle des métiers et professions pour lesquels le recrutement de salariés étrangers bénéficie d'une procédure allégée, en raison de la rareté avérée des compétences correspondantes sur le marché local. Pour les postes relevant de la Liste A2, la phase de vérification auprès de l'ANAPEC peut être raccourcie ou simplifiée, car il est reconnu que ces compétences sont difficilement disponibles parmi les candidats nationaux. La liste est révisée périodiquement pour refléter l'évolution du marché du travail.",
  },
  {
    term: 'Modèle 7',
    definition:
      "Le Modèle 7 est un extrait du Registre de Commerce délivré par le tribunal de commerce compétent. Ce document officiel atteste de l'existence juridique de l'entreprise, de sa forme sociale, de son capital, de son siège social et de l'identité de ses dirigeants. Le Modèle 7 fait partie des pièces justificatives obligatoires à fournir lors du dépôt d'une demande de visa de contrat de travail étranger. Il doit être récent (généralement de moins de trois mois) pour être accepté.",
  },
  {
    term: 'Nomenclature des professions',
    definition:
      "La nomenclature des professions est le référentiel officiel de classification des métiers et emplois utilisé par le Ministère de l'Emploi et l'ANAPEC. Elle attribue un code spécifique à chaque profession et sert de base à l'évaluation des demandes de recrutement de salariés étrangers. La nomenclature permet de déterminer si un poste relève de la Liste A1, de la Liste A2, ou s'il est éligible à une procédure dérogatoire. L'employeur doit veiller à utiliser le code correct correspondant au poste réellement occupé par le salarié étranger.",
  },
  {
    term: "Priorité nationale à l'emploi",
    definition:
      "Le principe de priorité nationale à l'emploi est un fondement du droit du travail marocain en matière de recrutement étranger. Il impose que l'employeur démontre, avant de recruter un salarié étranger, qu'aucun candidat marocain qualifié n'est disponible pour occuper le poste concerné. Cette vérification est effectuée par l'ANAPEC, qui publie l'offre d'emploi et recherche des candidatures locales pendant un délai réglementaire. Ce n'est qu'en l'absence de candidatures adéquates que la procédure de visa peut aboutir favorablement.",
  },
  {
    term: 'Registre de Commerce',
    definition:
      "Le Registre de Commerce (RC) est le registre officiel dans lequel sont inscrites toutes les personnes physiques et morales exerçant une activité commerciale au Maroc. L'inscription au RC est obligatoire et conditionne la reconnaissance juridique de l'entreprise. Dans le cadre de la procédure TAECHIR, l'employeur doit fournir un extrait récent du Registre de Commerce (Modèle 7) pour prouver son existence légale et sa capacité à employer du personnel. Le numéro RC figure sur tous les documents officiels de l'entreprise.",
  },
  {
    term: 'Renouvellement',
    definition:
      "Le renouvellement du visa de contrat de travail étranger est la procédure à engager avant l'expiration du visa en cours pour maintenir le salarié étranger en poste légalement. La demande de renouvellement doit être déposée au moins trente jours avant la date d'expiration du contrat en cours. Le dossier de renouvellement est généralement allégé par rapport à la première demande, mais nécessite toujours une mise à jour des pièces administratives. Le non-renouvellement dans les délais expose l'employeur et le salarié à des sanctions pour travail irrégulier.",
  },
  {
    term: 'TAECHIR',
    definition:
      "TAECHIR est la plateforme électronique officielle du Ministère de l'Inclusion Économique, de la Petite Entreprise, de l'Emploi et des Compétences, dédiée au traitement des demandes de visa de contrat de travail pour les salariés étrangers au Maroc. Le nom est un acronyme désignant le système de traitement automatisé des demandes. Depuis sa mise en place, toutes les demandes de visa de contrat de travail étranger (premières demandes et renouvellements) doivent être soumises exclusivement via cette plateforme en ligne, accessible à l'adresse taechir.travail.gov.ma.",
  },
  {
    term: 'Taxe Professionnelle',
    definition:
      "La Taxe Professionnelle (anciennement appelée patente) est un impôt local dû par toute personne physique ou morale exerçant une activité professionnelle au Maroc. L'attestation de régularité fiscale, incluant la Taxe Professionnelle, fait partie des documents que l'employeur peut être amené à fournir dans le cadre de la procédure de recrutement de salariés étrangers. Elle atteste que l'entreprise est en conformité avec ses obligations fiscales locales et constitue un gage de sérieux pour l'administration.",
  },
  {
    term: 'Traduction assermentée',
    definition:
      "La traduction assermentée est une traduction officielle réalisée par un traducteur agréé auprès des tribunaux marocains. Tous les documents rédigés dans une langue autre que l'arabe ou le français qui sont soumis dans le cadre de la procédure TAECHIR doivent être accompagnés d'une traduction assermentée. Cela concerne notamment les diplômes, les certificats de travail et les documents d'état civil du salarié étranger. La traduction doit être légalisée et porter le cachet et la signature du traducteur assermenté.",
  },
  {
    term: 'Visa de contrat de travail',
    definition:
      "Le visa de contrat de travail est l'autorisation administrative délivrée par le Ministère de l'Emploi qui permet à un employeur marocain d'embaucher légalement un salarié de nationalité étrangère. Ce visa est apposé sur le contrat de travail après examen du dossier complet par l'administration. Il constitue la pièce maîtresse de la procédure TAECHIR et conditionne l'obtention du titre de séjour (carte d'immatriculation) auprès de la DGSN. Sa durée de validité est généralement d'un an, renouvelable.",
  },
];

// Group terms alphabetically
const groupedTerms = glossaryTerms.reduce<Record<string, typeof glossaryTerms>>((acc, item) => {
  const letter = item.term.charAt(0).toUpperCase();
  if (!acc[letter]) acc[letter] = [];
  acc[letter].push(item);
  return acc;
}, {});

const sortedLetters = Object.keys(groupedTerms).sort((a, b) => a.localeCompare(b, 'fr'));

export function Glossaire() {
  useEffect(() => {
    document.title = 'Glossaire — Guide-Taechir.org';
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
            <BookOpenText className="w-4 h-4" />
            Lexique complet
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Glossaire du recrutement de travailleurs étrangers au Maroc
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Tous les termes juridiques, administratifs et techniques à connaître pour comprendre et mener à bien la procédure TAECHIR.
          </p>
        </div>
      </header>

      {/* Alphabet quick nav */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap gap-2 justify-center">
          {sortedLetters.map((letter) => (
            <a
              key={letter}
              href={`#lettre-${letter}`}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
            >
              {letter}
            </a>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-12">
        {sortedLetters.map((letter) => (
          <section key={letter} id={`lettre-${letter}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-xl font-extrabold text-xl">
                {letter}
              </div>
              <div className="flex-1 h-px bg-slate-200" />
            </div>
            <div className="space-y-4">
              {groupedTerms[letter].map((item) => (
                <div
                  key={item.term}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
                >
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{item.term}</h3>
                  <p className="text-slate-700 leading-relaxed text-sm">{item.definition}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Disclaimer */}
        <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-amber-900 mb-3">Avertissement</h2>
          <p className="text-amber-800 leading-relaxed text-sm">
            Ce glossaire est fourni à titre informatif et pédagogique. Les définitions proposées visent à faciliter la compréhension de la procédure de recrutement de travailleurs étrangers au Maroc, mais ne constituent pas un avis juridique. Pour toute démarche officielle, veuillez consulter les textes réglementaires en vigueur ou vous adresser à un professionnel du droit.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
