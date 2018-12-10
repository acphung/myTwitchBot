const utils = require("../utils")

module.exports = {
    /*
     * If no parameters are specified, print the # of times pepeSmoke has been typed since
     * the bot connected to the specified chat. Otherwise, reset the counter if it is the 1st
     * param given to the command.
     */
    pepeSmoke: (client, ch, chCounters, user, params) => {
        if (utils.isEmpty(params)) {
            client.say(ch, `@${user.username}, pepeSmoke has been typed ${chCounters[ch].counters["pepeSmoke"]} times.`);
        } else {
            if (params[0] === "reset") {
                chCounters[ch].counters["pepeSmoke"] = 0;
                client.say(ch, "The pepeSmoke Counter has been resetted!");
            }
        }
    }
}
