/* Informations officielles reprises de la brochure TAECHIR du Ministère
   (Direction de l'Emploi) : catégories de demande, étapes de saisie,
   guichets d'accueil, horaires et assistance. Une seule source pour le
   wizard, la page d'accueil et le chatbot. */

export const TAECHIR_URL = 'https://taechir.travail.gov.ma';

/* Délai maximum de réponse de l'Administration après dépôt du dossier. */
export const DELAI_REPONSE_JOURS = 10;

/* Catégories proposées au début de chaque demande. Seule la catégorie
   « Normal » exige l'attestation d'activité ANAPEC ; les autres demandent
   des pièces justificatives propres à la catégorie. */
export type CategorieDispensee = {
  id: string;
  label: string;
  hint?: string;
};

export const CATEGORIE_NORMALE = 'Normal (avec attestation d\'activité ANAPEC)';

export const CATEGORIES_DISPENSEES: CategorieDispensee[] = [
  { id: 'conjoint', label: 'Conjoint de marocain' },
  { id: 'descendant', label: 'Descendant de mère marocaine' },
  { id: 'natif', label: 'Natif du Maroc' },
  { id: 'regroupement', label: 'Regroupement familial' },
  { id: 'associe', label: 'Associé' },
  { id: 'gerant', label: 'Gérant' },
  { id: 'fonde', label: 'Fondé de pouvoir' },
  { id: 'detachement', label: 'Détachement' },
  { id: 'mission', label: 'Mission de courte durée' },
  { id: 'regularisation', label: 'Régularisation exceptionnelle' },
  { id: 'jeune', label: 'Jeune Professionnel' },
  { id: 'cfc', label: 'Casa Finance City' },
  { id: 'convention', label: 'Convention d\'établissement', hint: 'Algérie, Tunisie, Sénégal' },
  { id: 'sportif', label: 'Sportifs' },
  { id: 'apatride', label: 'Apatride' },
  { id: 'refugie', label: 'Réfugiés' },
];

/* Les 6 étapes de saisie d'une demande sur la plateforme. */
export const ETAPES_SAISIE: { titre: string; detail: string }[] = [
  {
    titre: 'Données Salarié (État civil)',
    detail: 'Identité du salarié. En renouvellement chez le même employeur, ces données sont affichées depuis la base TAECHIR : il suffit de corriger ce qui a changé (adresse, etc.).',
  },
  {
    titre: 'Données Salarié (Références professionnelles)',
    detail: 'Parcours professionnel du salarié (formation, expérience).',
  },
  {
    titre: 'Données Employeur',
    detail: 'Validées au premier dossier puis réaffichées pour les demandes suivantes. Les signataires y sont mémorisés ; une pièce justificative de pouvoir est demandée à chaque demande. Indiquez ici l\'adresse e-mail de notification (plusieurs adresses séparées par « ; »).',
  },
  {
    titre: 'Données Contrat',
    detail: 'Les données du contrat de travail proposé au salarié.',
  },
  {
    titre: 'Données Mandataire',
    detail: 'La personne désignée par l\'employeur : elle seule sera reçue au guichet pour le dépôt du dossier et le retrait des contrats visés.',
  },
  {
    titre: 'Validation et impression',
    detail: 'Imprimez le projet de contrat pour relecture, puis les contrats à signer et la liste des pièces constituant le dossier à déposer au guichet.',
  },
];

