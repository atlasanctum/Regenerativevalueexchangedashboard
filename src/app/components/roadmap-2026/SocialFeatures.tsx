import { MessageSquare, Heart, Share2, TrendingUp, Users, Image, Video, Link as LinkIcon, Smile, Send, MoreHorizontal } from 'lucide-react';

export function SocialFeatures() {
  const posts = [
    {
      id: 1,
      author: 'Sarah Chen',
      avatar: '👩',
      role: 'Impact Investor',
      time: '2 hours ago',
      content: 'Just completed verification of a 500-hectare reforestation project in Costa Rica! 🌳 The biodiversity recovery metrics are exceeding projections by 40%. This is what regenerative finance looks like in action.',
      images: ['🌲', '🦜', '🌿'],
      likes: 247,
      comments: 18,
      shares: 34,
      trending: true,
    },
    {
      id: 2,
      author: 'Marcus Rodriguez',
      avatar: '👨',
      role: 'Conservation Lead',
      time: '5 hours ago',
      content: 'Excited to announce our partnership with 12 indigenous communities to tokenize traditional ecological knowledge. This will create economic incentives for preservation while respecting cultural sovereignty.',
      likes: 189,
      comments: 23,
      shares: 45,
      trending: false,
    },
    {
      id: 3,
      author: 'Aisha Patel',
      avatar: '👩‍🦱',
      role: 'Oracle Operator',
      time: '1 day ago',
      content: 'Real-time monitoring update: Our satellite network detected a 15% increase in forest canopy density across verified projects this quarter. AI validation confirms accuracy at 97.8%. The data speaks for itself! 📊',
      likes: 156,
      comments: 12,
      shares: 28,
      trending: false,
    },
  ];

  const trendingTopics = [
    { tag: '#RegenerativeFinance', posts: '1.2k' },
    { tag: '#CarbonCredits', posts: '847' },
    { tag: '#BiodiversityTokens', posts: '623' },
    { tag: '#ImpactVerification', posts: '412' },
    { tag: '#ForestRestoration', posts: '289' },
  ];

  const suggestedUsers = [
    { name: 'Dr. James Wilson', role: 'Climate Scientist', followers: '12.5k', avatar: '👨‍🔬' },
    { name: 'Luna Martinez', role: 'Sustainability Expert', followers: '8.3k', avatar: '👩‍💼' },
    { name: 'Kwame Osei', role: 'Community Leader', followers: '5.7k', avatar: '👨‍🌾' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          Community Feed
        </h1>
        <p className="text-emerald-300/70 mt-2">Connect with impact creators, share insights, and celebrate wins</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Members', value: '15,847', icon: Users, change: '+12.4%' },
          { label: 'Posts Today', value: '2,341', icon: MessageSquare, change: '+8.7%' },
          { label: 'Trending Topics', value: '47', icon: TrendingUp, change: '+23.1%' },
          { label: 'Engagement Rate', value: '94.2%', icon: Heart, change: '+5.3%' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-emerald-400" />
              <span className="text-sm text-emerald-400">{stat.change}</span>
            </div>
            <div className="text-2xl text-white mb-1">{stat.value}</div>
            <div className="text-emerald-300/70 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
              <div className="flex-1">
                <textarea
                  placeholder="Share your impact story..."
                  className="w-full bg-slate-700/50 border border-emerald-500/20 rounded-lg px-4 py-3 text-white placeholder-emerald-300/30 resize-none focus:outline-none focus:border-emerald-500/40"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-slate-700/50 text-emerald-400 rounded-lg hover:bg-slate-700 transition-all">
                      <Image className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-slate-700/50 text-emerald-400 rounded-lg hover:bg-slate-700 transition-all">
                      <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-slate-700/50 text-emerald-400 rounded-lg hover:bg-slate-700 transition-all">
                      <LinkIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-slate-700/50 text-emerald-400 rounded-lg hover:bg-slate-700 transition-all">
                      <Smile className="w-5 h-5" />
                    </button>
                  </div>
                  <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          {posts.map((post) => (
            <div key={post.id} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-2xl">
                    {post.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-white">{post.author}</h4>
                      {post.trending && (
                        <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded-full border border-orange-500/30 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-emerald-300/50">
                      <span>{post.role}</span>
                      <span>•</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 text-emerald-300/50 hover:text-emerald-300 transition-all">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Post Content */}
              <p className="text-emerald-300/70 mb-4 leading-relaxed">{post.content}</p>

              {/* Post Images */}
              {post.images && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {post.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-square bg-gradient-to-br from-emerald-500/20 to-teal-500/10 rounded-lg flex items-center justify-center text-4xl"
                    >
                      {img}
                    </div>
                  ))}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center gap-6 pt-4 border-t border-emerald-500/10">
                <button className="flex items-center gap-2 text-emerald-300/70 hover:text-emerald-400 transition-all">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-emerald-300/70 hover:text-emerald-400 transition-all">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-emerald-300/70 hover:text-emerald-400 transition-all">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm">{post.shares}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-400" />
              Trending Topics
            </h3>
            <div className="space-y-3">
              {trendingTopics.map((topic, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center justify-between px-4 py-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-all text-left"
                >
                  <span className="text-emerald-400">{topic.tag}</span>
                  <span className="text-emerald-300/50 text-sm">{topic.posts} posts</span>
                </button>
              ))}
            </div>
          </div>

          {/* Suggested Users */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              Suggested Follows
            </h3>
            <div className="space-y-4">
              {suggestedUsers.map((user, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-xl">
                      {user.avatar}
                    </div>
                    <div>
                      <h4 className="text-white text-sm">{user.name}</h4>
                      <p className="text-emerald-300/50 text-xs">{user.role}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/30 transition-all text-sm">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-white mb-4">Your Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">Posts this week</span>
                <span className="text-white">12</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">Comments</span>
                <span className="text-white">47</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">Likes received</span>
                <span className="text-white">1,234</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">New followers</span>
                <span className="text-emerald-400">+23</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
