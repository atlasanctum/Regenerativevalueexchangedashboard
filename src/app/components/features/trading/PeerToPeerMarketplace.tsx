import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { ArrowLeftRight, Star, Shield, MessageSquare, Clock, Search, Filter, TrendingUp, CheckCircle, User } from 'lucide-react';

const listings = [
  {
    id: 'l1', seller: 'AmazonConservancy', sellerReputation: 4.9, sellerTrades: 247, asset: 'Mangrove Carbon Credits',
    quantity: 5000, price: 28.50, totalValue: '$142,500', condition: 'Verified', expires: '7 days',
    tags: ['Gold Standard', 'Brazil', 'Wetlands'], negotiable: true,
  },
  {
    id: 'l2', seller: 'BiodiversityDAO', sellerReputation: 4.7, sellerTrades: 89, asset: 'Amazon Biodiversity Credits',
    quantity: 1200, price: 47.80, totalValue: '$57,360', condition: 'Verified', expires: '3 days',
    tags: ['Premium', 'Peru', 'Species +847'], negotiable: false,
  },
  {
    id: 'l3', seller: 'WatershedVentures', sellerReputation: 4.8, sellerTrades: 156, asset: 'Watershed Ecosystem Services',
    quantity: 3000, price: 19.20, totalValue: '$57,600', condition: 'Verified', expires: '14 days',
    tags: ['VCS', 'Colombia', 'Water Quality'], negotiable: true,
  },
  {
    id: 'l4', seller: 'IndigenousForestDAO', sellerReputation: 5.0, sellerTrades: 42, asset: 'Cultural Heritage Tokens',
    quantity: 500, price: 63.40, totalValue: '$31,700', condition: 'Certified', expires: '30 days',
    tags: ['UNESCO', 'Traditional Knowledge', 'Amazon'], negotiable: true,
  },
  {
    id: 'l5', seller: 'KelpRestoration', sellerReputation: 4.6, sellerTrades: 31, asset: 'Marine Carbon Credits',
    quantity: 2000, price: 42.10, totalValue: '$84,200', condition: 'Verified', expires: '10 days',
    tags: ['Blue Carbon', 'Pacific', 'Kelp Forest'], negotiable: false,
  },
];

const myBids = [
  { listing: 'Mangrove Carbon Credits', bidPrice: 27.80, qty: 1000, status: 'Pending', expires: '2 days' },
  { listing: 'Amazon Biodiversity Credits', bidPrice: 46.50, qty: 300, status: 'Counter-offered', expires: '1 day' },
];

