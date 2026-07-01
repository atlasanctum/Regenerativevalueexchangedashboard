import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { useNavigate } from 'react-router';
import { Shield, Box, Users, AlertTriangle, CheckCircle, ArrowRight, TrendingUp, Globe, Activity } from 'lucide-react';

const features = [
  {
    title: '3D Site Visualization',
    description: 'LiDAR point clouds and photogrammetry for immersive remote site verification',
    icon: Box,
    href: '/verification/3d-sites',
    status: 'Live',
    stats: { label: 'Sites Mapped', value: '1,247' },
    color: 'from-emerald-400 to-teal-500',
  },
  {
    title: 'Dispute Resolution',
    description: 'Challenge verification claims through a structured expert panel and stakeholder voting process',
    icon: AlertTriangle,
    href: '/verification/disputes',
    status: 'Live',
    stats: { label: 'Resolved Cases', value: '847' },
    color: 'from-amber-400 to-orange-500',
  },
  {
    title: 'Community Verification',
    description: 'Mobile-based geo-tagged photo/video evidence collection with community reputation rewards',
    icon: Users,
    href: '/verification/community',
    status: 'Live',
    stats: { label: 'Verifiers', value: '12,847' },
    color: 'from-cyan-400 to-blue-500',
  },
  {
    title: 'Whistleblower Portal',
    description: 'Anonymous, encrypted reporting with bounty rewards and legal protection for informants',
    icon: AlertTriangle,
    href: '/verification/whistleblower',
    status: 'Live',
    stats: { label: 'Reports Filed', value: '134' },
    color: 'from-purple-400 to-violet-500',
  },
];

const recentVerifications = [
  { project: 'Amazon Mangrove BRZ-001', method: 'Satellite + Oracle', score: 94.8, time: '2 hrs ago', status: 'Verified' },
  { project: 'Borneo Peatland IDN-003', method: 'Community + AI', score: 91.2, time: '5 hrs ago', status: 'Verified' },
  { project: 'Kenyan Savanna KEN-012', method: 'Expert Panel', score: 88.4, time: '1 day ago', status: 'Under Review' },
  { project: 'Andean Cloud Forest COL-007', method: '3D LiDAR + Satellite', score: 97.1, time: '2 days ago', status: 'Verified' },
  { project: 'Pacific Kelp AUS-022', method: 'Community + Satellite', score: 82.7, time: '3 days ago', status: 'Disputed' },
];

const trustMetrics = [
  { label: 'Total Verifications', value: '14,847', change: '+347 this week' },
  { label: 'Avg Verification Score', value: '91.4', change: '+1.2 pts' },
  { label: 'Dispute Rate', value: '0.8%', change: '-0.1%' },
  { label: 'Oracle Consensus', value: '99.2%', change: '+0.1%' },
];

export function VerificationHub() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white mb-2">Verification & Trust Hub</h2>
        <p className="text-emerald-300/70">Comprehensive multi-layered verification infrastructure for all regenerative claims</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {trustMetrics.map((m) => (
          <Card key={m.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
            <div className="text-emerald-400 text-xs mb-2">{m.label}</div>
            <div className="text-white text-xl font-bold">{m.value}</div>
            <div className="text-emerald-400 text-xs mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {m.change}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <Card
              key={f.title}
              className="bg-slate-900/50 border-emerald-500/20 p-5 hover:border-emerald-500/40 transition-all cursor-pointer"
              onClick={() => navigate(f.href)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-white font-semibold text-sm">{f.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">{f.status}</Badge>
                      <ArrowRight className="w-4 h-4 text-emerald-400/50" />
                    </div>
                  </div>
                  <p className="text-emerald-300/60 text-xs mb-3">{f.description}</p>
                  <div className="bg-slate-800/40 rounded-lg p-2 inline-block">
                    <span className="text-emerald-300/50 text-xs">{f.stats.label}: </span>
                    <span className="text-white font-bold text-sm">{f.stats.value}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-sm">Recent Verifications</h3>
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 text-xs h-7 px-3">View All</Button>
        </div>
        <div className="space-y-3">
          {recentVerifications.map((v, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${v.status === 'Verified' ? 'bg-emerald-400' : v.status === 'Disputed' ? 'bg-rose-400' : 'bg-amber-400'}`} />
                <div>
                  <div className="text-white text-sm">{v.project}</div>
                  <div className="text-emerald-300/50 text-xs">{v.method}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-white text-sm font-bold">{v.score}</div>
                  <div className="text-emerald-300/50 text-xs">Score</div>
                </div>
                <Badge className={`border-0 text-xs ${v.status === 'Verified' ? 'bg-emerald-400/20 text-emerald-300' : v.status === 'Disputed' ? 'bg-rose-400/20 text-rose-300' : 'bg-amber-400/20 text-amber-300'}`}>
                  {v.status}
                </Badge>
                <span className="text-emerald-300/40 text-xs">{v.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
