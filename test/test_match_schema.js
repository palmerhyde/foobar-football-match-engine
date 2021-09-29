var should = require("should");
var schema = require("../lib/schemas/match");
var moveSchema = require("../lib/schemas/move");
var userSchema = require("../lib/schemas/user");
var joi = require("joi");

var json;

describe('Match Validation', function(){

    beforeEach(function(){
        var name = require.resolve('./testData/valid-matches');
        if(name) {
            delete require.cache[name];
        }

        var matches = require("./testData/valid-matches");
        json = matches.ChelseaVsArsenal;
    });

    describe("user with missing id", function() {
        it("should result in an error message", function(){
            json.id = undefined;
            var result = schema.match.validate(json);
            result.error.message.should.equal("\"id\" is required");
        });
    });

    describe("user with incorrect type id", function() {
        it("should result in an error message", function(){
            json.id = 666;
            var result = schema.match.validate(json);
            result.error.message.should.equal("\"id\" must be a string");
        });
    });

    describe("user with missing turn", function() {
        it("should result in an error message", function(){
            json.turn = undefined;
            var result = schema.match.validate(json);
            result.error.message.should.equal("\"turn\" is required");
        });
    });

    describe("user with incorrect type turn", function() {
        it("should result in an error message", function(){
            json.turn = "six";
            var result = schema.match.validate(json);
            result.error.message.should.equal("\"turn\" must be a number");
        });
    });

    describe("user with missing currentTurnUserId", function() {
        it("should result in an error message", function(){
            json.currentTurnUserId = undefined;
            var result = schema.match.validate(json);
            result.error.message.should.equal("\"currentTurnUserId\" is required");
        });
    });

    describe("user with incorrect type currentTurnUserId", function() {
        it("should result in an error message", function(){
            json.currentTurnUserId = 666;
            var result = schema.match.validate(json);
            result.error.message.should.equal("\"currentTurnUserId\" must be a string");
        });
    });

    describe("match with missing moves", function() {
        it("should result in an error message", function(){
            json.moves = undefined;
            var result = schema.match.validate(json);
            result.error.message.should.equal("\"moves\" is required");
        });
    });

    describe("valid match", function() {
        it("should validate", function(){
            var result = schema.match.validate(json);
            (result.error === null).should.be.true;
        });
    });
});