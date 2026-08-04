// All values below are MOCK DEMONSTRATION DATA for a research prototype.
// No real APM records are used.

export type RiskLevel = "low" | "medium" | "high" | "unknown";

export const RISK_LABEL: Record<RiskLevel, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  unknown: "Insufficient data",
};

export const RISK_COLOR: Record<RiskLevel, string> = {
  low: "#22A06B",
  medium: "#F5A623",
  high: "#D64545",
  unknown: "#98A2B3",
};

export const WILDLIFE_CATEGORIES = [
  "Snake",
  "Monitor lizard",
  "Crocodile",
  "Monkey",
  "Wild boar",
  "Other wildlife",
] as const;
export type WildlifeCategory = (typeof WILDLIFE_CATEGORIES)[number];

export const WEATHER_CONDITIONS = [
  "Clear",
  "Cloudy",
  "Light rain",
  "Heavy rain",
  "Thunderstorm",
] as const;

export const TIME_PERIODS = [
  "00:00–06:00",
  "06:00–12:00",
  "12:00–18:00",
  "18:00–24:00",
  "Full 24 Hours",
] as const;
export type TimePeriod = (typeof TIME_PERIODS)[number];

export const LABUAN_CENTER: [number, number] = [5.2831, 115.2308];

export type Locality = {
  name: string;
  lat: number;
  lng: number;
};

export type RiskCell = {
  id: string;
  h3: string;
  locality: string;
  lat: number;
  lng: number;
  risk: RiskLevel;
  probability: number; // 0-100
  confidence: number; // 0-100
  historicalIncidents: number;
  rainfall: number; // mm
  temperature: number; // C
  humidity: number; // %
  vegetation: "Low" | "Moderate" | "High";
  topCategory: WildlifeCategory;
  residentialDensity: "Low" | "Moderate" | "High";
  dataCompleteness: number; // %
  trend: "up" | "down" | "flat";
};

