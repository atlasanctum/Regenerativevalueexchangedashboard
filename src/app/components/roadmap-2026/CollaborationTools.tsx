import { Users, Video, MessageCircle, FileText, Share2, Edit3 } from 'lucide-react';

export function CollaborationTools() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          Real-Time Collaboration
        </h1>
        <p className="text-emerald-300/70 mt-2">Work together on impact reports and project proposals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Rooms', value: '47', icon: Video },
          { label: 'Live Documents', value: '234', icon: FileText },
          { label: 'Collaborators', value: '1,847', icon: Users },
          { label: 'Shared Projects', value: '89', icon: Share2 },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-4">
            <stat.icon className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-2xl text-white mb-1">{stat.value}</div>
            <div className="text-emerald-300/70 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Video Conferencing', icon: Video, description: 'HD video calls with screen sharing', color: 'blue' },
          { name: 'Real-time Documents', icon: Edit3, description: 'Collaborative editing like Google Docs', color: 'purple' },
          { name: 'Team Chat', icon: MessageCircle, description: 'Instant messaging and file sharing', color: 'emerald' },
        ].map((tool, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <div className={`w-12 h-12 bg-${tool.color}-500/20 rounded-xl flex items-center justify-center mb-4`}>
              <tool.icon className={`w-6 h-6 text-${tool.color}-400`} />
            </div>
            <h3 className="text-white mb-2">{tool.name}</h3>
            <p className="text-emerald-300/70 text-sm mb-4">{tool.description}</p>
            <button className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all">
              Launch
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
