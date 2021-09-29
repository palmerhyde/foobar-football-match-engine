var should = require("should");
var schema = require("../lib/schemas/move");
var joi = require("joi");


var json;

describe('Move Schema Validation', function(){

    beforeEach(function(){
        var name = require.resolve('./testData/valid-moves');
        if(name) {
            delete require.cache[name];
        }

        var moves = require("./testData/valid-moves");
        json = moves.ShortPassVsIntercept;
    });

    describe("move without id", function() {
        it("should result in an error message", function(){
            json.id = undefined;
            var result = schema.move.validate(json);
            result.error.message.should.equal("\"id\" is required");
        });
    });

    describe("move with incorrect type id", function() {
        it("should result in an error message", function(){
            json.id = 666;
            var result = schema.move.validate(json);
            result.error.message.should.equal("\"id\" must be a string");
        });
    });

    describe("player with missing name", function() {
        it("should result in an error message", function(){
            json.name = undefined;
            var result = schema.move.validate(json);
            result.error.message.should.equal("\"name\" is required");
        });
    });

    describe("move with missing player1Attribute", function() {
        it("should result in an error message", function(){
            json.player1Attribute = undefined;
            var result = schema.move.validate(json);
            result.error.message.should.equal("\"player1Attribute\" is required");
        });
    });

    describe("move with invalid player1Attribute", function() {
        it("should result in a not valid attribute error", function(){
            json.player1Attribute = "scrum";
            var result = schema.move.validate(json);
            result.error.message.should.equal("\"player1Attribute\" must be one of [crossing, dribbling, finishing, gkdiving, gkhandling, gkpositioning, gkreflexes, heading, interceptions, longpassing, longshots, marking, positioning, shortpassing, slidingtackle, shotpower, standingtackle, strength, vision, volleys]");
        });
    });

    describe("move with missing player2Attribute", function() {
        it("should result in an error message", function(){
            json.player2Attribute = undefined;
            var result = schema.move.validate(json);
            result.error.message.should.equal("\"player2Attribute\" is required");
        });
    });

    describe("move with invalid player2Attribute", function() {
        it("should result in a not valid attribute error", function(){
            json.player2Attribute = "scrum";
            var result = schema.move.validate(json);
            result.error.message.should.equal("\"player2Attribute\" must be one of [crossing, dribbling, finishing, gkdiving, gkhandling, gkpositioning, gkreflexes, heading, interceptions, longpassing, longshots, marking, positioning, shortpassing, slidingtackle, shotpower, standingtackle, strength, vision, volleys]");
        });
    });

    describe("valid move", function() {
        it("should validate", function(){
            var result = schema.move.validate(json);
            (result.error === null).should.be.true;
        });
    });
});
