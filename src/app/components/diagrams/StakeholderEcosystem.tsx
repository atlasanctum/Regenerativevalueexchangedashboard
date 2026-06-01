import { useState } from 'react';
import { Users, Building2, Leaf, Shield, Vote, TrendingUp, Network } from 'lucide-react';
import { Card } from '../ui/interactive/Card';
import { Modal } from '../ui/interactive/Modal';
import { motion } from 'motion/react';

interface Stakeholder {
  id: string;
  name: string;
  type: 'regenerator' | 'investor' | 'verifier' | 'governor' | 'consumer';
  count: number;
  icon: any;
  interactions: string[];
  permissions: string[];
  incentives: string[];
}

export function StakeholderEcosystem() {
  const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(null);
  const [showModal, setShowModal] = useState(false);

  const stakeholders: Stakeholder[] = [
    {
      id: 'regenerators',
      name: 'Regenerative Projects',
      type: 'regenerator',
      count: 4728,
      icon: Leaf,
      interactions: ['Submit impact data', 'Mint RIUs', 'Receive funding', 'Report progress'],
      permissions: ['Asset registration', 'Data submission', 'Token minting requests'],
      incentives: ['Revenue from RIU sales', 'Impact premiums', 'Staking rewards', 'Reputation building'],
    },
    {
      id: 'investors',
      name: 'Impact Investors',
      type: 'investor',
      count: 87400,
      icon: TrendingUp,
      interactions: ['Buy RIUs', 'Trade on markets', 'Stake tokens', 'Vote on governance'],
      permissions: ['Primary market access', 'Secondary trading', 'Staking', 'Governance participation'],
      incentives: ['Capital appreciation', 'Staking yields (8.4% APY)', 'Impact attribution', 'Tax benefits'],
    },
    {
      id: 'verifiers',
      name: 'Oracle Verifiers',
      type: 'verifier',
      count: 2847,
      icon: Shield,
      interactions: ['Verify impact data', 'Consensus voting', 'Audit reports', 'Dispute resolution'],
      permissions: ['Data verification', 'Oracle operations', 'Consensus participation', 'Audit access'],
      incentives: ['Verification fees', 'Consensus rewards', 'Reputation staking', 'Network security bonuses'],
    },
    {
      id: 'governors',
      name: 'Governance Participants',
      type: 'governor',
      count: 12847,
      icon: Vote,
      interactions: ['Submit proposals', 'Vote on changes', 'Treasury management', 'Parameter updates'],
      permissions: ['Proposal submission', 'Voting rights', 'Treasury oversight', 'Emergency actions'],
      incentives: ['Governance rewards', 'Protocol fees share', 'Network influence', 'Early access to features'],
    },
    {
      id: 'consumers',
      name: 'Corporate Buyers',
      type: 'consumer',
      count: 284,
      icon: Building2,
      interactions: ['Purchase offsets', 'Retire RIUs', 'ESG reporting', 'Supply chain integration'],
      permissions: ['Bulk purchasing', 'Retirement claims', 'Reporting access', 'API integration'],
      incentives: ['Carbon neutrality', 'ESG compliance', 'Brand reputation', 'Regulatory compliance'],
    },
  ];

  const interactions = [
    { from: 'regenerators', to: 'verifiers', flow: 'Impact Data', volume: '8.4K/day' },
    { from: 'verifiers', to: 'regenerators', flow: 'Verification Reports', volume: '8.2K/day' },
    { from: 'regenerators', to: 'investors', flow: 'RIU Tokens', volume: '$284M' },
    { from: 'investors', to: 'regenerators', flow: 'Funding', volume: '$847M' },
    { from: 'investors', to: 'consumers', flow: 'RIU Sales', volume: '$19.3M/day' },
    { from: 'consumers', to: 'investors', flow: 'Payments', volume: '$19.3M/day' },
    { from: 'governors', to: 'regenerators', flow: 'Policy Updates', volume: '12/month' },
    { from: 'governors', to: 'verifiers', flow: 'Standards', volume: '8/month' },
  ];

  const valueFlows = [
    { category: 'Primary Market', from: 'Investors', to: 'Projects', value: '$284M', description: 'Initial RIU purchases' },
    { category: 'Secondary Market', from: 'Investors', to: 'Investors', value: '$19.3M/day', description: 'RIU trading' },
    { category: 'Verification Fees', from: 'Projects', to: 'Oracles', value: '$12.4M', description: 'Impact verification' },
    { category: 'Staking Rewards', from: 'Protocol', to: 'Investors', value: '$12.4M', description: 'Yield generation' },
    { category: 'Governance Rewards', from: 'Protocol', to: 'Governors', value: '$2.8M', description: 'Participation incentives' },
    { category: 'Corporate Offsets', from: 'Corporates', to: 'Investors', value: '$47M', description: 'Bulk RIU purchases' },
  ];

  const handleStakeholderClick = (stakeholder: Stakeholder) => {
    setSelectedStakeholder(stakeholder);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white flex items-center gap-3">
          <Users className="w-8 h-8 text-emerald-400" />
          Stakeholder Ecosystem & Value Flows
        </h1>
        <p className="text-emerald-300/70 mt-2">
          Interactive network visualization of all participants and their economic relationships
        </p>
      </div>

      {/* Ecosystem Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stakeholders.map((stakeholder, idx) => {
          const Icon = stakeholder.icon;
          return (
            <Card key={idx} hover onClick={() => handleStakeholderClick(stakeholder)}>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-emerald-400/20 rounded-full flex items-center justify-center mb-3">
                  <Icon className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-white text-sm mb-1">{stakeholder.name}</div>
                <div className="text-emerald-400 text-xl">{stakeholder.count.toLocaleString()}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Network Diagram */}
      <Card hover={false} className="p-6">
        <h3 className="text-white mb-6 flex items-center gap-2">
          <Network className="w-5 h-5 text-emerald-400" />
          Stakeholder Interaction Network
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {stakeholders.map((stakeholder, idx) => {
            const Icon = stakeholder.icon;
            return (
              <motion.div
                key={stakeholder.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <div
                  onClick={() => handleStakeholderClick(stakeholder)}
                  className="w-24 h-24 bg-slate-800 rounded-full flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 transition-all border-2 border-emerald-500/30 hover:border-emerald-400"
                >
                  <Icon className="w-8 h-8 text-emerald-400 mb-1" />
                  <div className="text-emerald-300 text-xs text-center px-2">{stakeholder.count.toLocaleString()}</div>
                </div>
                <div className="text-white text-xs text-center mt-2">{stakeholder.name}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Connection Lines Visualization */}
        <div className="mt-8 bg-slate-800/30 rounded-lg p-4">
          <div className="text-emerald-300/70 text-sm mb-3">Key Interactions (Daily)</div>
          <div className="space-y-2">
            {interactions.map((interaction, idx) => {
              const fromStakeholder = stakeholders.find(s => s.id === interaction.from);
              const toStakeholder = stakeholders.find(s => s.id === interaction.to);
              return (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <div className="text-emerald-300">{fromStakeholder?.name}</div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 h-px bg-gradient-to-r from-emerald-400 to-blue-400" />
                    <div className="text-emerald-300/70 bg-slate-900/50 px-2 py-1 rounded">
                      {interaction.flow}
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-blue-400 to-purple-400" />
                  </div>
                  <div className="text-emerald-300">{toStakeholder?.name}</div>
                  <div className="text-emerald-400 min-w-[80px] text-right">{interaction.volume}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Value Flows */}
      <Card hover={false}>
        <h3 className="text-white mb-4">Economic Value Flows</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {valueFlows.map((flow, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/30 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-white text-sm">{flow.category}</div>
                <div className="text-emerald-400 font-semibold">{flow.value}</div>
              </div>
              <div className="flex items-center gap-2 mb-2 text-xs text-emerald-300/70">
                <span>{flow.from}</span>
                <span>→</span>
                <span>{flow.to}</span>
              </div>
              <div className="text-emerald-300/50 text-xs">{flow.description}</div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Permissions Matrix */}
      <Card hover={false}>
        <h3 className="text-white mb-4">Permissions & Access Control</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-emerald-500/20">
                <th className="text-left text-emerald-300/70 pb-2 pr-4">Stakeholder</th>
                <th className="text-center text-emerald-300/70 pb-2 px-2">Register</th>
                <th className="text-center text-emerald-300/70 pb-2 px-2">Verify</th>
                <th className="text-center text-emerald-300/70 pb-2 px-2">Trade</th>
                <th className="text-center text-emerald-300/70 pb-2 px-2">Govern</th>
                <th className="text-center text-emerald-300/70 pb-2 px-2">Audit</th>
              </tr>
            </thead>
            <tbody>
              {stakeholders.map((stakeholder, idx) => (
                <tr key={idx} className="border-b border-emerald-500/10">
                  <td className="py-3 pr-4 text-white">{stakeholder.name}</td>
                  <td className="text-center px-2">
                    {stakeholder.type === 'regenerator' ? '✓' : '−'}
                  </td>
                  <td className="text-center px-2">
                    {stakeholder.type === 'verifier' ? '✓' : '−'}
                  </td>
                  <td className="text-center px-2">
                    {stakeholder.type === 'investor' || stakeholder.type === 'consumer' ? '✓' : '−'}
                  </td>
                  <td className="text-center px-2">
                    {stakeholder.type === 'governor' || stakeholder.type === 'investor' ? '✓' : '−'}
                  </td>
                  <td className="text-center px-2">
                    {stakeholder.type === 'verifier' || stakeholder.type === 'governor' ? '✓' : '−'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Stakeholder Details Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedStakeholder?.name || ''}
        size="lg"
      >
        {selectedStakeholder && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-emerald-300/50 text-sm mb-1">Participants</div>
                <div className="text-white text-2xl">{selectedStakeholder.count.toLocaleString()}</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-emerald-300/50 text-sm mb-1">Type</div>
                <div className="text-white text-2xl capitalize">{selectedStakeholder.type}</div>
              </div>
            </div>

            <div>
              <h4 className="text-white mb-3">Key Interactions</h4>
              <div className="space-y-2">
                {selectedStakeholder.interactions.map((interaction, idx) => (
                  <div key={idx} className="bg-slate-800/30 rounded p-2 text-emerald-300 text-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                    {interaction}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white mb-3">Permissions</h4>
              <div className="flex flex-wrap gap-2">
                {selectedStakeholder.permissions.map((permission, idx) => (
                  <div key={idx} className="px-3 py-1 bg-emerald-400/10 rounded border border-emerald-400/30 text-emerald-400 text-xs">
                    {permission}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white mb-3">Incentives</h4>
              <div className="space-y-2">
                {selectedStakeholder.incentives.map((incentive, idx) => (
                  <div key={idx} className="bg-slate-800/30 rounded p-2 text-emerald-300 text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    {incentive}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
