import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Camera, MapPin, Star, Award, Upload, Globe, CheckCircle, Smartphone, Trophy } from 'lucide-react';

const verifiers = [
  { rank: 1, name: 'Maria Santos', location: 'Brazil', verified: 847, score: 98.4, earnings: '$2,847', badges: ['Expert', 'Top 1%', 'Mangrove Specialist'], avatar: 'MS' },
  { rank: 2, name: 'Liu Wei', location: 'China', verified: 712, score: 97.1, earnings: '$2,136', badges: ['Expert', 'Top 5%'], avatar: 'LW' },
  { rank: 3, name: 'Amara Diallo', location: 'Senegal', verified: 634, score: 96.8, earnings: '$1,902', badges: ['Expert', 'Top 5%', 'Mangrove'], avatar: 'AD' },
  { rank: 4, name: 'James Okafor', location: 'Nigeria', verified: 589, score: 95.3, earnings: '$1,767', badges: ['Advanced', 'Top 10%'], avatar: 'JO' },
  { rank: 5, name: 'Elena Vasquez', location: 'Colombia', verified: 524, score: 94.7, earnings: '$1,572', badges: ['Advanced'], avatar: 'EV' },
];

const weeklyActivity = [
  { day: 'Mon', submissions: 234, approved: 198 },
  { day: 'Tue', submissions: 287, approved: 246 },
  { day: 'Wed', submissions: 312, approved: 271 },
  { day: 'Thu', submissions: 198, approved: 167 },
  { day: 'Fri', submissions: 423, approved: 384 },
  { day: 'Sat', submissions: 356, approved: 312 },
  { day: 'Sun', submissions: 289, approved: 248 },
];

const recentSubmissions = [
  { id: 'CV-2847', project: 'Amazon Mangrove BRZ-001', verifier: 'Maria S.', type: 'Photo + GPS', status: 'Approved', time: '12 min ago', reward: '$3.50' },
  { id: 'CV-2846', project: 'Kenya Savanna KEN-012', verifier: 'Amara D.', type: 'Video', status: 'Under Review', time: '28 min ago', reward: 'Pending' },
  { id: 'CV-2845', project: 'Borneo Peatland IDN-003', verifier: 'Liu W.', type: 'Photo + GPS', status: 'Approved', time: '45 min ago', reward: '$4.20' },
  { id: 'CV-2844', project: 'Cloud Forest COL-007', verifier: 'Elena V.', type: 'GPS Survey', status: 'Approved', time: '1 hr ago', reward: '$2.80' },
];

