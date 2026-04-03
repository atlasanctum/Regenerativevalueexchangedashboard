import { FeatureStub } from '../FeatureStubTemplate';
import { FileText } from 'lucide-react';

export function RegenerativeBonds() {
  return (
    <FeatureStub
      title="Regenerative Bonds"
      description="Fixed-return instruments backed by ecosystem service delivery"
      icon={FileText}
      features={[
        'Fixed coupon payments',
        'Ecosystem-backed collateral',
        'Credit rating system',
        'Secondary trading',
        'Impact-linked returns',
        'Insurance wrapping'
      ]}
    />
  );
}
