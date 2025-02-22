import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://eiybmfozvyylfstdfmxx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpeWJtZm96dnl5bGZzdGRmbXh4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDIxODYwOSwiZXhwIjoyMDU1Nzk0NjA5fQ.CrSYvys9PCS3vv3b_9XYSdPh4V5nf_VRmrgNk5PcVDs";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
