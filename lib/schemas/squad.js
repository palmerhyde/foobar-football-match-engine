var joi = require("joi");
var player = require("./player");

var squadSchema = function () {
    return joi.object({
        "name": joi.string().required(),
        "goalkeeper" : player.schema().required(),
        "defenders" : joi.array().items(player.schema).required(),
        "midfielders" : joi.array().items(player.schema).required(),
        "attackers" : joi.array().items(player.schema).required(),
    });
};

exports.schema = squadSchema;