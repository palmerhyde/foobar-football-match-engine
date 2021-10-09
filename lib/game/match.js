var graphql = require('../services/graphql')
var { ValidateSquad } = require('../schemas/validation')
var { CreateDeck } = require('./deck')

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

function createMatchViewFromMatch (match) {
    const matchView = {
        'homeTeamName' : match.homeTeam.clubName,
        'homeTeamBadge' : match.homeTeam.clubBadge,
        'homeTeamScore' : parseInt(match.homeTeam.hitPoints),
        'homeTeamDeckCardCount' : match.homeTeam.deck?.length || 0,
        'homeTeamHand' :  match.homeTeam.hand ?? [],
        'homeTeamDiscard' : match.homeTeam.discard ?? [],
        'homeTeamSquad' : match.homeTeam.squad,
        'awayTeamName' : match.awayTeam.clubName,
        'awayTeamBadge' : match.awayTeam.clubBadge,
        'awayTeamScore' : parseInt(match.awayTeam.hitPoints),
        'awayTeamDeckCardCount' : match.awayTeam.deck?.length || 0,
        'awayTeamHandCount' : match.awayTeam.hand?.length || 0,
        'awayTeamDiscard' : match.awayTeam.discard ?? [],
        'awayTeamSquad' : match.awayTeam.squad
    }

    return matchView
}

exports.CreateMatch = createMatch;
exports.CreateMatchViewFromMatch = createMatchViewFromMatch