var Firebase = require('firebase');
var config = require('../config');

var q = require('q');
var fireBaseUrl = config.FirebaseUrl;

var find = function (asset, id) {
    var query = new Firebase(fireBaseUrl + '/' + asset + '/' + id);
    var defer = q.defer();

    query.on('value', function (snapshot) {
        // TODO: snapshot.val() is null if no data is found. What should we do?
        defer.resolve(snapshot.val());
    });

    return defer.promise;
};

var set = function (asset, id, data) {
    var reference = new Firebase(fireBaseUrl + '/' + asset + '/' + id);
    reference.set(data);
};

var push = function (asset, id, data) {
    var reference = new Firebase(fireBaseUrl + '/' + asset + '/' + id);
    reference.push(data);
};

var pushAsset = function (asset, data) {
    var reference = new Firebase(fireBaseUrl + '/' + asset);
    reference.push(data);
};

exports.Find = find;
exports.Set = set;
exports.Push = push;
exports.PushAsset = pushAsset;