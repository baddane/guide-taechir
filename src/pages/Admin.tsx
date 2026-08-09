import { useEffect, useMemo, useState, useCallback, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe, Lock, LogOut, RefreshCw, Trash2, Mail, Download, Inbox,
  CheckCircle2, Circle, AlertTriangle, KeyRound, Building2, Reply, Send, X,
  CornerDownRight, CornerDownLeft,
} from 'lucide-react';
import { supabase, type ContactMessage, type Lead, type MessageReply } from '../lib/supabase';

const STORAGE_KEY = 'gt_admin_pw';

type Tab = 'contacts' | 'leads';

/** Élément auquel on est en train de répondre. */
interface ReplyTarget {
  kind: 'contact' | 'lead';
  id: string;
  to: string;
  toName: string;
  subject: string;
  quote: string;
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

/* ── Fenêtre de réponse (envoi via Brevo) ────────────────────────────────── */
function ReplyDialog({
  target, password, onClose, onSent,
}: {
  target: ReplyTarget;
  password: string;
  onClose: () => void;
  onSent: (reply: MessageReply) => void;
}) {
  const [subject, setSubject] = useState(target.subject);
  const [body, setBody] = useState(
    `Bonjour${target.toName ? ` ${target.toName}` : ''},\n\n\n\nBien cordialement,\nL'équipe Guide-Taechir.org`,
  );
  const [quoteOriginal, setQuoteOriginal] = useState(Boolean(target.quote));
  const [state, setState] = useState<'idle' | 'sending' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const send = async (e: FormEvent) => {
    e.preventDefault();
    setState('sending');
    setError('');

    let res: Response;
    try {
      res = await fetch('/api/admin/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          kind: target.kind,
          id: target.id,
          to: target.to,
          toName: target.toName,
          subject,
          body,
          quote: quoteOriginal ? target.quote : '',
        }),
      });
    } catch {
      setState('error');
      setError('Impossible de joindre le serveur d\'envoi. Vérifiez votre connexion.');
      return;
    }

    const data = await res.json().catch(() => null) as
      | { ok?: boolean; error?: string; status?: number; detail?: string; replyId?: string; archived?: boolean }
      | null;

    if (!res.ok || !data?.ok) {
      setState('error');
      setError(errorLabel(data?.error, res.status, data?.detail));
      return;
    }

    onSent({
      id: data.replyId ?? `local-${Date.now()}`,
      message_id: target.kind === 'contact' ? target.id : null,
      lead_id: target.kind === 'lead' ? target.id : null,
      to_email: target.to,
      subject,
      body,
      created_at: new Date().toISOString(),
      direction: 'out',
      from_email: null,
    });
  };

  // z-200 : la fenêtre passe au-dessus de la bannière cookies (z-100), montée
  // globalement dans main.tsx, qui masquerait sinon les boutons d'action.
  return (
    <div className="fixed inset-0 z-[200] bg-slate-900/50 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-xl my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900 flex items-center gap-2">
            <Reply className="w-5 h-5 text-indigo-600" /> Répondre
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" title="Fermer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={send} className="p-6 space-y-4">
          {state === 'error' && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm leading-relaxed">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Destinataire</label>
            <div className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600">
              {target.toName ? `${target.toName} · ` : ''}{target.to}
            </div>
            <p className="text-xs text-slate-400 mt-1.5">Envoyé depuis contact@guide-taechir.org via Brevo.</p>
          </div>

          <div>
            <label htmlFor="reply-subject" className="block text-sm font-semibold text-slate-700 mb-2">Objet</label>
            <input
              id="reply-subject"
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="reply-body" className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
            <textarea
              id="reply-body"
              required
              rows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-y font-sans text-sm leading-relaxed"
            />
          </div>

          {target.quote && (
            <label className="flex items-start gap-2.5 text-sm text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={quoteOriginal}
                onChange={(e) => setQuoteOriginal(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              Rappeler le message initial en bas de l'e-mail
            </label>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              Annuler
            </button>
            <button
              type="submit"
              disabled={state === 'sending' || !subject.trim() || !body.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state === 'sending' ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {state === 'sending' ? 'Envoi en cours…' : 'Envoyer la réponse'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function errorLabel(code: string | undefined, status: number, detail?: string): string {
  switch (code) {
    case 'unauthorized':
      return 'Session expirée ou mot de passe invalide. Reconnectez-vous.';
    case 'brevo_not_configured':
      return 'La clé BREVO_API_KEY n\'est pas configurée sur le serveur (variables d\'environnement Vercel).';
    case 'brevo_error':
      return `Brevo a refusé l'envoi${detail ? ` : ${detail}` : ''}. Vérifiez que l'expéditeur est validé et que l'option « Authorised IPs » est désactivée.`;
    case 'brevo_unreachable':
      return 'L\'API Brevo est injoignable. Réessayez dans un instant.';
    case 'rate_limited':
      return 'Trop d\'envois en peu de temps. Patientez quelques minutes.';
    case 'invalid_recipient':
      return 'L\'adresse e-mail du destinataire est invalide.';
    case 'missing_content':
      return 'L\'objet et le message sont obligatoires.';
    default:
      return status === 404
        ? 'Route d\'envoi introuvable (/api/admin/reply). Le déploiement des fonctions serveur est-il actif ?'
        : `Échec de l'envoi (erreur ${status}).`;
  }
}

/* ── Pastilles d'état du fil ─────────────────────────────────────────────── */
function ThreadBadges({ replies }: { replies: MessageReply[] }) {
  const sent = replies.filter((r) => r.direction !== 'in').length;
  const received = replies.filter((r) => r.direction === 'in').length;
  return (
    <>
      {received > 0 && (
        <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
          {received > 1 ? `${received} réponses reçues` : 'Réponse reçue'}
        </span>
      )}
      {sent > 0 && (
        <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
          Répondu{sent > 1 ? ` ×${sent}` : ''}
        </span>
      )}
    </>
  );
}

/* ── Fil de la conversation : envois (out) et réponses reçues (in) ────────── */
function ReplyThread({ replies }: { replies: MessageReply[] }) {
  if (replies.length === 0) return null;
  return (
    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
      {replies.map((r) => {
        const incoming = r.direction === 'in';
        return (
          <div key={r.id} className="flex gap-2.5">
            {incoming
              ? <CornerDownLeft className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              : <CornerDownRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />}
            <div className="min-w-0 flex-1">
              <p className="text-xs text-slate-400 mb-1">
                {incoming ? (
                  <>
                    <span className="font-semibold text-indigo-600">Réponse reçue</span>
                    {r.from_email ? <> de {r.from_email}</> : null} le {fmt(r.created_at)}
                  </>
                ) : (
                  <>Répondu le {fmt(r.created_at)}</>
                )}
                {r.subject ? <> · <span className="text-slate-500">{r.subject}</span></> : null}
              </p>
              <p
                className={`text-sm leading-relaxed whitespace-pre-wrap rounded-lg p-3 border ${
                  incoming
                    ? 'bg-indigo-50/60 border-indigo-100 text-slate-700'
                    : 'bg-slate-50 border-slate-100 text-slate-600'
                }`}
              >
                {r.body}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Dashboard ───────────────────────────────────────────────────────────── */
export function Admin() {
  const [password, setPassword] = useState<string>(() => sessionStorage.getItem(STORAGE_KEY) ?? '');
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [replies, setReplies] = useState<MessageReply[]>([]);
  const [tab, setTab] = useState<Tab>('contacts');

  const [replyTarget, setReplyTarget] = useState<ReplyTarget | null>(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    document.title = 'Administration — Guide-Taechir.org';
  }, []);

  // ⚠️ Tous les hooks restent AVANT le `return` conditionnel de l'écran de login.
  const repliesByMessage = useMemo(() => {
    const map = new Map<string, MessageReply[]>();
    for (const r of replies) {
      const key = r.message_id ?? r.lead_id;
      if (!key) continue;
      const list = map.get(key);
      if (list) list.push(r);
      else map.set(key, [r]);
    }
    return map;
  }, [replies]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const load = useCallback(async (pw: string) => {
    setLoading(true);
    const { data, error } = await supabase.rpc('admin_list', { p_password: pw });
    setLoading(false);
    if (error || !data) return false;
    const payload = data as { contacts?: ContactMessage[]; leads?: Lead[]; replies?: MessageReply[] };
    setContacts(payload.contacts ?? []);
    setLeads(payload.leads ?? []);
    setReplies(payload.replies ?? []);
    return true;
  }, []);

  // Auto-login if a password is already stored for this session
  useEffect(() => {
    if (password && !authed) {
      load(password).then((ok) => {
        if (ok) setAuthed(true);
        else { sessionStorage.removeItem(STORAGE_KEY); setPassword(''); }
      });
    }
  }, [password, authed, load]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError(false);
    const ok = await load(pwInput);
    if (ok) {
      sessionStorage.setItem(STORAGE_KEY, pwInput);
      setPassword(pwInput);
      setAuthed(true);
    } else {
      setLoginError(true);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setPassword('');
    setAuthed(false);
    setPwInput('');
    setContacts([]);
    setLeads([]);
    setReplies([]);
  };

  const toggleRead = async (kind: 'contact' | 'lead', id: string, current: boolean) => {
    await supabase.rpc('admin_set_read', { p_password: password, p_kind: kind, p_id: id, p_read: !current });
    if (kind === 'contact') {
      setContacts((cs) => cs.map((c) => (c.id === id ? { ...c, is_read: !current } : c)));
    } else {
      setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, is_read: !current } : l)));
    }
  };

  const remove = async (kind: 'contact' | 'lead', id: string) => {
    if (!confirm('Supprimer définitivement cet élément ?')) return;
    await supabase.rpc('admin_delete', { p_password: password, p_kind: kind, p_id: id });
    if (kind === 'contact') setContacts((cs) => cs.filter((c) => c.id !== id));
    else setLeads((ls) => ls.filter((l) => l.id !== id));
    setReplies((rs) => rs.filter((r) => (kind === 'contact' ? r.message_id : r.lead_id) !== id));
  };

  /** Dernière réponse reçue du contact, s'il y en a une. */
  const lastIncoming = (id: string) =>
    (repliesByMessage.get(id) ?? []).filter((r) => r.direction === 'in').at(-1);

  const openReply = (c: ContactMessage) => {
    const incoming = lastIncoming(c.id);
    const baseSubject = incoming?.subject || c.subject || 'votre message';
    return setReplyTarget({
      kind: 'contact',
      id: c.id,
      // On répond à l'adresse qui a écrit en dernier (affichée dans la fenêtre).
      to: incoming?.from_email || c.email,
      toName: c.name ?? '',
      subject: baseSubject.toLowerCase().startsWith('re') ? baseSubject : `Re : ${baseSubject}`,
      quote: incoming?.body || c.message || '',
    });
  };

  const openReplyLead = (l: Lead) => {
    const incoming = lastIncoming(l.id);
    return setReplyTarget({
      kind: 'lead',
      id: l.id,
      to: incoming?.from_email || l.email,
      toName: l.name ?? '',
      subject: incoming?.subject || 'Votre demande sur Guide-Taechir.org',
      quote: incoming?.body || '',
    });
  };

  // Une réponse envoyée marque aussi l'élément comme lu (côté base : admin_add_reply)
  const handleSent = (reply: MessageReply) => {
    setReplies((rs) => [...rs, reply]);
    if (reply.message_id) {
      setContacts((cs) => cs.map((c) => (c.id === reply.message_id ? { ...c, is_read: true } : c)));
    }
    if (reply.lead_id) {
      setLeads((ls) => ls.map((l) => (l.id === reply.lead_id ? { ...l, is_read: true } : l)));
    }
    setReplyTarget(null);
    setToast(`Réponse envoyée à ${reply.to_email}.`);
  };

  const unreadContacts = contacts.filter((c) => !c.is_read).length;
  const unreadLeads = leads.filter((l) => !l.is_read).length;

  /* ── Login screen ──────────────────────────────────────────────────────── */
  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 font-sans">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <Globe className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Guide-<span className="text-indigo-600">Taechir.org</span>
            </span>
          </Link>
          <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mx-auto mb-5">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 text-center mb-1">Espace administration</h1>
            <p className="text-sm text-slate-500 text-center mb-6">Saisissez le mot de passe d'accès.</p>

            {loginError && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-700">
                <AlertTriangle className="w-4 h-4 shrink-0" /> Mot de passe incorrect.
              </div>
            )}

            <input
              type="password"
              autoFocus
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              placeholder="Mot de passe"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors mb-4"
            />
            <button
              type="submit"
              disabled={loading || !pwInput}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <KeyRound className="w-5 h-5" />}
              Se connecter
            </button>
          </form>
          <p className="text-center text-xs text-slate-400 mt-6">
            <Link to="/" className="hover:text-indigo-600">← Retour au site</Link>
          </p>
        </div>
      </div>
    );
  }

  /* ── Dashboard ─────────────────────────────────────────────────────────── */
  const list = tab === 'contacts' ? contacts : leads;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-lg tracking-tight">Administration</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => load(password)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Actualiser
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" /> Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab('contacts')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              tab === 'contacts' ? 'bg-indigo-600 text-white shadow' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Mail className="w-4 h-4" /> Messages
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === 'contacts' ? 'bg-white/20' : 'bg-slate-100'}`}>
              {contacts.length}
            </span>
            {unreadContacts > 0 && <span className="w-2 h-2 rounded-full bg-rose-400" title={`${unreadContacts} non lus`} />}
          </button>
          <button
            onClick={() => setTab('leads')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              tab === 'leads' ? 'bg-indigo-600 text-white shadow' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Download className="w-4 h-4" /> Leads
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === 'leads' ? 'bg-white/20' : 'bg-slate-100'}`}>
              {leads.length}
            </span>
            {unreadLeads > 0 && <span className="w-2 h-2 rounded-full bg-rose-400" title={`${unreadLeads} non lus`} />}
          </button>
        </div>

        {/* Empty state */}
        {list.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
            <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">
              {tab === 'contacts' ? 'Aucun message pour le moment.' : 'Aucun lead pour le moment.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {tab === 'contacts'
              ? (contacts as ContactMessage[]).map((c) => {
                  const thread = repliesByMessage.get(c.id) ?? [];
                  return (
                  <article
                    key={c.id}
                    className={`bg-white rounded-xl border p-5 transition-colors ${c.is_read ? 'border-slate-200' : 'border-indigo-200 bg-indigo-50/30'}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          {!c.is_read && <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">Nouveau</span>}
                          <ThreadBadges replies={thread} />
                          <span className="font-semibold text-slate-900">{c.name || 'Sans nom'}</span>
                          <a href={`mailto:${c.email}`} className="text-sm text-indigo-600 hover:underline truncate">{c.email}</a>
                        </div>
                        {c.subject && <p className="text-sm font-medium text-slate-700 mb-1">{c.subject}</p>}
                        {c.message && <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{c.message}</p>}
                        <p className="text-xs text-slate-400 mt-2">{fmt(c.created_at)}</p>
                        <button
                          onClick={() => openReply(c)}
                          className="mt-3 inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
                        >
                          <Reply className="w-4 h-4" /> Répondre
                        </button>
                        <ReplyThread replies={thread} />
                      </div>
                      <div className="flex flex-col gap-1.5 shrink-0">
                        <button onClick={() => toggleRead('contact', c.id, c.is_read)} title={c.is_read ? 'Marquer non lu' : 'Marquer lu'}
                          className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                          {c.is_read ? <Circle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                        </button>
                        <button onClick={() => remove('contact', c.id)} title="Supprimer"
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                  );
                })
              : (leads as Lead[]).map((l) => {
                  const thread = repliesByMessage.get(l.id) ?? [];
                  return (
                  <article
                    key={l.id}
                    className={`bg-white rounded-xl border p-5 transition-colors ${l.is_read ? 'border-slate-200' : 'border-indigo-200 bg-indigo-50/30'}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          {!l.is_read && <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">Nouveau</span>}
                          <ThreadBadges replies={thread} />
                          <span className="font-semibold text-slate-900">{l.name || 'Sans nom'}</span>
                          <a href={`mailto:${l.email}`} className="text-sm text-indigo-600 hover:underline truncate">{l.email}</a>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          {l.company && <span className="inline-flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-slate-400" />{l.company}</span>}
                          <span className="inline-flex items-center gap-1 text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{l.source}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">{fmt(l.created_at)}</p>
                        <button
                          onClick={() => openReplyLead(l)}
                          className="mt-3 inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
                        >
                          <Reply className="w-4 h-4" /> Répondre
                        </button>
                        <ReplyThread replies={thread} />
                      </div>
                      <div className="flex flex-col gap-1.5 shrink-0">
                        <button onClick={() => toggleRead('lead', l.id, l.is_read)} title={l.is_read ? 'Marquer non lu' : 'Marquer lu'}
                          className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                          {l.is_read ? <Circle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                        </button>
                        <button onClick={() => remove('lead', l.id)} title="Supprimer"
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                  );
                })}
          </div>
        )}

        <p className="text-center text-xs text-slate-400 mt-10">
          Données stockées sur Supabase · accès protégé par mot de passe · réponses envoyées via Brevo.
        </p>
      </main>

      {replyTarget && (
        <ReplyDialog
          key={replyTarget.id}
          target={replyTarget}
          password={password}
          onClose={() => setReplyTarget(null)}
          onSent={handleSent}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[210] flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {toast}
        </div>
      )}
    </div>
  );
}
