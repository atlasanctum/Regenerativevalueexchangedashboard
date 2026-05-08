import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Satellite, Map, Radio, Eye, Cloud, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function SatelliteDataIntegration() {
  const [selectedSatellite, setSelectedSatellite] = useState('sentinel-2');

  // Satellite data sources
  const satellites = [
    {
      id: 'sentinel-2',
      name: 'Sentinel-2',
      operator: 'ESA',
      resolution: '10m',
      revisitTime: '5 days',
      bands: 13,
      coverage: 'Global',
      dataPoints: 2450000,
      status: 'active',
      use: 'Vegetation monitoring, land cover'
    },
    {
      id: 'landsat-8',
      name: 'Landsat 8',
      operator: 'NASA/USGS',
      resolution: '30m',
      revisitTime: '16 days',
      bands: 11,
      coverage: 'Global',
      dataPoints: 1890000,
      status: 'active',
      use: 'Forest change detection'
    },
    {
      id: 'planet-labs',
      name: 'Planet SkySat',
      operator: 'Planet Labs',
      resolution: '0.5m',
      revisitTime: 'Daily',
      bands: 4,
      coverage: 'Global',
      dataPoints: 3200000,
      status: 'active',
      use: 'High-res monitoring'
    },
    {
      id: 'modis',
      name: 'MODIS',
      operator: 'NASA',
      resolution: '250m',
      revisitTime: 'Daily',
      bands: 36,
      coverage: 'Global',
      dataPoints: 1560000,
      status: 'active',
      use: 'Fire detection, ocean color'
    },
  ];

  // Monitored projects
  const monitoredProjects = [
    {
      id: 'AMZ-001',
      name: 'Amazon Rainforest Conservation',
      location: 'Brazil',
      area: 50000,
      satellites: ['Sentinel-2', 'Landsat 8'],
      metrics: {
        forestCover: 94.7,
        deforestation: -0.3,
        biomass: 340,
        ndvi: 0.78
      },
      alerts: 0,
      lastUpdate: '2 hours ago'
    },
    {
      id: 'MNG-002',
      name: 'Mangrove Restoration Indonesia',
      location: 'Indonesia',
      area: 12000,
      satellites: ['Planet SkySat', 'Sentinel-2'],
      metrics: {
        forestCover: 87.2,
        deforestation: 0,
        biomass: 180,
        ndvi: 0.72
      },
      alerts: 0,
      lastUpdate: '1 hour ago'
    },
    {
      id: 'SAV-003',
      name: 'African Savanna Protection',
      location: 'Kenya',
      area: 75000,
      satellites: ['MODIS', 'Landsat 8'],
      metrics: {
        forestCover: 42.8,
        deforestation: 0.2,
        biomass: 85,
        ndvi: 0.45
      },
      alerts: 1,
      lastUpdate: '30 min ago'
    },
  ];

  // NDVI time series
  const ndviTimeSeries = [
    { month: 'Jul', ndvi: 0.74, rainfall: 245 },
    { month: 'Aug', ndvi: 0.76, rainfall: 278 },
    { month: 'Sep', ndvi: 0.75, rainfall: 312 },
    { month: 'Oct', ndvi: 0.77, rainfall: 289 },
    { month: 'Nov', ndvi: 0.78, rainfall: 256 },
    { month: 'Dec', ndvi: 0.78, rainfall: 234 },
    { month: 'Jan', ndvi: 0.78, rainfall: 267 },
  ];

  // Deforestation alerts
  const deforestationAlerts = [
    { date: '2026-01-28', area: 12.4, location: 'Amazon Basin', severity: 'high', verified: true },
    { date: '2026-01-25', area: 5.8, location: 'Congo Basin', severity: 'medium', verified: true },
    { date: '2026-01-22', area: 3.2, location: 'Borneo', severity: 'low', verified: false },
    { date: '2026-01-18', area: 18.7, location: 'Madagascar', severity: 'critical', verified: true },
  ];

  // Data collection stats
  const dataCollectionStats = [
    { week: 'Week 1', images: 1240, cloudfree: 980, processed: 950 },
    { week: 'Week 2', images: 1380, cloudfree: 1150, processed: 1120 },
    { week: 'Week 3', images: 1520, cloudfree: 1280, processed: 1250 },
    { week: 'Week 4', images: 1450, cloudfree: 1200, processed: 1180 },
  ];

  // Spectral indices
  const spectralIndices = [
    {
      name: 'NDVI',
      fullName: 'Normalized Difference Vegetation Index',
      range: '-1 to 1',
      use: 'Vegetation health',
      current: 0.78
    },
    {
      name: 'EVI',
      fullName: 'Enhanced Vegetation Index',
      range: '-1 to 1',
      use: 'Canopy structure',
      current: 0.65
    },
    {
      name: 'NDWI',
      fullName: 'Normalized Difference Water Index',
      range: '-1 to 1',
      use: 'Water content',
      current: 0.42
    },
    {
      name: 'NBR',
      fullName: 'Normalized Burn Ratio',
      range: '-1 to 1',
      use: 'Fire detection',
      current: 0.35
    },
  ];

  // Analysis types
  const analysisTypes = [
    {
      icon: Eye,
      name: 'Change Detection',
      description: 'Identify land cover changes over time',
      projects: 145,
      accuracy: 96.2
    },
    {
      icon: TrendingUp,
      name: 'Trend Analysis',
      description: 'Long-term vegetation and climate trends',
      projects: 98,
      accuracy: 94.8
    },
    {
      icon: AlertCircle,
      name: 'Anomaly Detection',
      description: 'Detect deforestation and degradation',
      projects: 234,
      accuracy: 97.4
    },
    {
      icon: Cloud,
      name: 'Cloud Masking',
      description: 'Remove cloud interference from imagery',
      projects: 312,
      accuracy: 99.1
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white mb-2">Satellite Data Integration</h2>
        <p className="text-emerald-300/70">Real-time Earth observation data for environmental monitoring and verification</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300/70 text-sm">Active Satellites</span>
            <Satellite className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-white text-2xl mb-1">{satellites.length}</div>
          <div className="text-emerald-400 text-sm">Data sources</div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300/70 text-sm">Monitored Area</span>
            <Map className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-white text-2xl mb-1">137K</div>
          <div className="text-emerald-400 text-sm">Hectares tracked</div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300/70 text-sm">Data Points</span>
            <Radio className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-white text-2xl mb-1">9.1M</div>
          <div className="text-emerald-400 text-sm">This month</div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300/70 text-sm">Accuracy</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-white text-2xl mb-1">96.9%</div>
          <div className="text-emerald-400 text-sm">Verification rate</div>
        </Card>
      </div>

      {/* Satellite Sources */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Integrated Satellite Data Sources</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {satellites.map((sat) => (
            <div
              key={sat.id}
              className={`bg-slate-900/50 border rounded-lg p-4 cursor-pointer transition-all ${
                selectedSatellite === sat.id
                  ? 'border-emerald-400 bg-emerald-400/10'
                  : 'border-emerald-500/20 hover:border-emerald-400/50'
              }`}
              onClick={() => setSelectedSatellite(sat.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Satellite className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h4 className="text-white font-medium">{sat.name}</h4>
                    <div className="text-emerald-300/70 text-sm">{sat.operator}</div>
                  </div>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  {sat.status}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <div className="text-emerald-300/70 text-xs">Resolution</div>
                  <div className="text-white font-medium">{sat.resolution}</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Revisit</div>
                  <div className="text-white font-medium">{sat.revisitTime}</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Bands</div>
                  <div className="text-white font-medium">{sat.bands}</div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-2 mb-2">
                <div className="text-emerald-300/70 text-xs">Primary Use</div>
                <div className="text-white text-sm">{sat.use}</div>
              </div>

              <div className="text-emerald-300/70 text-xs">
                {sat.dataPoints.toLocaleString()} data points collected
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Monitored Projects */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Satellite-Monitored Projects</h3>
        
        <div className="space-y-3">
          {monitoredProjects.map((project) => (
            <div key={project.id} className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="text-white font-medium">{project.name}</h4>
                    {project.alerts > 0 && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        {project.alerts} alert{project.alerts > 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                  <div className="text-emerald-300/70 text-sm mt-1">
                    {project.location} • {project.area.toLocaleString()} hectares • {project.id}
                  </div>
                </div>
                <div className="text-emerald-300/70 text-sm text-right">
                  Updated {project.lastUpdate}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-3">
                <div>
                  <div className="text-emerald-300/70 text-xs">Forest Cover</div>
                  <div className="text-white font-medium">{project.metrics.forestCover}%</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Change Rate</div>
                  <div className={`font-medium ${project.metrics.deforestation < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {project.metrics.deforestation > 0 ? '+' : ''}{project.metrics.deforestation}%
                  </div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Biomass</div>
                  <div className="text-white font-medium">{project.metrics.biomass} t/ha</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">NDVI</div>
                  <div className="text-white font-medium">{project.metrics.ndvi}</div>
                </div>
              </div>

              <div className="flex gap-2">
                {project.satellites.map((sat, index) => (
                  <Badge key={index} className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                    {sat}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* NDVI Time Series */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Vegetation Health Index (NDVI) Time Series</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ndviTimeSeries}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="month" stroke="#6ee7b7" />
            <YAxis yAxisId="left" stroke="#6ee7b7" domain={[0, 1]} />
            <YAxis yAxisId="right" orientation="right" stroke="#6ee7b7" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b98150' }}
              labelStyle={{ color: '#6ee7b7' }}
            />
            <Line yAxisId="left" type="monotone" dataKey="ndvi" stroke="#10b981" strokeWidth={2} name="NDVI" />
            <Line yAxisId="right" type="monotone" dataKey="rainfall" stroke="#3b82f6" strokeWidth={2} name="Rainfall (mm)" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Data Collection Stats */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Satellite Data Collection Statistics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataCollectionStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="week" stroke="#6ee7b7" />
            <YAxis stroke="#6ee7b7" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b98150' }}
              labelStyle={{ color: '#6ee7b7' }}
            />
            <Bar dataKey="images" fill="#3b82f6" name="Total Images" />
            <Bar dataKey="cloudfree" fill="#10b981" name="Cloud-Free" />
            <Bar dataKey="processed" fill="#f59e0b" name="Processed" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Deforestation Alerts */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Recent Deforestation Alerts</h3>
        
        <div className="space-y-2">
          {deforestationAlerts.map((alert, index) => (
            <div key={index} className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle 
                  className={`w-5 h-5 ${
                    alert.severity === 'critical' ? 'text-red-400' :
                    alert.severity === 'high' ? 'text-orange-400' :
                    alert.severity === 'medium' ? 'text-yellow-400' :
                    'text-blue-400'
                  }`}
                />
                <div>
                  <div className="text-white font-medium">{alert.location}</div>
                  <div className="text-emerald-300/70 text-sm">{alert.area} hectares • {alert.date}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge 
                  className={
                    alert.severity === 'critical' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                    alert.severity === 'high' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                    alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                    'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  }
                >
                  {alert.severity}
                </Badge>
                {alert.verified && (
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    verified
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Spectral Indices */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Spectral Indices</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {spectralIndices.map((index, i) => (
            <div key={i} className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-white font-medium">{index.name}</h4>
                  <div className="text-emerald-300/70 text-sm">{index.fullName}</div>
                </div>
                <div className="text-emerald-400 text-2xl font-medium">{index.current}</div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <div className="text-emerald-300/70 text-xs">Range</div>
                  <div className="text-white text-sm">{index.range}</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Primary Use</div>
                  <div className="text-white text-sm">{index.use}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Analysis Types */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Satellite Data Analysis Capabilities</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analysisTypes.map((analysis, index) => {
            const Icon = analysis.icon;
            return (
              <div key={index} className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4">
                <div className="bg-emerald-500/20 p-3 rounded-lg w-fit mb-3">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="text-white font-medium mb-2">{analysis.name}</h4>
                <p className="text-emerald-300/70 text-sm mb-4">{analysis.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-emerald-300/70 text-xs">Projects</div>
                    <div className="text-white font-medium">{analysis.projects}</div>
                  </div>
                  <div>
                    <div className="text-emerald-300/70 text-xs">Accuracy</div>
                    <div className="text-emerald-400 font-medium">{analysis.accuracy}%</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* API Integration */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Satellite Data API</h3>
        
        <div className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4 mb-4">
          <div className="text-emerald-300/70 text-sm mb-2">Example: Query Satellite Imagery</div>
          <pre className="text-white text-sm overflow-x-auto">
{`// Get latest satellite imagery
const imagery = await rve.satellite.getImagery({
  satellite: 'sentinel-2',
  location: { lat: -3.4653, lng: -62.2159 },
  startDate: '2026-01-01',
  endDate: '2026-01-31',
  cloudCover: 10, // max 10%
  indices: ['NDVI', 'EVI', 'NDWI']
});

// Analyze changes
const changes = await rve.satellite.detectChanges({
  project: 'AMZ-001',
  baseline: '2025-01-01',
  current: '2026-01-31',
  threshold: 0.1 // 10% change threshold
});`}
          </pre>
        </div>

        <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
          Access Satellite API Documentation
        </Button>
      </Card>
    </div>
  );
}
