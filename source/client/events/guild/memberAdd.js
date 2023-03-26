const url = require("snekfetch");

module.exports = {
  name: "guildMemberAdd",

  async execute(member, client) {
    try {
      if (member.guild.id === "870950609291972618") {
        if (member.user.bot) return;
        let mainGuild = await client.guilds.cache.get("758641373074423808");
        let guildUser = await mainGuild.members.cache.get(member.user.id);
        let pingRole = await member.guild.roles.cache.find(
          (r) => r.id === "510065483693817867"
        ); // Staff Managers
        let staffRole = await mainGuild.roles.cache.find(
          (r) => r.id === "762371586434793472"
        ); // Website Mods
        let auditLogs = await member.guild.channels.cache.find(
          (c) => c.id === "870950610852266006"
        ); //  Audit Logs

        if (!guildUser || !guildUser.roles.cache.has(staffRole)) {
          let embed = new client.Infinity_Gateway.MessageEmbed()
            .setTitle("Security Action Executed")
            .setColor("RED")
            .setDescription("Whoops, someone done goofed")
            .addFields(
              {
                name: "Action Taken",
                value: "``MEMBER_BAN``",
                inline: true,
              },
              {
                name: "Executed On",
                value: `${member.user.tag}`,
                inline: true,
              },
              {
                name: "Reason",
                value:
                  "User attempted to join a Infinity Bots Staff Server but does not appear to be staff",
                inline: false,
              }
            )
            .setTimestamp()
            .setFooter({ text: client.footer, iconURL: client.logo });

          await auditLogs.send({ embeds: [embed] });

          return member.guild.members.ban(member, {
            reason:
              "User attempted to join a Infinity Bots Staff Server but does not appear to be staff",
          });
        }
      } else if (member.guild.id === "870952645811134475") {
        let chan = await member.guild.channels.cache.find(
          (c) => c.id === "870952646788390918"
        );
        let staff = await member.guild.roles.cache.find(
          (r) => r.id === "870952645811134480"
        );

        let embed = new client.Infinity_Gateway.MessageEmbed()
          .setTitle("New User Joined")
          .setColor(client.color)
          .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
          .setDescription("Woah, someone joined the server")
          .addFields(
            {
              name: "User",
              value: `${member.user.tag}`,
              inline: true,
            },
            {
              name: "User ID",
              value: `${member.user.id}`,
              inline: true,
            }
          )
          .setTimestamp()
          .setFooter({ text: client.footer, iconURL: client.logo });

        if (!member.user.bot) return chan.send({ embeds: [embed] });

        await url
          .get(`https://spider.infinitybots.gg/bots/${member.user.id}`)
          .then(async (body) => {
            console.log(body)

            if (body.type == "pending") {
              let r = await member.guild.roles.cache.find(
                (r) => r.id === "870952645811134478"
              );
              let chan = await member.guild.channels.cache.find(
                (c) => c.id === "870952646788390918"
              );

              try {
                await member.roles.add(r);

                let embed = new client.Infinity_Gateway.MessageEmbed()
                  .setTitle("New Bot Joined")
                  .setColor(client.color)
                  .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                  .setDescription(
                    `${member.user.tag} is currently in queue so i have applied the ${r} role`
                  )
                  .setTimestamp()
                  .setFooter({ text: client.footer, iconURL: client.logo });

                return chan.send({ content: `${staff}`, embeds: [embed] });
              } catch (err) {
                let embed = new client.Infinity_Gateway.MessageEmbed()
                  .setTitle("New Bot Joined")
                  .setColor(client.color)
                  .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                  .setDescription(
                    `${member.user.tag} is currently in queue but for some reason i was unable to apply the ${r} role`
                  )
                  .addFields({
                    name: "Steps to fix",
                    value: "Run the `<<syncroles` command",
                  })
                  .setTimestamp()
                  .setFooter({ text: client.footer, iconURL: client.logo });

                return chan.send({ content: `${staff}`, embeds: [embed] });
              }
            } else if (body.type !== "pending") {
              let chan = await member.guild.channels.cache.find(
                (c) => c.id === "870952646788390918"
              );

              let embed = new client.Infinity_Gateway.MessageEmbed()
                .setTitle("New Bot Joined")
                .setColor(client.color)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setDescription(
                  `${member.user.tag} is not currently pending approval or not listed on our site!`
                )
                .setTimestamp()
                .setFooter({ text: client.footer, iconURL: client.logo });

              return chan.send({ embeds: [embed] });
            }
          })
          .catch(async () => {
            let chan = await member.guild.channels.cache.find(
              (c) => c.id === "870952646788390918"
            );

            let embed = new client.Infinity_Gateway.MessageEmbed()
              .setTitle("New Bot Joined")
              .setColor(client.color)
              .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
              .setDescription(
                `${member.user.tag} is not currently pending approval or not listed on our site!`
              )
              .setTimestamp()
              .setFooter({ text: client.footer, iconURL: client.logo });

            return chan.send({ embeds: [embed] });
          });
      }
    } catch (err) {
      return console.log(err.stack);
    }
  },
};
