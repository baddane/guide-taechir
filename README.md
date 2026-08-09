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
