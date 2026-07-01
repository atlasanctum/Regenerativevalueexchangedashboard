import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { AlertTriangle, Shield, Lock, Eye, EyeOff, DollarSign, CheckCircle, FileText, Send, Key } from 'lucide-react';

const activeCases = [
  { id: 'WB-0142', category: 'Carbon Fraud', status: 'Under Investigation', bounty: '$15,000', filed: '2026-06-01', outcome: null, encrypted: true },
  { id: 'WB-0139', category: 'Greenwashing', status: 'Evidence Verified', bounty: '$8,500', filed: '2026-05-15', outcome: null, encrypted: true },
  { id: 'WB-0134', category: 'Methodology Fraud', status: 'Resolved — Bounty Paid', bounty: '$22,000', filed: '2026-04-10', outcome: 'Project suspended, 2.4M credits invalidated', encrypted: false },
  { id: 'WB-0128', category: 'Data Manipulation', status: 'Resolved — No Action', bounty: '$0', filed: '2026-03-20', outcome: 'Investigation found no wrongdoing', encrypted: false },
];

const bountyTiers = [
  { category: 'Minor Violation', description: 'Small reporting errors, procedural lapses', range: '$500 – $2,500', examples: 'Calculation rounding, late reporting' },
  { category: 'Material Fraud', description: 'Significant misrepresentation affecting credit validity', range: '$2,500 – $25,000', examples: 'Inflated carbon counts, false additionality claims' },
  { category: 'Systemic Fraud', description: 'Large-scale fraud affecting multiple projects or the protocol', range: '$25,000 – $100,000', examples: 'Coordinated greenwashing scheme, oracle manipulation' },
  { category: 'Critical Threat', description: 'Existential threat to the RVE ecosystem or major project clusters', range: '$100,000+', examples: 'Protocol exploit, massive coordinated fraud' },
];

