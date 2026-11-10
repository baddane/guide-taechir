import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import { GUIDE } from '../data/guidePayant';

/* Encart de vente du guide payant, placé là où le lecteur vient de
   comprendre qu'une étape est délicate (fin d'article, accueil, contact). */
export function GuideCta({ page }: { page: string }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-700 to-sky-600 text-white p-6 md:p-8 grid md:grid-cols-[auto_1fr] gap-6 items-center shadow-xl shadow-indigo-100">
      <img src="/guide/apercu-1.webp" alt="" width={124} height={175} loading="lazy" className="hidden md:block w-28 rounded-lg shadow-lg rotate-[-3deg]" />
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
          <BookOpen className="w-4 h-4" /> Guide pratique · {GUIDE.pages} pages · {GUIDE.prixAffiche}
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold mt-2">Tout le dossier TAECHIR, de la catégorie au titre de séjour</h3>
        <p className="text-indigo-100 mt-2 text-sm md:text-base">
          Arbre de décision des catégories, les trois listes officielles de pièces, apostille et visas, cinq cas pratiques,
          rétroplanning, checklists et modèles de lettres. Chaque règle sourcée.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to={`${GUIDE.path}?from=${encodeURIComponent(page)}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-indigo-950 font-bold hover:bg-amber-300">
            Découvrir le guide <ArrowRight className="w-4 h-4" />
          </Link>
          <a href={GUIDE.extrait} target="_blank" rel="noopener" className="px-5 py-2.5 rounded-xl border border-white/30 font-semibold hover:bg-white/10">
            Lire l'extrait gratuit
          </a>
        </div>
      </div>
    </div>
  );
}
