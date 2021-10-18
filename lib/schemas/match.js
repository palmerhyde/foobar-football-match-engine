var joi = require('joi');
var team = require('./team');

const states = [
    'FIRST_UPDATE',
    'INITAL_ADD',
];

const phases = [
    'HEADS_UP',
    'COMBOS',
    'COUNTER',
    'POWER_UP',
    'END_TURN'
];

const matchSchema = joi.object().keys({
    'state' : joi.any().valid(...states).required(),
    'awayTeam' : team.schema().required(),
    'homeTeam' : team.schema().required(),
    'phase' : joi.any().valid(...phases),
});

exports.match = matchSchema;