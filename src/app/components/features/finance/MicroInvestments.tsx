import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Users, Leaf, Repeat, Plus, Smartphone, Shield } from 'lucide-react';

const opportunities = [
  { id: 'mi1', name: 'Amazon Mangrove Fractional', type: 'Carbon', region: 'Brazil', minInvest: '$10', apy: '+24.1%', raised: '$847K', target: '$2M', investors: 847, progress: 42, verified: 'Gold Standard' },
  { id: 'mi2', name: 'Cloud Forest Micro-Share', type: 'Biodiversity', region: 'Colombia', minInvest: '$10', apy: '+31.4%', raised: '$423K', target: '$1M', investors: 1247, progress: 42, verified: 'Plan Vivo' },
  { id: 'mi3', name: 'Coral Reef Nano-Investment', type: 'Marine Carbon', region: 'Australia', minInvest: '$25', apy: '+18.7%', raised: '$1.2M', target: '$2.5M', investors: 2847, progress: 48, verified: 'VCS' },
  { id: 'mi4', name: 'Prairie Restoration Unit', type: 'Soil Carbon', region: 'USA', minInvest: '$10', apy: '+16.2%', raised: '$234K', target: '$500K', investors: 523, progress: 47, verified: 'ACR' },
];

const growthData = [
  { month: 'Jan', value: 1000 },
  { month: 'Feb', value: 1180 },
  { month: 'Mar', value: 1290 },
  { month: 'Apr', value: 1420 },
  { month: 'May', value: 1590 },
  { month: 'Jun', value: 1780 },
];

const recurringOptions = ['Weekly', 'Monthly', 'Quarterly'];

export function MicroInvestments() {
  const [selected, setSelected] = useState(opportunities[0]);
  const [amount, setAmount] = useState('50');
  const [recurring, setRecurring] = useState('Monthly');
  const [roundUp, setRoundUp] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Micro-Investments</h2>
          <p className="text-emerald-300/70">Fractional ownership of regenerative assets from as little as $10 — no transaction fees</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile App
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            Quick Invest
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Micro-Invested', value: '$2.7M', sub: '+22.4% this month', icon: DollarSign },
          { label: 'Active Investors', value: '5,464', sub: 'Growing community', icon: Users },
          { label: 'Avg Investment', value: '$127', sub: 'Per investor', icon: TrendingUp },
          { label: 'Projects Funded', value: '48', sub: 'Via micro-shares', icon: Leaf },
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
          {opportunities.map((opp) => (
            <button
              key={opp.id}
              onClick={() => setSelected(opp)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${selected.id === opp.id ? 'bg-emerald-400/15 border-emerald-500/40' : 'bg-slate-900/50 border-emerald-500/20 hover:border-emerald-500/30'}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-white font-semibold text-sm">{opp.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge className="bg-slate-700/50 text-slate-300 border-0 text-xs">{opp.type}</Badge>
                    <span className="text-emerald-300/50 text-xs">{opp.region}</span>
                    <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">{opp.verified}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-bold">{opp.apy}</div>
                  <div className="text-emerald-300/50 text-xs">from {opp.minInvest}</div>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-emerald-300/50">
                  <span>{opp.raised} raised of {opp.target}</span>
                  <span>{opp.investors.toLocaleString()} investors · {opp.progress}%</span>
                </div>
                <div className="w-full bg-slate-700/40 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full h-1.5" style={{ width: `${opp.progress}%` }} />
                </div>
              </div>
            </button>
          ))}

          <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
            <h3 className="text-white text-sm font-semibold mb-3">Portfolio Growth Simulation (starting $1,000)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="microGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                <XAxis dataKey="month" stroke="#6ee7b7" fontSize={11} />
                <YAxis stroke="#6ee7b7" fontSize={11} tickFormatter={(v) => `$${v}`} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} formatter={(v: number) => [`$${v}`, '']} />
                <Area type="monotone" dataKey="value" stroke="#10b981" fill="url(#microGrad)" name="Portfolio Value" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="bg-slate-900/50 border-emerald-500/20 p-5 h-fit">
          <h3 className="text-white font-semibold text-sm mb-4">Invest in {selected.name.split(' ').slice(0, 2).join(' ')}</h3>
          <div className="space-y-4">
            <div className="bg-emerald-400/10 rounded-lg p-3 border border-emerald-500/20">
              <div className="text-white font-medium text-sm">{selected.name}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-emerald-400 font-bold text-sm">{selected.apy}</span>
                <span className="text-emerald-300/50 text-xs">· Min {selected.minInvest}</span>
              </div>
            </div>

            <div>
              <label className="text-emerald-300/60 text-xs mb-1 block">Amount (USD)</label>
              <div className="grid grid-cols-4 gap-1 mb-2">
                {['10', '25', '50', '100'].map((a) => (
                  <button
                    key={a}
                    onClick={() => setAmount(a)}
                    className={`py-1.5 rounded text-xs transition-all ${amount === a ? 'bg-emerald-600 text-white' : 'bg-slate-700/40 text-slate-400'}`}
                  >
                    ${a}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <div>
              <label className="text-emerald-300/60 text-xs mb-1.5 block flex items-center gap-2">
                <Repeat className="w-3 h-3" />
                Recurring Investment
              </label>
              <div className="grid grid-cols-3 gap-1">
                {recurringOptions.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRecurring(r)}
                    className={`py-1.5 rounded text-xs transition-all ${recurring === r ? 'bg-emerald-600 text-white' : 'bg-slate-700/40 text-slate-400'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div
              onClick={() => setRoundUp(!roundUp)}
              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${roundUp ? 'bg-emerald-400/10 border-emerald-500/30' : 'border-slate-700/30'}`}
            >
              <div>
                <div className="text-white text-xs font-medium">Round-Up Contributions</div>
                <div className="text-emerald-300/50 text-xs">Invest spare change from transactions</div>
              </div>
              <div className={`w-10 h-5 rounded-full transition-colors relative ${roundUp ? 'bg-emerald-600' : 'bg-slate-700'}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${roundUp ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
            </div>

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-emerald-300/60">
                <span>Platform Fee</span>
                <span className="text-emerald-400">$0.00 (Free)</span>
              </div>
              <div className="flex justify-between text-emerald-300/60">
                <span>Est. Annual Return</span>
                <span className="text-emerald-400">${(Number(amount) * parseFloat(selected.apy) / 100).toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Invest ${amount} Now
            </Button>
            <div className="flex items-center gap-2 text-xs text-emerald-300/50">
              <Shield className="w-3 h-3 text-emerald-400" />
              No transaction fees · Fractional ownership
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
