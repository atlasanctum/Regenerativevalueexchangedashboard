import { Trees, Heart, Palette, Waves, TrendingUp, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const environmentalData = [
  { category: 'Carbon Sequestration', value: 142, projects: 2847 },
  { category: 'Forest Restoration', value: 98, projects: 1923 },
  { category: 'Wetland Revival', value: 76, projects: 1245 },
  { category: 'Soil Regeneration', value: 68, projects: 3421 },
];

const healthData = [
  { category: 'Community Wellness', value: 87, projects: 1567 },
  { category: 'Disease Prevention', value: 65, projects: 892 },
  { category: 'Educational Uplift', value: 61, projects: 2134 },
];

const culturalData = [
  { category: 'Language Preservation', value: 54, projects: 423 },
  { category: 'Traditional Crafts', value: 48, projects: 1876 },
  { category: 'Indigenous Governance', value: 34, projects: 234 },
  { category: 'Heritage Sites', value: 20, projects: 567 },
];

const ecosystemServicesData = [
  { subject: 'Pollination', value: 85 },
  { subject: 'Water Purification', value: 78 },
  { subject: 'Climate Resilience', value: 92 },
  { subject: 'Nutrient Cycling', value: 73 },
  { subject: 'Flood Control', value: 68 },
  { subject: 'Air Quality', value: 81 },
];

export function AssetClasses() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6">
        <h2 className="text-white mb-2">Regenerative Asset Classes</h2>
        <p className="text-emerald-300/80">
          Quantifiable units of ecological restoration, cultural renewal, and human well-being — 
          tokenized and traded as valuable impact assets.
        </p>
      </div>

      {/* Environmental Assets */}
      <div className="bg-black/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <Trees className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white">Environmental Assets</h3>
            <p className="text-emerald-300/70 text-sm">Carbon, forests, wetlands, and soil restoration</p>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={environmentalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#10b981" opacity={0.1} />
            <XAxis dataKey="category" stroke="#6ee7b7" angle={-15} textAnchor="end" height={80} />
            <YAxis stroke="#6ee7b7" label={{ value: 'Value (Billions USD)', angle: -90, position: 'insideLeft', fill: '#6ee7b7' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#064e3b', 
                border: '1px solid #10b981',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {environmentalData.map((item, idx) => (
            <div key={idx} className="bg-emerald-900/20 rounded-lg p-4">
              <div className="text-emerald-400 text-sm mb-1">{item.category}</div>
              <div className="text-white mb-1">${item.value}B</div>
              <div className="text-emerald-300/50 text-sm">{item.projects.toLocaleString()} projects</div>
            </div>
          ))}
        </div>
      </div>

      {/* Health & Social Assets */}
      <div className="bg-black/30 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white">Health & Social Assets</h3>
            <p className="text-blue-300/70 text-sm">Community wellness, disease prevention, and education</p>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={healthData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#3b82f6" opacity={0.1} />
            <XAxis type="number" stroke="#93c5fd" />
            <YAxis type="category" dataKey="category" stroke="#93c5fd" width={150} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e3a8a', 
                border: '1px solid #3b82f6',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Bar dataKey="value" fill="#3b82f6" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {healthData.map((item, idx) => (
            <div key={idx} className="bg-blue-900/20 rounded-lg p-4">
              <div className="text-blue-400 text-sm mb-1">{item.category}</div>
              <div className="text-white mb-1">${item.value}B</div>
              <div className="text-blue-300/50 text-sm">{item.projects.toLocaleString()} projects</div>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Assets */}
      <div className="bg-black/30 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white">Cultural Assets</h3>
            <p className="text-amber-300/70 text-sm">Languages, traditions, crafts, and indigenous systems</p>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={culturalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f59e0b" opacity={0.1} />
            <XAxis dataKey="category" stroke="#fcd34d" angle={-15} textAnchor="end" height={80} />
            <YAxis stroke="#fcd34d" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#78350f', 
                border: '1px solid #f59e0b',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Bar dataKey="value" fill="#f59e0b" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {culturalData.map((item, idx) => (
            <div key={idx} className="bg-amber-900/20 rounded-lg p-4">
              <div className="text-amber-400 text-sm mb-1">{item.category}</div>
              <div className="text-white mb-1">${item.value}B</div>
              <div className="text-amber-300/50 text-sm">{item.projects.toLocaleString()} projects</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ecosystem Services */}
      <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Waves className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white">Ecosystem Services</h3>
            <p className="text-purple-300/70 text-sm">Pollination, water purification, and climate resilience</p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={ecosystemServicesData}>
              <PolarGrid stroke="#8b5cf6" opacity={0.3} />
              <PolarAngleAxis dataKey="subject" stroke="#c4b5fd" />
              <PolarRadiusAxis stroke="#c4b5fd" />
              <Radar name="Service Health" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#4c1d95', 
                  border: '1px solid #8b5cf6',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {ecosystemServicesData.map((item, idx) => (
            <div key={idx} className="bg-purple-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-purple-400 text-sm">{item.subject}</div>
                <CheckCircle className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-white">{item.value}% Health Score</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
