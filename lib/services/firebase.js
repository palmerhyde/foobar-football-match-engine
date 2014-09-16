var Firebase = require('firebase');
var config = require('../config');

var q = require('q');
var fireBaseUrl = config.FirebaseUrl;

var find = function (asset, id) {
    var query = new Firebase(fireBaseUrl + '/' + asset + '/' + id);
    var defer = q.defer();

    query.on('value', function (snapshot) {
        defer.resolve(snapshot.val());
    });

    return defer.promise;
};

var set = function (asset, id, data) {
    var reference = new Firebase(fireBaseUrl + '/' + asset + '/' + id);
    reference.set(data);
};

exports.Find = find;
exports.Set = set;