import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  from: 'bot' | 'user';
  text: string;
}

/* ──────────────────────────────────────────────
   Knowledge base — rule-based keyword matching
────────────────────────────────────────────── */
const KB: { keywords: string[]; response: string }[] = [
  {
    keywords: ['bonjour', 'salut', 'hello', 'bonsoir', 'bjr', 'coucou', 'hey', 'salam'],
    response:
      '👋 Bonjour ! Je suis l\'assistant **Guide-Taechir**.\n\nJe peux répondre à toutes vos questions sur le recrutement de travailleurs étrangers au Maroc via le programme TAECHIR.\n\nPosez votre question ou tapez **"aide"** pour voir les sujets disponibles.',
  },
  {
    keywords: ['cout', 'coût', 'prix', 'tarif', 'frais', 'combien', 'payer', 'dhs', 'dirham', 'montant', 'cout anapec'],
    response:
      '💰 **Coûts de la procédure TAECHIR**\n\nLa plateforme TAECHIR et le visa Ministère sont **100 % gratuits**.\n\nSeule l\'attestation **ANAPEC** est payante :\n\n• **5 000 Dhs HT** — 1er dossier avec obligation d\'annonce\n• **1 500 Dhs HT** — Dossier supplémentaire (même métier/an, max 5)\n• **1 500 Dhs HT** — Profil rare ou renouvellement (sans annonce)\n• **0 Dhs** — Si vous êtes dispensé d\'ANAPEC\n\n👉 Utilisez le **Calculateur** sur la page d\'accueil pour une estimation précise.',
  },
  {
    keywords: ['delai', 'délai', 'duree', 'durée', 'temps', 'long', 'jours', 'semaine', 'mois', 'rapide', 'vite', 'attendre', 'combien de temps'],
    response:
      '⏱️ **Délais de la procédure TAECHIR**\n\n**Étape 1 — Attestation ANAPEC :**\n• Profil standard : jusqu\'à **20 jours ouvrables**\n• Profil rare / renouvellement : **48 heures**\n• Dispensé : **0 jour**\n\n**Étape 2 — Visa Ministère :**\n• Maximum **10 jours** après dépôt du dossier complet\n\n**Délai global estimé : 10 à 30 jours** selon votre profil.',
  },
  {
    keywords: ['document', 'papier', 'dossier', 'piece', 'pièce', 'fichier', 'liste', 'preparer', 'préparer', 'fournir', 'apporter'],
    response:
      '📋 **Documents requis (nouveau recrutement)**\n\n✅ 3 exemplaires du contrat TAECHIR légalisés\n✅ Diplômes/certificats certifiés + traduction\n✅ Copie du passeport (pages principales + entrée au Maroc)\n✅ Attestation ANAPEC (sauf dispense)\n✅ Documents employeur : RC modèle 7, statuts, PV...\n\n💡 Pour une **liste personnalisée** à votre situation, lancez le **Wizard** depuis la page d\'accueil !',
  },
  {
    keywords: ['anapec', 'attestation', 'annonce', 'offre emploi', 'candidat national', 'absence candidat'],
    response:
      '🏢 **L\'attestation ANAPEC**\n\nL\'ANAPEC certifie qu\'aucun candidat marocain n\'est disponible pour le poste visé. C\'est souvent la première étape de la procédure.\n\n**Délais :** 48h (profil rare/renouvellement) à 20 jours ouvrables (profil standard)\n**Coût :** 1 500 à 5 000 Dhs HT\n\n**Attention :** Elle n\'est pas nécessaire si vous êtes dispensé. Tapez **"dispense"** pour en savoir plus.\n\n🔗 www.anapec.org',
  },
  {
    keywords: ['dispense', 'dispensé', 'exempt', 'exemption', 'sans anapec', 'pas besoin anapec', 'exception'],
    response:
      '✅ **Cas de dispense de l\'attestation ANAPEC**\n\nCes catégories sont exemptées :\n\n👤 Époux(ses) de ressortissants marocains\n🔄 Salariés détachés (marchés publics ou filiales)\n🏙️ Sociétés **CFC** (Casablanca Finance City)\n📋 Propriétaires, gérants, associés, actionnaires\n⭐ Profils **haut niveau (A1)** et **rares (A2)**\n📞 Personnel d\'encadrement en offshoring\n🌍 Ressortissants **Algérie, Tunisie et Sénégal** (convention bilatérale)',
  },
  {
    keywords: ['renouvellement', 'renouveler', 'prolonger', 'reconduire', 'même employeur', 'meme employeur'],
    response:
      '🔄 **Renouvellement de contrat**\n\nLa procédure est **simplifiée** pour le même employeur :\n\n📄 **Documents spécifiques :**\n• 3 exemplaires du contrat TAECHIR légalisés\n• Attestation CNSS (3 derniers mois)\n• Copie du titre de séjour (carte DGSN)\n• Attestation ANAPEC si applicable — 1 500 Dhs, 48h\n\n⏱️ **Avantage :** Délai ANAPEC réduit à **48h** (au lieu de 20 jours).',
  },
  {
    keywords: ['changement employeur', 'changer employeur', 'nouvel employeur', 'nouvelle entreprise', 'demission', 'démission', 'quitter', 'resiliation', 'résiliation'],
    response:
      '🔀 **Changement d\'employeur**\n\nC\'est une **nouvelle demande de visa**. Documents nécessaires :\n\n✅ 3 exemplaires du contrat TAECHIR légalisés\n✅ Attestation ANAPEC\n✅ Documents du nouvel employeur\n✅ Copie du titre de séjour (DGSN)\n✅ **Lettre de résiliation** de l\'ex-employeur OU lettre de démission légalisée OU décision judiciaire',
  },
  {
    keywords: ['taechir', 'plateforme', 'site', 'portail', 'en ligne', 'application'],
    response:
      '💻 **La plateforme TAECHIR**\n\nTAECHIR est le système officiel du **Ministère de l\'Emploi** pour les contrats de travail des étrangers au Maroc.\n\n✅ Création de compte employeur\n✅ Saisie des données du salarié\n✅ Génération du contrat de travail type\n✅ Suivi des demandes en ligne\n✅ **Service 100 % gratuit**\n\n🔗 taechir.travail.gov.ma',
  },
  {
    keywords: ['cfc', 'casablanca finance', 'finance city'],
    response:
      '🏙️ **Statut CFC — Casablanca Finance City**\n\nLes sociétés **CFC** bénéficient d\'un régime privilégié :\n\n✅ Dispense totale de l\'attestation ANAPEC\n✅ Procédure simplifiée et plus rapide\n\n📄 Document requis : Certificat de statut CFC en cours de validité\n\n🔗 www.casablancafinancecity.com',
  },
  {
    keywords: ['algerie', 'algérie', 'tunisie', 'senegal', 'sénégal', 'nationalite', 'nationalité', 'convention', 'bilaterale', 'bilatérale', 'pays'],
    response:
      '🌍 **Conventions bilatérales avec le Maroc**\n\nLes ressortissants de ces pays sont **dispensés de l\'attestation ANAPEC** :\n\n🇩🇿 **Algérie** — Convention d\'établissement\n🇹🇳 **Tunisie** — Convention d\'établissement\n🇸🇳 **Sénégal** — Convention d\'établissement\n\nPour toute autre nationalité, la procédure normale s\'applique.',
  },
  {
    keywords: ['commencer travailler', 'avant visa', 'travailler avant', 'debut', 'début', 'prise de poste', 'date debut', 'date début'],
    response:
      '⚠️ **Attention — Article 516 du Code du Travail**\n\nLe salarié étranger **ne peut pas commencer à travailler** avant l\'obtention du visa du Ministère.\n\nLa **date d\'apposition du visa** est la date officielle de prise d\'effet du contrat de travail.\n\n📅 Planifiez bien votre recrutement pour éviter tout problème légal !',
  },
  {
    keywords: ['refus', 'rejet', 'refusé', 'refuse', 'rapatriement'],
    response:
      '❌ **En cas de refus du visa de travail**\n\nSi le visa est refusé :\n\n• L\'**employeur** doit prendre en charge les **frais de rapatriement** du salarié vers son pays (Art. 5 du contrat type)\n\n📌 **Pour éviter le refus :**\n• Vérifier la complétude du dossier\n• Contrôler la validité de tous les documents\n• Utiliser le **Wizard** pour ne rien oublier',
  },
  {
    keywords: ['liste a1', 'liste a2', 'profil rare', 'haut niveau', 'competence rare', 'compétence rare', 'a1', 'a2'],
    response:
      '⭐ **Listes A1 et A2 de l\'ANAPEC**\n\n• **Liste A1** — Profils de haut niveau (managers, experts internationaux) : dispense d\'annonce\n• **Liste A2** — Compétences pointues rares : frais réduits à 1 500 Dhs, délai 48h\n\n🔄 Ces listes sont **mises à jour régulièrement** par l\'ANAPEC selon les besoins du marché marocain.\n\n👉 Contactez l\'ANAPEC pour vérifier si votre poste y figure.',
  },
  {
    keywords: ['offshoring', 'centre appel', "centre d'appel", 'call center', 'bpo', 'encadrement'],
    response:
      '📞 **Secteur Offshoring / BPO**\n\nLe **personnel d\'encadrement** dans les sociétés d\'offshoring est dispensé de l\'attestation ANAPEC.\n\nCela couvre les postes de direction et de management dans les centres d\'appels, BPO et entreprises de services informatiques opérant depuis le Maroc.',
  },
  {
    keywords: ['dgsn', 'police', 'titre sejour', 'titre de sejour', 'carte sejour', 'immatriculation', 'residence', 'résidence', 'sejour'],
    response:
      '🪪 **Titre de séjour — DGSN**\n\nLa **Direction Générale de la Sûreté Nationale** délivre la carte d\'immatriculation pour les étrangers résidant au Maroc.\n\n📌 **Obligatoire pour :**\n• Les demandes de **renouvellement** de contrat\n• Les **changements d\'employeur**\n\n🔗 www.dgsn.ma',
  },
  {
    keywords: ['cnss', 'securite sociale', 'sécurité sociale', 'cotisation', 'declaration salaire', 'déclaration salaire'],
    response:
      '📊 **CNSS — Sécurité Sociale**\n\nL\'attestation CNSS (3 derniers mois) est requise pour les **renouvellements** de contrat.\n\nElle prouve que l\'employeur a bien déclaré et cotisé pour le salarié étranger pendant la durée du contrat précédent.\n\n🔗 www.cnss.ma',
  },
  {
    keywords: ['ministere', 'ministère', 'travail', 'guichet', 'depot', 'dépôt', 'ou deposer', 'où déposer', 'guichet regional'],
    response:
      '🏛️ **Ministère de l\'Emploi — Dépôt du dossier**\n\nAprès génération du contrat sur TAECHIR, le dossier **physique complet** doit être déposé au guichet régional.\n\n⏱️ Délai de traitement : **maximum 10 jours**\n\n📌 Le dossier doit être complet dès le dépôt. Tout document manquant peut retarder le traitement ou entraîner un rejet.\n\n🔗 www.travail.gov.ma',
  },
  {
    keywords: ['nouveau recrutement', 'premier contrat', 'embauche', 'recruter', 'recrute'],
    response:
      '🆕 **Nouveau recrutement — Vue d\'ensemble**\n\n**Étapes :**\n1️⃣ Obtenir l\'attestation ANAPEC (si non dispensé)\n2️⃣ Créer le contrat sur taechir.travail.gov.ma\n3️⃣ Imprimer 3 exemplaires et les légaliser\n4️⃣ Déposer le dossier au guichet Ministère\n5️⃣ Attendre le visa (max 10 jours)\n\n💡 Lancez notre **Wizard** pour obtenir la liste précise de vos documents !',
  },
  {
    keywords: ['aide', 'help', 'quoi', 'question', 'info', 'sujet', 'peut'],
    response:
      '🤖 **Sujets disponibles — tapez un mot-clé**\n\n💰 **coût** — frais ANAPEC et procédure\n⏱️ **délai** — durée de traitement\n📋 **document** — pièces à fournir\n🏢 **ANAPEC** — rôle et attestation\n✅ **dispense** — cas d\'exemption\n🔄 **renouvellement** — procédure simplifiée\n🔀 **changement employeur** — étapes\n🌍 **nationalité** — conventions bilatérales\n💻 **TAECHIR** — la plateforme officielle\n🏙️ **CFC** — statut Casablanca Finance City\n⭐ **liste A1/A2** — profils rares\n⚠️ **refus** — conséquences\n🏛️ **Ministère** — dépôt du dossier',
  },
  {
    keywords: ['merci', 'super', 'parfait', 'excellent', 'bravo', 'top', 'genial', 'génial', 'nickel', 'cool', 'tres bien', 'très bien'],
    response: '😊 Avec plaisir ! N\'hésitez pas si vous avez d\'autres questions. Bonne chance pour vos démarches TAECHIR ! 🚀',
  },
];

