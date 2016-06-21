var config = require('../config');
var standups = require('./standups');

function init(bot) {
    standups.init(bot);
};

module.exports = init;