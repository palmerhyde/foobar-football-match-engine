var Deck = require('card-deck')
const clone = require('rfdc')()

function createDeck(cards) {
    const multiplyCards = [...clone(cards), ...clone(cards), ...clone(cards), ...clone(cards)]
    // add unique id to the card
    const orderedCards = multiplyCards.map((c, i) => {
        c.uniqueId = i
        return c
    })

    return orderedCards
}

function dealInitalHand(cards) {
    let deck = new Deck(cards);
    deck.shuffle();
    var hand = deck.draw(5);
    return {
        'deck' : deck._stack,
        'hand' : hand
    };
}

exports.CreateDeck = createDeck
exports.DealInitalHand = dealInitalHand