import { useState, useEffect, useRef, useMemo } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import {
  Leaf, Home, Layers, Building2, Activity, Zap, Sparkles, Database, Brain, Server,
  Palette, Scale, Eye, Briefcase, UserCheck, ShoppingBag, Vote, Users, MessageSquare,
  Trophy, HelpCircle, TrendingUp, LineChart, Wallet, ArrowLeftRight, Shield, Box,
  FileQuestion, AlertTriangle, DollarSign, PieChart, Gauge, Search, Globe, Code,
  Award, Microscope, Wrench, Rocket, CandlestickChart, Bell, Calculator, Package,
  Smartphone, Bot, Network, Lock, Workflow, GitBranch, Coins, ChevronDown, ChevronRight,
  Command, X, ChevronLeft, Settings, LifeBuoy, Sparkle, FileText, ExternalLink,
  Plus, Zap as Flash, ArrowUp, Menu, Hash, Clock, Star, TrendingDown, BarChart3,
} from 'lucide-react';

// ─── Navigation Data ──────────────────────────────────────────────────────────

const NAV_GROUPS = [
  { label: 'Home', path: '/', icon: Home, section: 'top' },
  { label: 'Projects', path: '/projects', icon: Layers, section: 'top' },
  { label: 'Institutional', path: '/institutional', icon: Building2, section: 'top' },
  {
    label: 'Core Infrastructure', icon: Database, section: 'platform',
    children: [
      { label: 'Interactive Analytics', path: '/infrastructure/analytics', icon: Activity },
      { label: 'Blockchain Records', path: '/infrastructure/blockchain-records', icon: Database },
      { label: 'AI-Powered Oracles', path: '/infrastructure/ai-oracles', icon: Brain },
      { label: 'Living Smart Contracts', path: '/infrastructure/smart-contracts', icon: Workflow },
      { label: 'RIU Trading', path: '/infrastructure/riu-trading', icon: TrendingUp },
      { label: 'Impact Verification', path: '/infrastructure/impact-verification', icon: Shield },
    ],
  },
  {
    label: 'Advanced Trading', icon: TrendingUp, section: 'platform',
    children: [
      { label: 'Trading Hub', path: '/trading/hub', icon: TrendingUp },
      { label: 'Futures & Forwards', path: '/trading/futures', icon: LineChart },
      { label: 'Impact Bundling', path: '/trading/bundling', icon: Layers },
      { label: 'AMM Liquidity', path: '/trading/amm', icon: Wallet },
      { label: 'P2P Marketplace', path: '/trading/p2p', icon: ArrowLeftRight },
    ],
  },
  {
    label: 'Intelligence', icon: Brain, section: 'platform',
    children: [
      { label: 'Predictive Analytics', path: '/intelligence/predictive', icon: Activity },
      { label: 'Benchmarking', path: '/intelligence/benchmarking', icon: PieChart },
      { label: 'ROI Calculator', path: '/intelligence/roi-calculator', icon: DollarSign },
      { label: 'Intelligent Alerts', path: '/intelligence/alerts', icon: AlertTriangle },
      { label: 'Natural Language Query', path: '/intelligence/query', icon: Search },
    ],
  },
  {
    label: 'Document Intelligence', icon: FileText, section: 'platform',
    children: [
      { label: 'Intelligence Hub', path: '/document-intelligence', icon: FileText },
    ],
  },
  {
    label: 'Verification & Trust', icon: Shield, section: 'platform',
    children: [
      { label: 'Verification Hub', path: '/verification/hub', icon: Shield },
      { label: '3D Site Visualization', path: '/verification/3d-sites', icon: Box },
      { label: 'Dispute Resolution', path: '/verification/disputes', icon: FileQuestion },
      { label: 'Community Verification', path: '/verification/community', icon: Users },
      { label: 'Whistleblower Portal', path: '/verification/whistleblower', icon: AlertTriangle },
    ],
  },
  {
    label: 'Regenerative Finance', icon: DollarSign, section: 'platform',
    children: [
      { label: 'Finance Hub', path: '/finance/hub', icon: DollarSign },
      { label: 'Revenue Sharing', path: '/finance/revenue-sharing', icon: PieChart },
      { label: 'Regenerative Bonds', path: '/finance/bonds', icon: FileQuestion },
      { label: 'Staking & Yield', path: '/finance/staking', icon: Gauge },
      { label: 'Micro-Investments', path: '/finance/micro-investments', icon: DollarSign },
    ],
  },
  {
    label: 'System & Enterprise', icon: Server, section: 'platform',
    children: [
      { label: 'Interoperability', path: '/interoperability', icon: Globe },
      { label: 'Performance Monitoring', path: '/system/performance', icon: Gauge },
      { label: 'Security & Privacy', path: '/system/security', icon: Shield },
      { label: 'Accessibility', path: '/system/accessibility', icon: Eye },
      { label: 'Observability', path: '/system/observability', icon: Activity },
      { label: 'Regulatory Compliance', path: '/regulatory', icon: Scale },
      { label: 'Developer Experience', path: '/developer', icon: Code },
    ],
  },
  {
    label: 'Social & Community', icon: Users, section: 'platform',
    children: [
      { label: 'Impact Stories', path: '/social/stories', icon: MessageSquare },
      { label: 'Stakeholder Forums', path: '/social/forums', icon: MessageSquare },
      { label: 'Impact Challenges', path: '/social/challenges', icon: Trophy },
      { label: 'Expert Q&A', path: '/social/expert-qa', icon: HelpCircle },
    ],
  },
  {
    label: 'Atlas Sanctum', icon: Bot, section: 'atlas',
    children: [
      { label: 'Atlas OS Dashboard', path: '/atlas', icon: Server },
      { label: 'Deal Engine', path: '/atlas/deal-engine', icon: Briefcase },
      { label: 'Trust Engine', path: '/atlas/trust-engine', icon: Shield },
      { label: 'Treasury Engine', path: '/atlas/treasury-engine', icon: Wallet },
      { label: 'Growth Engine', path: '/atlas/growth-engine', icon: Rocket },
      { label: 'Impact Engine', path: '/atlas/impact-engine', icon: Leaf },
      { label: 'Risk Engine', path: '/atlas/risk-engine', icon: AlertTriangle },
      { label: 'Reputation Engine', path: '/atlas/reputation-engine', icon: Award },
    ],
  },
  {
    label: 'Engineering Guilds', icon: Wrench, section: 'atlas',
    children: [
      { label: 'Data Quality', path: '/guild/data-quality', icon: Database },
      { label: 'AI Modeling', path: '/guild/ai-modeling', icon: Brain },
      { label: 'Infrastructure DevOps', path: '/guild/infrastructure', icon: Server },
      { label: 'Product Interface', path: '/guild/product', icon: Palette },
      { label: 'Ethical Systems', path: '/guild/ethics', icon: Scale },
    ],
  },
  {
    label: 'Moonshot Features', icon: Sparkle, section: 'atlas',
    children: [
      { label: 'AI Copilot', path: '/ai-copilot', icon: Sparkle },
      { label: 'Credit Score', path: '/credit-score', icon: Award },
      { label: 'NFT Gallery', path: '/nft-gallery', icon: Layers },
      { label: 'DeSci Integration', path: '/desci', icon: Microscope },
    ],
  },
  {
    label: '2026 Roadmap', icon: Rocket, section: 'roadmap',
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
    ],
  },
  {
    label: 'Diagrams', icon: GitBranch, section: 'roadmap',
    children: [
      { label: 'System Architecture', path: '/diagrams/system-architecture', icon: Server },
      { label: 'Data Flow Pipeline', path: '/diagrams/data-flow', icon: Activity },
      { label: 'Security Dashboard', path: '/diagrams/security', icon: Shield },
      { label: 'RIU Lifecycle', path: '/diagrams/riu-lifecycle', icon: Coins },
      { label: 'Performance & Scalability', path: '/diagrams/performance', icon: Gauge },
      { label: 'Stakeholder Ecosystem', path: '/diagrams/stakeholder-ecosystem', icon: Users },
    ],
  },
  {
    label: 'Legacy Dashboards', icon: Activity, section: 'roadmap',
    children: [
      { label: 'Overview', path: '/overview', icon: Activity },
      { label: 'Operations', path: '/operations', icon: Zap },
      { label: 'Innovations', path: '/innovations', icon: Sparkles },
      { label: 'Architecture Monitor', path: '/system/architecture', icon: Activity },
      { label: 'Public Dashboard', path: '/public-dashboard', icon: Eye },
      { label: 'Node Operator', path: '/node-operator', icon: Briefcase },
      { label: 'Oracle Auditor', path: '/oracle-auditor', icon: UserCheck },
      { label: 'Buyers Portal', path: '/buyers', icon: ShoppingBag },
      { label: 'Governance', path: '/governance', icon: Vote },
    ],
  },
] as const;

