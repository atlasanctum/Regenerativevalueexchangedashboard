import { Vote, Users, Shield, TrendingUp, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export function AdvancedGovernance() {
  const proposals = [
    {
      id: 'RVP-124',
      title: 'Quadratic Voting for High-Impact Projects',
      description: 'Implement quadratic voting mechanism to reduce whale influence',
      status: 'active',
      votes: { for: 15847, against: 2341, abstain: 892 },
      quorum: 85,
      timeLeft: '2 days',
    },
    {
      id: 'RVP-123',
      title: 'Conviction Voting for Treasury Allocation',
      description: 'Gradual increase of voting power based on token lock time',
      status: 'passed',
      votes: { for: 28934, against: 4123, abstain: 1247 },
      quorum: 100,
      timeLeft: 'Ended',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Vote className="w-6 h-6 text-white" />
          </div>
          Advanced Governance
        </h1>
        <p className="text-emerald-300/70 mt-2">Quadratic, conviction, and delegated voting mechanisms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Proposals', value: '12', icon: Vote, change: '+3 this week' },
          { label: 'Voting Power', value: '24.7k', icon: Shield, change: 'Your tokens' },
          { label: 'Participation', value: '67.3%', icon: Users, change: '+12.4%' },
          { label: 'Delegations', value: '3,847', icon: TrendingUp, change: '+23.1%' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-4">
            <stat.icon className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-2xl text-white mb-1">{stat.value}</div>
            <div className="text-emerald-300/70 text-sm mb-1">{stat.label}</div>
            <div className="text-emerald-400 text-xs">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-emerald-300/50 text-sm">{proposal.id}</span>
                  <span className={`px-2 py-1 rounded text-xs border ${
                    proposal.status === 'active'
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  }`}>
                    {proposal.status.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-white text-xl mb-2">{proposal.title}</h3>
                <p className="text-emerald-300/70">{proposal.description}</p>
              </div>
              <div className="flex items-center gap-2 text-emerald-300/70">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{proposal.timeLeft}</span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-emerald-300/70">For: {proposal.votes.for.toLocaleString()}</span>
                  <span className="text-emerald-400">{Math.round((proposal.votes.for / (proposal.votes.for + proposal.votes.against + proposal.votes.abstain)) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                    style={{ width: `${(proposal.votes.for / (proposal.votes.for + proposal.votes.against + proposal.votes.abstain)) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-emerald-300/70">Against: {proposal.votes.against.toLocaleString()}</span>
                  <span className="text-red-400">{Math.round((proposal.votes.against / (proposal.votes.for + proposal.votes.against + proposal.votes.abstain)) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                    style={{ width: `${(proposal.votes.against / (proposal.votes.for + proposal.votes.against + proposal.votes.abstain)) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm pt-2 border-t border-emerald-500/10">
                <span className="text-emerald-300/70">Quorum Progress</span>
                <span className={proposal.quorum >= 100 ? 'text-emerald-400' : 'text-yellow-400'}>
                  {proposal.quorum}%
                </span>
              </div>
            </div>

            {proposal.status === 'active' && (
              <div className="grid grid-cols-3 gap-3">
                <button className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/30 transition-all">
                  Vote For
                </button>
                <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-all">
                  Vote Against
                </button>
                <button className="px-4 py-2 bg-slate-700/50 text-emerald-300/70 rounded-lg border border-emerald-500/20 hover:bg-slate-700 transition-all">
                  Abstain
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
