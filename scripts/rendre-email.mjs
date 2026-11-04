#!/usr/bin/env node
/**
 * Rend un e-mail rédigé en Markdown dans le gabarit visuel du site
 * (bandeau indigo des lettres Guide-Taechir), pour les envois faits hors du
 * serveur, par exemple depuis Gmail : un e-mail en texte brut perd l'identité
 * du site et se lit comme un message anonyme.
 *
 *   node scripts/rendre-email.mjs message.md [--sous-titre "…"] [--out dossier]
 *
 * Fichier d'entrée : première ligne `Objet : …`, une ligne vide, puis le corps.
 * Markdown pris en charge : paragraphes, listes `- `, **gras**, [liens](url),
 * et `> ` pour un encadré mis en valeur. Le HTML saisi est échappé.
 *
 * Sorties : `<nom>.html` (htmlBody) et `<nom>.txt` (body, repli texte),
 * plus l'objet affiché sur la sortie standard.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { basename, join, dirname } from 'node:path';

const INDIGO = '#4f46e5';
const BANDEAU = '#312e81';
const FONT = 'Arial,Helvetica,sans-serif';

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const inline = (s) =>
  esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      `<a href="$2" style="color:${INDIGO};">$1</a>`,
    );

function corpsHtml(md) {
  const out = [];
  let para = [];
  let liste = [];
  let encadre = [];
  const p = 'margin:0 0 14px;';
  const flush = () => {
    if (para.length) out.push(`<p style="${p}">${para.map(inline).join('<br />')}</p>`);
    if (liste.length)
      out.push(
        `<ul style="margin:0 0 16px;padding-left:20px;">${liste
          .map((l) => `<li style="margin:0 0 8px;">${inline(l)}</li>`)
          .join('')}</ul>`,
      );
    if (encadre.length)
      out.push(
        `<p style="margin:0 0 16px;padding:14px 16px;background:#eef2ff;border-left:4px solid ${INDIGO};">${encadre
          .map(inline)
          .join('<br />')}</p>`,
      );
    para = [];
    liste = [];
    encadre = [];
  };
  for (const ligne of md.replace(/\r\n/g, '\n').split('\n')) {
    const t = ligne.trim();
    if (!t) { flush(); continue; }
    const puce = t.match(/^[-*]\s+(.*)$/);
    const cit = t.match(/^>\s?(.*)$/);
    if (puce) { if (para.length || encadre.length) { const l = liste; liste = []; flush(); liste = l; } liste.push(puce[1]); }
    else if (cit) { if (para.length || liste.length) flush(); encadre.push(cit[1]); }
    else if (liste.length && /^\s{2,}/.test(ligne)) liste[liste.length - 1] += ' ' + t;
    else { if (liste.length || encadre.length) flush(); para.push(t); }
  }
  flush();
  return out.join('\n');
}

function texte(md) {
  return md
    .replace(/\r\n/g, '\n')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '$1 ($2)')
    .replace(/^>\s?/gm, '')
    .trim();
}

export function rendre(source, sousTitre = 'Le guide de la procédure TAECHIR') {
  const lignes = source.replace(/\r\n/g, '\n').split('\n');
  const m = lignes[0].match(/^Objet\s*:\s*(.+)$/i);
  if (!m) throw new Error('La première ligne doit être « Objet : … ».');
  const objet = m[1].trim();
  const md = lignes.slice(1).join('\n').trim();
  const accroche = texte(md).split('\n').find((l) => l && !/^bonjour/i.test(l)) ?? '';

  const html = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(objet)}</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;">
<div style="display:none;max-height:0;overflow:hidden;">${esc(accroche.slice(0, 140))}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;">
<tr><td style="background:${BANDEAU};padding:24px 32px;font-family:${FONT};color:#ffffff;">
<div style="font-size:20px;font-weight:700;">Guide-Taechir.org</div>
<div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#c7d2fe;margin-top:6px;">${esc(sousTitre)}</div>
</td></tr>
<tr><td style="padding:28px 32px 12px;font-family:${FONT};font-size:16px;line-height:1.65;color:#1e293b;">
${corpsHtml(md)}
</td></tr>
<tr><td style="padding:18px 32px 26px;border-top:1px solid #e2e8f0;font-family:${FONT};font-size:13px;line-height:1.6;color:#64748b;">
<strong style="color:#0f172a;">Guide-Taechir.org</strong><br />
Guide indépendant sur le visa des contrats de travail d'étrangers au Maroc —
<a href="https://www.guide-taechir.org" style="color:${INDIGO};text-decoration:none;">guide-taechir.org</a>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  return { objet, html, texte: `${texte(md)}\n\n--\nGuide-Taechir.org — https://www.guide-taechir.org\n` };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const fichier = args.find((a) => !a.startsWith('--') && args[args.indexOf(a) - 1]?.startsWith('--') !== true);
  if (!fichier) {
    console.error('Usage : node scripts/rendre-email.mjs message.md [--sous-titre "…"] [--out dossier]');
    process.exit(1);
  }
  const opt = (nom) => { const i = args.indexOf(nom); return i >= 0 ? args[i + 1] : undefined; };
  const { objet, html, texte: txt } = rendre(readFileSync(fichier, 'utf8'), opt('--sous-titre'));
  const dossier = opt('--out') ?? dirname(fichier);
  mkdirSync(dossier, { recursive: true });
  const base = join(dossier, basename(fichier).replace(/\.md$/, ''));
  writeFileSync(`${base}.html`, html);
  writeFileSync(`${base}.txt`, txt);
  console.log(objet);
}
