import { RISK_COLOR, RISK_LABEL, type RiskCell } from "@/data/mock";
import { projectToSvg } from "@/lib/geo";
import { cn } from "@/lib/utils";

type Props = {
  cells: RiskCell[];
  selectedId?: string | null;
  onSelect: (cell: RiskCell) => void;
  className?: string;
  note?: string;
};

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i + 30);
    return `${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * 1.15 * Math.sin(angle)).toFixed(2)}`;
  }).join(" ");
}

/** Schematic Labuan map used when Leaflet/OSM tiles are unavailable. */
export function FallbackMap({ cells, selectedId, onSelect, className, note }: Props) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-[#e6edf4]", className)}>
      <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label="Schematic risk map of Labuan">
        <defs>
          <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#d5dfeb" strokeWidth="0.2" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        <path
          d="M22 18 L60 10 L82 26 L86 54 L70 84 L38 90 L16 68 L12 38 Z"
          fill="#f7fbf7"
          stroke="#c7d4e2"
          strokeWidth="0.6"
        />
        {cells.map((cell) => {
          const { x, y } = projectToSvg(cell);
          const selected = selectedId === cell.id;
          return (
            <g key={cell.id} onClick={() => onSelect(cell)} className="cursor-pointer">
              <polygon
                points={hexPoints(x, y, 6.5)}
                fill={RISK_COLOR[cell.risk]}
                fillOpacity={selected ? 0.85 : 0.55}
                stroke={selected ? "#0B2239" : "#ffffff"}
                strokeWidth={selected ? 0.9 : 0.4}
              />
              <text
                x={x}
                y={y + 0.9}
                textAnchor="middle"
                fontSize="2.2"
                fill="#0B2239"
                fontWeight="600"
              >
                {cell.risk === "unknown" ? "n/a" : `${cell.probability}%`}
              </text>
              <text x={x} y={y + 4.2} textAnchor="middle" fontSize="1.7" fill="#172B4D">
                {cell.locality.length > 18 ? `${cell.locality.slice(0, 16)}…` : cell.locality}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-md border border-border bg-card/95 px-3 py-2 text-xs text-muted-foreground shadow-card">
        {note ?? "Schematic locality view — interactive tiles unavailable"}
      </div>
      <div className="absolute right-3 top-3 flex flex-col gap-1 rounded-md border border-border bg-card/95 p-2 text-[11px] shadow-card">
        {(["high", "medium", "low", "unknown"] as const).map((level) => (
          <span key={level} className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: RISK_COLOR[level] }}
            />
            {RISK_LABEL[level]}
          </span>
        ))}
      </div>
    </div>
  );
}
