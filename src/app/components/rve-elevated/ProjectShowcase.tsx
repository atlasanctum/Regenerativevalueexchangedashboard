import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { MapPin, Calendar, TrendingUp, CheckCircle2, Eye, ArrowRight, Leaf, Droplets, Mountain, Users } from 'lucide-react';
import { Progress } from '../ui/progress';

const featuredProjects = [
  {
    id: 'PRJ-001',
    name: 'Maasai Mara Regenerative Grassland',
    location: 'Narok County, Kenya',
    methodology: 'Regenerative Agriculture + Biodiversity',
    status: 'verified',
    tvl: '$12.4M',
    impact: {
      carbon: '47,300 tonnes CO2e',
      biodiversity: '+234 species',
      water: '2.4M liters/day',
      community: '4,200 beneficiaries'
    },
    verification: {
      satellite: true,
      iot: true,
      ground: true,
      accuracy: 94
    },
    image: 'maasai-grassland',
    assetType: 'environmental',
    vintage: '2024-2026',
    creditsIssued: 47300,
    creditsAvailable: 12800,
    pricePerCredit: 28
  },
  {
    id: 'PRJ-002',
    name: 'Lake Victoria Water Purification',
    location: 'Kisumu, Kenya',
    methodology: 'Water Quality Restoration',
    status: 'verified',
    tvl: '$8.7M',
    impact: {
      water: '12.4M liters/day clean water',
      community: '340,000 beneficiaries',
      health: '89% waterborne disease reduction',
      ecosystem: 'Lake ecosystem recovery'
    },
    verification: {
      satellite: true,
      iot: true,
      ground: true,
      accuracy: 92
    },
    image: 'lake-victoria',
    assetType: 'water',
    vintage: '2025-2027',
    creditsIssued: 124000,
    creditsAvailable: 45000,
    pricePerCredit: 18
  },
  {
    id: 'PRJ-003',
    name: 'Kakamega Forest Biodiversity Corridor',
    location: 'Western Kenya',
    methodology: 'Biodiversity + Carbon',
    status: 'active',
    tvl: '$15.2M',
    impact: {
      biodiversity: '+412 species protected',
      carbon: '89,400 tonnes CO2e',
      forest: '12,400 hectares connected',
      threatened: '23 IUCN Red List species'
    },
    verification: {
      satellite: true,
      iot: true,
      ground: true,
      accuracy: 91
    },
    image: 'kakamega-forest',
    assetType: 'biodiversity',
    vintage: '2024-2028',
    creditsIssued: 89400,
    creditsAvailable: 23100,
    pricePerCredit: 35
  }
];

export function ProjectShowcase() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Featured Projects</h2>
          <p className="text-emerald-300/70">Verified regenerative impact, ready for investment</p>
        </div>
        <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
          View All Projects
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {featuredProjects.map((project) => (
          <Card key={project.id} className="bg-black/40 border-emerald-500/20 backdrop-blur-sm overflow-hidden hover:border-emerald-500/40 transition-all group cursor-pointer">
            {/* Project image placeholder */}
            <div className={`h-48 bg-gradient-to-br ${
              project.assetType === 'environmental' ? 'from-emerald-600/30 to-emerald-800/30' :
              project.assetType === 'water' ? 'from-blue-600/30 to-blue-800/30' :
              'from-purple-600/30 to-purple-800/30'
            } relative overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center">
                {project.assetType === 'environmental' && <Leaf className="w-20 h-20 text-emerald-400/30" />}
                {project.assetType === 'water' && <Droplets className="w-20 h-20 text-blue-400/30" />}
                {project.assetType === 'biodiversity' && <Mountain className="w-20 h-20 text-purple-400/30" />}
              </div>
              
              {/* Status badge */}
              <div className="absolute top-4 left-4">
                <Badge variant="outline" className={
                  project.status === 'verified' 
                    ? 'bg-green-500/20 border-green-500/50 text-green-300'
                    : 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                }>
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {project.status === 'verified' ? 'Verified' : 'Active'}
                </Badge>
              </div>

              {/* TVL badge */}
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="bg-black/60 border-emerald-500/30 text-emerald-300 backdrop-blur-sm">
                  {project.tvl}
                </Badge>
              </div>
            </div>

            <div className="p-6">
              {/* Project header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-semibold text-lg group-hover:text-emerald-300 transition-colors">
                    {project.name}
                  </h3>
                  <span className="text-emerald-300/70 text-sm font-mono">{project.id}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-emerald-300/70">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {project.location}
                  </div>
                </div>
              </div>

              {/* Methodology */}
              <div className="mb-4">
                <Badge variant="outline" className="bg-slate-800/50 border-emerald-500/20 text-emerald-300 text-xs">
                  {project.methodology}
                </Badge>
              </div>

              {/* Impact metrics */}
              <div className="mb-4 p-3 bg-slate-800/50 rounded-lg space-y-2">
                <p className="text-emerald-300/70 text-xs font-medium mb-2">Verified Impact</p>
                {Object.entries(project.impact).slice(0, 3).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between text-xs">
                    <span className="text-emerald-300/70 capitalize">{key}</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>

              {/* Verification status */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-300/70 text-xs">Data Accuracy</span>
                  <span className="text-emerald-300 text-sm font-medium">{project.verification.accuracy}%</span>
                </div>
                <Progress value={project.verification.accuracy} className="h-1.5" />
                
                <div className="flex items-center gap-3 mt-3">
                  {project.verification.satellite && (
                    <div className="flex items-center gap-1 text-xs text-emerald-300/70">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Satellite
                    </div>
                  )}
                  {project.verification.iot && (
                    <div className="flex items-center gap-1 text-xs text-emerald-300/70">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      IoT Sensors
                    </div>
                  )}
                  {project.verification.ground && (
                    <div className="flex items-center gap-1 text-xs text-emerald-300/70">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Ground Truth
                    </div>
                  )}
                </div>
              </div>

              {/* Credits available */}
              <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-300 text-sm font-medium">Credits Available</span>
                  <span className="text-white font-bold">{project.creditsAvailable.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-300/70">Price per credit</span>
                  <span className="text-emerald-300">${project.pricePerCredit}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                  Purchase Credits
                </Button>
                <Button variant="outline" size="icon" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <Card className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/30 backdrop-blur-sm p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-3">List Your Regenerative Project</h3>
        <p className="text-emerald-300/70 mb-6 max-w-2xl mx-auto">
          Join 1,247 verified projects transforming ecosystems into verified, tradeable assets. 
          ISO 17025 certified measurement protocols ensure scientific credibility.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Submit Project
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
            Learn More
          </Button>
        </div>
      </Card>
    </div>
  );
}
