import { FeatureStub } from '../FeatureStubTemplate';
import { Layers } from 'lucide-react';

export function ImpactBundling() {
  return (
    <FeatureStub
      title="Impact Bundling"
      description="Create diversified portfolios of complementary regenerative assets"
      icon={Layers}
      features={[
        'Portfolio diversification',
        'Carbon + biodiversity bundles',
        'Geographic risk spreading',
        'Custom asset mix',
        'One-click diversified buying',
        'Automated rebalancing'
      ]}
    />
  );
}
