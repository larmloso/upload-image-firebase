const admin = require('firebase-admin')

const serviceAccount = require('./firebase-config.json');

const FirebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "agua-api.appspot.com"
});
const storage = FirebaseApp.storage();
const bucket = storage.bucket();

module.exports = {
  bucket
}