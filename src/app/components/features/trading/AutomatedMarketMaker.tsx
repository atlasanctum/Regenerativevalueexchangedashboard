import { FeatureStub } from '../FeatureStubTemplate';
import { Wallet } from 'lucide-react';

export function AutomatedMarketMaker() {
  return (
    <FeatureStub
      title="Automated Market Maker (AMM)"
      description="Provide liquidity and earn fees from regenerative asset trading"
      icon={Wallet}
      features={[
        'Liquidity pool creation',
        'Dynamic pricing algorithms',
        'LP token rewards',
        'Impermanent loss protection',
        'Multi-asset pools',
        'Yield farming opportunities'
      ]}
    />
  );
}
