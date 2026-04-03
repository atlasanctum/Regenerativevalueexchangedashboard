import { FileText, Download, Calendar, DollarSign, TrendingDown, TrendingUp, Calculator, AlertCircle } from 'lucide-react';

export function TaxReporting() {
  const taxYears = ['2026', '2025', '2024', '2023'];
  const taxJurisdictions = ['United States', 'European Union', 'United Kingdom', 'Canada', 'Australia'];

  const taxEvents = [
    { date: '2026-01-15', type: 'Capital Gain', asset: 'BIO-CR-001', amount: '+$2,450', tax: '$612.50' },
    { date: '2026-01-28', type: 'Staking Reward', asset: 'RVE', amount: '+$847', tax: '$296.45' },
    { date: '2026-02-10', type: 'Capital Loss', asset: 'FOREST-BR', amount: '-$1,200', tax: '-$300.00' },
    { date: '2026-02-22', type: 'Trading Income', asset: 'Multiple', amount: '+$3,890', tax: '$1,361.50' },
    { date: '2026-03-14', type: 'Dividend', asset: 'OCEAN-AU', amount: '+$520', tax: '$182.00' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            Tax Reporting
          </h1>
          <p className="text-emerald-300/70 mt-2">Comprehensive tax reports for crypto and regenerative assets</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Tax Package
        </button>
      </div>

      {/* Tax Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
          <DollarSign className="w-8 h-8 text-emerald-400 mb-3" />
          <div className="text-3xl text-white mb-2">$8,947.23</div>
          <div className="text-emerald-300/70">Total Tax Liability</div>
          <div className="text-emerald-400 text-sm mt-2">Tax Year 2026</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
          <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
          <div className="text-3xl text-white mb-2">$12,507</div>
          <div className="text-emerald-300/70">Capital Gains</div>
          <div className="text-green-400 text-sm mt-2">+28.4% vs last year</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
          <TrendingDown className="w-8 h-8 text-red-400 mb-3" />
          <div className="text-3xl text-white mb-2">$2,340</div>
          <div className="text-emerald-300/70">Deductible Losses</div>
          <div className="text-emerald-400 text-sm mt-2">Can offset gains</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
          <FileText className="w-8 h-8 text-blue-400 mb-3" />
          <div className="text-3xl text-white mb-2">847</div>
          <div className="text-emerald-300/70">Taxable Events</div>
          <div className="text-emerald-400 text-sm mt-2">Across all assets</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tax Year Selector */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-400" />
                Select Tax Year
              </h3>
            </div>
            <div className="flex gap-2">
              {taxYears.map((year) => (
                <button
                  key={year}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    year === '2026'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-700/50 text-emerald-300/50 hover:bg-slate-700'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Tax Events */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-white mb-6">Taxable Events (2026)</h3>
            <div className="space-y-3">
              {taxEvents.map((event, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-emerald-500/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      {event.type.includes('Gain') ? (
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      ) : event.type.includes('Loss') ? (
                        <TrendingDown className="w-5 h-5 text-red-400" />
                      ) : (
                        <DollarSign className="w-5 h-5 text-blue-400" />
                      )}
                    </div>
                    <div>
                      <div className="text-white mb-1">{event.type}</div>
                      <div className="text-emerald-300/50 text-sm">{event.asset} • {event.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white mb-1">{event.amount}</div>
                    <div className="text-emerald-400 text-sm">Tax: {event.tax}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-white mb-4">Export Tax Reports</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'IRS Form 8949', format: 'PDF', description: 'Capital gains/losses' },
                { name: 'Schedule D', format: 'PDF', description: 'Summary of gains' },
                { name: 'Form 1040', format: 'PDF', description: 'Main tax return' },
                { name: 'TurboTax CSV', format: 'CSV', description: 'Import to TurboTax' },
                { name: 'CoinTracker', format: 'JSON', description: 'Export to CoinTracker' },
                { name: 'Full Transaction Log', format: 'CSV', description: 'All transactions' },
              ].map((report, idx) => (
                <button
                  key={idx}
                  className="flex items-start gap-3 p-4 bg-slate-700/30 rounded-lg border border-emerald-500/10 hover:border-emerald-500/30 transition-all text-left"
                >
                  <FileText className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm mb-1">{report.name}</div>
                    <div className="text-emerald-300/50 text-xs mb-2">{report.description}</div>
                    <span className="text-blue-400 text-xs">{report.format}</span>
                  </div>
                  <Download className="w-4 h-4 text-emerald-300/50 flex-shrink-0 mt-1" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Jurisdiction Selector */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-white mb-4">Tax Jurisdiction</h3>
            <select className="w-full bg-slate-700/50 border border-emerald-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500/40">
              {taxJurisdictions.map((jurisdiction) => (
                <option key={jurisdiction}>{jurisdiction}</option>
              ))}
            </select>
            <p className="text-emerald-300/50 text-xs mt-3">
              Tax calculations based on selected jurisdiction rules
            </p>
          </div>

          {/* Tax Strategy Tips */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              Tax Optimization
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="text-yellow-400 text-sm mb-1">Harvest Losses</div>
                <div className="text-emerald-300/60 text-xs">
                  You have $2,340 in unrealized losses that could offset gains
                </div>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="text-blue-400 text-sm mb-1">Long-term Holding</div>
                <div className="text-emerald-300/60 text-xs">
                  Hold 12 assets for 23+ more days to qualify for lower tax rate
                </div>
              </div>
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <div className="text-purple-400 text-sm mb-1">Staking Rewards</div>
                <div className="text-emerald-300/60 text-xs">
                  Consider timing of reward claims for tax efficiency
                </div>
              </div>
            </div>
          </div>

          {/* CPA Connect */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-white mb-4">Need Help?</h3>
            <p className="text-emerald-300/70 text-sm mb-4">
              Connect with crypto-specialized tax professionals
            </p>
            <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
              Find a Crypto CPA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
