import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { MessageSquare, ThumbsUp, Reply, Pin, TrendingUp, Users, Search, Plus, Award } from 'lucide-react';
import { useState } from 'react';

export function StakeholderForums() {
  const [searchQuery, setSearchQuery] = useState('');

  const forums = [
    {
      id: 'forum-1',
      category: 'Carbon Credits',
      title: 'Best practices for additionality verification in mangrove projects',
      author: 'Sarah Chen',
      reputation: 2847,
      badge: 'Verification Expert',
      timestamp: '2 hours ago',
      views: 342,
      replies: 28,
      likes: 67,
      isPinned: true,
      tags: ['Mangroves', 'Verification', 'Carbon Markets'],
      excerpt: 'Looking for community input on how to establish robust additionality baselines for coastal mangrove restoration...'
    },
    {
      id: 'forum-2',
      category: 'Traditional Knowledge',
      title: 'Integrating indigenous fire management into carbon methodology',
      author: 'James Wunungmurra',
      reputation: 1923,
      badge: 'Elder Knowledge Holder',
      timestamp: '5 hours ago',
      views: 189,
      replies: 15,
      likes: 42,
      isPinned: false,
      tags: ['Indigenous Knowledge', 'Fire Management', 'Australia'],
      excerpt: 'Our people have managed country with fire for 60,000 years. How can we properly value this in RVE?'
    },
    {
      id: 'forum-3',
      category: 'Biodiversity',
      title: 'Pricing biodiversity credits: what metrics matter most?',
      author: 'Dr. Maria Santos',
      reputation: 3156,
      badge: 'Ecologist',
      timestamp: '1 day ago',
      views: 523,
      replies: 34,
      likes: 89,
      isPinned: true,
      tags: ['Biodiversity', 'Pricing', 'Methodology'],
      excerpt: 'There\'s huge variation in how buyers value biodiversity. Should we standardize around species richness, functional diversity, or...'
    },
    {
      id: 'forum-4',
      category: 'Project Development',
      title: 'Lessons learned: 1 year running a watershed restoration project',
      author: 'Carlos Rodriguez',
      reputation: 847,
      badge: 'Project Developer',
      timestamp: '2 days ago',
      views: 412,
      replies: 21,
      likes: 56,
      isPinned: false,
      tags: ['Watersheds', 'Project Management', 'Lessons Learned'],
      excerpt: 'Sharing our challenges and successes from Colombia. Main learnings: community buy-in is EVERYTHING...'
    },
    {
      id: 'forum-5',
      category: 'Governance',
      title: '[PROPOSAL] New voting mechanism for oracle disputes',
      author: 'Governance Working Group',
      reputation: 5632,
      badge: 'Core Team',
      timestamp: '3 days ago',
      views: 891,
      replies: 67,
      likes: 134,
      isPinned: true,
      tags: ['Governance', 'Oracles', 'Proposals'],
      excerpt: 'Proposing a quadratic voting system for oracle dispute resolution with reputation-weighted stakes...'
    },
    {
      id: 'forum-6',
      category: 'Buyers & Investors',
      title: 'Corporate ESG reporting: RVE assets vs traditional offsets',
      author: 'Jennifer Liu',
      reputation: 1456,
      badge: 'Sustainability Officer',
      timestamp: '4 days ago',
      views: 634,
      replies: 29,
      likes: 71,
      isPinned: false,
      tags: ['ESG', 'Corporate', 'Reporting'],
      excerpt: 'Our board is asking: how do RVE regenerative assets compare to Verra VCUs for Scope 3 reporting?'
    }
  ];

  const categories = [
    { name: 'All Discussions', count: 1247, icon: MessageSquare },
    { name: 'Carbon Credits', count: 342, icon: TrendingUp },
    { name: 'Traditional Knowledge', count: 156, icon: Users },
    { name: 'Biodiversity', count: 234, icon: Award },
    { name: 'Project Development', count: 298, icon: Pin },
    { name: 'Governance', count: 89, icon: Users },
    { name: 'Buyers & Investors', count: 128, icon: TrendingUp }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Stakeholder Forums</h2>
          <p className="text-emerald-300/70">
            Community-driven discussions on regenerative practices
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Start Discussion
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
            <h3 className="text-white mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-emerald-300/70 hover:bg-emerald-400/10 hover:text-emerald-300 transition-all text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-300 text-xs">
                      {category.count}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
            <h3 className="text-white mb-3">Top Contributors</h3>
            <div className="space-y-3">
              {['Dr. Maria Santos', 'Sarah Chen', 'James Wunungmurra'].map((contributor, idx) => (
                <div key={contributor} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm">
                    #{idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-sm">{contributor}</div>
                    <div className="text-emerald-300/70 text-xs">{3500 - idx * 500} rep</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search & Filters */}
          <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-300/50" />
                <Input
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-emerald-500/20 text-white placeholder:text-emerald-300/50"
                />
              </div>
              <div className="flex gap-2">
                {['Hot', 'New', 'Top'].map((filter) => (
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
            </div>
          </Card>

          {/* Discussions */}
          <div className="space-y-3">
            {forums.map((forum) => (
              <Card key={forum.id} className="bg-slate-900/50 border-emerald-500/20 p-5 hover:border-emerald-500/40 transition-all cursor-pointer">
                <div className="flex gap-4">
                  {/* Author Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white shrink-0">
                    {forum.author.charAt(0)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {forum.isPinned && <Pin className="w-4 h-4 text-amber-400" />}
                          <Badge variant="outline" className="border-emerald-500/30 text-emerald-300 text-xs">
                            {forum.category}
                          </Badge>
                        </div>
                        <h3 className="text-white mb-1 hover:text-emerald-400 transition-colors">
                          {forum.title}
                        </h3>
                        <div className="flex items-center gap-3 text-emerald-300/70 text-sm">
                          <span>{forum.author}</span>
                          <Badge variant="outline" className="border-amber-500/30 text-amber-300 text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            {forum.badge}
                          </Badge>
                          <span>•</span>
                          <span>{forum.reputation.toLocaleString()} rep</span>
                          <span>•</span>
                          <span>{forum.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* Excerpt */}
                    <p className="text-emerald-300/70 text-sm">
                      {forum.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex gap-2 flex-wrap">
                      {forum.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-emerald-500/20 text-emerald-300/70 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 text-emerald-300/70 text-sm">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {forum.replies} replies
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        {forum.likes} likes
                      </div>
                      <div className="flex items-center gap-1">
                        {forum.views} views
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center">
            <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
              Load More Discussions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
