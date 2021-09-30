var admin = require('firebase-admin');
var config = require('./config');

// TODO: move service account ket to an environment variable
var serviceAccount = require('../.keys/firebase-foobarfootball-firebase-admin-sdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.FirebaseUrl
});

var db = admin.database();
var ref = db.ref(config.TurnReference);

ref.on('child_added', (snapshot) => {
   console.log(snapshot.val());
   console.log(snapshot.key)
   ref.child(snapshot.key).remove();
});