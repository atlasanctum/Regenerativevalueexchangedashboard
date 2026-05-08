import { Brain, Cpu, Zap, CheckCircle, Satellite, Camera, TrendingUp, Activity, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { AIChat } from './ui/interactive/AIChat';
import { Card } from './ui/interactive/Card';
import { Button } from './ui/interactive/Button';
import { Modal } from './ui/interactive/Modal';
import { motion } from 'motion/react';

export function AIOraclesInteractive() {
  const [showChat, setShowChat] = useState(false);
  const [selectedOracle, setSelectedOracle] = useState<any>(null);
  const [showOracleDetails, setShowOracleDetails] = useState(false);

  const oracleNodes = [
    {
      id: 'ORACLE-EU-001',
      region: 'Europe West',
      status: 'Active',
      aiModel: 'GPT-Vision-7 + Satellite ML',
      verifications: 8472,
      accuracy: 99.7,
      responseTime: '1.2s',
      dataPoints: 42847,
      location: 'Frankfurt, Germany',
      uptime: 99.98,
    },
    {
      id: 'ORACLE-AP-002',
      region: 'Asia Pacific',
      status: 'Active',
      aiModel: 'Claude-Vision-3.5 + IoT Sensors',
      verifications: 7283,
      accuracy: 99.8,
      responseTime: '0.9s',
      dataPoints: 38291,
      location: 'Singapore',
      uptime: 99.99,
    },
    {
      id: 'ORACLE-NA-003',
      region: 'North America',
      status: 'Active',
      aiModel: 'Multi-Modal AI Stack',
      verifications: 9124,
      accuracy: 99.6,
      responseTime: '1.1s',
      dataPoints: 45692,
      location: 'Oregon, USA',
      uptime: 99.95,
    },
    {
      id: 'ORACLE-AF-004',
      region: 'Africa',
      status: 'Active',
      aiModel: 'Edge AI + Ground Truth',
      verifications: 5847,
      accuracy: 99.5,
      responseTime: '1.4s',
      dataPoints: 31284,
      location: 'Cape Town, South Africa',
      uptime: 99.92,
    },
  ];

  const verificationTypes = [
    {
      type: 'Satellite Imagery Analysis',
      icon: Satellite,
      description: 'Multi-spectral satellite data processed by AI to verify carbon sequestration, forest coverage, and land use changes',
      verifications24h: 2847,
      accuracy: 99.8,
      color: 'emerald',
    },
    {
      type: 'IoT Sensor Networks',
      icon: Activity,
      description: 'Real-time environmental sensors measuring air quality, water purity, soil health, and biodiversity indicators',
      verifications24h: 4283,
      accuracy: 99.9,
      color: 'blue',
    },
    {
      type: 'Computer Vision',
      icon: Camera,
      description: 'AI-powered image and video analysis to verify on-ground project implementation and impact',
      verifications24h: 1924,
      accuracy: 99.6,
      color: 'purple',
    },
    {
      type: 'Predictive Modeling',
      icon: TrendingUp,
      description: 'Machine learning models forecasting ecological outcomes and detecting anomalies in impact data',
      verifications24h: 3182,
      accuracy: 98.4,
      color: 'teal',
    },
  ];

  const viewOracleDetails = (oracle: any) => {
    setSelectedOracle(oracle);
    setShowOracleDetails(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white flex items-center gap-3">
            <Brain className="w-8 h-8 text-emerald-400" />
            AI-Powered Oracles (Interactive)
          </h1>
          <p className="text-emerald-300/70 mt-2">
            Advanced AI and machine learning systems autonomously verifying regenerative impact in real-time
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="primary"
            icon={<MessageSquare className="w-4 h-4" />}
            onClick={() => setShowChat(!showChat)}
          >
            Chat with AI Oracle
          </Button>
        </div>
      </div>

      {/* Network Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Verifications', value: '12.4M', icon: CheckCircle, trend: '+8.4K today' },
          { label: 'Average Accuracy', value: '99.7%', icon: TrendingUp, trend: 'Industry-leading' },
          { label: 'Data Points Analyzed', value: '847.3B', icon: Cpu, trend: '+2.1B today' },
          { label: 'Response Time', value: '1.15s', icon: Zap, trend: '40% faster' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} hover={false}>
              <div className="flex items-center gap-2 text-emerald-300/70 text-sm mb-2">
                <Icon className="w-4 h-4" />
                {stat.label}
              </div>
              <div className="text-white text-2xl mb-1">{stat.value}</div>
              <div className="text-emerald-400 text-xs">{stat.trend}</div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Oracle Nodes - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            Global Oracle Network
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {oracleNodes.map((node) => (
              <Card key={node.id} hover onClick={() => viewOracleDetails(node)}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white mb-1">{node.region}</div>
                      <div className="text-emerald-300/70 text-sm font-mono">{node.id}</div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-400/10 rounded border border-emerald-400/30">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-emerald-400 rounded-full"
                      />
                      <span className="text-emerald-400 text-xs">{node.status}</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded p-3">
                    <div className="text-emerald-300/50 text-xs mb-1">AI Model Stack</div>
                    <div className="text-emerald-300 text-sm">{node.aiModel}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-emerald-300/50 text-xs mb-1">Verifications</div>
                      <div className="text-white">{node.verifications.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-emerald-300/50 text-xs mb-1">Accuracy</div>
                      <div className="text-emerald-400">{node.accuracy}%</div>
                    </div>
                    <div>
                      <div className="text-emerald-300/50 text-xs mb-1">Response</div>
                      <div className="text-white">{node.responseTime}</div>
                    </div>
                    <div>
                      <div className="text-emerald-300/50 text-xs mb-1">Uptime</div>
                      <div className="text-emerald-400">{node.uptime}%</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Verification Methods */}
          <div className="mt-6">
            <h2 className="text-white mb-4">AI Verification Methodologies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verificationTypes.map((method, idx) => {
                const Icon = method.icon;
                return (
                  <Card key={idx} hover>
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 bg-${method.color}-400/10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 text-${method.color}-400`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-white mb-1">{method.type}</div>
                        <div className="text-emerald-300/70 text-sm">{method.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-emerald-500/10">
                      <div>
                        <div className="text-emerald-300/50 text-xs">24h Verifications</div>
                        <div className="text-white">{method.verifications24h.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-emerald-300/50 text-xs">Accuracy Rate</div>
                        <div className="text-emerald-400">{method.accuracy}%</div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Chat Interface - Takes 1 column */}
        <div className="lg:col-span-1">
          <AIChat
            title="AI Oracle Assistant"
            placeholder="Ask about verification methods, accuracy, or oracle metrics..."
          />
        </div>
      </div>

      {/* Oracle Details Modal */}
      <Modal
        isOpen={showOracleDetails}
        onClose={() => setShowOracleDetails(false)}
        title={`Oracle Details: ${selectedOracle?.id}`}
        size="lg"
      >
        {selectedOracle && (
          <div className="space-y-6">
            {/* Status Overview */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-emerald-300/50 text-xs mb-2">Status</div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-emerald-400">{selectedOracle.status}</span>
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-emerald-300/50 text-xs mb-2">Uptime</div>
                <div className="text-white text-lg">{selectedOracle.uptime}%</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-emerald-300/50 text-xs mb-2">Location</div>
                <div className="text-white text-sm">{selectedOracle.location}</div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div>
              <h3 className="text-white mb-3">Performance Metrics</h3>
              <div className="space-y-3">
                {[
                  { label: 'Accuracy Rate', value: selectedOracle.accuracy, max: 100, unit: '%' },
                  { label: 'Response Time', value: parseFloat(selectedOracle.responseTime), max: 3, unit: 's' },
                  { label: 'Daily Verifications', value: (selectedOracle.verifications / 30), max: 500, unit: '' },
                ].map((metric, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-emerald-300/70 text-sm">{metric.label}</span>
                      <span className="text-emerald-400">{metric.value.toFixed(1)}{metric.unit}</span>
                    </div>
                    <div className="w-full bg-slate-800/50 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(metric.value / metric.max) * 100}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Model Information */}
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h3 className="text-white mb-3">AI Model Stack</h3>
              <div className="text-emerald-300/70 text-sm mb-2">{selectedOracle.aiModel}</div>
              <div className="text-emerald-300/50 text-xs">
                This oracle uses a combination of computer vision models, satellite imagery analysis,
                and IoT sensor fusion to provide highly accurate impact verification.
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-white mb-3">Recent Verification Activity</h3>
              <div className="space-y-2">
                {[
                  { project: 'Amazon Rainforest A7', type: 'Carbon', confidence: 99.8, time: '2 min ago' },
                  { project: 'Coral Reef Pacific', type: 'Biodiversity', confidence: 99.2, time: '8 min ago' },
                  { project: 'Urban Tree Canopy', type: 'Air Quality', confidence: 99.6, time: '15 min ago' },
                ].map((activity, idx) => (
                  <div key={idx} className="bg-slate-800/30 rounded p-3 text-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white">{activity.project}</span>
                      <span className="text-emerald-300/50 text-xs">{activity.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-300/70">{activity.type}</span>
                      <span className="text-emerald-400">{activity.confidence}% confidence</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
