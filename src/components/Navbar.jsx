import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, Menu, X } from 'lucide-react';
import AuthModal from '../components/AuthModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                CHEF AI
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <a 
                href="#features" 
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 font-semibold transition-colors"
              >
                Features
              </a>
              
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-5 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 transition-all"
              >
                Login
              </button>
              
              <button
                onClick={() => navigate('/dashboard')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="md:hidden mt-4 pb-4 space-y-3"
            >
              <a 
                href="#features" 
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 font-semibold"
              >
                Features
              </a>
              <button
                onClick={() => {
                  setShowLoginModal(true);
                  setIsOpen(false);
                }}
                className="w-full py-2.5 px-4 text-left rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold"
              >
                Get Started
              </button>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Auth Modal with Google Sign-In */}
      {showLoginModal && (
        <AuthModal 
          onClose={() => setShowLoginModal(false)} 
          defaultMode="login" 
        />
      )}
    </>
  );
}
