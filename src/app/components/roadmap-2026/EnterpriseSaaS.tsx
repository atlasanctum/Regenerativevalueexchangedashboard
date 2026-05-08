import { Building2, Users, Zap, DollarSign, Settings, TrendingUp } from 'lucide-react';

export function EnterpriseSaaS() {
  const plans = [
    {
      name: 'Enterprise Starter',
      price: '$2,999/mo',
      users: '25 users',
      features: ['White-label platform', 'API access', 'Basic support', '10k transactions/mo'],
    },
    {
      name: 'Enterprise Pro',
      price: '$9,999/mo',
      users: '100 users',
      features: ['Full customization', 'Dedicated support', 'SLA guarantee', '100k transactions/mo'],
    },
    {
      name: 'Enterprise Ultimate',
      price: 'Custom',
      users: 'Unlimited',
      features: ['On-premise deployment', '24/7 support', 'Custom integrations', 'Unlimited transactions'],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          Enterprise SaaS Platform
        </h1>
        <p className="text-emerald-300/70 mt-2">White-label solutions for organizations and institutions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Enterprise Clients', value: '23', icon: Building2 },
          { label: 'Total Users', value: '4,847', icon: Users },
          { label: 'ARR', value: '$2.4M', icon: DollarSign },
          { label: 'Uptime SLA', value: '99.99%', icon: Zap },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-4">
            <stat.icon className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-2xl text-white mb-1">{stat.value}</div>
            <div className="text-emerald-300/70 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`bg-slate-800/50 backdrop-blur-sm border rounded-xl p-6 ${
              idx === 1 ? 'border-emerald-500/50 ring-2 ring-emerald-500/30' : 'border-emerald-500/20'
            }`}
          >
            {idx === 1 && (
              <div className="mb-4">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs border border-emerald-500/30">
                  Most Popular
                </span>
              </div>
            )}
            <h3 className="text-white text-xl mb-2">{plan.name}</h3>
            <div className="text-3xl text-white mb-1">{plan.price}</div>
            <div className="text-emerald-300/70 text-sm mb-6">{plan.users}</div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-emerald-300/70">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5"></div>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
