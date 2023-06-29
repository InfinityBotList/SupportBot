module.exports.setClientPresence = async(client, initialPresence) => {
    /**
     * THE CLIENT PRESENCES
     * @define - name -  The name of the presence
     * @define - type - The type of presence (playing, watching, streaming or listening)
     * @define - url - The url for the presence (if streaming) if not set leave blank with ""
     */
    const presences = [{
            name: "Help: <<help",
            type: "PLAYING",
            url: "",
        },
        {
            name: "with the Support Panel",
            type: "PLAYING",
            url: "",
        },
    ];

    /**
     * CHOOSE BETWEEN THE CLIENT STATUS
     * @type idle
     * @type online
     * @type dnd
     * @type offline
     */
    const status = "idle";
    client.user.setStatus(status);

    setInterval(() => {
        const { name, type, url } = presences[Math.floor(Math.random() * presences.length)];
        const presenceUrl = url !== "" ? url : undefined;

        client.user.setActivity(name, {
            type,
            url: presenceUrl,
        });
    }, 1000);
};