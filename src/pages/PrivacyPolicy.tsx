import { Link } from 'react-router-dom';
import { Globe, ArrowLeft, Shield } from 'lucide-react';
import { useEffect } from 'react';
import { Footer } from '../components/Footer';

export function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Politique de Confidentialit\u00e9 \u2014 Guide-Taechir.org';
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
            <Shield className="w-4 h-4" />
            Vos donn\u00e9es, notre responsabilit\u00e9
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Politique de Confidentialit\u00e9
          </h1>
          <p className="text-slate-500 text-sm">Derni\u00e8re mise \u00e0 jour : 1 janvier 2026</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="prose-custom space-y-8">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Le site <strong>Guide-Taechir.org</strong> (ci-apr\u00e8s "le Site") est un guide informatif d\u00e9di\u00e9 \u00e0 la proc\u00e9dure de recrutement de salari\u00e9s \u00e9trangers au Maroc via le programme TAECHIR. Nous attachons une grande importance \u00e0 la protection de vos donn\u00e9es personnelles et au respect de votre vie priv\u00e9e.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              La pr\u00e9sente politique de confidentialit\u00e9 d\u00e9crit les types d'informations que nous collectons, la mani\u00e8re dont nous les utilisons et les mesures que nous prenons pour les prot\u00e9ger, conform\u00e9ment \u00e0 la loi marocaine n\u00b0 09-08 relative \u00e0 la protection des personnes physiques \u00e0 l'\u00e9gard du traitement des donn\u00e9es \u00e0 caract\u00e8re personnel.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Donn\u00e9es collect\u00e9es</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Le Site ne collecte aucune donn\u00e9e personnelle directe (nom, e-mail, t\u00e9l\u00e9phone) sauf si vous nous contactez volontairement via notre page de contact. Les donn\u00e9es automatiquement collect\u00e9es lors de votre navigation comprennent :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li><strong>Donn\u00e9es de navigation :</strong> adresse IP anonymis\u00e9e, type de navigateur, syst\u00e8me d'exploitation, pages visit\u00e9es, dur\u00e9e de visite et pages de r\u00e9f\u00e9rence.</li>
              <li><strong>Cookies techniques :</strong> n\u00e9cessaires au bon fonctionnement du site (pr\u00e9f\u00e9rences d'affichage, session de navigation).</li>
              <li><strong>Cookies publicitaires :</strong> utilis\u00e9s par Google AdSense pour afficher des annonces pertinentes (voir section 4).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Utilisation des donn\u00e9es</h2>
            <p className="text-slate-700 leading-relaxed mb-4">Les donn\u00e9es collect\u00e9es sont utilis\u00e9es exclusivement pour :</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li>Am\u00e9liorer le contenu et l'exp\u00e9rience utilisateur du Site.</li>
              <li>Analyser les tendances de navigation pour optimiser nos services.</li>
              <li>Afficher des publicit\u00e9s pertinentes via Google AdSense.</li>
              <li>R\u00e9pondre \u00e0 vos demandes de contact, le cas \u00e9ch\u00e9ant.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Google AdSense et cookies tiers</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Le Site utilise <strong>Google AdSense</strong> pour afficher des publicit\u00e9s. Google AdSense utilise des cookies pour diffuser des annonces bas\u00e9es sur les visites pr\u00e9c\u00e9dentes de l'utilisateur sur ce site ou sur d'autres sites.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              L'utilisation par Google du cookie DART lui permet de diffuser des annonces en fonction de votre visite sur ce site et sur d'autres sites Internet. Vous pouvez d\u00e9sactiver l'utilisation du cookie DART en vous rendant sur la <strong>page de d\u00e9sactivation des annonces Google</strong>.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Des fournisseurs tiers, y compris Google, utilisent des cookies pour diffuser des annonces en fonction des visites ant\u00e9rieures de l'utilisateur sur votre site Web ou sur d'autres sites. Vous pouvez g\u00e9rer vos pr\u00e9f\u00e9rences publicitaires dans les <strong>param\u00e8tres des annonces Google</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Partage des donn\u00e9es</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Nous ne vendons, n'\u00e9changeons ni ne transf\u00e9rons vos donn\u00e9es personnelles \u00e0 des tiers, \u00e0 l'exception des partenaires publicitaires (Google AdSense) qui sont soumis \u00e0 leurs propres politiques de confidentialit\u00e9 et aux r\u00e9glementations en vigueur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. S\u00e9curit\u00e9 des donn\u00e9es</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Nous mettons en \u0153uvre des mesures de s\u00e9curit\u00e9 techniques et organisationnelles appropri\u00e9es pour prot\u00e9ger vos donn\u00e9es contre tout acc\u00e8s non autoris\u00e9, toute modification, divulgation ou destruction. Le Site est accessible via HTTPS (connexion chiffr\u00e9e).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Vos droits</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Conform\u00e9ment \u00e0 la loi marocaine n\u00b0 09-08, vous disposez des droits suivants concernant vos donn\u00e9es personnelles :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li><strong>Droit d'acc\u00e8s :</strong> obtenir la confirmation que vos donn\u00e9es sont trait\u00e9es et en obtenir une copie.</li>
              <li><strong>Droit de rectification :</strong> demander la correction de donn\u00e9es inexactes.</li>
              <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos donn\u00e9es pour des motifs l\u00e9gitimes.</li>
              <li><strong>Droit de suppression :</strong> demander l'effacement de vos donn\u00e9es dans les cas pr\u00e9vus par la loi.</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mb-4">
              Pour exercer ces droits, veuillez nous contacter via notre <Link to="/contact" className="text-indigo-600 hover:underline font-medium">page de contact</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Modifications de cette politique</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Nous nous r\u00e9servons le droit de modifier cette politique de confidentialit\u00e9 \u00e0 tout moment. Toute modification sera publi\u00e9e sur cette page avec une date de mise \u00e0 jour. Nous vous encourageons \u00e0 consulter cette page r\u00e9guli\u00e8rement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Contact</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Pour toute question relative \u00e0 cette politique de confidentialit\u00e9 ou \u00e0 vos donn\u00e9es personnelles, veuillez nous contacter via notre <Link to="/contact" className="text-indigo-600 hover:underline font-medium">page de contact</Link>.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
