function play(player1, player2, move) {
    var result = "unknown";

    if (player1.action == 'ATTACK' && player2.action == 'ATTACK') {
        // Highest attribute wins
        return compareAttributes(player1[move.player1Attribute], player2[move.player2Attribute])
    }

    if (player1.action == 'ATTACK' && player2.action == 'DEFENCE') {
        return "player2";
    }

    if (player1.action == 'ATTACK' && player2.action == 'POSSESSION') {
        return "player1";
    }

    if (player1.action == 'ATTACK' && player2.action == 'COUNTER') {
        return "player2";
    }

    if (player1.action == 'DEFENCE' && player2.action == 'ATTACK') {
        return "player1";
    }

    if (player1.action == 'DEFENCE' && player2.action == 'DEFENCE') {
        return "draw";
    }

    if (player1.action == 'DEFENCE' && player2.action == 'POSSESSION') {
        return "player2";
    }

    if (player1.action == 'DEFENCE' && player2.action == 'COUNTER') {
        return "draw";
    }

    if (player1.action == 'POSSESSION' && player2.action == 'ATTACK') {
        return "player2"
    }

    if (player1.action == 'POSSESSION' && player2.action == 'DEFENCE') {
        return "player1";
    }

    if (player1.action == 'POSSESSION' && player2.action == 'POSSESSION') {
        return "draw";
    }

    if (player1.action == 'POSSESSION' && player2.action == 'COUNTER') {
        return "player1";
    }

    if (player1.action == 'COUNTER' && player2.action == 'ATTACK') {
        return "player1";
    }

    if (player1.action == 'COUNTER' && player2.action == 'DEFENCE') {
        return "draw";
    }

    if (player1.action == 'COUNTER' && player2.action == 'POSSESSION') {
        return "player2"
    }

    if (player1.action == 'COUNTER' && player2.action == 'COUNTER') {
        return "draw";
    }

    return result;
}

var compareAttributes = function (attribute1, attribute2) {
    if (attribute1 > attribute2) {
        return "player1";
    }
    else if (attribute2 > attribute1) {
        return "player2";
    }
    else {
        return "draw";
    }
};

module.exports = play;