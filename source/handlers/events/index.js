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
                client.logger(`Loaded event: [${event.name}] Successfully`, {
                    header: "CLIENT EVENTS",
                    type: "ready"
                })
            } else { 
                client.logger(`[EVENTS] Event: [${file}] is missing a name or name is not a string`, {
                    header: "CLIENT EVENTS",
                    type: "error"
                });

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

                client.logger(`Loaded Command: [${command.name}] successfully`, {
                    header: "SLASH COMMANDS",
                    type: "slash"
                })
            } else {
                return client.logger(`Error Loading Command: [${file}] is missing a name or name is not a valid string`, {
                    header: "SLASH COMMANDS",
                    type: "error"
                })
            }
        }
    }

    /**
 * REGISTER THE SLASH COMMANDS GLOBALLY
 */
    client.on("ready", async() => {
        client.application.commands.set(slash).then(() => {
            client.logger("Slash command have been registered with the Discord API", {
                header: "DISCORD APPLICATION REGISTRY",
                type: "ready"
            })
    }).catch((e) => {
        client.logger(`Failed to register slash commands: ${e.stack}`, {
            header: "DISCORD APPLICATION REGISTRY",
            type: "warning"
        })
    })
  })
}

/**
 * LOAD ALL CLIENT PREFIX COMMANDS
 */
const loadBase = async function(client) {
    fs.readdirSync("./source/client/base").forEach((dir) => {
        const commandFiles = fs.readdirSync(`./source/client/base/${dir}/`).filter((f) => f.endsWith(".js"));

        for (const file of commandFiles) {
            const command = require(`../../client/base/${dir}/${file}`);

            client.logger(`Loading command: ${command.name}`, {
                header: "PREFIX COMMANDS",
                type: "command"
            })

            client.commands.set(command.name, command);

            if (command.aliases && Array.isArray(command.aliases)) {
                for (let i = 0; i < command.aliases.length; i++) {
                    client.aliases.set(command.aliases[i], command);
                }

                client.logger(`Loading command: ${command.name} | Aliases: ${command.aliases}`, {
                    header: "PREFIX COMMANDS",
                    type: "command"
                })
            }
        }
    })
}


module.exports = {
    loadEvents,
    loadSlash,
    loadBase
};