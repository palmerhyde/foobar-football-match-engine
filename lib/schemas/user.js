var joi = require("joi");
var player = require("./player");

var user = joi.object().keys({
    "id" : joi.string().required(),
    "firstName" : joi.string().required(),
    "lastName" : joi.string().required(),
    "email" : joi.string().email().required(),
    "squad" : joi.array().items(player.schema).length(11).required()
});

exports.schema = user;