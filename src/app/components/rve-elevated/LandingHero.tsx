import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowRight, CheckCircle2, Globe2, TrendingUp, Shield, Leaf, Droplets, Mountain } from 'lucide-react';

export function LandingHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjMTBiOTgxIiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Status banner */}
        <div className="flex justify-center mb-8">
          <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-300 px-4 py-2">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Platform Live • $847.3B Total Value Locked
          </Badge>
        </div>

        {/* Main headline */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Regenerative Value
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              Infrastructure for Earth
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-emerald-300/70 max-w-3xl mx-auto leading-relaxed">
            The world's first verified platform where ecosystems, cultures, and human health 
            become measurable, tradeable assets backed by planetary sensor networks and AI verification.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">
            Start a Project
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 px-8 py-6 text-lg">
            Explore Marketplace
          </Button>
          <Button size="lg" variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 px-8 py-6 text-lg">
            For Institutions
          </Button>
        </div>

        {/* Platform stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6 text-center">
            <p className="text-3xl font-bold text-white mb-2">$847.3B</p>
            <p className="text-emerald-300/70 text-sm">Total Value Locked</p>
          </Card>
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6 text-center">
            <p className="text-3xl font-bold text-white mb-2">1,247</p>
            <p className="text-emerald-300/70 text-sm">Verified Projects</p>
          </Card>
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6 text-center">
            <p className="text-3xl font-bold text-white mb-2">91.3%</p>
            <p className="text-emerald-300/70 text-sm">Data Accuracy</p>
          </Card>
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6 text-center">
            <p className="text-3xl font-bold text-white mb-2">34K+</p>
            <p className="text-emerald-300/70 text-sm">Daily Active Users</p>
          </Card>
        </div>

        {/* Asset classes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/30 backdrop-blur-sm p-6 hover:border-emerald-500/50 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Leaf className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Environmental Assets</h3>
            <p className="text-emerald-300/70 text-sm mb-3">Carbon sequestration, air quality, soil health</p>
            <div className="flex items-center justify-between">
              <span className="text-emerald-300 text-sm font-medium">$423.8B</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/30 backdrop-blur-sm p-6 hover:border-blue-500/50 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Droplets className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Water Assets</h3>
            <p className="text-blue-300/70 text-sm mb-3">Purification, watershed restoration, aquifer health</p>
            <div className="flex items-center justify-between">
              <span className="text-blue-300 text-sm font-medium">$178.2B</span>
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/30 backdrop-blur-sm p-6 hover:border-purple-500/50 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mountain className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Biodiversity Assets</h3>
            <p className="text-purple-300/70 text-sm mb-3">Species protection, habitat restoration</p>
            <div className="flex items-center justify-between">
              <span className="text-purple-300 text-sm font-medium">$156.1B</span>
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/30 backdrop-blur-sm p-6 hover:border-amber-500/50 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Globe2 className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Cultural Assets</h3>
            <p className="text-amber-300/70 text-sm mb-3">Indigenous knowledge, traditional practices</p>
            <div className="flex items-center justify-between">
              <span className="text-amber-300 text-sm font-medium">$89.2B</span>
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
          </Card>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 border-t border-emerald-500/20 pt-12">
          <p className="text-center text-emerald-300/70 text-sm mb-8">Trusted by leading institutions worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-2 text-emerald-300/50">
              <Shield className="w-5 h-5" />
              <span className="text-sm">ISO 17025 Certified</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-300/50">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm">SOC 2 Type II</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-300/50">
              <Globe2 className="w-5 h-5" />
              <span className="text-sm">B Corp Certified</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-300/50">
              <Shield className="w-5 h-5" />
              <span className="text-sm">GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
