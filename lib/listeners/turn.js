var config = require('../config');
var firebase = require('../services/firebase')
var { PlayTurn } = require('../game/move')
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

    // TODO: investigate transactions to block the match from being updated by another process.
    
    if (ValidateTurn(data)) {
      const cardId = data.cardId;
      const userId = data.userId;
      const matchId = data.matchId;
      const match = await getMatchById(matchId);
      const user = await getUserById(userId);
      const moveId = data.moveId;

      // Valid Turn
      if (user === match.homeTeam.userId) {
        const validCard = match.homeTeam.hand?.find( m => {
          return m.uniqueId === cardId && (m.primaryMove === moveId || m.secondaryMove === moveId)
        })
        
        if(validCard) {
          console.log('valid card')
          const upatedMatch = PlayTurn(validCard, moveId, match)
          const matchRef = db.ref(config.MatchReference);
          matchRef.child(matchId).set(upatedMatch)
        } 
        else {
          console.log(userId + ' does not have card ' + cardId + ' in their hand.')
        }
      }
      else {
        console.log(userId + ' does not have a match is progress.')
      }
      ref.child(snapshot.key).remove();
    }
  });
}

listenToTurnReference();