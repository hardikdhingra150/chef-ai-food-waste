import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, TrendingUp, Heart, Mic, Settings, LogOut, Leaf } from 'lucide-react';

export default function DashboardSidebar({ activePage, setActivePage }) {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'inventory', icon: Package, label: 'Inventory' },
    { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
    { id: 'donations', icon: Heart, label: 'Donations' },
    { id: 'voice', icon: Mic, label: 'Voice Assistant' },
  ];

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    
    // Redirect to login
    navigate('/login');
  };

  return (
    <div className="w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-gray-800 h-screen fixed left-0 top-0 flex flex-col z-30 shadow-xl">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3 p-6 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            CHEF AI
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Dashboard</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
              activePage === item.id
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Section - Settings & Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2 flex-shrink-0 bg-gray-50 dark:bg-gray-900/50">
        
        {/* Settings Button */}
        <button 
          onClick={() => setActivePage('settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
            activePage === 'settings'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-medium group"
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
