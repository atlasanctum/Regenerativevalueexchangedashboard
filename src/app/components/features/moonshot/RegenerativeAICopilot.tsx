import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Sparkle, Send, Bot, TrendingUp, Target, Search, FileText, BarChart, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export function RegenerativeAICopilot() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: 'Hello! I\'m your Regenerative AI Copilot. I can help you find projects, optimize portfolios, run scenarios, and answer questions about the RVE ecosystem. What would you like to explore?',
      timestamp: new Date(Date.now() - 5000)
    }
  ]);

  const exampleQueries = [
    'Find me 5 mangrove projects with verification scores >85% and ROI projections >12%',
    'Create a diversified portfolio targeting 1000 tons CO2 removal with <$50K budget',
    'What would happen if 30% of our mangroves were lost to a typhoon?',
    'Compare biodiversity impact of agroforestry vs. rewilding in Southeast Asia',
    'Show me indigenous knowledge projects that need funding this quarter'
  ];

  const capabilities = [
    {
      icon: Search,
      title: 'Natural Language Search',
      description: 'Query the entire RVE ecosystem using plain English',
      example: '"Show me coral restoration projects verified in last 30 days"'
    },
    {
      icon: BarChart,
      title: 'Portfolio Optimization',
      description: 'AI-powered portfolio construction based on impact goals + constraints',
      example: 'Maximize biodiversity while staying under $100K'
    },
    {
      icon: TrendingUp,
      title: 'Predictive Modeling',
      description: 'Project future trajectories and impact outcomes',
      example: 'Model this mangrove project to 2035 under RCP 4.5'
    },
    {
      icon: Target,
      title: 'Scenario Analysis',
      description: 'Test "what-if" scenarios for risk management',
      example: 'What if carbon prices drop 40%?'
    },
    {
      icon: FileText,
      title: 'Report Generation',
      description: 'Automatic ESG reports and impact summaries',
      example: 'Generate Q1 2026 impact report for board'
    },
    {
      icon: AlertCircle,
      title: 'Anomaly Detection',
      description: 'AI alerts for unusual patterns or risks',
      example: 'Flag projects with declining verification scores'
    }
  ];

  const recentSuggestions = [
    {
      query: 'Diversified portfolio analysis',
      result: 'Generated optimal 8-asset portfolio: 34% carbon, 28% biodiversity, 22% water, 16% cultural',
      impact: 'Expected 5-year ROI: 18.4% • Impact score: 94/100',
      timestamp: '2 hours ago'
    },
    {
      query: 'Climate risk assessment',
      result: 'Analyzed 23 coastal projects for sea-level rise vulnerability',
      impact: 'High risk: 3 projects • Recommended adaptation strategies',
      timestamp: '5 hours ago'
    },
    {
      query: 'Indigenous project discovery',
      result: 'Found 12 indigenous-led projects below market average pricing',
      impact: 'Average discount: 22% • Verification scores: 88-96',
      timestamp: '1 day ago'
    }
  ];

  const handleSendMessage = () => {
    if (!query.trim()) return;
    
    const userMessage = {
      type: 'user' as const,
      content: query,
      timestamp: new Date()
    };
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: 'assistant' as const,
        content: generateAIResponse(query),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage, aiResponse]);
    }, 1000);
    
    setMessages(prev => [...prev, userMessage]);
    setQuery('');
  };

  const generateAIResponse = (query: string) => {
    if (query.toLowerCase().includes('mangrove')) {
      return '🌿 I found 7 mangrove projects matching your criteria:\n\n**Top Match: Bangladesh Sundarbans Restoration**\n- Verification Score: 92/100\n- ROI Projection: 14.2%\n- Carbon: 4,200 tons/year\n- Price: $27.50/ton\n- Community impact: 450 families\n\nWould you like me to show you the other 6 projects or add this to your portfolio?';
    }
    if (query.toLowerCase().includes('portfolio')) {
      return '📊 Optimizing portfolio for your constraints...\n\n**Recommended Allocation:**\n- 35% Mangrove Carbon ($35K)\n- 25% Agroforestry ($25K)\n- 20% Biodiversity Credits ($20K)\n- 20% Watershed Services ($20K)\n\n**Expected Outcomes:**\n- 5-year ROI: 16.3%\n- Total CO2: 1,240 tons\n- Biodiversity gain: +42%\n- Risk score: Low (23/100)\n\nShall I generate a detailed report?';
    }
    return `I'm analyzing your query about "${query}". Let me search through 847 active projects, 2.4M data points, and historical trends...\n\n[AI is processing your request - full response would appear here]`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Sparkle className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-white mb-1">Regenerative AI Copilot</h2>
            <p className="text-emerald-300/70">
              Your intelligent assistant for the regenerative ecosystem
            </p>
          </div>
        </div>
        <Badge variant="outline" className="border-purple-500/30 text-purple-300">
          <Bot className="w-3 h-3 mr-1" />
          Powered by GPT-4 + Custom Models
        </Badge>
      </div>

      {/* Main Interface */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2 space-y-4">
          {/* Conversation */}
          <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
            <div className="space-y-4 mb-4 max-h-[500px] overflow-y-auto">
              {messages.map((message, idx) => (
                <div
                  key={`msg-${idx}`}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.type === 'user'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800/50 text-emerald-300/90 border border-purple-500/20'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-emerald-100/70' : 'text-emerald-300/50'}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  {message.type === 'user' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shrink-0">
                      U
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about regenerative assets..."
                className="flex-1 bg-slate-800/50 border border-emerald-500/20 rounded-lg px-4 py-3 text-white placeholder:text-emerald-300/50"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Example Queries */}
            <div className="mt-4">
              <div className="text-emerald-300/70 text-sm mb-2">Try these examples:</div>
              <div className="flex flex-wrap gap-2">
                {exampleQueries.slice(0, 3).map((example, idx) => (
                  <button
                    key={`example-${idx}`}
                    onClick={() => setQuery(example)}
                    className="text-xs bg-slate-800/30 border border-purple-500/20 text-purple-300 px-3 py-1.5 rounded-lg hover:bg-slate-800/50 transition-all"
                  >
                    {example.length > 60 ? example.substring(0, 60) + '...' : example}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Recent Analyses */}
          <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
            <h3 className="text-white mb-4">Recent AI Analyses</h3>
            <div className="space-y-3">
              {recentSuggestions.map((suggestion, idx) => (
                <div key={`suggestion-${idx}`} className="bg-slate-800/30 border border-purple-500/20 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-white font-medium">{suggestion.query}</div>
                    <div className="text-emerald-300/70 text-xs">{suggestion.timestamp}</div>
                  </div>
                  <p className="text-emerald-300/70 text-sm mb-2">{suggestion.result}</p>
                  <div className="text-purple-300 text-sm">{suggestion.impact}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar - Capabilities */}
        <div className="space-y-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
            <h3 className="text-white mb-4">AI Capabilities</h3>
            <div className="space-y-4">
              {capabilities.map((capability, idx) => {
                const Icon = capability.icon;
                return (
                  <div key={`cap-${idx}`} className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium text-sm">{capability.title}</div>
                        <div className="text-emerald-300/70 text-xs">{capability.description}</div>
                      </div>
                    </div>
                    <div className="text-purple-300/70 text-xs italic ml-11">
                      "{capability.example}"
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 p-6">
            <Sparkle className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-white mb-2">Pro Tip</h3>
            <p className="text-emerald-300/70 text-sm">
              The AI learns from your preferences. The more you use it, the better it gets at understanding your regenerative investment strategy.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