/* Ce que permet la plateforme, d'après la brochure. */
export const FONCTIONNALITES: { menu: string; items: string[] }[] = [
  {
    menu: 'Accueil',
    items: [
      'Lire les notifications liées au traitement de vos demandes',
      'Lire les messages de diffusion destinés à tous les employeurs',
    ],
  },
  {
    menu: 'S\'informer',
    items: [
      'S\'informer sur les procédures',
      'Télécharger le manuel d\'utilisation TAECHIR',
      'Questions fréquemment posées',
    ],
  },
  {
    menu: 'Présenter une demande',
    items: [
      'Créer, modifier et valider une demande',
      'Imprimer un projet de contrat pour lecture et vérification',
      'Imprimer les contrats à signer',
      'Imprimer la liste des pièces du dossier à déposer au guichet',
    ],
  },
  {
    menu: 'Suivre sa demande en ligne',
    items: [
      'Suivre le traitement des demandes déposées',
      'Consulter la liste des contrats visés',
      'Outil de recherche',
    ],
  },
  {
    menu: 'Mon compte',
    items: [
      'Corriger la dénomination de l\'employeur',
      'Changer d\'adresse e-mail',
      'Changer de mot de passe',
    ],
  },
];

/* Création du compte employeur (lien « Inscription » de l'écran de connexion). */
export const CHAMPS_INSCRIPTION = [
  'Type d\'identification (CNSS)',
  'Numéro d\'affiliation employeur',
  'Dénomination',
  'E-mail',
  'Mot de passe et confirmation',
];

export type Guichet = {
  id: string;
  nom: string;
  ville: string;
  telephone: string;
  fax?: boolean;
  note?: string;
};

export const GUICHETS: Guichet[] = [
  { id: 'rabat', nom: 'Service central (annexe Rue Tameslouht)', ville: 'Rabat', telephone: '', note: 'Fait office de guichet d\'accueil' },
  { id: 'casablanca', nom: 'Direction régionale de Casablanca', ville: 'Casablanca', telephone: '0522 25 86 60' },
  { id: 'cfca', nom: 'Guichet Casablanca CFCA', ville: 'Casablanca', telephone: '0522 84 90 00', note: 'Réservé aux sociétés ayant le statut CFC' },
  { id: 'marrakech', nom: 'Direction régionale de Marrakech', ville: 'Marrakech', telephone: '0524 44 72 71' },
  { id: 'tanger', nom: 'Direction régionale de Tanger', ville: 'Tanger', telephone: '0539 34 12 00' },
  { id: 'agadir', nom: 'Direction régionale d\'Agadir', ville: 'Agadir', telephone: '0528 82 25 12', fax: true },
];

export const HORAIRES = [
  { jours: 'Lundi – Jeudi', heures: '9 h – 13 h' },
  { jours: 'Vendredi', heures: '9 h – 12 h' },
];

export const ASSISTANCE = ['+212 5 30 10 07 05', '+212 6 74 48 03 68'];

export function telHref(numero: string): string {
  const digits = numero.replace(/[^\d+]/g, '');
  return `tel:${digits.startsWith('+') ? digits : `+212${digits.slice(1)}`}`;
}

/* ---------- Brochure « Recrutement des salariés étrangers » (MTIP / ANAPEC) ---------- */

/* Pièces à réunir pour l'attestation d'activité ANAPEC, par cas. */
export const PIECES_ANAPEC: { id: string; titre: string; delai: string; pieces: string[] }[] = [
  {
    id: 'haut-niveau',
    titre: 'Postes de haut niveau (liste A1) et profils rares (liste A2)',
    delai: 'Procédure simplifiée en 48 heures, sans publication de l\'offre',
    pieces: [
      'Demande adressée à M. le Directeur Général de l\'ANAPEC',
      'Copie certifiée conforme des références professionnelles (diplômes et/ou certificats de travail)',
      'CV du salarié étranger',
      'Fiche d\'identification de l\'employeur (modèle ANAPEC)',
      'Fiche descriptive du poste (modèle ANAPEC)',
      'Organigramme de la société (pour un directeur général)',
      'Procès-verbal de nomination (pour un directeur central)',
    ],
  },
  {
    id: 'standard',
    titre: 'Emplois standards',
    delai: 'Publication de l\'offre, réponse sous 20 jours ouvrables',
    pieces: [
      'Demande adressée à M. le Directeur Général de l\'ANAPEC',
      'Copie certifiée conforme des références professionnelles',
      'CV du salarié étranger',
      'Fiche d\'identification de l\'employeur (modèle ANAPEC)',
      'Fiche descriptive du poste (modèle ANAPEC)',
      'Modèle d\'annonce ANAPEC',
    ],
  },
  {
    id: 'renouvellement',
    titre: 'Renouvellement de l\'attestation',
    delai: 'Procédure simplifiée en 48 heures, sans publication de l\'offre',
    pieces: [
      'Demande de renouvellement adressée à M. le Directeur Général de l\'ANAPEC',
      'Copie de la dernière attestation délivrée par l\'ANAPEC',
      'Copie du dernier contrat de travail d\'étranger visé par le Ministère',
    ],
  },
];

