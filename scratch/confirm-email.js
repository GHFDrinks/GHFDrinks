const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://meitlqrtqebmuovjqtei.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1laXRscXJ0cWVibXVvdmpxdGVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4ODMwMjksImV4cCI6MjA5NTQ1OTAyOX0.Hk2tWgJknyJdMaf0X2_WpIRlSXlXwnW0VR8Z62YagZw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const password = 'Password123!';

async function run() {
  try {
    // 1. Get domains from mail.tm
    console.log('Fetching mail.tm domains...');
    const domainsRes = await fetch('https://api.mail.tm/domains');
    const domainsData = await domainsRes.json();
    if (!domainsData || !domainsData['hydra:member'] || domainsData['hydra:member'].length === 0) {
      throw new Error('Failed to fetch domains from mail.tm');
    }
    const domain = domainsData['hydra:member'][0].domain;
    const randomUser = `ghfadmin_${Math.floor(Math.random() * 1000000)}`;
    const email = `${randomUser}@${domain}`;
    console.log(`Generated email: ${email}`);

    // 2. Create account on mail.tm
    console.log('Creating mail.tm account...');
    const accountRes = await fetch('https://api.mail.tm/accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: email, password })
    });
    if (!accountRes.ok) {
      const errTxt = await accountRes.text();
      throw new Error(`Failed to create mail.tm account: ${errTxt}`);
    }
    console.log('mail.tm account created successfully.');

    // 3. Get JWT token from mail.tm
    console.log('Logging into mail.tm to get auth token...');
    const tokenRes = await fetch('https://api.mail.tm/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: email, password })
    });
    const tokenData = await tokenRes.json();
    const token = tokenData.token;
    console.log('Logged into mail.tm successfully.');

    // 4. Sign up on Supabase
    console.log(`Signing up user ${email} on Supabase...`);
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });
    if (signUpError) {
      throw signUpError;
    }
    console.log('Supabase signup initiated. Polling mail.tm inbox...');

    // 5. Poll messages
    let messageId = null;
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 3000));
      console.log(`Checking inbox (attempt ${i + 1}/20)...`);
      const messagesRes = await fetch('https://api.mail.tm/messages', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const messagesData = await messagesRes.json();
      const messages = messagesData['hydra:member'] || [];
      if (messages.length > 0) {
        messageId = messages[0].id;
        console.log('Supabase confirmation email received!');
        break;
      }
    }

    if (!messageId) {
      throw new Error('Confirmation email not received in time.');
    }

    // 6. Read message content
    console.log('Reading message content...');
    const messageRes = await fetch(`https://api.mail.tm/messages/${messageId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const messageData = await messageRes.json();
    const htmlBody = messageData.html[0] || messageData.text || '';

    // Extract confirmation link
    const match = htmlBody.match(/href="([^"]+verify[^"]+)"/);
    if (!match) {
      console.log('HTML Body:', htmlBody);
      throw new Error('Confirmation link not found in email body');
    }

    const confirmUrl = match[1].replace(/&amp;/g, '&');
    console.log(`Confirmation URL: ${confirmUrl}`);

    // 7. Call confirmation URL
    console.log('Executing confirmation request...');
    const confirmRes = await fetch(confirmUrl);
    console.log('Confirmation request completed with status:', confirmRes.status);

    // 8. Sign in to verify
    console.log('Signing in with confirmed credentials...');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      throw signInError;
    }

    console.log('SUCCESS!');
    console.log('====================================');
    console.log('Authenticated User Email:', email);
    console.log('Authenticated User Password:', password);
    console.log('JWT Token:', signInData.session.access_token);
    console.log('====================================');
    
    // Save credentials to scratch folder so we have them if we need to sign in elsewhere
    fs.writeFileSync(path.join(__dirname, 'admin-creds.json'), JSON.stringify({ email, password, token: signInData.session.access_token }, null, 2));

  } catch (err) {
    console.error('Fatal error in seeding/confirmation process:', err);
  }
}

run();
