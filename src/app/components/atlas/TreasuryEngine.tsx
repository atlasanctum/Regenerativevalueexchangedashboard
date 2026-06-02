import { useState, useEffect } from 'react';
import { Wallet, TrendingUp, PieChart, RefreshCw, DollarSign, Shield, Zap, Activity } from 'lucide-react';
import { Card } from '../ui/interactive/Card';
import { InteractiveChart } from '../ui/interactive/InteractiveChart';
import { motion } from 'motion/react';

interface Strategy {
  id: string;
  name: string;
  allocation: number;
  targetAPY: number;
  currentAPY: number;
  value: number;
  risk: 'low' | 'medium' | 'high';
  status: 'active' | 'rebalancing' | 'paused';
}

export function TreasuryEngine() {
  const [strategies, setStrategies] = useState<Strategy[]>([
    {
      id: 'LP',
      name: 'Liquidity Provisioning',
      allocation: 0.35,
      targetAPY: 12,
      currentAPY: 13.2,
      value: 34720000,
      risk: 'medium',
      status: 'active',
    },
    {
      id: 'IBS',
      name: 'Impact Bond Staking',
      allocation: 0.25,
      targetAPY: 18,
      currentAPY: 19.4,
      value: 24800000,
      risk: 'medium',
      status: 'active',
    },
    {
      id: 'ONO',
      name: 'Oracle Node Operations',
      allocation: 0.20,
      targetAPY: 15,
      currentAPY: 16.1,
      value: 19840000,
      risk: 'low',
      status: 'active',
    },
    {
      id: 'GOV',
      name: 'Governance Incentives',
      allocation: 0.15,
      targetAPY: 8,
      currentAPY: 8.7,
      value: 14880000,
      risk: 'low',
      status: 'active',
    },
    {
      id: 'RES',
      name: 'Emergency Reserve',
      allocation: 0.05,
      targetAPY: 4,
      currentAPY: 4.2,
      value: 4960000,
      risk: 'low',
      status: 'active',
    },
  ]);

  const [performanceData] = useState([
    { month: 'Jan', apy: 12.4, value: 87200000 },
    { month: 'Feb', apy: 13.1, value: 89470000 },
    { month: 'Mar', apy: 14.2, value: 92840000 },
    { month: 'Apr', apy: 13.8, value: 95120000 },
    { month: 'May', apy: 14.9, value: 97850000 },
    { month: 'Jun', apy: 15.3, value: 99200000 },
  ]);

  const [rebalanceHistory] = useState([
    { time: '6h ago', from: 'Liquidity Provisioning', to: 'Impact Bond Staking', amount: 2400000, reason: 'Higher yield opportunity' },
    { time: '12h ago', from: 'Emergency Reserve', to: 'Oracle Node Operations', amount: 840000, reason: 'Risk-adjusted optimization' },
    { time: '18h ago', from: 'Governance Incentives', to: 'Liquidity Provisioning', amount: 1200000, reason: 'Market conditions favorable' },
  ]);

  const totalValue = strategies.reduce((sum, s) => sum + s.value, 0);
  const weightedAPY = strategies.reduce((sum, s) => sum + (s.currentAPY * s.allocation), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white flex items-center gap-3">
          <Wallet className="w-8 h-8 text-emerald-400" />
          Treasury Engine
        </h1>
        <p className="text-emerald-300/70 mt-2">
          Multi-strategy autonomous yield optimizer with risk-adjusted allocation
        </p>
      </div>

      {/* Treasury Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Value', value: `$${(totalValue / 1000000).toFixed(1)}M`, icon: DollarSign, color: 'emerald' },
          { label: 'Weighted APY', value: `${weightedAPY.toFixed(1)}%`, icon: TrendingUp, color: 'blue' },
          { label: 'Active Strategies', value: strategies.length, icon: PieChart, color: 'purple' },
          { label: 'Last Rebalance', value: '6h ago', icon: RefreshCw, color: 'yellow' },
        ].map((metric, idx) => {
          const Icon = metric.icon;
          const iconColor =
            metric.color === 'emerald' ? 'text-emerald-400 bg-emerald-400/20' :
            metric.color === 'blue' ? 'text-blue-400 bg-blue-400/20' :
            metric.color === 'purple' ? 'text-purple-400 bg-purple-400/20' :
            'text-yellow-400 bg-yellow-400/20';

          return (
            <Card key={idx} hover={false}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 ${iconColor} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-emerald-300/70 text-sm">{metric.label}</div>
                  <div className="text-white text-xl">{metric.value}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Strategy Allocation */}
      <Card hover={false}>
        <h3 className="text-white mb-4 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-emerald-400" />
          Strategy Allocation & Performance
        </h3>
        <div className="space-y-4">
          {strategies.map((strategy, idx) => (
            <motion.div
              key={strategy.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/30 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white">{strategy.name}</h4>
                    <div className={`px-2 py-0.5 rounded text-xs ${
                      strategy.risk === 'low' ? 'bg-emerald-400/10 text-emerald-400' :
                      strategy.risk === 'medium' ? 'bg-yellow-400/10 text-yellow-400' :
                      'bg-red-400/10 text-red-400'
                    }`}>
                      {strategy.risk} risk
                    </div>
                  </div>
                  <div className="text-emerald-300/70 text-sm">{(strategy.allocation * 100).toFixed(0)}% allocation</div>
                </div>
                <div className="text-right">
                  <div className="text-white text-xl mb-1">${(strategy.value / 1000000).toFixed(2)}M</div>
                  <div className="text-emerald-400 text-sm">{strategy.currentAPY}% APY</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Target APY</div>
                  <div className="text-white">{strategy.targetAPY}%</div>
                </div>
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Current APY</div>
                  <div className={strategy.currentAPY >= strategy.targetAPY ? 'text-emerald-400' : 'text-yellow-400'}>
                    {strategy.currentAPY}%
                  </div>
                </div>
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Status</div>
                  <div className="text-emerald-400 capitalize">{strategy.status}</div>
                </div>
              </div>

              <div className="w-full bg-slate-900/50 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${strategy.allocation * 100}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className="bg-gradient-to-r from-emerald-400 to-teal-400 h-3 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InteractiveChart
          title="Treasury Value Growth"
          data={performanceData}
          type="area"
          xAxisKey="month"
          dataKeys={[
            { key: 'value', color: '#10b981', name: 'Value (USD)' },
          ]}
          height={300}
        />

        <InteractiveChart
          title="APY Performance"
          data={performanceData}
          type="line"
          xAxisKey="month"
          dataKeys={[
            { key: 'apy', color: '#3b82f6', name: 'APY %' },
          ]}
          height={300}
        />
      </div>

      {/* Rebalancing History */}
      <Card hover={false}>
        <h3 className="text-white mb-4 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-yellow-400" />
          Autonomous Rebalancing History
        </h3>
        <div className="space-y-3">
          {rebalanceHistory.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/30 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-emerald-300">{event.from}</span>
                    <span className="text-emerald-300/50">→</span>
                    <span className="text-emerald-300">{event.to}</span>
                  </div>
                  <div className="text-emerald-300/70 text-sm">{event.reason}</div>
                </div>
                <div className="text-right">
                  <div className="text-white mb-1">${(event.amount / 1000000).toFixed(2)}M</div>
                  <div className="text-emerald-300/50 text-xs">{event.time}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Risk Management */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card hover={false}>
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h4 className="text-white">Risk Metrics</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Portfolio VaR (95%)</span>
              <span className="text-white">2.4%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Sharpe Ratio</span>
              <span className="text-emerald-400">2.8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Max Drawdown</span>
              <span className="text-white">4.2%</span>
            </div>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-5 h-5 text-blue-400" />
            <h4 className="text-white">Rebalancing</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Frequency</span>
              <span className="text-white">Every 6 hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Last Executed</span>
              <span className="text-emerald-400">6h ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Next Scheduled</span>
              <span className="text-white">In 2h</span>
            </div>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h4 className="text-white">Efficiency</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Capital Utilization</span>
              <span className="text-emerald-400">95%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Gas Optimization</span>
              <span className="text-white">87%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Yield Efficiency</span>
              <span className="text-emerald-400">94%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
