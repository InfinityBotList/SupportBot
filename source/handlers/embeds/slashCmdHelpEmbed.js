module.exports.SendSlashCmdHelpEmbed = async ({
  client,
  cmdCategory,
  cmdName,
  cmdDescription,
}) => {
  const embed = new client.Infinity_Gateway.MessageEmbed()
    .setTitle(`${cmdName} Command Information`)
    .setColor(client.color)
    .setThumbnail(client.logo)
    .setDescription(`${cmdDescription}`)
    .addFields(
      {
        name: "Prefix",
        value: `/`,
        inline: true,
      },
      {
        name: "Category",
        value: `${cmdCategory}`,
        inline: true,
      },
    )
    .setTimestamp()
    .setFooter({ text: client.footer, iconURL: client.logo });

  return embed;
};
