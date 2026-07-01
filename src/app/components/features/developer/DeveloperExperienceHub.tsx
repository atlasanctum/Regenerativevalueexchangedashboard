import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Code, Terminal, Webhook, BookOpen, Copy, CheckCircle, ExternalLink, Zap, Globe, Shield } from 'lucide-react';

const sdkExamples: Record<string, string> = {
  JavaScript: `import { RVEClient } from '@rve/sdk';

const client = new RVEClient({
  apiKey: process.env.RVE_API_KEY,
  environment: 'production',
});

// Fetch carbon credit pricing
const prices = await client.assets.list({
  type: 'carbon',
  minVerificationScore: 90,
});

// Execute a trade
const trade = await client.trades.submit({
  assetId: 'BRZ-001',
  quantity: 1000,
  maxPrice: 32.50,
});

console.log(trade.id, trade.status);`,

  Python: `from rve_sdk import RVEClient

client = RVEClient(
    api_key=os.environ["RVE_API_KEY"],
    environment="production"
)

# Fetch impact metrics
metrics = client.impact.get_metrics(
    project_id="BRZ-001",
    time_range="90d"
)

# Subscribe to price updates
@client.assets.on_price_update("carbon")
async def handle_price(event):
    print(f"Carbon price: ${event.price}")

await client.connect()`,

  Rust: `use rve_sdk::{RVEClient, AssetType, TradeRequest};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = RVEClient::new(
        std::env::var("RVE_API_KEY")?,
        "production"
    )?;

    let assets = client
        .assets()
        .filter(AssetType::Carbon)
        .min_score(90.0)
        .fetch()
        .await?;

    println!("Found {} assets", assets.len());
    Ok(())
}`,
};

const endpoints = [
  { method: 'GET', path: '/v1/assets', description: 'List all regenerative assets with filtering', auth: 'API Key' },
  { method: 'POST', path: '/v1/trades', description: 'Submit a new trade order', auth: 'API Key + Signature' },
  { method: 'GET', path: '/v1/projects/{id}/impact', description: 'Retrieve verified impact metrics', auth: 'API Key' },
  { method: 'POST', path: '/v1/verifications', description: 'Submit verification evidence', auth: 'API Key + JWT' },
  { method: 'GET', path: '/v1/governance/proposals', description: 'List active governance proposals', auth: 'API Key' },
  { method: 'POST', path: '/v1/governance/vote', description: 'Cast a governance vote', auth: 'API Key + JWT' },
  { method: 'GET', path: '/v1/portfolio', description: 'Retrieve authenticated user portfolio', auth: 'JWT' },
  { method: 'WS', path: '/v1/ws/prices', description: 'Real-time price WebSocket stream', auth: 'API Key' },
];

const webhookEvents = [
  { event: 'trade.completed', description: 'Fired when a trade is confirmed on-chain' },
  { event: 'asset.price_change', description: 'Fired when asset price changes >1%' },
  { event: 'verification.completed', description: 'Fired when a project verification resolves' },
  { event: 'governance.vote_ended', description: 'Fired when a governance proposal closes' },
  { event: 'portfolio.threshold_reached', description: 'Fired on user-configured portfolio alerts' },
];

const methodColors: Record<string, string> = {
  GET: 'bg-emerald-400/20 text-emerald-300',
  POST: 'bg-blue-400/20 text-blue-300',
  PUT: 'bg-amber-400/20 text-amber-300',
  DELETE: 'bg-rose-400/20 text-rose-300',
  WS: 'bg-purple-400/20 text-purple-300',
};