export const RISK_CELLS: RiskCell[] = [
  {
    id: "c1",
    h3: "LAB-H3-0082",
    locality: "Pohon Batu",
    lat: 5.3105,
    lng: 115.2205,
    risk: "high",
    probability: 74,
    confidence: 81,
    historicalIncidents: 32,
    rainfall: 46,
    temperature: 29,
    humidity: 84,
    vegetation: "High",
    topCategory: "Snake",
    residentialDensity: "Moderate",
    dataCompleteness: 94,
    trend: "up",
  },
  {
    id: "c2",
    h3: "LAB-H3-0117",
    locality: "Rancha-Rancha",
    lat: 5.2661,
    lng: 115.2372,
    risk: "high",
    probability: 69,
    confidence: 77,
    historicalIncidents: 28,
    rainfall: 41,
    temperature: 29,
    humidity: 83,
    vegetation: "High",
    topCategory: "Monitor lizard",
    residentialDensity: "High",
    dataCompleteness: 91,
    trend: "up",
  },
  {
    id: "c3",
    h3: "LAB-H3-0045",
    locality: "Kiamsam",
    lat: 5.3018,
    lng: 115.1962,
    risk: "high",
    probability: 65,
    confidence: 74,
    historicalIncidents: 26,
    rainfall: 38,
    temperature: 30,
    humidity: 80,
    vegetation: "High",
    topCategory: "Snake",
    residentialDensity: "Low",
    dataCompleteness: 88,
    trend: "flat",
  },
  {
    id: "c4",
    h3: "LAB-H3-0061",
    locality: "Layang-Layangan",
    lat: 5.3212,
    lng: 115.2456,
    risk: "medium",
    probability: 52,
    confidence: 72,
    historicalIncidents: 19,
    rainfall: 32,
    temperature: 29,
    humidity: 79,
    vegetation: "Moderate",
    topCategory: "Monkey",
    residentialDensity: "Moderate",
    dataCompleteness: 86,
    trend: "down",
  },
  {
    id: "c5",
    h3: "LAB-H3-0093",
    locality: "Sungai Bedaun",
    lat: 5.2925,
    lng: 115.2648,
    risk: "medium",
    probability: 48,
    confidence: 70,
    historicalIncidents: 17,
    rainfall: 29,
    temperature: 30,
    humidity: 78,
    vegetation: "High",
    topCategory: "Crocodile",
    residentialDensity: "Low",
    dataCompleteness: 82,
    trend: "flat",
  },
  {
    id: "c6",
    h3: "LAB-H3-0028",
    locality: "Ganggarak",
    lat: 5.2743,
    lng: 115.2118,
    risk: "medium",
    probability: 45,
    confidence: 69,
    historicalIncidents: 15,
    rainfall: 27,
    temperature: 30,
    humidity: 77,
    vegetation: "Moderate",
    topCategory: "Wild boar",
    residentialDensity: "Moderate",
    dataCompleteness: 84,
    trend: "up",
  },
  {
    id: "c7",
    h3: "LAB-H3-0102",
    locality: "Lubok Temiang",
    lat: 5.2588,
    lng: 115.2088,
    risk: "medium",
    probability: 43,
    confidence: 68,
    historicalIncidents: 14,
    rainfall: 25,
    temperature: 30,
    humidity: 76,
    vegetation: "Moderate",
    topCategory: "Snake",
    residentialDensity: "High",
    dataCompleteness: 80,
    trend: "down",
  },
  {
    id: "c8",
    h3: "LAB-H3-0136",
    locality: "Bebuloh",
    lat: 5.2482,
    lng: 115.2325,
    risk: "medium",
    probability: 41,
    confidence: 66,
    historicalIncidents: 13,
    rainfall: 24,
    temperature: 30,
    humidity: 76,
    vegetation: "Moderate",
    topCategory: "Monitor lizard",
    residentialDensity: "Moderate",
    dataCompleteness: 78,
    trend: "flat",
  },
  {
    id: "c9",
    h3: "LAB-H3-0074",
    locality: "Patau-Patau",
    lat: 5.2795,
    lng: 115.2415,
    risk: "medium",
    probability: 39,
    confidence: 65,
    historicalIncidents: 12,
    rainfall: 22,
    temperature: 30,
    humidity: 75,
    vegetation: "Low",
    topCategory: "Monitor lizard",
    residentialDensity: "High",
    dataCompleteness: 90,
    trend: "down",
  },
  {
    id: "c10",
    h3: "LAB-H3-0011",
    locality: "Victoria / Bandar Labuan",
    lat: 5.2795,
    lng: 115.2483,
    risk: "medium",
    probability: 36,
    confidence: 74,
    historicalIncidents: 11,
    rainfall: 21,
    temperature: 31,
    humidity: 74,
    vegetation: "Low",
    topCategory: "Snake",
    residentialDensity: "High",
    dataCompleteness: 96,
    trend: "flat",
  },
  {
    id: "c11",
    h3: "LAB-H3-0055",
    locality: "Kiamsam North",
    lat: 5.3288,
    lng: 115.2065,
    risk: "low",
    probability: 24,
    confidence: 63,
    historicalIncidents: 7,
    rainfall: 18,
    temperature: 30,
    humidity: 73,
    vegetation: "Moderate",
    topCategory: "Monkey",
    residentialDensity: "Low",
    dataCompleteness: 71,
    trend: "flat",
  },
  {
    id: "c12",
    h3: "LAB-H3-0149",
    locality: "Bebuloh South",
    lat: 5.2402,
    lng: 115.2115,
    risk: "low",
    probability: 19,
    confidence: 61,
    historicalIncidents: 5,
    rainfall: 16,
    temperature: 31,
    humidity: 72,
    vegetation: "Low",
    topCategory: "Other wildlife",
    residentialDensity: "Low",
    dataCompleteness: 68,
    trend: "down",
  },
  {
    id: "c13",
    h3: "LAB-H3-0158",
    locality: "Tanjung Aru Flats",
    lat: 5.3055,
    lng: 115.2705,
    risk: "low",
    probability: 17,
    confidence: 58,
    historicalIncidents: 4,
    rainfall: 15,
    temperature: 31,
    humidity: 71,
    vegetation: "Moderate",
    topCategory: "Crocodile",
    residentialDensity: "Low",
    dataCompleteness: 64,
    trend: "flat",
  },
  {
    id: "c14",
    h3: "LAB-H3-0163",
    locality: "Northern Coastal Reserve",
    lat: 5.3402,
    lng: 115.2312,
    risk: "unknown",
    probability: 0,
    confidence: 22,
    historicalIncidents: 1,
    rainfall: 20,
    temperature: 30,
    humidity: 74,
    vegetation: "High",
    topCategory: "Other wildlife",
    residentialDensity: "Low",
    dataCompleteness: 24,
    trend: "flat",
  },
  {
    id: "c15",
    h3: "LAB-H3-0171",
    locality: "Southern Wetland Edge",
    lat: 5.2352,
    lng: 115.2542,
    risk: "unknown",
    probability: 0,
    confidence: 19,
    historicalIncidents: 2,
    rainfall: 23,
    temperature: 30,
    humidity: 78,
    vegetation: "High",
    topCategory: "Crocodile",
    residentialDensity: "Low",
    dataCompleteness: 21,
    trend: "flat",
  },
];

