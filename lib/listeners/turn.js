var config = require('../config');
var firebase = require('../services/firebase');
var { MoveCardFromHandToHeadsUp,  PlayTurn } = require('../game/move');
var { ValidateCombo, ValidateTurn } = require('../schemas/validation');
const chalk = require('chalk');

async function getMatchById(id) {
    const db = firebase.Database();
    const ref = db.ref(config.MatchReference + '/' + id);
    const snapshot = await ref.once('value');
    return snapshot.val();
}

// This function is a beast. Please refactor me at some point. SOLID!
// TODO: investigate transactions to block the match from being updated by another process. 
// TODO: investigate race conditons caused by players sending a turn before
//       currentTurn has been updated,
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
            validatePhase('HEADS_UP', match, data);
            let { yourTeam, opponentsTeam } = getTeams(data.userId, match);

            if (data.userId !== yourTeam?.userId || undefined) {
                throw new Error(data.userId + ' does not have a match that is in progress.');
            }

            if (yourTeam.headsUp) {
                throw new Error('You have already played a heads up phase this turn. Waiting for opponent...');
            }

            const updatedMatch = updateMatchForHeadsUpPhase(yourTeam, opponentsTeam, match, data);
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
            if (!ValidateCombo(data)) {
                throw new Error('Invalid combo request');
            }
            
            const match = await getMatchById(data.matchId);
            validatePhase('COMBOS', match, data);
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

function validatePhase(phase, match, data) {
    if (!match) {
        throw new Error('Match not found: ' + data.matchId);
    }

    if (match.phase !== phase) {
        throw new Error('Match must be in the ' + phase + ' phase to progress');
    }
}

// TODO: move me into match so I can be tested.
function updateMatchForHeadsUpPhase(yourTeam, opponentsTeam, match, data) {
    let updatedMatch;
    const updatedYourTeam = MoveCardFromHandToHeadsUp(yourTeam, data.cardId, data.moveId);
    if (opponentsTeam.headsUp) {
        if (yourTeam === match.homeTeam) {
            match.homeTeam = updatedYourTeam;
            updatedMatch = PlayTurn(updatedYourTeam.headsUp, opponentsTeam.headsUp, match);
        }

        if (yourTeam === match.awayTeam) {
            match.awayTeam = updatedYourTeam;
            updatedMatch = PlayTurn(opponentsTeam.headsUp, updatedYourTeam.headsUp, match);
        }
    }
    else {
        updatedMatch = {...match};
        if (yourTeam === match.homeTeam) {
            updatedMatch.homeTeam = updatedYourTeam;
        }

        if (yourTeam === match.awayTeam) {
            updatedMatch.awayTeam = updatedYourTeam;
        }
    }
    
    return updatedMatch;
}

exports.ListenToTurnReference = listenToTurnReference;
exports.ListenToComboReference = listenToComboReference;