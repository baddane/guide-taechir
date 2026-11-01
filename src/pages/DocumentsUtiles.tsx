import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState, ReactNode } from 'react';
import {
  Globe, ArrowLeft, FileSignature, FileText, Printer, Copy, Download, AlertTriangle, XCircle,
  CheckCircle2, ListChecks, BookOpen, ShieldAlert, RotateCcw, ExternalLink, Scale,
} from 'lucide-react';
import { Footer } from '../components/Footer';
import {
  CONTRAT_VIDE, ContratInput, CATEGORIES, MOTIFS_CDD, MODELES, essaiMax, verifierContrat,
  genererContrat, docEnTexte, docEnWord, DocGenere, DUREE_HEBDO_MAX,
} from '../data/contrats';
import {
  PIECES_ANAPEC, PIECES_DISPENSES, REGLES_CTE, ACRONYMES, ANAPEC_MODELES_URL, TAECHIR_URL,
} from '../data/taechir';
import { useSeo } from '../seo/useSeo';
import { staticPage, FAQ_DOCUMENTS } from '../seo/meta';

const STORAGE_KEY = 'gt_docs_contrat_v1';

function lireStockage<T>(cle: string, defaut: T): T {
  try {
    const brut = localStorage.getItem(cle);
    return brut ? { ...defaut, ...JSON.parse(brut) } : defaut;
  } catch {
    return defaut;
  }
}
function ecrireStockage(cle: string, valeur: unknown) {
  try { localStorage.setItem(cle, JSON.stringify(valeur)); } catch { /* stockage indisponible */ }
}

/* ---------- Petits composants de formulaire ---------- */

const inputCls = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100';

function Champ({ label, children, aide }: { label: string; children: ReactNode; aide?: string }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-slate-600 mb-1">{label}</span>
      {children}
      {aide && <span className="block text-xs text-slate-500 mt-1">{aide}</span>}
    </label>
  );
}

function Groupe({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <fieldset className="border border-slate-200 rounded-xl p-4 bg-white">
      <legend className="px-1 text-sm font-bold text-slate-800">{titre}</legend>
      <div className="grid sm:grid-cols-2 gap-3">{children}</div>
    </fieldset>
  );
}

