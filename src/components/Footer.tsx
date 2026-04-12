import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-6 h-6 text-slate-500" />
              <span className="font-bold text-lg text-slate-200">Guide-Taechir.org</span>
            </div>
            <p className="text-sm leading-relaxed">
              Guide informatif basé sur la procédure officielle du Ministère de l'Inclusion Économique, de la Petite Entreprise, de l'Emploi et des Compétences du Maroc.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-slate-300 mb-4 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Accueil</Link></li>
              <li><Link to="/#procedure" className="hover:text-indigo-400 transition-colors">La Procédure</Link></li>
              <li><Link to="/#calculateur" className="hover:text-indigo-400 transition-colors">Calculateur</Link></li>
              <li><Link to="/blog" className="hover:text-indigo-400 transition-colors">Blog</Link></li>
              <li><Link to="/a-propos" className="hover:text-indigo-400 transition-colors">À propos</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="font-semibold text-slate-300 mb-4 text-sm uppercase tracking-wider">Informations légales</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/mentions-legales" className="hover:text-indigo-400 transition-colors">Mentions légales</Link></li>
              <li><Link to="/politique-de-confidentialite" className="hover:text-indigo-400 transition-colors">Politique de confidentialité</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Nous contacter</Link></li>
            </ul>
            <div className="mt-4 pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-500">
                Pour les démarches officielles : <a href="https://taechir.travail.gov.ma" className="text-indigo-400 hover:underline">taechir.travail.gov.ma</a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Guide-Taechir.org. Tous droits réservés. Ce site n'est pas un organisme gouvernemental.</p>
        </div>
      </div>
    </footer>
  );
}
