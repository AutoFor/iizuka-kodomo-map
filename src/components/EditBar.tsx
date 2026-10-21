"use client";

import { useState } from "react";
import type { Spot } from "@/lib/types";

type Props = { spots: Spot[]; moved: Record<string, [number, number]> };

/**
 * 位置調整モード（URL に ?edit）の下部バー。
 * ピンを動かした結果の座標をまとめてコピーできる。保存はされないので、コピーして共有する。
 */
export default function EditBar({ spots, moved }: Props) {
  const [copied, setCopied] = useState(false);
  const lines = spots.map((s) => {
    const [lat, lng] = moved[s.id] ?? [s.lat, s.lng];
    return `${s.name}: ${lat.toFixed(6)}, ${lng.toFixed(6)}${moved[s.id] ? "（調整済み）" : ""}`;
  });
  const text = lines.join("\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("コピーしてください", text);
    }
  }

  return (
    <div className="editbar">
      <p className="editbar__title">📍 位置調整モード：ピンを押したまま動かせます</p>
      <pre className="editbar__coords">{text}</pre>
      <button className="btn btn--primary editbar__copy" onClick={copy}>
        {copied ? "コピーしました" : "座標をコピー"}
      </button>
    </div>
  );
}
