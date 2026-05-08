import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  Brain, TrendingUp, AlertTriangle, CheckCircle2, Layers, Target, 
  BarChart3, Cpu, FileText, Users, Shield, Zap, GitBranch, Box
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Model portfolio
const models = [
  { 
    id: 'carbon-seq', 
    name: 'Forest Carbon Sequestration', 
    version: 'v2.3.0', 
    type: 'Gradient Boosted Trees',
    accuracy: 87,
    status: 'production',
    predictions: 1247,
    avgConfidence: 82
  },
  { 
    id: 'water-quality', 
    name: 'Water Quality Simulator', 
    version: 'v1.8.2', 
    type: 'Physics-Informed NN',
    accuracy: 92,
    status: 'production',
    predictions: 3421,
    avgConfidence: 88
  },
  { 
    id: 'biodiversity', 
    name: 'Biodiversity Impact Estimator', 
    version: 'v3.1.0', 
    type: 'Random Forest',
    accuracy: 79,
    status: 'production',
    predictions: 876,
    avgConfidence: 74
  },
  { 
    id: 'policy-sim', 
    name: 'Policy Outcome Simulator', 
    version: 'v1.2.1', 
    type: 'Agent-Based Model',
    accuracy: 71,
    status: 'beta',
    predictions: 124,
    avgConfidence: 68
  },
];

// Recent predictions with explainability
const recentPredictions = [
  {
    id: 'PRED-001',
    project: 'Nairobi Mangrove Restoration',
    model: 'Forest Carbon Sequestration',
    prediction: '4,730 tonnes CO2e',
    confidence: [3210, 6480],
    topFactors: [
      { feature: 'Rainfall', contribution: 820, direction: 'positive' },
      { feature: 'Tree Species', contribution: 640, direction: 'positive' },
      { feature: 'Planting Density', contribution: 510, direction: 'positive' },
    ],
    trustScore: 85
  },
  {
    id: 'PRED-002',
    project: 'Kisumu Water Purification',
    model: 'Water Quality Simulator',
    prediction: '12,400 L/day clean water',
    confidence: [10100, 14200],
    topFactors: [
      { feature: 'Filter Type', contribution: 3200, direction: 'positive' },
      { feature: 'Flow Rate', contribution: 1800, direction: 'positive' },
      { feature: 'Maintenance', contribution: -400, direction: 'negative' },
    ],
    trustScore: 91
  },
];

// Policy simulations
const policySimulations = [
  {
    name: 'Organic Farming Subsidy',
    status: 'running',
    scenarios: 10000,
    progress: 73,
    expectedImpact: {
      carbon: { median: 47300, ci: [32100, 64800] },
      income: { median: 1240, ci: [620, 2150] },
    }
  },
  {
    name: 'Water Infrastructure Investment',
    status: 'completed',
    scenarios: 10000,
    progress: 100,
    expectedImpact: {
      waterQuality: { median: 12.3, ci: [8.1, 17.6] },
      population: { median: 340000, ci: [280000, 420000] },
    }
  },
];

// Model performance over time
const performanceData = [
  { month: 'Sep', accuracy: 84, predictions: 847 },
  { month: 'Oct', accuracy: 85, predictions: 923 },
  { month: 'Nov', accuracy: 86, predictions: 1056 },
  { month: 'Dec', accuracy: 85, predictions: 1124 },
  { month: 'Jan', accuracy: 87, predictions: 1247 },
  { month: 'Feb', accuracy: 87, predictions: 1389 },
  { month: 'Mar', accuracy: 88, predictions: 1456 },
];

// Feature importance
const featureImportance = [
  { feature: 'Rainfall', importance: 34 },
  { feature: 'Tree Species', importance: 28 },
  { feature: 'Soil Type', importance: 21 },
  { feature: 'Planting Density', importance: 17 },
];

