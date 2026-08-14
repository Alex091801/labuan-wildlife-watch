# Labuan Risk Aware

Create a high-fidelity, responsive, web-based decision-support dashboard titled:

“APM Wildlife Risk Intelligence – Labuan”

This prototype visualises the proposed end product for the research project:

“Spatiotemporal Prediction of Wildlife-Related Emergency Incidents Using a Hybrid Random Forest–LSTM Approach for the Malaysia Civil Defence Force (APM) in Labuan, Malaysia.”

PROJECT PURPOSE

The system is a research prototype intended to help APM Labuan officers understand historical wildlife-related emergency patterns and identify areas that may have a higher probability of wildlife-related incidents during the next 24 hours.

The system must NOT claim to predict the exact house, exact incident time, or guarantee that an incident will occur. It must communicate probability-based risk for operational planning.

Use realistic mock data throughout because actual APM data is not yet connected.

The prototype should clearly show what the completed research product could look like when historical APM incident records from 2020–2025 are combined with weather, time, environmental, and spatial data.

TARGET USERS

Primary users:

APM Labuan operation officers

Emergency planning officers

APM administrators

Research evaluators

Local emergency-response stakeholders

The interface should feel professional, trustworthy, modern, operational, and suitable for a Malaysian government emergency-management environment.

TECHNOLOGY AND IMPLEMENTATION

Build this as a polished React web application using:

React

TypeScript

Tailwind CSS

shadcn/ui components

Lucide icons

Recharts for charts

React Leaflet with OpenStreetMap for the Labuan map

Mock JSON or TypeScript data for all dashboard information

Responsive layouts for desktop, tablet, and mobile

Do not require a paid Mapbox API key.

If the interactive map cannot load, create a visually accurate fallback map panel with labelled Labuan localities and coloured hexagonal risk zones.

This version is a front-end research demonstration. Do not build authentication, a real machine-learning backend, emergency dispatching, or a live government database connection.

VISUAL DIRECTION

Use a clean government-technology visual style.

Colour palette:

Primary navy: #12355B

Deep navy: #0B2239

APM-inspired orange: #F28C28

Light blue-grey background: #F4F7FA

White cards: #FFFFFF

Normal/low risk green: #22A06B

Medium risk amber: #F5A623

High risk red: #D64545

Critical risk dark red: #9B1C1C

Primary text: #172B4D

Secondary text: #5E6C84

Borders: #DFE4EA

Typography:

Use Inter or a similar modern sans-serif font.

Headings should be strong and compact.

Body text should remain highly readable.

Numeric risk values should be prominent.

Avoid overly decorative typography.

Design characteristics:

Professional

Data-driven

Calm and organised

Spacious layout

Rounded cards with approximately 12-pixel corner radius

Subtle borders and soft shadows

Clear icons

Strong information hierarchy

Accessible colour contrast

Minimal animation

No neon effects

No excessive gradients

No futuristic science-fiction appearance

No cartoon wildlife illustrations

Use a simple shield, emergency-response, map-pin, or radar icon as the temporary system mark. Do not use an unofficial reproduction of the APM logo. Include a placeholder labelled “APM Logo” that can later be replaced with an authorised logo.

GLOBAL APPLICATION LAYOUT

Create a desktop dashboard with:

Fixed left navigation sidebar

Top application header

Main content area

Responsive collapsible sidebar on tablet and mobile

LEFT SIDEBAR

At the top, show:

Shield icon

“APM Wildlife Risk”

Small text: “Labuan Decision Support”

Navigation items:

Overview

24-Hour Risk Map

Historical Analysis

Model Insights

Incident Records

Research Information

Use suitable Lucide icons for each item.

At the bottom of the sidebar, show:

“Research Prototype”
“Data period: 2020–2025”

Add a small status indicator:

“Demonstration Data”

TOP HEADER

Show:

Current page title

Current date and time in Malaysia time

Weather status summary

Notification bell

“Export Report” button

User avatar placeholder

User name: “APM Operations Officer”

Role: “Labuan District”

Add a prominent orange-outlined label:

“RESEARCH PROTOTYPE”

PAGE 1: OVERVIEW DASHBOARD

This is the main landing page and should immediately communicate the system’s purpose.

TOP INTRODUCTION AREA

Heading:

“Wildlife Incident Risk Overview”

Subheading:

“Location-based decision support for the next 24 hours in Labuan”

On the right, include:

Forecast date selector

“Last updated: Today, 8:00 AM”

Refresh Forecast button

Include an information banner:

“This dashboard displays estimated wildlife-incident risk based on historical patterns, environmental conditions and recent observations. Risk levels support planning and do not guarantee that an incident will occur.”

SUMMARY CARDS

Create four summary cards:

Card 1:

Title: “High-Risk Zones”

Value: “3”

Supporting text: “Requires closer monitoring”

