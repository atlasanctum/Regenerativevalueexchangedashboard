import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { CheckCircle2, XCircle, AlertTriangle, Eye, FileText, Image as ImageIcon, BarChart3, FileCheck, Shield, Signature } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { ScrollArea } from '../ui/scroll-area';

const reviewQueue = [
  {
    id: 'SUB-0441',
    project: 'Nairobi Water Purification',
    submitter: '0x742d...bEb3',
    timestamp: '12 min ago',
    confidence: 94,
    category: 'Water Quality',
    priority: 'high',
  },
  {
    id: 'SUB-0440',
    project: 'Soil Regeneration Program',
    submitter: '0x8f3e...4a2c',
    timestamp: '28 min ago',
    confidence: 87,
    category: 'Soil Health',
    priority: 'medium',
  },
  {
    id: 'SUB-0439',
    project: 'Education Cohort Delta',
    submitter: '0x1a5b...9d7e',
    timestamp: '45 min ago',
    confidence: 76,
    category: 'Education',
    priority: 'medium',
  },
  {
    id: 'SUB-0438',
    project: 'Waste Diversion Initiative',
    submitter: '0x6c2d...3f8a',
    timestamp: '1 hour ago',
    confidence: 91,
    category: 'Waste Management',
    priority: 'high',
  },
  {
    id: 'SUB-0437',
    project: 'Forest Restoration Beta',
    submitter: '0x9b4a...1e5c',
    timestamp: '2 hours ago',
    confidence: 68,
    category: 'Reforestation',
    priority: 'low',
  },
];

const evidenceFiles = {
  photos: [
    { name: 'before_filtration_01.jpg', hash: 'QmX7K9dF2nP4vL8wY3hM6tR1sN5cB9jE4', timestamp: '2025-03-01 08:15' },
    { name: 'after_filtration_01.jpg', hash: 'QmR4mT9sL3nE6wP8vK2xN5hB7cD1jF4qA', timestamp: '2025-03-01 18:45' },
    { name: 'equipment_setup.jpg', hash: 'QmT5pL2mN8eP6vR3wK9hB4cD7jF1qA5gH', timestamp: '2025-03-01 09:00' },
  ],
  sensors: [
    { name: 'ph_readings_march.csv', hash: 'bafybeigdyrzt5sfp7udm7hu76uh7y26', rows: 720, timestamp: '2025-03-01 23:59' },
    { name: 'turbidity_data.csv', hash: 'bafkreie5cvhpc6gk5azayr7bcaewak', rows: 720, timestamp: '2025-03-01 23:59' },
    { name: 'flow_rate_hourly.csv', hash: 'bafybeif2ewg3hm57xll6v2b6bx6lfr', rows: 168, timestamp: '2025-03-01 23:59' },
  ],
  geo: [
    { name: 'location_coordinates.json', hash: 'QmY8mK3dP9fN2vL5wR7hM4tB6sC1jE8qG', lat: -1.286389, lng: 36.817223 },
  ],
};

const reasonCodes = [
  { code: 'INSUFFICIENT_EVIDENCE', label: 'Insufficient Evidence' },
  { code: 'DATA_MISMATCH', label: 'Data Mismatch' },
  { code: 'LOCATION_INVALID', label: 'Invalid Location' },
  { code: 'DUPLICATE_SUBMISSION', label: 'Duplicate Submission' },
  { code: 'METHODOLOGY_ERROR', label: 'Methodology Error' },
  { code: 'QUALITY_BELOW_THRESHOLD', label: 'Quality Below Threshold' },
];

