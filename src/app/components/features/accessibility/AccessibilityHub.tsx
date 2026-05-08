import { FeatureStub } from '../FeatureStubTemplate';
import { Eye } from 'lucide-react';

export function AccessibilityHub() {
  return (
    <FeatureStub
      title="Accessibility & Inclusion"
      description="Universal access across languages, abilities, and connectivity"
      icon={Eye}
      features={[
        '20+ language support',
        'Voice navigation',
        'Low-bandwidth mode',
        'Screen reader WCAG AAA',
        'Mobile-first design',
        'Offline functionality'
      ]}
    />
  );
}
