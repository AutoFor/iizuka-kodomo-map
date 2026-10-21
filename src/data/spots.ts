import type { Spot } from "@/lib/types";

/**
 * 掲載スポットのデータ。
 * 追加・修正はこのファイルを編集して main に push すると Vercel に反映される。
 * photos は public/spots/<id>/ に置いた画像のパス（scripts/extract-frames.sh で動画から切り出せる）。
 */
export const SPOTS: Spot[] = [
  {
    id: "honmachi-spice",
    name: "ホンマチスパイス",
    category: "kids_ok",
    // 位置は本町商店街付近の概算。Google マップで確認して微調整すること
    lat: 33.644,
    lng: 130.689,
    address: "飯塚市本町15-10（ホンマチ酒場内・本町商店街）",
    summary:
      "本町商店街の居酒屋「ホンマチ酒場」でお昼だけ営業する、スパイスカレー専門店。3歳以下はお椀カレーが無料、小学生以下はカレーが半額で、ベビーカーのまま入れます。",
    services: ["3歳以下 お椀カレー無料", "小学生以下 カレー半額", "ベビーカーOK"],
    hours: "10:45〜14:00（L.O. 13:30）※営業日は Instagram で確認",
    free: false,
    url: "https://www.instagram.com/honmachi_spice/",
    instagram_url: "https://www.instagram.com/reel/DUMPeRLk8vI/",
    photos: [],
    tags: ["乳幼児", "小学生", "保護者"],
  },
  {
    id: "baum",
    name: "Baum（バウム）",
    category: "kids_ok",
    // 位置は川島地区の代表点による概算。Google マップで確認して微調整すること
    lat: 33.6572,
    lng: 130.6908,
    address: "飯塚市川島686-4",
    summary:
      "地元の無農薬野菜をなるべく使った、からだにやさしいごはんのお店。子どもメニューは200円で、座敷があるので小さな子どもと一緒でもくつろげます。",
    services: ["子どもメニュー 200円", "座敷あり"],
    hours: "11:30〜（月曜定休）※最新の営業時間はお店に確認",
    free: false,
    url: "https://ds6vh.crayonsite.com/",
    instagram_url: "https://www.instagram.com/reel/DeJIwHAz2PI/",
    photos: [],
    tags: ["乳幼児", "小学生", "保護者"],
  },
];
