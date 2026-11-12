/**
 * E-mail de bienvenue envoyé automatiquement à un NOUVEAU contact
 * (inscription newsletter ou formulaire checklist / simulateur).
 *
 * Déclenché par /api/subscribe, uniquement quand Brevo vient de CRÉER le
 * contact (HTTP 201). Une adresse déjà connue ne reçoit rien : pas de doublon
 * si le visiteur remplit deux formulaires, et pas de moyen de faire envoyer
 * des e-mails en boucle à une adresse tierce.
 *
 * Règles tenues :
 *  - aucune affirmation réglementaire chiffrée : le message renvoie vers les
 *    pages du site, qui portent leurs sources ;
 *  - une seule offre payante, le guide (150 DH), présentée après les
 *    ressources gratuites ;
 *  - jamais d'appel ni de WhatsApp : tout se fait par e-mail.
 */

import { brandedShell, escapeHtml } from './email.js';

const SITE = 'https://www.guide-taechir.org';
const UTM = 'utm_source=bienvenue&utm_medium=email';

/* Doit rester égal à src/data/guidePayant.ts (prixAffiche, pages). */
const GUIDE_PRIX = '150 DH';
const GUIDE_PAGES = 20;

const RESSOURCES: { titre: string; href: string; detail: string }[] = [
  {
    titre: 'La checklist TAECHIR 2026 (PDF)',
    href: `${SITE}/checklist-taechir-2026.pdf`,
    detail: 'Toutes les étapes et pièces du dossier, à imprimer et cocher.',
  },
  {
    titre: 'Documents utiles',
    href: `${SITE}/documents-utiles?${UTM}`,
    detail: 'Les modèles et formulaires officiels, rassemblés au même endroit.',
  },
  {
    titre: 'Les articles du blog',
    href: `${SITE}/blog?${UTM}`,
    detail: 'Catégories dispensées de l\'ANAPEC, renouvellement, délais, erreurs fréquentes.',
  },
];

const btn = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:#4f46e5;color:#ffffff;padding:12px 22px;border-radius:8px;font-weight:700;text-decoration:none;">${escapeHtml(label)}</a>`;

export function bienvenueSujet(): string {
  return 'Bienvenue sur Guide-Taechir.org : vos ressources pour le dossier';
}

export function bienvenueHtml(): string {
  const liste = RESSOURCES.map(
    (r) => `<li style="margin:0 0 10px;"><a href="${r.href}" style="color:#4f46e5;font-weight:700;text-decoration:none;">${escapeHtml(r.titre)}</a><br /><span style="color:#475569;">${escapeHtml(r.detail)}</span></li>`,
  ).join('');

  const contenu = `
<h1 style="font-size:22px;line-height:1.3;margin:0 0 14px;color:#0f172a;">Bienvenue, et merci de votre confiance.</h1>
<p style="margin:0 0 16px;">Vous recevrez nos mises à jour sur la procédure TAECHIR quand un texte, un formulaire ou une pratique change. En attendant, voici l'essentiel pour avancer sur votre dossier.</p>
<h2 style="font-size:17px;margin:22px 0 10px;color:#0f172a;">Les ressources gratuites</h2>
<ul style="margin:0 0 8px;padding-left:20px;">${liste}</ul>
<div style="margin:26px 0 8px;padding:20px 22px;border:1px solid #c7d2fe;background:#eef2ff;border-radius:10px;">
  <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#4338ca;font-weight:700;margin-bottom:8px;">Pour aller jusqu'au visa</div>
  <p style="margin:0 0 10px;"><strong>Guide pratique TAECHIR 2026</strong> (PDF de ${GUIDE_PAGES} pages, ${GUIDE_PRIX}, téléchargement immédiat) : choisir la bonne catégorie, remplir TAECHIR écran par écran, les trois listes de pièces, apostille et traduction, cinq cas pratiques, douze erreurs à éviter et cinq modèles de lettres.</p>
  <p style="margin:0 0 14px;color:#475569;">Un extrait gratuit est disponible sur la page du guide.</p>
  ${btn(`${SITE}/guide-complet?${UTM}`, `Voir le guide · ${GUIDE_PRIX}`)}
</div>
<p style="margin:22px 0 0;color:#475569;">Vous préférez confier le dossier ? Répondez à cet e-mail avec le mot <strong>OUI</strong> et votre ville : nous vous mettons en relation, gratuitement et sans engagement, avec un cabinet partenaire qui le monte pour vous.</p>
<p style="margin:18px 0 0;">L'équipe Guide-Taechir.org</p>
<p style="margin:14px 0 0;font-size:12px;color:#94a3b8;">Vous recevez ce message car vous vous êtes inscrit sur Guide-Taechir.org. Pour ne plus recevoir nos e-mails, répondez « Désinscription ».</p>`;

  return brandedShell(contenu, 'Bienvenue');
}

export function bienvenueTexte(): string {
  return [
    'Bienvenue sur Guide-Taechir.org, et merci de votre confiance.',
    '',
    "Vous recevrez nos mises à jour sur la procédure TAECHIR. En attendant, voici l'essentiel :",
    '',
    ...RESSOURCES.map((r) => `- ${r.titre} : ${r.href}`),
    '',
    `Pour aller jusqu'au visa : Guide pratique TAECHIR 2026 (PDF de ${GUIDE_PAGES} pages, ${GUIDE_PRIX}) — ${SITE}/guide-complet?${UTM}`,
    '',
    'Vous préférez confier le dossier ? Répondez OUI à cet e-mail avec votre ville : nous vous',
    'mettons en relation, gratuitement et sans engagement, avec un cabinet partenaire.',
    '',
    "L'équipe Guide-Taechir.org",
  ].join('\n');
}
