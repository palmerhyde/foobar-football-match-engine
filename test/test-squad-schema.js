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

    describe("a missing pitch1", function() {
        it("should result in an error message", function(){
            json.pitch1 = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"pitch1\" is required");
        });
    });

    describe("a missing pitch2", function() {
        it("should result in an error message", function(){
            json.pitch2 = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"pitch2\" is required");
        });
    });

    describe("a missing pitch3", function() {
        it("should result in an error message", function(){
            json.pitch3 = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"pitch3\" is required");
        });
    });

    describe("a missing pitch4", function() {
        it("should result in an error message", function(){
            json.pitch4 = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"pitch4\" is required");
        });
    });

    describe("a missing pitch5", function() {
        it("should result in an error message", function(){
            json.pitch5 = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"pitch5\" is required");
        });
    });

    describe("a missing substitutions", function() {
        it("should result in an error message", function(){
            json.substitutions = undefined;
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"substitutions\" is required");
        });
    });

    describe("has greater than 3 subs", function() {
        it("should result in an error message", function(){
            json.substitutions.push(players.Boateng_183907);
            var result = schema.schema().validate(json);
            result.error.message.should.equal("\"substitutions\" must contain less than or equal to 3 items");
        });
    });

    describe("valid match", function() {
        it("should validate", function(){
            var result =  schema.schema().validate(json);
            (result.error === null).should.be.true;
        });
    });
});