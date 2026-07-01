import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

function getEnviromentVariable() {
  const SupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!SupabaseKey || !SupabaseUrl) {
    throw new Error("missing supabase_url or supabse_anon_key");
  }

  return { SupabaseKey, SupabaseUrl };
}

export async function createSupabseServerClient() {
  const { SupabaseKey, SupabaseUrl } = getEnviromentVariable();

  const CookieStore = await cookies();

  return createServerClient(SupabaseUrl, SupabaseKey, {
    cookies: {
      getAll() {
        return CookieStore.getAll();
      },
      setAll(cookiestoset) {
        try {
          cookiestoset.forEach(({ name, value, options }) => {
            return CookieStore.set(name, value, options);
          });
        } catch (err) {
          console.log(err);
        }
      },
    },
  });
}
