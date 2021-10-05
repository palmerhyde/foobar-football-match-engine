// move dotenv startup
const dotenv = require('dotenv');
dotenv.config();

exports.FirebaseUrl = process.env.FIREBASE_DATABASE_URL;
exports.SorareGraphQlUrl = process.env.SORARE_GRAPHQL_URL
exports.TurnReference = 'turn'
exports.MatchReference = 'match'
exports.MatchViewReference = 'matchview'
exports.CreateMatchReference = 'creatematch';

// TODO: are these still required
exports.PlayMoveEndPoint = 'PlayMove';
exports.PlayerImportEndPoint = 'PlayerImport';
exports.UserEndPoint = 'Users';