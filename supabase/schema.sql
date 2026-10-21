-- 飯塚 子ども支援マップ: Supabase スキーマ + 初期データ
-- Supabase ダッシュボード > SQL Editor に貼り付けて実行してください。

create extension if not exists "pgcrypto";

create type spot_category as enum (
  'kodomo_shokudo', -- 子ども食堂
  'gakushu',        -- 無料の学習支援
  'ibasho',         -- 遊び場・居場所
  'soudan',         -- 子育て相談
  'kids_ok',        -- 子ども歓迎のお店
  'koukousei'       -- 高校生応援
);

create table if not exists public.spots (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  category      spot_category not null,
  lat           double precision not null,
  lng           double precision not null,
  address       text not null,
  summary       text not null default '',
  services      text[] not null default '{}',
  hours         text,
  free          boolean not null default false,
  url           text,
  instagram_url text,
  tags          text[] not null default '{}',
  published     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists spots_category_idx on public.spots (category);

-- 公開データは誰でも読める。書き込みはダッシュボード / service_role のみ。
alter table public.spots enable row level security;

drop policy if exists "public read published spots" on public.spots;
create policy "public read published spots"
  on public.spots for select
  using (published = true);

-- updated_at 自動更新
create or replace function public.set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists spots_set_updated_at on public.spots;
create trigger spots_set_updated_at
  before update on public.spots
  for each row execute function public.set_updated_at();

-- 初期データ（ダミー）
insert into public.spots (name, category, lat, lng, address, summary, services, hours, free, url, instagram_url, tags) values
('いいづか こども食堂 ひだまり', 'kodomo_shokudo', 33.6468, 130.6872, '飯塚市本町 12-3（本町商店街内）', '毎週水曜の夕方、子どもは無料・大人は300円であたたかいごはんが食べられます。宿題スペースあり。', array['子ども無料の夕ごはん','宿題スペース','保護者も参加OK'], '水 17:00〜19:30', true, 'https://example.com/hidamari', 'https://www.instagram.com/reel/DeJIwHAz2PI/', array['小学生','中学生','保護者']),
('まなびの森 無料塾', 'gakushu', 33.6531, 130.6947, '飯塚市新飯塚 5-8 コミュニティ会館 2F', '地元の大学生ボランティアが中学生・高校生の勉強を無料でサポート。受験相談も。', array['無料学習サポート','受験相談','自習席の開放'], '火・木 18:00〜21:00 / 土 13:00〜17:00', true, 'https://example.com/manabi', 'https://www.instagram.com/reel/DeJIwHAz2PI/', array['中学生','高校生']),
('だがし屋 とんぼ', 'kids_ok', 33.6439, 130.6859, '飯塚市飯塚 3-14', '昔ながらの駄菓子屋さん。店先のベンチで子どもたちがいつも集まっています。10円から買えるお菓子がたくさん。', array['10円〜のお菓子','休憩ベンチ','見守りのおばちゃん'], '10:00〜18:00（火曜休み）', false, null, 'https://www.instagram.com/reel/DeJIwHAz2PI/', array['小学生','中学生']),
('飯塚市子育て支援センター', 'soudan', 33.6462, 130.6921, '飯塚市新立岩 5-5', '0〜3歳の親子が自由に遊べる広場と、保育士による子育て相談。身長・体重測定もできます。', array['親子の遊び場','子育て相談（無料）','身体測定'], '月〜金 9:00〜16:00', true, 'https://example.com/shien-center', null, array['乳幼児','保護者']),
('ほなみ プレーパーク', 'ibasho', 33.6238, 130.6912, '飯塚市穂波 秋松 公園内', '「自分の責任で自由に遊ぶ」がテーマの冒険遊び場。泥んこ・木登り・たき火など、普段できない遊びができます。', array['冒険遊び場','プレーリーダー常駐','工具の貸し出し'], '第2・第4 日曜 10:00〜15:00', true, 'https://example.com/playpark', 'https://www.instagram.com/reel/DeJIwHAz2PI/', array['未就学児','小学生']),
('カフェ こにわ', 'kids_ok', 33.6489, 130.6897, '飯塚市吉原町 7-2', 'キッズスペース付きのカフェ。ベビーカーのまま入店OK、離乳食の持ち込みも歓迎。ママ会の定番です。', array['キッズスペース','離乳食持ち込みOK','おむつ替え台'], '9:00〜17:00（月曜休み）', false, 'https://example.com/koniwa', 'https://www.instagram.com/reel/DeJIwHAz2PI/', array['乳幼児','保護者']),
('ユースセンター IIZUKA', 'koukousei', 33.6512, 130.6878, '飯塚市片島 2-19', '中高生が放課後に無料で使えるフリースペース。Wi-Fi、電源、音楽スタジオ、相談員がいます。', array['Wi-Fi・電源','音楽スタジオ','進路・悩み相談'], '火〜日 14:00〜20:00', true, 'https://example.com/youth', 'https://www.instagram.com/reel/DeJIwHAz2PI/', array['中学生','高校生']),
('飯塚市立図書館 こどもコーナー', 'ibasho', 33.6424, 130.6948, '飯塚市飯塚 14-67', '絵本1万冊の子どもコーナーと、毎週土曜の読み聞かせ。中高生向けの自習室も無料で使えます。', array['絵本・児童書','読み聞かせ（土曜）','自習室'], '10:00〜19:00（月曜休み）', true, 'https://example.com/library', null, array['未就学児','小学生','高校生']),
('さいわい こども食堂', 'kodomo_shokudo', 33.6603, 130.6702, '飯塚市幸袋 1-4 公民館', '月2回、地域のおじいちゃんおばあちゃんが作るカレーの日。食材の持ち帰り（フードパントリー）もあります。', array['カレーの日（無料）','フードパントリー','多世代交流'], '第1・第3 土曜 11:30〜14:00', true, null, 'https://www.instagram.com/reel/DeJIwHAz2PI/', array['小学生','保護者','高齢者']),
('ラーメン 一心', 'kids_ok', 33.6655, 130.7042, '飯塚市鯰田 8-3', 'こども（小学生以下）はラーメン無料の日を毎月やっています。お子さま用の椅子・食器あり。', array['こどもラーメン無料デー','お子さまイス','取り分け用食器'], '11:00〜15:00 / 17:00〜21:00', false, 'https://example.com/isshin', 'https://www.instagram.com/reel/DeJIwHAz2PI/', array['小学生','家族']),
('ちくほ 学習サポート教室', 'gakushu', 33.6035, 130.6612, '飯塚市筑穂 長尾 公民館', '退職した先生たちによる小中学生向けの無料学習教室。苦手克服をゆっくりサポート。', array['無料学習教室','個別サポート','送迎相談可'], '水 16:00〜18:00', true, null, null, array['小学生','中学生']),
('コワーキング ツクル（高校生無料）', 'koukousei', 33.6448, 130.6902, '飯塚市吉原町 2-1 駅前ビル 3F', '高校生は無料で使えるコワーキングスペース。地元の社会人と話せる「しごと相談ナイト」を月1開催。', array['高校生無料席','しごと相談ナイト','プログラミング教室'], '10:00〜21:00', true, 'https://example.com/tsukuru', 'https://www.instagram.com/reel/DeJIwHAz2PI/', array['高校生']);
