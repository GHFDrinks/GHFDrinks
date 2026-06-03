const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://meitlqrtqebmuovjqtei.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1laXRscXJ0cWVibXVvdmpxdGVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4ODMwMjksImV4cCI6MjA5NTQ1OTAyOX0.Hk2tWgJknyJdMaf0X2_WpIRlSXlXwnW0VR8Z62YagZw');

async function run() {
  const { data, error } = await supabase.from('presentations').insert({
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Test Presentation',
    brands: [],
    slides: []
  }).select();
  console.log('Result:', data, error);
}
run();
