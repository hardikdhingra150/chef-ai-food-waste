import { motion } from 'framer-motion'
import { TrendingDown, Activity, Leaf } from 'lucide-react'

export default function StatsPanel({ stats }) {
  const metrics = [
    { 
      label: 'Predicted Covers', 
      value: stats?.predictedCovers || '340', 
      icon: Activity, 
      color: 'from-cyan-500 to-blue-600',
      bg: 'from-cyan-500/10 to-blue-600/10',
      border: 'border-cyan-500/20'
    },
    { 
      label: 'Waste Prevented', 
      value: stats?.wastePrevented || '45 lbs', 
      icon: TrendingDown, 
      color: 'from-green-500 to-emerald-600',
      bg: 'from-green-500/10 to-emerald-600/10',
      border: 'border-green-500/20'
    },
    { 
      label: 'Surplus Items', 
      value: stats?.surplusItems || '18', 
      icon: Leaf, 
      color: 'from-orange-500 to-red-600',
      bg: 'from-orange-500/10 to-red-600/10',
      border: 'border-orange-500/20'
    },
    { 
      label: 'Meals Donated', 
      value: stats?.mealsDonated || '127', 
      icon: Leaf, 
      color: 'from-purple-500 to-pink-600',
      bg: 'from-purple-500/10 to-pink-600/10',
      border: 'border-purple-500/20'
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className={`relative group overflow-hidden rounded-2xl border ${metric.border} bg-gradient-to-br ${metric.bg} backdrop-blur-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300`}
        >
          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
          
          <div className="relative">
            {/* Icon with gradient */}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4 shadow-lg`}>
              <metric.icon className="w-6 h-6 text-white" />
            </div>

            {/* Value with gradient */}
            <div className={`text-4xl font-black mb-2 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
              {metric.value}
            </div>

            {/* Label */}
            <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">
              {metric.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
