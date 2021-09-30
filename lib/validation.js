var playerSchema = require("../lib/schemas/player");
var moveSchema = require("../lib/schemas/move");
var turnSchema = require("../lib/schemas/turn") 

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

function validateTurn(json) {
    var value = false;

    if (json) {
        var result = turnSchema.schema.validate(json);
        value = result.error === undefined;
    }

    return value;
}

exports.ValidatePlayer = validatePlayer;
exports.ValidateMove = validateMove;
exports.ValidateTurn = validateTurn;