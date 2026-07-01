import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Eye, Globe, Volume2, Smartphone, Wifi, Type, CheckCircle, AlertTriangle } from 'lucide-react';

const languages = [
  { code: 'EN', name: 'English', coverage: '100%', status: 'Complete' },
  { code: 'ES', name: 'Spanish', coverage: '98%', status: 'Complete' },
  { code: 'PT', name: 'Portuguese', coverage: '97%', status: 'Complete' },
  { code: 'FR', name: 'French', coverage: '96%', status: 'Complete' },
  { code: 'ZH', name: 'Mandarin Chinese', coverage: '94%', status: 'Complete' },
  { code: 'AR', name: 'Arabic (RTL)', coverage: '91%', status: 'Complete' },
  { code: 'ID', name: 'Indonesian', coverage: '89%', status: 'In Progress' },
  { code: 'SW', name: 'Swahili', coverage: '78%', status: 'In Progress' },
  { code: 'HI', name: 'Hindi', coverage: '84%', status: 'Complete' },
  { code: 'BN', name: 'Bengali', coverage: '72%', status: 'In Progress' },
];

const wcagChecks = [
  { criterion: '1.1 Text Alternatives', level: 'A', status: 'Pass', score: 100 },
  { criterion: '1.3 Adaptable Content', level: 'A', status: 'Pass', score: 100 },
  { criterion: '1.4 Distinguishable', level: 'AA', status: 'Pass', score: 98 },
  { criterion: '2.1 Keyboard Accessible', level: 'A', status: 'Pass', score: 100 },
  { criterion: '2.4 Navigable', level: 'AA', status: 'Pass', score: 97 },
  { criterion: '3.1 Readable', level: 'A', status: 'Pass', score: 100 },
  { criterion: '3.3 Input Assistance', level: 'AA', status: 'Pass', score: 96 },
  { criterion: '4.1 Compatible', level: 'AA', status: 'Partial', score: 89 },
];

const offlineCapabilities = [
  { feature: 'Portfolio View', offline: true, syncMode: 'Auto on reconnect' },
  { feature: 'Price Quotes (cached)', offline: true, syncMode: '15-min cache' },
  { feature: 'Verification Reports', offline: true, syncMode: 'Download on demand' },
  { feature: 'Governance Voting', offline: false, syncMode: 'Requires connection' },
  { feature: 'Live Trading', offline: false, syncMode: 'Requires connection' },
  { feature: 'Impact Dashboard', offline: true, syncMode: 'Auto on reconnect' },
];

