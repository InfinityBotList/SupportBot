module.exports = {
    Discord: {
        Tokens: {
            main: process.env.MAIN_DISCORD_TOKEN,
            dev: process.env.DEV_DISCORD_TOKEN
        }
    },
    Commands: {
        prefix: "sup.",
        timeout: "10000",
        whitelist: false
    }
}