var moveSchema = require("./move");
var playerSchema = require("./player");
var squadSchema = require("./squad") 
var turnSchema = require("./turn") 

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

function validateSquad(json) {
    var value = false;

    if (json) {
        var result = squadSchema.schema().validate(json);
        value = result.error === undefined;
    }

    return value;
}

exports.ValidatePlayer = validatePlayer;
exports.ValidateMove = validateMove;
exports.ValidateTurn = validateTurn;
exports.ValidateSquad = validateSquad;