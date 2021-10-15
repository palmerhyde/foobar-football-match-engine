var should = require("should");
var schema = require("../lib/schemas/match");
var { CreateDeck, DealInitalHand } = require("../lib/game/deck");

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

    describe("valid match", function() {
        it("should validate", function(){
            var result = schema.match.validate(json);
            should.not.exist(result.error)
        });
    });
});