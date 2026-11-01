/* Pré-rendu SEO, exécuté après `vite build`.

   Le site est une SPA : sans ce script, Vercel sert le même index.html
   pour toutes les URL, donc le même <title>, la même description, le même
   JSON-LD (FAQ de l'accueil) et surtout un canonical pointant vers « / »
   sur chaque page — ce qui invite Google à les traiter comme des doublons
   de l'accueil.

   Pour chaque page publique et chaque article, on écrit
   dist/<chemin>/index.html avec ses propres balises, et on régénère
   dist/sitemap.xml à partir de la même liste (fini les entrées oubliées
   ou les URL à ancre). Le <body> n'est pas modifié, sauf un <noscript>
   reprenant le titre et la description pour les robots sans JavaScript.

   Lancement : npm run build (enchaîné automatiquement). */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { STATIC_PAGES, articleMeta, PageMeta, SITE_URL, OG_IMAGE } from '../src/seo/meta';
import { articles } from '../src/blog/articles';

const DIST = join(process.cwd(), 'dist');
const template = readFileSync(join(DIST, 'index.html'), 'utf8');

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function remplacer(html: string, motif: RegExp, valeur: string, quoi: string): string {
  if (!motif.test(html)) throw new Error(`prerender : balise introuvable dans index.html (${quoi})`);
  return html.replace(motif, valeur);
}

function render(meta: PageMeta): string {
  const url = `${SITE_URL}${meta.path === '/' ? '/' : meta.path}`;
  const t = esc(meta.title);
  const d = esc(meta.description);
  let h = template;
  h = remplacer(h, /<title>[\s\S]*?<\/title>/, `<title>${t}</title>`, 'title');
  h = remplacer(h, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${d}" />`, 'description');
  h = remplacer(h, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`, 'canonical');
  h = remplacer(h, /<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${meta.ogType ?? 'website'}" />`, 'og:type');
  h = remplacer(h, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${t}" />`, 'og:title');
  h = remplacer(h, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${d}" />`, 'og:description');
  h = remplacer(h, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`, 'og:url');
  h = remplacer(h, /<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${OG_IMAGE}" />`, 'og:image');
  h = remplacer(h, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${t}" />`, 'twitter:title');
  h = remplacer(h, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${d}" />`, 'twitter:description');
  // `<` échappé : un JSON-LD ne doit jamais pouvoir fermer sa balise <script>.
  const ld = meta.jsonLd ? JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c') : '';
  h = remplacer(
    h,
    /<script type="application\/ld\+json" id="page-jsonld">[\s\S]*?<\/script>/,
    ld ? `<script type="application/ld+json" id="page-jsonld">${ld}</script>` : '',
    'JSON-LD',
  );
  const repli = `<noscript><h1>${esc(meta.h1 ?? meta.title)}</h1><p>${d}</p><p><a href="${SITE_URL}/">Guide-Taechir.org</a></p></noscript>`;
  h = remplacer(h, /<div id="root"><\/div>/, `<div id="root"></div>\n    ${repli}`, '#root');
  return h;
}

const pages: PageMeta[] = [...STATIC_PAGES, ...articles.map(articleMeta)];

for (const meta of pages) {
  const fichier = meta.path === '/' ? join(DIST, 'index.html') : join(DIST, meta.path, 'index.html');
  mkdirSync(dirname(fichier), { recursive: true });
  writeFileSync(fichier, render(meta));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter((p) => !p.noindex)
  .map((p) => `  <url>
    <loc>${SITE_URL}${p.path === '/' ? '/' : p.path}</loc>${p.lastmod ? `\n    <lastmod>${p.lastmod}</lastmod>` : ''}${p.changefreq ? `\n    <changefreq>${p.changefreq}</changefreq>` : ''}${p.priority !== undefined ? `\n    <priority>${p.priority.toFixed(1)}</priority>` : ''}
  </url>`)
  .join('\n')}
</urlset>
`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);

const sansDate = articles.filter((a) => !articleMeta(a).lastmod).map((a) => a.slug);
console.log(`prerender : ${pages.length} pages écrites, sitemap de ${pages.length} URL.`);
if (sansDate.length) console.warn(`prerender : date illisible pour ${sansDate.join(', ')} (lastmod omis).`);
