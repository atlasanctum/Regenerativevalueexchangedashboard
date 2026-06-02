import { useState, useEffect } from 'react';
import { Cpu, Zap, Activity, AlertTriangle, CheckCircle, TrendingUp, Server, Database } from 'lucide-react';
import { Card } from '../ui/interactive/Card';
import { InteractiveChart } from '../ui/interactive/InteractiveChart';
import { motion } from 'motion/react';

interface EngineStatus {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'error' | 'maintenance';
  health: number;
  tasksQueued: number;
  tasksExecuting: number;
  tasksCompleted: number;
  avgResponseTime: number;
  lastActivity: string;
}

export function AtlasDashboard() {
  const [engines, setEngines] = useState<EngineStatus[]>([
    {
      id: 'deal',
      name: 'Deal Engine',
      status: 'active',
      health: 98,
      tasksQueued: 12,
      tasksExecuting: 3,
      tasksCompleted: 847,
      avgResponseTime: 1.2,
      lastActivity: '2 min ago',
    },
    {
      id: 'trust',
      name: 'Trust Engine',
      status: 'active',
      health: 99,
      tasksQueued: 0,
      tasksExecuting: 8,
      tasksCompleted: 2847,
      avgResponseTime: 0.3,
      lastActivity: '1 min ago',
    },
    {
      id: 'treasury',
      name: 'Treasury Engine',
      status: 'active',
      health: 97,
      tasksQueued: 2,
      tasksExecuting: 1,
      tasksCompleted: 128,
      avgResponseTime: 3.8,
      lastActivity: '5 min ago',
    },
    {
      id: 'growth',
      name: 'Growth Engine',
      status: 'active',
      health: 96,
      tasksQueued: 23,
      tasksExecuting: 5,
      tasksCompleted: 1204,
      avgResponseTime: 2.1,
      lastActivity: '30 sec ago',
    },
    {
      id: 'impact',
      name: 'Impact Engine',
      status: 'active',
      health: 99,
      tasksQueued: 5,
      tasksExecuting: 12,
      tasksCompleted: 4128,
      avgResponseTime: 0.8,
      lastActivity: '1 min ago',
    },
    {
      id: 'risk',
      name: 'Risk Engine',
      status: 'active',
      health: 100,
      tasksQueued: 0,
      tasksExecuting: 4,
      tasksCompleted: 9247,
      avgResponseTime: 0.2,
      lastActivity: '10 sec ago',
    },
    {
      id: 'reputation',
      name: 'Reputation Engine',
      status: 'active',
      health: 98,
      tasksQueued: 8,
      tasksExecuting: 6,
      tasksCompleted: 5829,
      avgResponseTime: 0.5,
      lastActivity: '45 sec ago',
    },
    {
      id: 'economic-graph',
      name: 'Economic Graph',
      status: 'active',
      health: 99,
      tasksQueued: 0,
      tasksExecuting: 24,
      tasksCompleted: 18472,
      avgResponseTime: 0.1,
      lastActivity: '5 sec ago',
    },
  ]);

  const [systemMetrics, setSystemMetrics] = useState([
    { time: '00:00', cpu: 42, memory: 58, throughput: 847 },
    { time: '04:00', cpu: 38, memory: 61, throughput: 923 },
    { time: '08:00', cpu: 56, memory: 64, throughput: 1204 },
    { time: '12:00', cpu: 72, memory: 68, throughput: 1847 },
    { time: '16:00', cpu: 64, memory: 65, throughput: 1623 },
    { time: '20:00', cpu: 48, memory: 62, throughput: 1142 },
  ]);

  const [recentEvents, setRecentEvents] = useState([
    { id: '1', engine: 'Deal Engine', event: 'Autonomous deal deployed', severity: 'info', time: '2 min ago' },
    { id: '2', engine: 'Risk Engine', event: 'Anomaly detected and mitigated', severity: 'warning', time: '5 min ago' },
    { id: '3', engine: 'Treasury Engine', event: 'Rebalancing completed', severity: 'info', time: '8 min ago' },
    { id: '4', engine: 'Trust Engine', event: 'Trust score updated for 247 entities', severity: 'info', time: '10 min ago' },
    { id: '5', engine: 'Impact Engine', event: 'New RIU batch tokenized', severity: 'success', time: '12 min ago' },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEngines(prev =>
        prev.map(engine => ({
          ...engine,
          tasksCompleted: engine.tasksCompleted + Math.floor(Math.random() * 3),
          tasksExecuting: Math.max(0, engine.tasksExecuting + Math.floor(Math.random() * 3) - 1),
          tasksQueued: Math.max(0, engine.tasksQueued + Math.floor(Math.random() * 5) - 2),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const totalTasksExecuting = engines.reduce((sum, e) => sum + e.tasksExecuting, 0);
  const totalTasksQueued = engines.reduce((sum, e) => sum + e.tasksQueued, 0);
  const totalTasksCompleted = engines.reduce((sum, e) => sum + e.tasksCompleted, 0);
  const avgSystemHealth = Math.round(engines.reduce((sum, e) => sum + e.health, 0) / engines.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white flex items-center gap-3">
          <Server className="w-8 h-8 text-emerald-400" />
          Atlas Operating System
        </h1>
        <p className="text-emerald-300/70 mt-2">
          AI orchestration layer coordinating all 9 autonomous engines
        </p>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'System Health', value: `${avgSystemHealth}%`, icon: Activity, color: 'emerald' },
          { label: 'Tasks Executing', value: totalTasksExecuting, icon: Zap, color: 'blue' },
          { label: 'Tasks Queued', value: totalTasksQueued, icon: Cpu, color: 'yellow' },
          { label: 'Tasks Completed (24h)', value: totalTasksCompleted.toLocaleString(), icon: CheckCircle, color: 'emerald' },
        ].map((metric, idx) => {
          const Icon = metric.icon;
          const iconColor =
            metric.color === 'emerald' ? 'text-emerald-400 bg-emerald-400/20' :
            metric.color === 'blue' ? 'text-blue-400 bg-blue-400/20' :
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

      {/* Engine Status Grid */}
      <Card hover={false}>
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-400" />
          Engine Health & Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {engines.map((engine, idx) => (
            <motion.div
              key={engine.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-slate-800/30 rounded-lg p-4 border border-emerald-500/10 hover:border-emerald-400/30 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-white text-sm">{engine.name}</div>
                {engine.status === 'active' ? (
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                ) : engine.status === 'error' ? (
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                ) : (
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                )}
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-emerald-300/50">Health</span>
                  <span className="text-emerald-400">{engine.health}%</span>
                </div>
                <div className="w-full bg-slate-900/50 rounded-full h-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${engine.health}%` }}
                    className="bg-gradient-to-r from-emerald-400 to-teal-400 h-1.5 rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-emerald-300/50">Executing</span>
                  <span className="text-blue-400">{engine.tasksExecuting}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-300/50">Queued</span>
                  <span className="text-yellow-400">{engine.tasksQueued}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-300/50">Completed</span>
                  <span className="text-emerald-400">{engine.tasksCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-300/50">Avg Response</span>
                  <span className="text-white">{engine.avgResponseTime}s</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-emerald-500/10 text-emerald-300/70 text-xs">
                Last activity: {engine.lastActivity}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* System Metrics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InteractiveChart
          title="System Resource Usage"
          data={systemMetrics}
          type="line"
          xAxisKey="time"
          dataKeys={[
            { key: 'cpu', color: '#3b82f6', name: 'CPU %' },
            { key: 'memory', color: '#8b5cf6', name: 'Memory %' },
          ]}
          height={300}
        />

        <InteractiveChart
          title="Task Throughput"
          data={systemMetrics}
          type="bar"
          xAxisKey="time"
          dataKeys={[
            { key: 'throughput', color: '#10b981', name: 'Tasks/Hour' },
          ]}
          height={300}
        />
      </div>

      {/* Recent Events */}
      <Card hover={false}>
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          Real-Time Event Stream
        </h3>
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {recentEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-slate-800/30 rounded-lg p-3 flex items-start gap-3"
            >
              {event.severity === 'success' ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
              ) : event.severity === 'warning' ? (
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
              ) : event.severity === 'error' ? (
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
              ) : (
                <Activity className="w-4 h-4 text-blue-400 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-sm">{event.event}</span>
                  <span className="text-emerald-300/50 text-xs">{event.time}</span>
                </div>
                <div className="text-emerald-300/70 text-xs">{event.engine}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card hover={false}>
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h4 className="text-white">Orchestration Efficiency</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Task Success Rate</span>
              <span className="text-emerald-400">99.4%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Avg Task Latency</span>
              <span className="text-white">0.8s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Resource Utilization</span>
              <span className="text-white">68%</span>
            </div>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center gap-3 mb-3">
            <Cpu className="w-5 h-5 text-blue-400" />
            <h4 className="text-white">AI Agent Activity</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Active Agents</span>
              <span className="text-blue-400">24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Inferences (24h)</span>
              <span className="text-white">8,472</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Avg Confidence</span>
              <span className="text-white">94.2%</span>
            </div>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center gap-3 mb-3">
            <Database className="w-5 h-5 text-purple-400" />
            <h4 className="text-white">Economic Graph</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Total Nodes</span>
              <span className="text-purple-400">847,291</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Total Edges</span>
              <span className="text-white">2.4M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Query Speed</span>
              <span className="text-white">12ms</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
