var config = require('../lib/config');
var request = require('request');
var util = require('util');
var serviceFirebase = require('../lib/services/firebase');

var url = "https://www.easports.com/uk/fifa/ultimate-team/api/fut/item?jsonParamObject=%7B%22page%22%20%3A%20%22%s%22%7D";
var pageCount = 10;

for (var i = 1; i <= pageCount; i++) {
    url2 = util.format(url, i);
    request(url2, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Print the google web page.
            var json = JSON.parse(body);

            for (var j = 0; j < json.items.length; j++) {
                // TODO: validate player import
                serviceFirebase.Set(config.PlayerImportEndPoint, json.items[j].baseId, json.items[j]);
            }
        }
    })
}