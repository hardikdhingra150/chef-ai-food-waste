import { useState } from 'react'
import { Bell, X, AlertTriangle, Info, CheckCircle } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', title: 'Low Stock Alert', message: 'Milk inventory below 20%', time: '5 min ago', read: false },
    { id: 2, type: 'success', title: 'Donation Scheduled', message: 'Pickup confirmed for 8:00 PM', time: '1 hour ago', read: false },
    { id: 3, type: 'info', title: 'AI Prediction Updated', message: 'Expected 340 covers today', time: '2 hours ago', read: true },
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const getIcon = (type) => {
    switch(type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-orange-500" />
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'info': return <Info className="w-5 h-5 text-blue-500" />
      default: return <Bell className="w-5 h-5" />
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-16 w-96 bg-white dark:bg-dark-card rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h3 className="font-bold text-lg">Notifications</h3>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer ${
                    !notif.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    {getIcon(notif.type)}
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{notif.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
