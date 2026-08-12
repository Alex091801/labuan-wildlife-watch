import type { RiskCell } from "@/data/mock";

/** Projects lat/lng into a 0-100 viewBox space for the SVG fallback map. */
export function projectToSvg(cell: Pick<RiskCell, "lat" | "lng">) {
  const minLat = 5.225;
  const maxLat = 5.35;
  const minLng = 115.185;
  const maxLng = 115.28;
  return {
    x: ((cell.lng - minLng) / (maxLng - minLng)) * 100,
    y: ((maxLat - cell.lat) / (maxLat - minLat)) * 100,
  };
}
