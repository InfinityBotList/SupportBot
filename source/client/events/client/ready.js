module.exports = {
    name: "ready",
    once: true,

    async execute(client) {
        
        await client.logger("Connecting to the Discord API...", {
            header: "CLIENT START-UP",
            type: "start"
        });

        try {
            await client.utils.setClientPresence(client);
            
            return client.logger("Connected to the Discord API Successfully", {
                header: "CLIENT START-UP",
                type: "ready"
            });
        } catch (err) {
            return client.logger(`Unable to establish connection: ${err.stack}`, {
                header: "CLIENT START-UP",
                type: "error"
            });
        }
    }
}