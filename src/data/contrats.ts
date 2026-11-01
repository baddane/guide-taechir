/* Générateur de contrats et de modèles de documents RH (droit marocain).

   Le moteur produit un document structuré (titre + blocs de paragraphes)
   que la page « Documents utiles » affiche, imprime, copie ou exporte
   en .doc. Aucune donnée saisie ne quitte le navigateur.

   Références : loi n° 65-99 relative au Code du travail (art. 13-14 période
   d'essai, 16-17 CDD, 43 préavis, 72 certificat de travail, 184 durée du
   travail, 231 congé annuel, 516 et s. salariés étrangers, 526 limite
   d'âge) et décret n° 2-04-469 du 29 décembre 2004 (délais de préavis).
   Ces règles sont des MINIMA : convention collective, règlement intérieur
   ou usage peuvent être plus favorables au salarié. */

export type Bloc = { titre?: string; paragraphes: string[] };
export type DocGenere = { titre: string; sousTitre?: string; blocs: Bloc[]; signatures?: string[] };

export type TypeContrat = 'cdi' | 'cdd';
export type Categorie = 'cadre' | 'employe' | 'ouvrier';
export type MotifCdd = 'remplacement' | 'accroissement' | 'saisonnier' | 'nouvelle_activite';

export const CATEGORIES: { id: Categorie; label: string }[] = [
  { id: 'cadre', label: 'Cadre ou assimilé' },
  { id: 'employe', label: 'Employé' },
  { id: 'ouvrier', label: 'Ouvrier' },
];

export const MOTIFS_CDD: { id: MotifCdd; label: string; texte: string }[] = [
  {
    id: 'remplacement',
    label: 'Remplacement d\'un salarié absent',
    texte: 'le remplacement d\'un salarié dont le contrat de travail est suspendu (hors cas de grève)',
  },
  {
    id: 'accroissement',
    label: 'Accroissement temporaire d\'activité',
    texte: 'l\'accroissement temporaire de l\'activité de l\'entreprise',
  },
  {
    id: 'saisonnier',
    label: 'Travail saisonnier',
    texte: 'l\'exécution d\'un travail à caractère saisonnier',
  },
  {
    id: 'nouvelle_activite',
    label: 'Nouvelle entreprise, établissement ou produit (art. 17)',
    texte: 'l\'ouverture d\'une entreprise ou d\'un établissement nouveau, ou le lancement d\'un nouveau produit',
  },
];

/* Période d'essai maximale d'un CDI (art. 14), renouvelable une fois. */
export const ESSAI_CDI: Record<Categorie, { jours: number; libelle: string }> = {
  cadre: { jours: 90, libelle: '3 mois' },
  employe: { jours: 45, libelle: '1 mois et demi' },
  ouvrier: { jours: 15, libelle: '15 jours' },
};

/* Préavis de démission ou de licenciement (décret n° 2-04-469), selon
   l'ancienneté. Donné à titre indicatif : convention collective ou contrat
   plus favorables priment. */
export const PREAVIS: Record<Categorie, [string, string, string]> = {
  cadre: ['1 mois', '2 mois', '3 mois'],
  employe: ['8 jours', '1 mois', '2 mois'],
  ouvrier: ['8 jours', '1 mois', '2 mois'],
};

/* Durée légale (art. 184) : 2 288 heures par an dans les activités non
   agricoles, soit 44 heures par semaine. */
export const DUREE_HEBDO_MAX = 44;

export type ContratInput = {
  type: TypeContrat;
  etranger: boolean;
  // Employeur
  employeurNom: string;
  employeurForme: string;
  employeurAdresse: string;
  employeurRc: string;
  employeurIce: string;
  employeurCnss: string;
  representantNom: string;
  representantQualite: string;
  // Salarié
  salarieNom: string;
  salarieNationalite: string;
  salarieNaissance: string;
  salariePiece: string;
  salarieAdresse: string;
  // Poste
  poste: string;
  categorie: Categorie;
  lieuTravail: string;
  dateDebut: string;
  dateFin: string;
  motifCdd: MotifCdd;
  salarieRemplace: string;
  // Conditions
  salaireBrut: string;
  avantages: string;
  heuresHebdo: string;
  essaiJours: string;
  essaiRenouvelable: boolean;
  // Clauses optionnelles
  clauseConfidentialite: boolean;
  clauseExclusivite: boolean;
  clauseMobilite: boolean;
  villeSignature: string;
  dateSignature: string;
};

