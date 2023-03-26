const CASES = require("@handlers/mongo/schemas/userCases");
const moment = require("moment");

module.exports = {
  name: "warns",
  category: "Users",
  disabled: false,
  description: "Check a members warnings in this server",
  aliases: [],
  permissions: [],

  run: async (message, args, client) => {
    let member = message.mentions.members.first();

    let no_member = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("ERROR: No user provided")
      .setColor("RED")
      .setThumbnail(client.logo)
      .setDescription(
        "Please mention the user you want to check a warnings for"
      )
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    if (!member) return message.reply({ embeds: [no_member] });
    let cases = await CASES.find({
      user: member.user.id,
      guild: message.guild.id,
      action: "Warn",
    });

    if (!cases || cases == null || cases == undefined || cases.length == 0) {
      let embed = new client.Infinity_Gateway.MessageEmbed()
        .setTitle("ERROR: No cases found")
        .setColor("RED")
        .setDescription("Whoops looks like this user has not been warned here!")
        .setTimestamp()
        .setFooter({ text: client.footer, iconURL: client.logo });

      return message.reply({ embeds: [embed] });
    } else {
      let embed = new client.Infinity_Gateway.MessageEmbed()
        .setTitle(`Warnings for: ${member.user.tag}`)
        .setColor(client.color)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setDescription("**NOTE:** 3 Cases or more should result in a ban!")
        .addFields(
          {
            name: "User",
            value: `${member.user.tag}`,
            inline: true,
          },
          {
            name: "Warnings",
            value: `${cases.length}`,
            inline: true,
          },
          {
            name: "Case Numbers",
            value: `${cases.map((c) => c.case)}`,
            inline: true,
          }
        )
        .setTimestamp()
        .setFooter({ text: client.footer, iconURL: client.logo });

      return message.reply({ embeds: [embed] });
    }
  },
};
