import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

type supabseSchema = Record<string, never>;

let client: SupabaseClient<supabseSchema> | null = null;

export function SupabaseBrowserClient(): SupabaseClient<supabseSchema> {
  if (client) return client;

  const SupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!SupabaseKey || !SupabaseUrl) {
    throw new Error("missing supabase_url or supabse_anon_key");
  }

  client = createBrowserClient<supabseSchema>(SupabaseUrl, SupabaseKey);

  return client;
}
