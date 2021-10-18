var config = require('../config');
var firebase = require('../services/firebase');
const chalk = require('chalk');
var { GetOpponentStrategy } = require('../game/move');

async function listenToMatchViewReference(userId) {
    console.log(chalk.red('Listener: Bot'));
    const db = firebase.Database();
    const ref = db.ref(config.MatchViewReference + '/' + userId);
    ref.on('value', async (snapshot) => {
        const data = snapshot.val();
        switch(data.phase) {
        case 'HEADS_UP':
            headsUpPhase(data, snapshot.key);
            break;
        case 'COMBOS' :
            comboPhase(data, snapshot.key);
            break;
        case 'POWERUP' :
            break;
        case 'END_TURN' :
            break;
        default :
            console.log(chalk.redBright('Unknown phase: ' + data.phase));
        }
    });
}

function headsUpPhase(matchView, userId) {
    console.log(chalk.red('HEADS_UP Phase'));
    if (matchView.playedTurn) {
        console.log(chalk.red('I have already played my turn'));
    } 
    else {
        console.log(chalk.red('I need to play my turn'));
        const opponentStrategy = GetOpponentStrategy(matchView.awayTeamHand);
        const opponentCard = opponentStrategy.card;
        const opponentMove = opponentStrategy.move;
        
        const db = firebase.Database();
        var ref = db.ref(config.TurnReference);
        ref.push({
            'matchId' : matchView.matchId,
            'userId' : userId,
            'cardId' : opponentCard.uniqueId,
            'moveId' : opponentMove
        }, () => {});
    }
}

function comboPhase(matchView, userId) {
    console.log(chalk.red('COMBO Phase'));

    // TODO: matchView needs to be updated with a representation of the HEADS_UP phase
}

listenToMatchViewReference('kimber');