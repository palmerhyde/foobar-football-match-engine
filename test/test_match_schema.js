var should = require("should");
var schema = require("../lib/schemas/match");
var moveSchema = require("../lib/schemas/move");
var validator = require("tv4");

var match;

describe('Match Validation', function(){

    beforeEach(function(){
        var name = require.resolve('./testData/validMatch');
        if(name) {
            delete require.cache[name];
        }
        match = require("./testData/validMatch");
        validator.addSchema("move.json", moveSchema);
    });

    describe("match with missing _id", function() {
        it("should result in an error message", function(){
            match._id = undefined;
            var result = validator.validate(match, schema);
            validator.error.message.should.equal("Missing required property: _id");
        });
    });

    describe("match with incorrect type _id", function() {
        it("should result in an error message", function(){
            match._id = "1";
            var result = validator.validate(match, schema);
            validator.error.message.should.equal("invalid type: string (expected integer)");
        });
    });

    describe("match with missing turn", function() {
        it("should result in an error message", function(){
            match.turn = undefined;
            var result = validator.validate(match, schema);
            validator.error.message.should.equal("Missing required property: turn");
        });
    });

    describe("match with incorrect type turn", function() {
        it("should result in an error message", function(){
            match.turn = "1";
            var result = validator.validate(match, schema);
            validator.error.message.should.equal("invalid type: string (expected integer)");
        });
    });

    describe("match with missing currentTurnUserId", function() {
        it("should result in an error message", function(){
            match.currentTurnUserId = undefined;
            var result = validator.validate(match, schema);
            validator.error.message.should.equal("Missing required property: currentTurnUserId");
        });
    });

    describe("match with incorrect type currentTurnUserId", function() {
        it("should result in an error message", function(){
            match.currentTurnUserId = "1";
            var result = validator.validate(match, schema);
            validator.error.message.should.equal("invalid type: string (expected integer)");
        });
    });

    describe("match with missing moves", function() {
        it("should result in an error message", function(){
            match.moves = undefined;
            var result = validator.validate(match, schema);
            validator.error.message.should.equal("Missing required property: moves");
        });
    });

    describe("match with incorrect type moves", function() {
        it("should result in an error message", function(){
            match.moves = "Hello world";
            var result = validator.validate(match, schema);
            validator.error.message.should.equal("invalid type: string (expected array)");
        });
    });

    describe("valid match", function() {
        it("should validate", function(){
            var result = validator.validate(match, schema);
            result.should.be.true;
        });
    });
});