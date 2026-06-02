import { useState, useEffect } from 'react';
import { Leaf, ArrowRight, CheckCircle, Clock, Zap, TrendingUp, Activity } from 'lucide-react';
import { Card } from '../ui/interactive/Card';
import { InteractiveChart } from '../ui/interactive/InteractiveChart';
import { motion } from 'motion/react';

interface PipelineStage {
  id: string;
  name: string;
  count: number;
  avgTime: string;
  throughput: number;
  status: 'active' | 'congested' | 'optimal';
}

interface ImpactAsset {
  id: string;
  projectName: string;
  impactType: 'carbon' | 'biodiversity' | 'water' | 'social' | 'soil' | 'waste';
  verificationScore: number;
  tokenizationStatus: 'verifying' | 'tokenizing' | 'listed' | 'trading';
  riuTokens: number;
  marketPrice: number;
  timeInPipeline: string;
}

export function ImpactEngineHub() {
  const [pipelineStages] = useState<PipelineStage[]>([
    {
      id: 'ingestion',
      name: 'Data Ingestion',
      count: 1247,
      avgTime: '12 min',
      throughput: 98,
      status: 'optimal',
    },
    {
      id: 'verification',
      name: 'Oracle Verification',
      count: 847,
      avgTime: '34 min',
      throughput: 94,
      status: 'active',
    },
    {
      id: 'consensus',
      name: 'Trust Consensus',
      count: 284,
      avgTime: '18 min',
      throughput: 99,
      status: 'optimal',
    },
    {
      id: 'tokenization',
      name: 'Smart Contract Deploy',
      count: 124,
      avgTime: '8 min',
      throughput: 100,
      status: 'optimal',
    },
    {
      id: 'listing',
      name: 'Market Listing',
      count: 47,
      avgTime: '5 min',
      throughput: 97,
      status: 'active',
    },
  ]);

  const [assets, setAssets] = useState<ImpactAsset[]>([
    {
      id: 'IA-8472',
      projectName: 'Amazon Conservation Project',
      impactType: 'carbon',
      verificationScore: 96,
      tokenizationStatus: 'listed',
      riuTokens: 124000,
      marketPrice: 24.50,
      timeInPipeline: '2h 14min',
    },
    {
      id: 'IA-8473',
      projectName: 'Coral Reef Restoration',
      impactType: 'biodiversity',
      verificationScore: 94,
      tokenizationStatus: 'tokenizing',
      riuTokens: 87000,
      marketPrice: 0,
      timeInPipeline: '1h 42min',
    },
    {
      id: 'IA-8474',
      projectName: 'Watershed Protection Initiative',
      impactType: 'water',
      verificationScore: 98,
      tokenizationStatus: 'trading',
      riuTokens: 156000,
      marketPrice: 18.75,
      timeInPipeline: '3h 28min',
    },
  ]);

  const [throughputData] = useState([
    { hour: '00:00', verified: 847, tokenized: 743, listed: 687 },
    { hour: '04:00', verified: 923, tokenized: 812, listed: 748 },
    { hour: '08:00', verified: 1204, tokenized: 1087, listed: 984 },
    { hour: '12:00', verified: 1487, tokenized: 1342, listed: 1247 },
    { hour: '16:00', verified: 1321, tokenized: 1198, listed: 1089 },
    { hour: '20:00', verified: 1142, tokenized: 1047, listed: 967 },
  ]);

  const impactTypeColors = {
    carbon: { bg: 'bg-emerald-400/10', text: 'text-emerald-400', border: 'border-emerald-400/30' },
    biodiversity: { bg: 'bg-blue-400/10', text: 'text-blue-400', border: 'border-blue-400/30' },
    water: { bg: 'bg-cyan-400/10', text: 'text-cyan-400', border: 'border-cyan-400/30' },
    social: { bg: 'bg-purple-400/10', text: 'text-purple-400', border: 'border-purple-400/30' },
    soil: { bg: 'bg-orange-400/10', text: 'text-orange-400', border: 'border-orange-400/30' },
    waste: { bg: 'bg-yellow-400/10', text: 'text-yellow-400', border: 'border-yellow-400/30' },
  };

  const totalAssetsProcessed = 4128;
  const avgPipelineTime = '2h 18min';
  const conversionRate = 94.2;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white flex items-center gap-3">
          <Leaf className="w-8 h-8 text-emerald-400" />
          Impact Engine
        </h1>
        <p className="text-emerald-300/70 mt-2">
          Autonomous pipeline transforming verified impact into tradable assets
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Assets Processed (24h)', value: totalAssetsProcessed.toLocaleString(), icon: CheckCircle, color: 'emerald' },
          { label: 'Avg Pipeline Time', value: avgPipelineTime, icon: Clock, color: 'blue' },
          { label: 'Conversion Rate', value: `${conversionRate}%`, icon: TrendingUp, color: 'purple' },
          { label: 'Autonomous', value: '98%', icon: Zap, color: 'yellow' },
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

      {/* Pipeline Flow */}
      <Card hover={false}>
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          Impact → Asset Pipeline Flow
        </h3>
        <div className="flex items-center justify-between gap-2 mb-6">
          {pipelineStages.map((stage, idx) => (
            <div key={stage.id} className="flex items-center flex-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="flex-1 bg-slate-800/30 rounded-lg p-4 border-l-4 border-emerald-400"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white text-sm">{stage.name}</div>
                  {stage.status === 'optimal' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  ) : stage.status === 'congested' ? (
                    <Clock className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <Activity className="w-4 h-4 text-blue-400" />
                  )}
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-emerald-300/50">In Queue</span>
                    <span className="text-white">{stage.count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/50">Avg Time</span>
                    <span className="text-emerald-400">{stage.avgTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/50">Throughput</span>
                    <span className="text-blue-400">{stage.throughput}%</span>
                  </div>
                </div>
              </motion.div>
              {idx < pipelineStages.length - 1 && (
                <ArrowRight className="w-5 h-5 text-emerald-400 mx-2" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Assets in Pipeline */}
      <Card hover={false}>
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Leaf className="w-5 h-5 text-emerald-400" />
          Assets in Pipeline
        </h3>
        <div className="space-y-4">
          {assets.map((asset, idx) => {
            const colors = impactTypeColors[asset.impactType];
            return (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-800/30 rounded-lg p-4 hover:bg-slate-800/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-white">{asset.projectName}</h4>
                      <span className={`px-2 py-0.5 ${colors.bg} ${colors.text} rounded text-xs border ${colors.border}`}>
                        {asset.impactType}
                      </span>
                    </div>
                    <div className="text-emerald-300/70 text-sm font-mono">{asset.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-xl mb-1">{asset.riuTokens.toLocaleString()} RIU</div>
                    {asset.marketPrice > 0 && (
                      <div className="text-emerald-400 text-sm">${asset.marketPrice}/RIU</div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <div className="text-emerald-300/50 text-xs mb-1">Verification Score</div>
                    <div className="text-emerald-400">{asset.verificationScore}/100</div>
                  </div>
                  <div>
                    <div className="text-emerald-300/50 text-xs mb-1">Status</div>
                    <div className={`text-xs capitalize ${
                      asset.tokenizationStatus === 'trading' ? 'text-emerald-400' :
                      asset.tokenizationStatus === 'listed' ? 'text-blue-400' :
                      asset.tokenizationStatus === 'tokenizing' ? 'text-yellow-400' :
                      'text-gray-400'
                    }`}>
                      {asset.tokenizationStatus}
                    </div>
                  </div>
                  <div>
                    <div className="text-emerald-300/50 text-xs mb-1">Time in Pipeline</div>
                    <div className="text-white">{asset.timeInPipeline}</div>
                  </div>
                  <div>
                    <div className="text-emerald-300/50 text-xs mb-1">Total Value</div>
                    <div className="text-white">${((asset.riuTokens * asset.marketPrice) / 1000).toFixed(1)}K</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Throughput Analytics */}
      <InteractiveChart
        title="Pipeline Throughput (24 Hours)"
        data={throughputData}
        type="area"
        xAxisKey="hour"
        dataKeys={[
          { key: 'verified', color: '#10b981', name: 'Verified' },
          { key: 'tokenized', color: '#3b82f6', name: 'Tokenized' },
          { key: 'listed', color: '#8b5cf6', name: 'Listed' },
        ]}
        height={300}
      />

      {/* Quality Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card hover={false}>
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <h4 className="text-white">Quality Assurance</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Avg Verification Score</span>
              <span className="text-emerald-400">96.2/100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Rejection Rate</span>
              <span className="text-white">5.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Quality Threshold</span>
              <span className="text-emerald-400">92/100</span>
            </div>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h4 className="text-white">Performance</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Success Rate</span>
              <span className="text-blue-400">94.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Avg Processing Time</span>
              <span className="text-white">2h 18min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Daily Throughput</span>
              <span className="text-blue-400">4,128</span>
            </div>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h4 className="text-white">Automation</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Autonomous Rate</span>
              <span className="text-yellow-400">98%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Manual Interventions</span>
              <span className="text-white">23/day</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">AI Confidence</span>
              <span className="text-yellow-400">96.7%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
