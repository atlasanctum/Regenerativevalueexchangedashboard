import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, Clock, Shield, AlertTriangle, BarChart3, DollarSign, Leaf, Activity } from 'lucide-react';

const priceHistory = [
  { date: 'Jan', carbon: 24.2, biodiversity: 38.1, watershed: 16.5 },
  { date: 'Feb', carbon: 25.8, biodiversity: 39.4, watershed: 17.2 },
  { date: 'Mar', carbon: 27.1, biodiversity: 41.2, watershed: 18.0 },
  { date: 'Apr', carbon: 26.4, biodiversity: 40.8, watershed: 17.6 },
  { date: 'May', carbon: 28.3, biodiversity: 43.5, watershed: 19.1 },
  { date: 'Jun', carbon: 29.7, biodiversity: 45.2, watershed: 20.4 },
  { date: 'Jul', carbon: 31.2, biodiversity: 47.8, watershed: 21.8 },
];

const contracts = [
  { id: 'CF-MAR27', asset: 'Mangrove Carbon', expiry: 'Mar 2027', price: 31.20, change: +5.4, volume: 142000, oi: 890000, settlement: 'Physical', status: 'Active' },
  { id: 'CF-JUN27', asset: 'Mangrove Carbon', expiry: 'Jun 2027', price: 33.80, change: +6.1, volume: 98000, oi: 654000, settlement: 'Physical', status: 'Active' },
  { id: 'BF-MAR27', asset: 'Biodiversity Credits', expiry: 'Mar 2027', price: 48.50, change: +8.9, volume: 67000, oi: 423000, settlement: 'Cash', status: 'Active' },
  { id: 'WF-DEC26', asset: 'Watershed Services', expiry: 'Dec 2026', price: 21.30, change: -1.2, volume: 34000, oi: 187000, settlement: 'Cash', status: 'Active' },
  { id: 'AF-MAR27', asset: 'Agroforestry Carbon', expiry: 'Mar 2027', price: 37.40, change: +3.8, volume: 89000, oi: 541000, settlement: 'Physical', status: 'Active' },
];

const recentTrades = [
  { time: '14:32', contract: 'CF-MAR27', side: 'Buy', qty: 500, price: 31.18, value: '$15,590' },
  { time: '14:29', contract: 'BF-MAR27', side: 'Sell', qty: 200, price: 48.52, value: '$9,704' },
  { time: '14:25', contract: 'AF-MAR27', side: 'Buy', qty: 1000, price: 37.38, value: '$37,380' },
  { time: '14:18', contract: 'CF-JUN27', side: 'Buy', qty: 350, price: 33.77, value: '$11,820' },
  { time: '14:10', contract: 'WF-DEC26', side: 'Sell', qty: 800, price: 21.34, value: '$17,072' },
];

