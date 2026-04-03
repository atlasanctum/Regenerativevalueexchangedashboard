import { Scale, Globe, CheckCircle, FileText, Shield, AlertTriangle } from 'lucide-react';

export function RegulatoryExpansion() {
  const regions = [
    { name: 'United States', status: 'Compliant', frameworks: ['SEC', 'CFTC', 'FinCEN'], coverage: '100%' },
    { name: 'European Union', status: 'Compliant', frameworks: ['MiCA', 'GDPR', 'AML6'], coverage: '100%' },
    { name: 'United Kingdom', status: 'Compliant', frameworks: ['FCA', 'PRA'], coverage: '100%' },
    { name: 'Singapore', status: 'Compliant', frameworks: ['MAS', 'PSA'], coverage: '100%' },
    { name: 'Japan', status: 'In Progress', frameworks: ['FSA', 'JFSA'], coverage: '85%' },
    { name: 'Australia', status: 'Compliant', frameworks: ['ASIC', 'AUSTRAC'], coverage: '100%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Scale className="w-6 h-6 text-white" />
          </div>
          Global Regulatory Compliance
        </h1>
        <p className="text-emerald-300/70 mt-2">Compliant operations in 50+ jurisdictions worldwide</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Jurisdictions', value: '52', icon: Globe },
          { label: 'Compliant', value: '48', icon: CheckCircle },
          { label: 'Frameworks', value: '127', icon: FileText },
          { label: 'Audits Passed', value: '100%', icon: Shield },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-4">
            <stat.icon className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-2xl text-white mb-1">{stat.value}</div>
            <div className="text-emerald-300/70 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regions.map((region, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-white">{region.name}</h3>
              {region.status === 'Compliant' ? (
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
              )}
            </div>
            <div className="mb-4">
              <span className={`px-3 py-1 rounded text-xs border ${
                region.status === 'Compliant'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
              }`}>
                {region.status}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="text-emerald-300/70 text-sm">Regulatory Frameworks:</div>
              <div className="flex flex-wrap gap-2">
                {region.frameworks.map((framework, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-700/50 text-emerald-400 rounded text-xs border border-emerald-500/20">
                    {framework}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-emerald-500/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300/70">Coverage</span>
                <span className="text-white">{region.coverage}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
