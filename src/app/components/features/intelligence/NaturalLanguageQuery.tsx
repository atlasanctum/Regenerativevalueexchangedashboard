import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Search, Sparkles, Clock, Bookmark, ArrowRight, Leaf, TrendingUp, Globe, BarChart3, Send, X } from 'lucide-react';

const suggestions = [
  "Show me carbon projects in Brazil with >90% verification score",
  "Which biodiversity assets have the highest 90-day return?",
  "Find watershed credits in Colombia under $20/unit",
  "What is the total volume of mangrove carbon traded this month?",
  "Show me projects expiring in less than 6 months",
  "Compare agroforestry carbon vs mangrove carbon performance YTD",
  "List all Gold Standard certified projects with available inventory > 10,000 tons",
  "What governance proposals are currently active?",
];

const savedSearches = [
  { name: 'High-yield biodiversity', query: 'biodiversity credits with APY > 25% and Gold Standard certification', runs: 14 },
  { name: 'Amazon portfolio check', query: 'all holdings in Amazon Basin bioregion sorted by verification score', runs: 8 },
  { name: 'Weekly volume report', query: 'trading volume by asset class for current week', runs: 52 },
];

const sampleResults = {
  'Show me carbon projects in Brazil with >90% verification score': [
    { name: 'Amazon Mangrove Restoration', type: 'Carbon', region: 'Brazil', score: 94.8, price: '$31.20', available: '142,000 t', verified: 'Gold Standard' },
    { name: 'Cerrado Reforestation', type: 'Carbon', region: 'Brazil', score: 92.1, price: '$27.40', available: '78,000 t', verified: 'VCS' },
    { name: 'Atlantic Forest Recovery', type: 'Carbon', region: 'Brazil', score: 91.6, price: '$29.80', available: '56,000 t', verified: 'Gold Standard' },
  ],
  'Which biodiversity assets have the highest 90-day return?': [
    { name: 'Andean Cloud Forest Bio', type: 'Biodiversity', region: 'Colombia', score: 97.2, price: '$63.40', available: '12,000 units', verified: 'Plan Vivo' },
    { name: 'Borneo Rainforest Bio', type: 'Biodiversity', region: 'Indonesia', score: 89.4, price: '$52.10', available: '34,000 units', verified: 'VCS' },
    { name: 'Congo Basin Habitat', type: 'Biodiversity', region: 'DRC', score: 87.8, price: '$44.20', available: '67,000 units', verified: 'Gold Standard' },
  ],
};

export function NaturalLanguageQuery() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!query.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setSubmitted(query);
      setHistory((h) => [query, ...h.slice(0, 4)]);
      setLoading(false);
    }, 800);
  };

  const handleSuggestion = (s: string) => {
    setQuery(s);
    setSubmitted(s);
    setHistory((h) => [s, ...h.filter((x) => x !== s).slice(0, 4)]);
  };

  const results = sampleResults[submitted as keyof typeof sampleResults] || null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white mb-2">Natural Language Query</h2>
        <p className="text-emerald-300/70">Search the entire RVE ecosystem using plain English — powered by semantic AI</p>
      </div>

      {/* Search Bar */}
      <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Ask anything about the RVE ecosystem..."
              className="w-full pl-10 pr-4 py-3 bg-slate-800/60 border border-emerald-500/20 rounded-xl text-white text-sm placeholder-emerald-300/30 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 px-5"
          >
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Results Area */}
        <div className="md:col-span-2 space-y-4">
          {submitted && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-white text-sm">Results for: <span className="text-emerald-300 italic">"{submitted}"</span></span>
              </div>

              {results ? (
                <div className="space-y-3">
                  {results.map((r, i) => (
                    <Card key={i} className="bg-slate-900/50 border-emerald-500/20 p-4 hover:border-emerald-500/40 transition-all cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Leaf className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm">{r.name}</div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <Badge className="bg-slate-700/50 text-slate-300 border-0 text-xs">{r.type}</Badge>
                              <Globe className="w-3 h-3 text-emerald-400/60" />
                              <span className="text-emerald-300/60 text-xs">{r.region}</span>
                              <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">{r.verified}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold text-sm">{r.price}</div>
                          <div className="text-emerald-300/50 text-xs">per unit</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700/30 text-xs">
                        <div className="flex items-center gap-4">
                          <span className="text-emerald-300/60">Available: <span className="text-white">{r.available}</span></span>
                          <span className="text-emerald-300/60">Score: <span className="text-emerald-400 font-bold">{r.score}</span></span>
                        </div>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 h-7 px-3 text-xs">
                          View Asset <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-emerald-300/50 text-xs">{results.length} results found</span>
                    <div className="flex gap-2">
                      <Button variant="outline" className="border-emerald-500/30 text-emerald-300 text-xs h-7 px-3">
                        <Bookmark className="w-3 h-3 mr-1" />
                        Save Search
                      </Button>
                      <Button variant="outline" className="border-emerald-500/30 text-emerald-300 text-xs h-7 px-3">
                        Export Results
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
                  <p className="text-emerald-300/70 text-sm text-center">Query processed. Try one of the example queries to see full results.</p>
                </Card>
              )}
            </div>
          )}

          {/* Suggestions */}
          {!submitted && (
            <div>
              <h3 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-400" />
                Example Queries
              </h3>
              <div className="grid md:grid-cols-2 gap-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestion(s)}
                    className="text-left p-3 rounded-lg bg-slate-800/40 border border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-400/5 transition-all text-emerald-300/70 text-xs"
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {s}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {history.length > 0 && (
            <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
              <h3 className="text-white text-xs font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-3 h-3 text-emerald-400" />
                Recent Searches
              </h3>
              <div className="space-y-2">
                {history.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestion(h)}
                    className="w-full text-left text-xs text-emerald-300/60 hover:text-emerald-300 transition-colors py-1 flex items-start gap-2"
                  >
                    <Search className="w-3 h-3 flex-shrink-0 mt-0.5" />
                    <span className="truncate">{h}</span>
                  </button>
                ))}
              </div>
            </Card>
          )}

          <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
            <h3 className="text-white text-xs font-semibold mb-3 flex items-center gap-2">
              <Bookmark className="w-3 h-3 text-emerald-400" />
              Saved Searches
            </h3>
            <div className="space-y-3">
              {savedSearches.map((s) => (
                <button
                  key={s.name}
                  onClick={() => handleSuggestion(s.query)}
                  className="w-full text-left"
                >
                  <div className="text-white text-xs font-medium">{s.name}</div>
                  <div className="text-emerald-300/50 text-xs truncate mt-0.5">{s.query}</div>
                  <div className="text-emerald-300/30 text-xs mt-0.5">Run {s.runs} times</div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
            <h3 className="text-white text-xs font-semibold mb-3">Query Capabilities</h3>
            <div className="space-y-2">
              {[
                'Filter by region, type, price, score',
                'Compare multiple asset classes',
                'Time-based queries (YTD, 90d, 1y)',
                'Portfolio-aware context',
                'Export to CSV / PDF',
                'Schedule recurring queries',
              ].map((cap, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-emerald-300/60">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                  {cap}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
