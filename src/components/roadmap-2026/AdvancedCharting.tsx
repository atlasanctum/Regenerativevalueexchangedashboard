import { TrendingUp, LineChart, BarChart3, CandlestickChart, Activity, Download, Share2, Settings, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

export function AdvancedCharting() {
  const chartTypes = [
    { id: 'line', name: 'Line Chart', icon: LineChart, active: true },
    { id: 'candlestick', name: 'Candlestick', icon: CandlestickChart, active: false },
    { id: 'bar', name: 'Bar Chart', icon: BarChart3, active: false },
    { id: 'area', name: 'Area Chart', icon: Activity, active: false },
  ];

  const indicators = [
    { name: 'Moving Average (MA)', enabled: true, period: 20 },
    { name: 'RSI', enabled: true, period: 14 },
    { name: 'MACD', enabled: false, settings: '12, 26, 9' },
    { name: 'Bollinger Bands', enabled: false, period: 20 },
    { name: 'Volume Profile', enabled: true, bars: 50 },
  ];

  const timeframes = ['1m', '5m', '15m', '1h', '4h', '1d', '1w', '1M'];

  const chartData = [
    { time: '00:00', price: 127.45, volume: 234567 },
    { time: '04:00', price: 128.92, volume: 345678 },
    { time: '08:00', price: 126.38, volume: 456789 },
    { time: '12:00', price: 129.47, volume: 567890 },
    { time: '16:00', price: 131.23, volume: 678901 },
    { time: '20:00', price: 130.15, volume: 456789 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <CandlestickChart className="w-6 h-6 text-white" />
            </div>
            Advanced Charting Tools
          </h1>
          <p className="text-emerald-300/70 mt-2">Professional-grade charting with TradingView integration</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20 hover:bg-emerald-500/20 transition-all flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share Chart
          </button>
          <button className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Current Price', value: '$130.15', change: '+2.85%', positive: true },
          { label: '24h High', value: '$131.89', change: 'Peak', positive: true },
          { label: '24h Low', value: '$125.47', change: 'Valley', positive: false },
          { label: '24h Volume', value: '$2.4M', change: '+15.3%', positive: true },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-4">
            <div className="text-emerald-300/70 text-sm mb-1">{stat.label}</div>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl text-white">{stat.value}</div>
              <div className={`text-sm ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart Controls Sidebar */}
        <div className="space-y-6">
          {/* Chart Types */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              Chart Types
            </h3>
            <div className="space-y-2">
              {chartTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      type.active
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-700/30 text-emerald-300/50 hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{type.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Indicators */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              Indicators
            </h3>
            <div className="space-y-3">
              {indicators.map((indicator, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={indicator.enabled}
                      className="w-4 h-4 rounded border-emerald-500/30"
                      readOnly
                    />
                    <span className="text-sm text-emerald-300/70">{indicator.name}</span>
                  </div>
                  <button className="text-xs text-blue-400 hover:text-blue-300">
                    <Settings className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="lg:col-span-3 space-y-4">
          {/* Timeframe Selector */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    className={`px-3 py-1 rounded-lg text-sm transition-all ${
                      tf === '1h'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'text-emerald-300/50 hover:text-emerald-300 hover:bg-emerald-500/10'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 bg-slate-700/50 text-emerald-300/70 rounded-lg hover:bg-slate-700 transition-all">
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button className="p-2 bg-slate-700/50 text-emerald-300/70 rounded-lg hover:bg-slate-700 transition-all">
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button className="p-2 bg-slate-700/50 text-emerald-300/70 rounded-lg hover:bg-slate-700 transition-all">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Chart Canvas */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6 h-[500px] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <CandlestickChart className="w-16 h-16 text-emerald-500/30 mx-auto mb-4" />
                <p className="text-emerald-300/50 text-sm">
                  TradingView Integration
                </p>
                <p className="text-emerald-300/30 text-xs mt-2">
                  Professional charting tools with 100+ indicators
                </p>
              </div>
            </div>
            
            {/* Mock Chart Visualization */}
            <div className="relative h-full">
              <svg className="w-full h-full" viewBox="0 0 800 400">
                {/* Grid */}
                {[...Array(8)].map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1="0"
                    y1={50 * i}
                    x2="800"
                    y2={50 * i}
                    stroke="rgba(52, 211, 153, 0.1)"
                    strokeWidth="1"
                  />
                ))}
                {[...Array(8)].map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={100 * i}
                    y1="0"
                    x2={100 * i}
                    y2="400"
                    stroke="rgba(52, 211, 153, 0.1)"
                    strokeWidth="1"
                  />
                ))}
                
                {/* Price Line */}
                <polyline
                  points="50,250 150,200 250,280 350,150 450,100 550,130 650,180 750,150"
                  fill="none"
                  stroke="rgba(52, 211, 153, 0.6)"
                  strokeWidth="3"
                />
                
                {/* Area Fill */}
                <path
                  d="M50,250 L150,200 L250,280 L350,150 L450,100 L550,130 L650,180 L750,150 L750,400 L50,400 Z"
                  fill="url(#gradient)"
                  opacity="0.2"
                />
                
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgb(52, 211, 153)" />
                    <stop offset="100%" stopColor="rgb(52, 211, 153)" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Volume Chart */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-white mb-4">Volume</h3>
            <div className="flex items-end justify-between gap-2 h-24">
              {chartData.map((data, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-emerald-500/50 to-emerald-400/30 rounded-t"
                    style={{ height: `${(data.volume / 700000) * 100}%` }}
                  ></div>
                  <span className="text-xs text-emerald-300/50">{data.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Drawing Tools',
            description: 'Trend lines, channels, Fibonacci, and 50+ drawing tools',
            icon: TrendingUp,
            color: 'blue',
            features: ['Trend Lines', 'Fibonacci Retracement', 'Channels', 'Shapes'],
          },
          {
            title: '100+ Indicators',
            description: 'Technical indicators and oscillators for deep analysis',
            icon: Activity,
            color: 'purple',
            features: ['MA, EMA, SMA', 'RSI, MACD, Stochastic', 'Bollinger Bands', 'Custom Scripts'],
          },
          {
            title: 'Multi-Asset',
            description: 'Compare multiple assets on a single chart',
            icon: BarChart3,
            color: 'emerald',
            features: ['Overlay Charts', 'Correlation Analysis', 'Spread Trading', 'Basket View'],
          },
        ].map((feature, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
            <div className={`w-12 h-12 bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-600/10 rounded-xl flex items-center justify-center mb-4`}>
              <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
            </div>
            <h3 className="text-white mb-2">{feature.title}</h3>
            <p className="text-emerald-300/70 text-sm mb-4">{feature.description}</p>
            <ul className="space-y-2">
              {feature.features.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-emerald-300/60">
                  <div className={`w-1.5 h-1.5 bg-${feature.color}-400 rounded-full`}></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
