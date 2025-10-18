import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { IndianRupee, TrendingDown, Leaf } from 'lucide-react'  


export default function WasteAnalytics() {
  const weeklyData = [
    { day: 'Mon', waste: 12, saved: 88 },
    { day: 'Tue', waste: 15, saved: 85 },
    { day: 'Wed', waste: 8, saved: 92 },
    { day: 'Thu', waste: 10, saved: 90 },
    { day: 'Fri', waste: 18, saved: 82 },
    { day: 'Sat', waste: 14, saved: 86 },
    { day: 'Sun', waste: 9, saved: 91 },
  ]

  const categoryData = [
    { name: 'Vegetables', value: 35 },
    { name: 'Dairy', value: 25 },
    { name: 'Meat', value: 20 },
    { name: 'Bakery', value: 15 },
    { name: 'Other', value: 5 },
  ]

  const COLORS = ['#16a34a', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']

  return (
    <div className="space-y-6">
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <TrendingDown className="w-10 h-10 mb-4 opacity-80" />
          <div className="text-4xl font-black mb-2">45%</div>
          <div className="text-green-100">Waste Reduced This Month</div>
        </div>

      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
        <IndianRupee className="w-10 h-10 mb-4 opacity-80" />  {/* Changed icon */}
          <div className="text-4xl font-black mb-2">₹4,37,540</div>
          <div className="text-blue-100">Cost Savings This Month</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <Leaf className="w-10 h-10 mb-4 opacity-80" />
          <div className="text-4xl font-black mb-2">680 kg</div>
          <div className="text-purple-100">CO₂ Emissions Prevented</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Line Chart - Weekly Trend */}
        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Weekly Waste Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
              <Legend />
              <Line type="monotone" dataKey="waste" stroke="#ef4444" strokeWidth={3} name="Waste (kg)" />
              <Line type="monotone" dataKey="saved" stroke="#16a34a" strokeWidth={3} name="Saved (kg)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Waste by Category */}
        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Waste by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart - Top Wasted Items */}
      <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Top Wasted Items This Week</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { item: 'Tomatoes', waste: 12 },
            { item: 'Bread', waste: 9 },
            { item: 'Milk', waste: 8 },
            { item: 'Lettuce', waste: 7 },
            { item: 'Chicken', waste: 6 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="item" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
            <Bar dataKey="waste" fill="#16a34a" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
