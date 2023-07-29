const { filterCommands } = require("@plugins/filters/commands");

module.exports.SendHelpEmbed = async ({ name, client }) => {
  if (name == "base") {
    const embed = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("Help Message")
      .setColor(client.color)
      .setThumbnail(client.logo)
      .setDescription("Feeling lost? you can find some basic usage info here!")
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    return embed;
  } else if (name == "info") {
    const embed = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("Info Commands")
      .setColor(client.color)
      .setThumbnail(client.logo)
      .setDescription(
        "**PLEASE NOTE:** You can get command specific info using `<<help <CommandName>`",
      )
      .addFields({
        name: "Available Commands",
        value: `${await filterCommands({ client: client, category: "Info" })}`,
        inline: true,
      })
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    return embed;
  } else if (name == "about") {
    const embed = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("About Commands")
      .setColor(client.color)
      .setThumbnail(client.logo)
      .setDescription(
        "**PLEASE NOTE:** You can get command specific info using `<<help <CommandName>`",
      )
      .addFields({
        name: "Available Commands",
        value: `${await filterCommands({ client: client, category: "About" })}`,
        inline: true,
      })
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    return embed;
  } else if (name == "mods") {
    const embed = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("Moderation Commands")
      .setColor(client.color)
      .setThumbnail(client.logo)
      .setDescription(
        "**PLEASE NOTE:** You can get command specific info using `<<help <CommandName>`",
      )
      .addFields({
        name: "Available Commands",
        value: `${await filterCommands({ client: client, category: "Mods" })}`,
        inline: true,
      })
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    return embed;
  } else if (name == "admin") {
    const embed = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("Admin Commands")
      .setColor(client.color)
      .setThumbnail(client.logo)
      .setDescription(
        "**PLEASE NOTE:** You can get command specific info using `<<help <CommandName>`",
      )
      .addFields({
        name: "Available Commands",
        value: `${await filterCommands({ client: client, category: "Admin" })}`,
        inline: true,
      })
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    return embed;
  } else {
    return console.log("No embed name provided or name is invalid!");
  }
};
