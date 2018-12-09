const cmds = require("../commands");
const Counters = require("../my_modules/counters");
let pepeSmokeRegex = new RegExp("pepeSmoke", "g");

let chCounters = {};
let wordList = ["pepeSmoke", "Pog"];

function initCounters(ch) {
    chCounters[ch] = new Counters(wordList);
    console.log(`${ch}'s Counters: `);
    logObj(chCounters[ch]);
}

function incPepeSmoke(ch, msg) {
    let matches = msg.match(pepeSmokeRegex);
    if (matches === null || matches.length <= 0) return;
    chCounters[ch].increment("pepeSmoke", matches.length);
    console.log(`${ch}'s pepeSmokeCounter: ${chCounters[ch].getValue("pepeSmoke")}`);
}

function logObj(obj) {
    console.log(JSON.parse(JSON.stringify(obj)));
}

module.exports = {
    attachEvents: client => {
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
            if (chCounters[ch] === undefined) {
                initCounters(ch);
            }
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
                cmd(client, ch, chCounters, userstate, params);
            } else {
                incPepeSmoke(ch, msg);
            }
        });
    }
}
