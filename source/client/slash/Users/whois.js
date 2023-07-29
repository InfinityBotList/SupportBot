const { getTeamAcks } = require('@plugins/filters/teamAcks');
const CASES = require("@handlers/mongo/schemas/userCases");
const moment = require("moment");

module.exports = {
  name: "whois",
  category: "Users",
  description: "View case information",
  userPerms: ["none"],
  basePerms: ["none"],
  options: [
    {
        name: 'user',
        description: 'The user to fetch info for',
        required: true,
        type: 6,
    }
  ],

  run: async (client, interaction) => {

    let member = await interaction.options.getMember('user');

    if (member.user.bot) return interaction.reply({
        embeds: [
            new client.Infinity_Gateway.MessageEmbed()
            .setTitle('Error: not a valid user')
            .setColor('RED')
            .setThumbnail(client.logo)
            .setDescription('The user you provided is a bot. Please provide a valid discord user')
            .setTimestamp()
            .setFooter({
                text: client.footer, 
                iconURL: client.logo
            })
        ]
    })

    return interaction.reply({
        embeds: [
            new client.Infinity_Gateway.MessageEmbed()
            .setTitle(`Information for ${member.user.username}`)
            .setColor(client.color)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setDescription('Some basic information chief')
            .addFields(
                {
                    name: 'Created At',
                    value: `${'``' + moment(member.user.createdAt).format('LLLL') + '``'}`,
                    inline: false
                },
                {
                    name: 'Joined Server',
                    value: `${'``' + moment(member.user.joinedAt).format('LLLL') + '``'}`,
                    inline: false
                },
                {
                    name: 'Nickname',
                    value: `${member.nickname}`,
                    inline: false
                },
                {
                    name: 'IBL Positions',
                    value: `${await getTeamAcks({
                        client: client,
                        guildId: '758641373074423808',
                        userId: member.user.id
                    })}`
                }
            )
        ]
    })
  }
}
