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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DisclaimerBanner, InterpretationNote, PageHeading } from "@/components/common";
import {
  ABLATION,
  CALIBRATION,
  CONFIDENCE_DISTRIBUTION,
  CONFUSION_MATRIX,
  FEATURE_IMPORTANCE,
  MODEL_METRICS,
  PR_CURVE,
} from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/model-insights")({
  head: () => ({
    meta: [
      { title: "Model Insights | APM Wildlife Risk Intelligence – Labuan" },
      {
        name: "description",
        content:
          "Simulated comparison of baseline, Random Forest, LSTM and hybrid RF–LSTM forecasting approaches with explainability views.",
      },
      { property: "og:title", content: "Model Performance and Explainability" },
      {
        property: "og:description",
        content: "Simulated model comparison and explainability for the Labuan wildlife risk research prototype.",
      },
    ],
  }),
  component: ModelInsightsPage,
});

const VALIDATION = [
  {
    title: "Spatial Block Cross-Validation",
    body: "Areas are grouped into blocks so the model is tested on locations it has not seen. This avoids over-optimistic results caused by neighbouring cells.",
  },
  {
    title: "Leave-One-Year-Out Temporal Validation",
    body: "The model is trained on some years and tested on a held-out year, checking whether it still performs on future, unseen periods.",
  },
  {
    title: "Feature-Ablation Testing",
    body: "Input groups such as rainfall or incident history are removed one at a time to show which information actually drives performance.",
  },
  {
    title: "Probability Calibration",
    body: "A 70% risk should correspond to roughly seven events in ten similar situations. Calibration checks that the numbers are honest.",
  },
  {
    title: "SHAP Explainability",
    body: "SHAP values explain, for each area, which factors pushed the estimated risk up or down, so officers can judge whether the reasoning is sensible.",
  },
];

const STEPS = [
  "Collect and anonymise historical incident records.",
  "Combine incidents with temporal, weather and spatial variables.",
  "Compare baseline, Random Forest, LSTM and hybrid models.",
  "Convert the selected model's output into interpretable 24-hour area-risk levels.",
];

