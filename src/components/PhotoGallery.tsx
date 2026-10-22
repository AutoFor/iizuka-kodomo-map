"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

/**
 * 紹介動画から切り出した写真の横スクロールギャラリー。
 * タップすると拡大表示する。
 */
export default function PhotoGallery({ photos, title }: { photos: string[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="gallery">
      <h3 className="panel__h3">写真</h3>
      <div className="gallery__strip">
        {photos.map((src, i) => (
          <button key={src} className="gallery__item" onClick={() => setOpen(i)} aria-label={`${title} の写真 ${i + 1} を拡大`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${title} の写真 ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {/* パネル（overflow-y: auto）の内側に fixed 要素を置くと iOS Safari で
          ビューポート基準にならず見切れるため、body 直下に portal で描画する */}
      {open !== null &&
        createPortal(
          <div className="lightbox" role="dialog" aria-label="写真の拡大表示" onClick={() => setOpen(null)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos[open]} alt={`${title} の写真 ${open + 1}`} />
            <span className="lightbox__count">
              {open + 1} / {photos.length}
            </span>
          </div>,
          document.body,
        )}
    </section>
  );
}