export function CommunityVerification() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Community Verification</h2>
          <p className="text-emerald-300/70">Mobile-based geo-tagged photo/video evidence with community reputation rewards</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
            <Smartphone className="w-4 h-4 mr-2" />
            Get Mobile App
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Camera className="w-4 h-4 mr-2" />
            Submit Verification
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Active Verifiers', value: '12,847', sub: '+234 this week', icon: Users },
          { label: 'Submissions (30d)', value: '47,284', sub: '92.4% approval rate', icon: Camera },
          { label: 'Countries', value: '84', sub: 'Geographic coverage', icon: Globe },
          { label: 'Rewards Paid', value: '$142K', sub: 'This month', icon: Award },
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

      <Tabs defaultValue="activity">
        <TabsList className="bg-slate-800/60 border border-emerald-500/20">
          <TabsTrigger value="activity" className="data-[state=active]:bg-emerald-600">Recent Activity</TabsTrigger>
          <TabsTrigger value="leaderboard" className="data-[state=active]:bg-emerald-600">Leaderboard</TabsTrigger>
          <TabsTrigger value="submit" className="data-[state=active]:bg-emerald-600">Submit Evidence</TabsTrigger>
          <TabsTrigger value="rewards" className="data-[state=active]:bg-emerald-600">Reward System</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="mt-4 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
              <h3 className="text-white text-sm font-semibold mb-3">Weekly Submissions</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                  <XAxis dataKey="day" stroke="#6ee7b7" fontSize={11} />
                  <YAxis stroke="#6ee7b7" fontSize={11} />
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} />
                  <Bar dataKey="submissions" name="Submitted" fill="#10b981" opacity={0.4} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="approved" name="Approved" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
              <h3 className="text-white text-sm font-semibold mb-3">Live Feed</h3>
              <div className="space-y-2">
                {recentSubmissions.map((s) => (
                  <div key={s.id} className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0">
                    <div>
                      <div className="text-white text-xs font-medium">{s.project}</div>
                      <div className="text-emerald-300/50 text-xs">{s.verifier} · {s.type}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`border-0 text-xs ${s.status === 'Approved' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-amber-400/20 text-amber-300'}`}>{s.status}</Badge>
                      <span className="text-emerald-400 text-xs font-medium">{s.reward}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-4 h-4 text-amber-400" />
              <h3 className="text-white font-semibold text-sm">Top Community Verifiers — July 2026</h3>
            </div>
            <div className="space-y-3">
              {verifiers.map((v) => (
                <div key={v.rank} className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${v.rank <= 3 ? 'bg-amber-400/20 text-amber-400' : 'bg-slate-700/50 text-slate-300'}`}>
                      {v.rank}
                    </div>
                    <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      {v.avatar}
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">{v.name}</div>
                      <div className="flex items-center gap-1 text-emerald-300/50 text-xs">
                        <MapPin className="w-3 h-3" />
                        {v.location}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {v.badges.map((b) => <Badge key={b} className="bg-purple-400/20 text-purple-300 border-0 text-xs">{b}</Badge>)}
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-right text-sm">
                    <div>
                      <div className="text-white font-bold">{v.verified}</div>
                      <div className="text-emerald-300/50 text-xs">Verified</div>
                    </div>
                    <div>
                      <div className="text-white font-bold">{v.score}%</div>
                      <div className="text-emerald-300/50 text-xs">Accuracy</div>
                    </div>
                    <div>
                      <div className="text-emerald-400 font-bold">{v.earnings}</div>
                      <div className="text-emerald-300/50 text-xs">Earned</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="submit" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
            <h3 className="text-white font-semibold mb-4">Submit Verification Evidence</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-emerald-300/60 text-xs mb-1 block">Project</label>
                  <input className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50" placeholder="Search project name or ID..." />
                </div>
                <div>
                  <label className="text-emerald-300/60 text-xs mb-1 block">Evidence Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Photo', 'Video', 'GPS Survey'].map((t) => (
                      <button key={t} className="py-2 rounded-lg bg-slate-700/40 text-slate-300 text-xs hover:bg-emerald-600 hover:text-white transition-all">{t}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-emerald-300/60 text-xs mb-1 block">GPS Coordinates (auto-captured)</label>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-emerald-300/50 text-sm">-3.4653° S</div>
                    <div className="flex-1 bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-emerald-300/50 text-sm">-62.2159° W</div>
                  </div>
                </div>
                <div>
                  <label className="text-emerald-300/60 text-xs mb-1 block">Notes</label>
                  <textarea rows={3} className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50" placeholder="Describe what you observed..." />
                </div>
              </div>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-emerald-500/30 rounded-lg p-8 text-center hover:border-emerald-500/50 transition-all cursor-pointer">
                  <Camera className="w-10 h-10 text-emerald-400/40 mx-auto mb-3" />
                  <div className="text-emerald-300/60 text-sm">Upload photos or video</div>
                  <div className="text-emerald-300/40 text-xs mt-1">Geo-tagging auto-applied · Max 100MB</div>
                </div>
                <div className="bg-emerald-400/10 border border-emerald-500/20 rounded-lg p-4">
                  <div className="text-emerald-300/70 text-sm font-medium mb-2">Estimated Reward</div>
                  <div className="text-emerald-400 text-2xl font-bold">$2.50 – $8.00</div>
                  <div className="text-emerald-300/50 text-xs">Based on evidence quality and project</div>
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Submit for Review
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { tier: 'Beginner', minVerifications: 0, rate: '$1.50 – $3.00', bonus: 'None', color: 'from-slate-400 to-slate-500' },
              { tier: 'Verified', minVerifications: 50, rate: '$2.00 – $4.50', bonus: '+10% accuracy bonus', color: 'from-emerald-400 to-teal-500' },
              { tier: 'Advanced', minVerifications: 200, rate: '$3.00 – $6.00', bonus: '+25% bonus + early access', color: 'from-cyan-400 to-blue-500' },
              { tier: 'Expert', minVerifications: 500, rate: '$4.00 – $8.00', bonus: '+50% bonus + panel invitations', color: 'from-purple-400 to-violet-500' },
            ].map((tier) => (
              <Card key={tier.tier} className="bg-slate-900/50 border-emerald-500/20 p-5">
                <div className={`w-10 h-10 bg-gradient-to-br ${tier.color} rounded-xl flex items-center justify-center mb-3`}>
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-1">{tier.tier}</h4>
                <div className="text-emerald-300/60 text-xs mb-3">Requires {tier.minVerifications}+ verifications</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-emerald-300/60">Rate per submission</span>
                    <span className="text-emerald-400 font-medium">{tier.rate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/60">Bonus</span>
                    <span className="text-white">{tier.bonus}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
