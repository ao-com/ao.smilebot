var config = require('./config');
var logger = require('./logger');
var moment = require('moment');

/**
 * Sends a message at a given time.
 * @param {bot} bot - Bot to send the message.
 * @param {message} message - Message to be sent.
 * @param {moment} datetime - The date and time the message should be sent.
 */
exports.sayAt = function(bot, message, datetime) {
    var now = moment();

    var sayPromise = function(resolve, reject) {
        if (now >= datetime) {
            var err = new Error('datetime must be in the future');
            
            logger.warn(err);
            reject(err);
        } else {
            logger.info(`${config.BOT_NAME} is going to say "${message.text}" at ${datetime}`);

            var duration = moment.duration(datetime.diff(now));
            var miliseconds = duration.asMilliseconds();

            setTimeout(function() {
                bot.say(message, function(err, res) {
                    if (err) {
                        logger.error(err);
                    } else {
                        logger.info(`${config.BOT_NAME} said "${message.text}"`);
                    };
                });
            }, miliseconds);

            resolve(true);
        };
    };
    
    return new Promise(sayPromise); 
};

/**
 * Checks given value to see if data type is of integer.
 * @param {any} value - Value to test if integer.
 */
exports.isInt = function(value) {
    var x;
    if (isNaN(value)) {
        return false;
    };

    x = parseFloat(value);
    return (x | 0) === x;
};

/**
 * Parses a given url using a specified regular expression, and returns the results.
 */
exports.searchWiki = function(searchTerm) {
    var request = require('sync-request');
    var res = request('GET', 'http://google.com');
    return res.body.toString('utf-8');
};