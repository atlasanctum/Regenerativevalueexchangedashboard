import { Shield, Lock, Users, FileCheck, Building2, CheckCircle } from 'lucide-react';

export function InstitutionalCustody() {
  const partners = [
    { name: 'Fireblocks', type: 'MPC Custody', aum: '$4.2B', status: 'Active' },
    { name: 'Copper', type: 'Cold Storage', aum: '$2.8B', status: 'Active' },
    { name: 'Anchorage Digital', type: 'Qualified Custody', aum: '$1.9B', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          Institutional Custody
        </h1>
        <p className="text-emerald-300/70 mt-2">Enterprise-grade custody with Fireblocks, Copper, and Anchorage</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Custody Partners', value: '3', icon: Building2 },
          { label: 'Assets Secured', value: '$8.9B', icon: Lock },
          { label: 'Institutions', value: '47', icon: Users },
          { label: 'Compliance', value: '100%', icon: FileCheck },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-4">
            <stat.icon className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-2xl text-white mb-1">{stat.value}</div>
            <div className="text-emerald-300/70 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {partners.map((partner, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-white">{partner.name}</h3>
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-2 mb-4">
              <div className="text-emerald-300/70 text-sm">{partner.type}</div>
              <div className="text-2xl text-white">{partner.aum}</div>
              <div className="text-emerald-400 text-sm">AUM Secured</div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs border border-emerald-500/30">
              {partner.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
