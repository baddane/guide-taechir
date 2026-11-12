/**
 * Séquence « guide » : quatre e-mails sur dix jours après l'e-mail de
 * bienvenue (lib/bienvenue.ts), pour les nouveaux contacts de la liste Brevo
 * du site. But : mener vers le Guide pratique TAECHIR 2026 (150 DH).
 *
 *   J+2  où en est votre dossier ? (question fermée) + ressources gratuites
 *   J+4  ce que contient le guide (sommaire de la page de vente) + extrait
 *   J+7  pourquoi un guide : méthode, modèles prêts, mises à jour, facture
 *   J+10 dernier message : trois options, dont la mise en relation cabinet
 *
 * Règles tenues : aucune affirmation réglementaire nouvelle (le sommaire est
 * repris tel quel de src/data/guidePayant.ts, déjà publié sur la page de
 * vente) ; aucune urgence inventée ; jamais d'appel ni de WhatsApp.
 */

import { GUIDE, GUIDE_CONTENU } from '../src/data/guidePayant.js';

export const SITE = 'https://www.guide-taechir.org';
/** Attribut Brevo (nombre) : dernière étape envoyée. 99 = sortie (achat, désinscription). */
export const ATTR_SEQ_GUIDE = 'SEQ_GUIDE';
export const SEQ_SORTIE = 99;

export interface EtapeGuide {
  etape: number;
  jour: number;
  objet: string;
  /** Markdown (lib/email.ts : markdownToHtml / markdownToText). */
  corps: string;
}

export function utm(etape: number): string {
  return `utm_source=sequence&utm_medium=email&utm_campaign=sequence-guide&utm_content=e${etape}`;
}

const SIGNATURE = "L'équipe Guide-Taechir.org";
const lienGuide = (e: number) => `${SITE}${GUIDE.path}?${utm(e)}`;

export const ETAPES_GUIDE: EtapeGuide[] = [
  {
    etape: 1,
    jour: 2,
    objet: 'Où en est votre dossier TAECHIR ?',
    corps: `Bonjour,

Il y a quelques jours, vous avez rejoint Guide-Taechir.org. Pour que nos prochains envois vous servent vraiment, une seule question :

**votre dossier est-il une première demande, un renouvellement ou un changement d'employeur ?**

Répondez simplement à cet e-mail, en une ligne. Et si vous ne l'avez pas encore fait, la [checklist TAECHIR 2026](${SITE}/checklist?${utm(1)}) rassemble toutes les étapes et les pièces du dossier, à imprimer et cocher.

${SIGNATURE}`,
  },
  {
    etape: 2,
    jour: 4,
    objet: `Ce que contient le ${GUIDE.nom}`,
    corps: `Bonjour,

La checklist dit quoi fournir. Le **${GUIDE.nom}** vous accompagne de la catégorie à choisir jusqu'au visa. Voici son sommaire :

${GUIDE_CONTENU.map((c) => `- **${c.titre}** : ${c.detail}`).join('\n')}

PDF de ${GUIDE.pages} pages, édition ${GUIDE.edition}, ${GUIDE.prixAffiche}, téléchargement immédiat. Un extrait gratuit est disponible sur la page du guide.

[Voir le guide · ${GUIDE.prixAffiche}](${lienGuide(2)})

${SIGNATURE}`,
  },
  {
    etape: 3,
    jour: 7,
    objet: 'Pourquoi un guide plutôt que des recherches éparses',
    corps: `Bonjour,

Sur un dossier TAECHIR, une pièce manquante ou une mauvaise catégorie se paie en semaines. Le guide a été conçu pour éviter ces allers-retours :

- **Un seul document** au lieu de dizaines de pages officielles, de forums et d'avis contradictoires.
- **Des outils prêts à l'emploi** : checklists à cocher, rétroplanning et cinq modèles de lettres.
- **Mises à jour incluses** : votre lien de téléchargement donne toujours la dernière édition.
- **Facture au nom de votre entreprise**, pour passer l'achat en charge.

[Voir le guide · ${GUIDE.prixAffiche}](${lienGuide(3)})

${SIGNATURE}`,
  },
  {
    etape: 4,
    jour: 10,
    objet: 'Dernier message de cette série',
    corps: `Bonjour,

C'est le dernier e-mail de cette courte série. Selon où vous en êtes, trois options :

1. **Vous avancez seul, pas à pas** : les [documents utiles](${SITE}/documents-utiles?${utm(4)}) et les [articles du blog](${SITE}/blog?${utm(4)}), gratuits.
2. **Vous voulez tout avoir en main** : le [${GUIDE.nom}](${lienGuide(4)}), ${GUIDE.prixAffiche}, téléchargement immédiat.
3. **Vous préférez confier le dossier** : répondez à cet e-mail avec le mot **OUI** et votre ville. Nous vous mettons en relation, gratuitement et sans engagement, avec un cabinet partenaire qui le monte pour vous.

Vous continuerez à recevoir nos mises à jour sur la procédure. Une question ? Répondez simplement à cet e-mail.

${SIGNATURE}`,
  },
];

/** Étape suivante si elle est due ; une seule à la fois, dans l'ordre. */
export function etapeGuideDue(ageJours: number, derniere: number): EtapeGuide | undefined {
  const suivante = ETAPES_GUIDE.find((e) => e.etape === derniere + 1);
  return suivante && ageJours >= suivante.jour ? suivante : undefined;
}
