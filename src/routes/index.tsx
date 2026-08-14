import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell as RCell,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  CloudRain,
  Droplets,
  Gauge,
  History,
  MapPinned,
  RefreshCw,
  Thermometer,
  Wind,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { DisclaimerBanner, InfoTip, PageHeading, RiskBadge, Trend } from "@/components/common";
import { RiskLegend, RiskMap } from "@/components/map/RiskMap";
import { CellDetail } from "@/components/dashboard/CellDetail";
import { DEFAULT_FILTERS, FilterBar, type Filters } from "@/components/dashboard/FilterBar";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  CATEGORY_SHARE,
  CURRENT_CONDITIONS,
  MONTHLY_INCIDENTS,
  RECENT_INCIDENTS,
  RISK_CELLS,
  RISK_COLOR,
  applyPeriod,
  type RiskCell,
} from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Overview | APM Wildlife Risk Intelligence – Labuan" },
      {
        name: "description",
        content:
          "Twenty-four hour, area-level wildlife incident risk overview for Labuan: risk map, priority monitoring areas and environmental conditions.",
      },
      { property: "og:title", content: "APM Wildlife Risk Intelligence – Labuan" },
      {
        property: "og:description",
        content:
          "Research prototype decision-support dashboard for wildlife-related emergency risk in Labuan, Malaysia.",
      },
    ],
  }),
  component: OverviewPage,
});

function SummaryCard({
  title,
  value,
  support,
  icon,
  accent,
  children,
}: {
  title: string;
  value: string;
  support: string;
  icon: React.ReactNode;
  accent: string;
  children?: React.ReactNode;
}) {
  return (
    <Card className="shadow-card">
      <CardContent className="p-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-1.5 text-3xl font-extrabold tracking-tight text-foreground">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{support}</p>
          </div>
          <div
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
            style={{ backgroundColor: `${accent}1f`, color: accent }}
          >
            {icon}
          </div>
        </div>
        {children ? <div className="mt-3">{children}</div> : null}
      </CardContent>
    </Card>
  );
}

