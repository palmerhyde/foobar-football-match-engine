var firebase = require('../services/firebase')
var config = require('../config');

var db = firebase.Database()
var ref = db.ref(config.TurnReference);

// TODO: move to testData 
ref.push({
    "matchId" : "-Jz3etefQ6U_T0lksKc4",
    "userId" : "liammolloy",
    "cardId" : "david-olatukunbo-alaba-2021-common-de641b06-e909-4a35-b8ad-3fa351637c1c",
    "moveId" : "A"
}, () => {
  process.exit()
})