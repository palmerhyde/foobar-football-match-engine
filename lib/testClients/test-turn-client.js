var admin = require('firebase-admin');
var firebase = require('../services/firebase')
var config = require('../config');

var db = firebase.Database()
var ref = db.ref(config.TurnReference);

// TODO: move to testData 
ref.push({
    "matchId" : "-Jz3etefQ6U_T0lksKc4",
    "userId" : "123",
    "cardId" : "123",
    "moveId" : "A"
}, () => {
  process.exit()
})