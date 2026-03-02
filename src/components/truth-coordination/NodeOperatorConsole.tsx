import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Upload, MapPin, Users, CheckCircle2, Clock, AlertCircle, XCircle, Wallet, TrendingUp, FileCheck, Camera, Database } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';

const projectData = {
  name: 'Nairobi Water Purification Initiative',
  location: 'Kibera, Nairobi, Kenya',
  category: 'Water Quality',
  methodology: 'Bio-sand Filtration',
  beneficiaries: 4250,
  status: 'active',
};

const submissions = [
  { id: 'SUB-0439', date: '2025-03-02', status: 'finalized', flow: 287.50, rgn: 14375, impact: '15,400 L/day' },
  { id: 'SUB-0438', date: '2025-03-01', status: 'validated', flow: 275.20, rgn: 13760, impact: '14,800 L/day' },
  { id: 'SUB-0437', date: '2025-02-28', status: 'pending', flow: 0, rgn: 0, impact: '15,100 L/day' },
  { id: 'SUB-0436', date: '2025-02-27', status: 'finalized', flow: 292.10, rgn: 14605, impact: '15,700 L/day' },
  { id: 'SUB-0435', date: '2025-02-26', status: 'disputed', flow: 0, rgn: 0, impact: '13,900 L/day' },
];

const payoutHistory = [
  { date: '2025-03-02', type: 'Impact Reward', flow: 287.50, rgn: 14375, txHash: '0xf4a3...b8c2' },
  { date: '2025-03-01', type: 'Impact Reward', flow: 275.20, rgn: 13760, txHash: '0x9e2d...4f1a' },
  { date: '2025-02-27', type: 'Impact Reward', flow: 292.10, rgn: 14605, txHash: '0x7c1b...3e9d' },
  { date: '2025-02-25', type: 'Bonus - Quality', flow: 50.00, rgn: 2500, txHash: '0x4a8c...2d7f' },
  { date: '2025-02-20', type: 'Impact Reward', flow: 283.40, rgn: 14170, txHash: '0x1d5e...9a3b' },
];

