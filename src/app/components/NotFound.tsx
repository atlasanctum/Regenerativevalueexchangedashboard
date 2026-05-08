import { Link } from 'react-router';
import { AlertTriangle, Home } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

export function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="bg-slate-900/50 border-emerald-500/20 p-12 text-center max-w-md">
        <AlertTriangle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
        <h2 className="text-white mb-2">Page Not Found</h2>
        <p className="text-emerald-300/70 mb-6">
          The page you're looking for doesn't exist in the RVE ecosystem.
        </p>
        <Link to="/">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </Button>
        </Link>
      </Card>
    </div>
  );
}
