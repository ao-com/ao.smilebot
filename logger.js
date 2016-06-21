var bunyan = require('bunyan');
var config = require('./config');

var log = bunyan.createLogger({
    name: config.APP_NAME,
    streams: [{
        path: './log.json'
    }]
});

module.exports = log;