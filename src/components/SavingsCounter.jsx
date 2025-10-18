import { useState, useEffect } from 'react'
import { TrendingUp, Sparkles, IndianRupee } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SavingsCounter() {
  const [savings, setSavings] = useState({
    monthly: 0,
    annual: 0,
    growth: 0
  })

  useEffect(() => {
    // Animate counter from 0 to target values
    const targetMonthly = 46926 // ₹5,621 USD = ~₹469,260 INR
    const targetAnnual = 563112  // $67,447 USD = ~₹5,631,047 INR
    const targetGrowth = 23

    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = duration / steps

    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setSavings({
        monthly: Math.floor(targetMonthly * progress),
        annual: Math.floor(targetAnnual * progress),
        growth: Math.floor(targetGrowth * progress)
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setSavings({
          monthly: targetMonthly,
          annual: targetAnnual,
          growth: targetGrowth
        })
      }
    }, increment)

    return () => clearInterval(interval)
  }, [])

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>

      {/* Header with Indian Rupee Icon */}
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
          <IndianRupee className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-lg font-bold">Total Savings</h2>
          <p className="text-white/80 text-sm">This Month</p>
        </div>
      </div>

      {/* Main Amount */}
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="mb-4"
        >
          <h1 className="text-6xl font-black mb-2">
            {formatINR(savings.monthly)}
          </h1>
          <div className="flex items-center gap-2 text-white/90">
            <TrendingUp className="w-5 h-5" />
            <span className="text-lg font-semibold">
              ↑ {savings.growth}% from last month
            </span>
          </div>
        </motion.div>

        {/* Projected Annual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Projected Annual</p>
              <p className="text-3xl font-black">
                {formatINR(savings.annual)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-400/30 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Animation Circles */}
      <div className="absolute bottom-4 right-4 opacity-20">
        <div className="w-20 h-20 border-2 border-white rounded-full animate-pulse"></div>
      </div>
    </motion.div>
  )
}
