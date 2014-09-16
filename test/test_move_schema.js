var should = require("should");
var schema = require("../lib/schemas/move");
var validator = require("tv4");

var moveCard;

describe('Move Validation', function(){

    beforeEach(function(){
        moveCard = {
            "_id" : 123,
            "name" : "short pass",
            "player1Attribute" : "Passing",
            "player2Attribute" : "Interception"
        };
    });

    describe("move with missing _id", function() {
        it("should result in an error message", function(){
            moveCard._id = undefined;
            var result = validator.validate(moveCard, schema);
            validator.error.message.should.equal("Missing required property: _id");
        });
    });

    describe("move with incorrect type _id", function() {
        it("should result in an error message", function(){
            moveCard._id = "hello world";
            var result = validator.validate(moveCard, schema);
            validator.error.message.should.equal("invalid type: string (expected integer)");
        });
    });

    describe("move with missing name", function() {
        it("should result in an error message", function(){
            moveCard.name = undefined;
            var result = validator.validate(moveCard, schema);
            validator.error.message.should.equal("Missing required property: name");
        });
    });

    describe("move with missing player1Attribute", function() {
        it("should result in an error message", function(){
            moveCard.player1Attribute = undefined;
            var result = validator.validate(moveCard, schema);
            validator.error.message.should.equal("Missing required property: player1Attribute");
        });
    });

    describe("move with invalid player1Attribute", function() {
        it("should result in a not valid attribute error", function(){
            moveCard.player1Attribute = "Fishing";
            var result = validator.validate(moveCard, schema);
            validator.error.message.should.equal("No enum match for: \"Fishing\"");
        });
    });

    describe("move with missing player2Attribute", function() {
        it("should result in an error message", function(){
            moveCard.player2Attribute = undefined;
            var result = validator.validate(moveCard, schema);
            validator.error.message.should.equal("Missing required property: player2Attribute");
        });
    });

    describe("move with invalid player2Attribute", function() {
        it("should result in a not valid attribute error", function(){
            moveCard.player2Attribute = "Fishing";
            var result = validator.validate(moveCard, schema);
            validator.error.message.should.equal("No enum match for: \"Fishing\"");
        });
    });

    describe("valid move", function() {
        it("should validate", function(){
            var result = validator.validate(moveCard, schema);
            result.should.be.true;
        });
    });
});
