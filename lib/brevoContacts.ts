/** Appels Brevo de la séquence (contacts, attributs). Ne lancent jamais. */

export async function brevo(path: string, key: string, init: RequestInit = {}) {
  try {
    const res = await fetch(`https://api.brevo.com/v3${path}`, {
      ...init,
      headers: { accept: 'application/json', 'content-type': 'application/json', 'api-key': key },
    });
    const text = await res.text();
    let data: unknown = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }
    return { ok: res.ok, status: res.status, data };
  } catch (e) {
    return { ok: false, status: 0, data: e instanceof Error ? e.message : String(e) };
  }
}

/** Pose des attributs (et options de liste) sur un contact identifié par son e-mail. */
export function majContact(key: string, email: string, payload: Record<string, unknown>) {
  return brevo(`/contacts/${encodeURIComponent(email.trim().toLowerCase())}?identifierType=email_id`, key, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
