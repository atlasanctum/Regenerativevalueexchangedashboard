import { useState } from "react";
import { useNavigate } from "react-router";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import {
  Leaf,
  Thermometer,
  Droplets,
  Wind,
  Globe,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  MapPin,
  Activity,
  Zap,
  Users,
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const carbonBudgetData = [
  { year: "2020", emissions: 36.4, sequestration: 11.2 },
  { year: "2021", emissions: 37.1, sequestration: 11.8 },
  { year: "2022", emissions: 37.5, sequestration: 12.4 },
  { year: "2023", emissions: 37.8, sequestration: 13.1 },
  { year: "2024", emissions: 38.0, sequestration: 14.2 },
  { year: "2025", emissions: 38.1, sequestration: 15.3 },
  { year: "2026", emissions: 38.2, sequestration: 16.2 },
];

const rveSequestrationData = [
  { type: "Mangrove",   tCO2e: 2.4 },
  { type: "Rainforest", tCO2e: 8.7 },
  { type: "Savanna",    tCO2e: 1.2 },
  { type: "Wetlands",   tCO2e: 3.1 },
  { type: "Ocean",      tCO2e: 0.8 },
];

const biodiversityRadarData = [
  { ecosystem: "Coral Reefs",    baseline: 72, current: 68 },
  { ecosystem: "Amazon",         baseline: 88, current: 91 },
  { ecosystem: "Borneo Forest",  baseline: 79, current: 79 },
  { ecosystem: "African Savanna",baseline: 81, current: 83 },
  { ecosystem: "Arctic Tundra",  baseline: 65, current: 59 },
  { ecosystem: "Wetlands",       baseline: 74, current: 77 },
];

const biodiversityTableData = [
  {
    ecosystem: "Coral Reefs",
    speciesChange: "-12% → +4%",
    habitatArea: "284,300 km²",
    threatLevel: "Critical",
    trend: "up",
  },
  {
    ecosystem: "Amazon Rainforest",
    speciesChange: "+3%",
    habitatArea: "5,500,000 km²",
    threatLevel: "Moderate",
    trend: "up",
  },
  {
    ecosystem: "Borneo Forest",
    speciesChange: "-8% → 0%",
    habitatArea: "743,000 km²",
    threatLevel: "High",
    trend: "neutral",
  },
  {
    ecosystem: "African Savanna",
    speciesChange: "-4% → +2%",
    habitatArea: "13,500,000 km²",
    threatLevel: "Moderate",
    trend: "up",
  },
  {
    ecosystem: "Arctic Tundra",
    speciesChange: "-18% → -9%",
    habitatArea: "11,500,000 km²",
    threatLevel: "Severe",
    trend: "down",
  },
];

const ecosystemHealthData = [
  { year: "2021", forests: 72, oceans: 68, freshwater: 61, soil: 58 },
  { year: "2022", forests: 73, oceans: 67, freshwater: 62, soil: 59 },
  { year: "2023", forests: 75, oceans: 68, freshwater: 64, soil: 61 },
  { year: "2024", forests: 77, oceans: 70, freshwater: 66, soil: 63 },
  { year: "2025", forests: 79, oceans: 71, freshwater: 68, soil: 65 },
  { year: "2026", forests: 82, oceans: 73, freshwater: 71, soil: 67 },
];

const healthMonitors = [
  { label: "Forests",    score: 82, trend: +3, color: "emerald", icon: Leaf },
  { label: "Oceans",     score: 73, trend: +2, color: "blue",    icon: Droplets },
  { label: "Freshwater", score: 71, trend: +3, color: "cyan",    icon: Wind },
  { label: "Soil",       score: 67, trend: +2, color: "amber",   icon: Globe },
];

const rveImpactData = [
  { year: "2023", carbonAvoided: 4.1, bdCredits: 120000, watershed: 180, communities: 42 },
  { year: "2024", carbonAvoided: 8.7, bdCredits: 310000, watershed: 420, communities: 118 },
  { year: "2025", carbonAvoided: 13.2, bdCredits: 670000, watershed: 780, communities: 310 },
  { year: "2026", carbonAvoided: 16.2, bdCredits: 1200000, watershed: 1240, communities: 590 },
];

const forecastData = [
  { year: "2026", bau: 1.34, paris: 1.34, regenerative: 1.34 },
  { year: "2027", bau: 1.41, paris: 1.32, regenerative: 1.28 },
  { year: "2028", bau: 1.51, paris: 1.29, regenerative: 1.21 },
  { year: "2029", bau: 1.63, paris: 1.26, regenerative: 1.14 },
  { year: "2030", bau: 1.78, paris: 1.23, regenerative: 1.05 },
];

const scenarios = [
  {
    name: "Business as Usual",
    key: "bau",
    projection2030: "+1.78°C",
    co2: "44.1 GtCO₂",
    loss: "-18% biodiversity",
    color: "rose",
    desc: "Current policy trajectory with no additional intervention",
  },
  {
    name: "Paris Aligned",
    key: "paris",
    projection2030: "+1.23°C",
    co2: "32.4 GtCO₂",
    loss: "-4% biodiversity",
    color: "amber",
    desc: "Consistent with 1.5°C Paris Agreement targets",
  },
  {
    name: "Regenerative",
    key: "regenerative",
    projection2030: "+1.05°C",
    co2: "24.8 GtCO₂",
    loss: "+12% biodiversity",
    color: "emerald",
    desc: "Full RVE platform deployment with nature-based solutions",
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

const TooltipStyle = {
  contentStyle: { backgroundColor: "#0f172a", border: "1px solid #064e3b", borderRadius: 8 },
  labelStyle: { color: "#6ee7b7" },
  itemStyle: { color: "#a7f3d0" },
};

function threatBadge(level: string) {
  switch (level) {
    case "Critical": return "bg-rose-500/20 text-rose-400 border-rose-500/30";
    case "Severe":   return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "High":     return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "Moderate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    default:         return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
  }
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function KpiCard({
  label, value, unit, sub, icon: Icon, trend,
}: {
  label: string; value: string; unit?: string; sub?: string;
  icon: React.ElementType; trend?: "up" | "down" | "neutral";
}) {
  return (
    <Card className="bg-slate-900/50 border border-emerald-500/20">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-slate-400 mb-1">{label}</p>
            <div className="flex items-baseline gap-1">
              <p className="text-xl font-bold text-white">{value}</p>
              {unit && <span className="text-xs text-slate-400">{unit}</span>}
            </div>
            {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
          </div>
          <div className="p-2 bg-emerald-500/10 rounded-lg flex flex-col items-center gap-1">
            <Icon className="w-4 h-4 text-emerald-400" />
            {trend === "up" && <TrendingUp className="w-3 h-3 text-emerald-400" />}
            {trend === "down" && <TrendingDown className="w-3 h-3 text-rose-400" />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function ClimateIntelligenceOS() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-emerald-500/15 rounded-lg">
              <Leaf className="w-6 h-6 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">Climate Intelligence OS</h1>
          </div>
          <p className="text-slate-400">
            Real-time planetary health tracking, carbon budget analytics, and RVE ecosystem impact across 47 countries
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 bg-transparent"
            onClick={() => navigate("/features/climate-os")}
          >
            Full Report
          </Button>
          <Button
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Live Monitor
          </Button>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
        <div>
          <span className="text-amber-300 font-semibold text-sm">
            2026 Global Carbon Budget:{" "}
          </span>
          <span className="text-amber-200 text-sm">
            38.2 GtCO₂ remaining — <strong>↓8.4% vs baseline</strong>. RVE platform sequestration offsetting{" "}
            <strong>16.2M tCO₂e/year</strong> across 847 active projects.
          </span>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard label="Atmospheric CO₂" value="423.7" unit="ppm" sub="+2.4 ppm/yr" icon={Wind} trend="up" />
        <KpiCard label="Temp Anomaly" value="+1.34" unit="°C" sub="vs 1850–1900" icon={Thermometer} trend="up" />
        <KpiCard label="Ocean pH" value="8.09" sub="↓0.11 since 1900" icon={Droplets} trend="down" />
        <KpiCard label="Arctic Ice Extent" value="↓31%" sub="vs 1980 baseline" icon={Globe} trend="down" />
        <KpiCard label="RVE Projects" value="847" sub="across 47 countries" icon={Leaf} trend="up" />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="carbon" className="w-full">
        <TabsList className="bg-slate-900/50 border border-emerald-500/20 flex-wrap h-auto gap-1 p-1">
          {[
            { value: "carbon", label: "Carbon Budget" },
            { value: "biodiversity", label: "Biodiversity" },
            { value: "ecosystem", label: "Ecosystem Health" },
            { value: "impact", label: "RVE Impact" },
            { value: "forecasts", label: "Forecasts" },
          ].map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-slate-400"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ── Carbon Budget Tab ────────────────────────────────────────────────── */}
        <TabsContent value="carbon" className="mt-6 space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Emissions vs Sequestration */}
            <Card className="bg-slate-900/50 border border-emerald-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm">
                  Global CO₂ Emissions vs Sequestration (GtCO₂/year)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={carbonBudgetData} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
                    <defs>
                      <linearGradient id="emissionsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="seqGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                    <XAxis dataKey="year" stroke="#6ee7b7" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#6ee7b7" tick={{ fontSize: 11 }} domain={[0, 45]} />
                    <Tooltip {...TooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
                    <Area
                      type="monotone"
                      dataKey="emissions"
                      name="Emissions (GtCO₂)"
                      stroke="#f43f5e"
                      fill="url(#emissionsGrad)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="sequestration"
                      name="Sequestration (GtCO₂)"
                      stroke="#10b981"
                      fill="url(#seqGrad)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* RVE Sequestration by Type */}
            <Card className="bg-slate-900/50 border border-emerald-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm">
                  RVE Sequestration by Ecosystem Type (M tCO₂e/year)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={rveSequestrationData} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                    <XAxis dataKey="type" stroke="#6ee7b7" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#6ee7b7" tick={{ fontSize: 11 }} />
                    <Tooltip {...TooltipStyle} />
                    <Bar
                      dataKey="tCO2e"
                      name="M tCO₂e/yr"
                      fill="#10b981"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total RVE Sequestration", value: "16.2M tCO₂e/year", icon: Leaf },
              { label: "Active Projects", value: "847", icon: MapPin },
              { label: "Countries", value: "47", icon: Globe },
            ].map(({ label, value, icon: Icon }) => (
              <Card key={label} className="bg-slate-900/50 border border-emerald-500/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="text-lg font-bold text-white">{value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── Biodiversity Tab ─────────────────────────────────────────────────── */}
        <TabsContent value="biodiversity" className="mt-6 space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <Card className="bg-slate-900/50 border border-emerald-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm">
                  Biodiversity Index by Ecosystem (2020 Baseline vs 2026)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={biodiversityRadarData}>
                    <PolarGrid stroke="#1e3a2f" />
                    <PolarAngleAxis dataKey="ecosystem" stroke="#6ee7b7" tick={{ fontSize: 10 }} />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[50, 100]}
                      stroke="#6ee7b7"
                      tick={{ fontSize: 9 }}
                    />
                    <Radar
                      name="2020 Baseline"
                      dataKey="baseline"
                      stroke="#64748b"
                      fill="#64748b"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Radar
                      name="2026 Current"
                      dataKey="current"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.25}
                      strokeWidth={2}
                    />
                    <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
                    <Tooltip {...TooltipStyle} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Table */}
            <Card className="bg-slate-900/50 border border-emerald-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm">Ecosystem Status Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left text-xs text-slate-400 font-medium pb-3 pr-3">Ecosystem</th>
                        <th className="text-left text-xs text-slate-400 font-medium pb-3 pr-3">Species Δ</th>
                        <th className="text-left text-xs text-slate-400 font-medium pb-3 pr-3">Habitat Area</th>
                        <th className="text-left text-xs text-slate-400 font-medium pb-3">Threat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {biodiversityTableData.map((row) => (
                        <tr key={row.ecosystem} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-2.5 pr-3">
                            <div className="flex items-center gap-2">
                              {row.trend === "up" && <TrendingUp className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
                              {row.trend === "down" && <TrendingDown className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />}
                              {row.trend === "neutral" && <Activity className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
                              <span className="text-slate-200 text-xs">{row.ecosystem}</span>
                            </div>
                          </td>
                          <td className="py-2.5 pr-3 text-xs text-slate-400">{row.speciesChange}</td>
                          <td className="py-2.5 pr-3 text-xs text-slate-400">{row.habitatArea}</td>
                          <td className="py-2.5">
                            <Badge className={`text-xs border ${threatBadge(row.threatLevel)}`}>
                              {row.threatLevel}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── Ecosystem Health Tab ─────────────────────────────────────────────── */}
        <TabsContent value="ecosystem" className="mt-6 space-y-6">
          {/* Health monitor cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {healthMonitors.map(({ label, score, trend, color, icon: Icon }) => (
              <Card key={label} className="bg-slate-900/50 border border-emerald-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 bg-${color}-500/10 rounded-lg`}>
                      <Icon className={`w-5 h-5 text-${color}-400`} />
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span className="text-xs font-semibold">+{trend}pt</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mb-1">{label}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-white">{score}</span>
                    <span className="text-xs text-slate-400 mb-0.5">/100</span>
                  </div>
                  {/* mini progress bar */}
                  <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-emerald-500"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Health index line chart */}
          <Card className="bg-slate-900/50 border border-emerald-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm">Ecosystem Health Index Over Time (2021–2026)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={ecosystemHealthData} margin={{ top: 4, right: 24, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                  <XAxis dataKey="year" stroke="#6ee7b7" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#6ee7b7" tick={{ fontSize: 11 }} domain={[50, 90]} />
                  <Tooltip {...TooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
                  <Line type="monotone" dataKey="forests" name="Forests" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="oceans" name="Oceans" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="freshwater" name="Freshwater" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="soil" name="Soil" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── RVE Impact Tab ───────────────────────────────────────────────────── */}
        <TabsContent value="impact" className="mt-6 space-y-6">
          {/* Impact metric cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Carbon Avoided", value: "16.2M", unit: "tCO₂e", icon: Leaf },
              { label: "Biodiversity Credits Issued", value: "1.2M", unit: "credits", icon: Activity },
              { label: "Watershed Protected", value: "1,240", unit: "km²", icon: Droplets },
              { label: "Communities Impacted", value: "590", unit: "communities", icon: Users },
            ].map(({ label, value, unit, icon: Icon }) => (
              <Card key={label} className="bg-slate-900/50 border border-emerald-500/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-500/10 rounded-xl">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">{label}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-white">{value}</span>
                      <span className="text-xs text-slate-400">{unit}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cumulative impact chart */}
          <Card className="bg-slate-900/50 border border-emerald-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm">
                Cumulative RVE Platform Impact (2023–2026)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={rveImpactData} margin={{ top: 4, right: 24, left: -8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="carbonGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="commGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                  <XAxis dataKey="year" stroke="#6ee7b7" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#6ee7b7" tick={{ fontSize: 11 }} />
                  <Tooltip {...TooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
                  <Area
                    type="monotone"
                    dataKey="carbonAvoided"
                    name="Carbon Avoided (M tCO₂e)"
                    stroke="#10b981"
                    fill="url(#carbonGrad)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="communities"
                    name="Communities Impacted"
                    stroke="#3b82f6"
                    fill="url(#commGrad)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Forecasts Tab ────────────────────────────────────────────────────── */}
        <TabsContent value="forecasts" className="mt-6 space-y-6">
          {/* Scenario cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {scenarios.map((s) => {
              const borderMap: Record<string, string> = {
                rose: "border-rose-500/30 bg-rose-500/5",
                amber: "border-amber-500/30 bg-amber-500/5",
                emerald: "border-emerald-500/30 bg-emerald-500/5",
              };
              const textMap: Record<string, string> = {
                rose: "text-rose-400",
                amber: "text-amber-400",
                emerald: "text-emerald-400",
              };
              return (
                <Card key={s.key} className={`bg-slate-900/50 border ${borderMap[s.color]}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-white">{s.name}</CardTitle>
                      <Zap className={`w-4 h-4 ${textMap[s.color]}`} />
                    </div>
                    <p className="text-xs text-slate-400">{s.desc}</p>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <p className="text-xs text-slate-500">2030 Temp Anomaly</p>
                      <p className={`text-2xl font-bold ${textMap[s.color]}`}>{s.projection2030}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                      <div>
                        <p className="text-xs text-slate-500">CO₂ Emissions</p>
                        <p className="text-sm font-semibold text-white">{s.co2}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Biodiversity</p>
                        <p className="text-sm font-semibold text-white">{s.loss}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Trajectory chart */}
          <Card className="bg-slate-900/50 border border-emerald-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm">
                Temperature Anomaly Trajectory by Scenario (°C above pre-industrial)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={forecastData} margin={{ top: 4, right: 24, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="bauGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="parisGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="regenGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                  <XAxis dataKey="year" stroke="#6ee7b7" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#6ee7b7" tick={{ fontSize: 11 }} domain={[0.9, 2.0]} tickCount={6} />
                  <Tooltip {...TooltipStyle} formatter={(v: number) => [`${v}°C`, ""]} />
                  <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
                  <Area
                    type="monotone"
                    dataKey="bau"
                    name="Business as Usual"
                    stroke="#f43f5e"
                    fill="url(#bauGrad)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="paris"
                    name="Paris Aligned"
                    stroke="#f59e0b"
                    fill="url(#parisGrad)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="regenerative"
                    name="Regenerative"
                    stroke="#10b981"
                    fill="url(#regenGrad)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
