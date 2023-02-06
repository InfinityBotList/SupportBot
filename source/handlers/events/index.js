const chalk = require("chalk");
const fs = require("fs");

/**
 * LOAD ALL CLIENT EVENTS
 */
const loadEvents = async function (client) {
    const eventFolders = fs.readdirSync("./source/client/events");

    for (const folder of eventFolders) {
        const eventFiles = fs
        .readdirSync(`./source/client/events/${folder}`)
        .filter((file) => file.endsWith(".js"));

        for (const file of eventFiles) {
            const event = require(`../../client/events/${folder}/${file}`);

            if (event.name) {
                client.logger.SendLogs(`[EVENTS] Loaded event: [${folder}/${file}.js] Successfully`, "event");
            } else { 
                client.logger.SendLogs(`[EVENTS] Event load failed: [${folder}/${file}.js] is missing a file name or name is not a string`);

                continue;
            }

            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
};

/**
 * LOAD ALL CLIENT SLASH COMMANDS
 */
const loadSlash = async function(client) {
    let slash = [];

    const commandFolders = fs.readdirSync("./source/client/slash");

    for (const folder of commandFolders) {
        const commandFiles = fs
        .readdirSync(`./source/client/slash/${folder}`)
        .filter((file) => file.endsWith(".js"));

        for (const file of commandFiles) {
            const command = require(`../../client/slash/${folder}/${file}`);

            if (command.name) {
                client.slash.set(command.name, command);

                slash.push(command);

                client.logger.SendLogs(`Loaded Command: [${folder}/${file}.js] successfully`, "cmd");
            } else {
                return client.logger.SendLogs(`Error Loading Command: [${folder}/${file}.js] is missing a name or the name is not a string!`);
            }
        }
    }
}

/**
 * LOAD ALL CLIENT PREFIX COMMANDS
 */
const loadBase = async function(client) {
    fs.readdirSync("./source/client/base").forEach((dir) => {
        const commandFiles = fs.readdirSync(`./source/client/base/${dir}/`).filter((f) => f.endsWith(".js"));

        for (const file of commandFiles) {
            const command = require(`../../client/base/${dir}/${file}`);

            client.logger.SendLogs(`Loading command: ${command.name}`, "cmd");

            client.commands.set(command.name, command);

            if (command.aliases && Array.isArray(command.aliases)) {
                for (let i = 0; i < command.aliases.length; i++) {
                    client.aliases.set(command.aliases[i], command);
                }

                client.logger.SendLogs(`Loading command: ${command.name} with aliases: ${command.aliases}`);
            }
        }
    })
}

/**
 * REGISTER THE SLASH COMMANDS GLOBALLY
 */
client.on("ready", async() => {
    client.application.commands.set(slash).then(() => {
        client.logger.SendLogs("Slash commands have been registered successfully", "ready");
    }).catch((e) => {
        client.logger.SendLogs(`Failed to register slash commands: ${e.stack}`, "error");
    })
})

module.exports = {
    loadEvents,
    loadSlash,
    loadBase
};