const webpush = require('web-push');

// Genera le chiavi VAPID
const vapidKeys = webpush.generateVAPIDKeys();

console.log("Chiave pubblica VAPID:", vapidKeys.publicKey);
console.log("Chiave privata VAPID:", vapidKeys.privateKey);