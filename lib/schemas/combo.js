var joi = require('joi');

var schema = joi.object().keys({
    'matchId' : joi.string().required(),
    'userId' : joi.string().required(),
    'cards' : joi.array().items(joi.number()),
});

exports.schema = schema;