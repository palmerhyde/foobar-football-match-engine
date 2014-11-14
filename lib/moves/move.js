var validation = require('../../lib/validation');

// TODO: matchid
// Match can look inside itself to establish move and players
function play(player1, player2, move) {
    if (!validation.ValidatePlayer(player1)) {
        throw new Error('player1 not valid');
    }

    if (!validation.ValidatePlayer(player2)) {
        throw new Error('player2 not valid');
    }

    if (!validation.ValidateMove(move)) {
        throw new Error('move not valid');
    }

    var result;

    if (player1[move.player1Attribute] > player2[move.player2Attribute]) {
        result = "player1";
    }
    else if (player2[move.player2Attribute] > player1[move.player1Attribute]) {
        result = "player2";
    }
    else {
        result = "draw";
    }

    return result;
}

exports.Play = play;