export const CONTRAT_VIDE: ContratInput = {
  type: 'cdi',
  etranger: false,
  employeurNom: '',
  employeurForme: 'SARL',
  employeurAdresse: '',
  employeurRc: '',
  employeurIce: '',
  employeurCnss: '',
  representantNom: '',
  representantQualite: 'Gérant',
  salarieNom: '',
  salarieNationalite: '',
  salarieNaissance: '',
  salariePiece: '',
  salarieAdresse: '',
  poste: '',
  categorie: 'employe',
  lieuTravail: '',
  dateDebut: '',
  dateFin: '',
  motifCdd: 'accroissement',
  salarieRemplace: '',
  salaireBrut: '',
  avantages: '',
  heuresHebdo: '44',
  essaiJours: '',
  essaiRenouvelable: false,
  clauseConfidentialite: true,
  clauseExclusivite: false,
  clauseMobilite: false,
  villeSignature: '',
  dateSignature: '',
};

/* Champ vide → pointillés, pour qu'un document imprimé reste complétable à la main. */
export const v = (s: string, n = 24) => (s && s.trim() ? s.trim() : '.'.repeat(n));

export function dateFr(iso: string): string {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  const txt = d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  return txt.replace(/^1 /, '1er ');
}

export function joursEntre(debut: string, fin: string): number | null {
  if (!debut || !fin) return null;
  const a = new Date(`${debut}T00:00:00`).getTime();
  const b = new Date(`${fin}T00:00:00`).getTime();
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  return Math.round((b - a) / 86400000) + 1;
}

/* Période d'essai maximale applicable, en jours calendaires.
   CDD (art. 14) : un jour par semaine de travail, dans la limite de
   2 semaines (contrat de moins de 6 mois) ou d'un mois (au-delà). */
export function essaiMax(input: Pick<ContratInput, 'type' | 'categorie' | 'dateDebut' | 'dateFin'>): { jours: number; libelle: string } | null {
  if (input.type === 'cdi') return ESSAI_CDI[input.categorie];
  const duree = joursEntre(input.dateDebut, input.dateFin);
  if (duree === null) return null;
  const semaines = Math.floor(duree / 7);
  const plafond = duree < 183 ? 14 : 30;
  const jours = Math.min(semaines, plafond);
  return { jours, libelle: `${jours} jour${jours > 1 ? 's' : ''}` };
}

export type Alerte = { niveau: 'erreur' | 'attention'; texte: string };

export function verifierContrat(c: ContratInput): Alerte[] {
  const alertes: Alerte[] = [];
  const heures = Number(c.heuresHebdo.replace(',', '.'));
  if (c.heuresHebdo && (Number.isNaN(heures) || heures <= 0)) {
    alertes.push({ niveau: 'erreur', texte: 'Durée hebdomadaire invalide.' });
  } else if (heures > DUREE_HEBDO_MAX) {
    alertes.push({ niveau: 'erreur', texte: `La durée normale du travail ne peut dépasser ${DUREE_HEBDO_MAX} h par semaine (2 288 h par an, art. 184) hors heures supplémentaires.` });
  }

  if (c.type === 'cdd') {
    const duree = joursEntre(c.dateDebut, c.dateFin);
    if (!c.dateFin) {
      alertes.push({ niveau: 'erreur', texte: 'Un CDD doit indiquer sa date de fin (ou l\'événement qui y met fin).' });
    } else if (duree !== null && duree <= 0) {
      alertes.push({ niveau: 'erreur', texte: 'La date de fin précède la date de début.' });
    }
    if (c.motifCdd === 'nouvelle_activite' && duree !== null && duree > 366) {
      alertes.push({ niveau: 'erreur', texte: 'Pour une nouvelle activité, le CDD est limité à un an, renouvelable une seule fois (art. 17). Au-delà, il devient un CDI.' });
    }
    if (c.motifCdd === 'remplacement' && !c.salarieRemplace.trim()) {
      alertes.push({ niveau: 'attention', texte: 'Indiquez le nom ou le poste du salarié remplacé : le motif doit être précis.' });
    }
  }

  const max = essaiMax(c);
  const essai = Number(c.essaiJours);
  if (c.essaiJours && max && essai > max.jours) {
    alertes.push({ niveau: 'erreur', texte: `Période d'essai trop longue : ${max.libelle} au maximum pour ce contrat (art. 14).` });
  }
  if (c.type === 'cdd' && c.essaiRenouvelable) {
    alertes.push({ niveau: 'attention', texte: 'Le renouvellement de la période d\'essai est prévu par la loi pour le CDI ; évitez-le dans un CDD.' });
  }

  if (c.etranger) {
    alertes.push({ niveau: 'attention', texte: 'Salarié étranger : le contrat soumis au visa doit être celui imprimé depuis la plateforme TAECHIR (modèle fixé par arrêté). Ce document vous sert à arrêter les conditions avec le candidat et à préparer la saisie de l\'étape 4 « Données Contrat ».' });
  }

  if (!c.salaireBrut.trim()) {
    alertes.push({ niveau: 'attention', texte: 'Indiquez le salaire : il doit être au moins égal au SMIG (ou SMAG) en vigueur.' });
  }
  return alertes;
}

