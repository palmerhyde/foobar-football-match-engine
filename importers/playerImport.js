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
                player.name = json.items[j].name;
                player.commonName = json.items[j].commonName;
                player.position = json.items[j].position;

                for (var k=0; k < json.items[j]["attributes"].length; k++) {
                    if (json.items[j].attributes[k]) {

                        switch (json.items[j].attributes[k].name) {
                            case "fut.attribute.PAC" :
                                player.pace = json.items[j].attributes[k].value;
                                break;
                            case "fut.attribute.SHO" :
                                player.shooting = json.items[j]["attributes"][k].value;
                                break;
                            case "fut.attribute.PAS" :
                                player.passing = json.items[j]["attributes"][k].value;
                                break;
                            case "fut.attribute.DRI" :
                                player.dribbling = json.items[j]["attributes"][k].value;
                                break;
                            case "fut.attribute.DEF" :
                                player.defence = json.items[j]["attributes"][k].value;
                                break;
                            case "fut.attribute.PHY" :
                                player.physical = json.items[j]["attributes"][k].value;
                                break;
                            case "fut.attribute.HAN" :
                                player.handling = json.items[j]["attributes"][k].value;
                                break;
                            case "fut.attribute.KIC" :
                                player.kicking = json.items[j]["attributes"][k].value;
                                break;
                            case "fut.attribute.DIV" :
                                player.diving = json.items[j]["attributes"][k].value;
                                break;
                            case "fut.attribute.REF" :
                                player.reflexes = json.items[j]["attributes"][k].value;
                                break;
                            case "fut.attribute.SPD" :
                                player.speed = json.items[j]["attributes"][k].value;
                                break;
                            case "fut.attribute.POS" :
                                player.positioning = json.items[j]["attributes"][k].value;
                                break;
                            default:
                                console.log(json.items[j]["attributes"][k].name);
                                break;
                        }
                    }
                }

                player.type = json.items[j].color;
                player.color = json.items[j].quality;
                player.imageUrl = json.items[j].headshotImgUrl;
                player.clubImageUrl = json.items[j].club.imgUrl;
                player.nationImageUrl = json.items[j].nation.imgUrl;

                var name = json.items[j].lastName + "_" + player.id;
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