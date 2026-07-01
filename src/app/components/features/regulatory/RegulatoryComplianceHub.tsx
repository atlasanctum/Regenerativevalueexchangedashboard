import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Scale, CheckCircle, AlertTriangle, Globe, Shield, FileText, Download, RefreshCw, Clock } from 'lucide-react';

const jurisdictions = [
  { region: 'European Union', status: 'Compliant', framework: 'EU Taxonomy + MiCA', lastAudit: 'Jun 2026', nextAudit: 'Dec 2026', score: 97 },
  { region: 'United States', status: 'Compliant', framework: 'CFTC + SEC Guidance', lastAudit: 'May 2026', nextAudit: 'Nov 2026', score: 94 },
  { region: 'United Kingdom', status: 'Compliant', framework: 'FCA + TCFD', lastAudit: 'Apr 2026', nextAudit: 'Oct 2026', score: 96 },
  { region: 'Singapore', status: 'Compliant', framework: 'MAS + Carbon Tax Act', lastAudit: 'Jun 2026', nextAudit: 'Dec 2026', score: 98 },
  { region: 'Australia', status: 'Compliant', framework: 'ASIC + ACCU', lastAudit: 'Mar 2026', nextAudit: 'Sep 2026', score: 92 },
  { region: 'Brazil', status: 'In Progress', framework: 'SBFIC + SEEG', lastAudit: 'Jan 2026', nextAudit: 'Jul 2026', score: 84 },
  { region: 'Kenya', status: 'In Progress', framework: 'KRA + NEMA', lastAudit: 'Feb 2026', nextAudit: 'Aug 2026', score: 78 },
];

const kycSteps = [
  { step: 'Identity Verification', provider: 'Jumio', status: 'Live', coverage: '195 countries' },
  { step: 'Address Verification', provider: 'Persona', status: 'Live', coverage: '180 countries' },
  { step: 'Sanctions Screening', provider: 'Chainalysis', status: 'Live', coverage: 'OFAC + UN + EU' },
  { step: 'PEP Screening', provider: 'Dow Jones', status: 'Live', coverage: 'Global database' },
  { step: 'Source of Funds', provider: 'Internal AI', status: 'Live', coverage: 'Risk-based' },
  { step: 'Enhanced Due Diligence', provider: 'Manual Review', status: 'Live', coverage: 'High-risk entities' },
];

const taxReports = [
  { type: 'Transaction History', format: 'CSV / PDF', period: 'Any date range', status: 'Available' },
  { type: 'Capital Gains Report', format: 'TurboTax / H&R Block compatible', period: 'Annual', status: 'Available' },
  { type: 'IRS Form 1099-DA', format: 'PDF + XML', period: 'Annual', status: 'Available' },
  { type: 'EU DAC8 Report', format: 'XML (OECD schema)', period: 'Annual', status: 'Available' },
  { type: 'CARF Reporting', format: 'XML', period: 'Annual', status: 'In Progress' },
  { type: 'VAT Breakdown', format: 'CSV', period: 'Monthly / Quarterly', status: 'Available' },
];

const legalContracts = [
  { type: 'Carbon Credit Purchase Agreement', version: 'v3.2', jurisdiction: 'Global', lastUpdated: 'Jun 2026' },
  { type: 'Revenue Sharing Smart Contract', version: 'v2.1', jurisdiction: 'Cayman Islands', lastUpdated: 'May 2026' },
  { type: 'Custodian Agreement', version: 'v1.8', jurisdiction: 'Multi-jurisdiction', lastUpdated: 'Apr 2026' },
  { type: 'Oracle Service Level Agreement', version: 'v2.4', jurisdiction: 'Singapore', lastUpdated: 'Jun 2026' },
];

