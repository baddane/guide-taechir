import { useEffect } from 'react';
import { PageMeta, SITE_URL, OG_IMAGE } from './meta';

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

/* Applique les balises d'une page lors d'une navigation côté client.
   Le premier chargement est déjà servi avec les bonnes balises par le
   pré-rendu (scripts/prerender.ts) : ce hook les maintient à jour quand
   on passe d'une page à l'autre sans recharger. */
export function useSeo(meta: PageMeta | null | undefined) {
  useEffect(() => {
    if (!meta) return;
    const url = `${SITE_URL}${meta.path === '/' ? '/' : meta.path}`;
    document.title = meta.title;
    if (meta.description) {
      setMeta('name', 'description', meta.description);
      setMeta('property', 'og:description', meta.description);
      setMeta('name', 'twitter:description', meta.description);
    }
    setMeta('name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMeta('property', 'og:title', meta.title);
    setMeta('name', 'twitter:title', meta.title);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', meta.ogType ?? 'website');
    setMeta('property', 'og:image', OG_IMAGE);
    setMeta('name', 'twitter:image', OG_IMAGE);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    document.getElementById('page-jsonld')?.remove();
    if (meta.jsonLd && !meta.noindex) {
      const s = document.createElement('script');
      s.id = 'page-jsonld';
      s.type = 'application/ld+json';
      s.textContent = JSON.stringify(meta.jsonLd);
      document.head.appendChild(s);
    }
  }, [meta]);
}
