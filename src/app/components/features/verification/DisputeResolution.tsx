import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { AlertTriangle, CheckCircle, Clock, FileText, Users, Upload, MessageSquare, Scale, TrendingUp } from 'lucide-react';

const disputes = [
  { id: 'DR-0047', project: 'Borneo Peatland IDN-003', challenger: 'GreenWatch Org', claim: 'Methodology Inaccuracy', status: 'Expert Panel Review', filed: '2026-06-15', deadline: '2026-07-15', evidenceCount: 12, panel: ['Dr. Sarah Chen', 'Prof. James Okoye', 'Dr. Maria Santos'], votes: { in_favor: 2, against: 1, pending: 0 }, severity: 'High' },
  { id: 'DR-0046', project: 'Kenyan Savanna KEN-012', challenger: 'ClimateVerify', claim: 'Additionality Dispute', status: 'Evidence Collection', filed: '2026-06-22', deadline: '2026-07-22', evidenceCount: 6, panel: [], votes: { in_favor: 0, against: 0, pending: 3 }, severity: 'Medium' },
  { id: 'DR-0044', project: 'Pacific Kelp AUS-009', challenger: 'OceanWatch', claim: 'Carbon Calculation Error', status: 'Resolved — Upheld', filed: '2026-05-10', deadline: '2026-06-10', evidenceCount: 24, panel: ['Dr. Liu Wei', 'Prof. Ana Morales'], votes: { in_favor: 2, against: 0, pending: 0 }, severity: 'Medium' },
  { id: 'DR-0041', project: 'Amazon Forest BRZ-008', challenger: 'Anonymous', claim: 'Fraudulent Reporting', status: 'Resolved — Dismissed', filed: '2026-04-20', deadline: '2026-05-20', evidenceCount: 9, panel: ['Dr. Tom Baker', 'Prof. Lisa Park', 'Dr. Ahmed Hassan'], votes: { in_favor: 0, against: 3, pending: 0 }, severity: 'Low' },
];

const timeline = [
  { stage: 'Challenge Filed', days: 0, description: 'Challenger submits formal dispute with initial evidence' },
  { stage: 'Evidence Collection', days: 7, description: '7-day window for both parties to submit evidence' },
  { stage: 'Expert Panel Review', days: 14, description: 'Panel of 3 independent experts reviews all evidence' },
  { stage: 'Stakeholder Vote', days: 21, description: 'Token-weighted community vote on resolution' },
  { stage: 'Appeal Window', days: 28, description: '7-day appeal window before finalization' },
  { stage: 'Resolution', days: 35, description: 'Final decision recorded on blockchain' },
];

