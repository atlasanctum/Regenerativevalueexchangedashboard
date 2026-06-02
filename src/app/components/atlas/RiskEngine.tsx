import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Activity, TrendingDown, Zap, Eye, Lock, Bell } from 'lucide-react';
import { Card } from '../ui/interactive/Card';
import { InteractiveChart } from '../ui/interactive/InteractiveChart';
import { motion } from 'motion/react';

interface ThreatDetection {
  id: string;
  type: 'market_manipulation' | 'oracle_collusion' | 'smart_contract_exploit' | 'verification_fraud' | 'liquidity_crisis' | 'regulatory_shift';
  severity: 1 | 2 | 3 | 4;
  description: string;
  affectedEntities: string[];
  detectedAt: Date;
  status: 'monitoring' | 'investigating' | 'mitigated' | 'false_positive';
  aiConfidence: number;
  recommendation: string;
}

export function RiskEngine() {
  const [threats, setThreats] = useState<ThreatDetection[]>([
    {
      id: 'THR-2847',
      type: 'market_manipulation',
      severity: 2,
      description: 'Unusual trading pattern detected in Carbon RIU market',
      affectedEntities: ['Market: Carbon RIU', 'Traders: 3'],
      detectedAt: new Date(Date.now() - 480000),
      status: 'investigating',
      aiConfidence: 87,
      recommendation: 'Monitor trading activity for 24h, flag accounts if pattern continues',
    },
    {
      id: 'THR-2848',
      type: 'verification_fraud',
      severity: 3,
      description: 'Inconsistent IoT sensor readings from project PRJ-8472',
      affectedEntities: ['Project: PRJ-8472', 'Oracle: Node-3'],
      detectedAt: new Date(Date.now() - 1200000),
      status: 'mitigated',
      aiConfidence: 94,
      recommendation: 'Verification paused, manual audit initiated',
    },
    {
      id: 'THR-2849',
      type: 'liquidity_crisis',
      severity: 2,
      description: 'Liquidity pool depth below threshold in Biodiversity market',
      affectedEntities: ['Market: Biodiversity RIU'],
      detectedAt: new Date(Date.now() - 300000),
      status: 'monitoring',
      aiConfidence: 91,
      recommendation: 'Treasury Engine deploying additional liquidity',
    },
  ]);

  const [riskMetrics] = useState([
    { date: '1 Jun', overall: 2.1, market: 1.8, technical: 2.4, operational: 2.0 },
    { date: '2 Jun', overall: 2.3, market: 2.1, technical: 2.2, operational: 2.5 },
    { date: '3 Jun', overall: 1.9, market: 1.7, technical: 2.0, operational: 2.1 },
    { date: '4 Jun', overall: 2.4, market: 2.8, technical: 2.1, operational: 2.3 },
    { date: '5 Jun', overall: 2.0, market: 1.9, technical: 1.8, operational: 2.3 },
    { date: '6 Jun', overall: 2.2, market: 2.3, technical: 2.0, operational: 2.3 },
  ]);

  const [monitoringDimensions] = useState([
    { name: 'Market Manipulation', risk: 2.3, incidents: 3, status: 'active' },
    { name: 'Oracle Collusion', risk: 1.2, incidents: 0, status: 'clear' },
    { name: 'Smart Contract Exploits', risk: 1.5, incidents: 0, status: 'clear' },
    { name: 'Verification Fraud', risk: 2.8, incidents: 1, status: 'mitigated' },
    { name: 'Liquidity Crises', risk: 2.1, incidents: 2, status: 'monitoring' },
    { name: 'Regulatory Shifts', risk: 1.8, incidents: 0, status: 'clear' },
  ]);

  const threatTypeLabels = {
    market_manipulation: 'Market Manipulation',
    oracle_collusion: 'Oracle Collusion',
    smart_contract_exploit: 'Smart Contract Exploit',
    verification_fraud: 'Verification Fraud',
    liquidity_crisis: 'Liquidity Crisis',
    regulatory_shift: 'Regulatory Shift',
  };

  const severityColors = {
    1: { bg: 'bg-blue-400/10', text: 'text-blue-400', border: 'border-blue-400/30' },
    2: { bg: 'bg-yellow-400/10', text: 'text-yellow-400', border: 'border-yellow-400/30' },
    3: { bg: 'bg-orange-400/10', text: 'text-orange-400', border: 'border-orange-400/30' },
    4: { bg: 'bg-red-400/10', text: 'text-red-400', border: 'border-red-400/30' },
  };

  const totalThreatsDetected = 847;
  const activethreats = threats.filter(t => t.status === 'investigating' || t.status === 'monitoring').length;
  const avgResponseTime = '4.2 min';
  const mitigationRate = 98.7;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white flex items-center gap-3">
          <Shield className="w-8 h-8 text-emerald-400" />
          Risk Engine
        </h1>
        <p className="text-emerald-300/70 mt-2">
          Economic immune system with predictive threat detection and automated response
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Threats Detected (24h)', value: totalThreatsDetected, icon: Eye, color: 'blue' },
          { label: 'Active Threats', value: activethreats, icon: AlertTriangle, color: 'yellow' },
          { label: 'Avg Response Time', value: avgResponseTime, icon: Zap, color: 'purple' },
          { label: 'Mitigation Rate', value: `${mitigationRate}%`, icon: Shield, color: 'emerald' },
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

      {/* Active Threats */}
      <Card hover={false}>
        <h3 className="text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          Active Threat Detection
        </h3>
        <div className="space-y-4">
          {threats.map((threat, idx) => {
            const colors = severityColors[threat.severity];
            return (
              <motion.div
                key={threat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-lg p-4 border-l-4 ${
                  threat.severity === 4 ? 'border-red-400 bg-red-400/5' :
                  threat.severity === 3 ? 'border-orange-400 bg-orange-400/5' :
                  threat.severity === 2 ? 'border-yellow-400 bg-yellow-400/5' :
                  'border-blue-400 bg-blue-400/5'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-white">{threatTypeLabels[threat.type]}</h4>
                      <span className={`px-2 py-0.5 ${colors.bg} ${colors.text} rounded text-xs border ${colors.border}`}>
                        Level {threat.severity}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs capitalize ${
                        threat.status === 'mitigated' ? 'bg-emerald-400/10 text-emerald-400' :
                        threat.status === 'investigating' ? 'bg-yellow-400/10 text-yellow-400' :
                        threat.status === 'monitoring' ? 'bg-blue-400/10 text-blue-400' :
                        'bg-gray-400/10 text-gray-400'
                      }`}>
                        {threat.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="text-emerald-300/70 text-sm font-mono mb-2">{threat.id}</div>
                    <div className="text-white text-sm mb-2">{threat.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-300/50 text-xs mb-1">AI Confidence</div>
                    <div className="text-blue-400 text-xl">{threat.aiConfidence}%</div>
                  </div>
                </div>

                <div className="bg-slate-800/30 rounded p-3 mb-3">
                  <div className="text-emerald-300/50 text-xs mb-1">Affected Entities</div>
                  <div className="flex flex-wrap gap-2">
                    {threat.affectedEntities.map((entity, eidx) => (
                      <span key={eidx} className="px-2 py-1 bg-slate-900/50 rounded text-emerald-300 text-xs">
                        {entity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/30 rounded p-3">
                  <div className="text-emerald-300/50 text-xs mb-1">Recommended Action</div>
                  <div className="text-emerald-300 text-sm">{threat.recommendation}</div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-emerald-300/70">
                  <div className="flex items-center gap-1">
                    <Bell className="w-3 h-3" />
                    Detected {Math.round((Date.now() - threat.detectedAt.getTime()) / 60000)} min ago
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Risk Trends */}
      <InteractiveChart
        title="Risk Score Trends (7 Days)"
        data={riskMetrics}
        type="line"
        xAxisKey="date"
        dataKeys={[
          { key: 'overall', color: '#ef4444', name: 'Overall Risk' },
          { key: 'market', color: '#f59e0b', name: 'Market Risk' },
          { key: 'technical', color: '#3b82f6', name: 'Technical Risk' },
          { key: 'operational', color: '#8b5cf6', name: 'Operational Risk' },
        ]}
        height={300}
      />

      {/* Monitoring Dimensions */}
      <Card hover={false}>
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          Risk Monitoring Dimensions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {monitoringDimensions.map((dim, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-slate-800/30 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-white text-sm">{dim.name}</div>
                {dim.status === 'clear' ? (
                  <Lock className="w-4 h-4 text-emerald-400" />
                ) : dim.status === 'mitigated' ? (
                  <Shield className="w-4 h-4 text-blue-400" />
                ) : (
                  <Eye className="w-4 h-4 text-yellow-400" />
                )}
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-emerald-300/50">Risk Score</span>
                  <span className={
                    dim.risk < 2 ? 'text-emerald-400' :
                    dim.risk < 3 ? 'text-yellow-400' :
                    'text-red-400'
                  }>{dim.risk}/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-300/50">Incidents (24h)</span>
                  <span className="text-white">{dim.incidents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-300/50">Status</span>
                  <span className={`capitalize ${
                    dim.status === 'clear' ? 'text-emerald-400' :
                    dim.status === 'mitigated' ? 'text-blue-400' :
                    'text-yellow-400'
                  }`}>{dim.status}</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="w-full bg-slate-900/50 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      dim.risk < 2 ? 'bg-emerald-400' :
                      dim.risk < 3 ? 'bg-yellow-400' :
                      'bg-red-400'
                    }`}
                    style={{ width: `${(dim.risk / 10) * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Response Protocols */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { level: 'Level 1', action: 'Monitor Only', color: 'blue', count: 847 },
          { level: 'Level 2', action: 'Alert Governance', color: 'yellow', count: 12 },
          { level: 'Level 3', action: 'Auto-Pause Markets', color: 'orange', count: 3 },
          { level: 'Level 4', action: 'Emergency Shutdown', color: 'red', count: 0 },
        ].map((protocol, idx) => (
          <Card key={idx} hover={false}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 bg-${protocol.color}-400/20 rounded-lg flex items-center justify-center`}>
                <Shield className={`w-5 h-5 text-${protocol.color}-400`} />
              </div>
              <div>
                <div className="text-emerald-300/70 text-sm">{protocol.level}</div>
                <div className="text-white text-sm">{protocol.action}</div>
              </div>
            </div>
            <div className="text-emerald-400 text-2xl">{protocol.count}</div>
            <div className="text-emerald-300/50 text-xs">incidents (24h)</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
