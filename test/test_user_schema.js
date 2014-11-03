var should = require("should");
var schema = require("../lib/schemas/user");
var validator = require("tv4");

var json;

describe('User Validation', function(){

    beforeEach(function(){
        var name = require.resolve('./testData/validUser');
        if(name) {
            delete require.cache[name];
        }
        json = require("./testData/validUser");
    });

    describe("user with missing _id", function() {
        it("should result in an error message", function(){
            json._id = undefined;
            var result = validator.validate(json, schema);
            validator.error.message.should.equal("Missing required property: _id");
        });
    });

    describe("user with incorrect type _id", function() {
        it("should result in an error message", function(){
            json._id = "hello world";
            var result = validator.validate(json, schema);
            validator.error.message.should.equal("invalid type: string (expected integer)");
        });
    });

    describe("user with missing firstName", function() {
        it("should result in an error message", function(){
            json.firstName = undefined;
            var result = validator.validate(json, schema);
            validator.error.message.should.equal("Missing required property: firstName");
        });
    });

    describe("user with missing surname", function() {
        it("should result in an error message", function(){
            json.surname = undefined;
            var result = validator.validate(json, schema);
            validator.error.message.should.equal("Missing required property: surname");
        });
    });

    // TODO: validate a valid email address in the schema test
    describe("player with missing email", function() {
        it("should result in an error message", function(){
            json.email = undefined;
            var result = validator.validate(json, schema);
            validator.error.message.should.equal("Missing required property: email");
        });
    });

    describe("valid user", function() {
        it("should validate", function(){
            var result = validator.validate(json, schema);
            result.should.be.true;
        });
    });
});
