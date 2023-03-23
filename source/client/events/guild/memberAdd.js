module.exports = {
    name : "guildMemberAdd",

    async execute(member, client) {

      try {

        if (member.user.bot) return;

        if (member.guild.id === '870950609291972618') {

        let mainGuild = await client.guilds.cache.get("758641373074423808");
        let guildUser = await mainGuild.members.cache.get(member.user.id);
        let pingRole = await member.guild.roles.cache.find(r => r.id === '510065483693817867') // Staff Managers
        let staffRole = await mainGuild.roles.cache.find(r => r.id === '762371586434793472'); // Website Mods
        let auditLogs = await member.guild.channels.cache.find(c => c.id === '870950610852266006'); //  Audit Logs

            if (!guildUser || !guildUser.roles.cache.has(staffRole)) {

              let embed = new client.Infinity_Gateway.MessageEmbed()
                .setTitle("Security Action Executed")
                .setColor("RED")
                .setDescription("Whoops, someone done goofed")
                .addFields(
                  {
                    name: "Action Taken",
                    value: "``MEMBER_BAN``",
                    inline: true
                  },
                  {
                    name: "Executed On",
                    value: `${member.user.tag}`,
                    inline: true
                  },
                  {
                    name: "Reason",
                    value: "User attempted to join a Infinity Bots Staff Server but does not appear to be staff",
                    inline: false
                  }
                )
                .setTimestamp()
                .setFooter({ text: client.footer, iconURL: client.logo });

                await auditLogs.send({ embeds: [embed] });

                return member.guild.members.ban(member, { reason: "User attempted to join a Infinity Bots Staff Server but does not appear to be staff" })
           }
        }
      } catch (err) {
        return console.log(err.stack);
      }
    }
}