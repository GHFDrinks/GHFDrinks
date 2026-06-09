const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)?.[1]?.trim();
const key = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)?.[1]?.trim();
const anon = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)?.[1]?.trim();

const supabaseAdmin = createClient(url, key);
const supabaseAnon = createClient(url, anon);

async function main() {
  console.log('--- Checking with Admin client (Service Role) ---');
  const resAdmin = await supabaseAdmin.from('brands').select('id, name');
  console.log('Admin saw count:', resAdmin.data?.length, 'Error:', resAdmin.error);

  console.log('--- Checking with Anon client (Public Anon Key) ---');
  const resAnon = await supabaseAnon.from('brands').select('id, name');
  console.log('Anon saw count:', resAnon.data?.length, 'Error:', resAnon.error);
}

main();
