import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Clock, Shield, Zap, Calendar, Download } from 'lucide-react';

const agreements = [
  { id: 'RSA-001', name: 'Amazon Carbon Revenue Share', ecosystem: 'Carbon Credits', region: 'Brazil', totalValue: '$8.4M', apy: '18.4%', nextDistribution: 'Jul 15, 2026', distributionFreq: 'Quarterly', performance: 'Above Target', health: 97 },
  { id: 'RSA-002', name: 'Coral Reef Ecosystem Services', ecosystem: 'Marine Ecosystem', region: 'Australia', totalValue: '$4.2M', apy: '22.1%', nextDistribution: 'Aug 1, 2026', distributionFreq: 'Monthly', performance: 'On Target', health: 93 },
  { id: 'RSA-003', name: 'Cloud Forest Watershed RSA', ecosystem: 'Watershed Services', region: 'Colombia', totalValue: '$6.1M', apy: '15.7%', nextDistribution: 'Sep 30, 2026', distributionFreq: 'Semi-Annual', performance: 'Above Target', health: 91 },
  { id: 'RSA-004', name: 'Savanna Biodiversity Fund', ecosystem: 'Biodiversity', region: 'Kenya', totalValue: '$2.8M', apy: '19.3%', nextDistribution: 'Oct 15, 2026', distributionFreq: 'Quarterly', performance: 'Below Target', health: 79 },
];

const cashflowData = [
  { month: 'Jan', projected: 142000, actual: 156000 },
  { month: 'Feb', projected: 148000, actual: 162000 },
  { month: 'Mar', projected: 155000, actual: 171000 },
  { month: 'Apr', projected: 162000, actual: 178000 },
  { month: 'May', projected: 169000, actual: 184000 },
  { month: 'Jun', projected: 177000 },
  { month: 'Jul', projected: 185000 },
];

const waterfallStructure = [
  { tier: 'Senior Returns', rate: '8%', priority: 1, allocation: '40%', type: 'Fixed' },
  { tier: 'Mezzanine Returns', rate: '14%', priority: 2, allocation: '35%', type: 'Variable' },
  { tier: 'Impact Premium', rate: '+6% vs target', priority: 3, allocation: '15%', type: 'Performance' },
  { tier: 'Ecosystem Reserve', rate: 'N/A', priority: 4, allocation: '10%', type: 'Reserve' },
];

export function RevenueSharingAgreements() {
  const [selected, setSelected] = useState(agreements[0]);
  const [investAmount, setInvestAmount] = useState('5000');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Revenue Sharing Agreements</h2>
          <p className="text-emerald-300/70">Invest in tokenized future revenue streams from verified ecosystem projects</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <DollarSign className="w-4 h-4 mr-2" />
            Create RSA
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Capital', value: '$21.5M', sub: 'Across 4 RSAs', icon: DollarSign },
          { label: 'Avg APY', value: '18.9%', sub: 'Weighted average', icon: TrendingUp },
          { label: 'Distributions YTD', value: '12', sub: '$2.4M distributed', icon: Calendar },
          { label: 'Next Payout', value: '14 days', sub: 'RSA-001', icon: Clock },
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

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="space-y-3">
            {agreements.map((a) => (
              <button
                key={a.id}
                onClick={() => setSelected(a)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${selected.id === a.id ? 'bg-emerald-400/15 border-emerald-500/40' : 'bg-slate-900/50 border-emerald-500/20 hover:border-emerald-500/30'}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-white font-semibold text-sm">{a.name}</div>
                    <div className="text-emerald-300/60 text-xs mt-0.5">{a.id} · {a.region} · {a.ecosystem}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-400 font-bold">{a.apy} APY</div>
                    <Badge className={`border-0 text-xs mt-1 ${a.performance === 'Above Target' ? 'bg-emerald-400/20 text-emerald-300' : a.performance === 'Below Target' ? 'bg-rose-400/20 text-rose-300' : 'bg-amber-400/20 text-amber-300'}`}>
                      {a.performance}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-xs text-emerald-300/50">
                    <span>Total: {a.totalValue}</span>
                    <span>{a.distributionFreq}</span>
                    <span>Next: {a.nextDistribution}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-700/40 rounded-full h-1.5">
                      <div className={`rounded-full h-1.5 ${a.health > 90 ? 'bg-emerald-500' : a.health > 80 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${a.health}%` }} />
                    </div>
                    <span className="text-xs text-white">{a.health}%</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
            <h3 className="text-white text-sm font-semibold mb-3">Projected vs Actual Cash Flow (USD)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={cashflowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                <XAxis dataKey="month" stroke="#6ee7b7" fontSize={11} />
                <YAxis stroke="#6ee7b7" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} formatter={(v: number) => [`$${v?.toLocaleString()}`, '']} />
                <Bar dataKey="projected" name="Projected" fill="#059669" opacity={0.5} radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Actual" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
            <h3 className="text-white text-sm font-semibold mb-3">Waterfall Distribution Structure</h3>
            <div className="space-y-2">
              {waterfallStructure.map((w) => (
                <div key={w.tier} className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-emerald-400/20 rounded-full flex items-center justify-center text-emerald-400 text-xs font-bold">{w.priority}</div>
                    <div>
                      <div className="text-white text-sm">{w.tier}</div>
                      <div className="text-emerald-300/50 text-xs">{w.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-emerald-400 font-medium">{w.rate}</span>
                    <Badge className="bg-slate-700/50 text-slate-300 border-0 text-xs">{w.allocation}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="bg-slate-900/50 border-emerald-500/20 p-5 h-fit">
          <h3 className="text-white font-semibold text-sm mb-4">Invest in RSA</h3>
          <div className="space-y-4">
            <div className="bg-emerald-400/10 rounded-lg p-3 border border-emerald-500/20">
              <div className="text-emerald-300/60 text-xs">Selected</div>
              <div className="text-white font-medium text-sm mt-0.5">{selected.name}</div>
              <div className="text-emerald-400 font-bold text-sm mt-1">{selected.apy} APY · {selected.distributionFreq}</div>
            </div>

            <div>
              <label className="text-emerald-300/60 text-xs mb-1 block">Amount (USD)</label>
              <input
                type="number"
                value={investAmount}
                onChange={(e) => setInvestAmount(e.target.value)}
                className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-emerald-300/60">
                <span>Annual Yield (est.)</span>
                <span className="text-emerald-400">${(Number(investAmount) * 0.189).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-300/60">
                <span>Next Distribution</span>
                <span className="text-white">{selected.nextDistribution}</span>
              </div>
            </div>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Zap className="w-4 h-4 mr-2" />
              Invest Now
            </Button>
            <div className="flex items-center gap-2 text-xs text-emerald-300/50">
              <Shield className="w-3 h-3 text-emerald-400" />
              Auto-distributed via smart contract
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
