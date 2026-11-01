/* Métadonnées SEO de chaque page : une seule source pour le hook
   d'exécution (useSeo) et pour le pré-rendu au build
   (scripts/prerender.ts), qui écrit un index.html par route avec le bon
   <title>, la bonne description, le canonical, l'Open Graph et le JSON-LD.
   Sans ce pré-rendu, toutes les URL servaient le <head> de l'accueil :
   même titre et canonical pointant vers « / » pour chaque page. */

import homeJsonLd from './home-jsonld.json';

export const SITE_URL = 'https://guide-taechir.org';
export const SITE_NAME = 'Guide-Taechir.org';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

export type JsonLd = Record<string, unknown>;

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: JsonLd;
  /* Pour le sitemap */
  lastmod?: string;
  changefreq?: 'weekly' | 'monthly' | 'yearly';
  priority?: number;
  /* Texte de repli placé dans #root au pré-rendu (robots sans JavaScript). */
  h1?: string;
};

const ORG_REF = { '@id': `${SITE_URL}/#organization` };

export function breadcrumb(items: [string, string][]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}

function webPage(path: string, name: string, description: string, extra: JsonLd[] = []): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}${path}#webpage`,
        url: `${SITE_URL}${path}`,
        name,
        description,
        inLanguage: 'fr-MA',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        publisher: ORG_REF,
      },
      ...extra,
    ],
  };
}

