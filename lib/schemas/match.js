var joi = require("joi");
var team = require("./team");

var states = [
    "FIRST_UPDATE",
    "INITAL_ADD",
];

var matchSchema = joi.object().keys({
    "state" : joi.any().valid(...states).required(),
    "awayTeam" : team.schema().required(),
    "homeTeam" : team.schema().required()
});

exports.match = matchSchema;