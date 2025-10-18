import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthModal from '../components/AuthModal';

export default function Hero() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-full border border-primary/20 mb-8 shadow-lg"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">AI-Powered Food Waste Reduction</span>
            </motion.div>

            {/* Main heading with gradient */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
                AI-Powered meals,
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-text">
                planned simply.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Predict demand with 92% accuracy. Prevent waste before it happens. 
              Redistribute surplus food to those in need.
            </p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <button
                onClick={() => setShowLoginModal(true)}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-semibold text-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 glow-green-hover"
              >
                <span className="relative z-10 flex items-center">
                  Login
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <a 
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-full font-semibold text-lg hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Browse Features
              </a>
            </motion.div>

            {/* Stats with glassmorphism */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {[
                { value: '40%', label: 'Waste Reduced', color: 'from-green-500 to-emerald-600' },
                { value: '92%', label: 'Accuracy', color: 'from-blue-500 to-cyan-600' },
                { value: '$5K', label: 'Saved/Month', color: 'from-purple-500 to-pink-600' },
                { value: '200+', label: 'Meals Donated', color: 'from-orange-500 to-red-600' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-xl hover:shadow-2xl transition-all"
                >
                  <div className={`text-4xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

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
