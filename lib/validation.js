var playerSchema = require("../lib/schemas/player");
var moveSchema = require("../lib/schemas/move");

function validatePlayer(json) {
    var value = false;

    if (json) {
        var result = playerSchema.schema().validate(json);
        value = result.error === undefined;
    }

    return value;
}

function validateMove(json) {
    var value = false;

    if (json) {
        var result = moveSchema.move.validate(json);
        value = result.error === undefined;
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