import { useState } from "react";
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
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DisclaimerBanner, InterpretationNote, PageHeading } from "@/components/common";
import { RiskMap } from "@/components/map/RiskMap";
import {
  CATEGORY_COMPARISON,
  HOURLY_DISTRIBUTION,
  LOCALITIES,
  RISK_CELLS,
  SEASONALITY,
  TOP_LOCALITIES,
  WEATHER_CONDITIONS,
  WEATHER_VS_INCIDENTS,
  WILDLIFE_CATEGORIES,
  YEARLY_TREND,
} from "@/data/mock";

export const Route = createFileRoute("/historical")({
  head: () => ({
    meta: [
      { title: "Historical Analysis | APM Wildlife Risk Intelligence – Labuan" },
      {
        name: "description",
        content:
          "Patterns in anonymised demonstration wildlife incident records representing the 2020–2025 Labuan study period.",
      },
      { property: "og:title", content: "Historical Wildlife Incident Analysis – Labuan" },
      {
        property: "og:description",
        content: "Seasonality, hour-of-day, weather and locality patterns for the 2020–2025 study period.",
      },
    ],
  }),
  component: HistoricalPage,
});

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function Kpi({ label, value, support }: { label: string; value: string; support: string }) {
  return (
    <Card className="shadow-card">
      <CardContent className="p-4">
        <p className="truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="mt-1.5 text-2xl font-extrabold text-foreground">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{support}</p>
      </CardContent>
    </Card>
  );
}

