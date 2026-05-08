import { FeatureStub } from '../FeatureStubTemplate';
import { Search } from 'lucide-react';

export function NaturalLanguageQuery() {
  return (
    <FeatureStub
      title="Natural Language Query"
      description="Search the RVE ecosystem using plain English questions"
      icon={Search}
      features={[
        'Plain English queries',
        'Complex filter combinations',
        'Semantic search',
        'Query suggestions',
        'Save favorite searches',
        'Export results'
      ]}
    />
  );
}
