import { FeatureStub } from '../FeatureStubTemplate';
import { DollarSign } from 'lucide-react';

export function ROICalculator() {
  return (
    <FeatureStub
      title="ROI Calculator"
      description="Project financial and ecological return across multiple time horizons"
      icon={DollarSign}
      features={[
        'Financial ROI modeling',
        'Ecological ROI metrics',
        'Social impact valuation',
        'Risk-adjusted returns',
        'Time horizon analysis',
        'Portfolio optimization'
      ]}
    />
  );
}
