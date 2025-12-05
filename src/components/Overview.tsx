import { TrendingUp, TrendingDown, Leaf, Heart, Palette, Droplet } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const marketData = [
  { month: 'Jan', value: 542 },
  { month: 'Feb', value: 589 },
  { month: 'Mar', value: 634 },
  { month: 'Apr', value: 698 },
  { month: 'May', value: 756 },
  { month: 'Jun', value: 847 },
];

const assetDistribution = [
  { name: 'Environmental', value: 384, color: '#10b981' },
  { name: 'Health & Social', value: 212, color: '#3b82f6' },
  { name: 'Cultural', value: 156, color: '#f59e0b' },
  { name: 'Ecosystem Services', value: 95, color: '#8b5cf6' },
];

export function Overview() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Environmental Assets"
          value="$384.2B"
          change="+12.3%"
          trend="up"
          icon={Leaf}
          color="emerald"
        />
        <MetricCard
          title="Health & Social Assets"
          value="$212.8B"
          change="+8.7%"
          trend="up"
          icon={Heart}
          color="blue"
        />
        <MetricCard
          title="Cultural Assets"
          value="$156.1B"
          change="+15.2%"
          trend="up"
          icon={Palette}
          color="amber"
        />
        <MetricCard
          title="Ecosystem Services"
          value="$94.2B"
          change="+9.4%"
          trend="up"
          icon={Droplet}
          color="purple"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Growth Chart */}
        <div className="lg:col-span-2 bg-black/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
          <h3 className="text-white mb-6">Total Market Value Growth (Billions USD)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={marketData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#10b981" opacity={0.1} />
              <XAxis dataKey="month" stroke="#6ee7b7" />
              <YAxis stroke="#6ee7b7" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#064e3b', 
                  border: '1px solid #10b981',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Area type="monotone" dataKey="value" stroke="#10b981" fill="url(#colorValue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Asset Distribution */}
        <div className="bg-black/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
          <h3 className="text-white mb-6">Asset Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={assetDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {assetDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#064e3b', 
                  border: '1px solid #10b981',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {assetDistribution.map((asset, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }}></div>
                  <span className="text-emerald-300/70">{asset.name}</span>
                </div>
                <span className="text-white">${asset.value}B</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Active Projects"
          value="12,847"
          description="Restoration and renewal initiatives worldwide"
        />
        <StatCard
          title="Verified Custodians"
          value="3,421"
          description="Community cooperatives and conservation groups"
        />
        <StatCard
          title="Carbon Sequestered"
          value="847M tons"
          description="CO₂ removed from atmosphere this year"
        />
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-8">
        <h2 className="text-white mb-4">The Regenerative Revolution</h2>
        <p className="text-emerald-300/80 mb-4">
          The Regenerative Value Exchange transforms how we measure wealth. Instead of extracting value from nature, 
          we recognize and reward those who heal ecosystems, preserve cultures, and enhance human well-being.
        </p>
        <p className="text-emerald-300/80">
          Through blockchain verification, AI-driven monitoring, and multi-stakeholder governance, we've created a marketplace 
          where regenerative actions become appreciating assets. Every forest restored, every language preserved, and every 
          community uplifted contributes to a new form of wealth — one that grows by healing, not harming.
        </p>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
}

function MetricCard({ title, value, change, trend, icon: Icon, color }: MetricCardProps) {
  const colorClasses = {
    emerald: 'from-emerald-500 to-emerald-600',
    blue: 'from-blue-500 to-blue-600',
    amber: 'from-amber-500 to-amber-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6 hover:border-emerald-500/40 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
          {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{change}</span>
        </div>
      </div>
      <div className="text-emerald-300/70 text-sm mb-1">{title}</div>
      <div className="text-white">{value}</div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  description: string;
}

function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div className="bg-black/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
      <div className="text-emerald-300/70 text-sm mb-2">{title}</div>
      <div className="text-white mb-2">{value}</div>
      <div className="text-emerald-300/50 text-sm">{description}</div>
    </div>
  );
}
