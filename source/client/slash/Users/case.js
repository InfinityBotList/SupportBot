const CASES = require("@handlers/mongo/schemas/userCases");
const moment = require("moment");

module.exports = {
  name: "case",
  category: "Users",
  description: "View case information",
  userPerms: ["none"],
  basePerms: ["none"],
  options: [
    {
      name: "user",
      description: "User to view case for",
      type: 6,
      required: true,
    },
    {
      name: "case",
      description: "Number of the case",
      type: 10,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    let member = await interaction.options.getMember("user");
    let c = await interaction.options.getNumber("case");
    let caseInfo = await CASES.findOne({
      user: member.user.id,
      guild: interaction.guild.id,
      case: c,
    });

    if (!caseInfo) {
      let embed = new client.Infinity_Gateway.MessageEmbed()
        .setTitle("ERROR: No cases found")
        .setColor(client.color)
        .setThumbnail(client.logo)
        .setDescription(
          "No case with that number exists for this user in this guild!",
        )
        .setTimestamp()
        .setFooter({ text: client.footer, iconURL: client.logo });

      return interaction.reply({ embeds: [embed] });
    } else {
      let embed = new client.Infinity_Gateway.MessageEmbed()
        .setTitle(`Details for Case #${caseInfo.case}`)
        .setColor(client.color)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setDescription("Here is some basic info about this case!")
        .addFields(
          {
            name: "Action Taken",
            value: `${caseInfo.action}`,
            inline: true,
          },
          {
            name: "Affected User",
            value: `${member.user.tag}`,
            inline: true,
          },
          {
            name: "Moderator",
            value: `${client.users.cache.get(caseInfo.moderator).tag}`,
            inline: true,
          },
          {
            name: "Action Guild",
            value: `${client.guilds.cache.get(caseInfo.guild).name}`,
            inline: true,
          },
          {
            name: "Action Time",
            value: `${caseInfo.time}`,
            inline: true,
          },
          {
            name: "Action Reason",
            value: `${caseInfo.reason}`,
            inline: true,
          },
        )
        .setTimestamp()
        .setFooter({ text: client.footer, iconURL: client.logo });

      return interaction.reply({ embeds: [embed] });
    }
  },
};