function ancienneteTexte(cat: Categorie): string {
  const [a, b, c] = PREAVIS[cat];
  return `${a} pour une ancienneté inférieure à un an, ${b} de un à cinq ans, et ${c} au-delà de cinq ans`;
}

export function genererContrat(c: ContratInput): DocGenere {
  const cdi = c.type === 'cdi';
  const catLabel = CATEGORIES.find((x) => x.id === c.categorie)!.label.toLowerCase();
  const motif = MOTIFS_CDD.find((m) => m.id === c.motifCdd)!;
  const blocs: Bloc[] = [];

  blocs.push({
    titre: 'Entre les soussignés',
    paragraphes: [
      `La société ${v(c.employeurNom)}, ${v(c.employeurForme, 8)}, dont le siège est situé ${v(c.employeurAdresse, 40)}, immatriculée au registre du commerce sous le n° ${v(c.employeurRc, 12)}, ICE n° ${v(c.employeurIce, 15)}, affiliée à la CNSS sous le n° ${v(c.employeurCnss, 12)}, représentée par ${v(c.representantNom)}, en sa qualité de ${v(c.representantQualite, 12)},`,
      'ci-après dénommée « l\'Employeur », d\'une part,',
      `Et ${v(c.salarieNom)}, de nationalité ${v(c.salarieNationalite, 14)}, né(e) le ${v(dateFr(c.salarieNaissance), 14)}, titulaire de ${v(c.salariePiece, 30)}, demeurant ${v(c.salarieAdresse, 40)},`,
      'ci-après dénommé(e) « le Salarié », d\'autre part.',
      'Il a été convenu et arrêté ce qui suit, conformément aux dispositions de la loi n° 65-99 relative au Code du travail.',
    ],
  });

  let n = 1;
  const art = (titre: string, paragraphes: string[]) => blocs.push({ titre: `Article ${n++} — ${titre}`, paragraphes });

  art('Engagement', [
    cdi
      ? `L'Employeur engage le Salarié par contrat de travail à durée indéterminée, au poste de ${v(c.poste)}, catégorie ${catLabel}.`
      : `L'Employeur engage le Salarié par contrat de travail à durée déterminée, au poste de ${v(c.poste)}, catégorie ${catLabel}.`,
    'Le Salarié déclare n\'être lié à aucun autre employeur par un engagement incompatible avec le présent contrat.',
  ]);

  if (!cdi) {
    const remplace = c.motifCdd === 'remplacement' && c.salarieRemplace.trim() ? ` (${c.salarieRemplace.trim()})` : '';
    const lignes = [
      `Le présent contrat est conclu, conformément aux articles 16 et 17 du Code du travail, pour ${motif.texte}${remplace}.`,
      `Il prend effet le ${v(dateFr(c.dateDebut), 14)} et prend fin le ${v(dateFr(c.dateFin), 14)}, sans qu'aucune formalité ne soit nécessaire.`,
    ];
    if (c.motifCdd === 'nouvelle_activite') {
      lignes.push('Il peut être renouvelé une seule fois pour une durée maximale d\'un an. S\'il se poursuit au-delà, il devient un contrat à durée indéterminée.');
    }
    art('Motif et durée du contrat', lignes);
  } else {
    art('Date d\'effet', [
      c.etranger
        ? 'Le présent contrat prend effet à la date du visa apposé par l\'autorité gouvernementale chargée du travail.'
        : `Le présent contrat prend effet le ${v(dateFr(c.dateDebut), 14)}.`,
    ]);
  }

  const max = essaiMax(c);
  const essai = c.essaiJours.trim() ? `${c.essaiJours.trim()} jours` : max ? max.libelle : '..........';
  const essaiLignes = [
    `Le présent contrat ne devient définitif qu'à l'issue d'une période d'essai de ${essai}${cdi && c.essaiRenouvelable ? ', renouvelable une fois pour une durée identique' : ''} (article 14 du Code du travail).`,
    'Pendant cette période, chacune des parties peut rompre le contrat sans préavis ni indemnité, sous réserve des dispositions de l\'article 13 du Code du travail.',
  ];
  art('Période d\'essai', essaiLignes);

  art('Lieu de travail', [
    `Le Salarié exerce ses fonctions à ${v(c.lieuTravail)}.`,
    ...(c.clauseMobilite
      ? ['Compte tenu de la nature de ses fonctions, le Salarié accepte d\'être affecté dans un autre établissement de l\'Employeur situé au Maroc, dans le respect d\'un délai de prévenance raisonnable et sans modification de sa rémunération ni de sa qualification.']
      : []),
  ]);

  art('Durée du travail', [
    `La durée hebdomadaire de travail est fixée à ${v(c.heuresHebdo, 4)} heures, dans la limite de la durée légale (article 184 du Code du travail). Les horaires sont ceux affichés dans l'entreprise. Les heures supplémentaires éventuelles sont rémunérées dans les conditions prévues par la loi.`,
  ]);

  art('Rémunération', [
    `En contrepartie de son travail, le Salarié perçoit un salaire mensuel brut de ${v(c.salaireBrut, 10)} dirhams, payable mensuellement, sous déduction des cotisations sociales et de l'impôt sur le revenu.`,
    ...(c.avantages.trim() ? [`Le Salarié bénéficie en outre des avantages suivants : ${c.avantages.trim()}.`] : []),
    'Le Salarié est affilié à la Caisse Nationale de Sécurité Sociale (CNSS) dès son embauche.',
  ]);

  art('Congés payés', [
    'Le Salarié bénéficie d\'un congé annuel payé d\'au moins un jour et demi ouvrable par mois de service effectif (article 231 du Code du travail), ainsi que des jours fériés et congés exceptionnels prévus par la loi.',
  ]);

  art('Obligations du Salarié', [
    'Le Salarié s\'engage à respecter le règlement intérieur de l\'entreprise, les consignes de travail ainsi que les règles d\'hygiène et de sécurité.',
    ...(c.clauseConfidentialite
      ? ['Il est tenu, pendant toute la durée du contrat et après sa cessation, à une obligation de discrétion et de confidentialité sur les informations dont il a connaissance dans l\'exercice de ses fonctions.']
      : []),
    ...(c.clauseExclusivite
      ? ['Pendant la durée du contrat, le Salarié s\'engage à ne pas exercer d\'activité professionnelle concurrente de celle de l\'Employeur sans son accord écrit préalable.']
      : []),
  ]);

  if (cdi) {
    art('Rupture du contrat', [
      `Après la période d'essai, chacune des parties peut mettre fin au contrat sous réserve de respecter un préavis, sauf faute grave. Pour la catégorie du Salarié, le préavis est de ${ancienneteTexte(c.categorie)}, sauf dispositions plus favorables d'une convention collective, du règlement intérieur ou de l'usage (article 43 du Code du travail et décret n° 2-04-469).`,
      'Le licenciement obéit aux règles de forme et de fond prévues par le Code du travail.',
    ]);
  } else {
    art('Rupture anticipée', [
      'Hors période d\'essai, le contrat ne peut être rompu avant son terme qu\'en cas de faute grave, de force majeure ou d\'accord des parties. Toute autre rupture anticipée ouvre droit, pour l\'autre partie, à des dommages-intérêts (article 33 du Code du travail).',
    ]);
  }

  if (c.etranger) {
    art('Dispositions propres au salarié étranger', [
      'Le présent contrat est soumis au visa de l\'autorité gouvernementale chargée du travail, conformément aux articles 516 et suivants du Code du travail. La date du visa est la date à laquelle il prend effet, et le Salarié ne peut commencer à travailler avant son obtention.',
      'Toute modification du présent contrat est également soumise au visa.',
      'En cas de refus du visa, l\'Employeur s\'engage à prendre en charge les frais de retour du Salarié vers son pays d\'origine ou de résidence.',
      'Le Salarié s\'engage à accomplir les formalités relatives à son titre de séjour et à en communiquer une copie à l\'Employeur.',
    ]);
  }

  art('Fin du contrat', [
    'À la cessation du contrat, l\'Employeur remet au Salarié un certificat de travail dans un délai maximum de huit jours (article 72 du Code du travail).',
  ]);

  art('Dispositions finales', [
    'Pour tout ce qui n\'est pas prévu au présent contrat, les parties se réfèrent au Code du travail, aux textes pris pour son application et, le cas échéant, à la convention collective applicable.',
    `Fait à ${v(c.villeSignature, 14)}, le ${v(dateFr(c.dateSignature), 14)}, en deux exemplaires originaux${c.etranger ? ' (et autant d\'exemplaires que requis pour le visa)' : ''}, dont un remis au Salarié.`,
  ]);

  return {
    titre: cdi ? 'Contrat de travail à durée indéterminée' : 'Contrat de travail à durée déterminée',
    sousTitre: c.etranger ? 'Salarié étranger — projet préparatoire au contrat visé (TAECHIR)' : undefined,
    blocs,
    signatures: ['L\'Employeur\n(signature légalisée et cachet)', 'Le Salarié\n(précédée de « Lu et approuvé », signature légalisée)'],
  };
}

