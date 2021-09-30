var admin = require('firebase-admin');
var config = require('./config');
var { ValidateTurn } = require('./validation');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: config.FirebaseUrl
});

var db = admin.database();
var ref = db.ref(config.TurnReference);


ref.on('child_added', (snapshot) => {
  console.log(snapshot.val());

  // Validate snapshot value
  if (ValidateTurn(snapshot.val())) {
    var cardId = snapshot.val().cardId;
    var userId = snapshot.val().userId;
    var matchId = snapshot.val().matchId;

    var matchRef = db.ref('Match/-Jz3etefQ6U_T0lksKc4');
    matchRef.on('value', (snapshot) => {
      console.log(snapshot.val())
    })
  }

   ref.child(snapshot.key).remove();
});