export function AccessibilityHub() {
  const [activeFont, setActiveFont] = useState('Default');
  const [bandwidth, setBandwidth] = useState('Standard');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white mb-2">Accessibility Hub</h2>
        <p className="text-emerald-300/70">20+ languages, voice navigation, low-bandwidth mode, WCAG AAA compliance, and offline functionality</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Languages Supported', value: '22', sub: '84 countries covered', icon: Globe },
          { label: 'WCAG Score', value: 'AAA', sub: '97.4% compliance', icon: CheckCircle },
          { label: 'Screen Reader Score', value: '98.4%', sub: 'NVDA + VoiceOver tested', icon: Volume2 },
          { label: 'Mobile Lighthouse', value: '96/100', sub: 'Performance + A11y', icon: Smartphone },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-400 text-xs">{s.label}</span>
                <Icon className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-white text-xl font-bold">{s.value}</div>
              <div className="text-emerald-300/50 text-xs mt-1">{s.sub}</div>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="languages">
        <TabsList className="bg-slate-800/60 border border-emerald-500/20">
          <TabsTrigger value="languages" className="data-[state=active]:bg-emerald-600">Languages</TabsTrigger>
          <TabsTrigger value="wcag" className="data-[state=active]:bg-emerald-600">WCAG Compliance</TabsTrigger>
          <TabsTrigger value="modes" className="data-[state=active]:bg-emerald-600">Display Modes</TabsTrigger>
          <TabsTrigger value="offline" className="data-[state=active]:bg-emerald-600">Offline Support</TabsTrigger>
        </TabsList>

        <TabsContent value="languages" className="mt-4">
          <div className="grid md:grid-cols-2 gap-3">
            {languages.map((lang) => (
              <Card key={lang.code} className="bg-slate-900/50 border-emerald-500/20 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-400/20 rounded-lg flex items-center justify-center text-emerald-400 text-xs font-bold">{lang.code}</div>
                    <div>
                      <div className="text-white text-sm font-medium">{lang.name}</div>
                      <div className="text-emerald-300/50 text-xs">Translation coverage: {lang.coverage}</div>
                    </div>
                  </div>
                  <Badge className={`border-0 text-xs ${lang.status === 'Complete' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-amber-400/20 text-amber-300'}`}>
                    {lang.status}
                  </Badge>
                </div>
                <div className="w-full bg-slate-700/40 rounded-full h-1.5">
                  <div className="bg-emerald-500 rounded-full h-1.5" style={{ width: lang.coverage }} />
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="wcag" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <h3 className="text-white font-semibold text-sm">WCAG 2.2 Compliance Audit Results</h3>
              <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">Audited Jun 2026</Badge>
            </div>
            <div className="space-y-3">
              {wcagChecks.map((check) => (
                <div key={check.criterion} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className={`border-0 text-xs w-6 text-center ${check.level === 'A' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-cyan-400/20 text-cyan-300'}`}>{check.level}</Badge>
                    <span className="text-white text-sm">{check.criterion}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 bg-slate-700/40 rounded-full h-1.5">
                      <div className={`rounded-full h-1.5 ${check.score >= 98 ? 'bg-emerald-500' : check.score >= 90 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${check.score}%` }} />
                    </div>
                    <span className="text-white text-xs w-8 text-right">{check.score}%</span>
                    <Badge className={`border-0 text-xs ${check.status === 'Pass' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-amber-400/20 text-amber-300'}`}>{check.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="modes" className="mt-4 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Type className="w-4 h-4 text-emerald-400" />
                <h3 className="text-white font-semibold text-sm">Typography Settings</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-emerald-300/60 text-xs mb-2 block">Font Family</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Default', 'Dyslexia', 'High Contrast'].map((f) => (
                      <button key={f} onClick={() => setActiveFont(f)} className={`py-2 rounded-lg text-xs transition-all ${activeFont === f ? 'bg-emerald-600 text-white' : 'bg-slate-700/40 text-slate-400'}`}>{f}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-emerald-300/60 text-xs mb-2 block">Text Size</label>
                  <input type="range" min={12} max={24} defaultValue={16} className="w-full accent-emerald-500" />
                  <div className="flex justify-between text-xs text-emerald-300/40 mt-1"><span>Small</span><span>Large</span></div>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Wifi className="w-4 h-4 text-emerald-400" />
                <h3 className="text-white font-semibold text-sm">Bandwidth Mode</h3>
              </div>
              <div className="space-y-2">
                {[
                  { mode: 'Standard', desc: 'Full features, real-time data, animations', data: '~2MB/min' },
                  { mode: 'Low Bandwidth', desc: 'Reduced images, cached data, no animations', data: '~200KB/min' },
                  { mode: 'Text Only', desc: 'No images or charts, maximum accessibility', data: '~20KB/min' },
                ].map((m) => (
                  <button
                    key={m.mode}
                    onClick={() => setBandwidth(m.mode)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${bandwidth === m.mode ? 'bg-emerald-400/15 border-emerald-500/40' : 'border-slate-700/30 hover:border-emerald-500/20'}`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-white text-sm font-medium">{m.mode}</span>
                      <Badge className="bg-slate-700/50 text-slate-300 border-0 text-xs">{m.data}</Badge>
                    </div>
                    <span className="text-emerald-300/50 text-xs">{m.desc}</span>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="offline" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Wifi className="w-4 h-4 text-emerald-400" />
              <h3 className="text-white font-semibold text-sm">Offline Functionality</h3>
              <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">Progressive Web App</Badge>
            </div>
            <div className="space-y-3">
              {offlineCapabilities.map((cap) => (
                <div key={cap.feature} className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
                  <div className="flex items-center gap-3">
                    {cap.offline ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-amber-400" />}
                    <span className="text-white text-sm">{cap.feature}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-300/60 text-xs">{cap.syncMode}</span>
                    <Badge className={`border-0 text-xs ${cap.offline ? 'bg-emerald-400/20 text-emerald-300' : 'bg-amber-400/20 text-amber-300'}`}>
                      {cap.offline ? 'Offline Ready' : 'Online Only'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
