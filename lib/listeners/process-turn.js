var config = require('../config');
var firebase = require('../services/firebase')
var graphql = require('../services/graphql')
var { ValidateTurn } = require('../schemas/validation');

async function getMatchById(id) {
  const db = firebase.Database()
  const ref = db.ref(config.MatchReference + '/' + id);
  const snapshot = await ref.once('value');
  return snapshot.val();
}

async function getUserById(id) {
    return id;
}

async function listenToTurnReference() {
  const db = firebase.Database()
  const ref = db.ref(config.TurnReference);
  ref.on('child_added', async (snapshot) => {
    const data = snapshot.val();
    
    if (ValidateTurn(data)) {
      const cardId = data.cardId;
      const userId = data.userId;
      const matchId = data.matchId;
      const match = await getMatchById(matchId);
      const user = await getUserById(userId);

      // Can the user play the current card
      const response = await graphql.query();

      // Does the current card support this move?
      ref.child(snapshot.key).remove();
    }
  });
}

listenToTurnReference();