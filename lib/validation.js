var playerSchema = require("../lib/schemas/player");
var moveSchema = require("../lib/schemas/move");
var validator = require("tv4");

function validatePlayer(json) {
    return result = validator.validate(json, playerSchema);
}

function validateMove(json) {
    return result = validator.validate(json, moveSchema);
}

function validateMatch(json) {
    return result = validator.validate(json, matchSchema);
}

exports.ValidatePlayer = validatePlayer;
exports.ValidateMove = validateMove;
exports.ValidateMatch = validateMatch;