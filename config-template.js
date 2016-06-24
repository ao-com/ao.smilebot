var APP_NAME = '';
var BOT_NAME = '';
var BOT_TOKEN = '';       // Slack Bot Token
var MAIN_CHANNEL_ID = ''; // Main channel for your bot
var WIKI_URL = '';        // Your wiki search url
var TEAMS = [
    {
        name: 'Some Team',
        standupTime: '09:00:00.000'
    }
];

// Production overrides
if (process.env.NODE_ENV === 'production') {
    MAIN_CHANNEL_ID = '';
};

module.exports = {
    APP_NAME: APP_NAME,
    BOT_NAME: BOT_NAME,
    BOT_TOKEN: BOT_TOKEN,
    MAIN_CHANNEL_ID: MAIN_CHANNEL_ID,
    TEAMS: TEAMS
};