module.exports = {
    Discord: {
        Tokens: {
            main: process.env.MAIN_DISCORD_TOKEN,
            dev: process.env.DEV_DISCORD_TOKEN
        }
    },
    Client: {
        ID: "818419115068751892",
        Commands: {
            prefix: "sup.",
            timeout: "10000",
            whitelist: false
        },
        Permissions: {
            base: 0,
            member: 1,
            support: 2,
            moderator: 3,
            administrator: 4,
            management: 5,
            owner: 6
        }
    }
}