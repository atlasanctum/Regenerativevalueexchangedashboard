'use client'

import { useState } from 'react'
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, defs,
} from 'recharts'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs'
import { Card } from '../../ui/card'
import { Button } from '../../ui/button'
import { Badge } from '../../ui/badge'
import {
  TrendingUp, Users, BarChart2, Leaf, DollarSign, Star,
  Download, RefreshCw, Activity, Shield, CheckCircle, AlertCircle,
} from 'lucide-react'

const platformMetrics = [
  { month: 'Jan', tvl: 420, users: 28400, trades: 8400, volume: 142, impact: 8.4 },
  { month: 'Feb', tvl: 487, users: 34200, trades: 9800, volume: 168, impact: 9.8 },
  { month: 'Mar', tvl: 524, users: 41800, trades: 11200, volume: 194, impact: 11.2 },
  { month: 'Apr', tvl: 612, users: 52400, trades: 13400, volume: 231, impact: 13.1 },
  { month: 'May', tvl: 698, users: 63700, trades: 15800, volume: 274, impact: 14.7 },
  { month: 'Jun', tvl: 847, users: 78400, trades: 18200, volume: 312, impact: 16.2 },
]

const assetBreakdown = [
  { name: 'Carbon Credits', value: 58, color: '#10b981' },
  { name: 'Biodiversity', value: 22, color: '#06b6d4' },
  { name: 'Watershed', value: 12, color: '#8b5cf6' },
  { name: 'Blue Carbon', value: 5, color: '#f59e0b' },
  { name: 'Soil Carbon', value: 3, color: '#ec4899' },
]

const engineMetrics = [
  { engine: 'Deal Engine', deals: 847, value: '$284M', success: '91.4%', active: 142 },
  { engine: 'Trust Engine', scores: 12847, avgScore: 8.7, verified: '94.2%', alerts: 23 },
  { engine: 'Treasury Engine', managed: '$412M', yield: '14.7%', strategies: 8, risk: 'Low' },
  { engine: 'Growth Engine', referrals: 8420, conversion: '34.2%', viral: 2.4, ltv: '$1,847' },
  { engine: 'Impact Engine', tokens: 142000, co2e: '16.2M', credits: 847, pipeline: '$124M' },
  { engine: 'Risk Engine', threats: 1247, blocked: 1244, incidents: 3, score: 94 },
  { engine: 'Reputation Engine', staked: '8.4M RVE', validators: 342, avg: 8.9, penalized: 4 },
]

const userSegments = [
  { segment: 'Institutional', users: 847, tvl: '$421M', avgHolding: '$497K', growth: '+18.4%' },
  { segment: 'Corporate ESG', users: 2341, tvl: '$284M', avgHolding: '$121K', growth: '+31.2%' },
  { segment: 'Individual Investor', users: 54200, tvl: '$98M', avgHolding: '$1,847', growth: '+47.8%' },
  { segment: 'NGO / Foundation', users: 421, tvl: '$34M', avgHolding: '$81K', growth: '+12.4%' },
  { segment: 'Developer / API', users: 1847, tvl: '$9M', avgHolding: '$4,872', growth: '+124%' },
]

const engineActivityScores = [
  { engine: 'Deal', score: 91 },
  { engine: 'Trust', score: 94 },
  { engine: 'Treasury', score: 88 },
  { engine: 'Growth', score: 96 },
  { engine: 'Impact', score: 92 },
  { engine: 'Risk', score: 99 },
  { engine: 'Reputation', score: 87 },
]

const assetTableData = [
  { name: 'Carbon Credits', count: '142K', totalValue: '$491M', avgPrice: '$3,458', change: '+12.4%' },
  { name: 'Biodiversity', count: '28K', totalValue: '$186M', avgPrice: '$6,643', change: '+8.7%' },
  { name: 'Watershed', count: '9.4K', totalValue: '$101M', avgPrice: '$10,745', change: '+21.3%' },
  { name: 'Blue Carbon', count: '2.1K', totalValue: '$42M', avgPrice: '$20,000', change: '+34.8%' },
  { name: 'Soil Carbon', count: '1.2K', totalValue: '$25M', avgPrice: '$20,833', change: '+6.2%' },
]

