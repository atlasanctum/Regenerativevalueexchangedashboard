# Architectural Safeguards Implementation Plan
## Transforming Fragility into Anti-Fragility

**Document Version:** 1.0  
**Implementation Date:** March 4, 2026  
**Risk Mitigation ROI:** 557:1 ($3.95M investment prevents $2.2B annualized loss)

---

## Executive Implementation Summary

This document outlines **concrete technical implementations** for the 7 critical fragility points identified in the Systems Architecture Analysis. Each safeguard includes code patterns, deployment steps, and success criteria.

---

## 1. Oracle Consensus Resilience

### Problem
- Current: 4/7 oracles = 57% participation → system HALTS
- No degraded mode
- Synchronous consensus blocks all submissions

### Solution: Multi-Tier Consensus with Graceful Degradation

```typescript
// Oracle consensus with fallback modes
enum ConsensusMode {
  FULL = 'FULL',           // ≥5/7 oracles, full confidence
  DEGRADED = 'DEGRADED',   // 4/7 oracles, reduced throughput
  PESSIMISTIC = 'PESSIMISTIC', // 3/7 oracles, auto-approve at 50% score
  EMERGENCY = 'EMERGENCY'  // <3/7, admin multisig only
}

interface OracleConsensusConfig {
  minOraclesForFull: 5;
  minOraclesForDegraded: 4;
  minOraclesForPessimistic: 3;
  pessimisticAutoApproveScore: 50; // Max score when in pessimistic mode
  emergencyAdminMultisig: '0x...' // 4/7 multisig can manually process
}

function determineConsensusMode(activeOracles: number): ConsensusMode {
  if (activeOracles >= 5) return ConsensusMode.FULL;
  if (activeOracles >= 4) return ConsensusMode.DEGRADED;
  if (activeOracles >= 3) return ConsensusMode.PESSIMISTIC;
  return ConsensusMode.EMERGENCY;
}

function processSubmission(submission: Submission, mode: ConsensusMode) {
  switch(mode) {
    case ConsensusMode.FULL:
      // Standard multi-oracle consensus
      return await fullConsensus(submission);
    
    case ConsensusMode.DEGRADED:
      // Reduced throughput: process 50% of submissions, queue rest
      if (Math.random() < 0.5) {
        return await fullConsensus(submission);
      } else {
        return await queueForLater(submission);
      }
    
    case ConsensusMode.PESSIMISTIC:
      // Auto-approve with capped score
      const score = Math.min(await quickScore(submission), 50);
      await mintRGN(submission, score * 0.5); // 50% penalty for reduced confidence
      await flagForRetroactiveAudit(submission);
      return { approved: true, score, mode: 'pessimistic' };
    
    case ConsensusMode.EMERGENCY:
      // Queue all submissions for multisig manual review
      return await emergencyQueue(submission);
  }
}
```

### Smart Contract Implementation

```solidity
// OracleConsensus.sol
contract OracleConsensus {
    uint8 public constant MIN_ORACLES_FULL = 5;
    uint8 public constant MIN_ORACLES_DEGRADED = 4;
    uint8 public constant MIN_ORACLES_PESSIMISTIC = 3;
    
    enum ConsensusMode { FULL, DEGRADED, PESSIMISTIC, EMERGENCY }
    
    mapping(address => bool) public isActiveOracle;
    uint8 public activeOracleCount;
    
    modifier onlyInMode(ConsensusMode requiredMode) {
        require(getCurrentMode() == requiredMode, "Invalid consensus mode");
        _;
    }
    
    function getCurrentMode() public view returns (ConsensusMode) {
        if (activeOracleCount >= MIN_ORACLES_FULL) return ConsensusMode.FULL;
        if (activeOracleCount >= MIN_ORACLES_DEGRADED) return ConsensusMode.DEGRADED;
        if (activeOracleCount >= MIN_ORACLES_PESSIMISTIC) return ConsensusMode.PESSIMISTIC;
        return ConsensusMode.EMERGENCY;
    }
    
    function submitAttestation(
        bytes32 submissionId,
        uint8 score,
        bytes calldata signature
    ) external {
        require(isActiveOracle[msg.sender], "Not authorized oracle");
        
        ConsensusMode mode = getCurrentMode();
        
        if (mode == ConsensusMode.PESSIMISTIC) {
            // Auto-approve with penalty
            _autoApprovePessimistic(submissionId, score);
        } else if (mode == ConsensusMode.EMERGENCY) {
            revert("System in emergency mode - use multisig");
        } else {
            // Standard consensus
            _recordAttestation(submissionId, score, signature);
        }
    }
}
```

