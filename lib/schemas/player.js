var joi = require('joi');

const playerPositions = [
    'Goalkeeper',
    'Defender',
    'Midfielder',
    'Forward',
];

const playerMoves = ['A', 'P', 'D', 'C'];

const playerSchema = function () {
    return joi.object().keys({
        'id' : joi.string().required(),
        'assist' : joi.bool().required(),
        'goalScorer' : joi.bool().required(),
        'name' : joi.string().required(),
        'pictureUrl' : joi.string().required(),
        'position' : joi.any().valid(...playerPositions).required(),
        'primaryMove' : joi.any().valid(...playerMoves).required(),
        'score' : joi.number().required().min(0).max(100),
        'secondaryMove' : joi.any().valid(...playerMoves).required(),
        'slug' : joi.string().required(),
        'teamScore' : joi.number().required().min(0).max(100),
        'headsUpMoveToken' : joi.any().valid(...playerMoves)
    });
};

exports.schema = playerSchema;