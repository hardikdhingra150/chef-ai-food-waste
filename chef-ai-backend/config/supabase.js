const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// ✅ Load from environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

// Validate required env vars
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials in environment variables');
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_KEY are required');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

console.log('✅ Supabase connected');

module.exports = supabase;
