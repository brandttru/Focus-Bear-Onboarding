const crypto = require('crypto');
const key = crypto.randomBytes(32).toString('base64');
const iv = crypto.randomBytes(16).toString('base64');
console.log('ENCRYPTION_KEY=' + key);
console.log('ENCRYPTION_IV=' + iv);