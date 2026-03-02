import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { ShoppingCart, Filter, TrendingUp, PieChart, Download, Award, Flame, FileCheck, Building2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Progress } from '../ui/progress';

const marketListings = [
  {
    id: 'RGN-001',
    category: 'Water Purification',
    region: 'East Africa',
    vintage: '2025',
    available: 15400,
    price: 2.45,
    confidence: 94,
    permanence: 85,
  },
  {
    id: 'RGN-002',
    category: 'Forest Restoration',
    region: 'West Africa',
    vintage: '2025',
    available: 28900,
    price: 3.20,
    confidence: 91,
    permanence: 95,
  },
  {
    id: 'RGN-003',
    category: 'Soil Regeneration',
    region: 'East Africa',
    vintage: '2024',
    available: 12300,
    price: 2.10,
    confidence: 88,
    permanence: 78,
  },
  {
    id: 'RGN-004',
    category: 'Clean Energy',
    region: 'Central Africa',
    vintage: '2025',
    available: 34500,
    price: 1.95,
    confidence: 92,
    permanence: 72,
  },
  {
    id: 'RGN-005',
    category: 'Waste Diversion',
    region: 'East Africa',
    vintage: '2025',
    available: 8700,
    price: 2.75,
    confidence: 89,
    permanence: 68,
  },
];

const portfolio = [
  { category: 'Water Purification', amount: 45000, value: 110250, impact: '675,000 L/day', color: '#3b82f6' },
  { category: 'Forest Restoration', amount: 32000, value: 102400, impact: '1,280 hectares', color: '#10b981' },
  { category: 'Soil Regeneration', amount: 28000, value: 58800, impact: '840 hectares', color: '#f59e0b' },
  { category: 'Clean Energy', amount: 51000, value: 99450, impact: '1,530 MWh', color: '#eab308' },
  { category: 'Education', amount: 19000, value: 47500, impact: '950 students', color: '#8b5cf6' },
];

const retirementHistory = [
  { date: '2025-02-15', category: 'Water Purification', amount: 5000, certificate: 'CERT-2025-0245', impact: '75,000 L/day' },
  { date: '2025-01-20', category: 'Forest Restoration', amount: 8000, certificate: 'CERT-2025-0189', impact: '320 hectares' },
  { date: '2024-12-10', category: 'Soil Regeneration', amount: 3500, certificate: 'CERT-2024-0567', impact: '105 hectares' },
];

const impactData = portfolio.map((item) => ({
  name: item.category,
  value: item.amount,
}));

