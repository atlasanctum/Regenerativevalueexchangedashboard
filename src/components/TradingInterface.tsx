import { useState } from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, DollarSign, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const assets = [
  {
    symbol: 'CARB',
    name: 'Carbon Sequestration Credits',
    price: 124.56,
    change: 5.7,
    volume: '847M',
    category: 'Environmental',
    color: 'emerald',
  },
  {
    symbol: 'FRST',
    name: 'Forest Restoration Tokens',
    price: 89.34,
    change: 3.2,
    volume: '423M',
    category: 'Environmental',
    color: 'emerald',
  },
  {
    symbol: 'WETL',
    name: 'Wetland Revival Credits',
    price: 67.89,
    change: -1.4,
    volume: '234M',
    category: 'Environmental',
    color: 'emerald',
  },
  {
    symbol: 'WELL',
    name: 'Community Wellness Bonds',
    price: 156.78,
    change: 4.5,
    volume: '567M',
    category: 'Health & Social',
    color: 'blue',
  },
  {
    symbol: 'LANG',
    name: 'Language Preservation Units',
    price: 43.21,
    change: 8.9,
    volume: '123M',
    category: 'Cultural',
    color: 'amber',
  },
  {
    symbol: 'POLL',
    name: 'Pollination Service Credits',
    price: 78.45,
    change: 2.3,
    volume: '289M',
    category: 'Ecosystem Services',
    color: 'purple',
  },
];

const chartData = [
  { time: '9:00', price: 118 },
  { time: '10:00', price: 119.5 },
  { time: '11:00', price: 121 },
  { time: '12:00', price: 120 },
  { time: '1:00', price: 122.5 },
  { time: '2:00', price: 123 },
  { time: '3:00', price: 124.5 },
];

const recentTrades = [
  { id: 1, asset: 'CARB', type: 'buy', price: 124.56, amount: 1000, time: '2 min ago' },
  { id: 2, asset: 'WELL', type: 'sell', price: 156.78, amount: 500, time: '5 min ago' },
  { id: 3, asset: 'LANG', type: 'buy', price: 43.21, amount: 2500, time: '8 min ago' },
  { id: 4, asset: 'FRST', type: 'buy', price: 89.34, amount: 750, time: '12 min ago' },
  { id: 5, asset: 'POLL', type: 'sell', price: 78.45, amount: 1200, time: '15 min ago' },
];

