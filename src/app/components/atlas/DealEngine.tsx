import { useState, useEffect } from 'react';
import { Briefcase, TrendingUp, DollarSign, Shield, Zap, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card } from '../ui/interactive/Card';
import { Modal } from '../ui/interactive/Modal';
import { motion } from 'motion/react';

interface Deal {
  id: string;
  projectName: string;
  projectId: string;
  dealType: 'carbon_financing' | 'biodiversity_bond' | 'water_rights' | 'social_impact';
  amount: number;
  collateralRatio: number;
  trustScore: number;
  riskScore: number;
  status: 'recommended' | 'structuring' | 'deployed' | 'active' | 'completed';
  aiConfidence: number;
  deploymentStrategy: string;
  expectedROI: number;
  timeline: string;
  milestones: number;
  autoDeployed: boolean;
}

export function DealEngine() {
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: 'DEAL-2847',
      projectName: 'Amazon Rainforest Conservation',
      projectId: 'PRJ-847',
      dealType: 'carbon_financing',
      amount: 2400000,
      collateralRatio: 1.2,
      trustScore: 94,
      riskScore: 2.1,
      status: 'deployed',
      aiConfidence: 96,
      deploymentStrategy: 'Tiered disbursement based on verified carbon sequestration',
      expectedROI: 18.4,
      timeline: '24 months',
      milestones: 8,
      autoDeployed: true,
    },
    {
      id: 'DEAL-2848',
      projectName: 'Coral Reef Restoration Initiative',
      projectId: 'PRJ-923',
      dealType: 'biodiversity_bond',
      amount: 1800000,
      collateralRatio: 1.5,
      trustScore: 89,
      riskScore: 3.2,
      status: 'structuring',
      aiConfidence: 92,
      deploymentStrategy: 'Performance-based with satellite verification milestones',
      expectedROI: 15.2,
      timeline: '36 months',
      milestones: 12,
      autoDeployed: false,
    },
    {
      id: 'DEAL-2849',
      projectName: 'Regenerative Agriculture Network',
      projectId: 'PRJ-1204',
      dealType: 'carbon_financing',
      amount: 850000,
      collateralRatio: 1.1,
      trustScore: 96,
      riskScore: 1.8,
      status: 'recommended',
      aiConfidence: 98,
      deploymentStrategy: 'Dynamic collateral with soil health verification',
      expectedROI: 22.1,
      timeline: '18 months',
      milestones: 6,
      autoDeployed: false,
    },
  ]);

  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [aiRecommendations, setAiRecommendations] = useState([
    {
      id: 'REC-001',
      message: 'High-trust project PRJ-1204 ready for autonomous deployment',
      action: 'Deploy $850K carbon financing deal',
      confidence: 98,
      timeAgo: '5 min ago',
    },
    {
      id: 'REC-002',
      message: 'Market conditions favorable for biodiversity bonds',
      action: 'Increase allocation by 15%',
      confidence: 87,
      timeAgo: '12 min ago',
    },
    {
      id: 'REC-003',
      message: 'Treasury capacity available for new deployments',
      action: 'Review 3 queued high-trust projects',
      confidence: 94,
      timeAgo: '28 min ago',
    },
  ]);

  const [pipelineMetrics] = useState({
    totalDealsManaged: 247,
    activeDeals: 84,
    totalValueDeployed: 284700000,
    avgDealSize: 2847000,
    autonomousDeploymentRate: 78,
    successRate: 96.4,
  });

  const handleViewDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    setShowModal(true);
  };

  const dealTypeColors = {
    carbon_financing: { bg: 'bg-emerald-400/10', text: 'text-emerald-400', border: 'border-emerald-400/30' },
    biodiversity_bond: { bg: 'bg-blue-400/10', text: 'text-blue-400', border: 'border-blue-400/30' },
    water_rights: { bg: 'bg-cyan-400/10', text: 'text-cyan-400', border: 'border-cyan-400/30' },
    social_impact: { bg: 'bg-purple-400/10', text: 'text-purple-400', border: 'border-purple-400/30' },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-emerald-400" />
          Deal Engine
        </h1>
        <p className="text-emerald-300/70 mt-2">
          Autonomous AI-powered deal structuring and deployment for regenerative projects
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Value Deployed', value: `$${(pipelineMetrics.totalValueDeployed / 1000000).toFixed(1)}M`, icon: DollarSign, color: 'emerald' },
          { label: 'Active Deals', value: pipelineMetrics.activeDeals, icon: Briefcase, color: 'blue' },
          { label: 'Autonomous Rate', value: `${pipelineMetrics.autonomousDeploymentRate}%`, icon: Zap, color: 'purple' },
          { label: 'Success Rate', value: `${pipelineMetrics.successRate}%`, icon: TrendingUp, color: 'emerald' },
        ].map((metric, idx) => {
          const Icon = metric.icon;
          const iconColor =
            metric.color === 'emerald' ? 'text-emerald-400 bg-emerald-400/20' :
            metric.color === 'blue' ? 'text-blue-400 bg-blue-400/20' :
            'text-purple-400 bg-purple-400/20';

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

      {/* AI Recommendations */}
      <Card hover={false}>
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          AI-Powered Recommendations
        </h3>
        <div className="space-y-3">
          {aiRecommendations.map((rec, idx) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/30 rounded-lg p-4 border-l-4 border-yellow-400"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="text-white text-sm mb-1">{rec.message}</div>
                  <div className="text-emerald-400 text-sm">{rec.action}</div>
                </div>
                <div className="text-right">
                  <div className="text-yellow-400 text-xs mb-1">{rec.confidence}% confident</div>
                  <div className="text-emerald-300/50 text-xs">{rec.timeAgo}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Deal Pipeline */}
      <Card hover={false}>
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-emerald-400" />
          Active Deal Pipeline
        </h3>
        <div className="space-y-4">
          {deals.map((deal, idx) => {
            const colors = dealTypeColors[deal.dealType];
            return (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-800/30 rounded-lg p-5 hover:bg-slate-800/50 transition-all cursor-pointer"
                onClick={() => handleViewDeal(deal)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-white">{deal.projectName}</h4>
                      {deal.autoDeployed && (
                        <div className="px-2 py-0.5 bg-purple-400/10 rounded text-purple-400 text-xs border border-purple-400/30 flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          Auto
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-emerald-300/70 font-mono">{deal.id}</span>
                      <span className={`px-2 py-0.5 ${colors.bg} ${colors.text} rounded text-xs border ${colors.border}`}>
                        {deal.dealType.replace(/_/g, ' ')}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        deal.status === 'deployed' ? 'bg-emerald-400/10 text-emerald-400' :
                        deal.status === 'structuring' ? 'bg-yellow-400/10 text-yellow-400' :
                        deal.status === 'recommended' ? 'bg-blue-400/10 text-blue-400' :
                        'bg-gray-400/10 text-gray-400'
                      }`}>
                        {deal.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-xl mb-1">${(deal.amount / 1000000).toFixed(1)}M</div>
                    <div className="text-emerald-300/70 text-xs">{deal.timeline}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                  <div>
                    <div className="text-emerald-300/50 text-xs mb-1">Trust Score</div>
                    <div className="flex items-center gap-2">
                      <div className="text-emerald-400">{deal.trustScore}/100</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-emerald-300/50 text-xs mb-1">Risk Score</div>
                    <div className="text-white">{deal.riskScore}/10</div>
                  </div>
                  <div>
                    <div className="text-emerald-300/50 text-xs mb-1">AI Confidence</div>
                    <div className="text-blue-400">{deal.aiConfidence}%</div>
                  </div>
                  <div>
                    <div className="text-emerald-300/50 text-xs mb-1">Expected ROI</div>
                    <div className="text-emerald-400">{deal.expectedROI}%</div>
                  </div>
                  <div>
                    <div className="text-emerald-300/50 text-xs mb-1">Milestones</div>
                    <div className="text-white">{deal.milestones}</div>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded p-3">
                  <div className="text-emerald-300/50 text-xs mb-1">Deployment Strategy</div>
                  <div className="text-emerald-300 text-sm">{deal.deploymentStrategy}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Deal Details Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedDeal?.projectName || ''}
        size="lg"
      >
        {selectedDeal && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-emerald-300/50 text-sm mb-1">Deal Amount</div>
                <div className="text-white text-2xl">${(selectedDeal.amount / 1000000).toFixed(2)}M</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-emerald-300/50 text-sm mb-1">Collateral Ratio</div>
                <div className="text-white text-2xl">{selectedDeal.collateralRatio}x</div>
              </div>
            </div>

            <div>
              <h4 className="text-white mb-3">Risk Assessment</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-emerald-300/70">Trust Score</span>
                    <span className="text-emerald-400">{selectedDeal.trustScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-900/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full"
                      style={{ width: `${selectedDeal.trustScore}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-emerald-300/70">AI Confidence</span>
                    <span className="text-blue-400">{selectedDeal.aiConfidence}%</span>
                  </div>
                  <div className="w-full bg-slate-900/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                      style={{ width: `${selectedDeal.aiConfidence}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white mb-3">Deployment Strategy</h4>
              <div className="bg-slate-800/30 rounded p-4 text-emerald-300 text-sm">
                {selectedDeal.deploymentStrategy}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-emerald-300/50 text-xs mb-1">Expected ROI</div>
                <div className="text-emerald-400 text-xl">{selectedDeal.expectedROI}%</div>
              </div>
              <div className="text-center">
                <div className="text-emerald-300/50 text-xs mb-1">Timeline</div>
                <div className="text-white text-xl">{selectedDeal.timeline}</div>
              </div>
              <div className="text-center">
                <div className="text-emerald-300/50 text-xs mb-1">Milestones</div>
                <div className="text-white text-xl">{selectedDeal.milestones}</div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
