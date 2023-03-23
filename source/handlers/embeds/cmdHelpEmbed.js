module.exports.SendCmdHelpEmbed = async ({ client, cmdCategory, cmdName, cmdDescription, aliases }) => {

    const embed = new client.Infinity_Gateway.MessageEmbed()
         .setTitle(`${cmdName} Command Information`)
         .setColor(client.color)
         .setThumbnail(client.logo)
         .setDescription(`${cmdDescription}`)
         .addFields(
          {
            name: "Prefix",
            value: `${client.config.Client.Commands.prefix}`,
            inline: true
          },
          {
            name: "Category",
            value: `${cmdCategory}`,
            inline: true
          },
          {
            name: "Aliases",
            value: `${aliases}`,
            inline: true
          }
         )
         .setTimestamp()
         .setFooter({ text: client.footer, iconURL: client.logo })

        return embed;
}