import { cellToBoundary, cellToLatLng, getResolution, latLngToCell, polygonToCells } from "h3-js";
import { featureCollection, intersect, polygon as turfPolygon } from "@turf/turf";
import type { Feature, Polygon as GeoPolygon } from "geojson";
import boundaryJson from "@/data/labuan-boundary.json";
import { RISK_CELLS, type RiskCell } from "@/data/mock";

export const H3_RESOLUTION = 8;

const boundaryFeature = boundaryJson as unknown as Feature<GeoPolygon>;
/** [lng, lat] outer ring of the real Labuan coastline (OSM relation 4443896, ODbL). */
const BOUNDARY_RING: Array<[number, number]> = boundaryFeature.geometry.coordinates[0]!.map(
  (p) => [p[0]!, p[1]!] as [number, number],
);
const BOUNDARY_POLY = turfPolygon([BOUNDARY_RING]);

/** H3 polygonToCells expects [lat, lng] pairs. */
const BOUNDARY_LATLNG: Array<[number, number]> = BOUNDARY_RING.map(([lng, lat]) => [lat, lng]);

export type GridCell = {
  h3: string;
  /** Display outline in [lat, lng], clipped against the coastline. */
  boundary: Array<[number, number]>;
  center: [number, number];
  locality: string;
};

function nearestLocality(lat: number, lng: number): string {
  let best = RISK_CELLS[0]!;
  let bestD = Number.POSITIVE_INFINITY;
  for (const cell of RISK_CELLS) {
    const d = (cell.lat - lat) ** 2 + (cell.lng - lng) ** 2;
    if (d < bestD) {
      bestD = d;
      best = cell;
    }
  }
  return best.locality;
}

let cachedGrid: GridCell[] | null = null;

/** Real H3 resolution-8 cells covering the Labuan land boundary, clipped to the coastline. */
export function labuanGrid(): GridCell[] {
  if (cachedGrid) return cachedGrid;

  const indexes = polygonToCells([BOUNDARY_LATLNG], H3_RESOLUTION);
  const cells: GridCell[] = [];

  for (const h3 of indexes) {
    const ring = cellToBoundary(h3, false); // [lat, lng][]
    const lngLat: Array<[number, number]> = ring.map(([lat, lng]) => [lng!, lat!] as [number, number]);
    lngLat.push(lngLat[0]!);

    let display: Array<[number, number]> = ring.map(([lat, lng]) => [lat!, lng!] as [number, number]);
    try {
      const clipped = intersect(featureCollection([turfPolygon([lngLat]), BOUNDARY_POLY]));
      if (!clipped) continue;
      const geom = clipped.geometry;
      const outer =
        geom.type === "Polygon"
          ? geom.coordinates[0]!
          : geom.coordinates
              .map((poly) => poly[0]!)
              .reduce((a, b) => (a.length >= b.length ? a : b));
      display = outer.map((p) => [p[1]!, p[0]!] as [number, number]);
    } catch {
      // keep the unclipped H3 boundary if the intersection fails
    }

    const [lat, lng] = cellToLatLng(h3);
    cells.push({ h3, boundary: display, center: [lat, lng], locality: nearestLocality(lat, lng) });
  }

  cachedGrid = cells;
  return cells;
}

export type RenderedCell = GridCell & { data: RiskCell };

/**
 * Maps the existing forecast records onto their real resolution-8 cell via lat/lng.
 * Cells with no model output stay "unknown" (grey) — no synthetic risk values.
 */
export function buildRenderedCells(records: RiskCell[]): RenderedCell[] {
  const grid = labuanGrid();
  const gridIndexes = new Set(grid.map((cell) => cell.h3));
  const byIndex = new Map<string, RiskCell>();
  for (const record of records) {
    let target = latLngToCell(record.lat, record.lng, H3_RESOLUTION);
    if (!gridIndexes.has(target)) {
      // record sits just outside the land boundary — attach it to the nearest land cell
      let bestD = Number.POSITIVE_INFINITY;
      for (const cell of grid) {
        const d = (cell.center[0] - record.lat) ** 2 + (cell.center[1] - record.lng) ** 2;
        if (d < bestD) {
          bestD = d;
          target = cell.h3;
        }
      }
    }
    if (!byIndex.has(target)) byIndex.set(target, record);
  }

  return grid.map((cell) => {
    const matched = byIndex.get(cell.h3);
    const data: RiskCell = matched
      ? { ...matched, id: cell.h3, h3: cell.h3, lat: cell.center[0], lng: cell.center[1] }
      : {
          id: cell.h3,
          h3: cell.h3,
          locality: cell.locality,
          lat: cell.center[0],
          lng: cell.center[1],
          risk: "unknown",
          probability: 0,
          confidence: 0,
          historicalIncidents: 0,
          rainfall: 0,
          temperature: 0,
          humidity: 0,
          vegetation: "Low",
          topCategory: "Other wildlife",
          residentialDensity: "Low",
          dataCompleteness: 0,
          trend: "flat",
        };
    return { ...cell, data };
  });
}

/** Verification helper: every rendered cell must be a genuine resolution-8 index. */
export function verifyResolution(cells: Array<{ h3: string }>): boolean {
  return cells.every((cell) => getResolution(cell.h3) === H3_RESOLUTION);
}
