var Deck = require('card-deck');

function playTurn(card, move, opponentsCard, opponentsMove, match) {    
    const result = playHeadsUpTurn(card, move, opponentsCard, opponentsMove)
    
    // Refactor updatedTeams into downsteam phase.
    // Use .lastTurnPlayed
    const updatedTeams = updateTeams(match.homeTeam, match.awayTeam, card, opponentsCard, move, opponentsMove, result)

    const lastHeadsUpTurn = {
        'homeCard' : card,
        'homeMove' : move,
        'awayCard' : opponentsCard,
        'awayMove' : opponentsMove,
        'result' : result
    }

    let updatedMatch = {
        'awayTeam' : updatedTeams.awayTeam,
        'homeTeam' : updatedTeams.homeTeam,
        'phase' : 'COMBOS',
        'state' : 'PLAYING_MATCH',
        'commentry' : result + ':' + move + ':' + opponentsMove,
        'lastHeadsUpTurn' : lastHeadsUpTurn
    }

    return updatedMatch;
}

// TODO: refactor this beast function
function updateTeams(homeTeam, awayTeam, homeCard, awayCard, homeMove, awayMove, result) {
    var updatedTeams = {
        'homeTeam' : {...homeTeam},
        'awayTeam' : {...awayTeam}
    }

    var homeHand = new Deck(homeTeam.hand);
    var awayHand = new Deck(awayTeam.hand);

    // take card from hand, place in discard
    // TODO: move to deck and move to end turn phase
    var homeDiscard = homeHand.drawWhere(function(card) {
        return card.uniqueId === homeCard.uniqueId;
    }, 1);

    var awayDiscard = awayHand.drawWhere(function(card) {
        return card.uniqueId === awayCard.uniqueId;
    }, 1);

    if (!updatedTeams.homeTeam.discard) {
        updatedTeams.homeTeam.discard = []
    }

    if (!updatedTeams.awayTeam.discard) {
        updatedTeams.awayTeam.discard = []
    }

    updatedTeams.homeTeam.discard.push(homeDiscard)
    updatedTeams.awayTeam.discard.push(awayDiscard)

    // update hit points
    if (result == 'player1' && homeMove == 'A')  {
        updatedTeams.awayTeam.hitPoints = awayTeam.hitPoints - homeCard.score
    }

    if (result == 'player1' && homeMove == 'P')  {
        updatedTeams.awayTeam.hitPoints = awayTeam.hitPoints - homeCard.teamScore
    }

    if (result == 'player2' && awayMove == 'A')  {
        updatedTeams.homeTeam.hitPoints = homeTeam.hitPoints - awayCard.score
    }

    if (result == 'player2' && awayMove == 'P')  {
        updatedTeams.homeTeam.hitPoints = homeTeam.hitPoints - awayCard.teamScore
    }

    return updatedTeams;
}

function playHeadsUpTurn(card, move, opponentCard, opponentMove) {
    var result = "unknown";

    if (move == 'A' && opponentMove == 'A') {
        if (card.score > opponentCard.score) {
            result = 'player1'
        } 
        else if (card.score < opponentCard.score) {
            result = 'player2'
        }
        else {
            result = 'draw'
        }
    }
    
    if (move == 'A' && opponentMove == 'P') {
        result = 'player1'
    }

    if (move == 'A' && (opponentMove == 'D' || opponentMove == 'C')) {
        result = 'player2'
    }

    if ((move == 'D' || move == 'C') && opponentMove == 'A') {
        result = 'player1'
    }

    if ((move == 'D' || move == 'C')  && opponentMove == 'P') {
        result = 'player2'
    }

    if ((move == 'D' || move == 'C')  && (opponentMove == 'D' || opponentMove == 'C')) {
        result = 'draw'
    }

    if (move == 'P' &&  opponentMove == 'A') {
        result = 'player2'
    }

    if (move == 'P' &&  opponentMove == 'P') {
        if (card.teamScore > opponentCard.teamScore) {
            result = 'player1'
        } 
        else if (card.teamScore < opponentCard.teamScore) {
            result = 'player2'
        }
        else {
            result = 'draw'
        }
    }

    if (move == 'P' &&  (opponentMove == 'D' || opponentMove == 'C')) {
        result = 'player1'
    }

    return result
}

function getOpponentStrategy(hand) {
    return randomStrategy(hand);
}

function randomStrategy(hand) {
    const newHand = new Deck([...hand]).shuffle()
    const opponentCard = newHand.draw(1);
    const opponentMoves = new Deck([opponentCard.primaryMove, opponentCard.secondaryMove]);
    const opponentMove = opponentMoves.drawRandom(1)
    return {
        'hand' : newHand._stack,
        'card' : opponentCard,
        'move' : opponentMove
    }
}

function checkForFinalWhistle(match) {
    let newMatchState = {...match};
    
    // TODO: check for draw states
    if (match.homeTeam.hitPoints <=0) {
        newMatchState.state = 'FINAL_WHISTLE'
        newMatchState.commentry = match.homeTeam.clubName + ' lost. No hit points left.'
    }

    if (match.awayTeam.hitPoints <=0) {
        newMatchState.state = 'FINAL_WHISTLE'
        newMatchState.commentry = match.awayTeam.clubName + ' lost. No hit pooints left.'
    }

    if ((match.homeTeam.deck?.length ?? 0) == 0 && (match.homeTeam.hand?.length ==0) ==0 || 0) {
        newMatchState.state = 'FINAL_WHISTLE'
        newMatchState.commentry = match.homeTeam.clubName + ' lost. No cards remain.'
    }

    if ((match.awayTeam.deck?.length ?? 0) ==0 && (match.awayTeam.hand?.length ?? 0) ==0) {
        newMatchState.state = 'FINAL_WHISTLE'
        newMatchState.commentry = match.awayTeam.clubName + ' lost. No cards remain.'
    }

    return newMatchState;
}

exports.GetOpponentStrategy = getOpponentStrategy;
exports.PlayTurn = playTurn;
exports.PlayHeadsUpTurn = playHeadsUpTurn;
exports.RandomStrategy = randomStrategy;
exports.CheckForFinalWhistle = checkForFinalWhistle;