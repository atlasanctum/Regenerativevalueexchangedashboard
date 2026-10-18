import { useState, useCallback } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { GitBranch, Search, ZoomIn, ZoomOut, Maximize2, Filter, Download, RefreshCw, Database, Link2, Eye, Layers } from 'lucide-react';

const entityTypes = [
  { type: 'Organizations', count: 8472, color: '#10b981', description: 'NGOs, corporations, governments, foundations' },
  { type: 'Projects', count: 2134, color: '#06b6d4', description: 'Ecosystem restoration and conservation projects' },
  { type: 'Carbon Assets', count: 12340, color: '#f59e0b', description: 'Verified carbon credits and future streams' },
  { type: 'Biodiversity Assets', count: 4621, color: '#8b5cf6', description: 'Biodiversity units and habitat credits' },
  { type: 'People', count: 3891, color: '#ec4899', description: 'Verified individuals in the ecosystem' },
  { type: 'Ecosystems', count: 1847, color: '#84cc16', description: 'Geographic ecosystem zones' },
  { type: 'Policies', count: 2890, color: '#64748b', description: 'Regulatory frameworks and standards' },
  { type: 'Financial Assets', count: 6714, color: '#0ea5e9', description: 'RSAs, bonds, staking positions' },
];

const relationshipTypes = [
  { rel: 'MANAGES', count: 28400, description: 'Organization manages project' },
  { rel: 'ISSUES', count: 12340, description: 'Project issues carbon/bio assets' },
  { rel: 'VERIFIES', count: 9847, description: 'Organization verifies project/asset' },
  { rel: 'INVESTS_IN', count: 54200, description: 'Entity invests in asset/project' },
  { rel: 'GOVERNS', count: 3421, description: 'Policy governs asset class' },
  { rel: 'REFERENCES', count: 18400, description: 'Document references entity' },
  { rel: 'CO_LOCATED', count: 7890, description: 'Entities share geographic region' },
  { rel: 'COMPETES_WITH', count: 1240, description: 'Projects competing for same area' },
];

const graphGrowth = [
  { month: 'Jan', nodes: 28400, edges: 124000 },
  { month: 'Feb', nodes: 34200, edges: 148000 },
  { month: 'Mar', nodes: 41800, edges: 179000 },
  { month: 'Apr', nodes: 52400, edges: 218000 },
  { month: 'May', nodes: 63700, edges: 261000 },
  { month: 'Jun', nodes: 78400, edges: 312000 },
];

const samplePaths = [
  {
    from: 'Atlas Sanctum Foundation',
    to: 'Amazon REDD+ Carbon Credits',
    path: ['Atlas Sanctum Foundation', '→ MANAGES →', 'BRZ-001 Project', '→ ISSUES →', 'Amazon REDD+ Carbon Credits'],
    hops: 2,
    strength: 0.94,
  },
  {
    from: 'Gold Standard',
    to: 'Coral Reef BioCredits',
    path: ['Gold Standard', '→ VERIFIES →', 'AUS-007 Project', '→ ISSUES →', 'Coral Reef BioCredits'],
    hops: 2,
    strength: 0.97,
  },
  {
    from: 'EU Climate Policy',
    to: 'Colombian Watershed Units',
    path: ['EU Climate Policy', '→ GOVERNS →', 'Carbon Asset Class', '→ APPLIES_TO →', 'COL-003 Project', '→ ISSUES →', 'Colombian Watershed Units'],
    hops: 3,
    strength: 0.82,
  },
];

const topConnected = [
  { entity: 'Atlas Sanctum Foundation', type: 'Organization', connections: 8472, centrality: 0.94 },
  { entity: 'Verra VCS', type: 'Organization', connections: 4218, centrality: 0.87 },
  { entity: 'Amazon Basin Ecosystem', type: 'Ecosystem', connections: 3847, centrality: 0.81 },
  { entity: 'Gold Standard', type: 'Organization', connections: 3241, centrality: 0.79 },
  { entity: 'BRZ-001 Amazon Mangrove', type: 'Project', connections: 2847, centrality: 0.76 },
  { entity: 'IPCC Framework', type: 'Policy', connections: 2401, centrality: 0.72 },
  { entity: 'Coral Triangle', type: 'Ecosystem', connections: 1984, centrality: 0.68 },
  { entity: 'EU Taxonomy Regulation', type: 'Policy', connections: 1742, centrality: 0.64 },
];

