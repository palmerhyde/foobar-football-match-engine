var should = require('should');
var { RandomStrategy, PlayHeadsUpTurn, CheckForFinalWhistle, PlayTurn, DetermineNextPhaseAfterHeadsUp } = require('../lib/game/move');

var json;

describe('Move', function(){

    beforeEach(function(){
        var name = require.resolve('./testData/valid-matches');
        if(name) {
            delete require.cache[name];
        }

        var matches = require('./testData/valid-matches');
        json = matches.ValidMatch;
    });

    describe('Opponent Strategy', function() {

        describe('random away strategy', function() {
            it('should result in a valid card and move selection', function(){ 
                var strategy = RandomStrategy(json.awayTeam.hand);
                should.exist(strategy.card);
                strategy.move.should.be.equalOneOf('A', 'D', 'C', 'P');
            });
        });

    });

    describe('Play Turn', function() {

        describe('mumbo jumbo', function() {
            it('should result in mumbo jumbo', function(){
                json.homeTeam.hand[0].headsUpMoveToken = 'A';
                json.awayTeam.hand[0].headsUpMoveToken = 'A';
                json.homeTeam.headsUp = json.homeTeam.hand[0];
                json.awayTeam.headsUp = json.awayTeam.hand[0];
                const result = PlayTurn(json.homeTeam.headsUp, json.awayTeam.headsUp, json);
                should.exist(result);
            });
        });
    });

    describe('Heads Up Turn', function() {

        describe('Home ATTACK with a score greater than away ATTACK score', function() {
            it('should result in home winning', function(){
                let homeCard = json.homeTeam.hand[0];
                homeCard.score = 99;
                homeCard.headsUpMoveToken = 'A';
                const awayCard = json.awayTeam.hand[0];
                awayCard.score = 50;
                awayCard.headsUpMoveToken = 'A';
                
                const result = PlayHeadsUpTurn(homeCard, awayCard);
                result.should.equal('home');
            });
        });

        describe('home ATTACK with a score less than than away ATTACK score', function() {
            it('should result in away winning', function(){
                let homeCard = json.homeTeam.hand[0];
                homeCard.score = 6;
                homeCard.headsUpMoveToken = 'A';
                const awayCard = json.awayTeam.hand[0];
                awayCard.score = 50;
                awayCard.headsUpMoveToken = 'A';
                
                const result = PlayHeadsUpTurn(homeCard, awayCard);
                result.should.equal('away');
            });
        });

        describe('home ATTACK with a score equal to away ATTACK score', function() {
            it('should result in a draw', function(){
                let homeCard = json.homeTeam.hand[0];
                homeCard.score = 50;
                homeCard.headsUpMoveToken = 'A';
                const awayCard = json.awayTeam.hand[0];
                awayCard.score = 50;
                awayCard.headsUpMoveToken = 'A';
                
                const result = PlayHeadsUpTurn(homeCard, awayCard);
                result.should.equal('draw');
            });
        });

        describe('home POSSESSION with a team score greater than than away POSSESSION team score', function() {
            it('should result in home winning', function(){
                let homeCard = json.homeTeam.hand[0];
                homeCard.teamScore = 99;
                homeCard.headsUpMoveToken = 'P';
                const awayCard = json.awayTeam.hand[0];
                awayCard.teamScore = 50;
                awayCard.headsUpMoveToken = 'P';
                
                const result = PlayHeadsUpTurn(homeCard, awayCard);
                result.should.equal('home');
            });
        });

        describe('home POSSESSION with a team score less than than away POSSESSION team score', function() {
            it('should result in away winning', function(){
                let homeCard = json.homeTeam.hand[0];
                homeCard.teamScore = 10;
                homeCard.headsUpMoveToken = 'P';
                const awayCard = json.awayTeam.hand[0];
                awayCard.teamScore = 50;
                awayCard.headsUpMoveToken = 'P';
                
                const result = PlayHeadsUpTurn(homeCard, awayCard);
                result.should.equal('away');
            });
        });

        describe('home POSSESSION with a team score equal to away POSSESSION team score', function() {
            it('should result in a draw', function(){
                let homeCard = json.homeTeam.hand[0];
                homeCard.teamScore = 50;
                homeCard.headsUpMoveToken = 'P';
                const awayCard = json.awayTeam.hand[0];
                awayCard.teamScore = 50;
                awayCard.headsUpMoveToken = 'P';
                
                const result = PlayHeadsUpTurn(homeCard, awayCard);
                result.should.equal('draw');
            });
        });

        describe('home ATTACK against away POSSESSION', function() {
            it('should result in home winning', function(){
                let homeCard = json.homeTeam.hand[0];
                homeCard.headsUpMoveToken = 'A';
                const awayCard = json.awayTeam.hand[0];
                awayCard.headsUpMoveToken = 'P';
                
                const result = PlayHeadsUpTurn(homeCard, awayCard);
                result.should.equal('home');
            });
        });

        describe('home ATTACK against away DEFENCE', function() {
            it('should result in away winning', function(){
                let homeCard = json.homeTeam.hand[0];
                homeCard.headsUpMoveToken = 'A';
                const awayCard = json.awayTeam.hand[0];
                awayCard.headsUpMoveToken = 'D';
                
                const result = PlayHeadsUpTurn(homeCard, awayCard);
                result.should.equal('away');
            });
        });

        describe('home ATTACK against away COUNTER', function() {
            it('should result in away winning', function(){
                let homeCard = json.homeTeam.hand[0];
                homeCard.headsUpMoveToken = 'A';
                const awayCard = json.awayTeam.hand[0];
                awayCard.headsUpMoveToken = 'C';
                
                const result = PlayHeadsUpTurn(homeCard, awayCard);
                result.should.equal('away');
            });
        });

        describe('home DEFENSE against away ATTACK', function() {
            it('should result in home winning', function(){
                let homeCard = json.homeTeam.hand[0];
                homeCard.headsUpMoveToken = 'D';
                const awayCard = json.awayTeam.hand[0];
                awayCard.headsUpMoveToken = 'A';
                
                const result = PlayHeadsUpTurn(homeCard, awayCard);
                result.should.equal('home');
            });
        });

        describe('home COUNTER against away ATTACK', function() {
            it('should result in home winning', function(){
                let homeCard = json.homeTeam.hand[0];
                homeCard.headsUpMoveToken = 'C';
                const awayCard = json.awayTeam.hand[0];
                awayCard.headsUpMoveToken = 'A';
                
                const result = PlayHeadsUpTurn(homeCard, awayCard);
                result.should.equal('home');
            });
        });

        describe('home DEFENSE against away POSSESSION', function() {
            it('should result in away winning', function(){
                let homeCard = json.homeTeam.hand[0];
                homeCard.headsUpMoveToken = 'D';
                const awayCard = json.awayTeam.hand[0];
                awayCard.headsUpMoveToken = 'P';
                
                const result = PlayHeadsUpTurn(homeCard, awayCard);
                result.should.equal('away');
            });
        });

        describe('home COUNTER against away POSSESSION', function() {
            it('should result in away winning', function(){
                let homeCard = json.homeTeam.hand[0];
                homeCard.headsUpMoveToken = 'C';
                const awayCard = json.awayTeam.hand[0];
                awayCard.headsUpMoveToken = 'P';
                
                const result = PlayHeadsUpTurn(homeCard, awayCard);
                result.should.equal('away');
            });
        });

        describe('home DEFENSE against away DEFENSE', function() {
            it('should result in a draw', function(){
                let homeCard = json.homeTeam.hand[0];
                homeCard.headsUpMoveToken = 'D';
                const awayCard = json.awayTeam.hand[0];
                awayCard.headsUpMoveToken = 'D';
                
                const result = PlayHeadsUpTurn(homeCard, awayCard);
                result.should.equal('draw');
            });
        });

        describe('home DEFENSE against away COUNTER', function() {
            it('should result in a draw', function(){
                let homeCard = json.homeTeam.hand[0];
                homeCard.headsUpMoveToken = 'D';
                const awayCard = json.awayTeam.hand[0];
                awayCard.headsUpMoveToken = 'C';
                
                const result = PlayHeadsUpTurn(homeCard, awayCard);
                result.should.equal('draw');
            });
        });

        describe('home COUNTER against away DEFENSE', function() {
            it('should result in a draw', function(){
                let homeCard = json.homeTeam.hand[0];
                homeCard.headsUpMoveToken = 'C';
                const awayCard = json.awayTeam.hand[0];
                awayCard.headsUpMoveToken = 'D';
                
                const result = PlayHeadsUpTurn(homeCard, awayCard);
                result.should.equal('draw');
            });
        });

        describe('home COUNTER against away COUNTER', function() {
            it('should result in a draw', function(){
                let homeCard = json.homeTeam.hand[0];
                homeCard.headsUpMoveToken = 'C';
                const awayCard = json.awayTeam.hand[0];
                awayCard.headsUpMoveToken = 'C';
                
                const result = PlayHeadsUpTurn(homeCard, awayCard);
                result.should.equal('draw');
            });
        });

        describe('home POSSESSION against away ATTACK', function() {
            it('should result in home winning', function(){
                let homeCard = json.homeTeam.hand[0];
                homeCard.headsUpMoveToken = 'P';
                const awayCard = json.awayTeam.hand[0];
                awayCard.headsUpMoveToken = 'A';
                
                const result = PlayHeadsUpTurn(homeCard, awayCard);
                result.should.equal('away');
            });
        });

        describe('home POSSESSION against away DEFENSE', function() {
            it('should result in home winning', function(){
                let homeCard = json.homeTeam.hand[0];
                homeCard.headsUpMoveToken = 'P';
                const awayCard = json.awayTeam.hand[0];
                awayCard.headsUpMoveToken = 'D';
                
                const result = PlayHeadsUpTurn(homeCard, awayCard);
                result.should.equal('home');
            });
        });

        describe('home POSSESSION against away COUNTER', function() {
            it('should result in home winning', function(){
                let homeCard = json.homeTeam.hand[0];
                homeCard.headsUpMoveToken = 'P';
                const awayCard = json.awayTeam.hand[0];
                awayCard.headsUpMoveToken = 'C';
                
                const result = PlayHeadsUpTurn(homeCard, awayCard);
                result.should.equal('home');
            });
        });
    });

    describe('Next Phase after Heads Up', function() {

        describe('Heads up result is a draw', function() {
            it('should result in the next phase being POWER_UP', function(){
                const nextPhase = DetermineNextPhaseAfterHeadsUp('draw', 'A', 'A');
                nextPhase.should.equal('POWER_UP');
            });
        });

        describe('Heads up result is home with ATTACK', function() {
            it('should result in the next phase being COMBOS', function(){
                const nextPhase = DetermineNextPhaseAfterHeadsUp('home', 'A', 'A');
                nextPhase.should.equal('COMBOS');
            });
        });

        describe('Heads up result is home with POSSESSION', function() {
            it('should result in the next phase being COMBOS', function(){
                const nextPhase = DetermineNextPhaseAfterHeadsUp('home', 'P', 'D');
                nextPhase.should.equal('COMBOS');
            });
        });

        describe('Heads up result is home with DEFENSE', function() {
            it('should result in the next phase being POWER_UP', function(){
                const nextPhase = DetermineNextPhaseAfterHeadsUp('home', 'D', 'A');
                nextPhase.should.equal('POWER_UP');
            });
        });

        describe('Heads up result is home with COUNTER', function() {
            it('should result in the next phase being COUNTER', function(){
                const nextPhase = DetermineNextPhaseAfterHeadsUp('home', 'C', 'A');
                nextPhase.should.equal('COUNTER');
            });
        });

        describe('Heads up result is away with ATTACK', function() {
            it('should result in the next phase being COMBOS', function(){
                const nextPhase = DetermineNextPhaseAfterHeadsUp('away', 'A', 'A');
                nextPhase.should.equal('COMBOS');
            });
        });

        describe('Heads up result is away with POSSESSION', function() {
            it('should result in the next phase being COMBOS', function(){
                const nextPhase = DetermineNextPhaseAfterHeadsUp('away', 'D', 'P');
                nextPhase.should.equal('COMBOS');
            });
        });

        describe('Heads up result is away with DEFENSE', function() {
            it('should result in the next phase being POWER_UP', function(){
                const nextPhase = DetermineNextPhaseAfterHeadsUp('away', 'A', 'D');
                nextPhase.should.equal('POWER_UP');
            });
        });

        describe('Heads up result is away with COUNTER', function() {
            it('should result in the next phase being COUNTER', function(){
                const nextPhase = DetermineNextPhaseAfterHeadsUp('away', 'A', 'C');
                nextPhase.should.equal('COUNTER');
            });
        });
    });

    describe('Final Whistle', function() {

        describe('Home team still has hitpoints and cards', function() {
            it('should result in no final whistle', function(){
                var match = CheckForFinalWhistle(json);
                match.state.should.not.equal('FINAL_WHISTLE');
            });
        });

        describe('Home team with no hitpoints remaining', function() {
            it('should result in the final whistle', function(){
                json.homeTeam.hitPoints = 0;
                const match = CheckForFinalWhistle(json);
                match.state.should.equal('FINAL_WHISTLE');
            });
        });

        describe('Away team with no hitpoints remaining', function() {
            it('should result in the final whistle', function(){
                json.awayTeam.hitPoints = 0;
                const match = CheckForFinalWhistle(json);
                match.state.should.equal('FINAL_WHISTLE');
            });
        });

        describe('Home team with undefined cards remaining', function() {
            it('should result in the final whistle', function(){
                json.homeTeam.deck = undefined;
                json.homeTeam.hand = undefined;
                const match = CheckForFinalWhistle(json);
                match.state.should.equal('FINAL_WHISTLE');
            });
        });

        describe('Away team with undefined cards remaining', function() {
            it('should result in the final whistle', function(){
                json.awayTeam.deck = undefined;
                json.awayTeam.hand = undefined;
                const match = CheckForFinalWhistle(json);
                match.state.should.equal('FINAL_WHISTLE');
            });
        });

        describe('Home team with no cards remaining', function() {
            it('should result in the final whistle', function(){
                json.homeTeam.deck = undefined;
                json.homeTeam.hand = undefined;
                const match = CheckForFinalWhistle(json);
                match.state.should.equal('FINAL_WHISTLE');
            });
        });

        describe('Away team with no cards remaining', function() {
            it('should result in the final whistle', function(){
                json.awayTeam.deck = [];
                json.awayTeam.hand = [];
                const match = CheckForFinalWhistle(json);
                match.state.should.equal('FINAL_WHISTLE');
            });
        });
    });
});