const priceTrendData = [
  { month: 'Jan', carbon: 3100, biodiversity: 5800, watershed: 9200 },
  { month: 'Feb', carbon: 3240, biodiversity: 6100, watershed: 9800 },
  { month: 'Mar', carbon: 3310, biodiversity: 6200, watershed: 10100 },
  { month: 'Apr', carbon: 3380, biodiversity: 6400, watershed: 10400 },
  { month: 'May', carbon: 3420, biodiversity: 6580, watershed: 10600 },
  { month: 'Jun', carbon: 3458, biodiversity: 6643, watershed: 10745 },
]

const healthScoreData = [
  { day: 'Mon', score: 99.92 },
  { day: 'Tue', score: 99.97 },
  { day: 'Wed', score: 99.88 },
  { day: 'Thu', score: 99.97 },
  { day: 'Fri', score: 99.95 },
  { day: 'Sat', score: 99.97 },
  { day: 'Sun', score: 99.97 },
]

const protocolEvents = [
  { time: '2 min ago', event: 'Oracle consensus updated', type: 'info', detail: 'All 42 oracles in sync' },
  { time: '18 min ago', event: 'Smart contract audit completed', type: 'success', detail: 'CarbonVault v2.4 — no issues' },
  { time: '1h ago', event: 'Bridge security check passed', type: 'success', detail: 'Polygon ↔ Ethereum bridge healthy' },
  { time: '3h ago', event: 'Risk Engine blocked 14 suspicious trades', type: 'warning', detail: 'Pattern: wash trading detected' },
  { time: '6h ago', event: 'Treasury rebalance executed', type: 'info', detail: 'Allocated $12M to new yield strategy' },
]

const funnelData = [
  { stage: 'Signed Up', count: 78400, pct: 100 },
  { stage: 'KYC Verified', count: 61200, pct: 78 },
  { stage: 'First Trade', count: 38400, pct: 49 },
  { stage: 'Repeat Trader', count: 24800, pct: 32 },
]

const tooltipStyle = {
  contentStyle: {
    background: '#0f172a',
    border: '1px solid #10b981',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '12px',
  },
}

const chartGrid = <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
const xAxisStyle = { stroke: '#6ee7b7', fontSize: 11 }
const yAxisStyle = { stroke: '#6ee7b7', fontSize: 11 }

