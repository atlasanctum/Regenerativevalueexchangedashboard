import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Users, Smartphone, Monitor, Accessibility, Eye, MousePointer, 
  Layers, Palette, Globe, TrendingUp, MessageSquare, Star
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// User personas
const personas = [
  { name: 'Small-scale Farmer', location: 'Kenya', needs: 'Simple mobile interface, local language, offline-first', painPoints: 'Low literacy, unreliable internet' },
  { name: 'ESG Manager', location: 'Global', needs: 'Data dashboards, impact reports, compliance exports', painPoints: 'Complex data visualization, regulatory requirements' },
  { name: 'Policymaker', location: 'Government', needs: 'Scenario simulators, policy impact forecasts', painPoints: 'Explaining AI predictions to constituents' },
  { name: 'Institutional Investor', location: 'Global', needs: 'Risk analytics, portfolio management, ROI tracking', painPoints: 'Trust in regenerative asset valuations' },
];

// Interface analytics
const usageMetrics = [
  { metric: 'Daily Active Users', value: '34,728', change: '+12%' },
  { metric: 'Mobile vs Desktop', value: '67% / 33%', change: '+3%' },
  { metric: 'Avg Session Duration', value: '8m 42s', change: '+5%' },
  { metric: 'Task Completion Rate', value: '89%', change: '+2%' },
];

// Accessibility compliance
const accessibilityScores = [
  { category: 'Perceivable', score: 94, status: 'excellent' },
  { category: 'Operable', score: 91, status: 'excellent' },
  { category: 'Understandable', score: 87, status: 'good' },
  { category: 'Robust', score: 96, status: 'excellent' },
];

// User satisfaction
const satisfactionData = [
  { month: 'Sep', rating: 4.2, responses: 432 },
  { month: 'Oct', rating: 4.3, responses: 487 },
  { month: 'Nov', rating: 4.4, responses: 521 },
  { month: 'Dec', rating: 4.5, responses: 598 },
  { month: 'Jan', rating: 4.6, responses: 634 },
  { month: 'Feb', rating: 4.7, responses: 712 },
  { month: 'Mar', rating: 4.8, responses: 789 },
];

// Language support
const languageStats = [
  { language: 'English', users: 14231, percent: 41 },
  { language: 'Swahili', users: 8942, percent: 26 },
  { language: 'French', users: 5126, percent: 15 },
  { language: 'Spanish', users: 3584, percent: 10 },
  { language: 'Other', users: 2845, percent: 8 },
];

