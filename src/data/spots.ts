import type { Spot } from "@/lib/types";

/**
 * 掲載スポットのデータ。現在はダミー（飯塚市内の架空スポット）。
 * 追加・修正はこのファイルを編集して main に push すると Vercel に反映される。
 */
export const SPOTS: Spot[] = [
  {
    id: "1",
    name: "いいづか こども食堂 ひだまり",
    category: "kodomo_shokudo",
    lat: 33.6468,
    lng: 130.6872,
    address: "飯塚市本町 12-3（本町商店街内）",
    summary:
      "毎週水曜の夕方、子どもは無料・大人は300円であたたかいごはんが食べられます。宿題スペースあり。",
    services: ["子ども無料の夕ごはん", "宿題スペース", "保護者も参加OK"],
    hours: "水 17:00〜19:30",
    free: true,
    url: "https://example.com/hidamari",
    instagram_url: "https://www.instagram.com/reel/DeJIwHAz2PI/",
    tags: ["小学生", "中学生", "保護者"],
  },
  {
    id: "6",
    name: "カフェ こにわ",
    category: "kids_ok",
    lat: 33.6489,
    lng: 130.6897,
    address: "飯塚市吉原町 7-2",
    summary:
      "キッズスペース付きのカフェ。ベビーカーのまま入店OK、離乳食の持ち込みも歓迎。ママ会の定番です。",
    services: ["キッズスペース", "離乳食持ち込みOK", "おむつ替え台"],
    hours: "9:00〜17:00（月曜休み）",
    free: false,
    url: "https://example.com/koniwa",
    instagram_url: "https://www.instagram.com/reel/DUMPeRLk8vI/",
    tags: ["乳幼児", "保護者"],
  },
];
