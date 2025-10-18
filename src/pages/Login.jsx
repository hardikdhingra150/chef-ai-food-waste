import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate login (replace with real API call)
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
        navigate('/dashboard');
      } else {
        setError('Please enter valid credentials');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = () => {
    setEmail('demo@chefai.com');
    setPassword('demo123');
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', 'demo@chefai.com');
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <AnimatedBackground />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Glass Card */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8">
          
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg"
            >
              <ChefHat className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              CHEF AI
            </h1>
            <p className="text-gray-600 dark:text-gray-300">Smart Food Waste Management</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Login to Dashboard
                </>
              )}
            </motion.button>

            {/* Demo Login Button */}
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-white/70 transition-all"
            >
              🚀 Try Demo Account
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Don't have an account?{' '}
              <button className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">
                Sign Up
              </button>
            </p>
          </div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <div className="flex justify-center gap-8 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Real-Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Gemini 2.5</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
