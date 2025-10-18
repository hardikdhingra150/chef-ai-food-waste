import { useState } from 'react'
import { Calendar, Flame } from 'lucide-react'

export default function WasteHeatmap() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const weeks = [
    [3, 5, 8, 4, 9, 12, 6],
    [4, 7, 5, 6, 8, 10, 5],
    [2, 4, 6, 3, 7, 11, 4],
    [5, 6, 4, 7, 6, 9, 7],
  ]

  const getColor = (value) => {
    if (value <= 3) return 'bg-green-200 dark:bg-green-900 border-green-400 dark:border-green-600'
    if (value <= 6) return 'bg-yellow-200 dark:bg-yellow-900 border-yellow-400 dark:border-yellow-600'
    if (value <= 9) return 'bg-orange-200 dark:bg-orange-900 border-orange-400 dark:border-orange-600'
    return 'bg-red-200 dark:bg-red-900 border-red-400 dark:border-red-600 animate-pulse'
  }

  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <Flame className="w-8 h-8 text-orange-500" />
        <div>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white">Waste Heatmap</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Daily waste intensity</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2 mb-4">
          <div className="w-12"></div>
          {days.map((day) => (
            <div key={day} className="flex-1 text-center text-xs font-bold text-gray-600 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>

        {weeks.map((week, i) => (
          <div key={i} className="flex gap-2">
            <div className="w-12 text-xs text-gray-600 dark:text-gray-400 flex items-center">
              Week {i + 1}
            </div>
            {week.map((value, j) => (
              <div
                key={j}
                className={`flex-1 aspect-square rounded-lg border-2 ${getColor(value)} hover:scale-110 transition-all cursor-pointer flex items-center justify-center font-bold text-gray-800 dark:text-white shadow-lg`}
              >
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-6 text-sm">
        <span className="text-gray-600 dark:text-gray-400">Less waste</span>
        <div className="flex gap-2">
          <div className="w-6 h-6 rounded bg-green-200 dark:bg-green-900 border border-green-400"></div>
          <div className="w-6 h-6 rounded bg-yellow-200 dark:bg-yellow-900 border border-yellow-400"></div>
          <div className="w-6 h-6 rounded bg-orange-200 dark:bg-orange-900 border border-orange-400"></div>
          <div className="w-6 h-6 rounded bg-red-200 dark:bg-red-900 border border-red-400"></div>
        </div>
        <span className="text-gray-600 dark:text-gray-400">More waste</span>
      </div>
    </div>
  )
}
