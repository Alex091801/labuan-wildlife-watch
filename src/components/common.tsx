import { Info, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { RISK_COLOR, RISK_LABEL, type RiskLevel } from "@/data/mock";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        className,
      )}
      style={{
        backgroundColor: `${RISK_COLOR[level]}1f`,
        color: RISK_COLOR[level],
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: RISK_COLOR[level] }} />
      {RISK_LABEL[level]}
    </span>
  );
}

export function InfoTip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label="More information"
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-xs leading-relaxed">{text}</TooltipContent>
    </Tooltip>
  );
}

export function Trend({ direction, label }: { direction: "up" | "down" | "flat"; label: string }) {
  const Icon = direction === "up" ? TrendingUp : direction === "down" ? TrendingDown : Minus;
  const color =
    direction === "up"
      ? "text-[#D64545]"
      : direction === "down"
        ? "text-[#22A06B]"
        : "text-muted-foreground";
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs font-medium", color)}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

export function PageHeading({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function DisclaimerBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[#F28C28]/40 bg-[#F28C28]/8 p-4">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#F28C28]" />
      <p className="text-sm leading-relaxed text-foreground/80">{children}</p>
    </div>
  );
}

export function InterpretationNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 rounded-lg border border-border bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}