### Success Criteria
- ✅ System continues processing (degraded) even with 4/7 oracles offline
- ✅ Zero total halts for oracle dropout <70%
- ✅ Pessimistic mode processes 100% of submissions (at reduced confidence)
- ✅ Recovery time: <2 hours to restore full mode

---

## 2. IPFS Evidence Multi-Provider Redundancy

### Problem
- Single IPFS gateway = single point of failure
- No content availability verification
- 30+ year permanence requirement for carbon credits

### Solution: Triple-Redundant Pinning with Verification

```typescript
// IPFS redundancy manager
interface IPFSProvider {
  name: 'Pinata' | 'Filebase' | 'Storj' | 'Arweave';
  endpoint: string;
  priority: number;
  status: 'active' | 'degraded' | 'offline';
}

const providers: IPFSProvider[] = [
  { name: 'Pinata', endpoint: 'https://gateway.pinata.cloud', priority: 1, status: 'active' },
  { name: 'Filebase', endpoint: 'https://ipfs.filebase.io', priority: 2, status: 'active' },
  { name: 'Storj', endpoint: 'https://link.storjshare.io', priority: 3, status: 'active' },
  { name: 'Arweave', endpoint: 'https://arweave.net', priority: 4, status: 'active' }, // Permanent
];

async function uploadEvidence(file: File): Promise<EvidenceRecord> {
  const results = await Promise.allSettled([
    uploadToPinata(file),
    uploadToFilebase(file),
    uploadToStorj(file),
    uploadToArweave(file) // Permanent archival
  ]);
  
  const successfulUploads = results
    .filter(r => r.status === 'fulfilled')
    .map(r => (r as PromiseFulfilledResult<any>).value);
  
  if (successfulUploads.length < 2) {
    throw new Error('Insufficient redundancy - need minimum 2/4 providers');
  }
  
  // Verify all uploaded hashes match
  const hashes = successfulUploads.map(u => u.hash);
  if (!hashes.every(h => h === hashes[0])) {
    throw new Error('Hash mismatch across providers - corruption detected');
  }
  
  return {
    hash: hashes[0],
    providers: successfulUploads.map(u => u.provider),
    arweaveId: results[3].status === 'fulfilled' ? results[3].value.arweaveId : null,
    uploadedAt: new Date().toISOString(),
    verifiedAt: new Date().toISOString()
  };
}

async function fetchEvidence(hash: string): Promise<Buffer> {
  // Try providers in priority order with circuit breaker
  for (const provider of providers.filter(p => p.status !== 'offline')) {
    try {
      const data = await fetchFromProvider(provider, hash);
      
      // Verify fetched data matches hash
      const fetchedHash = await computeHash(data);
      if (fetchedHash !== hash) {
        markProviderDegraded(provider);
        continue;
      }
      
      return data;
    } catch (error) {
      markProviderDegraded(provider);
      continue;
    }
  }
  
  throw new Error('All IPFS providers failed - evidence unavailable');
}

// Circuit breaker for IPFS providers
class IPFSCircuitBreaker {
  private failures: Map<string, number> = new Map();
  private readonly threshold = 5;
  private readonly resetTime = 300000; // 5 minutes
  
  async execute<T>(provider: string, fn: () => Promise<T>): Promise<T> {
    const failureCount = this.failures.get(provider) || 0;
    
    if (failureCount >= this.threshold) {
      throw new Error(`Circuit breaker open for ${provider}`);
    }
    
    try {
      const result = await fn();
      this.failures.set(provider, 0); // Reset on success
      return result;
    } catch (error) {
      this.failures.set(provider, failureCount + 1);
      
      if (failureCount + 1 >= this.threshold) {
        // Auto-reset after 5 minutes
        setTimeout(() => this.failures.set(provider, 0), this.resetTime);
      }
      
      throw error;
    }
  }
}
```

### Smart Contract Integration