/* ---------- Modèles de documents courts ---------- */

export type ChampModele = { id: string; label: string; type?: 'text' | 'date' | 'textarea'; placeholder?: string };
export type Modele = {
  id: string;
  titre: string;
  description: string;
  source?: string;
  champs: ChampModele[];
  generer: (f: Record<string, string>) => DocGenere;
};

const enTeteEmployeur = (f: Record<string, string>) =>
  `${v(f.employeur)}\n${v(f.adresseEmployeur, 30)}`;

export const MODELES: Modele[] = [
  {
    id: 'attestation-travail',
    titre: 'Attestation de travail',
    description: 'Atteste qu\'un salarié est toujours en poste (banque, carte de séjour, location…).',
    champs: [
      { id: 'employeur', label: 'Raison sociale' },
      { id: 'adresseEmployeur', label: 'Adresse de l\'employeur' },
      { id: 'cnss', label: 'N° d\'affiliation CNSS' },
      { id: 'signataire', label: 'Nom et qualité du signataire' },
      { id: 'salarie', label: 'Nom du salarié' },
      { id: 'piece', label: 'Pièce d\'identité (passeport, carte de séjour, CIN)' },
      { id: 'poste', label: 'Poste occupé' },
      { id: 'dateEntree', label: 'Date d\'entrée', type: 'date' },
      { id: 'ville', label: 'Fait à' },
      { id: 'date', label: 'Le', type: 'date' },
    ],
    generer: (f) => ({
      titre: 'Attestation de travail',
      sousTitre: enTeteEmployeur(f),
      blocs: [
        {
          paragraphes: [
            `Je soussigné(e), ${v(f.signataire, 30)}, agissant pour le compte de ${v(f.employeur)}, affiliée à la CNSS sous le n° ${v(f.cnss, 12)}, atteste que :`,
            `${v(f.salarie)}, titulaire de ${v(f.piece, 30)}, est employé(e) au sein de notre société depuis le ${v(dateFr(f.dateEntree), 14)} en qualité de ${v(f.poste)}, et fait toujours partie de nos effectifs à ce jour.`,
            'La présente attestation est délivrée à l\'intéressé(e), sur sa demande, pour servir et valoir ce que de droit.',
            `Fait à ${v(f.ville, 14)}, le ${v(dateFr(f.date), 14)}.`,
          ],
        },
      ],
      signatures: ['Signature et cachet de l\'employeur'],
    }),
  },
  {
    id: 'certificat-travail',
    titre: 'Certificat de travail',
    description: 'Obligatoire à la fin de tout contrat, à remettre dans les 8 jours (art. 72).',
    source: 'Article 72 du Code du travail',
    champs: [
      { id: 'employeur', label: 'Raison sociale' },
      { id: 'adresseEmployeur', label: 'Adresse de l\'employeur' },
      { id: 'signataire', label: 'Nom et qualité du signataire' },
      { id: 'salarie', label: 'Nom du salarié' },
      { id: 'postes', label: 'Poste(s) occupé(s)', type: 'textarea', placeholder: 'Ex. : Ingénieur études (2022-2024), Chef de projet (2024-2026)' },
      { id: 'dateEntree', label: 'Date d\'entrée', type: 'date' },
      { id: 'dateSortie', label: 'Date de sortie', type: 'date' },
      { id: 'ville', label: 'Fait à' },
      { id: 'date', label: 'Le', type: 'date' },
    ],
    generer: (f) => ({
      titre: 'Certificat de travail',
      sousTitre: enTeteEmployeur(f),
      blocs: [
        {
          paragraphes: [
            `Je soussigné(e), ${v(f.signataire, 30)}, agissant pour le compte de ${v(f.employeur)}, certifie que :`,
            `${v(f.salarie)} a été employé(e) au sein de notre société du ${v(dateFr(f.dateEntree), 14)} au ${v(dateFr(f.dateSortie), 14)}, en qualité de : ${v(f.postes, 30)}.`,
            'L\'intéressé(e) nous quitte libre de tout engagement.',
            'Le présent certificat est délivré conformément à l\'article 72 du Code du travail.',
            `Fait à ${v(f.ville, 14)}, le ${v(dateFr(f.date), 14)}.`,
          ],
        },
      ],
      signatures: ['Signature et cachet de l\'employeur'],
    }),
  },
  {
    id: 'demande-anapec',
    titre: 'Demande d\'attestation d\'activité ANAPEC',
    description: 'Lettre au Directeur Général de l\'ANAPEC, première pièce du dossier (cas « Normal »).',
    source: 'Brochure officielle : pièces à fournir pour l\'attestation ANAPEC',
    champs: [
      { id: 'employeur', label: 'Raison sociale' },
      { id: 'adresseEmployeur', label: 'Adresse de l\'employeur' },
      { id: 'signataire', label: 'Nom et qualité du signataire' },
      { id: 'salarie', label: 'Nom du candidat étranger' },
      { id: 'nationalite', label: 'Nationalité' },
      { id: 'poste', label: 'Poste proposé' },
      { id: 'nature', label: 'Nature de la demande', placeholder: 'première demande / renouvellement' },
      { id: 'ville', label: 'Fait à' },
      { id: 'date', label: 'Le', type: 'date' },
    ],
    generer: (f) => {
      const renouv = /renouv/i.test(f.nature || '');
      return {
        titre: renouv ? 'Demande de renouvellement d\'attestation d\'activité' : 'Demande d\'attestation d\'activité',
        sousTitre: `${enTeteEmployeur(f)}\n\nÀ Monsieur le Directeur Général de l'ANAPEC`,
        blocs: [
          {
            paragraphes: [
              `Objet : ${renouv ? 'renouvellement de l\'attestation d\'activité' : 'demande d\'attestation d\'activité'} — recrutement de ${v(f.salarie)} (${v(f.nationalite, 12)}) au poste de ${v(f.poste)}.`,
              'Monsieur le Directeur Général,',
              renouv
                ? `Nous avons l'honneur de solliciter le renouvellement de l'attestation d'activité délivrée pour ${v(f.salarie)}, qui occupe au sein de notre société le poste de ${v(f.poste)}, en vue de la demande de visa de son contrat de travail auprès du Ministère chargé du travail.`
                : `Nous avons l'honneur de solliciter la délivrance d'une attestation d'activité en vue du recrutement de ${v(f.salarie)}, de nationalité ${v(f.nationalite, 12)}, au poste de ${v(f.poste)}, préalable à la demande de visa de son contrat de travail sur la plateforme TAECHIR.`,
              renouv
                ? 'Vous trouverez ci-joint la copie de la dernière attestation délivrée par l\'ANAPEC et la copie du dernier contrat de travail d\'étranger visé.'
                : 'Vous trouverez ci-joint : la copie certifiée conforme des références professionnelles (diplômes et/ou certificats de travail), le CV du candidat, la fiche d\'identification de l\'employeur, la fiche descriptive du poste et, pour un emploi standard, le modèle d\'annonce ANAPEC.',
              'Nous vous prions d\'agréer, Monsieur le Directeur Général, l\'expression de notre haute considération.',
              `Fait à ${v(f.ville, 14)}, le ${v(dateFr(f.date), 14)}.`,
            ],
          },
        ],
        signatures: [`${v(f.signataire, 30)}\nSignature et cachet`],
      };
    },
  },
  {
    id: 'maintien-age',
    titre: 'Demande de maintien au-delà de la limite d\'âge',
    description: 'À introduire avant la demande de visa pour un salarié ayant atteint l\'âge de la retraite (art. 526).',
    source: 'Brochure officielle — article 526 du Code du travail',
    champs: [
      { id: 'employeur', label: 'Raison sociale' },
      { id: 'adresseEmployeur', label: 'Adresse de l\'employeur' },
      { id: 'cnss', label: 'N° d\'affiliation CNSS' },
      { id: 'signataire', label: 'Nom et qualité du signataire' },
      { id: 'salarie', label: 'Nom du salarié' },
      { id: 'naissance', label: 'Date de naissance', type: 'date' },
      { id: 'poste', label: 'Poste occupé' },
      { id: 'duree', label: 'Durée de maintien souhaitée', placeholder: 'Ex. : 2 ans' },
      { id: 'ville', label: 'Fait à' },
      { id: 'date', label: 'Le', type: 'date' },
    ],
    generer: (f) => ({
      titre: 'Demande de maintien en activité',
      sousTitre: `${enTeteEmployeur(f)}\n\nÀ l'autorité gouvernementale chargée du travail`,
      blocs: [
        {
          paragraphes: [
            `Objet : demande de maintien en activité de ${v(f.salarie)} au-delà de la limite d'âge (article 526 du Code du travail).`,
            `Nous avons l'honneur de solliciter l'autorisation de maintenir en activité ${v(f.salarie)}, né(e) le ${v(dateFr(f.naissance), 14)}, occupant au sein de notre société (CNSS n° ${v(f.cnss, 12)}) le poste de ${v(f.poste)}, pour une durée de ${v(f.duree, 10)}.`,
            'Cette demande est présentée avec le consentement de l\'intéressé(e), qui la contresigne, et préalablement à la demande de visa de son contrat de travail.',
            'Nous vous prions d\'agréer l\'expression de notre haute considération.',
            `Fait à ${v(f.ville, 14)}, le ${v(dateFr(f.date), 14)}.`,
          ],
        },
      ],
      signatures: [`L'Employeur — ${v(f.signataire, 20)}`, 'Le Salarié\n(« Bon pour consentement »)'],
    }),
  },
];

