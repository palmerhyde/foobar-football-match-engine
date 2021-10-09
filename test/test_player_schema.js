var should = require("should");
var schema = require("../lib/schemas/player");

var json;

describe('Player Validation', function(){

    beforeEach(function(){
        var name = require.resolve('./testData/valid-players');
        if(name) {
            delete require.cache[name];
        }

        json = require("./testData/valid-players").ValidPlayer1;
    });

    describe("player without id", function() {
        it("should result in an error message", function(){
            json.id = undefined;
            var result = schema.schema().validate(json, schema.schema);
            result.error.message.should.equal("\"id\" is required");
        });
    });

    describe("player with incorrect type id", function() {
        it("should result in an error message", function(){
            json.id = 666;
            var result = schema.schema().validate(json, schema.schema);
            result.error.message.should.equal("\"id\" must be a string");
        });
    });

    describe("player with missing name", function() {
        it("should result in an error message", function(){
            json.name = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"name\" is required");
        });
    });

    describe("player with missing position", function() {
        it("should result in an error message", function(){
            json.position = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"position\" is required");
        });
    });

    describe("player with invalid position", function() {
        it("should result in a not valid position error", function(){
            json.position = "scrum";
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"position\" must be one of [Goalkeeper, Defender, Midfielder, Forward]");
        });
    });

    describe("player with undefined assist", function() {
        it("should result in a missing assist error", function(){
            json.assist = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"assist\" is required");
        });
    });

    describe("player with undefined goalScorer", function() {
        it("should result in a missing goalScorer error", function(){
            json.goalScorer = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"goalScorer\" is required");
        });
    });

    describe("player with undefined pictureUrl", function() {
        it("should result in a missing pictureUrl error", function(){
            json.pictureUrl = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"pictureUrl\" is required");
        });
    });

    describe("player with undefined primaryMove", function() {
        it("should result in a missing primaryMove error", function(){
            json.primaryMove = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"primaryMove\" is required");
        });
    });

    describe("player with invalid primaryMove", function() {
        it("should result in a not valid primaryMove error", function(){
            json.primaryMove = "scrum";
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"primaryMove\" must be one of [A, P, D, C]");
        });
    });

    describe("player with undefined secondaryMove", function() {
        it("should result in a missing secondaryMove error", function(){
            json.secondaryMove = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"secondaryMove\" is required");
        });
    });

    describe("player with invalid secondaryMove", function() {
        it("should result in a not valid secondaryMove error", function(){
            json.secondaryMove = "scrum";
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"secondaryMove\" must be one of [A, P, D, C]");
        });
    });

    describe("player with undefined slug", function() {
        it("should result in a missing slug error", function(){
            json.slug = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"slug\" is required");
        });
    });

    describe("player with undefined score", function() {
        it("should result in a missing score error", function(){
            json.score = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"score\" is required");
        });
    });

    describe("player with  score < 0", function() {
        it("should result in a out of range score error", function(){
            json.score = -666.6;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"score\" must be greater than or equal to 0");
        });
    });

    describe("player with  score > 100", function() {
        it("should result in a out of range score error", function(){
            json.score = 666.6;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"score\" must be less than or equal to 100");
        });
    });

    describe("player with undefined teamScore", function() {
        it("should result in a missing teamScore error", function(){
            json.teamScore = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"teamScore\" is required");
        });
    });

    describe("player with  teamScore < 0", function() {
        it("should result in a out of range teamScore error", function(){
            json.teamScore = -666.6;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"teamScore\" must be greater than or equal to 0");
        });
    });

    describe("player with  teamScore > 100", function() {
        it("should result in a out of range teamScore error", function(){
            json.teamScore = 666.6;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"teamScore\" must be less than or equal to 100");
        });
    });

    describe("player with unknown attribute", function() {
        it("should result in an error message", function(){
            json.unknown = "foobar";
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"unknown\" is not allowed");
        });
    });

    describe("valid player", function() {
        it("should validate", function(){
            var result = schema.schema().validate(json);
            (result.error === null).should.be.true;
        });
    });
});