export const LOCALITIES: string[] = [
  "Victoria / Bandar Labuan",
  "Patau-Patau",
  "Kiamsam",
  "Rancha-Rancha",
  "Layang-Layangan",
  "Pohon Batu",
  "Ganggarak",
  "Lubok Temiang",
  "Sungai Bedaun",
  "Bebuloh",
];

// Deterministic per-time-period shift so the timeline changes the distribution.
export const PERIOD_MODIFIER: Record<TimePeriod, number> = {
  "00:00–06:00": -6,
  "06:00–12:00": -12,
  "12:00–18:00": -3,
  "18:00–24:00": 11,
  "Full 24 Hours": 0,
};

export function clampProbability(value: number) {
  return Math.max(0, Math.min(99, Math.round(value)));
}

export function riskFromProbability(p: number, base: RiskLevel): RiskLevel {
  if (base === "unknown") return "unknown";
  if (p >= 60) return "high";
  if (p >= 35) return "medium";
  return "low";
}

export function applyPeriod(cell: RiskCell, period: TimePeriod): RiskCell {
  if (cell.risk === "unknown") return cell;
  const probability = clampProbability(cell.probability + PERIOD_MODIFIER[period]);
  return { ...cell, probability, risk: riskFromProbability(probability, cell.risk) };
}

export const FACTOR_CONTRIBUTIONS = [
  { factor: "Previous incident frequency", value: 31 },
  { factor: "Recent rainfall", value: 24 },
  { factor: "Vegetation proximity", value: 19 },
  { factor: "Humidity", value: 12 },
  { factor: "Residential density", value: 9 },
  { factor: "Other factors", value: 5 },
];

export const MONTHLY_INCIDENTS = [
  { month: "Jan", incidents: 22 },
  { month: "Feb", incidents: 18 },
  { month: "Mar", incidents: 25 },
  { month: "Apr", incidents: 29 },
  { month: "May", incidents: 34 },
  { month: "Jun", incidents: 41 },
  { month: "Jul", incidents: 46 },
  { month: "Aug", incidents: 43 },
  { month: "Sep", incidents: 38 },
  { month: "Oct", incidents: 31 },
  { month: "Nov", incidents: 27 },
  { month: "Dec", incidents: 24 },
];

export const CATEGORY_SHARE = [
  { category: "Snake", value: 46 },
  { category: "Monitor lizard", value: 21 },
  { category: "Monkey", value: 13 },
  { category: "Crocodile", value: 8 },
  { category: "Wild boar", value: 7 },
  { category: "Other", value: 5 },
];

