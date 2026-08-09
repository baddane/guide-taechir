import { createClient } from '@supabase/supabase-js';

// URL et clé « publishable » sont conçues pour être exposées côté navigateur.
// La sécurité repose sur les politiques RLS (écriture seule) et les fonctions
// serveur protégées par mot de passe — pas sur le secret de cette clé.
const SUPABASE_URL = 'https://yjxuutdnhsvrbbgcqltw.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_x4ehI4AgVADT4U190djnGg_eXRCPd9c';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export interface ContactMessage {
  id: string;
  name: string | null;
  email: string;
  subject: string | null;
  message: string | null;
  is_read: boolean;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string | null;
  email: string;
  company: string | null;
  source: string;
  is_read: boolean;
  created_at: string;
}

/** Réponse envoyée depuis /admin via Brevo, archivée dans `message_replies`. */
export interface MessageReply {
  id: string;
  message_id: string | null;
  lead_id: string | null;
  to_email: string;
  subject: string | null;
  body: string;
  created_at: string;
}
