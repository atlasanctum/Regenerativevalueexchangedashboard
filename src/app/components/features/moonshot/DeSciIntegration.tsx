import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Microscope, FileText, Users, Award, DollarSign, GitBranch, BookOpen, TrendingUp } from 'lucide-react';

export function DeSciIntegration() {
  const research = [
    {
      id: 'research-1',
      title: 'Novel Mangrove Carbon Measurement Using LiDAR + ML',
      authors: 'Dr. Wei Chen, Dr. Maria Santos, 12 co-authors',
      institution: 'Singapore-Queensland Collaboration',
      status: 'Peer Review',
      bounty: '$25,000',
      upvotes: 347,
      citations: 0,
      impactScore: 94,
      fundingGoal: 50000,
      fundingCurrent: 38000,
      tags: ['Blue Carbon', 'LiDAR', 'Machine Learning']
    },
    {
      id: 'research-2',
      title: 'Optimizing Biodiversity Measurement Protocols for RVE',
      authors: 'Dr. Thomas Brooks, IUCN Research Team',
      institution: 'IUCN',
      status: 'Published',
      bounty: '$18,000',
      upvotes: 523,
      citations: 47,
      impactScore: 98,
      fundingGoal: 30000,
      fundingCurrent: 30000,
      tags: ['Biodiversity', 'Methodology', 'IUCN Standards']
    },
    {
      id: 'research-3',
      title: 'Traditional Fire Management: Quantifying Carbon & Biodiversity Benefits',
      authors: 'Victor Steffensen, Indigenous Science Collective',
      institution: 'Traditional Knowledge Institute',
      status: 'Peer Review',
      bounty: '$30,000',
      upvotes: 678,
      citations: 12,
      impactScore: 96,
      fundingGoal: 45000,
      fundingCurrent: 42000,
      tags: ['Indigenous Knowledge', 'Fire Management', 'Cultural Burning']
    }
  ];

  const bounties = [
    {
      title: 'Develop Open-Source Biodiversity Monitoring AI',
      reward: '$50,000 + RVE Tokens',
      deadline: '2026-09-30',
      applicants: 23,
      priority: 'High'
    },
    {
      title: 'Validate Soil Carbon Sequestration Claims Across 500 Projects',
      reward: '$35,000',
      deadline: '2026-07-15',
      applicants: 18,
      priority: 'Critical'
    },
    {
      title: 'Design Low-Cost IoT Sensors for Wetland Monitoring',
      reward: '$28,000',
      deadline: '2026-06-30',
      applicants: 34,
      priority: 'Medium'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Microscope className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-white mb-1">Decentralized Science (DeSci) Integration</h2>
            <p className="text-emerald-300/70">
              Open science, peer review marketplace, and research bounties
            </p>
          </div>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <FileText className="w-4 h-4 mr-2" />
          Submit Research
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-5 gap-4">
        {[
          { label: 'Published Papers', value: '147', icon: FileText },
          { label: 'Active Bounties', value: '$892K', icon: DollarSign },
          { label: 'Peer Reviewers', value: '234', icon: Users },
          { label: 'Total Citations', value: '1,847', icon: BookOpen },
          { label: 'Methodologies', value: '67', icon: GitBranch }
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-emerald-400 text-sm">{stat.label}</div>
                <Icon className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-white text-xl font-bold">{stat.value}</div>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Research Papers */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
            <h3 className="text-white mb-4">Latest Research</h3>
            <div className="space-y-4">
              {research.map((paper) => (
                <div key={paper.id} className="bg-slate-800/30 border border-emerald-500/20 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-2">{paper.title}</h4>
                      <div className="text-emerald-300/70 text-sm mb-1">{paper.authors}</div>
                      <div className="text-emerald-300/70 text-xs">{paper.institution}</div>
                    </div>
                    <Badge
                      variant="outline"
                      className={paper.status === 'Published' 
                        ? 'border-emerald-500/30 text-emerald-300'
                        : 'border-blue-500/30 text-blue-300'
                      }
                    >
                      {paper.status}
                    </Badge>
                  </div>

                  <div className="flex gap-2 flex-wrap mb-3">
                    {paper.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-emerald-500/20 text-emerald-300/70 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-4 gap-3 mb-3">
                    <div className="bg-emerald-400/10 rounded-lg p-2 text-center">
                      <div className="text-emerald-400 text-xs">Bounty</div>
                      <div className="text-white text-sm font-medium">{paper.bounty}</div>
                    </div>
                    <div className="bg-emerald-400/10 rounded-lg p-2 text-center">
                      <div className="text-emerald-400 text-xs">Upvotes</div>
                      <div className="text-white text-sm font-medium">{paper.upvotes}</div>
                    </div>
                    <div className="bg-emerald-400/10 rounded-lg p-2 text-center">
                      <div className="text-emerald-400 text-xs">Citations</div>
                      <div className="text-white text-sm font-medium">{paper.citations}</div>
                    </div>
                    <div className="bg-emerald-400/10 rounded-lg p-2 text-center">
                      <div className="text-emerald-400 text-xs">Impact</div>
                      <div className="text-white text-sm font-medium">{paper.impactScore}</div>
                    </div>
                  </div>

                  {paper.status === 'Peer Review' && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-emerald-300/70 mb-1">
                        <span>Funding Progress</span>
                        <span>${paper.fundingCurrent.toLocaleString()} / ${paper.fundingGoal.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-teal-500"
                          style={{ width: `${(paper.fundingCurrent / paper.fundingGoal) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
                      <FileText className="w-3 h-3 mr-2" />
                      Read Paper
                    </Button>
                    {paper.status === 'Peer Review' && (
                      <>
                        <Button size="sm" variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
                          <Users className="w-3 h-3 mr-2" />
                          Review
                        </Button>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                          Fund
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Research Bounties */}
        <div className="space-y-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
            <h3 className="text-white mb-4">Active Bounties</h3>
            <div className="space-y-3">
              {bounties.map((bounty, idx) => (
                <div key={`bounty-${idx}`} className="bg-slate-800/30 border border-emerald-500/20 rounded-lg p-4">
                  <Badge
                    variant="outline"
                    className={`mb-2 ${
                      bounty.priority === 'Critical'
                        ? 'border-rose-500/30 text-rose-300'
                        : bounty.priority === 'High'
                        ? 'border-amber-500/30 text-amber-300'
                        : 'border-blue-500/30 text-blue-300'
                    }`}
                  >
                    {bounty.priority} Priority
                  </Badge>
                  <h4 className="text-white font-medium text-sm mb-2">{bounty.title}</h4>
                  <div className="space-y-2 text-xs text-emerald-300/70">
                    <div className="flex justify-between">
                      <span>Reward</span>
                      <span className="text-emerald-400 font-medium">{bounty.reward}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Deadline</span>
                      <span className="text-white">{new Date(bounty.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Applicants</span>
                      <span className="text-white">{bounty.applicants}</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700">
                    Apply Now
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30 p-6">
            <Microscope className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-white mb-2">Open Science</h3>
            <p className="text-emerald-300/70 text-sm mb-4">
              All RVE-funded research is open access. Peer reviewers earn tokens. Novel methodologies get bounties. This is science accelerated.
            </p>
            <Button size="sm" variant="outline" className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-400/10">
              Join as Researcher
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
