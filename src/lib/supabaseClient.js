import { createClient } from "@supabase/supabase-js";

// URL do projeto e chave anon (do painel Supabase)
const supabaseUrl = "https://xgzsnpdbcnnagvjyghcg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnenNucGRiY25uYWd2anlnaGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1MjA1MTEsImV4cCI6MjA3NDA5NjUxMX0.ZiWVXc2IKMm1SZq1TPmNtvswbhKe01Ao_Y4KUAusDmk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
