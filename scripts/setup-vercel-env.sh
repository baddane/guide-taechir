#!/usr/bin/env bash
#
# Pose toutes les variables d'environnement du dashboard /admin sur Vercel.
#
#   npx vercel login          # une seule fois
#   npx vercel link           # une seule fois, choisir le projet guide-taechir
#   bash scripts/setup-vercel-env.sh
#
# Les secrets sont saisis au clavier (jamais en argument), donc ils ne
# finissent ni dans l'historique du shell ni dans un fichier.

set -euo pipefail

VERCEL="npx --yes vercel"
ENVIRONMENTS=(production preview development)

ask_secret() {
  local prompt="$1" value=""
  while [ -z "$value" ]; do
    read -rsp "  $prompt : " value </dev/tty
    echo
  done
  printf '%s' "$value"
}

# Remplace la variable si elle existe déjà, sinon la crée.
set_var() {
  local name="$1" value="$2" env
  for env in "${ENVIRONMENTS[@]}"; do
    $VERCEL env rm "$name" "$env" --yes >/dev/null 2>&1 || true
    if printf '%s' "$value" | $VERCEL env add "$name" "$env" >/dev/null 2>&1; then
      echo "  ✅ $name → $env"
    else
      echo "  ❌ $name → $env (échec)"
    fi
  done
}

echo
echo "Configuration des variables Brevo du projet guide-taechir."
echo "Les valeurs saisies ne s'affichent pas à l'écran."
echo

BREVO_API_KEY=$(ask_secret "Clé API Brevo (xkeysib-...)")
read -rp "  Identifiant de la liste newsletter (donné par npm run setup:brevo) : " LIST_ID </dev/tty
read -rp "  Sous-domaine de réception [inbound.guide-taechir.org] : " INBOUND_DOMAIN </dev/tty
INBOUND_DOMAIN=${INBOUND_DOMAIN:-inbound.guide-taechir.org}
INBOUND_SECRET=$(ask_secret "Secret du webhook entrant")

echo
set_var BREVO_API_KEY            "$BREVO_API_KEY"
set_var BREVO_NEWSLETTER_LIST_ID "$LIST_ID"
set_var BREVO_SENDER             "contact@guide-taechir.org"
set_var BREVO_SENDER_NAME        "Guide-Taechir.org"
set_var BREVO_INBOUND_DOMAIN     "$INBOUND_DOMAIN"
set_var BREVO_INBOUND_SECRET     "$INBOUND_SECRET"

echo
echo "Variables posées. Déploiement pour les activer :"
echo "  npx vercel --prod"
echo
