const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://beelog-2d33a.appspot.com'
});

const bucket = admin.storage().bucket();

module.exports = bucket;
