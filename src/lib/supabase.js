import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hpnspnolzkjiudhlorlq.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbnNwbm9semtqaXVkaGxvcmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1OTk2NjksImV4cCI6MjA0NzE3NTY2OX0.S7NW7BHBSF47rqN37-4o2NY59Bd432Uw91P85YYaOIY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
