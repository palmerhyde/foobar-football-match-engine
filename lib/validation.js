var playerSchema = require("../lib/schemas/player");
var moveSchema = require("../lib/schemas/move");
var joi = require("joi");

function validatePlayer(json) {
    var value = false;

    if (json) {
        var result = joi.validate(json, playerSchema.schema);
        value = result.error === null;
    }

    return value;
}

function validateMove(json) {
    var value = false;

    if (json) {
        var result = joi.validate(json, moveSchema.move);
        value = result.error === null;
    }

    return value;
}

function validateMatch(json) {
    //var result = joi.validate(json, moveSchema.move);
    //return (result.error === null).should.be.true;
    return true;
}

exports.ValidatePlayer = validatePlayer;
exports.ValidateMove = validateMove;
exports.ValidateMatch = validateMatch;