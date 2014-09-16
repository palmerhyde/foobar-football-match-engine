var should = require("should");
var schema = require("../lib/schemas/player");
var validator = require("tv4");

var playerCard;

describe('Player Validation', function(){

    beforeEach(function(){
        playerCard = {
            "_id" : 123,
            "firstName" : "John",
            "surname" : "Terry",
            "position" : "Defender",
            "passing" : 67,
            "interception" : 45
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
            playerCard.surname = undefined;
            var result = validator.validate(playerCard, schema);
            validator.error.message.should.equal("Missing required property: surname");
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
            playerCard.passing = undefined;
            var result = validator.validate(playerCard, schema);
            validator.error.message.should.equal("Missing required property: passing");
        });
    });

    describe("player with missing interception", function() {
        it("should result in an error message", function(){
            playerCard.interception = undefined;
            var result = validator.validate(playerCard, schema);
            validator.error.message.should.equal("Missing required property: interception");
        });
    });

    describe("valid player", function() {
        it("should validate", function(){
            var result = validator.validate(playerCard, schema);
            result.should.be.true;
        });
    });
});