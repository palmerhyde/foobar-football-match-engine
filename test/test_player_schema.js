var should = require("should");
var schema = require("../lib/schemas/player");
var validator = require("tv4");

var playerCard;

describe('Player Validation', function(){

    // TODO: get valid player card
    beforeEach(function(){
        playerCard = {
            "_id" : 123,
            "firstName" : "John",
            "lastName" : "Terry",
            "position" : "Defender",
            "crossing" : 10,
            "dribbling" : 10,
            "finishing" : 10,
            "gkdiving" : 10,
            "gkhandling" :10,
            "gkpositioning" : 10,
            "gkreflexes" : 10,
            "heading" : 10,
            "interceptions" : 45,
            "longpassing" : 10,
            "longshots" : 10,
            "marking" :10,
            "positioning" : 10,
            "shortpassing" : 67,
            "slidingtackle" : 10,
            "shotpower" : 10,
            "standingtackle" : 10,
            "strength": 10,
            "vision" : 10,
            "volleys" : 10
        };
    });

    describe("player with missing _id", function() {
        it("should result in an error message", function(){
            playerCard._id = undefined;
            var result = validator.validate(playerCard, schema);
            validator.error.message.should.equal("Missing required property: _id");
        });
    });

    describe("player with incorrect type _id", function() {
        it("should result in an error message", function(){
            playerCard._id = "hello world";
            var result = validator.validate(playerCard, schema);
            validator.error.message.should.equal("invalid type: string (expected integer)");
        });
    });

    describe("player with missing firstName", function() {
        it("should result in an error message", function(){
            playerCard.firstName = undefined;
            var result = validator.validate(playerCard, schema);
            validator.error.message.should.equal("Missing required property: firstName");
        });
    });

    describe("player with missing surname", function() {
        it("should result in an error message", function(){
            playerCard.lastName = undefined;
            var result = validator.validate(playerCard, schema);
            validator.error.message.should.equal("Missing required property: lastName");
        });
    });

    describe("player with missing position", function() {
        it("should result in an error message", function(){
            playerCard.position = undefined;
            var result = validator.validate(playerCard, schema);
            validator.error.message.should.equal("Missing required property: position");
        });
    });

    describe("player with invalid position", function() {
        it("should result in a not valid position error", function(){
            playerCard.position = "RunningBack";
            var result = validator.validate(playerCard, schema);
            validator.error.message.should.equal("No enum match for: \"RunningBack\"");
        });
    });

    describe("player with missing passing", function() {
        it("should result in an error message", function(){
            playerCard.shortpassing = undefined;
            var result = validator.validate(playerCard, schema);
            validator.error.message.should.equal("Missing required property: shortpassing");
        });
    });

    describe("player with missing interception", function() {
        it("should result in an error message", function(){
            playerCard.interceptions = undefined;
            var result = validator.validate(playerCard, schema);
            validator.error.message.should.equal("Missing required property: interceptions");
        });
    });

    describe("valid player", function() {
        it("should validate", function(){
            var result = validator.validate(playerCard, schema);
            result.should.be.true;
        });
    });
});