export function PlatformAnalytics() {
  const [timeRange, setTimeRange] = useState('30d')

  const kpis = [
    { label: 'Total Value Locked', value: '$847.3B', sub: '+21.4% this month', icon: DollarSign, color: 'text-emerald-400' },
    { label: 'Monthly Active Users', value: '78,400', sub: '+23.1% this month', icon: Users, color: 'text-cyan-400' },
    { label: '24h Trading Volume', value: '$312M', sub: '+14.2% vs yesterday', icon: BarChart2, color: 'text-purple-400' },
    { label: 'Carbon Impact', value: '16.2M tCO₂e', sub: 'Offset this period', icon: Leaf, color: 'text-green-400' },
    { label: 'Platform Revenue', value: '$4.8M', sub: '30d cumulative', icon: TrendingUp, color: 'text-amber-400' },
    { label: 'Net Promoter Score', value: '84', sub: 'Industry avg: 32', icon: Star, color: 'text-pink-400' },
  ]

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Platform Analytics</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-emerald-400">Live · Updated every 30s</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(['7d', '30d', '90d', '1y'] as const).map((r) => (
            <Button
              key={r}
              variant={timeRange === r ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(r)}
              className={
                timeRange === r
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-emerald-500/30 hover:text-emerald-400'
              }
            >
              {r}
            </Button>
          ))}
          <Button
            size="sm"
            className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 ml-2"
          >
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card
              key={kpi.label}
              className="bg-slate-900/50 border border-emerald-500/20 p-4 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{kpi.label}</span>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <div className={`text-xl font-bold text-white`}>{kpi.value}</div>
              <div className="text-xs text-emerald-400">{kpi.sub}</div>
            </Card>
          )
        })}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="growth">
        <TabsList className="bg-slate-900/50 border border-emerald-500/20 w-full flex-wrap h-auto">
          <TabsTrigger value="growth" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 text-slate-400">
            Growth Metrics
          </TabsTrigger>
          <TabsTrigger value="engines" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 text-slate-400">
            Atlas Engines
          </TabsTrigger>
          <TabsTrigger value="assets" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 text-slate-400">
            Asset Analytics
          </TabsTrigger>
          <TabsTrigger value="segments" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 text-slate-400">
            User Segments
          </TabsTrigger>
          <TabsTrigger value="health" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 text-slate-400">
            Protocol Health
          </TabsTrigger>
        </TabsList>

        {/* ───────────────── GROWTH METRICS ───────────────── */}
        <TabsContent value="growth" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* TVL & Volume Area Chart */}
            <Card className="bg-slate-900/50 border border-emerald-500/20 p-5">
              <h3 className="text-white font-semibold mb-4">TVL & Trading Volume</h3>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={platformMetrics}>
                  <defs>
                    <linearGradient id="analyticsGrad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="analyticsGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  {chartGrid}
                  <XAxis dataKey="month" tick={xAxisStyle} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={yAxisStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}B`} />
                  <YAxis yAxisId="right" orientation="right" tick={yAxisStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
                  <Tooltip {...tooltipStyle} />
                  <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="tvl"
                    name="TVL ($B)"
                    stroke="#10b981"
                    fill="url(#analyticsGrad1)"
                    strokeWidth={2}
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="volume"
                    name="Volume ($M)"
                    stroke="#8b5cf6"
                    fill="url(#analyticsGrad2)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Users & Trades Line Chart */}
            <Card className="bg-slate-900/50 border border-emerald-500/20 p-5">
              <h3 className="text-white font-semibold mb-4">Users & Trades</h3>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={platformMetrics}>
                  {chartGrid}
                  <XAxis dataKey="month" tick={xAxisStyle} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={yAxisStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                  <YAxis yAxisId="right" orientation="right" tick={yAxisStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                  <Tooltip {...tooltipStyle} />
                  <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
                  <Line yAxisId="left" type="monotone" dataKey="users" name="Users" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4', r: 3 }} />
                  <Line yAxisId="right" type="monotone" dataKey="trades" name="Trades" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Growth Insight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'TVL grew 101% in 6 months', detail: 'From $420M in January to $847M in June — doubling total value locked on the platform.', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
              { title: 'User base doubled', detail: 'Monthly active users grew from 28,400 to 78,400 — a 176% increase driven by institutional onboarding.', icon: Users, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
              { title: 'Impact +93% YTD', detail: 'Carbon impact rose from 8.4M to 16.2M tCO₂e, reflecting accelerating real-world asset tokenization.', icon: Leaf, color: 'text-green-400', bg: 'bg-green-500/10' },
            ].map((card) => {
              const Icon = card.icon
              return (
                <Card key={card.title} className="bg-slate-900/50 border border-emerald-500/20 p-5">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${card.bg} mb-3`}>
                    <Icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                  <h4 className="text-white font-semibold mb-1">{card.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{card.detail}</p>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* ───────────────── ATLAS ENGINES ───────────────── */}
        <TabsContent value="engines" className="space-y-6 mt-6">
          <Card className="bg-slate-900/50 border border-emerald-500/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-emerald-500/20">
                    <th className="text-left text-slate-400 font-medium px-4 py-3">Engine</th>
                    <th className="text-left text-slate-400 font-medium px-4 py-3">Metric 1</th>
                    <th className="text-left text-slate-400 font-medium px-4 py-3">Metric 2</th>
                    <th className="text-left text-slate-400 font-medium px-4 py-3">Metric 3</th>
                    <th className="text-left text-slate-400 font-medium px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { engine: 'Deal Engine', m1: '847 deals', m2: '$284M value', m3: '91.4% success', },
                    { engine: 'Trust Engine', m1: '12,847 scores', m2: 'Avg: 8.7/10', m3: '94.2% verified', },
                    { engine: 'Treasury Engine', m1: '$412M managed', m2: '14.7% yield', m3: '8 strategies', },
                    { engine: 'Growth Engine', m1: '8,420 referrals', m2: '34.2% conversion', m3: 'Viral coeff: 2.4', },
                    { engine: 'Impact Engine', m1: '142K tokens', m2: '16.2M tCO₂e', m3: '$124M pipeline', },
                    { engine: 'Risk Engine', m1: '1,247 threats', m2: '1,244 blocked', m3: '3 incidents', },
                    { engine: 'Reputation Engine', m1: '8.4M RVE staked', m2: '342 validators', m3: '4 penalized', },
                  ].map((row, i) => (
                    <tr key={row.engine} className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-800/10'}`}>
                      <td className="px-4 py-3 text-white font-medium">{row.engine}</td>
                      <td className="px-4 py-3 text-slate-300">{row.m1}</td>
                      <td className="px-4 py-3 text-slate-300">{row.m2}</td>
                      <td className="px-4 py-3 text-slate-300">{row.m3}</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs">
                          Operational
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="bg-slate-900/50 border border-emerald-500/20 p-5">
            <h3 className="text-white font-semibold mb-4">Engine Activity Scores</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={engineActivityScores} barSize={36}>
                <defs>
                  <linearGradient id="analyticsGrad3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                {chartGrid}
                <XAxis dataKey="engine" tick={xAxisStyle} axisLine={false} tickLine={false} />
                <YAxis domain={[80, 100]} tick={yAxisStyle} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="score" name="Health Score" fill="url(#analyticsGrad3)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* ───────────────── ASSET ANALYTICS ───────────────── */}
        <TabsContent value="assets" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <Card className="bg-slate-900/50 border border-emerald-500/20 p-5">
              <h3 className="text-white font-semibold mb-4">Asset Type Distribution</h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={assetBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={55}
                    dataKey="value"
                    nameKey="name"
                    paddingAngle={3}
                  >
                    {assetBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip {...tooltipStyle} formatter={(value: number) => [`${value}%`, 'Share']} />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ color: '#94a3b8', fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Asset Table */}
            <Card className="bg-slate-900/50 border border-emerald-500/20 overflow-hidden">
              <div className="px-5 py-4 border-b border-emerald-500/20">
                <h3 className="text-white font-semibold">Asset Metrics</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-emerald-500/10">
                      <th className="text-left text-slate-400 font-medium px-4 py-2">Asset</th>
                      <th className="text-right text-slate-400 font-medium px-4 py-2">Count</th>
                      <th className="text-right text-slate-400 font-medium px-4 py-2">Total Value</th>
                      <th className="text-right text-slate-400 font-medium px-4 py-2">Avg Price</th>
                      <th className="text-right text-slate-400 font-medium px-4 py-2">30d</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetTableData.map((row, i) => (
                      <tr key={row.name} className={`border-b border-slate-800/50 ${i % 2 === 0 ? '' : 'bg-slate-800/10'}`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span
                              className="inline-block w-2 h-2 rounded-full"
                              style={{ background: assetBreakdown.find(a => a.name === row.name)?.color ?? '#10b981' }}
                            />
                            <span className="text-white">{row.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right text-slate-300">{row.count}</td>
                        <td className="px-4 py-3 text-right text-slate-300">{row.totalValue}</td>
                        <td className="px-4 py-3 text-right text-slate-300">{row.avgPrice}</td>
                        <td className="px-4 py-3 text-right text-emerald-400 font-medium">{row.change}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Price Trend Chart */}
          <Card className="bg-slate-900/50 border border-emerald-500/20 p-5">
            <h3 className="text-white font-semibold mb-4">Price Trends — Top 3 Asset Types ($/unit)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={priceTrendData}>
                {chartGrid}
                <XAxis dataKey="month" tick={xAxisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={yAxisStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(1)}K`} />
                <Tooltip {...tooltipStyle} formatter={(value: number) => [`$${value.toLocaleString()}`, '']} />
                <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
                <Line type="monotone" dataKey="carbon" name="Carbon Credits" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 3 }} />
                <Line type="monotone" dataKey="biodiversity" name="Biodiversity" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4', r: 3 }} />
                <Line type="monotone" dataKey="watershed" name="Watershed" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* ───────────────── USER SEGMENTS ───────────────── */}
        <TabsContent value="segments" className="space-y-6 mt-6">
          {/* Bar Chart */}
          <Card className="bg-slate-900/50 border border-emerald-500/20 p-5">
            <h3 className="text-white font-semibold mb-4">Users by Segment</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={userSegments.map(s => ({ name: s.segment.split(' ')[0], users: s.users }))}
                barSize={40}
              >
                <defs>
                  <linearGradient id="analyticsGrad4" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                {chartGrid}
                <XAxis dataKey="name" tick={xAxisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={yAxisStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip {...tooltipStyle} formatter={(value: number) => [value.toLocaleString(), 'Users']} />
                <Bar dataKey="users" name="Users" fill="url(#analyticsGrad4)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Segments Table */}
          <Card className="bg-slate-900/50 border border-emerald-500/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-emerald-500/20">
                    <th className="text-left text-slate-400 font-medium px-4 py-3">Segment</th>
                    <th className="text-right text-slate-400 font-medium px-4 py-3">Users</th>
                    <th className="text-right text-slate-400 font-medium px-4 py-3">TVL</th>
                    <th className="text-right text-slate-400 font-medium px-4 py-3">Avg Holding</th>
                    <th className="text-right text-slate-400 font-medium px-4 py-3">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {userSegments.map((row, i) => (
                    <tr key={row.segment} className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-800/10'}`}>
                      <td className="px-4 py-3 text-white font-medium">{row.segment}</td>
                      <td className="px-4 py-3 text-right text-slate-300">{row.users.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-slate-300">{row.tvl}</td>
                      <td className="px-4 py-3 text-right text-slate-300">{row.avgHolding}</td>
                      <td className="px-4 py-3 text-right text-emerald-400 font-medium">{row.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* User Funnel */}
          <Card className="bg-slate-900/50 border border-emerald-500/20 p-5">
            <h3 className="text-white font-semibold mb-5">User Conversion Funnel</h3>
            <div className="space-y-4">
              {funnelData.map((f, i) => {
                const colors = ['bg-emerald-500', 'bg-cyan-500', 'bg-purple-500', 'bg-amber-500']
                return (
                  <div key={f.stage} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{f.stage}</span>
                      <span className="text-white font-medium">{f.count.toLocaleString()} <span className="text-slate-400 font-normal">({f.pct}%)</span></span>
                    </div>
                    <div className="h-7 bg-slate-800/60 rounded-md overflow-hidden">
                      <div
                        className={`h-full ${colors[i]} opacity-80 rounded-md transition-all duration-700 flex items-center pl-3`}
                        style={{ width: `${f.pct}%` }}
                      >
                        <span className="text-white text-xs font-semibold">{f.pct}%</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </TabsContent>

        {/* ───────────────── PROTOCOL HEALTH ───────────────── */}
        <TabsContent value="health" className="space-y-6 mt-6">
          {/* Health Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Uptime', value: '99.97%', sub: '30-day rolling', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
              { label: 'Oracle Consensus', value: '99.84%', sub: '42/42 oracles live', icon: RefreshCw, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
              { label: 'Smart Contract Audits', value: '12 / 12', sub: 'All contracts audited', icon: Shield, color: 'text-purple-400', bg: 'bg-purple-500/10' },
              { label: 'Bridge Security', value: 'A+', sub: 'CertiK rating', icon: CheckCircle, color: 'text-amber-400', bg: 'bg-amber-500/10' },
            ].map((card) => {
              const Icon = card.icon
              return (
                <Card key={card.label} className="bg-slate-900/50 border border-emerald-500/20 p-5">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${card.bg} mb-3`}>
                    <Icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{card.value}</div>
                  <div className="text-xs text-slate-400">{card.label}</div>
                  <div className="text-xs text-emerald-400 mt-1">{card.sub}</div>
                </Card>
              )
            })}
          </div>

          {/* Health Score Line Chart */}
          <Card className="bg-slate-900/50 border border-emerald-500/20 p-5">
            <h3 className="text-white font-semibold mb-4">Protocol Health Score — Last 7 Days</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={healthScoreData}>
                <defs>
                  <linearGradient id="analyticsGrad5" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                {chartGrid}
                <XAxis dataKey="day" tick={xAxisStyle} axisLine={false} tickLine={false} />
                <YAxis domain={[99.8, 100]} tick={yAxisStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip {...tooltipStyle} formatter={(value: number) => [`${value}%`, 'Health Score']} />
                <Line
                  type="monotone"
                  dataKey="score"
                  name="Health Score"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ fill: '#10b981', r: 4, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Event Log */}
          <Card className="bg-slate-900/50 border border-emerald-500/20 p-5">
            <h3 className="text-white font-semibold mb-4">Recent Protocol Events</h3>
            <div className="space-y-3">
              {protocolEvents.map((ev, i) => {
                const typeMap: Record<string, { icon: typeof CheckCircle; color: string; bg: string }> = {
                  success: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                  info: { icon: Activity, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                  warning: { icon: AlertCircle, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                }
                const t = typeMap[ev.type] ?? typeMap.info
                const Icon = t.icon
                return (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-700/30">
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${t.bg} shrink-0 mt-0.5`}>
                      <Icon className={`w-4 h-4 ${t.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-white text-sm font-medium">{ev.event}</span>
                        <span className="text-slate-500 text-xs shrink-0">{ev.time}</span>
                      </div>
                      <p className="text-slate-400 text-xs mt-0.5">{ev.detail}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
