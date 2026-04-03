import { Bell, Mail, MessageSquare, TrendingUp, AlertTriangle, CheckCircle, Settings, Filter, Search } from 'lucide-react';

export function NotificationService() {
  const notifications = [
    {
      id: 1,
      type: 'trading',
      icon: TrendingUp,
      title: 'Price Alert Triggered',
      message: 'Biodiversity Token BIO-CR-001 reached your target price of $127.50',
      time: '2 minutes ago',
      read: false,
      channels: ['app', 'email'],
      priority: 'high',
    },
    {
      id: 2,
      type: 'verification',
      icon: CheckCircle,
      title: 'Project Verified',
      message: 'Your forest restoration project in Amazon Basin has been verified by 3 oracles',
      time: '1 hour ago',
      read: false,
      channels: ['app', 'sms', 'email'],
      priority: 'medium',
    },
    {
      id: 3,
      type: 'alert',
      icon: AlertTriangle,
      title: 'Governance Proposal Ending',
      message: 'Vote on RVP-047 ends in 6 hours. Your vote is needed to reach quorum.',
      time: '3 hours ago',
      read: true,
      channels: ['app', 'email'],
      priority: 'high',
    },
    {
      id: 4,
      type: 'social',
      icon: MessageSquare,
      title: 'New Comment',
      message: 'Sarah Chen commented on your impact story: "Amazing results!"',
      time: '5 hours ago',
      read: true,
      channels: ['app'],
      priority: 'low',
    },
  ];

  const notificationChannels = [
    {
      name: 'Email',
      icon: Mail,
      enabled: true,
      frequency: 'Instant',
      description: 'Receive notifications via email',
    },
    {
      name: 'SMS',
      icon: MessageSquare,
      enabled: true,
      frequency: 'Important Only',
      description: 'SMS for critical alerts',
    },
    {
      name: 'Push',
      icon: Bell,
      enabled: true,
      frequency: 'Instant',
      description: 'Mobile app push notifications',
    },
  ];

  const alertRules = [
    {
      name: 'Price Alerts',
      description: 'Asset price reaches target',
      conditions: 3,
      enabled: true,
      channels: ['email', 'push'],
    },
    {
      name: 'Verification Updates',
      description: 'Project verification status changes',
      conditions: 5,
      enabled: true,
      channels: ['email', 'sms', 'push'],
    },
    {
      name: 'Governance',
      description: 'New proposals and voting deadlines',
      conditions: 2,
      enabled: true,
      channels: ['email', 'push'],
    },
    {
      name: 'Trading Activity',
      description: 'Order fills and trade confirmations',
      conditions: 4,
      enabled: false,
      channels: ['push'],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            Notification Center
          </h1>
          <p className="text-emerald-300/70 mt-2">Email, SMS, and push notifications for all your activities</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20 hover:bg-emerald-500/20 transition-all flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-all">
            Mark All Read
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Unread', value: '24', icon: Bell, color: 'orange' },
          { label: 'Today', value: '47', icon: TrendingUp, color: 'blue' },
          { label: 'This Week', value: '312', icon: Mail, color: 'purple' },
          { label: 'Active Rules', value: '8', icon: Settings, color: 'emerald' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
            </div>
            <div className="text-2xl text-white mb-1">{stat.value}</div>
            <div className="text-emerald-300/70 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-300/50" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  className="w-full bg-slate-700/50 border border-emerald-500/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-emerald-300/30 focus:outline-none focus:border-emerald-500/40"
                />
              </div>
              <button className="px-4 py-2 bg-slate-700/50 text-emerald-300/70 rounded-lg border border-emerald-500/20 hover:bg-slate-700 transition-all flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-3">
            {notifications.map((notif) => {
              const Icon = notif.icon;
              return (
                <div
                  key={notif.id}
                  className={`bg-slate-800/50 backdrop-blur-sm border rounded-xl p-4 transition-all hover:border-emerald-500/30 ${
                    notif.read ? 'border-emerald-500/10' : 'border-emerald-500/30 bg-emerald-500/5'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      notif.priority === 'high'
                        ? 'bg-red-500/20 text-red-400'
                        : notif.priority === 'medium'
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-white">{notif.title}</h4>
                        {!notif.read && (
                          <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0 mt-1.5"></div>
                        )}
                      </div>
                      <p className="text-emerald-300/70 text-sm mb-2">{notif.message}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-300/50 text-xs">{notif.time}</span>
                        <div className="flex items-center gap-1">
                          {notif.channels.includes('email') && (
                            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded border border-blue-500/30">
                              Email
                            </span>
                          )}
                          {notif.channels.includes('sms') && (
                            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded border border-purple-500/30">
                              SMS
                            </span>
                          )}
                          {notif.channels.includes('app') && (
                            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded border border-emerald-500/30">
                              Push
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notification Channels */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-emerald-400" />
              Channels
            </h3>
            <div className="space-y-4">
              {notificationChannels.map((channel, idx) => (
                <div key={idx} className="pb-4 border-b border-emerald-500/10 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <channel.icon className="w-4 h-4 text-emerald-400" />
                      <span className="text-white text-sm">{channel.name}</span>
                    </div>
                    <button
                      className={`w-11 h-6 rounded-full transition-all ${
                        channel.enabled ? 'bg-emerald-500' : 'bg-slate-600'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow-lg transition-transform ${
                          channel.enabled ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      ></div>
                    </button>
                  </div>
                  <p className="text-emerald-300/50 text-xs mb-1">{channel.description}</p>
                  <p className="text-emerald-400 text-xs">Frequency: {channel.frequency}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Rules */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              Alert Rules
            </h3>
            <div className="space-y-3">
              {alertRules.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-700/30 rounded-lg border border-emerald-500/10 hover:border-emerald-500/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-white text-sm mb-1">{rule.name}</h4>
                      <p className="text-emerald-300/50 text-xs">{rule.description}</p>
                    </div>
                    <button
                      className={`w-9 h-5 rounded-full transition-all flex-shrink-0 ml-2 ${
                        rule.enabled ? 'bg-emerald-500' : 'bg-slate-600'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow-lg transition-transform ${
                          rule.enabled ? 'translate-x-4' : 'translate-x-0.5'
                        }`}
                      ></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-emerald-300/50 text-xs">{rule.conditions} conditions</span>
                    <div className="flex items-center gap-1">
                      {rule.channels.map((channel, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-white mb-4">Delivery Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">Success Rate</span>
                <span className="text-emerald-400">99.7%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">Avg Delivery Time</span>
                <span className="text-white">1.2s</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">SMS Credits</span>
                <span className="text-white">4,847</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">Email Quota</span>
                <span className="text-white">95%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
