module.exports = {
    Discord: {
        Tokens: {
            main: process.env.MAIN_DISCORD_TOKEN,
            dev: process.env.DEV_DISCORD_TOKEN
        }
    },
    Database: {
        mongo: process.env.MONGO_STRING
    },
    Client: {
        ID: "818419115068751892",
        Commands: {
            prefix: "en.",
            timeout: "10000",
            whitelist: false
        }
    }
}