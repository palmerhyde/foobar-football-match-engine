var firebase = require('../services/firebase')
var config = require('../config');
var graphql = require('../services/graphql')
var { ValidateSquad } = require('../schemas/validation')

var db = firebase.Database()
var ref = db.ref(config.MatchReference);

async function createMatch() {
    const user = await graphql.createMatchUser('liammolloy').catch((error) => console.error(error)) 
    const validUser = ValidateSquad(user)
    
    const opponent = await graphql.createMatchOpponent('kimber').catch((error) => console.error(error)) 
    const validOpponent = ValidateSquad(opponent)

    if (validUser.error || validOpponent.error) {
        console.log(validUser.error?.message)
        console.log(validOpponent.error?.message)
        process.exit()
    }

    console.log(opponent)

    // TODO: move to testData 
    ref.push({
        "matchId" : "-Jz3etefQ6U_T0lksKc4",
        "userId" : "liammolloy",
        "cardId" : "david-olatukunbo-alaba-2021-common-de641b06-e909-4a35-b8ad-3fa351637c1c",
        "moveId" : "A"
    }, () => {
    process.exit()
    })
}

createMatch();
