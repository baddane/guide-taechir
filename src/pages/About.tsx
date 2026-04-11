import { Link } from 'react-router-dom';
import { Globe, ArrowLeft, Users, Target, BookOpen, Shield, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Footer } from '../components/Footer';

export function About() {
  useEffect(() => {
    document.title = '\u00c0 propos \u2014 Guide-Taechir.org';
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
            \u00c0 propos de Guide-Taechir.org
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Le guide de r\u00e9f\u00e9rence pour le recrutement de travailleurs \u00e9trangers au Maroc via le programme TAECHIR.
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
            <strong>Guide-Taechir.org</strong> est n\u00e9 d'un constat simple : la proc\u00e9dure de recrutement de travailleurs \u00e9trangers au Maroc, bien que n\u00e9cessaire et encadr\u00e9e par la loi, reste complexe et mal document\u00e9e pour de nombreux employeurs marocains.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Notre mission est de <strong>d\u00e9mystifier le programme TAECHIR</strong> et de fournir un guide clair, pr\u00e9cis et \u00e0 jour pour accompagner les entreprises marocaines dans leurs d\u00e9marches de recrutement international. Nous transformons une r\u00e9glementation dense en informations accessibles et actionnables.
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
              { title: 'Guide proc\u00e9dural complet', desc: 'Chaque \u00e9tape de la proc\u00e9dure TAECHIR expliqu\u00e9e en d\u00e9tail : ANAPEC, plateforme TAECHIR, d\u00e9p\u00f4t au Minist\u00e8re.' },
              { title: 'Calculateur interactif', desc: 'Estimez les co\u00fbts administratifs et les d\u00e9lais en fonction de votre profil de recrutement.' },
              { title: 'Assistant guid\u00e9 personnalis\u00e9', desc: 'Un questionnaire intelligent qui g\u00e9n\u00e8re un plan d\'action adapt\u00e9 \u00e0 votre situation pr\u00e9cise.' },
              { title: 'Blog d\u00e9cryptage', desc: 'Des articles approfondis sur les aspects sp\u00e9cifiques de la proc\u00e9dure : dispenses, profils rares, renouvellement.' },
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
            Notre \u00e9quipe est compos\u00e9e de <strong>professionnels du droit du travail et des ressources humaines</strong> sp\u00e9cialis\u00e9s dans le recrutement international au Maroc. Forts de plusieurs ann\u00e9es d'exp\u00e9rience dans l'accompagnement d'entreprises marocaines et internationales, nous avons trait\u00e9 des centaines de dossiers TAECHIR couvrant tous les types de situations : premiers recrutements, renouvellements, changements d'employeur, profils rares et cas de dispense.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Cette exp\u00e9rience terrain nous permet de fournir des informations fiables, \u00e0 jour et enrichies par la pratique quotidienne de la proc\u00e9dure. Chaque article et chaque outil de ce site est v\u00e9rifi\u00e9 et valid\u00e9 par rapport aux textes officiels et \u00e0 la r\u00e9alit\u00e9 op\u00e9rationnelle des guichets.
          </p>
        </section>

        {/* Sources */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Nos sources</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            L'ensemble des informations publi\u00e9es sur ce site sont bas\u00e9es sur :
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li>Le <strong>Code du Travail marocain</strong>, notamment les articles 516 et suivants relatifs \u00e0 l'emploi des salari\u00e9s \u00e9trangers.</li>
            <li>Les <strong>circulaires et notes du Minist\u00e8re de l'Inclusion \u00c9conomique, de la Petite Entreprise, de l'Emploi et des Comp\u00e9tences</strong>.</li>
            <li>Les <strong>proc\u00e9dures officielles de l'ANAPEC</strong> (Agence Nationale de Promotion de l'Emploi et des Comp\u00e9tences).</li>
            <li>Les <strong>conventions bilat\u00e9rales</strong> d'\u00e9tablissement conclues entre le Maroc et les pays partenaires.</li>
            <li>L'exp\u00e9rience pratique accumul\u00e9e au contact des guichets r\u00e9gionaux du Minist\u00e8re et de l'ANAPEC.</li>
          </ul>
        </section>

        {/* Disclaimer */}
        <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-amber-900 mb-3">Avertissement important</h2>
          <p className="text-amber-800 leading-relaxed text-sm mb-3">
            <strong>Guide-Taechir.org</strong> est un site \u00e0 caract\u00e8re informatif et ne se substitue en aucun cas aux services officiels du Minist\u00e8re de l'Emploi ni \u00e0 un conseil juridique personnalis\u00e9. Nous ne sommes pas un organisme gouvernemental.
          </p>
          <p className="text-amber-800 leading-relaxed text-sm">
            Les informations fournies sont donn\u00e9es \u00e0 titre indicatif et peuvent \u00e9voluer avec les changements r\u00e9glementaires. Pour les d\u00e9marches officielles, veuillez vous r\u00e9f\u00e9rer directement \u00e0 la plateforme <a href="https://taechir.travail.gov.ma" className="text-amber-700 underline font-medium">taechir.travail.gov.ma</a>.
          </p>
        </section>

      </main>

      <Footer />
    </div>
  );
}
