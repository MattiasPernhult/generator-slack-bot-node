var Slackbot = require('../lib/slackbot');

var token = process.env.BOT_API_KEY;
var name = process.env.BOT_NAME;

if (!token) {
  console.error('Must provide a API key for the bot');
  process.exit(1):
}

if (!name) {
  console.error('Must provide a name for the bot');
  process.exit(1);
}

var bot = new Slackbot({
    token: token,
    name: name
});

bot.run();
