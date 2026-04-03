import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Award, TrendingUp, Shield, Users, Heart, Target, Star, Zap, Lock, Unlock } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function RegenerativeCreditScore() {
  const userScore = {
    overall: 847,
    max: 1000,
    rank: 'Platinum Regenerator',
    percentile: 94,
    components: {
      verifiedImpact: { score: 180, max: 200, weight: 20 },
      governanceParticipation: { score: 142, max: 150, weight: 15 },
      communityFeedback: { score: 135, max: 150, weight: 15 },
      longTermCommitment: { score: 165, max: 200, weight: 20 },
      transparency: { score: 118, max: 150, weight: 15 },
      ecosystemContribution: { score: 107, max: 150, weight: 15 }
    },
    benefits: [
      { name: 'Priority Access', description: 'Early access to new asset classes', unlocked: true },
      { name: 'Preferential Pricing', description: '8% discount on all purchases', unlocked: true },
      { name: 'Governance Rights', description: '2.5x voting weight in proposals', unlocked: true },
      { name: 'Partnership Priority', description: 'Direct access to project developers', unlocked: true },
      { name: 'Media Recognition', description: 'Featured in RVE Impact Reports', unlocked: true },
      { name: 'Oracle Participation', description: 'Eligible to become verification oracle', unlocked: false }
    ],
    history: [
      { date: 'Mar 2026', score: 847 },
      { date: 'Feb 2026', score: 812 },
      { date: 'Jan 2026', score: 789 },
      { date: 'Dec 2025', score: 756 },
      { date: 'Nov 2025', score: 723 },
      { date: 'Oct 2025', score: 695 }
    ]
  };

  const leaderboard = [
    { rank: 1, entity: 'Patagonia Inc.', score: 967, badge: 'Diamond', impactDelivered: '2.4M tons CO2' },
    { rank: 2, entity: 'Indigenous Carbon Coalition', score: 934, badge: 'Diamond', impactDelivered: '1.8M tons CO2' },
    { rank: 3, entity: 'Microsoft Sustainability', score: 912, badge: 'Diamond', impactDelivered: '3.1M tons CO2' },
    { rank: 4, entity: 'Regenerative Capital DAO', score: 889, badge: 'Platinum', impactDelivered: '890K tons CO2' },
    { rank: 5, entity: 'You', score: 847, badge: 'Platinum', impactDelivered: '456K tons CO2' },
    { rank: 6, entity: 'Amazon Conservation', score: 823, badge: 'Platinum', impactDelivered: '1.2M tons CO2' }
  ];

  const scoreRanges = [
    { range: '900-1000', tier: 'Diamond', color: '#a78bfa', benefits: 'All benefits + Oracle eligibility + Custom partnerships' },
    { range: '750-899', tier: 'Platinum', color: '#10b981', benefits: 'Governance rights + Pricing discounts + Partnership priority' },
    { range: '600-749', tier: 'Gold', color: '#f59e0b', benefits: 'Preferential pricing + Governance participation' },
    { range: '400-599', tier: 'Silver', color: '#94a3b8', benefits: 'Basic governance rights + Community access' },
    { range: '0-399', tier: 'Bronze', color: '#cd7f32', benefits: 'Standard platform access' }
  ];

  const radialData = [{ name: 'Score', value: (userScore.overall / userScore.max) * 100, fill: '#10b981' }];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
            <Award className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-white mb-1">Regenerative Credit Score</h2>
            <p className="text-emerald-300/70">
              Your holistic regenerative contribution metric
            </p>
          </div>
        </div>
        <Badge variant="outline" className="border-emerald-500/30 text-emerald-300 px-4 py-2">
          <Star className="w-4 h-4 mr-2" />
          {userScore.rank}
        </Badge>
      </div>

      {/* Main Score Display */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Score Visualization */}
        <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
          <div className="text-center space-y-4">
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="60%" 
                outerRadius="90%" 
                data={radialData}
                startAngle={180}
                endAngle={0}
              >
                <RadialBar
                  background
                  dataKey="value"
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-5xl font-bold text-white">{userScore.overall}</div>
              <div className="text-emerald-300/70 text-sm">out of {userScore.max}</div>
            </div>
            <div className="pt-8">
              <div className="text-white font-medium mb-1">{userScore.rank}</div>
              <div className="text-emerald-300/70 text-sm">
                Top {100 - userScore.percentile}% of all participants
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm">+35 points this month</span>
            </div>
          </div>
        </Card>

        {/* Score Components */}
        <Card className="lg:col-span-2 bg-slate-900/50 border-emerald-500/20 p-6">
          <h3 className="text-white mb-4">Score Breakdown</h3>
          <div className="space-y-4">
            {Object.entries(userScore.components).map(([key, data]) => {
              const percentage = (data.score / data.max) * 100;
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="text-white font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <Badge variant="outline" className="border-emerald-500/20 text-emerald-300 text-xs">
                        {data.weight}% weight
                      </Badge>
                    </div>
                    <div className="text-emerald-400 font-medium">
                      {data.score} / {data.max}
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Benefits Grid */}
      <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Your Benefits & Unlocks</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {userScore.benefits.map((benefit, idx) => (
            <div
              key={`benefit-${idx}`}
              className={`border rounded-lg p-4 ${
                benefit.unlocked
                  ? 'bg-emerald-400/10 border-emerald-500/30'
                  : 'bg-slate-800/30 border-slate-700/30 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="text-white font-medium">{benefit.name}</div>
                {benefit.unlocked ? (
                  <Unlock className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Lock className="w-5 h-5 text-slate-500" />
                )}
              </div>
              <p className="text-emerald-300/70 text-sm">{benefit.description}</p>
              {!benefit.unlocked && (
                <div className="mt-2 text-amber-300 text-xs">
                  Requires 900+ score
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Score Tiers */}
      <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Credit Score Tiers</h3>
        <div className="space-y-3">
          {scoreRanges.map((tier, idx) => (
            <div
              key={`tier-${idx}`}
              className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: tier.color }}
              >
                <Star className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <div className="text-white font-medium">{tier.tier}</div>
                  <div className="text-emerald-300/70 text-sm">{tier.range} points</div>
                </div>
                <div className="text-emerald-300/70 text-sm">{tier.benefits}</div>
              </div>
              {userScore.overall >= parseInt(tier.range.split('-')[0]) && (
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-300">
                  <Zap className="w-3 h-3 mr-1" />
                  Your Tier
                </Badge>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Leaderboard */}
      <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Global Leaderboard</h3>
        <div className="space-y-2">
          {leaderboard.map((entry, idx) => (
            <div
              key={`leader-${idx}`}
              className={`flex items-center gap-4 p-4 rounded-lg ${
                entry.entity === 'You'
                  ? 'bg-emerald-400/10 border-2 border-emerald-500/30'
                  : 'bg-slate-800/30'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${
                entry.rank === 1 ? 'bg-amber-500' : entry.rank === 2 ? 'bg-slate-400' : entry.rank === 3 ? 'bg-orange-600' : 'bg-slate-700'
              }`}>
                #{entry.rank}
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">{entry.entity}</div>
                <div className="text-emerald-300/70 text-sm">{entry.impactDelivered}</div>
              </div>
              <Badge
                variant="outline"
                className="border-emerald-500/30 text-emerald-300"
              >
                {entry.badge}
              </Badge>
              <div className="text-white font-bold text-lg">{entry.score}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
