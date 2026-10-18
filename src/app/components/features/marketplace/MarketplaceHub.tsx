import { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import {
  TrendingUp, TrendingDown, Search, ShoppingCart, PlusCircle,
  Activity, DollarSign, Users, BarChart2, Shield, Globe, Leaf,
} from 'lucide-react';

const assets = [
  { id: 'BRZ-001', name: 'Amazon Mangrove Carbon', type: 'Carbon Credit', region: 'Brazil', price: 31.20, change: +2.4, volume: '$2.1M', verified: 'Gold Standard', score: 94, available: 142000, unit: 'tCO₂e', trend: [28,29,30,29.5,31,31.2] },
  { id: 'AUS-007', name: 'Great Barrier Reef BioCredit', type: 'Biodiversity', region: 'Australia', price: 48.70, change: +5.1, volume: '$840K', verified: 'VCS', score: 97, available: 28400, unit: 'BioUnit', trend: [42,44,45,47,48,48.7] },
  { id: 'COL-003', name: 'Cloud Forest Watershed', type: 'Watershed', region: 'Colombia', price: 18.40, change: -0.8, volume: '$430K', verified: 'Plan Vivo', score: 91, available: 67000, unit: 'WatershedUnit', trend: [19,18.9,18.5,18.4,18.4,18.4] },
  { id: 'KEN-012', name: 'Savanna Biodiversity', type: 'Biodiversity', region: 'Kenya', price: 22.10, change: +1.2, volume: '$320K', verified: 'Gold Standard', score: 88, available: 54200, unit: 'BioUnit', trend: [20,21,21.5,22,22.1,22.1] },
  { id: 'IDN-008', name: 'Borneo Peatland Carbon', type: 'Carbon Credit', region: 'Indonesia', price: 27.80, change: +3.8, volume: '$1.4M', verified: 'VCS', score: 92, available: 98000, unit: 'tCO₂e', trend: [24,25,26,27,27.5,27.8] },
  { id: 'CHI-002', name: 'Patagonia Soil Carbon', type: 'Soil Carbon', region: 'Chile', price: 14.60, change: -1.4, volume: '$180K', verified: 'ACR', score: 85, available: 31000, unit: 'tCO₂e', trend: [16,15.5,15,14.8,14.6,14.6] },
  { id: 'IND-015', name: 'Western Ghats Forest', type: 'Carbon Credit', region: 'India', price: 24.30, change: +0.9, volume: '$560K', verified: 'VCS', score: 90, available: 77000, unit: 'tCO₂e', trend: [23,23.5,24,24.2,24.3,24.3] },
  { id: 'PHI-006', name: 'Coral Triangle BioCredit', type: 'Marine Biodiversity', region: 'Philippines', price: 52.40, change: +6.2, volume: '$720K', verified: 'Gold Standard', score: 96, available: 18700, unit: 'MarineUnit', trend: [44,47,49,51,52,52.4] },
  { id: 'GHA-009', name: 'West Africa Mangrove', type: 'Blue Carbon', region: 'Ghana', price: 36.90, change: +4.1, volume: '$280K', verified: 'Plan Vivo', score: 89, available: 43000, unit: 'tCO₂e', trend: [32,33,35,36,36.5,36.9] },
  { id: 'USA-011', name: 'Prairie Soil Restoration', type: 'Soil Carbon', region: 'USA', price: 12.80, change: -0.3, volume: '$95K', verified: 'ACR', score: 83, available: 88000, unit: 'tCO₂e', trend: [13.2,13,12.9,12.8,12.8,12.8] },
];

const typeColors: Record<string, string> = {
  'Carbon Credit':      'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'Biodiversity':       'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Watershed':          'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'Soil Carbon':        'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'Blue Carbon':        'bg-teal-500/20 text-teal-300 border-teal-500/30',
  'Marine Biodiversity':'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
};

const verifiedColors: Record<string, string> = {
  'Gold Standard': 'text-yellow-400',
  'VCS':           'text-emerald-400',
  'Plan Vivo':     'text-cyan-400',
  'ACR':           'text-blue-400',
};

const filterTypes = ['All', 'Carbon Credit', 'Biodiversity', 'Watershed', 'Soil Carbon', 'Blue Carbon'];

// Order book helpers
function buildBuyOrders(midPrice: number) {
  return Array.from({ length: 8 }, (_, i) => {
    const p = parseFloat((midPrice - i * 0.15 - 0.05).toFixed(2));
    const qty = Math.floor(500 + Math.random() * 4500);
    return { price: p, qty, total: parseFloat((p * qty).toFixed(0)) };
  });
}
function buildSellOrders(midPrice: number) {
  return Array.from({ length: 8 }, (_, i) => {
    const p = parseFloat((midPrice + i * 0.15 + 0.05).toFixed(2));
    const qty = Math.floor(500 + Math.random() * 4500);
    return { price: p, qty, total: parseFloat((p * qty).toFixed(0)) };
  });
}

const recentTrades = [
  { time: '14:32:01', price: 31.25, qty: 2400, side: 'buy' },
  { time: '14:31:48', price: 31.18, qty: 1800, side: 'sell' },
  { time: '14:31:30', price: 31.22, qty: 3100, side: 'buy' },
  { time: '14:31:12', price: 31.15, qty: 900, side: 'sell' },
  { time: '14:30:55', price: 31.28, qty: 5200, side: 'buy' },
  { time: '14:30:39', price: 31.20, qty: 2700, side: 'buy' },
  { time: '14:30:21', price: 31.10, qty: 1100, side: 'sell' },
  { time: '14:30:05', price: 31.05, qty: 4400, side: 'sell' },
];

const portfolioHoldings = [
  { id: 'BRZ-001', name: 'Amazon Mangrove Carbon', qty: 5000, avgCost: 27.40, currentPrice: 31.20, type: 'Carbon Credit' },
  { id: 'AUS-007', name: 'Great Barrier Reef BioCredit', qty: 1200, avgCost: 42.10, currentPrice: 48.70, type: 'Biodiversity' },
  { id: 'IDN-008', name: 'Borneo Peatland Carbon', qty: 3500, avgCost: 24.50, currentPrice: 27.80, type: 'Carbon Credit' },
  { id: 'PHI-006', name: 'Coral Triangle BioCredit', qty: 800, avgCost: 45.00, currentPrice: 52.40, type: 'Marine Biodiversity' },
  { id: 'GHA-009', name: 'West Africa Mangrove', qty: 2100, avgCost: 33.20, currentPrice: 36.90, type: 'Blue Carbon' },
];

const portfolioHistory = [
  { month: 'Mar', value: 280000 },
  { month: 'Apr', value: 305000 },
  { month: 'May', value: 298000 },
  { month: 'Jun', value: 342000 },
  { month: 'Jul', value: 378000 },
  { month: 'Aug', value: 421400 },
];

const priceHistory = Array.from({ length: 90 }, (_, i) => ({
  day: i + 1,
  'BRZ-001': parseFloat((27 + Math.sin(i / 8) * 2 + i * 0.047).toFixed(2)),
  'AUS-007': parseFloat((42 + Math.sin(i / 10 + 1) * 3 + i * 0.074).toFixed(2)),
  'PHI-006': parseFloat((44 + Math.sin(i / 7 + 2) * 4 + i * 0.094).toFixed(2)),
  volume: Math.floor(800000 + Math.sin(i / 5) * 400000 + Math.random() * 300000),
}));

const correlationAssets = ['BRZ-001', 'AUS-007', 'IDN-008', 'PHI-006', 'GHA-009'];
const correlationMatrix = [
  [1.00, 0.82, 0.91, 0.67, 0.75],
  [0.82, 1.00, 0.79, 0.88, 0.61],
  [0.91, 0.79, 1.00, 0.72, 0.83],
  [0.67, 0.88, 0.72, 1.00, 0.59],
  [0.75, 0.61, 0.83, 0.59, 1.00],
];

function corrColor(v: number): string {
  if (v >= 0.9) return 'bg-emerald-500/80';
  if (v >= 0.8) return 'bg-emerald-500/60';
  if (v >= 0.7) return 'bg-emerald-500/40';
  if (v >= 0.6) return 'bg-emerald-500/20';
  return 'bg-slate-700/40';
}

export function MarketplaceHub() {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [quantity, setQuantity] = useState('1000');

  const filteredAssets = assets.filter(a => {
    const matchType = selectedType === 'All' || a.type === selectedType;
    const matchSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  const trendData = selectedAsset.trend.map((v, i) => ({ t: i, v }));
  const buyOrders = buildBuyOrders(selectedAsset.price);
  const sellOrders = buildSellOrders(selectedAsset.price);
  const qty = parseFloat(quantity) || 0;
  const total = (qty * selectedAsset.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const portfolioTotalValue = portfolioHoldings.reduce((sum, h) => sum + h.qty * h.currentPrice, 0);
  const portfolioTotalCost  = portfolioHoldings.reduce((sum, h) => sum + h.qty * h.avgCost, 0);
  const portfolioUnrealizedPL = portfolioTotalValue - portfolioTotalCost;
  const portfolioPLPct = ((portfolioUnrealizedPL / portfolioTotalCost) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Leaf className="w-6 h-6 text-emerald-400" />
            RVE Asset Marketplace
          </h1>
          <p className="text-slate-400 text-sm mt-1">Trade verified real-value environmental assets globally</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Markets
          </span>
          <Button className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" /> Buy Order
          </Button>
          <Button className="bg-slate-700 hover:bg-slate-600 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2">
            <PlusCircle className="w-4 h-4" /> List Asset
          </Button>
        </div>
      </div>

      {/* Stat Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Listed Assets', value: '847', icon: <BarChart2 className="w-4 h-4 text-emerald-400" />, sub: '+12 today' },
          { label: '24h Volume', value: '$12.4M', icon: <DollarSign className="w-4 h-4 text-emerald-400" />, sub: '+8.3% vs yesterday' },
          { label: 'Avg Verification Score', value: '91.4', icon: <Shield className="w-4 h-4 text-emerald-400" />, sub: 'Across all assets' },
          { label: 'Active Buyers', value: '3,847', icon: <Users className="w-4 h-4 text-emerald-400" />, sub: '+234 this week' },
        ].map(s => (
          <Card key={s.label} className="bg-slate-900/50 border border-emerald-500/20 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-400 text-xs">{s.label}</span>
              {s.icon}
            </div>
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-emerald-400 mt-0.5">{s.sub}</div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="browse">
        <TabsList className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-1 gap-1">
          <TabsTrigger value="browse"  className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-slate-400 rounded-lg px-4 py-2 text-sm">Browse Assets</TabsTrigger>
          <TabsTrigger value="orderbook" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-slate-400 rounded-lg px-4 py-2 text-sm">Order Book</TabsTrigger>
          <TabsTrigger value="portfolio" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-slate-400 rounded-lg px-4 py-2 text-sm">My Portfolio</TabsTrigger>
          <TabsTrigger value="price"   className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-slate-400 rounded-lg px-4 py-2 text-sm">Price Discovery</TabsTrigger>
        </TabsList>

        {/* ── BROWSE ASSETS ── */}
        <TabsContent value="browse" className="mt-4">
          {/* Search + filter */}
          <div className="flex flex-wrap gap-3 mb-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search assets, IDs, regions…"
                className="w-full bg-slate-900/50 border border-emerald-500/20 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {filterTypes.map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedType === t
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {/* Asset list */}
            <div className="flex-1 space-y-2 min-w-0">
              {filteredAssets.map(a => (
                <Card
                  key={a.id}
                  onClick={() => setSelectedAsset(a)}
                  className={`bg-slate-900/50 border rounded-xl p-3 cursor-pointer transition-colors ${
                    selectedAsset.id === a.id
                      ? 'border-emerald-500/60 bg-emerald-900/10'
                      : 'border-emerald-500/20 hover:border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    {/* ID + name */}
                    <div className="w-20 shrink-0">
                      <div className="text-xs font-mono text-emerald-400">{a.id}</div>
                    </div>
                    <div className="flex-1 min-w-[140px]">
                      <div className="text-sm font-semibold text-white truncate">{a.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${typeColors[a.type] ?? 'bg-slate-700 text-slate-300'}`}>{a.type}</span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-0.5"><Globe className="w-2.5 h-2.5" />{a.region}</span>
                      </div>
                    </div>
                    {/* Price */}
                    <div className="text-right shrink-0">
                      <div className="text-base font-bold text-white">${a.price.toFixed(2)}</div>
                      <div className={`text-xs flex items-center gap-0.5 justify-end ${a.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {a.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {a.change >= 0 ? '+' : ''}{a.change}%
                      </div>
                    </div>
                    {/* Volume */}
                    <div className="text-right shrink-0 hidden sm:block">
                      <div className="text-xs text-slate-400">Vol</div>
                      <div className="text-xs text-white">{a.volume}</div>
                    </div>
                    {/* Score bar */}
                    <div className="w-24 shrink-0 hidden md:block">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-slate-400">Score</span>
                        <span className="text-emerald-400">{a.score}</span>
                      </div>
                      <div className="h-1.5 bg-slate-700 rounded-full">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${a.score}%` }} />
                      </div>
                    </div>
                    {/* Available */}
                    <div className="text-right shrink-0 hidden lg:block">
                      <div className="text-[10px] text-slate-400">Available</div>
                      <div className="text-xs text-white">{a.available.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-500">{a.unit}</div>
                    </div>
                  </div>
                </Card>
              ))}
              {filteredAssets.length === 0 && (
                <div className="text-center py-12 text-slate-500">No assets match your filters.</div>
              )}
            </div>

            {/* Detail panel */}
            <div className="w-72 shrink-0 hidden xl:block">
              <Card className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-4 sticky top-4 space-y-4">
                <div>
                  <div className="text-xs font-mono text-emerald-400 mb-0.5">{selectedAsset.id}</div>
                  <div className="text-base font-bold text-white leading-tight">{selectedAsset.name}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${typeColors[selectedAsset.type] ?? ''}`}>{selectedAsset.type}</span>
                    <span className="text-[10px] text-slate-400">{selectedAsset.region}</span>
                  </div>
                </div>
                <div className="flex items-end gap-3">
                  <div>
                    <div className="text-2xl font-bold text-white">${selectedAsset.price.toFixed(2)}</div>
                    <div className={`text-sm flex items-center gap-1 ${selectedAsset.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {selectedAsset.change >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      {selectedAsset.change >= 0 ? '+' : ''}{selectedAsset.change}% 24h
                    </div>
                  </div>
                  <div className="text-right ml-auto">
                    <div className="text-xs text-slate-400">Volume</div>
                    <div className="text-sm text-white">{selectedAsset.volume}</div>
                  </div>
                </div>

                {/* Sparkline */}
                <div className="h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <Line type="monotone" dataKey="v" stroke="#10b981" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Verification */}
                <div className="flex items-center justify-between bg-slate-800/60 rounded-lg p-2.5">
                  <div className="flex items-center gap-2">
                    <Shield className={`w-4 h-4 ${verifiedColors[selectedAsset.verified] ?? 'text-emerald-400'}`} />
                    <span className="text-xs text-slate-300">{selectedAsset.verified}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-400">Score</span>
                    <span className="text-xs font-bold text-emerald-400">{selectedAsset.score}</span>
                  </div>
                </div>

                {/* Available */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Available</span>
                  <span className="text-white">{selectedAsset.available.toLocaleString()} <span className="text-slate-500 text-xs">{selectedAsset.unit}</span></span>
                </div>

                {/* Buy form */}
                <div className="space-y-2 pt-1 border-t border-emerald-500/10">
                  <div className="text-xs text-slate-400 font-medium">Place Buy Order</div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Quantity ({selectedAsset.unit})</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={e => setQuantity(e.target.value)}
                      className="w-full bg-slate-800 border border-emerald-500/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/60"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Total</span>
                    <span className="text-emerald-400 font-bold">{total}</span>
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg text-sm">
                    Buy {selectedAsset.unit}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ── ORDER BOOK ── */}
        <TabsContent value="orderbook" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Buy orders */}
            <Card className="bg-slate-900/50 border border-emerald-500/20 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-emerald-500/10 flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Buy Orders</span>
                <span className="text-xs text-emerald-400">{assets[0].id} — {assets[0].name}</span>
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="px-4 py-2 text-left font-medium">Price (USD)</th>
                    <th className="px-4 py-2 text-right font-medium">Quantity</th>
                    <th className="px-4 py-2 text-right font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {buyOrders.map((o, i) => (
                    <tr key={i} className="border-b border-slate-800/50 hover:bg-emerald-900/10 transition-colors">
                      <td className="px-4 py-2 text-emerald-400 font-mono font-semibold">${o.price.toFixed(2)}</td>
                      <td className="px-4 py-2 text-right text-white">{o.qty.toLocaleString()}</td>
                      <td className="px-4 py-2 text-right text-slate-300">${(o.price * o.qty).toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            {/* Sell orders */}
            <Card className="bg-slate-900/50 border border-emerald-500/20 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-emerald-500/10 flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Sell Orders</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">Mid Price</span>
                  <span className="text-sm font-bold text-yellow-400">${assets[0].price.toFixed(2)}</span>
                </div>
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="px-4 py-2 text-left font-medium">Price (USD)</th>
                    <th className="px-4 py-2 text-right font-medium">Quantity</th>
                    <th className="px-4 py-2 text-right font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sellOrders.map((o, i) => (
                    <tr key={i} className="border-b border-slate-800/50 hover:bg-red-900/10 transition-colors">
                      <td className="px-4 py-2 text-red-400 font-mono font-semibold">${o.price.toFixed(2)}</td>
                      <td className="px-4 py-2 text-right text-white">{o.qty.toLocaleString()}</td>
                      <td className="px-4 py-2 text-right text-slate-300">${(o.price * o.qty).toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          {/* Recent trades */}
          <Card className="bg-slate-900/50 border border-emerald-500/20 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-emerald-500/10">
              <span className="text-sm font-semibold text-white">Recent Trades — {assets[0].id}</span>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800">
                  <th className="px-4 py-2 text-left font-medium">Time</th>
                  <th className="px-4 py-2 text-right font-medium">Price</th>
                  <th className="px-4 py-2 text-right font-medium">Qty</th>
                  <th className="px-4 py-2 text-right font-medium">Side</th>
                </tr>
              </thead>
              <tbody>
                {recentTrades.map((t, i) => (
                  <tr key={i} className="border-b border-slate-800/50">
                    <td className="px-4 py-2 text-slate-400 font-mono">{t.time}</td>
                    <td className={`px-4 py-2 text-right font-mono font-semibold ${t.side === 'buy' ? 'text-emerald-400' : 'text-red-400'}`}>${t.price.toFixed(2)}</td>
                    <td className="px-4 py-2 text-right text-white">{t.qty.toLocaleString()}</td>
                    <td className="px-4 py-2 text-right">
                      <Badge className={`text-[10px] px-1.5 py-0 ${t.side === 'buy' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
                        {t.side.toUpperCase()}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </TabsContent>

        {/* ── MY PORTFOLIO ── */}
        <TabsContent value="portfolio" className="mt-4 space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-1">Total Value</div>
              <div className="text-2xl font-bold text-white">${portfolioTotalValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
            </Card>
            <Card className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-1">Unrealized P&L</div>
              <div className={`text-2xl font-bold ${portfolioUnrealizedPL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {portfolioUnrealizedPL >= 0 ? '+' : ''}${portfolioUnrealizedPL.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </div>
              <div className={`text-xs ${portfolioUnrealizedPL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{portfolioUnrealizedPL >= 0 ? '+' : ''}{portfolioPLPct}%</div>
            </Card>
            <Card className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-1">Carbon Impact</div>
              <div className="text-2xl font-bold text-emerald-400">124,500</div>
              <div className="text-xs text-slate-400">tCO₂e offset capacity</div>
            </Card>
          </div>

          {/* Holdings table */}
          <Card className="bg-slate-900/50 border border-emerald-500/20 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-emerald-500/10">
              <span className="text-sm font-semibold text-white">Holdings</span>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800">
                  <th className="px-4 py-2.5 text-left">Asset</th>
                  <th className="px-4 py-2.5 text-right">Qty</th>
                  <th className="px-4 py-2.5 text-right">Avg Cost</th>
                  <th className="px-4 py-2.5 text-right">Current</th>
                  <th className="px-4 py-2.5 text-right">Market Value</th>
                  <th className="px-4 py-2.5 text-right">P&L</th>
                  <th className="px-4 py-2.5 text-right">P&L %</th>
                </tr>
              </thead>
              <tbody>
                {portfolioHoldings.map(h => {
                  const mv  = h.qty * h.currentPrice;
                  const pl  = mv - h.qty * h.avgCost;
                  const plp = ((pl / (h.qty * h.avgCost)) * 100).toFixed(1);
                  return (
                    <tr key={h.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="px-4 py-2.5">
                        <div className="font-mono text-emerald-400">{h.id}</div>
                        <div className="text-slate-300 truncate max-w-[160px]">{h.name}</div>
                      </td>
                      <td className="px-4 py-2.5 text-right text-white">{h.qty.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-right text-slate-300">${h.avgCost.toFixed(2)}</td>
                      <td className="px-4 py-2.5 text-right text-white">${h.currentPrice.toFixed(2)}</td>
                      <td className="px-4 py-2.5 text-right text-white">${mv.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                      <td className={`px-4 py-2.5 text-right font-semibold ${pl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {pl >= 0 ? '+' : ''}${pl.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </td>
                      <td className={`px-4 py-2.5 text-right font-semibold ${pl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {pl >= 0 ? '+' : ''}{plp}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>

          {/* Portfolio chart */}
          <Card className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-4">
            <div className="text-sm font-semibold text-white mb-4">Portfolio Value — 6 Months</div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={portfolioHistory}>
                <defs>
                  <linearGradient id="pvGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, fontSize: 12 }}
                  formatter={(v: number) => [`$${v.toLocaleString()}`, 'Value']}
                />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#pvGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* ── PRICE DISCOVERY ── */}
        <TabsContent value="price" className="mt-4 space-y-4">
          {/* Price history */}
          <Card className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-4">
            <div className="text-sm font-semibold text-white mb-4">Price History — 90 Days (Top 3 Assets)</div>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={priceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} interval={14} label={{ value: 'Day', position: 'insideBottom', fill: '#64748b', fontSize: 11 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, fontSize: 11 }}
                  formatter={(v: number, name: string) => [`$${v.toFixed(2)}`, name]}
                />
                <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
                <Line type="monotone" dataKey="BRZ-001" stroke="#10b981" strokeWidth={2} dot={false} name="BRZ-001 Amazon Mangrove" />
                <Line type="monotone" dataKey="AUS-007" stroke="#3b82f6" strokeWidth={2} dot={false} name="AUS-007 Great Barrier Reef" />
                <Line type="monotone" dataKey="PHI-006" stroke="#a78bfa" strokeWidth={2} dot={false} name="PHI-006 Coral Triangle" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Volume chart */}
          <Card className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-4">
            <div className="text-sm font-semibold text-white mb-4">Daily Volume (USD)</div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={priceHistory.filter((_, i) => i % 5 === 0)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000000).toFixed(1)}M`} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, fontSize: 11 }}
                  formatter={(v: number) => [`$${(v/1000000).toFixed(2)}M`, 'Volume']}
                />
                <Bar dataKey="volume" fill="#10b981" fillOpacity={0.7} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Correlation matrix */}
          <Card className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-4">
            <div className="text-sm font-semibold text-white mb-4">Price Correlation Matrix</div>
            <div className="overflow-x-auto">
              <table className="text-xs">
                <thead>
                  <tr>
                    <th className="w-24 px-2 py-1" />
                    {correlationAssets.map(a => (
                      <th key={a} className="px-2 py-1 text-emerald-400 font-mono text-center">{a}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {correlationMatrix.map((row, ri) => (
                    <tr key={ri}>
                      <td className="px-2 py-1 text-emerald-400 font-mono whitespace-nowrap">{correlationAssets[ri]}</td>
                      {row.map((v, ci) => (
                        <td key={ci} className="px-1 py-1 text-center">
                          <div className={`w-12 h-10 rounded flex items-center justify-center text-xs font-bold text-white ${corrColor(v)}`}>
                            {v.toFixed(2)}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-2 mt-3 text-[10px] text-slate-400">
              <span>Correlation strength:</span>
              {[
                { label: '0.9+', cls: 'bg-emerald-500/80' },
                { label: '0.8+', cls: 'bg-emerald-500/60' },
                { label: '0.7+', cls: 'bg-emerald-500/40' },
                { label: '0.6+', cls: 'bg-emerald-500/20' },
                { label: '<0.6', cls: 'bg-slate-700/40' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1">
                  <div className={`w-4 h-3 rounded ${l.cls}`} />
                  <span>{l.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
