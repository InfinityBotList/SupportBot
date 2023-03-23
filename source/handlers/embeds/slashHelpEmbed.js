const { filterSlash } = require("@plugins/filters/commands");

module.exports.SendSlashHelpEmbed = async({ name, client }) => {

    if (name == 'base') {

        const embed = new client.Infinity_Gateway.MessageEmbed()
          .setTitle('Help Message')
          .setColor(client.color)
          .setThumbnail(client.logo)
          .setDescription('Feeling lost? you can find some basic usage info here!')
          .setTimestamp()
          .setFooter({ text: client.footer, iconURL: client.logo })

          return embed;

    } else if (name == 'info') {

        const embed = new client.Infinity_Gateway.MessageEmbed()
          .setTitle('Info Commands')
          .setColor(client.color)
          .setThumbnail(client.logo)
          .setDescription("**PLEASE NOTE:** You can get command specific info using `/help <CommandName>`")
          .addFields(
            {
                name: "Available Commands",
                value: `${(await filterSlash({ client: client, category: "Info"}))}`,
                inline: true
            }
          )
          .setTimestamp()
          .setFooter({ text: client.footer, iconURL: client.logo })

          return embed;
    
    } else if (name == 'about') {

      const embed = new client.Infinity_Gateway.MessageEmbed()
          .setTitle('About Commands')
          .setColor(client.color)
          .setThumbnail(client.logo)
          .setDescription("**PLEASE NOTE:** You can get command specific info using `/help <CommandName>`")
          .addFields(
            {
              name: "Available Commands",
              value: `${(await filterSlash({ client: client, category: "About"}))}`,
              inline: true
            }
          )
          .setTimestamp()
          .setFooter({ text: client.footer, iconURL: client.logo });

      return embed;

    } else if (name == 'mods') {

      const embed = new client.Infinity_Gateway.MessageEmbed()
          .setTitle('Moderation Commands')
          .setColor(client.color)
          .setThumbnail(client.logo)
          .setDescription("**PLEASE NOTE:** You can get command specific info using `/help <CommandName>`")
          .addFields(
            {
              name: "Available Commands",
              value: `${(await filterSlash({ client: client, category: "Mods" }))}`,
              inline: true
            }
          )
          .setTimestamp()
          .setFooter({ text: client.footer, iconURL: client.logo });

      return embed;

    } else if (name == 'fun') {

      const embed = new client.Infinity_Gateway.MessageEmbed()
          .setTitle('Fun Commands')
          .setColor(client.color)
          .setThumbnail(client.logo)
          .setDescription("**PLEASE NOTE:** You can get command specific info using `/help <CommandName>`")
          .addFields(
            {
              name: "Available Commands",
              value: `${(await filterSlash({ client: client, category: "Fun" }))}`,
              inline: true
            }
          )
          .setTimestamp()
          .setFooter({ text: client.footer, iconURL: client.logo });

          return embed

    } else {

      return console.log("No embed name provided or name is invalid!");
    }
}