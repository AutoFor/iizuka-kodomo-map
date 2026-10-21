"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap, Marker, LayerGroup } from "leaflet";
import "leaflet/dist/leaflet.css";
import { CATEGORIES, type Spot } from "@/lib/types";

// 飯塚市役所あたり
const CENTER: [number, number] = [33.6459, 130.6915];

type Props = {
  spots: Spot[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  /** 位置調整モード。ピンをドラッグで動かせる */
  editable?: boolean;
  onMove?: (id: string, lat: number, lng: number) => void;
};

export default function MapView({ spots, selectedId, onSelect, editable = false, onMove }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const layerRef = useRef<LayerGroup | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const onMoveRef = useRef(onMove);
  onMoveRef.current = onMove;

  // 地図の初期化（1 回だけ）
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: CENTER,
        zoom: 14,
        zoomControl: false,
        attributionControl: true,
      });
      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      map.on("click", () => onSelectRef.current(null));

      mapRef.current = map;
      layerRef.current = L.layerGroup().addTo(map);
      // マーカー描画を促すために spots effect を再実行させる
      setTimeout(() => map.invalidateSize(), 0);
      renderMarkers(L, spots);
    })();

    const markers = markersRef.current;
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      layerRef.current = null;
      markers.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderMarkers(L: typeof import("leaflet"), list: Spot[]) {
    const layer = layerRef.current;
    if (!layer) return;
    layer.clearLayers();
    markersRef.current.clear();
    for (const s of list) {
      const c = CATEGORIES[s.category];
      const icon = L.divIcon({
        className: "",
        html: `<div class="pin" style="--pin:${c.color}"><span>${c.emoji}</span></div>`,
        iconSize: [40, 48],
        iconAnchor: [20, 46],
        popupAnchor: [0, -40],
      });
      const m = L.marker([s.lat, s.lng], { icon, title: s.name, riseOnHover: true, draggable: editable })
        .addTo(layer)
        .on("click", () => onSelectRef.current(s.id))
        .on("dragend", () => {
          const p = m.getLatLng();
          onMoveRef.current?.(s.id, p.lat, p.lng);
        });
      m.bindTooltip(s.name, { direction: "top", offset: [0, -44], className: "pin-tip" });
      markersRef.current.set(s.id, m);
    }
  }

  // spots・編集モードが変わったらマーカーを描き直す
  useEffect(() => {
    if (!mapRef.current) return;
    import("leaflet").then((mod) => renderMarkers(mod.default, spots));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spots, editable]);

  // 選択状態の反映
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach((m, id) => {
      const el = m.getElement()?.querySelector<HTMLElement>(".pin");
      el?.classList.toggle("pin--active", id === selectedId);
    });
    if (selectedId) {
      const s = spots.find((x) => x.id === selectedId);
      if (s) map.flyTo([s.lat, s.lng], Math.max(map.getZoom(), 15), { duration: 0.6 });
    }
  }, [selectedId, spots]);

  return <div ref={containerRef} className="h-full w-full" aria-label="地図" />;
}
