const chalk = require('chalk');

console.log(chalk.blue('FooBar Football server starting...'));
const createMatchListener = require('./lib/listeners/create-match');
const matchListener = require('./lib/listeners/match');
const turnListener = require('./lib/listeners/turn');

createMatchListener.ListenToCreateMatchReference();
matchListener.ListenToMatchReference();
turnListener.ListenToTurnReference();