const TwitchJS = require("twitch-js");
require('dotenv').config();

let pepeSmokeRegex = new RegExp("pepeSmoke", "g");
let pepeSmokeCounter = 0;

let options = {
    options: {
        debug: true
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: process.env.TWITCH_USER,
        password: process.env.TWITCH_TOKEN
    },
    // channels: ["zyfae", "giantwaffle"]
    channels: ["zyfae"]
};

let client = new TwitchJS.client(options);
client.connect();

client.on("connected", (address, port) => {
    console.log(`Address: ${address}, Port: ${port}`);
    client.action("zyfae", "Hi! This is a test bot!");
});


// TODO: NEED TO CHECK IF THE MESSAGE IS A COMMAND TO THE BOT
// MIGHT WANT TO ADD A RESET COUNTER COMMAND
// *** ADD A RESPONSE TO USER COMMAND THAT PRINTS THE COUNTER
client.on("chat", (channel, userstate, message, self) => {
    if (self) return;
    // console.log(`Channel: ${channel}, Userstate: ${userstate.username}, Message: ${message}`);
    let matches = message.match(pepeSmokeRegex);
    if (matches === null || matches.length < 1) return;
    pepeSmokeCounter += matches.length;
    console.log(` *** pepeSmokeCounter: ${pepeSmokeCounter}`);
    client.action("zyfae", `@${userstate.username}, pepeSmoke has been typed ${pepeSmokeCounter} times`);
});
