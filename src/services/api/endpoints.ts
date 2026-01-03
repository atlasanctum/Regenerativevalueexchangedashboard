/**
 * RVE API Endpoints
 * Type-safe API endpoint definitions with validation
 */

import { apiClient, PaginatedResponse, APIResponse } from './client';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  category: 'environmental' | 'health' | 'cultural' | 'ecosystem';
  price: number;
  marketCap: number;
  supply: {
    total: number;
    circulating: number;
  };
  verified: boolean;
  custodianId: string;
  impactMetrics: {
    carbonSequestered?: number;
    areaRestored?: number;
    beneficiaries?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Custodian {
  id: string;
  name: string;
  type: 'indigenous' | 'cooperative' | 'ngo' | 'research' | 'government';
  verified: boolean;
  location: {
    country: string;
    region: string;
    coordinates?: [number, number];
  };
  expertise: string[];
  projectCount: number;
  reputation: number;
  createdAt: string;
}

export interface ImpactReport {
  id: string;
  projectId: string;
  reportingPeriod: {
    start: string;
    end: string;
  };
  metrics: Record<string, number>;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verifiedBy?: string[];
  documents: string[];
  createdAt: string;
}

export interface GovernanceProposal {
  id: string;
  title: string;
  description: string;
  category: 'protocol' | 'treasury' | 'verification' | 'community';
  status: 'active' | 'passed' | 'rejected' | 'pending';
  proposer: string;
  votes: {
    for: number;
    against: number;
    abstain: number;
  };
  quorum: number;
  deadline: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'transfer' | 'stake' | 'unstake';
  assetId: string;
  amount: number;
  price: number;
  from: string;
  to: string;
  status: 'pending' | 'completed' | 'failed';
  blockchainTxHash?: string;
  timestamp: string;
}

export interface User {
  id: string;
  address: string;
  role: 'user' | 'custodian' | 'verifier' | 'admin';
  verified: boolean;
  portfolio: {
    assetId: string;
    amount: number;
    averagePrice: number;
  }[];
  votingPower: number;
  createdAt: string;
}

export interface OracleVerification {
  id: string;
  projectId: string;
  verificationType: 'satellite' | 'iot' | 'drone' | 'manual';
  status: 'processing' | 'completed' | 'failed';
  confidence: number;
  dataPoints: number;
  aiModelVersion: string;
  results: Record<string, unknown>;
  timestamp: string;
}

// ============================================================================
// ASSET ENDPOINTS
// ============================================================================

export const assetAPI = {
  list: (params?: {
    category?: string;
    verified?: boolean;
    page?: number;
    pageSize?: number;
  }) => apiClient.get<PaginatedResponse<Asset>>('/assets', { 
    body: params 
  }),

  getById: (id: string) => 
    apiClient.get<APIResponse<Asset>>(`/assets/${id}`),

  create: (data: Partial<Asset>) =>
    apiClient.post<APIResponse<Asset>>('/assets', data),

  update: (id: string, data: Partial<Asset>) =>
    apiClient.put<APIResponse<Asset>>(`/assets/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<APIResponse<void>>(`/assets/${id}`),

  getPrice: (id: string) =>
    apiClient.get<APIResponse<{ price: number; timestamp: string }>>(`/assets/${id}/price`),

  getHistory: (id: string, params?: { interval?: string; from?: string; to?: string }) =>
    apiClient.get<APIResponse<Array<{ timestamp: string; price: number; volume: number }>>>(
      `/assets/${id}/history`,
      { body: params }
    ),
};

// ============================================================================
// CUSTODIAN ENDPOINTS
// ============================================================================

export const custodianAPI = {
  list: (params?: {
    type?: string;
    verified?: boolean;
    page?: number;
  }) => apiClient.get<PaginatedResponse<Custodian>>('/custodians', { body: params }),

  getById: (id: string) =>
    apiClient.get<APIResponse<Custodian>>(`/custodians/${id}`),

  apply: (data: Partial<Custodian>) =>
    apiClient.post<APIResponse<Custodian>>('/custodians/apply', data),

  getProjects: (id: string) =>
    apiClient.get<PaginatedResponse<Asset>>(`/custodians/${id}/projects`),

  getReports: (id: string) =>
    apiClient.get<PaginatedResponse<ImpactReport>>(`/custodians/${id}/reports`),
};

// ============================================================================
// IMPACT REPORTING ENDPOINTS
// ============================================================================

export const impactAPI = {
  submit: (data: Partial<ImpactReport>) =>
    apiClient.post<APIResponse<ImpactReport>>('/impact/reports', data),

  getById: (id: string) =>
    apiClient.get<APIResponse<ImpactReport>>(`/impact/reports/${id}`),

  list: (params?: {
    projectId?: string;
    status?: string;
    page?: number;
  }) => apiClient.get<PaginatedResponse<ImpactReport>>('/impact/reports', { body: params }),

  verify: (id: string, decision: 'approve' | 'reject', notes?: string) =>
    apiClient.post<APIResponse<ImpactReport>>(`/impact/reports/${id}/verify`, {
      decision,
      notes,
    }),

  getMetrics: (projectId: string) =>
    apiClient.get<APIResponse<Record<string, number>>>(`/impact/metrics/${projectId}`),
};

// ============================================================================
// GOVERNANCE ENDPOINTS
// ============================================================================

export const governanceAPI = {
  listProposals: (params?: {
    status?: string;
    category?: string;
    page?: number;
  }) => apiClient.get<PaginatedResponse<GovernanceProposal>>('/governance/proposals', { 
    body: params 
  }),

  getProposal: (id: string) =>
    apiClient.get<APIResponse<GovernanceProposal>>(`/governance/proposals/${id}`),

  createProposal: (data: Partial<GovernanceProposal>) =>
    apiClient.post<APIResponse<GovernanceProposal>>('/governance/proposals', data),

  vote: (proposalId: string, vote: 'for' | 'against' | 'abstain', amount: number) =>
    apiClient.post<APIResponse<{ txHash: string }>>(`/governance/proposals/${proposalId}/vote`, {
      vote,
      amount,
    }),

  stake: (amount: number) =>
    apiClient.post<APIResponse<{ txHash: string; votingPower: number }>>('/governance/stake', {
      amount,
    }),

  unstake: (amount: number) =>
    apiClient.post<APIResponse<{ txHash: string; votingPower: number }>>('/governance/unstake', {
      amount,
    }),
};

// ============================================================================
// TRADING ENDPOINTS
// ============================================================================

export const tradingAPI = {
  getOrderBook: (assetId: string) =>
    apiClient.get<APIResponse<{
      bids: Array<{ price: number; amount: number; total: number }>;
      asks: Array<{ price: number; amount: number; total: number }>;
    }>>(`/trading/orderbook/${assetId}`),

  placeOrder: (order: {
    assetId: string;
    type: 'market' | 'limit';
    side: 'buy' | 'sell';
    amount: number;
    price?: number;
  }) => apiClient.post<APIResponse<Transaction>>('/trading/orders', order),

  cancelOrder: (orderId: string) =>
    apiClient.delete<APIResponse<void>>(`/trading/orders/${orderId}`),

  getRecentTrades: (assetId: string, limit?: number) =>
    apiClient.get<APIResponse<Transaction[]>>(`/trading/trades/${assetId}`, {
      body: { limit },
    }),

  getUserOrders: (params?: { status?: string; page?: number }) =>
    apiClient.get<PaginatedResponse<Transaction>>('/trading/orders/me', { body: params }),
};

// ============================================================================
// ORACLE & VERIFICATION ENDPOINTS
// ============================================================================

export const oracleAPI = {
  requestVerification: (data: {
    projectId: string;
    verificationType: string;
    dataSource?: string;
  }) => apiClient.post<APIResponse<OracleVerification>>('/oracle/verify', data),

  getVerification: (id: string) =>
    apiClient.get<APIResponse<OracleVerification>>(`/oracle/verifications/${id}`),

  getProjectVerifications: (projectId: string) =>
    apiClient.get<PaginatedResponse<OracleVerification>>(
      `/oracle/verifications/project/${projectId}`
    ),

  getAIPrediction: (data: {
    projectId: string;
    metrics: string[];
    timeframe: number;
  }) => apiClient.post<APIResponse<{
    predictions: Record<string, { value: number; confidence: number }>;
    recommendations: Array<{ action: string; impact: string; priority: string }>;
  }>>('/oracle/ai/predict', data),
};

// ============================================================================
// USER & AUTH ENDPOINTS
// ============================================================================

export const authAPI = {
  login: (credentials: { address: string; signature: string; message: string }) =>
    apiClient.post<APIResponse<{ token: string; user: User }>>('/auth/login', credentials),

  logout: () =>
    apiClient.post<APIResponse<void>>('/auth/logout', {}),

  refresh: () =>
    apiClient.post<APIResponse<{ token: string }>>('/auth/refresh', {}),

  getProfile: () =>
    apiClient.get<APIResponse<User>>('/auth/profile'),

  updateProfile: (data: Partial<User>) =>
    apiClient.put<APIResponse<User>>('/auth/profile', data),
};

// ============================================================================
// DEFI ENDPOINTS
// ============================================================================

export const defiAPI = {
  // Liquidity Pools
  getLiquidityPools: () =>
    apiClient.get<PaginatedResponse<{
      id: string;
      pair: string;
      tvl: number;
      apy: number;
      volume24h: number;
    }>>('/defi/pools'),

  addLiquidity: (poolId: string, amounts: { token1: number; token2: number }) =>
    apiClient.post<APIResponse<{ txHash: string; lpTokens: number }>>(`/defi/pools/${poolId}/add`, amounts),

  removeLiquidity: (poolId: string, lpTokens: number) =>
    apiClient.post<APIResponse<{ txHash: string }>>(`/defi/pools/${poolId}/remove`, { lpTokens }),

  // Yield Farms
  getYieldFarms: () =>
    apiClient.get<PaginatedResponse<{
      id: string;
      name: string;
      token: string;
      apy: number;
      tvl: number;
    }>>('/defi/farms'),

  stake: (farmId: string, amount: number) =>
    apiClient.post<APIResponse<{ txHash: string }>>(`/defi/farms/${farmId}/stake`, { amount }),

  unstake: (farmId: string, amount: number) =>
    apiClient.post<APIResponse<{ txHash: string; rewards: number }>>(`/defi/farms/${farmId}/unstake`, { amount }),

  claimRewards: (farmId: string) =>
    apiClient.post<APIResponse<{ txHash: string; rewards: number }>>(`/defi/farms/${farmId}/claim`, {}),

  // Cross-Chain Bridge
  bridge: (data: {
    fromChain: string;
    toChain: string;
    asset: string;
    amount: number;
    recipient: string;
  }) => apiClient.post<APIResponse<{ txHash: string; bridgeTxId: string }>>('/defi/bridge', data),

  getBridgeStatus: (bridgeTxId: string) =>
    apiClient.get<APIResponse<{
      status: 'pending' | 'processing' | 'completed' | 'failed';
      progress: number;
      estimatedTime: number;
    }>>(`/defi/bridge/${bridgeTxId}`),
};

// ============================================================================
// ANALYTICS ENDPOINTS
// ============================================================================

export const analyticsAPI = {
  getMarketOverview: () =>
    apiClient.get<APIResponse<{
      totalMarketCap: number;
      volume24h: number;
      totalAssets: number;
      totalUsers: number;
      impactMetrics: Record<string, number>;
    }>>('/analytics/market'),

  getAssetAnalytics: (assetId: string) =>
    apiClient.get<APIResponse<{
      priceChange: Record<string, number>;
      volumeChange: Record<string, number>;
      holders: number;
      impactProgress: number;
    }>>(`/analytics/assets/${assetId}`),

  getUserPortfolio: () =>
    apiClient.get<APIResponse<{
      totalValue: number;
      pnl: number;
      pnlPercentage: number;
      assets: Array<{
        assetId: string;
        amount: number;
        value: number;
        pnl: number;
      }>;
    }>>('/analytics/portfolio'),
};