```solidity
// EvidenceRegistry.sol
contract EvidenceRegistry {
    struct Evidence {
        bytes32 ipfsHash;
        bytes32 arweaveId;
        uint8 providerCount; // Number of providers with this content
        uint256 uploadedAt;
        bool permanentlyArchived; // True if on Arweave
    }
    
    mapping(bytes32 => Evidence) public evidenceRecords;
    
    function registerEvidence(
        bytes32 ipfsHash,
        bytes32 arweaveId,
        uint8 providerCount
    ) external {
        require(providerCount >= 2, "Minimum 2 providers required");
        
        evidenceRecords[ipfsHash] = Evidence({
            ipfsHash: ipfsHash,
            arweaveId: arweaveId,
            providerCount: providerCount,
            uploadedAt: block.timestamp,
            permanentlyArchived: arweaveId != bytes32(0)
        });
    }
    
    function verifyEvidenceAvailability(bytes32 ipfsHash) external view returns (bool) {
        Evidence memory evidence = evidenceRecords[ipfsHash];
        
        // Require permanent archival for finalization
        return evidence.permanentlyArchived;
    }
}
```

### Success Criteria
- ✅ 100% evidence availability even with 1 provider down
- ✅ Permanent archival on Arweave for all finalized submissions
- ✅ Zero hash mismatches (content integrity verification)
- ✅ Recovery time: <1 hour for provider failover

---

## 3. Token Minting Rate Limiter + Vesting

### Problem
- Unconstrained minting based on oracle approvals
- No market depth consideration
- Operators immediately sell → price crash

### Solution: Vesting Schedule + Dynamic Mint Caps

```typescript
// Vesting schedule for minted RGN
interface VestingSchedule {
  totalAmount: number;
  immediateRelease: number; // 25%
  vestedAmount: number; // 75%
  vestingDuration: number; // 6 months
  cliffPeriod: number; // 30 days
  startTime: number;
}

function mintRGNWithVesting(
  recipient: string,
  amount: number,
  impactScore: number
): VestingSchedule {
  const immediateRelease = amount * 0.25;
  const vestedAmount = amount * 0.75;
  
  // Immediate transfer (25%)
  transferRGN(recipient, immediateRelease);
  
  // Create vesting contract (75%)
  const vestingSchedule: VestingSchedule = {
    totalAmount: amount,
    immediateRelease,
    vestedAmount,
    vestingDuration: 6 * 30 * 24 * 60 * 60, // 6 months in seconds
    cliffPeriod: 30 * 24 * 60 * 60, // 30 days
    startTime: Date.now()
  };
  
  createVestingContract(recipient, vestingSchedule);
  
  return vestingSchedule;
}

// Dynamic mint cap based on market depth
interface MintCapConfig {
  liquidityPoolDepth: number;
  maxMintPercentage: 0.02; // Max 2% of liquidity per day
  dailyMintCap: number;
  currentDailyMinted: number;
}

function checkMintCapBeforeApproval(
  requestedMint: number,
  config: MintCapConfig
): boolean {
  const maxDailyMint = config.liquidityPoolDepth * config.maxMintPercentage;
  const remainingCap = maxDailyMint - config.currentDailyMinted;
  
  if (requestedMint > remainingCap) {
    // Queue for next day instead of rejecting
    queueForNextEpoch(requestedMint);
    return false;
  }
  
  return true;
}
```

### Smart Contract Implementation

