import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Lock, Coins, Shield, Zap, Clock, Award, RefreshCw } from 'lucide-react';

const stakingPools = [
  { id: 'p1', name: 'RVE Token Pool', token: 'RVE', apy: '24.7%', lockPeriod: '30 days', totalStaked: '$43.2M', myStaked: '$0', minStake: '$50', autoCompound: true, govRights: true, penalty: '5%' },
  { id: 'p2', name: 'Carbon Credit Pool', token: 'CCR', apy: '18.4%', lockPeriod: '90 days', totalStaked: '$28.7M', myStaked: '$0', minStake: '$100', autoCompound: true, govRights: false, penalty: '10%' },
  { id: 'p3', name: 'Biodiversity Pool', token: 'BIO', apy: '31.2%', lockPeriod: '180 days', totalStaked: '$16.4M', myStaked: '$0', minStake: '$200', autoCompound: false, govRights: true, penalty: '15%' },
  { id: 'p4', name: 'Flexible Staking Pool', token: 'RVE', apy: '12.1%', lockPeriod: 'None', totalStaked: '$8.9M', myStaked: '$0', minStake: '$10', autoCompound: false, govRights: false, penalty: '0%' },
];

const apyHistory = [
  { day: 'Day 1', rve: 22.4, carbon: 17.1, bio: 28.9 },
  { day: 'Day 7', rve: 23.1, carbon: 17.8, bio: 29.4 },
  { day: 'Day 14', rve: 23.8, carbon: 18.1, bio: 30.2 },
  { day: 'Day 21', rve: 24.2, carbon: 18.3, bio: 30.8 },
  { day: 'Day 28', rve: 24.7, carbon: 18.4, bio: 31.2 },
];

export function StakingYield() {
  const [selected, setSelected] = useState(stakingPools[0]);
  const [stakeAmount, setStakeAmount] = useState('500');

  const dailyYield = (Number(stakeAmount) * parseFloat(selected.apy) / 100 / 365).toFixed(2);
  const monthlyYield = (Number(stakeAmount) * parseFloat(selected.apy) / 100 / 12).toFixed(2);
  const annualYield = (Number(stakeAmount) * parseFloat(selected.apy) / 100).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Staking & Yield</h2>
          <p className="text-emerald-300/70">Stake RVE tokens and ecosystem credits to earn protocol fees and governance rewards</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
            <RefreshCw className="w-4 h-4 mr-2" />
            Claim All Rewards
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Coins className="w-4 h-4 mr-2" />
            Stake Now
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Value Staked', value: '$97.2M', sub: '+12.4% this week', icon: Lock },
          { label: 'Avg APY', value: '21.6%', sub: 'Weighted average', icon: TrendingUp },
          { label: 'Rewards Distributed', value: '$4.2M', sub: 'This month', icon: Award },
          { label: 'Active Stakers', value: '8,247', sub: '+234 this week', icon: Coins },
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

      <Tabs defaultValue="pools">
        <TabsList className="bg-slate-800/60 border border-emerald-500/20">
          <TabsTrigger value="pools" className="data-[state=active]:bg-emerald-600">Staking Pools</TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-emerald-600">APY History</TabsTrigger>
          <TabsTrigger value="my" className="data-[state=active]:bg-emerald-600">My Positions</TabsTrigger>
        </TabsList>

        <TabsContent value="pools" className="mt-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              {stakingPools.map((pool) => (
                <button
                  key={pool.id}
                  onClick={() => setSelected(pool)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${selected.id === pool.id ? 'bg-emerald-400/15 border-emerald-500/40' : 'bg-slate-900/50 border-emerald-500/20 hover:border-emerald-500/30'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                        <Coins className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{pool.name}</div>
                        <div className="flex gap-1.5 mt-0.5">
                          {pool.autoCompound && <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">Auto-Compound</Badge>}
                          {pool.govRights && <Badge className="bg-purple-400/20 text-purple-300 border-0 text-xs">Governance</Badge>}
                          {pool.lockPeriod === 'None' && <Badge className="bg-amber-400/20 text-amber-300 border-0 text-xs">Flexible</Badge>}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 font-bold text-lg">{pool.apy}</div>
                      <div className="text-emerald-300/50 text-xs">APY</div>
                    </div>
                  </div>
                  <div className="flex gap-4 text-xs text-emerald-300/50">
                    <span>Lock: <span className="text-white">{pool.lockPeriod}</span></span>
                    <span>TVS: <span className="text-white">{pool.totalStaked}</span></span>
                    <span>Min: <span className="text-white">{pool.minStake}</span></span>
                    <span>Penalty: <span className={pool.penalty === '0%' ? 'text-emerald-400' : 'text-rose-400'}>{pool.penalty}</span></span>
                  </div>
                </button>
              ))}
            </div>

            <Card className="bg-slate-900/50 border-emerald-500/20 p-5 h-fit">
              <h3 className="text-white font-semibold text-sm mb-4">Stake {selected.token}</h3>
              <div className="space-y-4">
                <div className="bg-emerald-400/10 rounded-lg p-3 border border-emerald-500/20">
                  <div className="text-white font-medium text-sm">{selected.name}</div>
                  <div className="text-emerald-400 font-bold mt-1">{selected.apy} APY</div>
                  {selected.lockPeriod !== 'None' && (
                    <div className="flex items-center gap-1 text-emerald-300/50 text-xs mt-1">
                      <Lock className="w-3 h-3" />
                      Locked for {selected.lockPeriod}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-emerald-300/60 text-xs mb-1 block">Amount to Stake (USD)</label>
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div className="space-y-2 text-sm bg-slate-800/40 rounded-lg p-3">
                  <div className="flex justify-between text-emerald-300/60">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Daily Yield</span>
                    <span className="text-emerald-400">${dailyYield}</span>
                  </div>
                  <div className="flex justify-between text-emerald-300/60">
                    <span>Monthly Yield</span>
                    <span className="text-emerald-400">${monthlyYield}</span>
                  </div>
                  <div className="flex justify-between text-emerald-300/60">
                    <span>Annual Yield</span>
                    <span className="text-emerald-400 font-bold">${annualYield}</span>
                  </div>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Zap className="w-4 h-4 mr-2" />
                  Stake {stakeAmount} USD
                </Button>

                <div className="flex items-center gap-2 text-xs text-emerald-300/50">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  {selected.lockPeriod !== 'None' ? `Early unstake penalty: ${selected.penalty}` : 'Unstake anytime, no penalty'}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <h3 className="text-white font-semibold text-sm mb-4">30-Day APY History (%)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={apyHistory}>
                <defs>
                  <linearGradient id="rveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                <XAxis dataKey="day" stroke="#6ee7b7" fontSize={11} />
                <YAxis stroke="#6ee7b7" fontSize={11} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} formatter={(v: number) => [`${v}%`, '']} />
                <Area type="monotone" dataKey="bio" stroke="#8b5cf6" fill="transparent" name="Biodiversity Pool" strokeWidth={2} />
                <Area type="monotone" dataKey="rve" stroke="#10b981" fill="url(#rveGrad)" name="RVE Pool" strokeWidth={2} />
                <Area type="monotone" dataKey="carbon" stroke="#06b6d4" fill="transparent" name="Carbon Pool" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="my" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-8 text-center">
            <Coins className="w-12 h-12 text-emerald-400/40 mx-auto mb-3" />
            <p className="text-emerald-300/60 text-sm mb-4">No active staking positions. Start staking to earn rewards.</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Zap className="w-4 h-4 mr-2" />
              Start Staking
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
