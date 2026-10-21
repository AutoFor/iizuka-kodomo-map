export type Category =
  | "kodomo_shokudo"
  | "gakushu"
  | "ibasho"
  | "soudan"
  | "kids_ok"
  | "koukousei";

export const CATEGORIES: Record<
  Category,
  { label: string; short: string; color: string; emoji: string }
> = {
  kodomo_shokudo: { label: "子ども食堂", short: "食堂", color: "#E8702A", emoji: "🍚" },
  gakushu: { label: "無料の学習支援", short: "学習", color: "#2F6FD1", emoji: "✏️" },
  ibasho: { label: "遊び場・居場所", short: "居場所", color: "#2E8B57", emoji: "🌳" },
  soudan: { label: "子育て相談", short: "相談", color: "#8E5BC2", emoji: "💬" },
  kids_ok: { label: "子ども歓迎のお店", short: "お店", color: "#D9487A", emoji: "🧸" },
  koukousei: { label: "高校生応援", short: "高校生", color: "#1B9AAA", emoji: "🎒" },
};

export type Spot = {
  id: string;
  name: string;
  category: Category;
  lat: number;
  lng: number;
  address: string;
  summary: string;
  services: string[];
  hours?: string | null;
  free: boolean;
  url?: string | null;
  instagram_url?: string | null;
  tags: string[];
};
