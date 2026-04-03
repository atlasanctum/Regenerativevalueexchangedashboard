import { Bot, Zap, Activity, Shield, TrendingUp, Settings } from 'lucide-react';

export function AutonomousOperations() {
  const automations = [
    {
      name: 'Auto Rebalancing',
      description: 'Portfolio automatically rebalances based on target allocation',
      status: 'Active',
      executions: '2,847',
      savings: '$124k',
    },
    {
      name: 'Yield Optimization',
      description: 'Automatically moves funds to highest-yield opportunities',
      status: 'Active',
      executions: '1,234',
      savings: '$89k',
    },
    {
      name: 'Risk Management',
      description: 'Auto-hedges positions when volatility exceeds thresholds',
      status: 'Active',
      executions: '456',
      savings: '$67k',
    },
    {
      name: 'Tax Loss Harvesting',
      description: 'Automatically realizes losses to offset capital gains',
      status: 'Active',
      executions: '789',
      savings: '$45k',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          Decentralized Autonomous Operations
        </h1>
        <p className="text-emerald-300/70 mt-2">AI-powered automation for portfolio management and operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Automations', value: '24', icon: Bot },
          { label: 'Total Executions', value: '5.3k', icon: Zap },
          { label: 'Cost Savings', value: '$325k', icon: TrendingUp },
          { label: 'Success Rate', value: '99.8%', icon: Shield },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-4">
            <stat.icon className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-2xl text-white mb-1">{stat.value}</div>
            <div className="text-emerald-300/70 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {automations.map((auto, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-white">{auto.name}</h3>
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs border border-emerald-500/30">
                    {auto.status}
                  </span>
                </div>
                <p className="text-emerald-300/70 text-sm">{auto.description}</p>
              </div>
              <button className="p-2 text-emerald-300/70 hover:text-emerald-300 transition-all">
                <Settings className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald-500/10">
              <div>
                <div className="text-emerald-300/70 text-sm mb-1">Executions</div>
                <div className="text-white text-xl">{auto.executions}</div>
              </div>
              <div>
                <div className="text-emerald-300/70 text-sm mb-1">Savings</div>
                <div className="text-emerald-400 text-xl">{auto.savings}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Activity className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-white mb-2">Smart Automation Engine</h4>
            <p className="text-emerald-300/70 text-sm mb-4">
              Our AI-powered automation engine monitors your portfolio 24/7, executing optimal strategies 
              based on market conditions, your risk profile, and regenerative impact goals. All automations 
              are fully transparent and can be customized or paused at any time.
            </p>
            <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all">
              Configure Automations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
