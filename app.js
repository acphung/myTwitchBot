const TwitchJS = require("twitch-js");
require('dotenv').config();

// Init Existing Commands
let cmds = {
    pepeSmoke
};

// Init Necessary Variables for Info Tracking
let pepeSmokeRegex = new RegExp("pepeSmoke", "g");
let pepeSmokeCounter = 0;

// Init Options for Connecting to Twitch Chat
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
    client.action("zyfae", "myTwitchBot connected! This is a test bot I am playing around with.");
});

/*
 * Logs chat and perform commands when found.
 * If command is not found, track specified info
 * from chat.
 */
client.on("chat", (ch, userstate, msg, self) => {
    // Ignore Bot's own messages
    if (self) return;

    // Check if msg is a command
    if (msg.substring(0, 1) === "!") {
        let tokens = msg.split(" ");
        let cmdName = tokens[0].substring(1, tokens[0].length);
        if (!(cmdName in cmds)) return;
        let cmd = cmds[cmdName];
        let params = tokens.slice(1, tokens.length);
        cmd(ch, userstate, params);
    } else {
        let matches = msg.match(pepeSmokeRegex);
        if (matches === null || matches.length <= 0) return;
        pepeSmokeCounter += matches.length;
    }
});


/*** Command Handlers ***/
/*
 * If no parameters are specified, print the # of times pepeSmoke has been typed since
 * the bot connected to the specified chat. Otherwise, reset the counter if it is the 1st
 * param given to the command.
 */
function pepeSmoke(ch, user, params) {
    // console.log(params);
    // client.action(ch, `@${user.username}, You used the command !pepeSmoke.`);
    if (isEmpty(params)) {
        client.action(ch, `@${user.username}, pepeSmoke has been typed ${pepeSmokeCounter} times.`);
    } else {
        if (params[0] === "reset") {
            pepeSmokeCounter = 0;
            client.action(ch, "The pepeSmoke counter has been resetted!");
        }
    }
}

/*** Utility Functions ***/
function isEmpty(array) {
    return array.length === 0;
}
