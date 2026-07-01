import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { PieChart as PieIcon, TrendingUp, Globe, Star, Award, Download } from 'lucide-react';

const projects = [
  { id: 'p1', name: 'Amazon Mangrove Restoration', region: 'Brazil', type: 'Carbon', cost: '$8.20/t', yield: '4.2t CO₂/ha', biodiversity: 92, additionality: 94, permanence: 88, cobenefits: 96, community: 91, total: 92.2 },
  { id: 'p2', name: 'Borneo Peatland Protection', region: 'Indonesia', type: 'Carbon', cost: '$6.40/t', yield: '6.8t CO₂/ha', biodiversity: 89, additionality: 91, permanence: 76, cobenefits: 84, community: 79, total: 83.8 },
  { id: 'p3', name: 'Andean Cloud Forest', region: 'Colombia', type: 'Biodiversity', cost: '$12.10/unit', yield: '3.1t CO₂/ha', biodiversity: 97, additionality: 88, permanence: 94, cobenefits: 93, community: 96, total: 93.6 },
  { id: 'p4', name: 'Kenyan Savanna Carbon', region: 'Kenya', type: 'Carbon', cost: '$5.90/t', yield: '2.8t CO₂/ha', biodiversity: 78, additionality: 85, permanence: 82, cobenefits: 79, community: 88, total: 82.4 },
  { id: 'p5', name: 'Great Barrier Reef Blue Carbon', region: 'Australia', type: 'Marine Carbon', cost: '$14.80/t', yield: '5.2t CO₂/ha', biodiversity: 96, additionality: 92, permanence: 90, cobenefits: 97, community: 87, total: 92.4 },
];

const methodologyBenchmarks = [
  { name: 'Gold Standard', projects: 847, avgCost: '$9.40/t', avgYield: '4.1t/ha', marketShare: '28%', quality: 94 },
  { name: 'Verra VCS', projects: 1243, avgCost: '$7.80/t', avgYield: '3.7t/ha', marketShare: '41%', quality: 88 },
  { name: 'Plan Vivo', projects: 312, avgCost: '$11.20/t', avgYield: '3.4t/ha', marketShare: '10%', quality: 91 },
  { name: 'ACR', projects: 198, avgCost: '$8.90/t', avgYield: '4.4t/ha', marketShare: '7%', quality: 87 },
  { name: 'CAR', projects: 421, avgCost: '$6.70/t', avgYield: '3.9t/ha', marketShare: '14%', quality: 86 },
];