export function FuturesContracts() {
  const [selectedContract, setSelectedContract] = useState(contracts[0]);
  const [orderSide, setOrderSide] = useState<'Buy' | 'Sell'>('Buy');
  const [qty, setQty] = useState('100');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Futures & Forward Contracts</h2>
          <p className="text-emerald-300/70">Lock in future ecosystem service delivery at current prices</p>
        </div>
        <div className="flex gap-3">
          <Badge className="bg-emerald-400/20 text-emerald-300 border-emerald-500/30">7 Active Contracts</Badge>
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
            <Calendar className="w-4 h-4 mr-2" />
            Expiry Calendar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Open Interest', value: '$284.2M', change: '+12.3%', icon: BarChart3 },
          { label: '24h Volume', value: '$42.8M', change: '+18.7%', icon: Activity },
          { label: 'Avg Contango', value: '2.14%', change: '+0.3%', icon: TrendingUp },
          { label: 'Contracts Live', value: '7', change: '+2', icon: Shield },
        ].map((s) => {
          const Icon = s.icon;
          const pos = s.change.startsWith('+');
          return (
            <Card key={s.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-400 text-xs">{s.label}</span>
                <Icon className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-white text-xl font-bold">{s.value}</div>
              <div className={`text-xs flex items-center gap-1 mt-1 ${pos ? 'text-emerald-400' : 'text-rose-400'}`}>
                {pos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {s.change}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Contract List */}
        <div className="md:col-span-2 space-y-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
            <h3 className="text-white text-sm font-semibold mb-4">Active Futures Contracts</h3>
            <div className="space-y-2">
              {contracts.map((c) => {
                const pos = c.change > 0;
                const isSelected = c.id === selectedContract.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedContract(c)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${isSelected ? 'bg-emerald-400/15 border-emerald-500/40' : 'bg-slate-800/40 border-slate-700/30 hover:border-emerald-500/30'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white text-sm font-medium">{c.id}</span>
                          <Badge className="bg-slate-700/50 text-slate-300 text-xs border-0">{c.settlement}</Badge>
                        </div>
                        <div className="text-emerald-300/60 text-xs">{c.asset} · Expires {c.expiry}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">${c.price.toFixed(2)}</div>
                        <div className={`text-xs flex items-center gap-1 justify-end ${pos ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {pos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {pos ? '+' : ''}{c.change}%
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-2 text-xs text-emerald-300/50">
                      <span>Vol: {c.volume.toLocaleString()}</span>
                      <span>OI: ${(c.oi / 1000000).toFixed(1)}M</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Price Chart */}
          <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
            <h3 className="text-white text-sm font-semibold mb-4">Price History</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={priceHistory}>
                <defs>
                  <linearGradient id="cgrd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                <XAxis dataKey="date" stroke="#6ee7b7" fontSize={11} />
                <YAxis stroke="#6ee7b7" fontSize={11} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} />
                <Area type="monotone" dataKey="carbon" stroke="#10b981" fill="url(#cgrd)" name="Carbon" />
                <Line type="monotone" dataKey="biodiversity" stroke="#06b6d4" dot={false} name="Biodiversity" />
                <Line type="monotone" dataKey="watershed" stroke="#8b5cf6" dot={false} name="Watershed" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Recent Trades */}
          <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
            <h3 className="text-white text-sm font-semibold mb-3">Recent Trades</h3>
            <div className="space-y-2">
              {recentTrades.map((t, i) => (
                <div key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-slate-700/30 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-300/50 text-xs w-10">{t.time}</span>
                    <Badge className={`text-xs border-0 ${t.side === 'Buy' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-rose-400/20 text-rose-300'}`}>{t.side}</Badge>
                    <span className="text-slate-300">{t.contract}</span>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <span className="text-emerald-300/70">{t.qty} units @ ${t.price}</span>
                    <span className="text-white font-medium">{t.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Order Panel */}
        <div className="space-y-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
            <h3 className="text-white text-sm font-semibold mb-4">Place Order</h3>
            <div className="space-y-4">
              <div className="bg-emerald-400/10 rounded-lg p-3 border border-emerald-500/20">
                <div className="text-emerald-300/60 text-xs mb-1">Selected Contract</div>
                <div className="text-white font-bold">{selectedContract.id}</div>
                <div className="text-emerald-300/70 text-xs">{selectedContract.asset}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-white font-bold">${selectedContract.price.toFixed(2)}</span>
                  <span className={`text-xs ${selectedContract.change > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {selectedContract.change > 0 ? '+' : ''}{selectedContract.change}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {(['Buy', 'Sell'] as const).map((side) => (
                  <button
                    key={side}
                    onClick={() => setOrderSide(side)}
                    className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                      orderSide === side
                        ? side === 'Buy' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                        : 'bg-slate-700/40 text-slate-400 hover:bg-slate-700/60'
                    }`}
                  >
                    {side}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-emerald-300/60 text-xs mb-1 block">Quantity (contracts)</label>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-emerald-300/60">
                  <span>Contract Value</span>
                  <span className="text-white">${(selectedContract.price * Number(qty)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-300/60">
                  <span>Margin Required (10%)</span>
                  <span className="text-white">${(selectedContract.price * Number(qty) * 0.1).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-300/60">
                  <span>Expiry</span>
                  <span className="text-white">{selectedContract.expiry}</span>
                </div>
                <div className="flex justify-between text-emerald-300/60">
                  <span>Settlement</span>
                  <span className="text-white">{selectedContract.settlement}</span>
                </div>
              </div>

              <Button className={`w-full ${orderSide === 'Buy' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'}`}>
                {orderSide} {qty} Contracts
              </Button>
            </div>
          </Card>

          <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Risk Notice</span>
            </div>
            <p className="text-emerald-300/60 text-xs">
              Futures contracts involve leverage and carry significant risk.
              Losses can exceed your initial margin. Only trade with capital you can afford to lose.
            </p>
          </Card>

          <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
            <h3 className="text-white text-xs font-semibold mb-3 flex items-center gap-2">
              <Clock className="w-3 h-3 text-emerald-400" />
              Next Expiries
            </h3>
            <div className="space-y-2">
              {[
                { contract: 'WF-DEC26', days: 42 },
                { contract: 'CF-MAR27', days: 132 },
                { contract: 'BF-MAR27', days: 132 },
              ].map((e) => (
                <div key={e.contract} className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">{e.contract}</span>
                  <Badge className="bg-slate-700/50 text-slate-300 border-0">{e.days} days</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
