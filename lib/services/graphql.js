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
            user {
              profile {
                clubName 
                clubShield {
                  pictureUrl
                }
              }
            } 
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
                        gameStats(last: 1) {
                          so5Score {
                            score
                          }
                          goalAssist
                          goals
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

async function createMatchOpponent(userId) {
    const variables = {
        'id': userId
    }

    const query = gql`query createMathOpponent($id: String!) {
        user(slug: $id) {
          profile {
            clubName
            clubShield {
              pictureUrl
            }
          }
          cardsCount
          cards {
              id
              pictureUrl											
              position
              rarity
              slug
              player {
                displayName
                id
                slug
                gameStats(last: 1) {
                  so5Score {
                    score
                  }
                  goalAssist
                  goals
                  totalClearance
                  totalPass
                  totalScoringAtt
                  totalTackle
                }
              }
            }
          }
      }
    `

    const data = await client.request(query, variables) ;
    return reducers.CreateMatchOpponent(data)
}

exports.createMatchUser = createMatchUser;
exports.createMatchOpponent = createMatchOpponent;