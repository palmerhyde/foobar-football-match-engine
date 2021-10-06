var graphql = require('../services/graphql')
var { ValidateSquad } = require('../schemas/validation')
var { CreateDeck } = require('../game/deck')

async function createMatch(homeUserId, awayUserId) {
    const user = await graphql.createMatchUser(homeUserId).catch((error) => console.error(error)) 
    const validUserCards = ValidateSquad(user.cards)
    
    const opponent = await graphql.createMatchOpponent(awayUserId).catch((error) => console.error(error)) 
    const validOpponentCards = ValidateSquad(opponent.cards)

    if (validUserCards.error || validOpponentCards.error) {
        console.log(validUserCards.error?.message)
        console.log(validOpponentCards.error?.message)
        process.exit()
    }

    let userDeck = CreateDeck(validUserCards.value);
    let opponentDeck = CreateDeck(validOpponentCards.value);

    return {
        'state' : 'INITAL_ADD' ,
        'homeTeam': { 
            'squad' : validUserCards.value,
            'deck' : userDeck.deck,
            'hand' : userDeck.hand,
            'discard' : [],
            'userId' :  homeUserId,
            'hitPoints' : user.hitPoints,
            'clubName' : user.club.clubName,
            'clubBadge' : user.club.clubBadge
        },
        'awayTeam': { 
            'squad' : validOpponentCards.value,
            'deck' : opponentDeck.deck,
            'hand' : opponentDeck.hand,
            'discard' : [] ,
            'userId' : awayUserId,
            'hitPoints' : opponent.hitPoints,
            'clubName' : opponent.club.clubName,
            'clubBadge' : opponent.club.clubBadge
        }
    }
}

exports.CreateMatch = createMatch;