// Simulated graph visualization nodes
const GRAPH_NODES = [
  { id: 1, label: 'Atlas Sanctum', type: 'Organization', x: 50, y: 50, size: 24 },
  { id: 2, label: 'BRZ-001', type: 'Project', x: 25, y: 30, size: 16 },
  { id: 3, label: 'AUS-007', type: 'Project', x: 72, y: 35, size: 14 },
  { id: 4, label: 'KEN-012', type: 'Project', x: 55, y: 72, size: 13 },
  { id: 5, label: 'Carbon Credits', type: 'Asset', x: 15, y: 55, size: 18 },
  { id: 6, label: 'BioCredits', type: 'Asset', x: 82, y: 60, size: 15 },
  { id: 7, label: 'Gold Standard', type: 'Organization', x: 40, y: 18, size: 14 },
  { id: 8, label: 'Verra VCS', type: 'Organization', x: 75, y: 15, size: 13 },
  { id: 9, label: 'Amazon Basin', type: 'Ecosystem', x: 20, y: 78, size: 17 },
  { id: 10, label: 'Coral Triangle', type: 'Ecosystem', x: 82, y: 82, size: 15 },
  { id: 11, label: 'EU Taxonomy', type: 'Policy', x: 62, y: 20, size: 12 },
  { id: 12, label: 'RSA Finance', type: 'Asset', x: 38, y: 82, size: 13 },
];

