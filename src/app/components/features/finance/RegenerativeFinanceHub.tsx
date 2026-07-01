import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { useNavigate } from 'react-router';
import { DollarSign, TrendingUp, Coins, Users, ArrowRight, Leaf, Shield, Zap, BarChart3 } from 'lucide-react';

const features = [
  {
    title: 'Revenue Sharing Agreements',
    description: 'Tokenize future ecosystem revenue streams and distribute yields to investors automatically',
    icon: DollarSign,
    apy: '+18.4%',
    tvl: '$84M',
    href: '/finance/revenue-sharing',
    tags: ['Auto Distribution', 'Smart Contracts'],
    color: 'from-emerald-400 to-teal-500',
  },
  {
    title: 'Regenerative Bonds',
    description: 'Fixed-income instruments backed by verified ecosystem assets with impact-linked returns',
    icon: Shield,
    apy: '+12.1%',
    tvl: '$127M',
    href: '/finance/bonds',
    tags: ['Fixed Income', 'Ecosystem-Backed'],
    color: 'from-cyan-400 to-blue-500',
  },
  {
    title: 'Staking & Yield',
    description: 'Stake RVE tokens or ecosystem credits to earn protocol fees and governance rewards',
    icon: Coins,
    apy: '+24.7%',
    tvl: '$43M',
    href: '/finance/staking',
    tags: ['Auto-Compounding', 'Governance Rights'],
    color: 'from-purple-400 to-violet-500',
  },
  {
    title: 'Micro-Investments',
    description: 'Fractional ownership of regenerative assets from as little as $10 per investment',
    icon: Users,
    apy: '+16.2%',
    tvl: '$12M',
    href: '/finance/micro-investments',
    tags: ['$10 Minimum', 'Fractional Ownership'],
    color: 'from-amber-400 to-orange-500',
  },
];

const metrics = [
  { label: 'Total Capital Deployed', value: '$266M', change: '+34.2%' },
  { label: 'Active Investors', value: '12,847', change: '+18.9%' },
  { label: 'Avg Portfolio Return', value: '+22.4%', change: '+4.1pp' },
  { label: 'Projects Funded', value: '847', change: '+124' },
];

const recentActivity = [
  { type: 'Bond Issue', name: 'Amazon Forest Bond Series 3', amount: '$8.4M', rate: '11.2%', time: '2 hrs ago' },
  { type: 'Revenue Share', name: 'Coral Reef Revenue Share', amount: '$2.1M', rate: '19.4%', time: '5 hrs ago' },
  { type: 'Staking', name: 'RVE Token Pool Reward', amount: '$847K', rate: '24.7%', time: '8 hrs ago' },
  { type: 'Micro-Invest', name: 'Cloud Forest Fractional', amount: '$124K', rate: '16.8%', time: '1 day ago' },
];

export function RegenerativeFinanceHub() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white mb-2">Regenerative Finance Hub</h2>
        <p className="text-emerald-300/70">Novel financial primitives for funding ecosystem restoration and regeneration</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
            <div className="text-emerald-400 text-xs mb-2">{m.label}</div>
            <div className="text-white text-xl font-bold">{m.value}</div>
            <div className="text-emerald-400 text-xs mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {m.change}
            </div>
          </Card>
        ))}
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <Card
              key={f.title}
              className="bg-slate-900/50 border-emerald-500/20 p-5 hover:border-emerald-500/40 transition-all cursor-pointer"
              onClick={() => navigate(f.href)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-white font-semibold text-sm">{f.title}</h3>
                    <ArrowRight className="w-4 h-4 text-emerald-400/50" />
                  </div>
                  <p className="text-emerald-300/60 text-xs mb-3">{f.description}</p>
                  <div className="flex gap-1.5 mb-3">
                    {f.tags.map((t) => <Badge key={t} className="bg-slate-700/50 text-slate-300 border-0 text-xs">{t}</Badge>)}
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-emerald-300/50 text-xs">APY</div>
                      <div className="text-emerald-400 font-bold text-sm">{f.apy}</div>
                    </div>
                    <div>
                      <div className="text-emerald-300/50 text-xs">TVL</div>
                      <div className="text-white font-medium text-sm">{f.tvl}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-sm">Recent Activity</h3>
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 text-xs h-7 px-3">View All</Button>
        </div>
        <div className="space-y-3">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0">
              <div className="flex items-center gap-3">
                <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">{a.type}</Badge>
                <span className="text-white text-sm">{a.name}</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <span className="text-white font-medium">{a.amount}</span>
                <span className="text-emerald-400">{a.rate}</span>
                <span className="text-emerald-300/40 text-xs">{a.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
