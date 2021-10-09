var Deck = require('card-deck')

function createDeck(cards) {
    const multiplyCards = [...cards, ...cards, ...cards, ...cards]
    // add unique id to the card
    const orderedCards = multiplyCards.map((c, i) => {
        c.uniqueId = i
        return c
    })
    
    let deck = new Deck(orderedCards);
    deck.shuffle();
    var hand = deck.draw(5);
    
    return {
        'deck' : deck._stack,
        'hand' : hand
    };
}

exports.CreateDeck = createDeck