import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, TrendingUp, Shield, DollarSign, Clock, Star, ArrowRight, Lock } from 'lucide-react';

const bonds = [
  { id: 'RB-001', name: 'Amazon Forest Bond Series 3', coupon: '11.2%', maturity: 'Dec 2028', rating: 'AA', collateral: 'Mangrove Carbon', faceValue: '$1,000', price: '$1,042', yield: '10.8%', available: '$4.2M', impactLinked: true, insured: true },
  { id: 'RB-002', name: 'Biodiversity Protection Bond', coupon: '9.4%', maturity: 'Jun 2027', rating: 'A+', collateral: 'Biodiversity Credits', faceValue: '$1,000', price: '$1,018', yield: '9.2%', available: '$8.7M', impactLinked: true, insured: false },
  { id: 'RB-003', name: 'Watershed Conservation Bond', coupon: '8.1%', maturity: 'Mar 2029', rating: 'AAA', collateral: 'Watershed Services', faceValue: '$1,000', price: '$1,067', yield: '7.6%', available: '$12.1M', impactLinked: false, insured: true },
  { id: 'RB-004', name: 'Cultural Heritage Perpetual Bond', coupon: '13.8%', maturity: 'Perpetual', rating: 'A', collateral: 'Cultural Heritage Tokens', faceValue: '$1,000', price: '$987', yield: '14.0%', available: '$2.3M', impactLinked: true, insured: false },
  { id: 'RB-005', name: 'Blue Carbon Marine Bond', coupon: '10.6%', maturity: 'Sep 2030', rating: 'AA-', collateral: 'Marine Carbon', faceValue: '$1,000', price: '$1,031', yield: '10.2%', available: '$6.4M', impactLinked: true, insured: true },
];

const yieldCurveData = [
  { maturity: '1Y', regen: 7.2, govtBond: 4.1, corporate: 5.8 },
  { maturity: '2Y', regen: 8.4, govtBond: 4.3, corporate: 6.1 },
  { maturity: '3Y', regen: 9.1, govtBond: 4.5, corporate: 6.4 },
  { maturity: '5Y', regen: 10.2, govtBond: 4.7, corporate: 6.8 },
  { maturity: '7Y', regen: 11.4, govtBond: 4.9, corporate: 7.2 },
  { maturity: '10Y', regen: 12.8, govtBond: 5.1, corporate: 7.6 },
];

