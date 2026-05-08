import { Brain, Cpu, Zap, CheckCircle, AlertCircle, Satellite, Camera, TrendingUp, Activity } from 'lucide-react';

export function AIPoweredOracles() {
  const oracleNodes = [
    {
      id: 'ORACLE-EU-001',
      region: 'Europe West',
      status: 'Active',
      aiModel: 'GPT-Vision-7 + Satellite ML',
      verifications: 8472,
      accuracy: 99.7,
      responseTime: '1.2s',
      dataPoints: 42847,
    },
    {
      id: 'ORACLE-AP-002',
      region: 'Asia Pacific',
      status: 'Active',
      aiModel: 'Claude-Vision-3.5 + IoT Sensors',
      verifications: 7283,
      accuracy: 99.8,
      responseTime: '0.9s',
      dataPoints: 38291,
    },
    {
      id: 'ORACLE-NA-003',
      region: 'North America',
      status: 'Active',
      aiModel: 'Multi-Modal AI Stack',
      verifications: 9124,
      accuracy: 99.6,
      responseTime: '1.1s',
      dataPoints: 45692,
    },
    {
      id: 'ORACLE-AF-004',
      region: 'Africa',
      status: 'Active',
      aiModel: 'Edge AI + Ground Truth',
      verifications: 5847,
      accuracy: 99.5,
      responseTime: '1.4s',
      dataPoints: 31284,
    },
  ];

  const verificationTypes = [
    {
      type: 'Satellite Imagery Analysis',
      icon: Satellite,
      description: 'Multi-spectral satellite data processed by AI to verify carbon sequestration, forest coverage, and land use changes',
      verifications24h: 2847,
      accuracy: 99.8,
    },
    {
      type: 'IoT Sensor Networks',
      icon: Activity,
      description: 'Real-time environmental sensors measuring air quality, water purity, soil health, and biodiversity indicators',
      verifications24h: 4283,
      accuracy: 99.9,
    },
    {
      type: 'Computer Vision',
      icon: Camera,
      description: 'AI-powered image and video analysis to verify on-ground project implementation and impact',
      verifications24h: 1924,
      accuracy: 99.6,
    },
    {
      type: 'Predictive Modeling',
      icon: TrendingUp,
      description: 'Machine learning models forecasting ecological outcomes and detecting anomalies in impact data',
      verifications24h: 3182,
      accuracy: 98.4,
    },
  ];

  const recentVerifications = [
    {
      id: 'VER-2026-001',
      asset: 'Amazon Rainforest Protection Zone A7',
      type: 'Carbon Sequestration',
      aiConfidence: 99.8,
      timestamp: '2 minutes ago',
      status: 'Verified',
      dataSources: ['Sentinel-2 Satellite', 'Ground IoT Sensors', 'Drone Imagery'],
    },
    {
      id: 'VER-2026-002',
      asset: 'Coral Reef Restoration - Maldives',
      type: 'Biodiversity',
      aiConfidence: 99.2,
      timestamp: '8 minutes ago',
      status: 'Verified',
      dataSources: ['Underwater Cameras', 'Water Quality Sensors', 'Marine Bioacoustics'],
    },
    {
      id: 'VER-2026-003',
      asset: 'Urban Tree Canopy - Singapore',
      type: 'Air Quality',
      aiConfidence: 99.6,
      timestamp: '15 minutes ago',
      status: 'Verified',
      dataSources: ['LIDAR Mapping', 'Air Quality Monitors', 'Thermal Imaging'],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white flex items-center gap-3">
            <Brain className="w-8 h-8 text-emerald-400" />
            AI-Powered Oracles
          </h1>
          <p className="text-emerald-300/70 mt-2">
            Advanced AI and machine learning systems autonomously verifying regenerative impact in real-time
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-400/10 rounded-lg border border-emerald-400/30">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400 text-sm">4 Active Oracle Nodes</span>
        </div>
      </div>

      {/* Network Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Verifications', value: '12.4M', icon: CheckCircle },
          { label: 'Average Accuracy', value: '99.7%', icon: TrendingUp },
          { label: 'Data Points Analyzed', value: '847.3B', icon: Cpu },
          { label: 'Response Time', value: '1.15s', icon: Zap },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
            <div className="flex items-center gap-2 text-emerald-300/70 text-sm mb-2">
              <stat.icon className="w-4 h-4" />
              {stat.label}
            </div>
            <div className="text-white text-2xl">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Oracle Nodes */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
        <h2 className="text-white mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-emerald-400" />
          Global Oracle Network
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {oracleNodes.map((node) => (
            <div
              key={node.id}
              className="bg-slate-800/50 border border-emerald-500/10 rounded-lg p-4 hover:border-emerald-400/30 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-white mb-1">{node.region}</div>
                  <div className="text-emerald-300/70 text-sm font-mono">{node.id}</div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-400/10 rounded border border-emerald-400/30">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-emerald-400 text-xs">{node.status}</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded p-3 mb-3">
                <div className="text-emerald-300/50 text-xs mb-1">AI Model Stack</div>
                <div className="text-emerald-300 text-sm">{node.aiModel}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Verifications</div>
                  <div className="text-white">{node.verifications.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Accuracy</div>
                  <div className="text-emerald-400">{node.accuracy}%</div>
                </div>
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Response Time</div>
                  <div className="text-white">{node.responseTime}</div>
                </div>
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Data Points</div>
                  <div className="text-white">{node.dataPoints.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification Types */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
        <h2 className="text-white mb-4">AI Verification Methodologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {verificationTypes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/50 border border-emerald-500/10 rounded-lg p-4 hover:border-emerald-400/30 transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-emerald-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white mb-1">{item.type}</div>
                    <div className="text-emerald-300/70 text-sm">{item.description}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-emerald-500/10">
                  <div>
                    <div className="text-emerald-300/50 text-xs">24h Verifications</div>
                    <div className="text-white">{item.verifications24h.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-emerald-300/50 text-xs">Accuracy Rate</div>
                    <div className="text-emerald-400">{item.accuracy}%</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Verifications */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
        <h2 className="text-white mb-4">Recent AI Verifications</h2>
        <div className="space-y-3">
          {recentVerifications.map((ver) => (
            <div
              key={ver.id}
              className="bg-slate-800/50 border border-emerald-500/10 rounded-lg p-4 hover:border-emerald-400/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="text-white mb-1">{ver.asset}</div>
                  <div className="text-emerald-300/70 text-sm">{ver.type} • {ver.id}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-400/10 rounded border border-emerald-400/30">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 text-xs">{ver.status}</span>
                  </div>
                  <div className="text-emerald-300/50 text-xs">{ver.timestamp}</div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded p-3 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-300/70 text-sm">AI Confidence Score</span>
                  <span className="text-emerald-400 font-semibold">{ver.aiConfidence}%</span>
                </div>
                <div className="w-full bg-slate-800/50 rounded-full h-2 mt-2">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full"
                    style={{ width: `${ver.aiConfidence}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="text-emerald-300/50 text-xs mb-2">Data Sources</div>
                <div className="flex flex-wrap gap-2">
                  {ver.dataSources.map((source, idx) => (
                    <div key={idx} className="px-2 py-1 bg-emerald-400/10 rounded text-emerald-400 text-xs">
                      {source}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
