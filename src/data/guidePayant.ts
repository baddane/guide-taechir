/* Le guide payant : une seule source pour la page de vente, la page de
   remerciement et les routes serveur (api/guide/*). Changer le prix ici ET,
   si besoin, la variable Vercel GUIDE_PRIX_CENTIMES (qui prime côté Stripe). */

export const GUIDE = {
  id: 'guide-taechir',
  nom: 'Guide pratique TAECHIR 2026',
  titre: 'Recruter un salarié étranger au Maroc avec TAECHIR',
  edition: 'novembre 2026',
  pages: 20,
  /* Montant en centimes de la devise (MAD : 150 DH = 15000). */
  prixCentimes: 15000,
  devise: 'mad',
  prixAffiche: '150 DH',
  nomFichier: 'guide-pratique-taechir-2026.pdf',
  extrait: '/extrait-guide-taechir-2026.pdf',
  path: '/guide-complet',
} as const;

export const GUIDE_CONTENU: { titre: string; detail: string }[] = [
  { titre: 'Le cadre en une page', detail: 'Les trois autorisations à ne pas confondre, les articles 516 à 521 du Code du travail et les sanctions.' },
  { titre: 'Choisir la bonne catégorie', detail: 'Un arbre de décision et les 17 catégories dispensées de l\'ANAPEC, chacune avec son justificatif.' },
  { titre: 'L\'attestation ANAPEC', detail: 'Voie standard ou simplifiée en 48 h, frais, pièces par cas.' },
  { titre: 'TAECHIR écran par écran', detail: 'Compte employeur, six écrans de saisie, mandataire, contrat au modèle officiel, délai de 10 jours.' },
  { titre: 'Les trois listes de pièces', detail: 'Première demande, renouvellement, changement d\'employeur, à cocher.' },
  { titre: 'Apostille, légalisation, traduction', detail: 'Quel mécanisme selon le pays d\'émission, dans quel ordre, et l\'astuce qui fait gagner des semaines.' },
  { titre: 'Entrée et séjour', detail: 'Visa consulaire, limites de l\'e-Visa, règle des 90 jours, carte d\'immatriculation.' },
  { titre: 'Cinq cas pratiques', detail: 'Technicien en mission de 2 à 3 mois, cadre détaché, gérant associé, renouvellement, conjoint de Marocain.' },
  { titre: 'Après le visa', detail: 'CNSS, avenants, rupture anticipée, frais de retour, limite d\'âge.' },
  { titre: 'Rétroplanning et 12 erreurs', detail: 'Combien de temps prévoir et ce qui fait perdre des semaines.' },
  { titre: 'Checklists et 5 modèles de lettres', detail: 'Demande motivée de mission courte, lettre de détachement, ordre de mission, demande ANAPEC, procuration.' },
];
