import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Trophy, Target, Users, Calendar, TrendingUp, Zap, Award, Clock } from 'lucide-react';

export function ImpactChallenges() {
  const challenges = [
    {
      id: 'challenge-1',
      title: 'Restore 1,000 Hectares by Q3 2026',
      description: 'Global challenge to accelerate mangrove and coastal wetland restoration',
      goal: 1000,
      current: 687,
      unit: 'hectares',
      funders: 23,
      totalFunding: 4200000,
      deadline: '2026-09-30',
      status: 'active',
      reward: '$50,000 prize pool',
      participants: 89,
      projects: 12,
      impact: {
        co2: '156,000 tons',
        biodiversity: '+34%',
        livelihoods: '2,340 families'
      }
    },
    {
      id: 'challenge-2',
      title: 'Indigenous Knowledge Documentation Sprint',
      description: 'Document and tokenize 100 traditional ecological knowledge systems',
      goal: 100,
      current: 43,
      unit: 'knowledge systems',
      funders: 8,
      totalFunding: 800000,
      deadline: '2026-12-31',
      status: 'active',
      reward: '$25,000 + NFT certificates',
      participants: 34,
      projects: 43,
      impact: {
        communities: '43 indigenous groups',
        languages: '28 languages',
        practices: '1,200+ documented'
      }
    },
    {
      id: 'challenge-3',
      title: 'Urban Biodiversity Surge',
      description: 'Create 50 urban biodiversity hotspots in major cities',
      goal: 50,
      current: 31,
      unit: 'sites',
      funders: 15,
      totalFunding: 2100000,
      deadline: '2026-06-30',
      status: 'active',
      reward: '$35,000 + Media coverage',
      participants: 67,
      projects: 31,
      impact: {
        species: '2,400+ species',
        greenSpace: '124 hectares',
        visitors: '890,000/year'
      }
    },
    {
      id: 'challenge-4',
      title: 'Coral Reef Regeneration Race',
      description: 'Successfully restore degraded coral reefs using proven techniques',
      goal: 25,
      current: 25,
      unit: 'reef sites',
      funders: 12,
      totalFunding: 3500000,
      deadline: '2026-02-28',
      status: 'completed',
      reward: '$60,000 distributed',
      participants: 45,
      projects: 25,
      impact: {
        coralCoverage: '+68%',
        fishSpecies: '+142%',
        tourism: '$12M revenue'
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Impact Challenges</h2>
          <p className="text-emerald-300/70">
            Gamified campaigns to accelerate regenerative impact
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Trophy className="w-4 h-4 mr-2" />
          Create Challenge
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'Active Challenges', value: '23', icon: Zap, color: 'emerald' },
          { label: 'Total Funding', value: '$18.4M', icon: TrendingUp, color: 'blue' },
          { label: 'Participants', value: '1,247', icon: Users, color: 'purple' },
          { label: 'Completed', value: '67', icon: Award, color: 'amber' }
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`text-${stat.color}-400 text-sm`}>{stat.label}</div>
                <Icon className={`w-5 h-5 text-${stat.color}-400`} />
              </div>
              <div className="text-white text-2xl font-bold">{stat.value}</div>
            </Card>
          );
        })}
      </div>

      {/* Challenges */}
      <div className="grid gap-6">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className={`bg-slate-900/50 border-emerald-500/20 overflow-hidden ${challenge.status === 'completed' ? 'opacity-75' : ''}`}>
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className={challenge.status === 'completed' 
                        ? 'border-amber-500/30 text-amber-300'
                        : 'border-emerald-500/30 text-emerald-300'
                      }
                    >
                      {challenge.status === 'completed' ? (
                        <>
                          <Award className="w-3 h-3 mr-1" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Zap className="w-3 h-3 mr-1" />
                          Active
                        </>
                      )}
                    </Badge>
                    <div className="flex items-center gap-1 text-emerald-300/70 text-sm">
                      <Clock className="w-4 h-4" />
                      Ends {new Date(challenge.deadline).toLocaleDateString()}
                    </div>
                  </div>
                  <h3 className="text-white mb-2">{challenge.title}</h3>
                  <p className="text-emerald-300/70">{challenge.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-amber-400 text-sm mb-1">Reward Pool</div>
                  <div className="text-white font-medium">{challenge.reward}</div>
                </div>
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-emerald-300/70 text-sm">
                    Progress: {challenge.current} / {challenge.goal} {challenge.unit}
                  </div>
                  <div className="text-emerald-400 font-medium">
                    {Math.round((challenge.current / challenge.goal) * 100)}%
                  </div>
                </div>
                <Progress 
                  value={(challenge.current / challenge.goal) * 100} 
                  className="h-3 bg-slate-800"
                />
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-emerald-400/10 border border-emerald-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm mb-1">
                    <Users className="w-4 h-4" />
                    Funders
                  </div>
                  <div className="text-white font-medium">{challenge.funders}</div>
                </div>
                <div className="bg-emerald-400/10 border border-emerald-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm mb-1">
                    <TrendingUp className="w-4 h-4" />
                    Funding
                  </div>
                  <div className="text-white font-medium">
                    ${(challenge.totalFunding / 1000000).toFixed(1)}M
                  </div>
                </div>
                <div className="bg-emerald-400/10 border border-emerald-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm mb-1">
                    <Users className="w-4 h-4" />
                    Participants
                  </div>
                  <div className="text-white font-medium">{challenge.participants}</div>
                </div>
                <div className="bg-emerald-400/10 border border-emerald-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm mb-1">
                    <Target className="w-4 h-4" />
                    Projects
                  </div>
                  <div className="text-white font-medium">{challenge.projects}</div>
                </div>
              </div>

              {/* Impact */}
              <div className="border-t border-emerald-500/20 pt-4">
                <div className="text-emerald-300/70 text-sm mb-3">Total Impact Generated</div>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(challenge.impact).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-white font-medium">{value}</div>
                      <div className="text-emerald-300/70 text-sm capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {challenge.status === 'active' ? (
                  <>
                    <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                      Join Challenge
                    </Button>
                    <Button variant="outline" className="flex-1 border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
                      Fund This Challenge
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" className="w-full border-amber-500/30 text-amber-300 hover:bg-amber-400/10">
                    <Award className="w-4 h-4 mr-2" />
                    View Winners & Results
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
