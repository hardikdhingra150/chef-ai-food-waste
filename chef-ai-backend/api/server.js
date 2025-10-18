const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load env vars first
dotenv.config();

// Initialize Supabase & Gemini
require('../config/supabase');
require('../config/gemini');
app.use('/api/auth', require('../routes/auth'));
const app = express();

// Create uploads directory if it doesn't exist (only in development)
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (process.env.NODE_ENV !== 'production' && !fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory');
}

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS Configuration
app.use(cors({ 
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
      'http://localhost:5000',
      'http://127.0.0.1:5173',
      'https://chef-ai-food-waste.vercel.app',
      'https://chef-ai-frontend.vercel.app',
      process.env.CLIENT_URL
    ].filter(Boolean);
    
    // Check if origin matches any allowed origin
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed.includes('*.vercel.app')) {
        return origin.includes('.vercel.app');
      }
      return origin === allowed || origin.startsWith(allowed);
    });
    
    if (isAllowed || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Serve static files (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.use('/uploads', express.static(uploadsDir));
}

// API Routes
try {
  app.use('/api/auth', require('../routes/auth'));
  app.use('/api/dashboard', require('../routes/dashboard'));
  app.use('/api/inventory', require('../routes/inventory'));
  app.use('/api/predictions', require('../routes/predictions'));
  app.use('/api/waste', require('../routes/waste'));
  app.use('/api/donations', require('../routes/donations'));
  app.use('/api/analytics', require('../routes/analytics'));
  app.use('/api/settings', require('../routes/settings'));
  app.use('/api/chat', require('../routes/chat'));
  
  // Vision route (with error handling)
  try {
    app.use('/api/vision', require('../routes/vision'));
    console.log('✅ Vision API loaded');
  } catch (err) {
    console.log('⚠️  Vision route not available:', err.message);
  }
} catch (error) {
  console.error('❌ Error loading routes:', error.message);
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'CHEF AI API is running!',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development',
    services: {
      database: 'Supabase PostgreSQL',
      ai: 'Google Gemini 2.5 Flash',
      vision: 'Gemini Vision API'
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Welcome to CHEF AI API',
    version: '2.0.0',
    status: 'Running',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      dashboard: '/api/dashboard',
      inventory: '/api/inventory',
      predictions: '/api/predictions',
      waste: '/api/waste',
      donations: '/api/donations',
      analytics: '/api/analytics',
      settings: '/api/settings',
      chat: '/api/chat',
      vision: '/api/vision'
    },
    features: {
      chatbot: 'AI-powered food waste assistant',
      recipeGenerator: 'Smart recipe suggestions',
      wasteScanner: 'Image-based waste detection'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  
  // Don't leak error details in production
  const isDev = process.env.NODE_ENV === 'development';
  
  res.status(err.status || 500).json({
    success: false,
    message: isDev ? err.message : 'Internal Server Error',
    ...(isDev && { 
      stack: err.stack,
      path: req.path
    })
  });
});

// ============================================
// EXPORT FOR VERCEL (CRITICAL!)
// ============================================
module.exports = app;

// ============================================
// LOCAL DEVELOPMENT SERVER ONLY
// ============================================
if (require.main === module || process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => {
    console.log('\n🚀 ===================================');
    console.log('   CHEF AI Backend Server Started');
    console.log('=====================================');
    console.log(`📍 Server: http://localhost:${PORT}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 Database: Supabase PostgreSQL`);
    console.log(`🤖 AI: Google Gemini 2.5 Flash`);
    console.log(`📸 Vision: Gemini Vision API`);
    console.log(`🎨 Frontend: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
    console.log(`⚡ CORS: Enabled`);
    console.log(`📁 Uploads: ${uploadsDir}`);
    console.log('=====================================\n');
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('⚠️  SIGTERM received, shutting down gracefully...');
    process.exit(0);
  });

  process.on('SIGINT', () => {
    console.log('\n⚠️  SIGINT received, shutting down gracefully...');
    process.exit(0);
  });
}

// Error handlers (global)
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message);
  if (process.env.NODE_ENV === 'production') {
    console.error(err.stack);
  }
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  if (process.env.NODE_ENV === 'production') {
    console.error(err.stack);
  }
});
