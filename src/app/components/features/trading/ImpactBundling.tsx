import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Layers, TrendingUp, Shield, RefreshCw, Plus, Minus, BarChart3, Globe, Leaf } from 'lucide-react';

const prebuiltBundles = [
  {
    id: 'green-planet',
    name: 'Green Planet Bundle',
    description: 'Balanced mix of carbon, biodiversity, and watershed credits',
    assets: [
      { name: 'Carbon Credits', pct: 40, color: '#10b981' },
      { name: 'Biodiversity', pct: 30, color: '#06b6d4' },
      { name: 'Watershed', pct: 20, color: '#8b5cf6' },
      { name: 'Cultural Heritage', pct: 10, color: '#f59e0b' },
    ],
    ytd: '+24.3%',
    risk: 'Medium',
    minInvestment: '$500',
    aum: '$142M',
  },
  {
    id: 'carbon-pure',
    name: 'Carbon Pure Bundle',
    description: 'Maximum carbon sequestration across diverse methodologies',
    assets: [
      { name: 'Mangrove Carbon', pct: 35, color: '#10b981' },
      { name: 'Agroforestry Carbon', pct: 35, color: '#34d399' },
      { name: 'Soil Carbon', pct: 20, color: '#6ee7b7' },
      { name: 'Kelp Carbon', pct: 10, color: '#a7f3d0' },
    ],
    ytd: '+31.8%',
    risk: 'Low-Medium',
    minInvestment: '$250',
    aum: '$89M',
  },
  {
    id: 'biodiversity-focus',
    name: 'Biodiversity Focus Bundle',
    description: 'Species recovery and habitat preservation premium assets',
    assets: [
      { name: 'Rainforest Biodiversity', pct: 45, color: '#06b6d4' },
      { name: 'Marine Ecosystem', pct: 25, color: '#0ea5e9' },
      { name: 'Grassland Habitat', pct: 20, color: '#38bdf8' },
      { name: 'Alpine Ecosystem', pct: 10, color: '#7dd3fc' },
    ],
    ytd: '+19.2%',
    risk: 'Medium-High',
    minInvestment: '$1,000',
    aum: '$67M',
  },
];

const geographicDiversification = [
  { region: 'Amazon Basin', weight: 25, assets: 12 },
  { region: 'SE Asia Rainforest', weight: 20, assets: 8 },
  { region: 'African Savanna', weight: 15, assets: 6 },
  { region: 'Pacific Islands', weight: 15, assets: 5 },
  { region: 'Andean Cloud Forest', weight: 12, assets: 7 },
  { region: 'Australian Outback', weight: 8, assets: 4 },
  { region: 'Arctic Tundra', weight: 5, assets: 3 },
];

