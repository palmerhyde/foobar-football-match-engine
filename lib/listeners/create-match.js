var config = require('../config');

var listen = function () {
    console.log('Listener: Create Match');
    var serviceFirebase = require('../../lib/services/firebase');
    var firebase = require('firebase');
    var q = require('q');
    var createMatch = require('../match/create-match');

    var queueRef = new firebase(config.FirebaseUrl + '/' + config.QueueEndPoint + '/' + config.CreateMatchEndPoint);

    queueRef.on('child_added', function (snapshot) {
        var userId = snapshot.val().UserId;

        var promise = serviceFirebase.Find(config.UserEndPoint, userId);
        var all = q.all([promise]);

        all.then(function() {
            var user = promise.valueOf();
            if(user) {
                if (!user.MatchView) {
                    var match = createMatch.CreateMatch();
                    match.UserId = user.Id;
                    console.log(match);
                    serviceFirebase.PushAsset(config.MatchEndPoint, match);
                }
                else {
                    console.log('user already playing a match.', JSON.stringify(user.MatchView));
                }
            }
            else {
                console.log('user not found.');
            }
        });

        //snapshot.ref().remove();
    });
};

listen();