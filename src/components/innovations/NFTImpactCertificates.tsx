import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Award, Image, TrendingUp, Users, Eye, Share2, Download, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function NFTImpactCertificates() {
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null);

  // NFT collections
  const collections = [
    {
      id: 'forest-guardians',
      name: 'Forest Guardians',
      description: 'Certificates for verified reforestation projects',
      totalMinted: 2456,
      holders: 1234,
      floorPrice: 2.5,
      volume24h: 45600,
      avgImpact: '1,250 tCO2e',
      verified: true
    },
    {
      id: 'ocean-protectors',
      name: 'Ocean Protectors',
      description: 'Marine conservation and coral reef restoration',
      totalMinted: 1873,
      holders: 967,
      floorPrice: 3.2,
      volume24h: 38200,
      avgImpact: '850 tCO2e',
      verified: true
    },
    {
      id: 'biodiversity-badges',
      name: 'Biodiversity Badges',
      description: 'Wildlife habitat preservation certificates',
      totalMinted: 3201,
      holders: 1589,
      floorPrice: 1.8,
      volume24h: 52300,
      avgImpact: '2,100 species',
      verified: true
    },
  ];

  // Individual NFTs
  const nfts = [
    {
      id: 'NFT-4782',
      collection: 'Forest Guardians',
      name: 'Amazon Rainforest Protection #4782',
      owner: '0x742d...3f91',
      mintDate: '2025-11-15',
      project: 'Amazon Conservation',
      impact: {
        carbonSequestered: 1450,
        treesPlanted: 5200,
        areaCovered: 25,
        biodiversityScore: 87.3
      },
      metadata: {
        location: 'Brazil',
        verification: 'Satellite + IoT',
        certifiedBy: 'Verra',
        vintage: '2025'
      },
      price: 2.8,
      lastSale: '2.6 RVE',
      views: 342,
      likes: 87
    },
    {
      id: 'NFT-4781',
      collection: 'Ocean Protectors',
      name: 'Coral Reef Restoration #4781',
      owner: '0x923a...8c42',
      mintDate: '2025-12-03',
      project: 'Great Barrier Reef',
      impact: {
        carbonSequestered: 920,
        coralRestored: 1200,
        areaCovered: 8,
        biodiversityScore: 92.1
      },
      metadata: {
        location: 'Australia',
        verification: 'Underwater Monitoring',
        certifiedBy: 'Gold Standard',
        vintage: '2025'
      },
      price: 3.4,
      lastSale: '3.2 RVE',
      views: 512,
      likes: 156
    },
    {
      id: 'NFT-4780',
      collection: 'Biodiversity Badges',
      name: 'African Wildlife Sanctuary #4780',
      owner: '0x456b...2d83',
      mintDate: '2025-10-22',
      project: 'Serengeti Conservation',
      impact: {
        carbonSequestered: 680,
        speciesProtected: 2400,
        areaCovered: 45,
        biodiversityScore: 94.8
      },
      metadata: {
        location: 'Tanzania',
        verification: 'Camera Traps + Rangers',
        certifiedBy: 'Climate Action Reserve',
        vintage: '2025'
      },
      price: 1.9,
      lastSale: '1.8 RVE',
      views: 289,
      likes: 73
    },
  ];

  // Trading volume
  const tradingVolume = [
    { month: 'Aug', volume: 234000, sales: 456 },
    { month: 'Sep', volume: 312000, sales: 578 },
    { month: 'Oct', volume: 387000, sales: 689 },
    { month: 'Nov', volume: 445000, sales: 734 },
    { month: 'Dec', volume: 521000, sales: 812 },
    { month: 'Jan', volume: 598000, sales: 923 },
  ];

  // Impact distribution
  const impactDistribution = [
    { type: 'Carbon Sequestration', value: 45, color: '#10b981' },
    { type: 'Biodiversity', value: 28, color: '#3b82f6' },
    { type: 'Ocean Conservation', value: 18, color: '#8b5cf6' },
    { type: 'Habitat Protection', value: 9, color: '#f59e0b' },
  ];

  // Holder distribution
  const holderStats = [
    { category: '1 NFT', holders: 1234, percentage: 42 },
    { category: '2-5 NFTs', holders: 856, percentage: 29 },
    { category: '6-10 NFTs', holders: 423, percentage: 14 },
    { category: '11+ NFTs', holders: 267, percentage: 9 },
    { category: 'Whales (50+)', holders: 45, percentage: 6 },
  ];

  // Utility features
  const utilities = [
    {
      icon: Award,
      title: 'Impact Verification',
      description: 'On-chain proof of environmental contribution',
      enabled: true
    },
    {
      icon: TrendingUp,
      title: 'Value Appreciation',
      description: 'NFT value grows with project success',
      enabled: true
    },
    {
      icon: Users,
      title: 'DAO Governance',
      description: 'Voting rights in project decisions',
      enabled: true
    },
    {
      icon: Share2,
      title: 'Fractional Ownership',
      description: 'Split NFTs for wider accessibility',
      enabled: true
    },
  ];

  // Price history
  const priceHistory = [
    { date: '2025-08', forest: 2.1, ocean: 2.8, biodiversity: 1.5 },
    { date: '2025-09', forest: 2.3, ocean: 2.9, biodiversity: 1.6 },
    { date: '2025-10', forest: 2.4, ocean: 3.0, biodiversity: 1.7 },
    { date: '2025-11', forest: 2.6, ocean: 3.1, biodiversity: 1.8 },
    { date: '2025-12', forest: 2.7, ocean: 3.3, biodiversity: 1.9 },
    { date: '2026-01', forest: 2.8, ocean: 3.4, biodiversity: 1.9 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white mb-2">NFT Impact Certificates</h2>
        <p className="text-emerald-300/70">Tradeable digital certificates representing verified environmental impact</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300/70 text-sm">Total Minted</span>
            <Image className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-white text-2xl mb-1">7,530</div>
          <div className="text-emerald-400 text-sm">Across 3 collections</div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300/70 text-sm">Total Holders</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-white text-2xl mb-1">3,790</div>
          <div className="text-emerald-400 text-sm">Unique owners</div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300/70 text-sm">24h Volume</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-white text-2xl mb-1">136.1K</div>
          <div className="text-emerald-400 text-sm">RVE traded</div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300/70 text-sm">Avg Floor Price</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-white text-2xl mb-1">2.5 RVE</div>
          <div className="text-emerald-400 text-sm">+12.4% this week</div>
        </Card>
      </div>

      {/* NFT Collections */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Impact NFT Collections</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {collections.map((collection) => (
            <div key={collection.id} className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-medium">{collection.name}</h4>
                  <p className="text-emerald-300/70 text-sm mt-1">{collection.description}</p>
                </div>
                {collection.verified && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-emerald-300/70 text-xs">Total Minted</div>
                  <div className="text-white font-medium">{collection.totalMinted.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Holders</div>
                  <div className="text-white font-medium">{collection.holders.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Floor Price</div>
                  <div className="text-white font-medium">{collection.floorPrice} RVE</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">24h Volume</div>
                  <div className="text-white font-medium">{(collection.volume24h / 1000).toFixed(1)}K</div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-2">
                <div className="text-emerald-300/70 text-xs">Avg Impact</div>
                <div className="text-white text-sm font-medium">{collection.avgImpact}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Featured NFTs */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Featured Impact Certificates</h3>
        
        <div className="space-y-3">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className={`bg-slate-900/50 border rounded-lg p-4 cursor-pointer transition-all ${
                selectedNFT === nft.id
                  ? 'border-emerald-400 bg-emerald-400/10'
                  : 'border-emerald-500/20 hover:border-emerald-400/50'
              }`}
              onClick={() => setSelectedNFT(nft.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-medium">{nft.name}</h4>
                  <div className="text-emerald-300/70 text-sm mt-1">
                    {nft.collection} • {nft.id}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 text-xl font-medium">{nft.price} RVE</div>
                  <div className="text-emerald-300/70 text-xs">Last: {nft.lastSale}</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-3">
                <div>
                  <div className="text-emerald-300/70 text-xs">Carbon</div>
                  <div className="text-white font-medium">{nft.impact.carbonSequestered} tCO2e</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Area</div>
                  <div className="text-white font-medium">{nft.impact.areaCovered} ha</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Bio Score</div>
                  <div className="text-white font-medium">{nft.impact.biodiversityScore}</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Certified</div>
                  <div className="text-white font-medium">{nft.metadata.certifiedBy}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-4 text-xs text-emerald-300/70">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{nft.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    <span>{nft.likes}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                    {nft.metadata.location}
                  </Badge>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                    {nft.metadata.vintage}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Trading Volume */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">NFT Trading Volume</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={tradingVolume}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="month" stroke="#6ee7b7" />
            <YAxis yAxisId="left" stroke="#6ee7b7" />
            <YAxis yAxisId="right" orientation="right" stroke="#6ee7b7" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b98150' }}
              labelStyle={{ color: '#6ee7b7' }}
            />
            <Bar yAxisId="left" dataKey="volume" fill="#10b981" name="Volume (RVE)" />
            <Line yAxisId="right" type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} name="Sales Count" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Price History */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Floor Price History (RVE)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="date" stroke="#6ee7b7" />
            <YAxis stroke="#6ee7b7" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b98150' }}
              labelStyle={{ color: '#6ee7b7' }}
            />
            <Line type="monotone" dataKey="forest" stroke="#10b981" strokeWidth={2} name="Forest Guardians" />
            <Line type="monotone" dataKey="ocean" stroke="#3b82f6" strokeWidth={2} name="Ocean Protectors" />
            <Line type="monotone" dataKey="biodiversity" stroke="#f59e0b" strokeWidth={2} name="Biodiversity Badges" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Impact Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
          <h3 className="text-white mb-4">Impact Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={impactDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, value }) => `${type}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {impactDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b98150' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Holder Stats */}
        <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
          <h3 className="text-white mb-4">Holder Distribution</h3>
          
          <div className="space-y-3">
            {holderStats.map((stat, index) => (
              <div key={index} className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{stat.category}</span>
                  <span className="text-emerald-400 font-medium">{stat.holders.toLocaleString()}</span>
                </div>
                <div className="bg-slate-900/50 rounded-full h-2">
                  <div 
                    className="bg-emerald-400 h-2 rounded-full"
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* NFT Utilities */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">NFT Certificate Utilities</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {utilities.map((utility, index) => {
            const Icon = utility.icon;
            return (
              <div key={index} className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-emerald-500/20 p-2 rounded-lg">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  {utility.enabled && (
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                      enabled
                    </Badge>
                  )}
                </div>
                <h4 className="text-white font-medium mb-2">{utility.title}</h4>
                <p className="text-emerald-300/70 text-sm">{utility.description}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Minting Interface */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Mint Impact Certificate</h3>
        
        <div className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-emerald-300/70 text-sm mb-2 block">Select Collection</label>
              <select className="w-full bg-slate-900/50 border border-emerald-500/20 rounded-lg px-4 py-3 text-white">
                <option>Forest Guardians</option>
                <option>Ocean Protectors</option>
                <option>Biodiversity Badges</option>
              </select>
            </div>
            <div>
              <label className="text-emerald-300/70 text-sm mb-2 block">Project ID</label>
              <input
                type="text"
                className="w-full bg-slate-900/50 border border-emerald-500/20 rounded-lg px-4 py-3 text-white"
                placeholder="Enter project ID"
              />
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-3 mb-4">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-emerald-300/70 text-xs">Minting Fee</div>
                <div className="text-white font-medium">0.1 RVE</div>
              </div>
              <div>
                <div className="text-emerald-300/70 text-xs">Verification Time</div>
                <div className="text-white font-medium">~24 hours</div>
              </div>
              <div>
                <div className="text-emerald-300/70 text-xs">Royalty</div>
                <div className="text-white font-medium">2.5%</div>
              </div>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
            Mint Impact NFT
          </Button>
        </div>
      </Card>
    </div>
  );
}
