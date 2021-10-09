var joi = require("joi");

var states = [
    "FIRST_UPDATE",
    "INITAL_ADD",
];

var matchSchema = joi.object().keys({
    "state" : joi.any().valid(...states).required(),
    "awayTeam" : joi.object().required(),
    "homeTeam" : joi.object().required()
});

exports.match = matchSchema;