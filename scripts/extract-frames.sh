#!/usr/bin/env bash
# 紹介動画から写真を切り出して public/spots/<id>/ に保存する。
# 使い方: scripts/extract-frames.sh <スポットid> <動画ファイル> [枚数=6]
# 例:     scripts/extract-frames.sh honmachi-spice ~/Downloads/honmachi.mp4 6
# 出力されたパスを src/data/spots.ts の photos に貼り付ける。
set -euo pipefail

id="$1"; video="$2"; count="${3:-6}"
out="public/spots/$id"
mkdir -p "$out"

duration=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$video")
for i in $(seq 1 "$count"); do
  # 冒頭と末尾を避けて等間隔に切り出す
  t=$(awk -v d="$duration" -v i="$i" -v n="$count" 'BEGIN { printf "%.2f", d * i / (n + 1) }')
  ffmpeg -loglevel error -y -ss "$t" -i "$video" -frames:v 1 -vf "scale=720:-2" -q:v 3 "$out/$i.jpg"
done

for i in $(seq 1 "$count"); do echo "\"/spots/$id/$i.jpg\","; done
