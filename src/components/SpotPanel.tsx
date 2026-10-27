"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import InstagramEmbed from "@/components/InstagramEmbed";
import PhotoGallery from "@/components/PhotoGallery";
import { CATEGORIES, type Spot } from "@/lib/types";

type Props = { spot: Spot; onClose: () => void };

/** 今日の日付（端末のローカル時刻基準）を YYYY-MM-DD で返す */
function todayStr() {
  const now = new Date();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${m}-${d}`;
}

export default function SpotPanel({ spot, onClose }: Props) {
  const c = CATEGORIES[spot.category];
  const today = todayStr();
  const upcomingEvents = (spot.events ?? []).filter((e) => e.date >= today);
  const [instaFull, setInstaFull] = useState(false);

  // 別のスポットに切り替わったら全画面表示を閉じる
  useEffect(() => setInstaFull(false), [spot.id]);

  return (
    <aside className="panel" aria-label={`${spot.name} の詳細`}>
      <div className="panel__grab" aria-hidden />
      <button className="panel__close" onClick={onClose} aria-label="閉じる">
        ×
      </button>

      <div className="panel__body">
        <span className="chip" style={{ background: c.color }}>
          {c.emoji} {c.label}
        </span>
        <h2 className="panel__title">{spot.name}</h2>
        <p className="panel__address">{spot.address}</p>
        {spot.hours && <p className="panel__hours">🕒 {spot.hours}</p>}

        <p className="panel__summary">{spot.summary}</p>

        {upcomingEvents.length > 0 && (
          <section className="events">
            <h3 className="panel__h3">開催予定のイベント</h3>
            {upcomingEvents.map((e) => (
              <div className="event" key={`${e.date}-${e.title}`}>
                <p className="event__title">🎉 {e.title}</p>
                <p className="event__schedule">📅 {e.schedule}</p>
                <p className="event__desc">{e.description}</p>
                {e.note && <p className="event__note">{e.note}</p>}
              </div>
            ))}
          </section>
        )}

        <h3 className="panel__h3">子ども向けのサービス</h3>
        <ul className="services">
          {spot.services.map((s) => (
            <li key={s}>
              <span className="services__check" style={{ color: c.color }}>✓</span>
              {s}
            </li>
          ))}
        </ul>

        {spot.tags.length > 0 && (
          <div className="tags">
            {spot.free && <span className="tag tag--free">無料</span>}
            {spot.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        )}

        {spot.photos && spot.photos.length > 0 && <PhotoGallery photos={spot.photos} title={spot.name} />}

        {spot.instagram_url && (
          <section className="insta">
            <h3 className="panel__h3">紹介動画（Instagram）</h3>
            <InstagramEmbed url={spot.instagram_url} title={spot.name} />
            <button className="btn btn--fullscreen" onClick={() => setInstaFull(true)}>
              ⛶ 全画面で再生
            </button>
            <p className="insta__note">動画が表示されない場合は、下のボタンから Instagram で開いてください。</p>
            <a className="btn btn--insta" href={spot.instagram_url} target="_blank" rel="noopener noreferrer">
              Instagram で見る ↗
            </a>
          </section>
        )}

        {/* パネル（overflow-y: auto）内の fixed は iOS Safari で見切れるため body 直下に出す */}
        {instaFull &&
          spot.instagram_url &&
          createPortal(
            <div className="insta-modal" role="dialog" aria-label="Instagram 動画の全画面表示" onClick={() => setInstaFull(false)}>
              <button className="insta-modal__close" onClick={() => setInstaFull(false)} aria-label="全画面表示を閉じる">
                ×
              </button>
              <div className="insta-modal__body" onClick={(e) => e.stopPropagation()}>
                <InstagramEmbed url={spot.instagram_url} title={spot.name} />
              </div>
            </div>,
            document.body,
          )}

        <div className="panel__actions">
          {spot.url && (
            <a className="btn btn--primary" href={spot.url} target="_blank" rel="noopener noreferrer">
              {spot.url.includes("instagram.com") ? "お店の Instagram ↗" : "公式サイト ↗"}
            </a>
          )}
          <a
            className="btn"
            href={`https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            経路を調べる ↗
          </a>
        </div>
      </div>
    </aside>
  );
}
