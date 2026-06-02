import { useState } from 'react';
import { Shield, Eye, Network, CheckCircle, AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import { Card } from '../ui/interactive/Card';
import { InteractiveChart } from '../ui/interactive/InteractiveChart';
import { motion } from 'motion/react';

interface TrustScore {
  entityId: string;
  entityName: string;
  entityType: 'project' | 'investor' | 'verifier' | 'governor' | 'corporate';
  trustScore: number;
  verificationCount: number;
  consensusRate: number;
  historicalTrend: 'increasing' | 'stable' | 'decreasing';
  lastVerification: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export function TrustEngineHub() {
  const [trustScores] = useState<TrustScore[]>([
    {
      entityId: 'PRJ-847',
      entityName: 'Amazon Conservation DAO',
      entityType: 'project',
      trustScore: 96,
      verificationCount: 847,
      consensusRate: 99,
      historicalTrend: 'increasing',
      lastVerification: '2h ago',
      riskLevel: 'low',
    },
    {
      entityId: 'VER-128',
      entityName: 'Oracle Node Alpha',
      entityType: 'verifier',
      trustScore: 99,
      verificationCount: 8472,
      consensusRate: 100,
      historicalTrend: 'stable',
      lastVerification: '15min ago',
      riskLevel: 'low',
    },
    {
      entityId: 'INV-2847',
      entityName: 'Regenerative Capital Partners',
      entityType: 'investor',
      trustScore: 89,
      verificationCount: 284,
      consensusRate: 94,
      historicalTrend: 'stable',
      lastVerification: '1d ago',
      riskLevel: 'low',
    },
    {
      entityId: 'PRJ-1204',
      entityName: 'New Regenerative Farm',
      entityType: 'project',
      trustScore: 72,
      verificationCount: 12,
      consensusRate: 87,
      historicalTrend: 'increasing',
      lastVerification: '4h ago',
      riskLevel: 'medium',
    },
  ]);

  const [verificationLayers] = useState([
    {
      layer: 'Satellite Imagery',
      verifications: 2847,
      accuracy: 98,
      avgConfidence: 96,
      status: 'active',
    },
    {
      layer: 'IoT Sensors',
      verifications: 4128,
      accuracy: 97,
      avgConfidence: 95,
      status: 'active',
    },
    {
      layer: 'Computer Vision',
      verifications: 1623,
      accuracy: 99,
      avgConfidence: 98,
      status: 'active',
    },
    {
      layer: 'Predictive AI',
      verifications: 5842,
      accuracy: 94,
      avgConfidence: 92,
      status: 'active',
    },
  ]);

  const [consensusData] = useState([
    { date: '1 Jun', consensus: 98, verifications: 7248 },
    { date: '2 Jun', consensus: 97, verifications: 7834 },
    { date: '3 Jun', consensus: 99, verifications: 8124 },
    { date: '4 Jun', consensus: 98, verifications: 8472 },
    { date: '5 Jun', consensus: 99, verifications: 8891 },
    { date: '6 Jun', consensus: 99, verifications: 9247 },
  ]);

  const avgTrustScore = Math.round(trustScores.reduce((sum, t) => sum + t.trustScore, 0) / trustScores.length);
  const totalVerifications = verificationLayers.reduce((sum, v) => sum + v.verifications, 0);
  const avgConsensusRate = 98.6;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white flex items-center gap-3">
          <Shield className="w-8 h-8 text-emerald-400" />
          Trust Engine
        </h1>
        <p className="text-emerald-300/70 mt-2">
          Multi-layer verification with contextual trust scoring across all stakeholder interactions
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Trust Score', value: `${avgTrustScore}/100`, icon: Shield, color: 'emerald' },
          { label: 'Verifications (24h)', value: totalVerifications.toLocaleString(), icon: CheckCircle, color: 'blue' },
          { label: 'Consensus Rate', value: `${avgConsensusRate}%`, icon: Network, color: 'purple' },
          { label: 'Anomalies Detected', value: '3', icon: AlertTriangle, color: 'yellow' },
        ].map((metric, idx) => {
          const Icon = metric.icon;
          const iconColor =
            metric.color === 'emerald' ? 'text-emerald-400 bg-emerald-400/20' :
            metric.color === 'blue' ? 'text-blue-400 bg-blue-400/20' :
            metric.color === 'purple' ? 'text-purple-400 bg-purple-400/20' :
            'text-yellow-400 bg-yellow-400/20';

          return (
            <Card key={idx} hover={false}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 ${iconColor} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-emerald-300/70 text-sm">{metric.label}</div>
                  <div className="text-white text-xl">{metric.value}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Trust Scores */}
      <Card hover={false}>
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-emerald-400" />
          Entity Trust Scores
        </h3>
        <div className="space-y-4">
          {trustScores.map((entity, idx) => (
            <motion.div
              key={entity.entityId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/30 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white">{entity.entityName}</h4>
                    {entity.historicalTrend === 'increasing' ? (
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    ) : entity.historicalTrend === 'decreasing' ? (
                      <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />
                    ) : (
                      <div className="w-4 h-1 bg-gray-400 rounded" />
                    )}
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      entity.riskLevel === 'low' ? 'bg-emerald-400/10 text-emerald-400' :
                      entity.riskLevel === 'medium' ? 'bg-yellow-400/10 text-yellow-400' :
                      'bg-red-400/10 text-red-400'
                    }`}>
                      {entity.riskLevel} risk
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-emerald-300/70 font-mono">{entity.entityId}</span>
                    <span className="text-emerald-300/50 capitalize">{entity.entityType}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white text-3xl mb-1">{entity.trustScore}</div>
                  <div className="text-emerald-300/70 text-xs">Trust Score</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Verifications</div>
                  <div className="text-white">{entity.verificationCount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Consensus Rate</div>
                  <div className="text-emerald-400">{entity.consensusRate}%</div>
                </div>
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Last Verification</div>
                  <div className="text-white">{entity.lastVerification}</div>
                </div>
              </div>

              <div className="w-full bg-slate-900/50 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${entity.trustScore}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className={`h-2 rounded-full ${
                    entity.trustScore >= 90 ? 'bg-gradient-to-r from-emerald-400 to-teal-400' :
                    entity.trustScore >= 75 ? 'bg-gradient-to-r from-blue-400 to-cyan-400' :
                    'bg-gradient-to-r from-yellow-400 to-orange-400'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Verification Layers */}
      <Card hover={false}>
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Network className="w-5 h-5 text-emerald-400" />
          Verification Layer Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {verificationLayers.map((layer, idx) => (
            <motion.div
              key={layer.layer}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/30 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-white">{layer.layer}</div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-emerald-300/50">Verifications</span>
                  <span className="text-white">{layer.verifications.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-300/50">Accuracy</span>
                  <span className="text-emerald-400">{layer.accuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-300/50">Avg Confidence</span>
                  <span className="text-blue-400">{layer.avgConfidence}%</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="w-full bg-slate-900/50 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-teal-400 h-1.5 rounded-full"
                    style={{ width: `${layer.accuracy}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Consensus Trends */}
      <InteractiveChart
        title="Oracle Consensus & Verification Volume"
        data={consensusData}
        type="line"
        xAxisKey="date"
        dataKeys={[
          { key: 'consensus', color: '#10b981', name: 'Consensus %' },
          { key: 'verifications', color: '#3b82f6', name: 'Verifications' },
        ]}
        height={300}
      />

      {/* Trust Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card hover={false}>
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h4 className="text-white">Trust Quality</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-emerald-300/70">High Trust (90+)</span>
              <span className="text-emerald-400">847</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Medium Trust (75-89)</span>
              <span className="text-white">284</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Low Trust (&lt;75)</span>
              <span className="text-yellow-400">47</span>
            </div>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-5 h-5 text-blue-400" />
            <h4 className="text-white">Oracle Health</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Active Nodes</span>
              <span className="text-white">247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Avg Response Time</span>
              <span className="text-blue-400">0.3s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Consensus Threshold</span>
              <span className="text-white">3/4 nodes</span>
            </div>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <h4 className="text-white">Historical Weighting</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Temporal Decay</span>
              <span className="text-white">0.95</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Recent Bias</span>
              <span className="text-purple-400">5%/month</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">History Window</span>
              <span className="text-white">12 months</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
