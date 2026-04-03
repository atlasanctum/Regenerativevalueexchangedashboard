import { FeatureStub } from '../FeatureStubTemplate';
import { Box } from 'lucide-react';

export function Site3DVisualization() {
  return (
    <FeatureStub
      title="3D Site Visualization"
      description="Photogrammetry and LiDAR-based virtual site visits for due diligence"
      icon={Box}
      features={[
        'Photogrammetry reconstruction',
        'LiDAR point clouds',
        'Virtual site tours',
        'Before/after comparisons',
        'Measurement tools',
        'Annotation system'
      ]}
    />
  );
}
