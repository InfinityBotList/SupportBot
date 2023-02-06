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
client.color = "#E9F535";
client.logo = "https://cdn.discordapp.com/attachments/653733403841134600/906287522068439080/imageedit_3_3710163012.png"
client.footer = "v0.0.1 • © Copyright 2023 - Infinity Development"

/**
 * DEFINE THE CLIENT COLLECTIONS
 */
client.slash = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.category = new Collection();
client.limits = new Map();

events.loadEvents(client);
events.loadBase(client);

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
client.login(config.Discord.Tokens.main) // Main Client
//client.login(config.Discord.Tokens.dev) // Dev Client

