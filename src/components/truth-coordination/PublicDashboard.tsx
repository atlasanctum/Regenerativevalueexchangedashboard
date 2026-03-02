import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { MapPin, Droplet, Trees, Sprout, GraduationCap, TrendingUp, CheckCircle, ExternalLink, Eye, FileText, Image as ImageIcon, Database } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';

// Mock data
const regenerationData = [
  { month: 'Jan', index: 42 },
  { month: 'Feb', index: 48 },
  { month: 'Mar', index: 55 },
  { month: 'Apr', index: 63 },
  { month: 'May', index: 71 },
  { month: 'Jun', index: 78 },
  { month: 'Jul', index: 85 },
  { month: 'Aug', index: 89 },
  { month: 'Sep', index: 92 },
  { month: 'Oct', index: 96 },
  { month: 'Nov', index: 98 },
  { month: 'Dec', index: 100 },
];

const sdgData = [
  { id: 1, name: 'No Poverty', score: 72, projects: 45, color: 'rgb(229, 36, 59)' },
  { id: 2, name: 'Zero Hunger', score: 68, projects: 38, color: 'rgb(221, 166, 58)' },
  { id: 3, name: 'Good Health', score: 85, projects: 67, color: 'rgb(76, 159, 56)' },
  { id: 4, name: 'Quality Education', score: 78, projects: 52, color: 'rgb(197, 25, 45)' },
  { id: 5, name: 'Gender Equality', score: 65, projects: 31, color: 'rgb(255, 58, 33)' },
  { id: 6, name: 'Clean Water', score: 91, projects: 89, color: 'rgb(38, 189, 226)' },
  { id: 7, name: 'Clean Energy', score: 74, projects: 43, color: 'rgb(252, 195, 11)' },
  { id: 8, name: 'Decent Work', score: 69, projects: 35, color: 'rgb(162, 25, 66)' },
  { id: 9, name: 'Innovation', score: 88, projects: 71, color: 'rgb(253, 105, 37)' },
  { id: 10, name: 'Reduced Inequality', score: 63, projects: 28, color: 'rgb(221, 19, 103)' },
  { id: 11, name: 'Sustainable Cities', score: 80, projects: 58, color: 'rgb(253, 157, 36)' },
  { id: 12, name: 'Responsible Consumption', score: 77, projects: 49, color: 'rgb(191, 139, 46)' },
  { id: 13, name: 'Climate Action', score: 95, projects: 124, color: 'rgb(63, 126, 68)' },
  { id: 14, name: 'Life Below Water', score: 82, projects: 61, color: 'rgb(10, 151, 217)' },
  { id: 15, name: 'Life on Land', score: 93, projects: 98, color: 'rgb(86, 192, 43)' },
  { id: 16, name: 'Peace & Justice', score: 71, projects: 42, color: 'rgb(0, 104, 157)' },
  { id: 17, name: 'Partnerships', score: 86, projects: 76, color: 'rgb(25, 72, 106)' },
];

const auditFeed = [
  { id: 439, type: 'finalized', project: 'Nairobi Water Purification', region: 'Kenya', timestamp: '2 min ago', impact: '15,400 liters/day' },
  { id: 438, type: 'validated', project: 'Soil Regeneration Program', region: 'Rwanda', timestamp: '8 min ago', impact: '234 hectares restored' },
  { id: 437, type: 'submitted', project: 'Education Cohort Delta', region: 'Uganda', timestamp: '15 min ago', impact: '128 students enrolled' },
  { id: 436, type: 'finalized', project: 'Waste Diversion Initiative', region: 'Tanzania', timestamp: '23 min ago', impact: '8.7 tonnes diverted' },
  { id: 435, type: 'disputed', project: 'Forest Restoration Beta', region: 'Kenya', timestamp: '34 min ago', impact: '567 trees planted' },
  { id: 434, type: 'validated', project: 'Clean Cookstove Distribution', region: 'Ethiopia', timestamp: '41 min ago', impact: '342 households' },
];

