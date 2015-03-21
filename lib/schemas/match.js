var joi = require("joi");
var move = require("./move");
var user = require("./user");

var matchSchema = joi.object().keys({
    "id" : joi.string().required(),
    "turn" : joi.number().integer().required(),
    "currentTurnUserId" : joi.string().required(),
    "moves" : joi.array().items(move.move).required(),
    "player1" : user.schema.required(),
    "player2" : user.schema.required()
});

exports.match = matchSchema;