const GRAPH_EDGES = [
  [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
  [2, 5], [2, 7], [2, 9],
  [3, 6], [3, 8], [3, 10],
  [4, 5], [4, 9],
  [7, 2], [7, 3],
  [8, 3], [8, 6],
  [11, 5], [11, 6],
  [9, 12], [12, 1],
];

const nodeColors: Record<string, string> = {
  Organization: '#10b981',
  Project: '#06b6d4',
  Asset: '#f59e0b',
  Ecosystem: '#84cc16',
  Policy: '#64748b',
};

export function KnowledgeGraphExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<typeof GRAPH_NODES[0] | null>(null);
  const [zoom, setZoom] = useState(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Knowledge Graph Explorer</h2>
          <p className="text-emerald-300/70">
            42,319 nodes · 189,742 edges · real-time entity relationship graph
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
            <Download className="w-4 h-4 mr-2" />
            Export Graph
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync
          </Button>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Nodes', value: '42,319', sub: '+3,847 this month', icon: Database },
          { label: 'Total Edges', value: '189,742', sub: '+18,240 this month', icon: Link2 },
          { label: 'Entity Types', value: '24', sub: 'Distinct types', icon: Layers },
          { label: 'Avg Degree', value: '9.4', sub: 'Connections per node', icon: GitBranch },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-400 text-xs">{m.label}</span>
                <Icon className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-white text-xl font-bold">{m.value}</div>
              <div className="text-emerald-300/50 text-xs mt-1">{m.sub}</div>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="graph">
        <TabsList className="bg-slate-800/60 border border-emerald-500/20">
          <TabsTrigger value="graph" className="data-[state=active]:bg-emerald-600">Live Graph</TabsTrigger>
          <TabsTrigger value="entities" className="data-[state=active]:bg-emerald-600">Entity Types</TabsTrigger>
          <TabsTrigger value="relationships" className="data-[state=active]:bg-emerald-600">Relationships</TabsTrigger>
          <TabsTrigger value="paths" className="data-[state=active]:bg-emerald-600">Path Finder</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-emerald-600">Graph Analytics</TabsTrigger>
        </TabsList>

        {/* ── Live Graph ── */}
        <TabsContent value="graph" className="mt-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 overflow-hidden">
            {/* Graph toolbar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-emerald-500/20">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-400/60" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search entities…"
                    className="pl-8 pr-3 py-1.5 bg-slate-800/60 border border-emerald-500/20 rounded-lg text-white text-xs focus:outline-none focus:border-emerald-500/50 w-52"
                  />
                </div>
                <div className="flex gap-1">
                  {Object.entries(nodeColors).map(([type, color]) => (
                    <button key={type} className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-slate-800/40 text-emerald-300/60 hover:bg-slate-700/60 transition-all">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setZoom((z) => Math.min(z + 0.2, 2))} className="p-1.5 rounded hover:bg-slate-700/60 text-emerald-300/60 hover:text-emerald-300 transition-all">
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button onClick={() => setZoom((z) => Math.max(z - 0.2, 0.5))} className="p-1.5 rounded hover:bg-slate-700/60 text-emerald-300/60 hover:text-emerald-300 transition-all">
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded hover:bg-slate-700/60 text-emerald-300/60 hover:text-emerald-300 transition-all">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3">
              {/* SVG Graph Canvas */}
              <div className="md:col-span-2 relative bg-slate-950/60 overflow-hidden" style={{ height: 420 }}>
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.2s' }}
                >
                  {/* Grid dots */}
                  <defs>
                    <pattern id="graphGrid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="0" cy="0" r="0.3" fill="#10b98130" />
                    </pattern>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
                      <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  <rect width="100" height="100" fill="url(#graphGrid)" />

                  {/* Edges */}
                  {GRAPH_EDGES.map(([from, to], i) => {
                    const a = GRAPH_NODES.find((n) => n.id === from)!;
                    const b = GRAPH_NODES.find((n) => n.id === to)!;
                    return (
                      <line
                        key={i}
                        x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                        stroke="#10b98140"
                        strokeWidth="0.4"
                      />
                    );
                  })}

                  {/* Nodes */}
                  {GRAPH_NODES.map((node) => (
                    <g key={node.id} onClick={() => setSelectedNode(node)} style={{ cursor: 'pointer' }}>
                      {selectedNode?.id === node.id && (
                        <circle cx={node.x} cy={node.y} r={node.size / 6 + 3} fill={nodeColors[node.type]} opacity={0.15} />
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.size / 6}
                        fill={nodeColors[node.type]}
                        filter="url(#glow)"
                        opacity={0.9}
                      />
                      <circle cx={node.x} cy={node.y} r={node.size / 6} fill="none" stroke={nodeColors[node.type]} strokeWidth="0.5" opacity={0.6} />
                      {node.size >= 14 && (
                        <text x={node.x} y={node.y + node.size / 6 + 2} textAnchor="middle" fill="#6ee7b7" fontSize="2.2" opacity={0.7}>
                          {node.label}
                        </text>
                      )}
                    </g>
                  ))}
                </svg>
              </div>

              {/* Node detail panel */}
              <div className="border-l border-emerald-500/15 p-4 space-y-4">
                {selectedNode ? (
                  <>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: nodeColors[selectedNode.type] }} />
                        <span className="text-white font-semibold text-sm">{selectedNode.label}</span>
                      </div>
                      <Badge className="bg-slate-700/50 text-slate-300 border-0 text-xs">{selectedNode.type}</Badge>
                    </div>
                    <div className="space-y-2 text-xs">
                      {[
                        { label: 'Node ID', value: `node-${selectedNode.id}` },
                        { label: 'Type', value: selectedNode.type },
                        { label: 'Connections', value: (selectedNode.size * 120).toLocaleString() },
                        { label: 'Centrality', value: (0.94 - selectedNode.id * 0.04).toFixed(2) },
                        { label: 'Last Updated', value: '2 min ago' },
                      ].map((p) => (
                        <div key={p.label} className="flex justify-between">
                          <span className="text-emerald-300/50">{p.label}</span>
                          <span className="text-white">{p.value}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full border-emerald-500/30 text-emerald-300 text-xs">
                      <Eye className="w-3 h-3 mr-1.5" />
                      View Full Profile
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-8">
                    <GitBranch className="w-8 h-8 text-emerald-400/30 mb-3" />
                    <p className="text-emerald-300/40 text-sm">Click a node to explore its relationships</p>
                  </div>
                )}

                <div className="border-t border-emerald-500/10 pt-3">
                  <div className="text-emerald-300/50 text-xs font-medium mb-2">Node Legend</div>
                  {Object.entries(nodeColors).map(([type, color]) => (
                    <div key={type} className="flex items-center gap-2 text-xs text-emerald-300/60 mb-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                      {type}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* ── Entity Types ── */}
        <TabsContent value="entities" className="mt-4 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {entityTypes.map((e) => (
              <Card key={e.type} className="bg-slate-900/50 border-emerald-500/20 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color }} />
                    <span className="text-white font-medium text-sm">{e.type}</span>
                  </div>
                  <span className="text-white font-bold">{e.count.toLocaleString()}</span>
                </div>
                <div className="text-emerald-300/50 text-xs mb-2">{e.description}</div>
                <div className="w-full bg-slate-700/40 rounded-full h-1.5">
                  <div className="rounded-full h-1.5" style={{ width: `${(e.count / 12340) * 100}%`, backgroundColor: e.color }} />
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── Relationships ── */}
        <TabsContent value="relationships" className="mt-4 space-y-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <h3 className="text-white text-sm font-semibold mb-4">Relationship Type Distribution</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={relationshipTypes} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" horizontal={false} />
                <XAxis type="number" stroke="#6ee7b7" fontSize={10} />
                <YAxis type="category" dataKey="rel" stroke="#6ee7b7" fontSize={10} width={80} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]} name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <div className="space-y-2">
            {relationshipTypes.map((r) => (
              <div key={r.rel} className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
                <div>
                  <code className="text-emerald-300 text-xs font-mono">{r.rel}</code>
                  <p className="text-emerald-300/50 text-xs mt-0.5">{r.description}</p>
                </div>
                <span className="text-white font-medium text-sm">{r.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* ── Path Finder ── */}
        <TabsContent value="paths" className="mt-4 space-y-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <h3 className="text-white text-sm font-semibold mb-4">Shortest Path Discovery</h3>
            <div className="grid md:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-emerald-300/60 text-xs mb-1 block">Source Entity</label>
                <input className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50" defaultValue="Atlas Sanctum Foundation" />
              </div>
              <div>
                <label className="text-emerald-300/60 text-xs mb-1 block">Target Entity</label>
                <input className="w-full bg-slate-800/60 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50" defaultValue="Amazon REDD+ Carbon Credits" />
              </div>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 mb-5">
              <GitBranch className="w-4 h-4 mr-2" />
              Find Paths
            </Button>

            <h4 className="text-white text-xs font-semibold mb-3">Discovered Paths</h4>
            {samplePaths.map((p, i) => (
              <div key={i} className="p-4 bg-slate-800/40 rounded-xl mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium text-sm">{p.from} → {p.to}</span>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">{p.hops} hops</Badge>
                    <Badge className="bg-blue-400/20 text-blue-300 border-0 text-xs">strength {p.strength}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  {p.path.map((step, j) => (
                    <span key={j} className={`text-xs px-2 py-0.5 rounded ${step.startsWith('→') ? 'text-emerald-300/50' : 'bg-slate-700/50 text-emerald-200'}`}>
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Card>
        </TabsContent>

        {/* ── Graph Analytics ── */}
        <TabsContent value="analytics" className="mt-4 space-y-4">
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <h3 className="text-white text-sm font-semibold mb-4">Graph Growth Over Time</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={graphGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                <XAxis dataKey="month" stroke="#6ee7b7" fontSize={11} />
                <YAxis yAxisId="left" stroke="#6ee7b7" fontSize={11} />
                <YAxis yAxisId="right" orientation="right" stroke="#6ee7b7" fontSize={11} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} />
                <Line yAxisId="left" type="monotone" dataKey="nodes" stroke="#10b981" dot={false} strokeWidth={2} name="Nodes" />
                <Line yAxisId="right" type="monotone" dataKey="edges" stroke="#06b6d4" dot={false} strokeWidth={2} name="Edges" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <div className="space-y-2">
            <h3 className="text-white text-sm font-semibold">Top Connected Entities (by Centrality)</h3>
            {topConnected.map((e, i) => (
              <div key={e.entity} className="flex items-center gap-4 p-3 bg-slate-800/40 rounded-xl">
                <span className="text-emerald-400/60 text-xs w-5">{i + 1}</span>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">{e.entity}</div>
                  <div className="text-emerald-300/50 text-xs">{e.type}</div>
                </div>
                <div className="text-right">
                  <div className="text-white text-sm">{e.connections.toLocaleString()}</div>
                  <div className="text-emerald-300/50 text-xs">connections</div>
                </div>
                <div className="w-20">
                  <div className="w-full bg-slate-700/40 rounded-full h-1.5">
                    <div className="bg-emerald-500 rounded-full h-1.5" style={{ width: `${e.centrality * 100}%` }} />
                  </div>
                  <div className="text-emerald-400 text-xs text-right mt-0.5">{e.centrality}</div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
