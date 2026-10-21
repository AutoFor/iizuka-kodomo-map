"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const SCRIPT_SRC = "https://www.instagram.com/embed.js";

function processEmbeds() {
  if (window.instgrm) {
    window.instgrm.Embeds.process();
    return;
  }
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
  if (existing) {
    existing.addEventListener("load", () => window.instgrm?.Embeds.process(), { once: true });
    return;
  }
  const s = document.createElement("script");
  s.src = SCRIPT_SRC;
  s.async = true;
  s.onload = () => window.instgrm?.Embeds.process();
  document.body.appendChild(s);
}

/**
 * Instagram 公式 embed.js による埋め込み。
 *
 * embed.js は blockquote を iframe に「置き換える」（blockquote を DOM から外す）ため、
 * blockquote を React に描画させると、スポット切り替え時に React が消えた要素を
 * removeChild しようとして例外になる。
 * そこで React が管理するのは外側の div だけにし、中身は手動で作って手動で消す。
 */
export default function InstagramEmbed({ url, title }: { url: string; title: string }) {
  const permalink = url.replace(/\?.*$/, "");
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    host.replaceChildren();
    const bq = document.createElement("blockquote");
    bq.className = "instagram-media insta__embed";
    bq.setAttribute("data-instgrm-permalink", permalink);
    bq.setAttribute("data-instgrm-version", "14");
    const a = document.createElement("a");
    a.href = permalink;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = `${title} の Instagram 動画`;
    bq.appendChild(a);
    host.appendChild(bq);

    processEmbeds();

    return () => {
      host.replaceChildren();
    };
  }, [permalink, title]);

  return <div ref={hostRef} className="insta__host" />;
}
