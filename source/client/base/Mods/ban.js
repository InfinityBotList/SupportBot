module.exports = {
  name: "ban",
  category: "Mods",
  disabled: false,
  description: "Ban a member from the server",
  aliases: [],
  permissions: ["BAN_MEMBERS"],

  run: async (message, args, client) => {

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(" ");

    let no_member = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("ERROR: No user provided")
      .setColor(client.color)
      .setThumbnail(client.logo)
      .setDescription("Please mention a user to ban")
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    if (!member)
      return message.reply({
        embeds: [no_member],
      });

    let no_reason = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("ERROR: Invalid reason provided")
      .setColor(client.color)
      .setThumbnail(client.logo)
      .setDescription("Please provide a reason for the ban")
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    if (!reason)
      return message.reply({
        embeds: [no_reason],
      });

    let cant_ban = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("ERROR: Ban failed")
      .setColor(client.color)
      .setThumbnail(client.logo)
      .setDescription("User is unable to be banned due to perms")
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    if (!member.bannable)
      return message.reply({
        embeds: [cant_ban],
      });

    let can_ban = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("SUCCESS: User Banned")
      .setColor(client.color)
      .setThumbnail(client.logo)
      .setDescription("User has been banned successfully!")
      .addFields(
        {
          name: "User",
          value: `\`${member.user.username}\``,
          inline: true,
        },
        {
          name: "Reason",
          value: `\`${reason}\``,
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    await message.reply({
      embeds: [can_ban],
    });

    return message.guild.members.ban(member, { reason });
  },
};
