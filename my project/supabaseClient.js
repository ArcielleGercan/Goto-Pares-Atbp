import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://eiybmfozvyylfstdfmxx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpeWJtZm96dnl5bGZzdGRmbXh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMTg2MDksImV4cCI6MjA1NTc5NDYwOX0.bhVMBJVO5mYq5swQXb5c4T8tDepjNGG1P99o8UXVKvE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
