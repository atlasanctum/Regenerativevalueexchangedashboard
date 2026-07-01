import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { AlertTriangle, TrendingUp, TrendingDown, Bell, Plus, X, CheckCircle, Activity, Globe, DollarSign, Shield } from 'lucide-react';

const activeAlerts = [
  { id: 1, type: 'price', severity: 'high', title: 'Mangrove Carbon hits target', message: 'MCR price reached $31.20 — your buy target of $30.00 has been exceeded', time: '2 min ago', asset: 'Mangrove Carbon', read: false },
  { id: 2, type: 'ecosystem', severity: 'critical', title: 'Deforestation alert: Eastern Amazon', message: 'Satellite data shows 847 hectares of deforestation in project zone BRZ-004. Immediate review required.', time: '18 min ago', asset: 'Amazon Credits', read: false },
  { id: 3, type: 'governance', severity: 'medium', title: 'Governance vote ending', message: 'RVP-047: Carbon Methodology Update expires in 6 hours. You have not voted. Quorum at 78%.', time: '1 hr ago', asset: 'Governance', read: false },
  { id: 4, type: 'market', severity: 'low', title: 'High volume detected', message: 'Biodiversity Credits trading volume 340% above 30-day average. Market may be moving.', time: '2 hrs ago', asset: 'Biodiversity Credits', read: true },
  { id: 5, type: 'price', severity: 'low', title: 'Portfolio up 4.2%', message: 'Your regenerative portfolio gained 4.2% today, outperforming S&P 500 by 3.8%.', time: '3 hrs ago', asset: 'Portfolio', read: true },
  { id: 6, type: 'verification', severity: 'medium', title: 'Verification complete', message: 'Project COL-012 (Andean Cloud Forest) has completed Q2 2026 verification with 94.8% score.', time: '5 hrs ago', asset: 'COL-012', read: true },
];

const alertRules = [
  { id: 1, name: 'Carbon Price Alert', condition: 'Mangrove Carbon > $35.00', channels: ['App', 'Email'], active: true },
  { id: 2, name: 'Portfolio Drawdown', condition: 'Portfolio drops > 5% in 24h', channels: ['App', 'SMS', 'Email'], active: true },
  { id: 3, name: 'Deforestation Warning', condition: 'Any project — satellite anomaly detected', channels: ['App', 'Email'], active: true },
  { id: 4, name: 'Governance Vote', condition: 'Any vote ending < 24 hours — not voted', channels: ['App'], active: false },
];

const severityColors: Record<string, string> = {
  critical: 'text-rose-400 bg-rose-400/20',
  high: 'text-orange-400 bg-orange-400/20',
  medium: 'text-amber-400 bg-amber-400/20',
  low: 'text-emerald-400 bg-emerald-400/20',
};

const typeIcons: Record<string, typeof AlertTriangle> = {
  price: TrendingUp,
  ecosystem: Globe,
  governance: Shield,
  market: Activity,
  verification: CheckCircle,
};

