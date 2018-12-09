/*** Resources ***/
/*
 * https: //dev.twitch.tv/docs/irc/
 * https: //docs.tmijs.org/v1.2.1/index.html
 * https: //github.com/twitch-devs/twitch-js/tree/master
 */

const TwitchJS = require("twitch-js");
const Counters = require("./my_modules/counters");
require('dotenv').config();

// Init Existing Commands
let cmds = {
    pepeSmoke
};

// Init Necessary Variables for Info Tracking
let pepeSmokeRegex = new RegExp("pepeSmoke", "g");
let chCounters = {};
let wordList = ["pepeSmoke", "Pog"];

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
    channels: ["#zyfae", "#atastyoreo"]
};

let client = new TwitchJS.client(options);
client.connect();

/*
 * On Connection Handler
 */
client.on("connected", (addr, port) => {
    console.log(`Connected to address: ${addr}, port: ${port}`);
});

/*
 * On Disconnected Handler
 */
client.on("disconnected", (reason) => {
    console.log(`Disconnected: ${reason}`);
});

/*
 * Upon joining the channel, init variables
 */
client.on("join", (ch, user, self) => {
    console.log(`Joined channel ${ch}`);
    initCounters(ch);
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
        incPepeSmoke(ch, msg);
    }
});


/*** Command Handlers ***/
/*
 * If no parameters are specified, print the # of times pepeSmoke has been typed since
 * the bot connected to the specified chat. Otherwise, reset the counter if it is the 1st
 * param given to the command.
 */
function pepeSmoke(ch, user, params) {
    if (isEmpty(params)) {
        client.say(ch, `@${user.username}, pepeSmoke has been typed ${chCounters[ch].getValue("pepeSmoke")} times.`);
    } else {
        if (params[0] === "reset") {
            chCounters[ch].reset("pepeSmoke");
            client.say(ch, "The pepeSmoke Counter has been resetted!");
        }
    }
}

/*** Utility Functions ***/
function isEmpty(array) {
    return array.length === 0;
}

function logObj(obj) {
    console.log(JSON.parse(JSON.stringify(obj)));
}

function incPepeSmoke(ch, msg) {
    let matches = msg.match(pepeSmokeRegex);
    if (matches === null || matches.length <= 0) return;
    chCounters[ch].increment("pepeSmoke", matches.length);
    console.log(`${ch}'s pepeSmokeCounter: ${chCounters[ch].getValue("pepeSmoke")}`);
}

function initCounters(ch) {
    chCounters[ch] = new Counters(wordList);
    console.log(`${ch}'s Counters: `);
    logObj(chCounters[ch]);
}

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
