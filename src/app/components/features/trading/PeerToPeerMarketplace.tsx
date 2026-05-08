import { FeatureStub } from '../FeatureStubTemplate';
import { ArrowLeftRight } from 'lucide-react';

export function PeerToPeerMarketplace() {
  return (
    <FeatureStub
      title="Peer-to-Peer Marketplace"
      description="Direct trading between verified buyers without intermediaries"
      icon={ArrowLeftRight}
      features={[
        'Direct buyer-seller matching',
        'Escrow smart contracts',
        'Reputation system',
        'Custom deal terms',
        'OTC large block trades',
        'Negotiation tools'
      ]}
    />
  );
}
