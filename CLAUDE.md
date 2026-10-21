# iizuka-kodomo-map

飯塚市の「地域で子どもを支える」スポットを地図で探すアプリ。Next.js 16 + Leaflet + Supabase、Vercel ホスティング。

- データ取得は `src/lib/supabase.ts` の `getSpots()`。env 未設定・失敗時は `src/data/spots.ts` のダミーにフォールバックする
- ダミーデータと `supabase/schema.sql` の初期データは同じ内容に保つ
- 地図は `src/components/MapView.tsx`（leaflet を `useEffect` 内で動的 import。SSR しない）
- カテゴリの追加は `src/lib/types.ts` の `CATEGORIES` と `schema.sql` の enum の両方を更新する
- `cacheComponents` 有効。リクエスト時データは `connection()` + `<Suspense>` で囲む