type NavChild = { label: string; path: string; icon: React.FC<any> };
type NavGroup = { label: string; icon: React.FC<any>; section: string; path?: string; children?: NavChild[] };

const ALL_ITEMS: (NavChild & { group: string })[] = (NAV_GROUPS as unknown as NavGroup[]).flatMap((g) =>
  g.children
    ? g.children.map((c) => ({ ...c, group: g.label }))
    : [{ label: g.label, path: g.path!, icon: g.icon, group: 'Top Level' }]
);

const QUICK_ACTIONS = [
  { label: 'New Trade Order', icon: TrendingUp, path: '/trading/hub', color: 'text-emerald-400' },
  { label: 'Upload Document', icon: FileText, path: '/document-intelligence', color: 'text-blue-400' },
  { label: 'Create RSA', icon: DollarSign, path: '/finance/revenue-sharing', color: 'text-amber-400' },
  { label: 'Submit Verification', icon: Shield, path: '/verification/hub', color: 'text-purple-400' },
  { label: 'View Atlas OS', icon: Bot, path: '/atlas', color: 'text-cyan-400' },
];

// ─── Breadcrumb helper ────────────────────────────────────────────────────────

function useBreadcrumbs(pathname: string) {
  return useMemo(() => {
    if (pathname === '/') return [{ label: 'Home', path: '/' }];
    const crumbs: { label: string; path: string }[] = [{ label: 'Home', path: '/' }];
    for (const g of NAV_GROUPS as unknown as NavGroup[]) {
      if (g.path && pathname === g.path) { crumbs.push({ label: g.label, path: g.path }); return crumbs; }
      if (g.children) {
        const match = g.children.find((c) => c.path === pathname);
        if (match) {
          crumbs.push({ label: g.label, path: g.children[0].path });
          crumbs.push({ label: match.label, path: match.path });
          return crumbs;
        }
      }
    }
    // fallback: split path
    pathname.split('/').filter(Boolean).forEach((seg, i, arr) => {
      crumbs.push({ label: seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), path: '/' + arr.slice(0, i + 1).join('/') });
    });
    return crumbs;
  }, [pathname]);
}

