import { Trophy, Medal, Star, TrendingUp } from 'lucide-react'

export default function Leaderboard() {
  const restaurants = [
    { name: 'Your Restaurant', score: 2840, rank: 1, waste: '12%', change: '+5' },
    { name: 'Green Bistro', score: 2720, rank: 2, waste: '15%', change: '+2' },
    { name: 'Eco Kitchen', score: 2650, rank: 3, waste: '18%', change: '-1' },
    { name: 'Fresh Plates', score: 2580, rank: 4, waste: '20%', change: '0' },
    { name: 'Zero Waste Cafe', score: 2490, rank: 5, waste: '22%', change: '+3' },
  ]

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-600" />
    return <span className="text-gray-600 dark:text-gray-400 font-bold">#{rank}</span>
  }

  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <Star className="w-8 h-8 text-yellow-500" />
        <div>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white">Sustainability Leaderboard</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Top performers in your city</p>
        </div>
      </div>

      <div className="space-y-3">
        {restaurants.map((restaurant, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
              i === 0
                ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-400 dark:border-yellow-600 shadow-lg'
                : 'bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  {getRankIcon(restaurant.rank)}
                </div>
                <div>
                  <div className={`font-bold ${i === 0 ? 'text-lg' : ''} text-gray-900 dark:text-white`}>
                    {restaurant.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Waste: {restaurant.waste}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-primary">{restaurant.score}</div>
                <div className={`text-sm font-semibold ${
                  parseInt(restaurant.change) > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {restaurant.change > 0 ? '↑' : restaurant.change < 0 ? '↓' : '→'} {Math.abs(restaurant.change)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-700">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-purple-600" />
          <div className="text-sm text-gray-700 dark:text-gray-300">
            You're beating <span className="font-bold text-purple-600">87%</span> of restaurants! Keep going! 🔥
          </div>
        </div>
      </div>
    </div>
  )
}
