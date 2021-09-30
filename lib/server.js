var admin = require('firebase-admin');
var config = require('./config');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: config.FirebaseUrl
});

var db = admin.database();
var ref = db.ref(config.TurnReference);


ref.on('child_added', (snapshot) => {
   console.log(snapshot.val());
   ref.child(snapshot.key).remove();
});