const admin = require('firebase-admin');
const serviceAccount = require('./service_account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const  collectionRef = db.collection('treasure-hunt');


module.exports = {collectionRef, db};