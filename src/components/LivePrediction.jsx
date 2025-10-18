import { useState, useEffect } from 'react'
import { TrendingUp, Zap, AlertTriangle } from 'lucide-react'

export default function LivePrediction() {
  const [prediction, setPrediction] = useState(340)
  const [confidence, setConfidence] = useState(92)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsProcessing(true)
      setTimeout(() => {
        setPrediction(prev => prev + Math.floor(Math.random() * 10 - 5))
        setConfidence(prev => Math.min(99, prev + Math.random() * 2 - 1))
        setIsProcessing(false)
      }, 1000)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-[2px] shadow-2xl">
      <div className="relative bg-white dark:bg-dark-card rounded-3xl p-8 h-full">
        
        {/* AI Processing Animation */}
        {isProcessing && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 animate-pulse"></div>
        )}

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Zap className="w-8 h-8 text-yellow-500 animate-pulse" />
                <div className="absolute inset-0 bg-yellow-500 blur-xl opacity-50 animate-ping"></div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">Live AI Prediction</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Real-time demand forecasting</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-green-500/20 border border-green-500 rounded-full">
              <span className="text-green-600 dark:text-green-400 font-bold text-sm">● LIVE</span>
            </div>
          </div>

          {/* Massive Prediction Number */}
          <div className="text-center mb-6">
            <div className="text-8xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-2 animate-gradient-text">
              {prediction}
            </div>
            <div className="text-xl text-gray-600 dark:text-gray-400 font-semibold">Expected Covers Today</div>
          </div>

          {/* Confidence Meter */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">AI Confidence</span>
              <span className="text-2xl font-black text-purple-600">{confidence.toFixed(1)}%</span>
            </div>
            <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transition-all duration-500 rounded-full"
                style={{ width: `${confidence}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-700">
              <TrendingUp className="w-5 h-5 text-purple-600 mb-2" />
              <div className="text-sm text-gray-600 dark:text-gray-400">Peak Time</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">7:30 PM</div>
            </div>
            <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl border border-pink-200 dark:border-pink-700">
              <AlertTriangle className="w-5 h-5 text-pink-600 mb-2" />
              <div className="text-sm text-gray-600 dark:text-gray-400">Weather Impact</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">+15%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
