# いいづか こどもマップ

飯塚市で「地域で子どもを支える」お店・居場所・支援サービスを、地図上のピンから探せる Web アプリです。
子ども食堂、無料の学習支援、高校生の居場所、子ども歓迎のお店などを掲載します。

> 現在は **ダミーデータによるプロトタイプ** です。掲載スポットはすべて架空です。

## できること

- 地図（Leaflet + OpenStreetMap。API キー不要・無料）でピンを探す
- カテゴリ（食堂 / 学習 / 居場所 / 相談 / お店 / 高校生）と「無料のみ」で絞り込み
- ピンを押すと、店舗情報・子ども向けサービス・公式サイト・Instagram 紹介動画（埋め込み）・経路リンクを表示
- 一覧表示との切り替え
- スマホ（下からのシート）/ PC（左パネル）の両方に対応

## 技術

| 項目 | 内容 |
|------|------|
| フレームワーク | Next.js 16 (App Router) / TypeScript / Tailwind v4 |
| 地図 | Leaflet 1.9 + OpenStreetMap タイル |
| データ | Supabase（`spots` テーブル）。未設定時は `src/data/spots.ts` のダミー |
| ホスティング | Vercel |

## ローカルで動かす

```bash
npm install
npm run dev   # http://localhost:3000
```

Supabase なしでもダミーデータで動きます。

## Supabase に接続する

1. Supabase でプロジェクトを作成
2. SQL Editor で `supabase/schema.sql` を実行（テーブル・RLS・初期データが入る）
3. `.env.local`（ローカル）/ Vercel の Environment Variables に以下を設定

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

スポットの追加・編集は Supabase ダッシュボードの Table Editor から行えます（`published = false` で非表示）。

## データ構造（`spots`）

| 列 | 説明 |
|----|------|
| name | 名称 |
| category | `kodomo_shokudo` / `gakushu` / `ibasho` / `soudan` / `kids_ok` / `koukousei` |
| lat, lng | 緯度経度 |
| address | 住所 |
| summary | 紹介文 |
| services | 子ども向けサービス（配列） |
| hours | 営業・開催時間 |
| free | 無料かどうか |
| url | 公式サイト |
| instagram_url | Instagram のリール / 投稿 URL（埋め込み表示される） |
| tags | 対象（小学生・高校生など） |
| published | 公開フラグ |

## 制作

AutoFor株式会社 https://autofor.co.jp/
