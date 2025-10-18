import { Brain, Mic, TrendingUp, Users, BarChart3, Heart } from 'lucide-react'

export default function Features() {
  const features = [
    { icon: Brain, title: 'AI Forecasting', description: 'Predict demand with 92% accuracy' },
    { icon: Mic, title: 'Voice Commands', description: 'Hands-free kitchen operation' },
    { icon: TrendingUp, title: 'Waste Detection', description: 'Real-time monitoring' },
    { icon: Users, title: 'Redistribution', description: 'Connect with food banks' },
    { icon: BarChart3, title: 'Analytics', description: 'Track your impact' },
    { icon: Heart, title: 'Community', description: 'Feed those in need' }
  ]

  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-dark-card">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          Powered by Intelligence
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="p-8 bg-white dark:bg-dark-bg rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
