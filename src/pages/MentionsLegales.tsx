import { Link } from 'react-router-dom';
import { Globe, ArrowLeft, Scale } from 'lucide-react';
import { useEffect } from 'react';
import { Footer } from '../components/Footer';

export function MentionsLegales() {
  useEffect(() => {
    document.title = 'Mentions L\u00e9gales \u2014 Guide-Taechir.org';
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
            Mentions L\u00e9gales
          </h1>
          <p className="text-slate-500 text-sm">Derni\u00e8re mise \u00e0 jour : 1 janvier 2026</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="prose-custom space-y-8">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. \u00c9diteur du site</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Le site <strong>Guide-Taechir.org</strong> est un site informatif ind\u00e9pendant \u00e9dit\u00e9 par une \u00e9quipe de professionnels sp\u00e9cialis\u00e9s dans le droit du travail et le recrutement international au Maroc.
            </p>
            <ul className="list-none space-y-2 text-slate-700 mb-4">
              <li><strong>Nom du site :</strong> Guide-Taechir.org</li>
              <li><strong>URL :</strong> https://guide-taechir.org</li>
              <li><strong>Contact :</strong> <a href="mailto:contact@guide-taechir.org" className="text-indigo-600 hover:underline">contact@guide-taechir.org</a></li>
              <li><strong>Directeur de la publication :</strong> L'\u00e9quipe \u00e9ditoriale Guide-Taechir.org</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. H\u00e9bergement</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Le site est h\u00e9berg\u00e9 par <strong>Vercel Inc.</strong>, soci\u00e9t\u00e9 am\u00e9ricaine dont le si\u00e8ge social est situ\u00e9 au 340 S Lemon Ave #4133, Walnut, CA 91789, \u00c9tats-Unis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Objet du site</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Guide-Taechir.org est un <strong>guide informatif</strong> qui a pour objet de fournir des informations et des outils pratiques relatifs \u00e0 la proc\u00e9dure de recrutement de salari\u00e9s \u00e9trangers au Maroc via le programme TAECHIR du Minist\u00e8re de l'Inclusion \u00c9conomique, de la Petite Entreprise, de l'Emploi et des Comp\u00e9tences.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Ce site <strong>n'est pas un site gouvernemental</strong> et n'est affili\u00e9 ni au Minist\u00e8re de l'Emploi, ni \u00e0 l'ANAPEC, ni \u00e0 toute autre administration publique marocaine.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Propri\u00e9t\u00e9 intellectuelle</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              L'ensemble du contenu du site Guide-Taechir.org (textes, graphismes, images, logos, ic\u00f4nes, logiciels, code source) est prot\u00e9g\u00e9 par les lois marocaines et internationales relatives \u00e0 la propri\u00e9t\u00e9 intellectuelle.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Toute reproduction, repr\u00e9sentation, modification, distribution ou exploitation de tout ou partie du contenu du site, par quelque proc\u00e9d\u00e9 que ce soit, sans l'autorisation pr\u00e9alable \u00e9crite de l'\u00e9diteur, est interdite et constitue une contrefa\u00e7on sanctionn\u00e9e par la loi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Limitation de responsabilit\u00e9</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Les informations publi\u00e9es sur ce site sont fournies <strong>\u00e0 titre purement informatif</strong> et ne sauraient constituer un conseil juridique personnalis\u00e9. L'\u00e9diteur s'efforce de maintenir les informations \u00e0 jour mais ne garantit ni l'exactitude, ni l'exhaustivit\u00e9, ni l'actualit\u00e9 permanente des donn\u00e9es.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              L'\u00e9diteur ne saurait \u00eatre tenu responsable de tout dommage direct ou indirect r\u00e9sultant de l'utilisation des informations pr\u00e9sentes sur le site. L'utilisateur est seul responsable de l'usage qu'il fait des informations et des outils mis \u00e0 sa disposition.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Pour vos d\u00e9marches officielles, nous vous recommandons de vous r\u00e9f\u00e9rer directement aux services comp\u00e9tents du Minist\u00e8re charg\u00e9 du Travail et de l'ANAPEC.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Liens hypertextes</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Le site peut contenir des liens vers des sites tiers (sites gouvernementaux, ANAPEC, CNSS, etc.). Ces liens sont fournis \u00e0 titre de commodit\u00e9 et l'\u00e9diteur ne peut \u00eatre tenu responsable du contenu de ces sites externes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Publicit\u00e9</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Le site affiche des publicit\u00e9s fournies par <strong>Google AdSense</strong>. Ces annonces sont clairement identifi\u00e9es et leur contenu est g\u00e9r\u00e9 par Google. L'\u00e9diteur n'a pas de contr\u00f4le direct sur le contenu des annonces affich\u00e9es mais s'efforce de garantir une exp\u00e9rience utilisateur de qualit\u00e9.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Protection des donn\u00e9es personnelles</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              La collecte et le traitement des donn\u00e9es personnelles sont r\u00e9gis par notre <Link to="/politique-de-confidentialite" className="text-indigo-600 hover:underline font-medium">Politique de Confidentialit\u00e9</Link>, conform\u00e9ment \u00e0 la loi marocaine n\u00b0 09-08 relative \u00e0 la protection des personnes physiques \u00e0 l'\u00e9gard du traitement des donn\u00e9es \u00e0 caract\u00e8re personnel.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Droit applicable</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Les pr\u00e9sentes mentions l\u00e9gales sont r\u00e9gies par le droit marocain. Tout litige relatif \u00e0 l'utilisation du site sera soumis \u00e0 la comp\u00e9tence exclusive des tribunaux marocains.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contact</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Pour toute question relative aux pr\u00e9sentes mentions l\u00e9gales, veuillez nous contacter via notre <Link to="/contact" className="text-indigo-600 hover:underline font-medium">page de contact</Link> ou par e-mail \u00e0 <a href="mailto:contact@guide-taechir.org" className="text-indigo-600 hover:underline font-medium">contact@guide-taechir.org</a>.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
