import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  Brain, TrendingUp, AlertTriangle, CheckCircle2, Info, BarChart3,
  Cpu, GitBranch, FileText, Users, Target, Zap, Award, LineChart, PieChart
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, Cell } from 'recharts';

// Model performance metrics
const modelMetrics = {
  soilCarbon: {
    name: 'Soil Carbon Sequestration',
    version: 'v3.2.1',
    accuracy: 89.4,
    mae: 0.24,
    r2: 0.89,
    status: 'production',
    lastTrained: '2026-01-15',
    predictions: 12847,
    explainability: 94
  },
  forestRestoration: {
    name: 'Forest Restoration Impact',
    version: 'v2.5.0',
    accuracy: 91.2,
    mae: 2.3,
    r2: 0.91,
    status: 'production',
    lastTrained: '2026-02-20',
    predictions: 8421,
    explainability: 88
  },
  waterQuality: {
    name: 'Water Quality Forecasting',
    version: 'v1.8.3',
    accuracy: 94.1,
    mae: 0.8,
    r2: 0.94,
    status: 'production',
    lastTrained: '2026-03-01',
    predictions: 45632,
    explainability: 92
  }
};

// Feature importance for soil carbon model
const featureImportance = [
  { feature: 'Rainfall', importance: 32, type: 'Climate' },
  { feature: 'Baseline SOC', importance: 28, type: 'Soil' },
  { feature: 'Cover Crops', importance: 18, type: 'Management' },
  { feature: 'Temperature', importance: 12, type: 'Climate' },
  { feature: 'Soil pH', importance: 5, type: 'Soil' },
  { feature: 'Tillage Type', importance: 3, type: 'Management' },
  { feature: 'Elevation', importance: 2, type: 'Geography' }
];

// Example prediction with explanation
const examplePrediction = {
  input: {
    rainfall: 1050,
    baselineSOC: 1.8,
    coverCrops: 'Yes',
    temperature: 23.5,
    soilPH: 6.5,
    tillageType: 'No-till',
    elevation: 1650
  },
  prediction: 1.35,
  uncertainty: 0.28,
  confidence: 91,
  shapValues: [
    { feature: 'Rainfall (+50mm above avg)', contribution: +0.15, color: 'green' },
    { feature: 'Cover Crops (Yes)', contribution: +0.12, color: 'green' },
    { feature: 'Baseline SOC (Good)', contribution: +0.08, color: 'green' },
    { feature: 'No-till Practice', contribution: +0.05, color: 'green' },
    { feature: 'Temperature (Optimal)', contribution: +0.03, color: 'green' },
    { feature: 'Soil pH (Neutral)', contribution: +0.01, color: 'gray' },
    { feature: 'Elevation', contribution: -0.01, color: 'gray' }
  ],
  counterfactuals: [
    'If rainfall decreased by 10%, predicted SOC would be 1.20 tonnes/ha/year (-11%)',
    'If cover crops were removed, predicted SOC would be 1.18 tonnes/ha/year (-13%)',
    'If tillage switched to conventional, predicted SOC would be 1.10 tonnes/ha/year (-19%)'
  ]
};

// Policy simulation results
const policyScenarios = [
  { name: 'No Intervention', carbonPrice: 0, adoption: 8, carbonSeq: 96, income: 2400, ecosystemServices: 0 },
  { name: 'Low Carbon Price', carbonPrice: 10, adoption: 23, carbonSeq: 276, income: 2580, ecosystemServices: 15 },
  { name: 'Medium Carbon Price', carbonPrice: 25, adoption: 58, carbonSeq: 696, income: 2920, ecosystemServices: 42 },
  { name: 'High + Training', carbonPrice: 40, adoption: 87, carbonSeq: 1044, income: 3340, ecosystemServices: 68 }
];

// Model validation metrics over time
const validationTrend = [
  { month: 'Oct', accuracy: 91.2, predictions: 850, errors: 75 },
  { month: 'Nov', accuracy: 90.8, predictions: 920, errors: 85 },
  { month: 'Dec', accuracy: 89.4, predictions: 1100, errors: 117 },
  { month: 'Jan', accuracy: 89.1, predictions: 1050, errors: 114 },
  { month: 'Feb', accuracy: 90.3, predictions: 980, errors: 95 },
  { month: 'Mar', accuracy: 91.5, predictions: 1020, errors: 87 }
];

