var should = require("should");
var schema = require("../lib/schemas/match");
var validator = require("tv4");

var match;

describe('Match Validation', function(){

    beforeEach(function(){
        match = {
            "_id" : 123,
            "turn" : 1
        };
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

    describe("valid match", function() {
        it("should validate", function(){
            var result = validator.validate(match, schema);
            result.should.be.true;
        });
    });
});