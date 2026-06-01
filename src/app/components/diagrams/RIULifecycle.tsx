import { useState } from 'react';
import { Coins, ArrowRight, CheckCircle, TrendingUp, Users, Lock } from 'lucide-react';
import { Card } from '../ui/interactive/Card';
import { motion } from 'motion/react';

interface LifecycleStage {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  metrics: { label: string; value: string }[];
}

export function RIULifecycle() {
  const [activeStage, setActiveStage] = useState<number>(0);

  const lifecycleStages: LifecycleStage[] = [
    {
      id: 'asset-registration',
      name: '1. Asset Registration',
      description: 'Regenerative project registers impact assets with verified data sources',
      status: 'completed',
      metrics: [
        { label: 'Registered Assets', value: '4,728' },
        { label: 'Verification Rate', value: '99.7%' },
        { label: 'Avg Processing Time', value: '2.4 hours' },
      ],
    },
    {
      id: 'verification',
      name: '2. Multi-Layer Verification',
      description: 'AI oracles verify impact data through satellites, IoT sensors, and community validation',
      status: 'active',
      metrics: [
        { label: 'Active Verifications', value: '847' },
        { label: 'Oracle Consensus', value: '99.2%' },
        { label: 'Data Sources', value: '12 avg' },
      ],
    },
    {
      id: 'tokenization',
      name: '3. RIU Tokenization',
      description: 'Verified impact is tokenized into Regenerative Impact Units on blockchain',
      status: 'active',
      metrics: [
        { label: 'Minted RIUs', value: '16.5M' },
        { label: 'Token Value', value: '$739.1M' },
        { label: 'Minting Rate', value: '8.4K/day' },
      ],
    },
    {
      id: 'collateralization',
      name: '4. Collateralization',
      description: 'RIUs backed by verified impact data and stored on immutable blockchain records',
      status: 'active',
      metrics: [
        { label: 'Collateral Ratio', value: '142%' },
        { label: 'Backing Coverage', value: '99.8%' },
        { label: 'Reserve Pool', value: '$312M' },
      ],
    },
    {
      id: 'primary-market',
      name: '5. Primary Market Launch',
      description: 'RIUs offered to initial buyers through regulated primary marketplace',
      status: 'active',
      metrics: [
        { label: 'Primary Sales', value: '$284M' },
        { label: 'Unique Buyers', value: '8,472' },
        { label: 'Avg Sale Price', value: '$44.78' },
      ],
    },
    {
      id: 'secondary-trading',
      name: '6. Secondary Market Trading',
      description: 'RIUs trade freely on secondary markets with dynamic pricing',
      status: 'active',
      metrics: [
        { label: '24h Volume', value: '$19.3M' },
        { label: 'Active Traders', value: '12.4K' },
        { label: 'Liquidity Pools', value: '47' },
      ],
    },
    {
      id: 'staking-yield',
      name: '7. Staking & Yield Generation',
      description: 'RIU holders earn yields through staking and impact dividends',
      status: 'active',
      metrics: [
        { label: 'Staked RIUs', value: '4.2M (25%)' },
        { label: 'Avg APY', value: '8.4%' },
        { label: 'Total Rewards', value: '$12.4M' },
      ],
    },
    {
      id: 'retirement',
      name: '8. Retirement & Impact Claim',
      description: 'RIUs can be retired to claim verified impact for carbon offsetting or ESG reporting',
      status: 'active',
      metrics: [
        { label: 'Retired RIUs', value: '2.1M' },
        { label: 'Impact Claimed', value: '8.7M tons CO2e' },
        { label: 'Corporate Claims', value: '284' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white flex items-center gap-3">
          <Coins className="w-8 h-8 text-emerald-400" />
          RIU Lifecycle Management
        </h1>
        <p className="text-emerald-300/70 mt-2">
          Complete lifecycle of Regenerative Impact Units from asset registration to retirement
        </p>
      </div>

      {/* Lifecycle Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total RIUs in Circulation', value: '16.5M', icon: Coins },
          { label: 'Active in Lifecycle', value: '847', icon: TrendingUp },
          { label: 'Total Market Value', value: '$739.1M', icon: TrendingUp },
          { label: 'Unique Holders', value: '87.4K', icon: Users },
        ].map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <Card key={idx} hover={false}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-emerald-400/20 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-emerald-400" />
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

      {/* Lifecycle Flow Diagram */}
      <Card hover={false} className="p-6">
        <h3 className="text-white mb-6">RIU Lifecycle Flow</h3>
        <div className="space-y-4">
          {lifecycleStages.map((stage, idx) => (
            <div key={stage.id}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`cursor-pointer transition-all ${
                  activeStage === idx ? 'scale-[1.02]' : ''
                }`}
                onClick={() => setActiveStage(idx)}
              >
                <div className={`bg-slate-800/50 rounded-lg p-5 border-2 ${
                  activeStage === idx
                    ? 'border-emerald-400 shadow-lg shadow-emerald-400/20'
                    : 'border-emerald-500/20'
                }`}>
                  <div className="flex items-start gap-4">
                    {/* Stage Indicator */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        stage.status === 'completed' ? 'bg-emerald-400/30' :
                        stage.status === 'active' ? 'bg-blue-400/30' :
                        'bg-slate-700'
                      }`}>
                        {stage.status === 'completed' ? (
                          <CheckCircle className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <span className={`text-lg ${
                            stage.status === 'active' ? 'text-blue-400' : 'text-slate-400'
                          }`}>
                            {idx + 1}
                          </span>
                        )}
                      </div>
                      {idx < lifecycleStages.length - 1 && (
                        <div className={`w-0.5 h-8 mt-2 ${
                          stage.status === 'completed' ? 'bg-emerald-400' : 'bg-slate-700'
                        }`} />
                      )}
                    </div>

                    {/* Stage Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white text-lg">{stage.name}</h4>
                        <div className={`px-3 py-1 rounded text-xs ${
                          stage.status === 'completed' ? 'bg-emerald-400/20 text-emerald-400' :
                          stage.status === 'active' ? 'bg-blue-400/20 text-blue-400' :
                          'bg-slate-700 text-slate-400'
                        }`}>
                          {stage.status}
                        </div>
                      </div>
                      <p className="text-emerald-300/70 text-sm mb-4">{stage.description}</p>

                      {/* Metrics */}
                      {activeStage === idx && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                          className="grid grid-cols-3 gap-3"
                        >
                          {stage.metrics.map((metric, midx) => (
                            <div key={midx} className="bg-slate-900/50 rounded p-3">
                              <div className="text-emerald-300/50 text-xs mb-1">{metric.label}</div>
                              <div className="text-white">{metric.value}</div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </Card>

      {/* Key Mechanisms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card hover={false}>
          <h3 className="text-white mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-400" />
            Tokenization Mechanics
          </h3>
          <div className="space-y-3">
            {[
              { mechanism: 'Impact-to-RIU Ratio', value: '1 RIU = 1 ton CO2e', description: 'Standardized conversion rate' },
              { mechanism: 'Minting Authority', value: 'Multi-sig Oracle Consensus', description: 'Requires 3+ oracle confirmations' },
              { mechanism: 'Supply Control', value: 'Dynamic based on verified impact', description: 'No arbitrary inflation' },
              { mechanism: 'Burning Mechanism', value: 'On retirement or claim', description: 'Permanent removal from circulation' },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-800/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-sm">{item.mechanism}</span>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-emerald-400 text-sm mb-1">{item.value}</div>
                <div className="text-emerald-300/50 text-xs">{item.description}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card hover={false}>
          <h3 className="text-white mb-4">Collateral & Reserve Management</h3>
          <div className="space-y-4">
            <div className="bg-slate-800/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-300/70">Collateral Ratio</span>
                <span className="text-emerald-400 text-xl">142%</span>
              </div>
              <div className="w-full bg-slate-900/50 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1 }}
                  className="bg-gradient-to-r from-emerald-400 to-teal-400 h-3 rounded-full relative"
                >
                  <div className="absolute right-0 top-0 h-3 w-0.5 bg-white" style={{ right: '29.6%' }} />
                </motion.div>
              </div>
              <div className="flex justify-between text-xs text-emerald-300/50 mt-1">
                <span>Min: 120%</span>
                <span>Target: 150%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/30 rounded p-3">
                <div className="text-emerald-300/50 text-xs mb-1">Reserve Pool</div>
                <div className="text-white text-lg">$312M</div>
              </div>
              <div className="bg-slate-800/30 rounded p-3">
                <div className="text-emerald-300/50 text-xs mb-1">Insurance Fund</div>
                <div className="text-white text-lg">$47M</div>
              </div>
              <div className="bg-slate-800/30 rounded p-3">
                <div className="text-emerald-300/50 text-xs mb-1">Staking Rewards</div>
                <div className="text-white text-lg">$12.4M</div>
              </div>
              <div className="bg-slate-800/30 rounded p-3">
                <div className="text-emerald-300/50 text-xs mb-1">Treasury</div>
                <div className="text-white text-lg">$89M</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Market Dynamics */}
      <Card hover={false}>
        <h3 className="text-white mb-4">Market Dynamics & Liquidity</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              market: 'Primary Market',
              volume: '$284M',
              transactions: '8,472',
              avgPrice: '$44.78',
              liquidity: '92%',
            },
            {
              market: 'Secondary Market',
              volume: '$19.3M (24h)',
              transactions: '12.4K (24h)',
              avgPrice: '$47.82',
              liquidity: '87%',
            },
            {
              market: 'Staking Pools',
              volume: '$178M locked',
              transactions: '4.2M RIUs',
              avgPrice: '8.4% APY',
              liquidity: '98%',
            },
          ].map((market, idx) => (
            <div key={idx} className="bg-slate-800/30 rounded-lg p-4">
              <h4 className="text-white mb-3">{market.market}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-emerald-300/50">Volume</span>
                  <span className="text-white">{market.volume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-300/50">Transactions</span>
                  <span className="text-white">{market.transactions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-300/50">Avg Price/APY</span>
                  <span className="text-emerald-400">{market.avgPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-300/50">Liquidity</span>
                  <span className="text-emerald-400">{market.liquidity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
