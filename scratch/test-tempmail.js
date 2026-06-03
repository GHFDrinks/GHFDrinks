const https = require('https');
https.get('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Raw response:', data));
});
