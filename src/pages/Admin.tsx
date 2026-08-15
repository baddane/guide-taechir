import { useEffect, useMemo, useState, useCallback, FormEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../blog/articles';
import {
  Globe, Lock, LogOut, RefreshCw, Trash2, Inbox,
  CheckCircle2, Circle, AlertTriangle, KeyRound, Building2, Reply, Send, X,
  CornerDownRight, CornerDownLeft,
} from 'lucide-react';
import {
  supabase,
  type ContactMessage,
  type Lead,
  type MessageReply,
  type OutreachRow,
} from '../lib/supabase';

const STORAGE_KEY = 'gt_admin_pw';

type Tab = 'contacts' | 'leads' | 'outreach' | 'newsletter' | 'composer';

const TABS: { key: Tab; label: string }[] = [
  { key: 'contacts', label: 'Messages' },
  { key: 'leads', label: 'Leads' },
  { key: 'outreach', label: 'Outreach' },
  { key: 'newsletter', label: 'Newsletter' },
  { key: 'composer', label: 'Composer' },
];

const OUTREACH_STATUSES = [
  { value: 'contacted', label: 'Contacté' },
  { value: 'negotiating', label: 'En discussion' },
  { value: 'signed', label: 'Signé' },
  { value: 'declined', label: 'Refusé' },
];

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

    // On lit le corps en texte d'abord : une erreur de plateforme (502, 504…)
    // renvoie du HTML, pas du JSON, et c'est justement l'info qu'il faut voir.
    const raw = await res.text().catch(() => '');
    let data: { ok?: boolean; error?: string; status?: number; detail?: string; replyId?: string } | null = null;
    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      data = null;
    }

    if (!res.ok || !data?.ok) {
      setState('error');
      setError(
        errorLabel(data?.error, res.status, data?.detail, data ? '' : raw, requestId(res)),
      );
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

/** Identifiant de requête Vercel : la clé pour retrouver la trace dans les logs. */
function requestId(res: Response): string {
  return res.headers.get('x-vercel-id') ?? '';
}

function errorLabel(
  code: string | undefined,
  status: number,
  detail?: string,
  raw?: string,
  reqId?: string,
): string {
  const trace = reqId ? ` (requête ${reqId})` : '';

  // Réponse non-JSON = erreur de plateforme Vercel, jamais du code applicatif.
  if (!code && raw) {
    const platform = raw.match(/[A-Z_]{6,}/)?.[0];
    if (platform) {
      return `Erreur de plateforme Vercel (${status} ${platform}). La fonction n'a pas répondu${trace} — consultez les logs du déploiement.`;
    }
    return `Réponse inattendue du serveur (${status}) : ${raw.slice(0, 200)}`;
  }
  switch (code) {
    case 'server_error':
      return `Erreur interne de la route d'envoi${detail ? ` : ${detail}` : ''}${trace}.`;
    case 'supabase_unreachable':
      return 'La base Supabase n\'a pas répondu — le mot de passe n\'a donc pas pu être vérifié. Réessayez dans un instant.';
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

/* ── Blocs d'interface réutilisés par les onglets ────────────────────────── */
function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      {subtitle && <p className="text-sm text-slate-500 mt-1 mb-6">{subtitle}</p>}
      {!subtitle && <div className="mb-6" />}
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-slate-700 mb-2">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  'w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors';

function Notice({ kind, children }: { kind: 'ok' | 'error'; children: ReactNode }) {
  const ok = kind === 'ok';
  return (
    <div
      className={`flex items-start gap-3 rounded-lg p-4 mb-5 text-sm ${
        ok ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
           : 'bg-red-50 border border-red-200 text-red-700'
      }`}
    >
      {ok ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-px" /> : <AlertTriangle className="w-5 h-5 shrink-0 mt-px" />}
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}

/** Message d'erreur lisible à partir du code renvoyé par les routes serveur. */
function apiError(code: string | undefined, status: number, detail?: string): string {
  switch (code) {
    case 'server_error': return `Erreur interne de la route serveur${detail ? ` : ${detail}` : ''}.`;
    case 'supabase_unreachable': return 'La base Supabase n\'a pas répondu. Réessayez dans un instant.';
    case 'supabase_error': return 'La base Supabase a refusé la requête.';
    case 'unauthorized': return 'Session expirée. Reconnectez-vous.';
    case 'brevo_not_configured': return 'BREVO_API_KEY n\'est pas configurée sur le serveur (variables Vercel).';
    case 'newsletter_list_not_configured': return 'BREVO_NEWSLETTER_LIST_ID n\'est pas configurée sur le serveur.';
    case 'brevo_unreachable': return 'L\'API Brevo est injoignable. Réessayez dans un instant.';
    case 'brevo_error':
    case 'brevo_send_error':
      return `Brevo a refusé la requête${detail ? ` : ${detail}` : ''}.`;
    case 'no_valid_recipient': return 'Indiquez au moins un destinataire valide.';
    case 'invalid_recipient': return 'Une adresse destinataire est invalide.';
    case 'too_many_recipients': return 'Trop de destinataires pour un envoi direct — passez par la Newsletter.';
    case 'attachments_too_large': return 'Les pièces jointes dépassent la taille autorisée (8 Mo).';
    case 'missing_content': return 'L\'objet et le message sont obligatoires.';
    case 'missing_subject': return 'L\'objet est obligatoire.';
    case 'empty_campaign': return 'Sélectionnez au moins un article, ou écrivez une introduction.';
    default:
      return status === 404
        ? 'Route serveur introuvable. Le déploiement des fonctions est-il actif ?'
        : `Échec de la requête (erreur ${status}).`;
  }
}

async function postJson(url: string, payload: unknown) {
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    return { ok: false, message: 'Impossible de joindre le serveur.', data: null as any };
  }
  // Corps lu en texte d'abord : un plantage de la fonction renvoie une page
  // HTML, et c'est cette information-là qu'il faut afficher plutôt qu'un
  // « échec de la requête » sans cause.
  const raw = await res.text().catch(() => '');
  let data: any = null;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    data = null;
  }
  if (!res.ok || !data?.ok) {
    const message = data
      ? apiError(data.error, res.status, data.detail)
      : errorLabel(undefined, res.status, undefined, raw, requestId(res));
    return { ok: false, message, data };
  }
  return { ok: true, message: '', data };
}

/* ── Onglet Outreach : pipeline partenaires ──────────────────────────────── */
function OutreachTab({ password }: { password: string }) {
  const [rows, setRows] = useState<OutreachRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    partner_id: '', name: '', contact_email: '', status: 'contacted', commission_pct: '', notes: '',
  });

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: e } = await supabase.rpc('admin_outreach_list', { p_password: password });
    setLoading(false);
    if (e) { setError('Chargement impossible.'); return; }
    setRows((data as OutreachRow[]) ?? []);
  }, [password]);

  useEffect(() => { load(); }, [load]);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const { error: err } = await supabase.rpc('admin_outreach_upsert', {
      p_password: password,
      p_partner_id: form.partner_id,
      p_name: form.name || null,
      p_contact_email: form.contact_email || null,
      p_status: form.status,
      p_commission_pct: form.commission_pct ? Number(form.commission_pct) : null,
      p_notes: form.notes || null,
    });
    if (err) { setError('Enregistrement impossible. Vérifiez l\'identifiant du partenaire.'); return; }
    setForm({ partner_id: '', name: '', contact_email: '', status: 'contacted', commission_pct: '', notes: '' });
    load();
  };

  const edit = (row: OutreachRow) => setForm({
    partner_id: row.partner_id,
    name: row.name ?? '',
    contact_email: row.contact_email ?? '',
    status: row.status,
    commission_pct: row.commission_pct == null ? '' : String(row.commission_pct),
    notes: row.notes ?? '',
  });

  const remove = async (partnerId: string) => {
    if (!confirm('Retirer ce partenaire du pipeline ?')) return;
    await supabase.rpc('admin_outreach_delete', { p_password: password, p_partner_id: partnerId });
    setRows((rs) => rs.filter((r) => r.partner_id !== partnerId));
  };

  const statusLabel = (value: string) =>
    OUTREACH_STATUSES.find((s) => s.value === value)?.label ?? value;
  const statusClass = (value: string) =>
    value === 'signed' ? 'bg-emerald-100 text-emerald-700'
    : value === 'negotiating' ? 'bg-amber-100 text-amber-700'
    : value === 'declined' ? 'bg-slate-200 text-slate-600'
    : 'bg-indigo-100 text-indigo-700';

  return (
    <div className="space-y-6">
      <Panel title="Ajouter ou mettre à jour un partenaire"
             subtitle="L'identifiant sert de clé : réutilisez-le pour mettre à jour une fiche existante.">
        {error && <Notice kind="error">{error}</Notice>}
        <form onSubmit={save} className="grid sm:grid-cols-2 gap-4">
          <Field label="Identifiant *">
            <input required value={form.partner_id} placeholder="cabinet-rh-casablanca"
              onChange={(e) => setForm({ ...form, partner_id: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Nom affiché">
            <input value={form.name} placeholder="Cabinet RH Casablanca"
              onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
          </Field>
          <Field label="E-mail de contact">
            <input type="email" value={form.contact_email} placeholder="contact@partenaire.ma"
              onChange={(e) => setForm({ ...form, contact_email: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Statut">
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
              className={`${inputClass} bg-white`}>
              {OUTREACH_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </Field>
          <Field label="Commission (%)">
            <input type="number" min={0} max={100} value={form.commission_pct}
              onChange={(e) => setForm({ ...form, commission_pct: e.target.value })} className={inputClass} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Notes">
              <textarea rows={3} value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })} className={`${inputClass} resize-y`} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <button type="submit" disabled={!form.partner_id.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
              <Building2 className="w-4 h-4" /> Enregistrer
            </button>
          </div>
        </form>
      </Panel>

      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto" />
        </div>
      ) : rows.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Aucun élément.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => (
            <article key={row.partner_id} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${statusClass(row.status)}`}>
                      {statusLabel(row.status)}
                    </span>
                    <span className="font-semibold text-slate-900">{row.name || row.partner_id}</span>
                    {row.commission_pct != null && (
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {row.commission_pct} % de commission
                      </span>
                    )}
                  </div>
                  {row.contact_email && (
                    <a href={`mailto:${row.contact_email}`} className="text-sm text-indigo-600 hover:underline">
                      {row.contact_email}
                    </a>
                  )}
                  {row.notes && <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap mt-1">{row.notes}</p>}
                  <p className="text-xs text-slate-400 mt-2">Mis à jour le {fmt(row.updated_at)}</p>
                </div>
                <div className="flex flex-col gap-1.5 shrink-0">
                  <button onClick={() => edit(row)} title="Modifier"
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <KeyRound className="w-4 h-4" />
                  </button>
                  <button onClick={() => remove(row.partner_id)} title="Supprimer"
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Onglet Newsletter : sélection d'articles → campagne Brevo ───────────── */
const FR_MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

/** « 15 janvier 2026 » → timestamp, pour trier du plus récent au plus ancien. */
export function parseFrDate(value: string): number {
  const m = value.trim().toLowerCase().match(/^(\d{1,2})\s+([^\s]+)\s+(\d{4})$/);
  if (!m) return 0;
  const month = FR_MONTHS.indexOf(m[2]);
  if (month === -1) return 0;
  return new Date(Number(m[3]), month, Number(m[1])).getTime();
}

function NewsletterTab({ password }: { password: string }) {
  const sorted = useMemo(
    () => [...articles].sort((a, b) => parseFrDate(b.date) - parseFrDate(a.date)),
    [],
  );
  const [selected, setSelected] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [intro, setIntro] = useState('');
  const [status, setStatus] = useState<{ subscribers: number; listName: string | null } | null>(null);
  const [busy, setBusy] = useState<'' | 'status' | 'sync' | 'send'>('status');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let cancelled = false;
    postJson('/api/admin/newsletter', { password, action: 'status' }).then((r) => {
      if (cancelled) return;
      setBusy('');
      if (r.ok) setStatus({ subscribers: r.data.subscribers, listName: r.data.listName });
      else setError(r.message);
    });
    return () => { cancelled = true; };
  }, [password]);

  const toggle = (slug: string) =>
    setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]));

  const sync = async () => {
    setBusy('sync'); setError(''); setSuccess('');
    const r = await postJson('/api/admin/newsletter', { password, action: 'sync' });
    setBusy('');
    if (!r.ok) { setError(r.message); return; }
    setSuccess(`${r.data.imported} contact(s) synchronisé(s) vers la liste Brevo.`);
    const s = await postJson('/api/admin/newsletter', { password, action: 'status' });
    if (s.ok) setStatus({ subscribers: s.data.subscribers, listName: s.data.listName });
  };

  const send = async (e: FormEvent) => {
    e.preventDefault();
    if (!confirm(`Envoyer la campagne à ${status?.subscribers ?? '?'} abonné(s) ? Cette action est irréversible.`)) return;
    setBusy('send'); setError(''); setSuccess('');
    const chosen = sorted.filter((a) => selected.includes(a.slug));
    const r = await postJson('/api/admin/newsletter', {
      password,
      action: 'send',
      subject,
      intro,
      articles: chosen.map((a) => ({
        slug: a.slug, title: a.title, excerpt: a.excerpt, date: a.date, category: a.category,
      })),
    });
    setBusy('');
    if (!r.ok) { setError(r.message); return; }
    setSuccess(`Campagne envoyée (${r.data.articles} article(s)).`);
    setSelected([]); setSubject(''); setIntro('');
  };

  return (
    <div className="space-y-6">
      <Panel title="Liste de diffusion"
             subtitle="Les campagnes partent via Brevo, avec lien de désinscription.">
        {error && <Notice kind="error">{error}</Notice>}
        {success && <Notice kind="ok">{success}</Notice>}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            {busy === 'status' ? (
              <p className="text-sm text-slate-400">Lecture de la liste…</p>
            ) : status ? (
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">{status.subscribers}</span> abonné(s)
                {status.listName ? <> dans « {status.listName} »</> : null}
              </p>
            ) : (
              <p className="text-sm text-slate-400">Liste indisponible.</p>
            )}
          </div>
          <button onClick={sync} disabled={busy !== ''}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors disabled:opacity-60">
            {busy === 'sync' ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Synchroniser les contacts
          </button>
        </div>
      </Panel>

      <Panel title="Composer la campagne" subtitle="Articles listés du plus récent au plus ancien.">
        <form onSubmit={send} className="space-y-5">
          <Field label="Objet *">
            <input required value={subject} onChange={(e) => setSubject(e.target.value)}
              placeholder="Les nouveautés TAECHIR de ce mois" className={inputClass} />
          </Field>
          <Field label="Introduction (Markdown, facultatif)">
            <textarea rows={4} value={intro} onChange={(e) => setIntro(e.target.value)}
              placeholder={'Bonjour,\n\nVoici la sélection du mois.'} className={`${inputClass} resize-y`} />
          </Field>

          <div>
            <p className="text-sm font-semibold text-slate-700 mb-2">
              Articles ({selected.length} sélectionné{selected.length > 1 ? 's' : ''})
            </p>
            <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {sorted.map((a) => (
                <label key={a.slug} className="flex items-start gap-3 p-3 hover:bg-slate-50 cursor-pointer">
                  <input type="checkbox" checked={selected.includes(a.slug)} onChange={() => toggle(a.slug)}
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-slate-800">{a.title}</span>
                    <span className="block text-xs text-slate-400 mt-0.5">{a.category} · {a.date}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" disabled={busy !== '' || !subject.trim() || (selected.length === 0 && !intro.trim())}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            {busy === 'send' ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {busy === 'send' ? 'Envoi en cours…' : 'Envoyer la campagne'}
          </button>
        </form>
      </Panel>
    </div>
  );
}

/* ── Onglet Composer : e-mail libre en Markdown ──────────────────────────── */
function ComposerTab({ password }: { password: string }) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [archive, setArchive] = useState(true);
  const [files, setFiles] = useState<{ name: string; content: string; size: number }[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const addFiles = async (list: FileList | null) => {
    if (!list) return;
    const read = await Promise.all(
      Array.from(list).map(
        (file) =>
          new Promise<{ name: string; content: string; size: number }>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () =>
              resolve({
                name: file.name,
                content: String(reader.result).split(',')[1] ?? '',
                size: file.size,
              });
            reader.onerror = () => reject(new Error('read_error'));
            reader.readAsDataURL(file);
          }),
      ),
    ).catch(() => []);
    setFiles((f) => [...f, ...read]);
  };

  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);

  const send = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setError(''); setSuccess('');
    const r = await postJson('/api/admin/compose', {
      password, to, subject, body, archive,
      attachments: files.map((f) => ({ name: f.name, content: f.content })),
    });
    setBusy(false);
    if (!r.ok) { setError(r.message); return; }
    setSuccess(`E-mail envoyé à ${r.data.recipients} destinataire(s).`);
    setTo(''); setSubject(''); setBody(''); setFiles([]);
  };

  return (
    <Panel title="Écrire un e-mail"
           subtitle="Envoi direct depuis contact@guide-taechir.org. Le corps accepte le Markdown.">
      {error && <Notice kind="error">{error}</Notice>}
      {success && <Notice kind="ok">{success}</Notice>}
      <form onSubmit={send} className="space-y-5">
        <Field label="Destinataires * (séparés par des virgules)">
          <input required value={to} onChange={(e) => setTo(e.target.value)}
            placeholder="prenom@exemple.com, autre@exemple.com" className={inputClass} />
        </Field>
        <Field label="Objet *">
          <input required value={subject} onChange={(e) => setSubject(e.target.value)} className={inputClass} />
        </Field>
        <Field label="Message * (Markdown)">
          <textarea required rows={12} value={body} onChange={(e) => setBody(e.target.value)}
            placeholder={'## Titre\n\nBonjour **Nom**,\n\n- point 1\n- point 2\n\n[Voir le guide](https://www.guide-taechir.org)'}
            className={`${inputClass} resize-y text-sm leading-relaxed`} />
        </Field>

        <div>
          <span className="block text-sm font-semibold text-slate-700 mb-2">Pièces jointes</span>
          <input type="file" multiple onChange={(e) => addFiles(e.target.files)}
            className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200" />
          {files.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {files.map((f, i) => (
                <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                  <span className="truncate text-slate-700">{f.name}</span>
                  <span className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-slate-400">{Math.round(f.size / 1024)} Ko</span>
                    <button type="button" onClick={() => setFiles((fs) => fs.filter((_, j) => j !== i))}
                      className="text-slate-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                  </span>
                </li>
              ))}
            </ul>
          )}
          {totalBytes > 8 * 1024 * 1024 && (
            <p className="text-xs text-red-600 mt-2">Total supérieur à 8 Mo : l'envoi sera refusé.</p>
          )}
        </div>

        <label className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer">
          <input type="checkbox" checked={archive} onChange={(e) => setArchive(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
          Archiver cet envoi dans Supabase
        </label>

        <button type="submit" disabled={busy || !to.trim() || !subject.trim() || !body.trim()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
          {busy ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {busy ? 'Envoi en cours…' : 'Envoyer'}
        </button>
      </form>
    </Panel>
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
  const isInbox = tab === 'contacts' || tab === 'leads';
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
        {/* Onglets */}
        <div className="flex items-center gap-6 border-b border-slate-200 mb-6 overflow-x-auto">
          {TABS.map(({ key, label }) => {
            const active = tab === key;
            const badge =
              key === 'contacts' ? unreadContacts : key === 'leads' ? unreadLeads : 0;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`relative flex items-center gap-1.5 whitespace-nowrap pb-3 -mb-px text-xs font-semibold uppercase tracking-widest transition-colors border-b-2 ${
                  active
                    ? 'text-indigo-600 border-indigo-600'
                    : 'text-slate-500 border-transparent hover:text-slate-800'
                }`}
              >
                {label}
                {badge > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" title={`${badge} non lus`} />
                )}
              </button>
            );
          })}
        </div>

        {tab === 'outreach' && <OutreachTab password={password} />}
        {tab === 'newsletter' && <NewsletterTab password={password} />}
        {tab === 'composer' && <ComposerTab password={password} />}

        {/* Messages et Leads */}
        {isInbox && (list.length === 0 ? (
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
        ))}

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
