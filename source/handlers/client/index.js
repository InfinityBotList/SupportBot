require("module-alias/register");
require("dotenv").config();
const Discord = require("discord.js");
const { Client, Collection, Intents } = require("discord.js");

const { log } = require("@plugins/logger/index");
const events = require("@handlers/events/index");
const config = require("@configs/main.config.js");
const perms = require("@configs/perms.config.js");
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
    repliedUser: true,
    roles: true,
  },
});

/**
 * EXPORT THE CLIENT AS A MODULE
 */
module.exports = client;

/**
 * DEFINE CUSTOM CLIENT CALLS
 */
client.Infinity_Gateway = Discord;
client.events = events;
client.logger = log;
client.config = config;
client.perms = perms;
client.utils = utils;
client.color = "#8A6AFD";
client.logo =
  "https://cdn.discordapp.com/attachments/653733403841134600/1086513475888611410/system.png";
client.glogo =
  "https://cdn.discordapp.com/attachments/653733403841134600/1080379676922490880/Infin2.png";
client.glogo2 =
  "https://cdn.discordapp.com/attachments/653733403841134600/1080379677186728026/imageedit_9_8322985005.png";
client.footer = "© Copyright 2020 - Infinity Development";

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
events.loadSlash(client);

/**
 * CLIENT PROCESS LOGGER
 * @private uncaughtException
 * @private unhandledRejection
 */
process.on("uncaughtException", (err) => {
  log(`Uncaught Exception: ${err}`, {
    header: "FATAL ERROR",
    type: "error",
  });
});

process.on("unhandledRejection", (reason, promise) => {
  log(`Unhandled Rejection: ${reason.stack}`, {
    header: "FATAL ERROR",
    type: "error",
  });
});

/**
 * LOGIN TO THE DISCORD CLIENT
 */
client.login(config.Discord.Tokens.main); // Main Client
//client.login(config.Discord.Tokens.dev); // Dev Client
