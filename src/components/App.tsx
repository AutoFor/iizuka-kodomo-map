"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import EditBar from "@/components/EditBar";
import SpotPanel from "@/components/SpotPanel";
import { CATEGORIES, type Category, type Spot } from "@/lib/types";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => <div className="map-loading">地図を読み込み中…</div>,
});

type Props = { spots: Spot[] };

export default function App({ spots }: Props) {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [freeOnly, setFreeOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [listOpen, setListOpen] = useState(false);
  // URL に ?edit を付けると位置調整モード（ピンをドラッグできる）
  const editMode = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).has("edit"),
    () => false,
  );
  const [moved, setMoved] = useState<Record<string, [number, number]>>({});

  const visible = useMemo(
    () =>
      spots.filter(
        (s) => (filter === "all" || s.category === filter) && (!freeOnly || s.free),
      ),
    [spots, filter, freeOnly],
  );
  const selected = spots.find((s) => s.id === selectedId) ?? null;

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar__brand">
          <span className="topbar__logo" aria-hidden>🏘️</span>
          <div>
            <h1 className="topbar__title">いいづか こどもマップ（仮）</h1>
            <p className="topbar__sub">地域で子どもを支えるお店・居場所</p>
          </div>
        </div>
        <button
          className="topbar__list"
          onClick={() => {
            setListOpen((v) => !v);
            setSelectedId(null);
          }}
        >
          {listOpen ? "地図" : `一覧 (${visible.length})`}
        </button>
      </header>

      <div className="filters" role="toolbar" aria-label="カテゴリで絞り込み">
        <button
          className={`fbtn ${filter === "all" ? "fbtn--on" : ""}`}
          onClick={() => setFilter("all")}
          style={{ "--c": "#5B5B5B" } as React.CSSProperties}
        >
          すべて
        </button>
        {(Object.keys(CATEGORIES) as Category[]).map((k) => (
          <button
            key={k}
            className={`fbtn ${filter === k ? "fbtn--on" : ""}`}
            style={{ "--c": CATEGORIES[k].color } as React.CSSProperties}
            onClick={() => setFilter(filter === k ? "all" : k)}
          >
            <span aria-hidden>{CATEGORIES[k].emoji}</span> {CATEGORIES[k].short}
          </button>
        ))}
        <label className={`fbtn fbtn--toggle ${freeOnly ? "fbtn--on" : ""}`} style={{ "--c": "#2E8B57" } as React.CSSProperties}>
          <input type="checkbox" checked={freeOnly} onChange={(e) => setFreeOnly(e.target.checked)} />
          無料のみ
        </label>
      </div>

      <main className="stage">
        <div className="map">
          <MapView
            spots={visible}
            selectedId={selectedId}
            onSelect={setSelectedId}
            editable={editMode}
            onMove={(id, lat, lng) => setMoved((m) => ({ ...m, [id]: [lat, lng] }))}
          />
        </div>

        {listOpen && (
          <ul className="list">
            {visible.map((s) => {
              const c = CATEGORIES[s.category];
              return (
                <li key={s.id}>
                  <button
                    className="list__item"
                    onClick={() => {
                      setSelectedId(s.id);
                      setListOpen(false);
                    }}
                  >
                    <span className="list__dot" style={{ background: c.color }}>{c.emoji}</span>
                    <span>
                      <span className="list__name">{s.name}</span>
                      <span className="list__meta">
                        {c.label}
                        {s.free && " ・ 無料"}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
            {visible.length === 0 && <li className="list__empty">該当するスポットがありません</li>}
          </ul>
        )}

        {/* key でスポットごとに作り直し、パネル内の state（全画面表示など）をリセットする */}
        {selected && !editMode && <SpotPanel key={selected.id} spot={selected} onClose={() => setSelectedId(null)} />}
        {editMode && <EditBar spots={spots} moved={moved} />}
      </main>

      <footer className="foot">
        ※ 試作版です。営業日・内容は各お店にご確認ください{" ・ "}
        <a href="https://autofor.co.jp/" target="_blank" rel="noopener noreferrer">AutoFor株式会社</a>
      </footer>
    </div>
  );
}
