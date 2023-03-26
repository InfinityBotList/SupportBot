const { SendCmdHelpEmbed } = require("@handlers/embeds/cmdHelpEmbed");
const { filterCommands } = require("@plugins/filters/commands");

module.exports = {
  name: "help",
  category: "Info",
  disabled: false,
  description: "View our help message or get command info",
  aliases: [],
  permissions: [],

  run: async (message, args, client) => {
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
        embeds: [
          await SendCmdHelpEmbed({
            client: client,
            cmdDescription: cmd.description,
            cmdCategory: cmd.category,
            cmdName: cmdName,
            aliases: aliases,
          }),
        ],
      });
    } else {
      let embed = new client.Infinity_Gateway.MessageEmbed()
        .setTitle("Available Commands")
        .setColor(client.color)
        .setThumbnail(client.logo)
        .setDescription(
          "NOTE: use `<<help <cmdName>` to get Command Specific Help"
        )
        .addFields(
          {
            name: "Admin",
            value: await filterCommands({ client: client, category: "Admin" }),
          },
          {
            name: "About",
            value: await filterCommands({ client: client, category: "About" }),
          },
          {
            name: "Info",
            value: await filterCommands({ client: client, category: "Info" }),
          },
          {
            name: "Fun",
            value: await filterCommands({ client: client, category: "Fun" }),
          },
          {
            name: "Moderation",
            value: await filterCommands({ client: client, category: "Mods" }),
          },
          {
            name: "Users",
            value: await filterCommands({ client: client, category: "Users" }),
          }
        )
        .setTimestamp()
        .setFooter({ text: client.footer, iconURL: client.logo });

      return message.channel.send({ embeds: [embed] });
    }
  },
};
