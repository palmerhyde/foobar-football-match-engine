var should = require("should");
var schema = require("../lib/schemas/squad");
var joi = require("joi");
var { ValidateSquad } = require('../lib/schemas/validation')

var json;

describe('Squad Schema Validation', function(){

    beforeEach(function(){
        var name = require.resolve('./testData/valid-squads');
        if(name) {
            delete require.cache[name];
        }

        json = require("./testData/valid-squads").TestSquad1;
    });

    describe("a squad with less than 11 players", function() {
        it("should result in an error message", function(){
            json.length = 10
            var result = ValidateSquad(json)
            result.error.message.should.equal("\"value\" must contain 11 items");
        });
    });

    describe("a squad with more than 11 players", function() {
        it("should result in an error message", function(){
            json.push({
                'id' : '666',
                'assist' : false,
                'goalScorer' : false,
                'name' : 'BilliBoo',
                'pictureUrl' : 'https://www.example.com',
                'position' : 'Goalkeeper',
                'primaryMove' : 'D',
                'score' : 66.666,
                'secondaryMove' : 'P',
                'slug' : 'slug',
                'teamScore' : '50.123'
            },)
            var result = ValidateSquad(json)
            result.error.message.should.equal("\"value\" must contain 11 items");
        });
    });

    describe("a squad with more than 1 Goalkeeper", function() {
        it("should result in an error message", function(){
            json[1].position = 'Goalkeeper'
            var result = ValidateSquad(json)
            result.error.message.should.equal("Squad cannot contain more than 1 Goalkeeper");
        });
    });

    describe("a valid sqaud", function() {
        it("should validate", function(){
            var result = ValidateSquad(json)
            should.not.exist(result.error)
        });
    });
});