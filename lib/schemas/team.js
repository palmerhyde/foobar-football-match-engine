var joi = require('joi');
var player = require('./player');

var teamSchema = function () {
    return joi.object().keys({
        'clubBadge' : joi.string().required(),
        'clubName' : joi.string().required(),
        'userId' : joi.string().required(),
        'hitPoints' : joi.number().required(),
        'deck' : joi.array().items(player.schema()),
        'hand' : joi.array().items(player.schema()),
        'discard' : joi.array().items(player.schema()),
        'headsUp' : player.schema(),
        'combo' : joi.array().items(player.schema()),
        'powerup' : joi.array().items(player.schema()),
        'squad' : joi.array().items(player.schema()).length(11)
    });
};

exports.schema = teamSchema;