Red location-warning icon

Small trend: “+1 from yesterday”

Card 2:

Title: “Medium-Risk Zones”

Value: “7”

Supporting text: “Monitor changing conditions”

Amber alert icon

Card 3:

Title: “Forecast Confidence”

Value: “78%”

Supporting text: “Moderate confidence”

Blue analytics icon

Add a small progress bar

Card 4:

Title: “Incidents in Last 30 Days”

Value: “18”

Supporting text: “Based on demonstration records”

Orange history icon

Small trend: “12% lower than previous period”

MAIN MAP SECTION

Create a large map of Labuan as the main visual element.

Use approximate Labuan coordinates around:

Latitude: 5.2831
Longitude: 115.2308

Display approximate locality labels such as:

Victoria/Bandar Labuan

Patau-Patau

Kiamsam

Rancha-Rancha

Layang-Layangan

Pohon Batu

Ganggarak

Lubok Temiang

Sungai Bedaun

Bebuloh

Overlay multiple H3-style hexagonal cells or GeoJSON polygons.

Risk colours:

Green: Low risk

Amber: Medium risk

Red: High risk

Grey: Insufficient data

Include a clear legend.

When the user clicks a risk cell, open a side panel or map popup displaying:

Locality: “Pohon Batu”

H3 Cell ID: “LAB-H3-0082”

Next 24-hour risk: “High”

Risk probability: “74%”

Forecast confidence: “81%”

Historical incidents in this cell: “32”

Recent rainfall: “46 mm”

Temperature: “29°C”

Humidity: “84%”

Nearby vegetation index: “High”

Most frequently reported wildlife category: “Snake”

Forecast generated: “Today, 8:00 AM”

Below these values, show:

“Why is this area higher risk?”

Example explanation:

“Risk is elevated because of recent rainfall, high humidity, proximity to vegetation and a higher frequency of previous wildlife-related incidents in this area.”

Add a horizontal factor-contribution chart:

Previous incident frequency: 31%

Recent rainfall: 24%

Vegetation proximity: 19%

Humidity: 12%

Residential density: 9%

Other factors: 5%

Include two buttons:

View Area Details

View Historical Pattern

FILTER PANEL

Above or beside the map, provide filters for:

Forecast date

Risk level

Wildlife category

Locality

Time period

Weather condition

Wildlife categories:

Snake

Monitor lizard

Crocodile

Monkey

Wild boar

Other wildlife

Add:

Reset Filters

Apply Filters

The filters should visually update the mock map, cards, and chart data.

RIGHT-SIDE INFORMATION PANEL

Beside the map, include:

“Priority Monitoring Areas”

Ranked list:

Pohon Batu — High — 74%

Rancha-Rancha — High — 69%

Kiamsam — High — 65%

Layang-Layangan — Medium — 52%

Sungai Bedaun — Medium — 48%

Each entry should have a coloured risk badge, probability, small trend arrow, and View button.

“Current Conditions”

Show:

Weather: Light rain

Temperature: 29°C

Humidity: 84%

Rainfall in last 24 hours: 46 mm

Wind: 12 km/h

Overall environmental risk: Elevated

“Operational Note”

Display:

“Consider reviewing personnel and equipment readiness for the three higher-risk zones. Continue monitoring weather and incident updates.”

Do not include automatic dispatch instructions.

LOWER DASHBOARD SECTION

Create two charts:

Chart 1: “Wildlife Incidents by Month”

Use a line or area chart showing mock monthly incidents across one year.

Example values:

January: 22

February: 18

March: 25

April: 29

May: 34

June: 41

July: 46

August: 43

September: 38

October: 31

November: 27

December: 24

Chart 2: “Incidents by Wildlife Category”

Use a horizontal bar chart:

Snake: 46%

Monitor lizard: 21%

Monkey: 13%

Crocodile: 8%

Wild boar: 7%

Other: 5%

Add another compact panel titled:

“Recent Incident Reports”

Columns:

Date and time

General locality

Wildlife category

Risk level

Response status

Use anonymised mock records only. Do not display caller names, telephone numbers, full addresses, or personally identifiable information.

Example records:

03 Aug 2026, 9:20 PM — Kiamsam — Snake — High — Resolved

02 Aug 2026, 4:10 PM — Pohon Batu — Monitor lizard — Medium — Resolved

01 Aug 2026, 7:45 AM — Rancha-Rancha — Monkey — Medium — Monitoring

30 Jul 2026, 11:15 PM — Layang-Layangan — Snake — High — Resolved

PAGE 2: 24-HOUR RISK MAP

Create a dedicated full-screen map analysis page.

Heading:

“24-Hour Wildlife Incident Risk Map”

Description:

“Explore predicted risk levels by H3 grid cell or general locality.”

The page should include:

Large interactive map

Forecast timeline selector

