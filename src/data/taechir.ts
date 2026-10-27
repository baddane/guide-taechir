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
