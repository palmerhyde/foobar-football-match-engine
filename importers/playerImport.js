var config = require('../lib/config');
var request = require('request');
var util = require('util');
var serviceFirebase = require('../lib/services/firebase');
var fs = require('fs');

var url = "https://www.easports.com/uk/fifa/ultimate-team/api/fut/item?jsonParamObject=%7B%22page%22%20%3A%20%22%s%22%7D";
var pageCount = 100;

fs.exists('players.js', function(exists) {
    if (exists) {
        fs.unlinkSync("players.js");
    }
});

for (var i = 1; i <= pageCount; i++) {
    url2 = util.format(url, i);
    request(url2, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);


            for (var j = 0; j < json.items.length; j++) {
                // TODO: validate player import
                // serviceFirebase.Set(config.PlayerImportEndPoint, json.items[j].baseId, json.items[j]);
                var player = {};
                player.id = json.items[j].baseId.toString();
                player.name = json.items[j].firstName + " " + json.items[j].lastName;
                player.lastName = json.items[j].lastName;
                player.commonName = json.items[j].commonName;
                player.position = json.items[j].position;
                player.crossing = json.items[j].crossing;
                player.dribbling = json.items[j].dribbling;
                player.finishing = json.items[j].finishing;
                player.gkdiving = json.items[j].gkdiving;
                player.gkhandling = json.items[j].gkhandling;
                player.gkpositioning = json.items[j].gkpositioning;
                player.gkreflexes = json.items[j].gkreflexes;
                player.heading = json.items[j].headingaccuracy;
                player.interceptions = json.items[j].interceptions;
                player.longpassing = json.items[j].longpassing;
                player.longshots = json.items[j].longshots;
                player.marking = json.items[j].marking;
                player.positioning = json.items[j].positioning;
                player.shortpassing = json.items[j].shortpassing;
                player.slidingtackle = json.items[j].slidingtackle;
                player.shotpower = json.items[j].shotpower;
                player.standingtackle = json.items[j].standingtackle;
                player.strength = json.items[j].strength;
                player.vision = json.items[j].vision;
                player.volleys = json.items[j].volleys;
                player.imageUrl = json.items[j].headshotImgUrl;
                player.clubImageUrl = json.items[j].club.imgUrl;
                player.nationImageUrl = json.items[j].nation.imgUrl;

                var name = player.lastName + "_" + player.id;
                name = name.replace(" ", "");
                name = name.replace("-", "");
                name = name.replace(".", "");
                name = name.replace(" ", "");
                name = name.replace("'", "");
                name = name.replace(".", "");

                fs.appendFile('players.js', "exports." + name.replace(" ", "") + " = " + JSON.stringify(player, null, 4) + ";\n\n", function (err) {
                    if (err) {
                        console.log(err);
                        return console.log(err);
                    }
                });
            }
        }
    })
}