import { useState } from 'react';
import { Activity, TrendingUp, Users, DollarSign, Filter } from 'lucide-react';
import { InteractiveChart } from './ui/interactive/InteractiveChart';
import { Card } from './ui/interactive/Card';
import { FilterPanel } from './ui/interactive/FilterPanel';
import { motion } from 'motion/react';

export function InteractiveDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Sample data for charts
  const impactData = [
    { date: 'May 1', carbon: 847, biodiversity: 423, water: 294, social: 381 },
    { date: 'May 2', carbon: 923, biodiversity: 489, water: 318, social: 412 },
    { date: 'May 3', carbon: 1024, biodiversity: 512, water: 342, social: 447 },
    { date: 'May 4', carbon: 978, biodiversity: 534, water: 365, social: 438 },
    { date: 'May 5', carbon: 1147, biodiversity: 578, water: 389, social: 492 },
    { date: 'May 6', carbon: 1234, biodiversity: 621, water: 412, social: 523 },
    { date: 'May 7', carbon: 1312, biodiversity: 647, water: 438, social: 556 },
    { date: 'May 8', carbon: 1428, biodiversity: 689, water: 467, social: 589 },
  ];

  const verificationData = [
    { month: 'Jan', verified: 3847, pending: 284, disputed: 23 },
    { month: 'Feb', verified: 4123, pending: 312, disputed: 18 },
    { month: 'Mar', verified: 4692, pending: 298, disputed: 15 },
    { month: 'Apr', verified: 5234, pending: 327, disputed: 21 },
    { month: 'May', verified: 5847, pending: 342, disputed: 12 },
  ];

  const kpiData = [
    {
      label: 'Total Impact Value',
      value: '$847.3M',
      change: '+12.4%',
      trend: 'up',
      icon: DollarSign,
      color: 'emerald',
    },
    {
      label: 'Active Verifications',
      value: '2,847',
      change: '+8.7%',
      trend: 'up',
      icon: Activity,
      color: 'blue',
    },
    {
      label: 'Community Members',
      value: '87.4K',
      change: '+15.2%',
      trend: 'up',
      icon: Users,
      color: 'purple',
    },
    {
      label: 'RIU Trading Volume',
      value: '$19.3M',
      change: '+23.8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'teal',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white flex items-center gap-3">
            <Activity className="w-8 h-8 text-emerald-400" />
            Interactive Analytics Dashboard
          </h1>
          <p className="text-emerald-300/70 mt-2">
            Real-time impact metrics with interactive visualizations and filtering
          </p>
        </div>
      </div>

      {/* Filters */}
      <FilterPanel
        onFilterChange={(filters) => {
          if (filters.timeRange) setTimeRange(filters.timeRange);
          if (filters.metric) setSelectedMetric(filters.metric);
        }}
        filters={[
          {
            id: 'timeRange',
            label: 'Time Range',
            type: 'select',
            options: ['24h', '7d', '30d', '90d', '1y'],
          },
          {
            id: 'metric',
            label: 'Impact Type',
            type: 'select',
            options: ['All', 'Carbon', 'Biodiversity', 'Water', 'Social'],
          },
          {
            id: 'verified',
            label: 'Verified Only',
            type: 'checkbox',
          },
        ]}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpiData.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card hover>
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 bg-${kpi.color}-400/20 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${kpi.color}-400`} />
                  </div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    kpi.trend === 'up'
                      ? 'bg-emerald-400/10 text-emerald-400'
                      : 'bg-red-400/10 text-red-400'
                  }`}>
                    {kpi.change}
                  </div>
                </div>
                <div className="text-emerald-300/70 text-sm mb-1">{kpi.label}</div>
                <div className="text-white text-2xl">{kpi.value}</div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Impact Trends */}
        <InteractiveChart
          title="Impact Verification Trends"
          data={impactData}
          type="area"
          xAxisKey="date"
          dataKeys={[
            { key: 'carbon', color: '#10b981', name: 'Carbon Sequestration' },
            { key: 'biodiversity', color: '#3b82f6', name: 'Biodiversity' },
            { key: 'water', color: '#06b6d4', name: 'Water Quality' },
            { key: 'social', color: '#8b5cf6', name: 'Social Impact' },
          ]}
          height={350}
        />

        {/* Verification Status */}
        <InteractiveChart
          title="Verification Pipeline Status"
          data={verificationData}
          type="bar"
          xAxisKey="month"
          dataKeys={[
            { key: 'verified', color: '#10b981', name: 'Verified' },
            { key: 'pending', color: '#f59e0b', name: 'Pending' },
            { key: 'disputed', color: '#ef4444', name: 'Disputed' },
          ]}
          height={350}
        />
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card hover={false}>
          <h3 className="text-white mb-3">Top Performing Projects</h3>
          <div className="space-y-3">
            {[
              { name: 'Amazonian Reforestation', impact: '2.4M tons CO2', score: 98 },
              { name: 'Coral Reef Restoration', impact: '847 hectares', score: 96 },
              { name: 'Urban Tree Canopy', impact: '12.4K trees', score: 94 },
            ].map((project, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-emerald-300 text-sm mb-1">{project.name}</div>
                  <div className="text-emerald-300/50 text-xs">{project.impact}</div>
                </div>
                <div className="text-emerald-400 font-semibold">{project.score}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card hover={false}>
          <h3 className="text-white mb-3">Regional Distribution</h3>
          <div className="space-y-2">
            {[
              { region: 'Americas', percentage: 34 },
              { region: 'Europe', percentage: 28 },
              { region: 'Asia Pacific', percentage: 24 },
              { region: 'Africa', percentage: 14 },
            ].map((region, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-emerald-300/70 text-sm">{region.region}</span>
                  <span className="text-emerald-400 text-sm">{region.percentage}%</span>
                </div>
                <div className="w-full bg-slate-800/50 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${region.percentage}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card hover={false}>
          <h3 className="text-white mb-3">Recent Milestones</h3>
          <div className="space-y-3">
            {[
              { milestone: '1M verifications completed', date: 'May 5, 2026' },
              { milestone: '$1B impact value verified', date: 'May 2, 2026' },
              { milestone: '100K community members', date: 'Apr 28, 2026' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-emerald-300 text-sm">{item.milestone}</div>
                  <div className="text-emerald-300/50 text-xs">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card hover={false}>
        <h3 className="text-white mb-4">Real-Time Activity Feed</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {[
            { action: 'New verification completed', project: 'Amazon Forest A7', time: '2 min ago', type: 'success' },
            { action: 'RIU trade executed', details: '847 RIU-CARBON @ $47.82', time: '5 min ago', type: 'info' },
            { action: 'Oracle node upgraded', details: 'ORACLE-EU-001 v2.4.1', time: '12 min ago', type: 'info' },
            { action: 'Smart contract adapted', details: 'LSC-2026-4217 Phase 3', time: '18 min ago', type: 'success' },
            { action: 'Community vote passed', details: 'Governance Proposal #847', time: '24 min ago', type: 'success' },
          ].map((activity, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center justify-between p-3 bg-slate-800/30 rounded"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-emerald-400' : 'bg-blue-400'
                }`} />
                <div>
                  <div className="text-emerald-300 text-sm">{activity.action}</div>
                  <div className="text-emerald-300/50 text-xs">
                    {activity.project || activity.details}
                  </div>
                </div>
              </div>
              <div className="text-emerald-300/50 text-xs">{activity.time}</div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
