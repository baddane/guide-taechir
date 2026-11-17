/* Bandeau « plateforme TAECHIR hors service ».

   Interrupteur unique : le workflow .github/workflows/verifier-taechir.yml
   le repasse automatiquement à `false` (sur main) dès que la plateforme
   officielle répond de nouveau, puis se désactive. Ne pas renommer la
   constante ni changer le format de la ligne : le workflow la modifie par
   remplacement de texte. */
export const PANNE_TAECHIR_ACTIVE = true;

/* Date de signalement de la panne (affichée dans le bandeau). */
export const PANNE_TAECHIR_DEPUIS = '17 novembre 2026';

/* Adresse du siège du ministère pour l'envoi en recommandé.
   Vérifiée le 17/11/2026 : concordance de trois annuaires publics
   (Telecontact, canal212.ma, OIC-OSHNET) ; le site officiel
   miepeec.gov.ma n'était pas consultable depuis nos outils ce jour-là. */
export const MINISTERE_DESTINATAIRE = [
  'Ministère de l\'Inclusion économique, de la Petite entreprise, de l\'Emploi et des Compétences',
  'Direction de l\'Emploi — Contrats de travail d\'étrangers',
  'Rue Al Jommayz, Hay Riad',
  'Rabat — Maroc',
];
