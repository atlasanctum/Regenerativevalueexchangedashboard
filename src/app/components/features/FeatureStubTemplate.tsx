import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { LucideIcon } from 'lucide-react';

interface FeatureStubProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export function FeatureStub({ title, description, icon: Icon, features }: FeatureStubProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-white mb-1">{title}</h2>
          <p className="text-emerald-300/70">{description}</p>
        </div>
      </div>

      <Card className="bg-slate-900/50 border-emerald-500/20 p-8">
        <Icon className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
        <h3 className="text-white text-center mb-4">Feature Implementation</h3>
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-emerald-300/70 text-center mb-6">
            This advanced feature is part of the RVE ecosystem enhancement roadmap.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {features.map((feature, idx) => (
              <div key={`feature-${idx}`} className="bg-emerald-400/10 border border-emerald-500/20 rounded-lg p-3">
                <div className="text-emerald-400 text-sm">✓ {feature}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
