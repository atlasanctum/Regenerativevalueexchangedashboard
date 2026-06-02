import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layouts/RootLayout";
import { LandingHero } from "./components/rve-elevated/LandingHero";
import { ProjectShowcase } from "./components/rve-elevated/ProjectShowcase";
import { InstitutionalPortal } from "./components/rve-elevated/InstitutionalPortal";
import { Overview } from "./components/Overview";
import { CriticalOperations } from "./components/CriticalOperations";
import { CriticalInnovations } from "./components/CriticalInnovations";
import { DataQualityDashboard } from "./components/data-quality/DataQualityDashboard";
import { AIModelingDashboard } from "./components/engineering-guilds/AIModelingDashboard";
import { InfrastructureDevOpsDashboard } from "./components/engineering-guilds/InfrastructureDevOpsDashboard";
import { ProductInterfaceDashboard } from "./components/engineering-guilds/ProductInterfaceDashboard";
import { EthicalSystemsDashboard } from "./components/engineering-guilds/EthicalSystemsDashboard";
import { ArchitectureMonitor } from "./components/system-health/ArchitectureMonitor";
import { PublicDashboard } from "./components/truth-coordination/PublicDashboard";
import { NodeOperatorConsole } from "./components/truth-coordination/NodeOperatorConsole";
import { OracleAuditorConsole } from "./components/truth-coordination/OracleAuditorConsole";
import { BuyersPortal } from "./components/truth-coordination/BuyersPortal";
import { GovernancePortal } from "./components/truth-coordination/GovernancePortal";

// New Feature Components
import { ImpactStoryEngine } from "./components/features/social/ImpactStoryEngine";
import { StakeholderForums } from "./components/features/social/StakeholderForums";
import { ImpactChallenges } from "./components/features/social/ImpactChallenges";
import { ExpertQA } from "./components/features/social/ExpertQA";
import { AdvancedTradingHub } from "./components/features/trading/AdvancedTradingHub";
import { FuturesContracts } from "./components/features/trading/FuturesContracts";
import { ImpactBundling } from "./components/features/trading/ImpactBundling";
import { AutomatedMarketMaker } from "./components/features/trading/AutomatedMarketMaker";
import { PeerToPeerMarketplace } from "./components/features/trading/PeerToPeerMarketplace";
import { PredictiveAnalytics } from "./components/features/intelligence/PredictiveAnalytics";
import { ComparativeBenchmarking } from "./components/features/intelligence/ComparativeBenchmarking";
import { ROICalculator } from "./components/features/intelligence/ROICalculator";
import { IntelligentAlerts } from "./components/features/intelligence/IntelligentAlerts";
import { NaturalLanguageQuery } from "./components/features/intelligence/NaturalLanguageQuery";
import { InteroperabilityHub } from "./components/features/interoperability/InteroperabilityHub";
import { VerificationHub } from "./components/features/verification/VerificationHub";
import { Site3DVisualization } from "./components/features/verification/Site3DVisualization";
import { DisputeResolution } from "./components/features/verification/DisputeResolution";
import { CommunityVerification } from "./components/features/verification/CommunityVerification";
import { WhistleblowerPortal } from "./components/features/verification/WhistleblowerPortal";
import { RegenerativeFinanceHub } from "./components/features/finance/RegenerativeFinanceHub";
import { RevenueSharingAgreements } from "./components/features/finance/RevenueSharingAgreements";
import { RegenerativeBonds } from "./components/features/finance/RegenerativeBonds";
import { StakingYield } from "./components/features/finance/StakingYield";
import { MicroInvestments } from "./components/features/finance/MicroInvestments";
import { PerformanceMonitoring } from "./components/features/system/PerformanceMonitoring";
import { SecurityPrivacyHub } from "./components/features/security/SecurityPrivacyHub";
import { AccessibilityHub } from "./components/features/accessibility/AccessibilityHub";
import { ObservabilityHub } from "./components/features/observability/ObservabilityHub";
import { RegulatoryComplianceHub } from "./components/features/regulatory/RegulatoryComplianceHub";
import { DeveloperExperienceHub } from "./components/features/developer/DeveloperExperienceHub";
import { RegenerativeAICopilot } from "./components/features/moonshot/RegenerativeAICopilot";
import { RegenerativeCreditScore } from "./components/features/moonshot/RegenerativeCreditScore";
import { ImpactNFTGallery } from "./components/features/moonshot/ImpactNFTGallery";
import { DeSciIntegration } from "./components/features/moonshot/DeSciIntegration";

