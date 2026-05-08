import { Code, Workflow, RefreshCw, Zap, GitBranch, TrendingUp, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

export function LivingSmartContracts() {
  const activeContracts = [
    {
      id: 'LSC-2026-4217',
      name: 'Adaptive Carbon Sequestration Agreement',
      type: 'Self-Evolving',
      status: 'Active',
      participants: ['Amazon Conservation DAO', 'Carbon Credit Buyers Pool', 'Oracle Network'],
      adaptations: 7,
      lastEvolution: '2 days ago',
      conditions: 'Auto-adjusts carbon pricing based on verified sequestration rates and market demand',
      currentPhase: 'Phase 3: Enhanced Verification',
      totalValue: '$2.4M',
      executionRate: 99.8,
    },
    {
      id: 'LSC-2026-8291',
      name: 'Dynamic Biodiversity Protection Bond',
      type: 'Responsive',
      status: 'Active',
      participants: ['Wildlife Conservation Network', 'Impact Investors', 'Local Communities'],
      adaptations: 12,
      lastEvolution: '5 hours ago',
      conditions: 'Payouts increase when satellite AI detects improved biodiversity indices',
      currentPhase: 'Phase 2: Expansion Triggered',
      totalValue: '$1.8M',
      executionRate: 99.2,
    },
    {
      id: 'LSC-2026-5482',
      name: 'Regenerative Agriculture Revenue Share',
      type: 'Multi-Stakeholder',
      status: 'Active',
      participants: ['Farming Cooperative', 'Soil Health Institute', 'Food Retailers', 'Community'],
      adaptations: 4,
      lastEvolution: '1 week ago',
      conditions: 'Revenue distribution evolves based on soil health improvements and crop yields',
      currentPhase: 'Phase 1: Baseline Measurement',
      totalValue: '$847K',
      executionRate: 98.9,
    },
  ];

  const evolutionTriggers = [
    {
      trigger: 'Environmental Threshold',
      description: 'Contract parameters automatically adjust when verified ecological metrics cross predefined thresholds',
      useCases: 'Carbon pricing, biodiversity rewards, water quality payments',
      frequency: 'Real-time monitoring',
    },
    {
      trigger: 'Market Dynamics',
      description: 'Smart contracts respond to market conditions to optimize impact financing and asset pricing',
      useCases: 'Dynamic pricing, liquidity adjustments, demand-based allocations',
      frequency: 'Every 4 hours',
    },
    {
      trigger: 'Stakeholder Consensus',
      description: 'Contract evolution triggered by multi-party voting or consensus mechanisms',
      useCases: 'Governance updates, scope changes, participant additions',
      frequency: 'On-demand',
    },
    {
      trigger: 'AI Predictions',
      description: 'Predictive AI models trigger preemptive contract adjustments to maximize impact',
      useCases: 'Risk mitigation, opportunity capture, optimal timing',
      frequency: 'Daily analysis',
    },
  ];

  const contractFeatures = [
    {
      feature: 'Self-Healing',
      icon: RefreshCw,
      description: 'Automatically detects and resolves execution failures, edge cases, or disputed conditions',
      status: 'Active',
      incidents: 0,
    },
    {
      feature: 'Multi-Oracle Consensus',
      icon: GitBranch,
      description: 'Requires agreement from multiple AI oracles before executing high-value state changes',
      status: 'Active',
      accuracy: 99.9,
    },
    {
      feature: 'Temporal Logic',
      icon: Activity,
      description: 'Contracts understand past, present, and future states to make intelligent decisions',
      status: 'Active',
      predictions: 2847,
    },
    {
      feature: 'Cross-Chain Execution',
      icon: Workflow,
      description: 'Seamlessly operates across multiple blockchains and traditional financial systems',
      status: 'Active',
      networks: 8,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white flex items-center gap-3">
            <Code className="w-8 h-8 text-emerald-400" />
            Living Smart Contracts
          </h1>
          <p className="text-emerald-300/70 mt-2">
            Self-evolving, AI-enhanced smart contracts that adapt to real-world conditions and maximize regenerative impact
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-400/10 rounded-lg border border-emerald-400/30">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400 text-sm">247 Active Contracts</span>
        </div>
      </div>

      {/* Contract Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Value Locked', value: '$284.7M', change: '+12.4%' },
          { label: 'Contract Adaptations', value: '8,472', change: '+347 today' },
          { label: 'Execution Success', value: '99.4%', change: 'All-time high' },
          { label: 'Avg Response Time', value: '0.8s', change: 'Optimal' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
            <div className="text-emerald-300/70 text-sm mb-2">{stat.label}</div>
            <div className="text-white text-2xl mb-1">{stat.value}</div>
            <div className="text-emerald-400 text-xs">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Active Contracts */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
        <h2 className="text-white mb-4 flex items-center gap-2">
          <Workflow className="w-5 h-5 text-emerald-400" />
          Featured Living Contracts
        </h2>
        <div className="space-y-4">
          {activeContracts.map((contract) => (
            <div
              key={contract.id}
              className="bg-slate-800/50 border border-emerald-500/10 rounded-lg p-5 hover:border-emerald-400/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-white">{contract.name}</h3>
                    <div className="px-2 py-0.5 bg-emerald-400/10 rounded text-emerald-400 text-xs">
                      {contract.type}
                    </div>
                  </div>
                  <div className="text-emerald-300/70 text-sm font-mono">{contract.id}</div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-400/10 rounded border border-emerald-400/30">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 text-xs">{contract.status}</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded p-3 mb-4">
                <div className="text-emerald-300/50 text-xs mb-1">Adaptive Conditions</div>
                <div className="text-emerald-300 text-sm">{contract.conditions}</div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Total Value</div>
                  <div className="text-white">{contract.totalValue}</div>
                </div>
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Adaptations</div>
                  <div className="text-emerald-400">{contract.adaptations}</div>
                </div>
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Current Phase</div>
                  <div className="text-white text-sm">{contract.currentPhase}</div>
                </div>
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Success Rate</div>
                  <div className="text-emerald-400">{contract.executionRate}%</div>
                </div>
              </div>

              <div className="border-t border-emerald-500/10 pt-3">
                <div className="text-emerald-300/50 text-xs mb-2">Participants</div>
                <div className="flex flex-wrap gap-2">
                  {contract.participants.map((participant, idx) => (
                    <div key={idx} className="px-3 py-1 bg-emerald-400/5 rounded border border-emerald-500/20 text-emerald-300 text-xs">
                      {participant}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-emerald-300/70">
                <div className="flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  Last evolution: {contract.lastEvolution}
                </div>
                <button className="text-emerald-400 hover:text-emerald-300">View Contract Details →</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Evolution Triggers */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
        <h2 className="text-white mb-4">Contract Evolution Mechanisms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {evolutionTriggers.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-800/50 border border-emerald-500/10 rounded-lg p-4 hover:border-emerald-400/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <h3 className="text-white">{item.trigger}</h3>
              </div>
              <p className="text-emerald-300/70 text-sm mb-3">{item.description}</p>
              <div className="space-y-2">
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Use Cases</div>
                  <div className="text-emerald-300 text-sm">{item.useCases}</div>
                </div>
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Monitoring Frequency</div>
                  <div className="text-emerald-400 text-sm">{item.frequency}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contract Features */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
        <h2 className="text-white mb-4">Advanced Contract Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contractFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/50 border border-emerald-500/10 rounded-lg p-4 hover:border-emerald-400/30 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-emerald-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white">{item.feature}</h3>
                      <div className="px-2 py-0.5 bg-emerald-400/10 rounded text-emerald-400 text-xs">
                        {item.status}
                      </div>
                    </div>
                    <p className="text-emerald-300/70 text-sm mb-3">{item.description}</p>
                    <div className="flex items-center gap-4 text-xs">
                      {'incidents' in item && (
                        <div className="text-emerald-300/70">
                          Incidents: <span className="text-emerald-400">{item.incidents}</span>
                        </div>
                      )}
                      {'accuracy' in item && (
                        <div className="text-emerald-300/70">
                          Accuracy: <span className="text-emerald-400">{item.accuracy}%</span>
                        </div>
                      )}
                      {'predictions' in item && (
                        <div className="text-emerald-300/70">
                          Predictions: <span className="text-emerald-400">{item.predictions.toLocaleString()}</span>
                        </div>
                      )}
                      {'networks' in item && (
                        <div className="text-emerald-300/70">
                          Networks: <span className="text-emerald-400">{item.networks}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