function Case({ checked, onChange, label }: { checked: boolean; onChange: (b: boolean) => void; label: string }) {
  return (
    <label className="flex items-start gap-2 text-sm text-slate-700 cursor-pointer sm:col-span-2">
      <input type="checkbox" className="mt-0.5 h-4 w-4 accent-indigo-600" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

/* ---------- Aperçu + actions (imprimer, copier, Word) ---------- */

function Apercu({ doc, nomFichier }: { doc: DocGenere; nomFichier: string }) {
  const [copie, setCopie] = useState(false);

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(docEnTexte(doc));
      setCopie(true);
      setTimeout(() => setCopie(false), 2000);
    } catch { /* presse-papiers refusé */ }
  };

  const telecharger = () => {
    const blob = new Blob(['﻿', docEnWord(doc)], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${nomFichier}.doc`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3 print:hidden">
        <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">
          <Printer className="w-4 h-4" /> Imprimer / PDF
        </button>
        <button onClick={telecharger} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50">
          <Download className="w-4 h-4" /> Word (.doc)
        </button>
        <button onClick={copier} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50">
          {copie ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          {copie ? 'Copié' : 'Copier le texte'}
        </button>
      </div>
      <article id="doc-print" className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 sm:p-10 text-[13px] leading-relaxed text-slate-800 font-serif max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible print:border-0 print:shadow-none print:p-0">
        <h2 className="text-center text-lg font-bold uppercase tracking-wide mb-2">{doc.titre}</h2>
        {doc.sousTitre && <p className="text-center text-slate-500 whitespace-pre-line mb-6">{doc.sousTitre}</p>}
        {doc.blocs.map((b, i) => (
          <section key={i} className="mb-4">
            {b.titre && <h3 className="font-bold mt-4 mb-1">{b.titre}</h3>}
            {b.paragraphes.map((p, j) => <p key={j} className="mb-2 text-justify">{p}</p>)}
          </section>
        ))}
        {doc.signatures && (
          <div className="grid gap-8 mt-10" style={{ gridTemplateColumns: `repeat(${doc.signatures.length}, minmax(0, 1fr))` }}>
            {doc.signatures.map((s, i) => (
              <div key={i} className="whitespace-pre-line text-slate-600 min-h-24">{s}</div>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}

/* ---------- Générateur de contrat ---------- */

function GenerateurContrat() {
  const [c, setC] = useState<ContratInput>(() => lireStockage(STORAGE_KEY, CONTRAT_VIDE));
  useEffect(() => { ecrireStockage(STORAGE_KEY, c); }, [c]);

  const maj = <K extends keyof ContratInput>(k: K) => (val: ContratInput[K]) => setC((p) => ({ ...p, [k]: val }));
  const txt = (k: keyof ContratInput) => ({
    value: c[k] as string,
    onChange: (e: { target: { value: string } }) => setC((p) => ({ ...p, [k]: e.target.value })),
    className: inputCls,
  });

  const doc = useMemo(() => genererContrat(c), [c]);
  const alertes = useMemo(() => verifierContrat(c), [c]);
  const max = essaiMax(c);

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start print:block">
      <div className="space-y-5 print:hidden">
        {/* Type de contrat */}
        <div className="grid grid-cols-2 gap-3">
          {([['cdi', 'CDI', 'Durée indéterminée'], ['cdd', 'CDD', 'Durée déterminée']] as const).map(([id, titre, sous]) => (
            <button
              key={id}
              onClick={() => maj('type')(id)}
              className={`text-left rounded-xl border-2 p-4 transition-colors ${c.type === id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
            >
              <span className="block font-bold text-slate-900">{titre}</span>
              <span className="block text-xs text-slate-500">{sous}</span>
            </button>
          ))}
        </div>
        <label className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 cursor-pointer">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-indigo-600" checked={c.etranger} onChange={(e) => maj('etranger')(e.target.checked)} />
          <span className="text-sm text-amber-900">
            <strong>Salarié étranger (contrat soumis au visa TAECHIR)</strong><br />
            Ajoute les clauses propres au CTE : prise d'effet à la date du visa, modification soumise au visa, frais de retour en cas de refus.
          </span>
        </label>

        <Groupe titre="Employeur">
          <Champ label="Raison sociale"><input {...txt('employeurNom')} /></Champ>
          <Champ label="Forme juridique"><input {...txt('employeurForme')} placeholder="SARL, SA, SARL AU…" /></Champ>
          <div className="sm:col-span-2"><Champ label="Adresse du siège"><input {...txt('employeurAdresse')} /></Champ></div>
          <Champ label="N° RC"><input {...txt('employeurRc')} /></Champ>
          <Champ label="ICE"><input {...txt('employeurIce')} /></Champ>
          <Champ label="N° d'affiliation CNSS"><input {...txt('employeurCnss')} /></Champ>
          <Champ label="Représentant"><input {...txt('representantNom')} /></Champ>
          <Champ label="Qualité du représentant"><input {...txt('representantQualite')} /></Champ>
        </Groupe>

        <Groupe titre="Salarié">
          <Champ label="Nom et prénom"><input {...txt('salarieNom')} /></Champ>
          <Champ label="Nationalité"><input {...txt('salarieNationalite')} /></Champ>
          <Champ label="Date de naissance"><input type="date" {...txt('salarieNaissance')} /></Champ>
          <Champ label="Pièce d'identité"><input {...txt('salariePiece')} placeholder="Passeport n°… / CIN n°…" /></Champ>
          <div className="sm:col-span-2"><Champ label="Adresse"><input {...txt('salarieAdresse')} /></Champ></div>
        </Groupe>

        <Groupe titre="Poste">
          <Champ label="Intitulé du poste"><input {...txt('poste')} /></Champ>
          <Champ label="Catégorie">
            <select value={c.categorie} onChange={(e) => maj('categorie')(e.target.value as ContratInput['categorie'])} className={inputCls}>
              {CATEGORIES.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
            </select>
          </Champ>
          <Champ label="Lieu de travail"><input {...txt('lieuTravail')} placeholder="Ville / établissement" /></Champ>
          {(c.type === 'cdd' || !c.etranger) && (
            <Champ label="Date de début"><input type="date" {...txt('dateDebut')} /></Champ>
          )}
          {c.type === 'cdd' && (
            <>
              <Champ label="Date de fin"><input type="date" {...txt('dateFin')} /></Champ>
              <Champ label="Motif du CDD">
                <select value={c.motifCdd} onChange={(e) => maj('motifCdd')(e.target.value as ContratInput['motifCdd'])} className={inputCls}>
                  {MOTIFS_CDD.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
                </select>
              </Champ>
              {c.motifCdd === 'remplacement' && (
                <Champ label="Salarié remplacé"><input {...txt('salarieRemplace')} placeholder="Nom ou poste" /></Champ>
              )}
            </>
          )}
        </Groupe>

        <Groupe titre="Conditions">
          <Champ label="Salaire mensuel brut (DH)"><input inputMode="decimal" {...txt('salaireBrut')} /></Champ>
          <Champ label="Heures par semaine" aide={`${DUREE_HEBDO_MAX} h maximum (art. 184)`}><input inputMode="decimal" {...txt('heuresHebdo')} /></Champ>
          <div className="sm:col-span-2"><Champ label="Avantages (facultatif)"><input {...txt('avantages')} placeholder="Logement, véhicule, prime annuelle, billet d'avion…" /></Champ></div>
          <Champ label="Période d'essai (jours)" aide={max ? `Maximum légal : ${max.libelle}. Laissez vide pour l'appliquer.` : 'Renseignez les dates du CDD pour calculer le maximum.'}>
            <input inputMode="numeric" {...txt('essaiJours')} placeholder={max ? String(max.jours) : ''} />
          </Champ>
          {c.type === 'cdi' && <Case checked={c.essaiRenouvelable} onChange={maj('essaiRenouvelable')} label="Période d'essai renouvelable une fois" />}
        </Groupe>

        <Groupe titre="Clauses facultatives">
          <Case checked={c.clauseConfidentialite} onChange={maj('clauseConfidentialite')} label="Confidentialité" />
          <Case checked={c.clauseExclusivite} onChange={maj('clauseExclusivite')} label="Exclusivité pendant le contrat (pas d'activité concurrente)" />
          <Case checked={c.clauseMobilite} onChange={maj('clauseMobilite')} label="Mobilité géographique au Maroc" />
          <p className="sm:col-span-2 text-xs text-slate-500">
            La clause de non-concurrence après le départ n'est volontairement pas proposée : le Code du travail ne l'encadre pas et sa validité dépend de la jurisprudence. Faites-la rédiger par un professionnel.
          </p>
        </Groupe>

        <Groupe titre="Signature">
          <Champ label="Fait à"><input {...txt('villeSignature')} /></Champ>
          <Champ label="Le"><input type="date" {...txt('dateSignature')} /></Champ>
        </Groupe>

        <button onClick={() => setC(CONTRAT_VIDE)} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800">
          <RotateCcw className="w-4 h-4" /> Effacer le formulaire
        </button>
      </div>

      <div className="lg:sticky lg:top-20 space-y-4 print:static">
        {alertes.length > 0 && (
          <ul className="space-y-2 print:hidden">
            {alertes.map((a, i) => (
              <li key={i} className={`flex gap-2 rounded-lg border p-3 text-sm ${a.niveau === 'erreur' ? 'border-red-200 bg-red-50 text-red-800' : 'border-amber-200 bg-amber-50 text-amber-900'}`}>
                {a.niveau === 'erreur' ? <XCircle className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />}
                <span>{a.texte}</span>
              </li>
            ))}
          </ul>
        )}
        <Apercu doc={doc} nomFichier={`contrat-${c.type}${c.salarieNom ? `-${c.salarieNom.trim().toLowerCase().replace(/[^a-z0-9]+/gi, '-')}` : ''}`} />
      </div>
    </div>
  );
}

/* ---------- Modèles courts ---------- */

function Modeles() {
  const [actif, setActif] = useState(MODELES[0].id);
  const [valeurs, setValeurs] = useState<Record<string, Record<string, string>>>(() => lireStockage('gt_docs_modeles_v1', {}));
  useEffect(() => { ecrireStockage('gt_docs_modeles_v1', valeurs); }, [valeurs]);

  const modele = MODELES.find((m) => m.id === actif)!;
  const f = valeurs[actif] ?? {};
  const doc = useMemo(() => modele.generer(f), [modele, f]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 print:hidden">
        {MODELES.map((m) => (
          <button
            key={m.id}
            onClick={() => setActif(m.id)}
            className={`text-left rounded-xl border-2 p-4 transition-colors ${actif === m.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
          >
            <FileText className="w-5 h-5 text-indigo-600 mb-2" />
            <span className="block font-bold text-slate-900 text-sm">{m.titre}</span>
            <span className="block text-xs text-slate-500 mt-1">{m.description}</span>
          </button>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-8 items-start print:block">
        <div className="space-y-3 print:hidden">
          {modele.champs.map((ch) => (
            <Champ key={ch.id} label={ch.label}>
              {ch.type === 'textarea' ? (
                <textarea
                  rows={3}
                  className={inputCls}
                  placeholder={ch.placeholder}
                  value={f[ch.id] ?? ''}
                  onChange={(e) => setValeurs((p) => ({ ...p, [actif]: { ...f, [ch.id]: e.target.value } }))}
                />
              ) : (
                <input
                  type={ch.type ?? 'text'}
                  className={inputCls}
                  placeholder={ch.placeholder}
                  value={f[ch.id] ?? ''}
                  onChange={(e) => setValeurs((p) => ({ ...p, [actif]: { ...f, [ch.id]: e.target.value } }))}
                />
              )}
            </Champ>
          ))}
          {modele.source && <p className="text-xs text-slate-500">Référence : {modele.source}.</p>}
        </div>
        <div className="lg:sticky lg:top-20 print:static">
          <Apercu doc={doc} nomFichier={modele.id} />
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

type Onglet = 'contrat' | 'modeles' | 'pieces' | 'glossaire';
const ONGLETS: { id: Onglet; label: string; icon: typeof FileSignature }[] = [
  { id: 'contrat', label: 'Générateur de contrat', icon: FileSignature },
  { id: 'modeles', label: 'Modèles de lettres', icon: FileText },
  { id: 'pieces', label: 'Pièces à réunir', icon: ListChecks },
  { id: 'glossaire', label: 'Sigles', icon: BookOpen },
];

export function DocumentsUtiles() {
  useSeo(staticPage('/documents-utiles'));
  const [onglet, setOnglet] = useState<Onglet>(() => {
    const h = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
    return (ONGLETS.some((o) => o.id === h) ? h : 'contrat') as Onglet;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const choisir = (o: Onglet) => {
    setOnglet(o);
    try { window.history.replaceState(null, '', `#${o}`); } catch { /* ignore */ }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-xl tracking-tight text-slate-900">Guide-<span className="text-indigo-600">Taechir.org</span></span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Retour au guide</span>
          </Link>
        </div>
      </nav>

      <header className="bg-white border-b border-slate-200 pt-12 pb-10 print:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-5 border border-indigo-100">
            <FileSignature className="w-4 h-4" /> Gratuit, sans inscription
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Modèle de contrat de travail CDI et CDD au Maroc : générateur gratuit
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Rédigez en quelques minutes un contrat CDI ou CDD conforme au Code du travail marocain, préparez votre
            contrat de salarié étranger, et générez vos attestations et lettres ANAPEC. Vos saisies restent sur votre appareil.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Avertissement juridique */}
        <div className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 mb-8 print:hidden">
          <ShieldAlert className="w-6 h-6 text-red-600 shrink-0" />
          <div className="text-sm text-red-900 leading-relaxed">
            <p className="font-bold mb-1">Modèles indicatifs, pas un conseil juridique</p>
            <p>
              Ces documents s'appuient sur la loi n° 65-99 relative au Code du travail et reprennent ses <strong>minima légaux</strong>.
              Ils ne tiennent pas compte de votre convention collective, de votre règlement intérieur ni des évolutions récentes des textes
              (SMIG, décrets). Relisez-les et faites-les valider par un juriste ou un expert-comptable avant signature.
              Pour un salarié étranger, <strong>seul le contrat imprimé depuis la plateforme TAECHIR</strong> est soumis au visa.
              Guide-Taechir.org n'est pas un organisme officiel et décline toute responsabilité quant à l'usage de ces modèles.
            </p>
          </div>
        </div>

        {/* Onglets */}
        <div role="tablist" className="flex gap-2 overflow-x-auto pb-2 mb-8 print:hidden">
          {ONGLETS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={onglet === id}
              onClick={() => choisir(id)}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors ${onglet === id ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {onglet === 'contrat' && <GenerateurContrat />}
        {onglet === 'modeles' && <Modeles />}

        {onglet === 'pieces' && (
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold mb-2">Attestation d'activité ANAPEC</h2>
              <p className="text-slate-600 mb-5">
                À obtenir <strong>avant</strong> la demande de visa sur TAECHIR (catégorie « Normal »). Les fiches et le modèle d'annonce
                se téléchargent sur le{' '}
                <a href={ANAPEC_MODELES_URL} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:underline inline-flex items-center gap-1">
                  site de l'ANAPEC <ExternalLink className="w-3.5 h-3.5" />
                </a>.
              </p>
              <div className="grid md:grid-cols-3 gap-5">
                {PIECES_ANAPEC.map((p) => (
                  <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-5">
                    <h3 className="font-bold text-slate-900 mb-1">{p.titre}</h3>
                    <p className="text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-md px-2 py-1 inline-block mb-3">{p.delai}</p>
                    <ul className="space-y-2">
                      {p.pieces.map((x) => (
                        <li key={x} className="flex gap-2 text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />{x}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <button onClick={() => choisir('modeles')} className="mt-4 text-sm font-semibold text-indigo-600 hover:underline">
                → Générer la lettre de demande au Directeur Général de l'ANAPEC
              </button>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-2">Catégories dispensées de l'attestation ANAPEC</h2>
              <p className="text-slate-600 mb-5">Une pièce propre à la catégorie remplace l'attestation lors de la demande sur TAECHIR.</p>
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 text-left text-slate-700">
                    <tr><th className="p-3 w-1/3">Catégorie</th><th className="p-3">Pièce justificative</th></tr>
                  </thead>
                  <tbody>
                    {PIECES_DISPENSES.map((p) => (
                      <tr key={p.categorie} className="border-t border-slate-100 align-top">
                        <td className="p-3 font-semibold text-slate-800">{p.categorie}</td>
                        <td className="p-3 text-slate-700">{p.piece}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Scale className="w-6 h-6 text-indigo-600" /> Les règles à retenir pour le contrat d'étranger</h2>
              <ul className="grid md:grid-cols-2 gap-3">
                {REGLES_CTE.map((r) => (
                  <li key={r} className="flex gap-2 bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />{r}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-slate-500 mt-4">
                Source : brochure « Recrutement des salariés étrangers » du Ministère chargé du travail. Démarche officielle sur{' '}
                <a href={TAECHIR_URL} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">taechir.travail.gov.ma</a>.
              </p>
            </section>
          </div>
        )}

        {onglet === 'glossaire' && (
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-5">Les sigles de la procédure</h2>
            <dl className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100">
              {ACRONYMES.map(([sigle, def]) => (
                <div key={sigle} className="grid grid-cols-3 gap-4 p-4">
                  <dt className="font-bold text-indigo-700">{sigle}</dt>
                  <dd className="col-span-2 text-sm text-slate-700">{def}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Questions fréquentes (contenu visible, balisé en FAQPage) */}
        <section className="mt-16 max-w-4xl print:hidden" aria-labelledby="faq-contrats">
          <h2 id="faq-contrats" className="text-2xl font-bold mb-2">Contrat de travail au Maroc : les questions fréquentes</h2>
          <p className="text-slate-600 mb-6">
            Les règles que le générateur applique, et celles à vérifier avant de signer. Pour aller plus loin sur le recrutement
            d'un étranger, consultez <Link to="/blog/guide-recruter-salarie-etranger-maroc-2026" className="text-indigo-600 font-semibold hover:underline">notre guide complet</Link>{' '}
            ou la <Link to="/checklist" className="text-indigo-600 font-semibold hover:underline">checklist du dossier TAECHIR</Link>.
          </p>
          <div className="space-y-3">
            {FAQ_DOCUMENTS.map(([q, a]) => (
              <details key={q} className="group bg-white border border-slate-200 rounded-xl p-5">
                <summary className="cursor-pointer list-none font-semibold text-slate-900 flex justify-between gap-4">
                  <h3 className="text-base">{q}</h3>
                  <span className="text-indigo-600 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-slate-700 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Relais vers un accompagnement */}
        <div className="mt-14 rounded-2xl bg-slate-900 text-white p-8 flex flex-col md:flex-row md:items-center gap-6 justify-between print:hidden">
          <div>
            <h2 className="text-xl font-bold mb-1">Un contrat sensible, un dossier TAECHIR à monter ?</h2>
            <p className="text-slate-300 text-sm">Faites relire votre contrat et préparer votre dossier par un professionnel du recrutement international.</p>
          </div>
          <Link to="/contact" className="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 font-semibold">
            Être accompagné
          </Link>
        </div>
      </main>

      <div className="print:hidden"><Footer /></div>
    </div>
  );
}
