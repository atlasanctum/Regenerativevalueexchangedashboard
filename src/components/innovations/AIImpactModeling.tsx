import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Brain, TrendingUp, Zap, Target, Activity, CheckCircle2, AlertCircle, BarChart3, Layers } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

export function AIImpactModeling() {
  const [selectedModel, setSelectedModel] = useState('carbon-sequestration');

  // AI Models
  const aiModels = [
    {
      id: 'carbon-sequestration',
      name: 'Carbon Sequestration Predictor',
      type: 'Random Forest',
      accuracy: 94.7,
      confidence: 92.3,
      parameters: 847,
      trainingData: '12.4M data points',
      lastTrained: '2026-01-28',
      version: 'v3.2.1',
      status: 'production'
    },
    {
      id: 'biodiversity-impact',
      name: 'Biodiversity Impact Analyzer',
      type: 'Neural Network',
      accuracy: 91.2,
      confidence: 89.8,
      parameters: 2341,
      trainingData: '8.7M data points',
      lastTrained: '2026-01-25',
      version: 'v2.8.4',
      status: 'production'
    },
    {
      id: 'deforestation-risk',
      name: 'Deforestation Risk Assessor',
      type: 'Gradient Boosting',
      accuracy: 96.1,
      confidence: 94.5,
      parameters: 1523,
      trainingData: '15.2M data points',
      lastTrained: '2026-01-30',
      version: 'v4.1.0',
      status: 'production'
    },
    {
      id: 'ocean-health',
      name: 'Ocean Health Forecaster',
      type: 'LSTM',
      accuracy: 88.9,
      confidence: 86.2,
      parameters: 3156,
      trainingData: '6.3M data points',
      lastTrained: '2026-01-22',
      version: 'v1.9.2',
      status: 'production'
    },
  ];

  // Prediction results
  const predictions = [
    {
      project: 'Amazon Rainforest Restoration',
      area: '50,000 hectares',
      predicted: {
        carbonSequestration: 2450000,
        biodiversityScore: 87.3,
        jobsCreated: 1250,
        waterRetention: 340000,
        confidence: 94.2
      },
      timeline: '10 years',
      risk: 'low'
    },
    {
      project: 'Mangrove Coastal Protection',
      area: '12,000 hectares',
      predicted: {
        carbonSequestration: 680000,
        biodiversityScore: 92.1,
        jobsCreated: 380,
        waterRetention: 0,
        confidence: 91.8
      },
      timeline: '5 years',
      risk: 'medium'
    },
    {
      project: 'Coral Reef Regeneration',
      area: '5,000 hectares',
      predicted: {
        carbonSequestration: 45000,
        biodiversityScore: 95.6,
        jobsCreated: 120,
        waterRetention: 0,
        confidence: 88.4
      },
      timeline: '15 years',
      risk: 'high'
    },
  ];

  // Model performance over time
  const modelPerformance = [
    { month: 'Aug', accuracy: 89.2, predictions: 12400 },
    { month: 'Sep', accuracy: 91.5, predictions: 15600 },
    { month: 'Oct', accuracy: 92.8, predictions: 18200 },
    { month: 'Nov', accuracy: 93.4, predictions: 21800 },
    { month: 'Dec', accuracy: 94.1, predictions: 24500 },
    { month: 'Jan', accuracy: 94.7, predictions: 27300 },
  ];

  // Feature importance
  const featureImportance = [
    { feature: 'Rainfall', importance: 95, category: 'Climate' },
    { feature: 'Soil Quality', importance: 88, category: 'Environmental' },
    { feature: 'Temperature', importance: 82, category: 'Climate' },
    { feature: 'Biodiversity Index', importance: 78, category: 'Ecological' },
    { feature: 'Human Activity', importance: 72, category: 'Social' },
    { feature: 'Proximity to Water', importance: 68, category: 'Geographic' },
  ];

  // Real-time predictions
  const realtimePredictions = [
    { time: '14:00', actual: 2450, predicted: 2480, confidence: 94 },
    { time: '14:15', actual: 2520, predicted: 2540, confidence: 93 },
    { time: '14:30', actual: 2580, predicted: 2590, confidence: 95 },
    { time: '14:45', actual: 2640, predicted: 2630, confidence: 92 },
    { time: '15:00', actual: 2700, predicted: 2710, confidence: 94 },
  ];

  // Multi-dimensional impact assessment
  const impactDimensions = [
    { dimension: 'Carbon', current: 85, predicted: 92 },
    { dimension: 'Biodiversity', current: 78, predicted: 88 },
    { dimension: 'Water', current: 82, predicted: 87 },
    { dimension: 'Soil', current: 76, predicted: 85 },
    { dimension: 'Social', current: 88, predicted: 93 },
    { dimension: 'Economic', current: 84, predicted: 89 },
  ];

  // Training metrics
  const trainingMetrics = [
    { epoch: 1, loss: 0.456, valLoss: 0.489 },
    { epoch: 5, loss: 0.234, valLoss: 0.267 },
    { epoch: 10, loss: 0.123, valLoss: 0.145 },
    { epoch: 15, loss: 0.089, valLoss: 0.102 },
    { epoch: 20, loss: 0.067, valLoss: 0.078 },
    { epoch: 25, loss: 0.052, valLoss: 0.063 },
  ];

  // AI capabilities
  const capabilities = [
    {
      icon: Brain,
      title: 'Deep Learning',
      description: 'Neural networks for complex pattern recognition',
      models: 12,
      accuracy: 92.4
    },
    {
      icon: Target,
      title: 'Predictive Analytics',
      description: 'Forecast future environmental outcomes',
      models: 8,
      accuracy: 94.7
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Sub-second predictions on live data streams',
      models: 6,
      accuracy: 91.2
    },
    {
      icon: Layers,
      title: 'Ensemble Models',
      description: 'Combine multiple models for higher accuracy',
      models: 5,
      accuracy: 96.1
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white mb-2">AI Impact Modeling & Predictions</h2>
        <p className="text-emerald-300/70">Machine learning models for environmental impact forecasting and verification</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300/70 text-sm">Active Models</span>
            <Brain className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-white text-2xl mb-1">{aiModels.length}</div>
          <div className="text-emerald-400 text-sm">All in production</div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300/70 text-sm">Avg Accuracy</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-white text-2xl mb-1">94.7%</div>
          <div className="text-emerald-400 text-sm">Across all models</div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300/70 text-sm">Predictions</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-white text-2xl mb-1">27.3K</div>
          <div className="text-emerald-400 text-sm">This month</div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-300/70 text-sm">Training Data</span>
            <BarChart3 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-white text-2xl mb-1">42.6M</div>
          <div className="text-emerald-400 text-sm">Total data points</div>
        </Card>
      </div>

      {/* AI Models */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Production AI Models</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiModels.map((model) => (
            <div
              key={model.id}
              className={`bg-slate-900/50 border rounded-lg p-4 cursor-pointer transition-all ${
                selectedModel === model.id
                  ? 'border-emerald-400 bg-emerald-400/10'
                  : 'border-emerald-500/20 hover:border-emerald-400/50'
              }`}
              onClick={() => setSelectedModel(model.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-medium">{model.name}</h4>
                  <div className="text-emerald-300/70 text-sm mt-1">{model.type} • {model.version}</div>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  {model.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-emerald-300/70 text-xs">Accuracy</div>
                  <div className="text-white font-medium">{model.accuracy}%</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Confidence</div>
                  <div className="text-white font-medium">{model.confidence}%</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Parameters</div>
                  <div className="text-white font-medium">{model.parameters.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Training Data</div>
                  <div className="text-white font-medium">{model.trainingData}</div>
                </div>
              </div>

              <div className="text-emerald-300/70 text-xs">
                Last trained: {model.lastTrained}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Model Performance */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Model Performance Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={modelPerformance}>
            <defs>
              <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="month" stroke="#6ee7b7" />
            <YAxis yAxisId="left" stroke="#6ee7b7" />
            <YAxis yAxisId="right" orientation="right" stroke="#6ee7b7" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b98150' }}
              labelStyle={{ color: '#6ee7b7' }}
            />
            <Area yAxisId="left" type="monotone" dataKey="accuracy" stroke="#10b981" fill="url(#accuracyGradient)" name="Accuracy (%)" />
            <Line yAxisId="right" type="monotone" dataKey="predictions" stroke="#3b82f6" strokeWidth={2} name="Predictions (K)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Impact Predictions */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">AI-Generated Impact Predictions</h3>
        
        <div className="space-y-3">
          {predictions.map((pred, index) => (
            <div key={index} className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-medium">{pred.project}</h4>
                  <div className="text-emerald-300/70 text-sm mt-1">
                    {pred.area} • {pred.timeline} timeline
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    {pred.predicted.confidence}% confidence
                  </Badge>
                  <Badge 
                    className={
                      pred.risk === 'low'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : pred.risk === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        : 'bg-red-500/20 text-red-400 border-red-500/30'
                    }
                  >
                    {pred.risk} risk
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="text-emerald-300/70 text-xs">Carbon Sequestration</div>
                  <div className="text-white font-medium">{(pred.predicted.carbonSequestration / 1000).toFixed(0)}K tCO2e</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Biodiversity Score</div>
                  <div className="text-white font-medium">{pred.predicted.biodiversityScore}</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Jobs Created</div>
                  <div className="text-white font-medium">{pred.predicted.jobsCreated.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-emerald-300/70 text-xs">Water Retention</div>
                  <div className="text-white font-medium">
                    {pred.predicted.waterRetention > 0 ? `${(pred.predicted.waterRetention / 1000).toFixed(0)}K m³` : 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Multi-dimensional Impact */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Multi-Dimensional Impact Assessment</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={impactDimensions}>
            <PolarGrid stroke="#ffffff20" />
            <PolarAngleAxis dataKey="dimension" stroke="#6ee7b7" />
            <PolarRadiusAxis stroke="#6ee7b7" />
            <Radar name="Current" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            <Radar name="Predicted" dataKey="predicted" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b98150' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </Card>

      {/* Real-time Predictions */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Real-Time Prediction Accuracy</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="actual" name="Actual" stroke="#6ee7b7" />
            <YAxis dataKey="predicted" name="Predicted" stroke="#6ee7b7" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b98150' }}
              cursor={{ strokeDasharray: '3 3' }}
            />
            <Scatter name="Predictions" data={realtimePredictions} fill="#10b981" />
            <Line type="monotone" dataKey={(d: any) => d} stroke="#ef4444" strokeDasharray="5 5" />
          </ScatterChart>
        </ResponsiveContainer>
      </Card>

      {/* Feature Importance */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Feature Importance Analysis</h3>
        
        <div className="space-y-3">
          {featureImportance.map((feature, index) => (
            <div key={index} className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-white font-medium">{feature.feature}</span>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                    {feature.category}
                  </Badge>
                </div>
                <span className="text-emerald-400 font-medium">{feature.importance}%</span>
              </div>
              <div className="bg-slate-900/50 rounded-full h-2">
                <div 
                  className="bg-emerald-400 h-2 rounded-full"
                  style={{ width: `${feature.importance}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Capabilities */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">AI Capabilities</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <div key={index} className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4">
                <div className="bg-emerald-500/20 p-3 rounded-lg w-fit mb-3">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="text-white font-medium mb-2">{cap.title}</h4>
                <p className="text-emerald-300/70 text-sm mb-4">{cap.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-emerald-300/70 text-xs">Models</div>
                    <div className="text-white font-medium">{cap.models}</div>
                  </div>
                  <div>
                    <div className="text-emerald-300/70 text-xs">Accuracy</div>
                    <div className="text-emerald-400 font-medium">{cap.accuracy}%</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Training Metrics */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">Model Training Convergence</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trainingMetrics}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="epoch" stroke="#6ee7b7" />
            <YAxis stroke="#6ee7b7" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b98150' }}
              labelStyle={{ color: '#6ee7b7' }}
            />
            <Line type="monotone" dataKey="loss" stroke="#10b981" strokeWidth={2} name="Training Loss" />
            <Line type="monotone" dataKey="valLoss" stroke="#3b82f6" strokeWidth={2} name="Validation Loss" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* API Integration */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-emerald-900/30 border-emerald-500/20 p-6">
        <h3 className="text-white mb-4">AI Model API Integration</h3>
        
        <div className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4 mb-4">
          <div className="text-emerald-300/70 text-sm mb-2">Example: Get Impact Prediction</div>
          <pre className="text-white text-sm overflow-x-auto">
{`// Predict environmental impact
const prediction = await rve.ai.predict({
  model: 'carbon-sequestration',
  projectData: {
    area: 50000, // hectares
    location: { lat: -3.4653, lng: -62.2159 },
    projectType: 'reforestation',
    soilQuality: 'high',
    rainfall: 2400 // mm/year
  },
  timeframe: 10 // years
});

console.log(\`Predicted carbon: \${prediction.carbonSequestration} tCO2e\`);
console.log(\`Confidence: \${prediction.confidence}%\`);`}
          </pre>
        </div>

        <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
          Access AI API Documentation
        </Button>
      </Card>
    </div>
  );
}
