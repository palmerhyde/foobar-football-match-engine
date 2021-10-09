var should = require("should");
var schema = require("../lib/schemas/match");

var json;

describe('Match Validation', function(){

    beforeEach(function(){
        var name = require.resolve('./testData/valid-matches');
        if(name) {
            delete require.cache[name];
        }

        var matches = require("./testData/valid-matches");
        json = matches.ValidMatch;
    });


    describe("user with missing state", function() {
        it("should result in an error message", function(){
            json.state = undefined;
            var result = schema.match.validate(json);
            result.error.message.should.equal("\"state\" is required");
        });
    });

    describe("valid match", function() {
        it("should validate", function(){
            var result = schema.match.validate(json);
            should.not.exist(result.error)
        });
    });
});