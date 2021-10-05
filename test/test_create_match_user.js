var should = require("should");
var reducers = require("../lib/schemas/graphReducers");
var joi = require("joi");
var { ValidateSquad } = require('../lib/schemas/validation')

var json;

describe('Graph Reducers', function(){

    beforeEach(function(){
        var name = require.resolve('./testData/valid-createMatchUserFirebaseQuery');
        if(name) {
            delete require.cache[name];
        }

        json = require("./testData/valid-createMatchUserFirebaseQuery").json;
    });

    describe("CreateMatchUser with 11 players of which one is a goalkeeper", function() {
        it("should return a valid user deck", function(){
            var squad = reducers.CreateMatchUser(json).cards;
            var result = ValidateSquad(squad);
            should.not.exist(result.error)
        });
    });
});