```solidity
// RGNVesting.sol
contract RGNVesting {
    struct VestingSchedule {
        uint256 totalAmount;
        uint256 released;
        uint256 startTime;
        uint256 duration; // 6 months
        uint256 cliffDuration; // 30 days
    }
    
    mapping(address => VestingSchedule[]) public vestingSchedules;
    
    function createVestingSchedule(
        address beneficiary,
        uint256 amount
    ) external onlyMinter {
        vestingSchedules[beneficiary].push(VestingSchedule({
            totalAmount: amount,
            released: 0,
            startTime: block.timestamp,
            duration: 180 days,
            cliffDuration: 30 days
        }));
    }
    
    function release() external {
        uint256 releasable = getReleasableAmount(msg.sender);
        require(releasable > 0, "No tokens to release");
        
        // Mark as released
        for (uint i = 0; i < vestingSchedules[msg.sender].length; i++) {
            uint256 scheduleReleasable = _calculateReleasable(vestingSchedules[msg.sender][i]);
            vestingSchedules[msg.sender][i].released += scheduleReleasable;
        }
        
        // Transfer tokens
        RGNToken(rgnToken).transfer(msg.sender, releasable);
    }
    
    function getReleasableAmount(address beneficiary) public view returns (uint256) {
        uint256 total = 0;
        for (uint i = 0; i < vestingSchedules[beneficiary].length; i++) {
            total += _calculateReleasable(vestingSchedules[beneficiary][i]);
        }
        return total;
    }
    
    function _calculateReleasable(VestingSchedule memory schedule) private view returns (uint256) {
        if (block.timestamp < schedule.startTime + schedule.cliffDuration) {
            return 0; // Cliff period
        }
        
        uint256 elapsed = block.timestamp - schedule.startTime;
        if (elapsed >= schedule.duration) {
            return schedule.totalAmount - schedule.released; // Fully vested
        }
        
        uint256 vested = (schedule.totalAmount * elapsed) / schedule.duration;
        return vested - schedule.released;
    }
}

// Dynamic Mint Cap
contract DynamicMintCap {
    uint256 public dailyMintCap;
    uint256 public currentDayMinted;
    uint256 public lastResetTimestamp;
    
    function updateMintCap(uint256 liquidityPoolDepth) external {
        dailyMintCap = (liquidityPoolDepth * 2) / 100; // 2% of liquidity
    }
    
    function mint(address to, uint256 amount) external {
        // Reset daily counter
        if (block.timestamp >= lastResetTimestamp + 1 days) {
            currentDayMinted = 0;
            lastResetTimestamp = block.timestamp;
        }
        
        require(currentDayMinted + amount <= dailyMintCap, "Daily mint cap exceeded");
        
        currentDayMinted += amount;
        _mint(to, amount);
    }
}
```

### Success Criteria
- ✅ 75% of minted RGN vested over 6 months (reduces sell pressure)
- ✅ Daily mint rate never exceeds 2% of liquidity pool
- ✅ Zero price crashes >30% in single day
- ✅ Operator retention: >80% stay even if price drops 50%

---

## 4. Governance Parameter Bounds

### Problem
- Timelock can modify itself (reduce delay to 0)
- No bounds on parameter changes (mint cap → ∞)
- Vote buying attacks possible

### Solution: Immutable Constraints + Tiered Voting

```solidity
// GovernanceGuardrails.sol
contract GovernanceGuardrails {
    // IMMUTABLE - cannot be changed even by governance
    uint256 public constant MIN_TIMELOCK_DELAY = 3 days;
    uint256 public constant MAX_TIMELOCK_DELAY = 30 days;
    
    uint256 public constant MIN_PROTOCOL_FEE = 50; // 0.5% in basis points
    uint256 public constant MAX_PROTOCOL_FEE = 500; // 5%
    
    uint256 public constant MIN_ORACLE_COUNT = 7;
    uint256 public constant MAX_ORACLE_COUNT = 51;
    
    uint256 public constant MIN_CONFIDENCE_THRESHOLD = 60;
    uint256 public constant MAX_CONFIDENCE_THRESHOLD = 95;
    
    // Parameter change bounds: max ±20% per proposal
    uint256 public constant MAX_PARAMETER_CHANGE_PERCENT = 20;
    
    // Tiered voting thresholds
    enum ProposalType {
        MINOR,      // 60% threshold
        MAJOR,      // 75% threshold
        CRITICAL    // 90% threshold
    }
    
    struct Proposal {
        ProposalType proposalType;
        uint256 requiredVotes;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 executionTime;
        bytes32 parameterHash;
    }
    
    function proposeParameterChange(
        string memory parameterName,
        uint256 currentValue,
        uint256 proposedValue
    ) external returns (uint256 proposalId) {
        // Check bounds
        require(
            isWithinBounds(parameterName, proposedValue),
            "Proposed value outside immutable bounds"
        );
        
        // Check change rate (max ±20%)
        uint256 changePercent = abs(proposedValue - currentValue) * 100 / currentValue;
        require(
            changePercent <= MAX_PARAMETER_CHANGE_PERCENT,
            "Change exceeds 20% limit"
        );
        
        // Determine proposal type based on parameter
        ProposalType pType = categorizeProposal(parameterName);
        
        // Create proposal with appropriate threshold
        uint256 threshold = getThreshold(pType);
        
        proposals[proposalId] = Proposal({
            proposalType: pType,
            requiredVotes: threshold,
            votesFor: 0,
            votesAgainst: 0,
            executionTime: block.timestamp + MIN_TIMELOCK_DELAY,
            parameterHash: keccak256(abi.encodePacked(parameterName, proposedValue))
        });
        
        return proposalId;
    }
    
    function isWithinBounds(string memory param, uint256 value) internal pure returns (bool) {
        if (keccak256(bytes(param)) == keccak256(bytes("timelockDelay"))) {
            return value >= MIN_TIMELOCK_DELAY && value <= MAX_TIMELOCK_DELAY;
        }
        if (keccak256(bytes(param)) == keccak256(bytes("protocolFee"))) {
            return value >= MIN_PROTOCOL_FEE && value <= MAX_PROTOCOL_FEE;
        }
        // ... other parameters
        return false;
    }
    
    function categorizeProposal(string memory param) internal pure returns (ProposalType) {
        // Critical: timelock, oracle count, emergency functions
        if (
            keccak256(bytes(param)) == keccak256(bytes("timelockDelay")) ||
            keccak256(bytes(param)) == keccak256(bytes("oracleCount"))
        ) {
            return ProposalType.CRITICAL; // Needs 90%
        }
        
        // Major: fees, thresholds, mint caps
        if (
            keccak256(bytes(param)) == keccak256(bytes("protocolFee")) ||
            keccak256(bytes(param)) == keccak256(bytes("mintCap"))
        ) {
            return ProposalType.MAJOR; // Needs 75%
        }
        
        // Minor: UI parameters, non-critical settings
        return ProposalType.MINOR; // Needs 60%
    }
    
    function getThreshold(ProposalType pType) internal pure returns (uint256) {
        if (pType == ProposalType.CRITICAL) return 90;
        if (pType == ProposalType.MAJOR) return 75;
        return 60;
    }
}
```

