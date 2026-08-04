import type { RiskCell } from "@/data/mock";

/** Returns hexagon vertex coordinates ([lat, lng]) around a cell centre. */
export function hexVertices(
  lat: number,
  lng: number,
  radiusKm = 1.15,
): Array<[number, number]> {
  const latDeg = radiusKm / 110.574;
  const lngDeg = radiusKm / (111.32 * Math.cos((lat * Math.PI) / 180));
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i + 30);
    return [lat + latDeg * Math.sin(angle), lng + lngDeg * Math.cos(angle)] as [number, number];
  });
}

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
