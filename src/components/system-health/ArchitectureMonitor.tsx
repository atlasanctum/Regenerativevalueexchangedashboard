import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AlertTriangle, CheckCircle2, XCircle, Activity, Shield, Zap, Database, Cloud, Lock, TrendingDown, AlertCircle } from 'lucide-react';

// System Mode Enum
enum SystemMode {
  FULL = 'FULL',
  DEGRADED = 'DEGRADED',
  EMERGENCY = 'EMERGENCY',
  RECOVERY = 'RECOVERY',
}

// Component Health Status
interface ComponentHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'critical' | 'offline';
  uptime: number;
  latency: number;
  lastCheck: string;
  dependencies: string[];
  failoverActive: boolean;
}

// Circuit Breaker State
interface CircuitBreaker {
  name: string;
  state: 'closed' | 'open' | 'half-open';
  failures: number;
  threshold: number;
  lastTrip: string | null;
  resetTime: string | null;
}

// Mock real-time system health data
const componentHealth: ComponentHealth[] = [
  {
    name: 'IPFS Gateway (Primary)',
    status: 'healthy',
    uptime: 99.97,
    latency: 145,
    lastCheck: '5s ago',
    dependencies: ['Pinata'],
    failoverActive: false,
  },
  {
    name: 'IPFS Gateway (Backup)',
    status: 'healthy',
    uptime: 99.85,
    latency: 230,
    lastCheck: '5s ago',
    dependencies: ['Filebase'],
    failoverActive: false,
  },
  {
    name: 'Oracle Consensus',
    status: 'degraded',
    uptime: 87.3,
    latency: 8500,
    lastCheck: '3s ago',
    dependencies: ['7 Oracle Nodes'],
    failoverActive: false,
  },
  {
    name: 'RGN Token Contract',
    status: 'healthy',
    uptime: 100,
    latency: 2100,
    lastCheck: '2s ago',
    dependencies: ['Ethereum Mainnet'],
    failoverActive: false,
  },
  {
    name: 'Governance Timelock',
    status: 'healthy',
    uptime: 100,
    latency: 1800,
    lastCheck: '4s ago',
    dependencies: ['Multisig 4/7'],
    failoverActive: false,
  },
  {
    name: 'NFT Certificate Minter',
    status: 'healthy',
    uptime: 99.92,
    latency: 3200,
    lastCheck: '6s ago',
    dependencies: ['Arweave', 'IPFS'],
    failoverActive: false,
  },
  {
    name: 'Market Liquidity Pool',
    status: 'critical',
    uptime: 100,
    latency: 850,
    lastCheck: '1s ago',
    dependencies: ['Uniswap V3'],
    failoverActive: true,
  },
  {
    name: 'WebSocket Cluster',
    status: 'healthy',
    uptime: 99.99,
    latency: 45,
    lastCheck: '1s ago',
    dependencies: ['AWS ELB', 'Redis'],
    failoverActive: false,
  },
];

const circuitBreakers: CircuitBreaker[] = [
  {
    name: 'Oracle Submission Processing',
    state: 'half-open',
    failures: 3,
    threshold: 5,
    lastTrip: '45 min ago',
    resetTime: '15 min',
  },
  {
    name: 'IPFS Evidence Upload',
    state: 'closed',
    failures: 0,
    threshold: 10,
    lastTrip: null,
    resetTime: null,
  },
  {
    name: 'RGN Minting Rate Limiter',
    state: 'closed',
    failures: 1,
    threshold: 3,
    lastTrip: null,
    resetTime: null,
  },
  {
    name: 'Governance Execution Guard',
    state: 'closed',
    failures: 0,
    threshold: 1,
    lastTrip: null,
    resetTime: null,
  },
  {
    name: 'Certificate NFT Mint',
    state: 'closed',
    failures: 0,
    threshold: 3,
    lastTrip: null,
    resetTime: null,
  },
];

const systemMetrics = {
  oracleParticipation: 57.1, // 4/7 = 57% (below 60% critical threshold)
  ipfsFetchSuccess: 98.3,
  rgnMintRate: 8450, // per hour
  avgRgnMintRate: 8200,
  governanceProposals: 4,
  certificateIssuance: 127,
  liquidityDepth: 42300, // RGN
  blockchainSyncLag: 3, // blocks
};

