var should = require("should");
var schema = require("../lib/schemas/request_play_move_schema");
var validator = require("tv4");

var match;

describe('Request Play Move Validation', function(){

    beforeEach(function(){
        var name = require.resolve('./testData/validRequestPlayMoveSchema');
        if(name) {
            delete require.cache[name];
        }
        json = require("./testData/validRequestPlayMoveSchema");
    });

    describe("request play move with missing userId", function() {
        it("should result in an error message", function(){
            json.userId = undefined;
            var result = validator.validate(json, schema);
            validator.error.message.should.equal("Missing required property: userId");
        });
    });

    describe("request play move with incorrect type userId", function() {
        it("should result in an error message", function(){
            json.userId = "1";
            var result = validator.validate(json, schema);
            validator.error.message.should.equal("invalid type: string (expected integer)");
        });
    });

    describe("request play move with missing matchId", function() {
        it("should result in an error message", function(){
            json.matchId = undefined;
            var result = validator.validate(json, schema);
            validator.error.message.should.equal("Missing required property: matchId");
        });
    });

    describe("request play move with incorrect type matchId", function() {
        it("should result in an error message", function(){
            json.matchId = "1";
            var result = validator.validate(json, schema);
            validator.error.message.should.equal("invalid type: string (expected integer)");
        });
    });

    describe("valid request play move", function() {
        it("should validate", function(){
            var result = validator.validate(json, schema);
            result.should.be.true;
        });
    });
});
