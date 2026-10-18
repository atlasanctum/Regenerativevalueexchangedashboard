import { useState } from "react";
import { useNavigate } from "react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  CheckCircle2,
  Clock,
  Calendar,
  TrendingUp,
  ArrowRight,
  GitBranch,
  Layers,
  Filter,
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const quarters = ["All", "Q1", "Q2", "Q3", "Q4"] as const;
type QuarterFilter = (typeof quarters)[number];

interface RoadmapItem {
  name: string;
  category: string;
  status: "Live" | "In Progress" | "Beta" | "Planned";
  quarter: string;
  year: number;
  slug: string;
  dependsOn?: string[];
}

const roadmapItems: RoadmapItem[] = [
  // Q1 2026 – Live
  { name: "Trading Hub", category: "Trading & Finance", status: "Live", quarter: "Q1", year: 2026, slug: "trading-hub" },
  { name: "Verification Hub", category: "Verification & Trust", status: "Live", quarter: "Q1", year: 2026, slug: "verification-hub" },
  { name: "Finance Hub", category: "Trading & Finance", status: "Live", quarter: "Q1", year: 2026, slug: "finance-hub" },
  { name: "Intelligence Layer", category: "Intelligence & AI", status: "Live", quarter: "Q1", year: 2026, slug: "intelligence-layer" },
  { name: "Document Intelligence", category: "Intelligence & AI", status: "Live", quarter: "Q1", year: 2026, slug: "document-intelligence" },
  { name: "Security & Privacy", category: "Platform Infrastructure", status: "Live", quarter: "Q1", year: 2026, slug: "security-privacy" },
  // Q2 2026 – Live
  { name: "Atlas OS", category: "Platform Infrastructure", status: "Live", quarter: "Q2", year: 2026, slug: "atlas-os", dependsOn: ["Trading Hub", "Finance Hub"] },
  { name: "Deal Engine", category: "Trading & Finance", status: "Live", quarter: "Q2", year: 2026, slug: "deal-engine", dependsOn: ["Trading Hub"] },
  { name: "Trust Engine", category: "Verification & Trust", status: "Live", quarter: "Q2", year: 2026, slug: "trust-engine", dependsOn: ["Verification Hub"] },
  { name: "Treasury Engine", category: "Trading & Finance", status: "Live", quarter: "Q2", year: 2026, slug: "treasury-engine", dependsOn: ["Finance Hub"] },
  { name: "Risk Engine", category: "Platform Infrastructure", status: "Live", quarter: "Q2", year: 2026, slug: "risk-engine", dependsOn: ["Intelligence Layer"] },
  // Q3 2026 – In Progress
  { name: "Advanced Charting", category: "Trading & Finance", status: "In Progress", quarter: "Q3", year: 2026, slug: "advanced-charting", dependsOn: ["Trading Hub"] },
  { name: "Mobile App Native", category: "Developer Experience", status: "In Progress", quarter: "Q3", year: 2026, slug: "mobile-app" },
  { name: "API Marketplace", category: "Developer Experience", status: "In Progress", quarter: "Q3", year: 2026, slug: "api-marketplace", dependsOn: ["Atlas OS"] },
  { name: "Autonomous Operations", category: "Intelligence & AI", status: "In Progress", quarter: "Q3", year: 2026, slug: "autonomous-ops", dependsOn: ["Intelligence Layer", "Risk Engine"] },
  { name: "Geospatial Intelligence", category: "Intelligence & AI", status: "In Progress", quarter: "Q3", year: 2026, slug: "geospatial-intelligence" },
  { name: "Climate OS", category: "Governance & Compliance", status: "In Progress", quarter: "Q3", year: 2026, slug: "climate-os" },
  // Q4 2026 – In Progress
  { name: "Advanced Derivatives", category: "Trading & Finance", status: "In Progress", quarter: "Q4", year: 2026, slug: "advanced-derivatives", dependsOn: ["Deal Engine", "Risk Engine"] },
  { name: "Institutional Custody", category: "Platform Infrastructure", status: "In Progress", quarter: "Q4", year: 2026, slug: "institutional-custody", dependsOn: ["Trust Engine"] },
  { name: "Layer 2 Expansion", category: "Platform Infrastructure", status: "In Progress", quarter: "Q4", year: 2026, slug: "layer2-expansion", dependsOn: ["Atlas OS"] },
  { name: "Knowledge Graph Explorer", category: "Intelligence & AI", status: "In Progress", quarter: "Q4", year: 2026, slug: "knowledge-graph", dependsOn: ["Document Intelligence"] },
  { name: "Platform Analytics", category: "Platform Infrastructure", status: "In Progress", quarter: "Q4", year: 2026, slug: "platform-analytics" },
  // Q1 2027 – Planned
  { name: "DeSci Integration v2", category: "Community & Social", status: "Planned", quarter: "Q1", year: 2027, slug: "desci-v2" },
  { name: "Regulatory Expansion", category: "Governance & Compliance", status: "Planned", quarter: "Q1", year: 2027, slug: "regulatory-expansion", dependsOn: ["Trust Engine"] },
  { name: "Enterprise SaaS v2", category: "Platform Infrastructure", status: "Planned", quarter: "Q1", year: 2027, slug: "enterprise-saas-v2", dependsOn: ["Atlas OS"] },
  { name: "Cross-chain Bridges", category: "Platform Infrastructure", status: "Planned", quarter: "Q1", year: 2027, slug: "cross-chain", dependsOn: ["Layer 2 Expansion"] },
  // Q2 2027 – Planned
  { name: "Digital Twin Visualization", category: "Intelligence & AI", status: "Planned", quarter: "Q2", year: 2027, slug: "digital-twin", dependsOn: ["Geospatial Intelligence"] },
  { name: "AI Copilot v3", category: "Intelligence & AI", status: "Planned", quarter: "Q2", year: 2027, slug: "ai-copilot-v3", dependsOn: ["Autonomous Operations"] },
  { name: "Biodiversity NFT Marketplace", category: "Community & Social", status: "Planned", quarter: "Q2", year: 2027, slug: "biodiversity-nft", dependsOn: ["Climate OS"] },
  { name: "DAO Governance v2", category: "Governance & Compliance", status: "Planned", quarter: "Q2", year: 2027, slug: "dao-governance-v2" },
];

