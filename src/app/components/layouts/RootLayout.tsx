import { Outlet, Link, useLocation } from 'react-router';
import { Leaf, Home, Layers, Building2, Activity, Zap, Sparkles, Database, Brain, Server, Palette, Scale, Eye, Briefcase, UserCheck, ShoppingBag, Vote, Users, MessageSquare, Trophy, HelpCircle, TrendingUp, LineChart, Wallet, ArrowLeftRight, Shield, Box, FileQuestion, AlertTriangle, DollarSign, PieChart, Gauge, Search, Globe, Code, Sparkle, Award, Microscope, Wrench, Rocket, CandlestickChart, Bell, Calculator, Package, Smartphone, Bot, Network, Lock, Workflow, GitBranch, Coins } from 'lucide-react';

export function RootLayout() {
  const location = useLocation();

  const navigation = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Projects', path: '/projects', icon: Layers },
    { label: 'Institutional', path: '/institutional', icon: Building2 },

    {
      label: 'Core Infrastructure',
      icon: Database,
      children: [
        { label: 'Interactive Analytics', path: '/infrastructure/analytics', icon: Activity },
        { label: 'Blockchain Records', path: '/infrastructure/blockchain-records', icon: Database },
        { label: 'AI-Powered Oracles', path: '/infrastructure/ai-oracles', icon: Brain },
        { label: 'Living Smart Contracts', path: '/infrastructure/smart-contracts', icon: Workflow },
        { label: 'RIU Trading', path: '/infrastructure/riu-trading', icon: TrendingUp },
        { label: 'Impact Verification', path: '/infrastructure/impact-verification', icon: Shield },
      ]
    },

    {
      label: 'Social & Community',
      icon: Users,
      children: [
        { label: 'Impact Stories', path: '/social/stories', icon: MessageSquare },
        { label: 'Stakeholder Forums', path: '/social/forums', icon: MessageSquare },
        { label: 'Impact Challenges', path: '/social/challenges', icon: Trophy },
        { label: 'Expert Q&A', path: '/social/expert-qa', icon: HelpCircle },
      ]
    },
    
    {
      label: 'Advanced Trading',
      icon: TrendingUp,
      children: [
        { label: 'Trading Hub', path: '/trading/hub', icon: TrendingUp },
        { label: 'Futures & Forwards', path: '/trading/futures', icon: LineChart },
        { label: 'Impact Bundling', path: '/trading/bundling', icon: Layers },
        { label: 'AMM Liquidity', path: '/trading/amm', icon: Wallet },
        { label: 'P2P Marketplace', path: '/trading/p2p', icon: ArrowLeftRight },
      ]
    },
    
    {
      label: 'Intelligence',
      icon: Brain,
      children: [
        { label: 'Predictive Analytics', path: '/intelligence/predictive', icon: Activity },
        { label: 'Benchmarking', path: '/intelligence/benchmarking', icon: PieChart },
        { label: 'ROI Calculator', path: '/intelligence/roi-calculator', icon: DollarSign },
        { label: 'Intelligent Alerts', path: '/intelligence/alerts', icon: AlertTriangle },
        { label: 'Natural Language Query', path: '/intelligence/query', icon: Search },
      ]
    },
    
    {
      label: 'Verification & Trust',
      icon: Shield,
      children: [
        { label: 'Verification Hub', path: '/verification/hub', icon: Shield },
        { label: '3D Site Visualization', path: '/verification/3d-sites', icon: Box },
        { label: 'Dispute Resolution', path: '/verification/disputes', icon: FileQuestion },
        { label: 'Community Verification', path: '/verification/community', icon: Users },
        { label: 'Whistleblower Portal', path: '/verification/whistleblower', icon: AlertTriangle },
      ]
    },
    
    {
      label: 'Regenerative Finance',
      icon: DollarSign,
      children: [
        { label: 'Finance Hub', path: '/finance/hub', icon: DollarSign },
        { label: 'Revenue Sharing', path: '/finance/revenue-sharing', icon: PieChart },
        { label: 'Regenerative Bonds', path: '/finance/bonds', icon: FileQuestion },
        { label: 'Staking & Yield', path: '/finance/staking', icon: Gauge },
        { label: 'Micro-Investments', path: '/finance/micro-investments', icon: DollarSign },
      ]
    },
    
    {
      label: 'System & Enterprise',
      icon: Server,
      children: [
        { label: 'Interoperability', path: '/interoperability', icon: Globe },
        { label: 'Performance Monitoring', path: '/system/performance', icon: Gauge },
        { label: 'Security & Privacy', path: '/system/security', icon: Shield },
        { label: 'Accessibility', path: '/system/accessibility', icon: Eye },
        { label: 'Observability', path: '/system/observability', icon: Activity },
        { label: 'Regulatory Compliance', path: '/regulatory', icon: Scale },
        { label: 'Developer Experience', path: '/developer', icon: Code },
      ]
    },
    
    {
      label: 'Moonshot Features',
      icon: Sparkle,
      children: [
        { label: 'AI Copilot', path: '/ai-copilot', icon: Sparkle },
        { label: 'Credit Score', path: '/credit-score', icon: Award },
        { label: 'NFT Gallery', path: '/nft-gallery', icon: Layers },
        { label: 'DeSci Integration', path: '/desci', icon: Microscope },
      ]
    },
    
    {
      label: 'Engineering Guilds',
      icon: Wrench,
      children: [
        { label: 'Data Quality', path: '/guild/data-quality', icon: Database },
        { label: 'AI Modeling', path: '/guild/ai-modeling', icon: Brain },
        { label: 'Infrastructure DevOps', path: '/guild/infrastructure', icon: Server },
        { label: 'Product Interface', path: '/guild/product', icon: Palette },
        { label: 'Ethical Systems', path: '/guild/ethics', icon: Scale },
      ]
    },
    
    {
      label: '2026 Roadmap',
      icon: Rocket,
      children: [
        { label: 'Advanced Charting', path: '/roadmap/advanced-charting', icon: CandlestickChart },
        { label: 'Community Feed', path: '/roadmap/social-features', icon: Users },
        { label: 'Notifications', path: '/roadmap/notification-service', icon: Bell },
        { label: 'Tax Reporting', path: '/roadmap/tax-reporting', icon: Calculator },
        { label: 'API Marketplace', path: '/roadmap/api-marketplace', icon: Package },
        { label: 'Native Mobile App', path: '/roadmap/mobile-app-native', icon: Smartphone },
        { label: 'Advanced Governance', path: '/roadmap/advanced-governance', icon: Vote },
        { label: 'Collaboration Tools', path: '/roadmap/collaboration-tools', icon: Users },
        { label: 'Layer 2 Expansion', path: '/roadmap/layer2-expansion', icon: Layers },
        { label: 'Blockchain Networks', path: '/roadmap/blockchain-networks', icon: Network },
        { label: 'Enhanced AI Predictions', path: '/roadmap/enhanced-ai-predictions', icon: Brain },
        { label: 'Institutional Custody', path: '/roadmap/institutional-custody', icon: Lock },
        { label: 'Regulatory Expansion', path: '/roadmap/regulatory-expansion', icon: Scale },
        { label: 'Enterprise SaaS', path: '/roadmap/enterprise-saas', icon: Building2 },
        { label: 'Advanced Derivatives', path: '/roadmap/advanced-derivatives', icon: TrendingUp },
        { label: 'Autonomous Operations', path: '/roadmap/autonomous-operations', icon: Bot },
      ]
    },
    
    {
      label: 'Diagrams & Visualizations',
      icon: GitBranch,
      children: [
        { label: 'System Architecture', path: '/diagrams/system-architecture', icon: Server },
        { label: 'Data Flow Pipeline', path: '/diagrams/data-flow', icon: Activity },
        { label: 'Security Dashboard', path: '/diagrams/security', icon: Shield },
        { label: 'RIU Lifecycle', path: '/diagrams/riu-lifecycle', icon: Coins },
        { label: 'Performance & Scalability', path: '/diagrams/performance', icon: Gauge },
        { label: 'Stakeholder Ecosystem', path: '/diagrams/stakeholder-ecosystem', icon: Users },
      ]
    },

    {
      label: 'Atlas Sanctum',
      icon: Bot,
      children: [
        { label: 'Atlas OS Dashboard', path: '/atlas', icon: Server },
        { label: 'Deal Engine', path: '/atlas/deal-engine', icon: Briefcase },
        { label: 'Trust Engine', path: '/atlas/trust-engine', icon: Shield },
        { label: 'Treasury Engine', path: '/atlas/treasury-engine', icon: Wallet },
        { label: 'Growth Engine', path: '/atlas/growth-engine', icon: Rocket },
        { label: 'Impact Engine', path: '/atlas/impact-engine', icon: Leaf },
        { label: 'Risk Engine', path: '/atlas/risk-engine', icon: AlertTriangle },
        { label: 'Reputation Engine', path: '/atlas/reputation-engine', icon: Award },
      ]
    },

    {
      label: 'Legacy Dashboards',
      icon: Activity,
      children: [
        { label: 'Overview', path: '/overview', icon: Activity },
        { label: 'Operations', path: '/operations', icon: Zap },
        { label: 'Innovations', path: '/innovations', icon: Sparkles },
        { label: 'Architecture Monitor', path: '/system/architecture', icon: Activity },
        { label: 'Public Dashboard', path: '/public-dashboard', icon: Eye },
        { label: 'Node Operator', path: '/node-operator', icon: Briefcase },
        { label: 'Oracle Auditor', path: '/oracle-auditor', icon: UserCheck },
        { label: 'Buyers Portal', path: '/buyers', icon: ShoppingBag },
        { label: 'Governance (SAN)', path: '/governance', icon: Vote },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-emerald-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-white">Regenerative Value Exchange</h1>
                <p className="text-emerald-300/70 text-sm">Next-Gen Ecological Infrastructure</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-emerald-300/70 text-sm">Total Market Cap</div>
                <div className="text-white">$847.3B</div>
              </div>
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-emerald-500/10 sticky top-[88px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Scroll indicator */}
          <div className="text-emerald-300/50 text-xs pt-2 pb-1 flex items-center gap-2">
            <span>← Scroll to explore all features →</span>
            <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/20 via-emerald-500/40 to-emerald-500/20"></div>
          </div>
          
          {/* Scrollable navigation with custom scrollbar */}
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-custom">
            {navigation.map((item, idx) => {
              const Icon = item.icon;
              const isActive = item.path && location.pathname === item.path;
              const hasActiveChild = item.children?.some(child => location.pathname === child.path);
              
              return (
                <div key={`nav-${idx}`} className="relative group">
                  {item.path ? (
                    <Link
                      to={item.path}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-emerald-400/20 text-emerald-400'
                          : 'text-emerald-300/70 hover:text-emerald-300 hover:bg-emerald-400/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  ) : (
                    <>
                      <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                          hasActiveChild
                            ? 'bg-emerald-400/20 text-emerald-400'
                            : 'text-emerald-300/70 hover:text-emerald-300 hover:bg-emerald-400/10'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{item.label}</span>
                      </button>
                      
                      {/* Dropdown */}
                      <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-md border border-emerald-500/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all max-h-[70vh] overflow-y-auto">
                        <div className="p-2">
                          {item.children?.map((child, childIdx) => {
                            const ChildIcon = child.icon;
                            const isChildActive = location.pathname === child.path;
                            return (
                              <Link
                                key={`child-${idx}-${childIdx}`}
                                to={child.path}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                                  isChildActive
                                    ? 'bg-emerald-400/20 text-emerald-400'
                                    : 'text-emerald-300/70 hover:text-emerald-300 hover:bg-emerald-400/10'
                                }`}
                              >
                                <ChildIcon className="w-4 h-4" />
                                <span className="text-sm">{child.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md border-t border-emerald-500/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-emerald-300/50 text-sm">
            <p>Where ancient wisdom and advanced technology converge to redefine value</p>
            <p className="mt-2">From Extraction to Regeneration • From Depletion to Abundance</p>
          </div>
        </div>
      </footer>
    </div>
  );
}