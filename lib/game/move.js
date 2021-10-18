var Deck = require('card-deck');
const clone = require('rfdc')();

function playTurn(card, opponentsCard, match) {    
    const result = playHeadsUpTurn(card, opponentsCard);
    const updatedTeams = updateTeams(match.homeTeam, match.awayTeam, card, opponentsCard, result);
    const nextPhase = determineNextPhaseAfterHeadsUp(result, match.homeTeam.headsUp.headsUpMoveToken, match.awayTeam.headsUp.headsUpMoveToken);

    // TODO: Determine the next phase
    let updatedMatch = {
        'awayTeam' : updatedTeams.awayTeam,
        'homeTeam' : updatedTeams.homeTeam,
        'phase' : nextPhase,
        'state' : 'PLAYING_MATCH',
        'commentry' : result + ':' + card.headsUpMoveToken + ':' + opponentsCard.headsUpMoveToken
    };

    return updatedMatch;
}

// TODO: refactor this beast function
function updateTeams(homeTeam, awayTeam, homeCard, awayCard, result) {
    var updatedTeams = {
        'homeTeam' : {...homeTeam},
        'awayTeam' : {...awayTeam}
    };

    //var homeHand = new Deck(homeTeam.hand);
    //var awayHand = new Deck(awayTeam.hand);

    // take card from hand, place in discard
    // TODO: move to deck and move to end turn phase
    //var homeDiscard = homeHand.drawWhere(function(card) {
    //    return card.uniqueId === homeCard.uniqueId;
    //}, 1);

    ///var awayDiscard = awayHand.drawWhere(function(card) {
    //    return card.uniqueId === awayCard.uniqueId;
    //}, 1);

    //if (!updatedTeams.homeTeam.discard) {
    //    updatedTeams.homeTeam.discard = [];
    //}

    //if (!updatedTeams.awayTeam.discard) {
    //    updatedTeams.awayTeam.discard = [];
    //}

    //updatedTeams.homeTeam.discard.push(homeDiscard);
    //updatedTeams.awayTeam.discard.push(awayDiscard);

    // update hit points
    if (result == 'home' && homeCard.headsUpMoveToken == 'A')  {
        updatedTeams.awayTeam.hitPoints = awayTeam.hitPoints - homeCard.score;
    }

    if (result == 'home' && homeCard.headsUpMoveToken == 'P')  {
        updatedTeams.awayTeam.hitPoints = awayTeam.hitPoints - homeCard.teamScore;
    }

    if (result == 'away' && awayCard.headsUpMoveToken == 'A')  {
        updatedTeams.homeTeam.hitPoints = homeTeam.hitPoints - awayCard.score;
    }

    if (result == 'away' && awayCard.headsUpMoveToken == 'P')  {
        updatedTeams.homeTeam.hitPoints = homeTeam.hitPoints - awayCard.teamScore;
    }

    return updatedTeams;
}

function playHeadsUpTurn(card, opponentCard) {
    var result = 'unknown';

    if (card.headsUpMoveToken == 'A' && opponentCard.headsUpMoveToken == 'A') {
        if (card.score > opponentCard.score) {
            result = 'home';
        } 
        else if (card.score < opponentCard.score) {
            result = 'away';
        }
        else {
            result = 'draw';
        }
    }
    
    if (card.headsUpMoveToken == 'A' && opponentCard.headsUpMoveToken == 'P') {
        result = 'home';
    }

    if (card.headsUpMoveToken == 'A' && (opponentCard.headsUpMoveToken == 'D' || opponentCard.headsUpMoveToken == 'C')) {
        result = 'away';
    }

    if ((card.headsUpMoveToken == 'D' || card.headsUpMoveToken == 'C') && opponentCard.headsUpMoveToken == 'A') {
        result = 'home';
    }

    if ((card.headsUpMoveToken == 'D' || card.headsUpMoveToken == 'C')  && opponentCard.headsUpMoveToken == 'P') {
        result = 'away';
    }

    if ((card.headsUpMoveToken == 'D' || card.headsUpMoveToken == 'C')  && (opponentCard.headsUpMoveToken == 'D' || opponentCard.headsUpMoveToken == 'C')) {
        result = 'draw';
    }

    if (card.headsUpMoveToken == 'P' &&  opponentCard.headsUpMoveToken == 'A') {
        result = 'away';
    }

    if (card.headsUpMoveToken == 'P' &&  opponentCard.headsUpMoveToken == 'P') {
        if (card.teamScore > opponentCard.teamScore) {
            result = 'home';
        } 
        else if (card.teamScore < opponentCard.teamScore) {
            result = 'away';
        }
        else {
            result = 'draw';
        }
    }

    if (card.headsUpMoveToken == 'P' &&  (opponentCard.headsUpMoveToken == 'D' || opponentCard.headsUpMoveToken == 'C')) {
        result = 'home';
    }

    return result;
}

