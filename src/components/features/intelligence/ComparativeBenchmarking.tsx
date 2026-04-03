import { FeatureStub } from '../FeatureStubTemplate';
import { PieChart } from 'lucide-react';

export function ComparativeBenchmarking() {
  return (
    <FeatureStub
      title="Comparative Benchmarking"
      description="Compare project performance across similar bioregions and methodologies"
      icon={PieChart}
      features={[
        'Bioregional comparisons',
        'Methodology benchmarks',
        'Cost-effectiveness analysis',
        'Best practice identification',
        'Performance metrics',
        'Peer project insights'
      ]}
    />
  );
}
