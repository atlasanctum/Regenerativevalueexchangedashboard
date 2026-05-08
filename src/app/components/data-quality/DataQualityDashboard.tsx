import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  Database, CheckCircle2, AlertTriangle, XCircle, TrendingUp, Satellite, 
  Cpu, FlaskConical, GitBranch, Shield, Calendar, MapPin, Activity,
  BarChart3, Thermometer, Droplet, Leaf
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data quality metrics
const qualityMetrics = {
  completeness: {
    satellite_coverage: 87.3,
    iot_uptime: 94.2,
    ground_truth_completion: 78.5,
    overall: 88.1
  },
  accuracy: {
    sensor_calibration_compliance: 92.4,
    cross_validation_agreement: 89.7,
    anomaly_rate: 3.2,
    overall: 91.3
  },
  timeliness: {
    real_time_latency_p95: 245, // milliseconds
    batch_processing_delay: 3.2, // hours
    overall: 'Good'
  },
  consistency: {
    temporal_consistency: 95.1,
    spatial_consistency: 91.8,
    cross_source_consistency: 87.4,
    overall: 91.4
  }
};

const sensorHealth = [
  { id: 'SENSOR-WQ-247', type: 'pH', location: 'Nairobi Inlet', status: 'healthy', calibrated: '2 days ago', battery: 87, uptime: 99.8 },
  { id: 'SENSOR-WQ-248', type: 'Turbidity', location: 'Nairobi Filter 1', status: 'healthy', calibrated: '5 days ago', battery: 92, uptime: 99.9 },
  { id: 'SENSOR-WQ-249', type: 'Flow Rate', location: 'Nairobi Outlet', status: 'warning', calibrated: '34 days ago', battery: 78, uptime: 98.2 },
  { id: 'SENSOR-SC-145', type: 'Soil Moisture', location: 'Forest Plot 3', status: 'critical', calibrated: '45 days ago', battery: 12, uptime: 87.3 },
  { id: 'SENSOR-SC-146', type: 'Soil pH', location: 'Forest Plot 3', status: 'healthy', calibrated: '1 day ago', battery: 94, uptime: 99.7 },
];

const satelliteData = [
  { date: '2026-02-25', source: 'Sentinel-2', cloudCover: 12, resolution: '10m', quality: 'Excellent', ndvi: 0.67 },
  { date: '2026-02-28', source: 'Landsat 8', cloudCover: 8, resolution: '30m', quality: 'Excellent', ndvi: 0.65 },
  { date: '2026-03-02', source: 'Sentinel-2', cloudCover: 35, resolution: '10m', quality: 'Poor', ndvi: null },
  { date: '2026-03-05', source: 'Planet Labs', cloudCover: 5, resolution: '3m', quality: 'Excellent', ndvi: 0.68 },
];

const validationResults = [
  { check: 'Satellite vs IoT Soil Moisture', agreement: 94, threshold: 80, status: 'pass', projects: 12 },
  { check: 'Satellite NDVI vs Ground Tree Count', agreement: 87, threshold: 80, status: 'pass', projects: 8 },
  { check: 'Sensor Reading vs Calibration Standard', agreement: 76, threshold: 80, status: 'fail', projects: 3 },
  { check: 'Lab Results vs Expected Range', agreement: 98, threshold: 90, status: 'pass', projects: 15 },
];

const dataLineage = [
  { dataset: 'soil-carbon-project-89-v1.2.3', type: 'Lab Results', source: 'Soil Science Lab Kenya', collected: '2026-03-01', validated: true, hash: 'sha256:7f3a9b...' },
  { dataset: 'sentinel2-nairobi-2026-02-28', type: 'Satellite Imagery', source: 'Copernicus Hub', collected: '2026-02-28', validated: true, hash: 'sha256:2e4c8d...' },
  { dataset: 'sensor-readings-wq-247-daily', type: 'IoT Sensors', source: 'LoRaWAN Gateway #5', collected: '2026-03-04', validated: true, hash: 'sha256:9a2f1e...' },
  { dataset: 'ground-survey-forest-plot-3', type: 'Field Survey', source: 'Mobile App Survey', collected: '2026-03-03', validated: false, hash: 'sha256:4b8c3d...' },
];