/* Modèles officiels téléchargeables sur le site de l'ANAPEC. */
export const ANAPEC_MODELES_URL = 'https://www.anapec.org/conseils/procedure_etrangers';

/* Pièces propres à certaines catégories dispensées de l'attestation ANAPEC. */
export const PIECES_DISPENSES: { categorie: string; piece: string }[] = [
  { categorie: 'Migrants régularisés', piece: 'Titre de séjour délivré par la DGSN portant la mention « TRAVAIL »' },
  { categorie: 'Réfugiés et apatrides', piece: 'Carte portant la mention « RÉFUGIÉ » délivrée par le Bureau des Réfugiés et Apatrides (ministère des Affaires étrangères)' },
  { categorie: 'Conjoint(e) de marocain(e)', piece: 'Copie légalisée de l\'acte de mariage et copie récente de la CNI du conjoint marocain' },
  { categorie: 'Autres (associés, sportifs, artistes, natifs du Maroc…)', piece: 'Pièce justificative correspondant à la catégorie' },
];

/* Règles du contrat de travail d'étranger rappelées par la brochure. */
export const REGLES_CTE: string[] = [
  'Le contrat doit être conforme au modèle fixé par arrêté du Ministère chargé du travail : c\'est celui que vous imprimez depuis TAECHIR.',
  'La date du visa est la date à laquelle le contrat prend effet : le salarié ne travaille pas avant.',
  'Toute modification du contrat (poste, salaire, durée…) est elle aussi soumise au visa.',
  'Si le candidat se trouve déjà au Maroc, l\'employeur doit s\'assurer de la régularité de son séjour.',
  'Salarié atteint par la limite d\'âge : déposer d\'abord une demande de maintien, avec son consentement (art. 526).',
  'Salarié détaché par sa société mère : il n\'est pas obligatoirement affilié à la CNSS si un certificat d\'assujettissement du régime du pays d\'origine est produit (conventions de sécurité sociale).',
  'À l\'échéance du visa, le renouvellement se demande dans les mêmes formes que la demande initiale.',
];

/* Acronymes rencontrés dans la procédure. */
export const ACRONYMES: [string, string][] = [
  ['AMO', 'Assurance Maladie Obligatoire'],
  ['ANAPEC', 'Agence Nationale de Promotion de l\'Emploi et des Compétences'],
  ['BRA', 'Bureau des Réfugiés et Apatrides'],
  ['CDD', 'Contrat à Durée Déterminée'],
  ['CDI', 'Contrat à Durée Indéterminée'],
  ['CFC / CFCA', 'Casablanca Finance City / Casablanca Finance City Authority'],
  ['CNI', 'Carte Nationale d\'Identité'],
  ['CNSS', 'Caisse Nationale de Sécurité Sociale'],
  ['CTE', 'Contrat de Travail d\'Étranger'],
  ['DGSN', 'Direction Générale de la Sûreté Nationale (titres de séjour)'],
  ['ICE', 'Identifiant Commun de l\'Entreprise'],
  ['IR', 'Impôt sur le Revenu'],
  ['SMIG / SMAG', 'Salaire minimum (industrie, commerce, services / agriculture)'],
  ['TFP', 'Taxe de Formation Professionnelle'],
];