Risk-level filter

Wildlife category filter

Locality search

Map layer controls

Full-screen map button

Zoom controls

Legend

Toggle between H3 cells and locality boundaries

Toggle between forecast risk and historical incident density

Add a timeline with selectable forecast periods:

00:00–06:00

06:00–12:00

12:00–18:00

18:00–24:00

Full 24 Hours

Changing the timeline should update the mock risk distribution.

Add a right-side detail drawer when a cell is selected.

Include:

Risk classification

Probability

Confidence

Historical incident count

Main contributing factors

Environmental conditions

Previous seven-day pattern

Small hourly risk graph

Data-availability indicator

Include a disclaimer inside the drawer:

“This is an estimated area-level risk. It is not an exact incident prediction.”

PAGE 3: HISTORICAL ANALYSIS

Heading:

“Historical Wildlife Incident Analysis”

Subheading:

“Patterns identified from anonymised demonstration records representing the 2020–2025 study period.”

Top filters:

Year

Month

Locality

Wildlife category

Weather condition

Time of day

Add KPI cards:

Total historical incidents

Average incidents per month

Most common wildlife category

Highest-frequency locality

Peak incident period

Use mock values such as:

Total incidents: 1,248

Monthly average: 17.3

Most common: Snake

Highest-frequency locality: Pohon Batu

Peak period: 6:00 PM–12:00 AM

Include these visualisations:

Multi-year incident trend from 2020–2025

Monthly seasonality heatmap

Hour-of-day incident distribution

Wildlife-category comparison

Weather condition versus incident frequency

Top affected localities

Historical incident-density map

Make all charts interactive with tooltips.

Add a small interpretation card under each chart. For example:

“Demonstration data indicates that incident reports increase during wetter months. This relationship must be validated using the final APM dataset.”

PAGE 4: MODEL INSIGHTS

Heading:

“Model Performance and Explainability”

Subheading:

“Comparison of forecasting approaches used in the research.”

Create a model-comparison table containing:

Models:

Historical Average Baseline

Logistic Regression

Random Forest

LSTM

Hybrid RF–LSTM

Metrics:

PR-AUC

F1-score

Balanced Accuracy

Brier Score

Validation status

Use realistic-looking demonstration values but clearly label them as simulated:

Historical Baseline: PR-AUC 0.41, F1 0.39, Balanced Accuracy 0.55, Brier 0.28

Logistic Regression: PR-AUC 0.52, F1 0.48, Balanced Accuracy 0.61, Brier 0.23

Random Forest: PR-AUC 0.68, F1 0.64, Balanced Accuracy 0.72, Brier 0.18

LSTM: PR-AUC 0.65, F1 0.61, Balanced Accuracy 0.69, Brier 0.20

Hybrid RF–LSTM: PR-AUC 0.74, F1 0.70, Balanced Accuracy 0.77, Brier 0.15

Highlight the Hybrid RF–LSTM row but add this statement:

“The hybrid model will only be selected as the final model if it demonstrates reliable improvement over simpler alternatives using the actual study dataset.”

Add a large label:

“SIMULATED PERFORMANCE – NOT FINAL RESEARCH RESULTS”

Create the following visual components:

Model performance comparison bar chart

Confusion matrix

Precision-recall curve

Feature-importance or SHAP-style chart

Calibration chart

Forecast confidence distribution

Feature-ablation results

Feature-importance example:

Previous incident history

Rainfall

Month/season

Vegetation proximity

Humidity

Time of day

Road density

Residential density

Drainage proximity

Temperature

Add an “How the Model Works” section using a simple four-step process:

Collect and anonymise historical incident records.

Combine incidents with temporal, weather and spatial variables.

Compare baseline, Random Forest, LSTM and hybrid models.

Convert the selected model’s output into interpretable 24-hour area-risk levels.

Add validation cards:

Spatial Block Cross-Validation

Leave-One-Year-Out Temporal Validation

Feature-Ablation Testing

Probability Calibration

SHAP Explainability

Explain these in simple language suitable for APM officers and research evaluators.

PAGE 5: INCIDENT RECORDS

Heading:

“Anonymised Incident Records”

Create a searchable and filterable data table.

Columns:

Incident ID

Date

Time

General locality

H3 cell

Wildlife category

Weather condition

Response outcome

Data completeness

Do not include:

Caller names

Identification numbers

Phone numbers

Exact residential addresses

Personal notes

Sensitive operational information

Include:

Search field

Year filter

Category filter

Locality filter

Data-quality filter

Export Demonstration CSV button

Pagination

Sortable columns

Add a data-governance banner:

“Personal identifiers and exact household addresses are excluded. Research data must be handled according to APM approval requirements, ethical research procedures and Malaysia’s applicable data-protection requirements.”

PAGE 6: RESEARCH INFORMATION

Heading:

