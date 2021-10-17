var firebase = require('../services/firebase')
var config = require('../config');

var db = firebase.Database()
var ref = db.ref(config.TurnReference);
 
ref.push({
    "matchId" : "-MmB3gpHVtsqksQYTHLP",
    "userId" : "liammolloy",
    "cardId" : 21,
    "moveId" : "P"
}, () => {
  process.exit()
})