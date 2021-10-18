var graphql = require('../services/graphql');
var { ValidateSquad } = require('../schemas/validation');
var { CreateDeck, DealInitalHand } = require('./deck');

async function createMatch(homeUserId, awayUserId) {
    const user = await graphql.createMatchUser(homeUserId).catch((error) => console.error(error)); 
    const validUserCards = ValidateSquad(user.cards);
    
    const opponent = await graphql.createMatchOpponent(awayUserId).catch((error) => console.error(error)); 
    const validOpponentCards = ValidateSquad(opponent.cards);

    if (validUserCards.error || validOpponentCards.error) {
        console.log(validUserCards.error?.message);
        console.log(validOpponentCards.error?.message);
        // eslint-disable-next-line no-undef
        process.exit();
    }

    let userDeck = CreateDeck(validUserCards.value);
    let opponentDeck = CreateDeck(validOpponentCards.value);
    let userHand = DealInitalHand(userDeck);
    let opponentHand = DealInitalHand(opponentDeck);

    return {
        'state' : 'INITAL_ADD' ,
        'homeTeam': { 
            'squad' : validUserCards.value,
            'deck' : userHand.deck,
            'hand' : userHand.hand,
            'discard' : [],
            'userId' :  homeUserId,
            'hitPoints' : user.hitPoints,
            'clubName' : user.club.clubName,
            'clubBadge' : user.club.clubBadge
        },
        'awayTeam': { 
            'squad' : validOpponentCards.value,
            'deck' : opponentHand.deck,
            'hand' : opponentHand.hand,
            'discard' : [] ,
            'userId' : awayUserId,
            'hitPoints' : opponent.hitPoints,
            'clubName' : opponent.club.clubName,
            'clubBadge' : opponent.club.clubBadge
        }
    };
}

function createHomeMatchViewFromMatch (match, key) {
    const matchView = {
        'homeTeamName' : match.homeTeam.clubName,
        'homeTeamBadge' : match.homeTeam.clubBadge,
        'homeTeamScore' : parseInt(match.homeTeam.hitPoints),
        'homeTeamDeckCardCount' : match.homeTeam.deck?.length || 0,
        'homeTeamHand' :  match.homeTeam.hand ?? [],
        'homeTeamDiscard' : match.homeTeam.discard ?? [],
        'homeTeamSquad' : match.homeTeam.squad,
        'homeTeamHeadsUp' : match.homeTeam.headsUp ?? {},
        'homeTeamCombo' : match.homeTeam.combo ?? [],
        'homeTeamPowerUp' : match.homeTeam.powerUp ?? [],
        'awayTeamName' : match.awayTeam.clubName,
        'awayTeamBadge' : match.awayTeam.clubBadge,
        'awayTeamScore' : parseInt(match.awayTeam.hitPoints),
        'awayTeamDeckCardCount' : match.awayTeam.deck?.length || 0,
        'awayTeamHandCount' : match.awayTeam.hand?.length || 0,
        'awayTeamDiscard' : match.awayTeam.discard ?? [],
        'awayTeamSquad' : match.awayTeam.squad,
        'phase' : match.phase,
        'matchId' : key
    };

    return matchView;
}

function createAwayMatchViewFromMatch (match, key) {
    const matchView = {
        'homeTeamName' : match.homeTeam.clubName,
        'homeTeamBadge' : match.homeTeam.clubBadge,
        'homeTeamScore' : parseInt(match.homeTeam.hitPoints),
        'homeTeamDeckCardCount' : match.homeTeam.deck?.length || 0,
        'homeTeamHandCardCount' :  match.homeTeam.hand?.length || 0,
        'homeTeamDiscard' : match.homeTeam.discard ?? [],
        'homeTeamSquad' : match.homeTeam.squad,
        'awayTeamName' : match.awayTeam.clubName,
        'awayTeamBadge' : match.awayTeam.clubBadge,
        'awayTeamScore' : parseInt(match.awayTeam.hitPoints),
        'awayTeamDeckCardCount' : match.awayTeam.deck?.length || 0,
        'awayTeamHand' : match.awayTeam.hand ?? [],
        'awayTeamDiscard' : match.awayTeam.discard ?? [],
        'awayTeamSquad' : match.awayTeam.squad,
        'awayTeamHeadsUp' : match.awayTeam.headsUp ?? {},
        'awayTeamCombo' : match.awayTeam.combo ?? [],
        'awayTeamPowerUp' : match.awayTeam.powerUp ?? [],
        'phase' : match.phase,
        'matchId' : key
    };

    return matchView;
}

exports.CreateMatch = createMatch;
exports.CreateHomeMatchViewFromMatch = createHomeMatchViewFromMatch;
exports.CreateAwayMatchViewFromMatch = createAwayMatchViewFromMatch;