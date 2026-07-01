import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { DollarSign, TrendingUp, Leaf, Globe, Clock, Download, Calculator } from 'lucide-react';

const assetOptions = ['Carbon Credits', 'Biodiversity Credits', 'Watershed Services', 'Cultural Heritage Tokens', 'Agroforestry Carbon'];

const returnProjections = (investment: number, years: number, assetType: string) => {
  const rates: Record<string, number> = {
    'Carbon Credits': 0.284,
    'Biodiversity Credits': 0.312,
    'Watershed Services': 0.198,
    'Cultural Heritage Tokens': 0.347,
    'Agroforestry Carbon': 0.263,
  };
  const rate = rates[assetType] || 0.28;
  return Array.from({ length: years + 1 }, (_, i) => ({
    year: `Y${i}`,
    financial: Math.round(investment * Math.pow(1 + rate, i)),
    ecological: Math.round(investment * Math.pow(1 + rate * 1.15, i)),
    social: Math.round(investment * Math.pow(1 + rate * 0.85, i)),
  }));
};

const portfolioOptimizations = [
  { allocation: 'Conservative', carbon: 60, biodiversity: 25, watershed: 15, expectedReturn: '+18.4%', risk: 'Low', sharpe: 1.82 },
  { allocation: 'Balanced', carbon: 40, biodiversity: 35, watershed: 15, cultural: 10, expectedReturn: '+25.7%', risk: 'Medium', sharpe: 2.14 },
  { allocation: 'Growth', carbon: 30, biodiversity: 40, cultural: 20, watershed: 10, expectedReturn: '+34.2%', risk: 'Medium-High', sharpe: 1.97 },
  { allocation: 'Aggressive', carbon: 20, biodiversity: 45, cultural: 25, watershed: 10, expectedReturn: '+42.8%', risk: 'High', sharpe: 1.73 },
];

export function ROICalculator() {
  const [investment, setInvestment] = useState(10000);
  const [years, setYears] = useState(5);
  const [asset, setAsset] = useState('Carbon Credits');
  const [riskTolerance, setRiskTolerance] = useState('Balanced');

  const data = returnProjections(investment, years, asset);
  const finalRow = data[data.length - 1];
  const financialROI = (((finalRow.financial - investment) / investment) * 100).toFixed(1);
  const ecologicalROI = (((finalRow.ecological - investment) / investment) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">ROI Calculator</h2>
          <p className="text-emerald-300/70">Project financial and ecological returns across multiple time horizons</p>
        </div>
        <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
          <Download className="w-4 h-4 mr-2" />
          Export Analysis
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Input Panel */}
        <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-4 h-4 text-emerald-400" />
            <h3 className="text-white font-semibold text-sm">Investment Parameters</h3>
          </div>
          <div className="space-y-5">
            <div>
              <label className="text-emerald-300/60 text-xs mb-2 block">Investment Amount (USD)</label>
              <input
                type="range"
                min={1000}
                max={1000000}
                step={1000}
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="flex justify-between text-xs mt-1">
                <span className="text-emerald-300/50">$1K</span>
                <span className="text-white font-bold">${investment.toLocaleString()}</span>
                <span className="text-emerald-300/50">$1M</span>
              </div>
            </div>

            <div>
              <label className="text-emerald-300/60 text-xs mb-2 block">Time Horizon</label>
              <div className="grid grid-cols-4 gap-1">
                {[1, 3, 5, 10].map((y) => (
                  <button
                    key={y}
                    onClick={() => setYears(y)}
                    className={`py-1.5 rounded-lg text-xs transition-all ${years === y ? 'bg-emerald-600 text-white' : 'bg-slate-700/40 text-slate-400 hover:bg-slate-700/60'}`}
                  >
                    {y}Y
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-emerald-300/60 text-xs mb-2 block">Asset Class</label>
              <select
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
                className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50"
              >
                {assetOptions.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            <div>
              <label className="text-emerald-300/60 text-xs mb-2 block">Risk Tolerance</label>
              <div className="grid grid-cols-2 gap-1">
                {['Conservative', 'Balanced', 'Growth', 'Aggressive'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRiskTolerance(r)}
                    className={`py-1.5 rounded-lg text-xs transition-all ${riskTolerance === r ? 'bg-emerald-600 text-white' : 'bg-slate-700/40 text-slate-400 hover:bg-slate-700/60'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="md:col-span-2 space-y-4">
          {/* ROI Summary */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Financial ROI', value: `+${financialROI}%`, sub: `$${(finalRow.financial - investment).toLocaleString()} profit`, icon: DollarSign, color: 'text-emerald-400' },
              { label: 'Ecological ROI', value: `+${ecologicalROI}%`, sub: 'Ecosystem value created', icon: Leaf, color: 'text-cyan-400' },
              { label: 'Social Impact', value: `+${(Number(ecologicalROI) * 0.74).toFixed(1)}%`, sub: 'Community benefit score', icon: Globe, color: 'text-purple-400' },
            ].map((r) => {
              const Icon = r.icon;
              return (
                <Card key={r.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-300/60 text-xs">{r.label}</span>
                    <Icon className={`w-4 h-4 ${r.color}`} />
                  </div>
                  <div className={`text-2xl font-bold ${r.color}`}>{r.value}</div>
                  <div className="text-emerald-300/50 text-xs mt-1">{r.sub}</div>
                </Card>
              );
            })}
          </div>

          {/* Chart */}
          <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
            <h3 className="text-white text-sm font-semibold mb-4">Projected Returns Over {years} Year{years > 1 ? 's' : ''}</h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="finGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ecoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                <XAxis dataKey="year" stroke="#6ee7b7" fontSize={11} />
                <YAxis stroke="#6ee7b7" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
                <Area type="monotone" dataKey="ecological" stroke="#06b6d4" fill="url(#ecoGrad)" name="Ecological Value" />
                <Area type="monotone" dataKey="financial" stroke="#10b981" fill="url(#finGrad)" name="Financial Return" />
                <Line type="monotone" dataKey="social" stroke="#8b5cf6" dot={false} name="Social Return" strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Portfolio Optimizations */}
          <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
            <h3 className="text-white text-sm font-semibold mb-3">Portfolio Optimization Options</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {portfolioOptimizations.map((opt) => (
                <div
                  key={opt.allocation}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${riskTolerance === opt.allocation ? 'bg-emerald-400/15 border-emerald-500/40' : 'bg-slate-800/40 border-slate-700/30 hover:border-emerald-500/20'}`}
                  onClick={() => setRiskTolerance(opt.allocation)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm font-medium">{opt.allocation}</span>
                    <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">{opt.expectedReturn}</Badge>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {[
                      { label: 'Carbon', value: opt.carbon, color: '#10b981' },
                      { label: 'Bio', value: opt.biodiversity, color: '#06b6d4' },
                      { label: 'Water', value: opt.watershed, color: '#8b5cf6' },
                    ].map((bar) => (
                      <div key={bar.label} className="flex-1">
                        <div className="text-xs text-center mb-0.5" style={{ color: bar.color }}>{bar.label}</div>
                        <div className="bg-slate-700/40 rounded h-1.5">
                          <div className="rounded h-1.5" style={{ width: `${bar.value}%`, backgroundColor: bar.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-emerald-300/50">
                    <span>Risk: {opt.risk}</span>
                    <span>Sharpe: {opt.sharpe}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
