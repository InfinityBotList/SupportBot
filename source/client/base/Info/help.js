const { SendHelpEmbed } = require("@handlers/embeds/helpEmbeds");
const { SendCmdHelpEmbed } = require("@handlers/embeds/cmdHelpEmbed");

module.exports = {
    name: "help",
    category: "Info",
    disabled: false,
    description: "View our help message or get command info",
    aliases: [],
    permissions: [],

    run: async(message, args, client) => {

      if (args[0] && client.commands.get(args[0])) {

        const cmd = client.commands.get(args[0]);
        let cmdName = cmd.name.charAt(0).toUpperCase() + cmd.name.slice(1);

        let aliases = "No alias(es) available";

        if (cmd.aliases.length === 0) {
          aliases = "No alias(es) available";
        } else {
          aliases = cmd.aliases.join(" , ");
        }

        return message.channel.send({ 
          embeds: [(await SendCmdHelpEmbed({ 
            client: client,
            cmdDescription: cmd.description,
            cmdCategory: cmd.category,
            cmdName: cmdName,
            aliases: aliases
          }))] 
        })
      
      } else {

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
                    },
                    {
                      label: "Administration Commands",
                      value: "admin",
                      description: "View all the Admin Commands",
                      emoji: "👑"
                  }
                ])
            ),
          ];

          const initialMessage = await message.reply({ embeds: 
            [(await SendHelpEmbed({ name: 'base', client: client }))], 
            components: components(false)
          });

          const collector = message.channel.createMessageComponentCollector({
            componentType: "SELECT_MENU",
            idle: 300000,
            dispose: true
          });

          collector.on("collect", async (interaction) => {
            if (interaction.values[0] === "info") {
                interaction.update({ embeds: [(await SendHelpEmbed({ name: 'info', client: client }))], components: components(false) }).catch(() => {});
            } else if (interaction.values[0] === "about") {
              interaction.update({ embeds: [(await SendHelpEmbed({ name: 'about', client: client }))], components: components(false) }).catch(() => {});
            } else if (interaction.values[0] === "mods") {
              interaction.update({ embeds: [(await SendHelpEmbed({ name: 'mods', client: client }))], components: components(false)}).catch(() => {});
            } else if (interaction.values[0] === 'admin') {
              interaction.update({ embeds: [(await SendHelpEmbed({ name: 'admin', client: client }))], components: components(false)}).catch(() => {});
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
}