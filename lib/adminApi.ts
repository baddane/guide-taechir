/** Accès Supabase et garde d'authentification partagés par les routes `api/admin/*`. */

export const SUPABASE_URL =
  process.env.SUPABASE_URL || 'https://yjxuutdnhsvrbbgcqltw.supabase.co';
export const SUPABASE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_x4ehI4AgVADT4U190djnGg_eXRCPd9c';

export interface RpcResult {
  ok: boolean;
  /** 0 quand Supabase n'a pas pu être joint du tout (réseau, DNS, TLS). */
  status: number;
  data: unknown;
  /** Renseigné uniquement en cas d'échec réseau. */
  detail?: string;
}

export interface RpcOptions {
  /**
   * Réessaie une fois quand le réseau échoue. À réserver aux appels sans effet
   * de bord : un `fetch` qui rejette peut malgré tout avoir atteint Supabase,
   * donc rejouer une écriture risquerait de la dupliquer.
   */
  retry?: boolean;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Appelle une fonction RPC Supabase. Ne lance jamais : une panne réseau ressort
 * en `{ ok: false, status: 0 }`. Sans cette garde, l'exception remontait hors du
 * handler et Vercel répondait une page d'erreur HTML 502 au dashboard.
 */
export async function rpc(
  fn: string,
  args: Record<string, unknown>,
  options: RpcOptions = {},
): Promise<RpcResult> {
  const attempts = options.retry ? 2 : 1;
  let detail = '';

  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify(args),
      });
      const text = await res.text();
      let data: unknown = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = text;
      }
      return { ok: res.ok, status: res.status, data };
    } catch (error) {
      detail = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
      if (attempt + 1 < attempts) await sleep(250);
    }
  }

  console.error(`[supabase] ${fn} injoignable — ${detail}`);
  return { ok: false, status: 0, data: null, detail };
}

/**
 * Résultat de la vérification du mot de passe admin.
 *  - `ok`          : mot de passe valide ;
 *  - `invalid`     : mot de passe refusé par la base ;
 *  - `unreachable` : Supabase n'a pas répondu — surtout ne pas présenter ça
 *                    comme un mot de passe invalide, l'admin chercherait au
 *                    mauvais endroit.
 */
export type AdminAuth = 'ok' | 'invalid' | 'unreachable';

/** Le mot de passe admin est toujours validé côté serveur avant tout envoi. */
export async function verifyAdmin(password: string): Promise<AdminAuth> {
  const out = await rpc('admin_verify', { p_password: password }, { retry: true });
  if (!out.ok) return 'unreachable';
  return out.data === true ? 'ok' : 'invalid';
}

/**
 * Répond à la place du handler quand l'authentification n'aboutit pas.
 * Renvoie `true` quand la requête a été traitée et que l'appelant doit s'arrêter.
 */
export async function denyUnlessAdmin(password: string, res: ApiResponse): Promise<boolean> {
  const auth = await verifyAdmin(password);
  if (auth === 'ok') return false;
  if (auth === 'unreachable') {
    res.status(503).json({ ok: false, error: 'supabase_unreachable' });
    return true;
  }
  res.status(401).json({ ok: false, error: 'unauthorized' });
  return true;
}

/* ── Types de requête/réponse des fonctions Vercel (sans dépendance) ──────── */
export interface ApiRequest {
  method?: string;
  url?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
}

export interface ApiResponse {
  status(code: number): ApiResponse;
  json(payload: unknown): void;
  setHeader(name: string, value: string): void;
  end(): void;
}

export function readBody(body: unknown): Record<string, unknown> {
  if (typeof body === 'string') {
    try {
      return (JSON.parse(body) ?? {}) as Record<string, unknown>;
    } catch {
      return {};
    }
  }
  return (body ?? {}) as Record<string, unknown>;
}

export function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/* ── Filet de sécurité des handlers ───────────────────────────────────────── */

export type Handler = (req: ApiRequest, res: ApiResponse) => Promise<void> | void;

/**
 * Enveloppe un handler pour qu'aucune exception ne remonte à la plateforme.
 *
 * Une exception non rattrapée fait répondre à Vercel sa propre page d'erreur
 * HTML (502 FUNCTION_INVOCATION_FAILED) : le dashboard reçoit du HTML au lieu
 * du JSON attendu et ne peut afficher que « la fonction n'a pas répondu ».
 * Ici on journalise la cause (visible dans les logs Vercel) et on renvoie un
 * JSON exploitable, avec le code que le dashboard sait traduire.
 */
export function withGuard(route: string, handler: Handler): Handler {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      const detail = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
      console.error(`[${route}] échec du handler — ${detail}`, error);
      try {
        res.status(500).json({ ok: false, error: 'server_error', detail });
      } catch {
        // Réponse déjà envoyée : l'erreur est journalisée, rien de plus à faire.
      }
    }
  };
}
