import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { TrendingUp, TrendingDown, Activity, BarChart3, Wallet, ArrowRightLeft, LineChart, Layers, DollarSign } from 'lucide-react';
import { LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export function AdvancedTradingHub() {
  const priceData = [
    { time: '00:00', mangrove: 24.5, agroforestry: 31.2, biodiversity: 42.8 },
    { time: '04:00', mangrove: 25.1, agroforestry: 32.1, biodiversity: 43.2 },
    { time: '08:00', mangrove: 26.3, agroforestry: 33.4, biodiversity: 44.1 },
    { time: '12:00', mangrove: 27.8, agroforestry: 35.2, biodiversity: 46.3 },
    { time: '16:00', mangrove: 27.2, agroforestry: 34.8, biodiversity: 45.7 },
    { time: '20:00', mangrove: 28.1, agroforestry: 35.9, biodiversity: 47.2 }
  ];

  const markets = [
    { asset: 'Mangrove Carbon', price: 28.10, change: +5.3, volume: 234000, liquidity: 12.4e6, type: 'Carbon' },
    { asset: 'Biodiversity Credits', price: 47.20, change: +8.7, volume: 89000, liquidity: 8.9e6, type: 'Biodiversity' },
    { asset: 'Agroforestry Carbon', price: 35.90, change: +3.2, volume: 167000, liquidity: 10.2e6, type: 'Carbon' },
    { asset: 'Watershed Services', price: 18.50, change: -1.4, volume: 56000, liquidity: 3.4e6, type: 'Ecosystem' },
    { asset: 'Cultural Heritage', price: 62.30, change: +12.1, volume: 23000, liquidity: 5.1e6, type: 'Cultural' },
    { asset: 'Kelp Forest Regen', price: 41.80, change: +6.9, volume: 78000, liquidity: 7.2e6, type: 'Marine' }
  ];

  const recentTrades = [
    { time: '2 min ago', asset: 'Mangrove Carbon', amount: 1250, price: 28.05, buyer: 'Microsoft', type: 'buy' },
    { time: '5 min ago', asset: 'Biodiversity Credits', amount: 450, price: 47.15, buyer: 'Patagonia', type: 'buy' },
    { time: '8 min ago', asset: 'Agroforestry Carbon', amount: 2100, price: 35.85, buyer: 'Unilever', type: 'buy' },
    { time: '12 min ago', asset: 'Cultural Heritage', amount: 180, price: 62.20, buyer: 'Indigenous DAO', type: 'buy' },
    { time: '18 min ago', asset: 'Watershed Services', amount: 890, price: 18.60, buyer: 'Nestlé Waters', type: 'sell' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Advanced Trading Hub</h2>
          <p className="text-emerald-300/70">
            Real-time markets for regenerative assets with advanced trading tools
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            New Trade
          </Button>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid md:grid-cols-5 gap-4">
        {[
          { label: 'Total Volume (24h)', value: '$142.8M', change: '+23.4%', icon: BarChart3 },
          { label: 'Active Traders', value: '8,934', change: '+12.1%', icon: Activity },
          { label: 'Total Liquidity', value: '$847.3M', change: '+8.7%', icon: DollarSign },
          { label: 'Avg Spread', value: '0.23%', change: '-5.2%', icon: LineChart },
          { label: 'Asset Pairs', value: '127', change: '+6', icon: Layers }
        ].map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          return (
            <Card key={stat.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-emerald-400 text-sm">{stat.label}</div>
                <Icon className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-white text-xl font-bold">{stat.value}</div>
              <div className={`text-sm flex items-center gap-1 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Trading Interface */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart & Market Data */}
        <div className="lg:col-span-2 space-y-4">
          {/* Price Chart */}
          <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
            <h3 className="text-white mb-4">Asset Prices (24h)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={priceData}>
                <defs>
                  <linearGradient id="colorMangrove" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAgro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBio" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" />
                <XAxis dataKey="time" stroke="#6ee7b7" />
                <YAxis stroke="#6ee7b7" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b981', borderRadius: '8px' }}
                  labelStyle={{ color: '#6ee7b7' }}
                />
                <Area type="monotone" dataKey="mangrove" stroke="#10b981" fillOpacity={1} fill="url(#colorMangrove)" />
                <Area type="monotone" dataKey="agroforestry" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAgro)" />
                <Area type="monotone" dataKey="biodiversity" stroke="#a855f7" fillOpacity={1} fill="url(#colorBio)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                <span className="text-emerald-300/70 text-sm">Mangrove Carbon</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full" />
                <span className="text-emerald-300/70 text-sm">Agroforestry</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full" />
                <span className="text-emerald-300/70 text-sm">Biodiversity</span>
              </div>
            </div>
          </Card>

          {/* Market Overview */}
          <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
            <h3 className="text-white mb-4">Live Markets</h3>
            <div className="space-y-2">
              {markets.map((market, idx) => {
                const isPositive = market.change > 0;
                return (
                  <div
                    key={`market-${idx}`}
                    className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-white text-xs">
                        {market.asset.substring(0, 2)}
                      </div>
                      <div>
                        <div className="text-white font-medium">{market.asset}</div>
                        <div className="text-emerald-300/70 text-sm">
                          Vol: {(market.volume / 1000).toFixed(0)}K
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-300">
                      {market.type}
                    </Badge>
                    <div className="text-right min-w-[80px]">
                      <div className="text-white font-medium">${market.price.toFixed(2)}</div>
                      <div className={`text-sm ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isPositive ? '+' : ''}{market.change.toFixed(1)}%
                      </div>
                    </div>
                    <Button size="sm" className="ml-4 bg-emerald-600 hover:bg-emerald-700">
                      Trade
                    </Button>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Sidebar - Recent Trades & Quick Actions */}
        <div className="space-y-4">
          {/* Quick Trade */}
          <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
            <h3 className="text-white mb-4">Quick Trade</h3>
            <Tabs defaultValue="buy">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
              </TabsList>
              <TabsContent value="buy" className="space-y-3">
                <div>
                  <label className="text-emerald-300/70 text-sm mb-2 block">Asset</label>
                  <select className="w-full bg-slate-800/50 border border-emerald-500/20 rounded-lg px-3 py-2 text-white">
                    <option>Mangrove Carbon</option>
                    <option>Biodiversity Credits</option>
                    <option>Agroforestry Carbon</option>
                  </select>
                </div>
                <div>
                  <label className="text-emerald-300/70 text-sm mb-2 block">Amount</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-slate-800/50 border border-emerald-500/20 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div className="bg-emerald-400/10 border border-emerald-500/20 rounded-lg p-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-emerald-300/70">Estimated Price</span>
                    <span className="text-white">$28.10/unit</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-300/70">Total</span>
                    <span className="text-emerald-400 font-medium">$0.00</span>
                  </div>
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Place Buy Order
                </Button>
              </TabsContent>
              <TabsContent value="sell" className="space-y-3">
                <p className="text-emerald-300/70 text-sm">Sell functionality similar to buy</p>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Recent Trades */}
          <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
            <h3 className="text-white mb-4">Recent Trades</h3>
            <div className="space-y-3">
              {recentTrades.map((trade, idx) => (
                <div key={`trade-${idx}`} className="flex items-start gap-3 pb-3 border-b border-emerald-500/10 last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${trade.type === 'buy' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">{trade.asset}</div>
                    <div className="text-emerald-300/70 text-xs">{trade.buyer}</div>
                    <div className="text-emerald-300/70 text-xs">{trade.time}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-white text-sm">{trade.amount}</div>
                    <div className="text-emerald-300/70 text-xs">${trade.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
