import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DisclaimerBanner, PageHeading } from "@/components/common";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research Information | APM Wildlife Risk Intelligence – Labuan" },
      {
        name: "description",
        content:
          "Objectives, research questions, scope and limitations of the Labuan wildlife incident forecasting research prototype.",
      },
      { property: "og:title", content: "Research Information – Labuan Wildlife Risk Prototype" },
      {
        property: "og:description",
        content: "Objectives, research questions, ethics and limitations of the APM Labuan research prototype.",
      },
    ],
  }),
  component: ResearchPage,
});

const OBJECTIVES = [
  "Characterise the spatial and temporal patterns of wildlife incidents recorded in Labuan between 2020 and 2025.",
  "Develop and compare baseline, Random Forest, LSTM and hybrid approaches for short-horizon area-level risk estimation.",
  "Evaluate the models using spatial-block and leave-one-year-out validation with calibration checks.",
  "Translate model output into an interpretable decision-support interface suitable for APM planning discussions.",
];

const QUESTIONS = [
  "What spatial and temporal patterns characterise wildlife incidents in Labuan during the study period?",
  "Which environmental, temporal and spatial variables are most associated with incident occurrence?",
  "Does a hybrid RF–LSTM approach improve short-horizon risk estimation over simpler baselines?",
  "How should probabilistic risk output be presented so that it supports, rather than replaces, officer judgement?",
];

const LIMITATIONS = [
  {
    title: "Reporting bias",
    body: "Records reflect reported incidents only. Areas with lower reporting may appear safer than they are.",
  },
  {
    title: "Data period and volume",
    body: "A six-year record for a single district limits how well rare event types can be modelled.",
  },
  {
    title: "Spatial aggregation",
    body: "Risk is expressed for hexagonal areas, not exact points, to protect privacy and reflect data precision.",
  },
  {
    title: "Weather proxies",
    body: "Weather variables are drawn from area-level observations and may not represent conditions in each cell.",
  },
  {
    title: "No causal claim",
    body: "Associations shown here do not establish causation and cannot be used to attribute responsibility.",
  },
  {
    title: "Prototype status",
    body: "This interface is a research demonstration. It is not an operational alerting system and makes no exact prediction.",
  },
];

function ResearchPage() {
  return (
    <div className="space-y-5">
      <PageHeading
        title="Research Information"
        subtitle="Scope, objectives and limitations of the Labuan wildlife incident forecasting study."
      />

      <DisclaimerBanner>
        Research prototype for academic demonstration. Figures shown throughout the dashboard are
        mock data and do not represent validated findings or operational guidance.
      </DisclaimerBanner>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Research objectives</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {OBJECTIVES.map((item, index) => (
              <div key={item} className="flex min-w-0 gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                  RO{index + 1}
                </span>
                <p className="min-w-0 text-sm leading-relaxed text-foreground/80">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Research questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {QUESTIONS.map((item, index) => (
              <div key={item} className="flex min-w-0 gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent text-xs font-bold text-accent-foreground">
                  RQ{index + 1}
                </span>
                <p className="min-w-0 text-sm leading-relaxed text-foreground/80">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Study scope</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Study area", value: "Labuan, Malaysia" },
            { label: "Data period", value: "2020 – 2025" },
            { label: "Unit of analysis", value: "H3-style hexagonal cells" },
            { label: "Forecast horizon", value: "Next 24 hours (6-hour periods)" },
            { label: "Partner agency", value: "Malaysia Civil Defence Force (APM)" },
            { label: "Incident categories", value: "Snake, crocodile, monkey, monitor lizard, other" },
            { label: "Modelling approaches", value: "Baseline, Random Forest, LSTM, hybrid RF–LSTM" },
            { label: "Output type", value: "Relative area-level risk bands" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border bg-muted/40 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">{item.value}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Data governance and ethics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm leading-relaxed text-foreground/80">
          <p>
            All records used in this prototype are synthetic. In the actual study, incident data is
            anonymised at source, aggregated to area level, and stored without personal identifiers,
            household addresses or exact coordinates.
          </p>
          <p>
            Outputs are intended for planning and awareness discussions with APM officers. They must
            never be used to identify individuals, allocate blame, or replace on-site professional
            assessment.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Known limitations</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {LIMITATIONS.map((item) => (
            <div key={item.title} className="rounded-xl border border-border p-4">
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
