# FooBar Football Match Engine

## Come and av a go if ya think ya foobar enough!

FooBar Football is designed to be a "Utility" game bringing portability to your Sorare cards. You play FooBar Football with the Sorare cards you own.

FooBar Football is a CCG / LCG card game based upon football. Inspired by Magic the Gathering, Football Manager, FIFA Ultimate team, Match Atax, Kampion, WWE Supercard, Yomi, Fantasy Football and a host of other games.

Read more at the WIKI.
https://github.com/palmerhyde/FooBar-Football-Match-Engine/wiki

## Development

### Testing
```
npm test
npm run coverage
```

* Joi for schema validation
* testData
* Mocha and Istanbal for test coverage

### Firebase
* [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)

#### reference create-match
The create match reference is where game clients send a request to create a new match. The ganme server listens to this reference, validates the request and creates a new match.

#### reference - turn
The turn refernce is where game clients send their turn data. The game server listens to the turn reference, validates the turn and plays the turn.

#### reference - match 
The match reference is where matches in-progress are stored. For security reasons, only the game server can manipulate this reference

### Sorare API
* [GraphQL](https://github.com/sorare/api)
* [GraphQL Playgound](https://api.sorare.com/graphql/playground)

### Configuration

#### Environment Variables
dotenv is used to set environment variables at startup. Ensure you add a .env file to the root of the project. Take a look at .env.example for a list of environment variables you need to set.