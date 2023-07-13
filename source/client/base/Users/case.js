const CASES = require("@handlers/mongo/schemas/userCases");
const moment = require("moment");

module.exports = {
    name: "case",
    category: "Users",
    disabled: false,
    description: "View case information",
    aliases: [],
    permissions: [],

    run: async (message, args, client) => {
        let member = message.mentions.members.first();
        let caseNum = args.slice(1).join(" ");

        let no_member = new client.Infinity_Gateway.MessageEmbed()
            .setTitle("ERROR: No user provided")
            .setColor("RED")
            .setThumbnail(client.logo)
            .setDescription(
                "Please mention the user you want to check a case for"
            )
            .setTimestamp()
            .setFooter({ text: client.footer, iconURL: client.logo });

        let no_case = new client.Infinity_Gateway.MessageEmbed()
            .setTitle("ERROR: No case number provided")
            .setColor("RED")
            .setThumbnail(client.logo)
            .setDescription(
                "Please provide a valid case number (ex: ``<<case @Toxic Dev 2``)"
            )
            .setTimestamp()
            .setFooter({ text: client.footer, iconURL: client.logo });

        if (!member) return message.reply({ embeds: [no_member] });
        if (!caseNum) return message.reply({ embeds: [no_case] });

        let caseFetch = await CASES.findOne({
            user: member.user.id,
            guild: message.guild.id,
            case: caseNum,
        });

        let embed = new client.Infinity_Gateway.MessageEmbed()
            .setTitle("ERROR: No cases found")
            .setColor("RED")
            .setThumbnail(client.logo)
            .setDescription(
                "No case with that number exists for this user in this guild!"
            )
            .setTimestamp()
            .setFooter({ text: client.footer, iconURL: client.logo });

        if (!caseFetch) return message.reply({ embeds: [embed] });
        else {
            let embed = new client.Infinity_Gateway.MessageEmbed()
                .setTitle(`Details for Case #${caseFetch.case}`)
                .setColor(client.color)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setDescription("Here is some basic info about this case!")
                .addFields(
                    {
                        name: "Action Taken",
                        value: `${caseFetch.action}`,
                        inline: true,
                    },
                    {
                        name: "Affected User",
                        value: `${member.user.tag}`,
                        inline: true,
                    },
                    {
                        name: "Moderator",
                        value: `${
                            client.users.cache.get(caseFetch.moderator).tag
                        }`,
                        inline: true,
                    },
                    {
                        name: "Action Guild",
                        value: `${
                            client.guilds.cache.get(caseFetch.guild).name
                        }`,
                        inline: true,
                    },
                    {
                        name: "Action Time",
                        value: `${caseFetch.time}`,
                        inline: true,
                    },
                    {
                        name: "Action Reason",
                        value: `${caseFetch.reason}`,
                        inline: true,
                    }
                )
                .setTimestamp()
                .setFooter({ text: client.footer, iconURL: client.logo });

            return message.reply({ embeds: [embed] });
        }
    },
};
