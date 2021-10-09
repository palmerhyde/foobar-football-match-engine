var joi = require("joi");

var schema = joi.object().keys({
    "matchId" : joi.string().required(),
    "userId" : joi.string().required(),
    "cardId" : joi.number().required(),
    "moveId" : joi.string().required(),
});

exports.schema = schema;