// 2026 Roadmap Components
import { AdvancedCharting } from "./components/roadmap-2026/AdvancedCharting";
import { SocialFeatures } from "./components/roadmap-2026/SocialFeatures";
import { NotificationService } from "./components/roadmap-2026/NotificationService";
import { TaxReporting } from "./components/roadmap-2026/TaxReporting";
import { APIMarketplace } from "./components/roadmap-2026/APIMarketplace";
import { MobileAppNative } from "./components/roadmap-2026/MobileAppNative";
import { AdvancedGovernance } from "./components/roadmap-2026/AdvancedGovernance";
import { CollaborationTools } from "./components/roadmap-2026/CollaborationTools";
import { Layer2Expansion } from "./components/roadmap-2026/Layer2Expansion";
import { BlockchainNetworks } from "./components/roadmap-2026/BlockchainNetworks";
import { EnhancedAIPredictions } from "./components/roadmap-2026/EnhancedAIPredictions";
import { InstitutionalCustody } from "./components/roadmap-2026/InstitutionalCustody";
import { RegulatoryExpansion } from "./components/roadmap-2026/RegulatoryExpansion";
import { EnterpriseSaaS } from "./components/roadmap-2026/EnterpriseSaaS";
import { AdvancedDerivatives } from "./components/roadmap-2026/AdvancedDerivatives";
import { AutonomousOperations } from "./components/roadmap-2026/AutonomousOperations";

// Core Infrastructure Components
import { BlockchainRecords } from "./components/BlockchainRecords";
import { AIPoweredOracles } from "./components/AIPoweredOracles";
import { LivingSmartContracts } from "./components/LivingSmartContracts";
import { RIUTrading } from "./components/RIUTrading";
import { ImpactVerification } from "./components/ImpactVerification";

// Interactive Versions
import { RIUTradingInteractive } from "./components/RIUTradingInteractive";
import { AIOraclesInteractive } from "./components/AIOraclesInteractive";
import { InteractiveDashboard } from "./components/InteractiveDashboard";

// Diagrams & Visualizations
import { SystemArchitecture } from "./components/diagrams/SystemArchitecture";
import { DataFlowPipeline } from "./components/diagrams/DataFlowPipeline";
import { SecurityDashboard } from "./components/diagrams/SecurityDashboard";
import { RIULifecycle } from "./components/diagrams/RIULifecycle";
import { PerformanceDashboard } from "./components/diagrams/PerformanceDashboard";
import { StakeholderEcosystem } from "./components/diagrams/StakeholderEcosystem";

// Atlas Sanctum - Autonomous Engine Infrastructure
import { AtlasDashboard } from "./components/atlas/AtlasDashboard";
import { DealEngine } from "./components/atlas/DealEngine";
import { TrustEngineHub } from "./components/atlas/TrustEngineHub";
import { TreasuryEngine } from "./components/atlas/TreasuryEngine";
import { GrowthEngineHub } from "./components/atlas/GrowthEngineHub";
import { ImpactEngineHub } from "./components/atlas/ImpactEngineHub";
import { RiskEngine } from "./components/atlas/RiskEngine";
import { ReputationEngine } from "./components/atlas/ReputationEngine";

