var joi = require("joi");

var playerPositions = [
    "Goalkeeper",
    "Defender",
    "Midfielder",
    "Forward",
];

var playerMoves = ['A', 'P', 'D', 'C'];

var playerSchema = function () {
    return joi.object().keys({
        "id" : joi.string().required(),
        "assist" : joi.bool().required(),
        "goalScorer" : joi.bool().required(),
        "name" : joi.string().required(),
        "pictureUrl" : joi.string().required(),
        "position" : joi.any().valid(...playerPositions).required(),
        "primaryMove" : joi.any().valid(...playerMoves).required(),
        "score" : joi.number().required().min(0).max(100),
        "secondaryMove" : joi.any().valid(...playerMoves).required(),
        "slug" : joi.string().required(),
        "teamScore" : joi.number().required().min(0).max(100),
    })
};

exports.schema = playerSchema;