/* ---------- Export ---------- */

export function docEnTexte(d: DocGenere): string {
  const out: string[] = [d.titre.toUpperCase()];
  if (d.sousTitre) out.push('', d.sousTitre);
  for (const b of d.blocs) {
    out.push('');
    if (b.titre) out.push(b.titre);
    out.push(...b.paragraphes);
  }
  if (d.signatures?.length) {
    out.push('', '');
    out.push(d.signatures.map((s) => s.replace(/\n/g, ' ')).join('                    '));
  }
  return out.join('\n');
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* HTML lisible par Word : le fichier .doc s'ouvre et s'édite directement. */
export function docEnWord(d: DocGenere): string {
  const corps = d.blocs
    .map((b) => `${b.titre ? `<h2>${esc(b.titre)}</h2>` : ''}${b.paragraphes.map((p) => `<p>${esc(p)}</p>`).join('')}`)
    .join('');
  const sign = d.signatures?.length
    ? `<table width="100%" style="margin-top:48px"><tr>${d.signatures
        .map((s) => `<td valign="top" style="width:${100 / d.signatures!.length}%">${esc(s).replace(/\n/g, '<br>')}</td>`)
        .join('')}</tr></table>`
    : '';
  return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><title>${esc(d.titre)}</title>
<style>body{font-family:Calibri,Arial,sans-serif;font-size:11pt;line-height:1.4}h1{font-size:16pt;text-align:center;text-transform:uppercase}h2{font-size:11.5pt;margin-top:14pt}p{text-align:justify;margin:0 0 6pt}.st{text-align:center;color:#555;white-space:pre-line}</style></head>
<body><h1>${esc(d.titre)}</h1>${d.sousTitre ? `<p class="st">${esc(d.sousTitre).replace(/\n/g, '<br>')}</p>` : ''}${corps}${sign}</body></html>`;
}