function OverviewPage() {
  const [draft, setDraft] = useState<Filters>(DEFAULT_FILTERS);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<RiskCell | null>(null);
  const [updatedAt, setUpdatedAt] = useState("Today, 8:00 AM");
  const [refreshing, setRefreshing] = useState(false);
  const isMobile = useIsMobile();

  const cells = useMemo(() => {
    return RISK_CELLS.map((cell) => applyPeriod(cell, filters.period)).filter((cell) => {
      if (filters.risk !== "all" && cell.risk !== filters.risk) return false;
      if (filters.locality !== "all" && cell.locality !== filters.locality) return false;
      if (filters.category !== "all" && cell.topCategory !== filters.category) return false;
      return true;
    });
  }, [filters]);

  const highCount = cells.filter((cell) => cell.risk === "high").length;
  const mediumCount = cells.filter((cell) => cell.risk === "medium").length;
  const confidence = cells.length
    ? Math.round(cells.reduce((sum, cell) => sum + cell.confidence, 0) / cells.length)
    : 0;
  const incidents30d = Math.max(4, Math.round(18 * (cells.length / RISK_CELLS.length)));

  const priority = [...cells]
    .filter((cell) => cell.risk !== "unknown")
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 5);

  const monthly = useMemo(
    () =>
      MONTHLY_INCIDENTS.map((point) => ({
        ...point,
        incidents:
          filters.category === "all"
            ? point.incidents
            : Math.round(point.incidents * 0.46 + point.incidents * 0.1),
      })),
    [filters.category],
  );

  const runFilters = (next: Filters) => {
    setLoading(true);
    setSelected(null);
    setTimeout(() => {
      setFilters(next);
      setLoading(false);
    }, 450);
  };

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      const time = new Intl.DateTimeFormat("en-MY", {
        timeZone: "Asia/Kuala_Lumpur",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date());
      setUpdatedAt(`Today, ${time}`);
    }, 1000);
  };

  const detail = selected ? <CellDetail cell={selected} generatedAt={updatedAt} /> : null;

  return (
    <div className="space-y-6">
      <PageHeading
        title="Wildlife Incident Risk Overview"
        subtitle="Location-based decision support for the next 24 hours in Labuan"
        actions={
          <>
            <Input
              type="date"
              value={draft.date}
              onChange={(event) => setDraft({ ...draft, date: event.target.value })}
              className="w-[160px] bg-card"
            />
            <span className="text-xs text-muted-foreground">Last updated: {updatedAt}</span>
            <Button variant="outline" onClick={refresh} disabled={refreshing}>
              <RefreshCw className={refreshing ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
              {refreshing ? "Refreshing…" : "Refresh Forecast"}
            </Button>
          </>
        }
      />

      <DisclaimerBanner>
        This dashboard displays estimated wildlife-incident risk based on historical patterns,
        environmental conditions and recent observations. Risk levels support planning and do not
        guarantee that an incident will occur.
      </DisclaimerBanner>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-[132px] rounded-xl" />
          ))
        ) : (
          <>
            <SummaryCard
              title="High-Risk Zones"
              value={`${highCount}`}
              support="Requires closer monitoring"
              accent="#D64545"
              icon={<MapPinned className="h-5 w-5" />}
            >
              <Trend direction="up" label="+1 from yesterday" />
            </SummaryCard>
            <SummaryCard
              title="Medium-Risk Zones"
              value={`${mediumCount}`}
              support="Monitor changing conditions"
              accent="#F5A623"
              icon={<AlertTriangle className="h-5 w-5" />}
            />
            <SummaryCard
              title="Forecast Confidence"
              value={`${confidence}%`}
              support="Moderate confidence"
              accent="#12355B"
              icon={<Gauge className="h-5 w-5" />}
            >
              <Progress value={confidence} className="h-1.5" />
            </SummaryCard>
            <SummaryCard
              title="Incidents in Last 30 Days"
              value={`${incidents30d}`}
              support="Based on demonstration records"
              accent="#F28C28"
              icon={<History className="h-5 w-5" />}
            >
              <Trend direction="down" label="12% lower than previous period" />
            </SummaryCard>
          </>
        )}
      </div>

      <FilterBar
        draft={draft}
        onDraftChange={setDraft}
        onApply={() => runFilters(draft)}
        onReset={() => {
          setDraft(DEFAULT_FILTERS);
          runFilters(DEFAULT_FILTERS);
        }}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card className="shadow-card">
          <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 pb-3">
            <div className="min-w-0">
              <CardTitle className="flex items-center gap-2 text-base">
                Labuan 24-Hour Risk Map
                <InfoTip text="Hexagonal H3-style cells show estimated area-level risk for the selected forecast period. Select a cell for details." />
              </CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                Forecast period: {filters.period} · Demonstration data
              </p>
            </div>
            <RiskLegend />
          </CardHeader>
          <CardContent>
            <div className="h-[420px] w-full sm:h-[520px]">
              {loading ? (
                <Skeleton className="h-full w-full rounded-xl" />
              ) : (
                <RiskMap
                  cells={cells}
                  selectedId={selected?.id ?? null}
                  onSelect={(cell) => setSelected(cell)}
                />
              )}
            </div>
            {!isMobile && selected ? (
              <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4">{detail}</div>
            ) : null}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Priority Monitoring Areas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {priority.length === 0 ? (
                <p className="text-sm text-muted-foreground">No areas match the current filters.</p>
              ) : (
                priority.map((cell) => (
                  <div
                    key={cell.id}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {cell.locality}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <RiskBadge level={cell.risk} />
                        <span
                          className="text-sm font-bold"
                          style={{ color: RISK_COLOR[cell.risk] }}
                        >
                          {cell.probability}%
                        </span>
                        <Trend
                          direction={cell.trend}
                          label={cell.trend === "flat" ? "stable" : cell.trend === "up" ? "rising" : "easing"}
                        />
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => setSelected(cell)}>
                      View
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Current Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {[
                { icon: CloudRain, label: "Weather", value: CURRENT_CONDITIONS.weather },
                {
                  icon: Thermometer,
                  label: "Temperature",
                  value: `${CURRENT_CONDITIONS.temperature}°C`,
                },
                { icon: Droplets, label: "Humidity", value: `${CURRENT_CONDITIONS.humidity}%` },
                {
                  icon: CloudRain,
                  label: "Rainfall (24 h)",
                  value: `${CURRENT_CONDITIONS.rainfall24h} mm`,
                },
                { icon: Wind, label: "Wind", value: `${CURRENT_CONDITIONS.wind} km/h` },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
                    <row.icon className="h-4 w-4 shrink-0 text-primary" />
                    <span className="truncate">{row.label}</span>
                  </span>
                  <span className="font-semibold text-foreground">{row.value}</span>
                </div>
              ))}
              <div className="mt-2 flex items-center justify-between gap-3 rounded-lg bg-[#F5A623]/12 px-3 py-2">
                <span className="text-xs font-medium text-foreground">
                  Overall environmental risk
                </span>
                <span className="text-xs font-bold text-[#B4791B]">
                  {CURRENT_CONDITIONS.environmentalRisk}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5 shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Operational Note</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-foreground/80">
                Consider reviewing personnel and equipment readiness for the three higher-risk
                zones. Continue monitoring weather and incident updates.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Wildlife Incidents by Month</CardTitle>
            <p className="text-xs text-muted-foreground">
              Demonstration records across one representative year
            </p>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthly} margin={{ left: -18, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="incidentFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#12355B" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#12355B" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#DFE4EA" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#5E6C84" }} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#5E6C84" }} tickLine={false} axisLine={false} />
                <RTooltip
                  contentStyle={{ borderRadius: 12, borderColor: "#DFE4EA", fontSize: 12 }}
                />
                <Area
                  type="monotone"
                  dataKey="incidents"
                  stroke="#12355B"
                  strokeWidth={2}
                  fill="url(#incidentFill)"
                  name="Incidents"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Incidents by Wildlife Category</CardTitle>
            <p className="text-xs text-muted-foreground">Share of demonstration records</p>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_SHARE} layout="vertical" margin={{ left: 40, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DFE4EA" horizontal={false} />
                <XAxis type="number" unit="%" tick={{ fontSize: 12, fill: "#5E6C84" }} />
                <YAxis
                  type="category"
                  dataKey="category"
                  width={100}
                  tick={{ fontSize: 12, fill: "#172B4D" }}
                  tickLine={false}
                  axisLine={false}
                />
                <RTooltip
                  formatter={(value: number) => [`${value}%`, "Share"]}
                  contentStyle={{ borderRadius: 12, borderColor: "#DFE4EA", fontSize: 12 }}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {CATEGORY_SHARE.map((entry, index) => (
                    <RCell key={entry.category} fill={index === 0 ? "#12355B" : "#5E86B5"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 pb-2">
          <div className="min-w-0">
            <CardTitle className="text-base">Recent Incident Reports</CardTitle>
            <p className="text-xs text-muted-foreground">
              Anonymised demonstration records — no personal identifiers are shown
            </p>
          </div>
          <Button asChild size="sm" variant="outline">
            <Link to="/incident-records">All records</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date and time</TableHead>
                  <TableHead>General locality</TableHead>
                  <TableHead>Wildlife category</TableHead>
                  <TableHead>Risk level</TableHead>
                  <TableHead>Response status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RECENT_INCIDENTS.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="whitespace-nowrap text-sm">
                      {record.displayDate}, {record.time}
                    </TableCell>
                    <TableCell className="text-sm">{record.locality}</TableCell>
                    <TableCell className="text-sm">{record.category}</TableCell>
                    <TableCell>
                      <RiskBadge level={record.risk} />
                    </TableCell>
                    <TableCell className="text-sm">{record.outcome}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Drawer open={isMobile && selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DrawerContent className="max-h-[85vh] overflow-y-auto p-4">
          <DrawerTitle className="sr-only">Risk cell details</DrawerTitle>
          {detail}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
