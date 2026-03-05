import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  Shield, Scale, Users, AlertTriangle, CheckCircle2, TrendingUp, 
  Eye, Lock, Heart, Globe, Award, XCircle
} from 'lucide-react';
import { BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Ethical principles scorecard
const ethicsScorecard = [
  { principle: 'Transparency', score: 92, target: 90, status: 'excellent' },
  { principle: 'Fairness', score: 87, target: 85, status: 'good' },
  { principle: 'Accountability', score: 94, target: 90, status: 'excellent' },
  { principle: 'Inclusivity', score: 83, target: 85, status: 'needs_improvement' },
  { principle: 'Sustainability', score: 96, target: 90, status: 'excellent' },
];

// Radar chart data
const ethicsRadarData = ethicsScorecard.map(item => ({
  principle: item.principle,
  score: item.score,
  target: item.target
}));

// Incentive structure analysis
const incentiveReviews = [
  {
    system: 'Node Operator Rewards',
    alignment: 'strong',
    issues: [],
    lastReview: '2026-02-15',
    status: 'approved'
  },
  {
    system: 'Oracle Verification Fees',
    alignment: 'moderate',
    issues: ['Possible quality-speed tradeoff'],
    lastReview: '2026-02-20',
    status: 'monitoring'
  },
  {
    system: 'Buyer Discount Tiers',
    alignment: 'weak',
    issues: ['Disadvantages small buyers', 'Creates market concentration'],
    lastReview: '2026-03-01',
    status: 'redesign_required'
  },
];

// Governance fairness audit
const governanceMetrics = [
  { metric: 'Voter Turnout', value: 47, target: 50, unit: '%' },
  { metric: 'Proposal Success Rate', value: 68, target: 60, unit: '%' },
  { metric: 'Small Holder Participation', value: 23, target: 30, unit: '%' },
  { metric: 'Geographic Diversity', value: 34, target: 40, unit: 'countries' },
];

// Bias detection in algorithms
const biasAudits = [
  { 
    algorithm: 'Carbon Sequestration Predictor',
    biasType: 'Geographic',
    detected: false,
    confidence: 94,
    lastAudit: '2026-02-28'
  },
  { 
    algorithm: 'Project Risk Scoring',
    biasType: 'Project Size',
    detected: true,
    confidence: 87,
    lastAudit: '2026-03-02',
    mitigation: 'Rebalanced training data with more small projects'
  },
  { 
    algorithm: 'Oracle Selection',
    biasType: 'Experience Level',
    detected: false,
    confidence: 91,
    lastAudit: '2026-03-01'
  },
];

// Ethical incidents log
const ethicalIncidents = [
  {
    id: 'ETH-047',
    date: '2026-03-01',
    severity: 'medium',
    category: 'Fairness',
    description: 'Buyer discount tier disadvantages small purchasers',
    status: 'in_review',
    actionTaken: 'Incentive redesign committee convened'
  },
  {
    id: 'ETH-046',
    date: '2026-02-25',
    severity: 'low',
    category: 'Transparency',
    description: 'Model explanation too technical for farmer users',
    status: 'resolved',
    actionTaken: 'Added plain-language explanations to all AI predictions'
  },
];

export function EthicalSystemsDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Ethical Systems Engineering</h2>
          <p className="text-emerald-300/70 mt-1">Embedding ethics into system design, not just philosophy</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-300">
            <Shield className="w-3 h-3 mr-1" />
            Ethics Score: 90.4/100
          </Badge>
          <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-300">
            <Award className="w-3 h-3 mr-1" />
            B Corp Certified
          </Badge>
        </div>
      </div>

      {/* Active Ethical Review */}
      {incentiveReviews.some(r => r.status === 'redesign_required') && (
        <Alert className="bg-amber-500/10 border-amber-500/30">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <AlertTitle className="text-amber-300">Incentive Structure Redesign Required</AlertTitle>
          <AlertDescription className="text-amber-300/70">
            Buyer discount tiers create unfair advantages for large purchasers. Ethics committee reviewing alternative structures.
          </AlertDescription>
          <Button size="sm" className="mt-3 bg-amber-600 hover:bg-amber-700">
            View Proposal
          </Button>
        </Alert>
      )}

      {/* Ethics Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {ethicsScorecard.map((item, idx) => (
          <Card key={idx} className={`p-6 ${
            item.status === 'excellent' ? 'bg-emerald-500/10 border-emerald-500/30' :
            item.status === 'good' ? 'bg-blue-500/10 border-blue-500/30' :
            'bg-amber-500/10 border-amber-500/30'
          }`}>
            <div className="flex items-center justify-between mb-3">
              {item.status === 'excellent' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> :
               item.status === 'good' ? <CheckCircle2 className="w-5 h-5 text-blue-400" /> :
               <AlertTriangle className="w-5 h-5 text-amber-400" />}
              <span className="text-2xl font-bold text-white">{item.score}</span>
            </div>
            <p className="text-white font-medium mb-1">{item.principle}</p>
            <p className="text-white/50 text-xs">Target: {item.target}</p>
          </Card>
        ))}
      </div>

      {/* Ethics Radar */}
      <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Ethical Principles Performance</h3>
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={ethicsRadarData}>
            <PolarGrid stroke="#10b981" opacity={0.2} />
            <PolarAngleAxis dataKey="principle" stroke="#6ee7b7" />
            <PolarRadiusAxis domain={[0, 100]} stroke="#6ee7b7" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
              }}
            />
            <Radar name="Current Score" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
            <Radar name="Target" dataKey="target" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </Card>

      <Tabs defaultValue="incentives" className="space-y-6">
        <TabsList className="bg-black/40 border border-emerald-500/20">
          <TabsTrigger value="incentives">
            <TrendingUp className="w-4 h-4 mr-2" />
            Incentive Structures
          </TabsTrigger>
          <TabsTrigger value="governance">
            <Users className="w-4 h-4 mr-2" />
            Governance Fairness
          </TabsTrigger>
          <TabsTrigger value="bias">
            <Scale className="w-4 h-4 mr-2" />
            Bias Detection
          </TabsTrigger>
          <TabsTrigger value="incidents">
            <Eye className="w-4 h-4 mr-2" />
            Ethical Incidents
          </TabsTrigger>
        </TabsList>

        {/* Incentive Structures Tab */}
        <TabsContent value="incentives">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Incentive Structure Alignment Review</h3>
            <p className="text-emerald-300/70 text-sm mb-6">
              Ensuring economic incentives align with regenerative principles, not extraction.
            </p>

            <div className="space-y-4">
              {incentiveReviews.map((review, idx) => (
                <div key={idx} className={`p-4 rounded-lg border ${
                  review.status === 'approved' ? 'bg-green-500/10 border-green-500/30' :
                  review.status === 'monitoring' ? 'bg-blue-500/10 border-blue-500/30' :
                  'bg-red-500/10 border-red-500/30'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white font-medium">{review.system}</h4>
                      <p className="text-white/70 text-sm">Last reviewed: {review.lastReview}</p>
                    </div>
                    <Badge variant="outline" className={
                      review.status === 'approved' ? 'bg-green-500/20 border-green-500/50 text-green-300' :
                      review.status === 'monitoring' ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' :
                      'bg-red-500/20 border-red-500/50 text-red-300'
                    }>
                      {review.status === 'approved' ? <CheckCircle2 className="w-3 h-3 mr-1" /> :
                       review.status === 'monitoring' ? <Eye className="w-3 h-3 mr-1" /> :
                       <XCircle className="w-3 h-3 mr-1" />}
                      {review.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="mb-2">
                    <span className="text-white/70 text-sm">Alignment: </span>
                    <span className={
                      review.alignment === 'strong' ? 'text-green-300' :
                      review.alignment === 'moderate' ? 'text-blue-300' :
                      'text-red-300'
                    }>
                      {review.alignment}
                    </span>
                  </div>

                  {review.issues.length > 0 && (
                    <div>
                      <p className="text-white/70 text-sm mb-1">Issues detected:</p>
                      <ul className="text-red-300 text-sm space-y-1">
                        {review.issues.map((issue, i) => (
                          <li key={i}>• {issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
              <h4 className="text-white font-medium mb-3">Ethical Incentive Design Principles</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-emerald-300 font-medium mb-1">✓ Align with regenerative outcomes</p>
                  <p className="text-emerald-300/70">
                    Rewards should increase as ecosystem health improves, not as extraction increases.
                  </p>
                </div>
                <div>
                  <p className="text-emerald-300 font-medium mb-1">✓ Avoid perverse incentives</p>
                  <p className="text-emerald-300/70">
                    No incentive to game metrics (e.g., planting then cutting trees to "restore" again).
                  </p>
                </div>
                <div>
                  <p className="text-emerald-300 font-medium mb-1">✓ Inclusive participation</p>
                  <p className="text-emerald-300/70">
                    Small-scale actors can meaningfully participate, not just large corporations.
                  </p>
                </div>
                <div>
                  <p className="text-emerald-300 font-medium mb-1">✓ Long-term thinking</p>
                  <p className="text-emerald-300/70">
                    Incentivize 10-year commitments, not quick flips for short-term profit.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Governance Fairness Tab */}
        <TabsContent value="governance">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Governance Fairness Metrics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {governanceMetrics.map((metric, idx) => (
                <div key={idx} className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-medium">{metric.metric}</p>
                    <Badge variant="outline" className={
                      metric.value >= metric.target
                        ? 'bg-green-500/10 border-green-500/30 text-green-300'
                        : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                    }>
                      {metric.value >= metric.target ? 'On Target' : 'Below Target'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-700/50 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${metric.value >= metric.target ? 'bg-emerald-400' : 'bg-amber-400'}`}
                        style={{ width: `${(metric.value / metric.target) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-medium">{metric.value}{metric.unit}</span>
                  </div>
                  <p className="text-emerald-300/70 text-sm mt-1">Target: {metric.target}{metric.unit}</p>
                </div>
              ))}
            </div>

            <Alert className="bg-amber-500/10 border-amber-500/30">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <AlertTitle className="text-amber-300">Action Needed: Small Holder Participation Below Target</AlertTitle>
              <AlertDescription className="text-amber-300/70">
                Only 23% of governance votes come from small-scale actors (target: 30%). 
                Proposed solution: Quadratic voting to give more weight to underrepresented voices.
              </AlertDescription>
            </Alert>

            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
              <h4 className="text-white font-medium mb-3">Governance Equity Mechanisms</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                  <p className="text-emerald-300/70">
                    <strong className="text-emerald-300">Quadratic Voting:</strong> Vote weight = √(SAN tokens) to prevent whale dominance
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                  <p className="text-emerald-300/70">
                    <strong className="text-emerald-300">Delegation:</strong> Small holders can delegate votes to trusted representatives
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                  <p className="text-emerald-300/70">
                    <strong className="text-emerald-300">Representation Quotas:</strong> ≥30% of council seats reserved for community nominees
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Bias Detection Tab */}
        <TabsContent value="bias">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Algorithmic Bias Audits</h3>
            <p className="text-emerald-300/70 text-sm mb-6">
              Quarterly audits to detect and mitigate bias in AI/ML systems.
            </p>

            <Table>
              <TableHeader>
                <TableRow className="border-emerald-500/20">
                  <TableHead className="text-emerald-300">Algorithm</TableHead>
                  <TableHead className="text-emerald-300">Bias Type Tested</TableHead>
                  <TableHead className="text-emerald-300">Detected</TableHead>
                  <TableHead className="text-emerald-300">Confidence</TableHead>
                  <TableHead className="text-emerald-300">Last Audit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {biasAudits.map((audit, idx) => (
                  <TableRow key={idx} className="border-emerald-500/10">
                    <TableCell className="text-white font-medium">{audit.algorithm}</TableCell>
                    <TableCell className="text-emerald-300">{audit.biasType}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        !audit.detected
                          ? 'bg-green-500/10 border-green-500/30 text-green-300'
                          : 'bg-red-500/10 border-red-500/30 text-red-300'
                      }>
                        {audit.detected ? 'Yes' : 'No'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-emerald-300">{audit.confidence}%</TableCell>
                    <TableCell className="text-emerald-300/70">{audit.lastAudit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {biasAudits.filter(a => a.detected).length > 0 && (
              <div className="mt-6">
                <h4 className="text-white font-medium mb-3">Mitigation Actions</h4>
                {biasAudits.filter(a => a.detected).map((audit, idx) => (
                  <div key={idx} className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg mb-2">
                    <p className="text-red-300 font-medium mb-1">{audit.algorithm}</p>
                    <p className="text-red-300/70 text-sm">{audit.mitigation}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Ethical Incidents Tab */}
        <TabsContent value="incidents">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Ethical Incidents Log</h3>
            <p className="text-emerald-300/70 text-sm mb-6">
              Transparent tracking of ethical concerns and resolutions.
            </p>

            <div className="space-y-3">
              {ethicalIncidents.map((incident) => (
                <div key={incident.id} className={`p-4 rounded-lg border ${
                  incident.severity === 'high' ? 'bg-red-500/10 border-red-500/30' :
                  incident.severity === 'medium' ? 'bg-amber-500/10 border-amber-500/30' :
                  'bg-blue-500/10 border-blue-500/30'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-mono text-sm">{incident.id}</span>
                        <Badge variant="outline" className={
                          incident.status === 'resolved' ? 'bg-green-500/20 border-green-500/50 text-green-300' :
                          'bg-amber-500/20 border-amber-500/50 text-amber-300'
                        }>
                          {incident.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-white/70 text-sm">{incident.date} • {incident.category}</p>
                    </div>
                    <Badge variant="outline" className={
                      incident.severity === 'high' ? 'bg-red-500/20 border-red-500/50 text-red-300' :
                      incident.severity === 'medium' ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' :
                      'bg-blue-500/20 border-blue-500/50 text-blue-300'
                    }>
                      {incident.severity}
                    </Badge>
                  </div>

                  <p className="text-white text-sm mb-2">{incident.description}</p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                    <p className="text-emerald-300/70 text-sm">
                      <strong className="text-emerald-300">Action:</strong> {incident.actionTaken}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
              <h4 className="text-white font-medium mb-2">Ethical Incident Response Protocol</h4>
              <ol className="text-emerald-300/70 text-sm space-y-1 list-decimal list-inside">
                <li><strong className="text-emerald-300">Report:</strong> Any team member or user can file ethical concern</li>
                <li><strong className="text-emerald-300">Review:</strong> Ethics committee reviews within 48 hours</li>
                <li><strong className="text-emerald-300">Assess:</strong> Severity rating and impact analysis</li>
                <li><strong className="text-emerald-300">Act:</strong> Implement mitigation or system redesign</li>
                <li><strong className="text-emerald-300">Communicate:</strong> Transparent public disclosure</li>
                <li><strong className="text-emerald-300">Learn:</strong> Update design guidelines to prevent recurrence</li>
              </ol>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
