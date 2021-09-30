var should = require("should");
var move = require("../lib/moves/move");
var joi = require("joi");

var playerCard1, playerCard2, moveCard;

describe('Turn', function(){

    beforeEach(function(){
        var module1 = require.resolve('./testData/valid-turns');
        if(module1) {
            delete require.cache[module1];
        }

        var turns = require("./testData/valid-turns");
        var turn = turns.turn1;
    });
});