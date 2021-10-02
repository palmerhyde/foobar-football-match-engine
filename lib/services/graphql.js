var { GraphQLClient, gql } = require('graphql-request');
var reducers = require('../schemas/graphReducers')
var config = require('../config');

const client = new GraphQLClient(config.SorareGraphQlUrl, { headers: {} })

async function createMatchUser(userId) {
    const variables = {
        'id': userId + '-custom-foobarfootball'
    }
    
    const query = gql` query createMatchUser($id: String!) {
        customDeck (slug:$id) {
            name 
            cards {
                nodes {
                    id
                    pictureUrl
                    position
                    rarity
                    slug
                    player {
                        displayName 
                        id
                        slug
                        so5Scores(last: 1) {
                            score
                            playerGameStats {
                                goalAssist
                                goals
                            }
                        }
                    }
                }
            }
        }
    }
    `

    const data = await client.request(query, variables) ;
    return reducers.CreateMatchUser(data)
}

exports.createMatchUser = createMatchUser;