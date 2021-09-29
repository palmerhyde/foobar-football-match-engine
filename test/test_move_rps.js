var should = require("should");
var move = require("../lib/moves/rps");
var joi = require("joi");

var playerCard1, playerCard2, moveCard;

// TODO: rename reveal
describe('Move', function(){

    beforeEach(function(){
        var module1 = require.resolve('./testData/valid-moves');
        if(module1) {
            delete require.cache[module1];
        }

        var module2 = require.resolve('./testData/valid-players');
        if(module2) {
            delete require.cache[module2];
        }

        var moves = require("./testData/valid-moves");
        var players = require("./testData/valid-players");
        moveCard = moves.ShortPassVsIntercept;
        playerCard1 = players.Zola_1201;
        playerCard2 = players.Messi_158023;
    });

    describe("player 1 ATTACK attribute more than than player 2 ATTACK attribute", function() {
        it("should result in player2 winning", function(){
            playerCard1[moveCard.player1Attribute] = 10;
            playerCard2[moveCard.player2Attribute] = 4;
            playerCard1.action = "ATTACK";
            playerCard2.action = "ATTACK";

            var result = move(playerCard1, playerCard2, moveCard);
            result.should.equal("player1");
        });
    });

    describe("player 1 ATTACK attribute less than than player 2 ATTACK attribute", function() {
        it("should result in player2 winning", function(){
            playerCard1[moveCard.player1Attribute] = 4;
            playerCard2[moveCard.player2Attribute] = 10;
            playerCard1.action = "ATTACK";
            playerCard2.action = "ATTACK";

            var result = move(playerCard1, playerCard2, moveCard);
            result.should.equal("player2");
        });
    });

    describe(".play with player 1 attribute equal to player 2 attribute", function() {
        it("should result in a draw", function(){
            playerCard1[moveCard.player1Attribute] = 10;
            playerCard2[moveCard.player2Attribute] = 10;
            playerCard1.action = "ATTACK";
            playerCard2.action = "ATTACK";
            var result = move(playerCard1, playerCard2, moveCard);
            result.should.equal("draw");
        });
    });

    describe("player 1 ATTACK vs player 2 DEFENCE", function() {
        it("should result in player2 winning", function(){
            playerCard1.action = "ATTACK";
            playerCard2.action = "DEFENCE";
            var result = move(playerCard1, playerCard2, moveCard);
            result.should.equal("player2");
        });
    });

    describe("player 1 ATTACK vs player 2 POSSESSION", function() {
        it("should result in player2 winning", function(){
            playerCard1.action = "ATTACK";
            playerCard2.action = "POSSESSION";
            var result = move(playerCard1, playerCard2, moveCard);
            result.should.equal("player1");
        });
    });

    describe("player 1 ATTACK vs player 2 COUNTER", function() {
        it("should result in player2 winning", function(){
            playerCard1.action = "ATTACK";
            playerCard2.action = "COUNTER";
            var result = move(playerCard1, playerCard2, moveCard);
            result.should.equal("player2");
        });
    });

    describe("player 1 DEFENCE vs player 2 ATTACK", function() {
        it("should result in player2 winning", function(){
            playerCard1.action = "DEFENCE";
            playerCard2.action = "ATTACK";
            var result = move(playerCard1, playerCard2, moveCard);
            result.should.equal("player1");
        });
    });

    describe("player 1 DEFENCE vs player 2 DEFENCE", function() {
        it("should result in player2 winning", function(){
            playerCard1.action = "DEFENCE";
            playerCard2.action = "DEFENCE";
            var result = move(playerCard1, playerCard2, moveCard);
            result.should.equal("draw");
        });
    });

    describe("player 1 DEFENCE vs player 2 POSSESSION", function() {
        it("should result in player2 winning", function(){
            playerCard1.action = "DEFENCE";
            playerCard2.action = "POSSESSION";
            var result = move(playerCard1, playerCard2, moveCard);
            result.should.equal("player2");
        });
    });

    describe("player 1 DEFENCE vs player 2 COUNTER", function() {
        it("should result in player2 winning", function(){
            playerCard1.action = "DEFENCE";
            playerCard2.action = "COUNTER";
            var result = move(playerCard1, playerCard2, moveCard);
            result.should.equal("draw");
        });
    });

    describe("player 1 POSSESSION vs player 2 ATTACK", function() {
        it("should result in player2 winning", function(){
            playerCard1.action = "POSSESSION";
            playerCard2.action = "ATTACK";
            var result = move(playerCard1, playerCard2, moveCard);
            result.should.equal("player2");
        });
    });

    describe("player 1 POSSESSION vs player 2 DEFENCE", function() {
        it("should result in player2 winning", function(){
            playerCard1.action = "POSSESSION";
            playerCard2.action = "DEFENCE";
            var result = move(playerCard1, playerCard2, moveCard);
            result.should.equal("player1");
        });
    });

    describe("player 1 POSSESSION vs player 2 POSSESSION", function() {
        it("should result in player2 winning", function(){
            playerCard1.action = "POSSESSION";
            playerCard2.action = "POSSESSION";
            var result = move(playerCard1, playerCard2, moveCard);
            result.should.equal("draw");
        });
    });

    describe("player 1 POSSESSION vs player 2 COUNTER", function() {
        it("should result in player2 winning", function(){
            playerCard1.action = "POSSESSION";
            playerCard2.action = "COUNTER";
            var result = move(playerCard1, playerCard2, moveCard);
            result.should.equal("player1");
        });
    });

    describe("player 1 COUNTER vs player 2 ATTACK", function() {
        it("should result in player2 winning", function(){
            playerCard1.action = "COUNTER";
            playerCard2.action = "ATTACK";
            var result = move(playerCard1, playerCard2, moveCard);
            result.should.equal("player1");
        });
    });

    describe("player 1 COUNTER vs player 2 DEFENCE", function() {
        it("should result in player2 winning", function(){
            playerCard1.action = "COUNTER";
            playerCard2.action = "DEFENCE";
            var result = move(playerCard1, playerCard2, moveCard);
            result.should.equal("draw");
        });
    });

    describe("player 1 COUNTER vs player 2 POSSESSION", function() {
        it("should result in player2 winning", function(){
            playerCard1.action = "COUNTER";
            playerCard2.action = "POSSESSION";
            var result = move(playerCard1, playerCard2, moveCard);
            result.should.equal("player2");
        });
    });

    describe("player 1 COUNTER vs player 2 COUNTER", function() {
        it("should result in player2 winning", function(){
            playerCard1.action = "COUNTER";
            playerCard2.action = "COUNTER";
            var result = move(playerCard1, playerCard2, moveCard);
            result.should.equal("draw");
        });
    });

    describe("player 1 UNKNOWN vs player 2 COUNTER", function() {
        it("should result in player2 winning", function(){
            playerCard1.action = "UNKNOWN";
            playerCard2.action = "COUNTER";
            var result = move(playerCard1, playerCard2, moveCard);
            result.should.equal("unknown");
        });
    });
});
