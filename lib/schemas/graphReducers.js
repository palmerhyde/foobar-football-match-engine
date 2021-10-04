function createMatchUser(json) {
    const cards = json.customDeck.cards.nodes.map(l => cardsReducer(l))
    return enhanceCards(cards);
}

function createMatchOpponent(json) {
    const cards = json.user.cards.map(l => cardsReducer(l))
    const selectedSquad = selectSquad(cards)
    return enhanceCards(selectedSquad);
}

// move to card helper for test purposes
function enhanceCards(cards) {
    const teamScore = cards.map(l => l.score).reduce((a, b) => a + b) / cards.length
    return cards.map(l => { 
      l.teamScore = teamScore
      return l
    })
}

function selectSquad(cards) {
  // Move dedupe cards to a seperate function
  const dedupedCards = Array.from(new Set(cards.map(a => a.name)))
    .map(name => {
      return cards.find(a => a.name === name)
    })
    
  const formation = determineFormation(playerPostionCounts(dedupedCards))

  const goalkeeper = dedupedCards.filter(c => c.position == 'Goalkeeper')
                           .sort((a,b) => b.score-a.score)
                           .slice(0,1);

  const defenders = dedupedCards.filter(c => c.position == 'Defender')
                            .sort((a,b) => b.score-a.score)
                            .slice(0,formation.Defender);

  const midfielders = dedupedCards.filter(c => c.position == 'Midfielder')
                            .sort((a,b) => b.score-a.score)
                            .slice(0,formation.Midfielder);

  const forwards = dedupedCards.filter(c => c.position == 'Forward')
                            .sort((a,b) => b.score-a.score)
                            .slice(0,formation.Forward);

  return   [...goalkeeper, ...defenders, ...midfielders, ...forwards];
}

// TODO: move to card helper so we can test
function playerPostionCounts (cards) {
  const reducer = (map, val) => {
    if (map[val] == null) {
      map[val] = 1;
    } else {
      ++map[val];
    }
    return map; 
  }; 

  return cards.map(c => c.position).reduce(reducer, {});
}

// TODO: move to card helper to we can unit test
function determineFormation (positionCounts) {
  const formation = {
    'Defender' : 0,
    'Midfielder' : 0,
    'Forward' : 0
  }

  const formations = [
    { 'Defender' : 4, 'Midfielder' : 4, 'Forward' : 2 },
    { 'Defender' : 4, 'Midfielder' : 3, 'Forward' : 3 },
    { 'Defender' : 4, 'Midfielder' : 1, 'Forward' : 5 },
    { 'Defender' : 4, 'Midfielder' : 2, 'Forward' : 4 },
    { 'Defender' : 4, 'Midfielder' : 5, 'Forward' : 1 },
    { 'Defender' : 3, 'Midfielder' : 5, 'Forward' : 2 },
    { 'Defender' : 3, 'Midfielder' : 3, 'Forward' : 4 },
    { 'Defender' : 3, 'Midfielder' : 2, 'Forward' : 5 },
    { 'Defender' : 3, 'Midfielder' : 4, 'Forward' : 3 },
    { 'Defender' : 3, 'Midfielder' : 1, 'Forward' : 6 },
    { 'Defender' : 2, 'Midfielder' : 4, 'Forward' : 4 },
    { 'Defender' : 2, 'Midfielder' : 3, 'Forward' : 5 },
    { 'Defender' : 2, 'Midfielder' : 2, 'Forward' : 6 },
    { 'Defender' : 2, 'Midfielder' : 1, 'Forward' : 7 },
    { 'Defender' : 1, 'Midfielder' : 5, 'Forward' : 4 },
    { 'Defender' : 1, 'Midfielder' : 4, 'Forward' : 5 },
    { 'Defender' : 1, 'Midfielder' : 3, 'Forward' : 6 },
  ]

  for (const formation of formations) {
    if (positionCounts.Defender >= formation.Defender &&
      positionCounts.Midfielder >= formation.Midfielder &&
      positionCounts.Forward >= formation.Forward) {
        return formation
      }
  }

  return formation
}
// Move to card helper for test purposes
function calculatePrimaryMove(position, stats) {
  switch (position) {
    case 'Forward':
      return 'A'
    case 'Midfielder':
      return 'P'
    case 'Defender':
      return (stats.assist || stats.goalScorer || stats.shotAtGoal) ? 'C' : 'D'
    case 'Goalkeeper':
      return 'D'
  }
}

// Move to card helper for test purposes
function calculateSecondaryMove(primaryMove, stats) {  
  
  if (primaryMove == 'A') {
    return (stats.clearance || stats.tackle) ? 'D' : 'P'
  }

  if (primaryMove == 'P') {
    return (stats.clearance || stats.tackle) ? 'D' : 'A'
  }

  if (primaryMove == 'D') {
    return (stats.goalAssist || stats.goalScorer || stats.shotAtGoal) ? 'A' : 'P'
  }

  if (primaryMove == 'C') {
    return 'A'
  }
}

function cardsReducer(card) {  
    var stats = {
      assist: card.player.gameStats[0]?.goalAssist != null || false,
      goalScorer: card.player.gameStats[0]?.goals != null || false,
      clearance: card.player.gameStats[0]?.totalClearance != null || false,
      shotAtGoal: card.player.gameStats[0]?.totalScoringAtt != null || false,
      tackle: card.player.gameStats[0]?.totalTackle != null || false
    }

    const primaryMove = calculatePrimaryMove(card.position, stats)
    const secondaryMove = calculateSecondaryMove(primaryMove, stats)

    return {
      id: card.id,
      name: card.player.displayName,
      pictureUrl: card.pictureUrl, 
      position: card.position,
      score: card.player.gameStats[0]?.so5Score?.score ?? 0,
      slug: card.slug,
      assist: stats.assist,
      goalScorer: stats.goalScorer,
      primaryMove: primaryMove,
      secondaryMove: secondaryMove
    };
}

exports.CreateMatchUser = createMatchUser
exports.CreateMatchOpponent = createMatchOpponent
exports.DetermineFormation = determineFormation