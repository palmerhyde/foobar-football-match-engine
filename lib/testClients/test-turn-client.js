var firebase = require('../services/firebase')
var config = require('../config');

var db = firebase.Database()
var ref = db.ref(config.TurnReference);
 
ref.push({
    "matchId" : "-Mla9tPh8m1EofQKOe9H",
    "userId" : "liammolloy",
    "cardId" : 33,
    "moveId" : "P"
}, () => {
  process.exit()
})