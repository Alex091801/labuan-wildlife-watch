import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import {
  LOCALITIES,
  TIME_PERIODS,
  WEATHER_CONDITIONS,
  WILDLIFE_CATEGORIES,
  type TimePeriod,
} from "@/data/mock";

export type Filters = {
  date: string;
  risk: string;
  category: string;
  locality: string;
  period: TimePeriod;
  weather: string;
};

export const DEFAULT_FILTERS: Filters = {
  date: "2026-08-04",
  risk: "all",
  category: "all",
  locality: "all",
  period: "Full 24 Hours",
  weather: "all",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0 space-y-1.5">
      <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

export function FilterBar({
  draft,
  onDraftChange,
  onApply,
  onReset,
}: {
  draft: Filters;
  onDraftChange: (filters: Filters) => void;
  onApply: () => void;
  onReset: () => void;
}) {
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    onDraftChange({ ...draft, [key]: value });

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card">
      <div className="mb-3 flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-primary" />
        <p className="text-sm font-semibold text-foreground">Filters</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-6">
        <Field label="Forecast date">
          <Input type="date" value={draft.date} onChange={(e) => set("date", e.target.value)} />
        </Field>
        <Field label="Risk level">
          <Select value={draft.risk} onValueChange={(value) => set("risk", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="unknown">Insufficient data</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Wildlife category">
          <Select value={draft.category} onValueChange={(value) => set("category", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {WILDLIFE_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Locality">
          <Select value={draft.locality} onValueChange={(value) => set("locality", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All localities</SelectItem>
              {LOCALITIES.map((locality) => (
                <SelectItem key={locality} value={locality}>
                  {locality}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Time period">
          <Select
            value={draft.period}
            onValueChange={(value) => set("period", value as TimePeriod)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIME_PERIODS.map((period) => (
                <SelectItem key={period} value={period}>
                  {period}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Weather condition">
          <Select value={draft.weather} onValueChange={(value) => set("weather", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All conditions</SelectItem>
              {WEATHER_CONDITIONS.map((condition) => (
                <SelectItem key={condition} value={condition}>
                  {condition}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <Button variant="outline" size="sm" onClick={onReset}>
          <RotateCcw className="h-3.5 w-3.5" /> Reset Filters
        </Button>
        <Button size="sm" onClick={onApply}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
