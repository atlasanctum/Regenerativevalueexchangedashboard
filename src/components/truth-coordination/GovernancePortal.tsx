import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Vote, TrendingUp, DollarSign, Shield, Clock, CheckCircle2, XCircle, Users, AlertCircle, ArrowUpDown, Wallet, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const proposals = [
  {
    id: 'PROP-045',
    title: 'Increase Oracle Committee Size',
    description: 'Expand oracle committee from 7 to 12 members to improve decentralization',
    status: 'active',
    votesFor: 4250000,
    votesAgainst: 890000,
    quorum: 3000000,
    deadline: '2025-03-08',
    proposer: '0x742d...bEb3',
    type: 'governance',
  },
  {
    id: 'PROP-044',
    title: 'Adjust Protocol Fee to 1.5%',
    description: 'Reduce protocol fee from 2% to 1.5% to incentivize more project submissions',
    status: 'active',
    votesFor: 3150000,
    votesAgainst: 1240000,
    quorum: 3000000,
    deadline: '2025-03-05',
    proposer: '0x9b4a...1e5c',
    type: 'economic',
  },
  {
    id: 'PROP-043',
    title: 'Update Confidence Threshold to 85%',
    description: 'Lower minimum confidence score for approval from 90% to 85%',
    status: 'passed',
    votesFor: 5420000,
    votesAgainst: 780000,
    quorum: 3000000,
    deadline: '2025-03-01',
    proposer: '0x1a5b...9d7e',
    type: 'oracle',
  },
  {
    id: 'PROP-042',
    title: 'Increase Monthly Mint Cap',
    description: 'Raise monthly RGN mint cap from 1M to 1.5M to support growth',
    status: 'rejected',
    votesFor: 1850000,
    votesAgainst: 3890000,
    quorum: 3000000,
    deadline: '2025-02-28',
    proposer: '0x6c2d...3f8a',
    type: 'economic',
  },
];

const treasuryData = {
  balance: 8734250,
  inflows: [
    { month: 'Sep', amount: 142000 },
    { month: 'Oct', amount: 178000 },
    { month: 'Nov', amount: 215000 },
    { month: 'Dec', amount: 298000 },
    { month: 'Jan', amount: 342000 },
    { month: 'Feb', amount: 389000 },
  ],
  outflows: [
    { date: '2025-03-01', type: 'Grant', amount: 50000, recipient: 'Nairobi Water Initiative', category: 'Project Funding' },
    { date: '2025-02-25', type: 'Buyback', amount: 120000, recipient: 'RGN Liquidity Pool', category: 'Market Operations' },
    { date: '2025-02-20', type: 'Grant', amount: 35000, recipient: 'Oracle Auditor Training', category: 'Infrastructure' },
    { date: '2025-02-15', type: 'Operations', amount: 28000, recipient: 'Platform Development', category: 'Development' },
  ],
  allocation: [
    { name: 'Project Grants', value: 45, color: '#10b981' },
    { name: 'Market Operations', value: 25, color: '#3b82f6' },
    { name: 'Development', value: 15, color: '#8b5cf6' },
    { name: 'Infrastructure', value: 10, color: '#f59e0b' },
    { name: 'Reserve', value: 5, color: '#6b7280' },
  ],
};

const timelockSchedule = [
  {
    id: 'TL-089',
    action: 'Update Oracle Rewards',
    executeAt: '2025-03-05 14:00 UTC',
    proposal: 'PROP-043',
    status: 'scheduled',
    daysRemaining: 3,
  },
  {
    id: 'TL-088',
    action: 'Deploy New Verification Contract',
    executeAt: '2025-03-10 12:00 UTC',
    proposal: 'PROP-041',
    status: 'scheduled',
    daysRemaining: 8,
  },
  {
    id: 'TL-087',
    action: 'Enable Cross-Chain Bridge',
    executeAt: '2025-03-15 16:00 UTC',
    proposal: 'PROP-040',
    status: 'pending',
    daysRemaining: 13,
  },
];

