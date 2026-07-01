import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Box, Camera, MapPin, Ruler, Layers, Download, ZoomIn, Maximize2, ChevronLeft, ChevronRight, Eye, CheckCircle } from 'lucide-react';

const sites = [
  { id: 's1', name: 'Amazon Mangrove BRZ-001', region: 'Pará, Brazil', area: '12,400 ha', lastScan: '3 days ago', method: 'LiDAR + Photogrammetry', biomass: '284 t/ha', carbonStock: '1,142 tCO₂/ha', healthScore: 94, status: 'Verified', images: 847, points: '2.4B' },
  { id: 's2', name: 'Borneo Peatland IDN-003', region: 'Kalimantan, Indonesia', area: '8,200 ha', lastScan: '1 week ago', method: 'Satellite + LiDAR', biomass: '421 t/ha', carbonStock: '1,684 tCO₂/ha', healthScore: 88, status: 'Active', images: 623, points: '1.8B' },
  { id: 's3', name: 'Andean Cloud Forest COL-007', region: 'Antioquia, Colombia', area: '5,600 ha', lastScan: '5 days ago', method: 'Drone Photogrammetry', biomass: '312 t/ha', carbonStock: '1,248 tCO₂/ha', healthScore: 97, status: 'Verified', images: 1240, points: '3.1B' },
  { id: 's4', name: 'Australian Kelp AUS-022', region: 'Victoria, Australia', area: '3,100 ha', lastScan: '2 weeks ago', method: 'Underwater LiDAR', biomass: '87 t/ha', carbonStock: '348 tCO₂/ha', healthScore: 76, status: 'Needs Review', images: 412, points: '892M' },
];

const measurements = [
  { metric: 'Canopy Height (max)', value: '42.7 m', change: '+1.2 m YoY' },
  { metric: 'Canopy Cover', value: '87.4%', change: '+2.1% YoY' },
  { metric: 'Ground Coverage', value: '94.2%', change: '+3.4% YoY' },
  { metric: 'Dead Biomass', value: '3.2%', change: '-0.8% YoY' },
  { metric: 'Water Bodies', value: '8 detected', change: 'Stable' },
  { metric: 'Invasive Species', value: '0 detected', change: 'Clear' },
];

const annotations = [
  { id: 1, type: 'Deforestation Risk', x: 34, y: 42, severity: 'Low', note: 'Minor encroachment detected on northern boundary' },
  { id: 2, type: 'High Biomass Zone', x: 56, y: 28, severity: 'Positive', note: 'Dense canopy with exceptional carbon density' },
  { id: 3, type: 'Water Feature', x: 71, y: 64, severity: 'Info', note: 'Seasonal river expanding — positive hydrology signal' },
];

