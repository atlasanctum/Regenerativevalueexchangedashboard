import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { useNavigate } from 'react-router';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  FileText, FileSpreadsheet, Presentation, Network, Mail, BookOpen,
  Upload, Search, Brain, Database, GitBranch, Globe, Shield, Zap,
  CheckCircle, Clock, AlertTriangle, TrendingUp, Layers, ArrowRight,
  Eye, Link, Activity,
} from 'lucide-react';

const ingestionVolume = [
  { month: 'Feb', docs: 1240, entities: 28400, graphs: 342 },
  { month: 'Mar', docs: 1890, entities: 43200, graphs: 521 },
  { month: 'Apr', docs: 2340, entities: 58700, graphs: 704 },
  { month: 'May', docs: 3120, entities: 74100, graphs: 891 },
  { month: 'Jun', docs: 4280, entities: 98400, graphs: 1140 },
  { month: 'Jul', docs: 5870, entities: 134700, graphs: 1482 },
];

const recentJobs = [
  { id: 'DOC-8847', name: 'Amazon Basin REDD+ Assessment Q2 2026.docx', type: 'Word', size: '4.2 MB', status: 'Complete', entities: 147, duration: '8.4s', confidence: 97 },
  { id: 'DOC-8846', name: 'Carbon Portfolio Model v3.xlsx', type: 'Excel', size: '2.8 MB', status: 'Complete', entities: 84, duration: '12.1s', confidence: 99 },
  { id: 'DOC-8845', name: 'Board Presentation - Atlas Phase 3.pptx', type: 'PowerPoint', size: '18.4 MB', status: 'Processing', entities: 0, duration: '—', confidence: 0 },
  { id: 'DOC-8844', name: 'Kenya Conservation Trust Legal Agreement.pdf', type: 'PDF', size: '1.1 MB', status: 'Complete', entities: 203, duration: '6.2s', confidence: 94 },
  { id: 'DOC-8843', name: 'Biodiversity Credit Framework v2.1.md', type: 'Markdown', size: '89 KB', status: 'Complete', entities: 62, duration: '1.8s', confidence: 98 },
  { id: 'DOC-8842', name: 'Stakeholder Network Diagram.vsdx', type: 'Visio', size: '3.7 MB', status: 'Queued', entities: 0, duration: '—', confidence: 0 },
];

const knowledgeEntities = [
  { type: 'Organizations', count: 8_472, growth: '+14.2%', color: 'bg-emerald-400' },
  { type: 'People', count: 3_891, growth: '+9.7%', color: 'bg-blue-400' },
  { type: 'Projects', count: 2_134, growth: '+21.4%', color: 'bg-purple-400' },
  { type: 'Ecosystems', count: 1_847, growth: '+18.1%', color: 'bg-teal-400' },
  { type: 'Carbon Assets', count: 12_340, growth: '+31.8%', color: 'bg-amber-400' },
  { type: 'Biodiversity Assets', count: 4_621, growth: '+28.4%', color: 'bg-rose-400' },
  { type: 'Policies', count: 2_890, growth: '+7.3%', color: 'bg-indigo-400' },
  { type: 'Financial Assets', count: 6_714, growth: '+16.9%', color: 'bg-cyan-400' },
];

const pipelineStages = [
  { stage: 'Upload & Detection', latency: '< 100ms', throughput: '500 docs/min', status: 'Healthy' },
  { stage: 'Format Parsing', latency: '200ms – 4s', throughput: '120 docs/min', status: 'Healthy' },
  { stage: 'OCR & Image Understanding', latency: '1 – 8s', throughput: '60 docs/min', status: 'Healthy' },
  { stage: 'NLP Entity Extraction', latency: '500ms – 3s', throughput: '200 docs/min', status: 'Healthy' },
  { stage: 'Table Recognition', latency: '300ms – 2s', throughput: '150 docs/min', status: 'Healthy' },
  { stage: 'Relationship Mapping', latency: '1 – 5s', throughput: '80 docs/min', status: 'Degraded' },
  { stage: 'Knowledge Graph Write', latency: '50 – 200ms', throughput: '400 docs/min', status: 'Healthy' },
  { stage: 'Embedding Generation', latency: '200ms – 1s', throughput: '300 docs/min', status: 'Healthy' },
  { stage: 'Vector Index Write', latency: '20 – 80ms', throughput: '1000 docs/min', status: 'Healthy' },
];

