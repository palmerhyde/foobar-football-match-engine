var should = require("should");
var schema = require("../lib/schemas/squad");
var joi = require("joi");

var json;
var players = require("./testData/valid-players");

describe('Squad Schema Validation', function(){

    beforeEach(function(){
        var name = require.resolve('./testData/valid-squads');
        if(name) {
            delete require.cache[name];
        }

        json = require("./testData/valid-squads").TestSquad1;
    });

    describe("a missing name", function() {
        it("should result in an error message", function(){
            json.name = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"name\" is required");
        });
    });

    describe("an incorrect type name", function() {
        it("should result in an error message", function(){
            json.name = 666;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"name\" must be a string");
        });
    });

    describe("a missing goalkeeper", function() {
        it("should result in an error message", function(){
            json.goalkeeper = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"goalkeeper\" is required");
        });
    });

    describe("a missing defenders", function() {
        it("should result in an error message", function(){
            json.defenders = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"defenders\" is required");
        });
    });

    describe("a missing midfielders", function() {
        it("should result in an error message", function(){
            json.midfielders = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"midfielders\" is required");
        });
    });

    describe("a missing attackers", function() {
        it("should result in an error message", function(){
            json.attackers = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"attackers\" is required");
        });
    });

    describe("a missing attackers", function() {
        it("should result in an error message", function(){
            json.attackers = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"attackers\" is required");
        });
    });

    describe("valid match", function() {
        it("should validate", function(){
            var result =  schema.schema().validate(json);
            (result.error === null).should.be.true;
        });
    });
});