export function TradingInterface() {
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6">
        <h2 className="text-white mb-2">Regenerative Asset Trading</h2>
        <p className="text-emerald-300/80">
          Trade regenerative credits and tokens backed by real ecological restoration, cultural preservation, 
          and community well-being initiatives.
        </p>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-black/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
          <div className="text-emerald-300/70 text-sm mb-2">24h Trading Volume</div>
          <div className="text-white mb-1">$2.48B</div>
          <div className="flex items-center gap-1 text-emerald-400 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+12.5%</span>
          </div>
        </div>
        <div className="bg-black/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
          <div className="text-emerald-300/70 text-sm mb-2">Active Traders</div>
          <div className="text-white mb-1">23,847</div>
          <div className="flex items-center gap-1 text-emerald-400 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+8.3%</span>
          </div>
        </div>
        <div className="bg-black/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
          <div className="text-emerald-300/70 text-sm mb-2">Total Assets</div>
          <div className="text-white mb-1">142</div>
          <div className="flex items-center gap-1 text-emerald-400 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+3 new</span>
          </div>
        </div>
        <div className="bg-black/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
          <div className="text-emerald-300/70 text-sm mb-2">Impact Verified</div>
          <div className="text-white mb-1">$847.3B</div>
          <div className="flex items-center gap-1 text-emerald-400 text-sm">
            <Activity className="w-4 h-4" />
            <span>Real-time</span>
          </div>
        </div>
      </div>

      {/* Main Trading Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Asset List */}
        <div className="lg:col-span-2 bg-black/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
          <h3 className="text-white mb-6">Market Overview</h3>
          <div className="space-y-2">
            {assets.map((asset) => (
              <button
                key={asset.symbol}
                onClick={() => setSelectedAsset(asset)}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
                  selectedAsset.symbol === asset.symbol
                    ? 'bg-emerald-500/20 border border-emerald-500/40'
                    : 'bg-emerald-900/10 border border-emerald-500/10 hover:border-emerald-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br from-${asset.color}-500 to-${asset.color}-600 rounded-lg flex items-center justify-center text-white`}>
                    {asset.symbol.substring(0, 2)}
                  </div>
                  <div className="text-left">
                    <div className="text-white">{asset.symbol}</div>
                    <div className="text-emerald-300/70 text-sm">{asset.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white mb-1">${asset.price}</div>
                  <div className={`flex items-center gap-1 text-sm ${asset.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {asset.change >= 0 ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span>{Math.abs(asset.change)}%</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Trading Panel */}
        <div className="bg-black/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
          <h3 className="text-white mb-6">Trade {selectedAsset.symbol}</h3>
          
          {/* Buy/Sell Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setTradeType('buy')}
              className={`flex-1 py-3 rounded-lg transition-all ${
                tradeType === 'buy'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setTradeType('sell')}
              className={`flex-1 py-3 rounded-lg transition-all ${
                tradeType === 'sell'
                  ? 'bg-red-500 text-white'
                  : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
              }`}
            >
              Sell
            </button>
          </div>

          {/* Current Price */}
          <div className="bg-emerald-900/20 rounded-lg p-4 mb-6">
            <div className="text-emerald-300/70 text-sm mb-1">Current Price</div>
            <div className="text-white">${selectedAsset.price}</div>
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="text-emerald-300/70 text-sm mb-2 block">Amount (Credits)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-emerald-900/20 border border-emerald-500/20 rounded-lg px-4 py-3 text-white placeholder:text-emerald-300/30 focus:outline-none focus:border-emerald-500/40"
            />
          </div>

          {/* Total */}
          <div className="bg-emerald-900/20 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-emerald-300/70 text-sm">Total</span>
              <span className="text-white">
                ${amount ? (parseFloat(amount) * selectedAsset.price).toFixed(2) : '0.00'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-emerald-300/70">Trading Fee (0.1%)</span>
              <span className="text-emerald-300/70">
                ${amount ? ((parseFloat(amount) * selectedAsset.price) * 0.001).toFixed(2) : '0.00'}
              </span>
            </div>
          </div>

          {/* Trade Button */}
          <button
            className={`w-full py-3 rounded-lg transition-all ${
              tradeType === 'buy'
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {tradeType === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
          </button>

          {/* Impact Info */}
          <div className="mt-6 pt-6 border-t border-emerald-500/20">
            <div className="text-emerald-300/70 text-sm mb-2">Impact Backing</div>
            <div className="text-emerald-400 text-sm">
              Each {selectedAsset.symbol} credit is backed by verified regenerative impact, 
              tracked in real-time through our AI verification layer.
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-black/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
        <h3 className="text-white mb-6">{selectedAsset.symbol} - Today's Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#10b981" opacity={0.1} />
            <XAxis dataKey="time" stroke="#6ee7b7" />
            <YAxis stroke="#6ee7b7" domain={['dataMin - 5', 'dataMax + 5']} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#064e3b', 
                border: '1px solid #10b981',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Line type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Trades */}
      <div className="bg-black/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
        <h3 className="text-white mb-6">Recent Market Activity</h3>
        <div className="space-y-3">
          {recentTrades.map((trade) => (
            <div key={trade.id} className="flex items-center justify-between bg-emerald-900/10 border border-emerald-500/10 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <div className={`px-3 py-1 rounded-full text-sm ${
                  trade.type === 'buy' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {trade.type.toUpperCase()}
                </div>
                <div>
                  <div className="text-white mb-1">{trade.asset}</div>
                  <div className="text-emerald-300/70 text-sm">{trade.amount.toLocaleString()} credits @ ${trade.price}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white mb-1">${(trade.amount * trade.price).toLocaleString()}</div>
                <div className="text-emerald-300/50 text-sm">{trade.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
