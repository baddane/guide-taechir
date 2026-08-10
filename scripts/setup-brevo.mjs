#!/usr/bin/env node
/**
 * Prépare le compte Brevo pour le dashboard /admin.
 *
 *   BREVO_API_KEY="xkeysib-..." npm run setup:brevo
 *
 * Le script ne détruit rien. Il :
 *  1. vérifie que la clé API fonctionne ;
 *  2. contrôle que l'expéditeur et le domaine sont validés ;
 *  3. crée la liste de diffusion si elle n'existe pas, sinon la réutilise ;
 *  4. affiche les variables d'environnement exactes à poser sur Vercel.
 */

const API = 'https://api.brevo.com/v3';
const KEY = process.env.BREVO_API_KEY;
const SENDER = process.env.BREVO_SENDER || 'contact@guide-taechir.org';
const LIST_NAME = process.env.BREVO_NEWSLETTER_LIST_NAME || 'Newsletter TAECHIR';
const INBOUND_DOMAIN = process.env.BREVO_INBOUND_DOMAIN || 'inbound.guide-taechir.org';
const SITE = process.env.SITE_URL || 'https://www.guide-taechir.org';

const ok = (m) => console.log(`  ✅ ${m}`);
const warn = (m) => console.log(`  ⚠️  ${m}`);
const fail = (m) => console.log(`  ❌ ${m}`);
const title = (m) => console.log(`\n${m}`);

if (!KEY) {
  console.error('BREVO_API_KEY manquante.\n\n  BREVO_API_KEY="xkeysib-..." npm run setup:brevo\n');
  process.exit(1);
}

async function api(path, init = {}) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', accept: 'application/json', 'api-key': KEY, ...init.headers },
  });
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  return { ok: res.ok, status: res.status, data };
}

/* 1 ── Clé API ─────────────────────────────────────────────────────────────── */
title('1. Clé API');
const account = await api('/account');
if (!account.ok) {
  fail(`clé refusée (HTTP ${account.status}). ${JSON.stringify(account.data)?.slice(0, 200)}`);
  if (account.status === 401) {
    warn('Si la clé est bonne, vérifiez que « Authorised IPs » est DÉSACTIVÉ dans Brevo.');
  }
  process.exit(1);
}
ok(`compte « ${account.data?.companyName ?? account.data?.email ?? 'inconnu'} »`);

/* 2 ── Expéditeur et domaine ───────────────────────────────────────────────── */
title('2. Expéditeur');
const senders = await api('/senders');
const sender = (senders.data?.senders ?? []).find(
  (s) => String(s.email).toLowerCase() === SENDER.toLowerCase(),
);
if (sender) ok(`${SENDER} déclaré (id ${sender.id})${sender.active === false ? ' — inactif' : ''}`);
else warn(`${SENDER} n'apparaît pas dans la liste des expéditeurs.`);

const domains = await api('/senders/domains');
const base = SENDER.split('@')[1];
const domain = (domains.data?.domains ?? []).find((d) => String(d.domain).toLowerCase() === base);
if (domain) {
  const authed = domain.authenticated ?? domain.dkim ?? false;
  authed ? ok(`domaine ${base} authentifié`) : warn(`domaine ${base} présent mais pas encore authentifié`);
} else {
  warn(`domaine ${base} non déclaré — l'envoi risque de partir en spam.`);
}

/* 3 ── Liste de diffusion ──────────────────────────────────────────────────── */
title('3. Liste de diffusion');
const lists = await api('/contacts/lists?limit=50');
let list = (lists.data?.lists ?? []).find((l) => l.name === LIST_NAME);

if (list) {
  ok(`liste « ${LIST_NAME} » existante (id ${list.id}, ${list.totalSubscribers ?? 0} contact(s))`);
} else {
  const folders = await api('/contacts/folders?limit=10');
  let folderId = folders.data?.folders?.[0]?.id;
  if (!folderId) {
    const created = await api('/contacts/folders', {
      method: 'POST',
      body: JSON.stringify({ name: 'Guide-Taechir' }),
    });
    if (!created.ok) {
      fail(`impossible de créer un dossier : ${JSON.stringify(created.data)?.slice(0, 200)}`);
      process.exit(1);
    }
    folderId = created.data.id;
  }
  const createdList = await api('/contacts/lists', {
    method: 'POST',
    body: JSON.stringify({ name: LIST_NAME, folderId }),
  });
  if (!createdList.ok) {
    fail(`création de la liste impossible : ${JSON.stringify(createdList.data)?.slice(0, 200)}`);
    process.exit(1);
  }
  list = { id: createdList.data.id, totalSubscribers: 0 };
  ok(`liste « ${LIST_NAME} » créée (id ${list.id})`);
}

/* 4 ── Récapitulatif ───────────────────────────────────────────────────────── */
title('4. À poser sur Vercel');
console.log(`
  BREVO_API_KEY=<votre clé>
  BREVO_NEWSLETTER_LIST_ID=${list.id}
  BREVO_SENDER=${SENDER}
  BREVO_SENDER_NAME=Guide-Taechir.org
  BREVO_INBOUND_DOMAIN=${INBOUND_DOMAIN}
  BREVO_INBOUND_SECRET=<le secret du webhook>

  Puis : Deployments → dernier déploiement → Redeploy.
`);

title('5. À faire dans l\'interface Brevo');
console.log(`
  Inbound Parsing — URL du webhook :
    ${SITE}/api/brevo/inbound?token=<le secret du webhook>

  DNS : faire pointer les MX de ${INBOUND_DOMAIN} vers Brevo
  (valeurs affichées dans l'écran Inbound Parsing).
  ⚠️  Ne pas toucher aux MX de ${base} : tout le courrier du domaine serait détourné.
`);
