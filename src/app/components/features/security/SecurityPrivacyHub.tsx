import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, Lock, Eye, EyeOff, Key, AlertTriangle, CheckCircle, FileText, Activity, Fingerprint } from 'lucide-react';

const securityMetrics = [
  { time: 'Week 1', threats: 1247, blocked: 1244, incidents: 3 },
  { time: 'Week 2', threats: 1589, blocked: 1587, incidents: 2 },
  { time: 'Week 3', threats: 1342, blocked: 1341, incidents: 1 },
  { time: 'Week 4', threats: 2108, blocked: 2107, incidents: 1 },
];

const securityControls = [
  { control: 'Zero-Knowledge Proofs', description: 'zk-SNARKs for privacy-preserving trade execution', status: 'Active', coverage: 'All trades' },
  { control: 'Multi-Signature Wallets', description: 'M-of-N multisig for treasury and smart contracts', status: 'Active', coverage: 'All wallets >$10K' },
  { control: 'Encrypted Data Vaults', description: 'AES-256-GCM encryption for all personal data at rest', status: 'Active', coverage: '100% user data' },
  { control: 'Hardware Security Modules', description: 'FIPS 140-2 Level 3 HSMs for key management', status: 'Active', coverage: 'All signing keys' },
  { control: 'Penetration Testing', description: 'Quarterly external pentest by certified security firms', status: 'Active', coverage: 'All attack surfaces' },
  { control: 'Bug Bounty Program', description: 'Public program with $500K max payout', status: 'Active', coverage: 'All protocol code' },
];

const certifications = [
  { cert: 'SOC 2 Type II', issuer: 'AICPA', expires: 'Mar 2027', scope: 'Security, Availability, Confidentiality', status: 'Valid' },
  { cert: 'ISO 27001', issuer: 'BSI Group', expires: 'Aug 2026', scope: 'Information Security Management', status: 'Valid' },
  { cert: 'ISO 27701', issuer: 'BSI Group', expires: 'Aug 2026', scope: 'Privacy Information Management', status: 'Valid' },
  { cert: 'PCI DSS Level 1', issuer: 'Visa / Mastercard', expires: 'Jan 2027', scope: 'Payment card data security', status: 'Valid' },
  { cert: 'GDPR Compliance', issuer: 'EU DPA', expires: 'Ongoing', scope: 'EU personal data processing', status: 'Valid' },
];

const recentAlerts = [
  { type: 'Blocked Attack', severity: 'High', detail: 'SQL injection attempt on /api/v1/assets', time: '4 hrs ago', status: 'Blocked' },
  { type: 'Unusual Access', severity: 'Medium', detail: '47 login attempts from IP block 185.176.xx.xx', time: '8 hrs ago', status: 'Blocked' },
  { type: 'Rate Limit Exceeded', severity: 'Low', detail: 'User API key exceeding 10K req/min limit', time: '12 hrs ago', status: 'Auto-throttled' },
  { type: 'Vulnerability Fixed', severity: 'Medium', detail: 'XSS vulnerability in portfolio widget — patched v2.4.1', time: '2 days ago', status: 'Resolved' },
];

