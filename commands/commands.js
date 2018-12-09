// let cmds = {
//     pepeSmoke
// };
let utils = require("../utils")
let Counters = require("../my_modules/counters");

module.exports = {
    /*
     * If no parameters are specified, print the # of times pepeSmoke has been typed since
     * the bot connected to the specified chat. Otherwise, reset the counter if it is the 1st
     * param given to the command.
     */
    pepeSmoke: (client, ch, chCounters, user, params) => {
        if (utils.isEmpty(params)) {
            let counters = new Counters(chCounters[ch]);
            console.log(counters);
            client.say(ch, `@${user.username}, pepeSmoke has been typed ${chCounters[ch].getValue("pepeSmoke")} times.`);
        } else {
            if (params[0] === "reset") {
                chCounters[ch].reset("pepeSmoke");
                client.say(ch, "The pepeSmoke Counter has been resetted!");
            }
        }
    }
}
