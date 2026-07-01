import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Gauge, Activity, Zap, Server, Globe, AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';

const responseTimeData = [
  { time: '00:00', p50: 42, p95: 134, p99: 189 },
  { time: '04:00', p50: 38, p95: 121, p99: 172 },
  { time: '08:00', p50: 67, p95: 198, p99: 287 },
  { time: '12:00', p50: 89, p95: 234, p99: 342 },
  { time: '16:00', p50: 71, p95: 212, p99: 298 },
  { time: '20:00', p50: 48, p95: 142, p99: 198 },
  { time: '24:00', p50: 41, p95: 128, p99: 176 },
];

const throughputData = [
  { time: '00:00', rps: 1240, users: 4200 },
  { time: '04:00', rps: 840, users: 2800 },
  { time: '08:00', rps: 8420, users: 28400 },
  { time: '12:00', rps: 12840, users: 43200 },
  { time: '16:00', rps: 10200, users: 34600 },
  { time: '20:00', rps: 7840, users: 26400 },
  { time: '24:00', rps: 2100, users: 7200 },
];

const serviceHealth = [
  { service: 'API Gateway', latency: '12ms', uptime: '99.99%', errors: '0.01%', status: 'Healthy', load: 42 },
  { service: 'Oracle Network', latency: '84ms', uptime: '99.97%', errors: '0.04%', status: 'Healthy', load: 67 },
  { service: 'Trading Engine', latency: '8ms', uptime: '99.98%', errors: '0.02%', status: 'Healthy', load: 78 },
  { service: 'Verification Layer', latency: '234ms', uptime: '99.94%', errors: '0.08%', status: 'Degraded', load: 89 },
  { service: 'Blockchain Bridge', latency: '1.2s', uptime: '99.91%', errors: '0.12%', status: 'Healthy', load: 54 },
  { service: 'AI Model Inference', latency: '420ms', uptime: '99.89%', errors: '0.14%', status: 'Healthy', load: 91 },
];

const regions = [
  { name: 'US East', latency: '8ms', users: '34%', status: 'Healthy' },
  { name: 'EU West', latency: '12ms', users: '28%', status: 'Healthy' },
  { name: 'Asia Pacific', latency: '24ms', users: '24%', status: 'Healthy' },
  { name: 'South America', latency: '31ms', users: '8%', status: 'Healthy' },
  { name: 'Africa', latency: '48ms', users: '6%', status: 'Degraded' },
];

