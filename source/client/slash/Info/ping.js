module.exports = {
    name: "ping",
    category: "Info",
    description: "Display the bots latency",
    userPerms: ["none"],
    basePerms: ["none"],

    run: async(client, interaction) => {
        const ping = new client.Infinity_Gateway.MessageEmbed()
            .setTitle("Client Ping")
            .setColor(client.color)
            .setThumbnail(client.logo)
            .addFields({
                name: "Websocket",
                value: `\`${Math.round(client.ws.ping)}ms\``,
                inline: true,
            }, {
                name: "Latency",
                value: `\`${Date.now() - interaction.createdTimestamp}ms\``,
                inline: true,
            })
            .setTimestamp()
            .setFooter({ text: client.footer, iconURL: client.logo });

        return interaction.reply({ embeds: [ping] });
    },
};