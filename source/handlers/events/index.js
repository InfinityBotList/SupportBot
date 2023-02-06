const chalk = require("chalk");
const fs = require("fs");

/**
 * LOAD ALL CLIENT EVENTS
 */
const loadEvents = async function (client) {
    const eventFolders = fs.readdirSync("./src/client/events");

    for (const folder of eventFolders) {
        const eventFiles = fs
        .readdirSync(`./src/client/events/${folder}`)
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

module.exports = loadEvents;