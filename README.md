<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/753b4d12-cb2e-485b-a42d-4b3e7ddb9aab

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Espace admin — répondre aux messages via Brevo

Le dashboard `/admin` permet de répondre directement aux messages de contact et
aux leads. La réponse part de `contact@guide-taechir.org` via l'API
transactionnelle Brevo, puis est archivée dans Supabase et affichée sous le
message d'origine.

**Architecture**

| Élément | Rôle |
|---|---|
| `src/pages/Admin.tsx` | Bouton « Répondre », fenêtre de rédaction, fil des réponses. |
| `api/admin/reply.ts` | Fonction serveur Vercel : vérifie le mot de passe, envoie via Brevo, archive. |
| RPC `admin_verify` | Valide le mot de passe admin côté serveur **avant** tout envoi. |
| RPC `admin_add_reply` | Archive la réponse et marque l'élément comme traité. |
| RPC `admin_list` | Renvoie `contacts`, `leads` **et** `replies`. |
| Table `message_replies` | Archive des réponses (RLS active, aucune policy : accès RPC uniquement). |

La clé Brevo ne quitte jamais le serveur : le navigateur appelle
`POST /api/admin/reply`, jamais l'API Brevo directement.

**Variables d'environnement à définir sur Vercel** (voir [.env.example](.env.example))

- `BREVO_API_KEY` — **requis**, clé API v3.
- `BREVO_SENDER` — par défaut `contact@guide-taechir.org` (doit être un
  expéditeur validé dans Brevo).
- `BREVO_SENDER_NAME`, `BREVO_REPLY_TO` — facultatifs.

> ⚠️ Dans Brevo, laisser l'option **« Authorised IPs » désactivée** : les IP de
> Vercel sont dynamiques, sinon l'API renvoie `401`.

## Onglets du dashboard

| Onglet | Rôle | Route serveur |
|---|---|---|
| **Messages** | Formulaire de contact + fils de discussion. | `api/admin/reply.ts` |
| **Leads** | Téléchargements de la checklist, avec réponse possible. | `api/admin/reply.ts` |
| **Outreach** | Pipeline partenaires (statut, commission, notes). | RPC `admin_outreach_*` |
| **Newsletter** | Sélection d'articles → campagne Brevo, synchro des contacts. | `api/admin/newsletter.ts` |
| **Composer** | E-mail libre en Markdown, avec pièces jointes. | `api/admin/compose.ts` |

La newsletter passe par une **campagne** Brevo (désinscription gérée), alors que
Composer et les réponses passent par l'API transactionnelle. « Synchroniser les
contacts » pousse les leads et messages Supabase dans la liste Brevo — le
formulaire public, lui, n'est pas modifié.

## Réponses entrantes des contacts

Les réponses des contacts reviennent dans `/admin`, sous le message d'origine,
via l'**Inbound Parsing** de Brevo.

| Élément | Rôle |
|---|---|
| `api/brevo/inbound.ts` | Webhook : lit le mail, le rattache au fil, l'enregistre. |
| RPC `inbound_add_reply` | Rattachement + insertion, protégée par secret haché. |
| Table `inbound_config` | Empreinte du secret du webhook (jamais en clair). |
| `message_replies.direction` | `out` = envoyé depuis /admin, `in` = reçu du contact. |

**Rattachement au fil**, par ordre de fiabilité :

1. **jeton d'adresse** — les réponses partent avec
   `Reply-To: reply+<id>@<BREVO_INBOUND_DOMAIN>`. Le fil est retrouvé même si le
   contact répond depuis une autre adresse ;
2. **adresse de l'expéditeur** — dernier message ou lead portant cet e-mail ;
3. **expéditeur inconnu** — le mail devient un nouveau message de contact, donc
   rien n'est jamais perdu.

Une réponse reçue repasse le fil en « non lu » pour le faire remonter dans le
dashboard. Les rejeux du webhook sont ignorés (déduplication sur l'identifiant
du message).

**Mise en place**

1. Créer un sous-domaine dédié, ex. `inbound.guide-taechir.org`, et faire
   pointer ses **MX vers Brevo** (valeurs indiquées dans l'écran Inbound
   Parsing). ⚠️ Ne pas toucher aux MX du domaine principal : ça détournerait
   tout le courrier de `guide-taechir.org`.
2. Dans Brevo, déclarer l'URL du webhook :
   `https://www.guide-taechir.org/api/brevo/inbound?token=<SECRET>`
3. Sur Vercel : `BREVO_INBOUND_SECRET` (le même secret) et
   `BREVO_INBOUND_DOMAIN` (le sous-domaine), puis redéployer.
