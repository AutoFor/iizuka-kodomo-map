import { Suspense } from "react";
import { connection } from "next/server";
import App from "@/components/App";
import { getSpots } from "@/lib/supabase";

async function Loaded() {
  await connection(); // Supabase からは毎リクエスト取得
  const { spots, source } = await getSpots();
  return <App spots={spots} source={source} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div className="map-loading">読み込み中…</div>}>
      <Loaded />
    </Suspense>
  );
}
