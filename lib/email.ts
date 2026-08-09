/**
 * Briques d'e-mail partagées par les routes serveur (`api/**`).
 *
 * Placé hors de `src/` (client) et de `api/` (fonctions) : Vite ne l'embarque
 * pas dans le bundle du site, Vercel le trace comme dépendance des fonctions.
 */

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Texte brut → paragraphes HTML (les simples retours deviennent des <br>). */
export function textToParagraphs(text: string): string {
  return text
    .split(/\n{2,}/)
    .map(
      (block) =>
        `<p style="margin:0 0 16px;">${escapeHtml(block).replace(/\n/g, '<br />')}</p>`,
    )
    .join('');
}

/* ── Markdown minimal ─────────────────────────────────────────────────────
 * Couvre ce qu'on écrit réellement dans un e-mail : titres, gras, italique,
 * liens, code, listes, citations, filets. Le HTML est échappé en amont, donc
 * aucune balise saisie par l'auteur n'est interprétée.
 */
function inlineMarkdown(text: string): string {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code style="background:#f1f5f9;padding:2px 5px;border-radius:4px;font-size:13px;">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" style="color:#4f46e5;text-decoration:underline;">$1</a>',
    );
}

export function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  let paragraph: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    out.push(`<p style="margin:0 0 16px;">${paragraph.map(inlineMarkdown).join('<br />')}</p>`);
    paragraph = [];
  };
  const closeList = () => {
    if (listType) {
      out.push(`</${listType}>`);
      listType = null;
    }
  };
  const openList = (type: 'ul' | 'ol') => {
    if (listType === type) return;
    closeList();
    out.push(`<${type} style="margin:0 0 16px;padding-left:22px;">`);
    listType = type;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === '') {
      flushParagraph();
      closeList();
      continue;
    }
    if (/^---+$/.test(trimmed)) {
      flushParagraph();
      closeList();
      out.push('<hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />');
      continue;
    }

    const heading = trimmed.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      const size = level === 1 ? 22 : level === 2 ? 18 : 16;
      out.push(
        `<h${level} style="margin:28px 0 12px;font-size:${size}px;line-height:1.3;color:#0f172a;">${inlineMarkdown(heading[2])}</h${level}>`,
      );
      continue;
    }

    const quote = trimmed.match(/^>\s?(.*)$/);
    if (quote) {
      flushParagraph();
      closeList();
      out.push(
        `<blockquote style="margin:0 0 16px;padding:10px 16px;border-left:3px solid #c7d2fe;background:#f8fafc;color:#475569;">${inlineMarkdown(quote[1])}</blockquote>`,
      );
      continue;
    }

    const bullet = trimmed.match(/^[-*+]\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      openList('ul');
      out.push(`<li style="margin:0 0 6px;">${inlineMarkdown(bullet[1])}</li>`);
      continue;
    }

    const ordered = trimmed.match(/^\d+[.)]\s+(.*)$/);
    if (ordered) {
      flushParagraph();
      openList('ol');
      out.push(`<li style="margin:0 0 6px;">${inlineMarkdown(ordered[1])}</li>`);
      continue;
    }

    closeList();
    paragraph.push(trimmed);
  }
  flushParagraph();
  closeList();
  return out.join('\n');
}

/** Version texte lisible d'un contenu Markdown (repli des clients sans HTML). */
export function markdownToText(markdown: string): string {
  return markdown
    .replace(/\r\n/g, '\n')
    .replace(/^#{1,3}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '$1 ($2)')
    .replace(/^>\s?/gm, '')
    .trim();
}

/* ── Gabarit d'e-mail ─────────────────────────────────────────────────────── */
export interface ShellOptions {
  /** Bloc HTML additionnel inséré avant le pied de page (citation, CTA…). */
  extraHtml?: string;
  /** Ajoute le lien de désinscription (obligatoire pour un envoi de masse). */
  unsubscribe?: boolean;
}

export function emailShell(contentHtml: string, options: ShellOptions = {}): string {
  const unsubscribe = options.unsubscribe
    ? `<p style="margin:12px 0 0;font-size:12px;color:#94a3b8;">
         Vous recevez ce message car vous vous êtes inscrit sur Guide-Taechir.org.
         <a href="{{ unsubscribe }}" style="color:#94a3b8;text-decoration:underline;">Se désinscrire</a>.
       </p>`
    : '';

  return `<!doctype html>
<html lang="fr"><body style="margin:0;padding:24px;background:#f8fafc;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.65;color:#0f172a;">
    ${contentHtml}
    ${options.extraHtml ?? ''}
    <div style="margin-top:28px;padding-top:20px;border-top:1px solid #e2e8f0;font-size:13px;color:#64748b;">
      <p style="margin:0 0 4px;"><strong style="color:#0f172a;">Guide-Taechir.org</strong></p>
      <p style="margin:0;">Guide indépendant sur la procédure TAECHIR — <a href="https://www.guide-taechir.org" style="color:#4f46e5;text-decoration:none;">guide-taechir.org</a></p>
      ${unsubscribe}
    </div>
  </div>
</body></html>`;
}

/* ── Envoi transactionnel Brevo ───────────────────────────────────────────── */
export interface BrevoAttachment {
  name: string;
  content: string; // base64
}

export interface SendOptions {
  apiKey: string;
  sender: { email: string; name: string };
  replyTo?: { email: string; name?: string };
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  textContent?: string;
  attachment?: BrevoAttachment[];
  tags?: string[];
}

export interface SendResult {
  ok: boolean;
  /** 0 quand l'API Brevo n'a pas pu être jointe du tout. */
  status: number;
  messageId: string | null;
  detail: string;
}

export async function sendTransactional(options: SendOptions): Promise<SendResult> {
  const { apiKey, ...payload } = options;
  let res: Response;
  try {
    res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', accept: 'application/json', 'api-key': apiKey },
      body: JSON.stringify(payload),
    });
  } catch {
    return { ok: false, status: 0, messageId: null, detail: 'brevo_unreachable' };
  }
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    return { ok: false, status: res.status, messageId: null, detail: detail.slice(0, 500) };
  }
  const data = (await res.json().catch(() => ({}))) as { messageId?: string };
  return { ok: true, status: res.status, messageId: data.messageId ?? null, detail: '' };
}
