import { FeatureStub } from '../FeatureStubTemplate';
import { TrendingUp } from 'lucide-react';

export function StakingYield() {
  return (
    <FeatureStub
      title="Staking & Yield"
      description="Stake RVE tokens to earn yield from transaction fees and protocol revenue"
      icon={TrendingUp}
      features={[
        'Token staking pools',
        'Variable APY rates',
        'Lock-up periods',
        'Auto-compounding',
        'Governance rights',
        'Early unstaking penalties'
      ]}
    />
  );
}
