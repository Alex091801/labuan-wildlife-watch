import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/common";
import { FACTOR_CONTRIBUTIONS, RISK_COLOR, type RiskCell } from "@/data/mock";
import { ArrowRight, LineChart } from "lucide-react";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/70 py-1.5 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-right text-xs font-semibold text-foreground">{value}</span>
    </div>
  );
}

export function CellDetail({
  cell,
  generatedAt = "Today, 8:00 AM",
  showActions = true,
}: {
  cell: RiskCell;
  generatedAt?: string;
  showActions?: boolean;
}) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-foreground">{cell.locality}</h3>
          <RiskBadge level={cell.risk} />
        </div>
        <p className="text-xs text-muted-foreground">H3 Cell ID: {cell.h3}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border bg-muted/50 p-3">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
            Risk probability
          </p>
          <p className="text-2xl font-extrabold" style={{ color: RISK_COLOR[cell.risk] }}>
            {cell.risk === "unknown" ? "n/a" : `${cell.probability}%`}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-muted/50 p-3">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
            Forecast confidence
          </p>
          <p className="text-2xl font-extrabold text-primary">{cell.confidence}%</p>
        </div>
      </div>

      <div>
        <Row label="Next 24-hour risk" value={cell.risk === "unknown" ? "Insufficient data" : cell.risk === "high" ? "High" : cell.risk === "medium" ? "Medium" : "Low"} />
        <Row label="Historical incidents in this cell" value={`${cell.historicalIncidents}`} />
        <Row label="Recent rainfall" value={`${cell.rainfall} mm`} />
        <Row label="Temperature" value={`${cell.temperature}°C`} />
        <Row label="Humidity" value={`${cell.humidity}%`} />
        <Row label="Nearby vegetation index" value={cell.vegetation} />
        <Row label="Most frequently reported wildlife" value={cell.topCategory} />
        <Row label="Data availability" value={`${cell.dataCompleteness}% complete`} />
        <Row label="Forecast generated" value={generatedAt} />
      </div>

      <div className="rounded-lg border border-border bg-card p-3">
        <p className="text-sm font-semibold text-foreground">Why is this area higher risk?</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Risk is elevated because of recent rainfall, high humidity, proximity to vegetation and a
          higher frequency of previous wildlife-related incidents in this area.
        </p>
        <div className="mt-3 space-y-2">
          {FACTOR_CONTRIBUTIONS.map((factor) => (
            <div key={factor.factor}>
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{factor.factor}</span>
                <span className="font-semibold text-foreground">{factor.value}%</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${factor.value * 2.6}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="rounded-lg bg-muted/70 p-3 text-[11px] leading-relaxed text-muted-foreground">
        This is an estimated area-level risk. It is not an exact incident prediction.
      </p>

      {showActions ? (
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm">
            <Link to="/risk-map">
              View Area Details <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link to="/historical">
              <LineChart className="h-3.5 w-3.5" /> View Historical Pattern
            </Link>
          </Button>
        </div>
      ) : null}
    </div>
  );
}
