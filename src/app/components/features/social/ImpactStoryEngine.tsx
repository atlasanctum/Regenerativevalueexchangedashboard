import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { MessageSquare, Heart, Share2, TrendingUp, Users, MapPin, Calendar, Eye, Plus } from 'lucide-react';
import { useState } from 'react';

export function ImpactStoryEngine() {
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());

  const stories = [
    {
      id: 'story-1',
      project: 'Mangrove Restoration - Bangladesh',
      author: 'Dr. Fatima Rahman',
      role: 'Project Lead',
      date: '2026-03-28',
      views: 12453,
      likes: 847,
      comments: 123,
      location: 'Sundarbans, Bangladesh',
      tags: ['Mangroves', 'Carbon Sequestration', 'Community Impact'],
      title: 'From Barren Coast to Thriving Ecosystem: 6 Months of Regeneration',
      excerpt: 'When we began in September 2025, this coastline was degraded and vulnerable. Today, 50,000 mangrove seedlings are thriving, protecting 12 coastal villages from storm surge.',
      impact: {
        co2Sequestered: '2,340 tons',
        biodiversityIndex: '+47%',
        livelihoods: '340 families',
        coastlineProtected: '8.4 km'
      },
      beforeImage: 'coastal mangrove before restoration',
      afterImage: 'coastal mangrove after restoration',
      testimonial: '"My children can now fish safely again. The crabs have returned, and our village feels protected." - Jamila Begum, local fisherwoman'
    },
    {
      id: 'story-2',
      project: 'Indigenous Agroforestry - Ecuador',
      author: 'Carlos Yumbo',
      role: 'Kichwa Elder & Knowledge Holder',
      date: '2026-03-25',
      views: 8921,
      likes: 623,
      comments: 89,
      location: 'Amazon Rainforest, Ecuador',
      tags: ['Agroforestry', 'Traditional Knowledge', 'Food Security'],
      title: 'Chakra Gardens Revive Ancient Wisdom and Modern Livelihoods',
      excerpt: 'Our ancestors knew how to live with the forest, not against it. Through chakra agroforestry, we\'re sharing this knowledge while generating verified carbon credits.',
      impact: {
        forestRegenerated: '450 hectares',
        speciesPlanted: '87 native species',
        families: '120 Kichwa families',
        carbonCredits: '15,600 tons CO2e'
      },
      beforeImage: 'amazonian agroforestry before',
      afterImage: 'amazonian agroforestry thriving',
      testimonial: '"We sell carbon credits while harvesting guayusa, cacao, and medicinal plants. Our youth are staying in the community." - Maria Shiguango, community member'
    },
    {
      id: 'story-3',
      project: 'Urban Wetland Restoration - Singapore',
      author: 'Dr. Wei Chen',
      role: 'Urban Ecologist',
      date: '2026-03-20',
      views: 15234,
      likes: 1092,
      comments: 167,
      location: 'Kranji Marshes, Singapore',
      tags: ['Wetlands', 'Urban Ecology', 'Water Quality'],
      title: 'Turning Concrete into Nature: Singapore\'s Wetland Revolution',
      excerpt: 'In one of the world\'s most urbanized nations, we\'re proving that cities and nature can thrive together. This former industrial site is now a biodiversity hotspot.',
      impact: {
        waterFiltered: '2.4M liters/day',
        birdSpecies: '142 species',
        educationVisits: '23,400 students/year',
        temperatureReduction: '-3.2°C locally'
      },
      beforeImage: 'urban wetland industrial before',
      afterImage: 'urban wetland restored singapore',
      testimonial: '"My daughter saw her first kingfisher here. In Singapore! This is the future we need." - Priya Menon, local resident'
    }
  ];

  const toggleLike = (storyId: string) => {
    const newLiked = new Set(likedStories);
    if (newLiked.has(storyId)) {
      newLiked.delete(storyId);
    } else {
      newLiked.add(storyId);
    }
    setLikedStories(newLiked);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Impact Story Engine</h2>
          <p className="text-emerald-300/70">
            Real stories from the front lines of regeneration
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Share Your Story
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['All Stories', 'Mangroves', 'Agroforestry', 'Wetlands', 'Community Impact', 'Traditional Knowledge'].map((filter) => (
          <Badge key={filter} variant="outline" className="border-emerald-500/30 text-emerald-300 cursor-pointer hover:bg-emerald-400/10">
            {filter}
          </Badge>
        ))}
      </div>

      {/* Stories */}
      <div className="grid gap-6">
        {stories.map((story) => (
          <Card key={story.id} className="bg-slate-900/50 border-emerald-500/20 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Content */}
              <div className="space-y-4">
                {/* Author Info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white">
                      {story.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-medium">{story.author}</div>
                      <div className="text-emerald-300/70 text-sm">{story.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-300/70 text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(story.date).toLocaleDateString()}
                  </div>
                </div>

                {/* Project & Location */}
                <div>
                  <div className="text-emerald-400 font-medium mb-1">{story.project}</div>
                  <div className="flex items-center gap-2 text-emerald-300/70 text-sm">
                    <MapPin className="w-4 h-4" />
                    {story.location}
                  </div>
                </div>

                {/* Title & Content */}
                <div>
                  <h3 className="text-white mb-2">{story.title}</h3>
                  <p className="text-emerald-300/70">{story.excerpt}</p>
                </div>

                {/* Impact Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(story.impact).map(([key, value]) => (
                    <div key={key} className="bg-emerald-400/10 border border-emerald-500/20 rounded-lg p-3">
                      <div className="text-emerald-400 text-sm capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="text-white font-medium">{value}</div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="border-l-4 border-emerald-500/30 pl-4 italic text-emerald-300/80">
                  {story.testimonial}
                </div>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap">
                  {story.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-emerald-500/30 text-emerald-300">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Engagement */}
                <div className="flex items-center justify-between pt-4 border-t border-emerald-500/20">
                  <div className="flex items-center gap-4 text-emerald-300/70 text-sm">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {story.views.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className={`w-4 h-4 ${likedStories.has(story.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                      {story.likes + (likedStories.has(story.id) ? 1 : 0)}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {story.comments}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10"
                      onClick={() => toggleLike(story.id)}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${likedStories.has(story.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                      Like
                    </Button>
                    <Button size="sm" variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Comment
                    </Button>
                    <Button size="sm" variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>

              {/* Visual Before/After placeholder */}
              <div className="space-y-4">
                <div>
                  <div className="text-emerald-300/70 text-sm mb-2">Before</div>
                  <div className="aspect-video bg-slate-800/50 rounded-lg border border-emerald-500/20 flex items-center justify-center text-emerald-300/50">
                    📷 {story.beforeImage}
                  </div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-sm mb-2">After</div>
                  <div className="aspect-video bg-slate-800/50 rounded-lg border border-emerald-500/20 flex items-center justify-center text-emerald-300/50">
                    📷 {story.afterImage}
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
          Load More Stories
        </Button>
      </div>
    </div>
  );
}
