import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import {
  Map, Filter, Download, Globe, Layers, TrendingUp,
  Leaf, Droplets, Wind, AlertTriangle,
} from 'lucide-react';

// ─── Project markers scattered across regions ───────────────────────────────
const projectMarkers = [
  { id: 'BRZ-001', name: 'Amazon Mangrove Carbon',     type: 'Carbon Credit', tco2: '14.2M', x: 22,  y: 60,  color: '#10b981' },
  { id: 'COL-003', name: 'Cloud Forest Watershed',     type: 'Watershed',     tco2: '3.8M',  x: 20,  y: 53,  color: '#22d3ee' },
  { id: 'GHA-009', name: 'West Africa Mangrove',       type: 'Blue Carbon',   tco2: '2.1M',  x: 47,  y: 55,  color: '#14b8a6' },
  { id: 'KEN-012', name: 'Savanna Biodiversity',       type: 'Biodiversity',  tco2: '4.4M',  x: 53,  y: 62,  color: '#3b82f6' },
  { id: 'IND-015', name: 'Western Ghats Forest',       type: 'Carbon Credit', tco2: '6.8M',  x: 66,  y: 52,  color: '#10b981' },
  { id: 'IDN-008', name: 'Borneo Peatland Carbon',     type: 'Carbon Credit', tco2: '9.1M',  x: 74,  y: 62,  color: '#10b981' },
  { id: 'PHI-006', name: 'Coral Triangle BioCredit',   type: 'Biodiversity',  tco2: '1.9M',  x: 79,  y: 58,  color: '#3b82f6' },
  { id: 'AUS-007', name: 'Great Barrier Reef',         type: 'Biodiversity',  tco2: '2.8M',  x: 80,  y: 74,  color: '#3b82f6' },
  { id: 'CHI-002', name: 'Patagonia Soil Carbon',      type: 'Carbon Credit', tco2: '1.4M',  x: 24,  y: 80,  color: '#10b981' },
  { id: 'USA-011', name: 'Prairie Soil Restoration',   type: 'Carbon Credit', tco2: '0.8M',  x: 14,  y: 40,  color: '#10b981' },
  { id: 'NOR-001', name: 'Nordic Boreal Forest',       type: 'Carbon Credit', tco2: '3.2M',  x: 50,  y: 28,  color: '#10b981' },
  { id: 'CAM-004', name: 'Congo Basin REDD+',          type: 'Carbon Credit', tco2: '18.4M', x: 50,  y: 60,  color: '#10b981' },
];

// ─── Regional data ───────────────────────────────────────────────────────────
const regionalData = [
  { region: 'Americas',      projects: 312, area: 840000, carbonImpact: 5.8, biodiversityIndex: 7.4, growth: '+14%' },
  { region: 'Africa',        projects: 187, area: 620000, carbonImpact: 4.2, biodiversityIndex: 8.1, growth: '+22%' },
  { region: 'Asia Pacific',  projects: 248, area: 710000, carbonImpact: 4.9, biodiversityIndex: 7.8, growth: '+18%' },
  { region: 'Europe',        projects: 67,  area: 190000, carbonImpact: 0.9, biodiversityIndex: 5.2, growth: '+6%' },
  { region: 'Global Ocean',  projects: 33,  area: 40000,  carbonImpact: 0.4, biodiversityIndex: 6.9, growth: '+31%' },
];

const regionalBarData = regionalData.map(r => ({ name: r.region, projects: r.projects }));

// ─── Ecosystem types (columns) and geo areas (rows) ─────────────────────────
const ecosystemTypes  = ['Tropical Forest', 'Mangrove', 'Peatland', 'Savanna', 'Coral Reef', 'Grassland'];
const geoAreas        = ['Amazon Basin', 'Congo Basin', 'SE Asia', 'East Africa', 'Pacific Islands', 'South Asia'];

// Carbon density scores 0–100
const heatmapData: number[][] = [
  [95, 82, 74, 55, 38, 42],
  [88, 79, 91, 61, 30, 37],
  [71, 66, 85, 49, 27, 31],
  [58, 53, 68, 88, 43, 67],
  [44, 75, 52, 35, 81, 29],
  [37, 60, 48, 72, 65, 54],
];

