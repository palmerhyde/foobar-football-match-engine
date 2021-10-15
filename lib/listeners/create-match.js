var firebase = require('../services/firebase')
var { CreateMatch } = require('../game/match')
var config = require('../config');
const chalk = require('chalk')

async function listenToCreateMatchReference() {
    console.log(chalk.green('Listener: Create Match'));
    const db = firebase.Database()
    const ref = db.ref(config.CreateMatchReference);
    ref.on('child_added', async (snapshot) => {
        const data = snapshot.val();
      
        var matchRef = db.ref(config.MatchReference);
        var userRef = db.ref(config.MatchViewReference + '/' + data.homeUserId)
        const userSnapshot = await userRef.once('value');

        if (!userSnapshot.val()) {
            const match = await CreateMatch(data.homeUserId, data.awayUserId)
        
            matchRef.push(match, () => {
                console.log(chalk.green('Match added:' + match.homeTeam.clubName + ' VS ' + match.awayTeam.clubName))
                ref.child(snapshot.key).remove();
            })
        }
        else {
            console.log(chalk.green("\"" + data.homeUserId + "\" is already playing a match." ))
            ref.child(snapshot.key).remove();
        }
    });
}

exports.ListenToCreateMatchReference = listenToCreateMatchReference