export function NodeOperatorConsole() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Node Operator Console</h2>
          <p className="text-emerald-300/70 mt-1">Submit impact data & manage your regenerative operations</p>
        </div>
        <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-300">
          Project Implementer
        </Badge>
      </div>

      {/* Project Info Card */}
      <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-2xl font-semibold text-white">{projectData.name}</h3>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                {projectData.status}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <div>
                  <p className="text-xs text-emerald-300/50">Location</p>
                  <p className="text-sm text-white">{projectData.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <div>
                  <p className="text-xs text-emerald-300/50">Methodology</p>
                  <p className="text-sm text-white">{projectData.methodology}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <div>
                  <p className="text-xs text-emerald-300/50">Beneficiaries</p>
                  <p className="text-sm text-white">{projectData.beneficiaries.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="submit" className="space-y-6">
        <TabsList className="bg-black/40 border border-emerald-500/20">
          <TabsTrigger value="submit">Submit Impact</TabsTrigger>
          <TabsTrigger value="status">Submission Status</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>

        {/* Submit Impact Tab */}
        <TabsContent value="submit" className="space-y-6">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">New Impact Submission</h3>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-emerald-300/70">Step {currentStep} of 3</span>
                <span className="text-sm text-emerald-300/70">{Math.round((currentStep / 3) * 100)}% Complete</span>
              </div>
              <Progress value={(currentStep / 3) * 100} className="h-2" />
              <div className="flex justify-between mt-4">
                <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-emerald-400' : 'text-emerald-300/30'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                    {currentStep > 1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
                  </div>
                  <span className="text-sm">Project Details</span>
                </div>
                <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-emerald-400' : 'text-emerald-300/30'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                    {currentStep > 2 ? <CheckCircle2 className="w-5 h-5" /> : '2'}
                  </div>
                  <span className="text-sm">Upload Evidence</span>
                </div>
                <div className={`flex items-center gap-2 ${currentStep >= 3 ? 'text-emerald-400' : 'text-emerald-300/30'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                    3
                  </div>
                  <span className="text-sm">Review & Submit</span>
                </div>
              </div>
            </div>

            {/* Step 1: Project Details */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="period" className="text-emerald-300">Reporting Period</Label>
                    <Input
                      id="period"
                      type="date"
                      className="bg-slate-800 border-emerald-500/30 text-white"
                      defaultValue="2025-03-02"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-emerald-300">Impact Category</Label>
                    <Select defaultValue="water">
                      <SelectTrigger className="bg-slate-800 border-emerald-500/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="water">Water Purification</SelectItem>
                        <SelectItem value="soil">Soil Regeneration</SelectItem>
                        <SelectItem value="waste">Waste Diversion</SelectItem>
                        <SelectItem value="forest">Forest Restoration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="impact" className="text-emerald-300">Impact Metrics</Label>
                  <Textarea
                    id="impact"
                    placeholder="Describe the measurable impact (e.g., liters purified, hectares restored, tonnes diverted)"
                    className="bg-slate-800 border-emerald-500/30 text-white min-h-[100px]"
                    defaultValue="Water purification system processed 15,400 liters per day during this reporting period, serving 237 households in Kibera community."
                  />
                </div>

                <Button
                  onClick={() => setCurrentStep(2)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  Next: Upload Evidence
                </Button>
              </div>
            )}

            {/* Step 2: Upload Evidence */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Sensor Data Upload */}
                  <div className="space-y-2">
                    <Label className="text-emerald-300">Sensor Data Package</Label>
                    <div
                      className="border-2 border-dashed border-emerald-500/30 rounded-lg p-8 text-center hover:border-emerald-500/50 transition-colors cursor-pointer bg-slate-800/50"
                      onClick={handleFileUpload}
                    >
                      <Database className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                      <p className="text-white text-sm mb-1">Upload CSV/JSON</p>
                      <p className="text-emerald-300/50 text-xs">pH, turbidity, flow rate data</p>
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-2">
                    <Label className="text-emerald-300">Before/After Photos</Label>
                    <div className="border-2 border-dashed border-emerald-500/30 rounded-lg p-8 text-center hover:border-emerald-500/50 transition-colors cursor-pointer bg-slate-800/50">
                      <Camera className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                      <p className="text-white text-sm mb-1">Upload Images</p>
                      <p className="text-emerald-300/50 text-xs">JPG, PNG up to 10MB each</p>
                    </div>
                  </div>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-emerald-300">Uploading & computing checksum...</span>
                      <span className="text-emerald-300">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                {uploadProgress === 100 && (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                      <div>
                        <p className="text-green-300 font-medium">Files uploaded successfully</p>
                        <p className="text-green-300/70 text-sm mt-1">
                          Checksum: <span className="font-mono">0x7f3a...b9e4</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    onClick={() => setCurrentStep(1)}
                    variant="outline"
                    className="flex-1 border-emerald-500/30"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    disabled={uploadProgress !== 100}
                  >
                    Next: Review
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-800/50 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="text-emerald-300/70">Reporting Period:</span>
                    <span className="text-white">March 2, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/70">Impact Category:</span>
                    <span className="text-white">Water Purification</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/70">Files Uploaded:</span>
                    <span className="text-white">5 files (3 CSV, 2 JPG)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/70">Data Checksum:</span>
                    <span className="text-white font-mono text-sm">0x7f3a...b9e4</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    Your submission will be reviewed by oracle auditors. Estimated processing time: 2-4 hours.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    variant="outline"
                    className="flex-1 border-emerald-500/30"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentStep(1);
                      setUploadProgress(0);
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  >
                    Submit for Review
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Submission Status Tab */}
        <TabsContent value="status">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Submission History</h3>
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-500/20">
                  <TableHead className="text-emerald-300">ID</TableHead>
                  <TableHead className="text-emerald-300">Date</TableHead>
                  <TableHead className="text-emerald-300">Status</TableHead>
                  <TableHead className="text-emerald-300">Impact</TableHead>
                  <TableHead className="text-emerald-300 text-right">FLOW Earned</TableHead>
                  <TableHead className="text-emerald-300 text-right">RGN Minted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((sub) => (
                  <TableRow key={sub.id} className="border-emerald-500/10">
                    <TableCell className="text-white font-mono text-sm">{sub.id}</TableCell>
                    <TableCell className="text-emerald-300/70">{sub.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          sub.status === 'finalized'
                            ? 'bg-green-500/10 border-green-500/30 text-green-300'
                            : sub.status === 'validated'
                            ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                            : sub.status === 'disputed'
                            ? 'bg-red-500/10 border-red-500/30 text-red-300'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                        }
                      >
                        {sub.status === 'finalized' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {sub.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                        {sub.status === 'disputed' && <XCircle className="w-3 h-3 mr-1" />}
                        {sub.status === 'validated' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {sub.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-emerald-300 font-mono text-sm">{sub.impact}</TableCell>
                    <TableCell className="text-right text-white font-mono">{sub.flow.toFixed(2)}</TableCell>
                    <TableCell className="text-right text-emerald-400 font-mono">{sub.rgn.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Earnings Tab */}
        <TabsContent value="earnings" className="space-y-6">
          {/* Wallet Balance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/30 p-6">
              <div className="flex items-center justify-between mb-2">
                <Wallet className="w-5 h-5 text-emerald-400" />
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-emerald-300/70 text-sm mb-1">FLOW Balance</p>
              <p className="text-3xl font-bold text-white">1,248.30</p>
              <p className="text-emerald-300/70 text-xs mt-2">≈ $12,483 USD</p>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 p-6">
              <div className="flex items-center justify-between mb-2">
                <Wallet className="w-5 h-5 text-blue-400" />
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-blue-300/70 text-sm mb-1">RGN Minted</p>
              <p className="text-3xl font-bold text-white">62,415</p>
              <p className="text-blue-300/70 text-xs mt-2">Lifetime total</p>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-purple-300/70 text-sm mb-1">This Month</p>
              <p className="text-3xl font-bold text-white">+$3,247</p>
              <p className="text-green-300 text-xs mt-2">+24% vs last month</p>
            </Card>
          </div>

          {/* Payout History */}
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Payout History</h3>
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-500/20">
                  <TableHead className="text-emerald-300">Date</TableHead>
                  <TableHead className="text-emerald-300">Type</TableHead>
                  <TableHead className="text-emerald-300 text-right">FLOW</TableHead>
                  <TableHead className="text-emerald-300 text-right">RGN</TableHead>
                  <TableHead className="text-emerald-300">Transaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payoutHistory.map((payout, idx) => (
                  <TableRow key={idx} className="border-emerald-500/10">
                    <TableCell className="text-emerald-300/70">{payout.date}</TableCell>
                    <TableCell className="text-white">{payout.type}</TableCell>
                    <TableCell className="text-right text-emerald-400 font-mono">{payout.flow.toFixed(2)}</TableCell>
                    <TableCell className="text-right text-blue-400 font-mono">{payout.rgn.toLocaleString()}</TableCell>
                    <TableCell className="text-emerald-300/70 font-mono text-sm">{payout.txHash}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
