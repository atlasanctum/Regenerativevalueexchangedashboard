import { useState } from 'react';
import { Overview } from './components/Overview';
import { AssetClasses } from './components/AssetClasses';
import { VerificationLayer } from './components/VerificationLayer';
import { Governance } from './components/Governance';
import { TradingInterface } from './components/TradingInterface';
import { ImpactMetrics } from './components/ImpactMetrics';
import { CustodianNetwork } from './components/CustodianNetwork';
import { DeveloperDocs } from './components/DeveloperDocs';
import { Leaf, TrendingUp, Shield, Users, Globe, Activity, BookOpen, Code } from 'lucide-react';

type TabType = 'overview' | 'assets' | 'verification' | 'governance' | 'trading' | 'impact' | 'custodians' | 'api';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: Activity },
    { id: 'assets' as TabType, label: 'Asset Classes', icon: Leaf },
    { id: 'verification' as TabType, label: 'Verification', icon: Shield },
    { id: 'governance' as TabType, label: 'Governance', icon: Users },
    { id: 'trading' as TabType, label: 'Trading', icon: TrendingUp },
    { id: 'impact' as TabType, label: 'Impact', icon: Globe },
    { id: 'custodians' as TabType, label: 'Custodians', icon: BookOpen },
    { id: 'api' as TabType, label: 'API & Architecture', icon: Code },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-white">Regenerative Value Exchange</h1>
                <p className="text-emerald-300/70 text-sm">Healing Ecosystems, Cultures & Communities</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-emerald-300/70 text-sm">Total RVE Market Cap</div>
                <div className="text-white">$847.3B</div>
              </div>
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 transition-all border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-emerald-400 text-emerald-400 bg-emerald-400/10'
                      : 'border-transparent text-emerald-300/50 hover:text-emerald-300 hover:bg-emerald-400/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'assets' && <AssetClasses />}
        {activeTab === 'verification' && <VerificationLayer />}
        {activeTab === 'governance' && <Governance />}
        {activeTab === 'trading' && <TradingInterface />}
        {activeTab === 'impact' && <ImpactMetrics />}
        {activeTab === 'custodians' && <CustodianNetwork />}
        {activeTab === 'api' && <DeveloperDocs />}
      </main>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md border-t border-emerald-500/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-emerald-300/50 text-sm">
            <p>Where ancient wisdom and advanced technology converge to redefine value</p>
            <p className="mt-2">From Extraction to Regeneration • From Depletion to Abundance</p>
          </div>
        </div>
      </footer>
    </div>
  );
}