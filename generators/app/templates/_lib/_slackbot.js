var util = require('util');
var Bot = require('slackbots');

var slackbot = function Constructor(settings) {
  this.settings = settings;
  this.settings.name = this.settings.name;
  this.user = null;
};

util.inherits(slackbot, Bot);

slackbot.prototype.run = function() {
  slackbot.super_.call(this, this.settings);

  this.on('start', this._onStart);
  this.on('message', this._onMessage);
};

slackbot.prototype._getChannelById = function(channelId)  {
  return this.channels.filter(function(item)  {
    if (item === undefined) {
      console.error('item är undefined');
    }
    return item.id === channelId;
  })[0];
};

slackbot.prototype._reply = function(originalMessage) {
  var self = this;
  var channel = self._getChannelById(originalMessage.channel);
  var message = getMessage(originalMessage);
  self.postMessageToChannel(channel.name, message, {
    as_user: true,
  });
};

var getMessage = function(originalMessage) {
  // Replace this content with your own message
  var dummyMessage = 'Dummy Message';
  return dummyMessage;
};

slackbot.prototype._isMentioningKeyword = function(message) {
  // Provide a keyword
  var keyword = '';
  return message.text.toLowerCase().indexOf(keyword) > -1 ||
    message.text.lowerCase().indexOf(this.name) > -1;
};

slackbot.prototype._isFromBot = function(message) {
  return message.user === this.user.id;
};

slackbot.prototype._isChannelConversation = function(message) {
  return typeof message.channel === 'string' &&
    message.channel[0] === 'C';
};

slackbot.prototype._isChatMessage = function(message) {
  return message.type === 'message' && Boolean(message.text);
};

slackbot.prototype._onMessage = function(message) {
  if (this._isChatMessage(message) &&
    this._isChannelConversation(message) &&
    !this._isFromBot(message) &&
    this._isMentioningKeyword(message)) {
    this._reply(message);
  }
};

slackbot.prototype._welcomeMessage = function() {
  // Proivde a welcome message
  var welcomeMessage = 'Provide a welcome message';
  this.postMessageToChannel(this.channels[0].name, welcomeMessage, {
      as_user: true,
    });
};

slackbot.prototype._loadBotUser = function() {
  var self = this;
  this.user = this.users.filter(function(user) {
    return user.name === self.name;
  })[0];
};

slackbot.prototype._onStart = function() {
  this._loadBotUser();
  this._welcomeMessage();
};

module.exports = slackbot;