const timeSeriesData = [
  { date: 'Feb 25', completeness: 85, accuracy: 89, consistency: 92 },
  { date: 'Feb 26', completeness: 87, accuracy: 91, consistency: 90 },
  { date: 'Feb 27', completeness: 89, accuracy: 88, consistency: 91 },
  { date: 'Feb 28', completeness: 84, accuracy: 90, consistency: 93 },
  { date: 'Mar 01', completeness: 86, accuracy: 92, consistency: 91 },
  { date: 'Mar 02', completeness: 88, accuracy: 91, consistency: 92 },
  { date: 'Mar 03', completeness: 87, accuracy: 89, consistency: 91 },
  { date: 'Mar 04', completeness: 88, accuracy: 91, consistency: 91 },
];

export function DataQualityDashboard() {
  const [selectedMetric, setSelectedMetric] = useState<'completeness' | 'accuracy' | 'consistency'>('completeness');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'critical': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Data Quality & Measurement</h2>
          <p className="text-emerald-300/70 mt-1">Sacred data: Ensuring measurement integrity & scientific reproducibility</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-300">
            <Shield className="w-3 h-3 mr-1" />
            ISO 17025 Certified
          </Badge>
          <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-300">
            <Database className="w-3 h-3 mr-1" />
            Provenance Tracked
          </Badge>
        </div>
      </div>

      {/* Critical Alerts */}
      <Alert className="bg-red-500/10 border-red-500/30">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <AlertTitle className="text-red-300">Critical: Sensor Calibration Overdue</AlertTitle>
        <AlertDescription className="text-red-300/70">
          Sensor SENSOR-SC-145 (Soil Moisture, Forest Plot 3) is 15 days past calibration deadline. Data quality may be compromised. Battery also at 12%.
        </AlertDescription>
        <Button size="sm" className="mt-3 bg-red-600 hover:bg-red-700">
          Dispatch Technician
        </Button>
      </Alert>

      {/* Quality Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card 
          className={`p-6 cursor-pointer transition-all ${selectedMetric === 'completeness' ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-black/40 border-emerald-500/20 hover:border-emerald-500/40'}`}
          onClick={() => setSelectedMetric('completeness')}
        >
          <div className="flex items-center justify-between mb-3">
            <Database className="w-5 h-5 text-emerald-400" />
            <span className="text-2xl font-bold text-white">{qualityMetrics.completeness.overall}%</span>
          </div>
          <p className="text-emerald-300 font-medium mb-1">Data Completeness</p>
          <p className="text-emerald-300/50 text-xs">% of expected data received</p>
          <div className="mt-3 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Satellite</span>
              <span className="text-emerald-300">{qualityMetrics.completeness.satellite_coverage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">IoT Sensors</span>
              <span className="text-emerald-300">{qualityMetrics.completeness.iot_uptime}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Ground Truth</span>
              <span className="text-emerald-300">{qualityMetrics.completeness.ground_truth_completion}%</span>
            </div>
          </div>
        </Card>

        <Card 
          className={`p-6 cursor-pointer transition-all ${selectedMetric === 'accuracy' ? 'bg-blue-500/20 border-blue-500/50' : 'bg-black/40 border-blue-500/20 hover:border-blue-500/40'}`}
          onClick={() => setSelectedMetric('accuracy')}
        >
          <div className="flex items-center justify-between mb-3">
            <CheckCircle2 className="w-5 h-5 text-blue-400" />
            <span className="text-2xl font-bold text-white">{qualityMetrics.accuracy.overall}%</span>
          </div>
          <p className="text-blue-300 font-medium mb-1">Data Accuracy</p>
          <p className="text-blue-300/50 text-xs">Calibration & validation compliance</p>
          <div className="mt-3 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-blue-300/70">Calibration</span>
              <span className="text-blue-300">{qualityMetrics.accuracy.sensor_calibration_compliance}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-300/70">Cross-validation</span>
              <span className="text-blue-300">{qualityMetrics.accuracy.cross_validation_agreement}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-300/70">Anomaly Rate</span>
              <span className="text-blue-300">{qualityMetrics.accuracy.anomaly_rate}%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-black/40 border-purple-500/20">
          <div className="flex items-center justify-between mb-3">
            <Activity className="w-5 h-5 text-purple-400" />
            <span className="text-2xl font-bold text-white">{qualityMetrics.timeliness.real_time_latency_p95}ms</span>
          </div>
          <p className="text-purple-300 font-medium mb-1">Data Timeliness</p>
          <p className="text-purple-300/50 text-xs">P95 real-time latency</p>
          <div className="mt-3 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-purple-300/70">Real-time P95</span>
              <span className="text-purple-300">{qualityMetrics.timeliness.real_time_latency_p95}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-300/70">Batch Processing</span>
              <span className="text-purple-300">{qualityMetrics.timeliness.batch_processing_delay}h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-300/70">Overall</span>
              <span className="text-green-300">{qualityMetrics.timeliness.overall}</span>
            </div>
          </div>
        </Card>

        <Card 
          className={`p-6 cursor-pointer transition-all ${selectedMetric === 'consistency' ? 'bg-amber-500/20 border-amber-500/50' : 'bg-black/40 border-amber-500/20 hover:border-amber-500/40'}`}
          onClick={() => setSelectedMetric('consistency')}
        >
          <div className="flex items-center justify-between mb-3">
            <GitBranch className="w-5 h-5 text-amber-400" />
            <span className="text-2xl font-bold text-white">{qualityMetrics.consistency.overall}%</span>
          </div>
          <p className="text-amber-300 font-medium mb-1">Data Consistency</p>
          <p className="text-amber-300/50 text-xs">Multi-source agreement</p>
          <div className="mt-3 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-amber-300/70">Temporal</span>
              <span className="text-amber-300">{qualityMetrics.consistency.temporal_consistency}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-300/70">Spatial</span>
              <span className="text-amber-300">{qualityMetrics.consistency.spatial_consistency}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-300/70">Cross-source</span>
              <span className="text-amber-300">{qualityMetrics.consistency.cross_source_consistency}%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Time Series Chart */}
      <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Quality Metrics Trend (7 days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#10b981" opacity={0.1} />
            <XAxis dataKey="date" stroke="#6ee7b7" />
            <YAxis stroke="#6ee7b7" domain={[70, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
              }}
            />
            <Line type="monotone" dataKey="completeness" stroke="#10b981" strokeWidth={2} name="Completeness" />
            <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={2} name="Accuracy" />
            <Line type="monotone" dataKey="consistency" stroke="#f59e0b" strokeWidth={2} name="Consistency" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Tabs defaultValue="sensors" className="space-y-6">
        <TabsList className="bg-black/40 border border-emerald-500/20">
          <TabsTrigger value="sensors">
            <Cpu className="w-4 h-4 mr-2" />
            IoT Sensors
          </TabsTrigger>
          <TabsTrigger value="satellite">
            <Satellite className="w-4 h-4 mr-2" />
            Satellite Data
          </TabsTrigger>
          <TabsTrigger value="validation">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Cross-Validation
          </TabsTrigger>
          <TabsTrigger value="provenance">
            <GitBranch className="w-4 h-4 mr-2" />
            Data Provenance
          </TabsTrigger>
        </TabsList>

        {/* IoT Sensors Tab */}
        <TabsContent value="sensors">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Sensor Health Status</h3>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-300">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  3 Healthy
                </Badge>
                <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30 text-yellow-300">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  1 Warning
                </Badge>
                <Badge variant="outline" className="bg-red-500/10 border-red-500/30 text-red-300">
                  <XCircle className="w-3 h-3 mr-1" />
                  1 Critical
                </Badge>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-500/20">
                  <TableHead className="text-emerald-300">Sensor ID</TableHead>
                  <TableHead className="text-emerald-300">Type</TableHead>
                  <TableHead className="text-emerald-300">Location</TableHead>
                  <TableHead className="text-emerald-300">Status</TableHead>
                  <TableHead className="text-emerald-300">Last Calibrated</TableHead>
                  <TableHead className="text-emerald-300">Battery</TableHead>
                  <TableHead className="text-emerald-300">Uptime</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sensorHealth.map((sensor) => (
                  <TableRow key={sensor.id} className="border-emerald-500/10">
                    <TableCell className="text-white font-mono text-sm">{sensor.id}</TableCell>
                    <TableCell className="text-emerald-300">{sensor.type}</TableCell>
                    <TableCell className="text-emerald-300/70">{sensor.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(sensor.status)}
                        <span className={getStatusColor(sensor.status)}>{sensor.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className={sensor.status === 'critical' || sensor.status === 'warning' ? 'text-red-400' : 'text-emerald-300'}>
                      {sensor.calibrated}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={sensor.battery} className="h-2 w-20" />
                        <span className={sensor.battery < 20 ? 'text-red-400' : 'text-emerald-300'}>{sensor.battery}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-emerald-300">{sensor.uptime}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Satellite Data Tab */}
        <TabsContent value="satellite">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Satellite Imagery</h3>
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-500/20">
                  <TableHead className="text-emerald-300">Date</TableHead>
                  <TableHead className="text-emerald-300">Source</TableHead>
                  <TableHead className="text-emerald-300">Cloud Cover</TableHead>
                  <TableHead className="text-emerald-300">Resolution</TableHead>
                  <TableHead className="text-emerald-300">Quality</TableHead>
                  <TableHead className="text-emerald-300">NDVI</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {satelliteData.map((sat, idx) => (
                  <TableRow key={idx} className="border-emerald-500/10">
                    <TableCell className="text-white">{sat.date}</TableCell>
                    <TableCell className="text-emerald-300">{sat.source}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        sat.cloudCover < 20 ? 'bg-green-500/10 border-green-500/30 text-green-300' :
                        sat.cloudCover < 40 ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300' :
                        'bg-red-500/10 border-red-500/30 text-red-300'
                      }>
                        {sat.cloudCover}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-emerald-300">{sat.resolution}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        sat.quality === 'Excellent' ? 'bg-green-500/10 border-green-500/30 text-green-300' :
                        'bg-red-500/10 border-red-500/30 text-red-300'
                      }>
                        {sat.quality}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-emerald-400 font-mono">{sat.ndvi || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Cross-Validation Tab */}
        <TabsContent value="validation">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Cross-Validation Results</h3>
            <p className="text-emerald-300/70 text-sm mb-4">
              Multi-source triangulation ensures data accuracy. Each check requires ≥80% agreement.
            </p>
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-500/20">
                  <TableHead className="text-emerald-300">Validation Check</TableHead>
                  <TableHead className="text-emerald-300">Agreement</TableHead>
                  <TableHead className="text-emerald-300">Threshold</TableHead>
                  <TableHead className="text-emerald-300">Status</TableHead>
                  <TableHead className="text-emerald-300">Projects</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {validationResults.map((check, idx) => (
                  <TableRow key={idx} className="border-emerald-500/10">
                    <TableCell className="text-white">{check.check}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={check.agreement} className="h-2 w-32" />
                        <span className={check.agreement >= check.threshold ? 'text-green-400' : 'text-red-400'}>
                          {check.agreement}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-emerald-300/70">{check.threshold}%</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        check.status === 'pass' 
                          ? 'bg-green-500/10 border-green-500/30 text-green-300' 
                          : 'bg-red-500/10 border-red-500/30 text-red-300'
                      }>
                        {check.status === 'pass' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                        {check.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-emerald-300">{check.projects}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Data Provenance Tab */}
        <TabsContent value="provenance">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Data Provenance & Chain of Custody</h3>
            <p className="text-emerald-300/70 text-sm mb-4">
              Full data lineage with cryptographic verification. Every dataset is versioned and hash-verified.
            </p>
            <div className="space-y-3">
              {dataLineage.map((item, idx) => (
                <Card key={idx} className="p-4 bg-slate-800/50 border-emerald-500/10">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {item.type === 'Lab Results' && <FlaskConical className="w-5 h-5 text-blue-400" />}
                      {item.type === 'Satellite Imagery' && <Satellite className="w-5 h-5 text-purple-400" />}
                      {item.type === 'IoT Sensors' && <Cpu className="w-5 h-5 text-green-400" />}
                      {item.type === 'Field Survey' && <MapPin className="w-5 h-5 text-amber-400" />}
                      <div>
                        <p className="text-white font-medium">{item.dataset}</p>
                        <p className="text-emerald-300/70 text-sm">{item.type}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={
                      item.validated 
                        ? 'bg-green-500/10 border-green-500/30 text-green-300'
                        : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300'
                    }>
                      {item.validated ? 'Validated' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm mt-3">
                    <div>
                      <p className="text-emerald-300/70 mb-1">Source</p>
                      <p className="text-white">{item.source}</p>
                    </div>
                    <div>
                      <p className="text-emerald-300/70 mb-1">Collected</p>
                      <p className="text-white">{item.collected}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-emerald-300/70 mb-1">Data Hash (SHA-256)</p>
                      <p className="text-emerald-300 font-mono text-xs">{item.hash}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
