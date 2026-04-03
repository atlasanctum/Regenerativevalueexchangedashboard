import { Smartphone, Download, Star, Users, Zap, Shield, Bell, TrendingUp } from 'lucide-react';

export function MobileAppNative() {
  const features = [
    { name: 'Biometric Auth', icon: Shield, status: 'Live' },
    { name: 'Offline Mode', icon: Zap, status: 'Live' },
    { name: 'Push Notifications', icon: Bell, status: 'Live' },
    { name: 'Real-time Trading', icon: TrendingUp, status: 'Live' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          Native Mobile App
        </h1>
        <p className="text-emerald-300/70 mt-2">Production-ready iOS and Android applications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Downloads', value: '47.3k', icon: Download, change: '+124%' },
          { label: 'Active Users', value: '38.2k', icon: Users, change: '+98%' },
          { label: 'App Rating', value: '4.8/5', icon: Star, change: '4,231 reviews' },
          { label: 'Daily Sessions', value: '156k', icon: Zap, change: '+67%' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 text-xs">{stat.change}</span>
            </div>
            <div className="text-2xl text-white mb-1">{stat.value}</div>
            <div className="text-emerald-300/70 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
          <h3 className="text-white mb-6">Native Features</h3>
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <div key={idx} className="p-4 bg-slate-700/30 rounded-lg border border-emerald-500/10">
                <feature.icon className="w-6 h-6 text-emerald-400 mb-2" />
                <div className="text-white text-sm mb-1">{feature.name}</div>
                <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30">
                  {feature.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
          <h3 className="text-white mb-6">Download</h3>
          <div className="space-y-4">
            <button className="w-full px-6 py-4 bg-black text-white rounded-xl hover:bg-gray-900 transition-all flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black text-xl">
                
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-400">Download on the</div>
                <div className="text-lg">App Store</div>
              </div>
            </button>
            <button className="w-full px-6 py-4 bg-black text-white rounded-xl hover:bg-gray-900 transition-all flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center text-white text-xl">
                ▶
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-400">GET IT ON</div>
                <div className="text-lg">Google Play</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
