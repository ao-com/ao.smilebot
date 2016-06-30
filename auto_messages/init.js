var config = require('../config');
var standups = require('./standups');
var wiki = require('./wiki');

function init(bot, controller) {
    standups.init(bot);
    wiki.init(bot, controller);
};

module.exports = init;