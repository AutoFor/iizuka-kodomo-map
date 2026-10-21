import { createClient } from "@supabase/supabase-js";
import { DUMMY_SPOTS } from "@/data/spots";
import type { Spot } from "@/lib/types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && anonKey);

export function getSupabase() {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey);
}

/**
 * Supabase の `spots` テーブルから取得。環境変数が無い・取得に失敗した場合はダミーデータを返す。
 */
export async function getSpots(): Promise<{ spots: Spot[]; source: "supabase" | "dummy" }> {
  const client = getSupabase();
  if (!client) return { spots: DUMMY_SPOTS, source: "dummy" };

  const { data, error } = await client
    .from("spots")
    .select(
      "id,name,category,lat,lng,address,summary,services,hours,free,url,instagram_url,tags",
    )
    .eq("published", true)
    .order("name");

  if (error || !data || data.length === 0) {
    if (error) console.error("[supabase] spots fetch failed:", error.message);
    return { spots: DUMMY_SPOTS, source: "dummy" };
  }
  return { spots: data as Spot[], source: "supabase" };
}
