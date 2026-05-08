import { FeatureStub } from '../FeatureStubTemplate';
import { DollarSign } from 'lucide-react';

export function RegenerativeFinanceHub() {
  return (
    <FeatureStub
      title="Regenerative Finance Hub"
      description="Novel financial primitives for funding regeneration"
      icon={DollarSign}
      features={[
        'Revenue sharing agreements',
        'Regenerative bonds',
        'Staking & yield',
        'Micro-investments',
        'Catalytic capital pools',
        'Blended finance structures'
      ]}
    />
  );
}