export function PerformanceMonitoring() {
  const [timeRange, setTimeRange] = useState('24h');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Performance & Scalability Monitoring</h2>
          <p className="text-emerald-300/70">Real-time system performance metrics across all platform services</p>
        </div>
        <div className="flex gap-2">
          {['1h', '6h', '24h', '7d'].map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all ${timeRange === r ? 'bg-emerald-600 text-white' : 'text-emerald-300/60 hover:text-emerald-300 border border-emerald-500/20'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {[
          { label: 'P50 Response', value: '58ms', target: '<200ms', ok: true, icon: Zap },
          { label: 'P99 Response', value: '245ms', target: '<500ms', ok: true, icon: Gauge },
          { label: 'Throughput', value: '8,420 rps', target: '100k+ cap', ok: true, icon: Activity },
          { label: 'Error Rate', value: '0.04%', target: '<0.1%', ok: true, icon: AlertTriangle },
          { label: 'Uptime (30d)', value: '99.97%', target: '99.9% SLA', ok: true, icon: CheckCircle },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-400 text-xs">{m.label}</span>
                <Icon className={`w-4 h-4 ${m.ok ? 'text-emerald-400' : 'text-rose-400'}`} />
              </div>
              <div className="text-white text-lg font-bold">{m.value}</div>
              <div className={`text-xs mt-1 ${m.ok ? 'text-emerald-400' : 'text-rose-400'}`}>Target: {m.target}</div>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="response">
        <TabsList className="bg-slate-800/60 border border-emerald-500/20">
          <TabsTrigger value="response" className="data-[state=active]:bg-emerald-600">Response Times</TabsTrigger>
          <TabsTrigger value="throughput" className="data-[state=active]:bg-emerald-600">Throughput</TabsTrigger>
          <TabsTrigger value="services" className="data-[state=active]:bg-emerald-600">Service Health</TabsTrigger>
          <TabsTrigger value="regions" className="data-[state=active]:bg-emerald-600">Edge Regions</TabsTrigger>
        </TabsList>

        <TabsContent value="response" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <h3 className="text-white text-sm font-semibold mb-4">Response Time Percentiles (ms)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                <XAxis dataKey="time" stroke="#6ee7b7" fontSize={11} />
                <YAxis stroke="#6ee7b7" fontSize={11} tickFormatter={(v) => `${v}ms`} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} formatter={(v: number) => [`${v}ms`, '']} />
                <Line type="monotone" dataKey="p50" stroke="#10b981" dot={false} name="P50" strokeWidth={2} />
                <Line type="monotone" dataKey="p95" stroke="#f59e0b" dot={false} name="P95" strokeWidth={2} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="p99" stroke="#ef4444" dot={false} name="P99" strokeWidth={2} strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-3">
              {[{ color: '#10b981', label: 'P50 (Median)' }, { color: '#f59e0b', label: 'P95' }, { color: '#ef4444', label: 'P99' }].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5 text-xs text-emerald-300/70">
                  <div className="w-4 h-0.5" style={{ backgroundColor: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="throughput" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <h3 className="text-white text-sm font-semibold mb-4">Requests per Second & Active Users</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={throughputData}>
                <defs>
                  <linearGradient id="rpsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                <XAxis dataKey="time" stroke="#6ee7b7" fontSize={11} />
                <YAxis yAxisId="left" stroke="#6ee7b7" fontSize={11} />
                <YAxis yAxisId="right" orientation="right" stroke="#6ee7b7" fontSize={11} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} />
                <Area yAxisId="left" type="monotone" dataKey="rps" stroke="#10b981" fill="url(#rpsGrad)" name="Requests/sec" />
                <Line yAxisId="right" type="monotone" dataKey="users" stroke="#06b6d4" dot={false} name="Active Users" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="mt-4">
          <div className="space-y-3">
            {serviceHealth.map((s) => (
              <Card key={s.service} className={`border p-4 ${s.status === 'Degraded' ? 'bg-amber-900/10 border-amber-500/30' : 'bg-slate-900/50 border-emerald-500/20'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${s.status === 'Healthy' ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
                    <div>
                      <div className="text-white font-medium text-sm">{s.service}</div>
                      <div className="text-emerald-300/50 text-xs">{s.status}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 text-sm">
                    {[
                      { label: 'Latency', value: s.latency },
                      { label: 'Uptime', value: s.uptime },
                      { label: 'Errors', value: s.errors },
                    ].map((m) => (
                      <div key={m.label} className="text-right">
                        <div className="text-emerald-300/50 text-xs">{m.label}</div>
                        <div className="text-white">{m.value}</div>
                      </div>
                    ))}
                    <div className="w-24">
                      <div className="text-emerald-300/50 text-xs mb-1">Load</div>
                      <div className="w-full bg-slate-700/40 rounded-full h-1.5">
                        <div className={`rounded-full h-1.5 ${s.load > 85 ? 'bg-rose-500' : s.load > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${s.load}%` }} />
                      </div>
                      <div className="text-xs text-right mt-0.5 text-emerald-300/50">{s.load}%</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="regions" className="mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            {regions.map((r) => (
              <Card key={r.name} className={`border p-4 ${r.status === 'Degraded' ? 'bg-amber-900/10 border-amber-500/30' : 'bg-slate-900/50 border-emerald-500/20'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span className="text-white font-medium text-sm">{r.name}</span>
                  </div>
                  <Badge className={`border-0 text-xs ${r.status === 'Healthy' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-amber-400/20 text-amber-300'}`}>{r.status}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-slate-800/40 rounded-lg p-2">
                    <div className="text-emerald-300/50 text-xs">Avg Latency</div>
                    <div className="text-white font-bold">{r.latency}</div>
                  </div>
                  <div className="bg-slate-800/40 rounded-lg p-2">
                    <div className="text-emerald-300/50 text-xs">User Share</div>
                    <div className="text-white font-bold">{r.users}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
