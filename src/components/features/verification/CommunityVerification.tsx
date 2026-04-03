import { FeatureStub } from '../FeatureStubTemplate';
import { Users } from 'lucide-react';

export function CommunityVerification() {
  return (
    <FeatureStub
      title="Community Verification"
      description="Allow local communities to validate claims through mobile app"
      icon={Users}
      features={[
        'Mobile verification app',
        'Photo/video evidence',
        'GPS geo-tagging',
        'Community reputation',
        'Reward system',
        'Multi-language support'
      ]}
    />
  );
}
