module.exports.setClientPresence = async (client, presence) => {

    /**
     * THE CLIENT PRESENCES
     * @define - name -  The name of the presence
     * @define - type - The type of presence (playing, watching, streaming or listening)
     * @define - url - The url for the presence (if streaming) if not set leave blank with "" 
     */
    let presences = [
        {
            name: "infinitybots.gg",
            type: "WATCHING",
            url: ""
        },
        {
            name: "support.infinitybots.gg",
            type: "STREAMING",
            url: "https://twitch.tv/monstercat"
        },
        {
            name: "with the Support Panel",
            type: "PLAYING",
            url: ""
        }
    ];

    /**
     * SET THE CLIENT STATUS
     * @type idle
     * @type online
     * @type dnd
     * @type offline
     */
    client.user.setStatus("idle");

    setInterval(function () {
        let presence = presences[Math.floor(Math.random() * presences.length)];

        let presence_url;

        if (presence.url !== "") presence_url = presence.url;

        client.user.setActivity(presence.name, {
            type: presence.type,
            url: presence_url
        });
    }, 1000);
};

