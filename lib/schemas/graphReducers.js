function createMatchUser(json) {
    const cards = json.customDeck.cards.nodes.map(l => cardsReducer(l))
    return enhanceCards(cards);
}

// move to card helper for test purposes
function enhanceCards(cards) {
    const teamScore = cards.map(l => l.score).reduce((a, b) => a + b) / cards.length
    return cards.map(l => { 
      l.teamScore = teamScore
      return l
    })
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
      assist: card.player.gameStats[0].goalAssist != null,
      goalScorer: card.player.gameStats[0].goals != null,
      clearance: card.player.gameStats[0].totalClearance != null,
      shotAtGoal: card.player.gameStats[0].totalScoringAtt != null,
      tackle: card.player.gameStats[0].totalTackle != null
    }

    const primaryMove = calculatePrimaryMove(card.position, stats)
    const secondaryMove = calculateSecondaryMove(primaryMove, stats)

    return {
      id: card.id,
      name: card.player.displayName,
      pictureUrl: card.pictureUrl, 
      position: card.position,
      score: card.player.gameStats[0].so5Score.score ?? 0,
      slug: card.slug,
      assist: stats.assist,
      goalScorer: stats.goalScorer,
      primaryMove: primaryMove,
      secondaryMove: secondaryMove
    };
}

exports.CreateMatchUser = createMatchUser