function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="min-w-0 space-y-1.5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-card">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function HistoricalPage() {
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("all");
  const [locality, setLocality] = useState("all");
  const [category, setCategory] = useState("all");
  const [weather, setWeather] = useState("all");
  const [timeOfDay, setTimeOfDay] = useState("all");

  const maxSeason = Math.max(...SEASONALITY.flatMap((row) => row.values));

  return (
    <div className="space-y-5">
      <PageHeading
        title="Historical Wildlife Incident Analysis"
        subtitle="Patterns identified from anonymised demonstration records representing the 2020–2025 study period."
      />

      <DisclaimerBanner>
        All values shown are demonstration data. Findings must be re-derived and validated using the
        approved APM dataset before any operational interpretation.
      </DisclaimerBanner>

      <Card className="shadow-card">
        <CardContent className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 xl:grid-cols-6">
          <Filter label="Year" value={year} onChange={setYear} options={["2020", "2021", "2022", "2023", "2024", "2025"]} />
          <Filter label="Month" value={month} onChange={setMonth} options={MONTHS} />
          <Filter label="Locality" value={locality} onChange={setLocality} options={LOCALITIES} />
          <Filter
            label="Wildlife category"
            value={category}
            onChange={setCategory}
            options={[...WILDLIFE_CATEGORIES]}
          />
          <Filter
            label="Weather condition"
            value={weather}
            onChange={setWeather}
            options={[...WEATHER_CONDITIONS]}
          />
          <Filter
            label="Time of day"
            value={timeOfDay}
            onChange={setTimeOfDay}
            options={["00:00–06:00", "06:00–12:00", "12:00–18:00", "18:00–24:00"]}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Kpi label="Total historical incidents" value="1,248" support="2020–2025 demonstration set" />
        <Kpi label="Average incidents per month" value="17.3" support="Across the study period" />
        <Kpi label="Most common category" value="Snake" support="46% of records" />
        <Kpi label="Highest-frequency locality" value="Pohon Batu" support="186 records" />
        <Kpi label="Peak incident period" value="6:00 PM–12:00 AM" support="Evening and night hours" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Multi-year incident trend (2020–2025)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={YEARLY_TREND} margin={{ left: -18, right: 8, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#DFE4EA" vertical={false} />
                  <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#5E6C84" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#5E6C84" }} axisLine={false} />
                  <RTooltip contentStyle={{ borderRadius: 12, borderColor: "#DFE4EA", fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="incidents" name="All incidents" stroke="#12355B" strokeWidth={2} />
                  <Line type="monotone" dataKey="snake" name="Snake" stroke="#F28C28" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <InterpretationNote>
              Demonstration data indicates a gradual increase in reported incidents across the study
              period. This trend must be validated using the final APM dataset.
            </InterpretationNote>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Monthly seasonality heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <div className="min-w-[520px]">
                <div className="grid grid-cols-[48px_repeat(12,minmax(0,1fr))] gap-1 text-[10px] text-muted-foreground">
                  <span />
                  {MONTHS.map((m) => (
                    <span key={m} className="text-center">
                      {m}
                    </span>
                  ))}
                </div>
                {SEASONALITY.map((row) => (
                  <div
                    key={row.year}
                    className="mt-1 grid grid-cols-[48px_repeat(12,minmax(0,1fr))] items-center gap-1"
                  >
                    <span className="text-[11px] font-semibold text-muted-foreground">{row.year}</span>
                    {row.values.map((value, index) => (
                      <div
                        key={index}
                        title={`${MONTHS[index]} ${row.year}: ${value} incidents`}
                        className="grid h-7 place-items-center rounded text-[10px] font-semibold"
                        style={{
                          backgroundColor: `rgba(18, 53, 91, ${0.1 + (value / maxSeason) * 0.8})`,
                          color: value / maxSeason > 0.55 ? "#fff" : "#172B4D",
                        }}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <InterpretationNote>
              Demonstration data indicates that incident reports increase during wetter months. This
              relationship must be validated using the final APM dataset.
            </InterpretationNote>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Hour-of-day incident distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={HOURLY_DISTRIBUTION} margin={{ left: -18, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#DFE4EA" vertical={false} />
                  <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "#5E6C84" }} interval={2} />
                  <YAxis tick={{ fontSize: 12, fill: "#5E6C84" }} axisLine={false} />
                  <RTooltip contentStyle={{ borderRadius: 12, borderColor: "#DFE4EA", fontSize: 12 }} />
                  <Bar dataKey="incidents" name="Incidents" fill="#12355B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <InterpretationNote>
              Reports concentrate in the evening and early night in this demonstration set, which may
              reflect both wildlife activity and reporting behaviour.
            </InterpretationNote>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Wildlife-category comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CATEGORY_COMPARISON} margin={{ left: -18, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#DFE4EA" vertical={false} />
                  <XAxis dataKey="category" tick={{ fontSize: 10, fill: "#5E6C84" }} interval={0} angle={-12} height={50} />
                  <YAxis tick={{ fontSize: 12, fill: "#5E6C84" }} axisLine={false} />
                  <RTooltip contentStyle={{ borderRadius: 12, borderColor: "#DFE4EA", fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="y2023" name="2023" fill="#12355B" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="y2024" name="2024" fill="#5E86B5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="y2025" name="2025" fill="#F28C28" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <InterpretationNote>
              Snake-related reports dominate every year in the demonstration set; category balance
              affects class imbalance handling during modelling.
            </InterpretationNote>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Weather condition versus incident frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WEATHER_VS_INCIDENTS} margin={{ left: -18, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#DFE4EA" vertical={false} />
                  <XAxis dataKey="condition" tick={{ fontSize: 11, fill: "#5E6C84" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#5E6C84" }} axisLine={false} />
                  <RTooltip contentStyle={{ borderRadius: 12, borderColor: "#DFE4EA", fontSize: 12 }} />
                  <Bar dataKey="incidents" name="Incidents" fill="#22A06B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <InterpretationNote>
              Rainfall-associated conditions coincide with more reports here. Correlation is not
              causation and requires validation with observed weather records.
            </InterpretationNote>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Top affected localities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TOP_LOCALITIES} layout="vertical" margin={{ left: 44, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#DFE4EA" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: "#5E6C84" }} />
                  <YAxis
                    type="category"
                    dataKey="locality"
                    width={110}
                    tick={{ fontSize: 11, fill: "#172B4D" }}
                    axisLine={false}
                  />
                  <RTooltip contentStyle={{ borderRadius: 12, borderColor: "#DFE4EA", fontSize: 12 }} />
                  <Bar dataKey="incidents" name="Incidents" fill="#12355B" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <InterpretationNote>
              A small number of localities account for most demonstration records, supporting an
              area-level modelling approach.
            </InterpretationNote>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Historical incident-density map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[420px] w-full">
            <RiskMap cells={RISK_CELLS} onSelect={() => {}} />
          </div>
          <InterpretationNote>
            Density is aggregated to H3-style cells so that no exact household location is shown.
          </InterpretationNote>
        </CardContent>
      </Card>
    </div>
  );
}