const timelineGroups = [
  { label: "Q1 2026", quarter: "Q1", year: 2026, status: "Live" as const },
  { label: "Q2 2026", quarter: "Q2", year: 2026, status: "Live" as const },
  { label: "Q3 2026", quarter: "Q3", year: 2026, status: "In Progress" as const },
  { label: "Q4 2026", quarter: "Q4", year: 2026, status: "In Progress" as const },
  { label: "Q1 2027", quarter: "Q1", year: 2027, status: "Planned" as const },
  { label: "Q2 2027", quarter: "Q2", year: 2027, status: "Planned" as const },
];

const categoryGroups = [
  "Platform Infrastructure",
  "Trading & Finance",
  "Intelligence & AI",
  "Verification & Trust",
  "Governance & Compliance",
  "Community & Social",
  "Developer Experience",
];

const dependencyData = roadmapItems
  .filter((i) => i.dependsOn && i.dependsOn.length > 0)
  .flatMap((i) => (i.dependsOn ?? []).map((dep) => ({ feature: i.name, requires: dep, featureStatus: i.status })));

const completionData = [
  { quarter: "Q1 '26", shipped: 6, planned: 6 },
  { quarter: "Q2 '26", shipped: 5, planned: 5 },
  { quarter: "Q3 '26", shipped: 0, planned: 6 },
  { quarter: "Q4 '26", shipped: 0, planned: 5 },
  { quarter: "Q1 '27", shipped: 0, planned: 4 },
  { quarter: "Q2 '27", shipped: 0, planned: 4 },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

function statusColor(status: RoadmapItem["status"]) {
  switch (status) {
    case "Live":        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "In Progress": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "Beta":        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "Planned":     return "bg-slate-500/20 text-slate-400 border-slate-500/30";
  }
}

function statusDot(status: RoadmapItem["status"]) {
  switch (status) {
    case "Live":        return "bg-emerald-400";
    case "In Progress": return "bg-blue-400";
    case "Beta":        return "bg-amber-400";
    case "Planned":     return "bg-slate-500";
  }
}

function categoryColor(cat: string) {
  const map: Record<string, string> = {
    "Platform Infrastructure": "bg-violet-500/20 text-violet-400 border-violet-500/30",
    "Trading & Finance":        "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "Intelligence & AI":        "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    "Verification & Trust":     "bg-rose-500/20 text-rose-400 border-rose-500/30",
    "Governance & Compliance":  "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "Community & Social":       "bg-pink-500/20 text-pink-400 border-pink-500/30",
    "Developer Experience":     "bg-sky-500/20 text-sky-400 border-sky-500/30",
  };
  return map[cat] ?? "bg-slate-500/20 text-slate-400 border-slate-500/30";
}

const TooltipStyle = {
  contentStyle: { backgroundColor: "#0f172a", border: "1px solid #064e3b", borderRadius: 8 },
  labelStyle: { color: "#6ee7b7" },
  itemStyle: { color: "#a7f3d0" },
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function KpiCard({ label, value, icon: Icon, sub }: { label: string; value: string; icon: React.ElementType; sub?: string }) {
  return (
    <Card className="bg-slate-900/50 border border-emerald-500/20">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-slate-400 mb-1">{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
          </div>
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Icon className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ItemRow({ item, navigate }: { item: RoadmapItem; navigate: ReturnType<typeof useNavigate> }) {
  return (
    <div className="flex items-center gap-3 py-2 group">
      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${statusDot(item.status)}`} />
      <span className="text-sm text-slate-200 flex-1">{item.name}</span>
      <Badge className={`text-xs border ${categoryColor(item.category)} hidden md:inline-flex`}>{item.category}</Badge>
      <Badge className={`text-xs border ${statusColor(item.status)}`}>{item.status}</Badge>
      <button
        onClick={() => navigate(`/features/${item.slug}`)}
        className="text-xs text-emerald-400 hover:text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
      >
        View <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function MasterRoadmap() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<QuarterFilter>("All");

  function filterItems(items: RoadmapItem[]) {
    if (activeFilter === "All") return items;
    return items.filter((i) => i.quarter === activeFilter);
  }

  const filteredGroups = timelineGroups.filter(
    (g) => activeFilter === "All" || g.quarter === activeFilter
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Platform Roadmap 2026–2027</h1>
          <p className="text-slate-400 mt-1">
            Comprehensive feature timeline across all Atlas Sanctum RVE platform pillars
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-slate-400" />
          {quarters.map((q) => (
            <Button
              key={q}
              variant={activeFilter === q ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(q)}
              className={
                activeFilter === q
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white border-0"
                  : "border-emerald-500/30 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/60 bg-transparent"
              }
            >
              {q}
            </Button>
          ))}
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Features Shipped" value="47" icon={CheckCircle2} sub="+6 this quarter" />
        <KpiCard label="In Progress" value="12" icon={Clock} sub="across 2 quarters" />
        <KpiCard label="Planned" value="34" icon={Calendar} sub="through Q2 2027" />
        <KpiCard label="Completion Rate" value="71%" icon={TrendingUp} sub="on-track milestone" />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="bg-slate-900/50 border border-emerald-500/20 flex-wrap h-auto gap-1 p-1">
          {["timeline", "by-category", "by-status", "dependencies"].map((t) => (
            <TabsTrigger
              key={t}
              value={t}
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-slate-400 capitalize"
            >
              {t.replace("-", " ")}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ── Timeline Tab ─────────────────────────────────────────────────────── */}
        <TabsContent value="timeline" className="mt-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Timeline list */}
            <div className="lg:col-span-2 space-y-6">
              {filteredGroups.map((g) => {
                const items = filterItems(
                  roadmapItems.filter((i) => i.quarter === g.quarter && i.year === g.year)
                );
                if (items.length === 0) return null;
                return (
                  <div key={g.label} className="relative pl-6 border-l border-emerald-500/20">
                    <div className="absolute -left-2.5 top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-emerald-500/60 flex items-center justify-center">
                      <span className={`w-2 h-2 rounded-full ${statusDot(g.status)}`} />
                    </div>
                    <div className="mb-3 flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-white">{g.label}</h3>
                      <Badge className={`text-xs border ${statusColor(g.status)}`}>{g.status}</Badge>
                      <span className="text-xs text-slate-500">{items.length} features</span>
                    </div>
                    <Card className="bg-slate-900/50 border border-emerald-500/20">
                      <CardContent className="p-4 divide-y divide-slate-800">
                        {items.map((item) => (
                          <ItemRow key={item.slug} item={item} navigate={navigate} />
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>

            {/* Completion Chart */}
            <div className="space-y-4">
              <Card className="bg-slate-900/50 border border-emerald-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-slate-300">Features per Quarter</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={completionData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                      <XAxis dataKey="quarter" stroke="#6ee7b7" tick={{ fontSize: 10 }} />
                      <YAxis stroke="#6ee7b7" tick={{ fontSize: 10 }} />
                      <Tooltip {...TooltipStyle} />
                      <Bar dataKey="planned" name="Planned" fill="#064e3b" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="shipped" name="Shipped" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border border-emerald-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-slate-300">Legend</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {(["Live", "In Progress", "Beta", "Planned"] as const).map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${statusDot(s)}`} />
                      <span className="text-xs text-slate-400">{s}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ── By Category Tab ──────────────────────────────────────────────────── */}
        <TabsContent value="by-category" className="mt-6">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {categoryGroups.map((cat) => {
              const items = filterItems(roadmapItems.filter((i) => i.category === cat));
              return (
                <Card key={cat} className="bg-slate-900/50 border border-emerald-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span className="text-white">{cat}</span>
                      <Badge className={`text-xs border ${categoryColor(cat)}`}>{items.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1.5">
                    {items.length === 0 && (
                      <p className="text-xs text-slate-500 italic">No features match filter</p>
                    )}
                    {items.map((item) => (
                      <div
                        key={item.slug}
                        className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-slate-800/50 cursor-pointer group"
                        onClick={() => navigate(`/features/${item.slug}`)}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${statusDot(item.status)}`} />
                          <span className="text-xs text-slate-300 truncate">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs text-slate-500">{item.quarter} {item.year}</span>
                          <ArrowRight className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* ── By Status Tab ────────────────────────────────────────────────────── */}
        <TabsContent value="by-status" className="mt-6">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {(["Live", "In Progress", "Beta", "Planned"] as const).map((status) => {
              const items = filterItems(roadmapItems.filter((i) => i.status === status));
              const headerColors: Record<string, string> = {
                Live: "border-emerald-500/40 bg-emerald-500/5",
                "In Progress": "border-blue-500/40 bg-blue-500/5",
                Beta: "border-amber-500/40 bg-amber-500/5",
                Planned: "border-slate-500/40 bg-slate-500/5",
              };
              return (
                <div key={status} className="space-y-2">
                  <div className={`rounded-lg border p-3 ${headerColors[status]}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-white">{status}</span>
                      <Badge className={`text-xs border ${statusColor(status)}`}>{items.length}</Badge>
                    </div>
                    <p className="text-xs text-slate-500">
                      {status === "Live" && "Shipped & production-ready"}
                      {status === "In Progress" && "Active development"}
                      {status === "Beta" && "Limited availability"}
                      {status === "Planned" && "Scheduled for future"}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    {items.length === 0 && (
                      <p className="text-xs text-slate-500 italic text-center py-4">No features</p>
                    )}
                    {items.map((item) => (
                      <div
                        key={item.slug}
                        className="bg-slate-900/50 border border-emerald-500/10 rounded-lg px-3 py-2 cursor-pointer hover:border-emerald-500/30 transition-colors group"
                        onClick={() => navigate(`/features/${item.slug}`)}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span className="text-xs text-slate-200 leading-tight">{item.name}</span>
                          <ArrowRight className="w-3 h-3 text-emerald-500 flex-shrink-0 opacity-0 group-hover:opacity-100 mt-0.5" />
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-xs text-slate-500">{item.quarter} {item.year}</span>
                          <span className="text-slate-700">·</span>
                          <span className="text-xs text-slate-500 truncate">{item.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* ── Dependencies Tab ─────────────────────────────────────────────────── */}
        <TabsContent value="dependencies" className="mt-6">
          <Card className="bg-slate-900/50 border border-emerald-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-emerald-400" />
                Feature Dependency Map
              </CardTitle>
              <p className="text-sm text-slate-400">
                Features that must ship before a dependent feature can launch
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left text-xs text-slate-400 font-medium pb-3 pr-4">Feature</th>
                      <th className="text-left text-xs text-slate-400 font-medium pb-3 pr-4">Status</th>
                      <th className="text-left text-xs text-slate-400 font-medium pb-3 pr-4">Requires</th>
                      <th className="text-left text-xs text-slate-400 font-medium pb-3">Blocker Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {dependencyData
                      .filter((d) => activeFilter === "All" || roadmapItems.find((i) => i.name === d.feature)?.quarter === activeFilter)
                      .map((dep, idx) => {
                        const blocker = roadmapItems.find((i) => i.name === dep.requires);
                        return (
                          <tr key={idx} className="group hover:bg-slate-800/30 transition-colors">
                            <td className="py-3 pr-4">
                              <div className="flex items-center gap-2">
                                <Layers className="w-3.5 h-3.5 text-slate-500" />
                                <span className="text-slate-200">{dep.feature}</span>
                              </div>
                            </td>
                            <td className="py-3 pr-4">
                              <Badge className={`text-xs border ${statusColor(dep.featureStatus)}`}>
                                {dep.featureStatus}
                              </Badge>
                            </td>
                            <td className="py-3 pr-4">
                              <span className="text-slate-400">{dep.requires}</span>
                            </td>
                            <td className="py-3">
                              {blocker ? (
                                <Badge className={`text-xs border ${statusColor(blocker.status)}`}>
                                  {blocker.status}
                                </Badge>
                              ) : (
                                <span className="text-xs text-slate-600">—</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {dependencyData.filter((d) => activeFilter === "All" || roadmapItems.find((i) => i.name === d.feature)?.quarter === activeFilter).length === 0 && (
                  <div className="text-center py-10 text-slate-500 text-sm">
                    No dependency data for the selected filter
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
