import { TrendingUp, ArrowUpRight, ArrowDownRight, Activity, DollarSign, BarChart3, LineChart, Wallet, RefreshCw } from 'lucide-react';

export function RIUTrading() {
  const riuMarkets = [
    {
      symbol: 'RIU-CARBON',
      name: 'Carbon Sequestration RIU',
      price: 47.82,
      change24h: 12.4,
      volume24h: 8472893,
      marketCap: 284700000,
      backing: 'Verified carbon sequestration projects',
      totalSupply: 5953847,
    },
    {
      symbol: 'RIU-BIO',
      name: 'Biodiversity RIU',
      price: 38.91,
      change24h: -3.2,
      volume24h: 4829471,
      marketCap: 182400000,
      backing: 'Biodiversity conservation initiatives',
      totalSupply: 4688392,
    },
    {
      symbol: 'RIU-WATER',
      name: 'Water Quality RIU',
      price: 52.17,
      change24h: 8.7,
      volume24h: 3847291,
      marketCap: 147200000,
      backing: 'Water restoration and purification',
      totalSupply: 2821847,
    },
    {
      symbol: 'RIU-SOCIAL',
      name: 'Social Impact RIU',
      price: 41.23,
      change24h: 5.9,
      volume24h: 2948271,
      marketCap: 124800000,
      backing: 'Community health and education',
      totalSupply: 3027394,
    },
  ];

  const tradingPairs = [
    { pair: 'RIU-CARBON/USD', volume: '$8.4M', change: '+12.4%', price: '$47.82' },
    { pair: 'RIU-BIO/USD', volume: '$4.8M', change: '-3.2%', price: '$38.91' },
    { pair: 'RIU-WATER/USD', volume: '$3.8M', change: '+8.7%', price: '$52.17' },
    { pair: 'RIU-CARBON/ETH', volume: '$2.1M', change: '+9.8%', price: '0.0198 ETH' },
  ];

  const recentTrades = [
    { type: 'buy', pair: 'RIU-CARBON/USD', amount: 847, price: 47.82, total: 40504.54, time: '12s ago' },
    { type: 'sell', pair: 'RIU-BIO/USD', amount: 423, price: 38.91, total: 16459.93, time: '28s ago' },
    { type: 'buy', pair: 'RIU-WATER/USD', amount: 291, price: 52.17, total: 15181.47, time: '41s ago' },
    { type: 'buy', pair: 'RIU-CARBON/USD', amount: 1247, price: 47.80, total: 59606.60, time: '1m ago' },
    { type: 'sell', pair: 'RIU-SOCIAL/USD', amount: 582, price: 41.22, total: 23990.04, time: '1m ago' },
  ];

  const orderBook = {
    bids: [
      { price: 47.80, amount: 847, total: 40475.60 },
      { price: 47.78, amount: 1234, total: 58956.52 },
      { price: 47.75, amount: 923, total: 44073.25 },
      { price: 47.72, amount: 2847, total: 135892.84 },
    ],
    asks: [
      { price: 47.82, amount: 423, total: 20227.86 },
      { price: 47.85, amount: 1847, total: 88384.95 },
      { price: 47.88, amount: 647, total: 30980.36 },
      { price: 47.91, amount: 1923, total: 92137.93 },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-emerald-400" />
            RIU Trading
          </h1>
          <p className="text-emerald-300/70 mt-2">
            Trade Regenerative Impact Units (RIUs) — tokenized regenerative assets backed by verified ecological impact
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-400/10 rounded-lg border border-emerald-400/30">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400 text-sm">24h Volume: $19.3M</span>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Market Cap', value: '$739.1M', icon: DollarSign },
          { label: '24h Volume', value: '$19.3M', icon: BarChart3 },
          { label: 'Active Markets', value: '28', icon: LineChart },
          { label: 'Total RIUs', value: '16.5M', icon: Wallet },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
            <div className="flex items-center gap-2 text-emerald-300/70 text-sm mb-2">
              <stat.icon className="w-4 h-4" />
              {stat.label}
            </div>
            <div className="text-white text-2xl">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* RIU Markets */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
        <h2 className="text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-400" />
          Regenerative Impact Units (RIUs)
        </h2>
        <div className="space-y-3">
          {riuMarkets.map((market) => (
            <div
              key={market.symbol}
              className="bg-slate-800/50 border border-emerald-500/10 rounded-lg p-4 hover:border-emerald-400/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white">{market.name}</span>
                    <span className="text-emerald-300/70 text-sm font-mono">{market.symbol}</span>
                  </div>
                  <div className="text-emerald-300/70 text-sm">{market.backing}</div>
                </div>
                <div className="text-right">
                  <div className="text-white text-xl mb-1">${market.price.toFixed(2)}</div>
                  <div className={`flex items-center gap-1 text-sm ${market.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {market.change24h >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(market.change24h)}%
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">24h Volume</div>
                  <div className="text-emerald-300">${(market.volume24h / 1000000).toFixed(1)}M</div>
                </div>
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Market Cap</div>
                  <div className="text-emerald-300">${(market.marketCap / 1000000).toFixed(1)}M</div>
                </div>
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Total Supply</div>
                  <div className="text-emerald-300">{(market.totalSupply / 1000000).toFixed(2)}M</div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button className="px-3 py-1.5 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 rounded text-sm transition-all">
                    Trade
                  </button>
                  <button className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 text-emerald-300 rounded text-sm transition-all">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trading Interface */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Trading Pairs */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
          <h3 className="text-white mb-4">Top Trading Pairs</h3>
          <div className="space-y-2">
            {tradingPairs.map((pair, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 border border-emerald-500/10 rounded p-3 hover:border-emerald-400/30 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-mono">{pair.pair}</span>
                  <span className={`text-sm ${pair.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                    {pair.change}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-300/70 text-xs">Vol: {pair.volume}</span>
                  <span className="text-emerald-300 text-sm">{pair.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Book */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
          <h3 className="text-white mb-4 flex items-center justify-between">
            <span>Order Book</span>
            <span className="text-emerald-300/70 text-xs font-mono">RIU-CARBON/USD</span>
          </h3>

          {/* Asks */}
          <div className="mb-4">
            <div className="text-red-400 text-xs mb-2">Asks (Sell Orders)</div>
            <div className="space-y-1">
              {orderBook.asks.slice().reverse().map((ask, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <span className="text-red-400">{ask.price.toFixed(2)}</span>
                  <span className="text-emerald-300/70">{ask.amount}</span>
                  <span className="text-emerald-300/50">${(ask.total / 1000).toFixed(1)}k</span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Price */}
          <div className="bg-emerald-400/10 border border-emerald-400/30 rounded p-2 mb-4">
            <div className="text-center text-emerald-400 text-lg">$47.82</div>
          </div>

          {/* Bids */}
          <div>
            <div className="text-emerald-400 text-xs mb-2">Bids (Buy Orders)</div>
            <div className="space-y-1">
              {orderBook.bids.map((bid, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400">{bid.price.toFixed(2)}</span>
                  <span className="text-emerald-300/70">{bid.amount}</span>
                  <span className="text-emerald-300/50">${(bid.total / 1000).toFixed(1)}k</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Trades */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
          <h3 className="text-white mb-4 flex items-center justify-between">
            <span>Recent Trades</span>
            <RefreshCw className="w-3 h-3 text-emerald-300/70" />
          </h3>
          <div className="space-y-2">
            {recentTrades.map((trade, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 border border-emerald-500/10 rounded p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`px-2 py-0.5 rounded text-xs ${
                    trade.type === 'buy' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'
                  }`}>
                    {trade.type.toUpperCase()}
                  </div>
                  <span className="text-emerald-300/50 text-xs">{trade.time}</span>
                </div>
                <div className="text-emerald-300/70 text-xs font-mono mb-1">{trade.pair}</div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-emerald-300/50">Amount</div>
                    <div className="text-white">{trade.amount}</div>
                  </div>
                  <div>
                    <div className="text-emerald-300/50">Price</div>
                    <div className="text-white">${trade.price}</div>
                  </div>
                  <div>
                    <div className="text-emerald-300/50">Total</div>
                    <div className="text-emerald-400">${(trade.total / 1000).toFixed(1)}k</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trading Features */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
        <h2 className="text-white mb-4">RIU Trading Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Impact-Backed Value',
              description: 'Each RIU is backed by verified regenerative impact, ensuring real-world environmental value',
              icon: Wallet,
            },
            {
              title: 'Fractional Ownership',
              description: 'Trade fractional RIUs to enable micro-investments in large-scale regenerative projects',
              icon: BarChart3,
            },
            {
              title: 'Dynamic Pricing',
              description: 'AI-powered market making adjusts RIU prices based on verified impact metrics and market demand',
              icon: Activity,
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-slate-800/50 border border-emerald-500/10 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-emerald-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-white mb-1">{feature.title}</h3>
                    <p className="text-emerald-300/70 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
