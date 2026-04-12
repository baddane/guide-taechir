import { Link } from 'react-router-dom';
import { Globe, ArrowLeft, Scale } from 'lucide-react';
import { useEffect } from 'react';
import { Footer } from '../components/Footer';

export function MentionsLegales() {
  useEffect(() => {
    document.title = 'Mentions Légales — Guide-Taechir.org';
    window.scrollTo(0, 0);
  }, []);

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
          <Link to="/" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au guide
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 pt-12 pb-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-5 border border-indigo-100">
            <Scale className="w-4 h-4" />
            Cadre juridique
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Mentions Légales
          </h1>
          <p className="text-slate-500 text-sm">Dernière mise à jour : 1 janvier 2026</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="prose-custom space-y-8">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Éditeur du site</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Le site <strong>Guide-Taechir.org</strong> est un site informatif indépendant édité par une équipe de professionnels spécialisés dans le droit du travail et le recrutement international au Maroc.
            </p>
            <ul className="list-none space-y-2 text-slate-700 mb-4">
              <li><strong>Nom du site :</strong> Guide-Taechir.org</li>
              <li><strong>URL :</strong> https://guide-taechir.org</li>
              <li><strong>Contact :</strong> <a href="mailto:contact@guide-taechir.org" className="text-indigo-600 hover:underline">contact@guide-taechir.org</a></li>
              <li><strong>Directeur de la publication :</strong> L'équipe éditoriale Guide-Taechir.org</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Hébergement</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Le site est hébergé par <strong>Vercel Inc.</strong>, société américaine dont le siège social est situé au 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Objet du site</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Guide-Taechir.org est un <strong>guide informatif</strong> qui a pour objet de fournir des informations et des outils pratiques relatifs à la procédure de recrutement de salariés étrangers au Maroc via le programme TAECHIR du Ministère de l'Inclusion Économique, de la Petite Entreprise, de l'Emploi et des Compétences.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Ce site <strong>n'est pas un site gouvernemental</strong> et n'est affilié ni au Ministère de l'Emploi, ni à l'ANAPEC, ni à toute autre administration publique marocaine.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Propriété intellectuelle</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              L'ensemble du contenu du site Guide-Taechir.org (textes, graphismes, images, logos, icônes, logiciels, code source) est protégé par les lois marocaines et internationales relatives à la propriété intellectuelle.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Toute reproduction, représentation, modification, distribution ou exploitation de tout ou partie du contenu du site, par quelque procédé que ce soit, sans l'autorisation préalable écrite de l'éditeur, est interdite et constitue une contrefaçon sanctionnée par la loi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Limitation de responsabilité</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Les informations publiées sur ce site sont fournies <strong>à titre purement informatif</strong> et ne sauraient constituer un conseil juridique personnalisé. L'éditeur s'efforce de maintenir les informations à jour mais ne garantit ni l'exactitude, ni l'exhaustivité, ni l'actualité permanente des données.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              L'éditeur ne saurait être tenu responsable de tout dommage direct ou indirect résultant de l'utilisation des informations présentes sur le site. L'utilisateur est seul responsable de l'usage qu'il fait des informations et des outils mis à sa disposition.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Pour vos démarches officielles, nous vous recommandons de vous référer directement aux services compétents du Ministère chargé du Travail et de l'ANAPEC.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Liens hypertextes</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Le site peut contenir des liens vers des sites tiers (sites gouvernementaux, ANAPEC, CNSS, etc.). Ces liens sont fournis à titre de commodité et l'éditeur ne peut être tenu responsable du contenu de ces sites externes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Publicité</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Le site affiche des publicités fournies par <strong>Google AdSense</strong>. Ces annonces sont clairement identifiées et leur contenu est géré par Google. L'éditeur n'a pas de contrôle direct sur le contenu des annonces affichées mais s'efforce de garantir une expérience utilisateur de qualité.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Protection des données personnelles</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              La collecte et le traitement des données personnelles sont régis par notre <Link to="/politique-de-confidentialite" className="text-indigo-600 hover:underline font-medium">Politique de Confidentialité</Link>, conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Droit applicable</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Les présentes mentions légales sont régies par le droit marocain. Tout litige relatif à l'utilisation du site sera soumis à la compétence exclusive des tribunaux marocains.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contact</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Pour toute question relative aux présentes mentions légales, veuillez nous contacter via notre <Link to="/contact" className="text-indigo-600 hover:underline font-medium">page de contact</Link> ou par e-mail à <a href="mailto:contact@guide-taechir.org" className="text-indigo-600 hover:underline font-medium">contact@guide-taechir.org</a>.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
