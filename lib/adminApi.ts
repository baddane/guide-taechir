/** Accès Supabase et garde d'authentification partagés par les routes `api/admin/*`. */

export const SUPABASE_URL =
  process.env.SUPABASE_URL || 'https://yjxuutdnhsvrbbgcqltw.supabase.co';
export const SUPABASE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_x4ehI4AgVADT4U190djnGg_eXRCPd9c';

export interface RpcResult {
  ok: boolean;
  status: number;
  data: unknown;
}

export async function rpc(fn: string, args: Record<string, unknown>): Promise<RpcResult> {
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
}

/** Le mot de passe admin est toujours validé côté serveur avant tout envoi. */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const out = await rpc('admin_verify', { p_password: password });
  return out.ok && out.data === true;
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
