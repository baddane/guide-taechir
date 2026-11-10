/* Produit le guide payant, sa version chiffrée et son extrait gratuit.

     GUIDE_PDF_KEY=<clé base64 32 octets> node scripts/build-guide.mjs [source.html] [dossier-sortie]

   Le dépôt est PUBLIC : ni la source du guide ni le PDF en clair n'y vont.
   - source.html : par défaut /mnt/project-files/taechir/guide-payant/guide.html
     (dossier partagé du projet, privé) ;
   - <dossier-sortie>/guide-taechir-2026.pdf : le PDF en clair (même dossier) ;
   - private/guide-taechir-2026.pdf.enc : le PDF chiffré (AES-256-GCM), seul
     versionné, déchiffré par api/guide/telecharger.ts avec la variable
     Vercel GUIDE_PDF_KEY ;
   - public/extrait-guide-taechir-2026.pdf : couverture, sommaire et
     chapitre 1 (blocs data-extrait="1") + une page d'appel à l'achat.

   Changer de clé = relancer ce script avec la nouvelle clé ET mettre à jour
   GUIDE_PDF_KEY sur Vercel, sinon le téléchargement échoue. */

import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { createCipheriv, randomBytes } from 'node:crypto';

// Playwright n'est pas une dépendance du site : on prend l'installation
// globale (require résout NODE_PATH, pas import).
const { chromium } = createRequire(import.meta.url)('playwright');

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(process.argv[2] ?? '/mnt/project-files/taechir/guide-payant/guide.html');
const sortie = resolve(process.argv[3] ?? dirname(source));
const clair = join(sortie, 'guide-taechir-2026.pdf');
const chiffre = join(racine, 'private', 'guide-taechir-2026.pdf.enc');
const extrait = join(racine, 'public', 'extrait-guide-taechir-2026.pdf');

const cle = Buffer.from(process.env.GUIDE_PDF_KEY ?? '', 'base64');
if (cle.length !== 32) {
  console.error('GUIDE_PDF_KEY absente ou invalide (32 octets en base64 attendus).');
  process.exit(1);
}

const PAGE_ACHAT = `
<section class="break">
  <div style="border-radius:16pt;padding:24pt;background:linear-gradient(150deg,#312e81,#4f46e5 55%,#0ea5e9);color:#fff">
    <div style="font-weight:700;letter-spacing:.5pt;font-size:9pt;color:#c7d2fe">FIN DE L'EXTRAIT</div>
    <h2 style="font-size:24pt;font-weight:800;margin-top:6pt">La suite dans le guide complet</h2>
    <p style="font-size:11pt;margin-top:8pt;color:#e0e7ff">Les 17 catégories et leurs justificatifs, l'ANAPEC, la plateforme écran par écran, les trois listes de pièces, l'apostille, les visas, cinq cas pratiques, le rétroplanning, les 12 erreurs à éviter, des checklists à imprimer et cinq modèles de lettres.</p>
    <p style="font-size:14pt;font-weight:800;margin-top:12pt;color:#fde68a">guide-taechir.org/guide-complet</p>
  </div>
</section>`;

const navigateur = await chromium.launch();
try {
  const page = await navigateur.newPage();
  await page.goto(pathToFileURL(source).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: clair, format: 'A4', printBackground: true, preferCSSPageSize: true });

  await page.evaluate((achat) => {
    document.querySelectorAll('body > section:not([data-extrait])').forEach((s) => s.remove());
    document.body.insertAdjacentHTML('beforeend', achat);
  }, PAGE_ACHAT);
  await page.pdf({ path: extrait, format: 'A4', printBackground: true, preferCSSPageSize: true });
} finally {
  await navigateur.close();
}

// Format : IV (12 octets) | tag GCM (16 octets) | données chiffrées.
const iv = randomBytes(12);
const c = createCipheriv('aes-256-gcm', cle, iv);
const donnees = Buffer.concat([c.update(readFileSync(clair)), c.final()]);
writeFileSync(chiffre, Buffer.concat([iv, c.getAuthTag(), donnees]));

for (const f of [clair, chiffre, extrait]) {
  console.log(`${f} — ${(statSync(f).size / 1024).toFixed(0)} Ko`);
}
