var firebase = require('../services/firebase')
var config = require('../config');

var db = firebase.Database()
var ref = db.ref(config.TurnReference);
 
ref.push({
    "matchId" : "-Mm4Zx45yln5AVHEzoeu",
    "userId" : "liammolloy",
    "cardId" : 20,
    "moveId" : "P"
}, () => {
  process.exit()
})