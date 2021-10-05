var Deck = require('card-deck')

function createDeck(cards) {
    const multiplyCards = [...cards, ...cards, ...cards, ...cards]
    let deck = new Deck(multiplyCards);
    deck.shuffle();
    var hand = deck.draw(5);
    
    return {
        'deck' : deck._stack,
        'hand' : hand
    };
}

exports.CreateDeck = createDeck