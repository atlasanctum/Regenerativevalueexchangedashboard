import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Cpu, Thermometer, Droplets, Wind, Activity, Battery, Radio, MapPin, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function IoTSensorNetworks() {
  const [selectedSensor, setSelectedSensor] = useState('soil-001');

  // Sensor networks
  const sensorNetworks = [
    {
      id: 'amazon-net',
      name: 'Amazon Rainforest Network',
      location: 'Brazil',
      sensors: 234,
      activePercent: 98.7,
      dataPoints: 2340000,
      coverage: '50,000 hectares',
      batteryAvg: 87,
      signalStrength: 94
    },
    {
      id: 'mangrove-net',
      name: 'Mangrove Coastal Sensors',
      location: 'Indonesia',
      sensors: 156,
      activePercent: 99.2,
      dataPoints: 1560000,
      coverage: '12,000 hectares',
      batteryAvg: 92,
      signalStrength: 89
    },
    {
      id: 'savanna-net',
      name: 'African Savanna Array',
      location: 'Kenya',
      sensors: 187,
      activePercent: 96.8,
      dataPoints: 1870000,
      coverage: '75,000 hectares',
      batteryAvg: 78,
      signalStrength: 86
    },
  ];

  // Individual sensors
  const sensors = [
    {
      id: 'soil-001',
      type: 'Soil Moisture',
      location: { lat: -3.4653, lng: -62.2159 },
      network: 'amazon-net',
      status: 'active',
      battery: 87,
      signal: 94,
      lastReading: '2 min ago',
      readings: {
        current: 42.5,
        min: 38.2,
        max: 48.3,
        avg: 43.1
      },
      unit: '%'
    },
    {
      id: 'temp-002',
      type: 'Temperature',
      location: { lat: -3.4658, lng: -62.2165 },
      network: 'amazon-net',
      status: 'active',
      battery: 91,
      signal: 96,
      lastReading: '1 min ago',
      readings: {
        current: 26.8,
        min: 22.1,
        max: 31.4,
        avg: 26.2
      },
      unit: '°C'
    },
    {
      id: 'humid-003',
      type: 'Humidity',
      location: { lat: -3.4662, lng: -62.2171 },
      network: 'amazon-net',
      status: 'active',
      battery: 84,
      signal: 92,
      lastReading: '3 min ago',
      readings: {
        current: 78.2,
        min: 65.4,
        max: 89.7,
        avg: 76.8
      },
      unit: '%'
    },
    {
      id: 'co2-004',
      type: 'CO2 Level',
      location: { lat: -3.4667, lng: -62.2177 },
      network: 'amazon-net',
      status: 'maintenance',
      battery: 23,
      signal: 88,
      lastReading: '2 hours ago',
      readings: {
        current: 412,
        min: 405,
        max: 425,
        avg: 413
      },
      unit: 'ppm'
    },
  ];

  // Real-time sensor data
  const sensorTimeSeries = [
    { time: '14:00', soil: 41.2, temp: 25.8, humidity: 76.4, co2: 410 },
    { time: '14:15', soil: 41.8, temp: 26.1, humidity: 77.2, co2: 411 },
    { time: '14:30', soil: 42.1, temp: 26.4, humidity: 77.8, co2: 412 },
    { time: '14:45', soil: 42.5, temp: 26.8, humidity: 78.2, co2: 412 },
    { time: '15:00', soil: 42.3, temp: 26.6, humidity: 78.0, co2: 413 },
  ];

  // Sensor alerts
  const alerts = [
    {
      id: 'ALT-001',
      sensor: 'co2-004',
      type: 'Low Battery',
      severity: 'high',
      message: 'Battery level at 23%, maintenance required',
      time: '15 min ago',
      resolved: false
    },
    {
      id: 'ALT-002',
      sensor: 'soil-023',
      type: 'Anomaly Detected',
      severity: 'medium',
      message: 'Soil moisture dropped 15% in 2 hours',
      time: '1 hour ago',
      resolved: false
    },
    {
      id: 'ALT-003',
      sensor: 'temp-045',
      type: 'Connection Lost',
      severity: 'low',
      message: 'No data received for 30 minutes',
      time: '2 hours ago',
      resolved: true
    },
  ];

  // Network statistics
  const networkStats = [
    { month: 'Aug', deployed: 180, active: 176, dataPoints: 1800000 },
    { month: 'Sep', deployed: 210, active: 205, dataPoints: 2100000 },
    { month: 'Oct', deployed: 245, active: 239, dataPoints: 2450000 },
    { month: 'Nov', deployed: 280, active: 272, dataPoints: 2800000 },
    { month: 'Dec', deployed: 320, active: 311, dataPoints: 3200000 },
    { month: 'Jan', deployed: 355, active: 345, dataPoints: 3550000 },
  ];

  // Data quality metrics
  const dataQuality = [
    { metric: 'Accuracy', value: 98.4, target: 95 },
    { metric: 'Completeness', value: 96.7, target: 90 },
    { metric: 'Timeliness', value: 99.2, target: 95 },
    { metric: 'Consistency', value: 97.1, target: 95 },
  ];

  // Sensor types
  const sensorTypes = [
    {
      icon: Thermometer,
      name: 'Temperature',
      count: 89,
      avgReading: '26.2°C',
      range: '15-35°C'
    },
    {
      icon: Droplets,
      name: 'Soil Moisture',
      count: 124,
      avgReading: '43.1%',
      range: '20-60%'
    },
    {
      icon: Wind,
      name: 'Air Quality',
      count: 67,
      avgReading: '412 ppm',
      range: '350-450 ppm'
    },
    {
      icon: Activity,
      name: 'Humidity',
      count: 98,
      avgReading: '76.8%',
      range: '40-90%'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white mb-2">IoT Sensor Networks</h2>
        <p className="text-emerald-300/70">Real-time environmental monitoring through distributed sensor arrays</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300/70 text-sm">Total Sensors</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-white text-2xl mb-1">577</div>
          <div className="text-emerald-400 text-sm">98.2% active</div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300/70 text-sm">Data Points</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-white text-2xl mb-1">5.77M</div>
          <div className="text-emerald-400 text-sm">This month</div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300/70 text-sm">Coverage</span>
            <MapPin className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-white text-2xl mb-1">137K</div>
          <div className="text-emerald-400 text-sm">Hectares monitored</div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300/70 text-sm">Avg Battery</span>
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-white text-2xl mb-1">85.7%</div>
          <div className="text-emerald-400 text-sm">Across all sensors</div>
        </Card>
      </div>

      {/* Sensor Networks */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Deployed Sensor Networks</h3>
        
        <div className="space-y-3">
          {sensorNetworks.map((network) => (
            <div key={network.id} className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-medium">{network.name}</h4>
                  <div className="text-emerald-300/70 text-sm mt-1">
                    {network.location} • Coverage: {network.coverage}
                  </div>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  {network.activePercent}% active
                </Badge>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="text-emerald-300/70 text-xs">Sensors</div>
                  <div className="text-white font-medium">{network.sensors}</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Data Points</div>
                  <div className="text-white font-medium">{(network.dataPoints / 1000000).toFixed(1)}M</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Battery</div>
                  <div className="text-white font-medium">{network.batteryAvg}%</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Signal</div>
                  <div className="text-white font-medium">{network.signalStrength}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Individual Sensors */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Individual Sensor Status</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sensors.map((sensor) => (
            <div
              key={sensor.id}
              className={`bg-slate-900/50 border rounded-lg p-4 cursor-pointer transition-all ${
                selectedSensor === sensor.id
                  ? 'border-emerald-400 bg-emerald-400/10'
                  : 'border-emerald-500/20 hover:border-emerald-400/50'
              }`}
              onClick={() => setSelectedSensor(sensor.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-medium">{sensor.type}</h4>
                  <div className="text-emerald-300/70 text-sm">{sensor.id}</div>
                </div>
                <Badge 
                  className={
                    sensor.status === 'active'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                  }
                >
                  {sensor.status}
                </Badge>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-3 mb-3">
                <div className="text-emerald-300/70 text-xs mb-1">Current Reading</div>
                <div className="text-white text-3xl font-medium">
                  {sensor.readings.current} {sensor.unit}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-3">
                <div>
                  <div className="text-emerald-300/70 text-xs">Min</div>
                  <div className="text-white text-sm">{sensor.readings.min}</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Max</div>
                  <div className="text-white text-sm">{sensor.readings.max}</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Avg</div>
                  <div className="text-white text-sm">{sensor.readings.avg}</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Battery</div>
                  <div className={`text-sm ${sensor.battery < 30 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {sensor.battery}%
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Radio className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-300/70">Signal: {sensor.signal}%</span>
                </div>
                <span className="text-emerald-300/70">Updated {sensor.lastReading}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Real-time Data */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Real-Time Sensor Readings</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sensorTimeSeries}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="time" stroke="#6ee7b7" />
            <YAxis yAxisId="left" stroke="#6ee7b7" />
            <YAxis yAxisId="right" orientation="right" stroke="#6ee7b7" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b98150' }}
              labelStyle={{ color: '#6ee7b7' }}
            />
            <Line yAxisId="left" type="monotone" dataKey="soil" stroke="#10b981" strokeWidth={2} name="Soil Moisture (%)" />
            <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2} name="Temperature (°C)" />
            <Line yAxisId="left" type="monotone" dataKey="humidity" stroke="#f59e0b" strokeWidth={2} name="Humidity (%)" />
            <Line yAxisId="right" type="monotone" dataKey="co2" stroke="#8b5cf6" strokeWidth={2} name="CO2 (ppm)" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Alerts */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Sensor Alerts & Notifications</h3>
        
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  {alert.resolved ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <AlertTriangle 
                      className={`w-5 h-5 ${
                        alert.severity === 'high' ? 'text-red-400' :
                        alert.severity === 'medium' ? 'text-yellow-400' :
                        'text-blue-400'
                      }`}
                    />
                  )}
                  <div>
                    <div className="text-white font-medium">{alert.type}</div>
                    <div className="text-emerald-300/70 text-sm">{alert.sensor} • {alert.time}</div>
                  </div>
                </div>
                <Badge 
                  className={
                    alert.severity === 'high'
                      ? 'bg-red-500/20 text-red-400 border-red-500/30'
                      : alert.severity === 'medium'
                      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  }
                >
                  {alert.severity}
                </Badge>
              </div>
              <p className="text-emerald-300/70 text-sm">{alert.message}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Network Growth */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Sensor Network Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={networkStats}>
            <defs>
              <linearGradient id="deployedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="month" stroke="#6ee7b7" />
            <YAxis stroke="#6ee7b7" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b98150' }}
              labelStyle={{ color: '#6ee7b7' }}
            />
            <Area type="monotone" dataKey="deployed" stroke="#3b82f6" fill="url(#deployedGradient)" name="Deployed" />
            <Area type="monotone" dataKey="active" stroke="#10b981" fill="url(#activeGradient)" name="Active" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Data Quality */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Data Quality Metrics</h3>
        
        <div className="space-y-3">
          {dataQuality.map((quality, index) => (
            <div key={index} className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{quality.metric}</span>
                <span className="text-emerald-400 font-medium">{quality.value}%</span>
              </div>
              <div className="bg-slate-900/50 rounded-full h-2 mb-1">
                <div 
                  className={`h-2 rounded-full ${quality.value >= quality.target ? 'bg-emerald-400' : 'bg-yellow-400'}`}
                  style={{ width: `${quality.value}%` }}
                />
              </div>
              <div className="text-emerald-300/70 text-xs">Target: {quality.target}%</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Sensor Types */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Sensor Type Distribution</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sensorTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <div key={index} className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4">
                <div className="bg-emerald-500/20 p-3 rounded-lg w-fit mb-3">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="text-white font-medium mb-2">{type.name}</h4>
                <div className="space-y-2">
                  <div>
                    <div className="text-emerald-300/70 text-xs">Deployed</div>
                    <div className="text-white font-medium">{type.count} sensors</div>
                  </div>
                  <div>
                    <div className="text-emerald-300/70 text-xs">Avg Reading</div>
                    <div className="text-white font-medium">{type.avgReading}</div>
                  </div>
                  <div>
                    <div className="text-emerald-300/70 text-xs">Range</div>
                    <div className="text-white text-sm">{type.range}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* API Integration */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">IoT Sensor API</h3>
        
        <div className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4 mb-4">
          <div className="text-emerald-300/70 text-sm mb-2">Example: Query Sensor Data</div>
          <pre className="text-white text-sm overflow-x-auto">
{`// Get real-time sensor data
const data = await rve.iot.getSensorData({
  network: 'amazon-net',
  sensorType: 'soil-moisture',
  timeRange: '24h',
  aggregation: '15min'
});

// Subscribe to real-time updates
rve.iot.subscribe('soil-001', (reading) => {
  console.log(\`Moisture: \${reading.value}%\`);
  console.log(\`Battery: \${reading.battery}%\`);
});`}
          </pre>
        </div>

        <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
          Access IoT API Documentation
        </Button>
      </Card>
    </div>
  );
}
