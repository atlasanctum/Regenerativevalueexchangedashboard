import { FeatureStub } from '../FeatureStubTemplate';
import { DollarSign } from 'lucide-react';

export function MicroInvestments() {
  return (
    <FeatureStub
      title="Micro-Investments"
      description="Fractional ownership enabling $10 minimum investments"
      icon={DollarSign}
      features={[
        '$10 minimum investment',
        'Fractional asset ownership',
        'Mobile-first interface',
        'Round-up contributions',
        'Recurring investments',
        'No transaction fees'
      ]}
    />
  );
}
