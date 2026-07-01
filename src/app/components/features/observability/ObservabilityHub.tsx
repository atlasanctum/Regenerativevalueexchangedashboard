import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Search, AlertTriangle, Eye, TrendingUp, Brain, DollarSign, Code, RefreshCw } from 'lucide-react';

const traceData = [
  { time: '14:00', traces: 12400, errors: 48, latency: 84 },
  { time: '14:05', traces: 13800, errors: 52, latency: 91 },
  { time: '14:10', traces: 15200, errors: 61, latency: 98 },
  { time: '14:15', traces: 14100, errors: 55, latency: 87 },
  { time: '14:20', traces: 16800, errors: 72, latency: 112 },
  { time: '14:25', traces: 14900, errors: 59, latency: 94 },
  { time: '14:30', traces: 13200, errors: 47, latency: 82 },
];

const anomalies = [
  { id: 'AN-0847', service: 'Trading Engine', type: 'Latency Spike', severity: 'High', detected: '2 min ago', value: '340ms (3.2σ)', status: 'Active' },
  { id: 'AN-0846', service: 'Oracle Network', type: 'Error Rate Increase', severity: 'Medium', detected: '18 min ago', value: '0.18% (2.1σ)', status: 'Investigating' },
  { id: 'AN-0845', service: 'Verification Layer', type: 'Memory Pressure', severity: 'Low', detected: '45 min ago', value: '87% heap (1.8σ)', status: 'Resolved' },
];

const costBreakdown = [
  { service: 'AI Model Inference', cost: '$12,847', trend: '+8.4%', percentage: 34 },
  { service: 'Blockchain RPC', cost: '$8,234', trend: '+2.1%', percentage: 22 },
  { service: 'Data Storage', cost: '$6,412', trend: '-3.2%', percentage: 17 },
  { service: 'CDN & Bandwidth', cost: '$4,891', trend: '+1.4%', percentage: 13 },
  { service: 'Compute (K8s)', cost: '$3,847', trend: '-1.8%', percentage: 10 },
  { service: 'Other', cost: '$1,542', trend: '+0.2%', percentage: 4 },
];

const recentLogs = [
  { time: '14:32:01', service: 'API Gateway', level: 'INFO', message: 'Request processed: POST /v1/trades/submit — 200 OK — 42ms', traceId: 'tr-a8f2' },
  { time: '14:31:58', service: 'Oracle Network', level: 'WARN', message: 'Oracle consensus timeout for asset BIO-CR-001 — retrying (attempt 2/3)', traceId: 'tr-b4e9' },
  { time: '14:31:55', service: 'Trading Engine', level: 'ERROR', message: 'Order execution failed: insufficient liquidity — order rolled back', traceId: 'tr-c7d1' },
  { time: '14:31:52', service: 'Verification Layer', level: 'INFO', message: 'Site verification complete: BRZ-001 score 94.8 — all oracles consensus', traceId: 'tr-d3a5' },
  { time: '14:31:49', service: 'AI Inference', level: 'INFO', message: 'Impact prediction model v2.4 served — latency 387ms — confidence 94.1%', traceId: 'tr-e9f2' },
];

const logColors: Record<string, string> = { INFO: 'text-emerald-400', WARN: 'text-amber-400', ERROR: 'text-rose-400' };