export function GovernancePortal() {
  const [selectedProposal, setSelectedProposal] = useState(proposals[0]);
  const [voteAmount, setVoteAmount] = useState(1000);
  const [delegateAddress, setDelegateAddress] = useState('');
  const [newProposalTitle, setNewProposalTitle] = useState('');
  const [newProposalDescription, setNewProposalDescription] = useState('');
  const [proposalType, setProposalType] = useState('governance');

  const totalVotes = selectedProposal.votesFor + selectedProposal.votesAgainst;
  const forPercentage = (selectedProposal.votesFor / totalVotes) * 100;
  const againstPercentage = (selectedProposal.votesAgainst / totalVotes) * 100;
  const quorumMet = totalVotes >= selectedProposal.quorum;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Governance Portal</h2>
          <p className="text-emerald-300/70 mt-1">
            Steward Accountability Network - Protocol governance & treasury management
          </p>
        </div>
        <Badge variant="outline" className="bg-violet-500/10 border-violet-500/30 text-violet-300">
          <Shield className="w-3 h-3 mr-1" />
          SAN Member
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-4">
          <p className="text-emerald-300/70 text-sm mb-1">Active Proposals</p>
          <p className="text-3xl font-bold text-white">{proposals.filter((p) => p.status === 'active').length}</p>
        </Card>
        <Card className="bg-black/40 border-blue-500/20 backdrop-blur-sm p-4">
          <p className="text-blue-300/70 text-sm mb-1">Your Voting Power</p>
          <p className="text-3xl font-bold text-blue-400">125,000</p>
        </Card>
        <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm p-4">
          <p className="text-purple-300/70 text-sm mb-1">Treasury Balance</p>
          <p className="text-3xl font-bold text-purple-400">${(treasuryData.balance / 1000).toFixed(1)}M</p>
        </Card>
        <Card className="bg-black/40 border-amber-500/20 backdrop-blur-sm p-4">
          <p className="text-amber-300/70 text-sm mb-1">Timelock Queue</p>
          <p className="text-3xl font-bold text-amber-400">{timelockSchedule.length}</p>
        </Card>
      </div>

      <Tabs defaultValue="proposals" className="space-y-6">
        <TabsList className="bg-black/40 border border-emerald-500/20">
          <TabsTrigger value="proposals">
            <Vote className="w-4 h-4 mr-2" />
            Proposals
          </TabsTrigger>
          <TabsTrigger value="treasury">
            <DollarSign className="w-4 h-4 mr-2" />
            Treasury
          </TabsTrigger>
          <TabsTrigger value="voting">
            <Users className="w-4 h-4 mr-2" />
            Voting Power
          </TabsTrigger>
          <TabsTrigger value="timelock">
            <Clock className="w-4 h-4 mr-2" />
            Timelock
          </TabsTrigger>
        </TabsList>

        {/* Proposals Tab */}
        <TabsContent value="proposals" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Proposal List */}
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">All Proposals</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      New Proposal
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-emerald-500/30 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Proposal</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label className="text-emerald-300">Proposal Type</Label>
                        <Select value={proposalType} onValueChange={setProposalType}>
                          <SelectTrigger className="bg-slate-800 border-emerald-500/30 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="governance">Governance</SelectItem>
                            <SelectItem value="economic">Economic Parameters</SelectItem>
                            <SelectItem value="oracle">Oracle System</SelectItem>
                            <SelectItem value="treasury">Treasury Allocation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-emerald-300">Title</Label>
                        <Input
                          placeholder="Brief, descriptive title"
                          value={newProposalTitle}
                          onChange={(e) => setNewProposalTitle(e.target.value)}
                          className="bg-slate-800 border-emerald-500/30 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-emerald-300">Description</Label>
                        <Textarea
                          placeholder="Detailed explanation of the proposed change, rationale, and expected impact..."
                          value={newProposalDescription}
                          onChange={(e) => setNewProposalDescription(e.target.value)}
                          className="bg-slate-800 border-emerald-500/30 text-white min-h-[150px]"
                        />
                      </div>
                      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <p className="text-blue-300 text-sm">
                          Proposal creation requires 100,000 voting power and will be subject to a 7-day voting
                          period.
                        </p>
                      </div>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Submit Proposal</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              {proposals.map((proposal) => (
                <Card
                  key={proposal.id}
                  onClick={() => setSelectedProposal(proposal)}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedProposal.id === proposal.id
                      ? 'bg-emerald-500/20 border-emerald-500/50'
                      : 'bg-slate-800/50 border-emerald-500/10 hover:border-emerald-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-white font-mono text-sm">{proposal.id}</span>
                    <Badge
                      variant="outline"
                      className={
                        proposal.status === 'active'
                          ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                          : proposal.status === 'passed'
                          ? 'bg-green-500/10 border-green-500/30 text-green-300'
                          : 'bg-red-500/10 border-red-500/30 text-red-300'
                      }
                    >
                      {proposal.status}
                    </Badge>
                  </div>
                  <p className="text-white text-sm font-medium mb-2">{proposal.title}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-300">
                      {proposal.type}
                    </Badge>
                    <span className="text-emerald-300/50 text-xs">
                      {proposal.status === 'active' ? `Ends ${proposal.deadline}` : proposal.deadline}
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Proposal Details & Voting */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-semibold text-white">{selectedProposal.title}</h3>
                      <Badge
                        variant="outline"
                        className={
                          selectedProposal.status === 'active'
                            ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                            : selectedProposal.status === 'passed'
                            ? 'bg-green-500/10 border-green-500/30 text-green-300'
                            : 'bg-red-500/10 border-red-500/30 text-red-300'
                        }
                      >
                        {selectedProposal.status}
                      </Badge>
                    </div>
                    <p className="text-emerald-300/70 text-sm">{selectedProposal.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-3 bg-slate-800/50 rounded-lg">
                    <p className="text-emerald-300/70 text-xs mb-1">Proposer</p>
                    <p className="text-white font-mono text-sm">{selectedProposal.proposer}</p>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-lg">
                    <p className="text-emerald-300/70 text-xs mb-1">Type</p>
                    <p className="text-white text-sm capitalize">{selectedProposal.type}</p>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-lg">
                    <p className="text-emerald-300/70 text-xs mb-1">Deadline</p>
                    <p className="text-white text-sm">{selectedProposal.deadline}</p>
                  </div>
                </div>

                {/* Voting Results */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">Voting Results</span>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-300/70 text-sm">
                        {totalVotes.toLocaleString()} / {selectedProposal.quorum.toLocaleString()} votes
                      </span>
                      {quorumMet ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-400" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <span className="text-white">For</span>
                        </div>
                        <span className="text-green-400 font-semibold">
                          {selectedProposal.votesFor.toLocaleString()} ({forPercentage.toFixed(1)}%)
                        </span>
                      </div>
                      <Progress value={forPercentage} className="h-2 bg-slate-700">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${forPercentage}%` }} />
                      </Progress>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-400" />
                          <span className="text-white">Against</span>
                        </div>
                        <span className="text-red-400 font-semibold">
                          {selectedProposal.votesAgainst.toLocaleString()} ({againstPercentage.toFixed(1)}%)
                        </span>
                      </div>
                      <Progress value={againstPercentage} className="h-2 bg-slate-700">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: `${againstPercentage}%` }} />
                      </Progress>
                    </div>
                  </div>

                  {selectedProposal.status === 'active' && (
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <Button className="bg-green-600 hover:bg-green-700">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Vote For
                      </Button>
                      <Button variant="outline" className="border-red-500/30 text-red-300 hover:bg-red-500/10">
                        <XCircle className="w-4 h-4 mr-2" />
                        Vote Against
                      </Button>
                    </div>
                  )}
                </div>
              </Card>

              {/* Parameter Diff Viewer */}
              {selectedProposal.type === 'economic' && (
                <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Parameter Changes</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-300/70">Protocol Fee</span>
                        <div className="flex items-center gap-3">
                          <span className="text-red-400 line-through">2.0%</span>
                          <ArrowDownToLine className="w-4 h-4 text-emerald-400" />
                          <span className="text-green-400 font-semibold">1.5%</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <p className="text-blue-300 text-sm">
                        Expected impact: Reduce protocol revenue by ~25%, but increase submission volume by estimated
                        35%
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Treasury Tab */}
        <TabsContent value="treasury" className="space-y-6">
          {/* Treasury Balance */}
          <Card className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-300/70 mb-2">Total Treasury Balance</p>
                <p className="text-5xl font-bold text-white">${treasuryData.balance.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-emerald-300/70 text-sm mb-1">Monthly Growth</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-2xl font-bold text-green-400">+32%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Treasury Flows */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Monthly Inflows</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={treasuryData.inflows}>
                  <defs>
                    <linearGradient id="colorInflows" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#10b981" opacity={0.1} />
                  <XAxis dataKey="month" stroke="#6ee7b7" />
                  <YAxis stroke="#6ee7b7" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorInflows)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Allocation Breakdown</h3>
              <div className="space-y-3">
                {treasuryData.allocation.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white text-sm">{item.name}</span>
                      <span className="text-emerald-400 font-semibold">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-2 bg-slate-700">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${item.value}%`, backgroundColor: item.color }}
                      />
                    </Progress>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Outflows */}
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Outflows</h3>
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-500/20">
                  <TableHead className="text-emerald-300">Date</TableHead>
                  <TableHead className="text-emerald-300">Type</TableHead>
                  <TableHead className="text-emerald-300">Recipient</TableHead>
                  <TableHead className="text-emerald-300">Category</TableHead>
                  <TableHead className="text-emerald-300 text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {treasuryData.outflows.map((outflow, idx) => (
                  <TableRow key={idx} className="border-emerald-500/10">
                    <TableCell className="text-emerald-300/70">{outflow.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          outflow.type === 'Grant'
                            ? 'bg-green-500/10 border-green-500/30 text-green-300'
                            : outflow.type === 'Buyback'
                            ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                            : 'bg-purple-500/10 border-purple-500/30 text-purple-300'
                        }
                      >
                        {outflow.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white">{outflow.recipient}</TableCell>
                    <TableCell className="text-emerald-300/70">{outflow.category}</TableCell>
                    <TableCell className="text-right text-emerald-400 font-mono">
                      ${outflow.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Voting Power Tab */}
        <TabsContent value="voting" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Your Voting Power</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-6 h-6 text-blue-400" />
                      <div>
                        <p className="text-blue-300/70 text-sm">Total Voting Power</p>
                        <p className="text-3xl font-bold text-white">125,000</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-300">
                      Active
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-800/50 rounded-lg flex items-center justify-between">
                    <span className="text-emerald-300/70">Direct Holdings</span>
                    <span className="text-white font-mono">85,000</span>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-lg flex items-center justify-between">
                    <span className="text-emerald-300/70">Delegated to You</span>
                    <span className="text-white font-mono">40,000</span>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-lg flex items-center justify-between">
                    <span className="text-emerald-300/70">Delegated by You</span>
                    <span className="text-white font-mono">0</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Delegate Voting Power</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-emerald-300">Delegate Address</Label>
                  <Input
                    placeholder="0x..."
                    value={delegateAddress}
                    onChange={(e) => setDelegateAddress(e.target.value)}
                    className="bg-slate-800 border-emerald-500/30 text-white font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-emerald-300">Amount</Label>
                  <Input
                    type="number"
                    value={voteAmount}
                    onChange={(e) => setVoteAmount(Number(e.target.value))}
                    className="bg-slate-800 border-emerald-500/30 text-white"
                  />
                </div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    Delegating voting power allows another address to vote on your behalf. You can revoke delegation at
                    any time.
                  </p>
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Delegate Votes
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Timelock Tab */}
        <TabsContent value="timelock" className="space-y-6">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Timelock Schedule</h3>
              <Badge variant="outline" className="bg-amber-500/10 border-amber-500/30 text-amber-300">
                <Clock className="w-3 h-3 mr-1" />
                {timelockSchedule.filter((t) => t.status === 'scheduled').length} Scheduled
              </Badge>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-500/20">
                  <TableHead className="text-emerald-300">ID</TableHead>
                  <TableHead className="text-emerald-300">Action</TableHead>
                  <TableHead className="text-emerald-300">Execute At</TableHead>
                  <TableHead className="text-emerald-300">Proposal</TableHead>
                  <TableHead className="text-emerald-300">Status</TableHead>
                  <TableHead className="text-emerald-300 text-right">Time Remaining</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timelockSchedule.map((item) => (
                  <TableRow key={item.id} className="border-emerald-500/10">
                    <TableCell className="text-white font-mono text-sm">{item.id}</TableCell>
                    <TableCell className="text-white">{item.action}</TableCell>
                    <TableCell className="text-emerald-300/70">{item.executeAt}</TableCell>
                    <TableCell className="text-emerald-300 font-mono text-sm">{item.proposal}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          item.status === 'scheduled'
                            ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-emerald-400">{item.daysRemaining} days</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Card className="bg-black/40 border-blue-500/20 backdrop-blur-sm p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-blue-300 font-medium mb-2">About Timelock</p>
                <p className="text-blue-300/70 text-sm">
                  The timelock mechanism ensures protocol changes are executed safely with a delay period. Once a
                  proposal passes, it enters the timelock queue where it must wait for the specified delay before
                  execution. This gives the community time to review changes and exit if needed.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
