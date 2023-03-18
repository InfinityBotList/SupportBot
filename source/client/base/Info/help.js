module.exports = {
    name: "help",
    category: "Info",
    disabled: false,
    description: "Help Message and Commands",
    aliases: [],
    permissions: [],

    run: async(message, interaction, client) => {


        const base = new client.Infinity_Gateway.MessageEmbed()
          .setTitle('Help Message')
          .setColor(client.color)
          .setThumbnail(client.logo)
          .setDescription('Feeling lost? you can find some basic usage info here. You can also check out the support articles below!')
          .setTimestamp()
          .setFooter({ text: client.footer, iconURL: client.logo })

        const info = new client.Infinity_Gateway.MessageEmbed()
          .setTitle('Info Commands')
          .setColor(client.color)
          .setThumbnail(client.logo)
          .setDescription("**PLEASE NOTE:** These commands are prefix based!")
          .addFields(
            {
                name: "<<help",
                value: "Displays this help message and usage info",
                inline: true
            },
            {
                name: "<<ping",
                value: "Show the bots latency and response time",
                inline: true
            }
          )
          .setTimestamp()
          .setFooter({ text: client.footer, iconURL: client.logo })

        const about = new client.Infinity_Gateway.MessageEmbed()
          .setTitle('About Commands')
          .setColor(client.color)
          .setThumbnail(client.logo)
          .setDescription("**PLEASE NOTE:** These commands are prefix based!")
          .addFields(
            {
              name: "<<links",
              value: "Displays a list of our useful links",
              inline: true
            },
            {
              name: "<<support",
              value: "Some of our useful help desk links",
              inline: true
            }
          )
          .setTimestamp()
          .setFooter({ text: client.footer, iconURL: client.logo });

        const mods = new client.Infinity_Gateway.MessageEmbed()
          .setTitle('Moderation Commands')
          .setColor(client.color)
          .setThumbnail(client.logo)
          .setDescription("**PLEASE NOTE:** These commands are prefix based!")
          .addFields(
            {
              name: "<<ban",
              value: "Ban a member from the server",
              inline: true
            },
            {
              name: "<<unban",
              value: "Unban a member from the server",
              inline: true
            }
          )
          .setTimestamp()
          .setFooter({ text: client.footer, iconURL: client.logo });

          /**
           * INTERACTIONS AND SELECT MENU
           */
          const components = (state) => [
            new client.Infinity_Gateway.MessageActionRow().addComponents(
                new client.Infinity_Gateway.MessageSelectMenu()
                .setCustomId("help-menu")
                .setPlaceholder("Select a command category")
                .setDisabled(state)
                .addOptions([
                    {
                        label: "Info Commands",
                        value: "info",
                        description: "View all the Info Commands",
                        emoji: "📌"
                    },
                    {
                        label: "About Commands",
                        value: "about",
                        description: "View all the About Commands",
                        emoji: "🎇"
                    },
                    {
                        label: "Moderation Commands",
                        value: "mods",
                        description: "View all the Moderation Commands",
                        emoji: "⚜️"
                    }
                ])
            ),
          ];

          const initialMessage = await message.reply({ embeds: [base], components: components(false)});

          const collector = message.channel.createMessageComponentCollector({
            componentType: "SELECT_MENU",
            idle: 300000,
            dispose: true
          });

          collector.on("collect", (interaction) => {
            if (interaction.values[0] === "info") {
                interaction.update({ embeds: [info], components: components(false) }).catch(() => {});
            } else if (interaction.values[0] === "about") {
              interaction.update({ embeds: [about], components: components(false) }).catch(() => {});
            } else if (interaction.values[0] === "mods") {
              interaction.update({ embeds: [mods], components: components(false)}).catch(() => {});
            }
          })

          collector.on("end", (collected, reason) => {
            if (reason === "time") {
                initialMessage.edit({
                    content: "Collector timed out...",
                    components: []
                });
            } else {
                initialMessage.edit({
                    content: "Collector destroyed...",
                    components: []
                });
            }
          });
    }
}