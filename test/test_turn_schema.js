var should = require("should");
var { schema } = require("../lib/schemas/turn");
var joi = require("joi");

var json;

describe('Turn Schema Validation', function(){

    beforeEach(function(){
        var name = require.resolve('./testData/valid-turns');
        if(name) {
            delete require.cache[name];
        }

        var turns = require("./testData/valid-turns");
        json = turns.turn1;
    });

    describe("turn without matchId", function() {
        it("should result in an error message", function(){
            json.matchId = undefined;
            var result = schema.validate(json);
            result.error.message.should.equal("\"matchId\" is required");
        });
    });

    describe("valid turn", function() {
        it("should validate", function() {
            var result = schema.validate(json);
            (result.error === undefined).should.equal(true)
        });
    });
});
