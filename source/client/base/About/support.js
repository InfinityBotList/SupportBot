module.exports = {
    name: "support",
    category: "About",
    disabled: false,
    description: "Links to our Help Desk/Support Panel",
    aliases: [],
    permissions: [],

    run: async (message, args, client) => {
        const embed = new client.Infinity_Gateway.MessageEmbed()
            .setTitle("Help Desk - Quick Links")
            .setColor(client.color)
            .setThumbnail(client.logo)
            .addFields(
                {
                    name: "Bots Section",
                    value: `- [Bot Rules](https://infinitybots.gg/help/bots/rules)\n
                - [Page Rules](https://infinitybots.gg/help/bots/page-rules)\n
                - [Extra Links](https://infinitybots.gg/help/bots/extra-links)`,
                    inline: true,
                },
                {
                    name: "Programs Section",
                    value: `- [Certification](https://infinitybots.gg/help/programs/certification)\n
                - [Partnership](https://infinitybots.gg/help/programs)\n
                - [Premium](https://infinitybots.gg/help/programs)`,
                    inline: true,
                },
                {
                    name: "Staff Section",
                    value: `- [Staff Guide](https://infinitybots.gg/help/staff/guide)\n
                - [Staff Templates](https://infinitybots.gg/help/staff/templates)\n
                - [Onboarding Info](https://infinitybots.gg/help/staff)`,
                    inline: true,
                }
            )
            .setTimestamp()
            .setFooter({ text: client.footer, iconURL: client.logo });

        return message.reply({ embeds: [embed] });
    },
};
