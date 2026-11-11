import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Globe, ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';
import { useSeo } from '../seo/useSeo';
import { staticPage } from '../seo/meta';
import { GUIDE } from '../data/guidePayant';

const VENDEUR = {
  nom: 'Atlas Digital Solutions LLC',
  forme: 'Limited Liability Company de droit du Wyoming (États-Unis)',
  adresse: '5830 E 2nd St, Ste 7000 #38002, Casper, Wyoming 82609, USA',
};

export function ConditionsVente() {
  useSeo(staticPage('/conditions-de-vente'));
  useEffect(() => window.scrollTo(0, 0), []);

  const H2 = ({ children }: { children: string }) => <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">{children}</h2>;
  const P = ({ children }: { children: React.ReactNode }) => <p className="text-slate-700 leading-relaxed mb-3">{children}</p>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-xl tracking-tight">Guide-<span className="text-indigo-600">Taechir.org</span></span>
          </Link>
          <Link to={GUIDE.path} className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600">
            <ArrowLeft className="w-4 h-4" /> Retour au guide
          </Link>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <h1 className="text-3xl font-extrabold tracking-tight">Conditions générales de vente</h1>
        <p className="text-slate-500 text-sm mt-2 mb-6">En vigueur au 10 novembre 2026</p>

        <H2>1. Objet</H2>
        <P>Les présentes conditions régissent la vente, sur le site Guide-Taechir.org, du « {GUIDE.nom} » (le « Guide »), contenu numérique au format PDF non fourni sur un support matériel. Toute commande vaut acceptation des conditions en vigueur au jour de la commande.</P>

        <H2>2. Vendeur</H2>
        <P>Le Guide est vendu par <strong>{VENDEUR.nom}</strong>, {VENDEUR.forme}, dont le siège est situé {VENDEUR.adresse}, éditrice du site Guide-Taechir.org. Service client : <a href="mailto:contact@guide-taechir.org" className="text-indigo-600">contact@guide-taechir.org</a>, en français, en principe sous deux jours ouvrés.</P>

        <H2>3. Le Guide</H2>
        <P>Le contenu, le nombre de pages et la date d'édition du Guide sont présentés sur sa page de vente, avec un extrait gratuit. Le Guide est un <strong>document d'information générale</strong> : il ne constitue pas un conseil juridique personnalisé et ne remplace pas l'avis d'un professionnel. Il décrit les règles en vigueur à sa date d'édition et cite ses sources officielles.</P>

        <H2>4. Prix et paiement</H2>
        <P>Le prix est indiqué en dirhams marocains (DH) sur la page de vente ; le prix applicable est celui affiché lors de la commande. Le paiement s'effectue en une fois, par carte bancaire, sur la page sécurisée du prestataire <strong>Stripe</strong> ; les données de carte ne sont jamais communiquées au Vendeur. Une carte émise hors du Maroc est débitée dans sa devise, au taux de change appliqué par la banque du Client. La vente est conclue à la confirmation du paiement ; une facture est émise au nom indiqué lors du paiement.</P>

        <H2>5. Livraison</H2>
        <P>Le Guide est livré immédiatement après confirmation du paiement : un bouton de téléchargement s'affiche, et un lien est envoyé par e-mail. Ce lien reste valable et donne accès à l'édition la plus récente du Guide. En cas de difficulté, il suffit d'écrire au service client avec l'adresse e-mail utilisée pour le paiement.</P>

        <H2>6. Droit de rétractation</H2>
        <P>Avant de payer, le Client demande expressément l'accès immédiat au Guide et reconnaît perdre son droit de rétractation, en cochant une case dédiée. La fourniture d'un contenu numérique commençant dès la confirmation du paiement, le Client ne bénéficie pas d'un délai de rétractation.</P>

        <H2>7. Conformité et réclamations</H2>
        <P>Si le fichier est illisible, incomplet ou ne correspond pas à la description de la page de vente, le Client le signale au service client : un fichier conforme lui est fourni ou, à défaut, il est remboursé. Le Vendeur apporte le plus grand soin à l'exactitude du Guide mais ne saurait répondre des décisions prises sur la seule base d'un document d'information générale, ni des évolutions des textes ou de la pratique administrative postérieures à son édition. Rien dans les présentes ne limite les droits que le Client tient de dispositions impératives de la loi qui lui est applicable.</P>

        <H2>8. Licence</H2>
        <P>Le Guide est protégé par le droit d'auteur. L'achat confère une licence non exclusive et non transférable d'utilisation par le Client et, s'il achète pour une entreprise, par les membres de cette entreprise. Toute diffusion à des tiers, revente ou mise en ligne est interdite.</P>

        <H2>9. Données personnelles</H2>
        <P>Les données nécessaires à la commande (adresse e-mail, nom et adresse de facturation ; données de paiement traitées par Stripe) sont utilisées pour exécuter la vente, livrer le Guide et tenir la comptabilité. Voir la <Link to="/politique-de-confidentialite" className="text-indigo-600">politique de confidentialité</Link>.</P>

        <H2>10. Litiges</H2>
        <P>En cas de difficulté, le Client s'adresse d'abord par écrit au service client afin de rechercher une solution amiable.</P>
      </main>
      <Footer />
    </div>
  );
}
