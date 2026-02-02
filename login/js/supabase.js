import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = 'https://wbqrmzihumifwdcaaxkz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndicXJtemlodW1pZndkY2FheGt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwNjk3MTMsImV4cCI6MjA4MjY0NTcxM30.VB4HO__5GCHOtTR3mmOGzv5Ol8wRUbZD5Ctj1QEHm6g';

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)