var admin = require('firebase-admin');
var config = require('../config');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: config.FirebaseUrl
});

var database = function () {
    return admin.database();
}
  
exports.Database = database;