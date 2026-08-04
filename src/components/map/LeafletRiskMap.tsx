import { MapContainer, TileLayer, Polygon, Tooltip, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { LABUAN_CENTER, RISK_COLOR, type RiskCell } from "@/data/mock";
import { hexVertices } from "@/lib/geo";

type Props = {
  cells: RiskCell[];
  selectedId?: string | null | undefined;
  onSelect: (cell: RiskCell) => void;
  zoom?: number | undefined;
};

function Resizer() {
  const map = useMap();
  useEffect(() => {
    const id = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(id);
  }, [map]);
  return null;
}

export default function LeafletRiskMap({ cells, selectedId, onSelect, zoom = 12 }: Props) {
  return (
    <MapContainer center={LABUAN_CENTER} zoom={zoom} scrollWheelZoom className="h-full w-full">
      <Resizer />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cells.map((cell) => (
        <Polygon
          key={cell.id}
          positions={hexVertices(cell.lat, cell.lng)}
          pathOptions={{
            color: selectedId === cell.id ? "#0B2239" : "#ffffff",
            weight: selectedId === cell.id ? 3 : 1,
            fillColor: RISK_COLOR[cell.risk],
            fillOpacity: selectedId === cell.id ? 0.75 : 0.5,
          }}
          eventHandlers={{ click: () => onSelect(cell) }}
        >
          <Tooltip direction="center" opacity={1} permanent className="!border-0 !bg-transparent !shadow-none">
            <span className="text-[11px] font-semibold text-[#0B2239]">
              {cell.locality}
              <br />
              {cell.risk === "unknown" ? "No data" : `${cell.probability}%`}
            </span>
          </Tooltip>
        </Polygon>
      ))}
    </MapContainer>
  );
}
