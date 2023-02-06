const { MessageEmbed, MessageSelectMenu, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "ping",
    category: "Info",
    disabled: false,
    description: "Display the bots latency",
    aliases: [],
    permissions: [],

    run: async(message, args, client) => {

        const ping = new MessageEmbed()
          .setTitle("Client Ping")
          .setColor(client.color)
          .setThumbnail(client.logo)
          .addFields(
            {
                name: "Websocket",
                value: `\`${Math.round(client.ws.ping)}ms\``,
                inline: true
            },
            {
                name: "Latency",
                value: `\`${Date.now() - message.createdTimestamp}ms\``,
                inline: true
            }
          )
          .setTimestamp()
          .setFooter({ text: client.footer, iconURL: client.logo });

          return message.reply({ embeds: [ping] });
    }
}