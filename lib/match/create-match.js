var validation = require('../schemas/validation');
var config = require('../../lib/config');

function createMatch() {
    var match = {};
    var chances = [];
    var chanceCount = randomMinMax(config.Match.minimumChances, config.Match.maximumChances);
    match.chanceCount = chanceCount;

    for (var i = 0; i < match.chanceCount; i++) {
        chances.push(randomMinMax(1, config.Match.minutes));
    }

    match.chances = createChances(chances.sort(function(a, b){return a-b}));
    return match;
}

function createChances(times) {
    var chances = [];
    for (var i = 0; i < times.length; i++) {
        var chanceType = randomMinMax(1, 8);
        var chance = {};
        switch (chanceType) {
            case 1:
                chance.minute = times[i];
                chance.imageUrl = "http://localhost:63342/foobar-football-react/assets/images/pitch-chalk.jpg";
                chance.type = "Single";
                chance.attribute1a = randomAttribute();
                chance.attribute1b = randomAttribute();
                chance.name = getGetOrdinal(chance.minute) + ' min';
                chances.push(chance);
                break;
            case 2:
            case 3:
            case 4:
                chance.minute = times[i];
                chance.imageUrl = "http://localhost:63342/foobar-football-react/assets/images/pitch-chalk.jpg";
                chance.type = "Team";
                chance.attribute1a = randomAttribute();
                chance.attribute1b = randomAttribute();
                chance.attribute2a = randomAttribute();
                chance.attribute2b = randomAttribute();
                chance.name = getGetOrdinal(chance.minute) + ' min';
                chances.push(chance);
                break;
            case 5:
                chance.minute = times[i];
                chance.imageUrl = "http://localhost:63342/foobar-football-react/assets/images/pitch-chalk.jpg";
                chance.type = "Single - Keeper";
                chance.attribute1a = randomAttribute();
                chance.attribute1b = randomKeeperAttribute();
                chance.name = getGetOrdinal(chance.minute) + ' min';
                chances.push(chance);
                break;
            case 6:
                chance.minute = times[i];
                chance.imageUrl = "http://localhost:63342/foobar-football-react/assets/images/pitch-chalk.jpg";
                chance.type = "Single - Keeper";
                chance.attribute1a = randomKeeperAttribute();
                chance.attribute1b = randomAttribute();
                chance.name = getGetOrdinal(chance.minute) + ' min';
                chances.push(chance);
                break;
            case 7:
                chance.minute = times[i];
                chance.imageUrl = "http://localhost:63342/foobar-football-react/assets/images/pitch-chalk.jpg";
                chance.type = "Team - Keeper";
                chance.attribute1a = randomAttribute();
                chance.attribute1b = randomKeeperAttribute();
                chance.attribute2a = randomAttribute();
                chance.attribute2b = randomAttribute();
                chance.synergy = randomSynergy();
                chance.name = getGetOrdinal(chance.minute) + ' min';
                chances.push(chance);
                break;
            case 8:
                chance.minute = times[i];
                chance.imageUrl = "http://localhost:63342/foobar-football-react/assets/images/pitch-chalk.jpg";
                chance.type = "Team - Keeper";
                chance.attribute1a = randomAttribute();
                chance.attribute1b = randomAttribute();
                chance.attribute2a = randomAttribute();
                chance.attribute2b = randomKeeperAttribute();
                chance.synergy = randomSynergy();
                chance.name = getGetOrdinal(chance.minute) + ' min';
                chances.push(chance);
                break;
        }
    }

    return chances;
}

function randomAttribute() {
    var offset = randomMinMax(0, config.Match.attributes.length -1);
    return config.Match.attributes[offset];
}

function randomKeeperAttribute() {
    var offset = randomMinMax(0, config.Match.keeperAttributes.length -1);
    return config.Match.keeperAttributes[offset];
}

function randomSynergy() {
    var offset = randomMinMax(0, config.Match.synergy.length -1);
    return config.Match.synergy[offset];
}

function getGetOrdinal(n) {
    var s=["th","st","nd","rd"],
        v=n%100;
    return n+(s[(v-20)%10]||s[v]||s[0]);
}

// Move to random module
function randomMinMax (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

exports.CreateMatch = createMatch;