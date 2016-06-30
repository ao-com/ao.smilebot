var autoMessages = require('./auto_messages/init');
var Botkit = require('botkit');
var config = require('./config');
var logger = require('./logger');
var moment = require('moment');
var utilities = require('./utilities');

var controller = Botkit.slackbot();
controller.setupWebserver(3000, function(err, webserver) {
    controller.createWebhookEndpoints(webserver);
});

var bot = controller.spawn({
    token: config.BOT_TOKEN
});

bot.startRTM(function(err, bot, payload) {
    if (err) {
        logger.fatal(new Error('could not connect to slack'));
    };

    logger.info(`${config.BOT_NAME} started running in ${process.env.NODE_ENV} mode!`);
    console.log(`${config.BOT_NAME} started running in ${process.env.NODE_ENV} mode!`);
    autoMessages(bot, controller);
});