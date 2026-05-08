import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Globe, CheckCircle, Link, Database, Cloud, Zap } from 'lucide-react';

export function InteroperabilityHub() {
  const integrations = [
    {
      category: 'Corporate ESG',
      systems: ['SAP Sustainability', 'Salesforce Net Zero Cloud', 'Workday ESG', 'Microsoft Cloud for Sustainability'],
      status: 'Active',
      connections: 847
    },
    {
      category: 'Blockchain Networks',
      systems: ['Ethereum', 'Polygon', 'Solana', 'Celo', 'Algorand'],
      status: 'Active',
      connections: 12453
    },
    {
      category: 'Carbon Registries',
      systems: ['Verra VCS', 'Gold Standard', 'Climate Action Reserve', 'American Carbon Registry'],
      status: 'Active',
      connections: 2341
    },
    {
      category: 'IoT & Sensors',
      systems: ['AWS IoT', 'Azure IoT Hub', 'Google Cloud IoT', 'ThingsBoard'],
      status: 'Active',
      connections: 15678
    },
    {
      category: 'Financial Rails',
      systems: ['Stripe', 'Circle USDC', 'Wire Transfer', 'Crypto On/Off Ramps'],
      status: 'Active',
      connections: 4521
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
          <Globe className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-white mb-1">Interoperability Hub</h2>
          <p className="text-emerald-300/70">
            Seamless integration with enterprise systems, blockchains, and data sources
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: 'Active Integrations', value: '47', icon: Link },
          { label: 'Data Sync Events/Day', value: '1.2M', icon: Zap },
          { label: 'Connected Organizations', value: '8,934', icon: Database }
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-emerald-400 text-sm">{stat.label}</div>
                <Icon className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-white text-2xl font-bold">{stat.value}</div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4">
        {integrations.map((integration, idx) => (
          <Card key={`int-${idx}`} className="bg-slate-900/50 border-emerald-500/20 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white mb-1">{integration.category}</h3>
                <div className="text-emerald-300/70 text-sm">{integration.connections.toLocaleString()} active connections</div>
              </div>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-300">
                <CheckCircle className="w-3 h-3 mr-1" />
                {integration.status}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {integration.systems.map((system) => (
                <Badge key={system} variant="outline" className="border-blue-500/30 text-blue-300">
                  {system}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30 p-6">
        <Globe className="w-8 h-8 text-blue-400 mb-3" />
        <h3 className="text-white mb-2">API-First Architecture</h3>
        <p className="text-emerald-300/70 mb-4">
          RVE's interoperability layer enables seamless data flow between your existing systems and the regenerative ecosystem. Real-time sync, automated reporting, and universal compatibility.
        </p>
        <div className="flex gap-3">
          <Button size="sm" variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-400/10">
            View API Docs
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Request Integration
          </Button>
        </div>
      </Card>
    </div>
  );
}