const rveIntegrations = [
  { os: 'Knowledge OS', description: 'Enterprise search across 134K+ extracted entities', documents: 5870, status: 'Active', route: '/intelligence/query' },
  { os: 'Trust OS', description: 'Provenance, version history, and audit trails for every document', documents: 5870, status: 'Active', route: '/verification/hub' },
  { os: 'Opportunity OS', description: 'Auto-extracted funding pipelines, project proposals, and investment mandates', documents: 2134, status: 'Active', route: '/trading/hub' },
  { os: 'Climate OS', description: 'Carbon accounting sheets, REDD+ reports, and biodiversity assessments parsed into RIUs', documents: 4280, status: 'Active', route: '/verification/3d-sites' },
  { os: 'Governance OS', description: 'Policy docs, board minutes, and resolutions → structured governance records', documents: 2890, status: 'Active', route: '/governance' },
  { os: 'Atlas Deal Engine', description: 'Legal agreements and term sheets ingested and analyzed for deal scoring', documents: 1340, status: 'Active', route: '/atlas/deal-engine' },
  { os: 'Atlas Trust Engine', description: 'Third-party certifications and audit reports feed trust scoring model', documents: 987, status: 'Active', route: '/atlas/trust-engine' },
  { os: 'Marketplace', description: 'Approved datasets and reports published as exchangeable knowledge assets', documents: 621, status: 'Beta', route: '/trading/p2p' },
];

const docTypeConfig: Record<string, { icon: React.FC<any>; color: string; label: string }> = {
  Word: { icon: FileText, color: 'text-blue-400', label: 'Word' },
  Excel: { icon: FileSpreadsheet, color: 'text-emerald-400', label: 'Excel' },
  PowerPoint: { icon: Presentation, color: 'text-orange-400', label: 'PowerPoint' },
  Visio: { icon: Network, color: 'text-purple-400', label: 'Visio' },
  Outlook: { icon: Mail, color: 'text-cyan-400', label: 'Outlook' },
  OneNote: { icon: BookOpen, color: 'text-amber-400', label: 'OneNote' },
  PDF: { icon: FileText, color: 'text-rose-400', label: 'PDF' },
  Markdown: { icon: FileText, color: 'text-teal-400', label: 'Markdown' },
};

const supportedFormats = [
  { group: 'Microsoft Office', formats: ['Word (.docx)', 'Excel (.xlsx)', 'PowerPoint (.pptx)', 'Visio (.vsdx)', 'Outlook (.msg / .pst)', 'OneNote (.one)'] },
  { group: 'Documents & Data', formats: ['PDF', 'CSV', 'JSON', 'XML', 'HTML', 'Markdown'] },
  { group: 'Media & Visual', formats: ['PNG', 'JPEG', 'TIFF', 'WEBP', 'SVG', 'HEIC'] },
  { group: 'Structured Data', formats: ['GeoJSON', 'NetCDF', 'HDF5', 'Parquet', 'Arrow'] },
];

