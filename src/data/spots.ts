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
    lat: 33.638677,
    lng: 130.684878,
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
    lat: 33.653619,
    lng: 130.687029,
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
  {
    id: "starbucks-iizuka-taromaru",
    name: "スターバックス アクロスプラザ飯塚太郎丸店",
    category: "kids_ok",
    // 位置は店頭写真の GPS 情報より
    lat: 33.60895,
    lng: 130.67108,
    address: "飯塚市太郎丸791-1（アクロスプラザ飯塚太郎丸内）",
    summary:
      "2026年5月にオープンした、飯塚市初のドライブスルー併設スターバックス。キッズ向けのミルクやココアがあり、子ども向けのワークショップもときどき開催されます。",
    services: ["キッズ ミルク・キッズ ココアあり", "子ども向けイベントを開催"],
    hours: "8:00〜22:00 ※最新の営業時間は公式サイトで確認",
    free: false,
    url: "https://store.starbucks.co.jp/",
    instagram_url: null,
    photos: ["/spots/starbucks-iizuka-taromaru/halloween-sign.jpg"],
    events: [
      {
        title: "Halloween kids party",
        date: "2026-10-31",
        schedule: "10月31日（土）11:00〜（45分程度）",
        description: "キッズエプロンをつけてハロウィンの工作をしよう！",
        note: "定員4名程度（3〜4才位から小学生まで）。予約制です。詳しくは店頭のバリスタへお声がけください。",
      },
    ],
    tags: ["乳幼児", "小学生", "保護者"],
  },
];
