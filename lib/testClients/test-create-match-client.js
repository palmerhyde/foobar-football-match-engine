const firebase = require('../services/firebase')
const config = require('../config');

const db = firebase.Database()
const ref = db.ref(config.CreateMatchReference);

ref.push({
    "homeUserId" : "liammolloy",
    "awayUserId" : "kimber"
}, () => {
  process.exit()
})