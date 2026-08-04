import { Suspense, lazy, useEffect, useState, Component, type ReactNode } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { RISK_COLOR, RISK_LABEL, type RiskCell } from "@/data/mock";
import { FallbackMap } from "./FallbackMap";
import { Skeleton } from "@/components/ui/skeleton";

const LeafletRiskMap = lazy(() => import("./LeafletRiskMap"));

type Props = {
  cells: RiskCell[];
  selectedId?: string | null | undefined;
  onSelect: (cell: RiskCell) => void;
  zoom?: number | undefined;
};

class MapErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function RiskLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
      {(["low", "medium", "high", "unknown"] as const).map((level) => (
        <span key={level} className="flex items-center gap-1.5">
          <span
            className="inline-block h-3 w-3 rounded-[3px]"
            style={{ backgroundColor: RISK_COLOR[level] }}
          />
          {RISK_LABEL[level]}
        </span>
      ))}
    </div>
  );
}

export function RiskMap({ cells, selectedId, onSelect, zoom }: Props) {
  const [tilesOk, setTilesOk] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onerror = () => !cancelled && setTilesOk(false);
    img.src = "https://a.tile.openstreetmap.org/12/3266/1985.png";
    return () => {
      cancelled = true;
    };
  }, []);

  const fallback = <FallbackMap cells={cells} selectedId={selectedId} onSelect={onSelect} />;

  return (
    <div className="h-full w-full overflow-hidden rounded-xl border border-border bg-muted">
      <ClientOnly fallback={<Skeleton className="h-full w-full" />}>
        {tilesOk ? (
          <MapErrorBoundary fallback={fallback}>
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <LeafletRiskMap
                cells={cells}
                selectedId={selectedId}
                onSelect={onSelect}
                zoom={zoom}
              />
            </Suspense>
          </MapErrorBoundary>
        ) : (
          fallback
        )}
      </ClientOnly>
    </div>
  );
}