export function RegenerativeBonds() {
  const [selected, setSelected] = useState(bonds[0]);
  const [purchaseQty, setPurchaseQty] = useState('10');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Regenerative Bonds</h2>
          <p className="text-emerald-300/70">Fixed-income instruments backed by verified ecosystem assets with impact-linked returns</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
            <FileText className="w-4 h-4 mr-2" />
            Bond Prospectus
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <DollarSign className="w-4 h-4 mr-2" />
            Issue Bond
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Bond Market', value: '$33.7M', sub: 'Outstanding bonds', icon: DollarSign },
          { label: 'Avg Coupon Rate', value: '10.6%', sub: 'Weighted average', icon: TrendingUp },
          { label: 'Avg Credit Rating', value: 'AA-', sub: 'Across all bonds', icon: Star },
          { label: 'Insurance Coverage', value: '64%', sub: 'Of outstanding bonds', icon: Shield },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-400 text-xs">{s.label}</span>
                <Icon className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-white text-xl font-bold">{s.value}</div>
              <div className="text-emerald-300/50 text-xs mt-1">{s.sub}</div>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="market">
        <TabsList className="bg-slate-800/60 border border-emerald-500/20">
          <TabsTrigger value="market" className="data-[state=active]:bg-emerald-600">Bond Market</TabsTrigger>
          <TabsTrigger value="yield" className="data-[state=active]:bg-emerald-600">Yield Curve</TabsTrigger>
          <TabsTrigger value="secondary" className="data-[state=active]:bg-emerald-600">Secondary Trading</TabsTrigger>
        </TabsList>

        <TabsContent value="market" className="mt-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              {bonds.map((bond) => (
                <button
                  key={bond.id}
                  onClick={() => setSelected(bond)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${selected.id === bond.id ? 'bg-emerald-400/15 border-emerald-500/40' : 'bg-slate-900/50 border-emerald-500/20 hover:border-emerald-500/30'}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold text-sm">{bond.name}</span>
                        {bond.impactLinked && <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">Impact-Linked</Badge>}
                        {bond.insured && <Badge className="bg-blue-400/20 text-blue-300 border-0 text-xs">Insured</Badge>}
                      </div>
                      <div className="text-emerald-300/60 text-xs mt-0.5">{bond.collateral} · Matures {bond.maturity}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 font-bold">{bond.coupon}</div>
                      <Badge className="bg-slate-700/50 text-slate-300 border-0 text-xs mt-1">{bond.rating}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-4 text-xs text-emerald-300/50">
                    <span>Price: <span className="text-white">{bond.price}</span></span>
                    <span>YTM: <span className="text-emerald-400">{bond.yield}</span></span>
                    <span>Available: <span className="text-white">{bond.available}</span></span>
                  </div>
                </button>
              ))}
            </div>

            <Card className="bg-slate-900/50 border-emerald-500/20 p-5 h-fit">
              <h3 className="text-white font-semibold text-sm mb-4">Purchase Bonds</h3>
              <div className="space-y-4">
                <div className="bg-emerald-400/10 rounded-lg p-3 border border-emerald-500/20">
                  <div className="text-white font-medium text-sm">{selected.name}</div>
                  <div className="flex gap-2 mt-1">
                    <span className="text-emerald-400 text-sm font-bold">{selected.coupon}</span>
                    <span className="text-emerald-300/50 text-sm">· {selected.rating}</span>
                  </div>
                </div>

                <div>
                  <label className="text-emerald-300/60 text-xs mb-1 block">Quantity (bonds)</label>
                  <input
                    type="number"
                    value={purchaseQty}
                    onChange={(e) => setPurchaseQty(e.target.value)}
                    className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-emerald-300/60">
                    <span>Total Cost</span>
                    <span className="text-white">${(Number(purchaseQty) * 1000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-emerald-300/60">
                    <span>Annual Coupon</span>
                    <span className="text-emerald-400">${(Number(purchaseQty) * 1000 * (parseFloat(selected.coupon) / 100)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-300/60">
                    <span>YTM</span>
                    <span className="text-white">{selected.yield}</span>
                  </div>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Lock className="w-4 h-4 mr-2" />
                  Buy {purchaseQty} Bond{Number(purchaseQty) > 1 ? 's' : ''}
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="yield" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <h3 className="text-white font-semibold text-sm mb-4">Yield Curve Comparison (%)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yieldCurveData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                <XAxis dataKey="maturity" stroke="#6ee7b7" fontSize={11} />
                <YAxis stroke="#6ee7b7" fontSize={11} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} formatter={(v: number) => [`${v}%`, '']} />
                <Line type="monotone" dataKey="regen" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} name="Regen Bonds" />
                <Line type="monotone" dataKey="corporate" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4', r: 4 }} name="Corporate Bonds" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="govtBond" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 4 }} name="Govt Bonds" strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-3">
              {[{ color: '#10b981', label: 'Regen Bonds' }, { color: '#06b6d4', label: 'Corporate Bonds' }, { color: '#8b5cf6', label: 'Govt Bonds' }].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5 text-xs text-emerald-300/70">
                  <div className="w-4 h-0.5" style={{ backgroundColor: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="secondary" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <h3 className="text-white text-sm font-semibold mb-4">Secondary Market Trades</h3>
            <div className="space-y-3">
              {bonds.slice(0, 4).map((bond) => (
                <div key={bond.id} className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
                  <div>
                    <div className="text-white text-sm">{bond.name}</div>
                    <div className="text-emerald-300/50 text-xs">{bond.id} · {bond.rating}</div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-right">
                      <div className="text-emerald-300/50 text-xs">Price</div>
                      <div className="text-white font-medium">{bond.price}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-300/50 text-xs">YTM</div>
                      <div className="text-emerald-400">{bond.yield}</div>
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-xs h-7 px-3">
                      Trade <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
