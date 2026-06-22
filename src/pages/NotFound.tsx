import { Link } from 'react-router-dom';
import { Globe, Home, BookOpen, ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

export function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Guide-<span className="text-indigo-600">Taechir.org</span>
            </span>
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-lg">
          <p className="text-7xl font-extrabold text-indigo-600 mb-4">404</p>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Page introuvable</h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            La page que vous recherchez n'existe pas ou a été déplacée.
            Consultez notre guide ou notre blog pour trouver l'information que vous cherchez.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
              <Home className="w-5 h-5" /> Accueil
            </Link>
            <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
              <BookOpen className="w-5 h-5" /> Blog
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