export function BuyersPortal() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedVintage, setSelectedVintage] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5]);
  const [retireAmount, setRetireAmount] = useState(1000);
  const [retireStep, setRetireStep] = useState(1);

  const totalPortfolioValue = portfolio.reduce((sum, item) => sum + item.value, 0);
  const totalRGN = portfolio.reduce((sum, item) => sum + item.amount, 0);

  const filteredListings = marketListings.filter((listing) => {
    if (selectedCategory !== 'all' && listing.category !== selectedCategory) return false;
    if (selectedRegion !== 'all' && listing.region !== selectedRegion) return false;
    if (selectedVintage !== 'all' && listing.vintage !== selectedVintage) return false;
    if (listing.price < priceRange[0] || listing.price > priceRange[1]) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Corporate Buyers Portal</h2>
          <p className="text-emerald-300/70 mt-1">Purchase, manage, and retire regenerative credits for ESG reporting</p>
        </div>
        <Badge variant="outline" className="bg-indigo-500/10 border-indigo-500/30 text-indigo-300">
          <Building2 className="w-3 h-3 mr-1" />
          Enterprise Account
        </Badge>
      </div>

      <Tabs defaultValue="market" className="space-y-6">
        <TabsList className="bg-black/40 border border-emerald-500/20">
          <TabsTrigger value="market">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Market
          </TabsTrigger>
          <TabsTrigger value="portfolio">
            <PieChart className="w-4 h-4 mr-2" />
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="retire">
            <Flame className="w-4 h-4 mr-2" />
            Retire Credits
          </TabsTrigger>
        </TabsList>

        {/* Market Tab */}
        <TabsContent value="market" className="space-y-6">
          {/* Filters */}
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-semibold text-white">Market Filters</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-emerald-300">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-slate-800 border-emerald-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Water Purification">Water Purification</SelectItem>
                    <SelectItem value="Forest Restoration">Forest Restoration</SelectItem>
                    <SelectItem value="Soil Regeneration">Soil Regeneration</SelectItem>
                    <SelectItem value="Clean Energy">Clean Energy</SelectItem>
                    <SelectItem value="Waste Diversion">Waste Diversion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-300">Region</Label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="bg-slate-800 border-emerald-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="East Africa">East Africa</SelectItem>
                    <SelectItem value="West Africa">West Africa</SelectItem>
                    <SelectItem value="Central Africa">Central Africa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-300">Vintage</Label>
                <Select value={selectedVintage} onValueChange={setSelectedVintage}>
                  <SelectTrigger className="bg-slate-800 border-emerald-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vintages</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-300">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={5}
                  step={0.1}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </Card>

          {/* Market Listings */}
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Available RGN Credits</h3>
              <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-300">
                {filteredListings.length} listings
              </Badge>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-500/20">
                  <TableHead className="text-emerald-300">ID</TableHead>
                  <TableHead className="text-emerald-300">Category</TableHead>
                  <TableHead className="text-emerald-300">Region</TableHead>
                  <TableHead className="text-emerald-300">Vintage</TableHead>
                  <TableHead className="text-emerald-300 text-right">Available</TableHead>
                  <TableHead className="text-emerald-300 text-right">Price/RGN</TableHead>
                  <TableHead className="text-emerald-300 text-center">Quality</TableHead>
                  <TableHead className="text-emerald-300"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredListings.map((listing) => (
                  <TableRow key={listing.id} className="border-emerald-500/10">
                    <TableCell className="text-white font-mono text-sm">{listing.id}</TableCell>
                    <TableCell className="text-white">{listing.category}</TableCell>
                    <TableCell className="text-emerald-300/70">{listing.region}</TableCell>
                    <TableCell className="text-emerald-300/70">{listing.vintage}</TableCell>
                    <TableCell className="text-right text-emerald-400 font-mono">
                      {listing.available.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-white font-semibold">${listing.price}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 justify-center">
                          <span className="text-xs text-emerald-300/70">C:</span>
                          <span className="text-xs text-emerald-400">{listing.confidence}%</span>
                        </div>
                        <div className="flex items-center gap-1 justify-center">
                          <span className="text-xs text-emerald-300/70">P:</span>
                          <span className="text-xs text-emerald-400">{listing.permanence}%</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        Buy
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio" className="space-y-6">
          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/30 p-6">
              <p className="text-emerald-300/70 text-sm mb-1">Total Portfolio Value</p>
              <p className="text-3xl font-bold text-white">${totalPortfolioValue.toLocaleString()}</p>
              <p className="text-emerald-300/70 text-xs mt-2">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                +12.5% this quarter
              </p>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 p-6">
              <p className="text-blue-300/70 text-sm mb-1">Total RGN Holdings</p>
              <p className="text-3xl font-bold text-white">{totalRGN.toLocaleString()}</p>
              <p className="text-blue-300/70 text-xs mt-2">Across {portfolio.length} categories</p>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 p-6">
              <p className="text-purple-300/70 text-sm mb-1">Retired Credits</p>
              <p className="text-3xl font-bold text-white">16,500</p>
              <p className="text-purple-300/70 text-xs mt-2">ESG reporting ready</p>
            </Card>
          </div>

          {/* Impact Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Portfolio Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RePieChart>
                  <Pie
                    data={impactData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {impactData.map((entry, index) => {
                      const colors = ['#3b82f6', '#10b981', '#f59e0b', '#eab308', '#8b5cf6'];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '8px',
                    }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Impact Summary</h3>
              <div className="space-y-4">
                {portfolio.map((item) => (
                  <div key={item.category} className="p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-white font-medium">{item.category}</p>
                        <p className="text-emerald-400 text-sm font-mono mt-1">{item.impact}</p>
                      </div>
                      <Badge
                        variant="outline"
                        style={{ backgroundColor: `${item.color}20`, borderColor: `${item.color}50` }}
                      >
                        {item.amount.toLocaleString()} RGN
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-emerald-300/70">
                      <span>Value: ${item.value.toLocaleString()}</span>
                      <span>Avg: ${(item.value / item.amount).toFixed(2)}/RGN</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Retire Credits Tab */}
        <TabsContent value="retire" className="space-y-6">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Retire RGN Credits</h3>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-emerald-300/70">Step {retireStep} of 3</span>
                <span className="text-sm text-emerald-300/70">{Math.round((retireStep / 3) * 100)}% Complete</span>
              </div>
              <Progress value={(retireStep / 3) * 100} className="h-2" />
              <div className="flex justify-between mt-4">
                <div
                  className={`flex items-center gap-2 ${retireStep >= 1 ? 'text-emerald-400' : 'text-emerald-300/30'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      retireStep >= 1 ? 'bg-emerald-500' : 'bg-slate-700'
                    }`}
                  >
                    1
                  </div>
                  <span className="text-sm">Select Credits</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${retireStep >= 2 ? 'text-emerald-400' : 'text-emerald-300/30'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      retireStep >= 2 ? 'bg-emerald-500' : 'bg-slate-700'
                    }`}
                  >
                    2
                  </div>
                  <span className="text-sm">Burn & Generate</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${retireStep >= 3 ? 'text-emerald-400' : 'text-emerald-300/30'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      retireStep >= 3 ? 'bg-emerald-500' : 'bg-slate-700'
                    }`}
                  >
                    3
                  </div>
                  <span className="text-sm">Download Bundle</span>
                </div>
              </div>
            </div>

            {/* Step 1: Select Credits */}
            {retireStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-emerald-300">Category</Label>
                    <Select defaultValue="water">
                      <SelectTrigger className="bg-slate-800 border-emerald-500/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="water">Water Purification (45,000 RGN)</SelectItem>
                        <SelectItem value="forest">Forest Restoration (32,000 RGN)</SelectItem>
                        <SelectItem value="soil">Soil Regeneration (28,000 RGN)</SelectItem>
                        <SelectItem value="energy">Clean Energy (51,000 RGN)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-emerald-300">Amount to Retire</Label>
                    <Input
                      type="number"
                      value={retireAmount}
                      onChange={(e) => setRetireAmount(Number(e.target.value))}
                      className="bg-slate-800 border-emerald-500/30 text-white"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-emerald-300/70 mb-1">Credits to Retire</p>
                      <p className="text-white font-semibold">{retireAmount.toLocaleString()} RGN</p>
                    </div>
                    <div>
                      <p className="text-emerald-300/70 mb-1">Equivalent Impact</p>
                      <p className="text-emerald-400 font-mono">{(retireAmount * 15).toLocaleString()} L/day</p>
                    </div>
                    <div>
                      <p className="text-emerald-300/70 mb-1">Certificate Type</p>
                      <p className="text-white">NFT + PDF Bundle</p>
                    </div>
                    <div>
                      <p className="text-emerald-300/70 mb-1">ESG Reporting</p>
                      <p className="text-green-300">Ready</p>
                    </div>
                  </div>
                </div>

                <Button onClick={() => setRetireStep(2)} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Next: Burn Credits
                </Button>
              </div>
            )}

            {/* Step 2: Burn & Generate */}
            {retireStep === 2 && (
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg text-center">
                  <Flame className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                  <p className="text-white text-lg font-semibold mb-2">Ready to Retire Credits</p>
                  <p className="text-orange-300/70 text-sm">
                    This will permanently burn {retireAmount.toLocaleString()} RGN and generate an impact certificate
                  </p>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-300 text-sm mb-2 font-medium">What happens next:</p>
                  <ul className="space-y-1 text-blue-300/70 text-sm">
                    <li>• RGN tokens will be burned (permanently removed from circulation)</li>
                    <li>• NFT certificate minted with metadata and impact metrics</li>
                    <li>• PDF audit report bundle generated for download</li>
                    <li>• Transaction recorded on-chain for verification</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button onClick={() => setRetireStep(1)} variant="outline" className="flex-1 border-emerald-500/30">
                    Back
                  </Button>
                  <Button onClick={() => setRetireStep(3)} className="flex-1 bg-orange-600 hover:bg-orange-700">
                    <Flame className="w-4 h-4 mr-2" />
                    Burn & Generate Certificate
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Download Bundle */}
            {retireStep === 3 && (
              <div className="space-y-4">
                <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                  <Award className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <p className="text-white text-lg font-semibold mb-2">Certificate Generated!</p>
                  <p className="text-green-300/70 text-sm">
                    Your impact certificate has been created and is ready for download
                  </p>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="text-emerald-300/70">Certificate ID:</span>
                    <span className="text-white font-mono">CERT-2025-0789</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/70">Credits Retired:</span>
                    <span className="text-white">{retireAmount.toLocaleString()} RGN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/70">Impact:</span>
                    <span className="text-emerald-400 font-mono">{(retireAmount * 15).toLocaleString()} L/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/70">NFT Token ID:</span>
                    <span className="text-white font-mono">#7892</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/70">Transaction:</span>
                    <span className="text-emerald-300 font-mono text-sm">0x9f4a...b3e8</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-emerald-500/30">
                    <FileCheck className="w-4 h-4 mr-2" />
                    View NFT Metadata
                  </Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF Bundle
                  </Button>
                </div>

                <Button
                  onClick={() => setRetireStep(1)}
                  variant="outline"
                  className="w-full border-emerald-500/30"
                >
                  Retire More Credits
                </Button>
              </div>
            )}
          </Card>

          {/* Retirement History */}
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Retirement History</h3>
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-500/20">
                  <TableHead className="text-emerald-300">Date</TableHead>
                  <TableHead className="text-emerald-300">Category</TableHead>
                  <TableHead className="text-emerald-300 text-right">Amount</TableHead>
                  <TableHead className="text-emerald-300">Impact</TableHead>
                  <TableHead className="text-emerald-300">Certificate</TableHead>
                  <TableHead className="text-emerald-300"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {retirementHistory.map((retirement, idx) => (
                  <TableRow key={idx} className="border-emerald-500/10">
                    <TableCell className="text-emerald-300/70">{retirement.date}</TableCell>
                    <TableCell className="text-white">{retirement.category}</TableCell>
                    <TableCell className="text-right text-orange-400 font-mono">
                      {retirement.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-emerald-400 font-mono text-sm">{retirement.impact}</TableCell>
                    <TableCell className="text-emerald-300 font-mono text-sm">{retirement.certificate}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" className="border-emerald-500/30">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
