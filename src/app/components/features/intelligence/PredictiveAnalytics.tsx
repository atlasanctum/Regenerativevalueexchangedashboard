import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Activity, TrendingUp, TrendingDown, AlertTriangle, Brain, Globe, Leaf, BarChart3 } from 'lucide-react';

const projectionData = [
  { month: 'Jan 26', actual: 24.2, p50: 24.2, p10: 24.2, p90: 24.2 },
  { month: 'Feb 26', actual: 25.8, p50: 25.8, p10: 25.8, p90: 25.8 },
  { month: 'Mar 26', actual: 27.1, p50: 27.1, p10: 27.1, p90: 27.1 },
  { month: 'Apr 26', actual: 28.4, p50: 28.4, p10: 28.4, p90: 28.4 },
  { month: 'May 26', actual: 29.7, p50: 29.7, p10: 29.7, p90: 29.7 },
  { month: 'Jun 26', actual: 31.2, p50: 31.2, p10: 31.2, p90: 31.2 },
  { month: 'Jul 26', actual: null, p50: 33.1, p10: 29.8, p90: 36.4 },
  { month: 'Aug 26', actual: null, p50: 35.4, p10: 30.9, p90: 39.8 },
  { month: 'Sep 26', actual: null, p50: 37.8, p10: 32.1, p90: 43.2 },
  { month: 'Oct 26', actual: null, p50: 40.2, p10: 33.4, p90: 47.1 },
  { month: 'Nov 26', actual: null, p50: 42.7, p10: 34.8, p90: 51.0 },
  { month: 'Dec 26', actual: null, p50: 45.3, p10: 36.2, p90: 55.2 },
];

const scenarios = [
  { name: 'Base Case', cagr: '+28.4%', driver: 'Steady policy adoption, moderate demand', confidence: 72, color: '#10b981' },
  { name: 'Bull Case', cagr: '+47.2%', driver: 'Carbon tax legislation + institutional mandates', confidence: 21, color: '#06b6d4' },
  { name: 'Bear Case', cagr: '+8.1%', driver: 'Economic slowdown, regulatory delay', confidence: 7, color: '#f59e0b' },
];

const ecosystemForecasts = [
  { ecosystem: 'Mangrove Carbon', current: '$31.20', forecast12m: '$45.30', upside: '+45.5%', confidence: 'High', risk: 'Low' },
  { ecosystem: 'Biodiversity Credits', current: '$47.80', forecast12m: '$68.20', upside: '+42.7%', confidence: 'Medium', risk: 'Medium' },
  { ecosystem: 'Watershed Services', current: '$21.30', forecast12m: '$28.40', upside: '+33.3%', confidence: 'High', risk: 'Low' },
  { ecosystem: 'Cultural Heritage', current: '$63.40', forecast12m: '$94.10', upside: '+48.4%', confidence: 'Medium', risk: 'High' },
  { ecosystem: 'Agroforestry Carbon', current: '$37.40', forecast12m: '$51.80', upside: '+38.5%', confidence: 'High', risk: 'Low' },
];

const earlyWarnings = [
  { signal: 'Deforestation Risk', region: 'Eastern Amazon', severity: 'High', probability: 78, action: 'Review holdings in affected projects' },
  { signal: 'Drought Stress', region: 'SE Australia', severity: 'Medium', probability: 54, action: 'Monitor soil carbon credits' },
  { signal: 'Policy Tailwind', region: 'EU Carbon Market', severity: 'Opportunity', probability: 89, action: 'Consider increasing EU-linked exposure' },
  { signal: 'Species Stress', region: 'Borneo Rainforest', severity: 'High', probability: 67, action: 'Verify Borneo biodiversity credit status' },
];

