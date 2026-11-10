/**
 * GET /api/guide/telecharger?session_id=cs_…
 *
 * Sert le PDF du guide après relecture de la session Stripe (payée, et
 * portant bien ce produit). Le dépôt étant public, seul un PDF CHIFFRÉ y est
 * versionné (private/guide-taechir-2026.pdf.enc, AES-256-GCM) ; il est
 * déchiffré ici avec la variable Vercel GUIDE_PDF_KEY. Le lien reste valable
 * et sert toujours l'édition en cours (mises à jour incluses dans l'achat).
 * vercel.json embarque private/** dans cette fonction (includeFiles).
 */

import { readFile } from 'node:fs/promises';
import { createDecipheriv } from 'node:crypto';
import { join } from 'node:path';
import { type ApiRequest, type ApiResponse, withGuard } from '../../lib/adminApi.js';
import { guidePaye } from '../../lib/stripe.js';
import { GUIDE } from '../../src/data/guidePayant.js';

type BinaryResponse = ApiResponse & { send(body: Buffer): void };

/** Format du fichier : IV (12 octets) | tag GCM (16 octets) | données. */
export async function dechiffrer(): Promise<Buffer | null> {
  const cle = Buffer.from(process.env.GUIDE_PDF_KEY ?? '', 'base64');
  if (cle.length !== 32) {
    console.error('[guide/telecharger] GUIDE_PDF_KEY absente ou invalide');
    return null;
  }
  try {
    const brut = await readFile(join(process.cwd(), 'private', 'guide-taechir-2026.pdf.enc'));
    const d = createDecipheriv('aes-256-gcm', cle, brut.subarray(0, 12));
    d.setAuthTag(brut.subarray(12, 28));
    return Buffer.concat([d.update(brut.subarray(28)), d.final()]);
  } catch (e) {
    console.error('[guide/telecharger] déchiffrement impossible :', e instanceof Error ? e.message : e);
    return null;
  }
}

async function handler(req: ApiRequest, res: ApiResponse) {
  const url = new URL(req.url ?? '/', 'http://x');
  const vente = await guidePaye(url.searchParams.get('session_id'));
  if (!vente) {
    res.status(403).json({ ok: false, error: 'lien_invalide', aide: 'Écrivez à contact@guide-taechir.org avec l\'adresse e-mail utilisée pour l\'achat.' });
    return;
  }
  const pdf = await dechiffrer();
  if (!pdf) {
    res.status(500).json({ ok: false, error: 'fichier_indisponible', aide: 'Écrivez à contact@guide-taechir.org : nous vous envoyons le guide.' });
    return;
  }
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${GUIDE.nomFichier}"`);
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.status(200);
  (res as BinaryResponse).send(pdf);
}

export default withGuard('guide/telecharger', handler);