export function OracleAuditorConsole() {
  const [selectedSubmission, setSelectedSubmission] = useState(reviewQueue[0]);
  const [permanence, setPermanence] = useState([75]);
  const [equityMultiplier, setEquityMultiplier] = useState([85]);
  const [scarcityCoefficient, setScarcityCoefficient] = useState([65]);
  const [confidence, setConfidence] = useState([94]);
  const [disputeReason, setDisputeReason] = useState('');
  const [isSigningAttestation, setIsSigningAttestation] = useState(false);

  const handleApprove = () => {
    setIsSigningAttestation(true);
    setTimeout(() => {
      setIsSigningAttestation(false);
      // Show success message
    }, 2000);
  };

  const totalScore = Math.round(
    (permanence[0] * 0.3 + equityMultiplier[0] * 0.25 + scarcityCoefficient[0] * 0.25 + confidence[0] * 0.2)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Oracle Auditor Console</h2>
          <p className="text-emerald-300/70 mt-1">Review, score, and verify impact submissions</p>
        </div>
        <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-300">
          <Shield className="w-3 h-3 mr-1" />
          Oracle Committee
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-4">
          <p className="text-emerald-300/70 text-sm mb-1">Queue</p>
          <p className="text-3xl font-bold text-white">{reviewQueue.length}</p>
          <p className="text-emerald-300/50 text-xs mt-1">Pending review</p>
        </Card>
        <Card className="bg-black/40 border-green-500/20 backdrop-blur-sm p-4">
          <p className="text-green-300/70 text-sm mb-1">Approved Today</p>
          <p className="text-3xl font-bold text-green-400">47</p>
          <p className="text-green-300/50 text-xs mt-1">+12% vs yesterday</p>
        </Card>
        <Card className="bg-black/40 border-red-500/20 backdrop-blur-sm p-4">
          <p className="text-red-300/70 text-sm mb-1">Disputed</p>
          <p className="text-3xl font-bold text-red-400">3</p>
          <p className="text-red-300/50 text-xs mt-1">Requires attention</p>
        </Card>
        <Card className="bg-black/40 border-blue-500/20 backdrop-blur-sm p-4">
          <p className="text-blue-300/70 text-sm mb-1">Avg Confidence</p>
          <p className="text-3xl font-bold text-blue-400">89%</p>
          <p className="text-blue-300/50 text-xs mt-1">This week</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Review Queue */}
        <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Review Queue</h3>
          <ScrollArea className="h-[600px]">
            <div className="space-y-3">
              {reviewQueue.map((submission) => (
                <div
                  key={submission.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedSubmission.id === submission.id
                      ? 'bg-emerald-500/20 border-emerald-500/50'
                      : 'bg-slate-800/50 border-emerald-500/10 hover:border-emerald-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono text-sm">{submission.id}</span>
                      <Badge
                        variant="outline"
                        className={
                          submission.priority === 'high'
                            ? 'bg-red-500/10 border-red-500/30 text-red-300'
                            : submission.priority === 'medium'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                            : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                        }
                      >
                        {submission.priority}
                      </Badge>
                    </div>
                    <span className="text-emerald-300/50 text-xs">{submission.timestamp}</span>
                  </div>
                  <p className="text-white text-sm font-medium mb-2">{submission.project}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-300/70 text-xs">{submission.category}</span>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 text-sm font-semibold">{submission.confidence}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Evidence Viewer & Scoring */}
        <div className="lg:col-span-2 space-y-6">
          {/* Evidence Diff Viewer */}
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Evidence Review: {selectedSubmission.id}</h3>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="border-emerald-500/30">
                    <Eye className="w-4 h-4 mr-2" />
                    View All Files
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-slate-900 border-emerald-500/30 text-white w-[600px]">
                  <SheetHeader>
                    <SheetTitle className="text-white">Evidence Files</SheetTitle>
                  </SheetHeader>
                  <Tabs defaultValue="photos" className="mt-6">
                    <TabsList className="bg-black/40 border border-emerald-500/20">
                      <TabsTrigger value="photos">Photos</TabsTrigger>
                      <TabsTrigger value="sensors">Sensor Data</TabsTrigger>
                      <TabsTrigger value="geo">Geolocation</TabsTrigger>
                    </TabsList>
                    <TabsContent value="photos" className="space-y-3 mt-4">
                      {evidenceFiles.photos.map((file, idx) => (
                        <div key={idx} className="p-3 bg-slate-800 rounded-lg border border-emerald-500/10">
                          <div className="flex items-start gap-3">
                            <ImageIcon className="w-5 h-5 text-emerald-400 mt-1" />
                            <div className="flex-1">
                              <p className="text-white text-sm font-medium">{file.name}</p>
                              <p className="text-emerald-300/50 text-xs font-mono mt-1">{file.hash}</p>
                              <p className="text-emerald-300/50 text-xs mt-1">{file.timestamp}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="sensors" className="space-y-3 mt-4">
                      {evidenceFiles.sensors.map((file, idx) => (
                        <div key={idx} className="p-3 bg-slate-800 rounded-lg border border-emerald-500/10">
                          <div className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-blue-400 mt-1" />
                            <div className="flex-1">
                              <p className="text-white text-sm font-medium">{file.name}</p>
                              <p className="text-emerald-300/50 text-xs font-mono mt-1">{file.hash}</p>
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-emerald-300/50 text-xs">{file.timestamp}</p>
                                <p className="text-emerald-400 text-xs">{file.rows} rows</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="geo" className="space-y-3 mt-4">
                      {evidenceFiles.geo.map((file, idx) => (
                        <div key={idx} className="p-3 bg-slate-800 rounded-lg border border-emerald-500/10">
                          <div className="flex items-start gap-3">
                            <FileCheck className="w-5 h-5 text-purple-400 mt-1" />
                            <div className="flex-1">
                              <p className="text-white text-sm font-medium">{file.name}</p>
                              <p className="text-emerald-300/50 text-xs font-mono mt-1">{file.hash}</p>
                              <p className="text-emerald-400 text-xs mt-1">
                                {file.lat}, {file.lng}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </SheetContent>
              </Sheet>
            </div>

            {/* Before/After Comparison */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-emerald-300 text-sm">Before</Label>
                <div className="aspect-video bg-slate-800 rounded-lg border border-emerald-500/10 flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 text-emerald-400/50 mx-auto mb-2" />
                    <p className="text-emerald-300/50 text-sm">before_filtration_01.jpg</p>
                  </div>
                </div>
                <div className="p-2 bg-slate-800/50 rounded text-xs">
                  <p className="text-emerald-300/70">Timestamp: 2025-03-01 08:15</p>
                  <p className="text-emerald-300/70 font-mono mt-1">QmX7K9...9jE4</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-emerald-300 text-sm">After</Label>
                <div className="aspect-video bg-slate-800 rounded-lg border border-emerald-500/10 flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 text-emerald-400/50 mx-auto mb-2" />
                    <p className="text-emerald-300/50 text-sm">after_filtration_01.jpg</p>
                  </div>
                </div>
                <div className="p-2 bg-slate-800/50 rounded text-xs">
                  <p className="text-emerald-300/70">Timestamp: 2025-03-01 18:45</p>
                  <p className="text-emerald-300/70 font-mono mt-1">QmR4mT9...jF4qA</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Scoring Panel */}
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Impact Scoring</h3>
            <div className="space-y-6">
              {/* Permanence */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-emerald-300">Permanence</Label>
                  <span className="text-emerald-400 font-semibold">{permanence[0]}%</span>
                </div>
                <Slider
                  value={permanence}
                  onValueChange={setPermanence}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                />
                <p className="text-emerald-300/50 text-xs">How long will this impact last?</p>
              </div>

              {/* Equity Multiplier */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-emerald-300">Equity Multiplier (Region)</Label>
                  <span className="text-emerald-400 font-semibold">{equityMultiplier[0]}%</span>
                </div>
                <Slider
                  value={equityMultiplier}
                  onValueChange={setEquityMultiplier}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                />
                <p className="text-emerald-300/50 text-xs">Regional priority & equity considerations</p>
              </div>

              {/* Scarcity Coefficient */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-emerald-300">Scarcity Coefficient</Label>
                  <span className="text-emerald-400 font-semibold">{scarcityCoefficient[0]}%</span>
                </div>
                <Slider
                  value={scarcityCoefficient}
                  onValueChange={setScarcityCoefficient}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                />
                <p className="text-emerald-300/50 text-xs">Resource scarcity in this region</p>
              </div>

              {/* Confidence */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-emerald-300">Confidence</Label>
                  <span className="text-emerald-400 font-semibold">{confidence[0]}%</span>
                </div>
                <Slider
                  value={confidence}
                  onValueChange={setConfidence}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                />
                <p className="text-emerald-300/50 text-xs">Quality & reliability of evidence</p>
              </div>

              {/* Total Score */}
              <div className="p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-300 font-medium">Total Impact Score</span>
                  <span className="text-3xl font-bold text-emerald-400">{totalScore}%</span>
                </div>
                <div className="mt-2 text-xs text-emerald-300/70">
                  Permanence (30%) · Equity (25%) · Scarcity (25%) · Confidence (20%)
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            {/* Approve */}
            <Card className="bg-black/40 border-green-500/20 backdrop-blur-sm p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Approve Submission</h4>
              <Button
                onClick={handleApprove}
                disabled={isSigningAttestation}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isSigningAttestation ? (
                  <>
                    <Signature className="w-4 h-4 mr-2 animate-pulse" />
                    Signing EIP-712...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Sign Attestation
                  </>
                )}
              </Button>
              <p className="text-green-300/70 text-xs mt-3">
                This will finalize the submission and mint RGN credits
              </p>
            </Card>

            {/* Dispute */}
            <Sheet>
              <SheetTrigger asChild>
                <Card className="bg-black/40 border-red-500/20 backdrop-blur-sm p-6 cursor-pointer hover:border-red-500/40 transition-colors">
                  <h4 className="text-lg font-semibold text-white mb-4">Dispute Submission</h4>
                  <Button variant="outline" className="w-full border-red-500/30 text-red-300 hover:bg-red-500/10">
                    <XCircle className="w-4 h-4 mr-2" />
                    Open Dispute
                  </Button>
                  <p className="text-red-300/70 text-xs mt-3">Flag issues with evidence or methodology</p>
                </Card>
              </SheetTrigger>
              <SheetContent className="bg-slate-900 border-emerald-500/30 text-white">
                <SheetHeader>
                  <SheetTitle className="text-white">Dispute Submission</SheetTitle>
                </SheetHeader>
                <div className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label className="text-emerald-300">Reason Code</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {reasonCodes.map((reason) => (
                        <Button
                          key={reason.code}
                          variant="outline"
                          className="justify-start border-emerald-500/30 hover:bg-red-500/10 hover:border-red-500/50"
                          onClick={() => setDisputeReason(reason.code)}
                        >
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          {reason.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-emerald-300">Additional Details</Label>
                    <Textarea
                      placeholder="Provide specific details about the issue..."
                      className="bg-slate-800 border-emerald-500/30 text-white min-h-[120px]"
                    />
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <XCircle className="w-4 h-4 mr-2" />
                    Submit Dispute
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