export function WhistleblowerPortal() {
  const [step, setStep] = useState(1);
  const [anonymous, setAnonymous] = useState(true);
  const [showBounty, setShowBounty] = useState(false);
  const [category, setCategory] = useState('Carbon Fraud');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Whistleblower Portal</h2>
          <p className="text-emerald-300/70">Anonymous, encrypted reporting with bounty rewards and full legal protection</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-emerald-400/10 border border-emerald-500/30 rounded-lg px-3 py-1.5">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span className="text-emerald-300 text-xs">End-to-End Encrypted</span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-400/10 border border-emerald-500/30 rounded-lg px-3 py-1.5">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span className="text-emerald-300 text-xs">No IP Logged</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Reports Filed', value: '134', sub: 'Since platform launch', icon: FileText },
          { label: 'Validated Reports', value: '47', sub: '35% validation rate', icon: CheckCircle },
          { label: 'Total Bounties Paid', value: '$847K', sub: 'To anonymous reporters', icon: DollarSign },
          { label: 'Projects Suspended', value: '12', sub: 'Following investigations', icon: AlertTriangle },
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

      <Tabs defaultValue="report">
        <TabsList className="bg-slate-800/60 border border-emerald-500/20">
          <TabsTrigger value="report" className="data-[state=active]:bg-emerald-600">File Report</TabsTrigger>
          <TabsTrigger value="track" className="data-[state=active]:bg-emerald-600">Track Report</TabsTrigger>
          <TabsTrigger value="bounties" className="data-[state=active]:bg-emerald-600">Bounty Program</TabsTrigger>
          <TabsTrigger value="cases" className="data-[state=active]:bg-emerald-600">Public Cases</TabsTrigger>
        </TabsList>

        <TabsContent value="report" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold">Submit Anonymous Report</h3>
              <div className="flex gap-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s ? 'bg-emerald-600 text-white' : 'bg-slate-700/50 text-slate-400'}`}>{s}</div>
                ))}
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-400 font-medium text-sm">Your Identity is Protected</span>
                  </div>
                  <p className="text-amber-300/70 text-xs">This portal uses Tor-grade encryption. No IP addresses, device fingerprints, or identity data are logged. Your report cannot be traced back to you.</p>
                </div>

                <div>
                  <label className="text-emerald-300/60 text-xs mb-1.5 block">Anonymity Level</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setAnonymous(true)}
                      className={`p-3 rounded-lg border transition-all text-left ${anonymous ? 'bg-emerald-400/15 border-emerald-500/40' : 'border-slate-700/30'}`}
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        <EyeOff className="w-4 h-4 text-emerald-400" />
                        <span className="text-white text-sm font-medium">Fully Anonymous</span>
                      </div>
                      <span className="text-emerald-300/50 text-xs">No contact info — cannot claim bounty</span>
                    </button>
                    <button
                      onClick={() => setAnonymous(false)}
                      className={`p-3 rounded-lg border transition-all text-left ${!anonymous ? 'bg-emerald-400/15 border-emerald-500/40' : 'border-slate-700/30'}`}
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        <Key className="w-4 h-4 text-emerald-400" />
                        <span className="text-white text-sm font-medium">Encrypted Identity</span>
                      </div>
                      <span className="text-emerald-300/50 text-xs">Encrypted for bounty claims only</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-emerald-300/60 text-xs mb-1.5 block">Violation Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50">
                    {['Carbon Fraud', 'Greenwashing', 'Methodology Fraud', 'Data Manipulation', 'Oracle Manipulation', 'Conflict of Interest', 'Other'].map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <Button onClick={() => setStep(2)} className="bg-emerald-600 hover:bg-emerald-700">
                  Continue to Evidence <AlertTriangle className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-emerald-300/60 text-xs mb-1.5 block">Entity / Project Under Investigation</label>
                  <input className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50" placeholder="Project name, company, or ID..." />
                </div>
                <div>
                  <label className="text-emerald-300/60 text-xs mb-1.5 block">Detailed Description</label>
                  <textarea rows={5} className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50" placeholder="Describe the violation in detail. Include dates, amounts, persons involved..." />
                </div>
                <div>
                  <label className="text-emerald-300/60 text-xs mb-1.5 block">Supporting Evidence</label>
                  <div className="border-2 border-dashed border-emerald-500/30 rounded-lg p-6 text-center cursor-pointer hover:border-emerald-500/50 transition-all">
                    <FileText className="w-8 h-8 text-emerald-400/40 mx-auto mb-2" />
                    <div className="text-emerald-300/60 text-sm">Upload documents, screenshots, data files</div>
                    <div className="text-emerald-300/40 text-xs mt-1">Files are encrypted before transmission · Max 200MB</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(1)} className="border-emerald-500/30 text-emerald-300">Back</Button>
                  <Button onClick={() => setStep(3)} className="flex-1 bg-emerald-600 hover:bg-emerald-700">Review & Submit</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-emerald-400/10 border border-emerald-500/30 rounded-lg p-4 text-center">
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-white font-semibold mb-1">Ready to Submit</h4>
                  <p className="text-emerald-300/60 text-sm">Your report will be encrypted with AES-256 and submitted anonymously.</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-slate-700/30 py-2">
                    <span className="text-emerald-300/60">Category</span>
                    <span className="text-white">{category}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700/30 py-2">
                    <span className="text-emerald-300/60">Anonymity</span>
                    <span className="text-white">{anonymous ? 'Fully Anonymous' : 'Encrypted Identity'}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-emerald-300/60">Encryption</span>
                    <span className="text-emerald-400">AES-256 · No IP logged</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(2)} className="border-emerald-500/30 text-emerald-300">Back</Button>
                  <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Encrypted Report
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="track" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
            <h3 className="text-white font-semibold mb-4">Track Your Report</h3>
            <div className="space-y-3">
              <div>
                <label className="text-emerald-300/60 text-xs mb-1.5 block">Your Anonymous Report Key</label>
                <div className="flex gap-2">
                  <input className="flex-1 bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-emerald-500/50" placeholder="xxxx-xxxx-xxxx-xxxx" />
                  <Button className="bg-emerald-600 hover:bg-emerald-700 px-4">Track</Button>
                </div>
                <p className="text-emerald-300/40 text-xs mt-1">You received this key when you filed your report</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="bounties" className="mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            {bountyTiers.map((tier) => (
              <Card key={tier.category} className="bg-slate-900/50 border-emerald-500/20 p-5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold text-sm">{tier.category}</h4>
                  <Badge className="bg-emerald-400/20 text-emerald-300 border-0">{tier.range}</Badge>
                </div>
                <p className="text-emerald-300/60 text-xs mb-2">{tier.description}</p>
                <div className="text-emerald-300/40 text-xs"><span className="text-emerald-300/60">Examples:</span> {tier.examples}</div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cases" className="mt-4">
          <div className="space-y-3">
            {activeCases.map((c) => (
              <Card key={c.id} className="bg-slate-900/50 border-emerald-500/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-emerald-300/60 text-xs font-mono">{c.id}</span>
                    <Badge className="bg-amber-400/20 text-amber-300 border-0 text-xs">{c.category}</Badge>
                    <Badge className={`border-0 text-xs ${c.status.includes('Resolved') ? 'bg-emerald-400/20 text-emerald-300' : 'bg-purple-400/20 text-purple-300'}`}>{c.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-emerald-400 font-medium">{c.bounty}</span>
                    <span className="text-emerald-300/40 text-xs">{c.filed}</span>
                    {c.encrypted && <Lock className="w-3 h-3 text-emerald-400/40" />}
                  </div>
                </div>
                {c.outcome && (
                  <div className="mt-2 text-emerald-300/60 text-xs border-t border-slate-700/30 pt-2">
                    Outcome: {c.outcome}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
