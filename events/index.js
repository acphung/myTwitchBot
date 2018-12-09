const TwitchJS = require("twitch-js");
const options = require("./config");

const irc = {
    start: () => {
        const client = new TwitchJS.client(options);
        console.log(client);
    }
};

module.exports = irc;
