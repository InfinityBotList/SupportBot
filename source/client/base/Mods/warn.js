const CASES = require("@handlers/mongo/schemas/userCases");
const moment = require("moment");

module.exports = {
  name: "warn",
  category: "Mods",
  disabled: false,
  description: "Warn a member of the server",
  aliases: [],
  permissions: ["MODERATE_MEMBERS"],

  run: async (message, args, client) => {
    let member = message.mentions.members.first();
    let reason = args.slice(1).join(" ");

    let no_member = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("ERROR: No user provided")
      .setColor("RED")
      .setThumbnail(client.logo)
      .setDescription("Please mention the user you want to warn")
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    let no_reason = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("ERROR: No reason provided")
      .setColor("RED")
      .setThumbnail(client.logo)
      .setDescription("Please provide a reason for the warning")
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    if (!member) return message.reply({ embeds: [no_member] });
    if (!reason) return message.reply({ embeds: [no_reason] });

    let cases = await CASES.find({
      user: member.user.id,
      guild: message.guild.id,
    });

    let self_warn = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("Why would you even?")
      .setColor("RED")
      .setThumbnail(client.logo)
      .setDescription("You really think i'm just gonna let you warn yourself?")
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    let bot_warn = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("Seriously though?")
      .setColor("RED")
      .setThumbnail(client.logo)
      .setDescription(
        "Warnings do not count towards bots. You are better off to just ban or kick them!"
      )
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    if (member == message.author) return message.reply({ embeds: [self_warn] });
    if (member.user.bot) return message.reply({ embeds: [bot_warn] });

    if (cases && cases.length == 3) {
      let embed = new client.Infinity_Gateway.MessageEmbed()
        .setTitle("Security Action Executed")
        .setColor("RED")
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(
          "Whoops, seems like this user has received to many warnings in this guild"
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

      await message.guild.members.ban(member, {
        reason: "Received 3 warnings or more!",
      });

      return message.reply({ embeds: [embed] });
    }

    let cases1 = new CASES({
      user: member.user.id,
      guild: message.guild.id,
      moderator: message.author.id,
      reason: reason,
      action: "Warn",
      case: cases.length + 1,
      time: moment(message.createdAt).format("MM/DD/YYYY HH:mm:ss A"),
    });

    cases1.save();

    let embed = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("SUCCESS: User Warned")
      .setColor(client.color)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${member.user.tag} has received a warning.`)
      .addFields(
        {
          name: "Reason",
          value: `${reason}`,
          inline: true,
        },
        {
          name: "Moderator",
          value: `${message.author.tag}`,
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    return message.reply({ embeds: [embed] });
  },
};