const mapLayers = [
  { id: 'waste', name: 'Waste Diversion', icon: Database, active: true, count: 45 },
  { id: 'water', name: 'Water Purification', icon: Droplet, active: true, count: 89 },
  { id: 'soil', name: 'Soil Regeneration', icon: Sprout, active: false, count: 67 },
  { id: 'forest', name: 'Forest Restoration', icon: Trees, active: true, count: 124 },
  { id: 'education', name: 'Education Cohorts', icon: GraduationCap, active: false, count: 52 },
];

const evidenceData = {
  id: 439,
  project: 'Nairobi Water Purification',
  submittedBy: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3',
  timestamp: '2025-03-02T14:32:18Z',
  location: { lat: -1.286389, lng: 36.817223 },
  hashes: {
    before: 'QmX7K9dF2nP4vL8wY3hM6tR1sN5cB9jE4qG2aH7xF3kT6',
    after: 'QmR4mT9sL3nE6wP8vK2xN5hB7cD1jF4qA9gH3yX8tM2nP',
    sensor: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi',
  },
  photos: ['photo-before-1.jpg', 'photo-after-1.jpg', 'photo-after-2.jpg'],
  sensors: ['pH_readings.csv', 'turbidity_data.csv', 'flow_rate.csv'],
  pdf: 'audit_report_439.pdf',
};

