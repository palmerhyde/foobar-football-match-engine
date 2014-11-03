var config = require('../config');

var listen = function () {
    console.log('Listener: Queues');
    var serviceFirebase = require('../../lib/services/firebase');
    var firebase = require('firebase');
    var q = require('q');

    // Queues
    var move = require('../../lib/moves/move');

    var queuePlayMoveRef = new firebase(config.FirebaseUrl + '/' + config.QueueEndPoint + '/' + config.PlayMoveEndPoint);

    queuePlayMoveRef.on('child_added', function (snapshot) {
        // TODO: throw error for invalid snapshot?

        var userId = snapshot.val().userId;
        var matchId = snapshot.val().matchId;

        var promise = serviceFirebase.Find(config.MatchEndPoint, matchId);
        var all = q.all([promise]);

        all.then(function() {
            var match = promise.valueOf();
            if(match) {
                var turn = match.turn;
                var result = move.Play(match.homeTeam, match.awayTeam, match.moveDeck[turn - 1]);
                serviceFirebase.Set(config.MatchEndPoint, game.Id, result);
            }
            else {
                console.log('Match not found.')
            }
        });

        snapshot.ref().remove();
    });
};

exports.listen = listen;