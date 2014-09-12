function play(player1, player2, move) {
    // TODO: validate inputs better

    if (typeof player1 == 'undefined') {
        throw new Error('missing player1 parameter');
    }

    if (typeof player2 == 'undefined') {
        throw new Error('missing player2 parameter');
    }

    if (typeof move == 'undefined') {
        throw new Error('missing move parameter');
    }

    if (typeof player1[move.player1Attribute] == 'undefined') {
        player1[move.player1Attribute] = 0;
    }

    if (typeof player2[move.player2Attribute] == 'undefined') {
        player2[move.player2Attribute] = 0;
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