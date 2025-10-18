import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { supabase } from '../config/supabase';

export default function AuthModal({ onClose, defaultMode = 'login' }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Listen for auth state changes
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userEmail', session.user.email);
          navigate('/dashboard');
          onClose();
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [navigate, onClose]);

  // Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log('Login successful:', data);
    } catch (err) {
      console.error('Login error:', err);
      
      // Provide user-friendly error messages
      if (err.message.includes('Invalid login credentials')) {
        setError('❌ Invalid email or password. Please try again.');
      } else if (err.message.includes('Email not confirmed')) {
        setError('⚠️ Please verify your email before logging in. Check your inbox.');
      } else {
        setError(err.message || 'Login failed. Please check your credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Email/Password Signup with Pre-Check (Option 3)
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (password.length < 6) {
      setError('❌ Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      // Attempt signup
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      // Handle user already exists error
      if (error && error.message.includes('already registered')) {
        setError('⚠️ This email is already registered. Please use the login form.');
        setEmail('');
        setPassword('');
        setName('');
        
        // Auto-switch to login after 2 seconds
        setTimeout(() => {
          setMode('login');
          setError('');
        }, 2000);
        return;
      }

      if (error) throw error;

      if (data.user) {
        console.log('Signup response:', data);

        // Check if this is a duplicate signup attempt
        if (!data.session && data.user.identities && data.user.identities.length === 0) {
          setError('⚠️ This email is already registered. Please check your inbox or try logging in.');
          
          // Auto-switch to login after 2 seconds
          setTimeout(() => {
            setMode('login');
            setError('');
          }, 2000);
          return;
        }

        // Check if email confirmation is enabled
        if (data.session) {
          // Auto-login (confirmation disabled)
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userName', name);
          setSuccess('✅ Account created! Redirecting to dashboard...');
          
          setTimeout(() => {
            navigate('/dashboard');
            onClose();
          }, 1000);
        } else {
          // Email confirmation required
          setSuccess('✅ Account created! Please check your email to verify your account before logging in.');
          setEmail('');
          setPassword('');
          setName('');
          
          // Auto-switch to login after 4 seconds
          setTimeout(() => {
            setMode('login');
            setSuccess('');
          }, 4000);
        }
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign-In
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
      
      console.log('Google OAuth initiated:', data);
    } catch (err) {
      console.error('Google login error:', err);
      setError(err.message || 'Google login failed');
      setIsLoading(false);
    }
  };

  // Demo Login
  const handleDemoLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', 'demo@chefai.com');
    localStorage.setItem('userName', 'Demo User');
    navigate('/dashboard');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-700 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-black text-white">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {mode === 'login' ? 'Sign in to your account' : 'Get started with CHEF AI'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded-xl bg-green-500/20 border border-green-500/50 text-green-400 text-sm"
          >
            {success}
          </motion.div>
        )}

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-3 mb-6 shadow-lg"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-gray-400">Or continue with email</span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="space-y-4">
          
          {/* Name (Signup only) */}
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all text-white placeholder:text-gray-500"
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all text-white placeholder:text-gray-500"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all text-white placeholder:text-gray-500"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {mode === 'signup' && (
              <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {mode === 'login' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </button>

          {/* Demo Login */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-semibold border border-gray-700 transition-all"
          >
            🚀 Try Demo Account
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <p className="text-center text-sm text-gray-400 mt-6">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setError('');
              setSuccess('');
            }}
            className="text-purple-400 font-semibold hover:text-purple-300 hover:underline"
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
