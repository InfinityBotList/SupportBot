module.exports = {
    name: "ready",
    once: true,

    async execute(client) {
        
        await client.logger.SendLogs("Connecting to the Discord API...", "event");

        try {
            await client.utils.setClientPresence(client);
            
            return client.logger.SendLogs("Connected to the Discord API Successfully", "ready");
        } catch (err) {
            return client.SendLogs(`Unable to establish connection: ${err.stack}`, "error");
        }
    }
}