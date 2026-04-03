import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Building2, Shield, TrendingUp, BarChart3, FileText, Download, 
  CheckCircle2, AlertTriangle, Clock, DollarSign, Target, Award,
  PieChart, LineChart as LineChartIcon, Globe2
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart as RechartsPie, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Portfolio data
const portfolioAssets = [
  { name: 'Carbon Credits', value: 423.8, color: '#10b981', allocation: 50 },
  { name: 'Water Assets', value: 178.2, color: '#3b82f6', allocation: 21 },
  { name: 'Biodiversity', value: 156.1, color: '#a855f7', allocation: 18 },
  { name: 'Cultural Assets', value: 89.2, color: '#f59e0b', allocation: 11 },
];

// Performance data
const performanceData = [
  { month: 'Mar', portfolio: 720, benchmark: 680 },
  { month: 'Apr', portfolio: 745, benchmark: 695 },
  { month: 'May', portfolio: 778, benchmark: 712 },
  { month: 'Jun', portfolio: 812, benchmark: 728 },
  { month: 'Jul', portfolio: 798, benchmark: 745 },
  { month: 'Aug', portfolio: 834, benchmark: 762 },
];

// Holdings
const holdings = [
  { 
    project: 'Maasai Mara Regenerative Grassland',
    assetType: 'Carbon Credits',
    quantity: 12800,
    avgPrice: 26.50,
    currentPrice: 28.00,
    value: 358400,
    gain: 5.66,
    vintage: '2024-2026',
    status: 'active'
  },
  { 
    project: 'Lake Victoria Water Purification',
    assetType: 'Water Quality Credits',
    quantity: 45000,
    avgPrice: 16.80,
    currentPrice: 18.00,
    value: 810000,
    gain: 7.14,
    vintage: '2025-2027',
    status: 'active'
  },
  { 
    project: 'Kakamega Forest Biodiversity',
    assetType: 'Biodiversity Credits',
    quantity: 23100,
    avgPrice: 32.20,
    currentPrice: 35.00,
    value: 808500,
    gain: 8.70,
    vintage: '2024-2028',
    status: 'active'
  },
];

// ESG reporting
const esgMetrics = [
  { category: 'Environmental', score: 94, status: 'excellent', change: '+2%' },
  { category: 'Social', score: 87, status: 'good', change: '+5%' },
  { category: 'Governance', score: 92, status: 'excellent', change: '+1%' },
];

