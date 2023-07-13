module.exports = {
    name: "ban",
    category: "Mods",
    description: "Ban a member from the server",
    userPerms: ["BAN_MEMBERS"],
    basePerms: ["BAN_MEMBERS"],
    options: [
        {
            name: "user",
            description: "The user you want to ban",
            type: 6,
            required: true,
        },
        {
            name: "reason",
            description: "Reason for the ban",
            type: "STRING",
            required: true,
        },
    ],

    run: async (client, interaction) => {
        let member = interaction.options.getMember("user");
        let reason = interaction.options.getString("reason");

        let cant_ban = new client.Infinity_Gateway.MessageEmbed()
            .setTitle("ERROR: Ban Failed")
            .setColor(client.color)
            .setThumbnail(client.logo)
            .setDescription("User is unable to be banned due to perms")
            .setTimestamp()
            .setFooter({ text: client.footer, iconURL: client.logo });

        if (!member.bannable)
            return interaction.reply({
                embeds: [cant_ban],
                ephemeral: true,
            });

        let can_ban = new client.Infinity_Gateway.MessageEmbed()
            .setTitle("SUCCESS: User Banned")
            .setColor(client.color)
            .setThumbnail(client.logo)
            .setDescription("User has been banned successfully!")
            .addFields(
                {
                    name: "User",
                    value: `\`${member.user.username}\``,
                    inline: true,
                },
                {
                    name: "Reason",
                    value: `\`${reason}\``,
                    inline: true,
                }
            )
            .setTimestamp()
            .setFooter({ text: client.footer, iconURL: client.logo });

        await interaction.reply({
            embeds: [can_ban],
            ephemeral: true,
        });

        return interaction.guild.members.ban(member, { reason });
    },
};
