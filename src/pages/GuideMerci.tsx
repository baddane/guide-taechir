import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Globe, CheckCircle2, Download, Loader2, AlertTriangle, Mail } from 'lucide-react';
import { Footer } from '../components/Footer';
import { useSeo } from '../seo/useSeo';
import { staticPage } from '../seo/meta';
import { GUIDE } from '../data/guidePayant';

type Etat =
  | { statut: 'chargement' }
  | { statut: 'ok'; email: string; lien: string }
  | { statut: 'erreur' };

export function GuideMerci() {
  useSeo(staticPage(`${GUIDE.path}/merci`));
  const [params] = useSearchParams();
  const sessionId = params.get('session_id') ?? '';
  const [etat, setEtat] = useState<Etat>({ statut: 'chargement' });

  useEffect(() => {
    window.scrollTo(0, 0);
    let annule = false;
    // Stripe confirme parfois le paiement une seconde après la redirection :
    // trois essais espacés avant de conclure à une erreur.
    const essayer = async (n: number) => {
      try {
        const r = await fetch(`/api/guide/acces?session_id=${encodeURIComponent(sessionId)}`);
        const data = await r.json();
        if (annule) return;
        if (r.ok && data.ok) return setEtat({ statut: 'ok', email: data.email, lien: data.telechargement });
      } catch {
        /* nouvel essai ci-dessous */
      }
      if (annule) return;
      if (n < 3) setTimeout(() => essayer(n + 1), 2000);
      else setEtat({ statut: 'erreur' });
    };
    essayer(1);
    return () => {
      annule = true;
    };
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-xl tracking-tight">Guide-<span className="text-indigo-600">Taechir.org</span></span>
          </Link>
        </div>
      </nav>
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-16">
        {etat.statut === 'chargement' && (
          <div className="text-center text-slate-600"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-indigo-600" />Vérification du paiement…</div>
        )}
        {etat.statut === 'ok' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8 text-center">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
            <h1 className="text-2xl font-extrabold">Merci, votre guide est prêt</h1>
            <p className="text-slate-600 mt-3">Le lien de téléchargement a aussi été envoyé à <strong>{etat.email}</strong>. Il reste valable et vous donnera toujours la dernière édition.</p>
            <a href={etat.lien} className="mt-7 inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700">
              <Download className="w-5 h-5" /> Télécharger le guide (PDF)
            </a>
            <p className="text-sm text-slate-500 mt-8 flex gap-2 justify-center">
              <Mail className="w-4 h-4 mt-0.5" /> Une question ? <a href="mailto:contact@guide-taechir.org" className="text-indigo-600">contact@guide-taechir.org</a>
            </p>
          </div>
        )}
        {etat.statut === 'erreur' && (
          <div className="bg-white rounded-3xl border border-amber-200 p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h1 className="text-xl font-bold">Nous n'avons pas encore la confirmation du paiement</h1>
            <p className="text-slate-600 mt-3">
              Rechargez la page dans une minute. Si le problème persiste, écrivez à{' '}
              <a href="mailto:contact@guide-taechir.org" className="text-indigo-600 font-semibold">contact@guide-taechir.org</a> avec
              l'adresse e-mail utilisée pour le paiement : nous vous envoyons le guide.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
