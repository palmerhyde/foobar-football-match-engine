var config = require('../config');

var listen = function () {
    console.log('Listener: Play Turn');
    var serviceFirebase = require('../../lib/services/firebase');
    var firebase = require('firebase');
    var q = require('q');

    // Queues
    var move = require('../../lib/moves/move');
    var queuePlayMoveRef = new firebase(config.FirebaseUrl + '/' + config.QueueEndPoint + '/' + config.PlayMoveEndPoint);
    queuePlayMoveRef.on('child_added', function (snapshot) {
        var cardId = snapshot.val().cardId;
        var userId = snapshot.val().userId;
        var matchId = snapshot.val().matchId;

        var promise = serviceFirebase.Find(config.MatchEndPoint, matchId);
        var all = q.all([promise]);

        all.then(function() {
            var match = promise.valueOf();
            if(match) {
                if (match.player1._id == userId) {
                    match.player1Card = cardId;
                }
                else if (match.player2._id == userId) {
                    match.player2Card = cardId;
                }
                else {
                    console.log ("user not found");
                }

                console.log(match);
                serviceFirebase.Set(config.MatchEndPoint, matchId, match);
            }
            else {
                console.log('Match not found.')
            }
        });

        snapshot.ref().remove();
    });
};

listen();