import { Link } from 'react-router-dom';
import { Globe, ArrowLeft, Users, Target, BookOpen, Shield, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Footer } from '../components/Footer';

export function About() {
  useEffect(() => {
    document.title = 'À propos — Guide-Taechir.org';
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
      <header className="bg-white border-b border-slate-200 pt-16 pb-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-5 border border-indigo-100">
            <Users className="w-4 h-4" />
            Qui sommes-nous
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            À propos de Guide-Taechir.org
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Le guide de référence pour le recrutement de travailleurs étrangers au Maroc via le programme TAECHIR.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-16">

        {/* Mission */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Notre mission</h2>
          </div>
          <p className="text-slate-700 leading-relaxed mb-4">
            <strong>Guide-Taechir.org</strong> est né d'un constat simple : la procédure de recrutement de travailleurs étrangers au Maroc, bien que nécessaire et encadrée par la loi, reste complexe et mal documentée pour de nombreux employeurs marocains.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Notre mission est de <strong>démystifier le programme TAECHIR</strong> et de fournir un guide clair, précis et à jour pour accompagner les entreprises marocaines dans leurs démarches de recrutement international. Nous transformons une réglementation dense en informations accessibles et actionnables.
          </p>
        </section>

        {/* What we offer */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Ce que nous proposons</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Guide procédural complet', desc: 'Chaque étape de la procédure TAECHIR expliquée en détail : ANAPEC, plateforme TAECHIR, dépôt au Ministère.' },
              { title: 'Calculateur interactif', desc: 'Estimez les coûts administratifs et les délais en fonction de votre profil de recrutement.' },
              { title: 'Assistant guidé personnalisé', desc: "Un questionnaire intelligent qui génère un plan d'action adapté à votre situation précise." },
              { title: 'Blog décryptage', desc: 'Des articles approfondis sur les aspects spécifiques de la procédure : dispenses, profils rares, renouvellement.' },
            ].map((item) => (
              <div key={item.title} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our expertise */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Notre expertise</h2>
          </div>
          <p className="text-slate-700 leading-relaxed mb-4">
            Notre équipe est composée de <strong>professionnels du droit du travail et des ressources humaines</strong> spécialisés dans le recrutement international au Maroc. Forts de plusieurs années d'expérience dans l'accompagnement d'entreprises marocaines et internationales, nous avons traité des centaines de dossiers TAECHIR couvrant tous les types de situations : premiers recrutements, renouvellements, changements d'employeur, profils rares et cas de dispense.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Cette expérience terrain nous permet de fournir des informations fiables, à jour et enrichies par la pratique quotidienne de la procédure. Chaque article et chaque outil de ce site est vérifié et validé par rapport aux textes officiels et à la réalité opérationnelle des guichets.
          </p>
        </section>

        {/* Sources */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Nos sources</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            L'ensemble des informations publiées sur ce site sont basées sur :
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li>Le <strong>Code du Travail marocain</strong>, notamment les articles 516 et suivants relatifs à l'emploi des salariés étrangers.</li>
            <li>Les <strong>circulaires et notes du Ministère de l'Inclusion Économique, de la Petite Entreprise, de l'Emploi et des Compétences</strong>.</li>
            <li>Les <strong>procédures officielles de l'ANAPEC</strong> (Agence Nationale de Promotion de l'Emploi et des Compétences).</li>
            <li>Les <strong>conventions bilatérales</strong> d'établissement conclues entre le Maroc et les pays partenaires.</li>
            <li>L'expérience pratique accumulée au contact des guichets régionaux du Ministère et de l'ANAPEC.</li>
          </ul>
        </section>

        {/* Disclaimer */}
        <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-amber-900 mb-3">Avertissement important</h2>
          <p className="text-amber-800 leading-relaxed text-sm mb-3">
            <strong>Guide-Taechir.org</strong> est un site à caractère informatif et ne se substitue en aucun cas aux services officiels du Ministère de l'Emploi ni à un conseil juridique personnalisé. Nous ne sommes pas un organisme gouvernemental.
          </p>
          <p className="text-amber-800 leading-relaxed text-sm">
            Les informations fournies sont données à titre indicatif et peuvent évoluer avec les changements réglementaires. Pour les démarches officielles, veuillez vous référer directement à la plateforme <a href="https://taechir.travail.gov.ma" className="text-amber-700 underline font-medium">taechir.travail.gov.ma</a>.
          </p>
        </section>

      </main>

      <Footer />
    </div>
  );
}
