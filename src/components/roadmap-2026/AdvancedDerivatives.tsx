import { TrendingUp, BarChart3, PieChart, Target, DollarSign, LineChart } from 'lucide-react';

export function AdvancedDerivatives() {
  const products = [
    {
      name: 'Perpetual Swaps',
      type: 'Futures',
      volume: '$47.2M',
      openInterest: '$12.8M',
      funding: '0.01%',
      leverage: '10x',
    },
    {
      name: 'Options Contracts',
      type: 'Options',
      volume: '$23.4M',
      openInterest: '$8.3M',
      iv: '45.2%',
      strike: 'Multiple',
    },
    {
      name: 'Structured Products',
      type: 'Structured',
      volume: '$18.9M',
      openInterest: '$5.7M',
      yield: '12.5%',
      maturity: '90 days',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
            <LineChart className="w-6 h-6 text-white" />
          </div>
          Advanced Derivatives
        </h1>
        <p className="text-emerald-300/70 mt-2">Perpetual swaps, options, and structured impact products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Volume', value: '$89.5M', icon: TrendingUp, change: '+34%' },
          { label: 'Open Interest', value: '$26.8M', icon: BarChart3, change: '+28%' },
          { label: 'Active Traders', value: '3,847', icon: Target, change: '+67%' },
          { label: 'Product Types', value: '12', icon: PieChart, change: '+4 new' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-4">
            <stat.icon className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-2xl text-white mb-1">{stat.value}</div>
            <div className="text-emerald-300/70 text-sm mb-1">{stat.label}</div>
            <div className="text-emerald-400 text-xs">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white mb-1">{product.name}</h3>
                <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded border border-purple-500/30">
                  {product.type}
                </span>
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">24h Volume</span>
                <span className="text-white">{product.volume}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">Open Interest</span>
                <span className="text-emerald-400">{product.openInterest}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">
                  {product.type === 'Futures' ? 'Funding Rate' : product.type === 'Options' ? 'Implied Vol' : 'Yield'}
                </span>
                <span className="text-white">
                  {product.type === 'Futures' ? product.funding : product.type === 'Options' ? product.iv : product.yield}
                </span>
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all">
              Trade Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
