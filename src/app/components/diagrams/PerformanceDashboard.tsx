import { useState } from 'react';
import { Gauge, Zap, TrendingUp, Server, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from '../ui/interactive/Card';
import { InteractiveChart } from '../ui/interactive/InteractiveChart';
import { motion } from 'motion/react';

export function PerformanceDashboard() {
  const [timeRange, setTimeRange] = useState('1h');

  const performanceMetrics = [
    { time: '00:00', cpu: 45, memory: 62, requests: 8472, latency: 42 },
    { time: '00:15', cpu: 52, memory: 64, requests: 8923, latency: 45 },
    { time: '00:30', cpu: 48, memory: 63, requests: 8784, latency: 41 },
    { time: '00:45', cpu: 51, memory: 65, requests: 9124, latency: 43 },
    { time: '01:00', cpu: 47, memory: 62, requests: 8847, latency: 40 },
  ];

  const services = [
    { name: 'API Gateway', status: 'healthy', cpu: 42, memory: 58, uptime: 99.98, requests: 12400 },
    { name: 'Trading Engine', status: 'healthy', cpu: 67, memory: 74, uptime: 99.92, requests: 8472 },
    { name: 'Verification Service', status: 'warning', cpu: 78, memory: 82, uptime: 99.87, requests: 3284 },
    { name: 'Oracle Network', status: 'healthy', cpu: 54, memory: 69, uptime: 99.94, requests: 4847 },
    { name: 'Blockchain Node', status: 'healthy', cpu: 38, memory: 52, uptime: 99.96, requests: 6723 },
  ];

  const scalingMetrics = [
    { metric: 'Horizontal Pods', current: 24, max: 50, target: 30 },
    { metric: 'Database Connections', current: 847, max: 2000, target: 1000 },
    { metric: 'Cache Hit Rate', current: 94, max: 100, target: 95 },
    { metric: 'Load Balancer Health', current: 98, max: 100, target: 99 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white flex items-center gap-3">
            <Gauge className="w-8 h-8 text-emerald-400" />
            Performance & Scalability Dashboard
          </h1>
          <p className="text-emerald-300/70 mt-2">
            Real-time system performance monitoring with auto-scaling metrics
          </p>
        </div>
        <div className="flex gap-2">
          {['1h', '6h', '24h', '7d'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded text-sm transition-all ${
                timeRange === range
                  ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30'
                  : 'bg-slate-800 text-emerald-300/70 border border-emerald-500/20 hover:border-emerald-400/40'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Response Time', value: '42ms', status: 'excellent', icon: Zap },
          { label: 'Requests/Second', value: '8.9K', status: 'normal', icon: TrendingUp },
          { label: 'System Uptime', value: '99.94%', status: 'excellent', icon: CheckCircle },
          { label: 'Active Warnings', value: '2', status: 'warning', icon: AlertTriangle },
        ].map((metric, idx) => {
          const Icon = metric.icon;
          const statusColor =
            metric.status === 'excellent' ? 'text-emerald-400 bg-emerald-400/20' :
            metric.status === 'warning' ? 'text-yellow-400 bg-yellow-400/20' :
            'text-blue-400 bg-blue-400/20';

          return (
            <Card key={idx} hover={false}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 ${statusColor} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-emerald-300/70 text-sm">{metric.label}</div>
                  <div className="text-white text-xl">{metric.value}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InteractiveChart
          title="CPU & Memory Usage"
          data={performanceMetrics}
          type="line"
          xAxisKey="time"
          dataKeys={[
            { key: 'cpu', color: '#10b981', name: 'CPU %' },
            { key: 'memory', color: '#3b82f6', name: 'Memory %' },
          ]}
          height={300}
        />

        <InteractiveChart
          title="Requests & Latency"
          data={performanceMetrics}
          type="area"
          xAxisKey="time"
          dataKeys={[
            { key: 'requests', color: '#8b5cf6', name: 'Requests' },
            { key: 'latency', color: '#f59e0b', name: 'Latency (ms)' },
          ]}
          height={300}
        />
      </div>

      {/* Service Health */}
      <Card hover={false}>
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Server className="w-5 h-5 text-emerald-400" />
          Service Health & Resource Usage
        </h3>
        <div className="space-y-3">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/30 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    service.status === 'healthy' ? 'bg-emerald-400' : 'bg-yellow-400'
                  } animate-pulse`} />
                  <div>
                    <div className="text-white">{service.name}</div>
                    <div className="text-emerald-300/50 text-xs">
                      Uptime: {service.uptime}% • {service.requests.toLocaleString()} req/s
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded text-xs ${
                  service.status === 'healthy'
                    ? 'bg-emerald-400/20 text-emerald-400'
                    : 'bg-yellow-400/20 text-yellow-400'
                }`}>
                  {service.status}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="text-emerald-300/70">CPU</span>
                    <span className={service.cpu > 70 ? 'text-yellow-400' : 'text-emerald-400'}>
                      {service.cpu}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-900/50 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        service.cpu > 70
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                          : 'bg-gradient-to-r from-emerald-400 to-teal-400'
                      }`}
                      style={{ width: `${service.cpu}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="text-emerald-300/70">Memory</span>
                    <span className={service.memory > 80 ? 'text-yellow-400' : 'text-emerald-400'}>
                      {service.memory}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-900/50 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        service.memory > 80
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                          : 'bg-gradient-to-r from-blue-400 to-purple-400'
                      }`}
                      style={{ width: `${service.memory}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Scaling Metrics */}
      <Card hover={false}>
        <h3 className="text-white mb-4">Auto-Scaling & Capacity Planning</h3>
        <div className="space-y-4">
          {scalingMetrics.map((metric, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-300/70">{metric.metric}</span>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-emerald-300/50">Target: {metric.target}</span>
                  <span className="text-white">Current: {metric.current}</span>
                  <span className="text-emerald-300/50">Max: {metric.max}</span>
                </div>
              </div>
              <div className="w-full bg-slate-900/50 rounded-full h-3 relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(metric.current / metric.max) * 100}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className={`h-3 rounded-full ${
                    metric.current > metric.target * 1.2
                      ? 'bg-gradient-to-r from-red-400 to-orange-400'
                      : metric.current > metric.target
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                      : 'bg-gradient-to-r from-emerald-400 to-teal-400'
                  }`}
                />
                <div
                  className="absolute h-3 w-0.5 bg-white opacity-50"
                  style={{ left: `${(metric.target / metric.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Latency Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card hover={false}>
          <h3 className="text-white mb-4">Response Time Distribution</h3>
          <div className="space-y-3">
            {[
              { percentile: 'p50 (Median)', value: '32ms', percentage: 32 },
              { percentile: 'p75', value: '45ms', percentage: 45 },
              { percentile: 'p90', value: '67ms', percentage: 67 },
              { percentile: 'p95', value: '89ms', percentage: 89 },
              { percentile: 'p99', value: '124ms', percentage: 100 },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-emerald-300/70 text-sm">{item.percentile}</span>
                  <span className="text-white">{item.value}</span>
                </div>
                <div className="w-full bg-slate-900/50 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, delay: idx * 0.05 }}
                    className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card hover={false}>
          <h3 className="text-white mb-4">Infrastructure Costs</h3>
          <div className="space-y-4">
            {[
              { category: 'Compute (EC2/K8s)', cost: '$24,847', percentage: 45 },
              { category: 'Database (RDS/DynamoDB)', cost: '$12,284', percentage: 22 },
              { category: 'Storage (S3/EBS)', cost: '$8,947', percentage: 16 },
              { category: 'Network (CloudFront/VPC)', cost: '$5,823', percentage: 11 },
              { category: 'Other Services', cost: '$3,284', percentage: 6 },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-800/30 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-300/70 text-sm">{item.category}</span>
                  <span className="text-white">{item.cost}/mo</span>
                </div>
                <div className="w-full bg-slate-900/50 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
