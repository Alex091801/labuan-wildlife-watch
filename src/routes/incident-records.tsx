import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DisclaimerBanner, PageHeading, RiskBadge } from "@/components/common";
import {
  buildIncidentRecords,
  LOCALITIES,
  RISK_LABEL,
  WILDLIFE_CATEGORIES,
  type IncidentRecord,
} from "@/data/mock";

const INCIDENT_RECORDS: IncidentRecord[] = buildIncidentRecords();

export const Route = createFileRoute("/incident-records")({
  head: () => ({
    meta: [
      { title: "Incident Records | APM Wildlife Risk Intelligence – Labuan" },
      {
        name: "description",
        content:
          "Searchable, anonymised demonstration register of wildlife incident records aggregated to locality level.",
      },
      { property: "og:title", content: "Anonymised Wildlife Incident Records – Labuan" },
      {
        property: "og:description",
        content: "Filterable demonstration register of anonymised wildlife incident reports.",
      },
    ],
  }),
  component: IncidentRecordsPage,
});

const PAGE_SIZE = 12;

function IncidentRecordsPage() {
  const [query, setQuery] = useState("");
  const [locality, setLocality] = useState("all");
  const [category, setCategory] = useState("all");
  const [risk, setRisk] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INCIDENT_RECORDS.filter((record: IncidentRecord) => {
      if (locality !== "all" && record.locality !== locality) return false;
      if (category !== "all" && record.category !== category) return false;
      if (risk !== "all" && record.risk !== risk) return false;
      if (!q) return true;
      return [record.id, record.locality, record.category, record.outcome, record.weather]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [query, locality, category, risk]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <div className="space-y-5">
      <PageHeading
        title="Anonymised Incident Records"
        subtitle="Demonstration register of wildlife incident reports aggregated to locality level."
      />

      <DisclaimerBanner>
        Records are synthetic and anonymised. No personal identifiers, household addresses or exact
        coordinates are stored or displayed.
      </DisclaimerBanner>

      <Card className="shadow-card">
        <CardContent className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="relative min-w-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search records"
              className="bg-card pl-9"
              aria-label="Search incident records"
            />
          </div>
          <Select
            value={locality}
            onValueChange={(value) => {
              setLocality(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Locality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All localities</SelectItem>
              {LOCALITIES.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={category}
            onValueChange={(value) => {
              setCategory(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Category" />
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
          <Select
            value={risk}
            onValueChange={(value) => {
              setRisk(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Risk level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All risk levels</SelectItem>
              {(["low", "medium", "high"] as const).map((item) => (
                <SelectItem key={item} value={item}>
                  {RISK_LABEL[item]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Record ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Locality</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Weather</TableHead>
                  <TableHead>Risk level</TableHead>
                  <TableHead>Outcome</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((record: IncidentRecord) => (
                  <TableRow key={record.id}>
                    <TableCell className="whitespace-nowrap font-mono text-xs">{record.id}</TableCell>
                    <TableCell className="whitespace-nowrap">{record.displayDate}</TableCell>
                    <TableCell className="whitespace-nowrap">{record.time}</TableCell>
                    <TableCell className="whitespace-nowrap">{record.locality}</TableCell>
                    <TableCell className="whitespace-nowrap">{record.category}</TableCell>
                    <TableCell className="whitespace-nowrap">{record.weather}</TableCell>
                    <TableCell>
                      <RiskBadge level={record.risk} />
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {record.outcome}
                    </TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="py-10 text-center text-sm text-muted-foreground">
                      No records match the current filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <p className="min-w-0 truncate text-xs text-muted-foreground">
          Showing {rows.length} of {filtered.length} anonymised records
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={current <= 1}
            onClick={() => setPage(current - 1)}
          >
            Previous
          </Button>
          <span className="text-xs font-semibold text-muted-foreground">
            {current} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={current >= totalPages}
            onClick={() => setPage(current + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
