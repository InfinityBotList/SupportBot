module.exports = {
  name: "unban",
  category: "Mods",
  description: "UnBan a member from the server",
  userPerms: ["none"],
  basePerms: ["BAN_MEMBERS"],
  options: [
    {
      name: "user",
      description: "The id of the user you want to unban",
      type: "STRING",
      required: true,
    },
  ],

  run: async (client, interaction) => {
    let member = interaction.options.getString("user");

    let no_id = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("ERROR: No user provided")
      .setColor(client.color)
      .setThumbnail(client.logo)
      .setDescription("Please provide a user id to unban")
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    if (!member)
      return interaction.reply({
        embeds: [no_id],
        ephemeral: true,
      });

    await interaction.guild.members.unban(member);

    let unbanned = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("[MOD]: User Unbanned")
      .setColor(client.color)
      .setThumbnail(client.logo)
      .setDescription(`<@!${member}> (${member}) has been unbanned`)
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    return interaction.reply({
      embeds: [unbanned],
      ephemeral: true,
    });
  },
};
