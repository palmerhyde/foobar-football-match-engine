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
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"id\" fails because [\"id\" is required]");
        });
    });

    describe("user with incorrect type id", function() {
        it("should result in an error message", function(){
            json.id = 666;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"id\" fails because [\"id\" must be a string]");
        });
    });

    describe("user with missing firstName", function() {
        it("should result in an error message", function(){
            json.firstName = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"firstName\" fails because [\"firstName\" is required]");
        });
    });

    describe("user with missing surname", function() {
        it("should result in an error message", function(){
            json.lastName = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"lastName\" fails because [\"lastName\" is required]");
        });
    });

    describe("player with missing email", function() {
        it("should result in an error message", function(){
            json.email = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"email\" fails because [\"email\" is required]");
        });
    });

    describe("player with invalid email", function() {
        it("should result in an error message", function(){
            json.email = "fakeemail";
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"email\" fails because [\"email\" must be a valid email]");
        });
    });

    describe("user with missing squad", function() {
        it("should result in an error message", function(){
            json.squad = undefined;
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"squad\" fails because [\"squad\" is required]");
        });
    });

    describe("user with less than 11 players in squad", function() {
        it("should result in an error message", function(){
            json.squad = [];
            var result = joi.validate(json, schema.schema);
            result.error.message.should.equal("child \"squad\" fails because [\"squad\" must contain 11 items]");
        });
    });

    describe("valid user", function() {
        it("should validate", function(){
            var result = joi.validate(json, schema.schema);
            (result.error === null).should.be.true;
        });
    });
});
