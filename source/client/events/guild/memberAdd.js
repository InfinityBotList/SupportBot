const url = require("snekfetch");

module.exports = {
  name: "guildMemberAdd",

  async execute(member, client) {
    try {
      if (member.guild.id === "870950609291972618") {
        let mainGuild = await client.guilds.cache.get("758641373074423808");
        let guildUser = await mainGuild.members.cache.get(member.user.id);
        let staffCenterStaffRole =
          member.guild.roles.cache.get("870950609291972622"); // Staff Center Web Mods
        let staffCenterBotsRole =
          member.guild.roles.cache.get("870950609291972620"); // Staff Center Server Bots
        let auditLogs = await member.guild.channels.cache.find(
          (c) => c.id === "870950610852266006"
        ); //  Audit Logs

        if (!guildUser && !member.user.bot) {
          let staffRole = guildUser.roles.cache.find(
            (r) => r.id === "762371586434793472"
          ); // Website Mods

          if (!staffRole) {
            await member.roles.add();

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
        } else {
          if (!member.user.bot) {
            await member.roles.add(staffCenterStaffRole.id);
          } else {
            await member.roles.add(staffCenterBotsRole.id);
          }

          let staff;
          let guild;
          let staffRole;

          if (!guildUser) {
            staffRole = false;
            guild = "Not in main guild";
          } else if (guildUser) {
            guild = "In main guild";
            staffRole = guildUser.roles.cache.find(
              (r) => r.id === "762371586434793472"
            ); // Website Mods
          }

          if (!staffRole) staff = "False";
          else staff = "True";

          let sys = await member.guild.channels.cache.find(
            (c) => c.id === "1090417512862191676"
          );

          let embed = new client.Infinity_Gateway.MessageEmbed()
            .setTitle("Someone just slid in")
            .setColor(client.color)
            .setDescription(`${member.user.tag} has arrived`)
            .addFields(
              {
                name: "Is Bot",
                value: `${member.user.bot ? "true" : "false"}`,
                inline: true,
              },
              {
                name: "Is Staff",
                value: `${staff}`,
                inline: true,
              },
              {
                name: "Auto Roles",
                value: `${
                  staffRole && !member.user.bot
                    ? `<@&${staffCenterStaffRole.id}>`
                    : `<@&${staffCenterBotsRole.id}>`
                }`,
                inline: true,
              }
            )
            .setTimestamp()
            .setFooter({ text: client.footer, iconURL: client.logo });

          return sys.send({ embeds: [embed] });
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
          .then(async (req) => {
            if (req.body.type == "pending") {
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
            } else if (req.body.type !== "pending") {
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
