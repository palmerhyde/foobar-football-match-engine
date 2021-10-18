var joi = require('joi');
var player = require('./player');

var squadSchema = function () {
    return joi.array()
        .items(player.schema())
        .length(11);
};

exports.schema = squadSchema;