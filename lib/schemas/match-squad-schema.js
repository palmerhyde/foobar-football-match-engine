var joi = require("joi");
var player = require("./player");

var matchSquadSchema = function () {

    return joi.object({
        "name": joi.string().required(),
        "goalkeeper" : player.schema.required(),
        "pitch1" : joi.array().items(player.schema).required(),
        "pitch2" : joi.array().items(player.schema).required(),
        "pitch3" : joi.array().items(player.schema).required(),
        "pitch4" : joi.array().items(player.schema).required(),
        "pitch5" : joi.array().items(player.schema).required(),
        "substitutions" : joi.array().items(player.schema).max(3).required()
    });
};

exports.matchSquad = matchSquadSchema;