export type IncidentRecord = {
  id: string;
  date: string; // ISO
  displayDate: string;
  time: string;
  locality: string;
  h3: string;
  category: WildlifeCategory;
  weather: string;
  risk: Exclude<RiskLevel, "unknown">;
  outcome: "Resolved" | "Monitoring" | "Referred";
  completeness: "Complete" | "Partial";
};

export const RECENT_INCIDENTS: IncidentRecord[] = [
  {
    id: "INC-2026-0418",
    date: "2026-08-03",
    displayDate: "03 Aug 2026",
    time: "9:20 PM",
    locality: "Kiamsam",
    h3: "LAB-H3-0045",
    category: "Snake",
    weather: "Light rain",
    risk: "high",
    outcome: "Resolved",
    completeness: "Complete",
  },
  {
    id: "INC-2026-0417",
    date: "2026-08-02",
    displayDate: "02 Aug 2026",
    time: "4:10 PM",
    locality: "Pohon Batu",
    h3: "LAB-H3-0082",
    category: "Monitor lizard",
    weather: "Cloudy",
    risk: "medium",
    outcome: "Resolved",
    completeness: "Complete",
  },
  {
    id: "INC-2026-0416",
    date: "2026-08-01",
    displayDate: "01 Aug 2026",
    time: "7:45 AM",
    locality: "Rancha-Rancha",
    h3: "LAB-H3-0117",
    category: "Monkey",
    weather: "Clear",
    risk: "medium",
    outcome: "Monitoring",
    completeness: "Partial",
  },
  {
    id: "INC-2026-0415",
    date: "2026-07-30",
    displayDate: "30 Jul 2026",
    time: "11:15 PM",
    locality: "Layang-Layangan",
    h3: "LAB-H3-0061",
    category: "Snake",
    weather: "Heavy rain",
    risk: "high",
    outcome: "Resolved",
    completeness: "Complete",
  },
];

