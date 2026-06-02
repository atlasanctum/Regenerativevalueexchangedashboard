import { useState } from 'react';
import { Award, TrendingUp, Users, Star, Target, Activity } from 'lucide-react';
import { Card } from '../ui/interactive/Card';
import { Modal } from '../ui/interactive/Modal';
import { InteractiveChart } from '../ui/interactive/InteractiveChart';
import { motion } from 'motion/react';

interface StakeholderReputation {
  id: string;
  name: string;
  type: 'project' | 'investor' | 'verifier' | 'governor';
  overallScore: number;
  contextScores: {
    dataQuality?: number;
    consistency?: number;
    impactDelivery?: number;
    communityEngagement?: number;
    tradingBehavior?: number;
    governanceParticipation?: number;
    stakingDuration?: number;
    accuracy?: number;
    responseTime?: number;
    consensusAlignment?: number;
    proposalQuality?: number;
    votingConsistency?: number;
  };
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  trend: 'up' | 'stable' | 'down';
  recentActivity: string;
}

export function ReputationEngine() {
  const [stakeholders, setStakeholders] = useState<StakeholderReputation[]>([
    {
      id: 'PRJ-847',
      name: 'Amazon Conservation DAO',
      type: 'project',
      overallScore: 96,
      contextScores: {
        dataQuality: 98,
        consistency: 97,
        impactDelivery: 94,
        communityEngagement: 95,
      },
      tier: 'diamond',
      trend: 'up',
      recentActivity: 'Submitted verified impact data 2h ago',
    },
    {
      id: 'INV-2847',
      name: 'Regenerative Capital Partners',
      type: 'investor',
      overallScore: 89,
      contextScores: {
        tradingBehavior: 92,
        governanceParticipation: 88,
        stakingDuration: 87,
      },
      tier: 'platinum',
      trend: 'stable',
      recentActivity: 'Voted on governance proposal 1d ago',
    },
    {
      id: 'VER-128',
      name: 'Oracle Node Alpha',
      type: 'verifier',
      overallScore: 99,
      contextScores: {
        accuracy: 99,
        responseTime: 98,
        consensusAlignment: 100,
      },
      tier: 'diamond',
      trend: 'up',
      recentActivity: 'Verified 247 impact claims 3h ago',
    },
    {
      id: 'GOV-482',
      name: 'Impact Governance Alliance',
      type: 'governor',
      overallScore: 94,
      contextScores: {
        proposalQuality: 96,
        votingConsistency: 93,
        communityEngagement: 93,
      },
      tier: 'platinum',
      trend: 'stable',
      recentActivity: 'Submitted protocol improvement proposal 12h ago',
    },
  ]);

  const [selectedStakeholder, setSelectedStakeholder] = useState<StakeholderReputation | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [reputationTrends] = useState([
    { month: 'Jan', projects: 87, investors: 84, verifiers: 96, governors: 91 },
    { month: 'Feb', projects: 89, investors: 86, verifiers: 97, governors: 92 },
    { month: 'Mar', projects: 91, investors: 88, verifiers: 97, governors: 93 },
    { month: 'Apr', projects: 92, investors: 89, verifiers: 98, governors: 94 },
    { month: 'May', projects: 94, investors: 90, verifiers: 98, governors: 94 },
    { month: 'Jun', projects: 96, investors: 91, verifiers: 99, governors: 95 },
  ]);

  const tierColors = {
    bronze: { bg: 'bg-orange-600/20', text: 'text-orange-400', border: 'border-orange-400/30' },
    silver: { bg: 'bg-gray-400/20', text: 'text-gray-300', border: 'border-gray-400/30' },
    gold: { bg: 'bg-yellow-400/20', text: 'text-yellow-400', border: 'border-yellow-400/30' },
    platinum: { bg: 'bg-cyan-400/20', text: 'text-cyan-400', border: 'border-cyan-400/30' },
    diamond: { bg: 'bg-purple-400/20', text: 'text-purple-400', border: 'border-purple-400/30' },
  };

  const typeIcons = {
    project: Target,
    investor: Star,
    verifier: Award,
    governor: Users,
  };

  const handleViewStakeholder = (stakeholder: StakeholderReputation) => {
    setSelectedStakeholder(stakeholder);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white flex items-center gap-3">
          <Award className="w-8 h-8 text-emerald-400" />
          Reputation Engine
        </h1>
        <p className="text-emerald-300/70 mt-2">
          Dynamic, contextual trust scoring across all stakeholder interactions
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Reputation', value: '92.4', icon: Star, color: 'emerald' },
          { label: 'Diamond Tier', value: '284', icon: Award, color: 'purple' },
          { label: 'Daily Updates', value: '8,472', icon: Activity, color: 'blue' },
          { label: 'Trend', value: '+4.2%', icon: TrendingUp, color: 'emerald' },
        ].map((metric, idx) => {
          const Icon = metric.icon;
          const iconColor =
            metric.color === 'emerald' ? 'text-emerald-400 bg-emerald-400/20' :
            metric.color === 'purple' ? 'text-purple-400 bg-purple-400/20' :
            'text-blue-400 bg-blue-400/20';

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

      {/* Stakeholder Leaderboard */}
      <Card hover={false}>
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          Top Reputation Scores
        </h3>
        <div className="space-y-4">
          {stakeholders.sort((a, b) => b.overallScore - a.overallScore).map((stakeholder, idx) => {
            const colors = tierColors[stakeholder.tier];
            const Icon = typeIcons[stakeholder.type];

            return (
              <motion.div
                key={stakeholder.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-800/30 rounded-lg p-4 hover:bg-slate-800/50 transition-all cursor-pointer"
                onClick={() => handleViewStakeholder(stakeholder)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 bg-emerald-400/10 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white">{stakeholder.name}</h4>
                        <span className={`px-2 py-0.5 ${colors.bg} ${colors.text} rounded text-xs border ${colors.border} capitalize`}>
                          {stakeholder.tier}
                        </span>
                        {stakeholder.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                        ) : stakeholder.trend === 'down' ? (
                          <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />
                        ) : (
                          <div className="w-4 h-1 bg-gray-400 rounded" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-emerald-300/70 font-mono">{stakeholder.id}</span>
                        <span className="text-emerald-300/50 capitalize">{stakeholder.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-3xl mb-1">{stakeholder.overallScore}</div>
                    <div className="text-emerald-300/70 text-xs">Overall Score</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                  {Object.entries(stakeholder.contextScores).slice(0, 4).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-emerald-300/50 text-xs mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      <div className="text-emerald-400">{value}/100</div>
                    </div>
                  ))}
                </div>

                <div className="text-emerald-300/70 text-xs">{stakeholder.recentActivity}</div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Reputation Trends */}
      <InteractiveChart
        title="Reputation Trends by Stakeholder Type"
        data={reputationTrends}
        type="line"
        xAxisKey="month"
        dataKeys={[
          { key: 'projects', color: '#10b981', name: 'Projects' },
          { key: 'investors', color: '#3b82f6', name: 'Investors' },
          { key: 'verifiers', color: '#8b5cf6', name: 'Verifiers' },
          { key: 'governors', color: '#f59e0b', name: 'Governors' },
        ]}
        height={300}
      />

      {/* Reputation Benefits */}
      <Card hover={false}>
        <h3 className="text-white mb-4">Reputation Benefits by Tier</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { tier: 'diamond', benefits: ['Lowest collateral', 'Priority deals', 'Governance weight', 'Fee discounts'] },
            { tier: 'platinum', benefits: ['Reduced collateral', 'Fast-track deals', 'Enhanced voting', 'Fee rebates'] },
            { tier: 'gold', benefits: ['Standard collateral', 'Regular deals', 'Standard voting', 'Base fees'] },
            { tier: 'silver', benefits: ['Higher collateral', 'Queue priority', 'Limited voting', 'Standard fees'] },
            { tier: 'bronze', benefits: ['Max collateral', 'Standard queue', 'Basic voting', 'Full fees'] },
          ].map((item, idx) => {
            const colors = tierColors[item.tier as keyof typeof tierColors];
            return (
              <motion.div
                key={item.tier}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-800/30 rounded-lg p-4"
              >
                <div className={`px-3 py-2 ${colors.bg} ${colors.text} rounded border ${colors.border} text-center text-sm mb-3 capitalize`}>
                  {item.tier}
                </div>
                <ul className="space-y-2 text-xs text-emerald-300/70">
                  {item.benefits.map((benefit, bidx) => (
                    <li key={bidx} className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Stakeholder Details Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedStakeholder?.name || ''}
        size="lg"
      >
        {selectedStakeholder && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-emerald-300/50 text-sm mb-1">Overall Score</div>
                <div className="text-white text-3xl">{selectedStakeholder.overallScore}/100</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-emerald-300/50 text-sm mb-1">Tier</div>
                <div className="text-white text-3xl capitalize">{selectedStakeholder.tier}</div>
              </div>
            </div>

            <div>
              <h4 className="text-white mb-3">Context-Specific Scores</h4>
              <div className="space-y-3">
                {Object.entries(selectedStakeholder.contextScores).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-emerald-300/70 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-emerald-400">{value}/100</span>
                    </div>
                    <div className="w-full bg-slate-900/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white mb-3">Recent Activity</h4>
              <div className="bg-slate-800/30 rounded p-4 text-emerald-300 text-sm">
                {selectedStakeholder.recentActivity}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