export function DeveloperExperienceHub() {
  const [selectedLang, setSelectedLang] = useState('JavaScript');
  const [copied, setCopied] = useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Developer Experience Hub</h2>
          <p className="text-emerald-300/70">GraphQL API, JavaScript/Python/Rust SDKs, webhooks, versioning, and interactive documentation</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
            <BookOpen className="w-4 h-4 mr-2" />
            Full Docs
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Zap className="w-4 h-4 mr-2" />
            Get API Key
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'API Calls Today', value: '2.4M', sub: '+12.4% vs yesterday', icon: Zap },
          { label: 'Active API Keys', value: '1,847', sub: '247 developers', icon: Code },
          { label: 'SDK Downloads', value: '42K', sub: 'This month', icon: Globe },
          { label: 'Webhook Success', value: '99.7%', sub: 'Delivery rate', icon: Webhook },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-400 text-xs">{s.label}</span>
                <Icon className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-white text-xl font-bold">{s.value}</div>
              <div className="text-emerald-300/50 text-xs mt-1">{s.sub}</div>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="sdk">
        <TabsList className="bg-slate-800/60 border border-emerald-500/20">
          <TabsTrigger value="sdk" className="data-[state=active]:bg-emerald-600">SDK Quickstart</TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-emerald-600">API Reference</TabsTrigger>
          <TabsTrigger value="webhooks" className="data-[state=active]:bg-emerald-600">Webhooks</TabsTrigger>
          <TabsTrigger value="sandbox" className="data-[state=active]:bg-emerald-600">Sandbox</TabsTrigger>
        </TabsList>

        <TabsContent value="sdk" className="mt-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h3 className="text-white text-sm font-semibold">Choose SDK</h3>
              {['JavaScript', 'Python', 'Rust'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${selectedLang === lang ? 'bg-emerald-400/15 border-emerald-500/40' : 'bg-slate-900/50 border-emerald-500/20 hover:border-emerald-500/30'}`}
                >
                  <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-white text-sm font-medium">{lang}</div>
                      <div className="text-emerald-300/50 text-xs">@rve/sdk-{lang.toLowerCase()}</div>
                    </div>
                  </div>
                </button>
              ))}

              <Card className="bg-slate-900/50 border-emerald-500/20 p-4">
                <h4 className="text-white text-xs font-semibold mb-3">Installation</h4>
                <div className="bg-slate-950 rounded-lg p-3 font-mono text-xs text-emerald-300">
                  {selectedLang === 'JavaScript' ? 'npm install @rve/sdk' : selectedLang === 'Python' ? 'pip install rve-sdk' : 'cargo add rve-sdk'}
                </div>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card className="bg-slate-900/50 border-emerald-500/20 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-emerald-500/20 bg-slate-950/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/60" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-emerald-300/50 text-xs">example.{selectedLang === 'JavaScript' ? 'js' : selectedLang === 'Python' ? 'py' : 'rs'}</span>
                  <button onClick={copy} className="flex items-center gap-1 text-emerald-300/60 hover:text-emerald-300 text-xs">
                    {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="p-4 text-xs text-emerald-200/80 font-mono overflow-x-auto leading-relaxed">
                  {sdkExamples[selectedLang]}
                </pre>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="api" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-sm">REST API v1 Endpoints</h3>
              <div className="flex gap-2">
                <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">v1.4.2</Badge>
                <Button variant="outline" className="border-emerald-500/30 text-emerald-300 text-xs h-7 px-3">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  OpenAPI Spec
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              {endpoints.map((ep, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-slate-800/40 rounded-lg hover:bg-slate-800/60 transition-all cursor-pointer">
                  <Badge className={`border-0 text-xs w-12 text-center font-mono ${methodColors[ep.method]}`}>{ep.method}</Badge>
                  <code className="text-emerald-300 text-xs font-mono flex-shrink-0">{ep.path}</code>
                  <span className="text-slate-300 text-xs flex-1">{ep.description}</span>
                  <Badge className="bg-slate-700/50 text-slate-300 border-0 text-xs flex-shrink-0">
                    <Shield className="w-3 h-3 mr-1" />
                    {ep.auth}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
              <h3 className="text-white font-semibold text-sm mb-4">Available Webhook Events</h3>
              <div className="space-y-3">
                {webhookEvents.map((w) => (
                  <div key={w.event} className="p-3 bg-slate-800/40 rounded-lg">
                    <code className="text-emerald-300 text-xs font-mono">{w.event}</code>
                    <p className="text-emerald-300/60 text-xs mt-0.5">{w.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
              <h3 className="text-white font-semibold text-sm mb-4">Register Webhook Endpoint</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-emerald-300/60 text-xs mb-1 block">Endpoint URL</label>
                  <input className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-emerald-500/50" placeholder="https://your-server.com/webhooks/rve" />
                </div>
                <div>
                  <label className="text-emerald-300/60 text-xs mb-1.5 block">Events to Subscribe</label>
                  <div className="space-y-2">
                    {webhookEvents.slice(0, 3).map((w) => (
                      <label key={w.event} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="accent-emerald-500" />
                        <code className="text-emerald-300 text-xs">{w.event}</code>
                      </label>
                    ))}
                  </div>
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Webhook className="w-4 h-4 mr-2" />
                  Register Webhook
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sandbox" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <h3 className="text-white font-semibold text-sm">Interactive API Sandbox</h3>
              <Badge className="bg-amber-400/20 text-amber-300 border-0 text-xs">Sandbox Mode — No Real Funds</Badge>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-emerald-300/60 text-xs mb-1 block">Endpoint</label>
                  <select className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50">
                    <option>GET /v1/assets</option>
                    <option>POST /v1/trades</option>
                    <option>GET /v1/portfolio</option>
                  </select>
                </div>
                <div>
                  <label className="text-emerald-300/60 text-xs mb-1 block">Request Body (JSON)</label>
                  <textarea rows={6} className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-emerald-300 text-xs font-mono focus:outline-none focus:border-emerald-500/50" defaultValue={`{\n  "type": "carbon",\n  "minVerificationScore": 90,\n  "limit": 10\n}`} />
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Zap className="w-4 h-4 mr-2" />
                  Send Request
                </Button>
              </div>
              <div>
                <label className="text-emerald-300/60 text-xs mb-1 block">Response</label>
                <div className="bg-slate-950 rounded-lg p-3 h-48 overflow-auto">
                  <pre className="text-emerald-300 text-xs font-mono">{`{
  "status": 200,
  "data": [
    {
      "id": "BRZ-001",
      "name": "Amazon Mangrove",
      "price": 31.20,
      "score": 94.8,
      "available": 142000
    },
    ...
  ],
  "meta": {
    "total": 47,
    "page": 1
  }
}`}</pre>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
