// move dotenv startup
const dotenv = require('dotenv');
dotenv.config();

exports.FirebaseUrl = process.env.FIREBASE_DATABASE_URL;
exports.TurnReference = 'turn'
exports.MatchEndPoint = 'Match';
exports.QueueEndPoint = 'Queues';
exports.PlayMoveEndPoint = 'PlayMove';
exports.PlayerImportEndPoint = 'PlayerImport';
exports.CreateMatchEndPoint = 'CreateMatch';
exports.UserEndPoint = 'Users';
exports.Match = {
    attributes : [
      'Defending',
      'Dribbling',
      'Passing',
      'Physical',
      'Shooting',
      'Sweat'
    ],
    keeperAttributes : [
      'Diving',
      'Handling',
      'Kicking',
      'Positioning',
      'Reflex',
      'Speed'
    ],
    synergy : [
      'Club',
      'Nation'
    ],
    minimumChances : 4,
    maximumChances : 10,
    minutes : 90
};