export function ArchitectureMonitor() {
  const [systemMode, setSystemMode] = useState<SystemMode>(SystemMode.DEGRADED);
  const [criticalAlerts, setCriticalAlerts] = useState<number>(2);
  const [warningAlerts, setWarningAlerts] = useState<number>(3);

  // Determine system mode based on metrics
  useEffect(() => {
    if (systemMetrics.oracleParticipation < 50) {
      setSystemMode(SystemMode.EMERGENCY);
    } else if (systemMetrics.oracleParticipation < 70 || systemMetrics.ipfsFetchSuccess < 95) {
      setSystemMode(SystemMode.DEGRADED);
    } else {
      setSystemMode(SystemMode.FULL);
    }
  }, []);

  const getSystemModeColor = (mode: SystemMode) => {
    switch (mode) {
      case SystemMode.FULL:
        return 'bg-green-500/20 border-green-500/50 text-green-300';
      case SystemMode.DEGRADED:
        return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300';
      case SystemMode.EMERGENCY:
        return 'bg-red-500/20 border-red-500/50 text-red-300';
      case SystemMode.RECOVERY:
        return 'bg-purple-500/20 border-purple-500/50 text-purple-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'degraded':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'critical':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'offline':
        return <XCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">System Architecture Monitor</h2>
          <p className="text-emerald-300/70 mt-1">Real-time health, circuit breakers & isolation boundaries</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className={getSystemModeColor(systemMode)}>
            <Activity className="w-3 h-3 mr-1" />
            {systemMode} MODE
          </Badge>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-red-500/10 border-red-500/30 text-red-300">
              {criticalAlerts} Critical
            </Badge>
            <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30 text-yellow-300">
              {warningAlerts} Warning
            </Badge>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts > 0 && (
        <div className="space-y-3">
          <Alert className="bg-red-500/10 border-red-500/30">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertTitle className="text-red-300">Critical: Oracle Participation Below Threshold</AlertTitle>
            <AlertDescription className="text-red-300/70">
              Oracle participation at 57.1% (4/7 active). Minimum threshold is 60% for full operation. System operating in
              DEGRADED mode with reduced submission throughput.
            </AlertDescription>
            <Button size="sm" className="mt-3 bg-red-600 hover:bg-red-700">
              Activate Emergency Oracle Pool
            </Button>
          </Alert>
          <Alert className="bg-red-500/10 border-red-500/30">
            <TrendingDown className="h-4 w-4 text-red-400" />
            <AlertTitle className="text-red-300">Critical: Market Liquidity Depth Low</AlertTitle>
            <AlertDescription className="text-red-300/70">
              Liquidity pool at 42,300 RGN (28% of recommended minimum). Large purchases will experience high slippage.
              Treasury AMM backstop activated.
            </AlertDescription>
            <Button size="sm" className="mt-3 bg-red-600 hover:bg-red-700">
              Trigger Treasury Liquidity Injection
            </Button>
          </Alert>
        </div>
      )}

      <Tabs defaultValue="components" className="space-y-6">
        <TabsList className="bg-black/40 border border-emerald-500/20">
          <TabsTrigger value="components">
            <Shield className="w-4 h-4 mr-2" />
            Component Health
          </TabsTrigger>
          <TabsTrigger value="circuits">
            <Zap className="w-4 h-4 mr-2" />
            Circuit Breakers
          </TabsTrigger>
          <TabsTrigger value="metrics">
            <Activity className="w-4 h-4 mr-2" />
            System Metrics
          </TabsTrigger>
          <TabsTrigger value="isolation">
            <Lock className="w-4 h-4 mr-2" />
            Isolation Boundaries
          </TabsTrigger>
        </TabsList>

        {/* Component Health Tab */}
        <TabsContent value="components">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Component Health Matrix</h3>
            <div className="space-y-4">
              {componentHealth.map((component, idx) => (
                <Card
                  key={idx}
                  className={`p-4 ${
                    component.status === 'healthy'
                      ? 'bg-green-500/5 border-green-500/20'
                      : component.status === 'degraded'
                      ? 'bg-yellow-500/5 border-yellow-500/20'
                      : component.status === 'critical'
                      ? 'bg-red-500/5 border-red-500/20'
                      : 'bg-gray-500/5 border-gray-500/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(component.status)}
                      <div>
                        <h4 className="text-white font-medium">{component.name}</h4>
                        <p className="text-emerald-300/70 text-xs mt-1">
                          Dependencies: {component.dependencies.join(', ')}
                        </p>
                      </div>
                    </div>
                    {component.failoverActive && (
                      <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-300">
                        Failover Active
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-emerald-300/70 mb-1">Uptime</p>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={component.uptime}
                          className="h-2 flex-1"
                        />
                        <span className="text-white font-mono text-xs">{component.uptime}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-emerald-300/70 mb-1">Latency</p>
                      <p className="text-white font-mono">{component.latency}ms</p>
                    </div>
                    <div>
                      <p className="text-emerald-300/70 mb-1">Last Check</p>
                      <p className="text-white">{component.lastCheck}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Circuit Breakers Tab */}
        <TabsContent value="circuits">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Circuit Breaker Status</h3>
            <p className="text-emerald-300/70 text-sm mb-6">
              Automatic halts prevent cascading failures. Circuit opens when failure threshold exceeded.
            </p>
            <div className="space-y-4">
              {circuitBreakers.map((breaker, idx) => (
                <Card
                  key={idx}
                  className={`p-4 ${
                    breaker.state === 'closed'
                      ? 'bg-green-500/5 border-green-500/20'
                      : breaker.state === 'half-open'
                      ? 'bg-yellow-500/5 border-yellow-500/20'
                      : 'bg-red-500/5 border-red-500/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">{breaker.name}</h4>
                    <Badge
                      variant="outline"
                      className={
                        breaker.state === 'closed'
                          ? 'bg-green-500/10 border-green-500/30 text-green-300'
                          : breaker.state === 'half-open'
                          ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300'
                          : 'bg-red-500/10 border-red-500/30 text-red-300'
                      }
                    >
                      {breaker.state.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-emerald-300/70 mb-1">Failures</p>
                      <p className="text-white font-mono">
                        {breaker.failures} / {breaker.threshold}
                      </p>
                    </div>
                    <div>
                      <p className="text-emerald-300/70 mb-1">Last Trip</p>
                      <p className="text-white">{breaker.lastTrip || 'Never'}</p>
                    </div>
                    <div>
                      <p className="text-emerald-300/70 mb-1">Reset In</p>
                      <p className="text-white">{breaker.resetTime || 'N/A'}</p>
                    </div>
                    <div className="flex items-end">
                      {breaker.state === 'open' && (
                        <Button size="sm" variant="outline" className="border-emerald-500/30">
                          Force Reset
                        </Button>
                      )}
                    </div>
                  </div>
                  <Progress
                    value={(breaker.failures / breaker.threshold) * 100}
                    className="h-2 mt-3"
                  />
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* System Metrics Tab */}
        <TabsContent value="metrics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Critical Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-300">Oracle Participation</span>
                    <span
                      className={`font-semibold ${
                        systemMetrics.oracleParticipation < 60 ? 'text-red-400' : 'text-green-400'
                      }`}
                    >
                      {systemMetrics.oracleParticipation}%
                    </span>
                  </div>
                  <Progress value={systemMetrics.oracleParticipation} className="h-2" />
                  <p className="text-emerald-300/50 text-xs mt-1">Threshold: 60% (Critical) | 80% (Warning)</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-300">IPFS Fetch Success</span>
                    <span
                      className={`font-semibold ${
                        systemMetrics.ipfsFetchSuccess < 80 ? 'text-red-400' : 'text-green-400'
                      }`}
                    >
                      {systemMetrics.ipfsFetchSuccess}%
                    </span>
                  </div>
                  <Progress value={systemMetrics.ipfsFetchSuccess} className="h-2" />
                  <p className="text-emerald-300/50 text-xs mt-1">Threshold: 80% (Critical) | 95% (Warning)</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-300">Blockchain Sync Lag</span>
                    <span
                      className={`font-semibold ${
                        systemMetrics.blockchainSyncLag > 100 ? 'text-red-400' : 'text-green-400'
                      }`}
                    >
                      {systemMetrics.blockchainSyncLag} blocks
                    </span>
                  </div>
                  <p className="text-emerald-300/50 text-xs">Threshold: 100 blocks (Critical)</p>
                </div>
              </div>
            </Card>

            <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Operational Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded">
                  <span className="text-emerald-300">RGN Mint Rate (hourly)</span>
                  <div className="text-right">
                    <p className="text-white font-mono">{systemMetrics.rgnMintRate.toLocaleString()}</p>
                    <p className="text-emerald-300/50 text-xs">Avg: {systemMetrics.avgRgnMintRate.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded">
                  <span className="text-emerald-300">Active Governance Proposals</span>
                  <p className="text-white font-mono text-xl">{systemMetrics.governanceProposals}</p>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded">
                  <span className="text-emerald-300">Certificates Issued (24h)</span>
                  <p className="text-white font-mono text-xl">{systemMetrics.certificateIssuance}</p>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded">
                  <span className="text-emerald-300">Liquidity Depth</span>
                  <div className="text-right">
                    <p className="text-white font-mono">{systemMetrics.liquidityDepth.toLocaleString()} RGN</p>
                    <p
                      className={`text-xs ${
                        systemMetrics.liquidityDepth < 50000 ? 'text-red-400' : 'text-green-400'
                      }`}
                    >
                      {systemMetrics.liquidityDepth < 50000 ? 'Below minimum' : 'Healthy'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Isolation Boundaries Tab */}
        <TabsContent value="isolation">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Layer Isolation Status</h3>
            <p className="text-emerald-300/70 text-sm mb-6">
              Isolation boundaries prevent cascading failures across layers. Each layer should degrade gracefully
              without affecting others.
            </p>
            <div className="space-y-4">
              <Card className="p-4 bg-green-500/5 border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">Public Dashboard (Layer A)</h4>
                  <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-300">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Isolated
                  </Badge>
                </div>
                <p className="text-emerald-300/70 text-sm">
                  ✅ Read-only operations independent of write layers
                  <br />
                  ✅ Can function even during governance/oracle failures
                  <br />✅ Cached data with 5-minute stale tolerance
                </p>
              </Card>

              <Card className="p-4 bg-yellow-500/5 border-yellow-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">Node Operator Console (Layer B)</h4>
                  <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30 text-yellow-300">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Partial
                  </Badge>
                </div>
                <p className="text-emerald-300/70 text-sm">
                  ✅ Can upload submissions even if oracles offline (queued)
                  <br />
                  ⚠️ Earnings display dependent on blockchain sync
                  <br />✅ Local caching of pending submissions
                </p>
              </Card>

              <Card className="p-4 bg-red-500/5 border-red-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">Oracle Auditor Console (Layer C)</h4>
                  <Badge variant="outline" className="bg-red-500/10 border-red-500/30 text-red-300">
                    <XCircle className="w-3 h-3 mr-1" />
                    Dependent
                  </Badge>
                </div>
                <p className="text-emerald-300/70 text-sm">
                  ❌ Requires IPFS access for evidence review
                  <br />
                  ❌ Requires blockchain for attestation signing
                  <br />
                  ⚠️ Needs isolation improvements: off-chain scoring with batch sync
                </p>
              </Card>

              <Card className="p-4 bg-green-500/5 border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">Buyers Portal (Layer D)</h4>
                  <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-300">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Isolated
                  </Badge>
                </div>
                <p className="text-emerald-300/70 text-sm">
                  ✅ Can browse market even if minting paused
                  <br />
                  ✅ Portfolio view cached independently
                  <br />✅ Retirement queue with async processing
                </p>
              </Card>

              <Card className="p-4 bg-green-500/5 border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">Governance Portal (Layer E)</h4>
                  <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-300">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Isolated
                  </Badge>
                </div>
                <p className="text-emerald-300/70 text-sm">
                  ✅ Voting continues even during system degradation
                  <br />
                  ✅ Timelock execution isolated from other operations
                  <br />✅ Emergency multisig operates independently
                </p>
              </Card>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
