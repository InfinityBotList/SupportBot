module.exports.setClientPresence = async (client, presence) => {

    let presences = [
        {
            name: "https://infinitybots.gg",
            type: "WATCHING"
        },
        {
            name: "Answering questions",
            type: "STREAMING",
            url: "https://twitch.tv/monstercat"
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

        client.user.setActivity(presence.name, {
            type: presence.type,
            url: presence.url ? presence.url : null
        });
    }, 10000);
};

