var joi = require("joi");

var attributes = [
    "crossing",
    "dribbling",
    "finishing",
    "gkdiving",
    "gkhandling",
    "gkpositioning",
    "gkreflexes",
    "heading",
    "interceptions",
    "longpassing",
    "longshots",
    "marking",
    "positioning",
    "shortpassing",
    "slidingtackle",
    "shotpower",
    "standingtackle",
    "strength",
    "vision",
    "volleys"
];

var moveSchema = joi.object().keys({
    "id" : joi.string().required(),
    "name" : joi.string().required(),
    "player1Attribute" : joi.any().valid(attributes).required(),
    "player2Attribute" : joi.any().valid(attributes).required()
});

exports.attributes = attributes;
exports.move = moveSchema;