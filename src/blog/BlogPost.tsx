import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Globe, ArrowLeft, Clock, Tag, ChevronRight, Wand2, User, AlertTriangle } from 'lucide-react';
import { getArticleBySlug, articles } from './articles';
import { Footer } from '../components/Footer';
import { LeadCapture } from '../components/LeadCapture';
import { NewsletterForm } from '../components/NewsletterForm';

const categoryColors: Record<string, string> = {
  'Guide':      'bg-indigo-50 text-indigo-700',
  'ANAPEC':     'bg-blue-50 text-blue-700',
  'Exemptions': 'bg-purple-50 text-purple-700',
  'Procédure':  'bg-emerald-50 text-emerald-700',
  'Conseils':   'bg-amber-50 text-amber-700',
  'Obligations': 'bg-red-50 text-red-700',
  'Documents':  'bg-orange-50 text-orange-700',
  'Secteurs':   'bg-cyan-50 text-cyan-700',
  'Coûts':      'bg-teal-50 text-teal-700',
  'Expatrié':   'bg-rose-50 text-rose-700',
  'Entreprise': 'bg-violet-50 text-violet-700',
  'Finance':    'bg-sky-50 text-sky-700',
  'RH':         'bg-fuchsia-50 text-fuchsia-700',
  'Recours':    'bg-lime-50 text-lime-700',
  'Rupture':    'bg-pink-50 text-pink-700',
};

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    if (article) {
      document.title = `${article.title} — Guide-Taechir.org`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', article.description);
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute('href', `https://guide-taechir.org/blog/${article.slug}`);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', article.description);
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', article.title);
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', `https://guide-taechir.org/blog/${article.slug}`);

      const existingLd = document.getElementById('article-jsonld');
      if (existingLd) existingLd.remove();
      const script = document.createElement('script');
      script.id = 'article-jsonld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        datePublished: article.date,
        dateModified: article.date,
        author: {
          '@type': 'Organization',
          name: 'Guide-Taechir.org',
          url: 'https://guide-taechir.org/a-propos',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Guide-Taechir.org',
          url: 'https://guide-taechir.org',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://guide-taechir.org/blog/${article.slug}`,
        },
        inLanguage: 'fr',
      });
      document.head.appendChild(script);
    }
    return () => {
      document.title = 'Programme Taechir Maroc – Guide Complet Recrutement Salarié Étranger';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', 'Guide complet du programme Taechir : procédure pas à pas, délais, frais ANAPEC, documents requis et simulateur pour recruter un salarié étranger au Maroc.');
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute('href', 'https://guide-taechir.org/');
      const existingLd = document.getElementById('article-jsonld');
      if (existingLd) existingLd.remove();
    };
  }, [article]);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const otherArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Guide-<span className="text-indigo-600">Taechir.org</span>
            </span>
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Guide pratique</Link>
            <Link to="/blog" className="text-indigo-600 font-semibold">Blog</Link>
            <Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Accueil</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-700 truncate max-w-xs">{article.title}</span>
        </div>
      </div>

      {/* Article header */}
      <header className="bg-white border-b border-slate-200 pt-12 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Meta row */}
          <div className="flex items-center gap-3 mb-6">
            <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[article.category] ?? 'bg-slate-50 text-slate-600'}`}>
              <Tag className="w-3 h-3" />
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" /> {article.readTime} min de lecture
            </span>
            <span className="text-xs text-slate-400">{article.date}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {article.title}
          </h1>

          {/* Description */}
          <p className="text-base text-slate-500 leading-relaxed mb-5">
            {article.description}
          </p>

          {/* Author info (E-E-A-T) */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-800">{'É'}quipe {'é'}ditoriale Guide-Taechir</p>
              <p className="text-xs text-slate-500">Sp{'é'}cialistes en droit du travail et recrutement international au Maroc {'—'} v{'é'}rifi{'é'} selon le Code du Travail (art. 516-521) et les circulaires ANAPEC</p>
            </div>
          </div>
        </div>
      </header>

      {/* Article body */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <article className="prose-custom">
          <article.Content />
        </article>

        {/* Disclaimer */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6 flex gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-amber-900 mb-2">Avertissement</h4>
            <p className="text-amber-800 text-sm leading-relaxed mb-2">
              Cet article est publi{'é'} {'à'} titre informatif par <strong>Guide-Taechir.org</strong>, un site ind{'é'}pendant non affili{'é'} au Minist{'è'}re du Travail ni {'à'} l'ANAPEC. Il ne constitue pas un conseil juridique personnalis{'é'}.
            </p>
            <p className="text-amber-800 text-sm leading-relaxed">
              Les informations sont v{'é'}rifi{'é'}es selon les textes en vigueur mais peuvent {'é'}voluer. Pour vos d{'é'}marches officielles, consultez <a href="https://taechir.travail.gov.ma" className="text-amber-700 underline font-medium">taechir.travail.gov.ma</a>.
            </p>
          </div>
        </div>

        {/* Lead magnet — formulaire sur place plutôt qu'un lien vers /checklist :
            chaque changement de page perd une partie des lecteurs. La `page`
            porte le slug, on saura donc quels articles produisent des leads. */}
        <div className="mt-10">
          <LeadCapture
            source="checklist"
            page={`blog/${article.slug}`}
            title="Checklist gratuite du dossier TAECHIR"
            description="Toutes les étapes et pièces à réunir, dans un PDF imprimable. Recevez-la sans quitter cette page."
            askCompany={false}
          />
        </div>

        {/* Newsletter — le lecteur arrivé en bas d'article est le meilleur
            candidat à l'abonnement : il vient de lire jusqu'au bout. */}
        <div className="mt-6">
          <NewsletterForm source="blog" page={`blog/${article.slug}`} />
        </div>

        {/* CTA */}
        <div className="mt-6 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-2xl p-8 text-white text-center shadow-xl shadow-indigo-100">
          <Wand2 className="w-10 h-10 mx-auto mb-4 opacity-90" />
          <h3 className="text-2xl font-bold mb-3">Pr{'ê'}t {'à'} lancer votre recrutement ?</h3>
          <p className="text-indigo-100 mb-6 max-w-md mx-auto leading-relaxed">
            Notre assistant guid{'é'} analyse votre situation et g{'é'}n{'è'}re un plan d'action
            personnalis{'é'} en quelques minutes.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-colors shadow"
          >
            <Wand2 className="w-4 h-4" />
            Utiliser l'assistant gratuit
          </Link>
        </div>

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voir tous les articles
          </Link>
        </div>
      </main>

      {/* Related articles */}
      {otherArticles.length > 0 && (
        <section className="bg-white border-t border-slate-200 py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-bold text-slate-900 mb-8">{'À'} lire {'é'}galement</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {otherArticles.map((a) => (
                <Link
                  key={a.slug}
                  to={`/blog/${a.slug}`}
                  className="group bg-slate-50 rounded-xl border border-slate-200 p-5 hover:bg-white hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[a.category] ?? 'bg-slate-100 text-slate-600'} mb-3 inline-block`}>
                    {a.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 mb-2 leading-snug group-hover:text-indigo-700 transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {a.readTime} min
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
