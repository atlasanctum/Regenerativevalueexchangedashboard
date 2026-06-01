import { useState } from 'react';
import { Shield, Lock, AlertTriangle, CheckCircle, Eye, Key, UserCheck, FileCheck } from 'lucide-react';
import { Card } from '../ui/interactive/Card';
import { InteractiveChart } from '../ui/interactive/InteractiveChart';
import { motion } from 'motion/react';

export function SecurityDashboard() {
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);

  const securityLayers = [
    {
      layer: 'Network Security',
      status: 'protected',
      threats: 0,
      controls: ['DDoS Protection', 'WAF', 'Rate Limiting', 'IP Filtering'],
      coverage: 98,
    },
    {
      layer: 'Application Security',
      status: 'protected',
      threats: 2,
      controls: ['Input Validation', 'SQL Injection Prevention', 'XSS Protection', 'CSRF Tokens'],
      coverage: 96,
    },
    {
      layer: 'Identity & Access',
      status: 'protected',
      threats: 1,
      controls: ['Multi-Factor Auth', 'Role-Based Access', 'JWT Tokens', 'Session Management'],
      coverage: 99,
    },
    {
      layer: 'Data Encryption',
      status: 'protected',
      threats: 0,
      controls: ['TLS 1.3', 'AES-256 Encryption', 'Key Rotation', 'Secure Storage'],
      coverage: 100,
    },
    {
      layer: 'Blockchain Security',
      status: 'protected',
      threats: 0,
      controls: ['Smart Contract Audits', 'Consensus Security', 'Private Key Management'],
      coverage: 97,
    },
  ];

  const threats = [
    {
      id: 'THR-001',
      type: 'Suspicious Login Attempt',
      severity: 'medium',
      timestamp: '2 minutes ago',
      status: 'mitigated',
      source: '103.45.23.189',
      action: 'IP Blocked',
    },
    {
      id: 'THR-002',
      type: 'API Rate Limit Exceeded',
      severity: 'low',
      timestamp: '8 minutes ago',
      status: 'mitigated',
      source: '45.67.89.12',
      action: 'Rate Limited',
    },
    {
      id: 'THR-003',
      type: 'Unusual Data Access Pattern',
      severity: 'medium',
      timestamp: '15 minutes ago',
      status: 'investigating',
      source: 'Internal',
      action: 'Alert Sent',
    },
  ];

  const securityMetrics = [
    { date: 'May 1', blocked: 234, allowed: 8472 },
    { date: 'May 2', blocked: 189, allowed: 8923 },
    { date: 'May 3', blocked: 312, allowed: 9124 },
    { date: 'May 4', blocked: 267, allowed: 8978 },
    { date: 'May 5', blocked: 198, allowed: 9247 },
    { date: 'May 6', blocked: 223, allowed: 9384 },
    { date: 'May 7', blocked: 245, allowed: 9512 },
    { date: 'May 8', blocked: 178, allowed: 9628 },
  ];

  const complianceStatus = [
    { standard: 'SOC 2 Type II', status: 'compliant', lastAudit: 'Mar 2026', nextAudit: 'Sep 2026' },
    { standard: 'ISO 27001', status: 'compliant', lastAudit: 'Feb 2026', nextAudit: 'Aug 2026' },
    { standard: 'GDPR', status: 'compliant', lastAudit: 'Jan 2026', nextAudit: 'Jul 2026' },
    { standard: 'HIPAA', status: 'in-progress', lastAudit: 'Dec 2025', nextAudit: 'Jun 2026' },
    { standard: 'PCI DSS', status: 'compliant', lastAudit: 'Apr 2026', nextAudit: 'Oct 2026' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white flex items-center gap-3">
          <Shield className="w-8 h-8 text-emerald-400" />
          Security Architecture & Threat Dashboard
        </h1>
        <p className="text-emerald-300/70 mt-2">
          Multi-layer security monitoring with real-time threat detection and compliance tracking
        </p>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Security Score', value: '98.2/100', icon: Shield, color: 'emerald' },
          { label: 'Active Threats', value: '3', icon: AlertTriangle, color: 'yellow' },
          { label: 'Mitigated (24h)', value: '847', icon: CheckCircle, color: 'emerald' },
          { label: 'Compliance Status', value: '96%', icon: FileCheck, color: 'blue' },
        ].map((metric, idx) => {
          const Icon = metric.icon;
          const iconColor =
            metric.color === 'emerald' ? 'text-emerald-400 bg-emerald-400/20' :
            metric.color === 'yellow' ? 'text-yellow-400 bg-yellow-400/20' :
            'text-blue-400 bg-blue-400/20';

          return (
            <Card key={idx} hover={false}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 ${iconColor} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-emerald-300/70 text-sm">{metric.label}</div>
                  <div className="text-white text-xl">{metric.value}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Security Layers */}
      <Card hover={false}>
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          Multi-Layer Security Architecture
        </h3>
        <div className="space-y-3">
          {securityLayers.map((layer, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/30 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-white">{layer.layer}</div>
                    <div className="text-emerald-300/50 text-xs">
                      {layer.threats} active threats
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-emerald-400 text-sm">{layer.coverage}% Coverage</div>
                    <div className="text-emerald-300/50 text-xs">{layer.status}</div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {layer.controls.map((control, cidx) => (
                  <div
                    key={cidx}
                    className="px-2 py-1 bg-emerald-400/10 rounded text-emerald-400 text-xs border border-emerald-400/30"
                  >
                    {control}
                  </div>
                ))}
              </div>

              <div className="mt-3">
                <div className="w-full bg-slate-900/50 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${layer.coverage}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Threat Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card hover={false}>
          <h3 className="text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Recent Security Events
          </h3>
          <div className="space-y-3">
            {threats.map((threat, idx) => (
              <motion.div
                key={threat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-800/30 rounded-lg p-3 cursor-pointer hover:bg-slate-800/50 transition-colors"
                onClick={() => setSelectedThreat(threat.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="text-white text-sm mb-1">{threat.type}</div>
                    <div className="text-emerald-300/50 text-xs">{threat.id} • {threat.timestamp}</div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    threat.severity === 'high' ? 'bg-red-400/20 text-red-400' :
                    threat.severity === 'medium' ? 'bg-yellow-400/20 text-yellow-400' :
                    'bg-blue-400/20 text-blue-400'
                  }`}>
                    {threat.severity}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-300/70 text-xs">Source: {threat.source}</span>
                  <span className={`text-xs ${
                    threat.status === 'mitigated' ? 'text-emerald-400' : 'text-yellow-400'
                  }`}>
                    {threat.action}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <InteractiveChart
          title="Security Events (Last 7 Days)"
          data={securityMetrics}
          type="area"
          xAxisKey="date"
          dataKeys={[
            { key: 'blocked', color: '#ef4444', name: 'Blocked' },
            { key: 'allowed', color: '#10b981', name: 'Allowed' },
          ]}
          height={300}
        />
      </div>

      {/* Compliance Status */}
      <Card hover={false}>
        <h3 className="text-white mb-4 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-emerald-400" />
          Regulatory Compliance Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {complianceStatus.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/30 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-white">{item.standard}</div>
                {item.status === 'compliant' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                )}
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-emerald-300/50">Last Audit:</span>
                  <span className="text-emerald-300">{item.lastAudit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-300/50">Next Audit:</span>
                  <span className="text-emerald-300">{item.nextAudit}</span>
                </div>
              </div>
              <div className={`mt-3 text-center py-1 rounded text-xs ${
                item.status === 'compliant'
                  ? 'bg-emerald-400/20 text-emerald-400'
                  : 'bg-yellow-400/20 text-yellow-400'
              }`}>
                {item.status.toUpperCase()}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Access Control */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card hover={false}>
          <h3 className="text-white mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-emerald-400" />
            Access Control Matrix
          </h3>
          <div className="space-y-3">
            {[
              { role: 'System Admin', permissions: 24, users: 3, lastAccess: '5m ago' },
              { role: 'Developer', permissions: 18, users: 12, lastAccess: '12m ago' },
              { role: 'Auditor', permissions: 8, users: 5, lastAccess: '23m ago' },
              { role: 'Viewer', permissions: 4, users: 847, lastAccess: 'Active' },
            ].map((role, idx) => (
              <div key={idx} className="bg-slate-800/30 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white text-sm">{role.role}</div>
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-emerald-300/50">Permissions</div>
                    <div className="text-white">{role.permissions}</div>
                  </div>
                  <div>
                    <div className="text-emerald-300/50">Users</div>
                    <div className="text-white">{role.users}</div>
                  </div>
                  <div>
                    <div className="text-emerald-300/50">Last Access</div>
                    <div className="text-emerald-400">{role.lastAccess}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card hover={false}>
          <h3 className="text-white mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-emerald-400" />
            Audit Trail (Recent)
          </h3>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {[
              { user: 'admin@rve.com', action: 'Updated security policy', time: '3m ago' },
              { user: 'dev@rve.com', action: 'Deployed smart contract', time: '8m ago' },
              { user: 'auditor@rve.com', action: 'Downloaded compliance report', time: '15m ago' },
              { user: 'system', action: 'Rotated encryption keys', time: '22m ago' },
              { user: 'admin@rve.com', action: 'Added new user role', time: '34m ago' },
              { user: 'system', action: 'Completed security scan', time: '1h ago' },
            ].map((entry, idx) => (
              <div key={idx} className="bg-slate-800/30 rounded p-2 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white">{entry.user}</span>
                  <span className="text-emerald-300/50">{entry.time}</span>
                </div>
                <div className="text-emerald-300/70">{entry.action}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
