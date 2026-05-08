import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Award, ExternalLink, Heart, Share2, Download, TrendingUp, CheckCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function ImpactNFTGallery() {
  const [likedNFTs, setLikedNFTs] = useState<Set<string>>(new Set());

  const nfts = [
    {
      id: 'nft-1',
      title: 'Mangrove Guardian: 1000 Tons CO2',
      project: 'Bangladesh Sundarbans Restoration',
      issueDate: '2026-01-15',
      owner: 'Microsoft',
      impactData: {
        co2Sequestered: '1,240 tons',
        mangroves: '50,000 planted',
        coastline: '8.4 km protected',
        families: '340 benefited'
      },
      verificationScore: 94,
      tokenId: '#RVE-MNG-001240',
      rarity: 'Legendary',
      stage: 'Mature',
      milestones: 5,
      totalMilestones: 5,
      status: 'Complete',
      visual: 'Dynamic mangrove forest',
      blockchain: 'Polygon',
      value: '$34,600'
    },
    {
      id: 'nft-2',
      title: 'Biodiversity Champion: 47% Increase',
      project: 'Ecuador Amazon Agroforestry',
      issueDate: '2026-02-10',
      owner: 'Patagonia',
      impactData: {
        biodiversity: '+47% species',
        forest: '450 hectares',
        species: '87 native species',
        families: '120 Kichwa families'
      },
      verificationScore: 91,
      tokenId: '#RVE-BIO-000447',
      rarity: 'Epic',
      stage: 'Growing',
      milestones: 3,
      totalMilestones: 5,
      status: 'Active',
      visual: 'Evolving forest canopy',
      blockchain: 'Ethereum',
      value: '$52,300'
    },
    {
      id: 'nft-3',
      title: 'Water Guardian: 2.4M Liters/Day',
      project: 'Singapore Urban Wetland',
      issueDate: '2026-03-05',
      owner: 'You',
      impactData: {
        waterFiltered: '2.4M L/day',
        birds: '142 species',
        students: '23,400/year',
        temp: '-3.2°C cooling'
      },
      verificationScore: 96,
      tokenId: '#RVE-WAT-002400',
      rarity: 'Legendary',
      stage: 'Thriving',
      milestones: 4,
      totalMilestones: 5,
      status: 'Active',
      visual: 'Dynamic wetland ecosystem',
      blockchain: 'Polygon',
      value: '$41,800'
    },
    {
      id: 'nft-4',
      title: 'Cultural Keeper: Traditional Fire',
      project: 'Australian Aboriginal Fire Management',
      issueDate: '2026-02-20',
      owner: 'Indigenous Carbon Coalition',
      impactData: {
        carbon: '8,400 tons avoided',
        land: '120,000 hectares',
        knowledge: '60,000 years',
        burns: '42 cultural burns'
      },
      verificationScore: 98,
      tokenId: '#RVE-CUL-008400',
      rarity: 'Mythic',
      stage: 'Ancient',
      milestones: 5,
      totalMilestones: 5,
      status: 'Complete',
      visual: 'Traditional fire patterns',
      blockchain: 'Ethereum',
      value: '$89,200'
    },
    {
      id: 'nft-5',
      title: 'Coral Reef Regenerator',
      project: 'Indonesia Coral Triangle Restoration',
      issueDate: '2026-03-12',
      owner: 'Ocean Conservancy',
      impactData: {
        coral: '+68% coverage',
        fish: '+142% species',
        tourism: '$12M revenue',
        area: '24 hectares'
      },
      verificationScore: 89,
      tokenId: '#RVE-CRL-000068',
      rarity: 'Epic',
      stage: 'Recovering',
      milestones: 2,
      totalMilestones: 5,
      status: 'Active',
      visual: 'Growing coral reef',
      blockchain: 'Polygon',
      value: '$38,900'
    },
    {
      id: 'nft-6',
      title: 'Soil Carbon Pioneer',
      project: 'Kenya Regenerative Agriculture',
      issueDate: '2026-01-28',
      owner: 'Regenerative Capital DAO',
      impactData: {
        carbon: '3,200 tons',
        soil: '+34% organic matter',
        yields: '+58% increase',
        farmers: '450 smallholders'
      },
      verificationScore: 92,
      tokenId: '#RVE-SOL-003200',
      rarity: 'Epic',
      stage: 'Developing',
      milestones: 3,
      totalMilestones: 5,
      status: 'Active',
      visual: 'Rich soil ecosystem',
      blockchain: 'Ethereum',
      value: '$28,400'
    }
  ];

  const rarityColors = {
    'Mythic': 'from-purple-500 to-pink-500',
    'Legendary': 'from-amber-500 to-orange-500',
    'Epic': 'from-blue-500 to-cyan-500',
    'Rare': 'from-emerald-500 to-teal-500',
    'Common': 'from-slate-500 to-slate-600'
  };

  const toggleLike = (nftId: string) => {
    const newLiked = new Set(likedNFTs);
    if (newLiked.has(nftId)) {
      newLiked.delete(nftId);
    } else {
      newLiked.add(nftId);
    }
    setLikedNFTs(newLiked);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-white mb-1">Impact NFT Gallery</h2>
            <p className="text-emerald-300/70">
              Visual, evolving proof of your regenerative contributions
            </p>
          </div>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Award className="w-4 h-4 mr-2" />
          Mint New NFT
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'NFTs Minted', value: '8,934', icon: Award },
          { label: 'Total Value', value: '$12.4M', icon: TrendingUp },
          { label: 'Your Collection', value: '12', icon: Sparkles },
          { label: 'Verified Impact', value: '100%', icon: CheckCircle }
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-emerald-400 text-sm">{stat.label}</div>
                <Icon className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-white text-2xl font-bold">{stat.value}</div>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['All NFTs', 'Your Collection', 'Legendary', 'Epic', 'Active Projects', 'Completed'].map((filter) => (
          <Button
            key={filter}
            size="sm"
            variant="outline"
            className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10"
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* NFT Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft) => (
          <Card key={nft.id} className="bg-slate-900/50 border-emerald-500/20 overflow-hidden hover:border-emerald-500/40 transition-all group">
            {/* NFT Visual Placeholder */}
            <div className={`relative h-64 bg-gradient-to-br ${rarityColors[nft.rarity as keyof typeof rarityColors]} flex items-center justify-center text-white`}>
              <div className="text-center">
                <Award className="w-16 h-16 mx-auto mb-2 opacity-80" />
                <div className="text-sm opacity-80">{nft.visual}</div>
              </div>
              
              {/* Overlay Actions */}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button
                  onClick={() => toggleLike(nft.id)}
                  className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-black/70 transition-all"
                >
                  <Heart className={`w-4 h-4 ${likedNFTs.has(nft.id) ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                </button>
                <button className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-black/70 transition-all">
                  <Share2 className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Rarity Badge */}
              <div className="absolute top-3 left-3">
                <Badge variant="outline" className="border-white/30 text-white bg-black/30 backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {nft.rarity}
                </Badge>
              </div>

              {/* Status Badge */}
              <div className="absolute bottom-3 left-3">
                <Badge
                  variant="outline"
                  className={`${
                    nft.status === 'Complete'
                      ? 'border-emerald-300/50 text-emerald-100 bg-emerald-500/30'
                      : 'border-blue-300/50 text-blue-100 bg-blue-500/30'
                  } backdrop-blur-sm`}
                >
                  {nft.status === 'Complete' ? <CheckCircle className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1" />}
                  {nft.status}
                </Badge>
              </div>
            </div>

            {/* NFT Details */}
            <div className="p-5 space-y-3">
              {/* Title & Project */}
              <div>
                <h3 className="text-white mb-1">{nft.title}</h3>
                <div className="text-emerald-300/70 text-sm">{nft.project}</div>
              </div>

              {/* Impact Metrics */}
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(nft.impactData).map(([key, value]) => (
                  <div key={key} className="bg-emerald-400/10 border border-emerald-500/20 rounded-lg p-2">
                    <div className="text-emerald-400 text-xs capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-white text-sm font-medium">{value}</div>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-emerald-300/70">Milestones</span>
                  <span className="text-white">
                    {nft.milestones} / {nft.totalMilestones}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all"
                    style={{ width: `${(nft.milestones / nft.totalMilestones) * 100}%` }}
                  />
                </div>
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between text-xs text-emerald-300/70 pt-2 border-t border-emerald-500/20">
                <div>
                  <div>Token ID: {nft.tokenId}</div>
                  <div>Owner: {nft.owner}</div>
                </div>
                <div className="text-right">
                  <div>Verification: {nft.verificationScore}%</div>
                  <div className="text-white font-medium">{nft.value}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1 border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  View Details
                </Button>
                <Button size="sm" variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 p-6">
        <div className="flex gap-4">
          <Sparkles className="w-8 h-8 text-purple-400 shrink-0" />
          <div>
            <h3 className="text-white mb-2">Dynamic Impact NFTs</h3>
            <p className="text-emerald-300/70 mb-4">
              These aren't static images—they're living records of regeneration. As your projects hit milestones (seedlings mature, species return, carbon accumulates), your NFT evolves visually and increases in value. Perfect for ESG reports, social media, or corporate storytelling.
            </p>
            <div className="flex gap-3">
              <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-400/10">
                Learn More
              </Button>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                Create Your NFT
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
