import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://clquzhsqxcfjejojzfug.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNscXV6aHNxeGNmamVqb2p6ZnVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyODQwNjEsImV4cCI6MjA0MDg2MDA2MX0.DR8paQqoxeD2Q9e7puCiAoWacjpt_VwW5T-950gYe90';  // Use the anon key here

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



export { supabase };
