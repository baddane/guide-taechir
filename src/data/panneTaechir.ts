/* Bandeau « plateforme TAECHIR hors service ».

   Interrupteur unique : le workflow .github/workflows/verifier-taechir.yml
   le repasse automatiquement à `false` (sur main) dès que la plateforme
   officielle répond de nouveau, puis se désactive. Ne pas renommer la
   constante ni changer le format de la ligne : le workflow la modifie par
   remplacement de texte. */
export const PANNE_TAECHIR_ACTIVE = true;

/* Date de signalement de la panne (affichée dans le bandeau). */
export const PANNE_TAECHIR_DEPUIS = '17 novembre 2026';

/* Solution de contournement annoncée par le ministère de l'Emploi et du
   Dialogue social (communiqué publié sur sa page Facebook officielle le
   19/11/2026) : salle d'ordinateurs au siège, sur rendez-vous par e-mail,
   pour saisir les contrats via le serveur interne de TAECHIR ; dépôt ensuite
   aux guichets habituels. Le numéro est celui du ministère, publié dans le
   communiqué ; ajouté à la demande explicite de BADDANE (19/11/2026). */
export const MINISTERE_NOM = 'Ministère de l\'Emploi et du Dialogue social';
export const SALLE_ADRESSE = 'siège du ministère, rue Al Jamiz (Al Jommayz), Hay Riad, Rabat';
export const RDV_EMAIL = 'htaouli@emploi.gov.ma';
export const RDV_CONTACT = 'chef du service de gestion des flux de la migration légale de travail';
export const RDV_TELEPHONE = '06 69 58 70 97';
export const RDV_DUREE_MAX_MIN = 60;
export const GUICHETS_DEPOT = [
  'au guichet TAECHIR d\'une direction régionale de l\'Emploi',
  'au guichet TAECHIR de l\'annexe du ministère à Hay Hassan, Rabat',
];
