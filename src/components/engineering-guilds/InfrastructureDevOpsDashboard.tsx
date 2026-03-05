import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  Server, Zap, Shield, AlertTriangle, CheckCircle2, Activity, 
  Database, Cloud, Lock, TrendingUp, Clock, Cpu, HardDrive, Network
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// System health metrics
const systemHealth = {
  uptime: 99.94,
  requestsPerSecond: 8_427,
  avgLatency: 87,  // milliseconds
  errorRate: 0.12,  // percent
  activeConnections: 12_435,
  cpuUsage: 42,
  memoryUsage: 68,
  diskUsage: 54,
};

// Infrastructure services
const services = [
  { name: 'API Gateway', status: 'healthy', uptime: 99.98, instances: 12, latency: 45 },
  { name: 'Database (Primary)', status: 'healthy', uptime: 99.99, instances: 3, latency: 12 },
  { name: 'Database (Replica)', status: 'healthy', uptime: 99.97, instances: 6, latency: 15 },
  { name: 'Cache Layer (Redis)', status: 'healthy', uptime: 99.95, instances: 8, latency: 3 },
  { name: 'Message Queue', status: 'degraded', uptime: 99.87, instances: 4, latency: 234 },
  { name: 'Search (Elasticsearch)', status: 'healthy', uptime: 99.92, instances: 6, latency: 67 },
  { name: 'Object Storage (S3)', status: 'healthy', uptime: 99.99, instances: 1, latency: 112 },
  { name: 'CDN (CloudFlare)', status: 'healthy', uptime: 99.98, instances: 1, latency: 34 },
];

// Deployment pipeline
const recentDeployments = [
  { id: 'DEP-347', service: 'API Gateway', version: 'v2.8.1', status: 'success', duration: '4m 32s', time: '2 hours ago' },
  { id: 'DEP-346', service: 'Data Quality', version: 'v1.3.0', status: 'success', duration: '3m 18s', time: '5 hours ago' },
  { id: 'DEP-345', service: 'Oracle Network', version: 'v2.1.4', status: 'rollback', duration: '1m 42s', time: '8 hours ago' },
  { id: 'DEP-344', service: 'Trading Engine', version: 'v3.4.2', status: 'success', duration: '6m 54s', time: '12 hours ago' },
];

// Security monitoring
const securityAlerts = [
  { severity: 'medium', type: 'Unusual Traffic Pattern', source: 'WAF', time: '15 minutes ago', status: 'investigating' },
  { severity: 'low', type: 'Failed Login Attempts', source: 'Auth Service', time: '1 hour ago', status: 'resolved' },
  { severity: 'high', type: 'SSL Certificate Expiring', source: 'api.rve.earth', time: '2 days', status: 'scheduled' },
];

// Performance metrics over time
const performanceData = [
  { time: '00:00', latency: 82, throughput: 7200, errors: 0.1 },
  { time: '04:00', latency: 78, throughput: 6800, errors: 0.08 },
  { time: '08:00', latency: 95, throughput: 9400, errors: 0.15 },
  { time: '12:00', latency: 102, throughput: 10200, errors: 0.18 },
  { time: '16:00', latency: 98, throughput: 9800, errors: 0.14 },
  { time: '20:00', latency: 87, throughput: 8400, errors: 0.12 },
  { time: '24:00', latency: 83, throughput: 7600, errors: 0.09 },
];

// Disaster recovery status
const drStatus = {
  lastBackup: '15 minutes ago',
  backupSize: '2.4 TB',
  rto: '< 1 hour',  // Recovery Time Objective
  rpo: '< 15 minutes',  // Recovery Point Objective
  lastDrillDate: '2026-02-28',
  nextDrillDate: '2026-05-28',
};

