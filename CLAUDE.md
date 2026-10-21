# iizuka-kodomo-map

飯塚市の「地域で子どもを支える」スポットを地図で探すアプリ。Next.js 16 + Leaflet、Vercel ホスティング。

## Issue 運用（このリポジトリは GitHub Issues）

グローバルルール（Linear）の例外として、**このリポジトリの Issue は GitHub Issues で管理する**。外部の共同管理者が GitHub 上で作業するため。

**必須の流れ（例外なし）**

1. 変更を始める前に **必ず** `gh issue create --repo AutoFor/iizuka-kodomo-map` で Issue を作り、担当者を自分にする（既存の該当 Issue があればそれを使う）
2. コミット / PR のメッセージに `Fixes #<番号>`（部分対応は `Part of #<番号>`）を書く
3. 処理が終わったら **必ず Issue をクローズ**する。コミットで自動クローズされなかった場合は `gh issue close <番号> --repo AutoFor/iizuka-kodomo-map` で手動クローズし、閉じたことを確認する
4. Linear には起票しない

## 構成メモ

- データは `src/data/spots.ts` の `SPOTS`（当面はデータベースなし）。追加・修正はこのファイルを編集して main に push
- 地図は `src/components/MapView.tsx`（leaflet を `useEffect` 内で動的 import。SSR しない）
- Instagram 埋め込みは `src/components/InstagramEmbed.tsx`（公式 embed.js。高さ自動調整）
- カテゴリの追加は `src/lib/types.ts` の `CATEGORIES` を更新
- デプロイは `vercel --prod`（GitHub 連携は未設定なので push だけでは反映されない）
