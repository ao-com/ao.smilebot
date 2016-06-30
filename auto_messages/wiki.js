var config = require('../config');
var logger = require('../logger');
var utilities = require('../utilities');
var cheerio = require('cheerio');

/**
 * Initialises the wiki messages module.
 * @param {bot} bot - Bot to send the message.
 * @param {controller} controller - Controller to send the message.
 */
exports.init = function (bot, controller) {
    var _this = this;

    var searchWikiSuccess = function(bot, message, res) {
        var $ = cheerio.load(res);
        var links = $(config.WIKI_RESULT_SELECTOR);

        var results = $(links).map(function (i, el) {
            return $(this).text() + ' ' + config.WIKI_ROOT + encodeURI($(this).attr('href'));
        }).get().join('\n');

        if (results === '') {
            bot.reply(message, 'No results!');
        };

        bot.reply(message, results);
    };

    controller.hears(['wiki (.*)', 'docs (.*)'], ['direct_message', 'direct_mention', 'mention', 'ambient'], function (bot, message) {
        var article = message.match[1];

        utilities.searchWiki(config.WIKI_SEARCH_URL, article).then(function(res) {
            searchWikiSuccess(bot, message, res);
        });
    });
};