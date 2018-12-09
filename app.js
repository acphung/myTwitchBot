/*** Resources ***/
/*
 * https: //dev.twitch.tv/docs/irc/
 * https: //docs.tmijs.org/v1.2.1/index.html
 * https: //github.com/twitch-devs/twitch-js/tree/master
 */

require('dotenv').config();
const TwitchJS = require("twitch-js");
const options = require("./config");
const events = require("./events");

// console.log(options);
let client = new TwitchJS.client(options);
client.connect();
events.attachEvents(client);

/*** Keyboard Interrupt Handler ***/
process.on("SIGINT", () => {
    client.disconnect().then(data => {
        console.log(`Successfully disconnected from address: ${data[0]}, port: ${data[1]}.`);
        process.exit();
    }).catch(reason => {
        console.log(`Disconnect Failed: ${reason}`);
        process.exit(1);
    });
});
