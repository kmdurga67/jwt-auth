const fs = require('fs');
const crypto = require('crypto');

// Generate a random 256-bit (32-byte) secret key
const secretKey = crypto.randomBytes(32).toString('hex');

// Write the secret key to a file (e.g., .env)
fs.writeFileSync('.env', `JWT_SECRET_KEY=${secretKey}\n`);

console.log('JWT Secret Key generated and saved in .env file.');
