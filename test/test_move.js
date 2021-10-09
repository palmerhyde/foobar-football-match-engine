var should = require("should");
var move = require("../lib/game/move");
var { RandomStrategy, PlayHeadsUpTurn  } = require("../lib/game/move");

var json;

describe('Move', function(){

    beforeEach(function(){
        var name = require.resolve('./testData/valid-matches');
        if(name) {
            delete require.cache[name];
        }

        var matches = require("./testData/valid-matches");
        json = matches.ValidMatch;
    });

    describe('Opponent Strategy', function() {

        describe("random away strategy", function() {
            it("should result in a valid card and move selection", function(){
                var strategy = RandomStrategy(json)
                should.exist(strategy.card);
                strategy.move.should.be.equalOneOf('A', 'D', 'C', 'P');
                strategy.hand.length.should.equal(json.awayTeam.hand.length - 1);
            });
        });

    });

    describe('Heads Up Turn', function() {

        describe("player 1 ATTACK with a score greater than than player 2 ATTACK score", function() {
            it("should result in player1 winning", function(){
                let player1Card = json.homeTeam.hand[0];
                player1Card.score = 99;
                const player1Move = 'A';
                const player2Card = json.awayTeam.hand[0];
                player2Card.score = 50;
                const player2Move = 'A';
                
                const result = PlayHeadsUpTurn(player1Card, player1Move, player2Card, player2Move);
                result.should.equal("player1");
            });
        });

        describe("player 1 ATTACK with a score less than than player 2 ATTACK score", function() {
            it("should result in player2 winning", function(){
                let player1Card = json.homeTeam.hand[0];
                player1Card.score = 6;
                const player1Move = 'A';
                const player2Card = json.awayTeam.hand[0];
                player2Card.score = 50;
                const player2Move = 'A';
                
                const result = PlayHeadsUpTurn(player1Card, player1Move, player2Card, player2Move);
                result.should.equal("player2");
            });
        });

        describe("player 1 ATTACK with a score equal to player 2 ATTACK score", function() {
            it("should result in a draw", function(){
                let player1Card = json.homeTeam.hand[0];
                player1Card.score = 50;
                const player1Move = 'A';
                const player2Card = json.awayTeam.hand[0];
                player2Card.score = 50;
                const player2Move = 'A';
                
                const result = PlayHeadsUpTurn(player1Card, player1Move, player2Card, player2Move);
                result.should.equal("draw");
            });
        });

        describe("player 1 POSSESSION with a team score greater than than player 2 POSSESSION team score", function() {
            it("should result in player1 winning", function(){
                let player1Card = json.homeTeam.hand[0];
                player1Card.teamScore = 99;
                const player1Move = 'P';
                const player2Card = json.awayTeam.hand[0];
                player2Card.teamScore = 50;
                const player2Move = 'P';
                
                const result = PlayHeadsUpTurn(player1Card, player1Move, player2Card, player2Move);
                result.should.equal("player1");
            });
        });

        describe("player 1 POSSESSION with a team score less than than player 2 POSSESSION team score", function() {
            it("should result in player2 winning", function(){
                let player1Card = json.homeTeam.hand[0];
                player1Card.teamScore = 10;
                const player1Move = 'P';
                const player2Card = json.awayTeam.hand[0];
                player2Card.teamScore = 50;
                const player2Move = 'P';
                
                const result = PlayHeadsUpTurn(player1Card, player1Move, player2Card, player2Move);
                result.should.equal("player2");
            });
        });

        describe("player 1 POSSESSION with a team score equal to player 2 POSSESSION team score", function() {
            it("should result in a draw", function(){
                let player1Card = json.homeTeam.hand[0];
                player1Card.teamScore = 50;
                const player1Move = 'P';
                const player2Card = json.awayTeam.hand[0];
                player2Card.teamScore = 50;
                const player2Move = 'P';
                
                const result = PlayHeadsUpTurn(player1Card, player1Move, player2Card, player2Move);
                result.should.equal("draw");
            });
        });

        describe("player 1 ATTACK against player 2 POSSESSION", function() {
            it("should result in player1 winning", function(){
                let player1Card = json.homeTeam.hand[0];
                const player1Move = 'A';
                const player2Card = json.awayTeam.hand[0];
                const player2Move = 'P';
                
                const result = PlayHeadsUpTurn(player1Card, player1Move, player2Card, player2Move);
                result.should.equal("player1");
            });
        });

        describe("player 1 ATTACK against player 2 DEFENCE", function() {
            it("should result in player2 winning", function(){
                let player1Card = json.homeTeam.hand[0];
                const player1Move = 'A';
                const player2Card = json.awayTeam.hand[0];
                const player2Move = 'D';
                
                const result = PlayHeadsUpTurn(player1Card, player1Move, player2Card, player2Move);
                result.should.equal("player2");
            });
        });

        describe("player 1 ATTACK against player 2 COUNTER", function() {
            it("should result in player2 winning", function(){
                let player1Card = json.homeTeam.hand[0];
                const player1Move = 'A';
                const player2Card = json.awayTeam.hand[0];
                const player2Move = 'C';
                
                const result = PlayHeadsUpTurn(player1Card, player1Move, player2Card, player2Move);
                result.should.equal("player2");
            });
        });

        describe("player 1 DEFENSE against player 2 ATTACK", function() {
            it("should result in player1 winning", function(){
                let player1Card = json.homeTeam.hand[0];
                const player1Move = 'D';
                const player2Card = json.awayTeam.hand[0];
                const player2Move = 'A';
                
                const result = PlayHeadsUpTurn(player1Card, player1Move, player2Card, player2Move);
                result.should.equal("player1");
            });
        });

        describe("player 1 COUNTER against player 2 ATTACK", function() {
            it("should result in player1 winning", function(){
                let player1Card = json.homeTeam.hand[0];
                const player1Move = 'C';
                const player2Card = json.awayTeam.hand[0];
                const player2Move = 'A';
                
                const result = PlayHeadsUpTurn(player1Card, player1Move, player2Card, player2Move);
                result.should.equal("player1");
            });
        });

        describe("player 1 DEFENSE against player 2 POSSESSION", function() {
            it("should result in player2 winning", function(){
                let player1Card = json.homeTeam.hand[0];
                const player1Move = 'D';
                const player2Card = json.awayTeam.hand[0];
                const player2Move = 'P';
                
                const result = PlayHeadsUpTurn(player1Card, player1Move, player2Card, player2Move);
                result.should.equal("player2");
            });
        });

        describe("player 1 COUNTER against player 2 POSSESSION", function() {
            it("should result in player2 winning", function(){
                let player1Card = json.homeTeam.hand[0];
                const player1Move = 'C';
                const player2Card = json.awayTeam.hand[0];
                const player2Move = 'P';
                
                const result = PlayHeadsUpTurn(player1Card, player1Move, player2Card, player2Move);
                result.should.equal("player2");
            });
        });

        describe("player 1 DEFENSE against player 2 DEFENSE", function() {
            it("should result in a draw", function(){
                let player1Card = json.homeTeam.hand[0];
                const player1Move = 'D';
                const player2Card = json.awayTeam.hand[0];
                const player2Move = 'D';
                
                const result = PlayHeadsUpTurn(player1Card, player1Move, player2Card, player2Move);
                result.should.equal("draw");
            });
        });

        describe("player 1 DEFENSE against player 2 COUNTER", function() {
            it("should result in a draw", function(){
                let player1Card = json.homeTeam.hand[0];
                const player1Move = 'D';
                const player2Card = json.awayTeam.hand[0];
                const player2Move = 'C';
                
                const result = PlayHeadsUpTurn(player1Card, player1Move, player2Card, player2Move);
                result.should.equal("draw");
            });
        });

        describe("player 1 COUNTER against player 2 DEFENSE", function() {
            it("should result in a draw", function(){
                let player1Card = json.homeTeam.hand[0];
                const player1Move = 'C';
                const player2Card = json.awayTeam.hand[0];
                const player2Move = 'D';
                
                const result = PlayHeadsUpTurn(player1Card, player1Move, player2Card, player2Move);
                result.should.equal("draw");
            });
        });

        describe("player 1 COUNTER against player 2 COUNTER", function() {
            it("should result in a draw", function(){
                let player1Card = json.homeTeam.hand[0];
                const player1Move = 'C';
                const player2Card = json.awayTeam.hand[0];
                const player2Move = 'C';
                
                const result = PlayHeadsUpTurn(player1Card, player1Move, player2Card, player2Move);
                result.should.equal("draw");
            });
        });

        describe("player 1 POSSESSION against player 2 ATTACK", function() {
            it("should result in player 1 winning", function(){
                let player1Card = json.homeTeam.hand[0];
                const player1Move = 'P';
                const player2Card = json.awayTeam.hand[0];
                const player2Move = 'A';
                
                const result = PlayHeadsUpTurn(player1Card, player1Move, player2Card, player2Move);
                result.should.equal("player2");
            });
        });

        describe("player 1 POSSESSION against player 2 DEFENSE", function() {
            it("should result in player 1 winning", function(){
                let player1Card = json.homeTeam.hand[0];
                const player1Move = 'P';
                const player2Card = json.awayTeam.hand[0];
                const player2Move = 'D';
                
                const result = PlayHeadsUpTurn(player1Card, player1Move, player2Card, player2Move);
                result.should.equal("player1");
            });
        });

        describe("player 1 POSSESSION against player 2 COUNTER", function() {
            it("should result in player 1 winning", function(){
                let player1Card = json.homeTeam.hand[0];
                const player1Move = 'P';
                const player2Card = json.awayTeam.hand[0];
                const player2Move = 'C';
                
                const result = PlayHeadsUpTurn(player1Card, player1Move, player2Card, player2Move);
                result.should.equal("player1");
            });
        });
    });
});