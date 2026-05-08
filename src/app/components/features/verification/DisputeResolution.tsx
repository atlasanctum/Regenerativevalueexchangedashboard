import { FeatureStub } from '../FeatureStubTemplate';
import { FileQuestion } from 'lucide-react';

export function DisputeResolution() {
  return (
    <FeatureStub
      title="Verification Dispute Resolution"
      description="Formal challenge mechanism for contesting oracle findings"
      icon={FileQuestion}
      features={[
        'Challenge submission',
        'Evidence upload',
        'Expert panel review',
        'Stakeholder voting',
        'Appeal process',
        'Resolution timeline'
      ]}
    />
  );
}
