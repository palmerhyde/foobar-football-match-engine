var config = require('../config');

var listen = function () {
    console.log('Listener: Queues');
    var ServiceFirebase = require('../../lib/services/firebase');
    var Firebase = require('firebase');
    var Q = require('q');

    // Queues
    var gamePlayMove = require('../../lib/moves/move');

    var queuePlayMoveRef = new Firebase(config.FirebaseUrl + '/' + config.QueueEndPoint + '/' + config.PlayMoveEndPoint);

    queuePlayMoveRef.on('child_added', function (snapshot) {
        var userId = snapshot.val().UserId;
        var gameId = snapshot.val().GameId;

        var gamePromise = ServiceFirebase.Find(config.MatchEndPoint, gameId);
        var all = Q.all([gamePromise]);

        all.then(function() {
            var game = gamePromise.valueOf();
            var turn = game.Turn;
            var result = gamePlayMove.Play(game.HomeTeam.PlayerHand[0], game.AwayTeam.PlayerHand[0], game.MoveDeck[turn-1]);
            ServiceFirebase.Set(config.MatchEndPoint, game.Id, result);
        });

        snapshot.ref().remove();
    });
};

exports.listen = listen;