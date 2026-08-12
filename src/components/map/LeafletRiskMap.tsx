import { MapContainer, Polygon, Popup, TileLayer, Tooltip, useMap } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import { LABUAN_CENTER, RISK_COLOR, RISK_LABEL, type RiskCell } from "@/data/mock";
import { buildRenderedCells } from "@/lib/h3grid";

type Props = {
  cells: RiskCell[];
  selectedId?: string | null | undefined;
  onSelect: (cell: RiskCell) => void;
  zoom?: number | undefined;
  period?: string | undefined;
};

function Resizer() {
  const map = useMap();
  useEffect(() => {
    const id = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(id);
  }, [map]);
  return null;
}

export default function LeafletRiskMap({ cells, selectedId, onSelect, zoom = 12, period }: Props) {
  const rendered = useMemo(() => buildRenderedCells(cells), [cells]);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <MapContainer center={LABUAN_CENTER} zoom={zoom} scrollWheelZoom className="h-full w-full">
      <Resizer />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {rendered.map(({ h3, boundary, data }) => {
        const active = selectedId === h3 || hovered === h3;
        const hasData = data.risk !== "unknown";
        return (
          <Polygon
            key={h3}
            positions={boundary}
            pathOptions={{
              color: selectedId === h3 ? "#0B2239" : "#ffffff",
              weight: active ? 2 : 1,
              fillColor: RISK_COLOR[data.risk],
              fillOpacity: active ? 0.75 : 0.55,
            }}
            eventHandlers={{
              click: () => onSelect(data),
              mouseover: () => setHovered(h3),
              mouseout: () => setHovered((current) => (current === h3 ? null : current)),
            }}
          >
            <Tooltip sticky direction="top" opacity={1}>
              <span className="text-[11px] leading-relaxed text-[#0B2239]">
                <strong>{data.locality}</strong>
                <br />
                {RISK_LABEL[data.risk]}
                {hasData ? ` · ${data.probability}%` : ""}
              </span>
            </Tooltip>
            <Popup>
              <div className="space-y-1 text-[12px] leading-relaxed text-[#172B4D]">
                <p className="text-[13px] font-semibold">{data.locality}</p>
                <p>
                  <span className="text-[#5E6C84]">H3 cell:</span> {h3}
                </p>
                <p>
                  <span className="text-[#5E6C84]">Risk:</span> {RISK_LABEL[data.risk]}
                  {hasData ? ` (${data.probability}%)` : ""}
                </p>
                <p>
                  <span className="text-[#5E6C84]">Forecast period:</span> {period ?? "Full 24 Hours"}
                </p>
                <p>
                  <span className="text-[#5E6C84]">Data status:</span>{" "}
                  {hasData ? `Model output · ${data.dataCompleteness}% complete` : "Insufficient data"}
                </p>
              </div>
            </Popup>
          </Polygon>
        );
      })}
    </MapContainer>
  );
}