export function ImpactBundling() {
  const [selected, setSelected] = useState(prebuiltBundles[0]);
  const [investAmount, setInvestAmount] = useState('1000');
  const [customAssets, setCustomAssets] = useState([
    { name: 'Carbon Credits', pct: 40 },
    { name: 'Biodiversity', pct: 30 },
    { name: 'Watershed', pct: 30 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Impact Bundling</h2>
          <p className="text-emerald-300/70">Create diversified portfolios of complementary regenerative assets</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
            <RefreshCw className="w-4 h-4 mr-2" />
            Rebalance
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Layers className="w-4 h-4 mr-2" />
            Create Bundle
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Active Bundles', value: '24', sub: 'across all categories', icon: Layers },
          { label: 'Total AUM', value: '$298M', sub: '+18.4% MTD', icon: BarChart3 },
          { label: 'Avg Diversification', value: '94.2%', sub: 'geographic spread', icon: Globe },
          { label: 'Avg Annual Return', value: '+25.1%', sub: 'across all bundles', icon: TrendingUp },
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

      <Tabs defaultValue="prebuilt">
        <TabsList className="bg-slate-800/60 border border-emerald-500/20">
          <TabsTrigger value="prebuilt" className="data-[state=active]:bg-emerald-600">Pre-built Bundles</TabsTrigger>
          <TabsTrigger value="custom" className="data-[state=active]:bg-emerald-600">Custom Bundle</TabsTrigger>
          <TabsTrigger value="geographic" className="data-[state=active]:bg-emerald-600">Geographic Spread</TabsTrigger>
        </TabsList>

        <TabsContent value="prebuilt" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-3 gap-4">
            {prebuiltBundles.map((bundle) => (
              <button
                key={bundle.id}
                onClick={() => setSelected(bundle)}
                className={`text-left p-4 rounded-xl border transition-all ${selected.id === bundle.id ? 'bg-emerald-400/15 border-emerald-500/40' : 'bg-slate-900/50 border-emerald-500/20 hover:border-emerald-500/40'}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-semibold text-sm">{bundle.name}</h4>
                    <p className="text-emerald-300/60 text-xs mt-0.5">{bundle.description}</p>
                  </div>
                  <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">{bundle.ytd}</Badge>
                </div>
                <ResponsiveContainer width="100%" height={120}>
                  <PieChart>
                    <Pie data={bundle.assets} dataKey="pct" cx="50%" cy="50%" innerRadius={30} outerRadius={50}>
                      {bundle.assets.map((a, i) => <Cell key={i} fill={a.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-1 mt-2">
                  {bundle.assets.map((a, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: a.color }} />
                        <span className="text-slate-300">{a.name}</span>
                      </div>
                      <span className="text-emerald-300/70">{a.pct}%</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-3 pt-3 border-t border-slate-700/30 text-xs">
                  <div><span className="text-emerald-300/50">Risk: </span><span className="text-white">{bundle.risk}</span></div>
                  <div><span className="text-emerald-300/50">Min: </span><span className="text-white">{bundle.minInvestment}</span></div>
                  <div><span className="text-emerald-300/50">AUM: </span><span className="text-white">{bundle.aum}</span></div>
                </div>
              </button>
            ))}
          </div>

          {/* Purchase Panel */}
          <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-semibold mb-3">{selected.name}</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-emerald-300/60 text-xs mb-1 block">Investment Amount (USD)</label>
                    <input
                      type="number"
                      value={investAmount}
                      onChange={(e) => setInvestAmount(e.target.value)}
                      className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div className="space-y-2 text-sm">
                    {selected.assets.map((a, i) => (
                      <div key={i} className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: a.color }} />
                          <span className="text-slate-300">{a.name}</span>
                        </div>
                        <span className="text-white">${(Number(investAmount) * a.pct / 100).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-emerald-400/10 rounded-lg p-4 border border-emerald-500/20">
                  <div className="text-emerald-300/60 text-xs mb-2">Bundle Performance</div>
                  <div className="text-white text-2xl font-bold">{selected.ytd}</div>
                  <div className="text-emerald-300/50 text-xs">Year to date return</div>
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Leaf className="w-4 h-4 mr-2" />
                  Buy {selected.name}
                </Button>
                <div className="flex items-center gap-2 text-xs text-emerald-300/50">
                  <Shield className="w-3 h-3" />
                  Automated rebalancing included
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
            <h3 className="text-white font-semibold mb-4">Build Custom Bundle</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                {customAssets.map((a, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-slate-300 text-sm w-32">{a.name}</span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={a.pct}
                      onChange={(e) => {
                        const updated = [...customAssets];
                        updated[i] = { ...updated[i], pct: Number(e.target.value) };
                        setCustomAssets(updated);
                      }}
                      className="flex-1 accent-emerald-500"
                    />
                    <span className="text-emerald-400 text-sm w-10 text-right">{a.pct}%</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t border-slate-700/30">
                  <span className="text-emerald-300/60 text-sm">Total Allocation</span>
                  <span className={`text-sm font-bold ${customAssets.reduce((s, a) => s + a.pct, 0) === 100 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {customAssets.reduce((s, a) => s + a.pct, 0)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={customAssets} dataKey="pct" cx="50%" cy="50%" innerRadius={40} outerRadius={80}>
                      {customAssets.map((_, i) => <Cell key={i} fill={['#10b981', '#06b6d4', '#8b5cf6'][i % 3]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Custom Bundle
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
            <h3 className="text-white font-semibold mb-4">Geographic Risk Spreading</h3>
            <div className="space-y-3">
              {geographicDiversification.map((r) => (
                <div key={r.region} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white">{r.region}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-300/60">{r.assets} assets</span>
                      <span className="text-emerald-400 w-10 text-right">{r.weight}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700/40 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full h-2 transition-all" style={{ width: `${r.weight}%` }} />
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
