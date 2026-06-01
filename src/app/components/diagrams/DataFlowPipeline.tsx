import { useState, useEffect } from 'react';
import { Database, Zap, CheckCircle, ArrowRight, Activity, Filter, Shield } from 'lucide-react';
import { Card } from '../ui/interactive/Card';
import { motion } from 'motion/react';

interface PipelineStage {
  id: string;
  name: string;
  icon: any;
  status: 'processing' | 'idle' | 'error';
  throughput: number;
  processed: number;
  failed: number;
  avgTime: number;
}

export function DataFlowPipeline() {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [flowActive, setFlowActive] = useState(true);

  const stages: PipelineStage[] = [
    {
      id: 'ingestion',
      name: 'Data Ingestion',
      icon: Database,
      status: 'processing',
      throughput: 8472,
      processed: 2847293,
      failed: 12,
      avgTime: 45,
    },
    {
      id: 'validation',
      name: 'Validation Layer',
      icon: Shield,
      status: 'processing',
      throughput: 8460,
      processed: 2847281,
      failed: 8,
      avgTime: 89,
    },
    {
      id: 'transformation',
      name: 'Data Transformation',
      icon: Filter,
      status: 'processing',
      throughput: 8452,
      processed: 2847273,
      failed: 4,
      avgTime: 124,
    },
    {
      id: 'enrichment',
      name: 'AI Enrichment',
      icon: Zap,
      status: 'processing',
      throughput: 8448,
      processed: 2847269,
      failed: 2,
      avgTime: 567,
    },
    {
      id: 'verification',
      name: 'Oracle Verification',
      icon: CheckCircle,
      status: 'processing',
      throughput: 8446,
      processed: 2847267,
      failed: 0,
      avgTime: 1234,
    },
    {
      id: 'storage',
      name: 'Blockchain Storage',
      icon: Database,
      status: 'processing',
      throughput: 8446,
      processed: 2847267,
      failed: 0,
      avgTime: 234,
    },
  ];

  // Simulate live data flow
  useEffect(() => {
    if (flowActive) {
      const interval = setInterval(() => {
        // Cycle through stages
        setActiveStage(prev => {
          const currentIndex = stages.findIndex(s => s.id === prev);
          const nextIndex = (currentIndex + 1) % stages.length;
          return stages[nextIndex].id;
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [flowActive]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white flex items-center gap-3">
            <Activity className="w-8 h-8 text-emerald-400" />
            Real-Time Data Flow Pipeline
          </h1>
          <p className="text-emerald-300/70 mt-2">
            Live visualization of impact data processing from ingestion to blockchain storage
          </p>
        </div>
        <button
          onClick={() => setFlowActive(!flowActive)}
          className={`px-4 py-2 rounded-lg transition-all ${
            flowActive
              ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30'
              : 'bg-slate-700 text-emerald-300/70 border border-emerald-500/20'
          }`}
        >
          {flowActive ? 'Pause Flow' : 'Resume Flow'}
        </button>
      </div>

      {/* Pipeline Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Processed', value: '2.84M', change: '+8.4K/h' },
          { label: 'Success Rate', value: '99.97%', change: 'Excellent' },
          { label: 'Avg Pipeline Time', value: '2.3s', change: '-12% today' },
          { label: 'Active Flows', value: '847', change: 'Normal' },
        ].map((metric, idx) => (
          <Card key={idx} hover={false}>
            <div className="text-emerald-300/70 text-sm mb-2">{metric.label}</div>
            <div className="text-white text-2xl mb-1">{metric.value}</div>
            <div className="text-emerald-400 text-xs">{metric.change}</div>
          </Card>
        ))}
      </div>

      {/* Pipeline Visualization */}
      <Card hover={false} className="p-6">
        <div className="relative">
          {/* Pipeline Stages */}
          <div className="flex items-center justify-between gap-4">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeStage === stage.id;

              return (
                <div key={stage.id} className="flex items-center gap-4 flex-1">
                  {/* Stage Node */}
                  <motion.div
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5 }}
                    className="flex-1"
                  >
                    <div
                      className={`bg-slate-800/50 rounded-lg p-4 border-2 transition-all cursor-pointer ${
                        isActive
                          ? 'border-emerald-400 shadow-lg shadow-emerald-400/20'
                          : 'border-emerald-500/20 hover:border-emerald-400/40'
                      }`}
                      onClick={() => setActiveStage(stage.id)}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          isActive ? 'bg-emerald-400/30' : 'bg-emerald-400/10'
                        }`}>
                          <Icon className={`w-6 h-6 ${isActive ? 'text-emerald-400' : 'text-emerald-400/70'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="text-white text-sm mb-1">{stage.name}</div>
                          <div className="text-emerald-300/50 text-xs">{stage.throughput}/h</div>
                        </div>
                      </div>

                      {/* Mini Stats */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-slate-900/50 rounded p-2">
                          <div className="text-emerald-300/50 mb-1">Processed</div>
                          <div className="text-emerald-400">{(stage.processed / 1000000).toFixed(2)}M</div>
                        </div>
                        <div className="bg-slate-900/50 rounded p-2">
                          <div className="text-emerald-300/50 mb-1">Avg Time</div>
                          <div className="text-white">{stage.avgTime}ms</div>
                        </div>
                      </div>

                      {/* Status Indicator */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-3 flex items-center gap-2 text-xs text-emerald-400"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-2 h-2 bg-emerald-400 rounded-full"
                          />
                          Processing...
                        </motion.div>
                      )}
                    </div>
                  </motion.div>

                  {/* Arrow Connector */}
                  {idx < stages.length - 1 && (
                    <motion.div
                      animate={isActive ? { x: [0, 5, 0] } : {}}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="flex-shrink-0"
                    >
                      <ArrowRight className={`w-6 h-6 ${
                        isActive ? 'text-emerald-400' : 'text-emerald-400/30'
                      }`} />
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Data Flow Animation */}
          {flowActive && activeStage && (
            <motion.div
              key={activeStage}
              initial={{ left: 0, opacity: 0 }}
              animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.5, ease: 'linear' }}
              className="absolute top-0 w-4 h-4 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            />
          )}
        </div>
      </Card>

      {/* Stage Details */}
      {activeStage && (
        <Card hover={false}>
          <h3 className="text-white mb-4">
            {stages.find(s => s.id === activeStage)?.name} - Detailed Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stages
              .filter(s => s.id === activeStage)
              .map(stage => [
                { label: 'Throughput (per hour)', value: stage.throughput.toLocaleString() },
                { label: 'Total Processed', value: (stage.processed / 1000000).toFixed(2) + 'M' },
                { label: 'Failed Items', value: stage.failed.toString() },
                { label: 'Average Processing Time', value: stage.avgTime + 'ms' },
              ])[0].map((metric, idx) => (
                <div key={idx} className="bg-slate-800/30 rounded-lg p-4">
                  <div className="text-emerald-300/50 text-xs mb-2">{metric.label}</div>
                  <div className="text-white text-xl">{metric.value}</div>
                </div>
              ))}
          </div>
        </Card>
      )}

      {/* Pipeline Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card hover={false}>
          <h3 className="text-white mb-4">Pipeline Health</h3>
          <div className="space-y-3">
            {stages.map((stage, idx) => {
              const successRate = ((stage.processed - stage.failed) / stage.processed * 100).toFixed(2);
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-300/70 text-sm">{stage.name}</span>
                    <span className="text-emerald-400 text-sm">{successRate}%</span>
                  </div>
                  <div className="w-full bg-slate-800/50 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${successRate}%` }}
                      transition={{ duration: 1 }}
                      className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card hover={false}>
          <h3 className="text-white mb-4">Data Quality Metrics</h3>
          <div className="space-y-3">
            {[
              { metric: 'Data Completeness', value: 99.8, target: 99.5 },
              { metric: 'Schema Compliance', value: 99.9, target: 99.0 },
              { metric: 'Deduplication Rate', value: 99.7, target: 98.0 },
              { metric: 'Validation Success', value: 99.6, target: 99.0 },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-300/70 text-sm">{item.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-300/50 text-xs">Target: {item.target}%</span>
                    <span className="text-emerald-400 text-sm">{item.value}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-800/50 rounded-full h-2">
                  <div className="relative h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className="absolute bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full"
                    />
                    <div
                      className="absolute h-2 w-0.5 bg-yellow-400"
                      style={{ left: `${item.target}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
