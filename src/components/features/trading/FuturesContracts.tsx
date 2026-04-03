import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { LineChart, Calendar, TrendingUp } from 'lucide-react';

export function FuturesContracts() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white mb-2">Futures & Forward Contracts</h2>
        <p className="text-emerald-300/70">
          Lock in future ecosystem service delivery at current prices
        </p>
      </div>
      <Card className="bg-slate-900/50 border-emerald-500/20 p-12 text-center">
        <LineChart className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
        <h3 className="text-white mb-2">Futures Trading Coming Soon</h3>
        <p className="text-emerald-300/70 mb-6 max-w-2xl mx-auto">
          Trade futures contracts for carbon credits, biodiversity credits, and ecosystem services. 
          Lock in delivery dates and prices, hedge against market volatility.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300">
            <Calendar className="w-4 h-4 mr-2" />
            Get Notified
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <TrendingUp className="w-4 h-4 mr-2" />
            Early Access Waitlist
          </Button>
        </div>
      </Card>
    </div>
  );
}
