import { Layers, Zap, DollarSign, TrendingDown, Network } from 'lucide-react';

export function Layer2Expansion() {
  const l2Networks = [
    { name: 'Arbitrum One', tvl: '$2.4B', tps: '40k', gasReduction: '95%', status: 'Live' },
    { name: 'Optimism', tvl: '$1.8B', tps: '35k', gasReduction: '93%', status: 'Live' },
    { name: 'Base', tvl: '$890M', tps: '50k', gasReduction: '96%', status: 'Live' },
    { name: 'zkSync Era', tvl: '$670M', tps: '100k', gasReduction: '98%', status: 'Live' },
    { name: 'Polygon zkEVM', tvl: '$450M', tps: '80k', gasReduction: '97%', status: 'Live' },
    { name: 'StarkNet', tvl: '$320M', tps: '150k', gasReduction: '99%', status: 'Live' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Layers className="w-6 h-6 text-white" />
          </div>
          Layer 2 Scaling Expansion
        </h1>
        <p className="text-emerald-300/70 mt-2">Support for 6+ Layer 2 networks with 95%+ gas savings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'L2 Networks', value: '6', icon: Network, change: '+3 new' },
          { label: 'Total TVL', value: '$6.5B', icon: DollarSign, change: '+42%' },
          { label: 'Avg Gas Savings', value: '96.3%', icon: TrendingDown, change: 'vs L1' },
          { label: 'Throughput', value: '475k TPS', icon: Zap, change: 'Combined' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-4">
            <stat.icon className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-2xl text-white mb-1">{stat.value}</div>
            <div className="text-emerald-300/70 text-sm mb-1">{stat.label}</div>
            <div className="text-emerald-400 text-xs">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {l2Networks.map((network, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-white">{network.name}</h3>
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs border border-emerald-500/30">
                {network.status}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">TVL</span>
                <span className="text-white">{network.tvl}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">Throughput</span>
                <span className="text-emerald-400">{network.tps} TPS</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">Gas Reduction</span>
                <span className="text-green-400">{network.gasReduction}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
