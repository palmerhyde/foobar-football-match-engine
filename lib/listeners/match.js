var firebase = require('../services/firebase')
var { CreateMatchViewFromMatch } = require('../game/match')
var config = require('../config');
const chalk = require('chalk')

async function listenToMatchReference() {
    console.log(chalk.yellow('Listener: Match'));
    const db = firebase.Database()
    const ref = db.ref(config.MatchReference);
    ref.on('child_changed', async (snapshot) => {
        const data = snapshot.val();
        const matchViewRef = db.ref(config.MatchViewReference);
        const matchView = CreateMatchViewFromMatch(data);
        matchViewRef.child(data.homeTeam.userId).set(matchView)
    })

    ref.on('child_added', async (snapshot) => {
        // This is a hack as child_added retreives all items in the list.
        // We want to filter out items that have already been seen.
        const data = snapshot.val();
        if (data.state === "INITAL_ADD") {
            data.state = 'FIRST_UPDATE'
            ref.child(snapshot.key).update(data);
        }
    })
}

exports.ListenToMatchReference = listenToMatchReference