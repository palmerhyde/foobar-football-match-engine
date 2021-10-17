var should = require("should");
var schema = require("../lib/schemas/match");
var { CreateDeck, DealInitalHand, DealTurn } = require("../lib/game/deck");

var json;

describe('Deck', function(){

    beforeEach(function(){
        var name = require.resolve('./testData/valid-matches');
        if(name) {
            delete require.cache[name];
        }

        var matches = require("./testData/valid-matches");
        json = matches.ValidMatch;
    });

    describe("match with missing state", function() {
        it("should result in an error message", function(){
            json.state = undefined;
            var result = schema.match.validate(json);
            result.error.message.should.equal("\"state\" is required");
        });
    });

    describe("match with invalid state", function() {
        it("should result in an error message", function(){
            json.state = 'HIT_ME';
            var result = schema.match.validate(json);
            result.error.message.should.equal("\"state\" must be one of [FIRST_UPDATE, INITAL_ADD]");
        });
    });

    describe("11 players", function() {
        it("should result in 44 cards", function(){
            var result = CreateDeck(json.homeTeam.squad)
            result.length.should.equal(44)
        });
    });

    describe("Inital Hand", function() {
        it("should result in hand size of 5 and a deck size of 39", function(){
            var cards = CreateDeck(json.homeTeam.squad)
            var hand = DealInitalHand(cards)
            uniqueArr = [... new Set(hand.hand)];
            uniqueArr.length.should.equal(hand.hand.length)
            hand.deck.length.should.equal(39)
            hand.hand.length.should.equal(5)
        });
    });

    describe("Deal Turn", function() {
        it("should result in 1 less card in the deck.", function(){
            const cardPiles = {
                'deck' : [...json.homeTeam.deck],
                'hand' : [...json.homeTeam.hand],
                'discard' : [],
            }
            
            var newCardPiles = DealTurn(cardPiles);
            newCardPiles.deck.length.should.equal(cardPiles.deck.length -1);
            newCardPiles.hand.length.should.equal(cardPiles.hand.length +1);
        });
    });

    describe("Deal Turn with 0 cards left in deck", function() {
        it("should result in 0 cards being dealt.", function(){
            json.homeTeam.discard = [];
            const cardPiles = {
                'deck' : [],
                'hand' : [...json.homeTeam.hand],
                'discard' : [...json.homeTeam.discard],
            }
            
            var newCardPiles = DealTurn(cardPiles);
            newCardPiles.hand.length.should.equal(cardPiles.hand.length);
        });
    });

    describe("valid match", function() {
        it("should validate", function(){
            var result = schema.match.validate(json);
            should.not.exist(result.error)
        });
    });
});