/* =====================================================
   ATLAS GYM — Supabase Configuration
   ===================================================== */

const SUPABASE_URL = 'https://vowecpavuxgqbuvthzlm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_w6Bk-wgdZW6XhUFV-J0i3w_7lLNVHvU';

window._supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