export function InfrastructureDevOpsDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Infrastructure & DevOps</h2>
          <p className="text-emerald-300/70 mt-1">Reliability at global scale: 99.94% uptime, zero-downtime deployments</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-300">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            All Systems Operational
          </Badge>
          <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-300">
            <Server className="w-3 h-3 mr-1" />
            99.94% Uptime
          </Badge>
        </div>
      </div>

      {/* Security Alert */}
      {securityAlerts.some(a => a.severity === 'high' && a.status !== 'resolved') && (
        <Alert className="bg-amber-500/10 border-amber-500/30">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <AlertTitle className="text-amber-300">Security Alert: SSL Certificate Expiring</AlertTitle>
          <AlertDescription className="text-amber-300/70">
            SSL certificate for api.rve.earth expires in 2 days. Renewal scheduled for tonight at 2:00 AM UTC.
          </AlertDescription>
          <Button size="sm" className="mt-3 bg-amber-600 hover:bg-amber-700">
            View Certificate Manager
          </Button>
        </Alert>
      )}

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-black/40 border-emerald-500/20">
          <div className="flex items-center justify-between mb-3">
            <Activity className="w-5 h-5 text-emerald-400" />
            <span className="text-2xl font-bold text-white">{systemHealth.uptime}%</span>
          </div>
          <p className="text-emerald-300 font-medium mb-1">System Uptime</p>
          <p className="text-emerald-300/50 text-xs">30-day rolling average</p>
        </Card>

        <Card className="p-6 bg-black/40 border-blue-500/20">
          <div className="flex items-center justify-between mb-3">
            <Zap className="w-5 h-5 text-blue-400" />
            <span className="text-2xl font-bold text-white">{systemHealth.requestsPerSecond.toLocaleString()}</span>
          </div>
          <p className="text-blue-300 font-medium mb-1">Requests/Second</p>
          <p className="text-blue-300/50 text-xs">Real-time throughput</p>
        </Card>

        <Card className="p-6 bg-black/40 border-purple-500/20">
          <div className="flex items-center justify-between mb-3">
            <Clock className="w-5 h-5 text-purple-400" />
            <span className="text-2xl font-bold text-white">{systemHealth.avgLatency}ms</span>
          </div>
          <p className="text-purple-300 font-medium mb-1">Avg Latency (P95)</p>
          <p className="text-purple-300/50 text-xs">API response time</p>
        </Card>

        <Card className="p-6 bg-black/40 border-amber-500/20">
          <div className="flex items-center justify-between mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span className="text-2xl font-bold text-white">{systemHealth.errorRate}%</span>
          </div>
          <p className="text-amber-300 font-medium mb-1">Error Rate</p>
          <p className="text-amber-300/50 text-xs">Target: &lt;0.5%</p>
        </Card>
      </div>

      {/* Resource Usage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-black/40 border-emerald-500/20">
          <div className="flex items-center justify-between mb-3">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-300">{systemHealth.cpuUsage}%</span>
          </div>
          <p className="text-emerald-300 font-medium mb-2">CPU Usage</p>
          <Progress value={systemHealth.cpuUsage} className="h-2" />
        </Card>

        <Card className="p-6 bg-black/40 border-blue-500/20">
          <div className="flex items-center justify-between mb-3">
            <HardDrive className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300">{systemHealth.memoryUsage}%</span>
          </div>
          <p className="text-blue-300 font-medium mb-2">Memory Usage</p>
          <Progress value={systemHealth.memoryUsage} className="h-2" />
        </Card>

        <Card className="p-6 bg-black/40 border-purple-500/20">
          <div className="flex items-center justify-between mb-3">
            <Database className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300">{systemHealth.diskUsage}%</span>
          </div>
          <p className="text-purple-300 font-medium mb-2">Disk Usage</p>
          <Progress value={systemHealth.diskUsage} className="h-2" />
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Performance Metrics (24 hours)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#10b981" opacity={0.1} />
            <XAxis dataKey="time" stroke="#6ee7b7" />
            <YAxis yAxisId="left" stroke="#6ee7b7" />
            <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="latency" stroke="#10b981" strokeWidth={2} name="Latency (ms)" />
            <Line yAxisId="right" type="monotone" dataKey="throughput" stroke="#3b82f6" strokeWidth={2} name="Throughput (req/s)" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Tabs defaultValue="services" className="space-y-6">
        <TabsList className="bg-black/40 border border-emerald-500/20">
          <TabsTrigger value="services">
            <Server className="w-4 h-4 mr-2" />
            Services
          </TabsTrigger>
          <TabsTrigger value="deployments">
            <Zap className="w-4 h-4 mr-2" />
            Deployments
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="disaster-recovery">
            <Database className="w-4 h-4 mr-2" />
            Disaster Recovery
          </TabsTrigger>
        </TabsList>

        {/* Services Tab */}
        <TabsContent value="services">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Infrastructure Services</h3>
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-500/20">
                  <TableHead className="text-emerald-300">Service</TableHead>
                  <TableHead className="text-emerald-300">Status</TableHead>
                  <TableHead className="text-emerald-300">Uptime (30d)</TableHead>
                  <TableHead className="text-emerald-300">Instances</TableHead>
                  <TableHead className="text-emerald-300">Avg Latency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service, idx) => (
                  <TableRow key={idx} className="border-emerald-500/10">
                    <TableCell className="text-white font-medium">{service.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        service.status === 'healthy'
                          ? 'bg-green-500/10 border-green-500/30 text-green-300'
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      }>
                        {service.status === 'healthy' ? (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 mr-1" />
                        )}
                        {service.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-emerald-300">{service.uptime}%</TableCell>
                    <TableCell className="text-emerald-300">{service.instances}</TableCell>
                    <TableCell className="text-emerald-300">{service.latency}ms</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Deployments Tab */}
        <TabsContent value="deployments">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Deployments</h3>
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-500/20">
                  <TableHead className="text-emerald-300">ID</TableHead>
                  <TableHead className="text-emerald-300">Service</TableHead>
                  <TableHead className="text-emerald-300">Version</TableHead>
                  <TableHead className="text-emerald-300">Status</TableHead>
                  <TableHead className="text-emerald-300">Duration</TableHead>
                  <TableHead className="text-emerald-300">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentDeployments.map((deploy) => (
                  <TableRow key={deploy.id} className="border-emerald-500/10">
                    <TableCell className="text-white font-mono text-sm">{deploy.id}</TableCell>
                    <TableCell className="text-emerald-300">{deploy.service}</TableCell>
                    <TableCell className="text-emerald-300 font-mono text-sm">{deploy.version}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        deploy.status === 'success'
                          ? 'bg-green-500/10 border-green-500/30 text-green-300'
                          : 'bg-red-500/10 border-red-500/30 text-red-300'
                      }>
                        {deploy.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-emerald-300">{deploy.duration}</TableCell>
                    <TableCell className="text-emerald-300/70">{deploy.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
              <h4 className="text-white font-medium mb-2">Zero-Downtime Deployment Strategy</h4>
              <p className="text-emerald-300/70 text-sm leading-relaxed">
                • <strong className="text-emerald-300">Blue-Green Deployments:</strong> New version deployed to staging environment, then traffic switched over<br />
                • <strong className="text-emerald-300">Canary Releases:</strong> Gradual rollout to 1% → 10% → 50% → 100% of traffic<br />
                • <strong className="text-emerald-300">Automated Rollback:</strong> If error rate &gt;0.5%, automatic rollback to previous version<br />
                • <strong className="text-emerald-300">Health Checks:</strong> New instances must pass health checks before receiving traffic
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Security Monitoring</h3>
            <div className="space-y-3">
              {securityAlerts.map((alert, idx) => (
                <div key={idx} className={`p-4 rounded-lg ${
                  alert.severity === 'high' ? 'bg-red-500/10 border border-red-500/30' :
                  alert.severity === 'medium' ? 'bg-amber-500/10 border border-amber-500/30' :
                  'bg-blue-500/10 border border-blue-500/30'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-5 h-5 ${
                        alert.severity === 'high' ? 'text-red-400' :
                        alert.severity === 'medium' ? 'text-amber-400' :
                        'text-blue-400'
                      }`} />
                      <h4 className="text-white font-medium">{alert.type}</h4>
                    </div>
                    <Badge variant="outline" className={
                      alert.severity === 'high' ? 'bg-red-500/20 border-red-500/50 text-red-300' :
                      alert.severity === 'medium' ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' :
                      'bg-blue-500/20 border-blue-500/50 text-blue-300'
                    }>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-emerald-300/70 text-sm">Source: {alert.source}</p>
                  <p className="text-emerald-300/70 text-sm">Time: {alert.time}</p>
                  <p className="text-emerald-300/70 text-sm">Status: {alert.status}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">Security Layers</h4>
                <ul className="text-emerald-300/70 text-sm space-y-1">
                  <li>✓ WAF (Web Application Firewall)</li>
                  <li>✓ DDoS Protection (CloudFlare)</li>
                  <li>✓ Rate Limiting (1000 req/min per IP)</li>
                  <li>✓ SSL/TLS Encryption (TLS 1.3)</li>
                  <li>✓ API Key Rotation (90 days)</li>
                  <li>✓ Intrusion Detection (IDS)</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">Compliance</h4>
                <ul className="text-emerald-300/70 text-sm space-y-1">
                  <li>✓ SOC 2 Type II Certified</li>
                  <li>✓ ISO 27001 Certified</li>
                  <li>✓ GDPR Compliant</li>
                  <li>✓ PCI DSS Level 1</li>
                  <li>✓ Penetration Testing (Quarterly)</li>
                  <li>✓ Vulnerability Scanning (Daily)</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Disaster Recovery Tab */}
        <TabsContent value="disaster-recovery">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Disaster Recovery Status</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-white font-medium">Backup Status</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-emerald-300/70">Last Backup:</span>
                    <span className="text-emerald-300">{drStatus.lastBackup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/70">Backup Size:</span>
                    <span className="text-emerald-300">{drStatus.backupSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/70">Retention:</span>
                    <span className="text-emerald-300">30 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/70">Frequency:</span>
                    <span className="text-emerald-300">Every 15 minutes</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <h4 className="text-white font-medium">Recovery Objectives</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-emerald-300/70">RTO (Recovery Time):</span>
                    <span className="text-blue-300">{drStatus.rto}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/70">RPO (Recovery Point):</span>
                    <span className="text-blue-300">{drStatus.rpo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/70">Last DR Drill:</span>
                    <span className="text-blue-300">{drStatus.lastDrillDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/70">Next DR Drill:</span>
                    <span className="text-blue-300">{drStatus.nextDrillDate}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg">
              <h4 className="text-white font-medium mb-3">Multi-Region Redundancy</h4>
              <p className="text-emerald-300/70 text-sm mb-3">
                Data replicated across 3 geographic regions for resilience:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded">
                  <p className="text-green-300 font-medium">us-east-1 (Primary)</p>
                  <p className="text-green-300/70 text-xs">AWS Virginia</p>
                </div>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded">
                  <p className="text-emerald-300 font-medium">eu-west-1 (Secondary)</p>
                  <p className="text-emerald-300/70 text-xs">AWS Ireland</p>
                </div>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded">
                  <p className="text-emerald-300 font-medium">ap-southeast-1 (Tertiary)</p>
                  <p className="text-emerald-300/70 text-xs">AWS Singapore</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
