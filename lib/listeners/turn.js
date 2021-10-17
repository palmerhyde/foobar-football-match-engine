var config = require('../config');
var firebase = require('../services/firebase')
var { PlayTurn } = require('../game/move')
var { ValidateTurn } = require('../schemas/validation');
const chalk = require('chalk')

async function getMatchById(id) {
  const db = firebase.Database()
  const ref = db.ref(config.MatchReference + '/' + id);
  const snapshot = await ref.once('value');
  return snapshot.val();
}

// This function is a beast. Please refactor me at some point. SOLID!
async function listenToTurnReference() {
  console.log(chalk.red('Listener: HEADS_UP Phase'));
  const db = firebase.Database()
  const ref = db.ref(config.TurnReference);
  ref.on('child_added', async (snapshot) => {
    const data = snapshot.val();

    // TODO: investigate preventing a user from spamming this listener.
    // TODO: investigate transactions to block the match from being updated by another process. 
    if (ValidateTurn(data)) {
      const cardId = data.cardId;
      const userId = data.userId;
      const matchId = data.matchId;
      const match = await getMatchById(matchId);
      const moveId = data.moveId;

      if (match && match.phase === 'HEADS_UP') {
        
        // Valid Turn 
        let yourTeam, opponentsTeam;

        if (match?.homeTeam?.userId == userId) {
          yourTeam = match.homeTeam
          opponentsTeam = match.awayTeam
        }

        if (match?.awayTeam?.userId == userId) {
          yourTeam = match.awayTeam
          opponentsTeam = match.homeTeam
        }

        if (userId === yourTeam?.userId || undefined ) {
          const validCard = yourTeam.hand?.find( m => {
            return m.uniqueId === cardId && (m.primaryMove === moveId || m.secondaryMove === moveId)
          })
          
          if(validCard) {
            console.log(chalk.red('valid card played'))
            let updatedMatch
            
                // TODO: investigate race conditons caused by players sending a turn before
                //       currentTurn has been updated,
            if (match.currentTurn && match.currentTurn[opponentsTeam.userId]) {
              const opponentsStrategy = match.currentTurn[opponentsTeam.userId]
              const opponentCard = opponentsTeam.hand?.find( m => {
                return m.uniqueId === opponentsStrategy.cardId && (m.primaryMove === opponentsStrategy.moveId || m.secondaryMove === opponentsStrategy.moveId)
              })

              // need to reverse for away team
              if (yourTeam === match.homeTeam) {
                updatedMatch = PlayTurn(validCard, moveId, opponentCard, opponentsStrategy.moveId, match)
              }

              if (yourTeam === match.awayTeam) {
                updatedMatch = PlayTurn(opponentCard, opponentsStrategy.moveId, validCard, moveId, match)
              }
            }
            else {
              // update match with your turn
              const yourTurn = {
                'cardId' : validCard.uniqueId,
                'moveId' : moveId
              }

              updatedMatch = {...match};
              updatedMatch.currentTurn = {}
              updatedMatch.currentTurn[yourTeam.userId] = yourTurn
            }

            const matchRef = db.ref(config.MatchReference);
            matchRef.child(matchId).set(updatedMatch)
          } 
          else {
            console.log(chalk.red(userId + ' does not have card ' + cardId + ' in their hand.'))
          }
        }
        else {
          console.log(chalk.red(userId + ' does not have a match is progress.'))
        }
      }
      else {
        console.log(chalk.red('Match must exist and must be in the HEADS_UP phase to progress'))
      }
    }

    ref.child(snapshot.key).remove();
  });
}

async function listenToComboReference() {
  console.log(chalk.red('Listener: COMBO Phase'));
  // TODO: ensure match is in the COMBO phase
}

exports.ListenToTurnReference = listenToTurnReference;
exports.ListenToComboReference = listenToComboReference