export function ObservabilityHub() {
  const [logFilter, setLogFilter] = useState('ALL');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Observability Hub</h2>
          <p className="text-emerald-300/70">Full-stack distributed tracing, AI anomaly detection, and cost optimization</p>
        </div>
        <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
          <RefreshCw className="w-4 h-4 mr-2" />
          Live Feed
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Traces / min', value: '14,200', sub: '0.04% error rate', icon: Activity },
          { label: 'Active Alerts', value: '3', sub: '1 high severity', icon: AlertTriangle },
          { label: 'Monthly Infra Cost', value: '$37,773', sub: '+2.4% vs last month', icon: DollarSign },
          { label: 'Anomalies (24h)', value: '12', sub: '10 auto-resolved', icon: Brain },
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

      <Tabs defaultValue="traces">
        <TabsList className="bg-slate-800/60 border border-emerald-500/20">
          <TabsTrigger value="traces" className="data-[state=active]:bg-emerald-600">Distributed Traces</TabsTrigger>
          <TabsTrigger value="anomalies" className="data-[state=active]:bg-emerald-600">Anomaly Detection</TabsTrigger>
          <TabsTrigger value="logs" className="data-[state=active]:bg-emerald-600">Log Aggregation</TabsTrigger>
          <TabsTrigger value="costs" className="data-[state=active]:bg-emerald-600">Cost Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="traces" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <h3 className="text-white text-sm font-semibold mb-4">Trace Volume & Latency (last 30 min)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={traceData}>
                <defs>
                  <linearGradient id="tracGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                <XAxis dataKey="time" stroke="#6ee7b7" fontSize={11} />
                <YAxis yAxisId="left" stroke="#6ee7b7" fontSize={11} />
                <YAxis yAxisId="right" orientation="right" stroke="#6ee7b7" fontSize={11} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} />
                <Area yAxisId="left" type="monotone" dataKey="traces" stroke="#10b981" fill="url(#tracGrad)" name="Traces/min" />
                <Line yAxisId="right" type="monotone" dataKey="latency" stroke="#f59e0b" dot={false} name="Avg Latency (ms)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="anomalies" className="mt-4 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-4 h-4 text-emerald-400" />
            <span className="text-white text-sm font-semibold">AI-Detected Anomalies</span>
            <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">ML-powered · Real-time</Badge>
          </div>
          {anomalies.map((a) => (
            <Card key={a.id} className={`border p-4 ${a.severity === 'High' ? 'bg-rose-900/10 border-rose-500/30' : a.severity === 'Medium' ? 'bg-amber-900/10 border-amber-500/30' : 'bg-slate-900/50 border-emerald-500/20'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <AlertTriangle className={`w-5 h-5 ${a.severity === 'High' ? 'text-rose-400' : a.severity === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}`} />
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-white font-medium text-sm">{a.type}</span>
                      <Badge className={`border-0 text-xs ${a.severity === 'High' ? 'bg-rose-400/20 text-rose-300' : a.severity === 'Medium' ? 'bg-amber-400/20 text-amber-300' : 'bg-emerald-400/20 text-emerald-300'}`}>
                        {a.severity}
                      </Badge>
                    </div>
                    <div className="text-emerald-300/60 text-xs">{a.service} · {a.detected}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-right">
                  <div>
                    <div className="text-emerald-300/50 text-xs">Deviation</div>
                    <div className="text-white">{a.value}</div>
                  </div>
                  <Badge className={`border-0 text-xs ${a.status === 'Resolved' ? 'bg-emerald-400/20 text-emerald-300' : a.status === 'Active' ? 'bg-rose-400/20 text-rose-300' : 'bg-amber-400/20 text-amber-300'}`}>
                    {a.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="logs" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/60" />
                <input className="w-full pl-10 pr-4 py-2 bg-slate-800/60 border border-emerald-500/20 rounded-lg text-white text-sm placeholder-emerald-300/30 focus:outline-none focus:border-emerald-500/50" placeholder="Search logs..." />
              </div>
              <div className="flex gap-1">
                {['ALL', 'INFO', 'WARN', 'ERROR'].map((l) => (
                  <button key={l} onClick={() => setLogFilter(l)} className={`px-2.5 py-1.5 rounded text-xs transition-all ${logFilter === l ? 'bg-emerald-600 text-white' : 'text-emerald-300/60 border border-emerald-500/20'}`}>{l}</button>
                ))}
              </div>
            </div>
            <div className="space-y-1 font-mono text-xs">
              {recentLogs.filter((l) => logFilter === 'ALL' || l.level === logFilter).map((log, i) => (
                <div key={i} className="flex gap-3 py-1.5 border-b border-slate-700/20 last:border-0 hover:bg-slate-800/20 rounded px-1">
                  <span className="text-emerald-300/40 flex-shrink-0">{log.time}</span>
                  <span className="text-purple-300/70 flex-shrink-0 w-24">{log.service}</span>
                  <span className={`flex-shrink-0 w-10 font-bold ${logColors[log.level]}`}>{log.level}</span>
                  <span className="text-slate-300 truncate">{log.message}</span>
                  <span className="text-emerald-300/30 flex-shrink-0">{log.traceId}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-sm">Monthly Infrastructure Costs — July 2026</h3>
              <div className="text-white font-bold">$37,773 total</div>
            </div>
            <div className="space-y-3">
              {costBreakdown.map((c) => (
                <div key={c.service} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white">{c.service}</span>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs ${c.trend.startsWith('+') ? 'text-amber-400' : 'text-emerald-400'}`}>{c.trend}</span>
                      <span className="text-white font-medium w-16 text-right">{c.cost}</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700/40 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full h-2" style={{ width: `${c.percentage}%` }} />
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