export function PublicDashboard() {
  const [selectedLayers, setSelectedLayers] = useState<string[]>(['waste', 'water', 'forest']);
  const [selectedEvidence, setSelectedEvidence] = useState<typeof evidenceData | null>(null);

  const toggleLayer = (layerId: string) => {
    setSelectedLayers((prev) =>
      prev.includes(layerId) ? prev.filter((id) => id !== layerId) : [...prev, layerId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Planet Dashboard</h2>
          <p className="text-emerald-300/70 mt-1">Radical transparency for regenerative impact</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-300">
            <Eye className="w-3 h-3 mr-1" />
            Public View
          </Badge>
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
            Live Data
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Map Section */}
        <Card className="lg:col-span-2 bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Impact Map - Nairobi Pilot</h3>
            <div className="flex gap-2">
              {mapLayers.map((layer) => {
                const Icon = layer.icon;
                const isActive = selectedLayers.includes(layer.id);
                return (
                  <Button
                    key={layer.id}
                    variant={isActive ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleLayer(layer.id)}
                    className={isActive ? 'bg-emerald-600 hover:bg-emerald-700' : 'border-emerald-500/30'}
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {layer.count}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Map Visualization */}
          <div className="relative h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-emerald-500/10 overflow-hidden">
            {/* Simplified map representation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Grid background */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(8)].map((_, i) => (
                    <div key={`h-${i}`} className="absolute left-0 right-0 border-t border-emerald-500/20" style={{ top: `${i * 12.5}%` }} />
                  ))}
                  {[...Array(8)].map((_, i) => (
                    <div key={`v-${i}`} className="absolute top-0 bottom-0 border-l border-emerald-500/20" style={{ left: `${i * 12.5}%` }} />
                  ))}
                </div>

                {/* Map markers */}
                {selectedLayers.includes('water') && (
                  <>
                    <div className="absolute top-[35%] left-[42%] group cursor-pointer">
                      <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                      <div className="absolute -top-2 left-6 bg-blue-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Nairobi Water Project
                      </div>
                    </div>
                    <div className="absolute top-[45%] left-[38%] w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-lg" />
                    <div className="absolute top-[28%] left-[48%] w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-lg" />
                  </>
                )}
                {selectedLayers.includes('waste') && (
                  <>
                    <div className="absolute top-[40%] left-[45%] w-3 h-3 bg-amber-500 rounded-full border-2 border-white shadow-lg" />
                    <div className="absolute top-[32%] left-[41%] w-3 h-3 bg-amber-500 rounded-full border-2 border-white shadow-lg" />
                  </>
                )}
                {selectedLayers.includes('forest') && (
                  <>
                    <div className="absolute top-[25%] left-[44%] w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg" />
                    <div className="absolute top-[50%] left-[50%] w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-lg" />
                    <div className="absolute top-[38%] left-[52%] w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-lg" />
                  </>
                )}

                {/* Location label */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-emerald-500/30">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span className="text-white text-sm">Nairobi, Kenya</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-emerald-500/30">
                  <div className="space-y-1 text-xs">
                    {selectedLayers.includes('water') && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="text-white">Water Purification</span>
                      </div>
                    )}
                    {selectedLayers.includes('waste') && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                        <span className="text-white">Waste Diversion</span>
                      </div>
                    )}
                    {selectedLayers.includes('forest') && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-white">Forest Restoration</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Live Audit Feed */}
        <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Live Audit Feed</h3>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {auditFeed.map((audit) => (
                <Dialog key={audit.id}>
                  <DialogTrigger asChild>
                    <div
                      className="p-3 bg-slate-800/50 rounded-lg border border-emerald-500/10 hover:border-emerald-500/30 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              audit.type === 'finalized'
                                ? 'bg-green-500/10 border-green-500/30 text-green-300'
                                : audit.type === 'validated'
                                ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                                : audit.type === 'disputed'
                                ? 'bg-red-500/10 border-red-500/30 text-red-300'
                                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                            }
                          >
                            {audit.type}
                          </Badge>
                          <span className="text-xs text-emerald-300/50">#{audit.id}</span>
                        </div>
                        <span className="text-xs text-emerald-300/50">{audit.timestamp}</span>
                      </div>
                      <p className="text-white text-sm font-medium mb-1">{audit.project}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-300/70 text-xs">{audit.region}</span>
                        <span className="text-emerald-400 text-xs font-mono">{audit.impact}</span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-emerald-500/30 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Impact Submission #{audit.id}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-emerald-300">Evidence Hashes</h4>
                        <div className="space-y-2 font-mono text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-300/70">Before:</span>
                            <span className="text-emerald-300 break-all">{evidenceData.hashes.before}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-300/70">After:</span>
                            <span className="text-emerald-300 break-all">{evidenceData.hashes.after}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-300/70">Sensor:</span>
                            <span className="text-emerald-300 break-all">{evidenceData.hashes.sensor}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-emerald-300">Attached Evidence</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {evidenceData.photos.map((photo, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-2 bg-slate-800 rounded border border-emerald-500/10">
                              <ImageIcon className="w-4 h-4 text-emerald-400" />
                              <span className="text-xs">{photo}</span>
                            </div>
                          ))}
                          {evidenceData.sensors.map((sensor, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-2 bg-slate-800 rounded border border-emerald-500/10">
                              <FileText className="w-4 h-4 text-blue-400" />
                              <span className="text-xs">{sensor}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* SDG Heatmap Grid */}
      <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
        <h3 className="text-xl font-semibold text-white mb-4">SDG Impact Heatmap</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {sdgData.map((sdg) => (
            <Card
              key={sdg.id}
              className="p-4 bg-slate-800/50 border-emerald-500/10 hover:border-emerald-500/30 transition-all cursor-pointer group"
              style={{ borderLeftColor: sdg.color, borderLeftWidth: '4px' }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-white">{sdg.id}</span>
                <ExternalLink className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-emerald-300/70 mb-3">{sdg.name}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-300/50">Score</span>
                  <span className="text-sm font-bold text-emerald-400">{sdg.score}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{ width: `${sdg.score}%`, backgroundColor: sdg.color }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-300/50">Projects</span>
                  <span className="text-xs font-mono text-emerald-300">{sdg.projects}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Regeneration Index Chart */}
      <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white">Regeneration Index</h3>
            <p className="text-emerald-300/70 text-sm">Global regenerative impact over time</p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-2xl font-bold text-green-400">+138%</span>
            <span className="text-emerald-300/70 text-sm">YoY</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={regenerationData}>
            <defs>
              <linearGradient id="colorIndex" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#10b981" opacity={0.1} />
            <XAxis dataKey="month" stroke="#6ee7b7" />
            <YAxis stroke="#6ee7b7" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
              }}
            />
            <Area type="monotone" dataKey="index" stroke="#10b981" fillOpacity={1} fill="url(#colorIndex)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
