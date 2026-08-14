import { useEffect, useState } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  BrainCircuit,
  CloudRain,
  Download,
  LayoutDashboard,
  ListChecks,
  Map as MapIcon,
  Menu,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ExportReportDialog } from "./ExportReportDialog";
import { CURRENT_CONDITIONS } from "@/data/mock";
import { cn } from "@/lib/utils";
import apmLogo from "@/assets/apm-logo.png";

const NAV = [
  { to: "/", label: "Overview", icon: LayoutDashboard, title: "Overview Dashboard" },
  { to: "/risk-map", label: "24-Hour Risk Map", icon: MapIcon, title: "24-Hour Risk Map" },
  { to: "/historical", label: "Historical Analysis", icon: History, title: "Historical Analysis" },
  { to: "/model-insights", label: "Model Insights", icon: BrainCircuit, title: "Model Insights" },
  {
    to: "/incident-records",
    label: "Incident Records",
    icon: ListChecks,
    title: "Incident Records",
  },
  { to: "/research", label: "Research Information", icon: BookOpen, title: "Research Information" },
] as const;

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 p-1.5 ring-1 ring-sidebar-primary/40">
          <img src={apmLogo} alt="APM Logo" className="h-full w-full object-contain" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">APM Wildlife Risk</p>
          <p className="truncate text-xs text-sidebar-foreground/70">Labuan Decision Support</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            activeOptions={{ exact: item.to === "/" }}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-white data-[status=active]:bg-sidebar-accent data-[status=active]:text-white"
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="space-y-3 border-t border-sidebar-border px-5 py-4 text-xs">
        <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-3 py-2">
          <p className="font-semibold text-white">Research Prototype</p>
          <p className="text-sidebar-foreground/70">Data period: 2020–2025</p>
        </div>
        <div className="flex items-center gap-2 text-sidebar-foreground/80">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-sidebar-primary opacity-70" />
          </span>
          Demonstration Data
        </div>
        <div className="flex items-center gap-2.5 rounded-lg border border-sidebar-border bg-sidebar-accent/30 p-2">
          <img src={apmLogo} alt="APM Malaysia Logo" className="h-7 w-7 shrink-0 object-contain" />
          <div className="min-w-0 text-[11px]">
            <p className="truncate font-semibold text-white">Pertahanan Awam</p>
            <p className="truncate text-sidebar-foreground/60">APM Negeri WP Labuan</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function useMalaysiaTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-MY", {
        timeZone: "Asia/Kuala_Lumpur",
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date());
    setNow(format());
    const id = setInterval(() => setNow(format()), 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const time = useMalaysiaTime();
  const title = NAV.find((item) => item.to === pathname)?.title ?? "Overview Dashboard";

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">
        <SidebarContent />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 border-0 p-0">
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                  <SidebarContent onNavigate={() => setMobileOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>

            <div className="min-w-0">
              <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
                <h2 className="truncate text-base font-bold text-foreground sm:text-lg">{title}</h2>
                <span className="rounded-md border border-[#F28C28] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#F28C28]">
                  Research Prototype
                </span>
              </div>
              <p className="mt-0.5 hidden truncate text-xs text-muted-foreground sm:block">
                {time ?? "—"} (MYT)
                <span className="mx-2 text-border">|</span>
                <CloudRain className="mr-1 inline h-3 w-3 text-[#12355B]" />
                {CURRENT_CONDITIONS.weather}, {CURRENT_CONDITIONS.temperature}°C ·{" "}
                {CURRENT_CONDITIONS.humidity}% humidity
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#F28C28]" />
              </Button>
              <Button
                onClick={() => setExportOpen(true)}
                className="hidden bg-[#F28C28] text-white hover:bg-[#F28C28]/90 sm:inline-flex"
              >
                <Download className="h-4 w-4" />
                Export Report
              </Button>
              <Button
                onClick={() => setExportOpen(true)}
                size="icon"
                aria-label="Export report"
                className="bg-[#F28C28] text-white hover:bg-[#F28C28]/90 sm:hidden"
              >
                <Download className="h-4 w-4" />
              </Button>
              <div className="hidden items-center gap-2 border-l border-border pl-3 md:flex">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                    AP
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-foreground">
                    APM Operations Officer
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground">Labuan District</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className={cn("flex-1 px-4 py-6 sm:px-6 lg:px-8")}>
          <Outlet />
        </main>
      </div>

      <ExportReportDialog open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  );
}
