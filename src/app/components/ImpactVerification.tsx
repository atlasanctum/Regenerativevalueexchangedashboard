import { Shield, CheckCircle, AlertCircle, Clock, Users, Satellite, Camera, TrendingUp, FileCheck, MapPin, Award } from 'lucide-react';

export function ImpactVerification() {
  const verificationStats = [
    { label: 'Total Verifications', value: '47,284', change: '+2,847 this week', icon: FileCheck },
    { label: 'Verification Accuracy', value: '99.7%', change: 'Industry-leading', icon: Award },
    { label: 'Avg Verification Time', value: '3.2 hours', change: '40% faster', icon: Clock },
    { label: 'Active Verifiers', value: '2,847', change: '+127 this month', icon: Users },
  ];

  const verificationQueue = [
    {
      id: 'VER-2026-05-08-001',
      project: 'Amazonian Reforestation Initiative',
      type: 'Carbon Sequestration',
      requestedBy: 'Amazon Conservation DAO',
      status: 'In Progress',
      progress: 75,
      verificationMethod: 'Satellite + Ground Sensors',
      estimatedCompletion: '2 hours',
      priority: 'High',
    },
    {
      id: 'VER-2026-05-08-002',
      project: 'Coral Reef Restoration - Pacific',
      type: 'Biodiversity',
      requestedBy: 'Ocean Health Initiative',
      status: 'Pending Review',
      progress: 95,
      verificationMethod: 'Underwater Drones + AI Analysis',
      estimatedCompletion: '30 minutes',
      priority: 'Medium',
    },
    {
      id: 'VER-2026-05-08-003',
      project: 'Urban Farming Network - Lagos',
      type: 'Social Impact',
      requestedBy: 'Lagos Food Security Collective',
      status: 'Data Collection',
      progress: 45,
      verificationMethod: 'Community Surveys + IoT Sensors',
      estimatedCompletion: '6 hours',
      priority: 'Medium',
    },
  ];

  const recentVerifications = [
    {
      id: 'VER-2026-05-07-284',
      project: 'Mangrove Restoration - Bangladesh',
      type: 'Coastal Protection',
      verifier: 'Oracle Node Asia-South',
      result: 'Verified',
      confidence: 99.8,
      impactMetric: '847 hectares restored, 2.4M tons CO2/year',
      timestamp: '2 hours ago',
    },
    {
      id: 'VER-2026-05-07-283',
      project: 'Solar Water Pumping - Kenya',
      type: 'Clean Energy Access',
      verifier: 'Community Verification Network',
      result: 'Verified',
      confidence: 98.2,
      impactMetric: '12,400 people served, 847 MWh clean energy',
      timestamp: '4 hours ago',
    },
    {
      id: 'VER-2026-05-07-282',
      project: 'Soil Regeneration - Argentina',
      type: 'Agricultural Impact',
      verifier: 'Oracle Node Latin America',
      result: 'Verified',
      confidence: 99.1,
      impactMetric: '2,400 hectares improved, 40% yield increase',
      timestamp: '6 hours ago',
    },
  ];

  const verificationMethods = [
    {
      method: 'AI Satellite Analysis',
      icon: Satellite,
      description: 'Multi-spectral satellite imagery analyzed by AI to measure land use, vegetation, and environmental changes',
      verifications: 18472,
      accuracy: 99.8,
      avgTime: '2.1 hours',
    },
    {
      method: 'IoT Sensor Networks',
      icon: TrendingUp,
      description: 'Real-time environmental sensors measuring air, water, soil quality, and biodiversity indicators',
      verifications: 14283,
      accuracy: 99.9,
      avgTime: '1.5 hours',
    },
    {
      method: 'Community Verification',
      icon: Users,
      description: 'Local community members and stakeholders validate impact through ground-truth surveys and observations',
      verifications: 8472,
      accuracy: 97.4,
      avgTime: '8.2 hours',
    },
    {
      method: 'Drone & Camera Analysis',
      icon: Camera,
      description: 'Aerial and ground-level imagery processed by computer vision to verify project implementation',
      verifications: 6057,
      accuracy: 99.2,
      avgTime: '3.8 hours',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white flex items-center gap-3">
            <Shield className="w-8 h-8 text-emerald-400" />
            Impact Verification
          </h1>
          <p className="text-emerald-300/70 mt-2">
            Multi-layered verification system combining AI oracles, IoT sensors, and community validation to ensure impact authenticity
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-400/10 rounded-lg border border-emerald-400/30">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-emerald-400 text-sm">12 Verifications In Progress</span>
        </div>
      </div>

      {/* Verification Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {verificationStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
              <div className="flex items-center gap-2 text-emerald-300/70 text-sm mb-2">
                <Icon className="w-4 h-4" />
                {stat.label}
              </div>
              <div className="text-white text-2xl mb-1">{stat.value}</div>
              <div className="text-emerald-400 text-xs">{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Active Verification Queue */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
        <h2 className="text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-400" />
          Active Verification Queue
        </h2>
        <div className="space-y-3">
          {verificationQueue.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800/50 border border-emerald-500/10 rounded-lg p-4 hover:border-emerald-400/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white">{item.project}</h3>
                    <div className={`px-2 py-0.5 rounded text-xs ${
                      item.priority === 'High' ? 'bg-red-400/10 text-red-400' : 'bg-emerald-400/10 text-emerald-400'
                    }`}>
                      {item.priority}
                    </div>
                  </div>
                  <div className="text-emerald-300/70 text-sm">{item.type} • Requested by {item.requestedBy}</div>
                  <div className="text-emerald-300/50 text-xs font-mono mt-1">{item.id}</div>
                </div>
                <div className="text-right">
                  <div className="px-3 py-1 bg-slate-700/50 rounded border border-emerald-500/20 text-emerald-300 text-xs mb-1">
                    {item.status}
                  </div>
                  <div className="text-emerald-300/50 text-xs">{item.estimatedCompletion}</div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded p-3 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-300/70 text-sm">Verification Method</span>
                  <span className="text-emerald-300 text-sm">{item.verificationMethod}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-300/70 text-sm">Progress</span>
                  <span className="text-emerald-400 text-sm">{item.progress}%</span>
                </div>
                <div className="w-full bg-slate-800/50 rounded-full h-2 mt-2">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full transition-all"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button className="text-emerald-400 hover:text-emerald-300 text-sm">View Details →</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification Methods */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
        <h2 className="text-white mb-4">Verification Methodologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {verificationMethods.map((method, idx) => {
            const Icon = method.icon;
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
                    <h3 className="text-white mb-1">{method.method}</h3>
                    <p className="text-emerald-300/70 text-sm">{method.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-emerald-500/10">
                  <div>
                    <div className="text-emerald-300/50 text-xs mb-1">Verifications</div>
                    <div className="text-white">{method.verifications.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-emerald-300/50 text-xs mb-1">Accuracy</div>
                    <div className="text-emerald-400">{method.accuracy}%</div>
                  </div>
                  <div>
                    <div className="text-emerald-300/50 text-xs mb-1">Avg Time</div>
                    <div className="text-white text-sm">{method.avgTime}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Verifications */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
        <h2 className="text-white mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          Recently Completed Verifications
        </h2>
        <div className="space-y-3">
          {recentVerifications.map((ver) => (
            <div
              key={ver.id}
              className="bg-slate-800/50 border border-emerald-500/10 rounded-lg p-4 hover:border-emerald-400/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white">{ver.project}</h3>
                    <div className="px-2 py-0.5 bg-emerald-400/10 rounded text-emerald-400 text-xs flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {ver.result}
                    </div>
                  </div>
                  <div className="text-emerald-300/70 text-sm">{ver.type} • {ver.id}</div>
                </div>
                <div className="text-emerald-300/50 text-xs text-right">
                  {ver.timestamp}
                </div>
              </div>

              <div className="bg-slate-900/50 rounded p-3 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-300/70 text-sm">Verified By</span>
                  <span className="text-emerald-300 text-sm">{ver.verifier}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-300/70 text-sm">Confidence Score</span>
                  <span className="text-emerald-400 font-semibold">{ver.confidence}%</span>
                </div>
              </div>

              <div className="bg-emerald-400/5 border border-emerald-500/20 rounded p-3">
                <div className="text-emerald-300/50 text-xs mb-1">Verified Impact</div>
                <div className="text-emerald-300 text-sm">{ver.impactMetric}</div>
              </div>

              <div className="mt-3 flex items-center justify-end">
                <button className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  View on Impact Map
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification Trust Score */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
          <h3 className="text-white mb-4">Multi-Layer Verification</h3>
          <div className="space-y-4">
            {[
              { layer: 'AI Oracle Verification', status: 'Active', coverage: 100 },
              { layer: 'IoT Sensor Validation', status: 'Active', coverage: 87 },
              { layer: 'Community Ground Truth', status: 'Active', coverage: 64 },
              { layer: 'Third-Party Audit', status: 'Periodic', coverage: 23 },
            ].map((layer, idx) => (
              <div key={idx} className="pb-3 border-b border-emerald-500/10 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-300/70">{layer.layer}</span>
                  <span className="text-emerald-400 text-sm">{layer.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-800/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full"
                      style={{ width: `${layer.coverage}%` }}
                    ></div>
                  </div>
                  <span className="text-emerald-300 text-sm w-12">{layer.coverage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
          <h3 className="text-white mb-4">Verification Quality Metrics</h3>
          <div className="space-y-4">
            {[
              { metric: 'Data Source Redundancy', value: '3.2x', status: 'Excellent' },
              { metric: 'Cross-Verification Rate', value: '94.7%', status: 'High' },
              { metric: 'Dispute Resolution Time', value: '4.2 days', status: 'Good' },
              { metric: 'False Positive Rate', value: '0.3%', status: 'Excellent' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between pb-3 border-b border-emerald-500/10 last:border-b-0">
                <div>
                  <div className="text-emerald-300/70 text-sm">{item.metric}</div>
                  <div className="text-white text-lg">{item.value}</div>
                </div>
                <div className="px-3 py-1 bg-emerald-400/10 rounded border border-emerald-400/30 text-emerald-400 text-xs">
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