export function DocumentIntelligenceHub() {
  const navigate = useNavigate();
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Document Intelligence Layer</h2>
          <p className="text-emerald-300/70">
            Transform enterprise documents into structured knowledge — parsed, embedded, and reasoned over by the RVE
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
            <Search className="w-4 h-4 mr-2" />
            Semantic Search
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload Documents
          </Button>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label: 'Documents Indexed', value: '5,870', sub: '+1,590 this month', icon: FileText, ok: true },
          { label: 'Entities Extracted', value: '134,700', sub: '+36,300 this month', icon: Brain, ok: true },
          { label: 'Knowledge Graph Nodes', value: '1,482', sub: 'Active relationships', icon: GitBranch, ok: true },
          { label: 'Avg Pipeline Latency', value: '4.2s', sub: 'End-to-end median', icon: Zap, ok: true },
          { label: 'RAG Query Accuracy', value: '94.8%', sub: 'Citation match rate', icon: CheckCircle, ok: true },
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

      <Tabs defaultValue="upload">
        <TabsList className="bg-slate-800/60 border border-emerald-500/20">
          <TabsTrigger value="upload" className="data-[state=active]:bg-emerald-600">Upload & Ingest</TabsTrigger>
          <TabsTrigger value="jobs" className="data-[state=active]:bg-emerald-600">Processing Jobs</TabsTrigger>
          <TabsTrigger value="knowledge" className="data-[state=active]:bg-emerald-600">Knowledge Graph</TabsTrigger>
          <TabsTrigger value="pipeline" className="data-[state=active]:bg-emerald-600">Pipeline Health</TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-emerald-600">RVE Integrations</TabsTrigger>
          <TabsTrigger value="formats" className="data-[state=active]:bg-emerald-600">Supported Formats</TabsTrigger>
        </TabsList>

        {/* ── UPLOAD ── */}
        <TabsContent value="upload" className="mt-4 space-y-4">
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
            className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${dragOver ? 'border-emerald-400 bg-emerald-400/10' : 'border-emerald-500/30 bg-slate-900/30 hover:border-emerald-500/50'}`}
          >
            <div className="w-16 h-16 bg-emerald-400/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-1">Drop documents here</h3>
            <p className="text-emerald-300/60 text-sm mb-4">Word, Excel, PowerPoint, PDF, Visio, CSV, Markdown, JSON, images and more</p>
            <div className="flex justify-center gap-3">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Browse Files</Button>
              <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
                <Link className="w-4 h-4 mr-2" />
                Connect SharePoint / OneDrive
              </Button>
              <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-400/10">
                <Database className="w-4 h-4 mr-2" />
                Connect S3 / GCS
              </Button>
            </div>
          </div>

          {/* Processing pipeline diagram */}
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <h3 className="text-white font-semibold text-sm mb-5">Document Intelligence Pipeline</h3>
            <div className="flex items-center gap-1 overflow-x-auto pb-2">
              {[
                { label: 'Upload', sub: 'Multi-format', icon: Upload },
                { label: 'Parse', sub: 'Format-native', icon: FileText },
                { label: 'OCR', sub: 'Multi-lingual', icon: Eye },
                { label: 'Extract', sub: 'NLP + Vision', icon: Brain },
                { label: 'Tables', sub: 'Schema detect', icon: FileSpreadsheet },
                { label: 'Knowledge Graph', sub: 'Neo4j', icon: GitBranch },
                { label: 'Embeddings', sub: 'Claude + E5', icon: Layers },
                { label: 'Vector Store', sub: 'Qdrant', icon: Database },
                { label: 'RAG Layer', sub: 'Claude 4 Opus', icon: Zap },
              ].map((step, i, arr) => (
                <div key={step.label} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center gap-1 px-3 py-2 bg-slate-800/60 rounded-xl border border-emerald-500/20 min-w-[90px] text-center">
                    <step.icon className="w-4 h-4 text-emerald-400" />
                    <span className="text-white text-xs font-medium">{step.label}</span>
                    <span className="text-emerald-300/40 text-[10px]">{step.sub}</span>
                  </div>
                  {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-emerald-500/40 mx-0.5 flex-shrink-0" />}
                </div>
              ))}
            </div>
          </Card>

          {/* Ingestion volume chart */}
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <h3 className="text-white text-sm font-semibold mb-4">Ingestion Volume — Last 6 Months</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={ingestionVolume}>
                <defs>
                  <linearGradient id="docGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" />
                <XAxis dataKey="month" stroke="#6ee7b7" fontSize={11} />
                <YAxis stroke="#6ee7b7" fontSize={11} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} />
                <Area type="monotone" dataKey="docs" stroke="#10b981" fill="url(#docGrad)" name="Documents" />
                <Area type="monotone" dataKey="graphs" stroke="#06b6d4" fill="transparent" strokeWidth={2} name="Graph Nodes (×10)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* ── JOBS ── */}
        <TabsContent value="jobs" className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {['All', 'Complete', 'Processing', 'Queued', 'Failed'].map((f) => (
                <button key={f} className="px-3 py-1.5 rounded-lg text-xs border border-emerald-500/20 text-emerald-300/70 hover:bg-emerald-400/10 transition-all">
                  {f}
                </button>
              ))}
            </div>
            <div className="text-emerald-300/50 text-xs">Showing 6 of 5,870 jobs</div>
          </div>

          {recentJobs.map((job) => {
            const cfg = docTypeConfig[job.type] ?? docTypeConfig['PDF'];
            const Icon = cfg.icon;
            const statusColor = job.status === 'Complete' ? 'bg-emerald-400/20 text-emerald-300'
              : job.status === 'Processing' ? 'bg-blue-400/20 text-blue-300'
              : job.status === 'Queued' ? 'bg-slate-500/30 text-slate-300'
              : 'bg-rose-400/20 text-rose-300';

            return (
              <Card key={job.id} className="bg-slate-900/50 border-emerald-500/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className={`w-4 h-4 ${cfg.color}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-white text-sm font-medium truncate">{job.name}</div>
                      <div className="text-emerald-300/50 text-xs flex items-center gap-2 mt-0.5">
                        <span>{job.id}</span>
                        <span>·</span>
                        <span>{job.size}</span>
                        <span>·</span>
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 flex-shrink-0 ml-4">
                    {job.status === 'Complete' && (
                      <>
                        <div className="text-right">
                          <div className="text-emerald-300/50 text-xs">Entities</div>
                          <div className="text-white font-medium text-sm">{job.entities}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-emerald-300/50 text-xs">Confidence</div>
                          <div className="text-emerald-400 font-medium text-sm">{job.confidence}%</div>
                        </div>
                        <div className="text-right">
                          <div className="text-emerald-300/50 text-xs">Duration</div>
                          <div className="text-white text-sm">{job.duration}</div>
                        </div>
                      </>
                    )}
                    {job.status === 'Processing' && (
                      <div className="flex items-center gap-2 text-blue-300 text-xs">
                        <Activity className="w-3 h-3 animate-pulse" />
                        Running NLP extraction…
                      </div>
                    )}
                    <Badge className={`border-0 text-xs ${statusColor}`}>{job.status}</Badge>
                  </div>
                </div>
              </Card>
            );
          })}
        </TabsContent>

        {/* ── KNOWLEDGE GRAPH ── */}
        <TabsContent value="knowledge" className="mt-4 space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Total Nodes', value: '42,319', icon: GitBranch },
              { label: 'Total Edges', value: '189,742', icon: Link },
              { label: 'Entity Types', value: '24', icon: Layers },
              { label: 'Graph DB Size', value: '847 GB', icon: Database },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <Card key={s.label} className="bg-slate-900/50 border-emerald-500/20 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-400 text-xs">{s.label}</span>
                    <Icon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-white text-xl font-bold">{s.value}</div>
                </Card>
              );
            })}
          </div>

          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <h3 className="text-white text-sm font-semibold mb-4">Entity Counts by Type</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={knowledgeEntities} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f" horizontal={false} />
                <XAxis type="number" stroke="#6ee7b7" fontSize={10} />
                <YAxis type="category" dataKey="type" stroke="#6ee7b7" fontSize={10} width={110} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]} name="Entities" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            {knowledgeEntities.map((e) => (
              <div key={e.type} className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl border border-emerald-500/10">
                <div className={`w-2.5 h-2.5 rounded-full ${e.color}`} />
                <div className="flex-1">
                  <div className="text-white text-sm">{e.type}</div>
                </div>
                <div className="text-white font-semibold text-sm">{e.count.toLocaleString()}</div>
                <div className="text-emerald-400 text-xs">{e.growth}</div>
              </div>
            ))}
          </div>

          {/* RVE canonical schema preview */}
          <Card className="bg-slate-900/50 border-emerald-500/20 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-emerald-500/20 bg-slate-950/50">
              <span className="text-emerald-300/50 text-xs">RVE Canonical Knowledge Object Schema</span>
              <Badge className="bg-emerald-400/20 text-emerald-300 border-0 text-xs">v2.4</Badge>
            </div>
            <pre className="p-4 text-xs text-emerald-200/80 font-mono leading-relaxed overflow-x-auto">{`{
  "document_id": "DOC-8847",
  "title": "Amazon Basin REDD+ Assessment Q2 2026",
  "type": "word",
  "owner": "atlas@sanctum.earth",
  "organization": "Atlas Sanctum Foundation",
  "language": "en",
  "created": "2026-06-14T09:22:00Z",
  "updated": "2026-07-01T14:38:00Z",
  "summary": "Quarterly assessment of carbon sequestration...",
  "entities": [{ "type": "Organization", "name": "IBAMA", "confidence": 0.98 }, ...],
  "relationships": [{ "from": "Project:BRZ-001", "rel": "ASSESSED_BY", "to": "Org:IBAMA" }],
  "tables": [{ "id": "t1", "rows": 84, "schema": ["Date","Hectares","tCO2e"] }],
  "images": [{ "id": "img1", "caption": "Canopy density map", "ocr": "..." }],
  "charts": [{ "id": "c1", "type": "time-series", "extracted_data": [...] }],
  "tasks": ["Submit REDD+ verification by Q3 2026"],
  "risks": [{ "description": "Deforestation pressure from...", "severity": "high" }],
  "opportunities": [{ "description": "Additional 12,000 ha eligible for VCS..." }],
  "embeddings": { "model": "claude-4-opus", "dimensions": 3072 },
  "citations": [{ "doc_id": "DOC-7421", "relevance": 0.94 }],
  "blockchain_hash": "0x7f3a...c9e2",
  "version": 3,
  "audit_trail": [...]
}`}</pre>
          </Card>
        </TabsContent>

        {/* ── PIPELINE HEALTH ── */}
        <TabsContent value="pipeline" className="mt-4 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white text-sm font-semibold">Pipeline operational — 1 stage degraded</span>
          </div>
          {pipelineStages.map((s, i) => (
            <Card key={s.stage} className={`border p-4 ${s.status === 'Degraded' ? 'bg-amber-900/10 border-amber-500/30' : 'bg-slate-900/50 border-emerald-500/20'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border border-emerald-500/30 text-emerald-400">
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{s.stage}</div>
                    <div className="text-emerald-300/50 text-xs mt-0.5">Latency: {s.latency} · Throughput: {s.throughput}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {s.status === 'Degraded' && (
                    <span className="text-amber-300 text-xs flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      High queue depth — scaling
                    </span>
                  )}
                  <Badge className={`border-0 text-xs ${s.status === 'Healthy' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-amber-400/20 text-amber-300'}`}>
                    {s.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}

          {/* Multi-language support */}
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <h3 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              Multilingual Processing
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {['English', 'Spanish', 'Portuguese', 'French', 'Swahili', 'Mandarin', 'Arabic', 'Hindi'].map((lang) => (
                <div key={lang} className="flex items-center gap-1.5 text-xs text-emerald-300/70">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  {lang}
                </div>
              ))}
            </div>
            <div className="mt-3 text-emerald-300/40 text-xs">+48 additional languages via Claude 4 Opus multilingual inference</div>
          </Card>

          {/* Storage backends */}
          <Card className="bg-slate-900/50 border-emerald-500/20 p-5">
            <h3 className="text-white text-sm font-semibold mb-4 flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              Storage Backends
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { store: 'PostgreSQL', role: 'Transactional records, metadata, access control', size: '2.4 TB', status: 'Healthy' },
                { store: 'Object Storage (R2)', role: 'Original documents, images, binary assets', size: '18.7 TB', status: 'Healthy' },
                { store: 'Neo4j Graph DB', role: 'Entity relationships, knowledge graph', size: '847 GB', status: 'Healthy' },
                { store: 'Qdrant Vector DB', role: 'Semantic embeddings for RAG retrieval', size: '1.2 TB', status: 'Healthy' },
              ].map((b) => (
                <div key={b.store} className="p-3 bg-slate-800/40 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium text-sm">{b.store}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-300/50 text-xs">{b.size}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                  </div>
                  <div className="text-emerald-300/50 text-xs">{b.role}</div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* ── RVE INTEGRATIONS ── */}
        <TabsContent value="integrations" className="mt-4 space-y-3">
          <p className="text-emerald-300/60 text-sm">
            Every parsed document feeds the corresponding RVE operating layer — knowledge becomes action.
          </p>
          {rveIntegrations.map((item) => (
            <Card key={item.os} className="bg-slate-900/50 border-emerald-500/20 p-4 hover:border-emerald-500/40 transition-all cursor-pointer" onClick={() => navigate(item.route)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-400/15 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-white font-semibold text-sm">{item.os}</span>
                      <Badge className={`border-0 text-xs ${item.status === 'Active' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-amber-400/20 text-amber-300'}`}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="text-emerald-300/60 text-xs">{item.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-emerald-300/50 text-xs">Documents</div>
                    <div className="text-white font-medium text-sm">{item.documents.toLocaleString()}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-400/50" />
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* ── SUPPORTED FORMATS ── */}
        <TabsContent value="formats" className="mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            {supportedFormats.map((group) => (
              <Card key={group.group} className="bg-slate-900/50 border-emerald-500/20 p-5">
                <h3 className="text-white font-semibold text-sm mb-3">{group.group}</h3>
                <div className="space-y-2">
                  {group.formats.map((fmt) => (
                    <div key={fmt} className="flex items-center gap-2 text-xs text-emerald-300/70">
                      <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      {fmt}
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            <Card className="bg-slate-900/50 border-emerald-500/20 p-5 md:col-span-2">
              <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                Security, Access & Provenance
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Role-Based Access Control', sub: 'Org / team / document-level permissions' },
                  { label: 'AES-256 Encryption', sub: 'At rest and in transit, key rotation' },
                  { label: 'Audit Logging', sub: 'Every read, write, and query event' },
                  { label: 'Data Lineage', sub: 'Full provenance from upload → decision' },
                  { label: 'Blockchain Attestation', sub: 'Document hash anchored on-chain' },
                  { label: 'Version History', sub: 'Immutable revision graph per document' },
                ].map((f) => (
                  <div key={f.label} className="p-3 bg-slate-800/40 rounded-lg">
                    <div className="text-white text-xs font-medium mb-0.5">{f.label}</div>
                    <div className="text-emerald-300/50 text-xs">{f.sub}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