export function SecurityPrivacyHub() {
  const [zkMode, setZkMode] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Security & Privacy Hub</h2>
          <p className="text-emerald-300/70">Zero-knowledge proofs, multi-signature wallets, encrypted vaults, SOC 2 Type II, and ISO 27001</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
            <FileText className="w-4 h-4 mr-2" />
            Security Report
          </Button>
          <div className="flex items-center gap-2 bg-emerald-400/10 border border-emerald-500/30 rounded-lg px-3 py-2">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span className="text-emerald-300 text-xs font-medium">All Systems Secure</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Threats Blocked (30d)', value: '6,286', sub: '99.97% block rate', icon: Shield },
          { label: 'Security Incidents', value: '7', sub: 'All resolved', icon: AlertTriangle },
          { label: 'Vulnerability Score', value: 'A+', sub: 'SSL Labs rating', icon: Lock },
          { label: 'Uptime (Security SLA)', value: '99.99%', sub: 'Zero data breaches', icon: CheckCircle },
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

      <Tabs defaultValue="controls">
        <TabsList className="bg-slate-800/60 border border-emerald-500/20">
          <TabsTrigger value="controls" className="data-[state=active]:bg-emerald-600">Security Controls</TabsTrigger>
          <TabsTrigger value="threats" className="data-[state=active]:bg-emerald-600">Threat Monitoring</TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-emerald-600">Privacy Settings</TabsTrigger>
          <TabsTrigger value="certs" className="data-[state=active]:bg-emerald-600">Certifications</TabsTrigger>
        </TabsList>

        <TabsContent value="controls" className="mt-4 space-y-3">
          {securityControls.map((c) => (
            <Card key={c.control} className="bg-slate-900/50 border-emerald-500/20 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium text-sm">{c.control}</div>
                    <div className="text-emerald-300/60 text-xs mt-0.5">{c.description}</div>
                    <div className="text-emerald-300/40 text-xs mt-1">Coverage: {c.coverage}</div>
                  </div>
                </div>
                <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">{c.status}</Badge>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="threats" className="mt-4 space-y-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <h3 className="text-white text-sm font-semibold mb-4">Threat Activity (Monthly)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={securityMetrics}>
                <defs>
                  <linearGradient id="threatGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                <XAxis dataKey="time" stroke="#6ee7b7" fontSize={11} />
                <YAxis stroke="#6ee7b7" fontSize={11} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} />
                <Area type="monotone" dataKey="threats" stroke="#ef4444" fill="url(#threatGrad)" name="Total Threats" />
                <Area type="monotone" dataKey="blocked" stroke="#10b981" fill="transparent" name="Blocked" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <div className="space-y-3">
            <h3 className="text-white text-sm font-semibold">Recent Security Alerts</h3>
            {recentAlerts.map((alert, i) => (
              <Card key={i} className={`border p-4 ${alert.severity === 'High' ? 'bg-rose-900/10 border-rose-500/30' : alert.severity === 'Medium' ? 'bg-amber-900/10 border-amber-500/30' : 'bg-slate-900/50 border-emerald-500/20'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-4 h-4 ${alert.severity === 'High' ? 'text-rose-400' : alert.severity === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium text-sm">{alert.type}</span>
                        <Badge className={`border-0 text-xs ${alert.severity === 'High' ? 'bg-rose-400/20 text-rose-300' : alert.severity === 'Medium' ? 'bg-amber-400/20 text-amber-300' : 'bg-emerald-400/20 text-emerald-300'}`}>{alert.severity}</Badge>
                      </div>
                      <div className="text-emerald-300/60 text-xs mt-0.5">{alert.detail}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-300/40 text-xs">{alert.time}</span>
                    <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">{alert.status}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="mt-4 space-y-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <h3 className="text-white font-semibold text-sm mb-4">Your Privacy Controls</h3>
            <div className="space-y-4">
              {[
                { label: 'Zero-Knowledge Trading', desc: 'Execute trades without revealing portfolio composition to third parties', value: zkMode, setter: setZkMode },
                { label: 'Anonymous Impact Reporting', desc: 'Generate impact reports without linking to your identity', value: true, setter: () => {} },
                { label: 'Data Minimization Mode', desc: 'Only collect data strictly necessary for platform operation', value: true, setter: () => {} },
                { label: 'Third-Party Data Sharing', desc: 'Allow anonymized analytics sharing with research partners', value: false, setter: () => {} },
              ].map((setting) => (
                <div key={setting.label} className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
                  <div className="flex items-center gap-3">
                    <EyeOff className="w-4 h-4 text-emerald-400/60" />
                    <div>
                      <div className="text-white text-sm">{setting.label}</div>
                      <div className="text-emerald-300/50 text-xs">{setting.desc}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setting.setter(!setting.value)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${setting.value ? 'bg-emerald-600' : 'bg-slate-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${setting.value ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="certs" className="mt-4 space-y-3">
          {certifications.map((cert) => (
            <Card key={cert.cert} className="bg-slate-900/50 border-emerald-500/20 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-400/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{cert.cert}</div>
                    <div className="text-emerald-300/60 text-xs">Issued by {cert.issuer}</div>
                    <div className="text-emerald-300/40 text-xs mt-0.5">Scope: {cert.scope}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-emerald-300/50 text-xs">Expires</div>
                    <div className="text-white text-sm">{cert.expires}</div>
                  </div>
                  <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">{cert.status}</Badge>
                  <Button variant="outline" className="border-emerald-500/30 text-emerald-300 text-xs h-7 px-3">
                    <FileText className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