// Larger anonymised demonstration table (deterministic, no randomness at module scope).
export function buildIncidentRecords(): IncidentRecord[] {
  const categories = WILDLIFE_CATEGORIES;
  const weathers = WEATHER_CONDITIONS;
  const outcomes: IncidentRecord["outcome"][] = ["Resolved", "Monitoring", "Referred"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const rows: IncidentRecord[] = [...RECENT_INCIDENTS];
  for (let i = 0; i < 140; i++) {
    const year = 2020 + (i % 6);
    const monthIdx = (i * 5) % 12;
    const day = ((i * 7) % 27) + 1;
    const hour = (i * 13) % 24;
    const cell = RISK_CELLS[i % RISK_CELLS.length]!;
    const risk: Exclude<RiskLevel, "unknown"> =
      i % 5 === 0 ? "high" : i % 3 === 0 ? "medium" : "low";
    rows.push({
      id: `INC-${year}-${String(300 - i).padStart(4, "0")}`,
      date: `${year}-${String(monthIdx + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      displayDate: `${String(day).padStart(2, "0")} ${months[monthIdx]!} ${year}`,
      time: `${String(hour % 12 === 0 ? 12 : hour % 12).padStart(2, "0")}:${String((i * 11) % 60).padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`,
      locality: cell.locality,
      h3: cell.h3,
      category: categories[i % categories.length]!,
      weather: weathers[i % weathers.length]!,
      risk,
      outcome: outcomes[i % outcomes.length]!,
      completeness: i % 9 === 0 ? "Partial" : "Complete",
    });
  }
  return rows;
}

export const YEARLY_TREND = [
  { year: "2020", incidents: 174, snake: 78, others: 96 },
  { year: "2021", incidents: 189, snake: 86, others: 103 },
  { year: "2022", incidents: 206, snake: 95, others: 111 },
  { year: "2023", incidents: 221, snake: 104, others: 117 },
  { year: "2024", incidents: 233, snake: 110, others: 123 },
  { year: "2025", incidents: 225, snake: 101, others: 124 },
];

export const SEASONALITY = [
  { year: "2020", values: [12, 10, 14, 16, 18, 21, 23, 22, 19, 15, 13, 11] },
  { year: "2021", values: [13, 11, 15, 17, 20, 23, 25, 23, 20, 16, 14, 12] },
  { year: "2022", values: [14, 12, 16, 19, 22, 25, 27, 25, 22, 18, 15, 13] },
  { year: "2023", values: [15, 13, 18, 20, 24, 27, 29, 27, 23, 19, 16, 14] },
  { year: "2024", values: [16, 14, 19, 22, 25, 29, 31, 28, 24, 20, 17, 15] },
  { year: "2025", values: [15, 13, 18, 21, 24, 28, 30, 27, 23, 19, 16, 14] },
];

export const HOURLY_DISTRIBUTION = Array.from({ length: 24 }, (_, hour) => {
  const shape = [
    18, 14, 11, 9, 8, 10, 16, 24, 30, 32, 33, 35, 37, 38, 40, 43, 48, 56, 68, 74, 71, 60, 44, 28,
  ];
  return { hour: `${String(hour).padStart(2, "0")}:00`, incidents: shape[hour]! };
});

export const WEATHER_VS_INCIDENTS = [
  { condition: "Clear", incidents: 168 },
  { condition: "Cloudy", incidents: 241 },
  { condition: "Light rain", incidents: 386 },
  { condition: "Heavy rain", incidents: 312 },
  { condition: "Thunderstorm", incidents: 141 },
];

export const TOP_LOCALITIES = [
  { locality: "Pohon Batu", incidents: 186 },
  { locality: "Rancha-Rancha", incidents: 164 },
  { locality: "Kiamsam", incidents: 149 },
  { locality: "Layang-Layangan", incidents: 121 },
  { locality: "Sungai Bedaun", incidents: 108 },
  { locality: "Ganggarak", incidents: 96 },
  { locality: "Lubok Temiang", incidents: 88 },
  { locality: "Bebuloh", incidents: 74 },
];

export const CATEGORY_COMPARISON = [
  { category: "Snake", y2023: 104, y2024: 110, y2025: 101 },
  { category: "Monitor lizard", y2023: 46, y2024: 51, y2025: 49 },
  { category: "Monkey", y2023: 29, y2024: 31, y2025: 33 },
  { category: "Crocodile", y2023: 17, y2024: 19, y2025: 18 },
  { category: "Wild boar", y2023: 15, y2024: 14, y2025: 16 },
  { category: "Other wildlife", y2023: 10, y2024: 8, y2025: 8 },
];

export const MODEL_METRICS = [
  {
    model: "Historical Average Baseline",
    prauc: 0.41,
    f1: 0.39,
    balancedAccuracy: 0.55,
    brier: 0.28,
    status: "Simulated",
  },
  {
    model: "Logistic Regression",
    prauc: 0.52,
    f1: 0.48,
    balancedAccuracy: 0.61,
    brier: 0.23,
    status: "Simulated",
  },
  {
    model: "Random Forest",
    prauc: 0.68,
    f1: 0.64,
    balancedAccuracy: 0.72,
    brier: 0.18,
    status: "Simulated",
  },
  {
    model: "LSTM",
    prauc: 0.65,
    f1: 0.61,
    balancedAccuracy: 0.69,
    brier: 0.2,
    status: "Simulated",
  },
  {
    model: "Hybrid RF–LSTM",
    prauc: 0.74,
    f1: 0.7,
    balancedAccuracy: 0.77,
    brier: 0.15,
    status: "Simulated – pending validation",
  },
];

export const FEATURE_IMPORTANCE = [
  { feature: "Previous incident history", value: 0.28 },
  { feature: "Rainfall", value: 0.19 },
  { feature: "Month / season", value: 0.13 },
  { feature: "Vegetation proximity", value: 0.11 },
  { feature: "Humidity", value: 0.08 },
  { feature: "Time of day", value: 0.07 },
  { feature: "Road density", value: 0.05 },
  { feature: "Residential density", value: 0.04 },
  { feature: "Drainage proximity", value: 0.03 },
  { feature: "Temperature", value: 0.02 },
];

export const PR_CURVE = [
  { recall: 0.0, hybrid: 0.98, rf: 0.95, lstm: 0.93 },
  { recall: 0.1, hybrid: 0.94, rf: 0.89, lstm: 0.86 },
  { recall: 0.2, hybrid: 0.9, rf: 0.84, lstm: 0.8 },
  { recall: 0.3, hybrid: 0.86, rf: 0.79, lstm: 0.75 },
  { recall: 0.4, hybrid: 0.82, rf: 0.73, lstm: 0.7 },
  { recall: 0.5, hybrid: 0.76, rf: 0.68, lstm: 0.64 },
  { recall: 0.6, hybrid: 0.7, rf: 0.61, lstm: 0.57 },
  { recall: 0.7, hybrid: 0.62, rf: 0.53, lstm: 0.49 },
  { recall: 0.8, hybrid: 0.52, rf: 0.44, lstm: 0.41 },
  { recall: 0.9, hybrid: 0.4, rf: 0.33, lstm: 0.31 },
  { recall: 1.0, hybrid: 0.27, rf: 0.22, lstm: 0.2 },
];

export const CALIBRATION = [
  { predicted: 0.05, observed: 0.06 },
  { predicted: 0.15, observed: 0.13 },
  { predicted: 0.25, observed: 0.24 },
  { predicted: 0.35, observed: 0.33 },
  { predicted: 0.45, observed: 0.47 },
  { predicted: 0.55, observed: 0.53 },
  { predicted: 0.65, observed: 0.67 },
  { predicted: 0.75, observed: 0.72 },
  { predicted: 0.85, observed: 0.83 },
  { predicted: 0.95, observed: 0.91 },
];

export const CONFIDENCE_DISTRIBUTION = [
  { band: "<50%", cells: 6 },
  { band: "50–60%", cells: 11 },
  { band: "60–70%", cells: 19 },
  { band: "70–80%", cells: 26 },
  { band: "80–90%", cells: 14 },
  { band: ">90%", cells: 5 },
];

export const ABLATION = [
  { variant: "All features", prauc: 0.74 },
  { variant: "Without rainfall", prauc: 0.66 },
  { variant: "Without incident history", prauc: 0.58 },
  { variant: "Without vegetation", prauc: 0.69 },
  { variant: "Without temporal features", prauc: 0.63 },
  { variant: "Without spatial density", prauc: 0.71 },
];

export const CONFUSION_MATRIX = {
  truePositive: 128,
  falsePositive: 61,
  falseNegative: 54,
  trueNegative: 1017,
};

export const SEVEN_DAY_PATTERN = [
  { day: "Mon", risk: 41 },
  { day: "Tue", risk: 47 },
  { day: "Wed", risk: 52 },
  { day: "Thu", risk: 58 },
  { day: "Fri", risk: 63 },
  { day: "Sat", risk: 71 },
  { day: "Sun", risk: 68 },
];

export function hourlyRiskFor(cell: RiskCell) {
  const shape = [
    0.62, 0.55, 0.48, 0.42, 0.4, 0.44, 0.52, 0.6, 0.63, 0.61, 0.58, 0.6, 0.64, 0.66, 0.68, 0.72,
    0.78, 0.86, 0.95, 1.0, 0.97, 0.9, 0.8, 0.7,
  ];
  return shape.map((factor, hour) => ({
    hour: `${String(hour).padStart(2, "0")}`,
    risk: clampProbability(cell.probability * factor),
  }));
}

export const CURRENT_CONDITIONS = {
  weather: "Light rain",
  temperature: 29,
  humidity: 84,
  rainfall24h: 46,
  wind: 12,
  environmentalRisk: "Elevated",
};
