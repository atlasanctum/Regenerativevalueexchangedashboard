import { TrendingUp, ArrowUpRight, ArrowDownRight, Activity, DollarSign, BarChart3, LineChart, Wallet, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Modal } from './ui/interactive/Modal';
import { Button } from './ui/interactive/Button';
import { Card } from './ui/interactive/Card';
import { FilterPanel } from './ui/interactive/FilterPanel';
import { motion, AnimatePresence } from 'motion/react';

export function RIUTradingInteractive() {
  const [selectedMarket, setSelectedMarket] = useState<any>(null);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [expandedMarket, setExpandedMarket] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});

  // Simulate real-time price updates
  const [riuMarkets, setRiuMarkets] = useState([
    {
      symbol: 'RIU-CARBON',
      name: 'Carbon Sequestration RIU',
      price: 47.82,
      change24h: 12.4,
      volume24h: 8472893,
      marketCap: 284700000,
      backing: 'Verified carbon sequestration projects',
      totalSupply: 5953847,
    },
    {
      symbol: 'RIU-BIO',
      name: 'Biodiversity RIU',
      price: 38.91,
      change24h: -3.2,
      volume24h: 4829471,
      marketCap: 182400000,
      backing: 'Biodiversity conservation initiatives',
      totalSupply: 4688392,
    },
    {
      symbol: 'RIU-WATER',
      name: 'Water Quality RIU',
      price: 52.17,
      change24h: 8.7,
      volume24h: 3847291,
      marketCap: 147200000,
      backing: 'Water restoration and purification',
      totalSupply: 2821847,
    },
    {
      symbol: 'RIU-SOCIAL',
      name: 'Social Impact RIU',
      price: 41.23,
      change24h: 5.9,
      volume24h: 2948271,
      marketCap: 124800000,
      backing: 'Community health and education',
      totalSupply: 3027394,
    },
  ]);

  // Real-time price simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRiuMarkets(prev => prev.map(market => ({
        ...market,
        price: market.price + (Math.random() - 0.5) * 0.5,
        change24h: market.change24h + (Math.random() - 0.5) * 0.2,
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleTrade = (market: any, type: 'buy' | 'sell') => {
    setSelectedMarket(market);
    setTradeType(type);
    setPrice(market.price.toFixed(2));
    setShowTradeModal(true);
  };

  const executeTrade = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOrderSuccess(true);
      setTimeout(() => {
        setShowTradeModal(false);
        setOrderSuccess(false);
        setAmount('');
      }, 2000);
    }, 1500);
  };

  const filteredMarkets = riuMarkets.filter(market =>
    market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    market.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-emerald-400" />
            RIU Trading (Interactive)
          </h1>
          <p className="text-emerald-300/70 mt-2">
            Trade Regenerative Impact Units with real-time pricing and instant execution
          </p>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-400/10 rounded-lg border border-emerald-400/30"
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm">Live Trading</span>
          </motion.div>
        </div>
      </div>

      {/* Market Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Market Cap', value: `$${(riuMarkets.reduce((sum, m) => sum + m.marketCap, 0) / 1000000).toFixed(1)}M`, icon: DollarSign },
          { label: '24h Volume', value: `$${(riuMarkets.reduce((sum, m) => sum + m.volume24h, 0) / 1000000).toFixed(1)}M`, icon: BarChart3 },
          { label: 'Active Markets', value: riuMarkets.length.toString(), icon: LineChart },
          { label: 'Total RIUs', value: `${(riuMarkets.reduce((sum, m) => sum + m.totalSupply, 0) / 1000000).toFixed(1)}M`, icon: Wallet },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} hover={false}>
              <div className="flex items-center gap-2 text-emerald-300/70 text-sm mb-2">
                <Icon className="w-4 h-4" />
                {stat.label}
              </div>
              <div className="text-white text-2xl">{stat.value}</div>
            </Card>
          );
        })}
      </div>

      {/* Search and Filter */}
      <FilterPanel
        onSearch={setSearchQuery}
        onFilterChange={setFilters}
        filters={[
          {
            id: 'type',
            label: 'Asset Type',
            type: 'select',
            options: ['Carbon', 'Biodiversity', 'Water', 'Social'],
          },
          {
            id: 'priceRange',
            label: 'Price Range',
            type: 'select',
            options: ['Under $40', '$40-$50', 'Over $50'],
          },
          {
            id: 'trending',
            label: 'Only Trending',
            type: 'checkbox',
          },
        ]}
      />

      {/* RIU Markets with Interactive Cards */}
      <div className="space-y-3">
        <h2 className="text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-400" />
          Live Markets
        </h2>

        <AnimatePresence>
          {filteredMarkets.map((market) => (
            <motion.div
              key={market.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card hover onClick={() => setExpandedMarket(expandedMarket === market.symbol ? null : market.symbol)}>
                <div className="space-y-3">
                  {/* Main Info */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white">{market.name}</span>
                        <span className="text-emerald-300/70 text-sm font-mono">{market.symbol}</span>
                        {expandedMarket === market.symbol ? (
                          <ChevronUp className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-emerald-300/50" />
                        )}
                      </div>
                      <div className="text-emerald-300/70 text-sm">{market.backing}</div>
                    </div>
                    <div className="text-right">
                      <motion.div
                        key={market.price}
                        initial={{ scale: 1.05, color: '#10b981' }}
                        animate={{ scale: 1, color: '#ffffff' }}
                        className="text-white text-xl mb-1"
                      >
                        ${market.price.toFixed(2)}
                      </motion.div>
                      <div className={`flex items-center gap-1 text-sm ${market.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {market.change24h >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {Math.abs(market.change24h).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <div className="text-emerald-300/50 text-xs mb-1">24h Volume</div>
                      <div className="text-emerald-300">${(market.volume24h / 1000000).toFixed(1)}M</div>
                    </div>
                    <div>
                      <div className="text-emerald-300/50 text-xs mb-1">Market Cap</div>
                      <div className="text-emerald-300">${(market.marketCap / 1000000).toFixed(1)}M</div>
                    </div>
                    <div>
                      <div className="text-emerald-300/50 text-xs mb-1">Supply</div>
                      <div className="text-emerald-300">{(market.totalSupply / 1000000).toFixed(2)}M</div>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="success"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrade(market, 'buy');
                        }}
                      >
                        Buy
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrade(market, 'sell');
                        }}
                      >
                        Sell
                      </Button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedMarket === market.symbol && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pt-3 border-t border-emerald-500/10 overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-emerald-300/50 mb-1">Price Range (24h)</div>
                            <div className="text-emerald-300">
                              ${(market.price * 0.95).toFixed(2)} - ${(market.price * 1.05).toFixed(2)}
                            </div>
                          </div>
                          <div>
                            <div className="text-emerald-300/50 mb-1">Circulating Supply</div>
                            <div className="text-emerald-300">{((market.totalSupply * 0.87) / 1000000).toFixed(2)}M</div>
                          </div>
                          <div className="col-span-2">
                            <div className="text-emerald-300/50 mb-2">Impact Backing</div>
                            <div className="w-full bg-slate-900/50 rounded-full h-2">
                              <div className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                            </div>
                            <div className="text-emerald-400 text-xs mt-1">92% Verified Impact Coverage</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Trading Modal */}
      <Modal
        isOpen={showTradeModal}
        onClose={() => !isLoading && setShowTradeModal(false)}
        title={`${tradeType === 'buy' ? 'Buy' : 'Sell'} ${selectedMarket?.name}`}
        size="md"
      >
        {!orderSuccess ? (
          <div className="space-y-6">
            {/* Market Info */}
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-300/70">Current Price</span>
                <span className="text-white text-lg">${selectedMarket?.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-emerald-300/70">24h Change</span>
                <span className={selectedMarket?.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                  {selectedMarket?.change24h >= 0 ? '+' : ''}{selectedMarket?.change24h.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Order Form */}
            <div className="space-y-4">
              <div>
                <label className="text-emerald-300/70 text-sm mb-2 block">Amount (RIUs)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-800/50 border border-emerald-500/20 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-emerald-400/50 transition-colors"
                />
              </div>

              <div>
                <label className="text-emerald-300/70 text-sm mb-2 block">Price (USD)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-800/50 border border-emerald-500/20 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-emerald-400/50 transition-colors"
                />
              </div>

              {/* Total */}
              <div className="bg-emerald-400/10 border border-emerald-400/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-300">Total</span>
                  <span className="text-white text-xl">
                    ${amount && price ? (parseFloat(amount) * parseFloat(price)).toFixed(2) : '0.00'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowTradeModal(false)}
                className="flex-1"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant={tradeType === 'buy' ? 'success' : 'danger'}
                onClick={executeTrade}
                loading={isLoading}
                disabled={!amount || !price}
                className="flex-1"
              >
                {tradeType === 'buy' ? 'Confirm Buy' : 'Confirm Sell'}
              </Button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-emerald-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            </div>
            <h3 className="text-white text-xl mb-2">Order Executed!</h3>
            <p className="text-emerald-300/70">
              Successfully {tradeType === 'buy' ? 'bought' : 'sold'} {amount} {selectedMarket?.symbol}
            </p>
          </motion.div>
        )}
      </Modal>
    </div>
  );
}