const top10Zones = [
  { rank: 1, zone: 'Amazon Basin — Tropical Forest', density: 95, area: '410K ha', co2: '3.9M tCO₂e' },
  { rank: 2, zone: 'Congo Basin — Peatland',         density: 91, area: '380K ha', co2: '3.5M tCO₂e' },
  { rank: 3, zone: 'Congo Basin — Tropical Forest',  density: 88, area: '520K ha', co2: '4.6M tCO₂e' },
  { rank: 4, zone: 'East Africa — Savanna',           density: 88, area: '290K ha', co2: '2.5M tCO₂e' },
  { rank: 5, zone: 'Amazon Basin — Mangrove',         density: 82, area: '180K ha', co2: '1.5M tCO₂e' },
  { rank: 6, zone: 'Pacific Islands — Coral Reef',    density: 81, area: '95K ha',  co2: '0.8M tCO₂e' },
  { rank: 7, zone: 'SE Asia — Peatland',              density: 85, area: '340K ha', co2: '2.9M tCO₂e' },
  { rank: 8, zone: 'SE Asia — Mangrove',              density: 66, area: '220K ha', co2: '1.4M tCO₂e' },
  { rank: 9, zone: 'South Asia — Savanna',            density: 72, area: '260K ha', co2: '1.9M tCO₂e' },
  { rank: 10, zone: 'SE Asia — Tropical Forest',      density: 71, area: '310K ha', co2: '2.2M tCO₂e' },
];

// ─── Coverage gaps ───────────────────────────────────────────────────────────
const gapOpportunities = [
  {
    name: 'Congo Basin', icon: <Leaf className="w-5 h-5 text-emerald-400" />,
    potential: '4.2M tCO₂e/yr', status: 'Under Development',
    statusColor: 'bg-yellow-500/20 text-yellow-300',
    desc: 'Second largest tropical forest on Earth, severely under-represented in voluntary carbon markets. High co-benefit potential for biodiversity.',
    current: 12, gap: 88,
  },
  {
    name: 'Mekong Delta', icon: <Droplets className="w-5 h-5 text-cyan-400" />,
    potential: '2.8M tCO₂e/yr', status: 'Planned',
    statusColor: 'bg-blue-500/20 text-blue-300',
    desc: 'Extensive wetland and mangrove systems with substantial blue carbon sequestration capacity. Regulatory framework being established.',
    current: 5, gap: 95,
  },
  {
    name: 'Central Asia Steppe', icon: <Wind className="w-5 h-5 text-purple-400" />,
    potential: '1.4M tCO₂e/yr', status: 'Prospecting',
    statusColor: 'bg-purple-500/20 text-purple-300',
    desc: 'Vast grassland biome with significant soil carbon sequestration potential. Early-stage feasibility studies underway.',
    current: 3, gap: 97,
  },
];

const gapChartData = [
  { name: 'Congo Basin',          current: 12,  gap: 88  },
  { name: 'Mekong Delta',         current: 5,   gap: 95  },
  { name: 'Central Asia Steppe',  current: 3,   gap: 97  },
  { name: 'Pacific Seagrass',     current: 8,   gap: 92  },
  { name: 'Arctic Permafrost',    current: 2,   gap: 98  },
];

// ─── Recently added projects ─────────────────────────────────────────────────
const recentProjects = [
  { id: 'CAM-014', name: 'Congo Basin REDD+',       region: 'DRC',         type: 'Carbon Credit', area: '520K ha', added: '2 days ago' },
  { id: 'MEX-005', name: 'Yucatan Mangrove Belt',   region: 'Mexico',      type: 'Blue Carbon',   area: '38K ha',  added: '4 days ago' },
  { id: 'VNM-002', name: 'Mekong Delta Wetland',    region: 'Vietnam',     type: 'Watershed',     area: '92K ha',  added: '1 week ago' },
  { id: 'TZA-007', name: 'Serengeti Soil Carbon',   region: 'Tanzania',    type: 'Soil Carbon',   area: '210K ha', added: '1 week ago' },
  { id: 'PNG-003', name: 'Papua New Guinea Forest', region: 'Papua NG',    type: 'Carbon Credit', area: '680K ha', added: '2 weeks ago' },
];

