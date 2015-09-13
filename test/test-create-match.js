var should = require("should");
var match = require("../lib/match/create-match");
var joi = require("joi");

var playerCard1, playerCard2, moveCard;

describe('Match', function(){

    beforeEach(function(){
    });

    describe("createMatch", function() {
        it("should return a valid result", function(){
            var result = match.CreateMatch();
            console.log(result.chanceCount);
            console.log(JSON.stringify(result.chances));
        });
    });
});