// Investment risk scores
const investmentRisks = [
  { project: 'Nairobi Agroforestry', successProb: 84, budget: 75000, beneficiaries: 120, risk: 'Low' },
  { project: 'Coastal Mangrove Restoration', successProb: 68, budget: 120000, beneficiaries: 340, risk: 'Medium' },
  { project: 'Highlands Soil Carbon', successProb: 91, budget: 45000, beneficiaries: 85, risk: 'Low' },
  { project: 'Dryland Regeneration', successProb: 42, budget: 95000, beneficiaries: 210, risk: 'High' }
];

export function AITransparencyDashboard() {
  const [selectedModel, setSelectedModel] = useState<'soilCarbon' | 'forestRestoration' | 'waterQuality'>('soilCarbon');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">AI & Modeling Engineering</h2>
          <p className="text-emerald-300/70 mt-1">Transparent predictions: Explainable AI that builds institutional trust</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-300">
            <Brain className="w-3 h-3 mr-1" />
            3 Production Models
          </Badge>
          <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-300">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            91.5% Avg Accuracy
          </Badge>
        </div>
      </div>

      {/* Model Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(modelMetrics).map(([key, model]) => (
          <Card 
            key={key}
            className={`p-6 cursor-pointer transition-all ${
              selectedModel === key 
                ? 'bg-blue-500/20 border-blue-500/50' 
                : 'bg-black/40 border-blue-500/20 hover:border-blue-500/40'
            }`}
            onClick={() => setSelectedModel(key as any)}
          >
            <div className="flex items-center justify-between mb-3">
              <Brain className="w-5 h-5 text-blue-400" />
              <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-300 text-xs">
                {model.status}
              </Badge>
            </div>
            <h3 className="text-white font-semibold mb-1">{model.name}</h3>
            <p className="text-blue-300/70 text-xs mb-3">Version {model.version}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-300/70">Accuracy</span>
                <span className="text-blue-300 font-medium">{model.accuracy}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300/70">R² Score</span>
                <span className="text-blue-300 font-medium">{model.r2}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300/70">Explainability</span>
                <span className="text-green-300 font-medium">{model.explainability}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300/70">Predictions</span>
                <span className="text-blue-300 font-medium">{model.predictions.toLocaleString()}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Model Validation Trend */}
      <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Model Accuracy Trend (6 months)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={validationTrend}>
            <defs>
              <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#10b981" opacity={0.1} />
            <XAxis dataKey="month" stroke="#6ee7b7" />
            <YAxis stroke="#6ee7b7" domain={[85, 95]} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
              }}
            />
            <Area type="monotone" dataKey="accuracy" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAccuracy)" />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-emerald-300/70 text-sm mt-4">
          ✅ Model accuracy stable above 89% threshold. No retraining required.
        </p>
      </Card>

      <Tabs defaultValue="explainability" className="space-y-6">
        <TabsList className="bg-black/40 border border-emerald-500/20">
          <TabsTrigger value="explainability">
            <FileText className="w-4 h-4 mr-2" />
            Explainability
          </TabsTrigger>
          <TabsTrigger value="policy-sim">
            <Users className="w-4 h-4 mr-2" />
            Policy Simulation
          </TabsTrigger>
          <TabsTrigger value="investment">
            <Target className="w-4 h-4 mr-2" />
            Investment Scoring
          </TabsTrigger>
          <TabsTrigger value="validation">
            <Award className="w-4 h-4 mr-2" />
            Validation
          </TabsTrigger>
        </TabsList>

        {/* Explainability Tab */}
        <TabsContent value="explainability">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Feature Importance */}
            <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Feature Importance</h3>
              <p className="text-emerald-300/70 text-sm mb-4">
                Which factors most influence soil carbon predictions?
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={featureImportance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#10b981" opacity={0.1} />
                  <XAxis type="number" stroke="#6ee7b7" />
                  <YAxis dataKey="feature" type="category" stroke="#6ee7b7" width={120} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="importance" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Example Prediction Explanation */}
            <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Example Prediction</h3>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-300 font-medium">Predicted SOC Sequestration</span>
                  <span className="text-2xl font-bold text-white">{examplePrediction.prediction}</span>
                </div>
                <p className="text-blue-300/70 text-sm">tonnes CO2e/ha/year</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-blue-300/70 text-sm">Uncertainty (95% CI)</span>
                  <span className="text-blue-300 text-sm">±{examplePrediction.uncertainty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-300/70 text-sm">Confidence</span>
                  <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-300">
                    {examplePrediction.confidence}%
                  </Badge>
                </div>
              </div>

              <h4 className="text-white font-medium mb-3">SHAP Value Contributions</h4>
              <div className="space-y-2">
                {examplePrediction.shapValues.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {item.contribution > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <Info className="w-4 h-4 text-gray-400" />
                    )}
                    <div className="flex-1">
                      <p className="text-emerald-300 text-sm">{item.feature}</p>
                      <Progress 
                        value={Math.abs(item.contribution) * 20} 
                        className={`h-2 mt-1 ${item.contribution > 0 ? 'bg-green-500/20' : 'bg-gray-500/20'}`}
                      />
                    </div>
                    <span className={`text-sm font-medium ${item.contribution > 0 ? 'text-green-300' : 'text-gray-400'}`}>
                      {item.contribution > 0 ? '+' : ''}{item.contribution.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Counterfactual Explanations */}
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Counterfactual Explanations</h3>
            <p className="text-emerald-300/70 text-sm mb-4">
              "What if..." scenarios showing how changes to inputs affect the prediction
            </p>
            <div className="space-y-3">
              {examplePrediction.counterfactuals.map((cf, idx) => (
                <Alert key={idx} className="bg-amber-500/10 border-amber-500/30">
                  <Info className="h-4 w-4 text-amber-400" />
                  <AlertDescription className="text-amber-300/90">{cf}</AlertDescription>
                </Alert>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Policy Simulation Tab */}
        <TabsContent value="policy-sim">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Carbon Pricing Policy Scenarios</h3>
            <p className="text-emerald-300/70 text-sm mb-6">
              Agent-based model simulating farmer behavior under different carbon pricing policies over 20 years
            </p>
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-500/20">
                  <TableHead className="text-emerald-300">Scenario</TableHead>
                  <TableHead className="text-emerald-300">Carbon Price</TableHead>
                  <TableHead className="text-emerald-300">Adoption Rate</TableHead>
                  <TableHead className="text-emerald-300">Carbon Sequestered</TableHead>
                  <TableHead className="text-emerald-300">Farmer Income</TableHead>
                  <TableHead className="text-emerald-300">Ecosystem +</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policyScenarios.map((scenario, idx) => (
                  <TableRow key={idx} className="border-emerald-500/10">
                    <TableCell className="text-white font-medium">{scenario.name}</TableCell>
                    <TableCell className="text-emerald-300">${scenario.carbonPrice}/tonne</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={scenario.adoption} className="h-2 w-24" />
                        <span className="text-emerald-300">{scenario.adoption}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-emerald-300">{scenario.carbonSeq} tonnes</TableCell>
                    <TableCell className="text-emerald-300">${scenario.income.toLocaleString()}/yr</TableCell>
                    <TableCell className="text-emerald-300">+{scenario.ecosystemServices}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Alert className="mt-6 bg-green-500/10 border-green-500/30">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <AlertTitle className="text-green-300">Recommended Policy</AlertTitle>
              <AlertDescription className="text-green-300/90">
                <strong>Medium Carbon Price ($25/tonne)</strong> offers best cost-benefit ratio:
                58% adoption, 696 tonnes CO2e sequestered, +21.7% farmer income increase.
                ROI: 29.9x over 20 years.
              </AlertDescription>
            </Alert>
          </Card>

          {/* Adoption Curve Visualization */}
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6 mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">Regenerative Adoption Curves</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLine data={[
                { year: 0, baseline: 8, low: 8, medium: 8, high: 8 },
                { year: 5, baseline: 8, low: 15, medium: 28, high: 45 },
                { year: 10, baseline: 9, low: 20, medium: 45, high: 72 },
                { year: 15, baseline: 10, low: 22, medium: 54, high: 82 },
                { year: 20, baseline: 8, low: 23, medium: 58, high: 87 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#10b981" opacity={0.1} />
                <XAxis dataKey="year" stroke="#6ee7b7" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                <YAxis stroke="#6ee7b7" label={{ value: 'Adoption (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '8px',
                  }}
                />
                <Line type="monotone" dataKey="baseline" stroke="#6b7280" strokeWidth={2} name="No Intervention" />
                <Line type="monotone" dataKey="low" stroke="#fbbf24" strokeWidth={2} name="$10/tonne" />
                <Line type="monotone" dataKey="medium" stroke="#10b981" strokeWidth={2} name="$25/tonne" />
                <Line type="monotone" dataKey="high" stroke="#3b82f6" strokeWidth={2} name="$40/tonne + Training" />
              </RechartsLine>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Investment Scoring Tab */}
        <TabsContent value="investment">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Regenerative Project Risk Scoring</h3>
            <p className="text-emerald-300/70 text-sm mb-6">
              ML-powered evaluation of project success probability based on 247 historical projects
            </p>
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-500/20">
                  <TableHead className="text-emerald-300">Project</TableHead>
                  <TableHead className="text-emerald-300">Success Probability</TableHead>
                  <TableHead className="text-emerald-300">Budget</TableHead>
                  <TableHead className="text-emerald-300">Beneficiaries</TableHead>
                  <TableHead className="text-emerald-300">Risk Rating</TableHead>
                  <TableHead className="text-emerald-300">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investmentRisks.map((project, idx) => (
                  <TableRow key={idx} className="border-emerald-500/10">
                    <TableCell className="text-white font-medium">{project.project}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={project.successProb} className="h-2 w-32" />
                        <span className={
                          project.successProb > 75 ? 'text-green-300' :
                          project.successProb > 50 ? 'text-yellow-300' :
                          'text-red-300'
                        }>
                          {project.successProb}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-emerald-300">${project.budget.toLocaleString()}</TableCell>
                    <TableCell className="text-emerald-300">{project.beneficiaries}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        project.risk === 'Low' ? 'bg-green-500/10 border-green-500/30 text-green-300' :
                        project.risk === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300' :
                        'bg-red-500/10 border-red-500/30 text-red-300'
                      }>
                        {project.risk}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className={
                          project.risk === 'Low' ? 'border-green-500/30 text-green-300 hover:bg-green-500/10' :
                          project.risk === 'Medium' ? 'border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/10' :
                          'border-red-500/30 text-red-300 hover:bg-red-500/10'
                        }
                      >
                        View Recommendations
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Example Detailed Analysis */}
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6 mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">Detailed Risk Analysis: Nairobi Agroforestry</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-emerald-300 font-medium mb-3">Top Success Factors</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                    <span className="text-green-300">Community Engagement</span>
                    <span className="text-green-300 font-medium">+12%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                    <span className="text-green-300">Local Capacity Score</span>
                    <span className="text-green-300 font-medium">+8%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                    <span className="text-green-300">Project Size (50 ha)</span>
                    <span className="text-green-300 font-medium">+5%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-emerald-300 font-medium mb-3">Risk Factors</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                    <span className="text-red-300">Baseline Soil Health (42/100)</span>
                    <span className="text-red-300 font-medium">-15%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                    <span className="text-red-300">Location Remoteness (45 km)</span>
                    <span className="text-red-300 font-medium">-7%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                    <span className="text-red-300">Market Access (55/100)</span>
                    <span className="text-red-300 font-medium">-4%</span>
                  </div>
                </div>
              </div>
            </div>

            <Alert className="mt-6 bg-blue-500/10 border-blue-500/30">
              <Zap className="h-4 w-4 text-blue-400" />
              <AlertTitle className="text-blue-300">Improvement Recommendations</AlertTitle>
              <AlertDescription className="text-blue-300/90 space-y-1">
                <p>1. 🎯 Invest in soil amendments to improve baseline health (soil → 60/100) → +10% success prob</p>
                <p>2. 🎯 Increase monitoring visits from 4 to 6 per year → +5% success prob</p>
                <p>3. 🎯 Add market linkage support to improve market access → +6% success prob</p>
                <p className="mt-2 font-medium">With these improvements: 84% → 95% success probability</p>
              </AlertDescription>
            </Alert>
          </Card>
        </TabsContent>

        {/* Validation Tab */}
        <TabsContent value="validation">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Model Validation Methods</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <h4 className="text-blue-300 font-medium mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Cross-Validation
                  </h4>
                  <p className="text-blue-300/70 text-sm">5-fold stratified CV ensuring model generalizes across different project types</p>
                  <div className="mt-2 text-blue-300 text-sm">R² = 0.87 (consistent performance)</div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <h4 className="text-blue-300 font-medium mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    External Validation
                  </h4>
                  <p className="text-blue-300/70 text-sm">Tested on 34 new projects not in training data</p>
                  <div className="mt-2 text-blue-300 text-sm">R² = 0.85 (good generalization)</div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <h4 className="text-blue-300 font-medium mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Expert Review
                  </h4>
                  <p className="text-blue-300/70 text-sm">Soil scientists from University of Nairobi validated predictions against domain knowledge</p>
                  <div className="mt-2 text-green-300 text-sm">✅ Approved for production</div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <h4 className="text-blue-300 font-medium mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Continuous Monitoring
                  </h4>
                  <p className="text-blue-300/70 text-sm">Compare predictions vs actual outcomes monthly. Retrain if accuracy drops below 85%</p>
                  <div className="mt-2 text-green-300 text-sm">Current: 89.4% (no retraining needed)</div>
                </div>
              </div>
            </Card>

            <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Model Limitations & Uncertainties</h3>
              <Alert className="mb-4 bg-amber-500/10 border-amber-500/30">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <AlertTitle className="text-amber-300">Geographic Scope</AlertTitle>
                <AlertDescription className="text-amber-300/90">
                  Trained on East African data (Kenya, Tanzania, Ethiopia). Extrapolation to other regions should be done cautiously with local validation.
                </AlertDescription>
              </Alert>

              <Alert className="mb-4 bg-amber-500/10 border-amber-500/30">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <AlertTitle className="text-amber-300">Temporal Horizon</AlertTitle>
                <AlertDescription className="text-amber-300/90">
                  Training data spans 5 years (2020-2025). Long-term predictions beyond this are increasingly uncertain and should include wider confidence intervals.
                </AlertDescription>
              </Alert>

              <Alert className="mb-4 bg-amber-500/10 border-amber-500/30">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <AlertTitle className="text-amber-300">Practice Changes</AlertTitle>
                <AlertDescription className="text-amber-300/90">
                  Model assumes management practices remain consistent. If farmers change practices mid-project, model should be retrained with new data.
                </AlertDescription>
              </Alert>

              <Alert className="bg-blue-500/10 border-blue-500/30">
                <Info className="h-4 w-4 text-blue-400" />
                <AlertTitle className="text-blue-300">Uncertainty Quantification</AlertTitle>
                <AlertDescription className="text-blue-300/90">
                  Every prediction includes 95% confidence intervals using quantile regression forests. Typical uncertainty: ±0.3 tonnes CO2e/ha/year.
                </AlertDescription>
              </Alert>
            </Card>
          </div>

          {/* Prediction vs Actual Scatter Plot */}
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6 mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">Predictions vs Actual Outcomes (Test Set)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#10b981" opacity={0.1} />
                <XAxis 
                  dataKey="actual" 
                  type="number" 
                  stroke="#6ee7b7" 
                  name="Actual" 
                  label={{ value: 'Actual SOC (tonnes/ha/yr)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  dataKey="predicted" 
                  type="number" 
                  stroke="#6ee7b7" 
                  name="Predicted" 
                  label={{ value: 'Predicted SOC (tonnes/ha/yr)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '8px',
                  }}
                />
                <Scatter 
                  name="Predictions" 
                  data={[
                    { actual: 0.8, predicted: 0.9 },
                    { actual: 1.2, predicted: 1.1 },
                    { actual: 1.5, predicted: 1.6 },
                    { actual: 0.5, predicted: 0.6 },
                    { actual: 1.8, predicted: 1.7 },
                    { actual: 2.1, predicted: 2.0 },
                    { actual: 1.0, predicted: 1.1 },
                    { actual: 1.4, predicted: 1.3 },
                    { actual: 0.9, predicted: 1.0 },
                    { actual: 1.7, predicted: 1.8 },
                    { actual: 1.3, predicted: 1.2 },
                    { actual: 0.7, predicted: 0.8 },
                  ]} 
                  fill="#3b82f6" 
                />
                {/* Perfect prediction line */}
                <Line 
                  type="monotone" 
                  data={[{ actual: 0, predicted: 0 }, { actual: 2.5, predicted: 2.5 }]} 
                  dataKey="predicted" 
                  stroke="#10b981" 
                  strokeDasharray="5 5"
                  dot={false}
                />
              </ScatterChart>
            </ResponsiveContainer>
            <p className="text-emerald-300/70 text-sm mt-4">
              Points close to the diagonal line indicate accurate predictions. R² = 0.89 shows strong correlation between predicted and actual values.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
