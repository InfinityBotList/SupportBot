require("module-alias/register");
require("dotenv").config();

const { Discord, Client, Collection, Intents } = require("discord.js");

const logger = require("@plugins/logger/index");
const events = require("@handlers/events/index");
const config = require("@configs/main.config.js");
const utils = require("@handlers/discord/presence");

/**
 * INITIALIZE THE DISCORD CLIENT
 */
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ],
    partials: ["CHANNEL", "REACTION", "GUILD_MEMBER", "MESSAGE", "USER"],
    allowedMentions: {
        repliedUser: true
    }
});

/**
 * EXPORT THE CLIENT AS A MODULE
 */
module.exports = client;

/**
 * DEFINE CUSTOM CLIENT CALLS
 */
client.Infinity = Discord;
client.events = events;
client.logger = logger;
client.config = config;
client.utils = utils;

/**
 * DEFINE THE SLASH COMMANDS COLLECTION
 */
client.slash = new Collection();

/**
 * CLIENT PROCESS LOGGER
 * @private uncaughtException
 * @private unhandledRejection
 */
process.on("uncaughtException", (err) => {
    logger.SendLogs(`[FATAL] Uncaught Exception: ${err}`, "error");
});

process.on("unhandledRejection", (reason, promise) => {
    logger.SendLogs(`[FATAL] Unhandled Rejection: ${reason.message}`, "error");
});

/**
 * LOGIN TO THE DISCORD CLIENT
 */
//client.login("") // Main Client
client.login("") // Dev Client

