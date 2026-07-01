import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Wallet, TrendingUp, Droplets, ArrowRightLeft, Shield, DollarSign, Activity, Plus } from 'lucide-react';

const pools = [
  { id: 'pool-1', pair: 'Carbon / USDC', tvl: '$34.2M', volume24h: '$8.4M', fees24h: '$25,200', apy: '12.4%', myLiquidity: '$0', myShare: '0%', fee: '0.3%' },
  { id: 'pool-2', pair: 'Biodiversity / Carbon', tvl: '$18.7M', volume24h: '$4.1M', fees24h: '$16,400', apy: '18.7%', myLiquidity: '$0', myShare: '0%', fee: '0.3%' },
  { id: 'pool-3', pair: 'Watershed / USDC', tvl: '$9.2M', volume24h: '$1.9M', fees24h: '$5,700', apy: '9.2%', myLiquidity: '$0', myShare: '0%', fee: '0.3%' },
  { id: 'pool-4', pair: 'Cultural / Biodiversity', tvl: '$5.8M', volume24h: '$1.2M', fees24h: '$3,600', apy: '22.4%', myLiquidity: '$0', myShare: '0%', fee: '0.5%' },
  { id: 'pool-5', pair: 'Mangrove / USDC', tvl: '$22.1M', volume24h: '$6.3M', fees24h: '$18,900', apy: '15.1%', myLiquidity: '$0', myShare: '0%', fee: '0.3%' },
];

const volumeData = [
  { day: 'Mon', volume: 6.2, fees: 18.6 },
  { day: 'Tue', volume: 7.8, fees: 23.4 },
  { day: 'Wed', volume: 5.9, fees: 17.7 },
  { day: 'Thu', volume: 9.1, fees: 27.3 },
  { day: 'Fri', volume: 11.4, fees: 34.2 },
  { day: 'Sat', volume: 8.7, fees: 26.1 },
  { day: 'Sun', volume: 7.2, fees: 21.6 },
];

const apyHistory = [
  { date: 'Week 1', carbon: 10.2, biodiversity: 14.8, watershed: 7.9 },
  { date: 'Week 2', carbon: 11.7, biodiversity: 16.2, watershed: 8.4 },
  { date: 'Week 3', carbon: 12.1, biodiversity: 17.9, watershed: 9.0 },
  { date: 'Week 4', carbon: 12.4, biodiversity: 18.7, watershed: 9.2 },
];