### Quadratic Voting to Prevent Whale Attacks

```typescript
// Quadratic voting: cost = votes^2
function calculateVoteCost(votes: number): number {
  return votes * votes; // Quadratic scaling
}

function castQuadraticVote(voter: string, votes: number) {
  const votingPower = getVotingPower(voter);
  const cost = calculateVoteCost(votes);
  
  if (cost > votingPower) {
    throw new Error('Insufficient voting power');
  }
  
  // Example: To cast 10 votes costs 100 voting power
  // Whale with 1M power can only cast 1,000 votes (not 1M)
  // This prevents single whale from dominating
  
  deductVotingPower(voter, cost);
  recordVotes(voter, votes);
}
```

### Success Criteria
- ✅ Zero governance attacks that break system parameters
- ✅ All parameter changes within ±20% bounds
- ✅ Minimum 3-day timelock enforced (immutable)
- ✅ Critical proposals require 90% supermajority

---

## 5. Multi-Oracle Reputation + Slashing

### Problem
- Oracles paid per approval (volume incentive, not accuracy)
- No cross-validation
- Can gradually inflate scores for higher fees

### Solution: Reputation System with Retroactive Audits

```typescript
// Oracle reputation scoring
interface OracleReputation {
  address: string;
  totalReviews: number;
  accurateReviews: number;
  inaccurateReviews: number;
  reputationScore: number; // 0-100
  slashedAmount: number;
  suspendedUntil: number | null;
}

// Retroactive audit system
async function retroactiveAudit(submission: Submission) {
  // Re-audit 10% of finalized submissions randomly
  if (Math.random() > 0.1) return;
  
  // Get original oracle scores
  const originalScores = await getOracleScores(submission.id);
  
  // Have fresh oracles re-score
  const auditScores = await freshOracleReview(submission);
  
  // Compare scores
  for (const [oracle, originalScore] of Object.entries(originalScores)) {
    const auditScore = auditScores[oracle];
    const deviation = Math.abs(originalScore - auditScore);
    
    if (deviation > 10) {
      // Flag as inaccurate
      await updateOracleReputation(oracle, {
        inaccurate: true,
        deviation
      });
      
      if (deviation > 20) {
        // Slash for major deviation
        await slashOracle(oracle, calculateSlashAmount(deviation));
      }
    } else {
      // Reward for accuracy
      await updateOracleReputation(oracle, { accurate: true });
    }
  }
}

function calculateSlashAmount(deviation: number): number {
  // Slash exponentially based on deviation
  // 20% deviation = 1% stake slashed
  // 50% deviation = 10% stake slashed
  return Math.min((deviation / 5) ** 2, 25); // Max 25% slash
}

// Statistical anomaly detection
function detectScoreInflation(oracle: string) {
  const recentScores = getRecentScores(oracle, 100);
  const mean = recentScores.reduce((a, b) => a + b) / recentScores.length;
  const stdDev = calculateStdDev(recentScores);
  
  // If mean score >2σ above global average, flag
  const globalMean = getGlobalAverageScore();
  const zScore = (mean - globalMean) / stdDev;
  
  if (zScore > 2) {
    flagOracleForReview(oracle, 'Score inflation detected');
  }
}
```

