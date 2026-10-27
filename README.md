# いいづか こどもマップ（仮）

飯塚市で「地域で子どもを支える」お店・居場所・支援サービスを、地図上のピンから探せる Web アプリです。
子ども食堂、無料の学習支援、高校生の居場所、子ども歓迎のお店などを掲載します。

> 現在は **試作版** です。サイト名などは（仮）で、正式名称は未定です。

## できること

- 地図（Leaflet + OpenStreetMap。API キー不要・無料）でピンを探す
- カテゴリ（食堂 / 学習 / 居場所 / 相談 / お店 / 高校生）と「無料のみ」で絞り込み
- ピンを押すと、店舗情報・子ども向けサービス・写真・公式サイト・Instagram 紹介動画（埋め込み）・経路リンクを表示
- 一覧表示との切り替え
- スマホ（下からのシート）/ PC（左パネル）の両方に対応

## 技術

| 項目 | 内容 |
|------|------|
| フレームワーク | Next.js 16 (App Router) / TypeScript / Tailwind v4 |
| 地図 | Leaflet 1.9 + OpenStreetMap タイル |
| データ | `src/data/spots.ts`（当面はデータベースなし） |
| ホスティング | Cloudflare Workers（静的アセット配信。main への push で自動デプロイ） |

## ローカルで動かす

```bash
npm install
npm run dev   # http://localhost:3000
```

## デプロイ

Cloudflare の GitHub 連携で、main ブランチへ push すると自動でビルド・公開されます。設定は `wrangler.jsonc` にあります。

| 設定 | 値 |
|------|----|
| Cloudflare 側のデプロイコマンド | `npx wrangler deploy` |
| ビルド（wrangler.jsonc の build.command） | `npm run build` → `out/` を静的配信 |
| Node.js | 24（`.node-version`） |

手元から手動デプロイする場合は `npx wrangler login` のうえ `npm run deploy`。

## データの追加・修正

`src/data/spots.ts` の `SPOTS` 配列にスポットを追加・修正し、main に push してください。

## 紹介動画から写真を作る

動画ファイル（mp4 など）から等間隔に写真を切り出して `public/spots/<id>/` に保存します（ffmpeg が必要）。

```bash
scripts/extract-frames.sh honmachi-spice ~/Downloads/honmachi.mp4 6
```

最後に表示されるパスを `src/data/spots.ts` の該当スポットの `photos` に貼り付けてください。

## データ構造（`Spot`）

| 列 | 説明 |
|----|------|
| name | 名称 |
| category | `kodomo_shokudo` / `gakushu` / `ibasho` / `soudan` / `kids_ok` / `koukousei` |
| lat, lng | 緯度経度 |
| address | 住所 |
| summary | 紹介文 |
| services | 子ども向けサービス（配列） |
| hours | 営業・開催時間 |
| parking | 駐車場の情報（任意） |
| free | 無料かどうか |
| url | 公式サイト |
| instagram_url | Instagram のリール / 投稿 URL（埋め込み表示される） |
| photos | 写真のパス（`public/spots/<id>/` に置く。横スクロールで表示・タップで拡大） |
| tags | 対象（小学生・高校生など） |

## 制作

AutoFor株式会社 https://autofor.co.jp/