export function ProductInterfaceDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Product & Interface Engineering</h2>
          <p className="text-emerald-300/70 mt-1">Human-centered design: Making complex systems accessible to all stakeholders</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-300">
            <Users className="w-3 h-3 mr-1" />
            34.7K Daily Users
          </Badge>
          <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-300">
            <Star className="w-3 h-3 mr-1" />
            4.8/5.0 Satisfaction
          </Badge>
        </div>
      </div>

      {/* Usage Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {usageMetrics.map((item, idx) => (
          <Card key={idx} className="p-6 bg-black/40 border-emerald-500/20">
            <p className="text-emerald-300/70 text-sm mb-1">{item.metric}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{item.value}</span>
              <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-300 text-xs">
                {item.change}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Design Principles */}
      <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Human-Centered Design Principles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <Accessibility className="w-8 h-8 text-emerald-400 mb-3" />
            <h4 className="text-white font-medium mb-2">Inclusive</h4>
            <p className="text-emerald-300/70 text-sm">
              WCAG 2.1 AAA compliant. Screen reader support. High contrast mode. Keyboard navigation.
            </p>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg">
            <Globe className="w-8 h-8 text-blue-400 mb-3" />
            <h4 className="text-white font-medium mb-2">Multilingual</h4>
            <p className="text-emerald-300/70 text-sm">
              8 languages supported. Right-to-left layouts. Cultural adaptation beyond translation.
            </p>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg">
            <Smartphone className="w-8 h-8 text-purple-400 mb-3" />
            <h4 className="text-white font-medium mb-2">Mobile-First</h4>
            <p className="text-emerald-300/70 text-sm">
              67% mobile users. Offline-first architecture. Works on 2G networks. Low data usage.
            </p>
          </div>
        </div>
      </Card>

      {/* User Satisfaction Chart */}
      <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
        <h3 className="text-xl font-semibold text-white mb-4">User Satisfaction Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={satisfactionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#10b981" opacity={0.1} />
            <XAxis dataKey="month" stroke="#6ee7b7" />
            <YAxis yAxisId="left" domain={[4, 5]} stroke="#6ee7b7" />
            <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
              }}
            />
            <Line yAxisId="left" type="monotone" dataKey="rating" stroke="#10b981" strokeWidth={2} name="Rating (out of 5)" />
            <Line yAxisId="right" type="monotone" dataKey="responses" stroke="#3b82f6" strokeWidth={2} name="Responses" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Tabs defaultValue="personas" className="space-y-6">
        <TabsList className="bg-black/40 border border-emerald-500/20">
          <TabsTrigger value="personas">
            <Users className="w-4 h-4 mr-2" />
            User Personas
          </TabsTrigger>
          <TabsTrigger value="accessibility">
            <Accessibility className="w-4 h-4 mr-2" />
            Accessibility
          </TabsTrigger>
          <TabsTrigger value="localization">
            <Globe className="w-4 h-4 mr-2" />
            Localization
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <MessageSquare className="w-4 h-4 mr-2" />
            User Feedback
          </TabsTrigger>
        </TabsList>

        {/* Personas Tab */}
        <TabsContent value="personas">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personas.map((persona, idx) => (
              <Card key={idx} className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{persona.name}</h4>
                    <p className="text-emerald-300/70 text-sm">{persona.location}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-emerald-300 font-medium text-sm mb-1">Needs</p>
                    <p className="text-emerald-300/70 text-sm">{persona.needs}</p>
                  </div>

                  <div>
                    <p className="text-emerald-300 font-medium text-sm mb-1">Pain Points</p>
                    <p className="text-emerald-300/70 text-sm">{persona.painPoints}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6 mt-4">
            <h4 className="text-white font-semibold mb-3">Interface Adaptations by Persona</h4>
            <div className="space-y-3">
              <div className="p-3 bg-slate-800/50 rounded">
                <p className="text-emerald-300 font-medium mb-1">Farmer Interface</p>
                <p className="text-emerald-300/70 text-sm">
                  ✓ Voice input (Swahili/English)<br />
                  ✓ Image-based navigation (icons over text)<br />
                  ✓ SMS fallback for alerts<br />
                  ✓ Works offline, syncs when connected
                </p>
              </div>

              <div className="p-3 bg-slate-800/50 rounded">
                <p className="text-emerald-300 font-medium mb-1">ESG Manager Interface</p>
                <p className="text-emerald-300/70 text-sm">
                  ✓ Customizable dashboards<br />
                  ✓ One-click PDF export for board reports<br />
                  ✓ API access for integration with existing tools<br />
                  ✓ White-label branding options
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Accessibility Tab */}
        <TabsContent value="accessibility">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">WCAG 2.1 AAA Compliance</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {accessibilityScores.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{item.category}</h4>
                    <Badge variant="outline" className={
                      item.status === 'excellent'
                        ? 'bg-green-500/10 border-green-500/30 text-green-300'
                        : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                    }>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-700/50 rounded-full h-2">
                      <div 
                        className="bg-emerald-400 h-2 rounded-full" 
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                    <span className="text-emerald-300 font-medium">{item.score}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-emerald-400" />
                  Visual Accessibility
                </h4>
                <ul className="text-emerald-300/70 text-sm space-y-1">
                  <li>✓ Color contrast ratio 7:1 (AAA level)</li>
                  <li>✓ Text resize up to 200% without loss of content</li>
                  <li>✓ No information conveyed by color alone</li>
                  <li>✓ Focus indicators visible at all times</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <MousePointer className="w-4 h-4 text-blue-400" />
                  Keyboard & Motor Accessibility
                </h4>
                <ul className="text-emerald-300/70 text-sm space-y-1">
                  <li>✓ All functions available via keyboard</li>
                  <li>✓ No keyboard traps</li>
                  <li>✓ Skip navigation links</li>
                  <li>✓ Large click targets (44x44 pixels minimum)</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  Cognitive Accessibility
                </h4>
                <ul className="text-emerald-300/70 text-sm space-y-1">
                  <li>✓ Clear, simple language (Grade 8 reading level)</li>
                  <li>✓ Consistent navigation patterns</li>
                  <li>✓ Contextual help available</li>
                  <li>✓ Error prevention and clear error messages</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Localization Tab */}
        <TabsContent value="localization">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Language Support & Cultural Adaptation</h3>
            
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={languageStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#10b981" opacity={0.1} />
                <XAxis type="number" stroke="#6ee7b7" />
                <YAxis dataKey="language" type="category" stroke="#6ee7b7" width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="users" fill="#10b981" name="Users" />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
              <h4 className="text-white font-medium mb-3">Beyond Translation: Cultural Adaptation</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-emerald-300 font-medium mb-1">Date & Number Formats</p>
                  <p className="text-emerald-300/70">
                    • DD/MM/YYYY vs MM/DD/YYYY<br />
                    • 1,000.00 vs 1.000,00<br />
                    • Currency symbols
                  </p>
                </div>
                <div>
                  <p className="text-emerald-300 font-medium mb-1">Visual Design</p>
                  <p className="text-emerald-300/70">
                    • Right-to-left layouts (Arabic)<br />
                    • Color meanings vary by culture<br />
                    • Icon interpretations
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recent User Feedback</h3>
            
            <div className="space-y-3">
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 font-medium">Positive Feedback</span>
                  </div>
                  <span className="text-green-300 text-sm">2 hours ago</span>
                </div>
                <p className="text-green-300/70 text-sm mb-1">
                  "The offline mode saved me! I can submit soil samples even when I have no network in the field." 
                </p>
                <p className="text-green-300/50 text-xs">— Farmer, Kisumu Region</p>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-300 font-medium">Feature Request</span>
                  </div>
                  <span className="text-blue-300 text-sm">5 hours ago</span>
                </div>
                <p className="text-blue-300/70 text-sm mb-1">
                  "Can we have PDF export in Chinese? Our investors need reports in Mandarin."
                </p>
                <p className="text-blue-300/50 text-xs">— ESG Manager, Corporate Client</p>
                <p className="text-emerald-300 text-sm mt-2">
                  <strong>Status:</strong> Planned for Q2 2026 release
                </p>
              </div>

              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-300 font-medium">Usability Issue</span>
                  </div>
                  <span className="text-amber-300 text-sm">1 day ago</span>
                </div>
                <p className="text-amber-300/70 text-sm mb-1">
                  "The scenario simulator is powerful but confusing. Can you add a tutorial?"
                </p>
                <p className="text-amber-300/50 text-xs">— Policymaker, Kenya Government</p>
                <p className="text-emerald-300 text-sm mt-2">
                  <strong>Status:</strong> Interactive tutorial in development
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
