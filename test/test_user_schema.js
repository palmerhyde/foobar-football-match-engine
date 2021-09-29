var should = require("should");
var schema = require("../lib/schemas/user");
var joi = require("joi");

var json;


describe('User Validation', function(){

    beforeEach(function(){
        var name = require.resolve('./testData/valid-users');
        if(name) {
            delete require.cache[name];
        }
        json = require("./testData/valid-users").LiamMolloy;
    });

    describe("user with missing id", function() {
        it("should result in an error message", function(){
            json.id = undefined;
            var result = schema.schema.validate(json);
            result.error.message.should.equal("\"id\" is required");
        });
    });

    describe("user with incorrect type id", function() {
        it("should result in an error message", function(){
            json.id = 666;
            var result = schema.schema.validate(json);
            result.error.message.should.equal("\"id\" must be a string");
        });
    });

    describe("user with missing firstName", function() {
        it("should result in an error message", function(){
            json.firstName = undefined;
            var result = schema.schema.validate(json);
            result.error.message.should.equal("\"firstName\" is required");
        });
    });

    describe("user with missing surname", function() {
        it("should result in an error message", function(){
            json.lastName = undefined;
            var result = schema.schema.validate(json);
            result.error.message.should.equal("\"lastName\" is required");
        });
    });

    describe("player with missing email", function() {
        it("should result in an error message", function(){
            json.email = undefined;
            var result = schema.schema.validate(json);
            result.error.message.should.equal("\"email\" is required");
        });
    });

    describe("player with invalid email", function() {
        it("should result in an error message", function(){
            json.email = "fakeemail";
            var result = schema.schema.validate(json);
            result.error.message.should.equal("\"email\" must be a valid email");
        });
    });

    describe("user with missing squad", function() {
        it("should result in an error message", function(){
            json.squad = undefined;
            var result = schema.schema.validate(json);
            result.error.message.should.equal("\"squad\" is required");
        });
    });

    describe("valid user", function() {
        it("should validate", function(){
            var result = schema.schema.validate(json);
            (result.error === null).should.be.true;
        });
    });
});