export function InstitutionalPortal() {
  const totalValue = portfolioAssets.reduce((sum, asset) => sum + asset.value, 0);
  const totalHoldingsValue = holdings.reduce((sum, h) => sum + h.value, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Institutional Portfolio</h2>
          <p className="text-emerald-300/70">Enterprise-grade regenerative asset management</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-300">
            <Building2 className="w-3 h-3 mr-1" />
            Institutional Account
          </Badge>
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Portfolio summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-300 text-xs">
              +12.4%
            </Badge>
          </div>
          <p className="text-3xl font-bold text-white mb-1">${(totalHoldingsValue / 1000000).toFixed(1)}M</p>
          <p className="text-emerald-300/70 text-sm">Portfolio Value</p>
        </Card>

        <Card className="bg-black/40 border-blue-500/20 backdrop-blur-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-300 text-xs">
              +7.2%
            </Badge>
          </div>
          <p className="text-3xl font-bold text-white mb-1">+$214K</p>
          <p className="text-blue-300/70 text-sm">Total Gain (YTD)</p>
        </Card>

        <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 text-purple-400" />
            <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-300 text-xs">
              On Track
            </Badge>
          </div>
          <p className="text-3xl font-bold text-white mb-1">89%</p>
          <p className="text-purple-300/70 text-sm">ESG Target Progress</p>
        </Card>

        <Card className="bg-black/40 border-amber-500/20 backdrop-blur-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-300 text-xs">
              Diversified
            </Badge>
          </div>
          <p className="text-3xl font-bold text-white mb-1">4</p>
          <p className="text-amber-300/70 text-sm">Asset Classes</p>
        </Card>
      </div>

      <Tabs defaultValue="portfolio" className="space-y-6">
        <TabsList className="bg-black/40 border border-emerald-500/20">
          <TabsTrigger value="portfolio">
            <PieChart className="w-4 h-4 mr-2" />
            Portfolio Overview
          </TabsTrigger>
          <TabsTrigger value="holdings">
            <BarChart3 className="w-4 h-4 mr-2" />
            Holdings
          </TabsTrigger>
          <TabsTrigger value="performance">
            <LineChartIcon className="w-4 h-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="esg">
            <Award className="w-4 h-4 mr-2" />
            ESG Reporting
          </TabsTrigger>
        </TabsList>

        {/* Portfolio Overview Tab */}
        <TabsContent value="portfolio">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Allocation chart */}
            <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Asset Allocation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPie>
                  <Pie
                    data={portfolioAssets}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="allocation"
                    label={(entry) => `${entry.name}: ${entry.allocation}%`}
                  >
                    {portfolioAssets.map((asset, index) => (
                      <Cell key={`cell-${asset.name}-${index}`} fill={asset.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '8px',
                    }}
                  />
                </RechartsPie>
              </ResponsiveContainer>
            </Card>

            {/* Asset breakdown */}
            <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Asset Classes</h3>
              <div className="space-y-4">
                {portfolioAssets.map((asset) => (
                  <div key={asset.name} className="p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{asset.name}</span>
                      <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-300">
                        {asset.allocation}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-300/70 text-sm">${asset.value}B</span>
                      <span className="text-green-400 text-sm">+12.4%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Holdings Tab */}
        <TabsContent value="holdings">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Current Holdings</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-emerald-500/20">
                    <th className="text-left py-3 px-4 text-emerald-300 text-sm font-medium">Project</th>
                    <th className="text-left py-3 px-4 text-emerald-300 text-sm font-medium">Asset Type</th>
                    <th className="text-right py-3 px-4 text-emerald-300 text-sm font-medium">Quantity</th>
                    <th className="text-right py-3 px-4 text-emerald-300 text-sm font-medium">Avg Price</th>
                    <th className="text-right py-3 px-4 text-emerald-300 text-sm font-medium">Current</th>
                    <th className="text-right py-3 px-4 text-emerald-300 text-sm font-medium">Value</th>
                    <th className="text-right py-3 px-4 text-emerald-300 text-sm font-medium">Gain/Loss</th>
                    <th className="text-left py-3 px-4 text-emerald-300 text-sm font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((holding, idx) => (
                    <tr key={idx} className="border-b border-emerald-500/10 hover:bg-emerald-500/5">
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-white font-medium">{holding.project}</p>
                          <p className="text-emerald-300/70 text-xs">Vintage: {holding.vintage}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-emerald-300">{holding.assetType}</td>
                      <td className="py-4 px-4 text-right text-white">{holding.quantity.toLocaleString()}</td>
                      <td className="py-4 px-4 text-right text-emerald-300">${holding.avgPrice}</td>
                      <td className="py-4 px-4 text-right text-white">${holding.currentPrice}</td>
                      <td className="py-4 px-4 text-right text-white font-medium">${(holding.value / 1000).toFixed(0)}K</td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-green-400">+{holding.gain.toFixed(2)}%</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-300">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Portfolio Performance vs Benchmark</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#10b981" opacity={0.1} />
                <XAxis dataKey="month" stroke="#6ee7b7" />
                <YAxis stroke="#6ee7b7" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="portfolio" stroke="#10b981" strokeWidth={3} name="Your Portfolio" />
                <Line type="monotone" dataKey="benchmark" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" name="Market Benchmark" />
              </LineChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <p className="text-emerald-300/70 text-sm mb-1">Outperformance</p>
                <p className="text-2xl font-bold text-green-400">+4.8%</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <p className="text-emerald-300/70 text-sm mb-1">Sharpe Ratio</p>
                <p className="text-2xl font-bold text-white">1.24</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <p className="text-emerald-300/70 text-sm mb-1">Max Drawdown</p>
                <p className="text-2xl font-bold text-white">-3.2%</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* ESG Reporting Tab */}
        <TabsContent value="esg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-white mb-4">ESG Performance</h3>
              <div className="space-y-4">
                {esgMetrics.map((metric) => (
                  <div key={metric.category} className="p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{metric.category}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={
                          metric.status === 'excellent'
                            ? 'bg-green-500/10 border-green-500/30 text-green-300'
                            : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                        }>
                          {metric.status}
                        </Badge>
                        <span className="text-green-400 text-sm">{metric.change}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-700/50 rounded-full h-2">
                        <div 
                          className="bg-emerald-400 h-2 rounded-full" 
                          style={{ width: `${metric.score}%` }}
                        ></div>
                      </div>
                      <span className="text-emerald-300 font-medium">{metric.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Impact Summary</h3>
              <div className="space-y-4">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-300 font-medium">Carbon Impact</span>
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">127,500 tonnes CO2e</p>
                  <p className="text-emerald-300/70 text-sm">Total sequestered across portfolio</p>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-300 font-medium">Community Benefit</span>
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">544,200 people</p>
                  <p className="text-blue-300/70 text-sm">Direct beneficiaries</p>
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-300 font-medium">Biodiversity</span>
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">646 species</p>
                  <p className="text-purple-300/70 text-sm">Protected or restored</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Export options */}
          <Card className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/30 backdrop-blur-sm p-6">
            <h3 className="text-white font-semibold mb-3">ESG Report Exports</h3>
            <p className="text-emerald-300/70 text-sm mb-4">
              Download comprehensive ESG reports for board meetings, regulatory filings, or investor communications.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
                <FileText className="w-4 h-4 mr-2" />
                GRI Standards Report
              </Button>
              <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
                <FileText className="w-4 h-4 mr-2" />
                TCFD Report
              </Button>
              <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
                <FileText className="w-4 h-4 mr-2" />
                SASB Report
              </Button>
              <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
                <FileText className="w-4 h-4 mr-2" />
                Custom Report
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}