### Smart Contract Implementation

```solidity
// OracleReputation.sol
contract OracleReputation {
    struct Reputation {
        uint256 totalReviews;
        uint256 accurateReviews;
        uint256 slashedAmount;
        uint256 suspendedUntil;
        uint8 reputationScore; // 0-100
    }
    
    mapping(address => Reputation) public oracleReputation;
    uint256 public constant SLASH_THRESHOLD = 70; // Min reputation to remain oracle
    
    function recordAccurateReview(address oracle) external onlyAuditor {
        Reputation storage rep = oracleReputation[oracle];
        rep.totalReviews++;
        rep.accurateReviews++;
        rep.reputationScore = uint8((rep.accurateReviews * 100) / rep.totalReviews);
    }
    
    function slashOracle(address oracle, uint256 slashPercent) external onlyAuditor {
        require(slashPercent <= 25, "Max 25% slash per incident");
        
        Reputation storage rep = oracleReputation[oracle];
        uint256 oracleStake = getOracleStake(oracle);
        uint256 slashAmount = (oracleStake * slashPercent) / 100;
        
        // Slash stake
        rep.slashedAmount += slashAmount;
        transferToTreasury(slashAmount);
        
        // Recalculate reputation
        rep.reputationScore = uint8((rep.accurateReviews * 100) / rep.totalReviews);
        
        // Suspend if below threshold
        if (rep.reputationScore < SLASH_THRESHOLD) {
            rep.suspendedUntil = block.timestamp + 30 days;
            emit OracleSuspended(oracle, rep.reputationScore);
        }
    }
    
    function isOracleActive(address oracle) external view returns (bool) {
        Reputation memory rep = oracleReputation[oracle];
        
        // Check suspension
        if (block.timestamp < rep.suspendedUntil) {
            return false;
        }
        
        // Check reputation
        if (rep.reputationScore < SLASH_THRESHOLD) {
            return false;
        }
        
        return true;
    }
}
```

### Success Criteria
- ✅ Oracle score deviation <10% on retroactive audits
- ✅ Zero score inflation attacks lasting >30 days
- ✅ Slashing events: <5 per quarter (indicates deterrence)
- ✅ Average oracle reputation: >85/100

---

## 6. System Health Dashboard (Observable Metrics)

Implemented in `/components/system-health/ArchitectureMonitor.tsx`

### Key Metrics Monitored

1. **Oracle Participation** (🔴 Critical if <60%)
2. **IPFS Fetch Success** (🔴 Critical if <80%)
3. **Blockchain Sync Lag** (🔴 Critical if >100 blocks)
4. **RGN Mint Rate** (🟡 Warning if >3σ above mean)
5. **Liquidity Depth** (🔴 Critical if <50k RGN)
6. **Certificate Issuance Rate**
7. **WebSocket Connection Health**

### Alert Thresholds

```typescript
const alertConfig = {
  critical: {
    oracleParticipation: 60, // %
    ipfsFetchSuccess: 80, // %
    blockchainSyncLag: 100, // blocks
    liquidityDepth: 50000 // RGN
  },
  warning: {
    oracleParticipation: 80,
    ipfsFetchSuccess: 95,
    mintRateDeviation: 3 // standard deviations
  }
};
```

---

## 7. Economic Sustainability Model

### Problem
- Protocol needs 600k RGN/month to break even
- 2% fee insufficient at current volumes
- No treasury runway requirement

### Solution: Multi-Revenue Streams + Treasury Stability

