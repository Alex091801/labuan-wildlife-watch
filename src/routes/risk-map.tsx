import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Layers, Maximize2, Minus, Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DisclaimerBanner, PageHeading, RiskBadge } from "@/components/common";
import { RiskLegend, RiskMap } from "@/components/map/RiskMap";
import { CellDetail } from "@/components/dashboard/CellDetail";
import {
  RISK_CELLS,
  SEVEN_DAY_PATTERN,
  TIME_PERIODS,
  WILDLIFE_CATEGORIES,
  applyPeriod,
  hourlyRiskFor,
  type RiskCell,
  type TimePeriod,
} from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/risk-map")({
  head: () => ({
    meta: [
      { title: "24-Hour Risk Map | APM Wildlife Risk Intelligence – Labuan" },
      {
        name: "description",
        content:
          "Explore predicted 24-hour wildlife incident risk in Labuan by H3 grid cell or general locality.",
      },
      { property: "og:title", content: "24-Hour Wildlife Incident Risk Map – Labuan" },
      {
        property: "og:description",
        content: "Interactive area-level risk exploration for APM Labuan operational planning.",
      },
    ],
  }),
  component: RiskMapPage,
});

function RiskMapPage() {
  const [period, setPeriod] = useState<TimePeriod>("Full 24 Hours");
  const [riskFilter, setRiskFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<RiskCell | null>(null);
  const [zoom, setZoom] = useState(12);
  const [fullscreen, setFullscreen] = useState(false);
  const [showHistorical, setShowHistorical] = useState(false);
  const [localityLayer, setLocalityLayer] = useState(false);
  const [loading, setLoading] = useState(false);

  const cells = useMemo(
    () =>
      RISK_CELLS.map((cell) => applyPeriod(cell, period)).filter((cell) => {
        if (riskFilter !== "all" && cell.risk !== riskFilter) return false;
        if (category !== "all" && cell.topCategory !== category) return false;
        if (search && !cell.locality.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      }),
    [period, riskFilter, category, search],
  );

  const changePeriod = (next: TimePeriod) => {
    setLoading(true);
    setTimeout(() => {
      setPeriod(next);
      setLoading(false);
    }, 350);
  };

  return (
    <div className="space-y-5">
      <PageHeading
        title="24-Hour Wildlife Incident Risk Map"
        subtitle="Explore predicted risk levels by H3 grid cell or general locality."
      />

      <DisclaimerBanner>
        Risk values are probability estimates for an area over the selected forecast window. They do
        not identify an exact incident location or time.
      </DisclaimerBanner>

      <Card className="shadow-card">
        <CardContent className="space-y-4 p-4">
          <div className="flex flex-wrap gap-2">
            {TIME_PERIODS.map((item) => (
              <Button
                key={item}
                size="sm"
                variant={period === item ? "default" : "outline"}
                onClick={() => changePeriod(item)}
              >
                {item}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search locality…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All risk levels</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="unknown">Insufficient data</SelectItem>
              </SelectContent>
            </Select>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Wildlife category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {WILDLIFE_CATEGORIES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border px-3 py-2">
              <div className="flex items-center gap-2">
                <Switch
                  id="layer-locality"
                  checked={localityLayer}
                  onCheckedChange={setLocalityLayer}
                />
                <Label htmlFor="layer-locality" className="text-xs">
                  Locality boundaries
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="layer-historical"
                  checked={showHistorical}
                  onCheckedChange={setShowHistorical}
                />
                <Label htmlFor="layer-historical" className="text-xs">
                  Historical density
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div
        className={cn(
          "grid grid-cols-1 gap-4",
          !fullscreen && "xl:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]",
        )}
      >
        <Card className={cn("shadow-card", fullscreen && "fixed inset-3 z-50 overflow-auto")}>
          <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 pb-3">
            <div className="min-w-0">
              <CardTitle className="flex items-center gap-2 text-base">
                <Layers className="h-4 w-4 text-primary" />
                {showHistorical ? "Historical incident density" : "Forecast risk"} ·{" "}
                {localityLayer ? "Locality view" : "H3 cell view"}
              </CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                Forecast window: {period} · {cells.length} cells shown
              </p>
            </div>
            <div className="flex items-center gap-2">
              <RiskLegend />
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="outline"
                  aria-label="Zoom out"
                  onClick={() => setZoom((value) => Math.max(10, value - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  aria-label="Zoom in"
                  onClick={() => setZoom((value) => Math.min(15, value + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  aria-label="Toggle full screen"
                  onClick={() => setFullscreen((value) => !value)}
                >
                  {fullscreen ? <X className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className={cn("w-full", fullscreen ? "h-[78vh]" : "h-[460px] sm:h-[600px]")}>
              {loading ? (
                <Skeleton className="h-full w-full rounded-xl" />
              ) : (
                <RiskMap
                  key={`${zoom}-${localityLayer}`}
                  cells={cells}
                  zoom={zoom}
                  period={period}
                  selectedId={selected?.id ?? null}
                  onSelect={setSelected}
                />
              )}
            </div>
          </CardContent>
        </Card>

        {!fullscreen ? (
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Cell Detail Drawer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {!selected ? (
                <p className="text-sm text-muted-foreground">
                  Select a hexagonal cell on the map to view its risk classification, contributing
                  factors and environmental conditions.
                </p>
              ) : (
                <>
                  <CellDetail cell={selected} />
                  <div>
                    <p className="mb-2 text-sm font-semibold text-foreground">Hourly risk profile</p>
                    <div className="h-[150px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={hourlyRiskFor(selected)} margin={{ left: -22, right: 8 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#DFE4EA" vertical={false} />
                          <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "#5E6C84" }} interval={3} />
                          <YAxis tick={{ fontSize: 10, fill: "#5E6C84" }} axisLine={false} />
                          <RTooltip
                            formatter={(value: number) => [`${value}%`, "Risk"]}
                            contentStyle={{ borderRadius: 12, borderColor: "#DFE4EA", fontSize: 12 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="risk"
                            stroke="#F28C28"
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-semibold text-foreground">
                      Previous seven-day pattern
                    </p>
                    <div className="h-[140px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={SEVEN_DAY_PATTERN} margin={{ left: -22, right: 8 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#DFE4EA" vertical={false} />
                          <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#5E6C84" }} />
                          <YAxis tick={{ fontSize: 10, fill: "#5E6C84" }} axisLine={false} />
                          <RTooltip
                            formatter={(value: number) => [`${value}%`, "Risk"]}
                            contentStyle={{ borderRadius: 12, borderColor: "#DFE4EA", fontSize: 12 }}
                          />
                          <Bar dataKey="risk" fill="#12355B" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 px-3 py-2">
                    <span className="text-xs text-muted-foreground">Data availability</span>
                    <span className="flex items-center gap-2 text-xs font-semibold">
                      {selected.dataCompleteness}%
                      <RiskBadge
                        level={selected.dataCompleteness > 60 ? "low" : "unknown"}
                      />
                    </span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
