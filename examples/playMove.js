// Push a PlayMove message into the queue.
var config = require('../lib/config');
//var match = require("../test/testData/validMatch");
//var playMove = require("../test/testData/validRequestPlayMoveSchema");
var serviceFirebase = require('../lib/services/firebase');
//serviceFirebase.Set(config.MatchEndPoint, match._id, match);

var move = {
    cardId: "1",
    matchId: "1",
    userId: "1"
};

serviceFirebase.Push(config.QueueEndPoint, config.PlayMoveEndPoint, move);
return 0;