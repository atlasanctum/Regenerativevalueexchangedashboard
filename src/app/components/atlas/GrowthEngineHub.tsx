import { useState } from 'react';
import { Rocket, Users, TrendingUp, Zap, Share2, Award, Target, Activity } from 'lucide-react';
import { Card } from '../ui/interactive/Card';
import { InteractiveChart } from '../ui/interactive/InteractiveChart';
import { motion } from 'motion/react';

export function GrowthEngineHub() {
  const [viralMetrics] = useState({
    totalReferrals: 8472,
    activeReferrers: 2847,
    referralRewards: 425000,
    networkMultiplier: 2.4,
    viralCoefficient: 1.8,
    avgReferralsPerUser: 3.2,
  });

  const [growthData] = useState([
    { month: 'Jan', users: 12847, projects: 284, volume: 47200000 },
    { month: 'Feb', users: 18472, projects: 412, volume: 68400000 },
    { month: 'Mar', users: 27284, projects: 589, volume: 94700000 },
    { month: 'Apr', users: 38912, projects: 782, volume: 128300000 },
    { month: 'May', users: 54287, projects: 1024, volume: 176800000 },
    { month: 'Jun', users: 74621, projects: 1347, volume: 237500000 },
  ]);

  const [contentGeneration] = useState([
    {
      id: 'CG-001',
      type: 'Impact Story',
      project: 'Amazon Conservation DAO',
      generated: '2h ago',
      engagement: 847,
      shares: 124,
      status: 'published',
    },
    {
      id: 'CG-002',
      type: 'Success Metric',
      project: 'Coral Reef Restoration',
      generated: '5h ago',
      engagement: 623,
      shares: 89,
      status: 'published',
    },
    {
      id: 'CG-003',
      type: 'Challenge Creation',
      project: 'Watershed Protection',
      generated: '8h ago',
      engagement: 1247,
      shares: 284,
      status: 'active',
    },
  ]);

  const [referralNetwork] = useState([
    { tier: 'Tier 1', users: 2847, avgReferrals: 8.4, rewards: 284700 },
    { tier: 'Tier 2', users: 5629, avgReferrals: 4.2, rewards: 168900 },
    { tier: 'Tier 3', users: 12482, avgReferrals: 2.1, rewards: 93600 },
    { tier: 'Tier 4', users: 24817, avgReferrals: 1.2, rewards: 44850 },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white flex items-center gap-3">
          <Rocket className="w-8 h-8 text-emerald-400" />
          Growth Engine
        </h1>
        <p className="text-emerald-300/70 mt-2">
          Autonomous outreach, viral mechanics, and AI-powered content generation
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Referrals', value: viralMetrics.totalReferrals.toLocaleString(), icon: Share2, color: 'emerald' },
          { label: 'Viral Coefficient', value: viralMetrics.viralCoefficient.toFixed(1), icon: TrendingUp, color: 'blue' },
          { label: 'Network Multiplier', value: `${viralMetrics.networkMultiplier.toFixed(1)}x`, icon: Zap, color: 'purple' },
          { label: 'Rewards Distributed', value: `${(viralMetrics.referralRewards / 1000).toFixed(0)}K RIU`, icon: Award, color: 'yellow' },
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

      {/* Growth Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InteractiveChart
          title="User Growth Trajectory"
          data={growthData}
          type="area"
          xAxisKey="month"
          dataKeys={[
            { key: 'users', color: '#10b981', name: 'Total Users' },
          ]}
          height={300}
        />

        <InteractiveChart
          title="Platform Volume Growth"
          data={growthData}
          type="bar"
          xAxisKey="month"
          dataKeys={[
            { key: 'volume', color: '#3b82f6', name: 'Volume (USD)' },
          ]}
          height={300}
        />
      </div>

      {/* Referral Network */}
      <Card hover={false}>
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-emerald-400" />
          Referral Network Performance
        </h3>
        <div className="space-y-4">
          {referralNetwork.map((tier, idx) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/30 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="text-white mb-1">{tier.tier}</div>
                  <div className="text-emerald-300/70 text-sm">{tier.users.toLocaleString()} active referrers</div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 text-xl mb-1">{tier.avgReferrals.toFixed(1)}</div>
                  <div className="text-emerald-300/70 text-xs">avg referrals</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Users</div>
                  <div className="text-white">{tier.users.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Avg Referrals</div>
                  <div className="text-emerald-400">{tier.avgReferrals}</div>
                </div>
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Rewards</div>
                  <div className="text-white">{(tier.rewards / 1000).toFixed(0)}K RIU</div>
                </div>
              </div>

              <div className="mt-3">
                <div className="w-full bg-slate-900/50 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(tier.avgReferrals / 8.4) * 100}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* AI Content Generation */}
      <Card hover={false}>
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          AI-Generated Content
        </h3>
        <div className="space-y-3">
          {contentGeneration.map((content, idx) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/30 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white text-sm">{content.type}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      content.status === 'published' ? 'bg-emerald-400/10 text-emerald-400' :
                      'bg-blue-400/10 text-blue-400'
                    }`}>
                      {content.status}
                    </span>
                  </div>
                  <div className="text-emerald-300/70 text-sm">{content.project}</div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-300/50 text-xs mb-1">Generated</div>
                  <div className="text-white text-sm">{content.generated}</div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span className="text-emerald-300/70">Engagement:</span>
                  <span className="text-white">{content.engagement}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300/70">Shares:</span>
                  <span className="text-white">{content.shares}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Growth Strategies */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card hover={false}>
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-5 h-5 text-emerald-400" />
            <h4 className="text-white">Viral Mechanics</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Project Referral</span>
              <span className="text-emerald-400">150 RIU</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Investor Referral</span>
              <span className="text-emerald-400">50 RIU</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Network Effect</span>
              <span className="text-white">Quadratic</span>
            </div>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h4 className="text-white">Content Automation</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Stories Generated</span>
              <span className="text-white">1,247/day</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Challenges Created</span>
              <span className="text-white">84/week</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Avg Engagement</span>
              <span className="text-yellow-400">847</span>
            </div>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-5 h-5 text-blue-400" />
            <h4 className="text-white">Expansion Targets</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-emerald-300/70">New Regions</span>
              <span className="text-white">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Impact Types</span>
              <span className="text-white">6</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Growth Rate</span>
              <span className="text-blue-400">+42%/month</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
