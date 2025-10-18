import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, Save, Bell, Palette, Clock, Check
} from 'lucide-react'

export default function Settings() {
  const [saved, setSaved] = useState(false)
  
  // Profile Settings
  const [profile, setProfile] = useState({
    restaurantName: 'The Green Kitchen',
    ownerName: 'John Doe',
    email: 'john@greenkitchen.com',
    phone: '+1 234-567-8900',
    address: '123 Main St, New York, NY 10001',
    cuisine: 'Mediterranean'
  })

  // Notification Settings
  const [notifications, setNotifications] = useState({
    lowStockAlerts: true,
    expiryWarnings: true,
    donationReminders: true,
    weeklyReports: true,
    emailNotifications: false,
    smsNotifications: true
  })

  // Preferences
  const [preferences, setPreferences] = useState({
    language: 'en',
    currency: 'USD',
    units: 'metric',
    timezone: 'America/New_York'
  })

  // Business Hours
  const [businessHours, setBusinessHours] = useState({
    monday: { open: '09:00', close: '22:00', closed: false },
    tuesday: { open: '09:00', close: '22:00', closed: false },
    wednesday: { open: '09:00', close: '22:00', closed: false },
    thursday: { open: '09:00', close: '22:00', closed: false },
    friday: { open: '09:00', close: '23:00', closed: false },
    saturday: { open: '10:00', close: '23:00', closed: false },
    sunday: { open: '10:00', close: '21:00', closed: false }
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="pb-32">
      {/* Success Toast */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-24 right-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3"
        >
          <Check className="w-6 h-6" />
          <span className="font-bold">Settings saved successfully!</span>
        </motion.div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-dark-card rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl mb-6">
        <h2 className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
          Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your account and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Restaurant Profile */}
          <div className="bg-white dark:bg-dark-card rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Restaurant Profile</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Basic information about your restaurant</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    value={profile.restaurantName}
                    onChange={(e) => setProfile({ ...profile, restaurantName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:border-primary focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    value={profile.ownerName}
                    onChange={(e) => setProfile({ ...profile, ownerName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:border-primary focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:border-primary focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:border-primary focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:border-primary focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Cuisine Type
                </label>
                <select
                  value={profile.cuisine}
                  onChange={(e) => setProfile({ ...profile, cuisine: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:border-primary focus:outline-none transition-all"
                >
                  <option value="Mediterranean">Mediterranean</option>
                  <option value="Italian">Italian</option>
                  <option value="Asian">Asian</option>
                  <option value="American">American</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Indian">Indian</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white dark:bg-dark-card rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Choose what updates you want to receive</p>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                  <button
                    onClick={() => setNotifications({ ...notifications, [key]: !value })}
                    className={`relative w-12 h-6 rounded-full transition-all ${
                      value ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    <motion.div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                      animate={{ left: value ? '28px' : '4px' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white dark:bg-dark-card rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Business Hours</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Set your operating schedule</p>
              </div>
            </div>

            <div className="space-y-3">
              {Object.entries(businessHours).map(([day, hours]) => (
                <div key={day} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                  <div className="w-24 font-semibold text-gray-900 dark:text-white capitalize">
                    {day}
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <input
                      type="time"
                      value={hours.open}
                      onChange={(e) => setBusinessHours({
                        ...businessHours,
                        [day]: { ...hours, open: e.target.value }
                      })}
                      disabled={hours.closed}
                      className="px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card text-gray-900 dark:text-white disabled:opacity-50"
                    />
                    <span className="text-gray-600 dark:text-gray-400">to</span>
                    <input
                      type="time"
                      value={hours.close}
                      onChange={(e) => setBusinessHours({
                        ...businessHours,
                        [day]: { ...hours, close: e.target.value }
                      })}
                      disabled={hours.closed}
                      className="px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card text-gray-900 dark:text-white disabled:opacity-50"
                    />
                    <button
                      onClick={() => setBusinessHours({
                        ...businessHours,
                        [day]: { ...hours, closed: !hours.closed }
                      })}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        hours.closed
                          ? 'bg-red-500 text-white'
                          : 'bg-green-500 text-white'
                      }`}
                    >
                      {hours.closed ? 'Closed' : 'Open'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Preferences Only */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-dark-card rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Preferences</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={preferences.language}
                  onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:border-primary focus:outline-none"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Currency
                </label>
                <select
                  value={preferences.currency}
                  onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:border-primary focus:outline-none"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Units
                </label>
                <select
                  value={preferences.units}
                  onChange={(e) => setPreferences({ ...preferences, units: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:border-primary focus:outline-none"
                >
                  <option value="metric">Metric (kg, L)</option>
                  <option value="imperial">Imperial (lbs, gal)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Timezone
                </label>
                <select
                  value={preferences.timezone}
                  onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:border-primary focus:outline-none text-sm"
                >
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Save Button at Bottom */}
      <div className="fixed bottom-0 left-64 right-0 bg-gradient-to-t from-white via-white to-transparent dark:from-dark-bg dark:via-dark-bg dark:to-transparent p-6 z-10">
        <div className="max-w-7xl mx-auto px-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="w-full px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-primary/50 flex items-center justify-center gap-3 transition-all"
          >
            <Save className="w-6 h-6" />
            Save All Changes
          </motion.button>
        </div>
      </div>
    </div>
  )
}
