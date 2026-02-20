import { Link } from 'react-router-dom';
import { Globe, ArrowLeft, Clock, Tag } from 'lucide-react';
import { articles } from './articles';

const categoryColors: Record<string, string> = {
  'Guide':      'bg-indigo-50 text-indigo-700 border-indigo-100',
  'ANAPEC':     'bg-blue-50 text-blue-700 border-blue-100',
  'Exemptions': 'bg-purple-50 text-purple-700 border-purple-100',
  'Procédure':  'bg-emerald-50 text-emerald-700 border-emerald-100',
  'Conseils':   'bg-amber-50 text-amber-700 border-amber-100',
};

export function BlogList() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Globe className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Guide-<span className="text-indigo-600">Taechir.org</span>
            </span>
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4" /> Retour au guide
            </Link>
            <span className="text-indigo-600 font-semibold">Blog</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-white border-b border-slate-200 pt-16 pb-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-5 border border-indigo-100">
            <Tag className="w-4 h-4" />
            Ressources & Décryptages
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Le Blog Taechir
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Guides pratiques, décryptages réglementaires et conseils opérationnels
            sur le recrutement international au Maroc.
          </p>
        </div>
      </header>

      {/* Articles grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col overflow-hidden"
            >
              {/* Color band */}
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-blue-400" />

              <div className="p-7 flex flex-col flex-1">
                {/* Category + read time */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColors[article.category] ?? 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" /> {article.readTime} min
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-indigo-700 transition-colors">
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5">
                  {article.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs text-slate-400">{article.date}</span>
                  <span className="text-sm font-semibold text-indigo-600 group-hover:gap-2 flex items-center gap-1 transition-all">
                    Lire l'article →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 text-center text-sm border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <Globe className="w-7 h-7 text-slate-600 mx-auto mb-3" />
          <p className="font-semibold text-slate-300 mb-1">Guide-Taechir.org</p>
          <p>Guide informatif basé sur la procédure officielle du Ministère de l'Inclusion Économique.</p>
        </div>
      </footer>
    </div>
  );
}
