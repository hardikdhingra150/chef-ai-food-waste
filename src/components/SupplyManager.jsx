import { useState } from 'react'
import { Plus, Package, TrendingDown, AlertCircle, Edit2, Trash2, Search, Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SupplyManager() {
  const [supplies, setSupplies] = useState([
    { id: 1, name: 'Rice', bought: 50, used: 35, unit: 'kg', category: 'Grains', lastUpdated: '2 hours ago' },
    { id: 2, name: 'Eggs', bought: 200, used: 150, unit: 'pcs', category: 'Dairy', lastUpdated: '30 mins ago' },
    { id: 3, name: 'Milk', bought: 30, used: 22, unit: 'liters', category: 'Dairy', lastUpdated: '1 hour ago' },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [newSupply, setNewSupply] = useState({
    name: '',
    bought: '',
    used: '',
    unit: 'kg',
    category: 'Grains'
  })

  const categories = ['Grains', 'Dairy', 'Vegetables', 'Meat', 'Bakery', 'Other']
  const units = ['kg', 'liters', 'pcs', 'grams', 'ml']

  const handleAddSupply = (e) => {
    e.preventDefault()
    if (newSupply.name && newSupply.bought) {
      setSupplies([
        ...supplies,
        {
          id: Date.now(),
          name: newSupply.name,
          bought: parseFloat(newSupply.bought),
          used: parseFloat(newSupply.used) || 0,
          unit: newSupply.unit,
          category: newSupply.category,
          lastUpdated: 'Just now'
        }
      ])
      setNewSupply({ name: '', bought: '', used: '', unit: 'kg', category: 'Grains' })
      setShowAddForm(false)
    }
  }

  const handleUpdateUsed = (id, value) => {
    setSupplies(supplies.map(supply =>
      supply.id === id ? { ...supply, used: parseFloat(value) || 0, lastUpdated: 'Just now' } : supply
    ))
  }

  const handleDelete = (id) => {
    setSupplies(supplies.filter(s => s.id !== id))
  }

  const calculateRemaining = (bought, used) => bought - used
  const calculateWaste = (bought, used) => {
    const remaining = bought - used
    return ((remaining / bought) * 100).toFixed(1)
  }

  const filteredSupplies = supplies.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getCategoryColor = (category) => {
    const colors = {
      'Grains': 'from-amber-500 to-orange-600',
      'Dairy': 'from-blue-500 to-cyan-600',
      'Vegetables': 'from-green-500 to-emerald-600',
      'Meat': 'from-red-500 to-rose-600',
      'Bakery': 'from-yellow-500 to-amber-600',
      'Other': 'from-purple-500 to-pink-600'
    }
    return colors[category] || colors['Other']
  }

  return (
    <div className="space-y-6">
      
      {/* Header Section with Search and Add Button */}
      <div className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-dark-card dark:via-dark-bg dark:to-dark-card rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
              Supply Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Track inventory bought vs used in real-time</p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search supplies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:border-primary focus:outline-none transition-all"
              />
            </div>

            {/* Add Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all glow-green-hover"
            >
              <Plus className="w-5 h-5" />
              Add Supply
            </motion.button>
          </div>
        </div>
      </div>

      {/* Add New Supply Form - Enhanced */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-gradient-to-br from-primary/5 to-primary-dark/5 dark:from-primary/10 dark:to-primary-dark/10 rounded-3xl p-8 border-2 border-primary/20 shadow-xl">
              <h4 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <Plus className="w-6 h-6 text-primary" />
                Add New Supply Item
              </h4>
              <form onSubmit={handleAddSupply} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <input
                  type="text"
                  placeholder="Supply name (e.g., Rice)"
                  value={newSupply.name}
                  onChange={(e) => setNewSupply({ ...newSupply, name: e.target.value })}
                  className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:border-primary focus:outline-none"
                  required
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="Quantity bought"
                  value={newSupply.bought}
                  onChange={(e) => setNewSupply({ ...newSupply, bought: e.target.value })}
                  className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:border-primary focus:outline-none"
                  required
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="Quantity used (optional)"
                  value={newSupply.used}
                  onChange={(e) => setNewSupply({ ...newSupply, used: e.target.value })}
                  className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:border-primary focus:outline-none"
                />
                <select
                  value={newSupply.unit}
                  onChange={(e) => setNewSupply({ ...newSupply, unit: e.target.value })}
                  className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:border-primary focus:outline-none"
                >
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
                <select
                  value={newSupply.category}
                  onChange={(e) => setNewSupply({ ...newSupply, category: e.target.value })}
                  className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:border-primary focus:outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="md:col-span-5 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Add Supply Item
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Supply Cards - Enhanced with Animations */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredSupplies.map((supply, index) => {
            const remaining = calculateRemaining(supply.bought, supply.used)
            const wastePercent = calculateWaste(supply.bought, supply.used)
            const isLowStock = remaining < supply.bought * 0.2
            const usagePercent = (supply.used / supply.bought) * 100

            return (
              <motion.div
                key={supply.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-dark-card dark:to-dark-bg border-2 ${
                  isLowStock ? 'border-red-500/50' : 'border-gray-200 dark:border-gray-800'
                } shadow-xl hover:shadow-2xl transition-all p-6`}
              >
                {/* Low Stock Alert Banner */}
                {isLowStock && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 text-center text-sm font-bold">
                    ⚠️ LOW STOCK ALERT - Reorder Soon!
                  </div>
                )}

                <div className={`${isLowStock ? 'mt-8' : ''}`}>
                  <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-center">
                    
                    {/* Supply Info with Category Badge */}
                    <div className="lg:col-span-2 flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getCategoryColor(supply.category)} flex items-center justify-center shadow-lg`}>
                        <Package className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-gray-900 dark:text-white mb-1">{supply.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getCategoryColor(supply.category)} text-white`}>
                            {supply.category}
                          </span>
                          <span className="text-xs text-gray-500">{supply.lastUpdated}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bought */}
                    <div className="text-center">
                      <div className="text-3xl font-black text-green-600 mb-1">
                        {supply.bought}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Bought ({supply.unit})</div>
                    </div>

                    {/* Used - Editable */}
                    <div className="text-center">
                      <div className="relative inline-block group">
                        <input
                          type="number"
                          step="0.1"
                          value={supply.used}
                          onChange={(e) => handleUpdateUsed(supply.id, e.target.value)}
                          className="w-28 px-4 py-2 text-center text-3xl font-black border-3 border-orange-500 rounded-xl bg-white dark:bg-dark-bg text-gray-900 dark:text-white hover:border-orange-600 focus:border-orange-600 focus:outline-none transition-all"
                        />
                        <Edit2 className="absolute -top-2 -right-2 w-4 h-4 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">Used ({supply.unit})</div>
                    </div>

                    {/* Remaining */}
                    <div className="text-center">
                      <div className={`text-3xl font-black ${isLowStock ? 'text-red-600 animate-pulse' : 'text-blue-600'} mb-1`}>
                        {remaining.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Remaining ({supply.unit})</div>
                    </div>

                    {/* Waste % + Actions */}
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        {isLowStock && <AlertCircle className="w-5 h-5 text-red-600 animate-bounce" />}
                        <div className={`text-3xl font-black ${isLowStock ? 'text-red-600' : 'text-primary'}`}>
                          {wastePercent}%
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">Surplus</div>
                      
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(supply.id)}
                        className="px-3 py-1 bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white rounded-lg transition-all text-sm font-semibold flex items-center gap-1 mx-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Enhanced Progress Bar with Gradient */}
                  <div className="mt-6">
                    <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${usagePercent}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`absolute inset-y-0 left-0 rounded-full shadow-lg ${
                          usagePercent > 80 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 
                          usagePercent > 50 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 
                          'bg-gradient-to-r from-orange-400 to-red-500'
                        }`}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </motion.div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs font-bold text-gray-500">
                      <span>0%</span>
                      <span className={usagePercent > 80 ? 'text-green-600' : 'text-orange-600'}>
                        {usagePercent.toFixed(0)}% used
                      </span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Enhanced Summary Cards with Gradients */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <TrendingDown className="w-10 h-10 text-white/80 mb-4" />
          <div className="text-5xl font-black text-white mb-2">
            {supplies.reduce((acc, s) => acc + (s.bought - s.used), 0).toFixed(1)}
          </div>
          <div className="text-white/90 font-semibold">Total Remaining Stock</div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 p-6 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <Package className="w-10 h-10 text-white/80 mb-4" />
          <div className="text-5xl font-black text-white mb-2">
            {supplies.reduce((acc, s) => acc + s.used, 0).toFixed(1)}
          </div>
          <div className="text-white/90 font-semibold">Total Used Today</div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-600 p-6 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <AlertCircle className="w-10 h-10 text-white/80 mb-4" />
          <div className="text-5xl font-black text-white mb-2">
            {supplies.filter(s => (s.bought - s.used) < s.bought * 0.2).length}
          </div>
          <div className="text-white/90 font-semibold">Low Stock Alerts</div>
        </motion.div>
      </div>
    </div>
  )
}
