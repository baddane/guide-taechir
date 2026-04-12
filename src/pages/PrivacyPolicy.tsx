import { Link } from 'react-router-dom';
import { Globe, ArrowLeft, Shield } from 'lucide-react';
import { useEffect } from 'react';
import { Footer } from '../components/Footer';

export function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Politique de Confidentialité — Guide-Taechir.org';
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
            Vos données, notre responsabilité
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Politique de Confidentialité
          </h1>
          <p className="text-slate-500 text-sm">Dernière mise à jour : 1 janvier 2026</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="prose-custom space-y-8">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Le site <strong>Guide-Taechir.org</strong> (ci-après "le Site") est un guide informatif dédié à la procédure de recrutement de salariés étrangers au Maroc via le programme TAECHIR. Nous attachons une grande importance à la protection de vos données personnelles et au respect de votre vie privée.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              La présente politique de confidentialité décrit les types d'informations que nous collectons, la manière dont nous les utilisons et les mesures que nous prenons pour les protéger, conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Données collectées</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Le Site ne collecte aucune donnée personnelle directe (nom, e-mail, téléphone) sauf si vous nous contactez volontairement via notre page de contact. Les données automatiquement collectées lors de votre navigation comprennent :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li><strong>Données de navigation :</strong> adresse IP anonymisée, type de navigateur, système d'exploitation, pages visitées, durée de visite et pages de référence.</li>
              <li><strong>Cookies techniques :</strong> nécessaires au bon fonctionnement du site (préférences d'affichage, session de navigation).</li>
              <li><strong>Cookies publicitaires :</strong> utilisés par Google AdSense pour afficher des annonces pertinentes (voir section 4).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Utilisation des données</h2>
            <p className="text-slate-700 leading-relaxed mb-4">Les données collectées sont utilisées exclusivement pour :</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li>Améliorer le contenu et l'expérience utilisateur du Site.</li>
              <li>Analyser les tendances de navigation pour optimiser nos services.</li>
              <li>Afficher des publicités pertinentes via Google AdSense.</li>
              <li>Répondre à vos demandes de contact, le cas échéant.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Google AdSense et cookies tiers</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Le Site utilise <strong>Google AdSense</strong> pour afficher des publicités. Google AdSense utilise des cookies pour diffuser des annonces basées sur les visites précédentes de l'utilisateur sur ce site ou sur d'autres sites.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              L'utilisation par Google du cookie DART lui permet de diffuser des annonces en fonction de votre visite sur ce site et sur d'autres sites Internet. Vous pouvez désactiver l'utilisation du cookie DART en vous rendant sur la <strong>page de désactivation des annonces Google</strong>.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Des fournisseurs tiers, y compris Google, utilisent des cookies pour diffuser des annonces en fonction des visites antérieures de l'utilisateur sur votre site Web ou sur d'autres sites. Vous pouvez gérer vos préférences publicitaires dans les <strong>paramètres des annonces Google</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Partage des données</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Nous ne vendons, n'échangeons ni ne transférons vos données personnelles à des tiers, à l'exception des partenaires publicitaires (Google AdSense) qui sont soumis à leurs propres politiques de confidentialité et aux réglementations en vigueur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Sécurité des données</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, toute modification, divulgation ou destruction. Le Site est accessible via HTTPS (connexion chiffrée).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Vos droits</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Conformément à la loi marocaine n° 09-08, vous disposez des droits suivants concernant vos données personnelles :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li><strong>Droit d'accès :</strong> obtenir la confirmation que vos données sont traitées et en obtenir une copie.</li>
              <li><strong>Droit de rectification :</strong> demander la correction de données inexactes.</li>
              <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données pour des motifs légitimes.</li>
              <li><strong>Droit de suppression :</strong> demander l'effacement de vos données dans les cas prévus par la loi.</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mb-4">
              Pour exercer ces droits, veuillez nous contacter via notre <Link to="/contact" className="text-indigo-600 hover:underline font-medium">page de contact</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Modifications de cette politique</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une date de mise à jour. Nous vous encourageons à consulter cette page régulièrement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Contact</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Pour toute question relative à cette politique de confidentialité ou à vos données personnelles, veuillez nous contacter via notre <Link to="/contact" className="text-indigo-600 hover:underline font-medium">page de contact</Link>.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
