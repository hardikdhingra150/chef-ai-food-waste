import { useState, useEffect } from 'react'
import { Wifi } from 'lucide-react'
import DashboardSidebar from '../components/DashboardSidebar'
import StatsPanel from '../components/StatsPanel'
import LivePrediction from '../components/LivePrediction'
import WasteHeatmap from '../components/WasteHeatmap'
import SavingsCounter from '../components/SavingsCounter'
import AIChatBot from '../components/AIChatBot'
import Leaderboard from '../components/Leaderboard'
import RecipeGenerator from '../components/RecipeGenerator'
import ExportReports from '../components/ExportReports'
import SupplyManager from '../components/SupplyManager'
import VoiceInterface from '../components/VoiceInterface'
import VoiceAssistant from '../components/VoiceAssistant'
import WasteAnalytics from '../components/WasteAnalytics'
import FoodRedistribution from '../components/FoodRedistribution'
import ExpiryTracker from '../components/ExpiryTracker'
import DarkModeToggle from '../components/DarkModeToggle'
import AnimatedBackground from '../components/AnimatedBackground'
import CameraUpload from '../components/CameraUpload'
import NotificationCenter from '../components/NotificationCenter'
import Settings from './Settings'
import { motion } from 'framer-motion'

// Import API services
import { dashboardService } from '../services/dashboardService'
import { predictionService } from '../services/predictionService'
import { inventoryService } from '../services/inventoryService'

export default function Dashboard() {
  const [activePage, setActivePage] = useState('overview')
  
  // Real data from backend
  const [stats, setStats] = useState({
    predictedCovers: '340',
    wastePrevented: '45 lbs',
    surplusItems: '18',
    mealsDonated: '127'
  })
  
  const [prediction, setPrediction] = useState(null)
  const [supplies, setSupplies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch dashboard data on mount
  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch all data in parallel
      const [statsData, predictionData, suppliesData] = await Promise.all([
        dashboardService.getStats().catch(err => {
          console.warn('Stats API not available, using default data')
          return { data: stats }
        }),
        predictionService.getDemandPrediction().catch(err => {
          console.warn('Prediction API not available')
          return { data: null }
        }),
        inventoryService.getSupplies().catch(err => {
          console.warn('Inventory API not available')
          return { data: [] }
        })
      ])

      // Update state with real data
      if (statsData?.data) {
        setStats(statsData.data)
      }
      
      if (predictionData?.data) {
        setPrediction(predictionData.data)
      }
      
      if (suppliesData?.data) {
        setSupplies(suppliesData.data)
      }

    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  // Refresh data when switching to overview page
  useEffect(() => {
    if (activePage === 'overview') {
      fetchDashboardData()
    }
  }, [activePage])

  const renderContent = () => {
    if (loading && activePage === 'overview') {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading dashboard data...</p>
          </div>
        </div>
      )
    }

    if (error && activePage === 'overview') {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl">⚠️</span>
            </div>
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )
    }

    switch (activePage) {
      case 'overview':
        return (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <StatsPanel stats={stats} />
            
            <div className="grid lg:grid-cols-2 gap-8">
              <LivePrediction prediction={prediction} />
              <SavingsCounter />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <RecipeGenerator />
              <ExportReports />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <WasteHeatmap />
              </div>
              <ExpiryTracker supplies={supplies} />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Leaderboard />
              <AIChatBot />
            </div>
          </motion.div>
        )

      case 'inventory':
        return (
          <motion.div
            key="inventory"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SupplyManager onUpdate={fetchDashboardData} />
          </motion.div>
        )

      case 'analytics':
        return (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <WasteAnalytics />
          </motion.div>
        )

      case 'donations':
        return (
          <motion.div
            key="donations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FoodRedistribution />
          </motion.div>
        )

      case 'settings':
        return (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Settings />
          </motion.div>
        )
        
      case 'voice':
        return (
          <motion.div
            key="voice"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <VoiceAssistant />
          </motion.div>
        )

      default:
        return <StatsPanel stats={stats} />
    }
  }

  return (
    <div className="min-h-screen relative">
      
      <AnimatedBackground />
      
      {/* Fixed Sidebar */}
      <DashboardSidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content - WITH LEFT PADDING FOR SIDEBAR */}
      <div className="ml-64 relative">
        
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 bg-white/70 dark:bg-dark-card/70 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 px-8 py-4 shadow-lg">
          <div className="flex justify-between items-center">
            
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent capitalize">
                {activePage}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Welcome back, Restaurant Owner 👋
              </p>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              
              {/* Live Status */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/50 shadow-lg">
                <div className="relative">
                  <Wifi className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <div className="absolute inset-0 bg-green-500 blur-md opacity-50 animate-pulse"></div>
                </div>
                <span className="text-green-600 dark:text-green-400 text-sm font-bold">Live</span>
              </div>

              {/* Camera Upload */}
              <CameraUpload onUploadSuccess={fetchDashboardData} />

              {/* Notifications */}
              <div className="relative">
                <NotificationCenter />
              </div>

              {/* Dark Mode Toggle */}
              <DarkModeToggle />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="p-8 text-center text-sm text-gray-500 dark:text-gray-600">
          <p>CHEF AI - Powered by Predictive Intelligence & Gemini 2.5 Flash</p>
          <p className="mt-1">© 2025 All Rights Reserved</p>
        </div>
      </div>
    </div>
  )
}