export function AIModelingDashboard() {
  const [selectedModel, setSelectedModel] = useState(models[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">AI & Modeling Engineering</h2>
          <p className="text-emerald-300/70 mt-1">Transparent predictions, explainable simulations, trustworthy AI</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-300">
            <Brain className="w-3 h-3 mr-1" />
            4 Models in Production
          </Badge>
          <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-300">
            <Target className="w-3 h-3 mr-1" />
            87% Avg Accuracy
          </Badge>
        </div>
      </div>

      {/* AI Principles */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4 bg-emerald-500/10 border-emerald-500/30">
          <FileText className="w-8 h-8 text-emerald-400 mb-2" />
          <p className="text-emerald-300 font-medium text-sm">Explainability</p>
          <p className="text-emerald-300/70 text-xs mt-1">Shows reasoning</p>
        </Card>
        <Card className="p-4 bg-blue-500/10 border-blue-500/30">
          <BarChart3 className="w-8 h-8 text-blue-400 mb-2" />
          <p className="text-blue-300 font-medium text-sm">Uncertainty</p>
          <p className="text-blue-300/70 text-xs mt-1">Confidence intervals</p>
        </Card>
        <Card className="p-4 bg-purple-500/10 border-purple-500/30">
          <CheckCircle2 className="w-8 h-8 text-purple-400 mb-2" />
          <p className="text-purple-300 font-medium text-sm">Scientific Validity</p>
          <p className="text-purple-300/70 text-xs mt-1">Domain alignment</p>
        </Card>
        <Card className="p-4 bg-amber-500/10 border-amber-500/30">
          <Shield className="w-8 h-8 text-amber-400 mb-2" />
          <p className="text-amber-300 font-medium text-sm">Fairness</p>
          <p className="text-amber-300/70 text-xs mt-1">Equity audits</p>
        </Card>
        <Card className="p-4 bg-pink-500/10 border-pink-500/30">
          <GitBranch className="w-8 h-8 text-pink-400 mb-2" />
          <p className="text-pink-300 font-medium text-sm">Reproducibility</p>
          <p className="text-pink-300/70 text-xs mt-1">Versioned & open</p>
        </Card>
      </div>

      {/* Model Portfolio */}
      <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-400" />
          Model Portfolio
        </h3>
        <Table>
          <TableHeader>
            <TableRow className="border-emerald-500/20">
              <TableHead className="text-emerald-300">Model</TableHead>
              <TableHead className="text-emerald-300">Version</TableHead>
              <TableHead className="text-emerald-300">Type</TableHead>
              <TableHead className="text-emerald-300">Accuracy</TableHead>
              <TableHead className="text-emerald-300">Status</TableHead>
              <TableHead className="text-emerald-300">Predictions (30d)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models.map((model) => (
              <TableRow 
                key={model.id} 
                className="border-emerald-500/10 cursor-pointer hover:bg-emerald-500/5"
                onClick={() => setSelectedModel(model)}
              >
                <TableCell className="text-white font-medium">{model.name}</TableCell>
                <TableCell className="text-emerald-300 font-mono text-sm">{model.version}</TableCell>
                <TableCell className="text-emerald-300/70">{model.type}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={model.accuracy} className="h-2 w-20" />
                    <span className="text-emerald-300">{model.accuracy}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    model.status === 'production' 
                      ? 'bg-green-500/10 border-green-500/30 text-green-300'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  }>
                    {model.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-emerald-300">{model.predictions.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Model Performance Chart */}
      <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Model Performance Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#10b981" opacity={0.1} />
            <XAxis dataKey="month" stroke="#6ee7b7" />
            <YAxis yAxisId="left" stroke="#6ee7b7" domain={[80, 90]} />
            <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} name="Accuracy %" />
            <Line yAxisId="right" type="monotone" dataKey="predictions" stroke="#3b82f6" strokeWidth={2} name="Predictions" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Tabs defaultValue="predictions" className="space-y-6">
        <TabsList className="bg-black/40 border border-emerald-500/20">
          <TabsTrigger value="predictions">
            <Target className="w-4 h-4 mr-2" />
            Recent Predictions
          </TabsTrigger>
          <TabsTrigger value="policy">
            <Users className="w-4 h-4 mr-2" />
            Policy Simulations
          </TabsTrigger>
          <TabsTrigger value="explainability">
            <Brain className="w-4 h-4 mr-2" />
            Explainability
          </TabsTrigger>
          <TabsTrigger value="ethics">
            <Shield className="w-4 h-4 mr-2" />
            Ethics & Fairness
          </TabsTrigger>
        </TabsList>

        {/* Recent Predictions Tab */}
        <TabsContent value="predictions">
          <div className="space-y-4">
            {recentPredictions.map((pred) => (
              <Card key={pred.id} className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{pred.project}</h4>
                    <p className="text-emerald-300/70 text-sm">{pred.model}</p>
                  </div>
                  <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-300">
                    Trust Score: {pred.trustScore}%
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-emerald-300/70 text-sm mb-1">Prediction</p>
                    <p className="text-2xl font-bold text-white">{pred.prediction}</p>
                    <p className="text-emerald-300/70 text-sm mt-2">
                      95% CI: [{pred.confidence[0].toLocaleString()} - {pred.confidence[1].toLocaleString()}]
                    </p>
                  </div>

                  <div>
                    <p className="text-emerald-300/70 text-sm mb-3">Top Contributing Factors</p>
                    <div className="space-y-2">
                      {pred.topFactors.map((factor, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-white text-sm">{factor.feature}</span>
                          <div className="flex items-center gap-2">
                            {factor.direction === 'positive' ? (
                              <TrendingUp className="w-4 h-4 text-green-400" />
                            ) : (
                              <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />
                            )}
                            <span className={factor.direction === 'positive' ? 'text-green-400' : 'text-red-400'}>
                              {factor.contribution > 0 ? '+' : ''}{factor.contribution}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Policy Simulations Tab */}
        <TabsContent value="policy">
          <div className="space-y-4">
            {policySimulations.map((policy, idx) => (
              <Card key={idx} className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{policy.name}</h4>
                    <p className="text-emerald-300/70 text-sm">Monte Carlo Simulation (10,000 scenarios)</p>
                  </div>
                  <Badge variant="outline" className={
                    policy.status === 'completed'
                      ? 'bg-green-500/10 border-green-500/30 text-green-300'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  }>
                    {policy.status}
                  </Badge>
                </div>

                {policy.status === 'running' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-emerald-300/70 text-sm">Progress</span>
                      <span className="text-emerald-300 text-sm">{policy.progress}%</span>
                    </div>
                    <Progress value={policy.progress} className="h-2" />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {policy.expectedImpact.carbon && (
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <p className="text-emerald-300/70 text-sm mb-2">Soil Carbon Sequestration</p>
                      <p className="text-xl font-bold text-white">{policy.expectedImpact.carbon.median.toLocaleString()} tonnes CO2e</p>
                      <p className="text-emerald-300/70 text-xs mt-1">
                        95% CI: [{policy.expectedImpact.carbon.ci[0].toLocaleString()} - {policy.expectedImpact.carbon.ci[1].toLocaleString()}]
                      </p>
                    </div>
                  )}
                  
                  {policy.expectedImpact.income && (
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <p className="text-emerald-300/70 text-sm mb-2">Farmer Income Increase</p>
                      <p className="text-xl font-bold text-white">${policy.expectedImpact.income.median.toLocaleString()}</p>
                      <p className="text-emerald-300/70 text-xs mt-1">
                        95% CI: [${policy.expectedImpact.income.ci[0].toLocaleString()} - ${policy.expectedImpact.income.ci[1].toLocaleString()}]
                      </p>
                    </div>
                  )}

                  {policy.expectedImpact.waterQuality && (
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <p className="text-emerald-300/70 text-sm mb-2">Water Quality Index Improvement</p>
                      <p className="text-xl font-bold text-white">+{policy.expectedImpact.waterQuality.median}</p>
                      <p className="text-emerald-300/70 text-xs mt-1">
                        95% CI: [+{policy.expectedImpact.waterQuality.ci[0]} - +{policy.expectedImpact.waterQuality.ci[1]}]
                      </p>
                    </div>
                  )}

                  {policy.expectedImpact.population && (
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <p className="text-emerald-300/70 text-sm mb-2">Population Benefited</p>
                      <p className="text-xl font-bold text-white">{(policy.expectedImpact.population.median / 1000).toFixed(0)}K people</p>
                      <p className="text-emerald-300/70 text-xs mt-1">
                        95% CI: [{(policy.expectedImpact.population.ci[0] / 1000).toFixed(0)}K - {(policy.expectedImpact.population.ci[1] / 1000).toFixed(0)}K]
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Explainability Tab */}
        <TabsContent value="explainability">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">SHAP Feature Importance</h3>
            <p className="text-emerald-300/70 text-sm mb-6">
              Shows which features have the most influence on model predictions (Forest Carbon Sequestration Model)
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
                <Bar dataKey="importance" fill="#10b981" name="Importance %" />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
              <h4 className="text-white font-medium mb-2">Plain English Explanation</h4>
              <p className="text-emerald-300/70 text-sm leading-relaxed">
                This project is predicted to sequester <strong className="text-emerald-300">4,730 tonnes CO2e</strong> (95% confidence: 3,210 - 6,480).<br /><br />
                
                This prediction is primarily driven by:<br />
                • <strong className="text-emerald-300">Rainfall</strong> increased prediction by 820 tonnes (1,200mm is ideal for mangroves)<br />
                • <strong className="text-emerald-300">Tree species</strong> increased prediction by 640 tonnes (Rhizophora mucronata is high carbon)<br />
                • <strong className="text-emerald-300">Planting density</strong> increased prediction by 510 tonnes (1,200 trees/ha)<br /><br />
                
                The model is <strong className="text-emerald-300">moderately confident</strong> in this prediction.
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Ethics & Fairness Tab */}
        <TabsContent value="ethics">
          <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Ethics & Fairness Audit</h3>
            
            <Alert className="bg-green-500/10 border-green-500/30 mb-6">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <AlertTitle className="text-green-300">Fairness Audit: PASSED</AlertTitle>
              <AlertDescription className="text-green-300/70">
                Last reviewed: February 28, 2026. All bias metrics within acceptable thresholds.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">Demographic Parity</h4>
                  <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-300">
                    PASS
                  </Badge>
                </div>
                <p className="text-emerald-300/70 text-sm">
                  Predictions do not vary by geographic region (p=0.23)
                </p>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">Equal Opportunity</h4>
                  <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-300">
                    PASS
                  </Badge>
                </div>
                <p className="text-emerald-300/70 text-sm">
                  True positive rate similar across project sizes
                </p>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">Calibration</h4>
                  <Badge variant="outline" className="bg-amber-500/10 border-amber-500/30 text-amber-300">
                    WARNING
                  </Badge>
                </div>
                <p className="text-emerald-300/70 text-sm mb-2">
                  Model overestimates carbon for small projects (&lt;5 ha)
                </p>
                <p className="text-amber-300 text-sm">
                  <strong>Action:</strong> Retrain with more small project data by Q2 2026
                </p>
              </div>

              <div className="mt-6">
                <h4 className="text-white font-medium mb-3">Stakeholder Feedback</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-800/50 rounded-lg">
                    <p className="text-emerald-300 text-sm mb-1"><strong>Small-scale farmers (Kenya):</strong></p>
                    <p className="text-emerald-300/70 text-sm">
                      "Model predictions too optimistic - our actual carbon lower"
                    </p>
                    <p className="text-blue-300 text-sm mt-2">
                      <strong>Response:</strong> Added 'smallholder adjustment factor' (-15%) based on field data
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
