const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://wfnqzrjxnuqhoxjwjela.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbnF6cmp4bnVxaG94andqZWxhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDI3MzY4OCwiZXhwIjoyMDc1ODQ5Njg4fQ.SvF03HTVDIDXSoX_KWbJlngiQ0nef9a90-i-oewrdb0'
);

console.log('✅ Supabase connected');

module.exports = supabase;