// ─── Command Palette ──────────────────────────────────────────────────────────

function CommandPalette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    const pool = q
      ? ALL_ITEMS.filter((i) => i.label.toLowerCase().includes(q) || i.group.toLowerCase().includes(q) || i.path.includes(q))
      : [...QUICK_ACTIONS.map((a) => ({ ...a, group: 'Quick Actions' })), ...ALL_ITEMS.slice(0, 8).map((i) => ({ ...i }))];
    return pool.slice(0, 12);
  }, [query]);

  useEffect(() => { setSelected(0); }, [results]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') setSelected((s) => Math.min(s + 1, results.length - 1));
      if (e.key === 'ArrowUp') setSelected((s) => Math.max(s - 1, 0));
      if (e.key === 'Enter' && results[selected]?.path) { navigate(results[selected].path); onClose(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [results, selected, navigate, onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-2xl mx-4 bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-emerald-500/20">
          <Search className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, features, actions…"
            className="flex-1 bg-transparent text-white text-sm placeholder-emerald-300/40 outline-none"
          />
          <div className="flex items-center gap-1 text-emerald-300/40 text-xs">
            <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-[10px]">ESC</kbd>
            <span>to close</span>
          </div>
        </div>

        {/* Results */}
        <div className="py-2 max-h-80 overflow-y-auto">
          {results.length === 0 && (
            <div className="px-4 py-8 text-center text-emerald-300/40 text-sm">No results for "{query}"</div>
          )}
          {results.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={`${item.path}-${i}`}
                onClick={() => { navigate(item.path); onClose(); }}
                onMouseEnter={() => setSelected(i)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${i === selected ? 'bg-emerald-400/15' : 'hover:bg-slate-800/60'}`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${i === selected ? 'bg-emerald-400/20' : 'bg-slate-700/60'}`}>
                  <Icon className={`w-3.5 h-3.5 ${i === selected ? 'text-emerald-400' : 'text-emerald-300/60'}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`text-sm font-medium truncate ${i === selected ? 'text-white' : 'text-emerald-100/80'}`}>{item.label}</div>
                  <div className="text-emerald-300/40 text-xs truncate">{item.group} · {item.path}</div>
                </div>
                {i === selected && <ArrowUp className="w-3.5 h-3.5 text-emerald-400/60 rotate-90" />}
              </button>
            );
          })}
        </div>

        {/* Footer hints */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-emerald-500/10 text-emerald-300/30 text-xs">
          <span className="flex items-center gap-1"><kbd className="px-1 bg-slate-700 rounded text-[10px]">↑↓</kbd> navigate</span>
          <span className="flex items-center gap-1"><kbd className="px-1 bg-slate-700 rounded text-[10px]">↵</kbd> open</span>
          <span className="flex items-center gap-1"><kbd className="px-1 bg-slate-700 rounded text-[10px]">⌘K</kbd> toggle</span>
          <span className="ml-auto">{ALL_ITEMS.length} pages indexed</span>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const SECTION_LABELS: Record<string, string> = {
  top: 'Mission Control',
  platform: 'Platform',
  atlas: 'Atlas Sanctum',
  roadmap: 'Roadmap & System',
};

function Sidebar({ collapsed, pathname }: { collapsed: boolean; pathname: string }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    (NAV_GROUPS as unknown as NavGroup[]).forEach((g) => {
      if (g.children?.some((c) => c.path === pathname)) init[g.label] = true;
    });
    return init;
  });

  const toggle = (label: string) =>
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));

  const sections = ['top', 'platform', 'atlas', 'roadmap'];

  return (
    <aside
      className={`flex flex-col bg-slate-950/80 border-r border-emerald-500/15 transition-all duration-300 flex-shrink-0 overflow-hidden ${collapsed ? 'w-[60px]' : 'w-[260px]'}`}
    >
      <div className="flex-1 overflow-y-auto py-3 space-y-4">
        {sections.map((section) => {
          const items = (NAV_GROUPS as unknown as NavGroup[]).filter((g) => g.section === section);
          return (
            <div key={section}>
              {!collapsed && (
                <div className="px-4 mb-1">
                  <span className="text-emerald-300/30 text-[10px] font-semibold uppercase tracking-widest">
                    {SECTION_LABELS[section]}
                  </span>
                </div>
              )}
              {items.map((group) => {
                const GroupIcon = group.icon;
                const hasChildren = !!group.children?.length;
                const isGroupActive = group.path ? pathname === group.path : group.children?.some((c) => c.path === pathname);
                const isOpen = expanded[group.label];

                if (!hasChildren) {
                  return (
                    <Link
                      key={group.label}
                      to={group.path!}
                      title={collapsed ? group.label : undefined}
                      className={`flex items-center gap-3 mx-2 px-3 py-2 rounded-lg transition-all group ${isGroupActive ? 'bg-emerald-400/20 text-emerald-300' : 'text-emerald-300/60 hover:bg-emerald-400/10 hover:text-emerald-200'}`}
                    >
                      <GroupIcon className={`w-4 h-4 flex-shrink-0 ${isGroupActive ? 'text-emerald-400' : ''}`} />
                      {!collapsed && <span className="text-sm truncate">{group.label}</span>}
                    </Link>
                  );
                }

                return (
                  <div key={group.label}>
                    <button
                      onClick={() => collapsed ? navigate(group.children![0].path) : toggle(group.label)}
                      title={collapsed ? group.label : undefined}
                      className={`w-full flex items-center gap-3 mx-2 px-3 py-2 rounded-lg transition-all ${isGroupActive ? 'bg-emerald-400/15 text-emerald-300' : 'text-emerald-300/60 hover:bg-emerald-400/10 hover:text-emerald-200'}`}
                      style={{ width: collapsed ? 'calc(100% - 16px)' : 'calc(100% - 16px)' }}
                    >
                      <GroupIcon className={`w-4 h-4 flex-shrink-0 ${isGroupActive ? 'text-emerald-400' : ''}`} />
                      {!collapsed && (
                        <>
                          <span className="text-sm truncate flex-1 text-left">{group.label}</span>
                          <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </>
                      )}
                    </button>

                    {!collapsed && isOpen && (
                      <div className="ml-4 mt-0.5 border-l border-emerald-500/15 pl-2 space-y-0.5 mb-1">
                        {group.children!.map((child) => {
                          const ChildIcon = child.icon;
                          const isActive = pathname === child.path;
                          return (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-all text-sm ${isActive ? 'bg-emerald-400/20 text-emerald-300 font-medium' : 'text-emerald-300/50 hover:bg-emerald-400/10 hover:text-emerald-200'}`}
                            >
                              <ChildIcon className="w-3.5 h-3.5 flex-shrink-0" />
                              <span className="truncate">{child.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer */}
      <div className={`border-t border-emerald-500/15 py-3 space-y-1 px-2 flex-shrink-0 ${collapsed ? '' : ''}`}>
        {[
          { icon: Settings, label: 'Settings', path: '/system/security' },
          { icon: LifeBuoy, label: 'Help & Docs', path: '/developer' },
        ].map((item) => (
          <Link
            key={item.label}
            to={item.path}
            title={collapsed ? item.label : undefined}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-emerald-300/40 hover:text-emerald-300/70 hover:bg-emerald-400/10 transition-all"
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span className="text-xs">{item.label}</span>}
          </Link>
        ))}
        {!collapsed && (
          <div className="px-3 pt-1">
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-300/25">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All systems operational
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

// ─── Mega Menu (hover on header nav items) ────────────────────────────────────

function MegaMenuPanel({ group, onClose }: { group: NavGroup; onClose: () => void }) {
  const children = group.children ?? [];
  const cols = children.length > 8 ? 3 : children.length > 4 ? 2 : 1;
  return (
    <div
      className="absolute top-full left-0 mt-1 bg-slate-900/98 backdrop-blur-xl border border-emerald-500/20 rounded-xl shadow-2xl p-4 z-50 min-w-[280px]"
      style={{ columnCount: cols, columnGap: '8px' }}
      onMouseLeave={onClose}
    >
      <div className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3 px-1 break-before-avoid" style={{ columnSpan: 'all' as any }}>
        {group.label}
      </div>
      {children.map((child) => {
        const Icon = child.icon;
        return (
          <Link
            key={child.path}
            to={child.path}
            onClick={onClose}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-emerald-300/70 hover:text-emerald-200 hover:bg-emerald-400/10 transition-all text-sm break-inside-avoid mb-0.5"
          >
            <Icon className="w-3.5 h-3.5 text-emerald-400/60 flex-shrink-0" />
            <span className="truncate">{child.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

// ─── Quick Actions Panel ──────────────────────────────────────────────────────

function QuickActionsPanel({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="absolute right-0 top-full mt-2 w-64 bg-slate-900/98 backdrop-blur-xl border border-emerald-500/20 rounded-xl shadow-2xl p-3 z-50" onMouseLeave={onClose}>
      <div className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2 px-1">Quick Actions</div>
      {QUICK_ACTIONS.map((a) => {
        const Icon = a.icon;
        return (
          <button
            key={a.path}
            onClick={() => { navigate(a.path); onClose(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-emerald-400/10 transition-all"
          >
            <Icon className={`w-4 h-4 flex-shrink-0 ${a.color}`} />
            <span className="text-white text-sm">{a.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Breadcrumbs ──────────────────────────────────────────────────────────────

function Breadcrumbs({ pathname }: { pathname: string }) {
  const crumbs = useBreadcrumbs(pathname);
  if (crumbs.length <= 1) return null;
  return (
    <nav className="flex items-center gap-1 text-xs text-emerald-300/50 py-2 px-6 border-b border-emerald-500/10 bg-black/10 flex-shrink-0">
      {crumbs.map((crumb, i) => (
        <span key={crumb.path} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3 h-3 text-emerald-300/25" />}
          {i < crumbs.length - 1 ? (
            <Link to={crumb.path} className="hover:text-emerald-300 transition-colors">{crumb.label}</Link>
          ) : (
            <span className="text-emerald-300/80">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

// ─── Root Layout ──────────────────────────────────────────────────────────────

export function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenu, setMegaMenu] = useState<string | null>(null);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // Cmd/Ctrl+K → command palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCommandOpen(true); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Close mobile menu on nav
  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  // Top-level groups for header mega menu (platform section only)
  const headerGroups = (NAV_GROUPS as unknown as NavGroup[]).filter((g) => g.section === 'platform' && g.children?.length);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950">

      {/* ── Global Header (Global Navigation Layer) ─────────────────── */}
      <header className="bg-black/40 backdrop-blur-md border-b border-emerald-500/20 sticky top-0 z-50 flex-shrink-0">
        <div className="flex items-center h-14 px-4 gap-3">

          {/* Sidebar toggle */}
          <button
            onClick={() => setSidebarCollapsed((v) => !v)}
            className="p-2 rounded-lg text-emerald-300/60 hover:text-emerald-300 hover:bg-emerald-400/10 transition-all flex-shrink-0 hidden lg:flex"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Logo — Persistent Navigation anchor */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 mr-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-white text-sm font-semibold leading-none">Atlas Sanctum</div>
              <div className="text-emerald-300/50 text-[10px] leading-none mt-0.5">Regenerative Value Exchange</div>
            </div>
          </Link>

          {/* Mega Menu header nav — Information Discovery Layer */}
          <nav className="hidden xl:flex items-center gap-0.5 flex-1 overflow-hidden">
            {headerGroups.slice(0, 6).map((group) => {
              const GroupIcon = group.icon;
              const isActive = group.children?.some((c) => c.path === location.pathname);
              return (
                <div key={group.label} className="relative" onMouseEnter={() => setMegaMenu(group.label)} onMouseLeave={() => setMegaMenu(null)}>
                  <button
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all whitespace-nowrap ${isActive ? 'bg-emerald-400/20 text-emerald-300' : 'text-emerald-300/60 hover:text-emerald-200 hover:bg-emerald-400/10'}`}
                  >
                    <GroupIcon className="w-3.5 h-3.5" />
                    {group.label}
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </button>
                  {megaMenu === group.label && (
                    <MegaMenuPanel group={group} onClose={() => setMegaMenu(null)} />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Spacer */}
          <div className="flex-1 xl:flex-none" />

          {/* Search / Command Palette trigger — Knowledge Discovery Layer */}
          <button
            onClick={() => setCommandOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/60 border border-emerald-500/20 rounded-lg text-emerald-300/50 hover:text-emerald-300 hover:border-emerald-500/40 transition-all text-sm"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:block text-xs">Search…</span>
            <kbd className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 bg-slate-700/60 rounded text-[10px] text-emerald-300/40">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </button>

          {/* Live market ticker */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-400/10 border border-emerald-500/20 rounded-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300/70 text-xs">$847.3B</span>
            <span className="text-emerald-400 text-xs">+2.4%</span>
          </div>

          {/* Quick Actions — Operational Control Layer */}
          <div className="relative">
            <button
              onClick={() => setQuickActionsOpen((v) => !v)}
              onBlur={() => setTimeout(() => setQuickActionsOpen(false), 150)}
              className="p-2 rounded-lg text-emerald-300/60 hover:text-emerald-300 hover:bg-emerald-400/10 transition-all relative"
            >
              <Flash className="w-4 h-4" />
            </button>
            {quickActionsOpen && <QuickActionsPanel onClose={() => setQuickActionsOpen(false)} />}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen((v) => !v)}
              onBlur={() => setTimeout(() => setNotifOpen(false), 150)}
              className="p-2 rounded-lg text-emerald-300/60 hover:text-emerald-300 hover:bg-emerald-400/10 transition-all relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-slate-900/98 backdrop-blur-xl border border-emerald-500/20 rounded-xl shadow-2xl p-3 z-50">
                <div className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2 px-1">Notifications</div>
                {[
                  { msg: 'BRZ-001 verification completed — score 94.8', time: '2m ago', type: 'success' },
                  { msg: 'RSA-004 health dropped to 79% — review needed', time: '18m ago', type: 'warn' },
                  { msg: 'New governance proposal: Atlas Phase 4 budget', time: '1h ago', type: 'info' },
                  { msg: 'Intelligent alert: Carbon credit price +8.4%', time: '3h ago', type: 'info' },
                ].map((n, i) => (
                  <div key={i} className={`flex gap-3 p-2.5 rounded-lg mb-1 ${n.type === 'success' ? 'bg-emerald-400/10' : n.type === 'warn' ? 'bg-amber-400/10' : 'bg-slate-800/40'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${n.type === 'success' ? 'bg-emerald-400' : n.type === 'warn' ? 'bg-amber-400' : 'bg-blue-400'}`} />
                    <div>
                      <div className="text-white text-xs">{n.msg}</div>
                      <div className="text-emerald-300/40 text-[10px] mt-0.5">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 cursor-pointer">
            AS
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="p-2 rounded-lg text-emerald-300/60 hover:text-emerald-300 hover:bg-emerald-400/10 transition-all lg:hidden"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ── Body: sidebar + content ──────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Context Navigation System (Sidebar) — desktop */}
        <div className="hidden lg:flex">
          <Sidebar collapsed={sidebarCollapsed} pathname={location.pathname} />
        </div>

        {/* Mobile Sidebar Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute left-0 top-0 bottom-0 w-72" onClick={(e) => e.stopPropagation()}>
              <Sidebar collapsed={false} pathname={location.pathname} />
            </div>
          </div>
        )}

        {/* Main column */}
        <div className="flex flex-col flex-1 min-w-0 overflow-auto">

          {/* Spatial Navigation Layer (Breadcrumbs) */}
          <Breadcrumbs pathname={location.pathname} />

          {/* Content */}
          <main className="flex-1 p-6 max-w-[1400px] w-full mx-auto">
            <Outlet />
          </main>

          {/* ── Persistent Navigation Layer (Footer) ─────────────────── */}
          <footer className="bg-black/30 border-t border-emerald-500/15 px-6 py-8 flex-shrink-0">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-[1400px] mx-auto">
              {/* Brand */}
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm font-semibold">Atlas Sanctum</span>
                </div>
                <p className="text-emerald-300/40 text-xs leading-relaxed">
                  Where ancient wisdom and advanced technology converge to redefine value.
                </p>
                <div className="flex items-center gap-1.5 mt-3 text-[10px] text-emerald-300/30">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  All systems operational
                </div>
              </div>

              {/* Footer nav groups */}
              {[
                {
                  title: 'Platform', links: [
                    { label: 'Trading Hub', path: '/trading/hub' },
                    { label: 'Intelligence', path: '/intelligence/predictive' },
                    { label: 'Verification', path: '/verification/hub' },
                    { label: 'Finance', path: '/finance/hub' },
                    { label: 'Document Intelligence', path: '/document-intelligence' },
                  ],
                },
                {
                  title: 'Atlas Sanctum', links: [
                    { label: 'Atlas OS', path: '/atlas' },
                    { label: 'Deal Engine', path: '/atlas/deal-engine' },
                    { label: 'Trust Engine', path: '/atlas/trust-engine' },
                    { label: 'Treasury Engine', path: '/atlas/treasury-engine' },
                    { label: 'Impact Engine', path: '/atlas/impact-engine' },
                  ],
                },
                {
                  title: 'Governance', links: [
                    { label: 'Governance Portal', path: '/governance' },
                    { label: 'Public Dashboard', path: '/public-dashboard' },
                    { label: 'Node Operator', path: '/node-operator' },
                    { label: 'Oracle Auditor', path: '/oracle-auditor' },
                    { label: 'Regulatory', path: '/regulatory' },
                  ],
                },
                {
                  title: 'Developers', links: [
                    { label: 'Developer Hub', path: '/developer' },
                    { label: 'API Marketplace', path: '/roadmap/api-marketplace' },
                    { label: 'Data Quality', path: '/guild/data-quality' },
                    { label: 'Security', path: '/system/security' },
                    { label: 'Observability', path: '/system/observability' },
                  ],
                },
              ].map((col) => (
                <div key={col.title}>
                  <div className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">{col.title}</div>
                  <ul className="space-y-1.5">
                    {col.links.map((link) => (
                      <li key={link.path}>
                        <Link to={link.path} className="text-emerald-300/50 hover:text-emerald-300 text-xs transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-emerald-500/10 mt-6 pt-4 max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-2 text-[10px] text-emerald-300/25">
              <span>© 2026 Atlas Sanctum Foundation. All rights reserved.</span>
              <span>From Extraction to Regeneration · From Depletion to Abundance</span>
              <div className="flex gap-3">
                <span>v2.6.1</span>
                <span>RVE Protocol</span>
                <span>Atlas Sanctum</span>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* ── Universal Action Layer (Command Palette) ─────────────────── */}
      {commandOpen && <CommandPalette onClose={() => setCommandOpen(false)} />}
    </div>
  );
}
