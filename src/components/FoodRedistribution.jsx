import { MapPin, Calendar, Clock, CheckCircle, Phone } from 'lucide-react'

export default function FoodRedistribution() {
  const foodBanks = [
    { id: 1, name: "St. Mary's Food Bank", distance: '2.3 km', phone: '+1 234-567-8900', status: 'Available', pickupTime: 'Today, 6:00 PM' },
    { id: 2, name: 'City Shelter Network', distance: '3.1 km', phone: '+1 234-567-8901', status: 'Available', pickupTime: 'Tomorrow, 10:00 AM' },
    { id: 3, name: 'Hope Community Center', distance: '4.5 km', phone: '+1 234-567-8902', status: 'Scheduled', pickupTime: 'Today, 8:30 PM' },
  ]

  const recentDonations = [
    { date: '2025-10-12', items: 'Rice (10kg), Vegetables (5kg)', meals: 45, recipient: "St. Mary's" },
    { date: '2025-10-10', items: 'Bread (20 loaves), Milk (8L)', meals: 32, recipient: 'City Shelter' },
    { date: '2025-10-08', items: 'Cooked Meals (15)', meals: 15, recipient: 'Hope Center' },
  ]

  return (
    <div className="space-y-6">
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="text-4xl font-bold text-primary mb-2">127</div>
          <div className="text-gray-600 dark:text-gray-400">Meals Donated This Month</div>
        </div>
        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="text-4xl font-bold text-blue-600 mb-2">8</div>
          <div className="text-gray-600 dark:text-gray-400">Pickup Completed</div>
        </div>
        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="text-4xl font-bold text-purple-600 mb-2">3</div>
          <div className="text-gray-600 dark:text-gray-400">Partner Organizations</div>
        </div>
      </div>

      {/* Nearby Food Banks */}
      <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Nearby Food Banks</h3>
        <div className="space-y-4">
          {foodBanks.map((bank) => (
            <div key={bank.id} className="p-6 bg-gray-50 dark:bg-dark-bg rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{bank.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {bank.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {bank.phone}
                    </span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  bank.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {bank.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Next Pickup: {bank.pickupTime}</span>
                </div>
                <button className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all">
                  Schedule Pickup
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Donations */}
      <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Recent Donations</h3>
        <div className="space-y-3">
          {recentDonations.map((donation, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-bg rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white">{donation.items}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {donation.date} • {donation.meals} meals • {donation.recipient}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