export function DisputeResolution() {
  const [selected, setSelected] = useState(disputes[0]);
  const [newClaimType, setNewClaimType] = useState('Methodology Inaccuracy');

  const statusColor = (status: string) => {
    if (status.includes('Resolved — Upheld')) return 'bg-rose-400/20 text-rose-300';
    if (status.includes('Resolved — Dismissed')) return 'bg-emerald-400/20 text-emerald-300';
    if (status.includes('Expert Panel')) return 'bg-purple-400/20 text-purple-300';
    return 'bg-amber-400/20 text-amber-300';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Dispute Resolution</h2>
          <p className="text-emerald-300/70">Challenge verification claims through structured expert panels and community voting</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <AlertTriangle className="w-4 h-4 mr-2" />
          File Dispute
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Open Disputes', value: '8', sub: '2 high severity', icon: AlertTriangle },
          { label: 'Resolved (30d)', value: '24', sub: '71% dismissed', icon: CheckCircle },
          { label: 'Avg Resolution', value: '28 days', sub: 'End-to-end', icon: Clock },
          { label: 'Expert Panels', value: '12', sub: 'Active members', icon: Users },
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

      <Tabs defaultValue="active">
        <TabsList className="bg-slate-800/60 border border-emerald-500/20">
          <TabsTrigger value="active" className="data-[state=active]:bg-emerald-600">Active Disputes</TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-emerald-600">Process Timeline</TabsTrigger>
          <TabsTrigger value="file" className="data-[state=active]:bg-emerald-600">File a Challenge</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              {disputes.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelected(d)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${selected.id === d.id ? 'bg-emerald-400/15 border-emerald-500/40' : 'bg-slate-900/50 border-emerald-500/20 hover:border-emerald-500/30'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-emerald-300/60 text-xs">{d.id}</span>
                    <Badge className={`border-0 text-xs ${d.severity === 'High' ? 'bg-rose-400/20 text-rose-300' : d.severity === 'Medium' ? 'bg-amber-400/20 text-amber-300' : 'bg-emerald-400/20 text-emerald-300'}`}>
                      {d.severity}
                    </Badge>
                  </div>
                  <div className="text-white text-xs font-medium">{d.project}</div>
                  <div className="text-emerald-300/50 text-xs mt-0.5">{d.claim}</div>
                  <Badge className={`border-0 text-xs mt-2 ${statusColor(d.status)}`}>{d.status}</Badge>
                </button>
              ))}
            </div>

            <div className="md:col-span-2 space-y-4">
              <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-300/60 text-xs">{selected.id}</span>
                      <Badge className={`border-0 text-xs ${statusColor(selected.status)}`}>{selected.status}</Badge>
                    </div>
                    <h3 className="text-white font-semibold mt-1">{selected.project}</h3>
                    <p className="text-emerald-300/60 text-sm">Claim: {selected.claim}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-emerald-300/50 text-xs mb-2">Challenger</div>
                    <div className="text-white text-sm">{selected.challenger}</div>
                  </div>
                  <div>
                    <div className="text-emerald-300/50 text-xs mb-2">Deadline</div>
                    <div className="text-white text-sm">{selected.deadline}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-emerald-300/50 text-xs mb-2">Expert Panel ({selected.panel.length} members)</div>
                  {selected.panel.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selected.panel.map((p) => (
                        <Badge key={p} className="bg-purple-400/20 text-purple-300 border-0 text-xs">{p}</Badge>
                      ))}
                    </div>
                  ) : (
                    <div className="text-emerald-300/40 text-xs">Panel not yet assigned</div>
                  )}
                </div>

                <div className="mb-4">
                  <div className="text-emerald-300/50 text-xs mb-2">Panel Votes</div>
                  <div className="flex gap-4">
                    <div className="bg-emerald-400/10 rounded-lg px-3 py-2">
                      <div className="text-emerald-300/50 text-xs">In Favor of Challenge</div>
                      <div className="text-emerald-400 font-bold">{selected.votes.in_favor}</div>
                    </div>
                    <div className="bg-rose-400/10 rounded-lg px-3 py-2">
                      <div className="text-rose-300/50 text-xs">Against Challenge</div>
                      <div className="text-rose-400 font-bold">{selected.votes.against}</div>
                    </div>
                    <div className="bg-amber-400/10 rounded-lg px-3 py-2">
                      <div className="text-amber-300/50 text-xs">Pending</div>
                      <div className="text-amber-400 font-bold">{selected.votes.pending}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="border-emerald-500/30 text-emerald-300 text-sm">
                    <FileText className="w-4 h-4 mr-2" />
                    View Evidence ({selected.evidenceCount})
                  </Button>
                  <Button variant="outline" className="border-emerald-500/30 text-emerald-300 text-sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Submit Comment
                  </Button>
                  {!selected.status.includes('Resolved') && (
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Evidence
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
            <h3 className="text-white font-semibold text-sm mb-6">Standard Dispute Resolution Process (35 days)</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-500/20" />
              <div className="space-y-6">
                {timeline.map((stage, i) => (
                  <div key={i} className="relative flex gap-4 pl-10">
                    <div className="absolute left-0 w-8 h-8 bg-emerald-400/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                      <span className="text-emerald-400 text-xs font-bold">{i + 1}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-white font-medium text-sm">{stage.stage}</span>
                        <Badge className="bg-slate-700/50 text-slate-300 border-0 text-xs">Day {stage.days}</Badge>
                      </div>
                      <p className="text-emerald-300/60 text-xs">{stage.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="file" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-5 h-5 text-emerald-400" />
              <h3 className="text-white font-semibold">File a New Challenge</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-emerald-300/60 text-xs mb-1 block">Project ID or Name</label>
                  <input className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50" placeholder="e.g. BRZ-001 or Amazon Mangrove" />
                </div>
                <div>
                  <label className="text-emerald-300/60 text-xs mb-1 block">Claim Type</label>
                  <select value={newClaimType} onChange={(e) => setNewClaimType(e.target.value)} className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50">
                    {['Methodology Inaccuracy', 'Additionality Dispute', 'Carbon Calculation Error', 'Permanence Concern', 'Fraudulent Reporting', 'Data Manipulation', 'Other'].map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-emerald-300/60 text-xs mb-1 block">Description</label>
                  <textarea rows={4} className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50" placeholder="Describe the issue in detail with specific references..." />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-emerald-300/60 text-xs mb-1 block">Upload Evidence</label>
                  <div className="border-2 border-dashed border-emerald-500/30 rounded-lg p-6 text-center hover:border-emerald-500/50 transition-all cursor-pointer">
                    <Upload className="w-8 h-8 text-emerald-400/40 mx-auto mb-2" />
                    <div className="text-emerald-300/60 text-sm">Drop files or click to upload</div>
                    <div className="text-emerald-300/40 text-xs mt-1">PDF, images, satellite data — max 50MB</div>
                  </div>
                </div>
                <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-400 text-sm font-medium">Challenge Bond Required</span>
                  </div>
                  <p className="text-amber-300/60 text-xs">A bond of $500 is required to file a challenge. Refunded if upheld, forfeited if dismissed without merit.</p>
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Scale className="w-4 h-4 mr-2" />
                  Submit Challenge
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
