import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Calendar, Clock, Users, Video, MessageCircle, CheckCircle, Bell } from 'lucide-react';

export function ExpertQA() {
  const sessions = [
    {
      id: 'qa-1',
      title: 'Mangrove Blue Carbon: Science & Methodology',
      expert: 'Dr. Catherine Lovelock',
      credentials: 'Professor of Marine Biology, University of Queensland',
      specialty: 'Blue Carbon Ecosystems',
      date: '2026-04-05',
      time: '14:00 UTC',
      duration: '90 minutes',
      type: 'Live',
      attendees: 234,
      maxAttendees: 500,
      questions: 67,
      status: 'upcoming',
      topics: ['Blue Carbon', 'Mangroves', 'Carbon Sequestration', 'Methodology'],
      description: 'Deep dive into mangrove carbon science, measurement protocols, and how to design credible blue carbon projects.'
    },
    {
      id: 'qa-2',
      title: 'Indigenous Fire Management & Carbon Markets',
      expert: 'Victor Steffensen',
      credentials: 'Tagalaka Elder & Fire Practitioner',
      specialty: 'Traditional Burning',
      date: '2026-04-08',
      time: '09:00 UTC',
      duration: '120 minutes',
      type: 'Live',
      attendees: 189,
      maxAttendees: 300,
      questions: 52,
      status: 'upcoming',
      topics: ['Indigenous Knowledge', 'Fire Management', 'Cultural Burning', 'Carbon'],
      description: 'Learn how cultural burning reduces emissions, regenerates country, and can generate carbon credits while respecting cultural protocols.'
    },
    {
      id: 'qa-3',
      title: 'Biodiversity Credits: Measurement & Verification',
      expert: 'Dr. Thomas Brooks',
      credentials: 'Chief Scientist, IUCN',
      specialty: 'Conservation Science',
      date: '2026-04-12',
      time: '16:00 UTC',
      duration: '90 minutes',
      type: 'Live',
      attendees: 312,
      maxAttendees: 500,
      questions: 89,
      status: 'upcoming',
      topics: ['Biodiversity', 'Measurement', 'IUCN', 'Species'],
      description: 'How do we measure biodiversity impact? What are the emerging standards and how can projects generate credible biodiversity credits?'
    },
    {
      id: 'qa-4',
      title: 'Corporate Buyers: Due Diligence for Regenerative Assets',
      expert: 'Jennifer Adams',
      credentials: 'Former Microsoft Sustainability Lead',
      specialty: 'Corporate ESG Strategy',
      date: '2026-04-15',
      time: '18:00 UTC',
      duration: '60 minutes',
      type: 'Live',
      attendees: 445,
      maxAttendees: 500,
      questions: 103,
      status: 'upcoming',
      topics: ['Corporate', 'ESG', 'Due Diligence', 'Procurement'],
      description: 'What do corporate buyers need to know when purchasing regenerative assets? Red flags, best practices, and how to integrate into ESG reporting.'
    },
    {
      id: 'qa-5',
      title: 'Agroforestry Carbon: Lessons from 500+ Projects',
      expert: 'Dr. Fabrice DeClerck',
      credentials: 'Science Director, EAT Foundation',
      specialty: 'Agroecology & Food Systems',
      date: '2026-03-22',
      time: '15:00 UTC',
      duration: '90 minutes',
      type: 'Recorded',
      attendees: 567,
      questions: 78,
      status: 'completed',
      topics: ['Agroforestry', 'Carbon', 'Food Systems'],
      description: 'Drawing from decades of research, we explored what makes agroforestry carbon projects succeed or fail.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Expert Q&A Sessions</h2>
          <p className="text-emerald-300/70">
            Learn from leading practitioners, scientists, and indigenous knowledge holders
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Bell className="w-4 h-4 mr-2" />
          Get Notified
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'Upcoming Sessions', value: '12' },
          { label: 'Expert Panel', value: '47' },
          { label: 'Total Attendees', value: '8,934' },
          { label: 'Avg Rating', value: '4.8/5' }
        ].map((stat) => (
          <Card key={stat.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
            <div className="text-emerald-400 text-sm mb-1">{stat.label}</div>
            <div className="text-white text-2xl font-bold">{stat.value}</div>
          </Card>
        ))}
      </div>

      {/* Sessions */}
      <div className="space-y-4">
        {sessions.map((session) => (
          <Card key={session.id} className={`bg-slate-900/50 border-emerald-500/20 overflow-hidden ${session.status === 'completed' ? 'opacity-75' : ''}`}>
            <div className="p-6">
              <div className="flex gap-6">
                {/* Expert Photo Placeholder */}
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-white text-3xl shrink-0">
                  {session.expert.charAt(0)}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant="outline"
                          className={session.status === 'completed'
                            ? 'border-slate-500/30 text-slate-300'
                            : 'border-emerald-500/30 text-emerald-300'
                          }
                        >
                          {session.status === 'completed' ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Recorded
                            </>
                          ) : (
                            <>
                              <Video className="w-3 h-3 mr-1" />
                              Live Session
                            </>
                          )}
                        </Badge>
                        <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                          {session.specialty}
                        </Badge>
                      </div>
                      <h3 className="text-white mb-1">{session.title}</h3>
                      <div className="text-emerald-400 font-medium">{session.expert}</div>
                      <div className="text-emerald-300/70 text-sm">{session.credentials}</div>
                    </div>
                    
                    {session.status === 'upcoming' && (
                      <div className="text-right">
                        <div className="text-emerald-300/70 text-sm">Available Seats</div>
                        <div className="text-white font-medium">
                          {session.maxAttendees - session.attendees} / {session.maxAttendees}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-emerald-300/70">{session.description}</p>

                  {/* Session Details */}
                  <div className="flex flex-wrap gap-4 text-emerald-300/70 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(session.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {session.time} ({session.duration})
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {session.attendees} registered
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      {session.questions} questions submitted
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="flex gap-2 flex-wrap">
                    {session.topics.map((topic) => (
                      <Badge key={topic} variant="outline" className="border-emerald-500/20 text-emerald-300/70 text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    {session.status === 'upcoming' ? (
                      <>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                          <Calendar className="w-4 h-4 mr-2" />
                          Register for Session
                        </Button>
                        <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Submit Question
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
                          <Video className="w-4 h-4 mr-2" />
                          Watch Recording
                        </Button>
                        <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
                          View Q&A Transcript
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
