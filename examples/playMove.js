// Push a PlayMove message into the queue.
var config = require('../lib/config');
var match = require("../test/testData/validMatch");
var playMove = require("../test/testData/validRequestPlayMoveSchema");
var serviceFirebase = require('../lib/services/firebase');
serviceFirebase.Set(config.MatchEndPoint, match._id, match);
serviceFirebase.Push(config.QueueEndPoint, config.PlayMoveEndPoint, playMove);