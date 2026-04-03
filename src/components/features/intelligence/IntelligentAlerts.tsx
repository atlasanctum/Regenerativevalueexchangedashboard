import { FeatureStub } from '../FeatureStubTemplate';
import { AlertTriangle } from 'lucide-react';

export function IntelligentAlerts() {
  return (
    <FeatureStub
      title="Intelligent Alert System"
      description="Real-time notifications for anomalies, risks, and opportunities"
      icon={AlertTriangle}
      features={[
        'Anomaly detection',
        'Price movement alerts',
        'Verification warnings',
        'Market opportunities',
        'Risk notifications',
        'Custom alert rules'
      ]}
    />
  );
}
