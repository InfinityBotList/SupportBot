const { SendSlashHelpEmbed } = require("@handlers/embeds/slashHelpEmbed");
const { SendSlashCmdHelpEmbed } = require("@handlers/embeds/slashCmdHelpEmbed");

module.exports = {
  name: "help",
  category: "Info",
  description: "View our help message or get command info",
  userPerms: ["none"],
  basePerms: ["none"],
  options: [
    {
      name: "command",
      description: "The name of a command to get info for",
      type: 3,
      required: false,
    },
  ],

  run: async (client, message) => {
    let cmd = client.interaction.options.getString("command");

    if (cmd && client.slash.get(cmd)) {
      const cmdFetch = client.slash.get(cmd);
      let cmdName =
        cmdFetch.name.charAt(0).toUpperCase() + cmdFetch.name.slice(1);

      return client.interaction.reply({
        embeds: [
          await SendSlashCmdHelpEmbed({
            client: client,
            cmdDescription: cmdFetch.description,
            cmdCategory: cmdFetch.category,
            cmdName: cmdName,
          }),
        ],
      });
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
                emoji: "📌",
              },
              {
                label: "About Commands",
                value: "about",
                description: "View all the About Commands",
                emoji: "🎇",
              },
              {
                label: "Moderation Commands",
                value: "mods",
                description: "View all the Moderation Commands",
                emoji: "⚜️",
              },
              {
                label: "Fun Commands",
                value: "fun",
                description: "View all the Fun Commands",
                emoji: "🎮",
              },
              {
                label: "User Commands",
                value: "users",
                description: "View all the User Commands",
                emoji: "🧘‍♂️",
              },
            ]),
        ),
      ];

      const initialMessage = await message.reply({
        embeds: [await SendSlashHelpEmbed({ name: "base", client: client })],
        components: components(false),
      });

      const collector = message.channel.createMessageComponentCollector({
        componentType: "SELECT_MENU",
        idle: 300000,
        dispose: true,
      });

      collector.on("collect", async (interaction) => {
        if (interaction.values[0] === "info") {
          interaction
            .update({
              embeds: [
                await SendSlashHelpEmbed({ name: "info", client: client }),
              ],
              components: components(false),
            })
            .catch(() => {});
        } else if (interaction.values[0] === "about") {
          interaction
            .update({
              embeds: [
                await SendSlashHelpEmbed({ name: "about", client: client }),
              ],
              components: components(false),
            })
            .catch(() => {});
        } else if (interaction.values[0] === "mods") {
          interaction
            .update({
              embeds: [
                await SendSlashHelpEmbed({ name: "mods", client: client }),
              ],
              components: components(false),
            })
            .catch(() => {});
        } else if (interaction.values[0] === "fun") {
          interaction
            .update({
              embeds: [
                await SendSlashHelpEmbed({ name: "fun", client: client }),
              ],
              components: components(false),
            })
            .catch(() => {});
        } else if (interaction.values[0] === "users") {
          interaction.update({
            embeds: [
              await SendSlashHelpEmbed({ name: "users", client: client }),
            ],
            components: components(false),
          });
        }
      });

      collector.on("end", (collected, reason) => {
        if (reason === "time") {
          initialMessage.edit({
            content: "Collector timed out...",
            components: [],
          });
        } else {
          initialMessage.edit({
            content: "Collector destroyed...",
            components: [],
          });
        }
      });
    }
  },
};
