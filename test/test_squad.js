var should = require("should");
var move = require("../lib/moves/move");
var { DetermineFormation } = require("../lib/schemas/graphReducers");


describe('Determine Formation', function(){

    beforeEach(function(){
    });

    describe(">=4 Defender, >=4 Midfielder and >=2 Forward ", function() {
        it("should result in a 4-4-2 formation", function(){
            const positionCounts = {
                'Defender' : 10,
                'Midfielder' : 10,
                'Forward' : 10
            };

            const formation = DetermineFormation(positionCounts);
            formation.Defender.should.equal(4);
            formation.Midfielder.should.equal(4);
            formation.Forward.should.equal(2);
        });
    });

    describe("3 Defender, >=5 Midfielder and >=2 Forward ", function() {
        it("should result in a 3-5-2 formation", function(){
            const positionCounts = {
                'Defender' : 3,
                'Midfielder' : 10,
                'Forward' : 10
            };

            const formation = DetermineFormation(positionCounts);
            formation.Defender.should.equal(3);
            formation.Midfielder.should.equal(5);
            formation.Forward.should.equal(2);
        });
    });

    describe("3 Defender, 4 Midfielder and >=3 Forward ", function() {
        it("should result in a 3-4-3 formation", function(){
            const positionCounts = {
                'Defender' : 3,
                'Midfielder' : 4,
                'Forward' : 3
            };

            const formation = DetermineFormation(positionCounts);
            formation.Defender.should.equal(3);
            formation.Midfielder.should.equal(4);
            formation.Forward.should.equal(3);
        });
    });

    describe("3 Defender, 3 Midfielder and >=4 Forward ", function() {
        it("should result in a 3-3-4 formation", function(){
            const positionCounts = {
                'Defender' : 3,
                'Midfielder' : 3,
                'Forward' : 4
            };

            const formation = DetermineFormation(positionCounts);
            formation.Defender.should.equal(3);
            formation.Midfielder.should.equal(3);
            formation.Forward.should.equal(4);
        });
    });

    describe("3 Defender, 2 Midfielder and >=5 Forward ", function() {
        it("should result in a 3-2-5 formation", function(){
            const positionCounts = {
                'Defender' : 3,
                'Midfielder' : 2,
                'Forward' : 10
            };

            const formation = DetermineFormation(positionCounts);
            formation.Defender.should.equal(3);
            formation.Midfielder.should.equal(2);
            formation.Forward.should.equal(5);
        });
    });

    describe("3 Defender, 1 Midfielder and >=6 Forward ", function() {
        it("should result in a 3-1-6 formation", function(){
            const positionCounts = {
                'Defender' : 3,
                'Midfielder' : 1,
                'Forward' : 10
            };

            const formation = DetermineFormation(positionCounts);
            formation.Defender.should.equal(3);
            formation.Midfielder.should.equal(1);
            formation.Forward.should.equal(6);
        });
    });

    describe("2 Defender, >=4 Midfielder and >=4 Forward ", function() {
        it("should result in a 2-4-4 formation", function(){
            const positionCounts = {
                'Defender' : 2,
                'Midfielder' : 10,
                'Forward' : 10
            };

            const formation = DetermineFormation(positionCounts);
            formation.Defender.should.equal(2);
            formation.Midfielder.should.equal(4);
            formation.Forward.should.equal(4);
        });
    });

    describe("2 Defender, 3 Midfielder and >=5 Forward ", function() {
        it("should result in a 2-3-5 formation", function(){
            const positionCounts = {
                'Defender' : 2,
                'Midfielder' : 3,
                'Forward' : 10
            };

            const formation = DetermineFormation(positionCounts);
            formation.Defender.should.equal(2);
            formation.Midfielder.should.equal(3);
            formation.Forward.should.equal(5);
        });
    });

    describe("2 Defender, 2 Midfielder and >=6 Forward ", function() {
        it("should result in a 2-2-6 formation", function(){
            const positionCounts = {
                'Defender' : 2,
                'Midfielder' : 2,
                'Forward' : 10
            };

            const formation = DetermineFormation(positionCounts);
            formation.Defender.should.equal(2);
            formation.Midfielder.should.equal(2);
            formation.Forward.should.equal(6);
        });
    });

    describe("2 Defender, 1 Midfielder and >=7 Forward ", function() {
        it("should result in a 2-1-7 formation", function(){
            const positionCounts = {
                'Defender' : 2,
                'Midfielder' : 1,
                'Forward' : 10
            };

            const formation = DetermineFormation(positionCounts);
            formation.Defender.should.equal(2);
            formation.Midfielder.should.equal(1);
            formation.Forward.should.equal(7);
        });
    });

    describe("1 Defender, >=5 Midfielder and >=4 Forward ", function() {
        it("should result in a 1-5-4 formation", function(){
            const positionCounts = {
                'Defender' : 1,
                'Midfielder' : 10,
                'Forward' : 10
            };

            const formation = DetermineFormation(positionCounts);
            formation.Defender.should.equal(1);
            formation.Midfielder.should.equal(5);
            formation.Forward.should.equal(4);
        });
    });

    describe("1 Defender, 4 Midfielder and >=5 Forward ", function() {
        it("should result in a 1-4-5 formation", function(){
            const positionCounts = {
                'Defender' : 1,
                'Midfielder' : 4,
                'Forward' : 10
            };

            const formation = DetermineFormation(positionCounts);
            formation.Defender.should.equal(1);
            formation.Midfielder.should.equal(4);
            formation.Forward.should.equal(5);
        });
    });

    describe("1 Defender, 3 Midfielder and >=6 Forward ", function() {
        it("should result in a 1-3-6 formation", function(){
            const positionCounts = {
                'Defender' : 1,
                'Midfielder' : 3,
                'Forward' : 10
            };

            const formation = DetermineFormation(positionCounts);
            formation.Defender.should.equal(1);
            formation.Midfielder.should.equal(3);
            formation.Forward.should.equal(6);
        });
    });

    describe("4 Defender, 2 Midfielder and >=4 Forward ", function() {
        it("should result in a 4-2-4 formation", function(){
            const positionCounts = {
                'Defender' : 4,
                'Midfielder' : 2,
                'Forward' : 4
            };

            const formation = DetermineFormation(positionCounts);
            formation.Defender.should.equal(4);
            formation.Midfielder.should.equal(2);
            formation.Forward.should.equal(4);
        });
    });

    describe("4 Defender, 1 Midfielder and >=5 Forward ", function() {
        it("should result in a 4-1-5 formation", function(){
            const positionCounts = {
                'Defender' : 4,
                'Midfielder' : 1,
                'Forward' : 5
            };

            const formation = DetermineFormation(positionCounts);
            formation.Defender.should.equal(4);
            formation.Midfielder.should.equal(1);
            formation.Forward.should.equal(5);
        });
    });

    describe("4 Defender, 5 Midfielder and >=1 Forward ", function() {
        it("should result in a 4-5-1 formation", function(){
            const positionCounts = {
                'Defender' : 4,
                'Midfielder' : 5,
                'Forward' : 1
            };

            const formation = DetermineFormation(positionCounts);
            formation.Defender.should.equal(4);
            formation.Midfielder.should.equal(5);
            formation.Forward.should.equal(1);
        });
    });

    
});