import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingHero },
      { path: "projects", Component: ProjectShowcase },
      { path: "institutional", Component: InstitutionalPortal },
      { path: "overview", Component: Overview },
      { path: "operations", Component: CriticalOperations },
      { path: "innovations", Component: CriticalInnovations },
      
      // Engineering Guilds
      { path: "guild/data-quality", Component: DataQualityDashboard },
      { path: "guild/ai-modeling", Component: AIModelingDashboard },
      { path: "guild/infrastructure", Component: InfrastructureDevOpsDashboard },
      { path: "guild/product", Component: ProductInterfaceDashboard },
      { path: "guild/ethics", Component: EthicalSystemsDashboard },
      
      // System Health
      { path: "system/architecture", Component: ArchitectureMonitor },
      
      // Truth Coordination
      { path: "public-dashboard", Component: PublicDashboard },
      { path: "node-operator", Component: NodeOperatorConsole },
      { path: "oracle-auditor", Component: OracleAuditorConsole },
      { path: "buyers", Component: BuyersPortal },
      { path: "governance", Component: GovernancePortal },
      
      // Feature 1: Social & Community
      { path: "social/stories", Component: ImpactStoryEngine },
      { path: "social/forums", Component: StakeholderForums },
      { path: "social/challenges", Component: ImpactChallenges },
      { path: "social/expert-qa", Component: ExpertQA },
      
      // Feature 2: Advanced Trading
      { path: "trading/hub", Component: AdvancedTradingHub },
      { path: "trading/futures", Component: FuturesContracts },
      { path: "trading/bundling", Component: ImpactBundling },
      { path: "trading/amm", Component: AutomatedMarketMaker },
      { path: "trading/p2p", Component: PeerToPeerMarketplace },
      
      // Feature 3: Intelligence Layer
      { path: "intelligence/predictive", Component: PredictiveAnalytics },
      { path: "intelligence/benchmarking", Component: ComparativeBenchmarking },
      { path: "intelligence/roi-calculator", Component: ROICalculator },
      { path: "intelligence/alerts", Component: IntelligentAlerts },
      { path: "intelligence/query", Component: NaturalLanguageQuery },
      
      // Feature 4: Interoperability
      { path: "interoperability", Component: InteroperabilityHub },
      
      // Feature 5: Verification & Trust
      { path: "verification/hub", Component: VerificationHub },
      { path: "verification/3d-sites", Component: Site3DVisualization },
      { path: "verification/disputes", Component: DisputeResolution },
      { path: "verification/community", Component: CommunityVerification },
      { path: "verification/whistleblower", Component: WhistleblowerPortal },
      
      // Feature 6: Regenerative Finance
      { path: "finance/hub", Component: RegenerativeFinanceHub },
      { path: "finance/revenue-sharing", Component: RevenueSharingAgreements },
      { path: "finance/bonds", Component: RegenerativeBonds },
      { path: "finance/staking", Component: StakingYield },
      { path: "finance/micro-investments", Component: MicroInvestments },
      
      // Feature 7-10: System Features
      { path: "system/performance", Component: PerformanceMonitoring },
      { path: "system/security", Component: SecurityPrivacyHub },
      { path: "system/accessibility", Component: AccessibilityHub },
      { path: "system/observability", Component: ObservabilityHub },
      
      // Feature 11-13: Enterprise Features
      { path: "regulatory", Component: RegulatoryComplianceHub },
      { path: "developer", Component: DeveloperExperienceHub },
      
      // Feature 14-17: Moonshot Features
      { path: "ai-copilot", Component: RegenerativeAICopilot },
      { path: "credit-score", Component: RegenerativeCreditScore },
      { path: "nft-gallery", Component: ImpactNFTGallery },
      { path: "desci", Component: DeSciIntegration },
      
      // 2026 Roadmap Features
      { path: "roadmap/advanced-charting", Component: AdvancedCharting },
      { path: "roadmap/social-features", Component: SocialFeatures },
      { path: "roadmap/notification-service", Component: NotificationService },
      { path: "roadmap/tax-reporting", Component: TaxReporting },
      { path: "roadmap/api-marketplace", Component: APIMarketplace },
      { path: "roadmap/mobile-app-native", Component: MobileAppNative },
      { path: "roadmap/advanced-governance", Component: AdvancedGovernance },
      { path: "roadmap/collaboration-tools", Component: CollaborationTools },
      { path: "roadmap/layer2-expansion", Component: Layer2Expansion },
      { path: "roadmap/blockchain-networks", Component: BlockchainNetworks },
      { path: "roadmap/enhanced-ai-predictions", Component: EnhancedAIPredictions },
      { path: "roadmap/institutional-custody", Component: InstitutionalCustody },
      { path: "roadmap/regulatory-expansion", Component: RegulatoryExpansion },
      { path: "roadmap/enterprise-saas", Component: EnterpriseSaaS },
      { path: "roadmap/advanced-derivatives", Component: AdvancedDerivatives },
      { path: "roadmap/autonomous-operations", Component: AutonomousOperations },

      // Core Infrastructure
      { path: "infrastructure/blockchain-records", Component: BlockchainRecords },
      { path: "infrastructure/ai-oracles", Component: AIOraclesInteractive },
      { path: "infrastructure/smart-contracts", Component: LivingSmartContracts },
      { path: "infrastructure/riu-trading", Component: RIUTradingInteractive },
      { path: "infrastructure/impact-verification", Component: ImpactVerification },
      { path: "infrastructure/analytics", Component: InteractiveDashboard },

      // Diagrams & Visualizations
      { path: "diagrams/system-architecture", Component: SystemArchitecture },
      { path: "diagrams/data-flow", Component: DataFlowPipeline },
      { path: "diagrams/security", Component: SecurityDashboard },
      { path: "diagrams/riu-lifecycle", Component: RIULifecycle },
      { path: "diagrams/performance", Component: PerformanceDashboard },
      { path: "diagrams/stakeholder-ecosystem", Component: StakeholderEcosystem },

      // Atlas Sanctum - Autonomous Engines
      { path: "atlas", Component: AtlasDashboard },
      { path: "atlas/deal-engine", Component: DealEngine },
      { path: "atlas/trust-engine", Component: TrustEngineHub },
      { path: "atlas/treasury-engine", Component: TreasuryEngine },
      { path: "atlas/growth-engine", Component: GrowthEngineHub },
      { path: "atlas/impact-engine", Component: ImpactEngineHub },
      { path: "atlas/risk-engine", Component: RiskEngine },
      { path: "atlas/reputation-engine", Component: ReputationEngine },

      { path: "*", Component: NotFound },
    ],
  },
]);