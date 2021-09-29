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

        json = require("./testData/valid-players").Beckenbauer_168473;
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

    describe("player with missing firstName", function() {
        it("should result in an error message", function(){
            json.firstName = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"firstName\" is required");
        });
    });

    describe("player with missing lastName", function() {
        it("should result in an error message", function(){
            json.lastName = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"lastName\" is required");
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
            result.error.message.should.equal("\"position\" must be one of [Goalkeeper, Defender, Midfielder, Attacker, GK, LB, CB, RB, LDM, CDM, RDM, LM, CM, RM, LAM, CAM, RAM, LW, RW, ST, CF]");
        });
    });

    describe("player with missing shortpassing", function() {
        it("should result in an error message", function(){
            json.shortpassing = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"shortpassing\" is required");
        });
    });

    describe("player with missing interception", function() {
        it("should result in an error message", function(){
            json.interceptions = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"interceptions\" is required");
        });
    });

    describe("player with missing crossing", function() {
        it("should result in an error message", function(){
            json.crossing = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"crossing\" is required");
        });
    });

    describe("player with missing dribbling", function() {
        it("should result in an error message", function(){
            json.dribbling = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"dribbling\" is required");
        });
    });

    describe("player with missing finishing", function() {
        it("should result in an error message", function(){
            json.finishing = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"finishing\" is required");
        });
    });

    describe("player with missing gkdiving", function() {
        it("should result in an error message", function(){
            json.gkdiving = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"gkdiving\" is required");
        });
    });

    describe("player with missing gkhandling", function() {
        it("should result in an error message", function(){
            json.gkhandling = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"gkhandling\" is required");
        });
    });

    describe("player with missing gkpositioning", function() {
        it("should result in an error message", function(){
            json.gkpositioning = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"gkpositioning\" is required");
        });
    });

    describe("player with missing gkreflexes", function() {
        it("should result in an error message", function(){
            json.gkreflexes = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"gkreflexes\" is required");
        });
    });

    describe("player with missing heading", function() {
        it("should result in an error message", function(){
            json.heading = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"heading\" is required");
        });
    });

    describe("player with missing longpassing", function() {
        it("should result in an error message", function(){
            json.longpassing = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"longpassing\" is required");
        });
    });

    describe("player with missing longshots", function() {
        it("should result in an error message", function(){
            json.longshots = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"longshots\" is required");
        });
    });

    describe("player with missing marking", function() {
        it("should result in an error message", function(){
            json.marking = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"marking\" is required");
        });
    });

    describe("player with missing positioning", function() {
        it("should result in an error message", function(){
            json.positioning = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"positioning\" is required");
        });
    });

    describe("player with missing slidingtackle", function() {
        it("should result in an error message", function(){
            json.slidingtackle = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"slidingtackle\" is required");
        });
    });

    describe("player with missing shotpower", function() {
        it("should result in an error message", function(){
            json.shotpower = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"shotpower\" is required");
        });
    });

    describe("player with missing standingtackle", function() {
        it("should result in an error message", function(){
            json.standingtackle = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"standingtackle\" is required");
        });
    });

    describe("player with missing strength", function() {
        it("should result in an error message", function(){
            json.strength = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"strength\" is required");
        });
    });

    describe("player with missing vision", function() {
        it("should result in an error message", function(){
            json.vision = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"vision\" is required");
        });
    });

    describe("player with missing volleys", function() {
        it("should result in an error message", function(){
            json.volleys = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"volleys\" is required");
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