/* Normalize text for comparison (remove accents, lowercase) */
function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function findResponse(input: string): string {
  const norm = normalize(input);
  // Try to find best match (most keywords matched)
  let bestMatch: { response: string; score: number } | null = null;

  for (const item of KB) {
    let score = 0;
    for (const kw of item.keywords) {
      if (norm.includes(normalize(kw))) score++;
    }
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { response: item.response, score };
    }
  }

  if (bestMatch) return bestMatch.response;

  return '🤔 Je ne suis pas sûr de comprendre votre question.\n\nEssayez des mots-clés comme **coût**, **délai**, **document**, **ANAPEC**, **dispense**, **renouvellement** ou **TAECHIR**.\n\nTapez **"aide"** pour voir tous les sujets disponibles.';
}

/* Render **bold** markdown in message text */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i, arr) => {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <span key={i}>
            {parts.map((part, j) =>
              j % 2 === 1 ? <strong key={j}>{part}</strong> : part
            )}
            {i < arr.length - 1 && <br />}
          </span>
        );
      })}
    </>
  );
}

/* Quick-reply chips */
const QUICK_REPLIES = ['Coûts', 'Délais', 'Documents', 'ANAPEC', 'Dispenses', 'Renouvellement'];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      from: 'bot',
      text: '👋 Bonjour ! Je suis l\'assistant **Guide-Taechir**.\n\nPosez-moi vos questions sur le recrutement de travailleurs étrangers au Maroc. Tapez **"aide"** pour voir les sujets disponibles.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;

    const userMsg: Message = { id: Date.now(), from: 'user', text: msg };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = findResponse(msg);
      setIsTyping(false);
      const botMsg: Message = { id: Date.now() + 1, from: 'bot', text: response };
      setMessages(prev => [...prev, botMsg]);
      if (!isOpen) setUnread(n => n + 1);
    }, 700 + Math.random() * 400);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  const open = () => {
    setIsOpen(true);
    setUnread(0);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-300/50 hover:bg-indigo-700 transition-all hover:scale-110 flex items-center justify-center"
        aria-label="Ouvrir l'assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!isOpen && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-40 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          style={{ width: 'min(24rem, calc(100vw - 3rem))', height: 'min(32rem, calc(100vh - 8rem))' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-4 text-white flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm">Assistant Taechir</p>
              <p className="text-xs text-white/60 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                Répond instantanément
              </p>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-full hover:bg-white/20 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/80">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                {msg.from === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mb-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
                    ${msg.from === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : 'bg-white text-slate-800 border border-slate-100 rounded-bl-sm'}`}
                >
                  <RichText text={msg.text} />
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-slate-100 flex gap-1 items-center">
                  {[0, 150, 300].map(delay => (
                    <span
                      key={delay}
                      className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          <div className="px-3 pt-2 pb-1 border-t border-slate-100 bg-white flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {QUICK_REPLIES.map(qr => (
              <button
                key={qr}
                onClick={() => sendMessage(qr)}
                className="text-xs font-medium px-3 py-1.5 rounded-full border border-indigo-200 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 whitespace-nowrap shrink-0 transition-colors"
              >
                {qr}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-100 bg-white flex gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Posez votre question..."
              className="flex-1 text-sm border border-slate-200 rounded-xl px-3.5 py-2 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-slate-50"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
              aria-label="Envoyer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