export function RegulatoryComplianceHub() {
  const [taxYear, setTaxYear] = useState('2025');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Regulatory Compliance Hub</h2>
          <p className="text-emerald-300/70">Jurisdictional compliance, KYC/AML automation, tax reporting, and smart legal contracts</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
            <RefreshCw className="w-4 h-4 mr-2" />
            Audit Log
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Download className="w-4 h-4 mr-2" />
            Compliance Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Jurisdictions Covered', value: '47', sub: '7 more pending', icon: Globe },
          { label: 'KYC Completion Rate', value: '98.7%', sub: 'Active users', icon: CheckCircle },
          { label: 'AML Alerts (30d)', value: '12', sub: '11 cleared, 1 escalated', icon: AlertTriangle },
          { label: 'Tax Reports Generated', value: '8,247', sub: 'This year', icon: FileText },
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

      <Tabs defaultValue="jurisdictions">
        <TabsList className="bg-slate-800/60 border border-emerald-500/20">
          <TabsTrigger value="jurisdictions" className="data-[state=active]:bg-emerald-600">Jurisdictions</TabsTrigger>
          <TabsTrigger value="kyc" className="data-[state=active]:bg-emerald-600">KYC / AML</TabsTrigger>
          <TabsTrigger value="tax" className="data-[state=active]:bg-emerald-600">Tax Reporting</TabsTrigger>
          <TabsTrigger value="legal" className="data-[state=active]:bg-emerald-600">Legal Contracts</TabsTrigger>
        </TabsList>

        <TabsContent value="jurisdictions" className="mt-4 space-y-3">
          {jurisdictions.map((j) => (
            <Card key={j.region} className={`border p-4 ${j.status === 'In Progress' ? 'bg-amber-900/10 border-amber-500/30' : 'bg-slate-900/50 border-emerald-500/20'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Globe className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-white font-medium text-sm">{j.region}</div>
                    <div className="text-emerald-300/60 text-xs">{j.framework}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-emerald-300/50 text-xs">Last Audit</div>
                    <div className="text-white text-sm">{j.lastAudit}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-300/50 text-xs">Next Audit</div>
                    <div className="text-white text-sm">{j.nextAudit}</div>
                  </div>
                  <div className="text-right w-20">
                    <div className="text-emerald-300/50 text-xs">Score</div>
                    <div className="text-emerald-400 font-bold">{j.score}%</div>
                    <div className="w-full bg-slate-700/40 rounded-full h-1 mt-1">
                      <div className={`rounded-full h-1 ${j.score >= 90 ? 'bg-emerald-500' : j.score >= 80 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${j.score}%` }} />
                    </div>
                  </div>
                  <Badge className={`border-0 text-xs ${j.status === 'Compliant' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-amber-400/20 text-amber-300'}`}>{j.status}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="kyc" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-emerald-400" />
              <h3 className="text-white font-semibold text-sm">KYC / AML Pipeline</h3>
              <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">ISO 37001 Compliant</Badge>
            </div>
            <div className="space-y-3">
              {kycSteps.map((step, i) => (
                <div key={step.step} className="flex items-center gap-4 p-3 bg-slate-800/40 rounded-lg">
                  <div className="w-6 h-6 bg-emerald-400/20 rounded-full flex items-center justify-center text-emerald-400 text-xs font-bold">{i + 1}</div>
                  <div className="flex-1">
                    <div className="text-white text-sm font-medium">{step.step}</div>
                    <div className="text-emerald-300/50 text-xs">Provider: {step.provider} · {step.coverage}</div>
                  </div>
                  <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">{step.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tax" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-sm">Tax Report Generation</h3>
              <div className="flex gap-2">
                {['2023', '2024', '2025'].map((y) => (
                  <button key={y} onClick={() => setTaxYear(y)} className={`px-3 py-1 rounded text-xs transition-all ${taxYear === y ? 'bg-emerald-600 text-white' : 'text-emerald-300/60 border border-emerald-500/20'}`}>{y}</button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {taxReports.map((r) => (
                <div key={r.type} className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
                  <div>
                    <div className="text-white text-sm font-medium">{r.type}</div>
                    <div className="text-emerald-300/50 text-xs">{r.format} · {r.period}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`border-0 text-xs ${r.status === 'Available' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-amber-400/20 text-amber-300'}`}>{r.status}</Badge>
                    {r.status === 'Available' && (
                      <Button variant="outline" className="border-emerald-500/30 text-emerald-300 text-xs h-7 px-3">
                        <Download className="w-3 h-3 mr-1" />
                        {taxYear}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="legal" className="mt-4">
          <div className="space-y-3">
            {legalContracts.map((c) => (
              <Card key={c.type} className="bg-slate-900/50 border-emerald-500/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-white font-medium text-sm">{c.type}</div>
                      <div className="text-emerald-300/60 text-xs">{c.version} · {c.jurisdiction}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-emerald-300/50 text-xs">
                      <Clock className="w-3 h-3" />
                      Updated {c.lastUpdated}
                    </div>
                    <Button variant="outline" className="border-emerald-500/30 text-emerald-300 text-xs h-7 px-3">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
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
