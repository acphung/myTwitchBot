// Init Options for Connecting to Twitch Chat
module.exports = {
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
    channels: ["zyfae", "atastyoreo"]
};
