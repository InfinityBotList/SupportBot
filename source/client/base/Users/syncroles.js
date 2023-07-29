const CASES = require("@handlers/mongo/schemas/userCases");
const moment = require("moment");
const url = require("snekfetch");

module.exports = {
  name: "syncroles",
  category: "Users",
  disabled: false,
  description: "Sync a bots pending approval roles",
  aliases: [],
  permissions: [],

  run: async (message, args, client) => {
    if (message.guild.id !== "870952645811134475") return;

    let member = message.mentions.members.first();

    let embed = new client.Infinity_Gateway.MessageEmbed()
      .setTitle("ERROR: No Bot Provided")
      .setColor("RED")
      .setThumbnail(client.logo)
      .setDescription("Please mention the **bot** to sync roles for")
      .setTimestamp()
      .setFooter({ text: client.footer, iconURL: client.logo });

    if (!member || !member.user.bot) return message.reply({ embeds: [embed] });

    await url
      .get(`https://spider.infinitybots.gg/bots/${member.user.id}`)
      .then(async (req) => {
        let role = await message.guild.roles.cache.find(
          (c) => c.id === "870952645811134478",
        );

        let embed3 = new client.Infinity_Gateway.MessageEmbed()
          .setTitle("ERROR: Role exists")
          .setColor("RED")
          .setThumbnail(member.displayAvatarURL({ dynamic: true }))
          .setDescription(`**Bot** already has the ${role} role`)
          .setTimestamp()
          .setFooter({ text: client.footer, iconURL: client.logo });

        if (member.roles.cache.has(role.id))
          return message.reply({ embeds: [embed3] });

        member.roles.add(role.id);

        let embed4 = new client.Infinity_Gateway.MessageEmbed()
          .setTitle("SUCCESS: Role added")
          .setColor("RED")
          .setThumbnail(member.displayAvatarURL({ dynamic: true }))
          .setDescription(`${role} has been added to ${member.user.tag}`)
          .setTimestamp()
          .setFooter({ text: client.footer, iconURL: client.logo });

        return message.reply({ embeds: [embed4] });
      })
      .catch(() => {
        let embed = new client.Infinity_Gateway.MessageEmbed()
          .setTitle("ERROR: Unable to find bot")
          .setColor("RED")
          .setThumbnail(client.logo)
          .setDescription(
            "**Bot** is not in queue or not listed on our website",
          )
          .setTimestamp()
          .setFooter({ text: client.footer, iconURL: client.logo });

        return message.channel.send({ embeds: [embed] });
      });
  },
};
