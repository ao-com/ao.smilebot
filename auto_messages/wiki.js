var config = require('../config');
var logger = require('../logger');
var utilities = require('../utilities');

/**
 * Initialises the wiki messages module.
 * @param {bot} bot - Bot to send the message.
 * @param {controller} controller - Controller to send the message.
 */
exports.init = function(bot, controller) {
    var _this = this;

    controller.hears(['wiki (.*)', 'docs (.*)'], ['direct_message' , 'direct_mention', 'mention'], function(bot, message) {
        var article = message.match[1];
        bot.reply(message, 'Placeholder!');
        
        var response = utilities.searchWiki(article);
    });
};