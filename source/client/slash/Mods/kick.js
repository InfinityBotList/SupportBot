module.exports = {
    name: "kick",
    category: "Mods",
    description: "Kick a member from the server",
    userPerms: ["KICK_MEMBERS"],
    basePerms: ["KICK_MEMBERS"],
    options: [{
            name: "user",
            description: "The user you want to kick",
            type: 6,
            required: true,
        },
        {
            name: "reason",
            description: "Reason for the kick",
            type: "STRING",
            required: true,
        },
    ],

    run: async(client, interaction) => {
        let member = await interaction.options.getMember("user");
        let reason = await interaction.options.getString("reason");

        let embed = new client.Infinity_Gateway.MessageEmbed()
            .setTitle("ERROR: Unable to kick user")
            .setColor(client.color)
            .setThumbnail(client.logo)
            .setDescription(
                "Hold up, seems i am unable to kick that user.. This is usually due to them having higher permissions!"
            )
            .setTimestamp()
            .setFooter({ text: client.footer, iconURL: client.logo });

        let embed2 = new client.Infinity_Gateway.MessageEmbed()
            .setTitle("ERROR: Why would you even!")
            .setColor(client.color)
            .setThumbnail(client.logo)
            .setDescription("You can not just kick yourself noob")
            .setTimestamp()
            .setFooter({ text: client.footer, iconURL: client.logo });

        if (member == interaction.member)
            return interaction.reply({ embeds: [embed2], ephemeral: true });
        if (!member.kickable)
            return interaction.reply({ embeds: [embed], ephemeral: true });
        else {
            let embed = new client.Infinity_Gateway.MessageEmbed()
                .setTitle("SUCCESS: User Kicked!")
                .setColor(client.color)
                .setDescription("Whoops, someone messed up!!")
                .addFields({
                    name: "User",
                    value: `${member.user.username}#${member.user.discriminator}`,
                    inline: true,
                }, {
                    name: "Reason",
                    value: `${reason}`,
                    inline: true,
                }, {
                    name: "Moderator",
                    value: `${interaction.member.user.username}#${interaction.member.user.discriminator}`,
                    inline: true,
                })
                .setTimestamp()
                .setFooter({ text: client.footer, iconURL: client.logo });

            await interaction.reply({ embeds: [embed] });

            return member.kick(`${reason}`);
        }
    },
};