const faq = (items: [string, string][]): JsonLd => ({
  '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

/* Questions affichées sur la page Documents utiles ET balisées en FAQPage
   (Google exige que le balisage reflète un contenu visible). */
export const FAQ_DOCUMENTS: [string, string][] = [
  [
    'Quelle est la durée maximale de la période d\'essai au Maroc ?',
    'Pour un CDI, l\'article 14 du Code du travail fixe la période d\'essai à 3 mois au plus pour les cadres et assimilés, 1 mois et demi pour les employés et 15 jours pour les ouvriers ; elle peut être renouvelée une fois. Pour un CDD, elle ne peut dépasser un jour par semaine de travail, dans la limite de deux semaines pour un contrat de moins de six mois et d\'un mois au-delà.',
  ],
  [
    'Dans quels cas peut-on conclure un CDD au Maroc ?',
    'Les articles 16 et 17 du Code du travail réservent le CDD au remplacement d\'un salarié dont le contrat est suspendu, à l\'accroissement temporaire d\'activité, au travail saisonnier et, pour une durée maximale d\'un an renouvelable une fois, à l\'ouverture d\'une entreprise ou d\'un établissement nouveau ou au lancement d\'un nouveau produit. Au-delà, le contrat devient à durée indéterminée.',
  ],
  [
    'Quel préavis respecter en cas de démission ou de licenciement ?',
    'Selon le décret n° 2-04-469, le préavis d\'un cadre est de 1 mois (moins d\'un an d\'ancienneté), 2 mois (1 à 5 ans) ou 3 mois (plus de 5 ans). Pour un employé ou un ouvrier, il est de 8 jours, 1 mois ou 2 mois. Une convention collective, le règlement intérieur ou le contrat peuvent prévoir plus favorable.',
  ],
  [
    'Le contrat d\'un salarié étranger est-il différent ?',
    'Oui. Il doit être conforme au modèle fixé par arrêté et être visé par le Ministère chargé du travail (articles 516 et suivants). Le contrat est imprimé depuis la plateforme TAECHIR, il prend effet à la date du visa, toute modification est aussi soumise au visa et l\'employeur s\'engage à payer les frais de retour du salarié en cas de refus.',
  ],
  [
    'Le contrat généré par Guide-Taechir.org a-t-il une valeur juridique ?',
    'C\'est un modèle indicatif qui reprend les minima légaux du Code du travail. Il ne tient pas compte de votre convention collective ni des évolutions récentes des textes : faites-le relire par un juriste ou un expert-comptable avant signature. Pour un salarié étranger, seul le contrat imprimé depuis TAECHIR est soumis au visa.',
  ],
];

const DOCS_DESC = 'Générateur gratuit de contrat de travail CDI et CDD conforme au Code du travail marocain, avec les clauses du contrat d\'étranger (TAECHIR), plus des modèles d\'attestation et de certificat de travail et de lettre ANAPEC.';

export const STATIC_PAGES: PageMeta[] = [
  {
    path: '/',
    title: 'Programme Taechir Maroc – Guide Complet Recrutement Salarié Étranger',
    description: 'Guide complet du programme Taechir : procédure pas à pas, délais, frais ANAPEC, documents requis et simulateur pour recruter un salarié étranger au Maroc. Attestation ANAPEC, visa travail, renouvellement et changement d\'employeur expliqués.',
    jsonLd: homeJsonLd as JsonLd,
    lastmod: '2026-11-01',
    changefreq: 'weekly',
    priority: 1.0,
    h1: 'Comment embaucher un étranger au Maroc ?',
  },
  {
    path: '/documents-utiles',
    title: 'Modèle de contrat de travail CDI / CDD Maroc – Générateur gratuit',
    description: DOCS_DESC,
    lastmod: '2026-11-01',
    changefreq: 'monthly',
    priority: 0.9,
    h1: 'Modèles de contrat de travail CDI et CDD (Maroc) et documents RH',
    jsonLd: webPage('/documents-utiles', 'Modèle de contrat de travail CDI / CDD Maroc – Générateur gratuit', DOCS_DESC, [
      {
        '@type': 'WebApplication',
        name: 'Générateur de contrat de travail CDI / CDD (Maroc)',
        url: `${SITE_URL}/documents-utiles`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Tous (navigateur web)',
        inLanguage: 'fr-MA',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'MAD' },
        description: DOCS_DESC,
        publisher: ORG_REF,
      },
      breadcrumb([['Accueil', '/'], ['Documents utiles', '/documents-utiles']]),
      faq(FAQ_DOCUMENTS),
    ]),
  },
  {
    path: '/blog',
    title: 'Blog — Recrutement d\'un salarié étranger au Maroc | Guide-Taechir.org',
    description: 'Analyses et guides pratiques sur le recrutement de salariés étrangers au Maroc : TAECHIR, ANAPEC, visa de travail, CNSS, carte de séjour, fiscalité et droit du travail.',
    lastmod: '2026-11-01',
    changefreq: 'weekly',
    priority: 0.9,
    h1: 'Le blog du recrutement international au Maroc',
  },
  {
    path: '/checklist',
    title: 'Checklist gratuite du dossier TAECHIR (PDF) — Guide-Taechir.org',
    description: 'Téléchargez gratuitement la checklist complète du dossier TAECHIR 2026 : toutes les étapes et pièces pour recruter un salarié étranger au Maroc, en PDF imprimable.',
    lastmod: '2026-06-26',
    changefreq: 'monthly',
    priority: 0.7,
    h1: 'La checklist complète du dossier TAECHIR',
  },
  {
    path: '/a-propos',
    title: 'À propos — Guide-Taechir.org',
    description: 'Qui sommes-nous ? Guide-Taechir.org explique la procédure TAECHIR et le recrutement de salariés étrangers au Maroc, à partir des textes et documents officiels.',
    lastmod: '2026-02-20',
    changefreq: 'yearly',
    priority: 0.5,
    h1: 'À propos de Guide-Taechir.org',
  },
  {
    path: '/contact',
    title: 'Contact — Guide-Taechir.org',
    description: 'Contactez l\'équipe Guide-Taechir.org pour toute question sur la procédure TAECHIR, une suggestion ou une demande d\'accompagnement.',
    lastmod: '2026-02-20',
    changefreq: 'yearly',
    priority: 0.5,
    h1: 'Contact',
  },
  {
    path: '/mentions-legales',
    title: 'Mentions légales — Guide-Taechir.org',
    description: 'Mentions légales du site Guide-Taechir.org : éditeur, hébergement, propriété intellectuelle et limites de responsabilité.',
    lastmod: '2026-02-20',
    changefreq: 'yearly',
    priority: 0.2,
    h1: 'Mentions légales',
  },
  {
    path: '/politique-de-confidentialite',
    title: 'Politique de confidentialité — Guide-Taechir.org',
    description: 'Comment Guide-Taechir.org collecte, utilise et protège vos données personnelles (loi 09-08, RGPD) et gère les cookies.',
    lastmod: '2026-02-20',
    changefreq: 'yearly',
    priority: 0.2,
    h1: 'Politique de confidentialité',
  },
];

/* Pages complétées à l'exécution (pas de pré-rendu ni de sitemap). */
export const NOINDEX_PAGES: Record<string, PageMeta> = {
  '/admin': { path: '/admin', title: 'Administration — Guide-Taechir.org', description: '', noindex: true },
  notFound: { path: '/404', title: 'Page introuvable — Guide-Taechir.org', description: 'Cette page n\'existe pas ou a été déplacée.', noindex: true },
};

export function staticPage(path: string): PageMeta {
  return STATIC_PAGES.find((p) => p.path === path) ?? STATIC_PAGES[0];
}

/* Les dates des articles sont saisies en français (« 15 janvier 2026 »). */
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
export function isoDate(fr: string): string | undefined {
  if (/^\d{4}-\d{2}-\d{2}/.test(fr)) return fr.slice(0, 10);
  const m = fr.trim().toLowerCase().match(/^(\d{1,2})(?:er)?\s+([a-zéû]+)\s+(\d{4})$/);
  if (!m) return undefined;
  const mois = MOIS.indexOf(m[2]);
  if (mois < 0) return undefined;
  return `${m[3]}-${String(mois + 1).padStart(2, '0')}-${m[1].padStart(2, '0')}`;
}

type ArticleLike = { slug: string; title: string; description: string; date: string; category: string };

export function articleMeta(a: ArticleLike): PageMeta {
  const path = `/blog/${a.slug}`;
  const date = isoDate(a.date);
  return {
    path,
    title: `${a.title} — Guide-Taechir.org`,
    description: a.description,
    ogType: 'article',
    lastmod: date,
    changefreq: 'monthly',
    priority: 0.7,
    h1: a.title,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${SITE_URL}${path}#article`,
          headline: a.title,
          description: a.description,
          ...(date ? { datePublished: date, dateModified: date } : {}),
          articleSection: a.category,
          image: OG_IMAGE,
          inLanguage: 'fr-MA',
          author: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/a-propos` },
          publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/`, logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` } },
          mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${path}` },
        },
        breadcrumb([['Accueil', '/'], ['Blog', '/blog'], [a.title, path]]),
      ],
    },
  };
}