function getOpponentStrategy(hand) {
    return randomStrategy(hand);
}

function randomStrategy(hand) {
    const newHand = new Deck([...hand]).shuffle();
    const opponentCard = newHand.draw(1);
    const opponentMoves = new Deck([opponentCard.primaryMove, opponentCard.secondaryMove]);
    const opponentMove = opponentMoves.drawRandom(1);
    return {
        'hand' : newHand._stack,
        'card' : opponentCard,
        'move' : opponentMove
    };
}

function moveCardFromHandToHeadsUp(team, cardId, moveId) {
    let hand = new Deck([...clone(team.hand)]);
    let headsUp = hand.drawWhere(function(card) {
        return card.uniqueId === cardId && (card.primaryMove === moveId || card.secondaryMove === moveId);
    }, 1);

    if (!headsUp) {
        throw new Error('User does not have card ' + cardId + ' in their hand.');
    }

    headsUp.headsUpMoveToken = moveId;
    let updatedTeam = {...team};
    updatedTeam.headsUp = headsUp;
    updatedTeam.hand = hand._stack;
    
    return updatedTeam;
}

//function moveCardFromHeadsUpToDiscard() {
//}

//function moveCardsFromComboToDiscard() {
//}

function checkForFinalWhistle(match) {
    let newMatchState = {...match};
    
    // TODO: check for draw states
    if (match.homeTeam.hitPoints <=0) {
        newMatchState.state = 'FINAL_WHISTLE';
        newMatchState.commentry = match.homeTeam.clubName + ' lost. No hit points left.';
    }

    if (match.awayTeam.hitPoints <=0) {
        newMatchState.state = 'FINAL_WHISTLE';
        newMatchState.commentry = match.awayTeam.clubName + ' lost. No hit pooints left.';
    }

    if ((match.homeTeam.deck?.length ?? 0) == 0 && (match.homeTeam.hand?.length ==0) ==0 || 0) {
        newMatchState.state = 'FINAL_WHISTLE';
        newMatchState.commentry = match.homeTeam.clubName + ' lost. No cards remain.';
    }

    if ((match.awayTeam.deck?.length ?? 0) ==0 && (match.awayTeam.hand?.length ?? 0) ==0) {
        newMatchState.state = 'FINAL_WHISTLE';
        newMatchState.commentry = match.awayTeam.clubName + ' lost. No cards remain.';
    }

    return newMatchState;
}

function determineNextPhaseAfterHeadsUp(result, homeMoveToken, awayMoveToken) {
    if (result === 'draw') {
        return 'POWER_UP';
    }

    const winningMoveToken = (result === 'home' ? homeMoveToken : awayMoveToken);

    switch (winningMoveToken) {
    case 'A' :
    case 'P' :
        return 'COMBOS';
    case 'D' :
        return 'POWER_UP';
    case 'C' :
        return 'COUNTER';
    }
}

exports.GetOpponentStrategy = getOpponentStrategy;
exports.PlayTurn = playTurn;
exports.PlayHeadsUpTurn = playHeadsUpTurn;
exports.RandomStrategy = randomStrategy;
exports.CheckForFinalWhistle = checkForFinalWhistle;
exports.MoveCardFromHandToHeadsUp = moveCardFromHandToHeadsUp;
exports.DetermineNextPhaseAfterHeadsUp = determineNextPhaseAfterHeadsUp;