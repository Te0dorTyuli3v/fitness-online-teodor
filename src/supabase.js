import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qrvndfonrxroszabnxhz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydm5kZm9ucnhyb3N6YWJueGh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwNzAxOTgsImV4cCI6MjA0NjY0NjE5OH0.R2EDeUqpkaVsteMRMDWcnrSuoAJuIuvdYZKAZjeytOE';
export const supabase = createClient(supabaseUrl, supabaseKey);
