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
    var result = squadSchema.schema().validate(json);

    if (!result.error) {
        const message = validNumberOfPlayersPerPosition(json);result
        if (message !== undefined) {
            result.error = { 'message' : message }
        }
    }

    return result;
}

function validNumberOfPlayersPerPosition(players) {
    let message = undefined;
    const reducer = (map, val) => {
        if (map[val] == null) {
          map[val] = 1;
        } else {
          ++map[val];
        }
        return map;
      };
    
    const positionCounts = players.map(c => c.position).reduce(reducer, {});
    
    if (positionCounts.Goalkeeper != 1) {
        message = 'Squad cannot contain more than 1 Goalkeeper'
    } 
    
    if (positionCounts.Defender ==0) {
        message = 'Squad must contain at least 1 Defender'
    }
    
    
    if (positionCounts.Midfielder ==0) {
        message = 'Squad must contain at least 1 Midfielder'
    } 
    
    if (positionCounts.Forward ==0 ) {
        message = 'Squad must contain at least 1 Forward'
    }

    return message;
}

exports.ValidatePlayer = validatePlayer;
exports.ValidateMove = validateMove;
exports.ValidateTurn = validateTurn;
exports.ValidateSquad = validateSquad;