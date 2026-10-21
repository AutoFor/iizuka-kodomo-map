"use client";

import { useEffect } from "react";

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
 * iframe の高さを中身に合わせて自動調整するので、内側にスクロールが出ない。
 */
export default function InstagramEmbed({ url, title }: { url: string; title: string }) {
  const permalink = url.replace(/\?.*$/, "");

  useEffect(() => {
    processEmbeds();
  }, [permalink]);

  return (
    <blockquote
      key={permalink}
      className="instagram-media insta__embed"
      data-instgrm-permalink={permalink}
      data-instgrm-version="14"
    >
      <a href={permalink} target="_blank" rel="noopener noreferrer">
        {title} の Instagram 動画
      </a>
    </blockquote>
  );
}
