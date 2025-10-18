import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the OAuth callback
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Save to localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', session.user.email);
        localStorage.setItem('userName', session.user.user_metadata?.full_name || session.user.email);
        
        // Redirect to dashboard
        navigate('/dashboard', { replace: true });
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-xl font-semibold">Completing sign in...</p>
      </div>
    </div>
  );
}
