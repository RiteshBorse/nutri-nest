import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kgwpmdvgdwbxllmbjmeo.supabase.co'; // TODO: Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnd3BtZHZnZHdieGxsbWJqbWVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDA2MDQsImV4cCI6MjA2NDc3NjYwNH0.ANV_ycxvMRm9dlqdVlYZzkeyf7HGhy6Zo5tVM0NTQrQ'; // TODO: Replace with your Supabase anon/public key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY); 