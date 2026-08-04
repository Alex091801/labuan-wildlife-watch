# APM Wildlife Risk Intelligence – Labuan

A six-page, front-end research prototype dashboard with mock data, a Labuan risk map, interactive filters, charts and clear "research prototype / demonstration data" framing throughout.

## Design system

- Palette wired as semantic tokens in `src/styles.css` (oklch): navy #12355B primary, deep navy #0B2239, APM orange #F28C28 accent, background #F4F7FA, white cards, risk colours green #22A06B / amber #F5A623 / red #D64545 / dark red #9B1C1C / grey (insufficient data), text #172B4D / #5E6C84, borders #DFE4EA.
- Inter loaded via `<link>` in the root route. 12px card radius, subtle borders, soft shadows, minimal motion.
- Shell: fixed left sidebar (shield mark, "APM Wildlife Risk" / "Labuan Decision Support", 6 nav items, footer with "Research Prototype", "Data period: 2020–2025", "Demonstration Data" status dot), collapsible to a sheet on tablet/mobile; top header with page title, Malaysia date/time, weather summary, bell, Export Report, avatar + "APM Operations Officer / Labuan District", and an orange-outlined "RESEARCH PROTOTYPE" badge. "APM Logo" placeholder block included.

## Pages

1. **Overview** (`/`) — intro heading + disclaimer banner, forecast date selector, last-updated stamp, Refresh Forecast (loading state → new timestamp); four summary cards (3 high-risk zones, 7 medium, 78% confidence with progress bar, 18 incidents/30 days with trends); large Labuan risk map with hex risk cells, legend, click → detail panel (locality, H3 cell ID, risk, probability, confidence, historical count, rainfall/temp/humidity, vegetation index, top wildlife category, "Why is this area higher risk?", factor-contribution bars, two action buttons); filter panel (date, risk level, wildlife category, locality, time period, weather + Reset/Apply) that drives map, cards and charts; right panel with Priority Monitoring Areas ranked list, Current Conditions, Operational Note; lower section with monthly incidents area chart, category horizontal bar chart, and anonymised Recent Incident Reports table.
2. **24-Hour Risk Map** (`/risk-map`) — full-bleed map, forecast timeline segments (00–06, 06–12, 12–18, 18–24, Full 24h) that re-shuffle mock risk, filters, locality search, layer controls (H3 cells vs locality boundaries; forecast risk vs historical density), fullscreen + zoom, legend, right detail drawer with classification, probability, confidence, contributing factors, environment, 7-day pattern, hourly risk sparkline, data-availability indicator and the "estimated area-level risk" disclaimer.
3. **Historical Analysis** (`/historical`) — filters (year, month, locality, category, weather, time of day), five KPI cards (1,248 total; 17.3/month; Snake; Pohon Batu; 6PM–12AM), and charts: 2020–2025 trend, monthly seasonality heatmap, hour-of-day distribution, category comparison, weather vs frequency, top localities, historical density map — each with an interpretation card.
4. **Model Insights** (`/model-insights`) — "SIMULATED PERFORMANCE – NOT FINAL RESEARCH RESULTS" banner, model comparison table (baseline → hybrid, with the caveat statement and highlighted hybrid row), performance bar chart, confusion matrix, PR curve, feature-importance/SHAP chart, calibration chart, confidence distribution, ablation results, four-step "How the Model Works", and validation explainer cards.
5. **Incident Records** (`/incident-records`) — governance banner, search, year/category/locality/data-quality filters, sortable + paginated anonymised table (ID, date, time, locality, H3 cell, category, weather, outcome, completeness), Export Demonstration CSV.
6. **Research Information** (`/research`) — problem, aim, scope, RO1–RO3, RQ1–RQ3, data-source cards, limitations, ethics and governance.

## Interactions

Sidebar routing, working filters with brief skeletons, map cell selection (side panel on desktop, bottom sheet on mobile), Recharts tooltips, timeline changes, table search/sort/pagination, Export Report modal ("Generate 24-Hour Risk Summary" with the listed options and PDF/PNG buttons showing "Demonstration report prepared successfully"), info tooltips, and "View Area Details" navigating to the risk-map page.

## Technical notes

- TanStack Router file routes under `src/routes/` with a shared layout in `__root.tsx`; each page gets its own `head()` metadata.
- Map: install `leaflet` + `react-leaflet` and render it client-only (lazy import behind a hydration gate) since Leaflet touches `window` during SSR. OpenStreetMap tiles, hexagonal risk polygons as GeoJSON-style coordinate arrays around 5.2831 / 115.2308. If tiles fail or the module can't load, an SVG fallback panel renders the same labelled localities and coloured hex cells, so the page never shows a blank map.
- All data in typed mock modules under `src/data/` (localities, hex cells with per-timeslot risk, incidents, monthly/category/hourly aggregates, model metrics, feature importances). Filters are pure client state derived from these.
- Charts via Recharts; UI via existing shadcn components; icons via Lucide. No auth, no backend, no Cloud.

## Out of scope

Authentication, real ML backend, dispatching, live APM database, real PDF/PNG file generation.
