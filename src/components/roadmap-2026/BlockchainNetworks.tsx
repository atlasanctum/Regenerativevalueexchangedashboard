import { Network, Zap, DollarSign, Users, CheckCircle } from 'lucide-react';

export function BlockchainNetworks() {
  const networks = [
    { name: 'Ethereum', symbol: 'ETH', tvl: '$847M', txs: '2.4M', gas: 'High', status: 'Live' },
    { name: 'Polygon', symbol: 'MATIC', tvl: '$234M', txs: '8.9M', gas: 'Low', status: 'Live' },
    { name: 'Arbitrum', symbol: 'ARB', tvl: '$456M', txs: '5.2M', gas: 'Low', status: 'Live' },
    { name: 'Optimism', symbol: 'OP', tvl: '$312M', txs: '4.1M', gas: 'Low', status: 'Live' },
    { name: 'Base', symbol: 'BASE', tvl: '$189M', txs: '6.7M', gas: 'Very Low', status: 'Live' },
    { name: 'Avalanche', symbol: 'AVAX', tvl: '$145M', txs: '3.3M', gas: 'Low', status: 'Live' },
    { name: 'BNB Chain', symbol: 'BNB', tvl: '$178M', txs: '7.8M', gas: 'Low', status: 'Live' },
    { name: 'Solana', symbol: 'SOL', tvl: '$267M', txs: '12.4M', gas: 'Very Low', status: 'Coming Soon' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Network className="w-6 h-6 text-white" />
          </div>
          Additional Blockchain Networks
        </h1>
        <p className="text-emerald-300/70 mt-2">Multi-chain support for 7+ blockchain networks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Networks', value: '8', icon: Network, change: '+4 new' },
          { label: 'Total TVL', value: '$2.6B', icon: DollarSign, change: '+156%' },
          { label: 'Transactions', value: '50.8M', icon: Zap, change: 'Monthly' },
          { label: 'Active Users', value: '87.4k', icon: Users, change: '+89%' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-4">
            <stat.icon className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-2xl text-white mb-1">{stat.value}</div>
            <div className="text-emerald-300/70 text-sm mb-1">{stat.label}</div>
            <div className="text-emerald-400 text-xs">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {networks.map((network, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white mb-1">{network.name}</h3>
                <span className="text-emerald-300/50 text-sm">{network.symbol}</span>
              </div>
              {network.status === 'Live' ? (
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              ) : (
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs border border-yellow-500/30">
                  Soon
                </span>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">TVL</span>
                <span className="text-white">{network.tvl}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">Transactions</span>
                <span className="text-emerald-400">{network.txs}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">Gas Fees</span>
                <span className={`${
                  network.gas === 'Very Low' ? 'text-emerald-400' :
                  network.gas === 'Low' ? 'text-blue-400' :
                  'text-orange-400'
                }`}>
                  {network.gas}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