export function ComparativeBenchmarking() {
  const [selected, setSelected] = useState([projects[0], projects[2]]);

  const radarData = [
    { metric: 'Biodiversity', ...Object.fromEntries(selected.map((p) => [p.id, p.biodiversity])) },
    { metric: 'Additionality', ...Object.fromEntries(selected.map((p) => [p.id, p.additionality])) },
    { metric: 'Permanence', ...Object.fromEntries(selected.map((p) => [p.id, p.permanence])) },
    { metric: 'Co-benefits', ...Object.fromEntries(selected.map((p) => [p.id, p.cobenefits])) },
    { metric: 'Community', ...Object.fromEntries(selected.map((p) => [p.id, p.community])) },
  ];

  const colors = ['#10b981', '#06b6d4', '#8b5cf6'];

  const toggleProject = (p: typeof projects[0]) => {
    if (selected.find((s) => s.id === p.id)) {
      if (selected.length > 1) setSelected(selected.filter((s) => s.id !== p.id));
    } else {
      if (selected.length < 3) setSelected([...selected, p]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Comparative Benchmarking</h2>
          <p className="text-emerald-300/70">Compare project performance across bioregions and methodologies</p>
        </div>
        <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <Tabs defaultValue="projects">
        <TabsList className="bg-slate-800/60 border border-emerald-500/20">
          <TabsTrigger value="projects" className="data-[state=active]:bg-emerald-600">Project Comparison</TabsTrigger>
          <TabsTrigger value="methodologies" className="data-[state=active]:bg-emerald-600">Methodology Benchmarks</TabsTrigger>
          <TabsTrigger value="cost" className="data-[state=active]:bg-emerald-600">Cost Effectiveness</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="mt-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="text-white text-sm font-semibold">Select Projects (up to 3)</h3>
              {projects.map((p) => {
                const isSelected = !!selected.find((s) => s.id === p.id);
                const colorIdx = selected.findIndex((s) => s.id === p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => toggleProject(p)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${isSelected ? 'border-emerald-500/50' : 'bg-slate-900/50 border-emerald-500/20 hover:border-emerald-500/30'}`}
                    style={isSelected ? { backgroundColor: colors[colorIdx] + '22', borderColor: colors[colorIdx] + '88' } : {}}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-white text-xs font-medium">{p.name}</div>
                        <div className="text-emerald-300/60 text-xs mt-0.5">{p.region} · {p.type}</div>
                      </div>
                      <Badge className="text-xs border-0 bg-emerald-400/20 text-emerald-300">{p.total}</Badge>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="md:col-span-2 space-y-4">
              <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
                <h3 className="text-white text-sm font-semibold mb-3">Performance Radar</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#1e3a2f" />
                    <PolarAngleAxis dataKey="metric" stroke="#6ee7b7" fontSize={12} />
                    {selected.map((p, i) => (
                      <Radar key={p.id} name={p.name} dataKey={p.id} stroke={colors[i]} fill={colors[i]} fillOpacity={0.15} />
                    ))}
                  </RadarChart>
                </ResponsiveContainer>
                <div className="flex gap-4 justify-center mt-2">
                  {selected.map((p, i) => (
                    <div key={p.id} className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i] }} />
                      <span className="text-emerald-300/70 text-xs">{p.name.split(' ').slice(0, 2).join(' ')}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid gap-3">
                {selected.map((p, i) => (
                  <Card key={p.id} className="bg-slate-900/50 border-emerald-500/20 p-4" style={{ borderColor: colors[i] + '44' }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i] }} />
                        <span className="text-white font-medium text-sm">{p.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-white font-bold">{p.total}</span>
                        <span className="text-emerald-300/50 text-xs">/100</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-3 text-center text-xs">
                      {[
                        { label: 'Biodiversity', value: p.biodiversity },
                        { label: 'Additionality', value: p.additionality },
                        { label: 'Permanence', value: p.permanence },
                        { label: 'Co-benefits', value: p.cobenefits },
                        { label: 'Community', value: p.community },
                      ].map((m) => (
                        <div key={m.label} className="bg-slate-800/40 rounded-lg p-2">
                          <div className="text-emerald-300/50 mb-1">{m.label}</div>
                          <div className="text-white font-bold">{m.value}</div>
                          <div className="w-full bg-slate-700/40 rounded-full h-1 mt-1">
                            <div className="rounded-full h-1" style={{ width: `${m.value}%`, backgroundColor: colors[i] }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="methodologies" className="mt-4">
          <div className="space-y-3">
            {methodologyBenchmarks.map((m) => (
              <Card key={m.name} className="bg-slate-900/50 border-emerald-500/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-white font-medium text-sm">{m.name}</div>
                      <div className="text-emerald-300/50 text-xs">{m.projects.toLocaleString()} registered projects</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-6 text-right text-sm">
                    <div>
                      <div className="text-emerald-300/50 text-xs">Avg Cost</div>
                      <div className="text-white">{m.avgCost}</div>
                    </div>
                    <div>
                      <div className="text-emerald-300/50 text-xs">Avg Yield</div>
                      <div className="text-white">{m.avgYield}</div>
                    </div>
                    <div>
                      <div className="text-emerald-300/50 text-xs">Market Share</div>
                      <div className="text-white">{m.marketShare}</div>
                    </div>
                    <div>
                      <div className="text-emerald-300/50 text-xs">Quality Score</div>
                      <div className="text-emerald-400 font-bold">{m.quality}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-slate-700/40 rounded-full h-1.5">
                    <div className="bg-emerald-500 rounded-full h-1.5" style={{ width: `${m.quality}%` }} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cost" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <h3 className="text-white text-sm font-semibold mb-4">Cost per Tonne CO₂ vs Quality Score</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projects}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                <XAxis dataKey="name" stroke="#6ee7b7" fontSize={10} tick={{ width: 80 }} />
                <YAxis stroke="#6ee7b7" fontSize={11} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="total" name="Quality Score" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
