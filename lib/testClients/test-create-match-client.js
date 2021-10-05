var firebase = require('../services/firebase')
var config = require('../config');
var graphql = require('../services/graphql')
var { ValidateSquad } = require('../schemas/validation')

var db = firebase.Database()
var ref = db.ref(config.MatchReference);

async function createMatch(homeUserId, awayUserId) {
    // TODO: can we get this in one query?  
    const user = await graphql.createMatchUser(homeUserId).catch((error) => console.error(error)) 
    const validUserCards = ValidateSquad(user.cards)
    
    const opponent = await graphql.createMatchOpponent(awayUserId).catch((error) => console.error(error)) 
    const validOpponentCards = ValidateSquad(opponent.cards)

    if (validUserCards.error || validOpponentCards.error) {
        console.log(validUserCards.error?.message)
        console.log(validOpponentCards.error?.message)
        process.exit()
    }

    // TODO: move to create match helper
    const match = {
        'homeTeam': { 
            'squad' : validUserCards.value,
            'deck' : [],
            'hand' : [],
            'discard' : [],
            'userId' :  homeUserId,
            'hitPoints' : user.hitPoints,
            'clubName' : user.club.clubName,
            'clubBadge' : user.club.clubBadge
        },
        'awayTeam': { 
            'squad' : validOpponentCards.value,
            'deck' : [],
            'hand' : [],
            'discard' : [] ,
            'userId' : awayUserId,
            'hitPoints' : opponent.hitPoints,
            'clubName' : opponent.club.clubName,
            'clubBadge' : opponent.club.clubBadge
        }
    }
 
    ref.push(match, () => {
        // update user objects with match details
        process.exit()
    })
}

createMatch('liammolloy', 'kimber');