// ─── Color utilities ─────────────────────────────────────────────────────────
function heatColor(v: number): string {
  if (v >= 85) return 'bg-emerald-500';
  if (v >= 70) return 'bg-emerald-600';
  if (v >= 55) return 'bg-emerald-700';
  if (v >= 40) return 'bg-emerald-800';
  if (v >= 25) return 'bg-emerald-900';
  return 'bg-slate-800';
}

function heatTextColor(v: number): string {
  return v >= 55 ? 'text-white' : 'text-slate-300';
}

const barColors = ['#10b981', '#3b82f6', '#22d3ee', '#a78bfa', '#f59e0b'];

// ─── Component ───────────────────────────────────────────────────────────────
export function GeospatialHub() {
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Map className="w-6 h-6 text-emerald-400" />
            Geospatial Intelligence
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Global RVE project mapping, ecosystem analysis, and coverage gap identification
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-slate-700 hover:bg-slate-600 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter by Ecosystem
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Projects Mapped', value: '847', icon: <Map className="w-4 h-4 text-emerald-400" /> },
          { label: 'Countries', value: '47', icon: <Globe className="w-4 h-4 text-emerald-400" /> },
          { label: 'Ecosystem Types', value: '12', icon: <Layers className="w-4 h-4 text-emerald-400" /> },
          { label: 'Total Area', value: '2.4M ha', icon: <TrendingUp className="w-4 h-4 text-emerald-400" /> },
          { label: 'Carbon Impact', value: '16.2M tCO₂e/yr', icon: <Leaf className="w-4 h-4 text-emerald-400" /> },
        ].map(k => (
          <Card key={k.label} className="bg-slate-900/50 border border-emerald-500/20 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-400 text-xs">{k.label}</span>
              {k.icon}
            </div>
            <div className="text-xl font-bold text-white leading-tight">{k.value}</div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="map">
        <TabsList className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-1 gap-1 flex-wrap">
          <TabsTrigger value="map"        className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-slate-400 rounded-lg px-4 py-2 text-sm">Project Map</TabsTrigger>
          <TabsTrigger value="regional"   className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-slate-400 rounded-lg px-4 py-2 text-sm">Regional Analysis</TabsTrigger>
          <TabsTrigger value="heatmap"    className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-slate-400 rounded-lg px-4 py-2 text-sm">Ecosystem Heatmap</TabsTrigger>
          <TabsTrigger value="gaps"       className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-slate-400 rounded-lg px-4 py-2 text-sm">Coverage Gaps</TabsTrigger>
        </TabsList>

        {/* ── PROJECT MAP ── */}
        <TabsContent value="map" className="mt-4 space-y-4">
          <Card className="bg-slate-900/50 border border-emerald-500/20 rounded-xl overflow-hidden">
            {/* SVG world map */}
            <div className="relative w-full" style={{ paddingBottom: '52%' }}>
              {/* Ocean base */}
              <div className="absolute inset-0 bg-slate-800/60 rounded-t-xl" />

              {/* Continent / region blobs using SVG */}
              <svg
                viewBox="0 0 100 52"
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Ocean */}
                <rect width="100" height="52" fill="#0f172a" />

                {/* North America */}
                <path d="M5,15 L22,13 L26,18 L24,30 L18,35 L10,34 L6,28 Z"
                  fill="#1e293b" stroke="#334155" strokeWidth="0.3" />
                {/* Central America narrow */}
                <path d="M18,35 L22,36 L20,42 L17,40 Z"
                  fill="#1e293b" stroke="#334155" strokeWidth="0.3" />
                {/* South America */}
                <path d="M16,42 L28,40 L30,46 L28,52 L20,52 L15,48 Z"
                  fill="#1e293b" stroke="#334155" strokeWidth="0.3" />

                {/* Greenland */}
                <path d="M28,5 L36,4 L37,10 L30,12 Z"
                  fill="#1e293b" stroke="#334155" strokeWidth="0.3" />

                {/* Europe */}
                <path d="M42,12 L52,11 L54,17 L50,20 L44,20 L41,17 Z"
                  fill="#1e293b" stroke="#334155" strokeWidth="0.3" />

                {/* Africa */}
                <path d="M44,22 L54,21 L56,28 L54,38 L50,44 L45,44 L42,36 L42,27 Z"
                  fill="#1e293b" stroke="#334155" strokeWidth="0.3" />

                {/* Middle East */}
                <path d="M55,20 L64,20 L65,26 L56,27 Z"
                  fill="#1e293b" stroke="#334155" strokeWidth="0.3" />

                {/* Asia */}
                <path d="M56,10 L82,8 L85,16 L82,22 L72,24 L63,22 L58,18 Z"
                  fill="#1e293b" stroke="#334155" strokeWidth="0.3" />

                {/* Indian Subcontinent */}
                <path d="M63,22 L70,22 L71,32 L66,35 L62,30 Z"
                  fill="#1e293b" stroke="#334155" strokeWidth="0.3" />

                {/* Southeast Asia */}
                <path d="M72,24 L80,23 L82,30 L78,34 L73,32 Z"
                  fill="#1e293b" stroke="#334155" strokeWidth="0.3" />

                {/* Australia */}
                <path d="M76,38 L86,37 L88,44 L84,48 L77,47 L74,42 Z"
                  fill="#1e293b" stroke="#334155" strokeWidth="0.3" />

                {/* Arctic (simplified top strip) */}
                <rect x="0" y="0" width="100" height="6" fill="#162032" opacity="0.7" rx="2" />

                {/* Region labels */}
                <text x="13" y="25" fill="#475569" fontSize="2" textAnchor="middle" fontFamily="sans-serif">N. America</text>
                <text x="22" y="48" fill="#475569" fontSize="2" textAnchor="middle" fontFamily="sans-serif">S. America</text>
                <text x="47" y="16" fill="#475569" fontSize="2" textAnchor="middle" fontFamily="sans-serif">Europe</text>
                <text x="49" y="33" fill="#475569" fontSize="2" textAnchor="middle" fontFamily="sans-serif">Africa</text>
                <text x="69" y="15" fill="#475569" fontSize="2" textAnchor="middle" fontFamily="sans-serif">Asia</text>
                <text x="76" y="29" fill="#475569" fontSize="1.8" textAnchor="middle" fontFamily="sans-serif">SE Asia</text>
                <text x="81" y="43" fill="#475569" fontSize="2" textAnchor="middle" fontFamily="sans-serif">Australia</text>
                <text x="50" y="3" fill="#475569" fontSize="1.8" textAnchor="middle" fontFamily="sans-serif">Arctic</text>
              </svg>

              {/* Project markers — positioned absolutely as % */}
              {projectMarkers.map(m => (
                <div
                  key={m.id}
                  className="absolute z-10"
                  style={{ left: `${m.x}%`, top: `${m.y}%`, transform: 'translate(-50%, -50%)' }}
                  onMouseEnter={() => setHoveredMarker(m.id)}
                  onMouseLeave={() => setHoveredMarker(null)}
                >
                  {/* Outer pulse ring */}
                  <div
                    className="absolute rounded-full animate-ping opacity-40"
                    style={{ width: 18, height: 18, top: -5, left: -5, backgroundColor: m.color }}
                  />
                  {/* Core dot */}
                  <div
                    className="w-2 h-2 rounded-full border border-white/40 cursor-pointer relative z-10 shadow-lg"
                    style={{ backgroundColor: m.color, boxShadow: `0 0 6px ${m.color}` }}
                  />
                  {/* Tooltip */}
                  {hoveredMarker === m.id && (
                    <div className="absolute z-20 bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 border border-emerald-500/40 rounded-lg px-3 py-2 text-[10px] whitespace-nowrap shadow-xl pointer-events-none">
                      <div className="font-mono text-emerald-400 mb-0.5">{m.id}</div>
                      <div className="text-white font-medium">{m.name}</div>
                      <div className="text-slate-400">{m.type}</div>
                      <div className="text-emerald-400 font-bold mt-0.5">{m.tco2} tCO₂e</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="px-4 py-3 border-t border-emerald-500/10 flex flex-wrap gap-4 items-center">
              <span className="text-xs text-slate-400 mr-1">Legend:</span>
              {[
                { type: 'Carbon Credit',   color: '#10b981' },
                { type: 'Biodiversity',    color: '#3b82f6' },
                { type: 'Watershed',       color: '#22d3ee' },
                { type: 'Blue Carbon',     color: '#14b8a6' },
              ].map(l => (
                <div key={l.type} className="flex items-center gap-1.5 text-xs text-slate-300">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                  {l.type}
                </div>
              ))}
              <div className="ml-auto flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-50 inline-block" />
                Pulsing dots = active projects
              </div>
            </div>
          </Card>

          {/* Recently added */}
          <Card className="bg-slate-900/50 border border-emerald-500/20 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-emerald-500/10">
              <span className="text-sm font-semibold text-white">Recently Added Projects</span>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800">
                  <th className="px-4 py-2.5 text-left font-medium">ID</th>
                  <th className="px-4 py-2.5 text-left font-medium">Name</th>
                  <th className="px-4 py-2.5 text-left font-medium">Region</th>
                  <th className="px-4 py-2.5 text-left font-medium">Type</th>
                  <th className="px-4 py-2.5 text-right font-medium">Area</th>
                  <th className="px-4 py-2.5 text-right font-medium">Added</th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.map(p => (
                  <tr key={p.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                    <td className="px-4 py-2.5 font-mono text-emerald-400">{p.id}</td>
                    <td className="px-4 py-2.5 text-white">{p.name}</td>
                    <td className="px-4 py-2.5 text-slate-300">{p.region}</td>
                    <td className="px-4 py-2.5">
                      <Badge className="text-[10px] px-1.5 py-0 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">{p.type}</Badge>
                    </td>
                    <td className="px-4 py-2.5 text-right text-white">{p.area}</td>
                    <td className="px-4 py-2.5 text-right text-slate-400">{p.added}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </TabsContent>

        {/* ── REGIONAL ANALYSIS ── */}
        <TabsContent value="regional" className="mt-4 space-y-4">
          <Card className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-4">
            <div className="text-sm font-semibold text-white mb-4">Project Count by Region</div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={regionalBarData} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, fontSize: 12 }}
                  cursor={{ fill: 'rgba(16,185,129,0.05)' }}
                />
                <Bar dataKey="projects" radius={[4, 4, 0, 0]} name="Projects">
                  {regionalBarData.map((_, i) => (
                    <Cell key={i} fill={barColors[i % barColors.length]} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="bg-slate-900/50 border border-emerald-500/20 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-emerald-500/10">
              <span className="text-sm font-semibold text-white">Regional Breakdown</span>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800">
                  <th className="px-4 py-2.5 text-left font-medium">Region</th>
                  <th className="px-4 py-2.5 text-right font-medium">Projects</th>
                  <th className="px-4 py-2.5 text-right font-medium">Area (ha)</th>
                  <th className="px-4 py-2.5 text-right font-medium">Carbon Impact (M tCO₂e)</th>
                  <th className="px-4 py-2.5 text-right font-medium">Biodiversity Index</th>
                  <th className="px-4 py-2.5 text-right font-medium">Growth Rate</th>
                </tr>
              </thead>
              <tbody>
                {regionalData.map((r, i) => (
                  <tr key={r.region} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: barColors[i % barColors.length] }} />
                        <span className="text-white">{r.region}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right text-white font-semibold">{r.projects}</td>
                    <td className="px-4 py-2.5 text-right text-slate-300">{r.area.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right text-emerald-400 font-semibold">{r.carbonImpact}</td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 bg-slate-700 rounded-full">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(r.biodiversityIndex / 10) * 100}%` }} />
                        </div>
                        <span className="text-blue-400">{r.biodiversityIndex}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right text-emerald-400 font-semibold">{r.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </TabsContent>

        {/* ── ECOSYSTEM HEATMAP ── */}
        <TabsContent value="heatmap" className="mt-4 space-y-4">
          <Card className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-4">
            <div className="text-sm font-semibold text-white mb-1">Carbon Density Heatmap</div>
            <p className="text-xs text-slate-400 mb-5">Geographic area × Ecosystem type — darker = higher carbon density (tCO₂e / ha)</p>

            <div className="overflow-x-auto">
              <table className="text-xs w-full">
                <thead>
                  <tr>
                    <th className="pr-4 py-2 text-left text-slate-400 font-medium w-32">Area \ Ecosystem</th>
                    {ecosystemTypes.map(e => (
                      <th key={e} className="px-1 py-2 text-center text-slate-400 font-medium whitespace-nowrap">{e}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {geoAreas.map((area, ri) => (
                    <tr key={area}>
                      <td className="pr-4 py-1.5 text-slate-300 font-medium whitespace-nowrap">{area}</td>
                      {heatmapData[ri].map((v, ci) => (
                        <td key={ci} className="px-1 py-1">
                          <div className={`w-full min-w-[72px] h-10 rounded-lg flex items-center justify-center font-bold ${heatColor(v)} ${heatTextColor(v)}`}>
                            {v}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Color scale legend */}
            <div className="flex items-center gap-2 mt-5">
              <span className="text-[10px] text-slate-400">Carbon Density:</span>
              <span className="text-[10px] text-slate-500">Low</span>
              {[
                { label: '< 25', cls: 'bg-slate-800' },
                { label: '25–40', cls: 'bg-emerald-900' },
                { label: '40–55', cls: 'bg-emerald-800' },
                { label: '55–70', cls: 'bg-emerald-700' },
                { label: '70–85', cls: 'bg-emerald-600' },
                { label: '85+',   cls: 'bg-emerald-500' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-1">
                  <div className={`w-5 h-3 rounded ${s.cls}`} />
                  <span className="text-[10px] text-slate-400">{s.label}</span>
                </div>
              ))}
              <span className="text-[10px] text-slate-500">High</span>
            </div>
          </Card>

          {/* Top 10 zones table */}
          <Card className="bg-slate-900/50 border border-emerald-500/20 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-emerald-500/10">
              <span className="text-sm font-semibold text-white">Top 10 Highest Density Zones</span>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800">
                  <th className="px-4 py-2.5 text-left font-medium">#</th>
                  <th className="px-4 py-2.5 text-left font-medium">Zone</th>
                  <th className="px-4 py-2.5 text-right font-medium">Density Score</th>
                  <th className="px-4 py-2.5 text-right font-medium">Area</th>
                  <th className="px-4 py-2.5 text-right font-medium">CO₂e Capacity</th>
                </tr>
              </thead>
              <tbody>
                {top10Zones.map(z => (
                  <tr key={z.rank} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                    <td className="px-4 py-2.5 text-emerald-400 font-bold">{z.rank}</td>
                    <td className="px-4 py-2.5 text-white">{z.zone}</td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-20 h-1.5 bg-slate-700 rounded-full">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${z.density}%` }} />
                        </div>
                        <span className="text-emerald-400 font-semibold">{z.density}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right text-slate-300">{z.area}</td>
                    <td className="px-4 py-2.5 text-right text-emerald-400 font-semibold">{z.co2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </TabsContent>

        {/* ── COVERAGE GAPS ── */}
        <TabsContent value="gaps" className="mt-4 space-y-4">
          {/* Opportunity cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {gapOpportunities.map(g => (
              <Card key={g.name} className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {g.icon}
                    <span className="text-base font-bold text-white">{g.name}</span>
                  </div>
                  <Badge className={`text-[10px] px-2 py-0.5 ${g.statusColor}`}>{g.status}</Badge>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{g.desc}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Potential</span>
                    <span className="text-emerald-400 font-bold">{g.potential}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Current Coverage</span>
                    <span className="text-white">{g.current}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${g.current}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Covered</span>
                    <span className="text-amber-400">{g.gap}% gap remaining</span>
                  </div>
                </div>
                <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white text-xs py-1.5 rounded-lg mt-1 flex items-center justify-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  View Opportunity Report
                </Button>
              </Card>
            ))}
          </div>

          {/* Gap vs coverage chart */}
          <Card className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-4">
            <div className="text-sm font-semibold text-white mb-1">Coverage Gap Analysis</div>
            <p className="text-xs text-slate-400 mb-4">Current coverage vs untapped potential by region</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={gapChartData} margin={{ top: 4, right: 8, bottom: 4, left: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={[0, 100]} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={140} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, fontSize: 12 }}
                  formatter={(v: number, name: string) => [`${v}%`, name === 'current' ? 'Current Coverage' : 'Remaining Gap']}
                />
                <Legend
                  wrapperStyle={{ fontSize: 11, color: '#94a3b8' }}
                  formatter={(v: string) => v === 'current' ? 'Current Coverage' : 'Remaining Gap'}
                />
                <Bar dataKey="current" stackId="a" fill="#10b981" fillOpacity={0.8} radius={[0, 0, 0, 0]} name="current" />
                <Bar dataKey="gap"     stackId="a" fill="#334155" fillOpacity={0.7} radius={[0, 4, 4, 0]} name="gap" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
