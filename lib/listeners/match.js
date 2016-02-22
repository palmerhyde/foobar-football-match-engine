var config = require('../config');

var listen = function () {
    console.log('Listener: Match');
    var serviceFirebase = require('../../lib/services/firebase');
    var firebase = require('firebase');
    var q = require('q');

    // Queues
    var move = require('../../lib/moves/move');
    var queuePlayMoveRef = new firebase(config.FirebaseUrl + '/' + config.MatchEndPoint);
    queuePlayMoveRef.on('child_changed', function (snapshot) {
        var match = snapshot.val();
    });
};

listen();
