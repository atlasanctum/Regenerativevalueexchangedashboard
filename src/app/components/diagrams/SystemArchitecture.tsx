import { useState } from 'react';
import { Server, Database, Zap, Shield, Eye, GitBranch, Cloud, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '../ui/interactive/Card';
import { Modal } from '../ui/interactive/Modal';
import { motion } from 'motion/react';

interface ComponentNode {
  id: string;
  name: string;
  type: 'frontend' | 'backend' | 'blockchain' | 'database' | 'ai' | 'integration';
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  latency: number;
  throughput: string;
  dependencies: string[];
}

export function SystemArchitecture() {
  const [selectedNode, setSelectedNode] = useState<ComponentNode | null>(null);
  const [showModal, setShowModal] = useState(false);

  const components: ComponentNode[] = [
    {
      id: 'web-app',
      name: 'React Web Application',
      type: 'frontend',
      status: 'healthy',
      uptime: 99.98,
      latency: 45,
      throughput: '2.4K req/s',
      dependencies: ['api-gateway', 'cdn'],
    },
    {
      id: 'api-gateway',
      name: 'API Gateway',
      type: 'backend',
      status: 'healthy',
      uptime: 99.95,
      latency: 12,
      throughput: '8.7K req/s',
      dependencies: ['auth-service', 'trading-engine', 'verification-service'],
    },
    {
      id: 'auth-service',
      name: 'Authentication Service',
      type: 'backend',
      status: 'healthy',
      uptime: 99.99,
      latency: 8,
      throughput: '1.2K req/s',
      dependencies: ['user-db', 'redis-cache'],
    },
    {
      id: 'trading-engine',
      name: 'RIU Trading Engine',
      type: 'backend',
      status: 'healthy',
      uptime: 99.92,
      latency: 18,
      throughput: '3.4K req/s',
      dependencies: ['trading-db', 'blockchain-node', 'market-data'],
    },
    {
      id: 'verification-service',
      name: 'Impact Verification Service',
      type: 'ai',
      status: 'healthy',
      uptime: 99.87,
      latency: 234,
      throughput: '847 verifications/h',
      dependencies: ['oracle-network', 'verification-db', 'ml-models'],
    },
    {
      id: 'oracle-network',
      name: 'AI Oracle Network',
      type: 'ai',
      status: 'healthy',
      uptime: 99.94,
      latency: 456,
      throughput: '2.8K verifications/h',
      dependencies: ['satellite-api', 'iot-sensors', 'blockchain-node'],
    },
    {
      id: 'blockchain-node',
      name: 'Blockchain Node Cluster',
      type: 'blockchain',
      status: 'healthy',
      uptime: 99.96,
      latency: 2.3,
      throughput: '4.2K tx/s',
      dependencies: ['consensus-layer', 'storage-layer'],
    },
    {
      id: 'smart-contracts',
      name: 'Living Smart Contracts',
      type: 'blockchain',
      status: 'healthy',
      uptime: 99.98,
      latency: 1.8,
      throughput: '847 adaptations/day',
      dependencies: ['blockchain-node', 'oracle-network'],
    },
    {
      id: 'trading-db',
      name: 'Trading Database (PostgreSQL)',
      type: 'database',
      status: 'healthy',
      uptime: 99.99,
      latency: 3.2,
      throughput: '12.4K queries/s',
      dependencies: [],
    },
    {
      id: 'verification-db',
      name: 'Verification Database',
      type: 'database',
      status: 'healthy',
      uptime: 99.97,
      latency: 4.1,
      throughput: '8.2K queries/s',
      dependencies: [],
    },
  ];

  const layers = {
    frontend: components.filter(c => c.type === 'frontend'),
    backend: components.filter(c => c.type === 'backend'),
    ai: components.filter(c => c.type === 'ai'),
    blockchain: components.filter(c => c.type === 'blockchain'),
    database: components.filter(c => c.type === 'database'),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-emerald-400 bg-emerald-400/20 border-emerald-400/30';
      case 'warning': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'critical': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'frontend': return Cloud;
      case 'backend': return Server;
      case 'blockchain': return GitBranch;
      case 'database': return Database;
      case 'ai': return Zap;
      default: return Activity;
    }
  };

  const handleNodeClick = (node: ComponentNode) => {
    setSelectedNode(node);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white flex items-center gap-3">
          <Server className="w-8 h-8 text-emerald-400" />
          System Architecture Diagram
        </h1>
        <p className="text-emerald-300/70 mt-2">
          Interactive multi-layer architecture with real-time component health monitoring
        </p>
      </div>

      {/* Overall Health */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Overall Uptime', value: '99.94%', status: 'healthy' },
          { label: 'Active Components', value: components.length.toString(), status: 'healthy' },
          { label: 'Avg Response Time', value: '42ms', status: 'healthy' },
          { label: 'Total Throughput', value: '32.8K req/s', status: 'healthy' },
        ].map((metric, idx) => (
          <Card key={idx} hover={false}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-emerald-300/70 text-sm">{metric.label}</span>
              {metric.status === 'healthy' ? (
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-400" />
              )}
            </div>
            <div className="text-white text-2xl">{metric.value}</div>
          </Card>
        ))}
      </div>

      {/* Architecture Layers */}
      <div className="space-y-6">
        {/* Frontend Layer */}
        <div>
          <h3 className="text-white mb-3 flex items-center gap-2">
            <Cloud className="w-5 h-5 text-blue-400" />
            Frontend Layer
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {layers.frontend.map((component, idx) => {
              const Icon = getTypeIcon(component.type);
              return (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card hover onClick={() => handleNodeClick(component)}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-400/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-white text-sm">{component.name}</div>
                          <div className="text-emerald-300/50 text-xs">{component.id}</div>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${getStatusColor(component.status)}`}>
                        {component.status}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-emerald-300/70">
                      <span>Uptime: {component.uptime}%</span>
                      <span>{component.latency}ms</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Backend Layer */}
        <div>
          <h3 className="text-white mb-3 flex items-center gap-2">
            <Server className="w-5 h-5 text-emerald-400" />
            Backend Services Layer
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {layers.backend.map((component, idx) => {
              const Icon = getTypeIcon(component.type);
              return (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card hover onClick={() => handleNodeClick(component)}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-emerald-400/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <div className="text-white text-sm">{component.name}</div>
                          <div className="text-emerald-300/50 text-xs">{component.id}</div>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${getStatusColor(component.status)}`}>
                        {component.status}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-emerald-300/70">
                      <span>Uptime: {component.uptime}%</span>
                      <span>{component.latency}ms</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* AI Layer */}
        <div>
          <h3 className="text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            AI & Oracle Layer
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {layers.ai.map((component, idx) => {
              const Icon = getTypeIcon(component.type);
              return (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card hover onClick={() => handleNodeClick(component)}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-purple-400/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-white text-sm">{component.name}</div>
                          <div className="text-emerald-300/50 text-xs">{component.id}</div>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${getStatusColor(component.status)}`}>
                        {component.status}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-emerald-300/70">
                      <span>Uptime: {component.uptime}%</span>
                      <span>{component.throughput}</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Blockchain Layer */}
        <div>
          <h3 className="text-white mb-3 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-teal-400" />
            Blockchain Layer
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {layers.blockchain.map((component, idx) => {
              const Icon = getTypeIcon(component.type);
              return (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card hover onClick={() => handleNodeClick(component)}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-teal-400/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-teal-400" />
                        </div>
                        <div>
                          <div className="text-white text-sm">{component.name}</div>
                          <div className="text-emerald-300/50 text-xs">{component.id}</div>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${getStatusColor(component.status)}`}>
                        {component.status}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-emerald-300/70">
                      <span>Uptime: {component.uptime}%</span>
                      <span>{component.throughput}</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Database Layer */}
        <div>
          <h3 className="text-white mb-3 flex items-center gap-2">
            <Database className="w-5 h-5 text-orange-400" />
            Data Storage Layer
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {layers.database.map((component, idx) => {
              const Icon = getTypeIcon(component.type);
              return (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card hover onClick={() => handleNodeClick(component)}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-orange-400/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                          <div className="text-white text-sm">{component.name}</div>
                          <div className="text-emerald-300/50 text-xs">{component.id}</div>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${getStatusColor(component.status)}`}>
                        {component.status}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-emerald-300/70">
                      <span>Uptime: {component.uptime}%</span>
                      <span>{component.throughput}</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Component Details Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedNode?.name || ''}
        size="lg"
      >
        {selectedNode && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-emerald-300/50 text-sm mb-1">Status</div>
                <div className={`text-lg ${selectedNode.status === 'healthy' ? 'text-emerald-400' : 'text-yellow-400'}`}>
                  {selectedNode.status.toUpperCase()}
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-emerald-300/50 text-sm mb-1">Uptime</div>
                <div className="text-white text-lg">{selectedNode.uptime}%</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-emerald-300/50 text-sm mb-1">Latency</div>
                <div className="text-white text-lg">{selectedNode.latency}ms</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-emerald-300/50 text-sm mb-1">Throughput</div>
                <div className="text-white text-lg">{selectedNode.throughput}</div>
              </div>
            </div>

            <div>
              <div className="text-white mb-2">Dependencies</div>
              <div className="space-y-2">
                {selectedNode.dependencies.map((dep, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded p-2 text-emerald-300 text-sm flex items-center gap-2">
                    <GitBranch className="w-4 h-4" />
                    {dep}
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