export function AutomatedMarketMaker() {
  const [selectedPool, setSelectedPool] = useState(pools[0]);
  const [addLiqAmount, setAddLiqAmount] = useState('1000');
  const [activeTab, setActiveTab] = useState('pools');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Automated Market Maker (AMM)</h2>
          <p className="text-emerald-300/70">Provide liquidity and earn fees from regenerative asset trading</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
            <Wallet className="w-4 h-4 mr-2" />
            My Positions
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Liquidity
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Value Locked', value: '$90.0M', change: '+8.4%', icon: Droplets },
          { label: '24h Trading Volume', value: '$21.9M', change: '+14.2%', icon: ArrowRightLeft },
          { label: '24h Fees Generated', value: '$65,700', change: '+14.2%', icon: DollarSign },
          { label: 'Active LPs', value: '1,247', change: '+89', icon: Activity },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-400 text-xs">{s.label}</span>
                <Icon className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-white text-xl font-bold">{s.value}</div>
              <div className="text-emerald-400 text-xs mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {s.change}
              </div>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="pools">
        <TabsList className="bg-slate-800/60 border border-emerald-500/20">
          <TabsTrigger value="pools" className="data-[state=active]:bg-emerald-600">Liquidity Pools</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-emerald-600">Analytics</TabsTrigger>
          <TabsTrigger value="farming" className="data-[state=active]:bg-emerald-600">Yield Farming</TabsTrigger>
        </TabsList>

        <TabsContent value="pools" className="mt-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              {pools.map((pool) => (
                <button
                  key={pool.id}
                  onClick={() => setSelectedPool(pool)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${selectedPool.id === pool.id ? 'bg-emerald-400/15 border-emerald-500/40' : 'bg-slate-900/50 border-emerald-500/20 hover:border-emerald-500/30'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                        <Droplets className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{pool.pair}</div>
                        <div className="text-emerald-300/50 text-xs">Fee: {pool.fee}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6 text-right">
                      <div>
                        <div className="text-emerald-300/50 text-xs">TVL</div>
                        <div className="text-white text-sm font-medium">{pool.tvl}</div>
                      </div>
                      <div>
                        <div className="text-emerald-300/50 text-xs">24h Volume</div>
                        <div className="text-white text-sm font-medium">{pool.volume24h}</div>
                      </div>
                      <div>
                        <div className="text-emerald-300/50 text-xs">APY</div>
                        <div className="text-emerald-400 text-sm font-bold">{pool.apy}</div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Add Liquidity Panel */}
            <Card className="bg-slate-900/50 border-emerald-500/20 p-5 h-fit">
              <h3 className="text-white font-semibold text-sm mb-4">Add Liquidity</h3>
              <div className="space-y-4">
                <div className="bg-emerald-400/10 rounded-lg p-3 border border-emerald-500/20">
                  <div className="text-emerald-300/60 text-xs mb-1">Selected Pool</div>
                  <div className="text-white font-medium">{selectedPool.pair}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">APY {selectedPool.apy}</Badge>
                    <Badge className="bg-slate-700/50 text-slate-300 border-0 text-xs">Fee {selectedPool.fee}</Badge>
                  </div>
                </div>

                <div>
                  <label className="text-emerald-300/60 text-xs mb-1 block">Amount (USD equivalent)</label>
                  <input
                    type="number"
                    value={addLiqAmount}
                    onChange={(e) => setAddLiqAmount(e.target.value)}
                    className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-emerald-300/60">
                    <span>Estimated Daily Fees</span>
                    <span className="text-emerald-400">${(Number(addLiqAmount) * 0.0034).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-300/60">
                    <span>Pool Share</span>
                    <span className="text-white">~{((Number(addLiqAmount) / 34200000) * 100).toFixed(4)}%</span>
                  </div>
                  <div className="flex justify-between text-emerald-300/60">
                    <span>LP Tokens Received</span>
                    <span className="text-white">{(Number(addLiqAmount) * 0.847).toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Liquidity
                </Button>

                <div className="flex items-center gap-2 text-xs text-emerald-300/50">
                  <Shield className="w-3 h-3" />
                  Impermanent loss protection enabled
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
              <h3 className="text-white text-sm font-semibold mb-3">Weekly Volume ($M)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                  <XAxis dataKey="day" stroke="#6ee7b7" fontSize={11} />
                  <YAxis stroke="#6ee7b7" fontSize={11} />
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} />
                  <Bar dataKey="volume" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
              <h3 className="text-white text-sm font-semibold mb-3">APY History (%)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={apyHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                  <XAxis dataKey="date" stroke="#6ee7b7" fontSize={11} />
                  <YAxis stroke="#6ee7b7" fontSize={11} />
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} />
                  <Line type="monotone" dataKey="carbon" stroke="#10b981" dot={false} name="Carbon Pool" />
                  <Line type="monotone" dataKey="biodiversity" stroke="#06b6d4" dot={false} name="Biodiversity Pool" />
                  <Line type="monotone" dataKey="watershed" stroke="#8b5cf6" dot={false} name="Watershed Pool" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="farming" className="mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: 'Carbon-USDC LP Farm', reward: 'RVE Token', apy: '38.4%', deposited: '$0', earned: '0 RVE', multiplier: '2x' },
              { name: 'Biodiversity-Carbon LP Farm', reward: 'RVE + IMPACT', apy: '52.1%', deposited: '$0', earned: '0', multiplier: '3x' },
              { name: 'Multi-Asset LP Farm', reward: 'RVE Token', apy: '28.7%', deposited: '$0', earned: '0 RVE', multiplier: '1.5x' },
            ].map((farm) => (
              <Card key={farm.name} className="bg-slate-900/50 border-emerald-500/20 p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-white font-semibold text-sm">{farm.name}</h4>
                    <div className="text-emerald-300/60 text-xs mt-0.5">Reward: {farm.reward}</div>
                  </div>
                  <Badge className="bg-purple-400/20 text-purple-300 border-0 text-xs">{farm.multiplier} Boost</Badge>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-slate-800/40 rounded-lg p-2 text-center">
                    <div className="text-emerald-300/50 text-xs">APY</div>
                    <div className="text-emerald-400 font-bold text-sm">{farm.apy}</div>
                  </div>
                  <div className="bg-slate-800/40 rounded-lg p-2 text-center">
                    <div className="text-emerald-300/50 text-xs">Deposited</div>
                    <div className="text-white text-sm">{farm.deposited}</div>
                  </div>
                  <div className="bg-slate-800/40 rounded-lg p-2 text-center">
                    <div className="text-emerald-300/50 text-xs">Earned</div>
                    <div className="text-white text-sm">{farm.earned}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-xs py-1.5">Deposit LP</Button>
                  <Button variant="outline" className="flex-1 border-emerald-500/30 text-emerald-300 text-xs py-1.5">Harvest</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
