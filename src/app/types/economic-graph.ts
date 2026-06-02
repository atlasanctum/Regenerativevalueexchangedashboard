// Economic Graph Types - Foundational data layer for Atlas Sanctum

export type EntityType = 'project' | 'investor' | 'verifier' | 'governor' | 'corporate';
export type AssetType = 'riu' | 'smart_contract' | 'impact_data' | 'treasury_position';
export type EventType = 'trade' | 'verification' | 'governance' | 'deployment' | 'staking';

export interface GraphNode {
  id: string;
  type: 'entity' | 'asset' | 'event';
  createdAt: Date;
  updatedAt: Date;
  metadata: Record<string, any>;
}

export interface Entity extends GraphNode {
  type: 'entity';
  entityType: EntityType;
  name: string;
  walletAddress: string;
  trustScore: number;
  reputationScore: number;
  joinedAt: Date;
  verifiedStatus: boolean;
}

export interface Asset extends GraphNode {
  type: 'asset';
  assetType: AssetType;
  name: string;
  value: number;
  currency: 'USD' | 'RIU' | 'ETH';
  ownerId: string;
  verified: boolean;
}

export interface Event extends GraphNode {
  type: 'event';
  eventType: EventType;
  timestamp: Date;
  participants: string[];
  value?: number;
  status: 'pending' | 'completed' | 'failed';
}

export interface GraphEdge {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  edgeType: 'ownership' | 'verification' | 'trust' | 'flow' | 'governance';
  weight: number;
  createdAt: Date;
  metadata: Record<string, any>;
}

export interface OwnershipEdge extends GraphEdge {
  edgeType: 'ownership';
  percentage: number;
  acquiredAt: Date;
}

export interface VerificationEdge extends GraphEdge {
  edgeType: 'verification';
  verificationMethod: 'satellite' | 'iot' | 'computer_vision' | 'predictive';
  confidence: number;
  verifiedAt: Date;
}

export interface TrustEdge extends GraphEdge {
  edgeType: 'trust';
  trustScore: number;
  interactions: number;
  lastInteraction: Date;
  historicalTrend: 'increasing' | 'stable' | 'decreasing';
}

export interface FlowEdge extends GraphEdge {
  edgeType: 'flow';
  value: number;
  currency: 'USD' | 'RIU' | 'ETH';
  flowDirection: 'inbound' | 'outbound';
  timestamp: Date;
}

export interface EconomicGraph {
  nodes: Map<string, GraphNode>;
  edges: Map<string, GraphEdge>;

  // Query methods
  getNode(id: string): GraphNode | undefined;
  getEdges(nodeId: string, edgeType?: string): GraphEdge[];
  getConnectedNodes(nodeId: string, depth: number): GraphNode[];

  // Analytics methods
  calculateTrustScore(entityId: string): number;
  findShortestPath(fromId: string, toId: string): GraphNode[];
  detectAnomalies(): AnomalyReport[];
  getNetworkMetrics(): NetworkMetrics;
}

export interface AnomalyReport {
  id: string;
  detectedAt: Date;
  anomalyType: 'sudden_trust_drop' | 'unusual_flow' | 'verification_inconsistency' | 'governance_manipulation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedNodes: string[];
  recommendation: string;
}

export interface NetworkMetrics {
  totalNodes: number;
  totalEdges: number;
  averageTrustScore: number;
  networkDensity: number;
  clusteringCoefficient: number;
  centralityScores: Map<string, number>;
}

// AI Agent Types
export interface AIAgent {
  id: string;
  engineType: 'deal' | 'trust' | 'treasury' | 'growth' | 'impact' | 'risk' | 'reputation';
  model: 'gpt-4' | 'claude-3-opus' | 'llama-3-70b';
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  tools: string[];
  memoryWindow: number;
  status: 'active' | 'idle' | 'error';
  lastExecutionAt?: Date;
}

export interface AgentAction {
  id: string;
  agentId: string;
  actionType: 'query' | 'recommendation' | 'deployment' | 'alert' | 'analysis';
  timestamp: Date;
  input: Record<string, any>;
  output: Record<string, any>;
  status: 'pending' | 'completed' | 'failed';
  executionTimeMs: number;
}

// Engine Communication Types
export interface EngineEvent {
  id: string;
  engineSource: string;
  eventType: string;
  timestamp: Date;
  payload: Record<string, any>;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface EngineTask {
  id: string;
  engineId: string;
  taskType: string;
  priority: number;
  status: 'queued' | 'executing' | 'completed' | 'failed';
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  payload: Record<string, any>;
  result?: Record<string, any>;
}
