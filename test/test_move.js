var should = require("should");
var move = require("../lib/moves/move");

var playerCard1, playerCard2, moveCard;

describe('Move', function(){

    beforeEach(function(){
        playerCard1 = {
            "_id" : "123",
            "name" : "John Terry",
            "passing" : 67,
            "interception" : 45
        };

        playerCard2 = {
            "_id" : "456",
            "name" : "Steve Gerrard",
            "passing" : 82,
            "interception" : 43
        };

        moveCard = {
            "_id" : "123",
            "name" : "short pass",
            "player1Attribute" : "passing",
            "player2Attribute" : "interception"
        };
    })

    describe(".play with empty player1 param", function() {
        it("should throw an exception for missing player1 parameter", function(){
            (function(){
                playerCard1 = undefined;
                move.Play(playerCard1, playerCard2, moveCard);
            }).should.throw('missing player1 parameter');
        });
    });

    describe(".play with empty player2 param", function() {
        it("should throw an exception for missing player2 parameter", function(){
            (function(){
                playerCard2 = undefined;
                move.Play(playerCard1, playerCard2, moveCard);
            }).should.throw('missing player2 parameter');
        });
    });

    describe(".play with empty move param", function() {
        it("should throw an exception for missing move parameter", function(){
            (function(){
                moveCard = undefined;
                move.Play(playerCard1, playerCard2, moveCard);
            }).should.throw('missing move parameter');
        });
    });

    describe(".play with player 2 attribute undefined", function() {
        it("should result in player1 winning", function(){
            playerCard1[moveCard.player1Attribute] = 10;
            moveCard.player2Attribute = "foobar";
            var result = move.Play(playerCard1, playerCard2, moveCard);
            result.should.equal("player1");
        });
    });

    describe(".play with player 2 attribute undefined", function() {
        it("should result in player1 winning", function(){
            playerCard2[moveCard.player2Attribute] = 10;
            moveCard.player1Attribute = "foobar";
            var result = move.Play(playerCard1, playerCard2, moveCard);
            result.should.equal("player2");
        });
    });

    describe(".play with player 1 attribute greater than player 2 attribute", function() {
        it("should result in player1 winning", function(){
            playerCard1[moveCard.player1Attribute] = 10;
            playerCard2[moveCard.player2Attribute] = 5;
            var result = move.Play(playerCard1, playerCard2, moveCard);
            result.should.equal("player1");
        });
    });

    describe(".play with player 1 attribute less than than player 2 attribute", function() {
        it("should result in player2 winning", function(){
            playerCard1[moveCard.player1Attribute] = 4;
            playerCard2[moveCard.player2Attribute] = 10;

            var result = move.Play(playerCard1, playerCard2, moveCard);
            result.should.equal("player2");
        });
    });

    describe(".play with player 1 attribute equal to player 2 attribute", function() {
        it("should result in a draw", function(){
            playerCard1[moveCard.player1Attribute] = 10;
            playerCard2[moveCard.player2Attribute] = 10;
            var result = move.Play(playerCard1, playerCard2, moveCard);
            result.should.equal("draw");
        });
    });
});