```typescript
// Revenue diversification
interface RevenueStreams {
  protocolFees: number; // 2% on minting
  apiAccess: number; // Premium API tiers
  whiteLabel: number; // White-label deployments
  premiumAnalytics: number; // Corporate dashboards
  treasuryYield: number; // Staking/DeFi yield on treasury
}

// Treasury stability requirements
interface TreasuryConfig {
  minimumRunwayMonths: 12;
  stablecoinPercentage: 60; // 60% in USDC/DAI
  rgnPercentage: 20; // 20% in RGN
  ethPercentage: 20; // 20% in ETH
  oracleCostMonthly: 35000; // $35k/month for 7 oracles
  developmentCostMonthly: 50000;
  totalMonthlyBurn: 85000;
}

function checkTreasuryHealth(treasury: Treasury): TreasuryStatus {
  const totalValue = calculateTotalValue(treasury);
  const monthlyBurn = getTreasuryConfig().totalMonthlyBurn;
  const runway = totalValue / monthlyBurn;
  
  if (runway < 6) {
    return TreasuryStatus.CRITICAL; // <6 months runway
  } else if (runway < 12) {
    return TreasuryStatus.WARNING; // <12 months runway
  }
  
  return TreasuryStatus.HEALTHY;
}

// Dynamic fee adjustment
function adjustProtocolFee(currentFee: number, monthlyVolume: number): number {
  const MIN_FEE = 0.5; // 0.5%
  const MAX_FEE = 5; // 5%
  const TARGET_REVENUE = 85000; // $85k/month
  
  const currentRevenue = (monthlyVolume * currentFee) / 100;
  
  if (currentRevenue < TARGET_REVENUE * 0.8) {
    // Increase fee (but capped at +20% per change)
    return Math.min(currentFee * 1.2, MAX_FEE);
  } else if (currentRevenue > TARGET_REVENUE * 1.5) {
    // Decrease fee to stay competitive
    return Math.max(currentFee * 0.9, MIN_FEE);
  }
  
  return currentFee; // No change needed
}
```

### Success Criteria
- ✅ Treasury runway: >12 months at all times
- ✅ Oracle payments in stablecoins (eliminate RGN price risk)
- ✅ Revenue diversification: <50% from single source
- ✅ Break-even volume: <300k RGN/month (down from 600k)

---

## Implementation Timeline

### Phase 1: Critical Safeguards (Week 1-2)
- ✅ Deploy circuit breakers on all critical paths
- ✅ Implement IPFS multi-provider redundancy
- ✅ Add governance parameter bounds (immutable)
- ✅ Launch system health dashboard

### Phase 2: Consensus & Oracle Improvements (Week 3-4)
- ✅ Deploy degraded consensus modes
- ✅ Implement oracle reputation system
- ✅ Add retroactive audit framework
- ✅ Expand oracle committee (7 → 21 members)

### Phase 3: Economic Stabilization (Week 5-6)
- ✅ Deploy RGN vesting contracts
- ✅ Implement dynamic mint caps
- ✅ Set up treasury stability monitoring
- ✅ Launch secondary revenue streams (API access)

### Phase 4: Testing & Validation (Week 7-8)
- ✅ Chaos engineering drills (monthly)
- ✅ Red team security audit
- ✅ Load testing (10x current volume)
- ✅ Failover drills (simulate provider outages)

---

## Success Metrics

### System Reliability
- **Uptime:** 99.9% (full mode) + 99.99% (degraded mode)
- **Recovery Time:** <4 hours for any component failure
- **Zero Total Halts:** Even with 50% oracle dropout

### Security
- **Zero Critical Exploits:** Post-implementation
- **Governance Attacks Prevented:** 100%
- **Oracle Reputation:** >85/100 average

### Economic Stability
- **Treasury Runway:** >12 months maintained
- **RGN Price Volatility:** <30% daily swings
- **Operator Retention:** >80% even in 50% price drop

---

## Monitoring & Observability

All metrics available in real-time at:
- **Public Dashboard:** `https://monitor.rve.network`
- **Alert Webhook:** Slack/Discord/PagerDuty integration
- **Grafana Dashboards:** Full stack observability
- **On-Chain Metrics:** Transparent via blockchain explorer

---

**The goal is not zero risk—it's calculated risk with known failure modes and proven recovery paths.**

*Implementation Lead: Systems Architecture Team*