export function PredictiveAnalytics() {
  const [horizon, setHorizon] = useState('12m');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Predictive Impact Analytics</h2>
          <p className="text-emerald-300/70">ML-powered forecasting of ecosystem health trajectories and market pricing</p>
        </div>
        <div className="flex gap-2">
          {['3m', '6m', '12m', '3y'].map((h) => (
            <button
              key={h}
              onClick={() => setHorizon(h)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${horizon === h ? 'bg-emerald-600 text-white' : 'text-emerald-300/60 hover:text-emerald-300 border border-emerald-500/20'}`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Model Confidence */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Model Accuracy', value: '89.4%', sub: 'Backtest vs actuals', icon: Brain },
          { label: 'Data Points', value: '2.4M', sub: 'Training dataset', icon: BarChart3 },
          { label: 'Signals Active', value: '147', sub: 'Environmental + market', icon: Activity },
          { label: 'Alert Warnings', value: '4', sub: '2 high severity', icon: AlertTriangle },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-400 text-xs">{s.label}</span>
                <Icon className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-white text-xl font-bold">{s.value}</div>
              <div className="text-emerald-300/50 text-xs mt-1">{s.sub}</div>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="forecast">
        <TabsList className="bg-slate-800/60 border border-emerald-500/20">
          <TabsTrigger value="forecast" className="data-[state=active]:bg-emerald-600">Price Forecast</TabsTrigger>
          <TabsTrigger value="scenarios" className="data-[state=active]:bg-emerald-600">Scenario Analysis</TabsTrigger>
          <TabsTrigger value="ecosystem" className="data-[state=active]:bg-emerald-600">Ecosystem Forecasts</TabsTrigger>
          <TabsTrigger value="warnings" className="data-[state=active]:bg-emerald-600">Early Warnings</TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-sm">Carbon Credit Price Projection (P10 / P50 / P90)</h3>
              <div className="flex gap-3 text-xs">
                <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-emerald-400" /><span className="text-emerald-300/70">Actual</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-cyan-400" /><span className="text-emerald-300/70">P50 (Median)</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-1 bg-cyan-400/20 rounded" /><span className="text-emerald-300/70">P10-P90 Range</span></div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={projectionData}>
                <defs>
                  <linearGradient id="rangeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                <XAxis dataKey="month" stroke="#6ee7b7" fontSize={11} />
                <YAxis stroke="#6ee7b7" fontSize={11} tickFormatter={(v) => `$${v}`} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} formatter={(v: number) => [`$${v?.toFixed(2)}`, '']} />
                <ReferenceLine x="Jul 26" stroke="#6ee7b7" strokeDasharray="4 4" label={{ value: 'Forecast', fill: '#6ee7b7', fontSize: 11 }} />
                <Area type="monotone" dataKey="p90" stroke="transparent" fill="url(#rangeGrad)" name="90th Pctl" />
                <Area type="monotone" dataKey="p10" stroke="transparent" fill="#0f172a" name="10th Pctl" />
                <Line type="monotone" dataKey="p50" stroke="#06b6d4" strokeDasharray="5 5" dot={false} name="P50 Forecast" strokeWidth={2} />
                <Line type="monotone" dataKey="actual" stroke="#10b981" dot={false} name="Actual" strokeWidth={2} connectNulls={false} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="mt-4 space-y-4">
          {scenarios.map((s) => (
            <Card key={s.name} className="bg-slate-900/50 border-emerald-500/20 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                  <h4 className="text-white font-semibold">{s.name}</h4>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="text-xs border-0" style={{ backgroundColor: s.color + '33', color: s.color }}>CAGR {s.cagr}</Badge>
                  <span className="text-emerald-300/60 text-xs">Probability: {s.confidence}%</span>
                </div>
              </div>
              <p className="text-emerald-300/70 text-sm mb-3">{s.driver}</p>
              <div className="w-full bg-slate-700/40 rounded-full h-2">
                <div className="rounded-full h-2 transition-all" style={{ width: `${s.confidence}%`, backgroundColor: s.color }} />
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="ecosystem" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <h3 className="text-white font-semibold text-sm mb-4">12-Month Price Forecasts by Ecosystem</h3>
            <div className="space-y-3">
              {ecosystemForecasts.map((e) => (
                <div key={e.ecosystem} className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Leaf className="w-4 h-4 text-emerald-400" />
                    <span className="text-white text-sm">{e.ecosystem}</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-right">
                      <div className="text-emerald-300/50 text-xs">Current</div>
                      <div className="text-white">{e.current}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-300/50 text-xs">12M Target</div>
                      <div className="text-white">{e.forecast12m}</div>
                    </div>
                    <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">{e.upside}</Badge>
                    <Badge className={`border-0 text-xs ${e.risk === 'Low' ? 'bg-emerald-400/20 text-emerald-300' : e.risk === 'Medium' ? 'bg-amber-400/20 text-amber-300' : 'bg-rose-400/20 text-rose-300'}`}>
                      {e.risk} Risk
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="warnings" className="mt-4 space-y-3">
          {earlyWarnings.map((w, i) => (
            <Card key={i} className={`border p-4 ${w.severity === 'High' ? 'bg-rose-900/20 border-rose-500/30' : w.severity === 'Opportunity' ? 'bg-emerald-900/20 border-emerald-500/30' : 'bg-amber-900/20 border-amber-500/30'}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`w-5 h-5 mt-0.5 ${w.severity === 'High' ? 'text-rose-400' : w.severity === 'Opportunity' ? 'text-emerald-400' : 'text-amber-400'}`} />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium text-sm">{w.signal}</span>
                      <Badge className={`border-0 text-xs ${w.severity === 'High' ? 'bg-rose-400/20 text-rose-300' : w.severity === 'Opportunity' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-amber-400/20 text-amber-300'}`}>
                        {w.severity}
                      </Badge>
                    </div>
                    <div className="text-emerald-300/60 text-xs mb-2">Region: {w.region}</div>
                    <div className="text-emerald-300/80 text-xs">→ {w.action}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-300/50 text-xs mb-1">Probability</div>
                  <div className="text-white font-bold">{w.probability}%</div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
