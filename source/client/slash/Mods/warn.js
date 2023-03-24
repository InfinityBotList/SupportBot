const CASES = require("@handlers/mongo/schemas/userCases");
const moment = require("moment");

module.exports = {
  name: "warn",
  category: "Mods",
  description: "Warn a Server Member",
  userPerms: ["MODERATE_MEMBERS "],
  basePerms: ["MODERATE_MEMBERS"],
  options: [
    {
      name: "user",
      description: "The user you want to warn",
      type: 6,
      required: true,
    },
    {
      name: "reason",
      description: "Reason for the warning",
      type: "STRING",
      required: true,
    },
  ],

  run: async (client, interaction) => {
    let member = await interaction.options.getMember("user");
    let reason = await interaction.options.getString("reason");
    let cases = await CASES.find({
      user: member.user.id,
      guild: interaction.guild.id,
    });

    let SelfWarn = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("Why would you even?")
      .setColor(client.color)
      .setThumbnail(client.logo)
      .setDescription("You really think i'm just gonna let you warn yourself?")
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    let BotWarn = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("Seriously though?")
      .setColor(client.color)
      .setThumbnail(client.logo)
      .setDescription(
        "Warnings don't count towards bots you are better off to just ban or kick them!"
      )
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    if (member == interaction.member)
      return interaction.reply({ embeds: [SelfWarn], ephemeral: true });

    if (member.user.bot)
      return interaction.reply({ embeds: [BotWarn], ephemeral: true });

    if (cases && cases.length == 3) {
      let embed = new client.Infinity_Gateway.MessageEmbed()
        .setTitle("Security Action Executed")
        .setColor("RED")
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(
          "Whoops, seems like this user has received to many warnings in this guild!"
        )
        .addFields(
          {
            name: "User",
            value: `${member.user.tag}`,
            inline: true,
          },
          {
            name: "Warnings Received",
            value: `${cases.length}`,
            inline: true,
          },
          {
            name: "Warnings Allowed",
            value: "``3``",
            inline: true,
          }
        )
        .setTimestamp()
        .setFooter({ text: client.footer, iconURL: client.logo });

      await interaction.guild.members.ban(member, {
        reason: "Received 3 warnings or more!",
      });

      return interaction.reply({ embeds: [embed] });
    }

    let cases1 = new CASES({
      user: member.user.id,
      guild: interaction.guild.id,
      reason: reason,
      action: "Warn",
      moderator: interaction.member.user.id,
      case: cases.length + 1,
      time: moment(interaction.createdAt).format("MM/DD/YYYY HH:mm:ss A"),
    });

    cases1.save();

    let embed = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("SUCCESS: User Warned!")
      .setColor(client.color)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${member.user.tag} has received a warning!`)
      .addFields(
        {
          name: "Reason",
          value: `${reason}`,
          inline: false,
        },
        {
          name: "Moderator",
          value: `${interaction.user.username}#${interaction.member.user.discriminator}`,
          inline: false,
        }
      )
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    return interaction.reply({ embeds: [embed] });
  },
};
