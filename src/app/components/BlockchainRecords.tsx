import { Database, Hash, Clock, CheckCircle, FileText, Link as LinkIcon, Shield, TrendingUp } from 'lucide-react';

export function BlockchainRecords() {
  const recentRecords = [
    {
      id: 'BLK-2026-05-08-001',
      type: 'Carbon Sequestration',
      asset: 'Amazonian Reforestation Project #4217',
      timestamp: '2026-05-08T14:32:18Z',
      blockHeight: 8247382,
      txHash: '0x7a8f9b2c...4e6d1a3f',
      validator: 'Oracle Node EU-West-2',
      status: 'Confirmed',
      confirmations: 127,
    },
    {
      id: 'BLK-2026-05-08-002',
      type: 'Biodiversity Credit',
      asset: 'Coral Reef Restoration - Great Barrier #891',
      timestamp: '2026-05-08T14:28:45Z',
      blockHeight: 8247381,
      txHash: '0x3c5e7f9a...8b2d4c1e',
      validator: 'Oracle Node Asia-Pacific-1',
      status: 'Confirmed',
      confirmations: 143,
    },
    {
      id: 'BLK-2026-05-08-003',
      type: 'Social Impact',
      asset: 'Community Health Initiative - Kenya',
      timestamp: '2026-05-08T14:25:12Z',
      blockHeight: 8247380,
      txHash: '0x9d1f4a7c...6e3b8f2a',
      validator: 'Oracle Node Africa-1',
      status: 'Confirmed',
      confirmations: 156,
    },
    {
      id: 'BLK-2026-05-08-004',
      type: 'Water Quality',
      asset: 'River Restoration Project - Ganges Delta',
      timestamp: '2026-05-08T14:21:33Z',
      blockHeight: 8247379,
      txHash: '0x4b7e2f8d...1a9c5e3f',
      validator: 'Oracle Node South-Asia-2',
      status: 'Confirmed',
      confirmations: 178,
    },
  ];

  const chainStats = [
    { label: 'Total Blocks', value: '8,247,382', change: '+1,247 today' },
    { label: 'Total Records', value: '47.2M', change: '+8.4K today' },
    { label: 'Network Validators', value: '2,847', change: '+12 this week' },
    { label: 'Immutable Proofs', value: '99.99%', change: 'Integrity verified' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white flex items-center gap-3">
            <Database className="w-8 h-8 text-emerald-400" />
            Blockchain Records
          </h1>
          <p className="text-emerald-300/70 mt-2">
            Immutable, cryptographically-verified records of all regenerative assets and transactions
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-400/10 rounded-lg border border-emerald-400/30">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-emerald-400 text-sm">Live Chain Active</span>
        </div>
      </div>

      {/* Chain Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {chainStats.map((stat, idx) => (
          <div key={idx} className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
            <div className="text-emerald-300/70 text-sm mb-2">{stat.label}</div>
            <div className="text-white text-2xl mb-1">{stat.value}</div>
            <div className="text-emerald-400 text-xs flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Records */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
        <h2 className="text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-400" />
          Recent Blockchain Records
        </h2>
        <div className="space-y-3">
          {recentRecords.map((record) => (
            <div
              key={record.id}
              className="bg-slate-800/50 border border-emerald-500/10 rounded-lg p-4 hover:border-emerald-400/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span className="text-white">{record.asset}</span>
                  </div>
                  <div className="text-emerald-300/70 text-sm">
                    Record ID: {record.id}
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-400/10 rounded border border-emerald-400/30">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 text-xs">{record.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Type</div>
                  <div className="text-emerald-300 text-sm">{record.type}</div>
                </div>
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Block Height</div>
                  <div className="text-emerald-300 text-sm">#{record.blockHeight.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Confirmations</div>
                  <div className="text-emerald-300 text-sm">{record.confirmations}</div>
                </div>
                <div>
                  <div className="text-emerald-300/50 text-xs mb-1">Timestamp</div>
                  <div className="text-emerald-300 text-sm">
                    {new Date(record.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-3 border-t border-emerald-500/10">
                <div className="flex items-center gap-2 text-emerald-300/70 text-sm">
                  <Hash className="w-3 h-3" />
                  <span className="font-mono text-xs">{record.txHash}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-300/70 text-sm">
                  <Shield className="w-3 h-3" />
                  <span className="text-xs">{record.validator}</span>
                </div>
                <button className="ml-auto text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                  <LinkIcon className="w-3 h-3" />
                  View on Explorer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Record Type Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
          <h3 className="text-white mb-4">Record Types (Last 24h)</h3>
          <div className="space-y-3">
            {[
              { type: 'Carbon Sequestration', count: 2847, percentage: 34 },
              { type: 'Biodiversity Credits', count: 1923, percentage: 23 },
              { type: 'Social Impact', count: 1534, percentage: 18 },
              { type: 'Water Quality', count: 1289, percentage: 15 },
              { type: 'Soil Health', count: 847, percentage: 10 },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-emerald-300/70 text-sm">{item.type}</span>
                  <span className="text-emerald-400 text-sm">{item.count.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-800/50 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
          <h3 className="text-white mb-4">Blockchain Integrity Metrics</h3>
          <div className="space-y-4">
            {[
              { metric: 'Hash Rate', value: '2.4 PH/s', status: 'Optimal' },
              { metric: 'Average Block Time', value: '12.3 seconds', status: 'Normal' },
              { metric: 'Fork Resolution', value: '< 0.01%', status: 'Excellent' },
              { metric: 'Data Redundancy', value: '99.999%', status: 'Highly Available' },
              { metric: 'Tamper Detection', value: '0 incidents', status: 'Secure' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between pb-3 border-b border-emerald-500/10 last:border-b-0">
                <div>
                  <div className="text-emerald-300/70 text-sm">{item.metric}</div>
                  <div className="text-white text-lg">{item.value}</div>
                </div>
                <div className="px-3 py-1 bg-emerald-400/10 rounded border border-emerald-400/30 text-emerald-400 text-xs">
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
