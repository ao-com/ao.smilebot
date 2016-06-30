var config = require('../config');
var logger = require('../logger');
var moment = require('moment');
var Repeat = require('repeat');
var utilities = require('../utilities');

const ONE_DAY_TO_MILLISECONDS = 86400000;
const FRIDAY_DAY_OF_THE_WEEK = 5;
const SATURDAY_DAY_OF_THE_WEEK = 6;
const SUNDAY_DAY_OF_THE_WEEK = 0;

/**
 * Initialises the standup messages module.
 * @param {bot} bot - Bot to send the message.
 */
exports.init = function(bot) {
    var _this = this;
    
    config.TEAMS.forEach(function(team) {
        Repeat(function () {
            _this.standupMessage(bot, team.name, team.standupTime);
        })
        .every(ONE_DAY_TO_MILLISECONDS, 'ms')
        .start();
    }, this);
};

/**
 * Sends the standup message prompt at a given time.
 * @param {bot} bot - Bot to send the message.
 * @param {string} teamName - Name of the team to be addressed in the message.
 * @param {string} time - String representation of a JavaScript time when the standup takes place.
 */
exports.standupMessage = function(bot, teamName, time) {
    var now = moment();
    var date = now.format('YYYY-MM-DD');
    var message = {
        text: `${teamName} it's time to stand up!`,
        channel: config.MAIN_CHANNEL_ID
    };
    
    var sendDateTime = this.getNextDateForStandup(now, moment(`${date}T${time}`));
    utilities.sayAt(bot, message, sendDateTime);
};

/**
 * Gets the date for the next standup.
 * @param {moment} now - Current datetime.
 * @param {moment} standupDateTime - A moment object representing the time the standup takes place.
 */
exports.getNextDateForStandup = function(now, standupDateTime) {
    var nextStandupDate = standupDateTime;
    
    if (now >= standupDateTime && now.day() === FRIDAY_DAY_OF_THE_WEEK) {
        nextStandupDate.add(3, 'day');
    } else if (now.day() === SATURDAY_DAY_OF_THE_WEEK) {
        nextStandupDate.add(2, 'day');
    } else if (now.day() === SUNDAY_DAY_OF_THE_WEEK) {
        nextStandupDate.add(1, 'day');
    } else if (now >= standupDateTime) {
        nextStandupDate.add(1, 'day');
    };

    return nextStandupDate;
};