function ModelInsightsPage() {
  const cm = CONFUSION_MATRIX;
  return (
    <div className="space-y-5">
      <PageHeading
        title="Model Performance and Explainability"
        subtitle="Comparison of forecasting approaches used in the research."
      />

      <div className="rounded-xl border-2 border-[#F28C28] bg-[#F28C28]/10 px-4 py-3 text-center text-sm font-extrabold uppercase tracking-wide text-[#B4661B]">
        Simulated performance – not final research results
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Model comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>PR-AUC</TableHead>
                  <TableHead>F1-score</TableHead>
                  <TableHead>Balanced Accuracy</TableHead>
                  <TableHead>Brier Score</TableHead>
                  <TableHead>Validation status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MODEL_METRICS.map((row) => (
                  <TableRow
                    key={row.model}
                    className={cn(row.model.startsWith("Hybrid") && "bg-primary/5 font-semibold")}
                  >
                    <TableCell className="whitespace-nowrap">{row.model}</TableCell>
                    <TableCell>{row.prauc.toFixed(2)}</TableCell>
                    <TableCell>{row.f1.toFixed(2)}</TableCell>
                    <TableCell>{row.balancedAccuracy.toFixed(2)}</TableCell>
                    <TableCell>{row.brier.toFixed(2)}</TableCell>
                    <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                      {row.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <InterpretationNote>
            The hybrid model will only be selected as the final model if it demonstrates reliable
            improvement over simpler alternatives using the actual study dataset.
          </InterpretationNote>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Model performance comparison</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MODEL_METRICS} margin={{ left: -18, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DFE4EA" vertical={false} />
                <XAxis dataKey="model" tick={{ fontSize: 9, fill: "#5E6C84" }} interval={0} height={54} angle={-12} />
                <YAxis tick={{ fontSize: 11, fill: "#5E6C84" }} axisLine={false} />
                <RTooltip contentStyle={{ borderRadius: 12, borderColor: "#DFE4EA", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="prauc" name="PR-AUC" fill="#12355B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="f1" name="F1" fill="#5E86B5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="balancedAccuracy" name="Balanced acc." fill="#F28C28" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Confusion matrix (hybrid, simulated)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "True positive", value: cm.truePositive, color: "#22A06B" },
                { label: "False positive", value: cm.falsePositive, color: "#F5A623" },
                { label: "False negative", value: cm.falseNegative, color: "#D64545" },
                { label: "True negative", value: cm.trueNegative, color: "#12355B" },
              ].map((box) => (
                <div
                  key={box.label}
                  className="rounded-xl p-5 text-center"
                  style={{ backgroundColor: `${box.color}14`, color: box.color }}
                >
                  <p className="text-3xl font-extrabold">{box.value}</p>
                  <p className="mt-1 text-xs font-semibold text-foreground/70">{box.label}</p>
                </div>
              ))}
            </div>
            <InterpretationNote>
              Missed events (false negatives) matter more than false alarms in emergency planning, so
              thresholds should be tuned with APM officers.
            </InterpretationNote>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Precision–recall curve</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PR_CURVE} margin={{ left: -18, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DFE4EA" />
                <XAxis dataKey="recall" tick={{ fontSize: 11, fill: "#5E6C84" }} />
                <YAxis tick={{ fontSize: 11, fill: "#5E6C84" }} axisLine={false} />
                <RTooltip contentStyle={{ borderRadius: 12, borderColor: "#DFE4EA", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="hybrid" name="Hybrid RF–LSTM" stroke="#F28C28" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="rf" name="Random Forest" stroke="#12355B" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="lstm" name="LSTM" stroke="#22A06B" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Feature importance (SHAP-style)</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FEATURE_IMPORTANCE} layout="vertical" margin={{ left: 62, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DFE4EA" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#5E6C84" }} />
                <YAxis
                  type="category"
                  dataKey="feature"
                  width={140}
                  tick={{ fontSize: 10, fill: "#172B4D" }}
                  axisLine={false}
                />
                <RTooltip contentStyle={{ borderRadius: 12, borderColor: "#DFE4EA", fontSize: 12 }} />
                <Bar dataKey="value" name="Mean |SHAP|" fill="#12355B" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Calibration</CardTitle>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CALIBRATION} margin={{ left: -18, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DFE4EA" />
                <XAxis dataKey="predicted" tick={{ fontSize: 11, fill: "#5E6C84" }} />
                <YAxis tick={{ fontSize: 11, fill: "#5E6C84" }} axisLine={false} />
                <RTooltip contentStyle={{ borderRadius: 12, borderColor: "#DFE4EA", fontSize: 12 }} />
                <Line type="monotone" dataKey="observed" name="Observed" stroke="#F28C28" strokeWidth={2} />
                <Line type="monotone" dataKey="predicted" name="Perfect calibration" stroke="#98A2B3" strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Forecast confidence distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CONFIDENCE_DISTRIBUTION} margin={{ left: -18, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DFE4EA" vertical={false} />
                <XAxis dataKey="band" tick={{ fontSize: 11, fill: "#5E6C84" }} />
                <YAxis tick={{ fontSize: 11, fill: "#5E6C84" }} axisLine={false} />
                <RTooltip contentStyle={{ borderRadius: 12, borderColor: "#DFE4EA", fontSize: 12 }} />
                <Bar dataKey="cells" name="Cells" fill="#5E86B5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Feature-ablation results</CardTitle>
        </CardHeader>
        <CardContent className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ABLATION} layout="vertical" margin={{ left: 62, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DFE4EA" horizontal={false} />
              <XAxis type="number" domain={[0, 0.8]} tick={{ fontSize: 11, fill: "#5E6C84" }} />
              <YAxis
                type="category"
                dataKey="variant"
                width={160}
                tick={{ fontSize: 10, fill: "#172B4D" }}
                axisLine={false}
              />
              <RTooltip contentStyle={{ borderRadius: 12, borderColor: "#DFE4EA", fontSize: 12 }} />
              <Bar dataKey="prauc" name="PR-AUC" fill="#22A06B" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">How the model works</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((step, index) => (
            <div key={step} className="rounded-xl border border-border bg-muted/40 p-4">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                {index + 1}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{step}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {VALIDATION.map((item) => (
          <Card key={item.title} className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs leading-relaxed text-muted-foreground">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <DisclaimerBanner>
        All metrics on this page are simulated model results for demonstration purposes. Decision
        support only — no operational deployment claim is made.
      </DisclaimerBanner>
    </div>
  );
}
