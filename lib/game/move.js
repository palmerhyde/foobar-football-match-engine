var Deck = require('card-deck');

function playTurn(card, move, match) {
    // TODO: validate move is playable
    const opponentStrategy = getOpponentStrategy(match)
    const opponentCard = opponentStrategy.card
    const opponentMove = opponentStrategy.move
    const result = playHeadsUpTurn(card, move, opponentCard, opponentMove)
    const updatedTeams = updateTeams(match.homeTeam, match.awayTeam, card, opponentCard, move, opponentMove, result)

    let updatedMatch = {
        'awayTeam' : updatedTeams.awayTeam,
        'homeTeam' : updatedTeams.homeTeam,
        'phase' : 'combos',
        'state' : 'playing',
        'commentry' : result + ':' + move + ':' + opponentMove
    }

    return updatedMatch;
}

// TODO: refactor this beast function
function updateTeams(homeTeam, awayTeam, homeCard, awayCard, homeMove, awayMove, result) {
    let updatedTeams = {
        'homeTeam' : {...homeTeam},
        'awayTeam' : {...awayTeam}
    }

    var homeHand = new Deck(homeTeam.hand);
    var awayHand = new Deck(awayTeam.hand);

    // take card from hand, place in discard
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

function getOpponentStrategy(match) {
    return randomStrategy(match);
}

function randomStrategy(match) {
    const hand = new Deck([...match.awayTeam.hand]).shuffle()
    const opponentCard = hand.draw(1);
    const opponentMoves = new Deck([opponentCard.primaryMove, opponentCard.secondaryMove]);
    const opponentMove = opponentMoves.drawRandom(1)
    return {
        'hand' : hand._stack,
        'card' : opponentCard,
        'move' : opponentMove
    }
}

exports.getOpponentStrategy = getOpponentStrategy
exports.PlayTurn = playTurn;
exports.PlayHeadsUpTurn = playHeadsUpTurn
exports.RandomStrategy = randomStrategy