export function Site3DVisualization() {
  const [selected, setSelected] = useState(sites[0]);
  const [viewMode, setViewMode] = useState('point-cloud');
  const [showAnnotations, setShowAnnotations] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">3D Site Visualization</h2>
          <p className="text-emerald-300/70">Immersive LiDAR point clouds and photogrammetry for remote site verification</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Camera className="w-4 h-4 mr-2" />
            Schedule Scan
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'Sites Mapped', value: '1,247', sub: '+84 this quarter' },
          { label: 'Total Area', value: '2.4M ha', sub: 'Under visualization' },
          { label: 'Avg Resolution', value: '5 cm', sub: 'Point cloud density' },
          { label: 'Data Points', value: '847B', sub: 'Total across all sites' },
        ].map((s) => (
          <Card key={s.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
            <div className="text-emerald-400 text-xs mb-2">{s.label}</div>
            <div className="text-white text-xl font-bold">{s.value}</div>
            <div className="text-emerald-300/50 text-xs mt-1">{s.sub}</div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Site List */}
        <div className="space-y-3">
          <h3 className="text-white text-sm font-semibold">Project Sites</h3>
          {sites.map((site) => (
            <button
              key={site.id}
              onClick={() => setSelected(site)}
              className={`w-full text-left p-3 rounded-xl border transition-all ${selected.id === site.id ? 'bg-emerald-400/15 border-emerald-500/40' : 'bg-slate-900/50 border-emerald-500/20 hover:border-emerald-500/30'}`}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="text-white text-xs font-medium">{site.name}</div>
                <Badge className={`border-0 text-xs ${site.status === 'Verified' ? 'bg-emerald-400/20 text-emerald-300' : site.status === 'Needs Review' ? 'bg-rose-400/20 text-rose-300' : 'bg-amber-400/20 text-amber-300'}`}>
                  {site.status}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-emerald-300/50 text-xs mb-1">
                <MapPin className="w-3 h-3" />
                {site.region}
              </div>
              <div className="flex gap-3 text-xs text-emerald-300/40">
                <span>{site.area}</span>
                <span>Health: <span className={site.healthScore > 90 ? 'text-emerald-400' : site.healthScore > 80 ? 'text-amber-400' : 'text-rose-400'}>{site.healthScore}%</span></span>
              </div>
            </button>
          ))}
        </div>

        {/* 3D Viewer Mockup */}
        <div className="md:col-span-2 space-y-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 overflow-hidden">
            {/* Viewer Controls */}
            <div className="flex items-center justify-between p-3 border-b border-emerald-500/20">
              <div className="flex gap-2">
                {['point-cloud', 'mesh', 'satellite', 'thermal'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-2 py-1 rounded text-xs capitalize transition-all ${viewMode === mode ? 'bg-emerald-600 text-white' : 'text-emerald-300/60 hover:text-emerald-300'}`}
                  >
                    {mode.replace('-', ' ')}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowAnnotations(!showAnnotations)} className={`px-2 py-1 rounded text-xs transition-all ${showAnnotations ? 'bg-emerald-600 text-white' : 'text-emerald-300/60'}`}>
                  Annotations
                </button>
                <button className="text-emerald-300/60 hover:text-emerald-300"><Maximize2 className="w-4 h-4" /></button>
              </div>
            </div>

            {/* 3D Viewer Area */}
            <div className="relative h-80 bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900 flex items-center justify-center overflow-hidden">
              {/* Simulated point cloud visualization */}
              <div className="absolute inset-0 opacity-40">
                {Array.from({ length: 80 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      backgroundColor: `hsl(${140 + Math.random() * 60}, 70%, ${40 + Math.random() * 40}%)`,
                      opacity: 0.6 + Math.random() * 0.4,
                    }}
                  />
                ))}
              </div>

              {/* Grid lines */}
              <div className="absolute inset-0 opacity-10">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="absolute border-emerald-400/30" style={{ left: `${i * 10}%`, top: 0, bottom: 0, borderLeftWidth: 1 }} />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="absolute border-emerald-400/30" style={{ top: `${i * 12.5}%`, left: 0, right: 0, borderTopWidth: 1 }} />
                ))}
              </div>

              {/* Annotations */}
              {showAnnotations && annotations.map((ann) => (
                <div
                  key={ann.id}
                  className="absolute"
                  style={{ left: `${ann.x}%`, top: `${ann.y}%` }}
                >
                  <div className={`w-4 h-4 rounded-full border-2 animate-pulse ${ann.severity === 'Positive' ? 'bg-emerald-400/60 border-emerald-400' : ann.severity === 'Low' ? 'bg-amber-400/60 border-amber-400' : 'bg-cyan-400/60 border-cyan-400'}`} />
                </div>
              ))}

              {/* Info overlay */}
              <div className="absolute bottom-3 left-3 bg-slate-900/80 rounded-lg p-3 text-xs">
                <div className="text-emerald-300/70 mb-1">{selected.name}</div>
                <div className="text-white font-medium">{viewMode === 'point-cloud' ? `${selected.points} points` : 'Mesh render'}</div>
                <div className="text-emerald-300/50">Last scan: {selected.lastScan}</div>
              </div>

              {/* Navigation */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                <button className="w-8 h-8 bg-slate-800/80 rounded-lg flex items-center justify-center text-emerald-300/60 hover:text-emerald-300">
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 bg-slate-800/80 rounded-lg flex items-center justify-center text-emerald-300/60 hover:text-emerald-300">
                  <Layers className="w-4 h-4" />
                </button>
              </div>

              <div className="text-emerald-400/60 text-sm font-medium z-10">
                <Box className="w-12 h-12 opacity-20" />
              </div>
            </div>

            {/* Before/After toggle */}
            <div className="p-3 border-t border-emerald-500/20 flex items-center justify-between">
              <div className="flex gap-2">
                <Button variant="outline" className="border-emerald-500/30 text-emerald-300 text-xs h-7 px-3">
                  <ChevronLeft className="w-3 h-3 mr-1" />
                  2024
                </Button>
                <Button variant="outline" className="border-emerald-500/30 text-emerald-300 text-xs h-7 px-3">
                  2026
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
              <div className="text-emerald-300/50 text-xs">{selected.method}</div>
              <Button variant="outline" className="border-emerald-500/30 text-emerald-300 text-xs h-7 px-3">
                <Eye className="w-3 h-3 mr-1" />
                Virtual Tour
              </Button>
            </div>
          </Card>

          {/* Measurements */}
          <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Ruler className="w-4 h-4 text-emerald-400" />
              <h3 className="text-white text-sm font-semibold">Automated Measurements — {selected.name}</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-2">
              {measurements.map((m) => (
                <div key={m.metric} className="bg-slate-800/40 rounded-lg p-3">
                  <div className="text-emerald-300/50 text-xs mb-0.5">{m.metric}</div>
                  <div className="text-white font-bold text-sm">{m.value}</div>
                  <div className={`text-xs ${m.change.includes('+') || m.change === 'Clear' || m.change === 'Stable' ? 'text-emerald-400' : m.change.includes('-') && !m.change.includes('Dead') ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {m.change}
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
