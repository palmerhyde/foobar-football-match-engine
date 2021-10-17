var firebase = require('../services/firebase')
var config = require('../config');

var db = firebase.Database()
var ref = db.ref(config.TurnReference);
 
ref.push({
    "matchId" : "-MmAzfPvF-W-os8p9JVZ",
    "userId" : "liammolloy",
    "cardId" : 37,
    "moveId" : "D"
}, () => {
  process.exit()
})