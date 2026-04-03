import { FeatureStub } from '../FeatureStubTemplate';
import { AlertTriangle } from 'lucide-react';

export function WhistleblowerPortal() {
  return (
    <FeatureStub
      title="Whistleblower Portal"
      description="Anonymous reporting channel for fraudulent claims with bounty rewards"
      icon={AlertTriangle}
      features={[
        'Anonymous submission',
        'Encrypted communications',
        'Identity protection',
        'Bounty rewards',
        'Investigation tracking',
        'Legal protection'
      ]}
    />
  );
}