export function IntelligentAlerts() {
  const [filter, setFilter] = useState<string>('all');
  const [alerts, setAlerts] = useState(activeAlerts);

  const markRead = (id: number) => setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, read: true } : a));
  const dismiss = (id: number) => setAlerts((prev) => prev.filter((a) => a.id !== id));

  const filtered = filter === 'all' ? alerts : filter === 'unread' ? alerts.filter((a) => !a.read) : alerts.filter((a) => a.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Intelligent Alert System</h2>
          <p className="text-emerald-300/70">Real-time notifications for anomalies, risks, and market opportunities</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
            <Bell className="w-4 h-4 mr-2" />
            Notification Settings
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            New Alert Rule
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Active Alerts', value: alerts.filter((a) => !a.read).length, sub: 'Unread', icon: Bell, color: 'text-orange-400' },
          { label: 'Critical', value: alerts.filter((a) => a.severity === 'critical').length, sub: 'Needs attention', icon: AlertTriangle, color: 'text-rose-400' },
          { label: 'Alert Rules', value: alertRules.length, sub: `${alertRules.filter((r) => r.active).length} active`, icon: Activity, color: 'text-emerald-400' },
          { label: 'Alerts Today', value: 12, sub: '3 acted upon', icon: CheckCircle, color: 'text-cyan-400' },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-400 text-xs">{s.label}</span>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div className="text-white text-2xl font-bold">{s.value}</div>
              <div className="text-emerald-300/50 text-xs mt-1">{s.sub}</div>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="alerts">
        <TabsList className="bg-slate-800/60 border border-emerald-500/20">
          <TabsTrigger value="alerts" className="data-[state=active]:bg-emerald-600">Alert Feed</TabsTrigger>
          <TabsTrigger value="rules" className="data-[state=active]:bg-emerald-600">Alert Rules</TabsTrigger>
          <TabsTrigger value="anomaly" className="data-[state=active]:bg-emerald-600">Anomaly Detection</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="mt-4 space-y-3">
          {/* Filter Bar */}
          <div className="flex gap-2">
            {['all', 'unread', 'price', 'ecosystem', 'governance', 'market'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-all ${filter === f ? 'bg-emerald-600 text-white' : 'text-emerald-300/60 hover:text-emerald-300 border border-emerald-500/20'}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {filtered.map((alert) => {
              const Icon = typeIcons[alert.type] || AlertTriangle;
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border transition-all ${!alert.read ? 'bg-slate-800/60 border-emerald-500/30' : 'bg-slate-900/30 border-slate-700/30'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${severityColors[alert.severity]}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-sm font-medium ${alert.read ? 'text-slate-300' : 'text-white'}`}>{alert.title}</span>
                          {!alert.read && <div className="w-2 h-2 bg-emerald-400 rounded-full" />}
                          <Badge className={`border-0 text-xs ${severityColors[alert.severity]}`}>{alert.severity}</Badge>
                        </div>
                        <p className="text-emerald-300/60 text-xs mb-1">{alert.message}</p>
                        <div className="flex items-center gap-3 text-xs text-emerald-300/40">
                          <span>{alert.time}</span>
                          <span>· {alert.asset}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {!alert.read && (
                        <button onClick={() => markRead(alert.id)} className="text-emerald-400/60 hover:text-emerald-400 text-xs">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => dismiss(alert.id)} className="text-slate-500 hover:text-slate-300">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="rules" className="mt-4 space-y-3">
          {alertRules.map((rule) => (
            <Card key={rule.id} className="bg-slate-900/50 border-emerald-500/20 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium text-sm mb-0.5">{rule.name}</div>
                  <div className="text-emerald-300/60 text-xs">{rule.condition}</div>
                  <div className="flex gap-1.5 mt-2">
                    {rule.channels.map((c) => <Badge key={c} className="bg-slate-700/50 text-slate-300 border-0 text-xs">{c}</Badge>)}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className={`relative w-11 h-6 rounded-full transition-colors ${rule.active ? 'bg-emerald-600' : 'bg-slate-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${rule.active ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
          <Button variant="outline" className="w-full border-emerald-500/30 border-dashed text-emerald-300/60 hover:text-emerald-300 hover:border-emerald-500/50">
            <Plus className="w-4 h-4 mr-2" />
            Add Custom Alert Rule
          </Button>
        </TabsContent>

        <TabsContent value="anomaly" className="mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { metric: 'Price Anomaly Detection', description: 'Statistical deviation from 30-day rolling average', threshold: '2.5 σ', triggers: 3, lastFired: '2 hrs ago', status: 'Active' },
              { metric: 'Volume Spike Detection', description: 'Trading volume exceeds 200% of historical average', threshold: '200%', triggers: 1, lastFired: '2 hrs ago', status: 'Active' },
              { metric: 'Ecosystem Health', description: 'Satellite-derived NDVI drops below project baseline', threshold: '-15%', triggers: 0, lastFired: 'Never', status: 'Monitoring' },
              { metric: 'Oracle Divergence', description: 'Multi-oracle consensus deviation exceeds threshold', threshold: '5%', triggers: 0, lastFired: '3 days ago', status: 'Active' },
            ].map((d) => (
              <Card key={d.metric} className="bg-slate-900/50 border-emerald-500/20 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-white font-medium text-sm">{d.metric}</div>
                    <div className="text-emerald-300/60 text-xs mt-0.5">{d.description}</div>
                  </div>
                  <Badge className={`border-0 text-xs ${d.status === 'Active' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-amber-400/20 text-amber-300'}`}>{d.status}</Badge>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="bg-slate-800/40 rounded p-2">
                    <div className="text-emerald-300/50">Threshold</div>
                    <div className="text-white font-medium">{d.threshold}</div>
                  </div>
                  <div className="bg-slate-800/40 rounded p-2">
                    <div className="text-emerald-300/50">Triggers (7d)</div>
                    <div className="text-white font-medium">{d.triggers}</div>
                  </div>
                  <div className="bg-slate-800/40 rounded p-2">
                    <div className="text-emerald-300/50">Last Fired</div>
                    <div className="text-white font-medium">{d.lastFired}</div>
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
