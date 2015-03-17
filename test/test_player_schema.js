var should = require("should");
var schema = require("../lib/schemas/player");
var joi = require("joi");

var json;

describe('Player Validation', function(){

    beforeEach(function(){
        var name = require.resolve('./testData/valid-players');
        if(name) {
            delete require.cache[name];
        }

        json = require("./testData/valid-players").GeorgeBest;
    });

    describe("player without id", function() {
        it("should result in an error message", function(){
            json.id = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"id\" fails because [\"id\" is required]");
        });
    });

    describe("player with incorrect type id", function() {
        it("should result in an error message", function(){
            json.id = 666;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"id\" fails because [\"id\" must be a string]");
        });
    });

    describe("player with missing firstName", function() {
        it("should result in an error message", function(){
            json.firstName = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"firstName\" fails because [\"firstName\" is required]");
        });
    });

    describe("player with missing lastName", function() {
        it("should result in an error message", function(){
            json.lastName = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"lastName\" fails because [\"lastName\" is required]");
        });
    });

    describe("player with missing position", function() {
        it("should result in an error message", function(){
            json.position = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"position\" fails because [\"position\" is required]");
        });
    });

    describe("player with invalid position", function() {
        it("should result in a not valid position error", function(){
            json.position = "scrum";
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"position\" fails because [\"position\" must be one of [Goalkeeper, Defender, Midfielder, Attacker]]");
        });
    });

    describe("player with missing shortpassing", function() {
        it("should result in an error message", function(){
            json.shortpassing = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"shortpassing\" fails because [\"shortpassing\" is required]");
        });
    });

    describe("player with missing interception", function() {
        it("should result in an error message", function(){
            json.interceptions = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"interceptions\" fails because [\"interceptions\" is required]");
        });
    });

    describe("player with missing crossing", function() {
        it("should result in an error message", function(){
            json.crossing = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"crossing\" fails because [\"crossing\" is required]");
        });
    });

    describe("player with missing dribbling", function() {
        it("should result in an error message", function(){
            json.dribbling = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"dribbling\" fails because [\"dribbling\" is required]");
        });
    });

    describe("player with missing finishing", function() {
        it("should result in an error message", function(){
            json.finishing = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"finishing\" fails because [\"finishing\" is required]");
        });
    });

    describe("player with missing gkdiving", function() {
        it("should result in an error message", function(){
            json.gkdiving = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"gkdiving\" fails because [\"gkdiving\" is required]");
        });
    });

    describe("player with missing gkhandling", function() {
        it("should result in an error message", function(){
            json.gkhandling = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"gkhandling\" fails because [\"gkhandling\" is required]");
        });
    });

    describe("player with missing gkpositioning", function() {
        it("should result in an error message", function(){
            json.gkpositioning = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"gkpositioning\" fails because [\"gkpositioning\" is required]");
        });
    });

    describe("player with missing gkreflexes", function() {
        it("should result in an error message", function(){
            json.gkreflexes = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"gkreflexes\" fails because [\"gkreflexes\" is required]");
        });
    });

    describe("player with missing heading", function() {
        it("should result in an error message", function(){
            json.heading = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"heading\" fails because [\"heading\" is required]");
        });
    });

    describe("player with missing longpassing", function() {
        it("should result in an error message", function(){
            json.longpassing = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"longpassing\" fails because [\"longpassing\" is required]");
        });
    });

    describe("player with missing longshots", function() {
        it("should result in an error message", function(){
            json.longshots = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"longshots\" fails because [\"longshots\" is required]");
        });
    });

    describe("player with missing marking", function() {
        it("should result in an error message", function(){
            json.marking = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"marking\" fails because [\"marking\" is required]");
        });
    });

    describe("player with missing positioning", function() {
        it("should result in an error message", function(){
            json.positioning = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"positioning\" fails because [\"positioning\" is required]");
        });
    });

    describe("player with missing slidingtackle", function() {
        it("should result in an error message", function(){
            json.slidingtackle = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"slidingtackle\" fails because [\"slidingtackle\" is required]");
        });
    });

    describe("player with missing shotpower", function() {
        it("should result in an error message", function(){
            json.shotpower = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"shotpower\" fails because [\"shotpower\" is required]");
        });
    });

    describe("player with missing standingtackle", function() {
        it("should result in an error message", function(){
            json.standingtackle = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"standingtackle\" fails because [\"standingtackle\" is required]");
        });
    });

    describe("player with missing strength", function() {
        it("should result in an error message", function(){
            json.strength = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"strength\" fails because [\"strength\" is required]");
        });
    });

    describe("player with missing vision", function() {
        it("should result in an error message", function(){
            json.vision = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"vision\" fails because [\"vision\" is required]");
        });
    });

    describe("player with missing volleys", function() {
        it("should result in an error message", function(){
            json.volleys = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"volleys\" fails because [\"volleys\" is required]");
        });
    });

    describe("player with unknown attribute", function() {
        it("should result in an error message", function(){
            json.unknown = "foobar";
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("\"unknown\" is not allowed");
        });
    });

    describe("valid player", function() {
        it("should validate", function(){
            var result = joi.validate(json, schema.schema);
            (result.error === null).should.be.true;
        });
    });
});