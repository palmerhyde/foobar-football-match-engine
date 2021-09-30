var admin = require('firebase-admin');
var config = require('../config');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: config.FirebaseUrl
});

var db = admin.database();
var ref = db.ref(config.TurnReference);

ref.push({
    "matchId" : "123",
    "userId" : "123",
    "cardId" : "123",
    "moveId" : "A"
}, () => {
  process.exit()
})