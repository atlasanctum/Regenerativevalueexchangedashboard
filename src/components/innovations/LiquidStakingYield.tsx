import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Coins, TrendingUp, Lock, Unlock, Zap, Percent, BarChart3, Target } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function LiquidStakingYield() {
  const [stakingTab, setStakingTab] = useState<'stake' | 'unstake'>('stake');
  const [selectedStrategy, setSelectedStrategy] = useState('balanced');

  // Staking pools
  const stakingPools = [
    {
      id: 'rve-main',
      name: 'RVE Main Pool',
      apy: 12.4,
      tvl: 48300000,
      stakers: 5234,
      lockPeriod: 'None',
      derivative: 'stRVE',
      autoCompound: true,
      status: 'active'
    },
    {
      id: 'impact-boost',
      name: 'Impact Boost Pool',
      apy: 18.7,
      tvl: 23400000,
      stakers: 2156,
      lockPeriod: '30 days',
      derivative: 'ibRVE',
      autoCompound: true,
      status: 'active'
    },
    {
      id: 'carbon-yield',
      name: 'Carbon Credit Yield',
      apy: 15.2,
      tvl: 15600000,
      stakers: 1893,
      lockPeriod: '7 days',
      derivative: 'ccRVE',
      autoCompound: false,
      status: 'active'
    },
  ];

  // Yield strategies
  const yieldStrategies = [
    {
      id: 'conservative',
      name: 'Conservative',
      apy: 8.2,
      risk: 'low',
      allocation: {
        staking: 60,
        lending: 30,
        liquidity: 10
      },
      tvl: 12400000
    },
    {
      id: 'balanced',
      name: 'Balanced',
      apy: 14.6,
      risk: 'medium',
      allocation: {
        staking: 40,
        lending: 30,
        liquidity: 20,
        derivatives: 10
      },
      tvl: 28900000
    },
    {
      id: 'aggressive',
      name: 'Aggressive',
      apy: 24.3,
      risk: 'high',
      allocation: {
        staking: 20,
        derivatives: 40,
        liquidity: 30,
        leveraged: 10
      },
      tvl: 15200000
    },
  ];

  // APY history
  const apyHistory = [
    { month: 'Aug', main: 11.2, impact: 16.8, carbon: 13.9 },
    { month: 'Sep', main: 11.6, impact: 17.4, carbon: 14.5 },
    { month: 'Oct', main: 11.9, impact: 17.9, carbon: 14.8 },
    { month: 'Nov', main: 12.1, impact: 18.2, carbon: 15.0 },
    { month: 'Dec', main: 12.3, impact: 18.5, carbon: 15.1 },
    { month: 'Jan', main: 12.4, impact: 18.7, carbon: 15.2 },
  ];

  // Yield sources
  const yieldSources = [
    { source: 'Staking Rewards', amount: 45000, percentage: 42 },
    { source: 'Lending Interest', amount: 28000, percentage: 26 },
    { source: 'LP Fees', amount: 18000, percentage: 17 },
    { source: 'Derivatives', amount: 12000, percentage: 11 },
    { source: 'Other', amount: 4000, percentage: 4 },
  ];

  // Reward distribution
  const rewardDistribution = [
    { week: 'Week 1', rewards: 8200, stakers: 4800 },
    { week: 'Week 2', rewards: 9100, stakers: 5050 },
    { week: 'Week 3', rewards: 9800, stakers: 5200 },
    { week: 'Week 4', rewards: 10400, stakers: 5234 },
  ];

  // Staking metrics
  const stakingMetrics = [
    { metric: 'Total Staked', value: '87.3M RVE', change: '+8.2%' },
    { metric: 'Avg APY', value: '15.4%', change: '+0.3%' },
    { metric: 'Total Stakers', value: '9,283', change: '+12.4%' },
    { metric: 'Rewards Paid', value: '1.2M RVE', change: '+15.7%' },
  ];

  // Derivative tokens
  const derivatives = [
    {
      symbol: 'stRVE',
      name: 'Staked RVE',
      ratio: 1.124,
      liquidity: 12400000,
      holders: 5234
    },
    {
      symbol: 'ibRVE',
      name: 'Impact Boost RVE',
      ratio: 1.187,
      liquidity: 6200000,
      holders: 2156
    },
    {
      symbol: 'ccRVE',
      name: 'Carbon Credit RVE',
      ratio: 1.152,
      liquidity: 4100000,
      holders: 1893
    },
  ];

  const totalTVL = stakingPools.reduce((sum, pool) => sum + pool.tvl, 0);
  const totalStakers = stakingPools.reduce((sum, pool) => sum + pool.stakers, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white mb-2">Liquid Staking & Yield Aggregation</h2>
        <p className="text-emerald-300/70">Stake RVE tokens while maintaining liquidity through derivative tokens</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300/70 text-sm">Total Value Locked</span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-white text-2xl mb-1">${(totalTVL / 1000000).toFixed(1)}M</div>
          <div className="text-emerald-400 text-sm">Across all pools</div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300/70 text-sm">Average APY</span>
            <Percent className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-white text-2xl mb-1">15.4%</div>
          <div className="text-emerald-400 text-sm">Weighted average</div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300/70 text-sm">Total Stakers</span>
            <Coins className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-white text-2xl mb-1">{totalStakers.toLocaleString()}</div>
          <div className="text-emerald-400 text-sm">+12.4% this month</div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300/70 text-sm">Monthly Rewards</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-white text-2xl mb-1">1.2M</div>
          <div className="text-emerald-400 text-sm">RVE distributed</div>
        </Card>
      </div>

      {/* Staking Pools */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Liquid Staking Pools</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stakingPools.map((pool) => (
            <div key={pool.id} className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-medium">{pool.name}</h4>
                  <div className="text-emerald-300/70 text-sm mt-1">Receive {pool.derivative}</div>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  {pool.status}
                </Badge>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-3 mb-3">
                <div className="text-emerald-300/70 text-xs mb-1">Annual Percentage Yield</div>
                <div className="text-white text-3xl font-medium">{pool.apy}%</div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-emerald-300/70 text-xs">TVL</div>
                  <div className="text-white font-medium">${(pool.tvl / 1000000).toFixed(1)}M</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Stakers</div>
                  <div className="text-white font-medium">{pool.stakers.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Lock Period</div>
                  <div className="text-white font-medium">{pool.lockPeriod}</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Auto-Compound</div>
                  <div className="text-white font-medium">{pool.autoCompound ? 'Yes' : 'No'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Staking Interface */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setStakingTab('stake')}
            className={`flex-1 py-3 rounded-lg transition-all ${
              stakingTab === 'stake'
                ? 'bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400'
                : 'bg-slate-900/50 text-emerald-300/70 border-2 border-emerald-500/20'
            }`}
          >
            <Lock className="w-4 h-4 inline mr-2" />
            Stake RVE
          </button>
          <button
            onClick={() => setStakingTab('unstake')}
            className={`flex-1 py-3 rounded-lg transition-all ${
              stakingTab === 'unstake'
                ? 'bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400'
                : 'bg-slate-900/50 text-emerald-300/70 border-2 border-emerald-500/20'
            }`}
          >
            <Unlock className="w-4 h-4 inline mr-2" />
            Unstake
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-emerald-300/70 text-sm mb-2 block">Select Pool</label>
            <select className="w-full bg-slate-900/50 border border-emerald-500/20 rounded-lg px-4 py-3 text-white">
              <option>RVE Main Pool (12.4% APY)</option>
              <option>Impact Boost Pool (18.7% APY)</option>
              <option>Carbon Credit Yield (15.2% APY)</option>
            </select>
          </div>

          <div>
            <label className="text-emerald-300/70 text-sm mb-2 block">Amount</label>
            <input
              type="number"
              className="w-full bg-slate-900/50 border border-emerald-500/20 rounded-lg px-4 py-3 text-white"
              placeholder="Enter amount to stake"
            />
          </div>

          <div className="bg-slate-900/50 border border-emerald-500/20 rounded p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-emerald-300/70 text-xs">You will receive</div>
                <div className="text-white font-medium">~0 stRVE</div>
              </div>
              <div>
                <div className="text-emerald-300/70 text-xs">Exchange Rate</div>
                <div className="text-white font-medium">1 RVE = 1.124 stRVE</div>
              </div>
              <div>
                <div className="text-emerald-300/70 text-xs">Est. Annual Rewards</div>
                <div className="text-white font-medium">~0 RVE</div>
              </div>
              <div>
                <div className="text-emerald-300/70 text-xs">Lock Period</div>
                <div className="text-white font-medium">None</div>
              </div>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
            {stakingTab === 'stake' ? 'Stake RVE' : 'Unstake RVE'}
          </Button>
        </div>
      </Card>

      {/* Yield Strategies */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Automated Yield Strategies</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {yieldStrategies.map((strategy) => (
            <div
              key={strategy.id}
              className={`bg-slate-900/50 border rounded-lg p-4 cursor-pointer transition-all ${
                selectedStrategy === strategy.id
                  ? 'border-emerald-400 bg-emerald-400/10'
                  : 'border-emerald-500/20 hover:border-emerald-400/50'
              }`}
              onClick={() => setSelectedStrategy(strategy.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-medium">{strategy.name}</h4>
                  <Badge 
                    className={
                      strategy.risk === 'low'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mt-2'
                        : strategy.risk === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 mt-2'
                        : 'bg-red-500/20 text-red-400 border-red-500/30 mt-2'
                    }
                  >
                    {strategy.risk} risk
                  </Badge>
                </div>
                <div className="text-emerald-400 text-2xl font-medium">{strategy.apy}%</div>
              </div>

              <div className="space-y-2 mb-3">
                {Object.entries(strategy.allocation).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <span className="text-emerald-300/70 capitalize">{key}</span>
                    <span className="text-white">{value}%</span>
                  </div>
                ))}
              </div>

              <div className="text-emerald-300/70 text-xs">
                TVL: ${(strategy.tvl / 1000000).toFixed(1)}M
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* APY History */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">APY Historical Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={apyHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="month" stroke="#6ee7b7" />
            <YAxis stroke="#6ee7b7" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b98150' }}
              labelStyle={{ color: '#6ee7b7' }}
            />
            <Line type="monotone" dataKey="main" stroke="#10b981" strokeWidth={2} name="Main Pool" />
            <Line type="monotone" dataKey="impact" stroke="#3b82f6" strokeWidth={2} name="Impact Boost" />
            <Line type="monotone" dataKey="carbon" stroke="#f59e0b" strokeWidth={2} name="Carbon Yield" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Yield Sources & Rewards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yield Sources */}
        <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
          <h3 className="text-white mb-4">Yield Source Breakdown</h3>
          
          <div className="space-y-3">
            {yieldSources.map((source, index) => (
              <div key={index} className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{source.source}</span>
                  <span className="text-emerald-400 font-medium">{source.percentage}%</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-emerald-300/70">Monthly</span>
                  <span className="text-white">{source.amount.toLocaleString()} RVE</span>
                </div>
                <div className="bg-slate-900/50 rounded-full h-2">
                  <div 
                    className="bg-emerald-400 h-2 rounded-full"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Reward Distribution */}
        <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
          <h3 className="text-white mb-4">Weekly Reward Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={rewardDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="week" stroke="#6ee7b7" />
              <YAxis stroke="#6ee7b7" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b98150' }}
                labelStyle={{ color: '#6ee7b7' }}
              />
              <Bar dataKey="rewards" fill="#10b981" name="Rewards (RVE)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Derivative Tokens */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Liquid Staking Derivatives</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {derivatives.map((derivative) => (
            <div key={derivative.symbol} className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4">
              <h4 className="text-white font-medium mb-1">{derivative.symbol}</h4>
              <div className="text-emerald-300/70 text-sm mb-4">{derivative.name}</div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-emerald-300/70 text-xs">Exchange Ratio</div>
                  <div className="text-white font-medium">{derivative.ratio}x</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Liquidity</div>
                  <div className="text-white font-medium">${(derivative.liquidity / 1000000).toFixed(1)}M</div>
                </div>
                <div className="col-span-2">
                  <div className="text-emerald-300/70 text-xs">Holders</div>
                  <div className="text-white font-medium">{derivative.holders.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* API Integration */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Staking API</h3>
        
        <div className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4 mb-4">
          <div className="text-emerald-300/70 text-sm mb-2">Example: Stake RVE Tokens</div>
          <pre className="text-white text-sm overflow-x-auto">
{`// Stake RVE and receive liquid staking derivative
const stake = await rve.staking.stake({
  pool: 'rve-main',
  amount: 1000, // RVE
  autoCompound: true
});

console.log(\`Received: \${stake.derivative.amount} stRVE\`);
console.log(\`APY: \${stake.apy}%\`);

// Unstake and redeem RVE
const unstake = await rve.staking.unstake({
  derivative: 'stRVE',
  amount: 1124 // stRVE
});`}
          </pre>
        </div>

        <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
          Access Staking API Documentation
        </Button>
      </Card>
    </div>
  );
}
