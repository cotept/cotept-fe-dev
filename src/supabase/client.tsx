import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_AMON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const client = createClient(SUPABASE_URL, SUPABASE_AMON_KEY);

export { client as supabaseClient };
