"use client";

import { CATEGORIES, type Spot } from "@/lib/types";

type Props = { spot: Spot; onClose: () => void };

function instagramEmbedUrl(url: string) {
  // https://www.instagram.com/reel/XXXX/ -> https://www.instagram.com/reel/XXXX/embed/
  const m = url.match(/instagram\.com\/(reel|p)\/([A-Za-z0-9_-]+)/);
  return m ? `https://www.instagram.com/${m[1]}/${m[2]}/embed/` : null;
}

export default function SpotPanel({ spot, onClose }: Props) {
  const c = CATEGORIES[spot.category];
  const embed = spot.instagram_url ? instagramEmbedUrl(spot.instagram_url) : null;

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

        {spot.instagram_url && (
          <section className="insta">
            <h3 className="panel__h3">紹介動画（Instagram）</h3>
            {embed && (
              <div className="insta__frame">
                <iframe
                  src={embed}
                  title={`${spot.name} の Instagram 動画`}
                  loading="lazy"
                  allow="encrypted-media"
                  allowFullScreen
                />
              </div>
            )}
            <p className="insta__note">動画が表示されない場合は、下のボタンから Instagram で開いてください。</p>
            <a className="btn btn--insta" href={spot.instagram_url} target="_blank" rel="noopener noreferrer">
              Instagram で見る ↗
            </a>
          </section>
        )}

        <div className="panel__actions">
          {spot.url && (
            <a className="btn btn--primary" href={spot.url} target="_blank" rel="noopener noreferrer">
              公式サイト ↗
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
