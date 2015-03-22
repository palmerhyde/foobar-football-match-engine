var joi = require("joi");
var squad = require("./squad");

var user = joi.object().keys({
    "id" : joi.string().required(),
    "firstName" : joi.string().required(),
    "lastName" : joi.string().required(),
    "email" : joi.string().email().required(),
    "squad" : squad.schema().required()
});

exports.schema = user;