“About the Research Prototype”

Create clear sections for:

Research Problem

“Wildlife-related emergency incidents may vary across locations and time. Historical records are often reviewed descriptively, limiting the ability to anticipate areas where operational readiness may be required.”

Research Aim

“To develop and evaluate an interpretable 24-hour area-level wildlife-incident risk forecasting approach for APM Labuan.”

Study Scope

Location: Federal Territory of Labuan, Malaysia

Historical study period: 2020–2025

Forecast horizon: Next 24 hours

Spatial units: Incident coordinates, general localities and H3 grid cells

Intended use: Operational planning and decision support

Intended users: APM officers and research evaluators

Research Objectives

RO1:
“Identify the temporal, environmental and spatial factors associated with wildlife-related emergency incidents in Labuan.”

RO2:
“Develop and compare baseline, Random Forest, LSTM and hybrid RF–LSTM forecasting approaches.”

RO3:
“Evaluate the selected model and implement its outputs in an interpretable web-based decision-support prototype.”

Research Questions

RQ1:
“Which temporal, environmental and spatial factors are most strongly associated with wildlife-related emergency incidents in Labuan?”

RQ2:
“How does the hybrid RF–LSTM approach perform compared with baseline and individual machine-learning models?”

RQ3:
“How can the selected model’s results be presented through an interpretable web-based prototype to support APM Labuan’s operational planning?”

Data Sources

Use cards for:

Anonymised APM incident records

Weather data

Temporal information

Land-use and environmental information

Road and building density

Vegetation and drainage proximity

H3 spatial indexing

Clearly mark all current dashboard values as mock demonstration data.

Limitations

Display the following:

Forecasts depend on the quantity and quality of historical records.

Rare incidents create class-imbalance challenges.

Risk estimates do not identify an exact future incident location.

Weather and environmental data may contain missing values.

The hybrid model may not outperform simpler approaches.

Final operational use would require further validation and APM approval.

The prototype must not replace official procedures or professional judgement.

Ethics and Governance

Include:

Anonymisation before analysis

No caller identity displayed

No exact household address displayed

Role-based access recommended for future implementation

Secure storage recommended

Research approval and APM authorisation required

Results presented at aggregated locality or H3-cell level

INTERACTIONS

Make the prototype feel functional.

Required interactions:

Sidebar navigation changes pages

Risk filters update the map and summary cards

Clicking a map cell opens detailed risk information

Chart tooltips show exact values

Forecast timeline changes mock hourly risk

Table search and filters work

Export Report button opens a modal

Refresh Forecast button shows a loading state, then updates the timestamp

Information icons open explanatory tooltips

“View Area Details” navigates to the dedicated risk-map page

Light loading skeletons should appear briefly when changing pages or filters

EXPORT REPORT MODAL

When “Export Report” is clicked, show a modal titled:

“Generate 24-Hour Risk Summary”

Options:

Forecast date

Include map

Include priority areas

Include environmental conditions

Include model explanation

Include limitations and disclaimer

Export as PDF

Export as PNG

The export does not need to generate a real file in this first prototype. The action can show:

“Demonstration report prepared successfully.”

MOBILE RESPONSIVENESS

On mobile:

Collapse the sidebar into a menu

Stack summary cards vertically

Make the map horizontally full-width

Move map details into a bottom sheet

Make tables horizontally scrollable

Preserve all risk legends and disclaimers

Keep primary actions easy to tap

IMPORTANT CONTENT RULES

The interface must consistently use these confirmed project decisions:

Historical dataset period: 2020–2025

Forecast horizon: 24 hours

Geographic scope: Labuan, Malaysia

Spatial representation: Coordinates, localities and H3 grid cells

Prediction type: Probability-based area risk

Primary model under investigation: Hybrid Random Forest–LSTM

Comparison models: Baselines, Random Forest and LSTM

Intended output: Interpretable web-based decision-support prototype

Never use “mukim” as the spatial unit.

Never claim:

Guaranteed prediction accuracy

Exact future incident location

Exact future incident time

Automatic emergency dispatch

Live official APM database integration

Fully operational government deployment

Use these labels prominently:

“Research Prototype”

“Demonstration Data”

“Simulated Model Results”

“Decision Support Only”

FINAL QUALITY EXPECTATION

The finished website should look suitable for:

A research proposal presentation

A university capstone demonstration

A meeting with APM stakeholders

Screenshots in an academic report

Future development into a working Streamlit, React or GIS-based system

The overview page should be visually impressive enough to serve as the main concept image for the proposal. Prioritise the Labuan risk map, 24-hour forecast, priority monitoring areas, environmental conditions, and interpretable risk factors.

Generate the complete responsive prototype with polished mock data, working navigation, interactive components and a consistent design system.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d78f791c-97b9-4c48-abe2-65730c2cae92).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
