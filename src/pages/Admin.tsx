import { useEffect, useState, useCallback, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe, Lock, LogOut, RefreshCw, Trash2, Mail, Download, Inbox,
  CheckCircle2, Circle, AlertTriangle, KeyRound, Building2,
} from 'lucide-react';
import { supabase, type ContactMessage, type Lead } from '../lib/supabase';

const STORAGE_KEY = 'gt_admin_pw';

type Tab = 'contacts' | 'leads';

export function Admin() {
  const [password, setPassword] = useState<string>(() => sessionStorage.getItem(STORAGE_KEY) ?? '');
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [tab, setTab] = useState<Tab>('contacts');

  useEffect(() => {
    document.title = 'Administration — Guide-Taechir.org';
  }, []);

  const load = useCallback(async (pw: string) => {
    setLoading(true);
    const { data, error } = await supabase.rpc('admin_list', { p_password: pw });
    setLoading(false);
    if (error || !data) return false;
    setContacts((data as { contacts: ContactMessage[] }).contacts ?? []);
    setLeads((data as { leads: Lead[] }).leads ?? []);
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
  };

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

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
              ? (contacts as ContactMessage[]).map((c) => (
                  <article
                    key={c.id}
                    className={`bg-white rounded-xl border p-5 transition-colors ${c.is_read ? 'border-slate-200' : 'border-indigo-200 bg-indigo-50/30'}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          {!c.is_read && <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">Nouveau</span>}
                          <span className="font-semibold text-slate-900">{c.name || 'Sans nom'}</span>
                          <a href={`mailto:${c.email}`} className="text-sm text-indigo-600 hover:underline truncate">{c.email}</a>
                        </div>
                        {c.subject && <p className="text-sm font-medium text-slate-700 mb-1">{c.subject}</p>}
                        {c.message && <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{c.message}</p>}
                        <p className="text-xs text-slate-400 mt-2">{fmt(c.created_at)}</p>
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
                ))
              : (leads as Lead[]).map((l) => (
                  <article
                    key={l.id}
                    className={`bg-white rounded-xl border p-5 transition-colors ${l.is_read ? 'border-slate-200' : 'border-indigo-200 bg-indigo-50/30'}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          {!l.is_read && <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">Nouveau</span>}
                          <span className="font-semibold text-slate-900">{l.name || 'Sans nom'}</span>
                          <a href={`mailto:${l.email}`} className="text-sm text-indigo-600 hover:underline truncate">{l.email}</a>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          {l.company && <span className="inline-flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-slate-400" />{l.company}</span>}
                          <span className="inline-flex items-center gap-1 text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{l.source}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">{fmt(l.created_at)}</p>
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
                ))}
          </div>
        )}

        <p className="text-center text-xs text-slate-400 mt-10">
          Données stockées sur Supabase · accès protégé par mot de passe.
        </p>
      </main>
    </div>
  );
}