export function PeerToPeerMarketplace() {
  const [selected, setSelected] = useState<typeof listings[0] | null>(null);
  const [search, setSearch] = useState('');
  const [bidPrice, setBidPrice] = useState('');
  const [bidQty, setBidQty] = useState('');

  const filtered = listings.filter((l) =>
    l.asset.toLowerCase().includes(search.toLowerCase()) ||
    l.seller.toLowerCase().includes(search.toLowerCase()) ||
    l.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Peer-to-Peer Marketplace</h2>
          <p className="text-emerald-300/70">Direct trading between verified participants with escrow smart contracts</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
            <MessageSquare className="w-4 h-4 mr-2" />
            My Bids ({myBids.length})
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            Post Listing
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Active Listings', value: '312', sub: '+24 today' },
          { label: 'Total P2P Volume', value: '$18.4M', sub: 'This month' },
          { label: 'Avg Deal Time', value: '4.2 hrs', sub: 'Negotiation to close' },
          { label: 'Dispute Rate', value: '0.3%', sub: 'Escrow protected' },
        ].map((s) => (
          <Card key={s.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
            <div className="text-emerald-400 text-xs mb-2">{s.label}</div>
            <div className="text-white text-xl font-bold">{s.value}</div>
            <div className="text-emerald-300/50 text-xs mt-1">{s.sub}</div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Listing Panel */}
        <div className="md:col-span-2 space-y-4">
          {/* Search */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/60" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by asset, seller, or tag..."
                className="w-full pl-10 pr-4 py-2 bg-slate-800/60 border border-emerald-500/20 rounded-lg text-white text-sm placeholder-emerald-300/30 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <Button variant="outline" className="border-emerald-500/30 text-emerald-300">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Listings */}
          <div className="space-y-3">
            {filtered.map((listing) => (
              <button
                key={listing.id}
                onClick={() => setSelected(listing)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${selected?.id === listing.id ? 'bg-emerald-400/15 border-emerald-500/40' : 'bg-slate-900/50 border-emerald-500/20 hover:border-emerald-500/30'}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-semibold text-sm">{listing.asset}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <User className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-300/60 text-xs">{listing.seller}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-amber-300 text-xs">{listing.sellerReputation}</span>
                      </div>
                      <span className="text-emerald-300/40 text-xs">({listing.sellerTrades} trades)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">${listing.price.toFixed(2)}</div>
                    <div className="text-emerald-300/50 text-xs">per unit</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {listing.tags.map((tag) => (
                      <Badge key={tag} className="bg-slate-700/50 text-slate-300 border-0 text-xs">{tag}</Badge>
                    ))}
                    {listing.negotiable && <Badge className="bg-amber-400/20 text-amber-300 border-0 text-xs">Negotiable</Badge>}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-emerald-300/50">
                    <span>{listing.quantity.toLocaleString()} units</span>
                    <span className="text-white font-medium">{listing.totalValue}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {listing.expires}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Deal Panel */}
        <div className="space-y-4">
          {selected ? (
            <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
              <h3 className="text-white font-semibold text-sm mb-4">Make an Offer</h3>
              <div className="space-y-4">
                <div className="bg-emerald-400/10 rounded-lg p-3 border border-emerald-500/20">
                  <div className="text-white font-medium text-sm">{selected.asset}</div>
                  <div className="text-emerald-300/60 text-xs mt-0.5">Listed at ${selected.price.toFixed(2)} / unit</div>
                  <div className="text-emerald-300/50 text-xs">{selected.quantity.toLocaleString()} units available</div>
                </div>

                <div>
                  <label className="text-emerald-300/60 text-xs mb-1 block">Your Bid Price (USD)</label>
                  <input
                    type="number"
                    value={bidPrice}
                    onChange={(e) => setBidPrice(e.target.value)}
                    placeholder={selected.price.toString()}
                    className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="text-emerald-300/60 text-xs mb-1 block">Quantity</label>
                  <input
                    type="number"
                    value={bidQty}
                    onChange={(e) => setBidQty(e.target.value)}
                    placeholder="Enter quantity"
                    className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                {bidPrice && bidQty && (
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-emerald-300/60">
                      <span>Offer Total</span>
                      <span className="text-white">${(Number(bidPrice) * Number(bidQty)).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-300/60">
                      <span>Escrow Lock</span>
                      <span className="text-white">${(Number(bidPrice) * Number(bidQty)).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-300/60">
                      <span>Platform Fee (0.5%)</span>
                      <span className="text-white">${(Number(bidPrice) * Number(bidQty) * 0.005).toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-sm">Submit Offer</Button>
                  <Button variant="outline" className="border-emerald-500/30 text-emerald-300 text-sm">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-300/50">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  Protected by escrow smart contract
                </div>
              </div>
            </Card>
          ) : (
            <Card className="bg-slate-900/50 border-emerald-500/20 p-8 text-center">
              <ArrowLeftRight className="w-12 h-12 text-emerald-400/40 mx-auto mb-3" />
              <p className="text-emerald-300/50 text-sm">Select a listing to make an offer</p>
            </Card>
          )}

          {/* My Active Bids */}
          <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
            <h3 className="text-white text-xs font-semibold mb-3">My Active Bids</h3>
            <div className="space-y-3">
              {myBids.map((bid, i) => (
                <div key={i} className="bg-slate-800/40 rounded-lg p-3">
                  <div className="text-white text-xs font-medium">{bid.listing}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-emerald-300/60 text-xs">${bid.bidPrice} × {bid.qty}</span>
                    <Badge className={`border-0 text-xs ${bid.status === 'Pending' ? 'bg-amber-400/20 text-amber-300' : 'bg-blue-400/20 text-blue-300'}`}>
                      {bid.status}
                    </Badge>
                  </div>
                  <div className="text-emerald-300/40 text-xs mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Expires in {bid.expires}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-white text-xs font-semibold">Reputation System</span>
            </div>
            <p className="text-emerald-300/50 text-xs">
              All participants are verified. Reputation scores are based on trade history, delivery rate, and community feedback.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
