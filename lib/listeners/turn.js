var config = require('../config');
var firebase = require('../services/firebase');
var { PlayTurn } = require('../game/move');
var { ValidateTurn } = require('../schemas/validation');
const chalk = require('chalk');

async function getMatchById(id) {
    const db = firebase.Database();
    const ref = db.ref(config.MatchReference + '/' + id);
    const snapshot = await ref.once('value');
    return snapshot.val();
}

// This function is a beast. Please refactor me at some point. SOLID!
// TODO: investigate preventing a user from spamming this listener.
// TODO: investigate transactions to block the match from being updated by another process. 
async function listenToTurnReference() {
    console.log(chalk.red('Listener: HEADS_UP Phase'));
    const db = firebase.Database();
    const ref = db.ref(config.TurnReference);
    ref.on('child_added', async (snapshot) => {
        try {
            const data = snapshot.val();

            if (!ValidateTurn(data)) {
                throw new Error('Invalid turn request');
            }

            const match = await getMatchById(data.matchId);

            if (!match) {
                throw new Error('Match not found: ' + data.matchId);
            }

            if (match.phase !== 'HEADS_UP') {
                throw new Error('Match must be in the HEADS_UP phase to progress');
            }

            let { yourTeam, opponentsTeam } = getTeams(data.userId, match);

            if (data.userId !== yourTeam?.userId || undefined) {
                throw new Error(data.userId + ' does not have a match is progress.');
            }

            // TODO: move to deck
            const yourCard = yourTeam.hand?.find( m => {
                return m.uniqueId === data.cardId && (m.primaryMove === data.moveId || m.secondaryMove === data.moveId);
            });

            if (!yourCard) {
                throw new Error(data.userId + ' does not have card ' + data.cardId + ' in their hand.');
            }
            
            let updatedMatch;
                
            // TODO: investigate race conditons caused by players sending a turn before
            //       currentTurn has been updated,
            // OpponentHasPlayedHeadsUpPhase()

            if (match.currentTurn && match.currentTurn[opponentsTeam.userId]) {
                // Get opponents card from hand
                const opponentsStrategy = match.currentTurn[opponentsTeam.userId];
                const opponentCard = opponentsTeam.hand?.find( m => {
                    return m.uniqueId === opponentsStrategy.cardId && (m.primaryMove === opponentsStrategy.moveId || m.secondaryMove === opponentsStrategy.moveId);
                });

                if (!opponentCard) {
                    throw new Error(data.userId + ' does not have card ' + data.cardId + ' in their hand.');
                }

                // This is fugly logic. we need to make it bettern so we can sleep at night
                if (yourTeam === match.homeTeam) {
                    updatedMatch = PlayTurn(yourCard, data.moveId, opponentCard, opponentsStrategy.moveId, match);
                }

                if (yourTeam === match.awayTeam) {
                    updatedMatch = PlayTurn(opponentCard, opponentsStrategy.moveId, yourCard, data.moveId, match);
                }
            }
            else {
                // update match with your turn
                // TODO: move to match
                const yourTurn = {
                    'cardId' : yourCard.uniqueId,
                    'moveId' : data.moveId
                };

                updatedMatch = {...match};
                updatedMatch.currentTurn = {};
                updatedMatch.currentTurn[yourTeam.userId] = yourTurn;
            }

            const matchRef = db.ref(config.MatchReference);
            matchRef.child(data.matchId).set(updatedMatch);
        }
        catch (error) {
            console.error(error);
        }

        ref.child(snapshot.key).remove();
    });
}

async function listenToComboReference() {
    console.log(chalk.red('Listener: COMBO Phase'));
    const db = firebase.Database();
    const ref = db.ref(config.TurnReference);
    ref.on('child_added', async (snapshot) => {
        try {
            const data = snapshot.val();
            const match = await getMatchById(data.matchId);

            if (!match) {
                throw new Error('Match not found: ' + data.matchId);
            }

            if (match.phase !== 'COMBOS') {
                throw new Error('Match must be in the COMBOS phase to progress');
            }
        }
        catch (error) {
            console.error(error);
        }

        ref.child(snapshot.key).remove();
    });
}

function getTeams(userId, match) {
    let yourTeam, opponentsTeam;
    
    if (match?.homeTeam?.userId == userId) {
        yourTeam = match.homeTeam;
        opponentsTeam = match.awayTeam;
    }

    if (match?.awayTeam?.userId == userId) {
        yourTeam = match.awayTeam;
        opponentsTeam = match.homeTeam;
    }

    return {
        'yourTeam' : yourTeam,
        'opponentsTeam' : opponentsTeam
    };
}

exports.ListenToTurnReference = listenToTurnReference;
exports.ListenToComboReference = listenToComboReference;