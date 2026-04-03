import { Code, Package, Star, Download, DollarSign, Shield, Zap, TrendingUp } from 'lucide-react';

export function APIMarketplace() {
  const apis = [
    {
      name: 'Verification Oracle API',
      category: 'Verification',
      description: 'Real-time project verification data with 97.8% accuracy',
      price: '$0.05/call',
      calls: '2.4M/mo',
      rating: 4.9,
      downloads: '12.5k',
    },
    {
      name: 'Carbon Credit Pricing',
      category: 'Market Data',
      description: 'Live carbon credit prices from 4 major registries',
      price: '$99/mo',
      calls: '500k/mo',
      rating: 4.8,
      downloads: '8.3k',
    },
    {
      name: 'Impact Analytics Engine',
      category: 'Analytics',
      description: 'AI-powered impact metrics and predictions',
      price: '$0.10/call',
      calls: '1.1M/mo',
      rating: 4.7,
      downloads: '6.2k',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          API Marketplace
        </h1>
        <p className="text-emerald-300/70 mt-2">Discover and integrate third-party APIs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Available APIs', value: '147', icon: Package },
          { label: 'Developers', value: '2,847', icon: Code },
          { label: 'API Calls/Day', value: '8.4M', icon: Zap },
          { label: 'Revenue', value: '$124k', icon: DollarSign },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-4">
            <stat.icon className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-2xl text-white mb-1">{stat.value}</div>
            <div className="text-emerald-300/70 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {apis.map((api, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white mb-1">{api.name}</h3>
                <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30">
                  {api.category}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white text-sm">{api.rating}</span>
              </div>
            </div>
            <p className="text-emerald-300/70 text-sm mb-4">{api.description}</p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">Pricing</span>
                <span className="text-white">{api.price}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">Monthly Calls</span>
                <span className="text-emerald-400">{api.calls}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">Downloads</span>
                <span className="text-white">{api.downloads}</span>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Install API
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
